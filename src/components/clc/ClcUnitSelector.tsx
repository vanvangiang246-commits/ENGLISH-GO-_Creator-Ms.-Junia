import React, { useState } from 'react';
import { BookOpen, Check, Sparkles, Filter } from 'lucide-react';
import { getCurriculumProfilesForGrade, ALL_CURRICULUM_PROFILES } from '../../data/curriculum/index';
import { UnitKnowledgeProfile } from '../../types/curriculumKnowledge';

interface ClcUnitSelectorProps {
  selectedUnitId: string;
  onSelectUnit: (unitId: string) => void;
}

export const ClcUnitSelector: React.FC<ClcUnitSelectorProps> = ({
  selectedUnitId,
  onSelectUnit,
}) => {
  const [selectedGrade, setSelectedGrade] = useState<number>(5);

  const gradeUnits = getCurriculumProfilesForGrade(selectedGrade);
  const currentProfile = ALL_CURRICULUM_PROFILES[selectedUnitId] || gradeUnits[0];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-rose-100 shadow-xs mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-rose-600 mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Target Unit Vocabulary & Topic Connection</span>
          </div>
          <h2 className="font-display font-bold text-lg sm:text-xl text-slate-900">
            Select Unit for CLC Grammar Context
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            CLC questions review Grade 5 to Grade 7 grammar while utilizing vocabulary from your chosen unit.
          </p>
        </div>

        {/* Selected Unit Badge */}
        {currentProfile && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm font-bold shrink-0">
            <span>Active Unit:</span>
            <span className="font-extrabold text-rose-900">
              Grade {currentProfile.grade} · Unit {currentProfile.unitNumber}
            </span>
          </div>
        )}
      </div>

      {/* Grade Tabs */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1 shrink-0 flex items-center gap-1">
          <Filter className="w-3 h-3" /> Grade:
        </span>
        {[5, 4, 3, 2, 1].map((grade) => (
          <button
            key={grade}
            onClick={() => setSelectedGrade(grade)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all duration-150 cursor-pointer shrink-0 ${
              selectedGrade === grade
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Grade {grade} {grade === 5 && '🌟 (Core CLC)'}
          </button>
        ))}
      </div>

      {/* Units Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 max-h-56 overflow-y-auto pr-1">
        {gradeUnits.map((u) => {
          const isSelected = selectedUnitId === u.unitId;
          return (
            <button
              key={u.unitId}
              onClick={() => onSelectUnit(u.unitId)}
              className={`p-3 rounded-2xl text-left border-2 transition-all duration-150 cursor-pointer relative ${
                isSelected
                  ? 'border-rose-500 bg-rose-50/70 shadow-xs'
                  : 'border-slate-200/90 hover:border-rose-300 bg-white hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-[11px] font-extrabold text-slate-500">
                  U{u.unitNumber}
                </span>
                {isSelected && (
                  <span className="w-4 h-4 rounded-full bg-rose-600 text-white flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                )}
              </div>
              <div className="font-display font-bold text-xs text-slate-900 line-clamp-1">
                {u.title}
              </div>
              <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                {u.topic}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
