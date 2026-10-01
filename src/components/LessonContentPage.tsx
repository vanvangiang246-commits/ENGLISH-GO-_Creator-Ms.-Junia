import React from 'react';
import { ArrowLeft, BookOpen, Layers, CheckCircle2, Sparkles, MessageSquare, Award, Volume2 } from 'lucide-react';
import { ProgramInfo, UnitItem } from '../types/curriculum';
import { LessonData, UnitContentData } from '../types/content';
import { VocabularyCard } from './VocabularyCard';

interface LessonContentPageProps {
  program: ProgramInfo;
  unit: UnitItem;
  lesson: LessonData;
  unitContent: UnitContentData;
  onBackToUnit: () => void;
  onNavigateHome: () => void;
  onStartPractice: () => void;
}

export const LessonContentPage: React.FC<LessonContentPageProps> = ({
  program,
  unit,
  lesson,
  unitContent,
  onBackToUnit,
  onNavigateHome,
  onStartPractice,
}) => {
  // Find vocabulary relevant to this lesson
  const lessonVocab = unitContent.vocabulary.filter((v) =>
    lesson.vocabularyIds.includes(v.id)
  );

  // Find sentence patterns relevant to this lesson
  const lessonPatterns = unitContent.sentencePatterns.filter((p) =>
    lesson.sentencePatternIds.includes(p.id)
  );

  // Find grammar/language relevant to this lesson
  const lessonGrammar = unitContent.grammar.filter((g) =>
    lesson.grammarIds.includes(g.id)
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Navigation Top: Back Button and Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <button
          onClick={onBackToUnit}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 hover:text-slate-900 shadow-xs transition-all duration-150 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer"
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
          <span className="text-blue-700 font-bold">Lesson {lesson.lessonNumber}</span>
        </nav>
      </div>

      {/* Lesson Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="inline-block px-3 py-1 bg-sky-100 text-sky-800 text-xs font-black rounded-lg uppercase tracking-wider border border-sky-200">
            {program.gradeDisplay}
          </span>
          <span className="inline-block px-2.5 py-1 bg-blue-100 text-blue-800 text-xs font-black rounded-lg">
            {unit.displayName}
          </span>
          <span className="inline-block px-2.5 py-1 bg-amber-100 text-amber-900 text-xs font-black rounded-lg border border-amber-200">
            LESSON {lesson.lessonNumber}
          </span>
        </div>

        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight mb-1">
          {lesson.title}
        </h1>

        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          {program.code} · {unitContent.title}
        </p>

        {/* Skills Pills */}
        {lesson.skills.length > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs font-bold">
            <span className="text-slate-400 font-semibold mr-1">Skills:</span>
            {lesson.skills.map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Lesson Activities Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs mb-8">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 mb-2">
          <Sparkles className="w-4 h-4" />
          <span>Textbook Activities</span>
        </div>
        <h2 className="font-display font-extrabold text-xl sm:text-2xl text-slate-900 mb-5">
          Lesson Activities
        </h2>

        <div className="space-y-3.5">
          {lesson.activities.map((act) => (
            <div
              key={act.number}
              className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-display font-black text-sm flex items-center justify-center shrink-0 shadow-xs">
                {act.number}
              </div>
              <div>
                <h3 className="font-display font-bold text-base sm:text-lg text-slate-900">
                  {act.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  {act.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lesson Target Vocabulary (if present) */}
      {lessonVocab.length > 0 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs mb-8">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
            <BookOpen className="w-4 h-4" />
            <span>Target Words</span>
          </div>
          <h2 className="font-display font-extrabold text-xl sm:text-2xl text-slate-900 mb-5">
            Lesson Vocabulary
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {lessonVocab.map((vocab) => (
              <VocabularyCard key={vocab.id} item={vocab} />
            ))}
          </div>
        </div>
      )}

      {/* Lesson Sentence Patterns (if present) */}
      {lessonPatterns.length > 0 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs mb-8">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 mb-2">
            <MessageSquare className="w-4 h-4" />
            <span>Communication Focus</span>
          </div>
          <h2 className="font-display font-extrabold text-xl sm:text-2xl text-slate-900 mb-5">
            Sentence Patterns
          </h2>

          <div className="space-y-4">
            {lessonPatterns.map((pat) => (
              <div
                key={pat.id}
                className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-slate-800"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <span className="text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-200 text-emerald-900">
                    Pattern
                  </span>
                  <span className="text-xs text-slate-500 font-semibold">
                    {pat.sourceLesson}
                  </span>
                </div>
                <div className="font-display font-black text-xl text-slate-900">
                  {pat.pattern}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Purpose: <strong>{pat.communicativePurpose}</strong>
                </p>
                <div className="mt-3 pt-3 border-t border-emerald-200/80 flex items-center gap-2 text-sm font-semibold text-emerald-900">
                  <span>Example:</span>
                  <span className="italic font-bold text-slate-900">&ldquo;{pat.example}&rdquo;</span>
                  {pat.responseExample && (
                    <span className="text-slate-600 font-normal">→ &ldquo;{pat.responseExample}&rdquo;</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lesson Language/Phonics (if present) */}
      {lessonGrammar.length > 0 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs mb-8">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-600 mb-2">
            <Award className="w-4 h-4" />
            <span>Phonics & Language Focus</span>
          </div>
          <h2 className="font-display font-extrabold text-xl sm:text-2xl text-slate-900 mb-5">
            Language Details
          </h2>

          <div className="space-y-4">
            {lessonGrammar.map((gram) => (
              <div
                key={gram.id}
                className="p-5 rounded-2xl bg-purple-50/60 border border-purple-200 text-slate-800"
              >
                <h3 className="font-display font-bold text-lg text-purple-950 mb-1">
                  {gram.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mb-3 leading-relaxed">
                  {gram.description}
                </p>
                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                  {gram.rules.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Practice Action & Back */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl p-6 sm:p-8 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-display font-black text-xl text-white">
            Ready to test your skills?
          </h3>
          <p className="text-xs sm:text-sm text-amber-100 mt-0.5">
            Launch a tailored practice package for {unit.displayName}.
          </p>
        </div>
        <button
          onClick={onStartPractice}
          className="px-6 py-3 rounded-2xl bg-white hover:bg-amber-50 text-amber-900 font-display font-black text-base shadow-sm transition-all duration-150 active:scale-95 cursor-pointer whitespace-nowrap"
        >
          ▶ START PRACTICE
        </button>
      </div>

      {/* Bottom Back Button */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={onBackToUnit}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:text-slate-900 shadow-xs transition-all duration-150 active:scale-95 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>← Back to Unit</span>
        </button>
      </div>
    </div>
  );
};
