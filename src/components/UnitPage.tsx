import React, { useState } from 'react';
import {
  ArrowLeft,
  Sparkles,
  BookOpen,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  Layers,
  MessageSquare,
  Award,
  Zap,
  Play,
  Volume2,
  GraduationCap,
} from 'lucide-react';
import { ProgramInfo, UnitItem } from '../types/curriculum';
import { LessonData } from '../types/content';
import { getUnitContentData } from '../data/unitContentDatabase';
import { getUnitIconConfig } from '../utils/unitIcons';
import { VocabularyCard } from './VocabularyCard';

interface UnitPageProps {
  program: ProgramInfo;
  unit: UnitItem;
  onBackToUnits: () => void;
  onNavigateHome: () => void;
  onStartPractice: () => void;
  onSelectLesson: (lesson: LessonData) => void;
}

export const UnitPage: React.FC<UnitPageProps> = ({
  program,
  unit,
  onBackToUnits,
  onNavigateHome,
  onStartPractice,
  onSelectLesson,
}) => {
  const [activeReviewTab, setActiveReviewTab] = useState<
    'vocab' | 'patterns' | 'grammar' | 'skills'
  >('vocab');

  const unitContent = getUnitContentData(unit.id);
  const isVerified = unitContent.sourceStatus === 'SOURCE_VERIFIED';

  const iconConfig = getUnitIconConfig(unit.unitNumber);
  const IconComponent = iconConfig.icon;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Navigation Top: Back Button and Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <button
          onClick={onBackToUnits}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 hover:text-slate-900 shadow-xs transition-all duration-150 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer"
          aria-label={`Back to ${program.code} Units`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>← Back to Units</span>
        </button>

        {/* Clear Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <button onClick={onNavigateHome} className="hover:text-slate-900 transition-colors">
            Home
          </button>
          <span>/</span>
          <button onClick={onBackToUnits} className="hover:text-slate-900 transition-colors">
            {program.code}
          </button>
          <span>/</span>
          <span className="text-blue-700 font-bold">{unit.displayName}</span>
        </nav>
      </div>

      {/* Unit Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl ${iconConfig.bgClass} ${iconConfig.borderClass} border ${iconConfig.textClass} flex items-center justify-center shadow-sm shrink-0`}
            >
              <IconComponent className="w-8 h-8 sm:w-10 sm:h-10" strokeWidth={2.2} />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="inline-block px-3 py-1 bg-sky-100 text-sky-800 text-xs sm:text-sm font-black rounded-lg uppercase tracking-wider border border-sky-200">
                  {program.gradeDisplay}
                </span>
                <span className="inline-block px-2.5 py-1 bg-blue-100 text-blue-800 text-xs sm:text-sm font-black rounded-lg">
                  {unit.displayName}
                </span>
                {isVerified ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    SOURCE VERIFIED
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-lg border border-amber-200">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    SOURCE PENDING
                  </span>
                )}
              </div>
              <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
                {unit.displayName}: {unitContent.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                {program.code} · {unitContent.topic}
              </p>
            </div>
          </div>

          {/* Quick Practice Jump CTA & CLC Entrance */}
          <div className="sm:self-center flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <button
              onClick={onStartPractice}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-display font-extrabold text-base shadow-sm hover:shadow-md transition-all duration-150 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>▶ START PRACTICE</span>
            </button>
            <button
              onClick={() => {
                window.location.hash = `clc/${unit.id}`;
              }}
              className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-white hover:bg-rose-50 border-2 border-rose-200 hover:border-rose-400 text-rose-700 font-display font-extrabold text-sm shadow-xs transition-all duration-150 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              title="Launch CLC Grammar Mode for this Unit"
            >
              <GraduationCap className="w-4 h-4 text-rose-600" />
              <span>🎓 CLC GRAMMAR</span>
            </button>
          </div>
        </div>
      </div>

      {/* If SOURCE PENDING, display standard warning banner and guidance */}
      {!isVerified && (
        <div className="bg-amber-50 border-2 border-amber-300 rounded-3xl p-6 sm:p-8 mb-8 text-amber-900">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-200/80 text-amber-800 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-block px-2.5 py-0.5 rounded bg-amber-200 text-amber-900 text-xs font-extrabold mb-1">
                SOURCE PENDING
              </div>
              <h3 className="font-display font-bold text-lg text-amber-950">
                Textbook Source Required
              </h3>
              <p className="text-xs sm:text-sm text-amber-800 mt-1 leading-relaxed">
                {unitContent.sourceNote ||
                  'Upload the official Global Success textbook source before importing Unit content.'}
              </p>
              <p className="text-xs text-amber-700/80 mt-2 font-medium">
                The application adheres to the strict anti-inventing rule: educational content will only be populated from verified Ministry of Education textbook material.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 1: 📚 UNIT OVERVIEW */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs mb-8">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
          <BookOpen className="w-4 h-4" />
          <span>Curriculum Details</span>
        </div>
        <h2 className="font-display font-extrabold text-xl sm:text-2xl text-slate-900 mb-4">
          📚 UNIT OVERVIEW
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Unit Title & Topic
            </span>
            <div className="font-display font-bold text-base text-slate-900 mt-0.5">
              {unitContent.title}
            </div>
            <div className="text-xs text-slate-600 mt-1">
              Topic: {unitContent.topic}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Main Language Focus
            </span>
            <div className="font-display font-bold text-base text-slate-900 mt-0.5">
              {unitContent.mainLanguageFocus}
            </div>
            <div className="text-xs text-slate-600 mt-1">
              Phonics sound /b/ & communicative introductions
            </div>
          </div>
        </div>

        {/* Learning Objectives */}
        <div className="mt-4 p-5 rounded-2xl bg-sky-50/70 border border-sky-200/80">
          <h3 className="font-display font-bold text-sm text-sky-950 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>Learning Objectives</span>
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
            {unitContent.learningObjectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SECTION 2: 📖 LESSON STRUCTURE & CARDS */}
      {unitContent.lessons.length > 0 && (
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs mb-8">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 mb-2">
            <Layers className="w-4 h-4" />
            <span>Textbook Lessons</span>
          </div>
          <h2 className="font-display font-extrabold text-xl sm:text-2xl text-slate-900 mb-2">
            Choose a Lesson
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mb-6">
            Click any lesson card below to view detailed activities, target words, and conversation drills.
          </p>

          <div className="space-y-4">
            {unitContent.lessons.map((lesson) => (
              <button
                key={lesson.id}
                onClick={() => onSelectLesson(lesson)}
                className="group w-full p-5 sm:p-6 rounded-2xl bg-white border-2 border-slate-200 hover:border-blue-500 shadow-xs hover:shadow-md transition-all duration-150 active:scale-[0.99] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-400"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900 text-xs font-extrabold uppercase tracking-wide">
                      LESSON {lesson.lessonNumber}
                    </span>
                    <span className="text-xs text-slate-400 font-semibold">
                      {lesson.activities.length} Activities
                    </span>
                  </div>
                  <h3 className="font-display font-extrabold text-lg sm:text-xl text-slate-900 group-hover:text-blue-700 transition-colors">
                    {lesson.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-slate-500">
                    {lesson.activities.map((a) => (
                      <span
                        key={a.number}
                        className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200/80"
                      >
                        {a.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm font-bold text-blue-600 group-hover:text-blue-700 self-end sm:self-center shrink-0">
                  <span>VIEW LESSON</span>
                  <div className="w-8 h-8 rounded-full bg-blue-50 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-all group-hover:translate-x-1">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* SECTION 3: 📚 CONTENT REVIEW MODE (Vocabulary, Sentence Patterns, Grammar, Skills) */}
      {isVerified && (
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs mb-8">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">
                <Sparkles className="w-4 h-4" />
                <span>Student Review Center</span>
              </div>
              <h2 className="font-display font-extrabold text-xl sm:text-2xl text-slate-900">
                📚 REVIEW UNIT
              </h2>
            </div>

            {/* Review Category Tabs */}
            <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold">
              <button
                onClick={() => setActiveReviewTab('vocab')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeReviewTab === 'vocab'
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Vocabulary ({unitContent.vocabulary.length})
              </button>
              <button
                onClick={() => setActiveReviewTab('patterns')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeReviewTab === 'patterns'
                    ? 'bg-white text-emerald-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Sentence Patterns ({unitContent.sentencePatterns.length})
              </button>
              <button
                onClick={() => setActiveReviewTab('grammar')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeReviewTab === 'grammar'
                    ? 'bg-white text-purple-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Language / Grammar
              </button>
              <button
                onClick={() => setActiveReviewTab('skills')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeReviewTab === 'skills'
                    ? 'bg-white text-amber-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Skills ({unitContent.skills.length})
              </button>
            </div>
          </div>

          {/* TAB 1: VOCABULARY */}
          {activeReviewTab === 'vocab' && (
            <div>
              <p className="text-xs sm:text-sm text-slate-500 mb-4">
                Learn and listen to the verified target vocabulary for {unit.displayName}:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {unitContent.vocabulary.map((item) => (
                  <VocabularyCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: SENTENCE PATTERNS */}
          {activeReviewTab === 'patterns' && (
            <div>
              <p className="text-xs sm:text-sm text-slate-500 mb-4">
                Practice everyday greetings and communication formulas:
              </p>
              <div className="space-y-3.5">
                {unitContent.sentencePatterns.map((pat) => (
                  <div
                    key={pat.id}
                    className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-slate-800"
                  >
                    <div className="flex items-start justify-between gap-3 mb-1.5">
                      <span className="text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-200 text-emerald-900">
                        {pat.pattern}
                      </span>
                      <span className="text-xs text-slate-400 font-semibold">
                        {pat.sourceLesson}
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-slate-600 mt-1">
                      Purpose: <strong className="text-slate-800">{pat.communicativePurpose}</strong>
                    </div>
                    <div className="mt-3 pt-3 border-t border-emerald-200/80 flex items-center gap-2 text-sm font-bold text-emerald-950">
                      <span>Example dialogue:</span>
                      <span className="italic text-blue-700">&ldquo;{pat.example}&rdquo;</span>
                      {pat.responseExample && (
                        <span className="text-slate-600 font-normal">→ &ldquo;{pat.responseExample}&rdquo;</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: LANGUAGE / GRAMMAR */}
          {activeReviewTab === 'grammar' && (
            <div>
              <p className="text-xs sm:text-sm text-slate-500 mb-4">
                Phonics rules and spoken sentence structures:
              </p>
              <div className="space-y-4">
                {unitContent.grammar.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 rounded-2xl bg-purple-50/60 border border-purple-200 text-slate-800"
                  >
                    <h3 className="font-display font-extrabold text-lg text-purple-950 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mb-3 leading-relaxed">
                      {item.description}
                    </p>
                    <div className="space-y-1.5 mb-3 text-xs sm:text-sm text-slate-700">
                      {item.rules.map((rule, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                          <span>{rule}</span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-3 border-t border-purple-200/80 flex flex-wrap items-center gap-2 text-xs font-bold text-purple-900">
                      <span>Key Examples:</span>
                      {item.examples.map((ex, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded bg-white border border-purple-200"
                        >
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SKILLS */}
          {activeReviewTab === 'skills' && (
            <div>
              <p className="text-xs sm:text-sm text-slate-500 mb-4">
                Integrated English skills developed throughout {unit.displayName}:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {unitContent.skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-display font-black text-sm text-slate-900">
                          {skill.name}
                        </span>
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {skill.description}
                      </p>
                    </div>
                    <div className="mt-3 text-[11px] font-bold text-blue-600">
                      Active In Curriculum
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* SECTION 4: MAIN PRACTICE ENTRY BUTTON */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg shadow-amber-900/10 mb-8">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-display font-black text-2xl sm:text-3xl tracking-tight mb-2">
            Practice What You Learned!
          </h2>
          <p className="text-xs sm:text-sm text-amber-100 mb-6 leading-relaxed">
            Configure your question package (10, 20, 25, 30, or 40 questions) and test your knowledge for {unit.displayName}.
          </p>

          <button
            onClick={onStartPractice}
            className="w-full sm:w-auto px-8 sm:px-10 py-4 rounded-2xl bg-white hover:bg-amber-50 text-amber-900 font-display font-black text-xl sm:text-2xl shadow-md transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer flex items-center justify-center gap-3 mx-auto focus:outline-none focus-visible:ring-4 focus-visible:ring-white"
            aria-label="Start Practice"
          >
            <span className="text-2xl leading-none">▶</span>
            <span>START PRACTICE</span>
          </button>
        </div>
      </div>

      {/* Bottom Back Button */}
      <div className="flex justify-center">
        <button
          onClick={onBackToUnits}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:text-slate-900 shadow-xs transition-all duration-150 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>← Back to Units</span>
        </button>
      </div>
    </div>
  );
};
