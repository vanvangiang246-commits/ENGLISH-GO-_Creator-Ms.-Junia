import React, { useState } from 'react';
import { QuizQuestion } from '../../types/quiz';
import { Check, RotateCcw } from 'lucide-react';
import { getRawSvg } from '../../data/curriculum/illustrations';

interface MatchingPairsViewProps {
  question: QuizQuestion;
  selectedAnswer: string[] | null;
  isAnswerSubmitted: boolean;
  onSubmit: (pairs: string[]) => void;
}

export const MatchingPairsView: React.FC<MatchingPairsViewProps> = ({
  question,
  selectedAnswer,
  isAnswerSubmitted,
  onSubmit,
}) => {
  const leftItems = question.matchingData?.leftItems || [];
  const rightItems = question.matchingData?.rightItems || [];

  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  // pairs map: { [leftId]: rightId }
  const [pairs, setPairs] = useState<Record<string, string>>(() => {
    if (selectedAnswer) {
      const init: Record<string, string> = {};
      selectedAnswer.forEach((p) => {
        const [l, r] = p.split(':');
        if (l && r) init[l] = r;
      });
      return init;
    }
    return {};
  });

  const handleLeftClick = (id: string) => {
    if (isAnswerSubmitted) return;
    if (selectedLeft === id) {
      setSelectedLeft(null);
    } else {
      setSelectedLeft(id);
    }
  };

  const handleRightClick = (rightId: string) => {
    if (isAnswerSubmitted) return;

    // If clicking an already matched picture without a word selected, unpair it
    const existingLeft = isRightMatchedBy(rightId);
    if (!selectedLeft && existingLeft) {
      const nextPairs = { ...pairs };
      delete nextPairs[existingLeft];
      setPairs(nextPairs);
      return;
    }

    if (!selectedLeft) return;

    const nextPairs = { ...pairs, [selectedLeft]: rightId };
    setPairs(nextPairs);
    setSelectedLeft(null);

    // If all left items are matched, submit
    if (Object.keys(nextPairs).length === leftItems.length) {
      const formatted = Object.entries(nextPairs).map(([l, r]) => `${l}:${r}`);
      onSubmit(formatted);
    }
  };

  const handleReset = () => {
    if (isAnswerSubmitted) return;
    setPairs({});
    setSelectedLeft(null);
  };

  // Check correctness of each pair
  const isRightMatchedBy = (rightId: string) => {
    return Object.entries(pairs).find(([_, r]) => r === rightId)?.[0];
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, leftId: string) => {
    if (isAnswerSubmitted) return;
    e.dataTransfer.setData('text/plain', leftId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDropOnPicture = (e: React.DragEvent, rightId: string) => {
    e.preventDefault();
    if (isAnswerSubmitted) return;
    const droppedLeftId = e.dataTransfer.getData('text/plain');
    if (!droppedLeftId) return;

    const nextPairs = { ...pairs, [droppedLeftId]: rightId };
    setPairs(nextPairs);
    setSelectedLeft(null);

    if (Object.keys(nextPairs).length === leftItems.length) {
      const formatted = Object.entries(nextPairs).map(([l, r]) => `${l}:${r}`);
      onSubmit(formatted);
    }
  };

  // Resolves the reliable inline SVG markup for each picture box (returns null if text meaning match)
  const getSvgMarkup = (right: { id: string; text?: string; image?: string; svgContent?: string; matchId: string }): string | null => {
    // 1. Explicit raw SVG content passed in question
    if (right.svgContent && typeof right.svgContent === 'string' && right.svgContent.includes('<svg')) {
      return right.svgContent;
    }
    // 2. right.image is already raw SVG
    if (right.image && right.image.startsWith('<svg')) {
      return right.image;
    }
    // 3. right.image is data-uri SVG
    if (right.image && right.image.startsWith('data:image/svg+xml;utf8,')) {
      try {
        const decoded = decodeURIComponent(right.image.replace('data:image/svg+xml;utf8,', ''));
        if (decoded.includes('<svg')) return decoded;
      } catch {
        // fallback
      }
    }
    // 4. If right has explicit text and no image, it is a text-meaning card
    if (right.text && !right.image) {
      return null;
    }
    // 5. Try resolving from the matched left item word
    const leftItem = leftItems.find((l) => l.id === right.matchId);
    if (leftItem?.text) {
      const raw = getRawSvg(leftItem.text);
      if (raw) return raw;
    }
    return null;
  };

  const hasAnyPictures = rightItems.some((r) => getSvgMarkup(r) !== null);

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* 1. SEPARATE WORD BANK */}
      <div className="bg-sky-50 border-2 border-sky-200 rounded-3xl p-5 mb-6 text-center shadow-2xs">
        <span className="text-xs font-black uppercase tracking-wider text-sky-800 block mb-3">
          WORD BANK
        </span>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {leftItems.map((left) => {
            const isSelected = selectedLeft === left.id;
            const hasPair = !!pairs[left.id];

            return (
              <button
                key={left.id}
                type="button"
                draggable={!isAnswerSubmitted}
                onDragStart={(e) => handleDragStart(e, left.id)}
                disabled={isAnswerSubmitted}
                onClick={() => handleLeftClick(left.id)}
                className={`px-6 py-3 rounded-2xl border-3 font-display font-black text-xl sm:text-2xl transition-all cursor-pointer ${
                  isSelected
                    ? 'border-blue-600 bg-blue-600 text-white shadow-md scale-105 ring-4 ring-blue-200'
                    : hasPair
                    ? 'border-emerald-500 bg-emerald-100 text-emerald-900 opacity-60'
                    : 'border-slate-300 bg-white hover:border-blue-500 text-slate-800 hover:scale-102'
                }`}
              >
                {left.text}
              </button>
            );
          })}
        </div>
        <p className="text-xs text-slate-600 font-semibold mt-3">
          {selectedLeft
            ? `Selected: "${leftItems.find((l) => l.id === selectedLeft)?.text}". Now tap or drag to the matching ${hasAnyPictures ? 'picture' : 'meaning'} below!`
            : `Tap or drag a word from the Word Bank to its matching ${hasAnyPictures ? 'picture' : 'meaning'} below.`}
        </p>
      </div>

      {/* 2. MATCHING TARGETS GRID - STRICTLY NO TEXT LABELS ON PICTURES */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 justify-center">
        {rightItems.map((right) => {
          const matchedLeftId = isRightMatchedBy(right.id);
          const isMatched = !!matchedLeftId;
          const svgMarkup = getSvgMarkup(right);

          return (
            <button
              key={right.id}
              type="button"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDropOnPicture(e, right.id)}
              disabled={isAnswerSubmitted}
              onClick={() => handleRightClick(right.id)}
              className={`w-full aspect-square rounded-3xl border-3 overflow-hidden transition-all flex items-center justify-center p-3 cursor-pointer relative bg-slate-50 ${
                isMatched
                  ? 'border-emerald-500 bg-emerald-50/70 ring-4 ring-emerald-100'
                  : selectedLeft
                  ? 'border-blue-300 hover:border-blue-500 hover:scale-105 bg-white shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
              aria-label={right.text || "Picture illustration"}
            >
              {svgMarkup ? (
                <div
                  className="w-full h-full flex items-center justify-center pointer-events-none p-1 [&>svg]:w-full [&>svg]:h-full [&>svg]:max-w-full [&>svg]:max-h-full [&>svg]:object-contain"
                  dangerouslySetInnerHTML={{ __html: svgMarkup }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center p-2 text-center pointer-events-none">
                  <span className="font-display font-black text-base sm:text-lg text-slate-800 leading-snug">
                    {right.text}
                  </span>
                </div>
              )}

              {/* Match Indicator: checkmark ONLY, no text label */}
              {isMatched && (
                <div className="absolute top-3 right-3 bg-emerald-500 text-white rounded-full p-1.5 shadow-md">
                  <Check className="w-5 h-5" strokeWidth={3} />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {!isAnswerSubmitted && Object.keys(pairs).length > 0 && (
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Matching</span>
          </button>
        </div>
      )}
    </div>
  );
};
