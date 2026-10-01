import React from 'react';
import { BookOpen, Star, Sparkles, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white text-slate-600">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="text-xl">🚀</span>
              <span className="font-display font-bold text-slate-900 text-lg">ENGLISH GO!</span>
              <span className="text-xs bg-amber-100 text-amber-800 font-semibold px-2 py-0.5 rounded-full">
                Primary English
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Interactive English learning & revision for primary students (Global Success 1–5 & Ôn thi CLC).
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end text-sm">
            <div className="font-semibold text-slate-800 flex items-center gap-1.5">
              <span>Created with care by</span>
              <span className="text-amber-700 font-bold">Ms. Junia</span>
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              Supporting young learners in their English journey
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <span>© {new Date().getFullYear()} ENGLISH GO! · All rights reserved.</span>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              Primary School Education
            </span>
            <span aria-hidden="true">·</span>
            <span>Step 1: Application Foundation</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
