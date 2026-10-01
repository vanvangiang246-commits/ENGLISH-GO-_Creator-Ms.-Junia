import React from 'react';
import { Sparkles, Home, BookOpen } from 'lucide-react';
import { ProgramId } from '../types/curriculum';

interface HeaderProps {
  currentView: 'home' | ProgramId;
  onNavigateHome: () => void;
  onNavigateExamBank?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigateHome,
  onNavigateExamBank,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-3 text-left group transition-transform active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg p-1"
          aria-label="ENGLISH GO! Home"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-400 text-white flex items-center justify-center font-bold text-xl shadow-sm shadow-amber-200 group-hover:scale-105 transition-transform">
            🚀
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-xl sm:text-2xl text-slate-900 tracking-tight">
                ENGLISH GO!
              </span>
            </div>
            <div className="text-xs text-slate-500 font-medium hidden sm:flex items-center gap-1.5">
              <span>English Learning & Practice</span>
              <span aria-hidden="true">·</span>
              <span className="text-amber-700 font-semibold">Author: Ms. Junia</span>
            </div>
          </div>
        </button>

        {/* Action & Nav Zone */}
        <div className="flex items-center gap-2.5">
          {/* Dedicated CLC Exam Bank Button */}
          {onNavigateExamBank && (
            <button
              onClick={onNavigateExamBank}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                currentView === 'clc_exam'
                  ? 'bg-rose-600 text-white shadow-xs ring-2 ring-rose-300'
                  : 'bg-rose-50 text-rose-800 border border-rose-200/80 hover:bg-rose-100'
              }`}
            >
              <span>🏆</span>
              <span className="hidden sm:inline">CLC EXAM BANK</span>
              <span className="sm:hidden">Exam Bank</span>
              <span className="text-[10px] uppercase px-1.5 py-0.5 rounded bg-rose-200/60 text-rose-900 font-extrabold hidden md:inline">
                Grade 5
              </span>
            </button>
          )}

          {currentView !== 'home' ? (
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              <Home className="w-4 h-4 text-slate-600" />
              <span>Home</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200/80 px-3 py-1.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden sm:inline">Primary English Hub</span>
              <span className="sm:hidden">Hub</span>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Sub-bar for Author on very small screens */}
      <div className="sm:hidden px-4 py-1.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
        <span>English Learning & Practice</span>
        <span className="font-semibold text-amber-700">Author: Ms. Junia</span>
      </div>
    </header>
  );
};
