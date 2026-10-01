import React, { useState } from 'react';
import { QuizQuestion } from '../../types/quiz';
import { Check, X, Send } from 'lucide-react';

interface TypeWordViewProps {
  question: QuizQuestion;
  selectedAnswer: string | null;
  isAnswerSubmitted: boolean;
  onSubmit: (typed: string) => void;
}

export const TypeWordView: React.FC<TypeWordViewProps> = ({
  question,
  selectedAnswer,
  isAnswerSubmitted,
  onSubmit,
}) => {
  const [typedText, setTypedText] = useState(selectedAnswer || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedText.trim() || isAnswerSubmitted) return;
    onSubmit(typedText.trim().toLowerCase());
  };

  const isCorrect =
    isAnswerSubmitted &&
    (selectedAnswer?.toLowerCase() === (question.correctAnswer as string).toLowerCase());

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

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col items-center">
        <div className="relative w-full mb-4">
          <input
            type="text"
            disabled={isAnswerSubmitted}
            value={typedText}
            onChange={(e) => setTypedText(e.target.value)}
            placeholder="Type word here..."
            className={`w-full py-3.5 px-5 text-center font-display font-extrabold text-2xl sm:text-3xl rounded-2xl border-3 transition-all outline-none ${
              isAnswerSubmitted
                ? isCorrect
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                  : 'border-rose-400 bg-rose-50 text-rose-900'
                : 'border-slate-300 focus:border-blue-500 bg-white text-slate-900 focus:ring-4 focus:ring-blue-100'
            }`}
            autoFocus
          />

          {isAnswerSubmitted && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              {isCorrect ? (
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                  <Check className="w-5 h-5" strokeWidth={3} />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center">
                  <X className="w-5 h-5" strokeWidth={3} />
                </div>
              )}
            </div>
          )}
        </div>

        {!isAnswerSubmitted && (
          <button
            type="submit"
            disabled={!typedText.trim()}
            className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-display font-bold text-base shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Submit Word</span>
            <Send className="w-4 h-4" />
          </button>
        )}
      </form>
    </div>
  );
};
