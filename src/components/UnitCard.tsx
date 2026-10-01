import React from 'react';
import { ChevronRight } from 'lucide-react';
import { UnitItem } from '../types/curriculum';
import { getUnitIconConfig } from '../utils/unitIcons';

interface UnitCardProps {
  unit: UnitItem;
  onSelect: (unit: UnitItem) => void;
}

export const UnitCard: React.FC<UnitCardProps> = ({ unit, onSelect }) => {
  const iconConfig = getUnitIconConfig(unit.unitNumber);
  const IconComponent = iconConfig.icon;

  return (
    <button
      onClick={() => onSelect(unit)}
      className="group w-full p-4 sm:p-5 rounded-2xl bg-white border-2 border-slate-200 hover:border-blue-400 shadow-xs hover:shadow-md transition-all duration-150 active:scale-[0.99] flex items-center justify-between text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-400"
      aria-label={`Select ${unit.displayName}`}
    >
      <div className="flex items-center gap-4 sm:gap-5">
        {/* Unique Educational Themed SVG Icon */}
        <div
          className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${iconConfig.bgClass} ${iconConfig.borderClass} border ${iconConfig.textClass} ${iconConfig.hoverBgClass} group-hover:text-white transition-all duration-200 flex items-center justify-center shadow-2xs shrink-0 group-hover:scale-105`}
        >
          <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 transition-transform group-hover:rotate-3" strokeWidth={2.2} />
        </div>

        <div>
          {/* Unit Number Heading */}
          <div className="flex items-center gap-2">
            <h3 className="font-display font-black text-xl sm:text-2xl text-slate-900 group-hover:text-blue-700 transition-colors tracking-tight">
              {unit.displayName}
            </h3>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider hidden xs:inline">
              · Lesson Hub
            </span>
          </div>
          {/* Action text */}
          <p className="text-xs sm:text-sm font-semibold text-slate-500 group-hover:text-slate-700 transition-colors mt-0.5">
            Choose {unit.displayName}
          </p>
        </div>
      </div>

      {/* Trailing arrow button affordance */}
      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-100 group-hover:bg-blue-50 text-slate-400 group-hover:text-blue-600 flex items-center justify-center transition-all group-hover:translate-x-1 shrink-0">
        <ChevronRight className="w-5 h-5" />
      </div>
    </button>
  );
};
