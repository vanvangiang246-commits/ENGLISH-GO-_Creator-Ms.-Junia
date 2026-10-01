import React from 'react';
import { QuizQuestion, QuestionOption } from '../../types/quiz';
import { Check, X } from 'lucide-react';

interface LookAndChooseViewProps {
  question: QuizQuestion;
  selectedAnswer: string | null;
  isAnswerSubmitted: boolean;
  onSelect: (optionId: string) => void;
}

export const LookAndChooseView: React.FC<LookAndChooseViewProps> = ({
  question,
  selectedAnswer,
  isAnswerSubmitted,
  onSelect,
}) => {
  return (
    <div className="w-full flex flex-col items-center">
      {/* Target Picture Prompt */}
      {question.promptImage && (
        <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-3xl overflow-hidden bg-slate-100 border-2 border-slate-200/80 mb-6 shadow-sm">
          <img
            src={question.promptImage}
            alt="Prompt"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {question.promptText && (
        <div className="font-display font-black text-2xl text-slate-800 mb-6">
          {question.promptText}
        </div>
      )}

      {/* Text Options */}
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
    </div>
  );
};
