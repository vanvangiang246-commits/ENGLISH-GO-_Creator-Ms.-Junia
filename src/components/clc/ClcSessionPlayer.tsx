import React, { useState, useEffect, useMemo } from 'react';
import {
  Volume2,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Lightbulb,
  Award,
  RotateCcw,
  BookOpen,
  ArrowLeft,
} from 'lucide-react';
import { ClcQuestion, ClcUserAnswer } from '../../types/clc';
import { soundEffects } from '../../utils/audioEffects';
import {
  sanitizeClcQuestionInPlace,
  validateSingleClcQuestion,
  processAndValidateClcQuestions,
  validateAndEnforceClcQuestion,
  getSanitizedAudioText,
} from '../../data/clcQuestionValidator';
import { classifyQuestionSkill, CLC_MIXED_SKILLS_INFO } from '../../data/clcQuestionEngine';

interface ClcSessionPlayerProps {
  questions: ClcQuestion[];
  onFinishSession: (answers: Record<string, ClcUserAnswer>, totalTimeSpent: number) => void;
  onExitSession: () => void;
}

export const ClcSessionPlayer: React.FC<ClcSessionPlayerProps> = ({
  questions,
  onFinishSession,
  onExitSession,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<string, ClcUserAnswer>>({});
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());
  const [sessionStartTime] = useState<number>(Date.now());
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Mandatory Final Validation layer across the entire question package
  const verifiedQuestions = useMemo(() => {
    return processAndValidateClcQuestions(questions);
  }, [questions]);

  const rawQ = verifiedQuestions[currentIndex];

  // Mandatory Double-Pass Validation on the individual question being displayed:
  // Generate -> Validate -> Correct/Regenerate -> Validate AGAIN -> Display
  const currentQ = useMemo(() => {
    if (!rawQ) return null;
    const enforced = validateAndEnforceClcQuestion(rawQ);
    return enforced.question;
  }, [rawQ]);

  useEffect(() => {
    setQuestionStartTime(Date.now());
    setSelectedOptionId(null);
    setIsAnswerChecked(false);
  }, [currentIndex]);

  if (!currentQ) {
    return null;
  }

  // Audio speech synthesis helper with sanitized text
  const handlePlayAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const speechText = getSanitizedAudioText(text);
      const utterance = new SpeechSynthesisUtterance(speechText);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      utterance.onstart = () => setIsPlayingAudio(true);
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSelectOption = (optId: string) => {
    if (isAnswerChecked) return;
    setSelectedOptionId(optId);
  };

  const handleCheckAnswer = () => {
    if (!selectedOptionId || isAnswerChecked) return;

    const timeSpent = Math.max(1, Math.round((Date.now() - questionStartTime) / 1000));
    const isCorrect = selectedOptionId === currentQ.correctAnswer;

    if (isCorrect) {
      soundEffects.playCorrect();
    } else {
      soundEffects.playEncouraging();
    }

    const answerRecord: ClcUserAnswer = {
      questionId: currentQ.id,
      userAnswer: selectedOptionId,
      isCorrect,
      timeSpentSeconds: timeSpent,
    };

    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: answerRecord,
    }));

    setIsAnswerChecked(true);
  };

  const handleNextQuestion = () => {
    if (currentIndex < verifiedQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Finish session
      const totalTime = Math.max(1, Math.round((Date.now() - sessionStartTime) / 1000));
      onFinishSession(userAnswers, totalTime);
    }
  };

  const currentAnsRecord = userAnswers[currentQ.id];
  const isCorrect = currentAnsRecord?.isCorrect;

  // Stage badge colors
  const stageBadge =
    currentQ.stage === 1
      ? { text: 'text-emerald-700', bg: 'bg-emerald-100', border: 'border-emerald-200' }
      : currentQ.stage === 2
      ? { text: 'text-sky-700', bg: 'bg-sky-100', border: 'border-sky-200' }
      : { text: 'text-rose-700', bg: 'bg-rose-100', border: 'border-rose-200' };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Top Bar: Progress and Quit */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <button
          onClick={onExitSession}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-100 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit Session</span>
        </button>

        {/* Progress Bar & Counter */}
        <div className="flex-1 max-w-xs sm:max-w-sm">
          <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-1">
            <span>
              Question {currentIndex + 1} of {verifiedQuestions.length}
            </span>
            <span>{Math.round(((currentIndex + 1) / verifiedQuestions.length) * 100)}%</span>
          </div>
          <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-rose-600 transition-all duration-300 rounded-full"
              style={{ width: `${((currentIndex + 1) / verifiedQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Unit Context Pill */}
        <div className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold">
          <span>{currentQ.unitContext.unitTitle}</span>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs mb-6">
        {/* Meta Header */}
        {(() => {
          const skillKey = classifyQuestionSkill(currentQ);
          const skillInfo = CLC_MIXED_SKILLS_INFO[skillKey];
          return (
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span
                className={`px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider border ${stageBadge.bg} ${stageBadge.text} ${stageBadge.border}`}
              >
                Stage {currentQ.stage} · {currentQ.gradeLevel}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-900 text-xs font-bold border border-indigo-200 inline-flex items-center gap-1.5">
                <span>{skillInfo.icon}</span>
                <span>{skillInfo.labelVi}</span>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-800 text-xs font-bold border border-rose-200">
                {currentQ.grammarRuleTitle}
              </span>
              <span className="ml-auto text-xs font-bold text-slate-400">
                Topic: {currentQ.unitContext.topic}
              </span>
            </div>
          );
        })()}

        {/* Instruction */}
        <div className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wide mb-3 flex items-center justify-between">
          <span>{currentQ.instruction}</span>
          <button
            onClick={() => handlePlayAudio((currentQ.promptContext ? currentQ.promptContext + '. ' : '') + currentQ.promptText)}
            disabled={isPlayingAudio}
            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
            title="Listen to pronunciation"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        {/* Short Reading Context if present */}
        {currentQ.promptContext && (
          <div className="mb-4 p-4 sm:p-5 rounded-2xl bg-indigo-50/80 border border-indigo-200 text-slate-800 leading-relaxed shadow-xs">
            <div className="text-xs font-extrabold uppercase tracking-wider text-indigo-700 flex items-center gap-1.5 mb-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Short Reading Context:</span>
            </div>
            <div className="text-sm sm:text-base font-medium whitespace-pre-line text-slate-800">
              {currentQ.promptContext}
            </div>
          </div>
        )}

        {/* Prompt Content depending on format */}
        {currentQ.format === 'sentence_transformation' ? (
          <div className="mb-6">
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-200 text-slate-900 font-display font-bold text-base sm:text-lg leading-relaxed mb-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-800 block mb-1">
                Original Sentence:
              </span>
              "{currentQ.promptText}"
            </div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1.5">
              <ArrowRight className="w-3.5 h-3.5 text-rose-600" />
              <span>Rewrite having the closest meaning:</span>
            </div>
          </div>
        ) : currentQ.format === 'sentence_scramble' ? (
          <div className="mb-6">
            <div className="p-4 sm:p-5 rounded-2xl bg-teal-50/70 border border-teal-200 text-slate-900 leading-relaxed mb-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-teal-800 block mb-2">
                🔀 Scrambled Words:
              </span>
              <div className="flex flex-wrap gap-2">
                {(currentQ.scrambleWords || currentQ.promptText.split(' / ')).map((token, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-white border border-teal-300 rounded-lg text-teal-950 font-bold text-xs sm:text-sm shadow-2xs"
                  >
                    {token}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1.5">
              <ArrowRight className="w-3.5 h-3.5 text-rose-600" />
              <span>Choose the sentence with the correct word order:</span>
            </div>
          </div>
        ) : currentQ.format === 'error_identification' ? (
          <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 font-display font-bold text-base sm:text-lg leading-relaxed">
            {currentQ.promptText}
          </div>
        ) : (
          <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 font-display font-bold text-base sm:text-lg leading-relaxed">
            {currentQ.promptText}
          </div>
        )}

        {/* Option Cards */}
        <div className="space-y-3 mb-6">
          {currentQ.options.map((opt) => {
            const isSelected = selectedOptionId === opt.id;
            const isCorrectOption = opt.id === currentQ.correctAnswer;

            let cardStyles =
              'border-slate-200/90 hover:border-rose-400 bg-white hover:bg-slate-50 text-slate-800';

            if (isSelected && !isAnswerChecked) {
              cardStyles = 'border-rose-600 bg-rose-50/80 text-rose-950 font-bold shadow-xs';
            }

            if (isAnswerChecked) {
              if (isCorrectOption) {
                cardStyles =
                  'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold shadow-xs';
              } else if (isSelected && !isCorrectOption) {
                cardStyles = 'border-rose-500 bg-rose-50 text-rose-950 font-bold';
              } else {
                cardStyles = 'border-slate-200 bg-slate-50/50 text-slate-400 opacity-60';
              }
            }

            return (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(opt.id)}
                disabled={isAnswerChecked}
                className={`w-full p-4 rounded-2xl border-2 transition-all duration-150 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-rose-300 ${cardStyles}`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${
                      isSelected && !isAnswerChecked
                        ? 'bg-rose-600 text-white'
                        : isAnswerChecked && isCorrectOption
                        ? 'bg-emerald-600 text-white'
                        : isAnswerChecked && isSelected && !isCorrectOption
                        ? 'bg-rose-600 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {opt.label || opt.id.toUpperCase().replace('OPT_', '')}
                  </span>
                  <span className="font-display font-semibold text-sm sm:text-base">
                    {opt.text}
                  </span>
                </div>

                {isAnswerChecked && (
                  <div>
                    {isCorrectOption && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                    {isSelected && !isCorrectOption && (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Action Button: Check Answer / Continue */}
        {!isAnswerChecked ? (
          <button
            onClick={handleCheckAnswer}
            disabled={!selectedOptionId}
            className={`w-full py-3.5 rounded-2xl font-display font-extrabold text-base transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer ${
              selectedOptionId
                ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-sm hover:shadow-md active:scale-[0.99]'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <span>CHECK ANSWER</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleNextQuestion}
            className="w-full py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-display font-extrabold text-base shadow-sm hover:shadow-md active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>
              {currentIndex < verifiedQuestions.length - 1 ? 'NEXT QUESTION →' : 'VIEW CLC RESULTS 🏆'}
            </span>
          </button>
        )}
      </div>

      {/* Post-Check Pedagogical Explanation & Exam Tip */}
      {isAnswerChecked && (
        <div
          className={`rounded-3xl p-6 sm:p-7 border-2 transition-all duration-200 ${
            isCorrect
              ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
              : 'bg-rose-50/80 border-rose-300 text-rose-950'
          }`}
        >
          <div className="flex items-center gap-2.5 mb-3 font-display font-extrabold text-lg">
            {isCorrect ? (
              <>
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                <span className="text-emerald-800">Excellent! Correct Answer</span>
              </>
            ) : (
              <>
                <XCircle className="w-6 h-6 text-rose-600" />
                <span className="text-rose-800">Not quite right! Review this rule:</span>
              </>
            )}
          </div>

          {/* Grammar Explanation in English */}
          <div className="text-sm font-medium mb-4 leading-relaxed bg-white/80 p-3.5 rounded-xl border border-slate-200/60">
            <strong className="block text-slate-900 mb-0.5">Grammar Explanation:</strong>
            {currentQ.explanation}
          </div>

          {/* Vietnamese Exam Tip (Bí quyết thi CLC) */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/90 text-amber-950 text-xs sm:text-sm font-medium leading-relaxed">
            <div className="flex items-center gap-1.5 font-bold text-amber-900 uppercase tracking-wide mb-1 text-xs">
              <Lightbulb className="w-4 h-4 text-amber-600 fill-amber-500" />
              <span>Bí quyết làm bài thi CLC (Exam Tip)</span>
            </div>
            {currentQ.grammarTipVi}
          </div>
        </div>
      )}
    </div>
  );
};
