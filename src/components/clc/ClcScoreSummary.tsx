import React, { useState, useEffect } from 'react';
import {
  Trophy,
  Award,
  Sparkles,
  CheckCircle2,
  XCircle,
  RotateCcw,
  BookOpen,
  ArrowRight,
  Clock,
  ChevronDown,
  ChevronUp,
  Lightbulb,
} from 'lucide-react';
import { ClcSessionResult, ClcQuestion } from '../../types/clc';
import { CLC_GRAMMAR_CATEGORIES } from '../../data/clcCategories';
import { soundEffects } from '../../utils/audioEffects';
import { sanitizeClcQuestionInPlace } from '../../data/clcQuestionValidator';
import { classifyQuestionSkill, CLC_MIXED_SKILLS_INFO, ClcMixedSkill } from '../../data/clcQuestionEngine';

interface ClcScoreSummaryProps {
  result: ClcSessionResult;
  onRetryMistakes: (wrongQuestions: ClcQuestion[]) => void;
  onRestartSameSession: () => void;
  onBackToClcSetup: () => void;
  onBackToHome: () => void;
}

export const ClcScoreSummary: React.FC<ClcScoreSummaryProps> = ({
  result,
  onRetryMistakes,
  onRestartSameSession,
  onBackToClcSetup,
  onBackToHome,
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'mistakes'>('all');
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);

  useEffect(() => {
    soundEffects.playVictory();
  }, []);

  const { totalQuestions, correctCount, scorePercentage, timeSpentTotal, questions, userAnswers } =
    result;

  const wrongQuestions = questions.filter((q) => {
    const record = userAnswers[q.id];
    return !record || !record.isCorrect;
  });

  const displayedQuestions = filterMode === 'mistakes' ? wrongQuestions : questions;

  // Readiness evaluation
  let readinessBadge = {
    title: '🏆 CLC MASTER — HIGH DISTINCTION',
    sub: 'Outstanding grammatical accuracy! Excellent readiness for top specialized secondary schools (Amsterdam, Cầu Giấy, Ngoại Ngữ, Trần Đại Nghĩa).',
    color: 'border-rose-400 bg-rose-50 text-rose-900',
    star: '⭐⭐⭐⭐⭐',
  };

  if (scorePercentage < 60) {
    readinessBadge = {
      title: '🌱 FOUNDATION BUILDING NEEDED',
      sub: 'Review Stage 1 core grammar (be, have, tenses, articles) before proceeding to advanced transformations.',
      color: 'border-amber-400 bg-amber-50 text-amber-900',
      star: '⭐⭐',
    };
  } else if (scorePercentage < 75) {
    readinessBadge = {
      title: '📚 CLC DEVELOPING — SOLID START',
      sub: 'Good grasp of primary grammar. Target error correction and conjunctions to raise your exam score.',
      color: 'border-sky-400 bg-sky-50 text-sky-900',
      star: '⭐⭐⭐',
    };
  } else if (scorePercentage < 90) {
    readinessBadge = {
      title: '🎯 CLC PROFICIENT — ENTRANCE READY',
      sub: 'Strong performance on Grade 6 extension structures and comparative transformations!',
      color: 'border-emerald-400 bg-emerald-50 text-emerald-900',
      star: '⭐⭐⭐⭐',
    };
  }

  // Format time
  const minutes = Math.floor(timeSpentTotal / 60);
  const seconds = timeSpentTotal % 60;
  const timeFormatted = `${minutes > 0 ? `${minutes}m ` : ''}${seconds}s`;

  // 8 CLC Skills Breakdown
  const skillBreakdown = React.useMemo(() => {
    const map: Record<
      string,
      { total: number; correct: number; info: { label: string; labelVi: string; icon: string; descriptionVi: string } }
    > = {};
    questions.forEach((q) => {
      const sk = classifyQuestionSkill(q);
      if (!map[sk]) {
        map[sk] = { total: 0, correct: 0, info: CLC_MIXED_SKILLS_INFO[sk] };
      }
      map[sk].total += 1;
      const ans = userAnswers[q.id];
      if (ans && ans.isCorrect) {
        map[sk].correct += 1;
      }
    });
    return map;
  }, [questions, userAnswers]);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      {/* Top Banner */}
      <div className="text-center mb-8">
        <div className="w-18 h-18 rounded-3xl bg-gradient-to-tr from-rose-500 to-red-600 text-white flex items-center justify-center text-4xl shadow-md mx-auto mb-4">
          🎓
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 mb-2">
          CLC Grammar Practice Completed!
        </h1>
        <p className="text-slate-600 text-sm max-w-md mx-auto">
          Advanced grammar evaluation and entrance preparation review for Grade 5 → Grade 6/7.
        </p>
      </div>

      {/* Main Score Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center mb-6 pb-6 border-b border-slate-100">
          {/* Score percentage */}
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-100">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Overall Score
            </span>
            <div className="font-display font-black text-3xl sm:text-4xl text-rose-600">
              {scorePercentage}%
            </div>
            <span className="text-xs font-semibold text-rose-800">
              {correctCount} / {totalQuestions} Correct
            </span>
          </div>

          {/* Time spent */}
          <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Time Spent
            </span>
            <div className="font-display font-black text-3xl sm:text-4xl text-sky-600">
              {timeFormatted}
            </div>
            <span className="text-xs font-semibold text-sky-800">Total Duration</span>
          </div>

          {/* Accuracy Rating */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Accuracy Tier
            </span>
            <div className="font-display font-black text-2xl text-emerald-700 mt-1">
              {readinessBadge.star}
            </div>
            <span className="text-xs font-semibold text-emerald-800">
              {correctCount === totalQuestions ? 'Perfect Score' : `${wrongQuestions.length} To Review`}
            </span>
          </div>
        </div>

        {/* Readiness Assessment Banner */}
        <div className={`p-5 rounded-2xl border-2 mb-6 ${readinessBadge.color}`}>
          <div className="font-display font-extrabold text-sm sm:text-base tracking-wide uppercase mb-1 flex items-center gap-2">
            <Award className="w-5 h-5 shrink-0" />
            <span>{readinessBadge.title}</span>
          </div>
          <p className="text-xs sm:text-sm leading-relaxed">{readinessBadge.sub}</p>
        </div>

        {/* Stage-by-Stage Breakdown */}
        <div className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-rose-600" />
            <span>Performance Across Progression Stages</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[1, 2, 3].map((stg) => {
              const stageKey = `stage${stg}` as 'stage1' | 'stage2' | 'stage3';
              const data = result.stageBreakdown[stageKey];
              const pct = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
              const title =
                stg === 1
                  ? 'Stage 1: Grade 5 Review'
                  : stg === 2
                  ? 'Stage 2: Grade 6 Extension'
                  : 'Stage 3: Grade 7 Prep';

              return (
                <div key={stg} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-[11px] font-bold text-slate-600 mb-1">{title}</div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-display font-extrabold text-slate-900 text-sm">
                      {data.correct} / {data.total}
                    </span>
                    <span className="font-bold text-rose-600">{pct}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-rose-600 rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 8-Skill Performance Breakdown */}
        {Object.keys(skillBreakdown).length > 0 && (
          <div className="mb-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-indigo-600" />
              <span>Kết Quả Theo 8 Kỹ Năng Thi CLC (Skill Breakdown)</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {Object.entries(skillBreakdown).map(([sk, data]) => {
                const pct = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
                return (
                  <div
                    key={sk}
                    className="p-3 rounded-2xl bg-white border border-slate-200/90 shadow-3xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-base">{data.info?.icon || '📌'}</span>
                        <span className="font-display font-bold text-xs text-slate-900 truncate">
                          {data.info?.labelVi || sk}
                        </span>
                      </div>
                      <div className="flex items-baseline justify-between text-xs mb-1.5">
                        <span className="font-extrabold text-slate-800 text-xs">
                          {data.correct} / {data.total}
                        </span>
                        <span
                          className={`font-black text-xs ${
                            pct >= 80 ? 'text-emerald-600' : pct >= 50 ? 'text-amber-600' : 'text-rose-600'
                          }`}
                        >
                          {pct}%
                        </span>
                      </div>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          pct >= 80 ? 'bg-emerald-500' : pct >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          {wrongQuestions.length > 0 && (
            <button
              onClick={() => onRetryMistakes(wrongQuestions)}
              className="flex-1 min-w-[180px] py-3 px-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-display font-extrabold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry {wrongQuestions.length} Mistakes</span>
            </button>
          )}

          <button
            onClick={onRestartSameSession}
            className="flex-1 min-w-[160px] py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-display font-extrabold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Retake Practice</span>
          </button>

          <button
            onClick={onBackToClcSetup}
            className="flex-1 min-w-[160px] py-3 px-4 rounded-2xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-display font-extrabold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Change Unit / Topics</span>
          </button>
        </div>
      </div>

      {/* Review Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs mb-6">
        <div className="flex items-center justify-between gap-3 mb-5">
          <div className="font-display font-bold text-lg text-slate-900">
            Review Questions & Explanations
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 text-xs font-bold">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                filterMode === 'all' ? 'bg-white shadow-2xs text-slate-900' : 'text-slate-500'
              }`}
            >
              All ({questions.length})
            </button>
            <button
              onClick={() => setFilterMode('mistakes')}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                filterMode === 'mistakes' ? 'bg-white shadow-2xs text-rose-700' : 'text-slate-500'
              }`}
            >
              Mistakes Only ({wrongQuestions.length})
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {displayedQuestions.map((rawQ, i) => {
            const q = sanitizeClcQuestionInPlace({
              ...rawQ,
              options: rawQ.options ? rawQ.options.map((o) => ({ ...o })) : [],
            });
            const answerRecord = userAnswers[q.id];
            const isQCorrect = answerRecord?.isCorrect;
            const isExpanded = expandedQuestionId === q.id;

            return (
              <div
                key={q.id}
                className={`p-4 sm:p-5 rounded-2xl border-2 transition-all ${
                  isQCorrect
                    ? 'border-emerald-200 bg-emerald-50/30'
                    : 'border-rose-200 bg-rose-50/30'
                }`}
              >
                <div
                  onClick={() => setExpandedQuestionId(isExpanded ? null : q.id)}
                  className="flex items-start justify-between gap-3 cursor-pointer"
                >
                  <div className="flex items-start gap-2.5">
                    {isQCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-[11px] font-extrabold text-slate-500">
                          #{i + 1}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 uppercase">
                          Stage {q.stage} · {q.grammarRuleTitle}
                        </span>
                      </div>
                      <div className="font-display font-semibold text-sm text-slate-900">
                        {q.promptText}
                      </div>
                    </div>
                  </div>

                  <button className="text-slate-400 hover:text-slate-700 shrink-0 mt-1">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-slate-200/80 text-xs sm:text-sm space-y-2.5">
                    <div className="p-3 rounded-xl bg-white border border-slate-200">
                      <strong className="block text-slate-700 text-xs font-bold uppercase mb-1">
                        Correct Answer:
                      </strong>
                      <span className="font-display font-bold text-emerald-700">
                        {q.options.find((o) => o.id === q.correctAnswer)?.text || q.correctAnswer}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-slate-200">
                      <strong className="block text-slate-700 text-xs font-bold uppercase mb-1">
                        Grammar Rule:
                      </strong>
                      <p className="text-slate-600 leading-relaxed">{q.explanation}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 font-medium">
                      <strong className="block text-amber-900 text-xs font-bold uppercase mb-1 flex items-center gap-1">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                        Bí quyết làm bài thi CLC:
                      </strong>
                      <p className="leading-relaxed">{q.grammarTipVi}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Back to Home Button */}
      <div className="text-center">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-all cursor-pointer"
        >
          <span>← Back to Home</span>
        </button>
      </div>
    </div>
  );
};
