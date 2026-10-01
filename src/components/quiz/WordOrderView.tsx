import React, { useState } from 'react';
import { QuizQuestion } from '../../types/quiz';
import { RotateCcw, Check, X } from 'lucide-react';
import { validateSentenceForWordOrder } from '../../utils/sentenceValidator';

interface WordOrderViewProps {
  question: QuizQuestion;
  selectedAnswer: string[] | null;
  isAnswerSubmitted: boolean;
  onSubmit: (orderedWords: string[]) => void;
}

export const WordOrderView: React.FC<WordOrderViewProps> = ({
  question,
  selectedAnswer,
  isAnswerSubmitted,
  onSubmit,
}) => {
  const scrambled = question.wordOrderData?.scrambledWords || [];

  const [placedWords, setPlacedWords] = useState<string[]>(selectedAnswer || []);
  const [availableWords, setAvailableWords] = useState<string[]>(() => {
    if (selectedAnswer) {
      // Filter out placed words
      const temp = [...scrambled];
      selectedAnswer.forEach((w) => {
        const idx = temp.indexOf(w);
        if (idx !== -1) temp.splice(idx, 1);
      });
      return temp;
    }
    return [...scrambled];
  });

  const handlePlaceWord = (word: string, index: number) => {
    if (isAnswerSubmitted) return;
    const nextAvailable = [...availableWords];
    nextAvailable.splice(index, 1);

    const nextPlaced = [...placedWords, word];
    setPlacedWords(nextPlaced);
    setAvailableWords(nextAvailable);

    // Auto notify answer if all words placed
    if (nextPlaced.length === scrambled.length) {
      onSubmit(nextPlaced);
    }
  };

  const handleRemoveWord = (word: string, index: number) => {
    if (isAnswerSubmitted) return;
    const nextPlaced = [...placedWords];
    nextPlaced.splice(index, 1);

    const nextAvailable = [...availableWords, word];
    setPlacedWords(nextPlaced);
    setAvailableWords(nextAvailable);
  };

  const handleReset = () => {
    if (isAnswerSubmitted) return;
    setPlacedWords([]);
    setAvailableWords([...scrambled]);
  };

  const reconstructed = placedWords.join(' ').trim();
  const targetSentence = (
    question.wordOrderData?.correctSentence ||
    (Array.isArray(question.correctAnswer) ? question.correctAnswer.join(' ') : '')
  ).trim();
  const isSentenceValid = validateSentenceForWordOrder(reconstructed).isValid;

  const isCorrect =
    isAnswerSubmitted &&
    isSentenceValid &&
    reconstructed.toLowerCase() === targetSentence.toLowerCase() &&
    JSON.stringify(placedWords) === JSON.stringify(question.correctAnswer);

  const handleDragStart = (e: React.DragEvent, word: string, fromIndex: number, source: 'available' | 'placed') => {
    if (isAnswerSubmitted) return;
    e.dataTransfer.setData('text/plain', JSON.stringify({ word, fromIndex, source }));
  };

  const handleDropOnTarget = (e: React.DragEvent) => {
    e.preventDefault();
    if (isAnswerSubmitted) return;
    try {
      const dataStr = e.dataTransfer.getData('text/plain');
      if (!dataStr) return;
      const { word, fromIndex, source } = JSON.parse(dataStr);
      if (source === 'available') {
        handlePlaceWord(word, fromIndex);
      }
    } catch {
      // ignore
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center">
      {/* Target Construction Area */}
      <div
        onDragOver={handleDragOver}
        onDrop={handleDropOnTarget}
        className={`w-full min-h-[90px] p-4 rounded-3xl border-3 border-dashed mb-6 flex flex-wrap items-center justify-center gap-2.5 transition-colors ${
          isAnswerSubmitted
            ? isCorrect
              ? 'border-emerald-500 bg-emerald-50/70'
              : 'border-rose-400 bg-rose-50/70'
            : placedWords.length > 0
            ? 'border-blue-400 bg-blue-50/40'
            : 'border-slate-300 bg-slate-50'
        }`}
      >
        {placedWords.length === 0 ? (
          <span className="text-sm font-semibold text-slate-400">
            Tap or drag words below to arrange the sentence
          </span>
        ) : (
          placedWords.map((word, idx) => (
            <button
              key={`${word}-${idx}`}
              type="button"
              disabled={isAnswerSubmitted}
              onClick={() => handleRemoveWord(word, idx)}
              className="px-4 py-2 rounded-2xl bg-white border-2 border-blue-400 font-display font-black text-xl text-blue-900 shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              {word}
            </button>
          ))
        )}
      </div>

      {/* Available Word Chips */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-6 min-h-[50px]">
        {availableWords.map((word, idx) => (
          <button
            key={`${word}-${idx}`}
            type="button"
            draggable={!isAnswerSubmitted}
            onDragStart={(e) => handleDragStart(e, word, idx, 'available')}
            disabled={isAnswerSubmitted}
            onClick={() => handlePlaceWord(word, idx)}
            className="px-5 py-2.5 rounded-2xl bg-white border-2 border-slate-300 hover:border-blue-500 font-display font-black text-xl text-slate-800 shadow-xs hover:scale-105 active:scale-95 transition-all cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-400"
          >
            {word}
          </button>
        ))}
      </div>

      {!isAnswerSubmitted && placedWords.length > 0 && (
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Order</span>
        </button>
      )}
    </div>
  );
};
