import React from 'react';
import { Sparkles, Check, CheckCircle2, Layers, BookMarked } from 'lucide-react';
import { ClcGrammarCategoryId, ClcStage } from '../../types/clc';
import { CLC_GRAMMAR_CATEGORIES, CLC_STAGES_INFO } from '../../data/clcCategories';

interface ClcCategorySelectorProps {
  selectedCategories: ClcGrammarCategoryId[];
  selectedStageFilter: ClcStage | 'all';
  onToggleCategory: (catId: ClcGrammarCategoryId) => void;
  onSelectAllCategories: () => void;
  onSelectStageFilter: (stage: ClcStage | 'all') => void;
}

export const ClcCategorySelector: React.FC<ClcCategorySelectorProps> = ({
  selectedCategories,
  selectedStageFilter,
  onToggleCategory,
  onSelectAllCategories,
  onSelectStageFilter,
}) => {
  const isAllSelected = selectedCategories.length === CLC_GRAMMAR_CATEGORIES.length;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-rose-100 shadow-xs mb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-rose-600 mb-1 flex items-center gap-1.5">
            <BookMarked className="w-3.5 h-3.5" />
            <span>20 Progressive Grammar Categories (Grades 5 → 7)</span>
          </div>
          <h2 className="font-display font-bold text-lg sm:text-xl text-slate-900">
            Choose Grammar Topics & Progression
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            All 20 topics are progressively integrated, or you can focus on a specific stage.
          </p>
        </div>

        {/* Action button: Select All */}
        <button
          onClick={onSelectAllCategories}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer self-start sm:self-auto ${
            isAllSelected
              ? 'bg-rose-100 text-rose-800 border border-rose-200'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          {isAllSelected ? '✓ All 20 Topics Active' : 'Select All 20 Topics'}
        </button>
      </div>

      {/* Stage Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-5 pb-2 border-b border-slate-100">
        <button
          onClick={() => onSelectStageFilter('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer ${
            selectedStageFilter === 'all'
              ? 'bg-rose-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          🌟 All Stages Mixed (Progressive)
        </button>
        {CLC_STAGES_INFO.map((s) => (
          <button
            key={s.stage}
            onClick={() => onSelectStageFilter(s.stage)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer ${
              selectedStageFilter === s.stage
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-72 overflow-y-auto pr-1">
        {CLC_GRAMMAR_CATEGORIES.map((cat) => {
          const isSelected = selectedCategories.includes(cat.id);
          const stageBadgeColor =
            cat.stage === 1
              ? 'bg-emerald-100 text-emerald-800'
              : cat.stage === 2
              ? 'bg-sky-100 text-sky-800'
              : 'bg-rose-100 text-rose-800';

          return (
            <div
              key={cat.id}
              onClick={() => onToggleCategory(cat.id)}
              className={`p-3.5 rounded-2xl border-2 transition-all duration-150 cursor-pointer flex items-start gap-3 ${
                isSelected
                  ? 'border-rose-400 bg-rose-50/50 shadow-2xs'
                  : 'border-slate-200/80 bg-white hover:border-slate-300 opacity-60'
              }`}
            >
              <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-base shrink-0 mt-0.5">
                {cat.icon}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1.5 mb-1">
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wide ${stageBadgeColor}`}>
                    Stage {cat.stage}
                  </span>
                  <div
                    className={`w-4 h-4 rounded-md flex items-center justify-center border transition-all ${
                      isSelected
                        ? 'bg-rose-600 border-rose-600 text-white'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>

                <div className="font-display font-bold text-xs text-slate-900 leading-tight">
                  {cat.title}
                </div>
                <div className="text-[11px] text-rose-700 font-semibold mt-0.5 line-clamp-1">
                  {cat.vietnameseTitle}
                </div>
                <div className="text-[10px] text-slate-500 mt-1 line-clamp-1 font-mono">
                  {cat.keyRule}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
