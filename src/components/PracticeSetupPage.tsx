import React, { useState } from 'react';
import { ArrowLeft, Sparkles, CheckCircle2, Award, Zap, Layers, Play } from 'lucide-react';
import {
  ProgramInfo,
  UnitItem,
  QuestionPackageCount,
  DifficultyLevelId,
  QUESTION_PACKAGES,
  DIFFICULTY_OPTIONS,
} from '../types/curriculum';
import { getUnitIconConfig } from '../utils/unitIcons';
import { StudentInfo } from '../types/student';
import { getCurrentStudent } from '../utils/studentStorage';
import { StudentInfoSection } from './student/StudentInfoSection';

interface PracticeSetupPageProps {
  program: ProgramInfo;
  unit: UnitItem;
  onBackToUnit: () => void;
  onNavigateHome: () => void;
  onStartSession: (
    questionCount: QuestionPackageCount,
    difficulty: DifficultyLevelId,
    student?: StudentInfo
  ) => void;
}

export const PracticeSetupPage: React.FC<PracticeSetupPageProps> = ({
  program,
  unit,
  onBackToUnit,
  onNavigateHome,
  onStartSession,
}) => {
  // Default to 10 or 20 questions
  const [selectedCount, setSelectedCount] = useState<QuestionPackageCount>(20);
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevelId>('level1');
  const [student, setStudent] = useState<StudentInfo | null>(() => getCurrentStudent());
  const [studentError, setStudentError] = useState<string | null>(null);

  const iconConfig = getUnitIconConfig(unit.unitNumber);
  const IconComponent = iconConfig.icon;

  const currentPackage = QUESTION_PACKAGES.find((p) => p.count === selectedCount);
  const currentDiff = DIFFICULTY_OPTIONS.find((d) => d.id === selectedDifficulty);

  const handleStart = () => {
    if (!student || !student.fullName.trim() || !student.className.trim()) {
      setStudentError('Please enter your full name and select your class before starting.');
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }
    setStudentError(null);
    onStartSession(selectedCount, selectedDifficulty, student);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Navigation Top: Back Button and Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <button
          onClick={onBackToUnit}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 hover:text-slate-900 shadow-xs transition-all duration-150 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          aria-label={`Back to ${unit.displayName}`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>← Back to Unit</span>
        </button>

        {/* Clear Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <button onClick={onNavigateHome} className="hover:text-slate-900 transition-colors">
            Home
          </button>
          <span>/</span>
          <button onClick={onBackToUnit} className="hover:text-slate-900 transition-colors">
            {program.code}
          </button>
          <span>/</span>
          <button onClick={onBackToUnit} className="hover:text-slate-900 transition-colors">
            {unit.displayName}
          </button>
          <span>/</span>
          <span className="text-amber-700 font-bold">Practice Setup</span>
        </nav>
      </div>

      {/* Header Context Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs mb-6 sm:mb-8">
        <div className="flex items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center text-3xl shadow-sm shrink-0">
              🎯
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="inline-block px-3 py-0.5 bg-sky-100 text-sky-800 text-xs sm:text-sm font-black rounded-lg uppercase tracking-wider border border-sky-200">
                  {program.gradeDisplay}
                </span>
                <span className="inline-block px-2.5 py-0.5 bg-blue-100 text-blue-800 text-xs sm:text-sm font-black rounded-lg">
                  {unit.displayName}
                </span>
                <span className="inline-block px-2.5 py-0.5 bg-amber-100 text-amber-900 text-xs sm:text-sm font-bold rounded-lg border border-amber-200">
                  Setup Mode
                </span>
              </div>
              <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
                🎯 PRACTICE SETUP
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                {program.code} · {program.gradeDisplay} · {unit.displayName}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Required Student Information Section */}
      <StudentInfoSection
        student={student}
        onStudentChange={(newStudent) => {
          setStudent(newStudent);
          setStudentError(null);
        }}
        error={studentError}
        defaultGrade={program.grade || 5}
      />

      {/* Section 1: Choose the number of questions */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs mb-6">
        <div className="mb-5">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-1 flex items-center gap-1.5">
            <Layers className="w-4 h-4" />
            <span>Question Package</span>
          </div>
          <h2 className="font-display font-extrabold text-xl sm:text-2xl text-slate-900">
            Choose the number of questions:
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Select one of the 5 official practice packages for this session.
          </p>
        </div>

        {/* 5 Distinct Cards for 10, 20, 25, 30, 40 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {QUESTION_PACKAGES.map((pkg) => {
            const isSelected = selectedCount === pkg.count;
            return (
              <button
                key={pkg.count}
                onClick={() => setSelectedCount(pkg.count)}
                className={`p-4 sm:p-5 rounded-2xl border-2 text-left transition-all duration-150 relative cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-400 ${
                  isSelected
                    ? 'bg-amber-50/80 border-amber-500 shadow-sm scale-[1.01]'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                }`}
                aria-pressed={isSelected}
              >
                <div className="flex items-start justify-between">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                    Package
                  </span>
                  {isSelected && (
                    <CheckCircle2 className="w-5 h-5 text-amber-600 fill-amber-100" />
                  )}
                </div>

                <div className="mt-3">
                  <div className="font-display font-black text-xl sm:text-2xl text-slate-900 tracking-tight">
                    {pkg.label}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-amber-800 mt-0.5">
                    {pkg.description}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Section 2: Difficulty Level Architecture (LEVEL 1 / LEVEL 2 / LEVEL 3) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs mb-6">
        <div className="mb-4">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1 flex items-center gap-1.5">
            <Zap className="w-4 h-4" />
            <span>Learning Difficulty</span>
          </div>
          <h2 className="font-display font-extrabold text-lg sm:text-xl text-slate-900">
            Select Difficulty Level:
          </h2>
          <p className="text-xs text-slate-500">
            Tailor the question complexity to your current mastery.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {DIFFICULTY_OPTIONS.map((diff) => {
            const isSelected = selectedDifficulty === diff.id;
            return (
              <button
                key={diff.id}
                onClick={() => setSelectedDifficulty(diff.id)}
                className={`p-3.5 sm:p-4 rounded-2xl border-2 text-left transition-all duration-150 cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-400 ${
                  isSelected
                    ? 'bg-blue-50/80 border-blue-500 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-display font-black text-sm text-slate-900">
                    {diff.label}
                  </span>
                  {isSelected && (
                    <CheckCircle2 className="w-4 h-4 text-blue-600 fill-blue-100" />
                  )}
                </div>
                <div className="text-xs font-bold text-blue-700">{diff.tag}</div>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {diff.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Confirmation Area & [ START ] Button */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="max-w-xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">
            <Sparkles className="w-4 h-4" />
            <span>Session Confirmation</span>
          </div>

          {/* Context Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pb-5 mb-5 border-b border-slate-700 text-sm">
            <div>
              <span className="text-xs text-slate-400 block">Book & Level</span>
              <span className="font-bold text-slate-100">{program.code}</span>
              <span className="text-xs text-sky-300 block">{program.gradeDisplay}</span>
            </div>

            <div>
              <span className="text-xs text-slate-400 block">Active Unit</span>
              <span className="font-extrabold text-amber-300 text-base">
                {unit.displayName}
              </span>
              <span className="text-xs text-slate-400 block">ID: {unit.id}</span>
            </div>

            <div>
              <span className="text-xs text-slate-400 block">Question Package</span>
              <span className="font-black text-emerald-400 text-base">
                {selectedCount} QUESTIONS
              </span>
              <span className="text-xs text-slate-400 block">
                {currentDiff?.label} · {currentDiff?.tag}
              </span>
            </div>
          </div>

          {/* START button */}
          <div className="flex flex-col items-center">
            <button
              onClick={handleStart}
              className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-display font-black text-xl sm:text-2xl shadow-lg shadow-emerald-900/40 transition-all duration-150 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400"
              aria-label="Start Practice Session"
            >
              <span>▶ START</span>
            </button>
            <p className="text-xs text-slate-400 mt-2.5">
              Launch session with {selectedCount} questions for {unit.displayName}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Back Button */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={onBackToUnit}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:text-slate-900 shadow-xs transition-all duration-150 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>← Back to Unit</span>
        </button>
      </div>
    </div>
  );
};
