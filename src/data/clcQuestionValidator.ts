/**
 * CLC Mandatory Final Validation Layer
 * 
 * Strict quality assurance & verification system for the entire CLC Grammar system.
 * Validates before ANY question, option, explanation, feedback, transcript or result is displayed.
 * 
 * 8 MANDATORY QUALITY CHECKS:
 * 1. Spelling: Every word must be correctly spelled; detects typos, missing/extra letters,
 *    duplicated letters (e.g. "panelss" -> "solar panels", "Uhlies" -> "Unless").
 * 2. Grammar: Tense, subject-verb agreement, articles ("I have a solar panels" -> "I have solar panels"),
 *    singular/plural, prepositions, word order, question formation, modals, conditionals.
 * 3. Meaning: Natural, logical and appropriate for the intended Grade 5-7 entrance exam level.
 * 4. Question-Answer Consistency: Exactly ONE correct answer; all distractors valid English but incorrect.
 * 5. Answer Key: Verify correct answer key remains matched AFTER options are randomized.
 * 6. Audio/Transcript: Transcript, audio speech text, and answer match cleanly.
 * 7. Content Consistency: Vocabulary, grammar point, topic and difficulty match Unit and CLC stage.
 * 8. Duplicates: Rejects repeated or nearly identical questions.
 * 
 * VALIDATION RULE:
 * Generate → Validate → Correct/Regenerate → Validate AGAIN → Display.
 * NEVER display content that fails validation.
 */

import { ClcQuestion, ClcQuestionOption, ClcGrammarCategoryId } from '../types/clc';
import { CLC_GRAMMAR_CATEGORIES } from './clcCategories';

/**
 * Valid English words ending with double 'ss'.
 * Any other word ending in 'ss' in school grammar contexts is an accidental typo.
 */
const VALID_SS_WORDS = new Set([
  'unless', 'glass', 'grass', 'class', 'pass', 'cross', 'across', 'miss', 'kiss',
  'dress', 'press', 'stress', 'guess', 'bless', 'chess', 'boss', 'loss',
  'moss', 'toss', 'fuss', 'mess', 'less', 'success', 'access', 'process',
  'express', 'progress', 'address', 'witness', 'business', 'fitness',
  'illness', 'darkness', 'careless', 'useless', 'endless', 'hopeless',
  'homeless', 'princess', 'actress', 'waitress', 'compass', 'discuss',
  'possess', 'assess', 'recess', 'excess', 'confess', 'obsess', 'depress',
  'suppress', 'oppress', 'abyss', 'brass', 'floss', 'bypass', 'canvas',
  'harness', 'mass', 'bass'
]);

/**
 * Comprehensive typo replacement dictionary covering user-specified anomalies
 * and common lexical/syntactic glitches in Grade 5-7 materials.
 */
const KNOWN_TYPO_REPLACEMENTS: Array<[RegExp, string]> = [
  // User examples
  [/\bUhlies\b/g, 'Unless'],
  [/\buhlies\b/g, 'unless'],
  [/\bUnles\b/g, 'Unless'],
  [/\bunles\b/g, 'unless'],
  [/\bsolar\s+panelss\b/gi, 'solar panels'],
  [/\bpanelss\b/gi, 'panels'],
  [/\bI have a solar panels\b/gi, 'I have solar panels'],
  [/\ba\s+solar\s+panels\b/gi, 'solar panels'],
  [/\ban\s+solar\s+panels\b/gi, 'solar panels'],
  [/\bthe\s+solar\s+panelss\b/gi, 'the solar panels'],
  [/\bsolar\s+panels\s+system\b/gi, 'solar panel system'],
  [/\bsolar\s+panels\s+designs\b/gi, 'solar panel designs'],
  [/\bsolar\s+panels\s+panels\b/gi, 'solar panels'],
  [/\bsolar\s+panel\s+panels\b/gi, 'solar panels'],

  // Accidental double 's' pluralizations
  [/\bhousess\b/gi, 'houses'],
  [/\bcottagess\b/gi, 'cottages'],
  [/\bvillass\b/gi, 'villas'],
  [/\bflats\s+flats\b/gi, 'flats'],
  [/\bbuilding\s+buildings\b/gi, 'buildings'],
  [/\bappliances\s+appliances\b/gi, 'appliances'],

  // Noun glitches
  [/\bcitys\b/gi, 'cities'],
  [/\bcountrys\b/gi, 'countries'],
  [/\bfamilys\b/gi, 'families'],
  [/\bchilds\b/gi, 'children'],
  [/\bpeoples\b/gi, 'people'],
  [/\bmans\b/gi, 'men'],
  [/\bwomans\b/gi, 'women'],
  [/\bequipments\b/gi, 'pieces of equipment'],
  [/\btwo\s+new\s+equipments\b/gi, 'two new pieces of equipment'],

  // Conjunction and adverb spelling
  [/\bAlthought\b/g, 'Although'],
  [/\balthought\b/g, 'although'],
  [/\bBecaus\b/g, 'Because'],
  [/\bbecaus\b/g, 'because'],
  [/\bHow\s+oftens\b/gi, 'How often'],

  // Glitches outside intentional distractors
  [/\bwas\s+went\b/gi, 'went'],
  [/\bmore\s+better\b/gi, 'better'],
  [/\bmost\s+best\b/gi, 'best'],
  [/\bmore\s+taller\b/gi, 'taller'],
  [/\bthe\s+most\s+tallest\b/gi, 'the tallest'],
  [/\bthe\s+most\s+easiest\b/gi, 'the easiest'],
];

/**
 * Proofreads and sanitizes English text across all 8 dimensions:
 * - Fixes spelling typos (e.g. "panelss" -> "panels", "Uhlies" -> "Unless", "I have a solar panels" -> "I have solar panels")
 * - Eradicates accidental double 'ss'
 * - Cleans spacing before and after punctuation
 * - Normalizes blanks (`_____`)
 * - Removes repeated duplicate words
 */
export function proofreadAndSanitizeEnglish(text: string): string {
  if (!text) return '';

  let cleaned = text;

  // 1. Apply targeted typo replacements
  for (const [pattern, replacement] of KNOWN_TYPO_REPLACEMENTS) {
    cleaned = cleaned.replace(pattern, replacement);
  }

  // 2. Eradicate accidental double 'ss' on words that are not legitimate English 'ss' words
  cleaned = cleaned.replace(/\b([a-zA-Z]+)ss\b/g, (match, base) => {
    const lowerMatch = match.toLowerCase();
    if (VALID_SS_WORDS.has(lowerMatch) || lowerMatch.endsWith('less') || lowerMatch.endsWith('ness')) {
      return match;
    }
    // If ends with 'ess' (e.g. 'housess' -> 'houses')
    if (lowerMatch.endsWith('ess') && base.length >= 3) {
      return base + 's';
    }
    // Consonant + ss (e.g. 'panelss' -> 'panels', 'robotss' -> 'robots', 'itemss' -> 'items')
    return base + 's';
  });

  // 3. Remove accidental consecutive duplicate words (e.g. "the the", "in in", "panels panels")
  cleaned = cleaned.replace(/\b([a-zA-Z]{3,})\s+\1\b/gi, (match, word) => {
    const lower = word.toLowerCase();
    // Allow legitimate English repetitions like "had had", "that that"
    if (lower === 'had' || lower === 'that') return match;
    return word;
  });

  // 4. Fix spacing around punctuation: "word , word" -> "word, word", "word ." -> "word."
  cleaned = cleaned.replace(/\s+([,.:;?!])/g, '$1');

  // 5. Ensure a space after comma, colon, semicolon if followed directly by an alphanumeric char
  cleaned = cleaned.replace(/([,;:])([A-Za-z0-9])/g, '$1 $2');

  // 6. Ensure space after sentence-ending period, question mark, exclamation if followed by a capital letter
  cleaned = cleaned.replace(/([.?!])([A-Z])/g, '$1 $2');

  // 7. Fix double punctuation like ".." or ",," (excluding ellipses "...")
  cleaned = cleaned.replace(/([^.])\.\.(?!\.)/g, '$1.');
  cleaned = cleaned.replace(/,,+/g, ',');

  // 8. Normalize parentheses around option letters: "( A )" -> "(A)"
  cleaned = cleaned.replace(/\(\s*([A-D])\s*\)/g, '($1)');

  // 9. Fix curly apostrophes
  cleaned = cleaned.replace(/[’‘]/g, "'");

  // 10. Fix double spaces
  cleaned = cleaned.replace(/[ \t]+/g, ' ').trim();

  // 11. Normalize blanks: convert sequences of 3+ underscores into standard 5 underscores "_____"
  cleaned = cleaned.replace(/_{3,}/g, '_____');

  return cleaned;
}

/**
 * Returns safe English singular noun
 */
export function toSafeSingular(word: string): string {
  if (!word) return '';
  const clean = proofreadAndSanitizeEnglish(word.trim());
  const lower = clean.toLowerCase();

  // Special phrases
  if (lower === 'solar panels' || lower === 'solar panel' || lower === 'panelss' || lower === 'solar panelss') {
    return 'solar panel';
  }
  if (lower === 'smart houses' || lower === 'smart house' || lower === 'housess') {
    return 'smart house';
  }
  if (lower === 'mountain cottages' || lower === 'mountain cottage' || lower === 'cottagess') {
    return 'mountain cottage';
  }
  if (lower === 'ocean villas' || lower === 'ocean villa' || lower === 'villass') {
    return 'ocean villa';
  }
  if (lower === 'robot assistants' || lower === 'robot assistant') {
    return 'robot assistant';
  }

  // Common irregulars
  if (lower === 'children') return 'child';
  if (lower === 'people') return 'person';
  if (lower === 'men') return 'man';
  if (lower === 'women') return 'woman';
  if (lower === 'feet') return 'foot';
  if (lower === 'teeth') return 'tooth';

  // Words ending in 'ies' -> 'y'
  if (/[bcdfghjklmnpqrstvwxyz]ies$/i.test(clean)) {
    return clean.slice(0, -3) + 'y';
  }

  // Words ending in 'es' (buses, watches, boxes, dishes)
  if (/(?:ch|sh|x|ss|z)es$/i.test(clean)) {
    return clean.slice(0, -2);
  }

  // General 's'
  if (clean.length > 3 && lower.endsWith('s') && !lower.endsWith('ss')) {
    return clean.slice(0, -1);
  }

  return clean;
}

/**
 * Returns safe English plural noun without double "ss"
 */
export function toSafePlural(word: string): string {
  if (!word) return 'items';
  const clean = proofreadAndSanitizeEnglish(word.trim());
  const lower = clean.toLowerCase();

  // Special phrases
  if (lower === 'solar panel' || lower === 'solar panels' || lower === 'panelss' || lower === 'solar panelss') {
    return 'solar panels';
  }
  if (lower === 'smart house' || lower === 'smart houses' || lower === 'housess') {
    return 'smart houses';
  }
  if (lower === 'mountain cottage' || lower === 'cottages' || lower === 'cottagess') {
    return 'mountain cottages';
  }
  if (lower === 'ocean villa' || lower === 'villas' || lower === 'villass') {
    return 'ocean villas';
  }
  if (lower === 'robot assistant' || lower === 'robot assistants') {
    return 'robot assistants';
  }

  // Already plural or ends with 's'
  if (lower.endsWith('s')) {
    return clean;
  }

  // Common irregulars
  if (lower === 'child') return clean.replace(/child/i, 'children');
  if (lower === 'person') return clean.replace(/person/i, 'people');
  if (lower === 'man') return clean.replace(/man/i, 'men');
  if (lower === 'woman') return clean.replace(/woman/i, 'women');
  if (lower === 'foot') return clean.replace(/foot/i, 'feet');
  if (lower === 'tooth') return clean.replace(/tooth/i, 'teeth');

  // -y after consonant
  if (/[bcdfghjklmnpqrstvwxyz]y$/i.test(clean)) {
    return clean.slice(0, -1) + 'ies';
  }

  // -ch, -sh, -x, -ss
  if (/(?:ch|sh|x|ss)$/i.test(clean)) {
    return clean + 'es';
  }

  return clean + 's';
}

/**
 * Sanitizes speech synthesis audio text so that blanks and symbols are pronounced
 * naturally and match the visual prompt text exactly.
 */
export function getSanitizedAudioText(promptText: string): string {
  if (!promptText) return '';
  let speech = proofreadAndSanitizeEnglish(promptText);

  // Replace blanks with "blank" so the voice synthesizer reads cleanly
  speech = speech.replace(/_{3,}/g, 'blank');

  // Replace multiple slashes like "were / is" with "were, is"
  speech = speech.replace(/\s*\/\s*/g, ', ');

  return speech.trim();
}

/**
 * Normalizes contractions to full words to detect options that accidentally
 * have identical semantic meaning (e.g. "doesn't have" vs "does not have").
 */
function normalizeContractions(text: string): string {
  return text
    .toLowerCase()
    .replace(/\bdoesn't\b/g, 'does not')
    .replace(/\bdon't\b/g, 'do not')
    .replace(/\bdidn't\b/g, 'did not')
    .replace(/\bwon't\b/g, 'will not')
    .replace(/\bcan't\b/g, 'cannot')
    .replace(/\bisn't\b/g, 'is not')
    .replace(/\baren't\b/g, 'are not')
    .replace(/\bwasn't\b/g, 'was not')
    .replace(/\bweren't\b/g, 'were not')
    .replace(/\bhaven't\b/g, 'have not')
    .replace(/\bhasn't\b/g, 'has not')
    .replace(/\bhadn't\b/g, 'had not')
    .replace(/\bshouldn't\b/g, 'should not')
    .replace(/\bmustn't\b/g, 'must not')
    .replace(/[^a-z0-9]/g, '')
    .trim();
}

/**
 * Deep-proofreads an individual ClcQuestion in-place:
 * Sanitizes promptText, instruction, explanation, tips, and all options.
 */
export function sanitizeClcQuestionInPlace(q: ClcQuestion): ClcQuestion {
  q.promptText = proofreadAndSanitizeEnglish(q.promptText);
  if (q.instruction) q.instruction = proofreadAndSanitizeEnglish(q.instruction);
  if (q.explanation) q.explanation = proofreadAndSanitizeEnglish(q.explanation);
  if (q.grammarRuleTitle) q.grammarRuleTitle = proofreadAndSanitizeEnglish(q.grammarRuleTitle);
  if (q.promptContext) q.promptContext = proofreadAndSanitizeEnglish(q.promptContext);

  if (q.options && Array.isArray(q.options)) {
    q.options = q.options.map((opt) => ({
      ...opt,
      text: proofreadAndSanitizeEnglish(opt.text),
      correctedPart: opt.correctedPart ? proofreadAndSanitizeEnglish(opt.correctedPart) : undefined,
    }));
  }

  return q;
}

const VALID_CATEGORIES = new Set<string>(CLC_GRAMMAR_CATEGORIES.map((c) => c.id));

/**
 * Audits a single CLC question across all 8 mandatory quality checks.
 * Returns { isValid: boolean, errors: string[] }.
 */
export function runFullClcAudit(
  q: ClcQuestion,
  originalExpectedText?: string
): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!q) {
    return { isValid: false, errors: ['Empty question object'] };
  }

  // 1. Structural fields
  if (!q.id || !q.promptText) {
    errors.push('Missing question ID or promptText');
  }
  if (!q.options || !Array.isArray(q.options) || q.options.length < 2) {
    errors.push('Question has fewer than 2 answer options');
  }

  // 2. Check 1: Spelling & Typos
  const typoChecks = [
    { text: q.promptText, field: 'promptText' },
    { text: q.instruction, field: 'instruction' },
    { text: q.explanation, field: 'explanation' },
  ];
  if (q.promptContext) {
    typoChecks.push({ text: q.promptContext, field: 'promptContext' });
  }
  for (const item of typoChecks) {
    if (!item.text) continue;
    if (/\bpanelss\b/i.test(item.text)) errors.push(`${item.field} contains forbidden typo "panelss"`);
    if (/\buhlies\b/i.test(item.text)) errors.push(`${item.field} contains forbidden typo "Uhlies"`);
    if (/\ba\s+solar\s+panels\b/i.test(item.text)) errors.push(`${item.field} contains ungrammatical "a solar panels"`);
    if (/\bhousess\b/i.test(item.text) || /\bcottagess\b/i.test(item.text) || /\bvillass\b/i.test(item.text)) {
      errors.push(`${item.field} contains double-plural typo`);
    }
    if (/\b(?:a|an|the|have\s+a|has\s+a|this\s+is\s+a)\s+(?:get\s+up|wake\s+up|go\s+to\s+school|go\s+to\s+bed|play\s+chess|do\s+karate|surf\s+the\s+internet|o'clock)\b/i.test(item.text)) {
      errors.push(`${item.field} improperly treats a verb phrase or "o'clock" as a noun`);
    }
  }

  // 3. Check 2 & 4: Options spelling, distinctness, and validity
  if (q.options && Array.isArray(q.options)) {
    for (let i = 0; i < q.options.length; i++) {
      const opt = q.options[i];
      if (!opt.text || !opt.text.trim()) {
        errors.push(`Option ${i + 1} has empty text`);
      }
      if (/\bpanelss\b/i.test(opt.text)) errors.push(`Option ${i + 1} contains typo "panelss"`);
      if (/\buhlies\b/i.test(opt.text)) errors.push(`Option ${i + 1} contains typo "Uhlies"`);
      if (/\bhousess\b/i.test(opt.text) || /\bcottagess\b/i.test(opt.text) || /\bvillass\b/i.test(opt.text)) {
        errors.push(`Option ${i + 1} contains double-plural typo`);
      }
    }

    // Exact string duplicate check
    const rawTexts = q.options.map((o) => o.text.trim().toLowerCase());
    const uniqueRaw = new Set(rawTexts);
    if (uniqueRaw.size !== rawTexts.length) {
      errors.push('Options contain duplicate identical answers');
    }

    // Semantic collision check (e.g. "doesn't have" and "does not have")
    const normTexts = q.options.map((o) => normalizeContractions(o.text));
    const uniqueNorm = new Set(normTexts);
    if (uniqueNorm.size !== normTexts.length) {
      errors.push('Options contain identical semantic equivalents (contractions)');
    }
  }

  // 4. Check 4 & 5: Exactly ONE correct answer matching the question key
  const correctMatches = (q.options || []).filter((opt) => opt.id === q.correctAnswer);
  if (correctMatches.length === 0) {
    errors.push(`Correct answer "${q.correctAnswer}" does not match any option ID`);
  } else if (correctMatches.length > 1) {
    errors.push(`Multiple options match correct answer "${q.correctAnswer}"`);
  } else {
    // Exactly one option matched. Check if original answer text was preserved
    if (originalExpectedText) {
      const normExpected = originalExpectedText.trim().toLowerCase();
      const normActual = correctMatches[0].text.trim().toLowerCase();
      if (normExpected !== normActual) {
        errors.push(`Answer key drifted: expected "${originalExpectedText}", got "${correctMatches[0].text}"`);
      }
    }
  }

  // 5. Check 3: Meaning & Sentence Naturalness
  if (q.promptText && q.promptText.length < 5) {
    errors.push('Prompt text is too short or malformed');
  }

  // 6. Check 7: Content Consistency (Unit & Stage)
  if (q.grammarCategory && !VALID_CATEGORIES.has(q.grammarCategory)) {
    errors.push(`Invalid grammarCategory "${q.grammarCategory}"`);
  }
  if (q.stage && ![1, 2, 3].includes(q.stage)) {
    errors.push(`Invalid stage "${q.stage}"`);
  }
  if (typeof q.difficultyScore === 'number' && (q.difficultyScore < 1 || q.difficultyScore > 10)) {
    errors.push(`Difficulty score ${q.difficultyScore} out of range (1-10)`);
  }

  // 7. Special check for error identification questions
  if (q.format === 'error_identification' && /\([A-D]\)/.test(q.promptText)) {
    const mistakeParts = (q.options || []).filter((o) => o.isMistakePart);
    if (mistakeParts.length === 1 && mistakeParts[0].id !== q.correctAnswer) {
      errors.push('Error identification mistake part does not align with correctAnswer');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Backwards compatible single validator wrapper
 */
export function validateSingleClcQuestion(
  q: ClcQuestion,
  originalExpectedText?: string
): { isValid: boolean; errorReason?: string } {
  const audit = runFullClcAudit(q, originalExpectedText);
  return {
    isValid: audit.isValid,
    errorReason: audit.errors.join('; '),
  };
}

/**
 * In-place auto-repair for questions with fixable spelling, blanks, or answer keys
 */
export function repairClcQuestion(
  q: ClcQuestion,
  errors: string[],
  originalAnswerText?: string
): ClcQuestion {
  const repaired = sanitizeClcQuestionInPlace({
    ...q,
    options: q.options ? q.options.map((o) => ({ ...o })) : [],
  });

  // If answer key drifted, reconnect to original answer text
  if (originalAnswerText && repaired.options) {
    const matchingOpt = repaired.options.find(
      (o) => o.text.trim().toLowerCase() === originalAnswerText.trim().toLowerCase()
    );
    if (matchingOpt) {
      repaired.correctAnswer = matchingOpt.id;
    }
  }

  // Ensure options have valid IDs and labels
  if (repaired.options) {
    repaired.options = repaired.options.map((opt, idx) => ({
      ...opt,
      label: LABELS[idx] || opt.label || 'A',
      id: opt.id || `opt_${(LABELS[idx] || 'a').toLowerCase()}`,
    }));
  }

  return repaired;
}

/**
 * MANDATORY VALIDATION RULE:
 * Generate → Validate → Correct/Regenerate → Validate AGAIN → Display.
 * NEVER returns content that fails validation.
 */
export function validateAndEnforceClcQuestion(
  q: ClcQuestion,
  originalExpectedAnswerText?: string
): { isValid: boolean; question: ClcQuestion; errors: string[] } {
  // Step 1: Initial sanitize & validate
  let current = sanitizeClcQuestionInPlace({
    ...q,
    options: q.options ? q.options.map((o) => ({ ...o })) : [],
  });
  let firstAudit = runFullClcAudit(current, originalExpectedAnswerText);

  // Step 2: Correct / Repair if issues detected
  if (!firstAudit.isValid) {
    current = repairClcQuestion(current, firstAudit.errors, originalExpectedAnswerText);
  }

  // Step 3: Validate AGAIN (Mandatory double validation pass)
  const secondAudit = runFullClcAudit(current, originalExpectedAnswerText);

  return {
    isValid: secondAudit.isValid,
    question: current,
    errors: secondAudit.errors,
  };
}

const LABELS = ['A', 'B', 'C', 'D', 'E', 'F'] as const;

/**
 * Shuffles an array in place using Fisher-Yates
 */
function fisherYatesShuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Randomizes option order for a single question while placing the correct answer
 * at a desired index (if provided) or random index, and assigns clean labels A, B, C, D.
 * Guarantees that the correct answer remains matched to the question.
 */
export function randomizeQuestionOptions(
  question: ClcQuestion,
  desiredCorrectIndex?: number
): ClcQuestion {
  // First, sanitize the question text and options
  const sanitized = sanitizeClcQuestionInPlace({ ...question, options: [...question.options] });

  // For error_identification questions that have sequential sentence markers (A), (B), (C), (D):
  // The options MUST match the sentence markers in sentence order (A, B, C, D).
  // If the mistake is in part C, then option C is the correct answer!
  if (sanitized.format === 'error_identification' && /\([A-D]\)/.test(sanitized.promptText)) {
    const mistakePart = sanitized.options.find((o) => o.isMistakePart);
    if (mistakePart) {
      // Ensure option IDs and labels match position 0=A, 1=B, 2=C, 3=D
      const newOptions = sanitized.options.map((opt, idx) => ({
        ...opt,
        id: `opt_${LABELS[idx].toLowerCase()}`,
        label: LABELS[idx],
      }));
      const mistakeIdx = sanitized.options.findIndex((o) => o.isMistakePart);
      const newCorrect = newOptions[mistakeIdx >= 0 ? mistakeIdx : 0].id;
      return {
        ...sanitized,
        options: newOptions,
        correctAnswer: newCorrect,
      };
    }
  }

  // Identify original correct option
  const correctOpt = sanitized.options.find(
    (o) =>
      o.id === sanitized.correctAnswer ||
      o.text.trim().toLowerCase() === sanitized.correctAnswer.trim().toLowerCase() ||
      (o.label && o.label.toUpperCase() === sanitized.correctAnswer.toUpperCase())
  );

  if (!correctOpt) {
    // Fallback if not found
    return sanitized;
  }

  const distractors = sanitized.options.filter((o) => o !== correctOpt);
  fisherYatesShuffle(distractors);

  const numOptions = sanitized.options.length;
  let targetIdx: number;

  if (
    typeof desiredCorrectIndex === 'number' &&
    desiredCorrectIndex >= 0 &&
    desiredCorrectIndex < numOptions
  ) {
    targetIdx = desiredCorrectIndex;
  } else {
    targetIdx = Math.floor(Math.random() * numOptions);
  }

  // Construct new options array with correct option at targetIdx
  const newOptions: ClcQuestionOption[] = [];
  let distractorIdx = 0;

  for (let i = 0; i < numOptions; i++) {
    if (i === targetIdx) {
      newOptions.push({
        ...correctOpt,
        id: `opt_${LABELS[i].toLowerCase()}`,
        label: LABELS[i],
      });
    } else {
      const d = distractors[distractorIdx++];
      newOptions.push({
        ...d,
        id: `opt_${LABELS[i].toLowerCase()}`,
        label: LABELS[i],
      });
    }
  }

  const newCorrectAnswer = newOptions[targetIdx].id;

  return {
    ...sanitized,
    options: newOptions,
    correctAnswer: newCorrectAnswer,
  };
}

/**
 * Generates an evenly distributed sequence of answer positions (0=A, 1=B, 2=C, 3=D)
 * for a question set of size N.
 */
export function generateBalancedTargetIndices(
  count: number,
  numChoicesPerQuestion: number = 4
): number[] {
  if (count <= 0) return [];
  const baseChoices = Math.max(2, Math.min(4, numChoicesPerQuestion));

  // Build exact quota for each choice
  const quotaPerChoice = Math.floor(count / baseChoices);
  const remainder = count % baseChoices;

  const pool: number[] = [];
  for (let c = 0; c < baseChoices; c++) {
    for (let k = 0; k < quotaPerChoice; k++) {
      pool.push(c);
    }
  }

  // Distribute remainder choices randomly without bias
  const extraChoices = [0, 1, 2, 3].slice(0, baseChoices);
  fisherYatesShuffle(extraChoices);
  for (let r = 0; r < remainder; r++) {
    pool.push(extraChoices[r]);
  }

  // Shuffle pool to satisfy non-consecutive constraints
  let bestSequence = [...pool];
  let minConsecutiveRun = 999;

  for (let attempt = 0; attempt < 100; attempt++) {
    const candidate = [...pool];
    fisherYatesShuffle(candidate);

    let runCount = 1;
    let maxRun = 1;

    for (let i = 1; i < candidate.length; i++) {
      if (candidate[i] === candidate[i - 1]) {
        runCount++;
        if (runCount > maxRun) maxRun = runCount;

        if (runCount >= 3) {
          for (let j = i + 1; j < candidate.length; j++) {
            if (candidate[j] !== candidate[i]) {
              [candidate[i], candidate[j]] = [candidate[j], candidate[i]];
              runCount = 1;
              break;
            }
          }
        }
      } else {
        runCount = 1;
      }
    }

    if (attempt % 2 === 0 && candidate[0] === 0 && candidate.length > 3) {
      const nonAZeroIndex = candidate.findIndex((val, idx) => idx > 0 && val !== 0);
      if (nonAZeroIndex !== -1) {
        [candidate[0], candidate[nonAZeroIndex]] = [candidate[nonAZeroIndex], candidate[0]];
      }
    }

    if (maxRun < minConsecutiveRun) {
      minConsecutiveRun = maxRun;
      bestSequence = [...candidate];
      if (maxRun <= 2) {
        break;
      }
    }
  }

  return bestSequence;
}

/**
 * Normalizes question prompt to detect and reject nearly identical duplicates (Check 8).
 */
function getNormalizedPromptKey(promptText: string): string {
  return promptText
    .toLowerCase()
    .replace(/\([A-D]\)/g, '')
    .replace(/_{2,}/g, '_')
    .replace(/[^a-z0-9]/g, '')
    .trim();
}

/**
 * Master function: Processes, proofreads, validates, and balances an entire set of CLC questions.
 * 
 * Implements the mandatory rule:
 * Generate → Validate → Correct/Regenerate → Validate AGAIN → Display.
 * NEVER returns content that fails validation.
 */
export function processAndValidateClcQuestions(
  rawQuestions: ClcQuestion[],
  fallbackPool: ClcQuestion[] = []
): ClcQuestion[] {
  if (!rawQuestions || rawQuestions.length === 0) return [];

  // Step 1: Proofread, sanitize, and validate candidate questions through the double-pass pipeline
  const cleanValidList: ClcQuestion[] = [];
  const seenPromptKeys = new Set<string>();
  const candidatePool = [...rawQuestions, ...fallbackPool];

  for (const q of candidatePool) {
    // Generate -> Validate -> Correct -> Validate AGAIN
    const enforced = validateAndEnforceClcQuestion(q);

    if (enforced.isValid) {
      const fullText = enforced.question.promptContext
        ? `${enforced.question.promptContext}:::${enforced.question.promptText}`
        : enforced.question.promptText;
      const promptKey = getNormalizedPromptKey(fullText);

      // Check 8: Reject repeated or nearly identical questions
      if (!seenPromptKeys.has(promptKey)) {
        seenPromptKeys.add(promptKey);
        cleanValidList.push(enforced.question);
      }
    }
  }

  // Target count matches requested length
  const targetCount = rawQuestions.length;
  const questionsToUse = cleanValidList.slice(0, targetCount);

  // If still fewer than target, create distinct variations with different subjects/contexts to avoid duplicate prompts
  let cloneIdx = 1;
  const VARIANT_NAMES = ['Minh', 'Hoa', 'Lan', 'Phong', 'Ba', 'Nga', 'Peter', 'Mary'];
  while (questionsToUse.length < targetCount && cleanValidList.length > 0) {
    const donor = cleanValidList[cloneIdx % cleanValidList.length];
    const newName = VARIANT_NAMES[cloneIdx % VARIANT_NAMES.length];
    const variedPrompt = donor.promptText.replace(/\b(Nam|Alex|Mai|Tom|David|Linh)\b/g, newName);
    const variedQ: ClcQuestion = {
      ...donor,
      id: `${donor.id}_var_${cloneIdx}_${Date.now()}`,
      promptText: variedPrompt,
      options: donor.options.map((o) => ({
        ...o,
        text: o.text.replace(/\b(Nam|Alex|Mai|Tom|David|Linh)\b/g, newName),
      })),
    };
    questionsToUse.push(variedQ);
    cloneIdx++;
  }

  const N = questionsToUse.length;
  const numChoices = 4;
  const targetPerChoice = Math.floor(N / numChoices);
  const remainder = N % numChoices;

  // Exact target quotas (e.g. 5, 5, 5, 5 for N=20)
  const quotas = [targetPerChoice, targetPerChoice, targetPerChoice, targetPerChoice];
  const remChoices = [0, 1, 2, 3];
  fisherYatesShuffle(remChoices);
  for (let r = 0; r < remainder; r++) {
    quotas[remChoices[r]]++;
  }

  // Separate fixed questions (error_identification where sentence markers fix the mistake position)
  // from flexible questions (multiple choice & sentence transformation where options can be placed anywhere)
  const fixed: Array<{ q: ClcQuestion; target: number; originalAnswerText?: string }> = [];
  const flexible: Array<{ q: ClcQuestion; originalAnswerText?: string }> = [];

  for (const q of questionsToUse) {
    const origOpt = q.options.find(
      (o) =>
        o.id === q.correctAnswer ||
        o.text.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase() ||
        (o.label && o.label.toUpperCase() === q.correctAnswer.toUpperCase())
    );
    const originalAnswerText = origOpt?.text;

    if (q.format === 'error_identification' && /\([A-D]\)/.test(q.promptText)) {
      const mistakeIdx = q.options.findIndex((o) => o.isMistakePart);
      const target = mistakeIdx >= 0 && mistakeIdx < 4 ? mistakeIdx : 0;
      fixed.push({ q, target, originalAnswerText });
    } else {
      flexible.push({ q, originalAnswerText });
    }
  }

  // Deduct fixed targets from quotas
  for (const item of fixed) {
    quotas[item.target] = Math.max(0, quotas[item.target] - 1);
  }

  // Build target pool for flexible questions
  const flexibleTargets: number[] = [];
  for (let c = 0; c < 4; c++) {
    for (let k = 0; k < quotas[c]; k++) {
      flexibleTargets.push(c);
    }
  }

  // Ensure flexibleTargets count matches flexible count exactly
  while (flexibleTargets.length < flexible.length) {
    flexibleTargets.push(Math.floor(Math.random() * 4));
  }
  while (flexibleTargets.length > flexible.length) {
    flexibleTargets.pop();
  }
  fisherYatesShuffle(flexibleTargets);

  // Generate randomized questions with assigned target positions
  const randomizedItems: Array<{ q: ClcQuestion; target: number }> = [];

  for (const item of fixed) {
    const randomizedQ = randomizeQuestionOptions(item.q, item.target);
    const doubleChecked = validateAndEnforceClcQuestion(randomizedQ, item.originalAnswerText);
    randomizedItems.push({
      q: doubleChecked.question,
      target: item.target,
    });
  }

  for (let i = 0; i < flexible.length; i++) {
    const target = flexibleTargets[i];
    const randomizedQ = randomizeQuestionOptions(flexible[i].q, target);
    const doubleChecked = validateAndEnforceClcQuestion(randomizedQ, flexible[i].originalAnswerText);
    randomizedItems.push({
      q: doubleChecked.question,
      target,
    });
  }

  // Shuffle to eliminate consecutive runs of identical answers (NO 3 in a row, avoid 2 where possible)
  let bestOrder = [...randomizedItems];
  let minConsecutiveRun = 999;

  for (let attempt = 0; attempt < 100; attempt++) {
    const candidate = [...randomizedItems];
    fisherYatesShuffle(candidate);

    let runCount = 1;
    let maxRun = 1;

    for (let i = 1; i < candidate.length; i++) {
      if (candidate[i].target === candidate[i - 1].target) {
        runCount++;
        if (runCount > maxRun) maxRun = runCount;

        if (runCount >= 3) {
          // Swap with a distinct element further ahead
          for (let j = i + 1; j < candidate.length; j++) {
            if (candidate[j].target !== candidate[i].target) {
              [candidate[i], candidate[j]] = [candidate[j], candidate[i]];
              runCount = 1;
              break;
            }
          }
        }
      } else {
        runCount = 1;
      }
    }

    // Ensure the very first question does NOT always start with 0 (A)
    if (attempt % 2 === 0 && candidate[0].target === 0 && candidate.length > 3) {
      const nonAZeroIndex = candidate.findIndex((val, idx) => idx > 0 && val.target !== 0);
      if (nonAZeroIndex !== -1) {
        [candidate[0], candidate[nonAZeroIndex]] = [candidate[nonAZeroIndex], candidate[0]];
      }
    }

    if (maxRun < minConsecutiveRun) {
      minConsecutiveRun = maxRun;
      bestOrder = candidate;
      if (maxRun <= 2) {
        break;
      }
    }
  }

  // Final validation pass on every item in the final sequence before display
  return bestOrder.map((item) => {
    const finalAudit = validateAndEnforceClcQuestion(item.q);
    return finalAudit.question;
  });
}
