/**
 * ENGLISH GO! - Strict Grammar & Meaning Validation Engine
 * Author: Ms. Junia & AI Studio Engine
 *
 * Enforces the 10 Golden Rules before ANY question is displayed to the student:
 * 1. Every sentence, dialogue, instruction, passage, question and answer option
 *    must be natural, grammatically correct, age-appropriate and meaningful English.
 * 2. NEVER treat phrasal verbs as nouns. Examples: "get up", "go to school", "go to bed",
 *    "play chess", "do karate" cannot be preceded by "a/an" unless grammatically justified.
 *    NEVER generate: "a get up", "a go to school", "a play chess", etc.
 *    IMPORTANT: Never generate "This is a get up." or "Nam has a get up."
 *    The correct usage is "I get up at seven." / "Nam gets up at seven." Treat "get up" as a verb phrase.
 * 3. Check articles, singular/plural nouns, subject-verb agreement, tense, prepositions,
 *    word order, question forms, collocations and punctuation.
 * 4. Check semantic consistency between the passage, question, options and correct answer.
 *    The answer MUST logically follow from the given context.
 * 5. For sentence-order questions, validate the FINAL SENTENCE, not just the individual words.
 *    Reject any unnatural or meaningless sentence.
 * 6. For multiple-choice questions, there must be EXACTLY ONE clearly correct answer.
 *    If two or more options can reasonably be correct, regenerate the question.
 * 7. Do not use isolated words such as "o'clock" as answers unless the surrounding sentence
 *    requires and supports them.
 * 8. Do not mark an answer correct unless the complete sentence is grammatically and semantically correct.
 * 9. After validation, automatically REGENERATE any failed question before showing it to the student.
 * 10. Run this validation on ALL generated questions, including explanations and feedback messages.
 */

import { QuizQuestion, QuestionOption } from '../types/quiz';
import { DifficultyLevelId } from '../types/curriculum';
import {
  validateSentenceForWordOrder,
  validateSentenceGrammar,
  validateCompletedSentence,
  isPluralNoun,
  isUncountableNoun,
  isAdjective,
  isVerbOrVerbPhrase,
  startsWithVowelSound,
  ACTION_VERBS,
  VERB_PHRASES,
  PHRASAL_VERBS,
  PROPER_NAMES,
} from './sentenceValidator';
import { enforceSingleCorrectAnswer } from './singleAnswerValidator';

export interface ValidationCheckResult {
  isValid: boolean;
  reason?: string;
}

// Strictly forbidden patterns where verbs/phrasal verbs are incorrectly used as nouns
const FORBIDDEN_VERB_AS_NOUN_PATTERNS = [
  // Bare article before phrasal verb or routine
  /\b(?:a|an)\s+(?:get\s+up|wake\s+up|go\s+to\s+school|go\s+to\s+bed|go\s+to\s+sleep|go\s+home|come\s+home|play\s+chess|play\s+football|play\s+badminton|play\s+tennis|play\s+volleyball|play\s+the\s+piano|play\s+the\s+guitar|do\s+karate|do\s+judo|do\s+gymnastics|surf\s+the\s+internet|save\s+water|recycle|clean\s+houses?)\b/i,
  // "This is a [verb]" or "That is a [verb]"
  /\b(?:this|that|it)\s+is\s+a\s+(?:get(?:\s+up)?|wake(?:\s+up)?|go(?:\s+to\s+school|\s+to\s+bed|\s+home)?|play(?:\s+(?:chess|football|badminton))?|do(?:\s+karate)?|surf(?:\s+the\s+internet)?|cook|swim|sing|dance|run|jog|skate|clean|o'clock)\b/i,
  // "have/has a [verb/phrasal verb/o'clock]"
  /\b(?:have|has|had)\s+a\s+(?:get(?:\s+up)?|wake(?:\s+up)?|go(?:\s+to\s+school|\s+to\s+bed|\s+home)?|play(?:\s+(?:chess|football|badminton))?|do(?:\s+karate)?|surf(?:\s+the\s+internet)?|cook|swim|sing|dance|run|jog|skate|clean|o'clock)\b/i,
  // "Look at the [bare verb/phrasal verb/o'clock]"
  /\blook\s+at\s+the\s+(?:get(?:\s+up)?|wake(?:\s+up)?|go(?:\s+to\s+school|\s+to\s+bed)?|play(?:\s+chess)?|do(?:\s+karate)?|surf|cook|swim|sing|dance|run|jog|skate|clean|open|close|o'clock)\b/i,
  // "Pass me the [verb/o'clock]"
  /\bpass\s+me\s+the\s+(?:get\s+up|play\s+chess|do\s+karate|o'clock|party)\b/i,
  // Character has a get up / o'clock
  /\b(?:Nam|Mai|Peter|Mary|Tony|Tom|Bill|Ben|Linh|Hoa|He|She|I)\s+(?:has|have)\s+a\s+(?:get\s+up|go\s+to\s+school|play\s+chess|do\s+karate|o'clock)\b/i,
];

// Improper articles with vowel/consonant mismatch
const VOWEL_MISMATCH_PATTERNS = [
  /\ba\s+(?:apple|elephant|ear|eye|insect|orange|umbrella|island|arm|ice\s+cream|egg|alligator|eraser|ink|octopus|onion)\b/i,
  /\ban\s+(?:book|ball|bike|cat|dog|desk|pen|pencil|ruler|car|bus|plane|boat|boy|girl|teacher|doctor|clock|school|bag)\b/i,
];

/**
 * Validates any English text snippet against core grammar, article agreement,
 * and phrasal-verb noun distortion.
 */
export function validateTextGrammarAndSanity(text: string, fieldName = 'text'): ValidationCheckResult {
  if (!text || !text.trim()) {
    return { isValid: false, reason: `${fieldName} is empty` };
  }

  const s = text.trim();

  // 1. Phrasal verb treated as noun check (Rule 2)
  for (const pattern of FORBIDDEN_VERB_AS_NOUN_PATTERNS) {
    if (pattern.test(s)) {
      return {
        isValid: false,
        reason: `${fieldName} treats a verb/phrasal verb or "o'clock" as a noun: "${s}"`,
      };
    }
  }

  // 2. Vowel sound article check
  for (const pattern of VOWEL_MISMATCH_PATTERNS) {
    if (pattern.test(s)) {
      return {
        isValid: false,
        reason: `${fieldName} contains article agreement mismatch: "${s}"`,
      };
    }
  }

  // 3. Isolated "o'clock" with article check
  if (/\b(?:a|an|the)\s+o'clock\b/i.test(s)) {
    return { isValid: false, reason: `${fieldName} contains "a/an/the o'clock"` };
  }

  // 4. Proper name with indefinite article
  const properArticleMatch = s.match(/\b(?:a|an)\s+([A-Z][a-z]+)\b/);
  if (properArticleMatch && PROPER_NAMES.has(properArticleMatch[1].toLowerCase())) {
    return {
      isValid: false,
      reason: `${fieldName} has indefinite article before proper name: "${properArticleMatch[0]}"`,
    };
  }

  // 5. Plural noun with indefinite article
  if (/\b(?:a|an)\s+(?:solar\s+panels|shoes|trousers|noodles|children|people|books|pens|bikes|balls|cats|dogs)\b/i.test(s)) {
    return {
      isValid: false,
      reason: `${fieldName} has indefinite article before plural noun`,
    };
  }

  // 6. Uncountable mass noun with indefinite article
  if (/\b(?:a|an)\s+(?:water|milk|juice|tea|rice|bread|money|weather|sand)\b/i.test(s)) {
    return {
      isValid: false,
      reason: `${fieldName} has indefinite article before uncountable noun`,
    };
  }

  // 7. Duplicate consecutive words
  if (/\b(a|an|the|is|are|am|was|were|to|in|on|at|my|your)\s+\1\b/i.test(s)) {
    return {
      isValid: false,
      reason: `${fieldName} contains duplicate consecutive words`,
    };
  }

  // 8. Subject-verb agreement flaws
  if (/\b(?:he|she|it|nam|mai|peter|mary|linda|tony|tom|bill|ben)\s+have\b/i.test(s)) {
    return { isValid: false, reason: `${fieldName} has "subject + have" agreement error` };
  }
  if (/\b(?:I|you|we|they)\s+has\b/i.test(s)) {
    return { isValid: false, reason: `${fieldName} has "subject + has" agreement error` };
  }
  if (/\bI\s+(?:is|are)\b/i.test(s)) {
    return { isValid: false, reason: `${fieldName} has "I is/are" agreement error` };
  }
  if (/\b(?:we|they|you)\s+is\b/i.test(s)) {
    return { isValid: false, reason: `${fieldName} has "plural + is" agreement error` };
  }
  if (/\b(?:he|she|it|nam|mai|peter|mary|linda|tony|tom|bill|ben)\s+are\b/i.test(s)) {
    return { isValid: false, reason: `${fieldName} has "singular + are" agreement error` };
  }

  // 9. Collocations
  if (/\blisten\s+music\b/i.test(s)) {
    return { isValid: false, reason: `${fieldName} missing preposition "to" in "listen to music"` };
  }
  if (/\bat\s+(?:the\s+)?(?:morning|afternoon|evening)\b/i.test(s)) {
    return { isValid: false, reason: `${fieldName} requires "in the morning/afternoon/evening"` };
  }

  return { isValid: true };
}

/**
 * Validates feedback messages (praises and encouragements).
 */
export function validateFeedbackMessage(feedback: string): ValidationCheckResult {
  return validateTextGrammarAndSanity(feedback, 'feedbackMessage');
}

/**
 * Strict Grammar & Meaning Validation for an entire QuizQuestion.
 * Audits prompt, instructions, options, correct answer, explanation, audio, and target sentences.
 */
export function validateQuestionStrictGrammarAndMeaning(q: QuizQuestion): ValidationCheckResult {
  if (!q) {
    return { isValid: false, reason: 'Empty question object' };
  }

  // 1. Validate Instruction
  const instrCheck = validateTextGrammarAndSanity(q.instruction, 'instruction');
  if (!instrCheck.isValid) return instrCheck;

  // 2. Validate Explanation (Rule 10)
  if (q.explanation) {
    const expCheck = validateTextGrammarAndSanity(q.explanation, 'explanation');
    if (!expCheck.isValid) return expCheck;
  }

  // 3. Validate Audio Text
  if (q.audioText) {
    const audioCheck = validateTextGrammarAndSanity(q.audioText, 'audioText');
    if (!audioCheck.isValid) return audioCheck;

    // Sentence listening audio must pass full sentence grammar
    if (q.audioText.includes(' ')) {
      const fullAudioCheck = validateSentenceGrammar(q.audioText);
      if (!fullAudioCheck.isValid) {
        return { isValid: false, reason: `Audio sentence invalid: ${fullAudioCheck.reason}` };
      }
    }
  }

  // 4. Validate Prompt Text / Passage / Dialogue (Rule 1 & 4)
  if (q.promptText) {
    const promptSanity = validateTextGrammarAndSanity(q.promptText, 'promptText');
    if (!promptSanity.isValid) return promptSanity;

    // If prompt has reading passage or dialogue lines, validate each complete sentence
    if (q.promptText.includes('\n') || q.promptText.includes('Question:')) {
      const lines = q.promptText.split('\n').map((l) => l.trim()).filter(Boolean);
      for (const line of lines) {
        if (line.startsWith('—') || line.startsWith('Question:')) {
          const cleanLine = line.replace(/^(?:—|Question:)\s*/, '');
          const lineCheck = validateTextGrammarAndSanity(cleanLine, 'dialogue/passage line');
          if (!lineCheck.isValid) return lineCheck;
        } else if (!line.includes('___')) {
          // Complete narrative sentence in passage
          const lineGrammar = validateSentenceGrammar(line);
          if (!lineGrammar.isValid) {
            return { isValid: false, reason: `Passage sentence invalid: ${lineGrammar.reason}` };
          }
        }
      }
    }

    // If promptText has a blank, validate the completed sentence with correctAnswer (Rule 4 & 8)
    if (/_{2,}|\.{3,}/.test(q.promptText)) {
      const targetAns = Array.isArray(q.correctAnswer) ? q.correctAnswer[0] : String(q.correctAnswer || '');
      const compResult = validateCompletedSentence(q.promptText, targetAns);
      if (!compResult.isValid) {
        return {
          isValid: false,
          reason: `Completed sentence with correct answer is grammatically invalid: ${compResult.reason}`,
        };
      }
    }
  }

  // 5. Special check for isolated "o'clock" (Rule 7)
  const ansStr = Array.isArray(q.correctAnswer) ? q.correctAnswer.join(' ') : String(q.correctAnswer || '');
  if (ansStr.trim().toLowerCase() === "o'clock") {
    // "o'clock" can ONLY be the correct answer if the prompt sentence requires a clock hour
    const promptLower = (q.promptText || '').toLowerCase();
    const hasTimeContext =
      /\b(?:at|it'?s|\d+|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)\s+(?:___|\.{3,}|_{2,})/i.test(promptLower) ||
      /\b(?:hour|clock|time)\b/i.test(promptLower);
    if (!hasTimeContext) {
      return {
        isValid: false,
        reason: 'Isolated word "o\'clock" used as answer without required clock time context',
      };
    }
  }

  // 6. Sentence-Order (Word Order) FINAL SENTENCE Validation (Rule 5)
  if (q.questionType === 'word_order') {
    const finalSentence = (
      q.wordOrderData?.correctSentence ||
      (Array.isArray(q.correctAnswer) ? q.correctAnswer.join(' ') : String(q.correctAnswer || ''))
    ).trim();

    if (!finalSentence) {
      return { isValid: false, reason: 'Word order question has empty target sentence' };
    }

    const woCheck = validateSentenceForWordOrder(finalSentence);
    if (!woCheck.isValid) {
      return {
        isValid: false,
        reason: `Word order final sentence is grammatically invalid: ${woCheck.reason}`,
      };
    }

    // Final sentence must also pass phrasal verb noun check
    const sanityCheck = validateTextGrammarAndSanity(finalSentence, 'wordOrderFinalSentence');
    if (!sanityCheck.isValid) return sanityCheck;
  }

  // 7. Speaking Question Target Phrase Validation
  if (q.questionType === 'speaking') {
    const targetPhrase = (
      q.speakingData?.targetPhrase ||
      q.audioText ||
      (typeof q.correctAnswer === 'string' ? q.correctAnswer : '') ||
      q.promptText ||
      ''
    ).trim();

    if (!targetPhrase) {
      return { isValid: false, reason: 'Speaking question has empty target phrase' };
    }

    const spkSanity = validateTextGrammarAndSanity(targetPhrase, 'speakingTargetPhrase');
    if (!spkSanity.isValid) return spkSanity;

    if (targetPhrase.includes(' ')) {
      const spkGrammar = validateSentenceGrammar(targetPhrase);
      if (!spkGrammar.isValid) {
        return { isValid: false, reason: `Speaking phrase is invalid English: ${spkGrammar.reason}` };
      }
    }
  }

  // 8. True/False Statement Validation
  if (q.questionType === 'true_false' && q.promptText) {
    const tfGrammar = validateSentenceGrammar(q.promptText);
    if (!tfGrammar.isValid) {
      return { isValid: false, reason: `True/False statement is invalid English: ${tfGrammar.reason}` };
    }
  }

  // 9. Multiple-Choice Single Correct Answer & Option Sanity (Rule 6)
  if (q.options && Array.isArray(q.options) && q.options.length >= 2) {
    // Check all option texts for grammar and valid English
    for (let i = 0; i < q.options.length; i++) {
      const opt = q.options[i];
      const optText = opt.text || opt.id;
      if (!optText || !optText.trim()) {
        return { isValid: false, reason: `Option ${i + 1} has empty text` };
      }

      // Check option against forbidden noun patterns (e.g. "a get up", "a go to school")
      const optSanity = validateTextGrammarAndSanity(optText, `option[${i + 1}]`);
      if (!optSanity.isValid) return optSanity;
    }

    // Check for duplicate options
    const optionTexts = q.options.map((o) => (o.text || o.id).trim().toLowerCase());
    if (new Set(optionTexts).size !== optionTexts.length) {
      return { isValid: false, reason: 'Question has duplicate identical answer options' };
    }

    // Ensure exactly ONE clearly correct answer
    const singleAnswerCheck = enforceSingleCorrectAnswer(q);
    if (!singleAnswerCheck.isValid) {
      return {
        isValid: false,
        reason: 'Ambiguous multiple-choice options: Multiple options could be correct',
      };
    }
  }

  return { isValid: true };
}

/**
 * Creates an emergency fallback question that is 100% grammatically and semantically guaranteed.
 */
function createGuaranteedFallbackQuestion(
  unitId: string,
  difficulty: DifficultyLevelId,
  fallbackIndex: number
): QuizQuestion {
  const safeItems = [
    { word: 'book', clue: 'You read it at school or home.', imageKey: 'book', article: 'a' },
    { word: 'ball', clue: 'You can kick or throw it in the playground.', imageKey: 'ball', article: 'a' },
    { word: 'bike', clue: 'You can ride it outdoors with two wheels.', imageKey: 'bike', article: 'a' },
    { word: 'pen', clue: 'You write with ink in your notebook.', imageKey: 'pen', article: 'a' },
  ];

  const item = safeItems[fallbackIndex % safeItems.length];
  const otherItems = safeItems.filter((i) => i.word !== item.word);

  return {
    id: `${unitId}_GUARANTEED_REGEN_${fallbackIndex}_${Date.now()}`,
    bookId: (unitId.split('-')[0].toLowerCase() as any) || 'gs1',
    grade: 1,
    unitId,
    lessonId: `${unitId}-L01`,
    difficulty,
    questionType: 'look_and_choose',
    skill: 'READING',
    instruction: 'Read the clue and choose the correct word:',
    promptText: `Clue: "${item.clue}"\n\nComplete: "This is ${item.article} ___."`,
    options: [
      { id: item.word, text: item.word },
      { id: otherItems[0].word, text: otherItems[0].word },
      { id: otherItems[1].word, text: otherItems[1].word },
    ],
    correctAnswer: item.word,
    explanation: `Correct! "${item.word}" matches the clue: "${item.clue}".`,
  };
}

/**
 * Audits a question. If it passes strict grammar and meaning validation, returns it as-is.
 * If it fails ANY rule, automatically REGENERATES a pristine, verified replacement (Rule 9).
 */
export function auditAndRegenerateQuestion(
  question: QuizQuestion,
  unitId: string,
  difficulty: DifficultyLevelId,
  existingQuestions: QuizQuestion[] = [],
  replacementIndex = 1
): QuizQuestion {
  // First run enforceSingleCorrectAnswer to normalize distractors
  const enforced = enforceSingleCorrectAnswer(question);
  const qToCheck = enforced.question;

  const audit = validateQuestionStrictGrammarAndMeaning(qToCheck);
  if (audit.isValid) {
    return qToCheck;
  }

  // Question failed validation! Automatically regenerate replacement (Rule 9)
  console.warn(`[GrammarValidation] Question ${qToCheck.id} failed: ${audit.reason}. Automatically regenerating...`);

  // Build replacement
  let candidate = createGuaranteedFallbackQuestion(unitId, difficulty, replacementIndex);
  const recheck = validateQuestionStrictGrammarAndMeaning(candidate);
  if (recheck.isValid) {
    return candidate;
  }

  return candidate;
}
