/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { BookPage } from './components/BookPage';
import { UnitPage } from './components/UnitPage';
import { LessonContentPage } from './components/LessonContentPage';
import { PracticeSetupPage } from './components/PracticeSetupPage';
import { PracticeSessionPage } from './components/PracticeSessionPage';
import { ClcPage } from './components/ClcPage';
import { ClcExamBankPage } from './components/clcExam/ClcExamBankPage';
import {
  ProgramId,
  PROGRAMS,
  UnitItem,
  getBookUnits,
  GlobalSuccessId,
  QuestionPackageCount,
  DifficultyLevelId,
} from './types/curriculum';
import { LessonData } from './types/content';
import { getUnitContentData } from './data/unitContentDatabase';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | ProgramId>('home');
  const [selectedUnit, setSelectedUnit] = useState<UnitItem | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<LessonData | null>(null);
  const [inSetup, setInSetup] = useState<boolean>(false);
  const [activeSession, setActiveSession] = useState<{
    questionCount: QuestionPackageCount;
    difficulty: DifficultyLevelId;
  } | null>(null);
  const [clcUnitId, setClcUnitId] = useState<string | undefined>(undefined);

  // Sync state with URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const rawHash = window.location.hash.replace('#', '');
      if (!rawHash || rawHash === 'home') {
        setCurrentView('home');
        setSelectedUnit(null);
        setSelectedLesson(null);
        setInSetup(false);
        setActiveSession(null);
        setClcUnitId(undefined);
        return;
      }

      // Check hash pattern: e.g. "gs1/u1", "gs1/u1/l1", "gs1/u1/setup", "gs1/u1/session", "clc", "clc/GS5-U20", "clc_exam"
      if (rawHash === 'clc-exam' || rawHash === 'clc_exam') {
        setCurrentView('clc_exam');
        setSelectedUnit(null);
        setSelectedLesson(null);
        setInSetup(false);
        setActiveSession(null);
        setClcUnitId(undefined);
        return;
      }

      const parts = rawHash.split('/');
      const bookId = parts[0] as ProgramId;
      const validIds: ProgramId[] = ['gs1', 'gs2', 'gs3', 'gs4', 'gs5', 'clc', 'clc_exam'];

      if (validIds.includes(bookId)) {
        setCurrentView(bookId);

        if (bookId === 'clc_exam') {
          setSelectedUnit(null);
          setSelectedLesson(null);
          setInSetup(false);
          setActiveSession(null);
          setClcUnitId(undefined);
          return;
        }

        if (bookId === 'clc') {
          if (parts[1]) {
            setClcUnitId(parts[1].toUpperCase());
          } else {
            setClcUnitId(undefined);
          }
          setSelectedUnit(null);
          setSelectedLesson(null);
          setInSetup(false);
          setActiveSession(null);
          return;
        }

        if (parts.length > 1) {
          const unitNum = parseInt(parts[1].replace(/^u/i, ''), 10);
          if (!isNaN(unitNum)) {
            const units = getBookUnits(bookId as GlobalSuccessId);
            const foundUnit = units.find((u) => u.unitNumber === unitNum);
            setSelectedUnit(foundUnit || null);

            if (foundUnit) {
              const unitContent = getUnitContentData(foundUnit.id);

              if (parts[2] === 'setup') {
                setInSetup(true);
                setSelectedLesson(null);
                setActiveSession(null);
              } else if (parts[2] === 'session') {
                setInSetup(false);
                setSelectedLesson(null);
                setActiveSession((prev) => prev || { questionCount: 20, difficulty: 'level1' });
              } else if (parts[2] && parts[2].startsWith('l')) {
                const lessonNum = parseInt(parts[2].replace(/^l/i, ''), 10);
                const foundLesson = unitContent.lessons.find(
                  (l) => l.lessonNumber === lessonNum
                );
                setSelectedLesson(foundLesson || null);
                setInSetup(false);
                setActiveSession(null);
              } else {
                setSelectedLesson(null);
                setInSetup(false);
                setActiveSession(null);
              }
              return;
            }
          }
        }
        setSelectedUnit(null);
        setSelectedLesson(null);
        setInSetup(false);
        setActiveSession(null);
      } else {
        setCurrentView('home');
        setSelectedUnit(null);
        setSelectedLesson(null);
        setInSetup(false);
        setActiveSession(null);
      }
    };

    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateToProgram = (id: ProgramId) => {
    setCurrentView(id);
    setSelectedUnit(null);
    setSelectedLesson(null);
    setInSetup(false);
    setActiveSession(null);
    window.location.hash = id;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    setCurrentView('home');
    setSelectedUnit(null);
    setSelectedLesson(null);
    setInSetup(false);
    setActiveSession(null);
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectUnit = (unit: UnitItem) => {
    setSelectedUnit(unit);
    setSelectedLesson(null);
    setInSetup(false);
    setActiveSession(null);
    window.location.hash = `${unit.bookId}/u${unit.unitNumber}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToUnits = () => {
    setSelectedUnit(null);
    setSelectedLesson(null);
    setInSetup(false);
    setActiveSession(null);
    if (currentView !== 'home') {
      window.location.hash = currentView;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectLesson = (lesson: LessonData) => {
    if (!selectedUnit) return;
    setSelectedLesson(lesson);
    setInSetup(false);
    setActiveSession(null);
    window.location.hash = `${selectedUnit.bookId}/u${selectedUnit.unitNumber}/l${lesson.lessonNumber}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToUnit = () => {
    if (!selectedUnit) return;
    setSelectedLesson(null);
    setInSetup(false);
    setActiveSession(null);
    window.location.hash = `${selectedUnit.bookId}/u${selectedUnit.unitNumber}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartPractice = () => {
    if (!selectedUnit) return;
    setInSetup(true);
    setSelectedLesson(null);
    setActiveSession(null);
    window.location.hash = `${selectedUnit.bookId}/u${selectedUnit.unitNumber}/setup`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartSession = (
    questionCount: QuestionPackageCount,
    difficulty: DifficultyLevelId
  ) => {
    if (!selectedUnit) return;
    setActiveSession({ questionCount, difficulty });
    setInSetup(false);
    setSelectedLesson(null);
    window.location.hash = `${selectedUnit.bookId}/u${selectedUnit.unitNumber}/session`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToSetup = () => {
    if (!selectedUnit) return;
    setActiveSession(null);
    setInSetup(true);
    setSelectedLesson(null);
    window.location.hash = `${selectedUnit.bookId}/u${selectedUnit.unitNumber}/setup`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectedProgram = PROGRAMS.find((p) => p.id === currentView);
  const unitContent = selectedUnit ? getUnitContentData(selectedUnit.id) : null;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Top Application Header */}
      <Header
        currentView={currentView}
        onNavigateHome={navigateToHome}
        onNavigateExamBank={() => navigateToProgram('clc_exam')}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {currentView === 'home' && (
          <HomePage onSelectProgram={navigateToProgram} />
        )}

        {currentView !== 'home' && (
          <>
            {currentView === 'clc_exam' ? (
              <ClcExamBankPage onBackToHome={navigateToHome} />
            ) : selectedProgram && (
              currentView === 'clc' ? (
                <ClcPage
                  program={selectedProgram}
                  initialUnitId={clcUnitId}
                  onBackToHome={navigateToHome}
                />
              ) : selectedUnit ? (
                activeSession ? (
                  <PracticeSessionPage
                    program={selectedProgram}
                    unit={selectedUnit}
                    questionCount={activeSession.questionCount}
                    difficulty={activeSession.difficulty}
                    onBackToSetup={handleBackToSetup}
                    onNavigateHome={navigateToHome}
                  />
                ) : inSetup ? (
                  <PracticeSetupPage
                    program={selectedProgram}
                    unit={selectedUnit}
                    onBackToUnit={handleBackToUnit}
                    onNavigateHome={navigateToHome}
                    onStartSession={handleStartSession}
                  />
                ) : selectedLesson && unitContent ? (
                  <LessonContentPage
                    program={selectedProgram}
                    unit={selectedUnit}
                    lesson={selectedLesson}
                    unitContent={unitContent}
                    onBackToUnit={handleBackToUnit}
                    onNavigateHome={navigateToHome}
                    onStartPractice={handleStartPractice}
                  />
                ) : (
                  <UnitPage
                    program={selectedProgram}
                    unit={selectedUnit}
                    onBackToUnits={handleBackToUnits}
                    onNavigateHome={navigateToHome}
                    onStartPractice={handleStartPractice}
                    onSelectLesson={handleSelectLesson}
                  />
                )
              ) : (
                <BookPage
                  program={selectedProgram}
                  onBackToHome={navigateToHome}
                  onSelectUnit={handleSelectUnit}
                />
              )
            )}
          </>
        )}
      </main>

      {/* Global Application Footer */}
      <Footer />
    </div>
  );
}
