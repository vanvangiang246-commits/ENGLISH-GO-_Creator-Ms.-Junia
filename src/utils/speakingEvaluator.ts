/**
 * ENGLISH GO! - Speaking Assessment & Speech Normalization Engine
 * 
 * Strict, pedagogical speech recognition and evaluation for primary school English learners.
 * 
 * Rules:
 * 1. Audio recording alone NEVER gives a correct score.
 * 2. Compares recognized speech transcript against target phrase.
 * 3. Normalizes text: lowercase, expands contractions, strips punctuation, normalizes spacing.
 * 4. Checks word-by-word sequence. Replaced/missing words (e.g. "book" vs "cake") are marked incorrect.
 * 5. Silence, empty transcript, or unparseable noise is marked unclear / incorrect.
 */

export interface SpeakingEvaluationResult {
  isCorrect: boolean;
  transcript: string;
  targetPhrase: string;
  status: 'correct' | 'incorrect' | 'unclear';
  feedback: string;
}

/**
 * Normalizes speech transcript and target phrase for fair, robust comparison.
 */
export function normalizeSpokenText(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    // normalize common contractions
    .replace(/\bi'm\b/g, 'i am')
    .replace(/\bit's\b/g, 'it is')
    .replace(/\bthat's\b/g, 'that is')
    .replace(/\bwhat's\b/g, 'what is')
    .replace(/\bthere's\b/g, 'there is')
    .replace(/\bhere's\b/g, 'here is')
    .replace(/\bhe's\b/g, 'he is')
    .replace(/\bshe's\b/g, 'she is')
    .replace(/\bwe're\b/g, 'we are')
    .replace(/\bthey're\b/g, 'they are')
    .replace(/\byou're\b/g, 'you are')
    .replace(/\bi've\b/g, 'i have')
    .replace(/\bwe've\b/g, 'we have')
    .replace(/\bthey've\b/g, 'they have')
    .replace(/\byou've\b/g, 'you have')
    .replace(/\bdon't\b/g, 'do not')
    .replace(/\bdoesn't\b/g, 'does not')
    .replace(/\bdidn't\b/g, 'did not')
    .replace(/\bcan't\b/g, 'can not')
    .replace(/\bcannot\b/g, 'can not')
    .replace(/\bwon't\b/g, 'will not')
    .replace(/\blet's\b/g, 'let us')
    // number digits to words
    .replace(/\b0\b/g, 'zero')
    .replace(/\b1\b/g, 'one')
    .replace(/\b2\b/g, 'two')
    .replace(/\b3\b/g, 'three')
    .replace(/\b4\b/g, 'four')
    .replace(/\b5\b/g, 'five')
    .replace(/\b6\b/g, 'six')
    .replace(/\b7\b/g, 'seven')
    .replace(/\b8\b/g, 'eight')
    .replace(/\b9\b/g, 'nine')
    .replace(/\b10\b/g, 'ten')
    // strip punctuation, quotes, symbols
    .replace(/[^a-z0-9\s]/g, ' ')
    // collapse whitespace
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Levenshtein distance between two strings
 */
export function calculateLevenshteinDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const d: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) d[i][0] = i;
  for (let j = 0; j <= n; j++) d[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(
        d[i - 1][j] + 1,      // deletion
        d[i][j - 1] + 1,      // insertion
        d[i - 1][j - 1] + cost // substitution
      );
    }
  }
  return d[m][n];
}

/**
 * Checks if two individual words match:
 * - Length <= 4: exact match required (e.g. cake != book, ball != doll, cat != bat)
 * - Length >= 5: allow max 1 typo/transcription edit distance (e.g. pencil, rubber, robots)
 */
export function isWordMatch(targetWord: string, spokenWord: string): boolean {
  if (targetWord === spokenWord) return true;
  if (targetWord.length >= 5 && spokenWord.length >= 5) {
    return calculateLevenshteinDistance(targetWord, spokenWord) <= 1;
  }
  return false;
}

/**
 * Evaluates spoken transcript against target phrase and acceptable variants.
 */
export function evaluateSpokenPhrase(
  targetPhrase: string,
  rawTranscript: string,
  acceptableVariants: string[] = []
): SpeakingEvaluationResult {
  const cleanTarget = (targetPhrase || '').trim();
  const cleanTranscript = (rawTranscript || '').trim();

  // 1. Check for empty or silence
  if (!cleanTranscript) {
    return {
      isCorrect: false,
      transcript: '',
      targetPhrase: cleanTarget,
      status: 'unclear',
      feedback: "We couldn't hear any speech. Please speak clearly into your microphone and try again!",
    };
  }

  const normSpoken = normalizeSpokenText(cleanTranscript);

  // If after normalization there is no meaningful speech
  if (!normSpoken) {
    return {
      isCorrect: false,
      transcript: cleanTranscript,
      targetPhrase: cleanTarget,
      status: 'unclear',
      feedback: "Speech was unclear. Please speak closer to your microphone and try again.",
    };
  }

  // Compile all targets to check (the target phrase + any predefined acceptable variants)
  const candidateTargets: string[] = [cleanTarget, ...acceptableVariants];

  // For single-word targets like "book" or "ball", also accept "a book", "a ball"
  const normPrimaryTarget = normalizeSpokenText(cleanTarget);
  const targetWords = normPrimaryTarget.split(' ').filter(Boolean);
  if (targetWords.length === 1) {
    candidateTargets.push(`a ${cleanTarget}`);
    candidateTargets.push(`the ${cleanTarget}`);
  }

  const normalizedCandidateTargets = candidateTargets.map(normalizeSpokenText);

  // 2. Direct string equality check
  for (const t of normalizedCandidateTargets) {
    if (t === normSpoken) {
      return {
        isCorrect: true,
        transcript: cleanTranscript,
        targetPhrase: cleanTarget,
        status: 'correct',
        feedback: `Great job! Your pronunciation of "${cleanTarget}" was clear and accurate!`,
      };
    }
  }

  // 3. Token-by-token sequence comparison
  const spokenTokens = normSpoken.split(' ').filter(Boolean);

  for (const t of normalizedCandidateTargets) {
    const candidateTokens = t.split(' ').filter(Boolean);
    if (candidateTokens.length === spokenTokens.length) {
      const allTokensMatch = candidateTokens.every((word, idx) =>
        isWordMatch(word, spokenTokens[idx])
      );
      if (allTokensMatch) {
        return {
          isCorrect: true,
          transcript: cleanTranscript,
          targetPhrase: cleanTarget,
          status: 'correct',
          feedback: `Well done! You spoke "${cleanTarget}" clearly!`,
        };
      }
    }
  }

  // 4. If tokens do not match, generate constructive feedback
  // Highlight what differed so student and teacher understand
  return {
    isCorrect: false,
    transcript: cleanTranscript,
    targetPhrase: cleanTarget,
    status: 'incorrect',
    feedback: `You said: "${cleanTranscript}". Target was: "${cleanTarget}". Listen to the example and try again!`,
  };
}
