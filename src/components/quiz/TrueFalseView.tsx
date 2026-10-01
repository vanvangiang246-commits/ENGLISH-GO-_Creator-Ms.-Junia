import React from 'react';
import { QuizQuestion, QuestionOption } from '../../types/quiz';
import { Check, X } from 'lucide-react';

interface TrueFalseViewProps {
  question: QuizQuestion;
  selectedAnswer: string | null;
  isAnswerSubmitted: boolean;
  onSelect: (optionId: string) => void;
}

export const TrueFalseView: React.FC<TrueFalseViewProps> = ({
  question,
  selectedAnswer,
  isAnswerSubmitted,
  onSelect,
}) => {
  return (
    <div className="w-full flex flex-col items-center">
      {/* Target Picture Prompt */}
      {question.promptImage && (
        <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-3xl overflow-hidden bg-slate-100 border-2 border-slate-200/80 mb-5 shadow-sm">
          <img
            src={question.promptImage}
            alt="Prompt"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Statement Card */}
      {question.promptText && (
        <div className="bg-slate-100 px-6 py-3 rounded-2xl border border-slate-200 mb-6 font-display font-black text-2xl text-slate-800 text-center">
          &ldquo;{question.promptText}&rdquo;
        </div>
      )}

      {/* True / False Buttons */}
      <div className="grid grid-cols-2 gap-4 sm:gap-6 w-full max-w-sm">
        {question.options?.map((opt: QuestionOption) => {
          const isSelected = selectedAnswer === opt.id;
          const isCorrect = isAnswerSubmitted && opt.id === question.correctAnswer;
          const isWrong = isAnswerSubmitted && isSelected && opt.id !== question.correctAnswer;

          let btnClass = 'bg-white border-slate-200 hover:border-blue-400 text-slate-800';
          if (isAnswerSubmitted) {
            if (isCorrect) btnClass = 'border-emerald-500 bg-emerald-50 text-emerald-800 ring-4 ring-emerald-100';
            else if (isWrong) btnClass = 'border-rose-400 bg-rose-50 text-rose-800 ring-4 ring-rose-100';
            else btnClass = 'border-slate-200 opacity-60 bg-white text-slate-400';
          } else if (isSelected) {
            btnClass = 'border-blue-500 bg-blue-50 text-blue-800 ring-4 ring-blue-100';
          }

          return (
            <button
              key={opt.id}
              type="button"
              disabled={isAnswerSubmitted}
              onClick={() => onSelect(opt.id)}
              className={`p-5 rounded-2xl border-3 font-display font-black text-xl sm:text-2xl flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-xs focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-400 ${btnClass}`}
            >
              {opt.id === 'true' ? (
                <Check className="w-6 h-6 text-emerald-600" strokeWidth={3} />
              ) : (
                <X className="w-6 h-6 text-rose-600" strokeWidth={3} />
              )}
              <span>{opt.text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
