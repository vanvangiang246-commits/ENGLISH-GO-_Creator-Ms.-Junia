import React, { useState, useEffect } from 'react';
import { QuizQuestion, QuestionOption } from '../../types/quiz';
import { Volume2, Check, X, Eye } from 'lucide-react';
import { speakEnglish } from '../../utils/audioEffects';

interface ListenAndChooseViewProps {
  question: QuizQuestion;
  selectedAnswer: string | null;
  isAnswerSubmitted: boolean;
  onSelect: (optionId: string) => void;
}

export const ListenAndChooseView: React.FC<ListenAndChooseViewProps> = ({
  question,
  selectedAnswer,
  isAnswerSubmitted,
  onSelect,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);

  // Play audio on load
  useEffect(() => {
    if (question.audioText) {
      handlePlay();
    }
  }, [question.id]);

  const handlePlay = () => {
    if (!question.audioText) return;
    setIsPlaying(true);
    speakEnglish(question.audioText, 0.82, () => setIsPlaying(false));
  };

  const hasImageOptions = question.options?.some((o) => !!o.image);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Audio Play Center Card */}
      <div className="bg-sky-50 border-2 border-sky-200 rounded-3xl p-6 sm:p-7 text-center mb-8 max-w-sm w-full">
        <button
          type="button"
          onClick={handlePlay}
          className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center text-white shadow-lg transition-transform duration-150 cursor-pointer ${
            isPlaying
              ? 'bg-amber-500 scale-105 ring-8 ring-amber-100'
              : 'bg-blue-600 hover:bg-blue-700 hover:scale-105 ring-4 ring-blue-100'
          }`}
          aria-label="Play audio"
        >
          <Volume2 className="w-10 h-10" />
        </button>

        <p className="font-display font-bold text-sm text-slate-700 mt-4">
          {isPlaying ? 'Listening...' : 'Tap to hear the sound again'}
        </p>

        {/* Transcript hidden during attempt, available after answering */}
        {isAnswerSubmitted && (
          <div className="mt-3 pt-3 border-t border-sky-200/80">
            {!showTranscript ? (
              <button
                type="button"
                onClick={() => setShowTranscript(true)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:underline cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Show Transcript</span>
              </button>
            ) : (
              <span className="font-mono text-sm font-black text-slate-800 bg-white px-3 py-1 rounded-lg border border-slate-200">
                &ldquo;{question.audioText}&rdquo;
              </span>
            )}
          </div>
        )}
      </div>

      {/* Answer Options */}
      {hasImageOptions ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
          {question.options?.map((opt: QuestionOption) => {
            const isSelected = selectedAnswer === opt.id;
            const isCorrect = isAnswerSubmitted && opt.id === question.correctAnswer;
            const isWrong = isAnswerSubmitted && isSelected && opt.id !== question.correctAnswer;

            let borderClass = 'border-slate-200 hover:border-blue-400 bg-white';
            if (isAnswerSubmitted) {
              if (isCorrect) borderClass = 'border-emerald-500 bg-emerald-50/60 ring-4 ring-emerald-100';
              else if (isWrong) borderClass = 'border-rose-400 bg-rose-50/60 ring-4 ring-rose-100';
              else borderClass = 'border-slate-200 opacity-60 bg-white';
            } else if (isSelected) {
              borderClass = 'border-blue-500 bg-blue-50/60 ring-4 ring-blue-100';
            }

            return (
              <button
                key={opt.id}
                type="button"
                disabled={isAnswerSubmitted}
                onClick={() => onSelect(opt.id)}
                className={`p-3.5 rounded-3xl border-3 text-center transition-all flex flex-col items-center justify-between cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-400 ${borderClass}`}
              >
                <div className="w-full aspect-square rounded-2xl overflow-hidden bg-slate-100 mb-3 border border-slate-200/80 relative">
                  {opt.image && (
                    <img
                      src={opt.image}
                      alt={opt.text || 'Choice'}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  )}
                  {isCorrect && (
                    <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md">
                      <Check className="w-5 h-5" strokeWidth={3} />
                    </div>
                  )}
                  {isWrong && (
                    <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-md">
                      <X className="w-5 h-5" strokeWidth={3} />
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="w-full max-w-md grid grid-cols-1 gap-3">
          {question.options?.map((opt: QuestionOption) => {
            const isSelected = selectedAnswer === opt.id;
            const isCorrect = isAnswerSubmitted && opt.id === question.correctAnswer;
            const isWrong = isAnswerSubmitted && isSelected && opt.id !== question.correctAnswer;

            let borderClass = 'border-slate-200 hover:border-blue-400 bg-white';
            if (isAnswerSubmitted) {
              if (isCorrect) borderClass = 'border-emerald-500 bg-emerald-50/70 ring-2 ring-emerald-200';
              else if (isWrong) borderClass = 'border-rose-400 bg-rose-50/70 ring-2 ring-rose-200';
              else borderClass = 'border-slate-200 opacity-60 bg-white';
            } else if (isSelected) {
              borderClass = 'border-blue-500 bg-blue-50/70 ring-2 ring-blue-200';
            }

            return (
              <button
                key={opt.id}
                type="button"
                disabled={isAnswerSubmitted}
                onClick={() => onSelect(opt.id)}
                className={`p-4 rounded-2xl border-2 text-left font-display font-bold text-lg text-slate-900 transition-all flex items-center justify-between cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-400 ${borderClass}`}
              >
                <span>{opt.text}</span>
                {isCorrect && <Check className="w-5 h-5 text-emerald-600" strokeWidth={3} />}
                {isWrong && <X className="w-5 h-5 text-rose-600" strokeWidth={3} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
