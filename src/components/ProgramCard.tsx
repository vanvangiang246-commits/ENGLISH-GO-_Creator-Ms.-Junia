import React from 'react';
import { ChevronRight, Layers } from 'lucide-react';
import { ProgramInfo } from '../types/curriculum';

interface ProgramCardProps {
  program: ProgramInfo;
  onSelect: (id: ProgramInfo['id']) => void;
}

export const ProgramCard: React.FC<ProgramCardProps> = ({ program, onSelect }) => {
  const isClc = program.id === 'clc';
  const isExamBank = program.id === 'clc_exam';

  return (
    <button
      onClick={() => onSelect(program.id)}
      className={`group relative text-left w-full h-full p-6 sm:p-7 rounded-2xl bg-white border-2 ${program.theme.border} ${program.theme.hoverBorder} shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-400 flex flex-col justify-between`}
      aria-label={`Select ${program.code} - ${program.gradeDisplay}`}
    >
      <div>
        {/* Top Header: Icon + Unit Count */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-sm transition-transform duration-200 group-hover:scale-105 ${
              isExamBank
                ? 'bg-gradient-to-tr from-amber-500 via-rose-600 to-indigo-600 text-white shadow-rose-200'
                : isClc
                ? 'bg-gradient-to-tr from-rose-500 to-red-600 text-white shadow-rose-200'
                : 'bg-gradient-to-tr from-sky-500 to-blue-600 text-white shadow-sky-200'
            }`}
          >
            {isExamBank ? '🏆' : isClc ? '🎓' : '📘'}
          </div>

          <div className="flex flex-col items-end">
            {program.unitCount ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wide bg-slate-100 text-slate-800 border border-slate-200">
                <Layers className="w-3.5 h-3.5 text-slate-500" />
                <span>{program.unitCount} UNITS</span>
              </span>
            ) : isExamBank ? (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wide bg-amber-100 text-amber-900 border border-amber-300">
                ⭐ EXAM BANK (10–40Qs)
              </span>
            ) : (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wide bg-rose-100 text-rose-800 border border-rose-200">
                ADVANCED PREP
              </span>
            )}
          </div>
        </div>

        {/* Prominent Book Title */}
        <h3 className="font-display font-extrabold text-xl sm:text-2xl text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-2">
          <span>{program.code}</span>
        </h3>

        {/* Prominent Grade Display */}
        <div className="mt-1 mb-2">
          <span
            className={`inline-block font-display font-black text-sm tracking-wider uppercase px-2.5 py-0.5 rounded-md ${
              isExamBank
                ? 'bg-rose-50 text-rose-800 border border-rose-300'
                : isClc
                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                : 'bg-blue-50 text-blue-800 border border-blue-200'
            }`}
          >
            {program.gradeDisplay}
          </span>
        </div>

        {program.subtitle && (
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mt-1">
            {program.subtitle}
          </p>
        )}

        <p className="text-sm text-slate-600 mt-2.5 leading-relaxed line-clamp-2">
          {program.description}
        </p>
      </div>

      {/* Bottom Action Affordance */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-sm font-bold">
        <span
          className={`flex items-center gap-1 transition-colors ${
            isExamBank
              ? 'text-rose-700 group-hover:text-rose-800'
              : isClc
              ? 'text-rose-600 group-hover:text-rose-700'
              : 'text-blue-600 group-hover:text-blue-700'
          }`}
        >
          {isExamBank ? 'Vào CLC Exam Bank' : isClc ? 'Open Ôn Thi CLC' : `Open ${program.book}`}
        </span>
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:translate-x-1 ${
            isExamBank || isClc
              ? 'bg-rose-50 text-rose-600 group-hover:bg-rose-100'
              : 'bg-blue-50 text-blue-600 group-hover:bg-blue-100'
          }`}
        >
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </button>
  );
};
