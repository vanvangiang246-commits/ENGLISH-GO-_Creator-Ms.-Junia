export interface StudentInfo {
  fullName: string;
  className: string; // e.g. '5A3'
  grade: number;     // 1, 2, 3, 4, or 5
}

export type TestType = 'Unit Practice' | 'CLC Practice' | 'CLC Exam Bank';

export interface StudentAttemptRecord {
  id: string; // e.g. 'ATT-20261001-0001'
  studentId: string; // e.g. 'STU-20261001-0001'
  fullName: string;
  className: string;
  grade: number;
  testType: TestType;
  unit: string;
  level: string;
  testName: string;
  startTime: string; // ISO string or human string
  endTime: string;   // ISO string or human string
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  score: string;      // e.g. '36/40' or '90%'
  percentage: number; // e.g. 90
  timeSpent: string;  // e.g. '12m 35s'
  timeSpentSeconds: number;
}

export const ALL_GRADES = [1, 2, 3, 4, 5] as const;

export const CLASS_SECTIONS = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9'] as const;

export const ALL_CLASSES: string[] = ALL_GRADES.flatMap((grade) =>
  CLASS_SECTIONS.map((sec) => `${grade}${sec}`)
);
