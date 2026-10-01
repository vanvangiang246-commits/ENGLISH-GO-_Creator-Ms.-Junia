import React, { useState, useEffect, useMemo } from 'react';
import {
  ArrowLeft,
  Clock,
  Sparkles,
  Layers,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Trophy,
  Star,
  ChevronRight,
  BookOpen,
  Volume2,
  FastForward,
} from 'lucide-react';
import {
  ProgramInfo,
  UnitItem,
  QuestionPackageCount,
  DifficultyLevelId,
  DIFFICULTY_OPTIONS,
} from '../types/curriculum';
import { QuizQuestion, UserAnswerRecord, SkillScoreSummary } from '../types/quiz';
import { generateQuestionSession } from '../data/questionEngine';
import { soundEffects } from '../utils/audioEffects';
import { getRandomPraise, getRandomEncouragement } from '../utils/feedbackGenerator';
import { evaluateSpokenPhrase } from '../utils/speakingEvaluator';
import { validateReconstructedSentence, validateCompletedSentence } from '../utils/sentenceValidator';
import { enforceSingleCorrectAnswer } from '../utils/singleAnswerValidator';
import {
  auditAndRegenerateQuestion,
  validateQuestionStrictGrammarAndMeaning,
} from '../utils/questionValidator';

// Interactive Question Component views
import { ImageChoiceView } from './quiz/ImageChoiceView';
import { LookAndChooseView } from './quiz/LookAndChooseView';
import { ListenAndChooseView } from './quiz/ListenAndChooseView';
import { MissingLetterView } from './quiz/MissingLetterView';
import { TypeWordView } from './quiz/TypeWordView';
import { WordOrderView } from './quiz/WordOrderView';
import { MatchingPairsView } from './quiz/MatchingPairsView';
import { TrueFalseView } from './quiz/TrueFalseView';
import { SpeakingView } from './quiz/SpeakingView';
import { StudentInfo, StudentAttemptRecord } from '../types/student';
import {
  getCurrentStudent,
  saveAttemptRecord,
  generateAttemptId,
  generateStudentId,
  formatTimeSpent,
} from '../utils/studentStorage';

interface PracticeSessionPageProps {
  program: ProgramInfo;
  unit: UnitItem;
  questionCount: QuestionPackageCount;
  difficulty: DifficultyLevelId;
  student?: StudentInfo | null;
  onBackToSetup: () => void;
  onNavigateHome: () => void;
}

export const PracticeSessionPage: React.FC<PracticeSessionPageProps> = ({
  program,
  unit,
  questionCount,
  difficulty,
  student,
  onBackToSetup,
  onNavigateHome,
}) => {
  // Session Question List
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionStartTime] = useState<Date>(() => new Date());
  const [studentInfo] = useState<StudentInfo | null>(() => student || getCurrentStudent());
  const hasSavedRef = React.useRef(false);

  // Current question interaction state
  const [selectedAnswer, setSelectedAnswer] = useState<any>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');

  // Results map: questionId -> UserAnswerRecord
  const [userAnswers, setUserAnswers] = useState<Record<string, UserAnswerRecord>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  // Initialize or restart session
  const initializeSession = () => {
    const list = generateQuestionSession(unit.id, difficulty, questionCount);
    // Guarantees every question in session has passed strict Grammar & Meaning Validation + single correct answer enforcement
    const validatedList = list.map((q, idx) => {
      const single = enforceSingleCorrectAnswer(q).question;
      return auditAndRegenerateQuestion(single, unit.id, difficulty, list, idx + 1);
    });
    setQuestions(validatedList);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setUserAnswers({});
    setIsCompleted(false);
    setIsNavigating(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    initializeSession();
  }, [unit.id, difficulty, questionCount]);

  // Mandatory Pre-Display Validation: verify and auto-regenerate if invalid
  const rawQuestion = questions[currentIndex];
  const currentQuestion = useMemo(() => {
    if (!rawQuestion) return null;
    return auditAndRegenerateQuestion(rawQuestion, unit.id, difficulty, questions, currentIndex + 1);
  }, [rawQuestion, unit.id, difficulty, currentIndex]);
  const currentDiff = DIFFICULTY_OPTIONS.find((d) => d.id === difficulty);

  // Handle Answer Selection
  const handleSelectAnswer = (ans: any) => {
    if (isAnswerSubmitted || !currentQuestion) return;
    setSelectedAnswer(ans);

    // Auto submit for single-click choice questions (image_choice, look_and_choose, listen_and_choose, true_false, missing_letter)
    if (
      currentQuestion.questionType === 'image_choice' ||
      currentQuestion.questionType === 'look_and_choose' ||
      currentQuestion.questionType === 'listen_and_choose' ||
      currentQuestion.questionType === 'true_false' ||
      currentQuestion.questionType === 'missing_letter'
    ) {
      evaluateAnswer(ans);
    }
  };

  // Evaluate Answer
  const evaluateAnswer = (ans: any) => {
    if (!currentQuestion || isAnswerSubmitted) return;

    let isCorrect = false;

    if (currentQuestion.questionType === 'word_order') {
      // 5. When student submits, reconstruct sentence from selected tokens and compare with validated original sentence
      const placedTokens = Array.isArray(ans) ? ans : [];
      const reconstructed = placedTokens.join(' ').trim();
      const originalTargetSentence = (
        currentQuestion.wordOrderData?.correctSentence ||
        (Array.isArray(currentQuestion.correctAnswer) ? currentQuestion.correctAnswer.join(' ') : String(currentQuestion.correctAnswer || ''))
      ).trim();

      // 6. Validate grammar, meaning, punctuation and word order BEFORE marking CORRECT
      const valResult = validateReconstructedSentence(reconstructed, originalTargetSentence);

      // Verify token-by-token alignment
      const tokensMatch =
        Array.isArray(currentQuestion.correctAnswer) &&
        placedTokens.length === currentQuestion.correctAnswer.length &&
        placedTokens.every((t: string, idx: number) => t === (currentQuestion.correctAnswer as string[])[idx]);

      isCorrect = valResult.isValid && valResult.isCorrect && tokensMatch;
    } else if (currentQuestion.questionType === 'matching_pairs') {
      const correctPairs = currentQuestion.correctAnswer as string[];
      isCorrect =
        Array.isArray(ans) &&
        ans.length === correctPairs.length &&
        ans.every((p: string) => correctPairs.includes(p));
    } else if (currentQuestion.questionType === 'type_word') {
      isCorrect =
        typeof ans === 'string' &&
        ans.trim().toLowerCase() === (currentQuestion.correctAnswer as string).toLowerCase();
    } else if (currentQuestion.questionType === 'missing_letter') {
      // Normalize comparison: lowercase, trim spaces, strip any technical prefixes
      const userLetter = typeof ans === 'string' ? ans.replace(/^opt_/, '').trim().toLowerCase() : '';
      const targetLetter = (typeof currentQuestion.correctAnswer === 'string'
        ? currentQuestion.correctAnswer.replace(/^opt_/, '')
        : ''
      ).trim().toLowerCase();
      isCorrect = userLetter === targetLetter;
    } else if (currentQuestion.questionType === 'speaking') {
      if (typeof ans === 'object' && ans !== null && typeof ans.isCorrect === 'boolean') {
        isCorrect = ans.isCorrect;
      } else if (typeof ans === 'string') {
        const target =
          currentQuestion.speakingData?.targetPhrase ||
          (typeof currentQuestion.correctAnswer === 'string' ? currentQuestion.correctAnswer : '') ||
          currentQuestion.audioText ||
          currentQuestion.promptText ||
          '';
        const variants = currentQuestion.speakingData?.acceptableVariants || [];
        const evalRes = evaluateSpokenPhrase(String(target), ans, variants);
        isCorrect = evalRes.isCorrect;
      } else {
        isCorrect = false;
      }
    } else {
      isCorrect = ans === currentQuestion.correctAnswer;
      // Rule 8: Do not mark an answer correct unless the complete sentence is grammatically and semantically correct
      if (isCorrect && currentQuestion.promptText && /_{2,}|\.{3,}/.test(currentQuestion.promptText)) {
        const sentenceCheck = validateCompletedSentence(currentQuestion.promptText, String(ans));
        if (!sentenceCheck.isValid) {
          isCorrect = false;
        }
      }
    }

    if (isCorrect) {
      soundEffects.playCorrect();
      setFeedbackMessage(getRandomPraise());
    } else {
      soundEffects.playEncouraging();
      setFeedbackMessage(getRandomEncouragement());
    }

    let finalExplanation = currentQuestion.explanation;
    if (currentQuestion.questionType === 'word_order') {
      const targetSentence = (
        currentQuestion.wordOrderData?.correctSentence ||
        (Array.isArray(currentQuestion.correctAnswer) ? currentQuestion.correctAnswer.join(' ') : String(currentQuestion.correctAnswer || ''))
      ).trim();
      finalExplanation = isCorrect
        ? `Super! The correct sentence is "${targetSentence}".`
        : `Not quite right. The correct sentence is "${targetSentence}".`;
    } else if (currentQuestion.questionType === 'speaking') {
      const targetPhrase =
        currentQuestion.speakingData?.targetPhrase ||
        (typeof currentQuestion.correctAnswer === 'string' ? currentQuestion.correctAnswer : '') ||
        currentQuestion.audioText ||
        '';
      const transcript =
        typeof ans === 'object' && ans !== null && 'transcript' in ans
          ? String(ans.transcript || '').trim()
          : typeof ans === 'string'
          ? ans.trim()
          : '';

      if (isCorrect) {
        finalExplanation = `Great pronunciation! You said "${targetPhrase}" accurately.`;
      } else if (transcript) {
        finalExplanation = `You said: "${transcript}". Target was "${targetPhrase}". Try speaking again!`;
      } else {
        finalExplanation = `No speech detected. The target was "${targetPhrase}". Tap the microphone and try again!`;
      }
    }

    const record: UserAnswerRecord = {
      questionId: currentQuestion.id,
      questionType: currentQuestion.questionType,
      skill: currentQuestion.skill,
      userAnswer: ans,
      isCorrect,
      isSkipped: false,
      explanation: finalExplanation,
    };

    setUserAnswers((prev) => ({ ...prev, [currentQuestion.id]: record }));
    setIsAnswerSubmitted(true);
  };

  // Retry Current Question (for speaking practice or retry allowed questions)
  const handleRetryCurrentQuestion = () => {
    if (!currentQuestion) return;
    setIsAnswerSubmitted(false);
    setSelectedAnswer(null);
    setFeedbackMessage('');
    setUserAnswers((prev) => {
      const copy = { ...prev };
      delete copy[currentQuestion.id];
      return copy;
    });
  };

  // Next Question
  const handleNext = () => {
    if (isNavigating) return;
    setIsNavigating(true);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
      setFeedbackMessage('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => setIsNavigating(false), 250);
    } else {
      setIsCompleted(true);
      soundEffects.playVictory();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsNavigating(false);
    }
  };

  // Skip Question (optional escape route)
  const handleSkip = () => {
    if (isNavigating || !currentQuestion) return;
    setIsNavigating(true);

    // Record as skipped: NOT counted as correct, NOT counted as incorrect
    const record: UserAnswerRecord = {
      questionId: currentQuestion.id,
      questionType: currentQuestion.questionType,
      skill: currentQuestion.skill,
      userAnswer: 'SKIPPED',
      isCorrect: false,
      isSkipped: true,
      explanation: currentQuestion.explanation,
    };

    setUserAnswers((prev) => ({ ...prev, [currentQuestion.id]: record }));

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
      setFeedbackMessage('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => setIsNavigating(false), 250);
    } else {
      setIsCompleted(true);
      soundEffects.playVictory();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsNavigating(false);
    }
  };

  // Calculate Final Stats
  const stats = useMemo(() => {
    const total = questions.length;
    const answered = Object.values(userAnswers);
    const correctCount = answered.filter((a) => a.isCorrect && !a.isSkipped).length;
    const skippedCount = answered.filter((a) => a.isSkipped).length;
    const incorrectCount = answered.filter((a) => !a.isCorrect && !a.isSkipped).length;
    const percentage = total > 0 ? Math.round((correctCount / total) * 100) : 0;

    // By Skill breakdown
    const skillsMap: Record<string, { correct: number; total: number }> = {};
    answered.forEach((a) => {
      if (!skillsMap[a.skill]) {
        skillsMap[a.skill] = { correct: 0, total: 0 };
      }
      skillsMap[a.skill].total += 1;
      if (a.isCorrect && !a.isSkipped) skillsMap[a.skill].correct += 1;
    });

    const skillSummaries: SkillScoreSummary[] = Object.entries(skillsMap).map(
      ([skill, val]) => ({
        skill: skill as any,
        correct: val.correct,
        total: val.total,
        percentage: val.total > 0 ? Math.round((val.correct / val.total) * 100) : 0,
      })
    );

    return { total, correctCount, incorrectCount, skippedCount, percentage, skillSummaries };
  }, [questions, userAnswers]);

  if (questions.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <h2 className="text-xl font-bold text-slate-800 mb-2">Preparing Questions...</h2>
        <p className="text-sm text-slate-500 mb-4">
          Loading verified question engine for {unit.displayName}.
        </p>
        <button
          onClick={onBackToSetup}
          className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-sm cursor-pointer"
        >
          Return to Setup
        </button>
      </div>
    );
  }

  // RESULTS SCREEN
  if (isCompleted) {
    const stars = stats.percentage >= 85 ? 3 : stats.percentage >= 60 ? 2 : 1;

    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        {/* Results Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md text-center">
          <div className="w-20 h-20 rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4 text-4xl shadow-sm">
            🏆
          </div>

          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
            {program.code} · {unit.displayName}
          </div>

          <h1 className="font-display font-black text-3xl sm:text-4xl text-slate-900 mb-2">
            PRACTICE COMPLETE!
          </h1>

          <p className="text-sm text-slate-600 mb-6">
            Level: <strong>{currentDiff?.label} ({currentDiff?.tag})</strong> · Package: <strong>{questionCount} Questions</strong>
          </p>

          {/* Star Rating Display */}
          <div className="flex items-center justify-center gap-2 mb-6">
            {[1, 2, 3].map((starIdx) => (
              <div
                key={starIdx}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                  starIdx <= stars
                    ? 'bg-amber-100 text-amber-500 scale-105 shadow-xs'
                    : 'bg-slate-100 text-slate-300'
                }`}
              >
                <Star className="w-8 h-8 fill-current" />
              </div>
            ))}
          </div>

          {/* Score Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-2xl bg-blue-50 border border-blue-200 text-blue-800 font-display font-black text-xl mb-6 shadow-2xs">
            <span>Score: {stats.percentage}%</span>
            <span className="text-xs font-bold text-blue-600">({stats.correctCount} / {stats.total})</span>
          </div>

          {/* Core Score Statistics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Total Questions
              </span>
              <span className="font-display font-black text-2xl sm:text-3xl text-slate-800">
                {stats.total}
              </span>
              <span className="text-[11px] text-slate-500 block">Package</span>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block">
                Correct
              </span>
              <span className="font-display font-black text-2xl sm:text-3xl text-emerald-700">
                {stats.correctCount}
              </span>
              <span className="text-[11px] text-emerald-600 block">Answers</span>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200">
              <span className="text-xs font-bold text-rose-600 uppercase tracking-wider block">
                Incorrect
              </span>
              <span className="font-display font-black text-2xl sm:text-3xl text-rose-700">
                {stats.incorrectCount}
              </span>
              <span className="text-[11px] text-rose-600 block">To Review</span>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block">
                Skipped
              </span>
              <span className="font-display font-black text-2xl sm:text-3xl text-amber-700">
                {stats.skippedCount}
              </span>
              <span className="text-[11px] text-amber-600 block">Skipped</span>
            </div>
          </div>

          {/* Skills Breakdown */}
          {stats.skillSummaries.length > 0 && (
            <div className="text-left bg-slate-50 rounded-2xl p-5 border border-slate-200 mb-8">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Skills Practised</span>
              </h3>
              <div className="space-y-2.5">
                {stats.skillSummaries.map((s) => (
                  <div key={s.skill} className="flex items-center justify-between text-xs sm:text-sm font-semibold">
                    <span className="text-slate-700 capitalize">
                      {s.skill.toLowerCase()}
                    </span>
                    <span className="text-slate-900 bg-white px-2.5 py-0.5 rounded-md border border-slate-200">
                      {s.correct} / {s.total} correct
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons: Try Again & Back to Unit */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={initializeSession}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-display font-black text-base shadow-sm transition-all duration-150 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>TRY AGAIN</span>
            </button>

            <button
              onClick={onBackToSetup}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 border-2 border-slate-200 font-display font-bold text-base shadow-2xs transition-all duration-150 active:scale-95 cursor-pointer"
            >
              BACK TO SETUP
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <h2 className="text-xl font-bold text-slate-800 mb-2">Preparing Question...</h2>
        <p className="text-sm text-slate-500 mb-4">
          Running strict grammar and meaning validation.
        </p>
      </div>
    );
  }

  // ACTIVE QUIZ RUNNER SCREEN
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Top Header & Context */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <button
          onClick={onBackToSetup}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit Practice</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-bold">
          <span className="px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-800">
            {unit.displayName}
          </span>
          <span className="px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-800">
            {currentDiff?.label}
          </span>
        </div>
      </div>

      {/* Progress Bar & Counter */}
      <div className="mb-6 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center justify-between mb-2">
          <span className="font-display font-black text-base sm:text-lg text-slate-800">
            Question {currentIndex + 1} / {questions.length}
          </span>
          <span className="text-xs font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
            {Math.round(((currentIndex + 1) / questions.length) * 100)}%
          </span>
        </div>
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-6">
        {/* Instruction Banner */}
        <div className="mb-6 text-center">
          <h2 className="font-display font-extrabold text-xl sm:text-2xl text-slate-900">
            {currentQuestion.instruction}
          </h2>
        </div>

        {/* Dynamic Question Body */}
        {currentQuestion.questionType === 'image_choice' && (
          <ImageChoiceView
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            isAnswerSubmitted={isAnswerSubmitted}
            onSelect={handleSelectAnswer}
          />
        )}

        {currentQuestion.questionType === 'look_and_choose' && (
          <LookAndChooseView
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            isAnswerSubmitted={isAnswerSubmitted}
            onSelect={handleSelectAnswer}
          />
        )}

        {currentQuestion.questionType === 'listen_and_choose' && (
          <ListenAndChooseView
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            isAnswerSubmitted={isAnswerSubmitted}
            onSelect={handleSelectAnswer}
          />
        )}

        {currentQuestion.questionType === 'missing_letter' && (
          <MissingLetterView
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            isAnswerSubmitted={isAnswerSubmitted}
            onSelect={handleSelectAnswer}
          />
        )}

        {currentQuestion.questionType === 'type_word' && (
          <TypeWordView
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            isAnswerSubmitted={isAnswerSubmitted}
            onSubmit={(typed) => {
              setSelectedAnswer(typed);
              evaluateAnswer(typed);
            }}
          />
        )}

        {currentQuestion.questionType === 'word_order' && (
          <WordOrderView
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            isAnswerSubmitted={isAnswerSubmitted}
            onSubmit={(words) => {
              setSelectedAnswer(words);
              evaluateAnswer(words);
            }}
          />
        )}

        {currentQuestion.questionType === 'matching_pairs' && (
          <MatchingPairsView
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            isAnswerSubmitted={isAnswerSubmitted}
            onSubmit={(pairs) => {
              setSelectedAnswer(pairs);
              evaluateAnswer(pairs);
            }}
          />
        )}

        {currentQuestion.questionType === 'true_false' && (
          <TrueFalseView
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            isAnswerSubmitted={isAnswerSubmitted}
            onSelect={handleSelectAnswer}
          />
        )}

        {currentQuestion.questionType === 'speaking' && (
          <SpeakingView
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            isAnswerSubmitted={isAnswerSubmitted}
            onNext={handleNext}
            onRetry={handleRetryCurrentQuestion}
            isLastQuestion={currentIndex + 1 >= questions.length}
            isNavigating={isNavigating}
            onSubmit={(captured) => {
              setSelectedAnswer(captured);
              evaluateAnswer(captured);
            }}
          />
        )}
      </div>

      {/* Immediate Feedback Card */}
      {isAnswerSubmitted && (
        <div
          className={`p-5 sm:p-6 rounded-3xl border-2 transition-all animate-in fade-in slide-in-from-bottom-3 duration-200 mb-6 ${
            userAnswers[currentQuestion.id]?.isCorrect
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
              : 'bg-amber-50 border-amber-300 text-amber-950'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                {userAnswers[currentQuestion.id]?.isCorrect ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                ) : (
                  <XCircle className="w-6 h-6 text-amber-600" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span
                    className={`text-xs font-black px-2 py-0.5 rounded-md uppercase tracking-wider ${
                      userAnswers[currentQuestion.id]?.isCorrect
                        ? 'bg-emerald-200 text-emerald-900'
                        : 'bg-amber-200 text-amber-900'
                    }`}
                  >
                    {userAnswers[currentQuestion.id]?.isCorrect ? '✓ Correct' : '↻ Try again'}
                  </span>
                  <h3 className="font-display font-black text-xl text-slate-900">
                    {feedbackMessage}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
                  {userAnswers[currentQuestion.id]?.explanation || currentQuestion.explanation}
                </p>
              </div>
            </div>

            <button
              onClick={handleNext}
              disabled={isNavigating}
              className="px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-display font-black text-base shadow-sm hover:shadow-md transition-all duration-150 active:scale-95 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap self-end sm:self-center disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={currentIndex + 1 < questions.length ? 'Next Question' : 'Finish Practice'}
            >
              <span>{currentIndex + 1 < questions.length ? 'NEXT QUESTION →' : 'FINISH PRACTICE'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Optional Skip Question escape route */}
      <div className="flex justify-center mt-3 mb-8">
        <button
          type="button"
          onClick={handleSkip}
          disabled={isNavigating}
          className="text-xs sm:text-sm font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-200/70 px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 disabled:opacity-50"
          aria-label="Skip question"
        >
          <FastForward className="w-3.5 h-3.5 text-slate-400" />
          <span>SKIP QUESTION</span>
        </button>
      </div>
    </div>
  );
};
