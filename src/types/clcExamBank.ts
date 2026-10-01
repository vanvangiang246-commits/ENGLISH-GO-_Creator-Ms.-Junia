/**
 * CLC EXAM BANK – GRADE 5 TYPES
 * Aligned with Vietnamese Specialized Secondary School Entrance Examinations
 * (Nam Từ Liêm, Lương Thế Vinh, Nguyễn Tất Thành, Ngôi Sao Hà Nội, Amsterdam, Cầu Giấy, Lê Lợi)
 */

export type ClcExamQuestionType =
  | 'pronunciation'          // Phát âm (different underlined vowel, -ed, -s/es, consonant)
  | 'stress'                 // Trọng âm (primary stress in 2 or 3-syllable words)
  | 'odd_one_out'            // Tìm từ khác loại (thematic or word class)
  | 'grammar_vocab'          // Ngữ pháp & Từ vựng trắc nghiệm
  | 'word_form'              // Dạng đúng của từ (word formation: noun, adj, adv, verb)
  | 'synonym'                // Từ đồng nghĩa (CLOSEST in meaning)
  | 'antonym'                // Từ trái nghĩa (OPPOSITE in meaning)
  | 'communication'          // Giao tiếp / Hội thoại tình huống / Biển báo & Thông báo
  | 'proverb_definition'     // Tục ngữ tiếng Anh & Định nghĩa từ vựng
  | 'error_correction'       // Tìm lỗi sai ngữ pháp (1 mistake in sentence)
  | 'cloze_test'             // Điền từ vào đoạn văn khuyết
  | 'reading_comprehension'  // Đọc hiểu đoạn văn
  | 'word_order'             // Sắp xếp từ xáo trộn thành câu
  | 'sentence_transformation'; // Viết lại câu giữ nguyên nghĩa

export type ClcExamLevel = 'grade5_plus' | 'grade6_7_extension';

export interface ClcExamOption {
  id: 'A' | 'B' | 'C' | 'D';
  text: string;
  isCorrect?: boolean;
}

export interface ClcFormattingMetadata {
  underlinedPart?: string;
  hasUnderline?: boolean;
  highlightWords?: string[];
  isScrambleSentence?: boolean;
  imageUri?: string;
  hasAudio?: boolean;
}

export interface ClcExamQuestion {
  id: string;
  question_id?: string; // Synchronized single source of truth
  type: ClcExamQuestionType;
  question_type?: ClcExamQuestionType;
  level: ClcExamLevel;
  typeLabelVi: string;
  typeIcon: string;
  topic: string;
  tested_skill?: string;
  schoolModel?: string; // e.g. "Nam Từ Liêm", "Lương Thế Vinh", "Nguyễn Tất Thành", "Ngôi Sao"
  instruction: string;
  instructionVi: string;
  underlinedPart?: string; // Tested letter/sound group for pronunciation (e.g. "ed", "ch", "ea")
  contextPassage?: {
    title?: string;
    text: string;
    passageType?: 'reading' | 'cloze' | 'dialogue' | 'notice';
  };
  promptText: string;
  question_text?: string;
  displayed_question_text?: string; // Formatted prompt with exact visual underline markup
  scrambleWords?: string[]; // For word order scramble
  options: ClcExamOption[]; // Exactly 4 options A, B, C, D with locked order
  option_A?: string;
  option_B?: string;
  option_C?: string;
  option_D?: string;
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  correct_answer?: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  explanationVi: string;
  formatting_metadata?: ClcFormattingMetadata;
  status?: 'VALID' | 'INVALID';
}

export type ClcExamLength = 10 | 20 | 25 | 30 | 40;

export interface ClcExamConfig {
  length: ClcExamLength;
  schoolModelFilter?: 'all' | 'nam_tu_liem' | 'luong_the_vinh' | 'nguyen_tat_thanh' | 'ngoi_sao';
  timingMinutes?: number; // Optional timer
}

export interface ClcExamUserAnswer {
  questionId: string;
  selectedAnswer: 'A' | 'B' | 'C' | 'D';
  isCorrect: boolean;
  timeSpentSeconds: number;
}

export interface ClcExamResult {
  examId: string;
  title: string;
  totalQuestions: number;
  correctCount: number;
  scorePercentage: number;
  timeSpentSeconds: number;
  grade5PlusCount: { total: number; correct: number };
  extensionCount: { total: number; correct: number };
  typeBreakdown: Partial<Record<ClcExamQuestionType, { total: number; correct: number }>>;
  userAnswers: Record<string, ClcExamUserAnswer>;
  questions: ClcExamQuestion[];
  evaluation: {
    tier: string;
    title: string;
    descriptionVi: string;
    starRating: string;
    colorClass: string;
  };
}
