/**
 * ENGLISH GO! - Single Correct Answer Validator & Question Rewriter
 * 
 * Enforces the Golden Pedagogical Rule:
 * "Before generating or displaying any question, validate that there is EXACTLY ONE correct answer."
 * 
 * For every multiple-choice, sentence-completion, dialogue, matching, word-order,
 * picture-choice, and listening question:
 * - The correct answer must be uniquely determined by grammar, meaning, picture, or context.
 * - NEVER create two or more options that can logically or grammatically complete the question.
 * - For "What do you do in your free time?" do NOT use two valid activities such as "do karate"
 *   and "surf the internet" as options unless the context or image clearly identifies one.
 * - Distractors must be clearly incorrect because of grammar, meaning, vocabulary, picture, or context.
 * - Checks articles, prepositions, verb forms, singular/plural, word order, tense, and collocations.
 * - If more than one answer is possible, REWRITES the question/options before displaying it.
 */

import { QuizQuestion, QuestionOption } from '../types/quiz';
import {
  validateCompletedSentence,
  validateSentenceForWordOrder,
  startsWithVowelSound,
  isPluralNoun,
  isAdjective,
  isVerbOrVerbPhrase,
  isUncountableNoun,
  UNCOUNTABLE_MASS_NOUNS,
  ADJECTIVES,
  ACTION_VERBS,
  VERB_PHRASES,
} from './sentenceValidator';
import {
  resolveCanonicalKey,
  resolveKeyFromImage,
  hasExactVocabularyImage,
  getRawSvg,
} from '../data/curriculum/illustrations';
import { isValidCartoonIllustration } from '../data/questionHelpers';

// -----------------------------------------------------------------------------
// COLLOCATION & VOCABULARY KNOWLEDGE
// -----------------------------------------------------------------------------

export const COLLOCATION_MAP: Record<string, string[]> = {
  do: ['karate', 'judo', 'gymnastics', 'homework', 'chores', 'exercise', 'aerobics'],
  play: ['chess', 'football', 'badminton', 'basketball', 'volleyball', 'tennis', 'table tennis', 'the piano', 'the guitar', 'games'],
  surf: ['the internet', 'the web'],
  ride: ['a bike', 'a bicycle', 'a horse', 'my bike', 'his bike', 'her bike', 'a scooter'],
  water: ['the flowers', 'the plants', 'trees'],
  clean: ['the house', 'the room', 'the floor', 'houses', 'the classroom'],
  go: ['jogging', 'swimming', 'fishing', 'camping', 'cycling', 'shopping', 'skating', 'sailing'],
  cook: ['meals', 'dinner', 'lunch', 'breakfast'],
  wash: ['the dishes', 'your hands', 'your face', 'clothes'],
  brush: ['your teeth', 'your hair'],
  read: ['books', 'comic books', 'stories', 'a book'],
  watch: ['tv', 'television', 'cartoons', 'films'],
  listen_to: ['music', 'the teacher', 'the radio'],
};

// Distinct vocabulary clues that provide unambiguous context when needed
export const VOCAB_CONTEXT_CLUES: Record<string, string> = {
  'do karate': 'Look at the boy in the white uniform and black belt!',
  'surf the internet': 'Look at the girl using her computer and mouse!',
  'clean the house': 'The living room is messy and needs tidying up.',
  'clean houses': 'The modern robot sweeps and tidies up every room.',
  'water the flowers': 'She holds a green watering can in the garden.',
  'ride a bike': 'He is wearing a helmet and pedaling in the park.',
  'play chess': 'Two players sit opposite each other with black and white pieces.',
  'play football': 'He kicks the black-and-white ball into the goal net.',
  'play badminton': 'They hit the shuttlecock back and forth over the net.',
  'go jogging': 'He puts on his running shoes to run in the park.',
  'go swimming': 'She wears goggles and dives into the cool pool.',
  'nose': 'Touch your nose! It is used to smell sweet flowers.',
  'mouth': 'Open your mouth! It is used to speak, smile, and eat.',
  'eye': 'Look with your eye! It is used to see beautiful colors.',
  'eyes': 'Open both of your eyes to see the blackboard clearly.',
  'ear': 'Touch your ear! It is used to hear sounds and music.',
  'ears': 'Use both of your ears to listen carefully to the teacher.',
  'face': 'Wash your face with clean warm water and soap.',
  'hand': 'Raise your hand if you want to answer the question.',
  'hands': 'Wash both of your hands before eating lunch.',
  'smart': 'Linda solves all the difficult math puzzles quickly.',
  'happy': 'David is smiling cheerfully with a birthday gift.',
  'robot': 'The mechanical machine that cleans rooms and does chores.',
};

// -----------------------------------------------------------------------------
// CHECK IF AN OPTION LOGICALLY & GRAMMATICALLY FITS A PROMPT BLANK
// -----------------------------------------------------------------------------

export interface OptionFitResult {
  optionText: string;
  fitsGrammar: boolean;
  fitsCollocation: boolean;
  fitsContext: boolean;
  isGloballyValid: boolean;
  reason?: string;
}

/**
 * Tests whether a specific option candidate grammatically and logically fits a prompt.
 */
export function checkOptionFitInPrompt(
  promptText: string,
  optionCandidate: string,
  contextClue?: string
): OptionFitResult {
  const opt = (optionCandidate || '').trim();
  const lowerOpt = opt.toLowerCase();

  // 1. If no blank exists in promptText
  if (!/_{2,}|\.{3,}/.test(promptText)) {
    return {
      optionText: opt,
      fitsGrammar: true,
      fitsCollocation: true,
      fitsContext: true,
      isGloballyValid: true,
    };
  }

  // 2. Grammar check on the completed sentence
  const completed = validateCompletedSentence(promptText, opt);
  if (!completed.isValid) {
    return {
      optionText: opt,
      fitsGrammar: false,
      fitsCollocation: false,
      fitsContext: false,
      isGloballyValid: false,
      reason: completed.reason,
    };
  }

  // 3. Collocation checks
  // Check "I do ___" or "does ___"
  if (/\b(?:do|does|did)\s+_{2,}/i.test(promptText)) {
    const validDo = COLLOCATION_MAP.do || [];
    if (!validDo.some((v) => lowerOpt === v || lowerOpt.includes(v))) {
      return {
        optionText: opt,
        fitsGrammar: true,
        fitsCollocation: false,
        fitsContext: false,
        isGloballyValid: false,
        reason: `"${opt}" does not collocate with "do"`,
      };
    }
  }

  // Check "I play ___" or "plays ___"
  if (/\b(?:play|plays|played)\s+_{2,}/i.test(promptText)) {
    const validPlay = COLLOCATION_MAP.play || [];
    if (!validPlay.some((v) => lowerOpt === v || lowerOpt.includes(v))) {
      return {
        optionText: opt,
        fitsGrammar: true,
        fitsCollocation: false,
        fitsContext: false,
        isGloballyValid: false,
        reason: `"${opt}" does not collocate with "play"`,
      };
    }
  }

  // Check "I surf ___"
  if (/\b(?:surf|surfs|surfed)\s+_{2,}/i.test(promptText)) {
    const validSurf = COLLOCATION_MAP.surf || [];
    if (!validSurf.some((v) => lowerOpt === v || lowerOpt.includes(v))) {
      return {
        optionText: opt,
        fitsGrammar: true,
        fitsCollocation: false,
        fitsContext: false,
        isGloballyValid: false,
        reason: `"${opt}" does not collocate with "surf"`,
      };
    }
  }

  // Check "He goes ___" -> requires V-ing
  if (/\b(?:go|goes|went)\s+_{2,}/i.test(promptText)) {
    const validGo = COLLOCATION_MAP.go || [];
    if (!validGo.some((v) => lowerOpt === v || lowerOpt.includes(v)) && !lowerOpt.endsWith('ing')) {
      return {
        optionText: opt,
        fitsGrammar: false,
        fitsCollocation: false,
        fitsContext: false,
        isGloballyValid: false,
        reason: `"${opt}" does not fit "go/goes ___"`,
      };
    }
  }

  // 4. Semantic context clue matching (if context exists in promptText or contextClue)
  const fullContext = `${promptText} ${contextClue || ''}`.toLowerCase();

  // If prompt explicitly mentions martial arts / karate belt
  if (fullContext.includes('martial art') || fullContext.includes('karate uniform') || fullContext.includes('black belt')) {
    if (!lowerOpt.includes('karate')) {
      return {
        optionText: opt,
        fitsGrammar: true,
        fitsCollocation: true,
        fitsContext: false,
        isGloballyValid: false,
        reason: 'Context specifies martial arts / karate',
      };
    }
  }

  // If prompt explicitly mentions computer / mouse / website
  if (fullContext.includes('computer') || fullContext.includes('online') || fullContext.includes('internet')) {
    if (!lowerOpt.includes('internet') && !lowerOpt.includes('surf')) {
      return {
        optionText: opt,
        fitsGrammar: true,
        fitsCollocation: true,
        fitsContext: false,
        isGloballyValid: false,
        reason: 'Context specifies computer / internet',
      };
    }
  }

  // If prompt explicitly mentions garden / watering can
  if (fullContext.includes('watering can') || (fullContext.includes('garden') && fullContext.includes('flower'))) {
    if (!lowerOpt.includes('flower') && !lowerOpt.includes('water')) {
      return {
        optionText: opt,
        fitsGrammar: true,
        fitsCollocation: true,
        fitsContext: false,
        isGloballyValid: false,
        reason: 'Context specifies flowers / garden',
      };
    }
  }

  // If prompt explicitly mentions smelling / smell
  if (fullContext.includes('smell')) {
    if (lowerOpt !== 'nose') {
      return {
        optionText: opt,
        fitsGrammar: true,
        fitsCollocation: true,
        fitsContext: false,
        isGloballyValid: false,
        reason: 'Context specifies smelling with nose',
      };
    }
  }

  // If prompt explicitly mentions math puzzle / clever
  if (fullContext.includes('puzzle') || fullContext.includes('math problem') || fullContext.includes('100%')) {
    if (lowerOpt !== 'smart' && lowerOpt !== 'clever') {
      return {
        optionText: opt,
        fitsGrammar: true,
        fitsCollocation: true,
        fitsContext: false,
        isGloballyValid: false,
        reason: 'Context specifies math intelligence / smart',
      };
    }
  }

  // If prompt explicitly mentions smile / cheerful / birthday gift
  if (fullContext.includes('smiling') || fullContext.includes('birthday gift') || fullContext.includes('cheerfully')) {
    if (lowerOpt !== 'happy' && lowerOpt !== 'cheerful') {
      return {
        optionText: opt,
        fitsGrammar: true,
        fitsCollocation: true,
        fitsContext: false,
        isGloballyValid: false,
        reason: 'Context specifies smiling / happy',
      };
    }
  }

  return {
    optionText: opt,
    fitsGrammar: true,
    fitsCollocation: true,
    fitsContext: true,
    isGloballyValid: true,
  };
}

// -----------------------------------------------------------------------------
// GENERATE CATEGORICALLY / GRAMMATICALLY DISTINCT DISTRACTORS
// -----------------------------------------------------------------------------

/**
 * Produces 2 distractors that are GUARANTEED to be ungrammatical or impossible in the given blank.
 * Ensures the target answer is the ONLY possible correct answer.
 */
export function generateGrammaticallyUnambiguousDistractors(
  targetWord: string,
  promptTemplate: string
): string[] {
  const tw = targetWord.trim().toLowerCase();

  // Case 1: Free time activities & verb phrases (e.g. "do karate", "surf the internet", "clean the house")
  // Prompt: "— What do you do in your free time? / — I ___." or "He likes to ___."
  if (isVerbOrVerbPhrase(tw)) {
    // Generate distractors with wrong verb inflections, wrong collocations, or wrong parts of speech:
    // e.g. "doing karate" (V-ing cannot follow "I" without "am"), "surfs" (wrong agreement), "free time" (noun)
    const distractors: string[] = [];

    if (tw.startsWith('do ')) {
      // Wrong collocation: "play karate" (karate takes "do", not "play")
      distractors.push('play karate');
      distractors.push('free time');
    } else if (tw.startsWith('surf ')) {
      distractors.push('do the internet');
      distractors.push('at home');
    } else if (tw.startsWith('clean ')) {
      distractors.push('cleaning houses');
      distractors.push('very clean');
    } else if (tw.startsWith('play ')) {
      distractors.push('playing chess');
      distractors.push('yesterday');
    } else if (tw.startsWith('water ')) {
      distractors.push('watering the flowers');
      distractors.push('green garden');
    } else if (tw.startsWith('ride ')) {
      distractors.push('riding a bike');
      distractors.push('fast bicycle');
    } else {
      // General verb: add -ing form and a noun
      distractors.push(`${tw}ing`);
      distractors.push('at school');
    }

    return distractors.slice(0, 2);
  }

  // Case 2: V-ing activities following "goes" (e.g. "He goes ___.")
  if (/\b(?:go|goes)\s+_{2,}/i.test(promptTemplate)) {
    // Distractors must NOT be V-ing: use base verbs or nouns
    return ['water the flowers', 'friend'];
  }

  // Case 3: Adjectives (e.g. "Linda is very ___.")
  if (isAdjective(tw)) {
    // Distractors must NOT be adjectives: use verbs or nouns
    return ['cook meals', 'friend'];
  }

  // Case 4: Singular countable nouns after indefinite article "a" (e.g. "This is a ___.")
  if (/\b(?:a)\s+_{2,}/i.test(promptTemplate)) {
    // Distractors must NOT be consonant singular nouns!
    // Use vowel nouns ("an" required) and plural nouns (no "a"):
    return ['apple', 'books'];
  }

  // Case 5: Singular countable nouns after indefinite article "an" (e.g. "This is an ___.")
  if (/\b(?:an)\s+_{2,}/i.test(promptTemplate)) {
    // Distractors must NOT be vowel nouns! Use consonant nouns and plural nouns:
    return ['book', 'apples'];
  }

  // Case 6: Body parts / Singular nouns after "This is my ___" or "Where is the ___?"
  if (/\b(?:this\s+is\s+my|where\s+is\s+the)\s+_{2,}/i.test(promptTemplate)) {
    // Distractors must be plural nouns (cannot take singular "is"):
    return ['eyes', 'ears'];
  }

  // Case 7: Plural nouns after "These are my ___" or "Where are the ___?"
  if (/\b(?:these\s+are\s+my|where\s+are\s+the)\s+_{2,}/i.test(promptTemplate)) {
    // Distractors must be singular nouns (cannot take plural "are"):
    return ['nose', 'mouth'];
  }

  // Case 8: Uncountable mass nouns after "some" (e.g. "I would like some ___.")
  if (/\b(?:some)\s+_{2,}/i.test(promptTemplate) && isUncountableNoun(tw)) {
    // Distractors should be singular countables that need "a" (e.g. "a pencil", "a book"):
    return ['pencil', 'book'];
  }

  // Default fallback: a plural noun and an adjective
  return ['eyes', 'happy'];
}

// -----------------------------------------------------------------------------
// CORE VALIDATION: EXACTLY ONE CORRECT ANSWER CHECK
// -----------------------------------------------------------------------------

export interface SingleAnswerAuditResult {
  isValid: boolean;
  validOptionCount: number;
  validOptions: string[];
  reason?: string;
}

/**
 * Validates that a question has EXACTLY ONE correct answer.
 * Checks across multiple-choice, sentence-completion, dialogue, matching,
 * word-order, picture-choice, and listening questions.
 */
export function validateSingleCorrectAnswer(q: QuizQuestion): SingleAnswerAuditResult {
  if (!q || !q.questionType) {
    return { isValid: false, validOptionCount: 0, validOptions: [], reason: 'Question is empty or missing type' };
  }

  const targetStr = (
    Array.isArray(q.correctAnswer) ? q.correctAnswer[0] : String(q.correctAnswer || '')
  ).trim().toLowerCase();

  // 1. WORD ORDER VALIDATION
  if (q.questionType === 'word_order') {
    const targetSentence =
      q.wordOrderData?.correctSentence ||
      (Array.isArray(q.correctAnswer) ? q.correctAnswer.join(' ') : '');

    if (!targetSentence) {
      return { isValid: false, validOptionCount: 0, validOptions: [], reason: 'Missing word order target sentence' };
    }

    const val = validateSentenceForWordOrder(targetSentence);
    if (!val.isValid) {
      return { isValid: false, validOptionCount: 0, validOptions: [], reason: val.reason };
    }

    return { isValid: true, validOptionCount: 1, validOptions: [targetSentence] };
  }

  // 2. MATCHING PAIRS VALIDATION
  if (q.questionType === 'matching_pairs') {
    if (!q.matchingData || !q.matchingData.leftItems || !q.matchingData.rightItems) {
      return { isValid: false, validOptionCount: 0, validOptions: [], reason: 'Missing matching items' };
    }

    // Must be exact 1-to-1 bijection
    if (q.matchingData.leftItems.length !== q.matchingData.rightItems.length) {
      return { isValid: false, validOptionCount: 0, validOptions: [], reason: 'Matching pair lengths do not match' };
    }

    // Check unique right IDs and unique left IDs
    const leftIds = q.matchingData.leftItems.map((l) => l.id);
    const rightIds = q.matchingData.rightItems.map((r) => r.id);
    if (new Set(leftIds).size !== leftIds.length || new Set(rightIds).size !== rightIds.length) {
      return { isValid: false, validOptionCount: 0, validOptions: [], reason: 'Duplicate left or right IDs in matching' };
    }

    return { isValid: true, validOptionCount: 1, validOptions: ['1-to-1 bijection'] };
  }

  // 3. PICTURE CHOICE (image_choice)
  if (q.questionType === 'image_choice') {
    if (!q.options || q.options.length < 2) {
      return { isValid: false, validOptionCount: 0, validOptions: [], reason: 'Fewer than 2 image options' };
    }

    // Exactly one option image must match target
    const targetKey = resolveCanonicalKey(targetStr);
    const matchingOptions: QuestionOption[] = [];

    for (const opt of q.options) {
      if (!opt.image || !isValidCartoonIllustration(opt.image)) {
        return { isValid: false, validOptionCount: 0, validOptions: [], reason: 'Option missing valid image' };
      }
      const optKey = resolveKeyFromImage(opt.image);
      if (targetKey && optKey && targetKey === optKey) {
        matchingOptions.push(opt);
      } else if (opt.id.toLowerCase() === targetStr) {
        matchingOptions.push(opt);
      }
    }

    if (matchingOptions.length === 1) {
      return { isValid: true, validOptionCount: 1, validOptions: [matchingOptions[0].text || matchingOptions[0].id] };
    }

    return {
      isValid: false,
      validOptionCount: matchingOptions.length,
      validOptions: matchingOptions.map((o) => o.text || o.id),
      reason: `Expected 1 matching image option, found ${matchingOptions.length}`,
    };
  }

  // 4. LISTENING QUESTIONS
  if (q.questionType === 'listen_and_choose') {
    if (!q.options || q.options.length < 2) {
      return { isValid: false, validOptionCount: 0, validOptions: [], reason: 'Fewer than 2 listening options' };
    }

    // Check if prompt has audio comprehension
    if (q.audioText) {
      const cleanAud = q.audioText.toLowerCase().replace(/[.,!?'"]/g, '').trim();

      // Check if audio explicitly specifies only the target
      // (Distractor options must NOT be mentioned in audio text)
      for (const opt of q.options) {
        const optText = (opt.text || opt.id).toLowerCase().replace(/[.,!?'"]/g, '').trim();
        if (opt.id.toLowerCase() !== targetStr && cleanAud.includes(optText) && optText.length > 2) {
          // Distractor is also mentioned in the audio!
          return {
            isValid: false,
            validOptionCount: 2,
            validOptions: [targetStr, optText],
            reason: `Distractor "${optText}" is also mentioned in the audioText: "${q.audioText}"`,
          };
        }
      }
    }

    return { isValid: true, validOptionCount: 1, validOptions: [targetStr] };
  }

  // 5. TRUE / FALSE QUESTIONS
  if (q.questionType === 'true_false') {
    if (targetStr !== 'true' && targetStr !== 'false') {
      return { isValid: false, validOptionCount: 0, validOptions: [], reason: 'Invalid true/false answer' };
    }
    return { isValid: true, validOptionCount: 1, validOptions: [targetStr] };
  }

  // 6. MULTIPLE CHOICE / LOOK AND CHOOSE / DIALOGUE / SENTENCE COMPLETION
  if (q.options && q.options.length >= 2) {
    // Factor A: PICTURE DISAMBIGUATION
    // If promptImage is present and valid, and depicts the target word:
    if (q.promptImage && isValidCartoonIllustration(q.promptImage)) {
      const imgKey = resolveKeyFromImage(q.promptImage);
      const targetKey = resolveCanonicalKey(targetStr);
      if (imgKey && targetKey && imgKey === targetKey) {
        // Image depicts target word! Ensure instruction guides student to the picture
        return { isValid: true, validOptionCount: 1, validOptions: [targetStr] };
      }
    }

    // Factor B: TEXT / GRAMMAR / CONTEXT DISAMBIGUATION
    if (q.promptText && /_{2,}|\.{3,}/.test(q.promptText)) {
      const validOptions: string[] = [];

      for (const opt of q.options) {
        const optWord = (opt.text || opt.id).trim();
        const check = checkOptionFitInPrompt(q.promptText, optWord, q.instruction);
        if (check.isGloballyValid) {
          validOptions.push(optWord);
        }
      }

      if (validOptions.length === 1) {
        return { isValid: true, validOptionCount: 1, validOptions };
      }

      if (validOptions.length > 1) {
        return {
          isValid: false,
          validOptionCount: validOptions.length,
          validOptions,
          reason: `Multiple options (${validOptions.join(', ')}) logically/grammatically complete: "${q.promptText}"`,
        };
      }

      // If validOptions.length === 0, even the target failed
      return {
        isValid: false,
        validOptionCount: 0,
        validOptions: [],
        reason: `Target answer "${targetStr}" does not grammatically complete: "${q.promptText}"`,
      };
    }
  }

  // Fallback: verify target matches exactly one option
  const matches = (q.options || []).filter(
    (o) => o.id.toLowerCase() === targetStr || (o.text && o.text.trim().toLowerCase() === targetStr)
  );
  if (matches.length === 1) {
    return { isValid: true, validOptionCount: 1, validOptions: [targetStr] };
  }

  return {
    isValid: false,
    validOptionCount: matches.length,
    validOptions: matches.map((m) => m.text || m.id),
    reason: `Target answer matched ${matches.length} options`,
  };
}

// -----------------------------------------------------------------------------
// QUESTION & OPTIONS REWRITER (Ensures EXACTLY ONE Correct Answer)
// -----------------------------------------------------------------------------

/**
 * Rewrites a question and its options before displaying it, guaranteeing
 * that there is EXACTLY ONE correct answer uniquely determined by grammar, picture, or context.
 */
export function rewriteQuestionForUnambiguity(q: QuizQuestion): QuizQuestion {
  if (!q) return q;

  const targetStr = (
    Array.isArray(q.correctAnswer) ? q.correctAnswer[0] : String(q.correctAnswer || '')
  ).trim();
  const lowerTarget = targetStr.toLowerCase();

  // 1. If question has a blank and NO promptImage:
  if (
    q.questionType === 'look_and_choose' &&
    q.promptText &&
    /_{2,}|\.{3,}/.test(q.promptText)
  ) {
    // Strategy A: Check if we can attach an exact cartoon illustration
    if (!q.promptImage && hasExactVocabularyImage(lowerTarget)) {
      const rawSvg = getRawSvg(lowerTarget);
      if (rawSvg) {
        q.promptImage = `data:image/svg+xml;utf8,${encodeURIComponent(rawSvg)}`;
        if (!q.instruction || !q.instruction.includes('picture')) {
          q.instruction = 'Look at the picture and choose the best word to complete the sentence:';
        }
      }
    }

    // Strategy B: Check if prompt needs a clarifying context clue
    if (VOCAB_CONTEXT_CLUES[lowerTarget]) {
      const clue = VOCAB_CONTEXT_CLUES[lowerTarget];
      if (!q.promptText.includes(clue)) {
        if (q.promptText.includes('\n')) {
          // Dialogue: add clue in speaker A's line or before
          const lines = q.promptText.split('\n');
          if (lines.length >= 2 && !lines[0].includes('(')) {
            lines[0] = `${lines[0]} (${clue})`;
            q.promptText = lines.join('\n');
          }
        } else if (!q.promptText.includes('(')) {
          q.promptText = `${clue} ${q.promptText}`;
        }
      }
    }

    // Strategy C: Rewrite the distractors so they are CLEARLY INCORRECT through grammar/collocation
    const check = validateSingleCorrectAnswer(q);
    if (!check.isValid && check.validOptionCount > 1) {
      // Multiple options valid! Replace ambiguous distractors with unambiguously incorrect options
      const unambiguousDistractors = generateGrammaticallyUnambiguousDistractors(
        lowerTarget,
        q.promptText
      );

      const newOptions: QuestionOption[] = [
        { id: lowerTarget, text: targetStr },
        { id: unambiguousDistractors[0].toLowerCase(), text: unambiguousDistractors[0] },
        { id: unambiguousDistractors[1].toLowerCase(), text: unambiguousDistractors[1] },
      ];

      // Shuffle options while preserving ids and texts
      q.options = newOptions.sort(() => Math.random() - 0.5);
    }
  }

  // 2. Word order feedback alignment
  if (q.questionType === 'word_order') {
    const targetSentence =
      q.wordOrderData?.correctSentence ||
      (Array.isArray(q.correctAnswer) ? q.correctAnswer.join(' ') : '');
    if (targetSentence && (!q.explanation || !q.explanation.includes(targetSentence))) {
      q.explanation = `Super! The sentence is "${targetSentence}".`;
    }
  }

  return q;
}

/**
 * Validates and sanitizes a question before returning or displaying it.
 * If ambiguous, rewrites question and options to guarantee exactly one correct answer.
 */
export function enforceSingleCorrectAnswer(q: QuizQuestion): { question: QuizQuestion; isValid: boolean } {
  // First rewrite in-place if needed
  const rewritten = rewriteQuestionForUnambiguity(q);

  // Validate that it now has EXACTLY ONE correct answer
  const audit = validateSingleCorrectAnswer(rewritten);

  return {
    question: rewritten,
    isValid: audit.isValid,
  };
}
