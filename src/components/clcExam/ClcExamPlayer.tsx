import React, { useState, useEffect } from 'react';
import {
  Clock,
  Flag,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  BookOpen,
  Volume2,
  Send,
  X,
  RotateCcw,
} from 'lucide-react';
import { ClcExamQuestion, ClcExamUserAnswer } from '../../types/clcExamBank';
import { ClcUnderlineRenderer } from './ClcUnderlineRenderer';

interface ClcExamPlayerProps {
  examTitle: string;
  questions: ClcExamQuestion[];
  timeLimitMinutes?: number;
  onFinishExam: (answers: Record<string, ClcExamUserAnswer>, timeSpentSeconds: number) => void;
  onExitExam: () => void;
}

export const ClcExamPlayer: React.FC<ClcExamPlayerProps> = ({
  examTitle,
  questions,
  timeLimitMinutes,
  onFinishExam,
  onExitExam,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, ClcExamUserAnswer>>({});
  const [flaggedIds, setFlaggedIds] = useState<Set<string>>(new Set());
  const [secondsRemaining, setSecondsRemaining] = useState<number>(
    (timeLimitMinutes || 45) * 60
  );
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [showExitModal, setShowExitModal] = useState<boolean>(false);

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentIndex];

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
      if (timeLimitMinutes) {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            // Auto submit when time runs out
            handleFinalSubmit();
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLimitMinutes]);

  // Keyboard navigation & answering (A, B, C, D, Arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if modal is open
      if (showSubmitModal || showExitModal) return;

      const key = e.key.toUpperCase();
      if (['A', 'B', 'C', 'D'].includes(key)) {
        handleSelectOption(key as 'A' | 'B' | 'C' | 'D');
      } else if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        if (currentIndex < totalQuestions - 1) {
          setCurrentIndex((prev) => prev + 1);
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        if (currentIndex > 0) {
          setCurrentIndex((prev) => prev - 1);
        }
      } else if (key === 'F') {
        toggleFlagCurrent();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, totalQuestions, currentQuestion, showSubmitModal, showExitModal]);

  const handleSelectOption = (letter: 'A' | 'B' | 'C' | 'D') => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        questionId: currentQuestion.id,
        selectedAnswer: letter,
        isCorrect: letter === currentQuestion.correctAnswer,
        timeSpentSeconds: secondsElapsed,
      },
    }));
  };

  const toggleFlagCurrent = () => {
    setFlaggedIds((prev) => {
      const next = new Set(prev);
      if (next.has(currentQuestion.id)) {
        next.delete(currentQuestion.id);
      } else {
        next.add(currentQuestion.id);
      }
      return next;
    });
  };

  const answeredCount = Object.keys(userAnswers).length;
  const unansweredCount = totalQuestions - answeredCount;

  const handleFinalSubmit = () => {
    onFinishExam(userAnswers, secondsElapsed);
  };

  // Format time MM:SS
  const formatTime = (totalSecs: number) => {
    const m = Math.floor(totalSecs / 60);
    const s = totalSecs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isTimeCritical = timeLimitMinutes && secondsRemaining < 300; // Under 5 mins

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top Fixed Exam Header Bar */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-xs px-4 sm:px-6 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          {/* Exam Title & Exit */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowExitModal(true)}
              className="text-slate-500 hover:text-slate-800 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
              title="Thoát bài thi"
            >
              <X className="w-5 h-5" />
            </button>
            <div>
              <div className="text-xs font-bold text-rose-600 uppercase tracking-wider">
                CLC EXAM BANK – GRADE 5
              </div>
              <h1 className="text-sm sm:text-base font-extrabold text-slate-900 truncate max-w-xs sm:max-w-md">
                {examTitle}
              </h1>
            </div>
          </div>

          {/* Central Timer & Status */}
          <div className="flex items-center gap-4">
            {timeLimitMinutes && (
              <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-sm font-bold font-mono transition-colors ${
                  isTimeCritical
                    ? 'bg-rose-50 border-rose-300 text-rose-700 animate-pulse'
                    : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}
              >
                <Clock className="w-4 h-4 text-rose-600" />
                <span>{formatTime(secondsRemaining)}</span>
              </div>
            )}

            {/* Answered Progress Counter */}
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>
                Đã làm: <b className="text-slate-900">{answeredCount}</b>/{totalQuestions}
              </span>
            </div>

            {/* Submit Button */}
            <button
              onClick={() => setShowSubmitModal(true)}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Send className="w-4 h-4" />
              <span>Nộp bài</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Examination Workspace */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Context Passage (if reading or cloze) */}
        {currentQuestion.contextPassage ? (
          <div className="lg:col-span-5 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col max-h-[75vh] overflow-y-auto">
            <div className="flex items-center gap-2 text-rose-700 font-bold text-xs uppercase tracking-wider mb-2">
              <BookOpen className="w-4 h-4" />
              <span>
                {currentQuestion.contextPassage.passageType === 'cloze'
                  ? 'Đoạn văn khuyết từ (Cloze Text)'
                  : 'Văn bản đọc hiểu (Reading Passage)'}
              </span>
            </div>
            {currentQuestion.contextPassage.title && (
              <h3 className="font-extrabold text-base sm:text-lg text-slate-900 mb-3 pb-2 border-b border-slate-100">
                {currentQuestion.contextPassage.title}
              </h3>
            )}
            <div className="text-sm text-slate-700 leading-relaxed space-y-3 font-serif">
              {currentQuestion.contextPassage.text}
            </div>
          </div>
        ) : null}

        {/* Right Column (or Full Width): Question Content & Option Cards */}
        <div
          className={`${
            currentQuestion.contextPassage ? 'lg:col-span-7' : 'lg:col-span-12 max-w-4xl mx-auto w-full'
          } flex flex-col space-y-5`}
        >
          {/* Question Meta Badge Bar */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-rose-600 text-white font-extrabold text-xs">
                  Câu {currentIndex + 1} / {totalQuestions}
                </span>

                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-50 text-rose-800 border border-rose-200 text-xs font-bold">
                  <span>{currentQuestion.typeIcon}</span>
                  <span>{currentQuestion.typeLabelVi}</span>
                </span>

                {currentQuestion.level === 'grade6_7_extension' ? (
                  <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 font-semibold text-[11px]">
                    ⭐ Phân loại Lớp 6–7
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 font-semibold text-[11px]">
                    Grade 5+ Nâng cao
                  </span>
                )}
              </div>

              {/* Flag Question Button */}
              <button
                onClick={toggleFlagCurrent}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-colors ${
                  flaggedIds.has(currentQuestion.id)
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Flag
                  className={`w-3.5 h-3.5 ${
                    flaggedIds.has(currentQuestion.id)
                      ? 'fill-amber-500 text-amber-600'
                      : 'text-slate-400'
                  }`}
                />
                <span>
                  {flaggedIds.has(currentQuestion.id) ? 'Đã đánh dấu' : 'Đánh dấu (F)'}
                </span>
              </button>
            </div>

            {/* Instruction */}
            <div className="mb-4">
              <p className="text-xs font-semibold text-slate-500 mb-0.5">
                {currentQuestion.instruction}
              </p>
              <p className="text-xs font-medium text-slate-400 italic">
                ({currentQuestion.instructionVi})
              </p>
            </div>

            {/* Question Prompt */}
            <div className="bg-slate-50 rounded-xl p-4 sm:p-5 border border-slate-200/80 mb-6">
              <div className="text-base sm:text-lg font-bold text-slate-900 whitespace-pre-line leading-relaxed">
                <ClcUnderlineRenderer
                  text={currentQuestion.displayed_question_text || currentQuestion.promptText}
                  underlinedPart={currentQuestion.underlinedPart}
                />
              </div>
            </div>

            {/* 4 Clickable Options (Strictly Frozen Order) */}
            <div className="space-y-3">
              {currentQuestion.options.map((option) => {
                const isSelected =
                  userAnswers[currentQuestion.id]?.selectedAnswer === option.id;

                return (
                  <button
                    key={option.id}
                    onClick={() => handleSelectOption(option.id)}
                    className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between group active:scale-[0.99] ${
                      isSelected
                        ? 'border-rose-500 bg-rose-50/80 text-rose-950 font-bold shadow-xs ring-2 ring-rose-400'
                        : 'border-slate-200 bg-white hover:border-slate-300 text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <span
                        className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-rose-600 text-white'
                            : 'bg-slate-100 text-slate-700 group-hover:bg-slate-200'
                        }`}
                      >
                        {option.id}
                      </span>
                      <span className="text-sm sm:text-base leading-snug">
                        <ClcUnderlineRenderer
                          text={option.text}
                          underlinedPart={
                            currentQuestion.type === 'pronunciation'
                              ? currentQuestion.underlinedPart
                              : undefined
                          }
                        />
                      </span>
                    </div>

                    {isSelected ? (
                      <CheckCircle2 className="w-5 h-5 text-rose-600 shrink-0" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border border-slate-300 shrink-0 group-hover:border-slate-400" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Bottom Nav Prev / Next */}
            <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-100">
              <button
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Câu trước</span>
              </button>

              <span className="text-xs font-semibold text-slate-400 hidden sm:inline">
                Nhấn phím [A], [B], [C], [D] hoặc phím mũi tên [←] [→] để chuyển câu
              </span>

              {currentIndex < totalQuestions - 1 ? (
                <button
                  onClick={() => setCurrentIndex((prev) => Math.min(totalQuestions - 1, prev + 1))}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold shadow-xs transition-colors"
                >
                  <span>Câu tiếp theo</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setShowSubmitModal(true)}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-bold shadow-xs transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>Hoàn thành & Nộp bài</span>
                </button>
              )}
            </div>
          </div>

          {/* Question Palette Drawer (1 to N) */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Bảng câu hỏi ({totalQuestions} câu)
              </h4>
              <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Đã làm
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Đánh dấu
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-200" /> Chưa làm
                </span>
              </div>
            </div>

            <div className="grid grid-cols-5 sm:grid-cols-10 md:grid-cols-10 lg:grid-cols-10 gap-2">
              {questions.map((q, idx) => {
                const isCurrent = idx === currentIndex;
                const isAnswered = Boolean(userAnswers[q.id]);
                const isFlagged = flaggedIds.has(q.id);

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`relative h-9 rounded-lg font-bold text-xs transition-all flex items-center justify-center ${
                      isCurrent
                        ? 'ring-2 ring-rose-500 ring-offset-1 bg-slate-900 text-white font-extrabold'
                        : isFlagged
                        ? 'bg-amber-100 text-amber-900 border border-amber-300 font-extrabold'
                        : isAnswered
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                    }`}
                  >
                    <span>{idx + 1}</span>
                    {isFlagged && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-500" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {/* Submit Confirmation Dialog Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="font-extrabold text-xl text-slate-900 mb-2">
              Xác nhận nộp bài thi
            </h3>
            <p className="text-sm text-slate-600 mb-4 leading-relaxed">
              Em có chắc chắn muốn nộp bài thi ngay bây giờ? Sau khi nộp, hệ thống sẽ chấm điểm và
              hiển thị đáp án cùng lời giải chi tiết.
            </p>

            <div className="bg-slate-50 rounded-2xl p-4 mb-6 space-y-2 border border-slate-200/80 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-600">Số câu đã làm:</span>
                <span className="font-bold text-emerald-700">
                  {answeredCount} / {totalQuestions} câu
                </span>
              </div>
              {unansweredCount > 0 && (
                <div className="flex justify-between text-rose-600 font-bold">
                  <span>Số câu chưa làm:</span>
                  <span>{unansweredCount} câu</span>
                </div>
              )}
              {flaggedIds.size > 0 && (
                <div className="flex justify-between text-amber-700 font-bold">
                  <span>Số câu đánh dấu xem lại:</span>
                  <span>{flaggedIds.size} câu</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-slate-600">Thời gian làm bài:</span>
                <span className="font-bold text-slate-900">
                  {formatTime(secondsElapsed)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 py-3 px-4 rounded-xl border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors"
              >
                Tiếp tục làm bài
              </button>
              <button
                onClick={handleFinalSubmit}
                className="flex-1 py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Nộp bài ngay</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Exit Confirmation Dialog Modal */}
      {showExitModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150 text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-3">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-lg text-slate-900 mb-1">
              Thoát bài thi hiện tại?
            </h3>
            <p className="text-xs text-slate-600 mb-6">
              Kết quả làm bài sẽ không được lưu nếu em thoát bây giờ. Em có muốn thoát về màn hình chọn đề?
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowExitModal(false)}
                className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors"
              >
                Ở lại làm tiếp
              </button>
              <button
                onClick={onExitExam}
                className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs transition-colors"
              >
                Xác nhận thoát
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
