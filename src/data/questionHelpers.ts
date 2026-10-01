import { GlobalSuccessId, DifficultyLevelId } from '../types/curriculum';
import { QuizQuestion, QuestionType } from '../types/quiz';
import { SkillName } from '../types/content';
import {
  validateSentenceForWordOrder,
  validateSentenceGrammar,
  validateCompletedSentence,
} from '../utils/sentenceValidator';
import {
  enforceSingleCorrectAnswer,
  validateSingleCorrectAnswer,
} from '../utils/singleAnswerValidator';
import {
  validateQuestionStrictGrammarAndMeaning,
  auditAndRegenerateQuestion,
} from '../utils/questionValidator';
import {
  resolveCanonicalKey,
  resolveKeyFromImage,
  validateTargetMatchesImage,
} from './curriculum/illustrations';

/**
 * Creates and strictly verifies a Missing Letter question.
 * The correct answer is ALWAYS derived directly from the original target word.
 * Guarantees displayed word + correct missing letter = original target word.
 * If a valid image is provided, prompts the child to look at the picture.
 * If no valid image is available, prompts to complete the word without an empty image area.
 */
export function createVerifiedMissingLetterQuestion(params: {
  id: string;
  bookId: GlobalSuccessId;
  grade: number;
  unitId: string;
  lessonId: string;
  difficulty: DifficultyLevelId;
  targetWord: string;
  missingIndex: number;
  promptImage?: string;
  distractors: string[];
}): QuizQuestion {
  const {
    id,
    bookId,
    grade,
    unitId,
    lessonId,
    difficulty,
    targetWord,
    missingIndex,
    promptImage,
    distractors,
  } = params;

  // 1. Calculate correct answer from the ORIGINAL target word
  const originalLetter = targetWord[missingIndex];
  const correctLetter = originalLetter.toLowerCase();

  // 2. Build displayPattern: replace exactly ONE letter with '_'
  const chars = targetWord.split('');
  const displayArray = chars.map((c, i) => (i === missingIndex ? '_' : c.toLowerCase()));
  const displayPattern = displayArray.join(' '); // e.g. "b _ k e"

  // 3. Verification: verify displayed word + correct missing letter = original target word
  const reconstructed = displayArray.map((c) => (c === '_' ? correctLetter : c)).join('');
  if (reconstructed.toLowerCase() !== targetWord.toLowerCase()) {
    throw new Error(`Integrity check failed: ${reconstructed} !== ${targetWord}`);
  }

  // 4. Options: exactly one correct option + distractors (pure letters, NO "opt_" prefix)
  const optionLetters = Array.from(
    new Set([correctLetter, ...distractors.map((d) => d.toLowerCase())])
  );

  const options = optionLetters.map((l) => ({
    id: l,
    text: l,
  }));

  const hasValidImg = !!(promptImage && isValidCartoonIllustration(promptImage));
  const instruction = hasValidImg
    ? 'Look at the picture and choose the missing letter.'
    : 'Choose the missing letter to complete the word:';

  return {
    id,
    bookId,
    grade,
    unitId,
    lessonId,
    difficulty,
    questionType: 'missing_letter',
    skill: 'WRITING' as SkillName,
    instruction,
    promptImage: hasValidImg ? promptImage : undefined,
    promptText: displayPattern,
    correctAnswer: correctLetter,
    explanation: `Super! The word is "${targetWord}". The missing letter is "${correctLetter}".`,
    options,
    missingLetterData: {
      displayPattern,
      missingLetter: correctLetter,
      fullWord: targetWord,
    },
  };
}

/**
 * Returns a strict unique signature for duplicate prevention in a session.
 * Enforces:
 * - NEVER repeat target word + same task (e.g. "bike_missing_letter", "ball_image_choice")
 * - NEVER repeat target sentence + same task (e.g. "this is a book._word_order")
 * - Allows different questions with the same grammar structure:
 *   "This is a book." vs "This is a ball." -> ALLOWED
 *   "Hi, I'm Bill." vs "Hi, I'm Ben." -> ALLOWED
 */
export function getQuestionSignature(q: QuizQuestion): string {
  if (q.questionType === 'missing_letter') {
    const word = q.missingLetterData?.fullWord || q.promptText || q.id;
    return `${word.trim().toLowerCase()}_missing_letter`;
  }
  if (q.questionType === 'word_order') {
    const sentence = (q.wordOrderData?.correctSentence || q.promptText || q.id)
      .toLowerCase()
      .replace(/[.,!?'"]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    return `${sentence}_word_order`;
  }
  if (q.questionType === 'speaking') {
    const phrase = q.speakingData?.targetPhrase || q.audioText || q.promptText || q.id;
    return `${phrase.trim().toLowerCase()}_speaking`;
  }
  if (q.questionType === 'matching_pairs') {
    const lefts = q.matchingData?.leftItems.map((l) => l.text.trim().toLowerCase()).sort().join('_') || q.id;
    return `matching_${lefts}`;
  }
  if (q.questionType === 'type_word') {
    const ans = typeof q.correctAnswer === 'string' ? q.correctAnswer : q.id;
    return `${ans.trim().toLowerCase()}_type_word`;
  }
  if (q.questionType === 'image_choice') {
    const ans = typeof q.correctAnswer === 'string' ? q.correctAnswer : q.id;
    return `${ans.trim().toLowerCase()}_image_choice`;
  }
  if (q.questionType === 'true_false') {
    const prompt = (q.promptText || q.instruction).toLowerCase().replace(/[.,!?'"]/g, '').trim();
    return `${prompt}_true_false`;
  }
  if (q.questionType === 'look_and_choose') {
    // If there is an image prompt, the image + answer defines the signature
    const prompt = q.promptText || (typeof q.correctAnswer === 'string' ? q.correctAnswer : q.id);
    return `${prompt.trim().toLowerCase()}_look_and_choose`;
  }
  if (q.questionType === 'listen_and_choose') {
    const audio = q.audioText || (typeof q.correctAnswer === 'string' ? q.correctAnswer : q.id);
    return `${audio.trim().toLowerCase()}_listen_and_choose`;
  }
  return `${q.id}_${q.questionType}`;
}

/**
 * Extracts the primary target word or concept for frequency capping & near-duplicate checks.
 */
export function extractPrimaryTargetConcept(q: QuizQuestion): string {
  if (q.missingLetterData?.fullWord) {
    return q.missingLetterData.fullWord.trim().toLowerCase();
  }
  if (typeof q.correctAnswer === 'string') {
    const ans = q.correctAnswer.trim().toLowerCase();
    if (ans.length > 0 && ans !== 'true' && ans !== 'false') {
      return ans;
    }
  }
  if (Array.isArray(q.correctAnswer)) {
    return q.correctAnswer.join(' ').toLowerCase().replace(/[.,!?'"]/g, '').trim();
  }
  if (q.promptText) {
    return q.promptText.trim().toLowerCase();
  }
  return q.id.toLowerCase();
}

/**
 * Normalizes options into a sorted canonical key (e.g. "ball|bike|book")
 * to ensure that identical sets of answer choices are not shown repeatedly.
 */
export function getNormalizedOptionsSignature(q: QuizQuestion): string {
  if (!q.options || q.options.length < 2) return '';
  return q.options
    .map((o) => (o.text || o.id).trim().toLowerCase())
    .sort()
    .join('|');
}

/**
 * Checks whether two sentences are identical or differ by only a single word.
 * Examples:
 * "I have a book" vs "I have a ball" -> true (1 word changed)
 * "This is a bike" vs "This is a bag" -> true (1 word changed)
 * "Where is the book" vs "Where is the ball" -> true (1 word changed)
 */
export function isSentenceOneWordApart(s1: string, s2: string): boolean {
  if (!s1 || !s2) return false;
  const t1 = s1.toLowerCase().replace(/[.,!?'"–—-]/g, '').trim().split(/\s+/).filter(Boolean);
  const t2 = s2.toLowerCase().replace(/[.,!?'"–—-]/g, '').trim().split(/\s+/).filter(Boolean);

  if (t1.length < 3 || t2.length < 3) return false;

  // Exact identical sentences
  if (t1.join(' ') === t2.join(' ')) return true;

  // Same length, 1 word different
  if (t1.length === t2.length) {
    let diff = 0;
    for (let i = 0; i < t1.length; i++) {
      if (t1[i] !== t2[i]) {
        diff++;
        if (diff > 1) return false;
      }
    }
    return diff === 1;
  }

  // Length difference of 1 (1 word inserted/deleted)
  if (Math.abs(t1.length - t2.length) === 1) {
    const longer = t1.length > t2.length ? t1 : t2;
    const shorter = t1.length > t2.length ? t2 : t1;
    let i = 0, j = 0, diff = 0;
    while (i < longer.length && j < shorter.length) {
      if (longer[i] === shorter[j]) {
        i++;
        j++;
      } else {
        diff++;
        i++;
        if (diff > 1) return false;
      }
    }
    return diff <= 1;
  }

  return false;
}

/**
 * Extracts the primary sentence from a question for semantic and structure checks.
 */
export function extractMainSentenceFromQuestion(q: QuizQuestion): string {
  if (q.questionType === 'word_order') {
    return q.wordOrderData?.correctSentence || (Array.isArray(q.correctAnswer) ? q.correctAnswer.join(' ') : '');
  }
  if (q.questionType === 'speaking') {
    return q.speakingData?.targetPhrase || q.audioText || '';
  }
  if (q.questionType === 'listen_and_choose' && q.audioText && q.audioText.includes(' ')) {
    return q.audioText;
  }
  if (q.questionType === 'true_false' && q.promptText) {
    return q.promptText;
  }
  if (q.promptText && /_{2,}|\.{3,}/.test(q.promptText)) {
    const ans = Array.isArray(q.correctAnswer) ? q.correctAnswer[0] : String(q.correctAnswer || '');
    return q.promptText.replace(/_{2,}|\.{3,}/g, ans);
  }
  return '';
}

export interface DuplicateCheckResult {
  isDuplicate: boolean;
  reason?: string;
}

/**
 * Compares candidate question against all accepted questions in the current practice package.
 * Strictly rejects:
 * 1. Exact duplicate signatures.
 * 2. Near-duplicate tasks on the same target word (e.g., two look_and_choose for "ball").
 * 3. Near-duplicate sentences differing by only one word.
 * 4. Repeating the exact same prompt picture too frequently (max 1 in packages <= 25; max 2 across different types for 30/40).
 * 5. Reusing the exact same set of option choices across multiple questions.
 * 6. Over-concentrating on any single target word beyond the package frequency limit.
 * 7. Over-repeating same sentence pattern (e.g. "This is a [item]" max 3 times with different items).
 */
export function isNearDuplicateQuestion(
  candidate: QuizQuestion,
  existingQuestions: QuizQuestion[],
  targetPackageCount: number
): DuplicateCheckResult {
  const candidateSig = getQuestionSignature(candidate);
  const candidateTarget = extractPrimaryTargetConcept(candidate);
  const candidateOptKey = getNormalizedOptionsSignature(candidate);
  const candidatePrompt = (candidate.promptText || '').toLowerCase().replace(/[.,!?'"]/g, '').trim();
  const candidateSentence = extractMainSentenceFromQuestion(candidate);

  // Target word frequency limits based on package size
  let maxTargetFreq = 2;
  if (targetPackageCount >= 40) maxTargetFreq = 9;
  else if (targetPackageCount >= 30) maxTargetFreq = 7;
  else if (targetPackageCount >= 20) maxTargetFreq = 4;

  let targetCount = 0;
  let samePatternCount = 0;

  for (const existing of existingQuestions) {
    const existingSig = getQuestionSignature(existing);
    if (candidateSig === existingSig) {
      return { isDuplicate: true, reason: `Exact signature match: ${candidateSig}` };
    }

    const existingTarget = extractPrimaryTargetConcept(existing);
    if (candidateTarget === existingTarget) {
      targetCount++;
      // Same question type on the same target concept
      if (candidate.questionType === existing.questionType) {
        // Distinguish picture look_and_choose (image prompt) from text reading comprehension (no image prompt)
        const candHasImg = !!candidate.promptImage;
        const existHasImg = !!existing.promptImage;
        if (candHasImg === existHasImg) {
          return {
            isDuplicate: true,
            reason: `Same question type (${candidate.questionType}) for target "${candidateTarget}"`,
          };
        }
      }
    }

    // Strictly enforce: Never repeat the same sentence with only one word changed
    const existingSentence = extractMainSentenceFromQuestion(existing);
    if (candidateSentence && existingSentence) {
      if (isSentenceOneWordApart(candidateSentence, existingSentence)) {
        return {
          isDuplicate: true,
          reason: `Sentence differs by only one word from existing question: "${candidateSentence}" vs "${existingSentence}"`,
        };
      }
    }

    // Word order sentence duplicate check
    if (candidate.questionType === 'word_order' && existing.questionType === 'word_order') {
      const candSentence = (
        candidate.wordOrderData?.correctSentence || (Array.isArray(candidate.correctAnswer) ? candidate.correctAnswer.join(' ') : '')
      ).toLowerCase().replace(/[.,!?'"]/g, '').trim();

      const existSentence = (
        existing.wordOrderData?.correctSentence || (Array.isArray(existing.correctAnswer) ? existing.correctAnswer.join(' ') : '')
      ).toLowerCase().replace(/[.,!?'"]/g, '').trim();

      if (candSentence === existSentence) {
        return { isDuplicate: true, reason: `Identical word-order sentence: "${candSentence}"` };
      }

      // Check pattern repetition (e.g. "this is a ...")
      if (candSentence.startsWith('this is a ') && existSentence.startsWith('this is a ')) {
        samePatternCount++;
      }
      if (candSentence.startsWith("hi i'm ") && existSentence.startsWith("hi i'm ")) {
        samePatternCount++;
      }
    }

    // True/False duplicate check
    if (candidate.questionType === 'true_false' && existing.questionType === 'true_false') {
      if (candidatePrompt && candidatePrompt === (existing.promptText || '').toLowerCase().replace(/[.,!?'"]/g, '').trim()) {
        return { isDuplicate: true, reason: `Duplicate true/false statement: "${candidatePrompt}"` };
      }
    }

    // Identical prompt text & identical correct answer check
    if (
      candidatePrompt &&
      candidatePrompt.length > 5 &&
      candidatePrompt === (existing.promptText || '').toLowerCase().replace(/[.,!?'"]/g, '').trim() &&
      String(candidate.correctAnswer).toLowerCase() === String(existing.correctAnswer).toLowerCase()
    ) {
      return { isDuplicate: true, reason: `Identical prompt and answer: "${candidatePrompt}"` };
    }

    // Reusing the exact same prompt picture
    if (candidate.promptImage && existing.promptImage && candidate.promptImage === existing.promptImage) {
      if (targetPackageCount <= 25) {
        return { isDuplicate: true, reason: 'Duplicate prompt image in package <= 25' };
      }
      // In 30/40 packages, max 2 occurrences and MUST be different question types
      if (candidate.questionType === existing.questionType) {
        return { isDuplicate: true, reason: `Same prompt image for same question type (${candidate.questionType})` };
      }
    }

    // Identical options set with same answer or same question type
    if (
      candidateOptKey &&
      candidateOptKey.length > 3 &&
      candidateOptKey === getNormalizedOptionsSignature(existing)
    ) {
      if (
        candidate.questionType === existing.questionType ||
        String(candidate.correctAnswer).toLowerCase() === String(existing.correctAnswer).toLowerCase()
      ) {
        return { isDuplicate: true, reason: `Identical options set for same type or answer: ${candidateOptKey}` };
      }
    }
  }

  // Target word over-concentration check
  if (targetCount >= maxTargetFreq) {
    return {
      isDuplicate: true,
      reason: `Target "${candidateTarget}" reached max frequency limit (${maxTargetFreq}) for package size ${targetPackageCount}`,
    };
  }

  // Sentence pattern repetition limit (max 4 of the same template in a 40 package, max 3 in smaller packages)
  const maxPatternCount = targetPackageCount >= 40 ? 4 : 3;
  if (samePatternCount >= maxPatternCount) {
    return {
      isDuplicate: true,
      reason: `Sentence pattern template reached limit (max ${maxPatternCount})`,
    };
  }

  return { isDuplicate: false };
}

/**
 * Strict internal verification before displaying ANY question:
 * ✓ question matches current Unit
 * ✓ grammar is correct
 * ✓ vocabulary is appropriate
 * ✓ target word is valid
 * ✓ picture matches target word
 * ✓ exactly one blank exists (for missing_letter)
 * ✓ correct letter comes from the target word
 * ✓ correct option is included
 * ✓ distractors are different from correct answer
 * ✓ no technical placeholder text is visible
 * ✓ question has not already appeared in this session
 */
/**
 * Validates that an image is visible, colorful, and a real cartoon illustration
 * (never blank, abstract circle, or placeholder).
 */
export function isValidCartoonIllustration(img?: string): boolean {
  if (!img || typeof img !== 'string') return false;
  const s = img.trim();
  if (s.length < 15) return false;
  // Reject abstract shapes, circles, or placeholder artifacts
  if (s.includes('hsl(') || s.includes('cx="50" cy="50" r="32" fill="hsl')) return false;
  if (/placeholder|abstract|blank/i.test(s)) return false;
  // Must be a data-URI SVG, raw SVG markup, or valid image path
  const isSvg = s.startsWith('data:image/svg+xml') || s.startsWith('<svg');
  const isPath = s.startsWith('/') || s.startsWith('http');
  return isSvg || isPath;
}

/**
 * Validates a generated question before displaying to the student:
 * 1. Image quality & visibility (clear, child-friendly, not blank/circle/placeholder).
 * 2. Exactly one correct answer exists for multiple choice and matching questions.
 * 3. Grammatically correct structures for "party" and proper articles for singular countables.
 * 4. General spelling, grammar, and naturalness.
 * Returns false if ANY check fails, prompting the generator to discard and regenerate.
 */
export function validateQuestionBeforeDisplay(
  q: QuizQuestion,
  sessionSignatures?: Set<string>
): boolean {
  if (!q || !q.id || !q.questionType) return false;

  // 1. Check duplicate signature in session
  const signature = getQuestionSignature(q);
  if (sessionSignatures && sessionSignatures.has(signature)) {
    return false;
  }

  // 2. Check for technical placeholder text, unreplaced template brackets, or AI technical phrases
  const technicalRegex = /opt_|option|correctAnswer|undefined|null|\[object|placeholder/i;
  if (technicalRegex.test(q.instruction)) return false;
  if (q.promptText && technicalRegex.test(q.promptText)) return false;
  if (q.explanation && technicalRegex.test(q.explanation)) return false;
  if (q.options?.some((o) => technicalRegex.test(o.text || '') || technicalRegex.test(o.id))) {
    return false;
  }

  // Check for unreplaced template placeholders like [Name], [food], [object]
  const fullText = [
    q.instruction,
    q.promptText || '',
    q.explanation || '',
    typeof q.correctAnswer === 'string' ? q.correctAnswer : '',
    ...(q.options || []).map((o) => o.text || ''),
  ].join(' ');
  if (/\[(?:Name|food|item|singular|plural|action|toy|stationery|V-ing|facility|body|room)\]/i.test(fullText)) {
    return false;
  }

  // Strict check to remove unnecessary AI text (e.g. "Automated by AI", "Generated by AI")
  const aiRegex = /\b(?:automated by ai|generated by ai|artificial intelligence|machine learning|\bai\b|llm|chatgpt|openai|gemini)\b/i;
  if (aiRegex.test(fullText)) {
    return false;
  }

  // 3. Strict "party" grammar & usage check across all text fields
  if (/\bpart(?:y|ies)\b/i.test(fullText)) {
    // "Pass me the party, please." -> strictly forbidden
    if (/Pass me the\s+party\b/i.test(fullText)) return false;
    // "I'm having party." -> strictly forbidden (must have "a")
    if (/\bhaving\s+party\b/i.test(fullText)) return false;
    // "This is party" -> strictly forbidden (must have "a")
    if (/\b(?:this|that|it)\s+is\s+party\b/i.test(fullText)) return false;
    // "I like party" / "Do you like party?" -> must use plural "parties"
    if (/\bI\s+like\s+party\b/i.test(fullText)) return false;
    if (/\bdo\s+you\s+like\s+party\b/i.test(fullText)) return false;
    // Bare "at party", "to party" without article
    if (/\b(?:at|to|for|join)\s+party\b/i.test(fullText)) return false;
  }

  // 4. STRICT ENGLISH GRAMMAR VALIDATION FOR COMPLETE SENTENCES
  // Run comprehensive Grammar & Meaning Validation (All 10 Golden Rules)
  const strictCheck = validateQuestionStrictGrammarAndMeaning(q);
  if (!strictCheck.isValid) {
    return false; // Question failed strict grammar & meaning check (e.g. phrasal verb treated as noun, article mismatch)
  }

  // (a) For questions with blanks (e.g. "I have a ___." or "This is a ___."):
  // Complete the sentence with the intended correct answer and verify full grammatical validity.
  if (q.promptText && /_{2,}|\.{3,}/.test(q.promptText)) {
    const targetWord = Array.isArray(q.correctAnswer) ? q.correctAnswer[0] : String(q.correctAnswer || '');
    const sentenceCheck = validateCompletedSentence(q.promptText, targetWord);
    if (!sentenceCheck.isValid) {
      return false; // Completed sentence is grammatically invalid! (e.g. "I have a solar panels." or "I have a smart.")
    }
  }

  // (b) EXACTLY ONE CORRECT ANSWER MANDATORY VALIDATION & AUTO-REWRITING
  // The correct answer must be uniquely determined by grammar, meaning, picture or context.
  // NEVER allow two or more options that can logically or grammatically complete the question.
  // If more than one answer is possible, automatically rewrites question/options before displaying.
  const singleCheck = enforceSingleCorrectAnswer(q);
  if (!singleCheck.isValid) {
    return false; // Ambiguous: multiple options can logically or grammatically complete the question!
  }

  // (b) Word order sentence validation:
  if (q.questionType === 'word_order') {
    const rawSentence = q.wordOrderData?.correctSentence || (Array.isArray(q.correctAnswer) ? q.correctAnswer.join(' ') : '');
    const woCheck = validateSentenceGrammar(rawSentence);
    if (!woCheck.isValid) return false;
  }

  // (c) Audio sentence validation and transcript consistency:
  if (q.audioText) {
    const audioCheck = validateSentenceGrammar(q.audioText);
    if (!audioCheck.isValid) return false;
    if (q.questionType === 'listen_and_choose') {
      const ans = String(q.correctAnswer || '').toLowerCase().trim();
      const aud = q.audioText.toLowerCase().trim();
      const cleanAns = ans.replace(/[.,!?'"]/g, '').trim();
      const cleanAud = aud.replace(/[.,!?'"]/g, '').trim();
      if (cleanAns !== cleanAud && !cleanAud.includes(cleanAns) && !cleanAns.includes(cleanAud)) {
        return false;
      }
      // For sentence listening, audio sentence and transcript/correct answer MUST be exactly identical
      if (cleanAud.includes(' ') && (q.promptText?.toLowerCase().includes('which sentence') || q.instruction.toLowerCase().includes('what you hear'))) {
        if (cleanAns !== cleanAud) return false;
      }
    }
  }

  // (d) True/False prompt sentence validation:
  if (q.questionType === 'true_false' && q.promptText) {
    const tfCheck = validateSentenceGrammar(q.promptText);
    if (!tfCheck.isValid) return false;
  }

  // 4. IMAGE QUALITY, ACCURACY & VISIBILITY CHECK
  // (a) Instruction vs Image presence check:
  // If instruction mentions "picture", "image", "illustration", or "photo", a real visible image MUST exist.
  const mentionsPicture = /\b(?:picture|image|illustration|photo)\b/i.test(q.instruction);
  const hasPromptImg = !!(q.promptImage && isValidCartoonIllustration(q.promptImage));
  const hasOptionImgs = !!(
    q.options &&
    q.options.length >= 2 &&
    q.options.every((o) => o.image && isValidCartoonIllustration(o.image))
  );
  const hasMatchingImgs = !!(
    q.matchingData?.rightItems &&
    q.matchingData.rightItems.length >= 2 &&
    q.matchingData.rightItems.every((r) => r.image && isValidCartoonIllustration(r.image))
  );
  const hasAnyValidImage = hasPromptImg || hasOptionImgs || hasMatchingImgs;

  if (mentionsPicture && !hasAnyValidImage) {
    return false; // Question asks student to look at picture/image, but no image is present!
  }

  // (b) Never leave an empty, blank, or placeholder promptImage
  if (q.promptImage !== undefined && !isValidCartoonIllustration(q.promptImage)) {
    return false;
  }

  // (c) Semantic Target = Image Meaning validation
  if (q.questionType === 'missing_letter') {
    if (q.promptImage) {
      if (!isValidCartoonIllustration(q.promptImage)) return false;
      const targetWord = (q.missingLetterData?.fullWord || '').trim().toLowerCase();
      const targetKey = resolveCanonicalKey(targetWord);
      const imgKey = resolveKeyFromImage(q.promptImage);
      if (targetKey && imgKey && targetKey !== imgKey) {
        return false; // Picture does not match the target word!
      }
    }
  }

  if (q.questionType === 'look_and_choose' && q.promptImage) {
    if (!isValidCartoonIllustration(q.promptImage)) return false;
    const targetWord = String(q.correctAnswer || '').trim().toLowerCase();
    const targetKey = resolveCanonicalKey(targetWord);
    const imgKey = resolveKeyFromImage(q.promptImage);
    if (targetKey && imgKey && targetKey !== imgKey) {
      return false; // TARGET = IMAGE MEANING mismatch!
    }
  }

  if (q.questionType === 'image_choice') {
    if (!q.options || q.options.length < 2) return false;
    if (q.options.some((o) => !isValidCartoonIllustration(o.image))) return false;

    // All options in image_choice must have distinct images (no duplicate pictures)
    const optImages = q.options.map((o) => o.image || '');
    if (new Set(optImages).size !== optImages.length) return false;

    // Correct option's image MUST match the target word
    const targetWord = String(q.correctAnswer || '').trim().toLowerCase();
    const targetKey = resolveCanonicalKey(targetWord);
    const correctOpt = q.options.find(
      (o) => o.id.toLowerCase() === targetWord || (o.text && o.text.trim().toLowerCase() === targetWord)
    );
    if (!correctOpt || !correctOpt.image) return false;
    const correctImgKey = resolveKeyFromImage(correctOpt.image);
    if (targetKey && correctImgKey && targetKey !== correctImgKey) {
      return false; // Correct option does not match target meaning!
    }

    // Distractor options must NOT use the target word's image
    for (const opt of q.options) {
      if (opt !== correctOpt && opt.image) {
        const distImgKey = resolveKeyFromImage(opt.image);
        if (targetKey && distImgKey && targetKey === distImgKey) return false;
      }
    }
  }

  // 5. EXACTLY ONE CORRECT ANSWER CHECK
  if (['look_and_choose', 'image_choice', 'listen_and_choose', 'missing_letter'].includes(q.questionType)) {
    if (!q.options || q.options.length < 2) return false;
    const correctStr = String(q.correctAnswer || '').trim().toLowerCase();
    if (!correctStr) return false;

    // Must match exactly ONE option by id or text
    const matches = q.options.filter(
      (o) => o.id.toLowerCase() === correctStr || (o.text && o.text.trim().toLowerCase() === correctStr)
    );
    if (matches.length !== 1) return false;

    // All options must be unique in text and ID
    const optIds = q.options.map((o) => o.id.toLowerCase());
    if (new Set(optIds).size !== optIds.length) return false;
    const optTexts = q.options.map((o) => (o.text || '').trim().toLowerCase());
    if (new Set(optTexts).size !== optTexts.length) return false;
  }

  // Missing letter strict structural validation
  if (q.questionType === 'missing_letter') {
    const data = q.missingLetterData;
    if (!data) return false;
    const target = data.fullWord;
    if (!target || target.length < 2) return false;

    // Check exactly one blank exists in displayPattern
    const blanks = (data.displayPattern.match(/_/g) || []).length;
    if (blanks !== 1) return false;

    // Check correct letter comes from original target word
    const correct = (typeof q.correctAnswer === 'string' ? q.correctAnswer : '').trim().toLowerCase();
    if (!correct || correct.length !== 1) return false;
    if (!target.toLowerCase().includes(correct)) return false;

    // Verify: displayed word + correct missing letter = original target word
    const reconstructed = data.displayPattern.replace(/\s+/g, '').replace('_', correct);
    if (reconstructed.toLowerCase() !== target.toLowerCase()) return false;
  }

  // Word order check: validate grammar and natural meaning of the complete sentence
  if (q.questionType === 'word_order') {
    if (!q.wordOrderData || !Array.isArray(q.correctAnswer)) return false;
    if (q.wordOrderData.scrambledWords.length < 2) return false;
    const targetSentence =
      q.wordOrderData.correctSentence ||
      (Array.isArray(q.correctAnswer) ? q.correctAnswer.join(' ') : '');
    if (!targetSentence) return false;

    // Rule 1: Validate grammar, naturalness and meaning of the complete sentence FIRST
    const validation = validateSentenceForWordOrder(targetSentence);
    if (!validation.isValid) return false;

    // Rule 2: Token match check: targetSentence must split into correctAnswer tokens
    const correctTokens = Array.isArray(q.correctAnswer) ? q.correctAnswer : [];
    if (correctTokens.length < 2) return false;
    if (correctTokens.join(' ').trim() !== targetSentence.trim()) return false;

    // Rule 3: Scrambled words must have identical tokens
    if (q.wordOrderData.scrambledWords.length !== correctTokens.length) return false;
    const sortedScrambled = [...q.wordOrderData.scrambledWords].sort();
    const sortedTokens = [...correctTokens].sort();
    if (JSON.stringify(sortedScrambled) !== JSON.stringify(sortedTokens)) return false;

    // Rule 4: Feedback sentence MUST be exactly the same validated correct sentence
    if (q.explanation && !q.explanation.includes(targetSentence)) {
      q.explanation = `Super! The sentence is "${targetSentence}".`;
    }
  }

  // Speaking check: validate target phrase grammar
  if (q.questionType === 'speaking') {
    const targetPhrase =
      q.speakingData?.targetPhrase ||
      (typeof q.correctAnswer === 'string' ? q.correctAnswer : '') ||
      q.audioText ||
      '';
    if (!targetPhrase) return false;
    if (targetPhrase.includes(' ')) {
      const spCheck = validateSentenceForWordOrder(targetPhrase);
      if (!spCheck.isValid) return false;
    }
  }

  // Matching pairs check
  if (q.questionType === 'matching_pairs') {
    if (!q.matchingData || !q.matchingData.leftItems || !q.matchingData.rightItems) return false;
    if (q.matchingData.leftItems.length !== q.matchingData.rightItems.length) return false;
    if (q.matchingData.leftItems.length < 2) return false;
    if (!Array.isArray(q.correctAnswer) || q.correctAnswer.length !== q.matchingData.leftItems.length) return false;

    // Left and right items must have unique IDs
    const leftIds = q.matchingData.leftItems.map((l) => l.id);
    const rightIds = q.matchingData.rightItems.map((r) => r.id);
    if (new Set(leftIds).size !== leftIds.length) return false;
    if (new Set(rightIds).size !== rightIds.length) return false;

    // Left items must have unique texts
    const leftTexts = q.matchingData.leftItems.map((l) => l.text?.trim().toLowerCase() || '');
    if (new Set(leftTexts).size !== leftTexts.length) return false;

    // Reject abstract circles, blank boxes, or empty placeholders
    for (const r of q.matchingData.rightItems) {
      if (r.image && (r.image.includes('hsl(') || r.image.includes('cx="50" cy="50" r="32" fill="hsl'))) {
        return false;
      }
      if (r.svgContent && (r.svgContent.includes('hsl(') || r.svgContent.includes('cx="50" cy="50" r="32" fill="hsl'))) {
        return false;
      }
    }

    // If right items use images, EVERY picture must be unique, non-empty, and valid
    const rightImgs = q.matchingData.rightItems.map((r) => r.image).filter(Boolean);
    if (rightImgs.length > 0) {
      // Must not mix partial images and text; either all have images or none
      if (rightImgs.length !== q.matchingData.rightItems.length) return false;
      // No duplicate images in matching options
      if (new Set(rightImgs).size !== rightImgs.length) return false;
      // Each image must be a valid cartoon illustration
      for (const img of rightImgs) {
        if (!isValidCartoonIllustration(img)) return false;
      }
      // Semantic check: ensure each matched pair agrees: word canonical key === image key
      if (Array.isArray(q.correctAnswer)) {
        for (const pairStr of q.correctAnswer) {
          const [leftId, rightId] = pairStr.split(':');
          const leftItem = q.matchingData.leftItems.find((l) => l.id === leftId);
          const rightItem = q.matchingData.rightItems.find((r) => r.id === rightId);
          if (leftItem?.text && rightItem?.image) {
            const lKey = resolveCanonicalKey(leftItem.text);
            const rKey = resolveKeyFromImage(rightItem.image);
            if (lKey && rKey && lKey !== rKey) {
              return false; // Mismatched word-to-picture pair!
            }
          }
        }
      }
    }
  }

  // True/False check
  if (q.questionType === 'true_false') {
    if (q.correctAnswer !== 'true' && q.correctAnswer !== 'false') return false;
  }

  return true;
}

export const validateQuestion = validateQuestionBeforeDisplay;

export interface SessionPackageValidationResult {
  isValid: boolean;
  invalidIndex?: number;
  reason?: string;
}

/**
 * Full session package integrity check before displaying to student:
 * 1. Exact count matches requested package size.
 * 2. Zero duplicate questions by signature or prompt/answer.
 * 3. Zero questions with sentences differing by only one word.
 * 4. Zero duplicate answer option sets.
 * 5. Prompt image frequency limits strictly enforced.
 * 6. Every question passes single-question grammar, image, and distractors validation.
 */
export function validateCompleteSessionPackage(
  questions: QuizQuestion[],
  targetCount: number
): SessionPackageValidationResult {
  if (!questions || questions.length !== targetCount) {
    return {
      isValid: false,
      reason: `Package count mismatch: expected ${targetCount}, got ${questions?.length}`,
    };
  }

  const seenSignatures = new Set<string>();
  const seenOptionSets = new Set<string>();
  const imageCounts = new Map<string, number>();

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];

    // Single-question verification
    if (!validateQuestionBeforeDisplay(q)) {
      return {
        isValid: false,
        invalidIndex: i,
        reason: `Question ${q.id} failed individual validation`,
      };
    }

    // Unique signature check
    const sig = getQuestionSignature(q);
    if (seenSignatures.has(sig)) {
      return {
        isValid: false,
        invalidIndex: i,
        reason: `Duplicate signature in package: ${sig}`,
      };
    }
    seenSignatures.add(sig);

    // Duplicate answer options set check
    const optKey = getNormalizedOptionsSignature(q);
    if (optKey && optKey.length > 3) {
      const optAnswerKey = `${optKey}:${String(q.correctAnswer).toLowerCase()}`;
      if (seenOptionSets.has(optAnswerKey)) {
        return {
          isValid: false,
          invalidIndex: i,
          reason: `Duplicate answer option set with same correct answer: ${optKey}`,
        };
      }
      seenOptionSets.add(optAnswerKey);
    }

    // Prompt image frequency check
    if (q.promptImage) {
      const current = (imageCounts.get(q.promptImage) || 0) + 1;
      imageCounts.set(q.promptImage, current);
      if (targetCount <= 25 && current > 1) {
        return {
          isValid: false,
          invalidIndex: i,
          reason: `Prompt image repeated in package <= 25`,
        };
      }
      if (targetCount > 25 && current > 2) {
        return {
          isValid: false,
          invalidIndex: i,
          reason: `Prompt image used more than twice in package`,
        };
      }
    }

    // Sentence 1-word-apart near-duplicate check against all prior questions
    const candSentence = extractMainSentenceFromQuestion(q);
    if (candSentence) {
      for (let j = 0; j < i; j++) {
        const existSentence = extractMainSentenceFromQuestion(questions[j]);
        if (existSentence && isSentenceOneWordApart(candSentence, existSentence)) {
          return {
            isValid: false,
            invalidIndex: i,
            reason: `Sentence in question ${i} is only 1 word apart from question ${j}: "${candSentence}" vs "${existSentence}"`,
          };
        }
      }
    }
  }

  return { isValid: true };
}

export {
  validateQuestionStrictGrammarAndMeaning,
  auditAndRegenerateQuestion,
};
