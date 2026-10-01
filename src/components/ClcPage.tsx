import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  Award,
  Layers,
  Play,
  RotateCcw,
  BookOpen,
  Shuffle,
  CheckCheck,
  Compass,
} from 'lucide-react';
import { ProgramInfo, QuestionPackageCount } from '../types/curriculum';
import {
  ClcGrammarCategoryId,
  ClcStage,
  ClcQuestion,
  ClcUserAnswer,
  ClcSessionResult,
} from '../types/clc';
import { CLC_GRAMMAR_CATEGORIES } from '../data/clcCategories';
import { generateClcQuestions, CLC_MIXED_SKILLS_INFO, ClcMixedSkill } from '../data/clcQuestionEngine';
import { processAndValidateClcQuestions } from '../data/clcQuestionValidator';
import { ClcUnitSelector } from './clc/ClcUnitSelector';
import { ClcCategorySelector } from './clc/ClcCategorySelector';
import { ClcSessionPlayer } from './clc/ClcSessionPlayer';
import { ClcScoreSummary } from './clc/ClcScoreSummary';
import { ClcLessonViewer } from './clc/ClcLessonViewer';
import { getClcLessonForUnit } from '../data/clcUnitLessons';

interface ClcPageProps {
  program: ProgramInfo;
  onBackToHome: () => void;
  initialUnitId?: string;
}

export const ClcPage: React.FC<ClcPageProps> = ({
  program,
  onBackToHome,
  initialUnitId,
}) => {
  // Page mode: 'setup' | 'session' | 'summary'
  const [pageMode, setPageMode] = useState<'setup' | 'session' | 'summary'>('setup');

  // Setup state
  const [selectedUnitId, setSelectedUnitId] = useState<string>(initialUnitId || 'GS5-U20');
  const [practiceMode, setPracticeMode] = useState<'mixed_review' | 'standard'>('mixed_review');
  const [selectedCategories, setSelectedCategories] = useState<ClcGrammarCategoryId[]>(
    CLC_GRAMMAR_CATEGORIES.map((c) => c.id)
  );
  const [selectedStageFilter, setSelectedStageFilter] = useState<ClcStage | 'all'>('all');
  const [questionCount, setQuestionCount] = useState<QuestionPackageCount>(20);

  // Active Session state
  const [activeQuestions, setActiveQuestions] = useState<ClcQuestion[]>([]);
  const [sessionResult, setSessionResult] = useState<ClcSessionResult | null>(null);

  // Sync initialUnitId if changed externally
  useEffect(() => {
    if (initialUnitId) {
      setSelectedUnitId(initialUnitId);
    }
  }, [initialUnitId]);

  // Toggle single category
  const handleToggleCategory = (catId: ClcGrammarCategoryId) => {
    setSelectedCategories((prev) => {
      if (prev.includes(catId)) {
        if (prev.length === 1) return prev; // Keep at least one
        return prev.filter((id) => id !== catId);
      } else {
        return [...prev, catId];
      }
    });
  };

  // Select all 20 categories
  const handleSelectAllCategories = () => {
    setSelectedCategories(CLC_GRAMMAR_CATEGORIES.map((c) => c.id));
    setSelectedStageFilter('all');
  };

  // Select stage filter
  const handleSelectStageFilter = (stage: ClcStage | 'all') => {
    setSelectedStageFilter(stage);
    if (stage === 'all') {
      setSelectedCategories(CLC_GRAMMAR_CATEGORIES.map((c) => c.id));
    } else {
      const stageCats = CLC_GRAMMAR_CATEGORIES.filter((c) => c.stage === stage).map((c) => c.id);
      setSelectedCategories(stageCats);
    }
  };

  // Start Session
  const handleStartSession = (customQuestions?: ClcQuestion[]) => {
    const list = customQuestions
      ? processAndValidateClcQuestions(customQuestions)
      : generateClcQuestions({
          unitId: selectedUnitId,
          questionCount,
          selectedCategories,
          stageFilter: selectedStageFilter,
          mode: practiceMode,
        });

    setActiveQuestions(list);
    setPageMode('session');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Finish Session & Compute Results
  const handleFinishSession = (answers: Record<string, ClcUserAnswer>, totalTimeSpent: number) => {
    let correctCount = 0;
    const stageBreakdown = {
      stage1: { total: 0, correct: 0 },
      stage2: { total: 0, correct: 0 },
      stage3: { total: 0, correct: 0 },
    };

    const categoryBreakdown: Record<ClcGrammarCategoryId, { total: number; correct: number }> =
      {} as any;

    CLC_GRAMMAR_CATEGORIES.forEach((cat) => {
      categoryBreakdown[cat.id] = { total: 0, correct: 0 };
    });

    activeQuestions.forEach((q) => {
      const stageKey = `stage${q.stage}` as 'stage1' | 'stage2' | 'stage3';
      stageBreakdown[stageKey].total += 1;

      if (!categoryBreakdown[q.grammarCategory]) {
        categoryBreakdown[q.grammarCategory] = { total: 0, correct: 0 };
      }
      categoryBreakdown[q.grammarCategory].total += 1;

      const ans = answers[q.id];
      if (ans && ans.isCorrect) {
        correctCount += 1;
        stageBreakdown[stageKey].correct += 1;
        categoryBreakdown[q.grammarCategory].correct += 1;
      }
    });

    const scorePercentage =
      activeQuestions.length > 0 ? Math.round((correctCount / activeQuestions.length) * 100) : 0;

    const result: ClcSessionResult = {
      totalQuestions: activeQuestions.length,
      correctCount,
      scorePercentage,
      timeSpentTotal: totalTimeSpent,
      stageBreakdown,
      categoryBreakdown,
      userAnswers: answers,
      questions: activeQuestions,
    };

    setSessionResult(result);
    setPageMode('summary');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Retry Mistakes
  const handleRetryMistakes = (wrongQuestions: ClcQuestion[]) => {
    handleStartSession(wrongQuestions);
  };

  // Restart same practice
  const handleRestartSame = () => {
    handleStartSession();
  };

  // If in Session Mode
  if (pageMode === 'session') {
    return (
      <ClcSessionPlayer
        questions={activeQuestions}
        onFinishSession={handleFinishSession}
        onExitSession={() => setPageMode('setup')}
      />
    );
  }

  // If in Summary Mode
  if (pageMode === 'summary' && sessionResult) {
    return (
      <ClcScoreSummary
        result={sessionResult}
        onRetryMistakes={handleRetryMistakes}
        onRestartSameSession={handleRestartSame}
        onBackToClcSetup={() => setPageMode('setup')}
        onBackToHome={onBackToHome}
      />
    );
  }

  // SETUP MODE
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Navigation Top: Back Button and Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 hover:text-slate-900 shadow-xs transition-all duration-150 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 cursor-pointer"
          aria-label="Back to Home"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <button onClick={onBackToHome} className="hover:text-slate-900 transition-colors">
            Home
          </button>
          <span>/</span>
          <span className="text-rose-700 font-bold">Ôn Thi CLC (Grammar Mode)</span>
        </nav>
      </div>

      {/* CLC Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-xs mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-tr from-rose-500 to-red-600 text-white flex items-center justify-center text-3xl sm:text-4xl shadow-md shrink-0">
              🎓
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="inline-block px-3 py-1 bg-rose-100 text-rose-800 text-xs sm:text-sm font-black rounded-lg uppercase tracking-wider border border-rose-200">
                  Grade 5 → Grade 6/7
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-lg">
                  <Award className="w-3.5 h-3.5 text-rose-500" />
                  SPECIALIZED ENTRANCE PREP
                </span>
              </div>
              <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
                🎓 ÔN THI CLC — GRAMMAR MODE
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1 leading-relaxed">
                Review and extend grammar knowledge up to Grade 7 in meaningful contexts connected to Unit vocabulary.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 1. Unit Context Selector */}
      <ClcUnitSelector
        selectedUnitId={selectedUnitId}
        onSelectUnit={(unitId) => setSelectedUnitId(unitId)}
      />

      {/* Structured CLC Grammar Lesson for Selected Unit */}
      {(() => {
        const activeLesson = getClcLessonForUnit(selectedUnitId);
        return (
          <ClcLessonViewer
            lesson={activeLesson}
            onStartLessonPractice={(questions) => handleStartSession(questions)}
          />
        );
      })()}

      {/* Practice Mode Selector: Mixed Review vs Topic Drill */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-rose-100 shadow-xs mb-8">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-rose-600 mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Chế độ luyện thi CLC (Practice Mode)</span>
            </h3>
            <h2 className="font-display font-bold text-lg sm:text-xl text-slate-900">
              Chọn Hình Thức Ôn Luyện
            </h2>
          </div>
          <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-extrabold border border-rose-200">
            {practiceMode === 'mixed_review' ? '🌟 Ôn Tập Tổng Hợp (Khuyên Dùng)' : '🎯 Luyện Theo Chuyên Đề'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* Mode Option 1: Mixed Review */}
          <button
            onClick={() => setPracticeMode('mixed_review')}
            className={`p-5 rounded-2xl border-2 text-left transition-all duration-150 cursor-pointer relative ${
              practiceMode === 'mixed_review'
                ? 'border-rose-600 bg-rose-50/70 shadow-xs ring-2 ring-rose-200'
                : 'border-slate-200 hover:border-slate-300 bg-white'
            }`}
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 to-red-600 text-white flex items-center justify-center text-xl shrink-0 shadow-xs">
                🌟
              </div>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-rose-600 text-white tracking-wider">
                PROMPT 21 · TOP PICK
              </span>
            </div>
            <div className="font-display font-extrabold text-base sm:text-lg text-slate-900 mb-1">
              Ôn Tập Tổng Hợp (Mixed Review)
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              Kết hợp hài hòa <strong>8 dạng bài thi CLC</strong> cốt lõi theo chuẩn đề thi tuyển sinh lớp 6 Chuyên.
            </p>
            <div className="flex flex-wrap gap-1.5 text-[11px] font-bold text-rose-800">
              <span className="px-2 py-0.5 rounded-md bg-white/90 border border-rose-200">🔠 Trắc nghiệm</span>
              <span className="px-2 py-0.5 rounded-md bg-white/90 border border-rose-200">✍️ Điền từ</span>
              <span className="px-2 py-0.5 rounded-md bg-white/90 border border-rose-200">🔄 Viết lại câu</span>
              <span className="px-2 py-0.5 rounded-md bg-white/90 border border-rose-200">🎯 Đồng nghĩa</span>
              <span className="px-2 py-0.5 rounded-md bg-white/90 border border-rose-200">📖 Đọc hiểu</span>
              <span className="px-2 py-0.5 rounded-md bg-white/90 border border-rose-200">🔍 Lỗi sai</span>
              <span className="px-2 py-0.5 rounded-md bg-white/90 border border-rose-200">🔀 Sắp xếp từ</span>
              <span className="px-2 py-0.5 rounded-md bg-white/90 border border-rose-200">💬 Thực tế</span>
            </div>
          </button>

          {/* Mode Option 2: Standard Topic Drill */}
          <button
            onClick={() => setPracticeMode('standard')}
            className={`p-5 rounded-2xl border-2 text-left transition-all duration-150 cursor-pointer relative ${
              practiceMode === 'standard'
                ? 'border-rose-600 bg-rose-50/70 shadow-xs ring-2 ring-rose-200'
                : 'border-slate-200 hover:border-slate-300 bg-white'
            }`}
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white flex items-center justify-center text-xl shrink-0 shadow-xs">
                🎯
              </div>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 tracking-wider">
                CHUYÊN ĐỀ
              </span>
            </div>
            <div className="font-display font-extrabold text-base sm:text-lg text-slate-900 mb-1">
              Luyện Theo Chuyên Đề (Topic Drill)
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              Tùy chọn luyện tập riêng biệt theo từng chủ điểm ngữ pháp trong 20 chuyên đề hoặc từng cấp độ Stage 1, 2, 3.
            </p>
            <div className="flex flex-wrap gap-1.5 text-[11px] font-bold text-sky-800">
              <span className="px-2 py-0.5 rounded-md bg-white/90 border border-sky-200">20 Chuyên đề Ngữ pháp</span>
              <span className="px-2 py-0.5 rounded-md bg-white/90 border border-sky-200">Bộ lọc Giai đoạn</span>
            </div>
          </button>
        </div>

        {/* Mixed Review: 8 Skills Detailed Breakdown Card */}
        {practiceMode === 'mixed_review' && (
          <div className="p-5 rounded-2xl bg-gradient-to-br from-rose-50/90 via-white to-amber-50/50 border border-rose-200 mb-2 shadow-2xs">
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <CheckCheck className="w-4 h-4 text-rose-600" />
                <h4 className="font-display font-extrabold text-xs sm:text-sm text-slate-900 uppercase tracking-wide">
                  8 Dạng Bài Thi CLC Tích Hợp Toàn Diện (Prompts 18–21)
                </h4>
              </div>
              <span className="text-[11px] font-black text-rose-700 bg-rose-100/80 px-2.5 py-0.5 rounded-lg border border-rose-200">
                70% Nền tảng · 30% Chuyên sâu
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 mb-3">
              {(Object.keys(CLC_MIXED_SKILLS_INFO) as ClcMixedSkill[]).map((skillKey) => {
                const info = CLC_MIXED_SKILLS_INFO[skillKey];
                return (
                  <div
                    key={skillKey}
                    className="p-2.5 rounded-xl bg-white border border-rose-100/80 shadow-3xs flex flex-col justify-between"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{info.icon}</span>
                      <span className="font-display font-bold text-xs text-slate-900 line-clamp-1">
                        {info.labelVi}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug line-clamp-2">
                      {info.descriptionVi}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Stage filter pills for Mixed Review */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-rose-100/80 text-xs">
              <span className="text-slate-600 font-bold flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-rose-600" />
                <span>Phạm vi giai đoạn bài tập:</span>
              </span>
              <div className="flex items-center gap-1.5">
                {(['all', 1, 2, 3] as Array<'all' | ClcStage>).map((stg) => {
                  const isSelected = selectedStageFilter === stg;
                  return (
                    <button
                      key={stg}
                      onClick={() => setSelectedStageFilter(stg)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-rose-600 text-white shadow-xs'
                          : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {stg === 'all'
                        ? 'Chuẩn 70% Accessible + 30% Challenge'
                        : stg === 1
                        ? 'Stage 1 (Lớp 5)'
                        : stg === 2
                        ? 'Stage 2 (Lớp 6)'
                        : 'Stage 3 (Lớp 7)'}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. 20 Grammar Categories Selector (Shown when in standard topic drill) */}
      {practiceMode === 'standard' && (
        <ClcCategorySelector
          selectedCategories={selectedCategories}
          selectedStageFilter={selectedStageFilter}
          onToggleCategory={handleToggleCategory}
          onSelectAllCategories={handleSelectAllCategories}
          onSelectStageFilter={handleSelectStageFilter}
        />
      )}

      {/* 3. Question Package Option */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-rose-100 shadow-xs mb-8">
        <h3 className="text-xs font-bold uppercase tracking-wider text-rose-600 mb-1 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5" />
          <span>Session Length</span>
        </h3>
        <h2 className="font-display font-bold text-lg sm:text-xl text-slate-900 mb-4">
          Select Number of Questions
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
          {([10, 20, 25, 30, 40] as QuestionPackageCount[]).map((count) => {
            const isSelected = questionCount === count;
            return (
              <button
                key={count}
                onClick={() => setQuestionCount(count)}
                className={`p-3.5 rounded-2xl border-2 transition-all duration-150 cursor-pointer text-center ${
                  isSelected
                    ? 'border-rose-600 bg-rose-50/80 shadow-xs'
                    : 'border-slate-200/90 hover:border-slate-300 bg-white'
                }`}
              >
                <div
                  className={`font-display font-black text-xl mb-0.5 ${
                    isSelected ? 'text-rose-700' : 'text-slate-800'
                  }`}
                >
                  {count}
                </div>
                <div className="text-[11px] font-bold text-slate-500">QUESTIONS</div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  {count === 10
                    ? 'Quick Drill'
                    : count === 20
                    ? 'Standard Practice'
                    : count === 25
                    ? 'Exam Mock'
                    : count === 30
                    ? 'Full Mock Test'
                    : 'Mastery Marathon'}
                </div>
              </button>
            );
          })}
        </div>

        {/* Start Button */}
        <button
          onClick={() => handleStartSession()}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white font-display font-extrabold text-base sm:text-lg shadow-md hover:shadow-lg transition-all active:scale-[0.99] flex items-center justify-center gap-2.5 cursor-pointer"
        >
          <Play className="w-5 h-5 fill-white" />
          <span>
            {practiceMode === 'mixed_review'
              ? `START CLC MIXED REVIEW · 8 SKILLS (${questionCount} QUESTIONS)`
              : `START CLC TOPIC DRILL (${questionCount} QUESTIONS)`}
          </span>
        </button>
      </div>
    </div>
  );
};
