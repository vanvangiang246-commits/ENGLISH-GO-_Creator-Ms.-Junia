import React from 'react';
import { QuizQuestion, QuestionOption } from '../../types/quiz';
import { Check, X } from 'lucide-react';

interface MissingLetterViewProps {
  question: QuizQuestion;
  selectedAnswer: string | null;
  isAnswerSubmitted: boolean;
  onSelect: (letter: string) => void;
}

export const MissingLetterView: React.FC<MissingLetterViewProps> = ({
  question,
  selectedAnswer,
  isAnswerSubmitted,
  onSelect,
}) => {
  const data = question.missingLetterData;
  const currentSelectedLetter = selectedAnswer ? selectedAnswer.replace(/^opt_/, '').trim().toLowerCase() : null;
  const correctLetter = (typeof question.correctAnswer === 'string' ? question.correctAnswer : '').replace(/^opt_/, '').trim().toLowerCase();

  return (
    <div className="w-full flex flex-col items-center">
      {/* Target Picture Prompt */}
      {question.promptImage && (
        <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-3xl overflow-hidden bg-slate-100 border-2 border-slate-200/80 mb-6 shadow-sm">
          <img
            src={question.promptImage}
            alt="Prompt"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Missing letter display box: b _ k e */}
      <div className="mb-6">
        <div className="font-display font-black text-4xl sm:text-5xl tracking-widest text-slate-900 bg-amber-50 px-8 py-3.5 rounded-3xl border-2 border-amber-200 shadow-2xs">
          {data ? (
            <span>
              {data.displayPattern.split('_')[0]}
              <span className="text-blue-600 underline underline-offset-8">
                {currentSelectedLetter ? currentSelectedLetter : '_'}
              </span>
              {data.displayPattern.split('_')[1]}
            </span>
          ) : (
            question.promptText
          )}
        </div>
      </div>

      {/* Letter Options */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        {question.options?.map((opt: QuestionOption) => {
          const letterVal = (opt.text || opt.id).replace(/^opt_/, '').trim().toLowerCase();
          const isSelected = currentSelectedLetter === letterVal;
          const isOptionCorrect = isAnswerSubmitted && letterVal === correctLetter;
          const isOptionWrong = isAnswerSubmitted && isSelected && letterVal !== correctLetter;

          let btnClass = 'bg-white border-slate-200 hover:border-blue-400 hover:bg-slate-50 text-slate-900';
          if (isAnswerSubmitted) {
            if (isOptionCorrect) btnClass = 'border-emerald-500 bg-emerald-50 text-emerald-800 ring-4 ring-emerald-100';
            else if (isOptionWrong) btnClass = 'border-rose-400 bg-rose-50 text-rose-800 ring-4 ring-rose-100';
            else btnClass = 'border-slate-200 opacity-50 bg-white text-slate-400';
          } else if (isSelected) {
            btnClass = 'border-blue-600 bg-blue-50 text-blue-700 ring-4 ring-blue-100';
          }

          return (
            <button
              key={opt.id}
              type="button"
              disabled={isAnswerSubmitted}
              onClick={() => onSelect(letterVal)}
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-3 font-display font-black text-2xl sm:text-3xl flex items-center justify-center shadow-xs transition-all cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-400 ${btnClass}`}
              aria-label={`Select letter ${letterVal}`}
            >
              {letterVal}
            </button>
          );
        })}
      </div>
    </div>
  );
};
