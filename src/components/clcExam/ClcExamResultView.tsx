import React, { useState } from 'react';
import {
  Award,
  Clock,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  BookOpen,
  Filter,
  ArrowRight,
  TrendingUp,
  Layers,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { ClcExamResult, ClcExamQuestionType } from '../../types/clcExamBank';
import { ClcUnderlineRenderer } from './ClcUnderlineRenderer';

interface ClcExamResultViewProps {
  result: ClcExamResult;
  onRetakeExam: () => void;
  onNewExam: () => void;
  onBackToHome: () => void;
}

export const ClcExamResultView: React.FC<ClcExamResultViewProps> = ({
  result,
  onRetakeExam,
  onNewExam,
  onBackToHome,
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'incorrect' | 'correct'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const formatTime = (totalSecs: number) => {
    const m = Math.floor(totalSecs / 60);
    const s = totalSecs % 60;
    return `${m} phút ${s} giây`;
  };

  const filteredQuestions = result.questions.filter((q) => {
    const ans = result.userAnswers[q.id];
    const isCorrect = ans && ans.selectedAnswer === q.correctAnswer;
    if (filterMode === 'incorrect') return !isCorrect;
    if (filterMode === 'correct') return isCorrect;
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToHome}
          className="text-xs font-semibold text-slate-500 hover:text-rose-600 transition-colors"
        >
          ← Quay lại Trang chủ
        </button>
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
          Kết quả đánh giá năng lực CLC
        </span>
      </div>

      {/* Hero Score & Evaluation Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left: Overall Score Circle */}
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="w-32 h-32 rounded-3xl bg-gradient-to-tr from-rose-600 to-indigo-600 text-white flex flex-col items-center justify-center shadow-lg shadow-rose-200 shrink-0">
              <span className="text-3xl sm:text-4xl font-black font-display tracking-tight">
                {result.scorePercentage}%
              </span>
              <span className="text-xs font-semibold text-rose-100 mt-1">
                {result.correctCount}/{result.totalQuestions} CÂU
              </span>
            </div>

            <div>
              <div className="text-xs font-bold text-rose-600 uppercase tracking-wider mb-1">
                KẾT QUẢ BÀI THI KHẢO SÁT
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                {result.title}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-2 font-medium">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Thời gian làm bài: {formatTime(result.timeSpentSeconds)}</span>
                </span>
                <span>•</span>
                <span>
                  Tốc độ TB:{' '}
                  <b>
                    {result.totalQuestions > 0
                      ? Math.round(result.timeSpentSeconds / result.totalQuestions)
                      : 0}
                    s
                  </b>
                  /câu
                </span>
              </div>
            </div>
          </div>

          {/* Right: Quick Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
            <button
              onClick={onRetakeExam}
              className="py-3 px-5 rounded-xl border border-slate-200 hover:border-slate-300 font-bold text-xs sm:text-sm text-slate-700 bg-white hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4 text-slate-600" />
              <span>Làm lại đề này</span>
            </button>
            <button
              onClick={onNewExam}
              className="py-3 px-5 rounded-xl bg-rose-600 hover:bg-rose-700 font-bold text-xs sm:text-sm text-white shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Làm đề thi mới</span>
            </button>
          </div>
        </div>

        {/* Evaluation Tier Box */}
        <div
          className={`mt-8 p-5 sm:p-6 rounded-2xl border ${result.evaluation.colorClass} space-y-2`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider">
              ĐÁNH GIÁ CHUẨN ĐẦU VÀO TRƯỜNG CHUYÊN & CLC
            </span>
            <span className="text-base">{result.evaluation.starRating}</span>
          </div>
          <div className="font-extrabold text-lg sm:text-xl text-slate-900">
            {result.evaluation.title}
          </div>
          <p className="text-sm text-slate-700 leading-relaxed font-medium">
            {result.evaluation.descriptionVi}
          </p>
        </div>
      </div>

      {/* Difficulty & Competency Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Grade 5+ vs Grade 6-7 Ratio Performance */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <TrendingUp className="w-4 h-4 text-rose-600" />
            <h3 className="font-bold text-sm text-slate-900">
              Phân tích theo cấp độ khó (70% - 30%)
            </h3>
          </div>

          {/* Grade 5+ Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold text-slate-700">
              <span>Nền tảng vững chắc Lớp 5 (Grade 5+):</span>
              <span className="font-bold text-blue-700">
                {result.grade5PlusCount.correct}/{result.grade5PlusCount.total} câu (
                {result.grade5PlusCount.total > 0
                  ? Math.round((result.grade5PlusCount.correct / result.grade5PlusCount.total) * 100)
                  : 0}
                %)
              </span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
              <div
                style={{
                  width: `${
                    result.grade5PlusCount.total > 0
                      ? (result.grade5PlusCount.correct / result.grade5PlusCount.total) * 100
                      : 0
                  }%`,
                }}
                className="bg-blue-600 h-full rounded-full transition-all duration-500"
              />
            </div>
          </div>

          {/* Grade 6-7 Extension Progress Bar */}
          <div className="space-y-1.5 pt-2">
            <div className="flex justify-between text-xs font-semibold text-slate-700">
              <span>Mở rộng phân loại Lớp 6–7:</span>
              <span className="font-bold text-purple-700">
                {result.extensionCount.correct}/{result.extensionCount.total} câu (
                {result.extensionCount.total > 0
                  ? Math.round((result.extensionCount.correct / result.extensionCount.total) * 100)
                  : 0}
                %)
              </span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
              <div
                style={{
                  width: `${
                    result.extensionCount.total > 0
                      ? (result.extensionCount.correct / result.extensionCount.total) * 100
                      : 0
                  }%`,
                }}
                className="bg-purple-600 h-full rounded-full transition-all duration-500"
              />
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-slate-600 border border-slate-200/80">
            💡 Các câu phân loại lớp 6–7 là chìa khóa để giành điểm số cạnh tranh đỗ vào top đầu
            trường Chuyên và CLC.
          </div>
        </div>

        {/* Right: Breakdown by Question Type */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Layers className="w-4 h-4 text-rose-600" />
            <h3 className="font-bold text-sm text-slate-900">
              Độ chính xác theo dạng bài thi
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {Object.entries(result.typeBreakdown).map(([typeKey, stats]) => {
              if (!stats || stats.total === 0) return null;
              const pct = Math.round((stats.correct / stats.total) * 100);
              return (
                <div
                  key={typeKey}
                  className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-between"
                >
                  <span className="font-medium text-slate-700 capitalize truncate max-w-[140px]">
                    {typeKey.replace(/_/g, ' ')}
                  </span>
                  <span
                    className={`font-bold font-mono px-1.5 py-0.5 rounded text-[11px] ${
                      pct >= 80
                        ? 'bg-emerald-100 text-emerald-800'
                        : pct >= 50
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {stats.correct}/{stats.total} ({pct}%)
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Comprehensive Solution & Explanation Review Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">
              Đáp án & Lời giải chi tiết từng câu
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Đọc kỹ phần giải thích ngữ pháp và từ vựng song ngữ để củng cố kiến thức
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                filterMode === 'all'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tất cả ({result.totalQuestions})
            </button>
            <button
              onClick={() => setFilterMode('incorrect')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                filterMode === 'incorrect'
                  ? 'bg-white text-rose-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Câu sai ({result.totalQuestions - result.correctCount})
            </button>
            <button
              onClick={() => setFilterMode('correct')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                filterMode === 'correct'
                  ? 'bg-white text-emerald-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Câu đúng ({result.correctCount})
            </button>
          </div>
        </div>

        {/* Questions Solution List */}
        <div className="space-y-5">
          {filteredQuestions.map((q, idx) => {
            const userAns = result.userAnswers[q.id];
            const isCorrect = userAns && userAns.selectedAnswer === q.correctAnswer;
            const originalIndex = result.questions.findIndex((item) => item.id === q.id);

            return (
              <div
                key={q.id}
                className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                  isCorrect
                    ? 'border-emerald-200 bg-emerald-50/20'
                    : 'border-rose-200 bg-rose-50/20'
                }`}
              >
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                      {originalIndex + 1}
                    </span>

                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-white border border-slate-200 text-xs font-semibold text-slate-700">
                      <span>{q.typeIcon}</span>
                      <span>{q.typeLabelVi}</span>
                    </span>

                    {q.schoolModel && (
                      <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        Mẫu đề: {q.schoolModel}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {isCorrect ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Đúng (+1)</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-100 px-2.5 py-1 rounded-full">
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Chưa chính xác</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Reading Context Passage if present */}
                {q.contextPassage && (
                  <div className="mb-4 p-4 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 font-serif leading-relaxed">
                    {q.contextPassage.title && (
                      <div className="font-sans font-bold text-slate-900 mb-1.5">
                        {q.contextPassage.title}
                      </div>
                    )}
                    <p>{q.contextPassage.text}</p>
                  </div>
                )}

                {/* Prompt with visual underline */}
                <div className="text-base font-bold text-slate-900 mb-4 whitespace-pre-line">
                  <ClcUnderlineRenderer
                    text={q.displayed_question_text || q.promptText}
                    underlinedPart={q.underlinedPart}
                  />
                </div>

                {/* Options display with locked order and visual indicators */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                  {q.options.map((opt) => {
                    const isRightOption = opt.id === q.correctAnswer;
                    const isUserChoice = userAns?.selectedAnswer === opt.id;

                    return (
                      <div
                        key={opt.id}
                        className={`p-3 rounded-xl border text-xs sm:text-sm font-medium flex items-center justify-between ${
                          isRightOption
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold'
                            : isUserChoice && !isRightOption
                            ? 'border-rose-400 bg-rose-50 text-rose-950 line-through opacity-85'
                            : 'border-slate-200 bg-white text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`w-6 h-6 rounded flex items-center justify-center font-bold text-xs shrink-0 ${
                              isRightOption
                                ? 'bg-emerald-600 text-white'
                                : isUserChoice
                                ? 'bg-rose-600 text-white'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {opt.id}
                          </span>
                          <span>
                            <ClcUnderlineRenderer
                              text={opt.text}
                              underlinedPart={
                                q.type === 'pronunciation' ? q.underlinedPart : undefined
                              }
                            />
                          </span>
                        </div>

                        {isRightOption && (
                          <span className="text-emerald-700 text-xs font-bold shrink-0">
                            ✓ Đáp án đúng
                          </span>
                        )}
                        {isUserChoice && !isRightOption && (
                          <span className="text-rose-600 text-xs font-bold shrink-0">
                            ✗ Em đã chọn
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation Box */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs space-y-1.5">
                  <div className="font-bold text-rose-800 flex items-center gap-1.5">
                    <span>💡</span>
                    <span>Giải thích chi tiết:</span>
                  </div>
                  <div className="text-slate-800 leading-relaxed font-medium">
                    {q.explanation}
                  </div>
                  <div className="text-slate-600 italic leading-relaxed pt-1 border-t border-slate-100">
                    {q.explanationVi}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
