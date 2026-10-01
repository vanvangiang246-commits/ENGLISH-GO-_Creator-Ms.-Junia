import React from 'react';
import { QuizQuestion, QuestionOption } from '../../types/quiz';
import { Check, X } from 'lucide-react';

interface ImageChoiceViewProps {
  question: QuizQuestion;
  selectedAnswer: string | null;
  isAnswerSubmitted: boolean;
  onSelect: (optionId: string) => void;
}

export const ImageChoiceView: React.FC<ImageChoiceViewProps> = ({
  question,
  selectedAnswer,
  isAnswerSubmitted,
  onSelect,
}) => {
  return (
    <div className="w-full">
      {question.promptText && (
        <div className="text-center mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Target Word
          </span>
          <div className="font-display font-black text-3xl sm:text-4xl text-blue-700 bg-blue-50/80 inline-block px-6 py-2.5 rounded-2xl border border-blue-200">
            {question.promptText}
          </div>
        </div>
      )}

      {/* Grid of Image Choices */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
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
              className={`p-3.5 sm:p-4 rounded-3xl border-3 text-center transition-all duration-150 flex flex-col items-center justify-between cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-400 ${borderClass}`}
              aria-label={`Select ${opt.text || 'picture'}`}
            >
              <div className="w-full aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 relative">
                {opt.image && (
                  <img
                    src={opt.image}
                    alt="Illustration"
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
    </div>
  );
};
