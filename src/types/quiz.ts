/**
 * ENGLISH GO! - Practice Question Engine Types (STEP 5)
 * Author: Ms. Junia
 */

import { GlobalSuccessId, QuestionPackageCount, DifficultyLevelId } from './curriculum';
import { SkillName } from './content';

export type QuestionType =
  | 'image_choice'        // Choose picture matching word or sound
  | 'look_and_choose'     // Look at picture, choose word or sentence
  | 'listen_and_choose'   // Listen to audio, choose picture or text
  | 'missing_letter'      // Type/select missing letter (e.g. b _ ll)
  | 'type_word'           // Type full vocabulary word from picture
  | 'word_order'          // Rearrange words into a valid sentence
  | 'matching_pairs'      // Match words to pictures or greetings
  | 'true_false'          // Evaluate statement against picture
  | 'speaking';           // Listen, repeat, record voice with mic

export interface QuestionOption {
  id: string;
  text?: string;
  image?: string;
  audioText?: string;
}

export interface MatchingPair {
  id: string;
  leftText: string;
  rightText?: string;
  rightImage?: string;
  matchId: string;
}

export interface QuizQuestion {
  id: string; // e.g. 'GS1_U01_L01_Q001'
  bookId: GlobalSuccessId;
  grade: number;
  unitId: string;
  lessonId: string;
  difficulty: DifficultyLevelId;
  questionType: QuestionType;
  skill: SkillName;
  instruction: string;
  promptText?: string;
  promptImage?: string;
  audioText?: string;
  options?: QuestionOption[];
  correctAnswer: string | string[]; // Single ID or ordered array for word_order / matching
  explanation: string;
  // Specific payload for complex questions:
  missingLetterData?: {
    displayPattern: string; // "b _ ll"
    missingLetter: string;  // "a"
    fullWord: string;       // "ball"
  };
  wordOrderData?: {
    scrambledWords: string[];
    correctSentence: string;
  };
  matchingData?: {
    leftItems: { id: string; text: string }[];
    rightItems: { id: string; text?: string; image?: string; svgContent?: string; matchId: string }[];
  };
  speakingData?: {
    targetPhrase: string;
    phoneticHint?: string;
    acceptableVariants?: string[];
  };
}

export interface UserAnswerRecord {
  questionId: string;
  questionType: QuestionType;
  skill: SkillName;
  userAnswer: string | string[] | boolean;
  isCorrect: boolean;
  isSkipped?: boolean;
  explanation: string;
  timeSpentSeconds?: number;
}

export interface QuizSessionState {
  questions: QuizQuestion[];
  currentIndex: number;
  userAnswers: Record<string, UserAnswerRecord>;
  isCompleted: boolean;
  startTime: number;
  endTime?: number;
}

export interface SkillScoreSummary {
  skill: SkillName;
  correct: number;
  total: number;
  percentage: number;
}
