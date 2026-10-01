import React, { useState } from 'react';
import { ClcExamSetup } from './ClcExamSetup';
import { ClcExamPlayer } from './ClcExamPlayer';
import { ClcExamResultView } from './ClcExamResultView';
import {
  ClcExamConfig,
  ClcExamQuestion,
  ClcExamResult,
  ClcExamUserAnswer,
} from '../../types/clcExamBank';
import { generateClcExam, calculateExamScore } from '../../data/clcExamBankEngine';

interface ClcExamBankPageProps {
  onBackToHome: () => void;
}

export const ClcExamBankPage: React.FC<ClcExamBankPageProps> = ({ onBackToHome }) => {
  const [viewState, setViewState] = useState<'setup' | 'exam' | 'result'>('setup');
  const [currentConfig, setCurrentConfig] = useState<ClcExamConfig>({ length: 30 });
  const [activeQuestions, setActiveQuestions] = useState<ClcExamQuestion[]>([]);
  const [examTitle, setExamTitle] = useState<string>('');
  const [examResult, setExamResult] = useState<ClcExamResult | null>(null);

  // Start new examination
  const handleStartExam = (config: ClcExamConfig) => {
    setCurrentConfig(config);
    const generated = generateClcExam(config);
    setActiveQuestions(generated.questions);
    setExamTitle(generated.title);
    setViewState('exam');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Finish exam and calculate score
  const handleFinishExam = (
    answers: Record<string, ClcExamUserAnswer>,
    timeSpentSeconds: number
  ) => {
    const computed = calculateExamScore(
      activeQuestions,
      answers,
      timeSpentSeconds,
      examTitle || 'Đề Thi Khảo Sát Năng Lực CLC'
    );
    setExamResult(computed);
    setViewState('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Retake same exam questions
  const handleRetakeExam = () => {
    setViewState('exam');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Back to setup to pick new parameters
  const handleNewExam = () => {
    setViewState('setup');
    setExamResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-full">
      {viewState === 'setup' && (
        <ClcExamSetup
          onStartExam={handleStartExam}
          onBackToHome={onBackToHome}
        />
      )}

      {viewState === 'exam' && (
        <ClcExamPlayer
          examTitle={examTitle}
          questions={activeQuestions}
          timeLimitMinutes={currentConfig.timingMinutes}
          onFinishExam={handleFinishExam}
          onExitExam={handleNewExam}
        />
      )}

      {viewState === 'result' && examResult && (
        <ClcExamResultView
          result={examResult}
          onRetakeExam={handleRetakeExam}
          onNewExam={handleNewExam}
          onBackToHome={onBackToHome}
        />
      )}
    </div>
  );
};
