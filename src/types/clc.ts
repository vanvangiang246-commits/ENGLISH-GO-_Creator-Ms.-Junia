/**
 * CLC Grammar Mode Types (Advanced Grade 5 -> Grade 6/7 Grammar Preparation)
 * Aligned with Vietnam Specialized Secondary School Entrance Examinations (CLC)
 */

import { GlobalSuccessId } from './curriculum';

export type ClcGrammarCategoryId =
  | 'be_verbs'                      // be: am/is/are/was/were
  | 'have_verbs'                    // have/has/had
  | 'present_simple_continuous'     // Present Simple and Present Continuous
  | 'past_simple'                   // Past Simple (regular and irregular)
  | 'future_will_going_to'          // Future with will and be going to
  | 'modals_can_must_should'        // can/can't, must/mustn't, should/shouldn't
  | 'there_is_are'                  // there is/there are, was/were
  | 'countable_uncountable'         // countable and uncountable nouns
  | 'quantifiers'                   // some/any/much/many/a lot of
  | 'articles'                      // articles a/an/the / zero article
  | 'possessives'                   // possessive adjectives and pronouns
  | 'pronouns'                      // personal, object and demonstrative pronouns
  | 'comparatives_superlatives'     // comparatives and superlatives
  | 'adverbs_frequency'             // adverbs of frequency
  | 'question_formation'            // question words and question formation
  | 'prepositions'                  // prepositions of time and place
  | 'conjunctions'                  // conjunctions: and, but, because, so, or
  | 'imperatives'                   // basic imperatives
  | 'infinitives_gerunds'           // basic infinitives and gerunds (to V / V-ing)
  | 'basic_modals'                  // basic modal verbs (may, might, would like)
  | 'transformation_error_correction'; // basic sentence transformation and error correction

export type ClcStage = 1 | 2 | 3; // 1: Grade 5 Review, 2: Grade 6 Extension, 3: Grade 7 Prep

export type ClcQuestionFormat =
  | 'multiple_choice'        // Standard 4-option grammar blank
  | 'error_identification'  // Underlined parts A, B, C, D with 1 mistake
  | 'sentence_transformation' // Rewriting sentence with identical meaning
  | 'sentence_scramble';    // Scrambled advanced sentence order

export interface ClcCategoryInfo {
  id: ClcGrammarCategoryId;
  title: string;
  vietnameseTitle: string;
  tag: string;
  stage: ClcStage;
  targetLevel: string;
  summary: string;
  keyRule: string;
  icon: string;
}

export interface ClcQuestionOption {
  id: string;
  text: string;
  label?: string; // 'A', 'B', 'C', 'D'
  isMistakePart?: boolean; // For error identification
  correctedPart?: string;  // e.g. "doesn't have"
}

export interface ClcQuestion {
  id: string;
  grammarCategory: ClcGrammarCategoryId;
  stage: ClcStage;
  gradeLevel: 'Grade 5 Review' | 'Grade 6 Extension' | 'Grade 7 Prep';
  format: ClcQuestionFormat;
  grammarRuleTitle: string;
  grammarNote: string;
  instruction: string;
  promptText: string;
  promptContext?: string; // Situational dialogue or story setup
  options: ClcQuestionOption[];
  correctAnswer: string; // Option ID or correct text
  explanation: string;
  grammarTipVi: string;
  unitContext: {
    unitId: string;
    unitTitle: string;
    topic: string;
    keyword: string;
  };
  difficultyScore: number; // 1 to 10
  scrambleWords?: string[]; // For sentence scramble
}

export interface ClcSessionConfig {
  unitId: string;
  questionCount: 10 | 20 | 25 | 30 | 40;
  selectedCategories?: ClcGrammarCategoryId[]; // Empty = all 20 categories progressive
  stageFilter?: ClcStage | 'all';
  mode?: 'standard' | 'mixed_review'; // Mixed review combining all 8 CLC skills
}

export interface ClcUserAnswer {
  questionId: string;
  userAnswer: string;
  isCorrect: boolean;
  timeSpentSeconds: number;
}

export interface ClcSessionResult {
  totalQuestions: number;
  correctCount: number;
  scorePercentage: number;
  timeSpentTotal: number;
  stageBreakdown: {
    stage1: { total: number; correct: number };
    stage2: { total: number; correct: number };
    stage3: { total: number; correct: number };
  };
  categoryBreakdown: Record<ClcGrammarCategoryId, { total: number; correct: number }>;
  userAnswers: Record<string, ClcUserAnswer>;
  questions: ClcQuestion[];
}

export interface ClcLessonExample {
  id: string;
  english: string;
  vietnamese: string;
  highlightWord: string;
  grammarNote: string;
}

export interface ClcUnitLesson {
  unitId: string;
  unitNumber: number;
  unitTitle: string;
  topic: string;
  targetLevel: string;
  grammarFocus: {
    title: string;
    vietnameseTitle: string;
    badge: string;
    levelTag: string;
    overview: string;
    targetExams: string;
  };
  quickRule: {
    summary: string;
    formulas: {
      pattern: string;
      meaning: string;
      usageVi: string;
    }[];
    goldenRulesVi: string[];
    commonMistakeAlert: {
      wrongExample: string;
      correctExample: string;
      whyVi: string;
    };
  };
  examples: ClcLessonExample[];
  practiceQuestions: ClcQuestion[];
  challengeQuestions: ClcQuestion[];
  reviewQuestions: ClcQuestion[];
}
