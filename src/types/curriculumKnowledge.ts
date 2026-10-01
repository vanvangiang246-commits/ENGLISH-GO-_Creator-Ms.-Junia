import { GlobalSuccessId, DifficultyLevelId } from './curriculum';
import { QuestionType } from './quiz';
import { SkillName, ContentSourceStatus } from './content';

export interface VocabularyWordProfile {
  word: string;
  phonetic: string;
  meaning: string;
  example: string;
  soundFocus?: string;
  letterFocus?: string;
  imageUrl?: string;
}

export interface SentencePatternProfile {
  pattern: string;
  example: string;
  communicativePurpose: string;
  responseExample?: string;
}

export interface GrammarProfile {
  title: string;
  rules: string[];
  examples: string[];
  category: 'phonics' | 'language_pattern' | 'grammar';
}

export interface QuestionFormProfile {
  question: string;
  answer: string;
}

export interface ListeningPromptProfile {
  audioText: string;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

export interface SpeakingPromptProfile {
  phrase: string;
  hint: string;
  context: string;
}

export interface ReadingPromptProfile {
  text: string;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

export interface SentenceOrderProfile {
  sentence: string;
  words: string[];
  meaning: string;
}

export interface MatchingPairsProfile {
  pairs: Array<{ left: string; right: string }>;
}

export interface TrueFalseProfile {
  statement: string;
  isTrue: boolean;
  context: string;
  explanation: string;
}

export interface FillBlankProfile {
  sentenceWithBlank: string;
  blankWord: string;
  options: string[];
  explanation: string;
}

export interface UnitKnowledgeProfile {
  unitId: string; // e.g. "GS1-U01"
  bookId: GlobalSuccessId;
  grade: 1 | 2 | 3 | 4 | 5;
  unitNumber: number;
  title: string;
  topic: string;
  mainLanguageFocus: string;
  learningObjectives: string[];
  sourceReference: string;
  sourceStatus: ContentSourceStatus;

  // Controlled separation
  coreVocabulary: VocabularyWordProfile[];
  realLifeVocabulary: VocabularyWordProfile[];

  usefulExpressions: string[];
  targetSentencePatterns: SentencePatternProfile[];
  grammarStructures: GrammarProfile[];
  communicationFunctions: string[];
  commonQuestionForms: QuestionFormProfile[];
  suitableRealLifeContexts: string[];
  grammarBoundary: string;

  // Multi-skill activity pools for generating 10/20/25/30/40 questions
  listeningPrompts: ListeningPromptProfile[];
  speakingPrompts: SpeakingPromptProfile[];
  readingPrompts: ReadingPromptProfile[];
  sentenceOrderPool: SentenceOrderProfile[];
  matchingPairsPool: MatchingPairsProfile[];
  trueFalsePool: TrueFalseProfile[];
  fillBlankPool: FillBlankProfile[];
  suitableActivities: QuestionType[];
  difficultyForGrade: DifficultyLevelId;
}
