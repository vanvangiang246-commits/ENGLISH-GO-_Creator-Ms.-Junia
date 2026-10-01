import React from 'react';
import { BookOpen, Star, Sparkles, GraduationCap, Compass, Award, Heart, CheckCircle2 } from 'lucide-react';
import { ProgramInfo, ProgramId, PROGRAMS } from '../types/curriculum';
import { ProgramCard } from './ProgramCard';

interface HomePageProps {
  onSelectProgram: (id: ProgramId) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onSelectProgram }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Hero Welcome Banner */}
      <section className="text-center mb-12 sm:mb-16">
        {/* Subtle top indicator */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-200 text-amber-900 text-xs sm:text-sm font-semibold mb-4 shadow-2xs">
          <Star className="w-4 h-4 text-amber-600 fill-amber-500" />
          <span>Interactive Primary English Learning</span>
        </div>

        {/* Title */}
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-slate-900 tracking-tight mb-3">
          🚀 ENGLISH GO!
        </h1>

        {/* Subtitle */}
        <p className="font-display font-semibold text-xl sm:text-2xl text-slate-700 mb-2">
          English Learning & Practice
        </p>

        {/* Author */}
        <div className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-slate-600 bg-white px-4 py-1.5 rounded-full border border-slate-200/80 shadow-2xs">
          <span>Author:</span>
          <span className="text-amber-700 font-bold">Ms. Junia</span>
        </div>

        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-600 mt-4 leading-relaxed">
          Welcome young learners! Practice vocabulary, phonics, grammar, and communicative English with structured programs designed specifically for primary school students.
        </p>

        {/* Dedicated Prominent Banner for CLC EXAM BANK – GRADE 5 */}
        <div className="mt-8 max-w-4xl mx-auto bg-gradient-to-r from-rose-900 via-rose-800 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl text-left border border-rose-700/40 relative overflow-hidden">
          <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-rose-500/20 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/30 text-rose-200 text-xs font-extrabold uppercase tracking-wider border border-rose-400/30">
                <span>🏆 NEW ENTRANCE EXAM BANK</span>
                <span className="text-amber-300 font-bold">• Dành cho Lớp 5</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white">
                CLC EXAM BANK – GRADE 5
              </h2>
              <p className="text-xs sm:text-sm text-rose-100 max-w-xl leading-relaxed">
                Ngân hàng đề thi khảo sát năng lực vào lớp 6 CLC (10 / 20 / 25 / 30 / 40 câu). 
                Tỷ lệ chuẩn 70% Lớp 5+ và 30% Lớp 6–7. Mô hình đề thi THCS Nam Từ Liêm, Lương Thế Vinh, Nguyễn Tất Thành, Ngôi Sao.
              </p>
            </div>

            <button
              onClick={() => onSelectProgram('clc_exam')}
              className="py-3.5 px-6 rounded-2xl bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-extrabold text-sm shadow-md shadow-rose-900/50 hover:shadow-lg transition-all shrink-0 flex items-center justify-center gap-2 group active:scale-95 border border-rose-400/40"
            >
              <span>VÀO PHÒNG THI CLC</span>
              <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* Program Selection Section */}
      <section className="mb-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6 sm:mb-8 pb-3 border-b border-slate-200">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Select Your Grade</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900">
              Choose your English program
            </h2>
          </div>
          <span className="text-xs sm:text-sm text-slate-500 font-medium">
            7 specialized learning programs available
          </span>
        </div>

        {/* 6 Large Navigation Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {PROGRAMS.map((program) => (
            <ProgramCard
              key={program.id}
              program={program}
              onSelect={onSelectProgram}
            />
          ))}
        </div>
      </section>

      {/* Primary Learning Pillar Highlights (Friendly & Clean) */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs mb-8">
        <h3 className="font-display font-bold text-lg text-slate-900 mb-4 flex items-center gap-2">
          <span>✨</span>
          <span>Learning Highlights</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-100">
            <div className="text-2xl mb-2">📚</div>
            <div className="font-bold text-slate-900 text-sm mb-1">Standard Global Success</div>
            <div className="text-xs text-slate-600 leading-relaxed">
              Curriculum aligned with Vietnam Primary English textbooks for Grades 1, 2, 3, 4, and 5.
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100">
            <div className="text-2xl mb-2">✏️</div>
            <div className="font-bold text-slate-900 text-sm mb-1">Kid-Friendly Practice</div>
            <div className="text-xs text-slate-600 leading-relaxed">
              Clear visual navigation, friendly typography, and engaging learning structures.
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100">
            <div className="text-2xl mb-2">🎯</div>
            <div className="font-bold text-slate-900 text-sm mb-1">Specialized CLC Prep</div>
            <div className="text-xs text-slate-600 leading-relaxed">
              Advanced preparation pathway for Grade 5 students aspiring to high-quality secondary schools.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
