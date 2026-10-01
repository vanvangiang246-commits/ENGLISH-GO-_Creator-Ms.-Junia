/**
 * ENGLISH GO! - Educational Content & Lesson Data Architecture (STEP 4)
 * Author: Ms. Junia
 *
 * Primary Source of Truth: Official Global Success Textbook Materials
 */

export type ContentSourceStatus = 'SOURCE_VERIFIED' | 'SOURCE_PENDING';

export type SkillName =
  | 'LISTENING'
  | 'SPEAKING'
  | 'READING'
  | 'WRITING'
  | 'PRONUNCIATION'
  | 'COMMUNICATION';

export interface ContentMetadata {
  grade: number;
  book: string;
  unitId: string;
  unitTitle: string;
  lessonId?: string;
  lessonTitle?: string;
  contentType: 'vocabulary' | 'sentence_pattern' | 'grammar' | 'phonics' | 'skill';
  topic?: string;
  sourceReference: string;
}

export interface VocabularyItem {
  id: string; // e.g., 'GS1-U01-VOC-01'
  word: string;
  pronunciation: string; // phonetic IPA, e.g. '/bʊk/'
  meaning: string;
  example: string;
  imageUrl: string; // verified visual image path
  letterFocus?: string; // e.g. 'B / b'
  soundFocus?: string; // e.g. '/b/'
  sourceUnit: string;
  sourceLesson: string;
  sourceStatus: ContentSourceStatus;
}

export interface SentencePatternItem {
  id: string; // e.g., 'GS1-U01-PAT-01'
  pattern: string; // "Hi, I'm [Name]."
  example: string; // "Hi, I'm Bill."
  communicativePurpose: string; // "Greeting a friend and introducing oneself"
  responseExample?: string; // "Hi, Bill."
  sourceLesson: string;
  sourceStatus: ContentSourceStatus;
}

export interface LanguageGrammarItem {
  id: string; // e.g., 'GS1-U01-LANG-01'
  title: string;
  description: string;
  rules: string[];
  examples: string[];
  category: 'phonics' | 'language_pattern' | 'grammar';
  sourceStatus: ContentSourceStatus;
}

export interface SkillItem {
  id: string;
  name: SkillName;
  description: string;
  active: boolean;
}

export interface LessonActivity {
  number: number;
  name: string; // e.g., "1. Listen and repeat"
  description: string;
}

export interface LessonData {
  id: string; // e.g., 'GS1-U01-L01'
  lessonNumber: number;
  title: string;
  activities: LessonActivity[];
  vocabularyIds: string[];
  sentencePatternIds: string[];
  grammarIds: string[];
  skills: SkillName[];
  sourceStatus: ContentSourceStatus;
}

export interface UnitContentData {
  unitId: string; // e.g., 'GS1-U01'
  bookId: string; // 'gs1'
  grade: number;
  unitNumber: number;
  title: string;
  topic: string;
  mainLanguageFocus: string;
  learningObjectives: string[];
  sourceStatus: ContentSourceStatus;
  sourceReference: string;
  sourceNote?: string;
  lessons: LessonData[];
  vocabulary: VocabularyItem[];
  sentencePatterns: SentencePatternItem[];
  grammar: LanguageGrammarItem[];
  skills: SkillItem[];
}
