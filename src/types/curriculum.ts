/**
 * ENGLISH GO! - Curriculum and Data Architecture (STEP 3)
 * Author: Ms. Junia
 * 
 * Hierarchy:
 * Grade -> Book -> Unit -> Lesson -> Skill -> Question Set -> Question -> Student Result
 * 
 * Strict separation:
 * Global Success 1: grade = 1, book = "Global Success 1", unitCount = 16, units = GS1-U01..GS1-U16
 * Global Success 2: grade = 2, book = "Global Success 2", unitCount = 16, units = GS2-U01..GS2-U16
 * Global Success 3: grade = 3, book = "Global Success 3", unitCount = 20, units = GS3-U01..GS3-U20
 * Global Success 4: grade = 4, book = "Global Success 4", unitCount = 20, units = GS4-U01..GS4-U20
 * Global Success 5: grade = 5, book = "Global Success 5", unitCount = 20, units = GS5-U01..GS5-U20
 * CLC: completely separate advanced section (Grade 5 → Grade 6)
 */

export type ProgramId = 'gs1' | 'gs2' | 'gs3' | 'gs4' | 'gs5' | 'clc' | 'clc_exam';
export type GlobalSuccessId = 'gs1' | 'gs2' | 'gs3' | 'gs4' | 'gs5';

export interface BookConfig {
  id: GlobalSuccessId;
  grade: 1 | 2 | 3 | 4 | 5;
  book: 'Global Success 1' | 'Global Success 2' | 'Global Success 3' | 'Global Success 4' | 'Global Success 5';
  unitCount: 16 | 20;
}

export type QuestionPackageCount = 10 | 20 | 25 | 30 | 40;

export type DifficultyLevelId = 'level1' | 'level2' | 'level3';

export interface DifficultyOption {
  id: DifficultyLevelId;
  label: string;
  tag: string;
  description: string;
}

export const DIFFICULTY_OPTIONS: DifficultyOption[] = [
  {
    id: 'level1',
    label: 'LEVEL 1',
    tag: 'Foundation',
    description: 'Basic vocabulary and simple sentence recognition.',
  },
  {
    id: 'level2',
    label: 'LEVEL 2',
    tag: 'Practice',
    description: 'Standard practice activities and language drills.',
  },
  {
    id: 'level3',
    label: 'LEVEL 3',
    tag: 'Challenge',
    description: 'Advanced comprehension and sentence building.',
  },
];

export interface QuestionPackageOption {
  count: QuestionPackageCount;
  label: string;
  description: string;
}

export const QUESTION_PACKAGES: QuestionPackageOption[] = [
  { count: 10, label: '10 QUESTIONS', description: 'Quick Practice' },
  { count: 20, label: '20 QUESTIONS', description: 'Practice' },
  { count: 25, label: '25 QUESTIONS', description: 'Practice Plus' },
  { count: 30, label: '30 QUESTIONS', description: 'Extended' },
  { count: 40, label: '40 QUESTIONS', description: 'Full Practice' },
];

export interface PracticeSessionConfig {
  bookId: GlobalSuccessId;
  grade: number;
  unitId: string;
  unitNumber: number;
  displayName: string;
  questionCount: QuestionPackageCount;
  difficulty: DifficultyLevelId | null;
}

export interface UnitItem {
  id: string; // e.g., 'GS1-U01'
  bookId: GlobalSuccessId;
  unitNumber: number;
  displayName: string; // e.g., 'UNIT 1'
}

/**
 * Helper to build strictly isolated unit lists with explicit prefix and numerical sorting
 */
const createBookUnits = (bookId: GlobalSuccessId, count: 16 | 20): UnitItem[] => {
  const prefix = bookId.toUpperCase();
  const list: UnitItem[] = [];
  for (let i = 1; i <= count; i++) {
    const pad = i < 10 ? `0${i}` : `${i}`;
    list.push({
      id: `${prefix}-U${pad}`,
      bookId,
      unitNumber: i,
      displayName: `UNIT ${i}`,
    });
  }
  return list;
};

// 1. Global Success 1: Grade 1, 16 Units
export const globalSuccess1Units: UnitItem[] = createBookUnits('gs1', 16);

// 2. Global Success 2: Grade 2, 16 Units
export const globalSuccess2Units: UnitItem[] = createBookUnits('gs2', 16);

// 3. Global Success 3: Grade 3, 20 Units
export const globalSuccess3Units: UnitItem[] = createBookUnits('gs3', 20);

// 4. Global Success 4: Grade 4, 20 Units
export const globalSuccess4Units: UnitItem[] = createBookUnits('gs4', 20);

// 5. Global Success 5: Grade 5, 20 Units
export const globalSuccess5Units: UnitItem[] = createBookUnits('gs5', 20);

export const BOOK_UNITS_MAP: Record<GlobalSuccessId, UnitItem[]> = {
  gs1: globalSuccess1Units,
  gs2: globalSuccess2Units,
  gs3: globalSuccess3Units,
  gs4: globalSuccess4Units,
  gs5: globalSuccess5Units,
};

export const getBookUnits = (bookId: GlobalSuccessId): UnitItem[] => {
  return BOOK_UNITS_MAP[bookId] || [];
};

export const GLOBAL_SUCCESS_BOOKS: Record<GlobalSuccessId, BookConfig> = {
  gs1: {
    id: 'gs1',
    grade: 1,
    book: 'Global Success 1',
    unitCount: 16,
  },
  gs2: {
    id: 'gs2',
    grade: 2,
    book: 'Global Success 2',
    unitCount: 16,
  },
  gs3: {
    id: 'gs3',
    grade: 3,
    book: 'Global Success 3',
    unitCount: 20,
  },
  gs4: {
    id: 'gs4',
    grade: 4,
    book: 'Global Success 4',
    unitCount: 20,
  },
  gs5: {
    id: 'gs5',
    grade: 5,
    book: 'Global Success 5',
    unitCount: 20,
  },
};

export interface ProgramInfo {
  id: ProgramId;
  code: string;
  book: string;
  grade: number | null;
  gradeDisplay: string;
  unitCount: number | null;
  title: string;
  subtitle?: string;
  description: string;
  isAdvanced?: boolean;
  theme: {
    primaryBg: string;
    lightBg: string;
    border: string;
    hoverBorder: string;
    text: string;
    accent: string;
    badgeBg: string;
    badgeText: string;
    iconBg: string;
  };
}

export const PROGRAMS: ProgramInfo[] = [
  {
    id: 'gs1',
    code: 'GLOBAL SUCCESS 1',
    book: 'Global Success 1',
    grade: 1,
    gradeDisplay: 'GRADE 1',
    unitCount: 16,
    title: 'Global Success 1',
    subtitle: 'Primary English Foundation',
    description: '16 Units designed for Grade 1 primary students with friendly phonics and early vocabulary.',
    theme: {
      primaryBg: 'bg-sky-500',
      lightBg: 'bg-sky-50/70',
      border: 'border-sky-200',
      hoverBorder: 'hover:border-sky-400',
      text: 'text-sky-700',
      accent: 'text-sky-600',
      badgeBg: 'bg-sky-100',
      badgeText: 'text-sky-800',
      iconBg: 'bg-sky-500 text-white',
    },
  },
  {
    id: 'gs2',
    code: 'GLOBAL SUCCESS 2',
    book: 'Global Success 2',
    grade: 2,
    gradeDisplay: 'GRADE 2',
    unitCount: 16,
    title: 'Global Success 2',
    subtitle: 'Primary English Building',
    description: '16 Units for Grade 2 students fostering everyday conversational vocabulary, sentence patterns, and reading habits.',
    theme: {
      primaryBg: 'bg-emerald-500',
      lightBg: 'bg-emerald-50/70',
      border: 'border-emerald-200',
      hoverBorder: 'hover:border-emerald-400',
      text: 'text-emerald-700',
      accent: 'text-emerald-600',
      badgeBg: 'bg-emerald-100',
      badgeText: 'text-emerald-800',
      iconBg: 'bg-emerald-500 text-white',
    },
  },
  {
    id: 'gs3',
    code: 'GLOBAL SUCCESS 3',
    book: 'Global Success 3',
    grade: 3,
    gradeDisplay: 'GRADE 3',
    unitCount: 20,
    title: 'Global Success 3',
    subtitle: 'Primary English Core',
    description: '20 Units for Grade 3 expanding grammar structures, reading comprehension, and communicative activities.',
    theme: {
      primaryBg: 'bg-amber-500',
      lightBg: 'bg-amber-50/70',
      border: 'border-amber-200',
      hoverBorder: 'hover:border-amber-400',
      text: 'text-amber-800',
      accent: 'text-amber-600',
      badgeBg: 'bg-amber-100',
      badgeText: 'text-amber-900',
      iconBg: 'bg-amber-500 text-white',
    },
  },
  {
    id: 'gs4',
    code: 'GLOBAL SUCCESS 4',
    book: 'Global Success 4',
    grade: 4,
    gradeDisplay: 'GRADE 4',
    unitCount: 20,
    title: 'Global Success 4',
    subtitle: 'Primary English Intermediate',
    description: '20 Units for Grade 4 emphasizing integrated skills, situational dialogues, and language fluency.',
    theme: {
      primaryBg: 'bg-indigo-500',
      lightBg: 'bg-indigo-50/70',
      border: 'border-indigo-200',
      hoverBorder: 'hover:border-indigo-400',
      text: 'text-indigo-700',
      accent: 'text-indigo-600',
      badgeBg: 'bg-indigo-100',
      badgeText: 'text-indigo-800',
      iconBg: 'bg-indigo-500 text-white',
    },
  },
  {
    id: 'gs5',
    code: 'GLOBAL SUCCESS 5',
    book: 'Global Success 5',
    grade: 5,
    gradeDisplay: 'GRADE 5',
    unitCount: 20,
    title: 'Global Success 5',
    subtitle: 'Primary English Mastery',
    description: '20 Units for Grade 5 solidifying grammar, vocabulary depth, and primary graduation readiness.',
    theme: {
      primaryBg: 'bg-violet-500',
      lightBg: 'bg-violet-50/70',
      border: 'border-violet-200',
      hoverBorder: 'hover:border-violet-400',
      text: 'text-violet-700',
      accent: 'text-violet-600',
      badgeBg: 'bg-violet-100',
      badgeText: 'text-violet-800',
      iconBg: 'bg-violet-500 text-white',
    },
  },
  {
    id: 'clc',
    code: 'ÔN THI CLC',
    book: 'Ôn Thi CLC',
    grade: null,
    gradeDisplay: 'GRADE 5 → GRADE 6',
    unitCount: null,
    title: 'Ôn Thi CLC',
    subtitle: 'ADVANCED ENGLISH PREPARATION',
    description: 'Advanced English revision and entrance preparation for specialized secondary schools.',
    isAdvanced: true,
    theme: {
      primaryBg: 'bg-rose-500',
      lightBg: 'bg-rose-50/70',
      border: 'border-rose-200',
      hoverBorder: 'hover:border-rose-400',
      text: 'text-rose-700',
      accent: 'text-rose-600',
      badgeBg: 'bg-rose-100',
      badgeText: 'text-rose-800',
      iconBg: 'bg-rose-500 text-white',
    },
  },
  {
    id: 'clc_exam',
    code: 'CLC EXAM BANK',
    book: 'CLC Exam Bank – Grade 5',
    grade: 5,
    gradeDisplay: 'GRADE 5 ONLY',
    unitCount: null,
    title: 'CLC EXAM BANK – GRADE 5',
    subtitle: 'OFFICIAL ENTRANCE EXAM SIMULATION',
    description: 'Ngân hàng đề thi khảo sát năng lực vào lớp 6 CLC (10, 20, 25, 30, 40 câu) mô phỏng cấu trúc đề chuẩn các trường chuyên & CLC.',
    isAdvanced: true,
    theme: {
      primaryBg: 'bg-gradient-to-r from-rose-600 to-indigo-600',
      lightBg: 'bg-rose-50/80',
      border: 'border-rose-300',
      hoverBorder: 'hover:border-rose-500',
      text: 'text-rose-800',
      accent: 'text-indigo-600',
      badgeBg: 'bg-rose-100',
      badgeText: 'text-rose-900',
      iconBg: 'bg-rose-600 text-white',
    },
  },
];
