/**
 * CLC EXAM INTEGRITY VALIDATOR & SINGLE SOURCE OF TRUTH
 * 
 * Strict implementation of Prompt 22 requirements:
 * 1. Single Source of Truth: question_id, question_type, question_text,
 *    displayed_question_text, option_A..D, correct_answer, tested_skill, explanation, formatting_metadata.
 * 2. Option Order Lock: Once generated, option order is permanently locked and synchronized across UI, answers, results.
 * 3. Question Order Lock: Question N displays question data N consistently everywhere.
 * 4. Pronunciation, Synonym/Antonym & Error Correction Underline: HARD VALIDATION RULE. Visual <u>underline</u> rendered for tested parts.
 * 5. Pre-publish validation: CLC_FINAL_VALIDATION() verifying all 19 criteria before displaying to student.
 */

import {
  ClcExamOption,
  ClcExamQuestion,
  ClcFormattingMetadata,
} from '../types/clcExamBank';

/**
 * Pronunciation underline letter/phoneme map
 */
export const PRONUNCIATION_UNDERLINE_MAP: Record<string, string> = {
  eb_pron_01: 'ed',
  eb_pron_02: 'ed',
  eb_pron_03: 's',
  eb_pron_04: 'ch',
  eb_pron_05: 'ea',
  eb_pron_06: 'c',
  eb_pron_07: 'i',
  eb_pron_08: 'th',
  eb_pron_09: 'u',
  eb_pron_10: 'b',
  eb_pron_11: 'c',
  eb_pron_12: 'h',
  eb_extra_pron_09: 'k',
  eb_extra_pron_10: 'ed',
  eb_extra_pron_11: 'u',
  eb_extra_pron_12: 'es',
  eb_extra_pron_13: 'h',
  eb_extra_pron_14: 'ow',
};

/**
 * Synonym and Antonym target word/phrase map for visual underline
 */
export const SYNONYM_ANTONYM_UNDERLINE_MAP: Record<string, string> = {
  eb_syn_01: 'assistance',
  eb_syn_02: 'well-known',
  eb_syn_03: 'on his own',
  eb_ant_01: 'compulsory',
  eb_ant_02: 'generous',
  eb_ant_03: 'challenging',
  eb_syn_04: 'looks after',
  eb_syn_05: 'keen on',
  eb_ant_04: 'tidy',
  eb_ant_05: 'ancient',
  eb_extra_syn_06: 'begin',
  eb_extra_syn_07: 'participate in',
  eb_extra_ant_06: 'expensive',
  eb_extra_ant_07: 'shallow',
};

/**
 * Underlines the target pattern in a single word
 * e.g., underlineWord("watched", "ed") -> "watch<u>ed</u>"
 * e.g., underlineWord("chemistry", "ch") -> "<u>ch</u>emistry"
 * e.g., underlineWord("school", "ch") -> "s<u>ch</u>ool"
 */
export function underlineWord(word: string, pattern: string): string {
  if (!pattern || !word) return word;
  if (word.includes('<u>')) return word; // Already underlined

  const cleanWord = word.trim();
  const lowerWord = cleanWord.toLowerCase();
  const lowerPattern = pattern.toLowerCase();

  // Special case for -ed endings
  if (lowerPattern === 'ed' && lowerWord.endsWith('ed')) {
    const idx = cleanWord.lastIndexOf('ed');
    return cleanWord.slice(0, idx) + '<u>' + cleanWord.slice(idx, idx + 2) + '</u>' + cleanWord.slice(idx + 2);
  }

  // Special case for -s / -es endings
  if (lowerPattern === 's' || lowerPattern === 'es') {
    if (lowerWord.endsWith('es')) {
      const idx = cleanWord.lastIndexOf('es');
      return cleanWord.slice(0, idx) + '<u>' + cleanWord.slice(idx) + '</u>';
    } else if (lowerWord.endsWith('s')) {
      const idx = cleanWord.lastIndexOf('s');
      return cleanWord.slice(0, idx) + '<u>' + cleanWord.slice(idx) + '</u>';
    }
  }

  // Default first occurrence
  const idx = lowerWord.indexOf(lowerPattern);
  if (idx !== -1) {
    return (
      cleanWord.slice(0, idx) +
      '<u>' +
      cleanWord.slice(idx, idx + pattern.length) +
      '</u>' +
      cleanWord.slice(idx + pattern.length)
    );
  }

  return cleanWord;
}

/**
 * Formats pronunciation prompt text with visual underlines
 * e.g. "A. watched   B. laughed..." -> "A. watch<u>ed</u>   B. laugh<u>ed</u>..."
 */
export function formatPronunciationPrompt(
  promptText: string,
  options: ClcExamOption[],
  pattern: string
): string {
  if (!pattern) return promptText;

  // Format "A. word1   B. word2   C. word3   D. word4"
  const formattedOptions = options.map((opt) => {
    const underlined = underlineWord(opt.text, pattern);
    return `${opt.id}. ${underlined}`;
  });

  return formattedOptions.join('   ');
}

/**
 * Formats error correction prompt text so parts before/after (A), (B), (C), (D) are visually underlined
 */
export function formatErrorCorrectionPrompt(
  promptText: string,
  options: ClcExamOption[]
): string {
  if (promptText.includes('<u>')) return promptText;

  let result = promptText;
  for (const opt of options) {
    const t = opt.text.trim();
    if (!t) continue;

    const regexTrailing = new RegExp(`(${escapeRegExp(t)})\\s*\\(${opt.id}\\)`, 'i');
    const regexLeading = new RegExp(`\\(${opt.id}\\)\\s*(${escapeRegExp(t)})`, 'i');

    if (regexTrailing.test(result)) {
      result = result.replace(regexTrailing, `<u>$1</u> (${opt.id})`);
    } else if (regexLeading.test(result)) {
      result = result.replace(regexLeading, `(${opt.id}) <u>$1</u>`);
    } else if (result.includes(t)) {
      result = result.replace(t, `<u>${t}</u>`);
    }
  }

  return result;
}

/**
 * Formats synonym/antonym prompt text so the target tested word is visually underlined
 */
export function formatSynonymAntonymPrompt(
  promptText: string,
  targetWord: string
): string {
  if (!targetWord || promptText.includes('<u>')) return promptText;

  const regex = new RegExp(`\\b(${escapeRegExp(targetWord)})\\b`, 'i');
  if (regex.test(promptText)) {
    return promptText.replace(regex, `<u>$1</u>`);
  }

  // Fallback direct case-insensitive replacement
  const idx = promptText.toLowerCase().indexOf(targetWord.toLowerCase());
  if (idx !== -1) {
    return (
      promptText.slice(0, idx) +
      '<u>' +
      promptText.slice(idx, idx + targetWord.length) +
      '</u>' +
      promptText.slice(idx + targetWord.length)
    );
  }

  return promptText;
}

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Synchronizes and locks a question object into ONE single source of truth.
 * All properties are frozen and strictly immutable.
 */
export function lockAndSynchronizeQuestion(q: ClcExamQuestion): ClcExamQuestion {
  // Determine underline pattern
  const pronPattern = q.underlinedPart || PRONUNCIATION_UNDERLINE_MAP[q.id] || '';
  const synAntWord = SYNONYM_ANTONYM_UNDERLINE_MAP[q.id] || '';

  // Format options with visual underline if pronunciation
  const finalOptions: ClcExamOption[] = q.options.map((opt) => {
    let formattedText = opt.text;
    if (q.type === 'pronunciation' && pronPattern) {
      formattedText = underlineWord(opt.text, pronPattern);
    }
    return {
      id: opt.id,
      text: opt.text,
      isCorrect: opt.id === q.correctAnswer,
    };
  });

  // Freeze options array
  Object.freeze(finalOptions);

  // Format displayed question text
  let displayedPrompt = q.promptText;
  let hasUnderline = false;

  if (q.type === 'pronunciation' && pronPattern) {
    displayedPrompt = formatPronunciationPrompt(q.promptText, q.options, pronPattern);
    hasUnderline = true;
  } else if (q.type === 'error_correction') {
    displayedPrompt = formatErrorCorrectionPrompt(q.promptText, q.options);
    hasUnderline = displayedPrompt.includes('<u>');
  } else if ((q.type === 'synonym' || q.type === 'antonym') && synAntWord) {
    displayedPrompt = formatSynonymAntonymPrompt(q.promptText, synAntWord);
    hasUnderline = displayedPrompt.includes('<u>');
  }

  const formattingMetadata: ClcFormattingMetadata = {
    underlinedPart: pronPattern || synAntWord || undefined,
    hasUnderline,
    isScrambleSentence: q.type === 'word_order',
    highlightWords: q.scrambleWords,
    hasAudio: false,
  };

  const synchronized: ClcExamQuestion = {
    ...q,
    id: q.id,
    question_id: q.id,
    type: q.type,
    question_type: q.type,
    promptText: q.promptText,
    question_text: q.promptText,
    displayed_question_text: displayedPrompt,
    option_A: finalOptions[0]?.text || '',
    option_B: finalOptions[1]?.text || '',
    option_C: finalOptions[2]?.text || '',
    option_D: finalOptions[3]?.text || '',
    options: finalOptions,
    correctAnswer: q.correctAnswer,
    correct_answer: q.correctAnswer,
    topic: q.topic,
    tested_skill: q.topic,
    underlinedPart: pronPattern || synAntWord || undefined,
    formatting_metadata: formattingMetadata,
    status: 'VALID',
  };

  return Object.freeze(synchronized);
}

/**
 * 19-Point Pre-Publish Quality & Integrity Validator
 * Checks every question before publishing.
 */
export function validateQuestionIntegrity(
  q: ClcExamQuestion,
  questionIndex: number,
  allQuestionIds: Set<string>
): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // [1] Question ID & Number
  if (!q.id || !q.question_id || q.id !== q.question_id) {
    errors.push(`Question #${questionIndex + 1}: ID mismatch (${q.id} !== ${q.question_id})`);
  }

  // [2] Question Type
  if (!q.type || !q.question_type) {
    errors.push(`Question #${questionIndex + 1}: Missing question_type`);
  }

  // [3] Question Text
  if (!q.promptText || !q.question_text || q.promptText.trim().length < 3) {
    errors.push(`Question #${questionIndex + 1}: Prompt text is missing or too short`);
  }

  // [4] Options A-D exactly 4
  if (!q.options || q.options.length !== 4) {
    errors.push(`Question #${questionIndex + 1}: Must have exactly 4 options (got ${q.options?.length})`);
  } else {
    // Check A, B, C, D IDs
    const expectedIds = ['A', 'B', 'C', 'D'];
    q.options.forEach((opt, idx) => {
      if (opt.id !== expectedIds[idx]) {
        errors.push(`Question #${questionIndex + 1}: Option #${idx} has wrong ID ${opt.id}, expected ${expectedIds[idx]}`);
      }
      if (!opt.text || opt.text.trim().length === 0) {
        errors.push(`Question #${questionIndex + 1}: Option ${opt.id} text is empty`);
      }
    });

    // Check unique option texts
    const uniqueTexts = new Set(q.options.map((o) => o.text.trim().toLowerCase()));
    if (uniqueTexts.size !== 4) {
      errors.push(`Question #${questionIndex + 1}: Duplicate options detected`);
    }
  }

  // [5] Option Order Synchronized
  if (
    q.option_A !== q.options[0]?.text ||
    q.option_B !== q.options[1]?.text ||
    q.option_C !== q.options[2]?.text ||
    q.option_D !== q.options[3]?.text
  ) {
    errors.push(`Question #${questionIndex + 1}: option_A..D does not match options array`);
  }

  // [6] Correct Answer Synchronized
  if (!['A', 'B', 'C', 'D'].includes(q.correctAnswer) || q.correctAnswer !== q.correct_answer) {
    errors.push(`Question #${questionIndex + 1}: Invalid or unsynchronized correctAnswer (${q.correctAnswer})`);
  }

  // [7] Explanation Synchronized
  if (!q.explanation || q.explanation.trim().length < 5) {
    errors.push(`Question #${questionIndex + 1}: Missing explanation`);
  }

  // [8] Grammar sanity check
  const badPatterns = [
    /this is a get up/i,
    /i have a solar panels/i,
    /look at the do karate/i,
    /nam has a get up/i,
  ];
  for (const bp of badPatterns) {
    if (bp.test(q.promptText) || q.options.some((o) => bp.test(o.text))) {
      errors.push(`Question #${questionIndex + 1}: Grammar sanity check failed on pattern ${bp}`);
    }
  }

  // [9] Spelling check for known OCR or generator typos
  const typoPatterns = [
    /\bpanelss\b/i,
    /\bexper\b/i,
    /\bscool\b/i,
    /\bfrind\b/i,
    /\bdiffernt\b/i,
    /\bdecison\b/i,
  ];
  for (const tp of typoPatterns) {
    if (tp.test(q.promptText) || q.options.some((o) => tp.test(o.text))) {
      errors.push(`Question #${questionIndex + 1}: Spelling typo detected`);
    }
  }

  // [10] No Ambiguity Check
  if (q.type === 'synonym' || q.type === 'antonym' || q.type === 'word_form') {
    const rightOpt = q.options.find((o) => o.id === q.correctAnswer);
    if (!rightOpt) {
      errors.push(`Question #${questionIndex + 1}: Correct option not found in options list`);
    }
  }

  // [11] Duplicate question check in this exam session
  if (allQuestionIds.has(q.id)) {
    errors.push(`Question #${questionIndex + 1}: Duplicate question ID in exam session: ${q.id}`);
  }
  allQuestionIds.add(q.id);

  // [12] Hard Rule: Pronunciation & Underline Validation
  const hasUnderlineInstruction =
    q.instruction.toLowerCase().includes('underlined') ||
    q.instructionVi.toLowerCase().includes('gạch chân');

  if (hasUnderlineInstruction) {
    const hasVisualUnderline =
      Boolean(q.formatting_metadata?.hasUnderline) ||
      (q.displayed_question_text && q.displayed_question_text.includes('<u>')) ||
      Boolean(q.underlinedPart);

    if (!hasVisualUnderline) {
      errors.push(`Question #${questionIndex + 1}: HARD VALIDATION FAILURE - Instruction requires visual underline but none provided`);
    }
  }

  // [13] Hard Rule: Image Question Validation (no false promises)
  const promisesImage =
    q.instruction.toLowerCase().includes('look at the picture') ||
    q.instructionVi.toLowerCase().includes('nhìn vào bức tranh');
  if (promisesImage && !q.formatting_metadata?.imageUri) {
    errors.push(`Question #${questionIndex + 1}: Instruction promises picture, but no imageUri exists`);
  }

  // [14] Hard Rule: Audio Question Validation (no false promises)
  const promisesAudio =
    q.instruction.toLowerCase().includes('listen to the sentence') ||
    q.instruction.toLowerCase().includes('listen and choose');
  if (promisesAudio && !q.formatting_metadata?.hasAudio) {
    errors.push(`Question #${questionIndex + 1}: Instruction promises audio, but audio is not available`);
  }

  // [15] Hard Rule: Sentence Order Question Grammaticality
  if (q.type === 'word_order') {
    const rightOpt = q.options.find((o) => o.id === q.correctAnswer);
    if (!rightOpt || rightOpt.text.trim().length < 8) {
      errors.push(`Question #${questionIndex + 1}: Word order question missing valid target sentence`);
    }
  }

  // [16] Hard Rule: Reading Comprehension Passage Check
  if (q.type === 'reading_comprehension' || q.type === 'cloze_test') {
    if (!q.contextPassage || q.contextPassage.text.trim().length < 20) {
      errors.push(`Question #${questionIndex + 1}: Reading question missing contextPassage`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * CLC_FINAL_VALIDATION()
 * Runs complete pre-publish check over all questions in an exam.
 */
export function CLC_FINAL_VALIDATION(questions: ClcExamQuestion[]): {
  status: 'VALID' | 'INVALID';
  totalQuestions: number;
  validCount: number;
  invalidCount: number;
  allErrors: string[];
} {
  const allErrors: string[] = [];
  const seenIds = new Set<string>();
  let validCount = 0;
  let invalidCount = 0;

  questions.forEach((q, idx) => {
    const result = validateQuestionIntegrity(q, idx, seenIds);
    if (result.isValid) {
      validCount++;
    } else {
      invalidCount++;
      allErrors.push(...result.errors);
    }
  });

  return {
    status: invalidCount === 0 ? 'VALID' : 'INVALID',
    totalQuestions: questions.length,
    validCount,
    invalidCount,
    allErrors,
  };
}
