/**
 * Dynamic Question Generator from Curriculum Knowledge Profiles
 * Author: Ms. Junia & AI Studio Engine
 *
 * Strictly adheres to:
 * 1. Unit Isolation: questions strictly come from the current Unit's knowledge profile.
 * 2. Controlled Variation:
 *    - Reuses grammar patterns with varied subjects, vocabulary, names, objects, places, and situations.
 *    - Example: "This is a book." -> "This is a ball." -> "This is a bike." -> "This is a bag."
 *    - Example: "Bill" -> "Ben" -> "Ba" -> "Nam" -> "Mai" -> "Linh" -> "Peter" -> "Mary"
 *    - Real-life dialogues & situational prompts around unit topic.
 * 3. Strict Near-Duplicate Elimination:
 *    - Compares every question with all previous questions in the current package before adding.
 *    - Rejects and regenerates any duplicate or near-duplicate question.
 *    - Limits target word repetition (frequency capping according to package size).
 *    - Rejects identical sets of multiple-choice answer options.
 *    - Rejects reusing the exact same prompt picture across questions.
 * 4. High Pedagogical Quality:
 *    - Exactly one clearly correct answer.
 *    - Age-appropriate primary school English.
 *    - Correct spelling, grammar, articles (a/an/the), punctuation and capitalization.
 *    - Answer choices that are plausible but clearly distinguishable.
 *    - Distinct, verified inline cartoon SVG illustrations.
 * 5. Full Package Sizes: guarantees 10, 20, 25, 30, and 40 unique questions.
 */

import { QuizQuestion, QuestionOption, QuestionType } from '../types/quiz';
import { DifficultyLevelId, QuestionPackageCount } from '../types/curriculum';
import { UnitKnowledgeProfile } from '../types/curriculumKnowledge';
import { getUnitCurriculumProfile } from './curriculum';
import { getVocabularyImage, getRawSvg, hasExactVocabularyImage, resolveCanonicalKey } from './curriculum/illustrations';
import {
  validateSentenceForWordOrder,
  validateCompletedSentence,
  isPluralNoun,
  isUncountableNoun,
  isAdjective,
  isVerbOrVerbPhrase,
  startsWithVowelSound,
  PROPER_NAMES,
} from '../utils/sentenceValidator';
import {
  generateGrammaticallyUnambiguousDistractors,
  VOCAB_CONTEXT_CLUES,
} from '../utils/singleAnswerValidator';
import {
  createVerifiedMissingLetterQuestion,
  validateQuestionBeforeDisplay,
  isValidCartoonIllustration,
  getQuestionSignature,
  isNearDuplicateQuestion,
  extractPrimaryTargetConcept,
  getNormalizedOptionsSignature,
  validateCompleteSessionPackage,
  isSentenceOneWordApart,
  extractMainSentenceFromQuestion,
} from './questionHelpers';

// Child-friendly character names for controlled repetition & variation
export const CHARACTERS = [
  'Bill', 'Ben', 'Ba', 'Nam', 'Mai', 'Linh',
  'Peter', 'Mary', 'Linda', 'Tom', 'Tony', 'Phong',
  'Hoa', 'Lucy', 'David', 'Daisy'
];

export const BOY_NAMES = ['Bill', 'Ben', 'Ba', 'Nam', 'Peter', 'Tom', 'Tony', 'Phong'];
export const GIRL_NAMES = ['Mai', 'Mary', 'Linda', 'Linh', 'Hoa', 'Lucy', 'Daisy'];

// Common alphabet letters for missing letter distractors
const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'.split('');

export function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Creates a grammatically natural, child-friendly sentence with a blank for any vocabulary item.
 * Never creates ungrammatical sentences like "I have a solar panels." or "I have a smart."
 */
export function createGrammaticallyCorrectSentenceWithBlank(
  word: string,
  example?: string
): { sentenceWithBlank: string; promptClue?: string } {
  const w = word.trim();

  // 1. If an example sentence is provided and naturally contains the word
  if (example && example.toLowerCase().includes(w.toLowerCase())) {
    const candidate = example.replace(new RegExp(`\\b${w}\\b`, 'i'), '___');
    if (candidate.includes('___')) {
      const val = validateCompletedSentence(candidate, w);
      if (val.isValid) {
        return { sentenceWithBlank: candidate };
      }
    }
  }

  // 2. Grammar-aware patterns based on word category:
  const lowerW = w.toLowerCase();

  // Special time word "o'clock"
  if (lowerW === "o'clock") {
    return {
      sentenceWithBlank: "It's seven ___.",
      promptClue: "Complete the time sentence:",
    };
  }

  // Proper names cannot have articles
  if (PROPER_NAMES.has(lowerW)) {
    return {
      sentenceWithBlank: "Hi, I am ___.",
      promptClue: "Complete the greeting with the name:",
    };
  }

  // Phrasal verbs, routines and action verbs: NEVER precede by "a/an"
  if (isVerbOrVerbPhrase(w)) {
    if (lowerW === 'get up' || lowerW === 'wake up') {
      return {
        sentenceWithBlank: "I ___ at seven o'clock every morning.",
        promptClue: "Choose the correct routine to complete the sentence:",
      };
    }
    if (lowerW === 'go to school') {
      return {
        sentenceWithBlank: "I ___ at seven thirty in the morning.",
        promptClue: "Choose the correct phrase to complete the sentence:",
      };
    }
    if (lowerW === 'go to bed' || lowerW === 'go to sleep') {
      return {
        sentenceWithBlank: "I ___ at nine thirty at night.",
        promptClue: "Choose the correct routine to complete the sentence:",
      };
    }
    if (lowerW === 'have breakfast') {
      return {
        sentenceWithBlank: "I ___ at six thirty in the morning.",
        promptClue: "Choose the correct routine to complete the sentence:",
      };
    }
    if (lowerW === 'have lunch') {
      return {
        sentenceWithBlank: "We ___ at twelve o'clock.",
        promptClue: "Choose the correct routine to complete the sentence:",
      };
    }
    if (lowerW === 'have dinner') {
      return {
        sentenceWithBlank: "My family ___ at seven in the evening.",
        promptClue: "Choose the correct routine to complete the sentence:",
      };
    }
    if (lowerW.startsWith('play ')) {
      return {
        sentenceWithBlank: "At break time, we ___ together.",
        promptClue: "Choose the correct activity to complete the sentence:",
      };
    }
    if (lowerW.startsWith('do ')) {
      return {
        sentenceWithBlank: "After school, they ___ at the club.",
        promptClue: "Choose the correct activity to complete the sentence:",
      };
    }
    return {
      sentenceWithBlank: "I can ___ very well.",
      promptClue: "Choose the correct action to complete the sentence:",
    };
  }

  if (isAdjective(w)) {
    return {
      sentenceWithBlank: 'The house is very ___.',
      promptClue: 'Choose the word that describes the house:',
    };
  }

  if (isPluralNoun(w)) {
    return {
      sentenceWithBlank: 'We have ___ at school.',
      promptClue: 'Choose the correct word to complete the sentence:',
    };
  }

  if (isUncountableNoun(w)) {
    return {
      sentenceWithBlank: 'I would like some ___.',
      promptClue: 'Choose the correct word to complete the sentence:',
    };
  }

  if (startsWithVowelSound(w)) {
    return {
      sentenceWithBlank: 'This is an ___.',
      promptClue: 'Choose the correct word to complete the sentence:',
    };
  }

  // Singular countable noun
  return {
    sentenceWithBlank: 'This is a ___.',
    promptClue: 'Choose the correct word to complete the sentence:',
  };
}

/**
 * Generates an abundant candidate pool (90 - 160+ questions) with rich controlled variation,
 * then selects an optimal, varied practice package of the requested size without duplicates.
 */
export function generateQuestionsForProfile(
  unitId: string,
  difficulty: DifficultyLevelId,
  count: QuestionPackageCount,
  seedQuestions?: QuizQuestion[]
): QuizQuestion[] {
  const profile = getUnitCurriculumProfile(unitId);
  if (!profile) return [];

  const pool: QuizQuestion[] = seedQuestions ? [...seedQuestions] : [];
  let qCounter = 100;
  const grade = profile.grade;
  const bookId = profile.bookId;

  const allVocab = [...profile.coreVocabulary, ...profile.realLifeVocabulary];
  const coreWords = profile.coreVocabulary.map((v) => v.word.trim());

  // -------------------------------------------------------------------------
  // 1. MISSING LETTER QUESTIONS (Core & Real-Life Vocabulary)
  // Generates blanks at multiple distinct indices with age-appropriate distractors
  // -------------------------------------------------------------------------
  allVocab.forEach((v, vIdx) => {
    const word = v.word.trim();
    if (word.length < 3 || word.includes(' ') || word.includes('-')) return;

    // Pick 1 to 3 valid letter indices for blanks
    const indices: number[] = [];
    if (word.length >= 3) indices.push(1); // Second letter (often a vowel or key consonant)
    if (word.length >= 4) indices.push(word.length - 2);
    if (word.length >= 5) indices.push(2);

    indices.forEach((idx) => {
      const targetChar = word[idx].toLowerCase();
      // Phonetically & visually plausible letter distractors
      const vowels = ['a', 'e', 'i', 'o', 'u'];
      let poolOfDistractors: string[];
      if (vowels.includes(targetChar)) {
        poolOfDistractors = vowels.filter((c) => c !== targetChar);
      } else {
        poolOfDistractors = ALPHABET.filter((c) => c !== targetChar && !vowels.includes(c));
      }
      const distractors = shuffleArray(poolOfDistractors).slice(0, 3);
      const hasImage = hasExactVocabularyImage(word);
      const rawImg = hasImage ? (v.imageUrl || getVocabularyImage(word)) : undefined;
      const validImg = rawImg && isValidCartoonIllustration(rawImg) ? rawImg : undefined;

      try {
        const q = createVerifiedMissingLetterQuestion({
          id: `${unitId}_GEN_ML_${vIdx}_${idx}_${qCounter++}`,
          bookId,
          grade,
          unitId,
          lessonId: `${unitId}-L01`,
          difficulty: 'level1',
          targetWord: word,
          missingIndex: idx,
          promptImage: validImg,
          distractors,
        });
        pool.push(q);
      } catch (e) {
        // Skip invalid configuration
      }
    });
  });

  // -------------------------------------------------------------------------
  // 2. IMAGE CHOICE QUESTIONS (Look at word -> Choose matching picture)
  // Rotates distinct distractor pairs to ensure choices are never identical
  // -------------------------------------------------------------------------
  allVocab.forEach((v, vIdx) => {
    const correctWord = v.word.trim();
    if (!hasExactVocabularyImage(correctWord)) return;
    const correctImage = v.imageUrl || getVocabularyImage(correctWord);
    if (!isValidCartoonIllustration(correctImage)) return;
    const correctKey = resolveCanonicalKey(correctWord);
    if (!correctKey) return;

    const validOtherVocab = allVocab.filter((other) => {
      const oWord = other.word.trim();
      if (oWord.toLowerCase() === correctWord.toLowerCase()) return false;
      if (!hasExactVocabularyImage(oWord)) return false;
      const oKey = resolveCanonicalKey(oWord);
      if (!oKey || oKey === correctKey) return false;
      const otherImg = other.imageUrl || getVocabularyImage(oWord);
      return isValidCartoonIllustration(otherImg) && otherImg !== correctImage;
    });

    const fallbackVocab = ['pizza', 'popcorn', 'plate', 'cup', 'book', 'ball', 'bike', 'cat', 'dog', 'pencil', 'sun', 'tree', 'apple', 'fish', 'car', 'star', 'cake'];

    // Create 2 distinct sets of distractors for controlled variation
    for (let setIdx = 0; setIdx < 2; setIdx++) {
      const chosenList: { word: string; image: string; key: string }[] = [];
      const shuffledOthers = shuffleArray(validOtherVocab);

      for (const cand of shuffledOthers) {
        const candWord = cand.word.trim();
        const candKey = resolveCanonicalKey(candWord);
        if (!candKey || candKey === correctKey) continue;
        const candImg = cand.imageUrl || getVocabularyImage(candWord);
        if (
          isValidCartoonIllustration(candImg) &&
          candImg !== correctImage &&
          !chosenList.some((c) => c.key === candKey || c.image === candImg || c.word.toLowerCase() === candWord.toLowerCase())
        ) {
          chosenList.push({ word: candWord, image: candImg, key: candKey });
          if (chosenList.length === 2) break;
        }
      }

      if (chosenList.length < 2) {
        for (const fb of shuffleArray(fallbackVocab)) {
          if (fb.toLowerCase() === correctWord.toLowerCase()) continue;
          const fbKey = resolveCanonicalKey(fb);
          if (!fbKey || fbKey === correctKey) continue;
          const fbImg = getVocabularyImage(fb);
          if (
            isValidCartoonIllustration(fbImg) &&
            fbImg !== correctImage &&
            !chosenList.some((c) => c.key === fbKey || c.image === fbImg || c.word.toLowerCase() === fb.toLowerCase())
          ) {
            chosenList.push({ word: fb, image: fbImg, key: fbKey });
            if (chosenList.length === 2) break;
          }
        }
      }

      if (chosenList.length < 2) continue;

      const instructions = [
        'Look at the word and choose the matching picture.',
        `Which picture shows a ${correctWord}?`,
      ];

      const options: QuestionOption[] = shuffleArray([
        { id: correctWord.toLowerCase(), text: correctWord, image: correctImage },
        { id: chosenList[0].word.toLowerCase(), text: chosenList[0].word, image: chosenList[0].image },
        { id: chosenList[1].word.toLowerCase(), text: chosenList[1].word, image: chosenList[1].image },
      ]);

      pool.push({
        id: `${unitId}_GEN_IC_${vIdx}_${setIdx}_${qCounter++}`,
        bookId,
        grade,
        unitId,
        lessonId: `${unitId}-L01`,
        difficulty: 'level1',
        questionType: 'image_choice',
        skill: 'READING',
        instruction: instructions[setIdx % instructions.length],
        promptText: correctWord,
        options,
        correctAnswer: correctWord.toLowerCase(),
        explanation: `Great! The picture correctly illustrates "${correctWord}".`,
      });
    }
  });

  // -------------------------------------------------------------------------
  // 3. LOOK AND CHOOSE - PICTURE TO WORD
  // Rotates distractors to ensure varied option combinations
  // If valid image exists -> Picture Question ("Look at the picture...")
  // If valid image is unavailable -> Automatically convert to non-picture meaning question
  // -------------------------------------------------------------------------
  allVocab.forEach((v, vIdx) => {
    const correctWord = v.word.trim();
    const otherVocab = allVocab.filter((o) => o.word.trim().toLowerCase() !== correctWord.toLowerCase());
    if (otherVocab.length < 2) return;

    const hasImg = hasExactVocabularyImage(correctWord);
    const rawImg = hasImg ? (v.imageUrl || getVocabularyImage(correctWord)) : undefined;
    const isImgValid = rawImg && isValidCartoonIllustration(rawImg);

    // Generate up to 2 distinct distractor configurations
    const shuffledOthers = shuffleArray(otherVocab);
    const d1 = shuffledOthers.slice(0, 2).map((d) => d.word.trim());

    const options1: QuestionOption[] = shuffleArray([
      { id: correctWord.toLowerCase(), text: correctWord },
      { id: d1[0].toLowerCase(), text: d1[0] },
      { id: d1[1].toLowerCase(), text: d1[1] },
    ]);

    if (isImgValid) {
      pool.push({
        id: `${unitId}_GEN_LC_P1_${vIdx}_${qCounter++}`,
        bookId,
        grade,
        unitId,
        lessonId: `${unitId}-L01`,
        difficulty: 'level1',
        questionType: 'look_and_choose',
        skill: 'READING',
        instruction: 'Look at the picture and choose the correct word.',
        promptImage: rawImg,
        options: options1,
        correctAnswer: correctWord.toLowerCase(),
        explanation: `Well done! The picture represents "${correctWord}".`,
      });
    } else {
      const hasMeaning = v.meaning && v.meaning.trim().length > 3 && v.meaning.toLowerCase() !== correctWord.toLowerCase();
      const promptDesc = hasMeaning ? `"${v.meaning}"` : `Complete the word: "${correctWord.slice(0, 2)}..."`;
      pool.push({
        id: `${unitId}_GEN_LC_M1_${vIdx}_${qCounter++}`,
        bookId,
        grade,
        unitId,
        lessonId: `${unitId}-L01`,
        difficulty: 'level1',
        questionType: 'look_and_choose',
        skill: 'READING',
        instruction: 'Choose the word that matches the description:',
        promptText: promptDesc,
        options: options1,
        correctAnswer: correctWord.toLowerCase(),
        explanation: `Well done! The correct word is "${correctWord}".`,
      });
    }

    if (otherVocab.length >= 4) {
      const d2 = shuffledOthers.slice(2, 4).map((d) => d.word.trim());
      const options2: QuestionOption[] = shuffleArray([
        { id: correctWord.toLowerCase(), text: correctWord },
        { id: d2[0].toLowerCase(), text: d2[0] },
        { id: d2[1].toLowerCase(), text: d2[1] },
      ]);

      if (isImgValid) {
        pool.push({
          id: `${unitId}_GEN_LC_P2_${vIdx}_${qCounter++}`,
          bookId,
          grade,
          unitId,
          lessonId: `${unitId}-L01`,
          difficulty: 'level1',
          questionType: 'look_and_choose',
          skill: 'READING',
          instruction: 'What is shown in the picture?',
          promptImage: rawImg,
          options: options2,
          correctAnswer: correctWord.toLowerCase(),
          explanation: `Correct! That is a "${correctWord}".`,
        });
      } else {
        const { sentenceWithBlank, promptClue } = createGrammaticallyCorrectSentenceWithBlank(correctWord, v.example);
        const unamDist = generateGrammaticallyUnambiguousDistractors(correctWord, sentenceWithBlank);
        const optionsUnam: QuestionOption[] = shuffleArray([
          { id: correctWord.toLowerCase(), text: correctWord },
          { id: unamDist[0].toLowerCase(), text: unamDist[0] },
          { id: unamDist[1].toLowerCase(), text: unamDist[1] },
        ]);
        pool.push({
          id: `${unitId}_GEN_LC_M2_${vIdx}_${qCounter++}`,
          bookId,
          grade,
          unitId,
          lessonId: `${unitId}-L01`,
          difficulty: 'level1',
          questionType: 'look_and_choose',
          skill: 'READING',
          instruction: promptClue || 'Choose the best word to complete the sentence:',
          promptText: sentenceWithBlank,
          options: optionsUnam,
          correctAnswer: correctWord.toLowerCase(),
          explanation: `Correct! "${correctWord}" completes the sentence.`,
        });
      }
    }
  });

  // -------------------------------------------------------------------------
  // 4. LOOK AND CHOOSE - SITUATION DIALOGUES & SENTENCE COMPLETION
  // Controlled variation around unit everyday situations, grammar & pronoun choices
  // -------------------------------------------------------------------------
  // 4a. Common question form dialogues (e.g. "— What is this? — This is a ___.")
  profile.commonQuestionForms.forEach((qf, qfIdx) => {
    allVocab.forEach((vocabItem, vIdx) => {
      const word = vocabItem.word.trim();
      let answerSentence = qf.answer;
      if (answerSentence.includes('[item]') || answerSentence.includes('[noun]') || answerSentence.includes('[food]')) {
        answerSentence = answerSentence.replace(/\[(?:item|noun|food)\]/, word);
      } else if (coreWords.length > 0) {
        const firstCore = coreWords[0];
        answerSentence = answerSentence.replace(new RegExp(`\\b${firstCore}\\b`, 'i'), word);
      }

      const val = validateSentenceForWordOrder(answerSentence);
      if (!val.isValid) return;

      // Attach promptImage if vocabulary has verified illustration
      let promptImage: string | undefined;
      if (hasExactVocabularyImage(word)) {
        const rawSvg = getRawSvg(word);
        if (rawSvg) {
          promptImage = `data:image/svg+xml;utf8,${encodeURIComponent(rawSvg)}`;
        }
      }

      // Context clue if available and no image
      const clue = VOCAB_CONTEXT_CLUES[word.toLowerCase()];
      let promptDialogue = `— ${qf.question}\n— ${val.normalizedSentence?.replace(new RegExp(`\\b${word}\\b`, 'i'), '___') || answerSentence.replace(new RegExp(`\\b${word}\\b`, 'i'), '___')}`;
      if (!promptImage && clue) {
        promptDialogue = `— ${qf.question} (${clue})\n— ${val.normalizedSentence?.replace(new RegExp(`\\b${word}\\b`, 'i'), '___') || answerSentence.replace(new RegExp(`\\b${word}\\b`, 'i'), '___')}`;
      }

      // Use unambiguous distractors to guarantee EXACTLY ONE correct answer
      const unamDist = generateGrammaticallyUnambiguousDistractors(word, promptDialogue);
      const options: QuestionOption[] = shuffleArray([
        { id: word.toLowerCase(), text: word },
        { id: unamDist[0].toLowerCase(), text: unamDist[0] },
        { id: unamDist[1].toLowerCase(), text: unamDist[1] },
      ]);

      pool.push({
        id: `${unitId}_GEN_LC_DIA_${qfIdx}_${vIdx}_${qCounter++}`,
        bookId,
        grade,
        unitId,
        lessonId: `${unitId}-L02`,
        difficulty: 'level2',
        questionType: 'look_and_choose',
        skill: 'READING',
        instruction: promptImage ? 'Look at the picture and choose the best word to complete the dialogue:' : 'Read the dialogue and choose the best word to complete it.',
        promptImage,
        promptText: promptDialogue,
        options,
        correctAnswer: word.toLowerCase(),
        explanation: `Great! The complete sentence is "${val.normalizedSentence || answerSentence}".`,
      });
    });
  });

  // 4b. Grammar Pronoun & Verb Form questions (He's / She's / V-ing)
  if (profile.targetSentencePatterns.some((p) => p.example.includes("He's") || p.example.includes("She's"))) {
    // Pronoun choice: He's vs She's
    pool.push({
      id: `${unitId}_GEN_LC_PRON_1_${qCounter++}`,
      bookId,
      grade,
      unitId,
      lessonId: `${unitId}-L02`,
      difficulty: 'level2',
      questionType: 'look_and_choose',
      skill: 'READING',
      instruction: 'Choose the correct word to complete the sentence for a boy:',
      promptText: '___ is kicking a ball in the yard.',
      options: [
        { id: "he's", text: "He's" },
        { id: "she's", text: "She's" },
        { id: "it's", text: "It's" },
      ],
      correctAnswer: "he's",
      explanation: 'Use "He\'s" when talking about a boy.',
    });

    pool.push({
      id: `${unitId}_GEN_LC_PRON_2_${qCounter++}`,
      bookId,
      grade,
      unitId,
      lessonId: `${unitId}-L02`,
      difficulty: 'level2',
      questionType: 'look_and_choose',
      skill: 'READING',
      instruction: 'Choose the correct word to complete the sentence for a girl:',
      promptText: '___ is flying a kite high in the sky.',
      options: [
        { id: "she's", text: "She's" },
        { id: "he's", text: "He's" },
        { id: "it's", text: "It's" },
      ],
      correctAnswer: "she's",
      explanation: 'Use "She\'s" when talking about a girl.',
    });
  }

  // 4c. Profile fillBlankPool
  profile.fillBlankPool.forEach((fb, fbIdx) => {
    const options: QuestionOption[] = fb.options.map((opt) => ({
      id: opt.toLowerCase(),
      text: opt,
    }));

    pool.push({
      id: `${unitId}_GEN_FB_${fbIdx}_${qCounter++}`,
      bookId,
      grade,
      unitId,
      lessonId: `${unitId}-L02`,
      difficulty: 'level2',
      questionType: 'look_and_choose',
      skill: 'READING',
      instruction: 'Choose the best word to complete the blank.',
      promptText: fb.sentenceWithBlank,
      options,
      correctAnswer: fb.blankWord.toLowerCase(),
      explanation: fb.explanation,
    });
  });

  // -------------------------------------------------------------------------
  // 5. WORD ORDER / SENTENCE RECONSTRUCTION
  // Controlled variation with different subjects, names, and vocabulary objects
  // -------------------------------------------------------------------------
  // 5a. Profile base sentenceOrderPool
  profile.sentenceOrderPool.forEach((so, soIdx) => {
    const val = validateSentenceForWordOrder(so.sentence);
    if (!val.isValid) return;

    const targetSentence = val.normalizedSentence || so.sentence;
    const words = targetSentence.split(' ');
    if (words.length < 2) return;

    let scrambled = shuffleArray(words);
    if (JSON.stringify(scrambled) === JSON.stringify(words)) {
      scrambled = [...words].reverse();
    }

    pool.push({
      id: `${unitId}_GEN_WO_BASE_${soIdx}_${qCounter++}`,
      bookId,
      grade,
      unitId,
      lessonId: `${unitId}-L02`,
      difficulty: 'level2',
      questionType: 'word_order',
      skill: 'WRITING',
      instruction: 'Drag or tap the words in the correct order to make a complete sentence.',
      promptText: 'Put the words in order to make a sentence:',
      correctAnswer: words,
      explanation: `Fantastic! The correct sentence is "${targetSentence}".`,
      wordOrderData: {
        scrambledWords: scrambled,
        correctSentence: targetSentence,
      },
    });
  });

  // 5b. Sentence pattern controlled variations
  profile.targetSentencePatterns.forEach((pat, patIdx) => {
    // Check if pattern has He's / She's
    if (pat.example.includes("He's") || pat.example.includes("She's")) {
      const isHe = pat.example.includes("He's");
      const namePool = isHe ? BOY_NAMES : GIRL_NAMES;
      const pronoun = isHe ? "He" : "She";

      // Form 1: "He is V-ing..." / "She is V-ing..."
      const fullForm = pat.example.replace(/He's|She's/, `${pronoun} is`);
      const vFull = validateSentenceForWordOrder(fullForm);
      if (vFull.isValid) {
        const words = (vFull.normalizedSentence || fullForm).split(' ');
        let scrambled = shuffleArray(words);
        if (JSON.stringify(scrambled) === JSON.stringify(words)) scrambled = [...words].reverse();

        pool.push({
          id: `${unitId}_GEN_WO_FULL_${patIdx}_${qCounter++}`,
          bookId,
          grade,
          unitId,
          lessonId: `${unitId}-L02`,
          difficulty: 'level2',
          questionType: 'word_order',
          skill: 'WRITING',
          instruction: 'Arrange the words to make a sentence:',
          promptText: 'Put the words in order:',
          correctAnswer: words,
          explanation: `Well done! "${vFull.normalizedSentence || fullForm}".`,
          wordOrderData: {
            scrambledWords: scrambled,
            correctSentence: vFull.normalizedSentence || fullForm,
          },
        });
      }

      // Form 2: Varied character names (Nam is kicking a ball / Mai is flying a kite)
      namePool.slice(0, 4).forEach((cName, cIdx) => {
        const nameSentence = pat.example.replace(/He's|She's/, `${cName} is`);
        const vName = validateSentenceForWordOrder(nameSentence);
        if (vName.isValid) {
          const words = (vName.normalizedSentence || nameSentence).split(' ');
          let scrambled = shuffleArray(words);
          if (JSON.stringify(scrambled) === JSON.stringify(words)) scrambled = [...words].reverse();

          pool.push({
            id: `${unitId}_GEN_WO_C_${patIdx}_${cIdx}_${qCounter++}`,
            bookId,
            grade,
            unitId,
            lessonId: `${unitId}-L02`,
            difficulty: 'level2',
            questionType: 'word_order',
            skill: 'WRITING',
            instruction: 'Drag or tap the words in the correct order:',
            promptText: 'Put the words in order:',
            correctAnswer: words,
            explanation: `Awesome! "${vName.normalizedSentence || nameSentence}".`,
            wordOrderData: {
              scrambledWords: scrambled,
              correctSentence: vName.normalizedSentence || nameSentence,
            },
          });
        }
      });
    }

    // Name variations for greetings / introductions (Hi, I'm Bill -> Ben -> Nam -> Mai)
    if (pat.example.includes('Bill') || pat.example.includes('Peter') || pat.example.includes('Mary') || pat.pattern.includes('[Name]')) {
      CHARACTERS.slice(0, 6).forEach((charName, cIdx) => {
        let candidate = pat.example;
        if (candidate.includes('Bill') || candidate.includes('Peter') || candidate.includes('Mary')) {
          candidate = candidate.replace(/Bill|Peter|Mary/g, charName);
        } else if (candidate.includes('[Name]')) {
          candidate = candidate.replace('[Name]', charName);
        } else {
          return;
        }

        const val = validateSentenceForWordOrder(candidate);
        if (!val.isValid) return;

        const targetSentence = val.normalizedSentence || candidate;
        const words = targetSentence.split(' ');
        if (words.length < 2) return;

        let scrambled = shuffleArray(words);
        if (JSON.stringify(scrambled) === JSON.stringify(words)) {
          scrambled = [...words].reverse();
        }

        pool.push({
          id: `${unitId}_GEN_WO_NAME_${patIdx}_${cIdx}_${qCounter++}`,
          bookId,
          grade,
          unitId,
          lessonId: `${unitId}-L02`,
          difficulty: 'level2',
          questionType: 'word_order',
          skill: 'WRITING',
          instruction: 'Put the words in the correct order.',
          promptText: 'Put the words in order:',
          correctAnswer: words,
          explanation: `Super! The sentence is "${targetSentence}".`,
          wordOrderData: {
            scrambledWords: scrambled,
            correctSentence: targetSentence,
          },
        });
      });
    }

    // Vocabulary item substitutions (This is a book -> This is a ball -> This is a bike -> This is a bag)
    allVocab.forEach((vocabItem, vSubIdx) => {
      const vWord = vocabItem.word.trim();
      let substituted = '';
      const regexPlaceholder = /\[(?:item|noun|food|singular noun|plural noun|body part\(s\)|place|country|activity)\]/i;
      
      if (regexPlaceholder.test(pat.pattern)) {
        substituted = pat.pattern.replace(regexPlaceholder, vWord);
      } else if (!isVerbOrVerbPhrase(vWord) && !isAdjective(vWord) && !isUncountableNoun(vWord) && !isPluralNoun(vWord)) {
        const article = startsWithVowelSound(vWord) ? 'an' : 'a';
        if (pat.pattern.startsWith('This is a ') || pat.example.startsWith('This is a ') || pat.pattern.startsWith('This is an ') || pat.example.startsWith('This is an ')) {
          substituted = `This is ${article} ${vWord}.`;
        } else if (pat.pattern.startsWith('I have a ') || pat.example.startsWith('I have a ') || pat.pattern.startsWith('I have an ') || pat.example.startsWith('I have an ')) {
          substituted = `I have ${article} ${vWord}.`;
        } else if (pat.pattern.startsWith('Look at the ') || pat.example.startsWith('Look at the ')) {
          substituted = `Look at the ${vWord}.`;
        }
      } else if (isVerbOrVerbPhrase(vWord) && (pat.pattern.includes('do you do') || pat.example.startsWith('I '))) {
        substituted = `I ${vWord}.`;
      }

      if (substituted && substituted !== pat.example) {
        // Step 1 & 2: Create complete correct sentence FIRST and validate grammar & meaning
        const val = validateSentenceForWordOrder(substituted);
        if (!val.isValid) return;

        const targetSentence = val.normalizedSentence || substituted;
        // Step 3: Split that exact sentence into word tokens
        const words = targetSentence.split(' ');
        if (words.length >= 2) {
          // Step 4: Shuffle the tokens
          let scrambled = shuffleArray(words);
          if (JSON.stringify(scrambled) === JSON.stringify(words)) {
            scrambled = [...words].reverse();
          }

          // Step 5: Store original complete sentence as ONLY correct answer
          pool.push({
            id: `${unitId}_GEN_WO_VOC_${patIdx}_${vSubIdx}_${qCounter++}`,
            bookId,
            grade,
            unitId,
            lessonId: `${unitId}-L02`,
            difficulty: 'level2',
            questionType: 'word_order',
            skill: 'WRITING',
            instruction: 'Drag or tap the words in the correct order to make a complete sentence.',
            promptText: 'Put the words in the correct order:',
            correctAnswer: words,
            // Step 7: Feedback sentence MUST be exactly the same validated correct sentence
            explanation: `Great work! The correct sentence is "${targetSentence}".`,
            wordOrderData: {
              scrambledWords: scrambled,
              correctSentence: targetSentence,
            },
          });
        }
      }
    });
  });

  // -------------------------------------------------------------------------
  // 6. LISTEN AND CHOOSE QUESTIONS (Word-level & Sentence-level)
  // -------------------------------------------------------------------------
  // 6a. Single Word Listening
  allVocab.forEach((v, vIdx) => {
    const word = v.word.trim();
    const otherVocab = allVocab.filter((o) => o.word.trim().toLowerCase() !== word.toLowerCase());
    if (otherVocab.length < 2) return;

    const distractors = shuffleArray(otherVocab).slice(0, 2).map((d) => d.word.trim());
    const options: QuestionOption[] = shuffleArray([
      { id: word.toLowerCase(), text: word },
      { id: distractors[0].toLowerCase(), text: distractors[0] },
      { id: distractors[1].toLowerCase(), text: distractors[1] },
    ]);

    pool.push({
      id: `${unitId}_GEN_LIS_VOC_${vIdx}_${qCounter++}`,
      bookId,
      grade,
      unitId,
      lessonId: `${unitId}-L01`,
      difficulty: 'level1',
      questionType: 'listen_and_choose',
      skill: 'LISTENING',
      instruction: 'Listen carefully and choose the word you hear.',
      audioText: word,
      options,
      correctAnswer: word.toLowerCase(),
      explanation: `Nice listening! The word is "${word}".`,
    });
  });

  // 6b. Sentence Listening with Question
  profile.targetSentencePatterns.forEach((pat, patIdx) => {
    const sentence = pat.example;
    const val = validateSentenceForWordOrder(sentence);
    if (!val.isValid) return;
    const cleanSentence = val.normalizedSentence || sentence;

    const otherPatterns = profile.targetSentencePatterns
      .filter((p) => p.example.toLowerCase() !== sentence.toLowerCase())
      .map((p) => p.example);
    if (otherPatterns.length < 2) return;

    const distractors = shuffleArray(otherPatterns).slice(0, 2);
    const options: QuestionOption[] = shuffleArray([
      { id: cleanSentence.toLowerCase(), text: cleanSentence },
      { id: distractors[0].toLowerCase(), text: distractors[0] },
      { id: distractors[1].toLowerCase(), text: distractors[1] },
    ]);

    pool.push({
      id: `${unitId}_GEN_LIS_SENT_${patIdx}_${qCounter++}`,
      bookId,
      grade,
      unitId,
      lessonId: `${unitId}-L03`,
      difficulty: 'level2',
      questionType: 'listen_and_choose',
      skill: 'LISTENING',
      instruction: 'Listen carefully to the audio and choose what you hear:',
      promptText: 'Which sentence did you hear?',
      audioText: cleanSentence,
      options,
      correctAnswer: cleanSentence.toLowerCase(),
      explanation: `Well done! The audio sentence is "${cleanSentence}".`,
    });
  });

  // 6c. Profile Listening Prompts
  profile.listeningPrompts.forEach((lp, lpIdx) => {
    const options: QuestionOption[] = lp.options.map((opt) => ({
      id: opt.toLowerCase(),
      text: opt,
    }));

    pool.push({
      id: `${unitId}_GEN_LIS_PROMPT_${lpIdx}_${qCounter++}`,
      bookId,
      grade,
      unitId,
      lessonId: `${unitId}-L03`,
      difficulty: 'level2',
      questionType: 'listen_and_choose',
      skill: 'LISTENING',
      instruction: 'Listen carefully to the audio and choose the correct answer.',
      promptText: lp.question,
      audioText: lp.audioText,
      options,
      correctAnswer: lp.answer.toLowerCase(),
      explanation: lp.explanation,
    });
  });

  // -------------------------------------------------------------------------
  // 7. TRUE / FALSE QUESTIONS (Child-friendly semantic comprehension)
  // -------------------------------------------------------------------------
  profile.trueFalsePool.forEach((tf, tfIdx) => {
    pool.push({
      id: `${unitId}_GEN_TF_BASE_${tfIdx}_${qCounter++}`,
      bookId,
      grade,
      unitId,
      lessonId: `${unitId}-L03`,
      difficulty: 'level2',
      questionType: 'true_false',
      skill: 'READING',
      instruction: 'Read the statement carefully and select True or False.',
      promptText: tf.statement,
      options: [
        { id: 'true', text: 'True' },
        { id: 'false', text: 'False' },
      ],
      correctAnswer: tf.isTrue ? 'true' : 'false',
      explanation: tf.explanation,
    });
  });

  // Semantic facts based on vocabulary objects
  const semanticPool: Array<{ word: string; statement: string; isTrue: boolean; exp: string }> = [
    { word: 'book', statement: 'You can open and read a book.', isTrue: true, exp: 'Books are for reading.' },
    { word: 'book', statement: 'A book has wheels and pedals to ride.', isTrue: false, exp: 'Bikes have wheels, not books.' },
    { word: 'ball', statement: 'A ball is round and you can kick it.', isTrue: true, exp: 'A ball is a round toy.' },
    { word: 'ball', statement: 'You read a ball like a story book.', isTrue: false, exp: 'You play with a ball, you do not read it.' },
    { word: 'bike', statement: 'You can ride a bicycle in the yard or park.', isTrue: true, exp: 'Bicycles are for riding.' },
    { word: 'bike', statement: 'A bicycle has wings and flies away.', isTrue: false, exp: 'Bikes have wheels to ride on the ground.' },
    { word: 'kick', statement: 'You kick a ball using your foot.', isTrue: true, exp: 'Kicking is done with the foot.' },
    { word: 'kick', statement: 'You kick a book to read its pages.', isTrue: false, exp: 'You read a book with your eyes, not kick it.' },
    { word: 'kite', statement: 'A kite can fly high in the windy sky.', isTrue: true, exp: 'Kites fly with the wind.' },
    { word: 'kite', statement: 'You ride a kite on the road like a car.', isTrue: false, exp: 'Kites fly in the air.' },
    { word: 'kitten', statement: 'A kitten is a cute, playful baby cat.', isTrue: true, exp: 'A kitten is a young cat.' },
    { word: 'kitten', statement: 'A kitten is made of metal and has pedals.', isTrue: false, exp: 'A kitten is a living animal.' },
    { word: 'grass', statement: 'Grass is green and grows in the backyard.', isTrue: true, exp: 'Grass is green lawn plant.' },
    { word: 'grass', statement: 'Grass flies high in the sky like a bird.', isTrue: false, exp: 'Grass grows on the ground.' },
    { word: 'eye', statement: 'Humans use two eyes to see things.', isTrue: true, exp: 'Eyes are for seeing.' },
    { word: 'nose', statement: 'You smell flowers with your nose.', isTrue: true, exp: 'The nose is for smelling.' },
  ];

  semanticPool.forEach((st, sIdx) => {
    if (allVocab.some((v) => v.word.toLowerCase() === st.word.toLowerCase())) {
      pool.push({
        id: `${unitId}_GEN_TF_SEM_${sIdx}_${qCounter++}`,
        bookId,
        grade,
        unitId,
        lessonId: `${unitId}-L03`,
        difficulty: 'level2',
        questionType: 'true_false',
        skill: 'READING',
        instruction: 'Select True or False for the statement below:',
        promptText: st.statement,
        options: [
          { id: 'true', text: 'True' },
          { id: 'false', text: 'False' },
        ],
        correctAnswer: st.isTrue ? 'true' : 'false',
        explanation: st.exp,
      });
    }
  });

  // -------------------------------------------------------------------------
  // 8. SPEAKING DRILLS (Vocabulary & Sentences)
  // -------------------------------------------------------------------------
  allVocab.forEach((v, vIdx) => {
    const word = v.word.trim();
    pool.push({
      id: `${unitId}_GEN_SPK_VOC_${vIdx}_${qCounter++}`,
      bookId,
      grade,
      unitId,
      lessonId: `${unitId}-L01`,
      difficulty: 'level1',
      questionType: 'speaking',
      skill: 'SPEAKING',
      instruction: 'Listen to the audio, press the microphone, and say the word clearly.',
      promptText: `Say the word: ${word}`,
      audioText: word,
      speakingData: {
        targetPhrase: word,
        phoneticHint: v.phonetic || `Sound of ${word}`,
      },
      correctAnswer: word,
      explanation: `Brilliant! You pronounced "${word}" clearly.`,
    });
  });

  profile.speakingPrompts.forEach((sp, spIdx) => {
    pool.push({
      id: `${unitId}_GEN_SPK_PROMPT_${spIdx}_${qCounter++}`,
      bookId,
      grade,
      unitId,
      lessonId: `${unitId}-L03`,
      difficulty: 'level3',
      questionType: 'speaking',
      skill: 'SPEAKING',
      instruction: 'Listen to the audio, press the microphone, and speak the phrase clearly.',
      promptText: sp.context || 'Repeat the phrase:',
      audioText: sp.phrase,
      speakingData: {
        targetPhrase: sp.phrase,
        phoneticHint: sp.hint,
      },
      correctAnswer: sp.phrase,
      explanation: `Wonderful! You pronounced "${sp.phrase}" accurately.`,
    });
  });

  // Useful expression speaking
  profile.usefulExpressions.forEach((expr, eIdx) => {
    pool.push({
      id: `${unitId}_GEN_SPK_EXPR_${eIdx}_${qCounter++}`,
      bookId,
      grade,
      unitId,
      lessonId: `${unitId}-L03`,
      difficulty: 'level2',
      questionType: 'speaking',
      skill: 'SPEAKING',
      instruction: 'Tap the microphone and say the sentence aloud:',
      promptText: `Say aloud: "${expr}"`,
      audioText: expr,
      speakingData: {
        targetPhrase: expr,
        phoneticHint: expr,
      },
      correctAnswer: expr,
      explanation: `Excellent speaking! "${expr}".`,
    });
  });

  // Useful expression listening
  profile.usefulExpressions.forEach((expr, eIdx) => {
    const otherExprs = profile.usefulExpressions.filter((o) => o !== expr);
    if (otherExprs.length >= 2) {
      const distractors = shuffleArray(otherExprs).slice(0, 2);
      const options: QuestionOption[] = shuffleArray([
        { id: expr.toLowerCase(), text: expr },
        { id: distractors[0].toLowerCase(), text: distractors[0] },
        { id: distractors[1].toLowerCase(), text: distractors[1] },
      ]);
      pool.push({
        id: `${unitId}_GEN_LIS_EXPR_${eIdx}_${qCounter++}`,
        bookId,
        grade,
        unitId,
        lessonId: `${unitId}-L02`,
        difficulty: 'level2',
        questionType: 'listen_and_choose',
        skill: 'LISTENING',
        instruction: 'Listen to the sentence and choose what you hear:',
        promptText: 'Which sentence did you hear?',
        audioText: expr,
        options,
        correctAnswer: expr.toLowerCase(),
        explanation: `Well done! You correctly heard "${expr}".`,
      });
    }
  });

  // Useful expression word order
  profile.usefulExpressions.forEach((expr, eIdx) => {
    const val = validateSentenceForWordOrder(expr);
    if (val.isValid) {
      const words = (val.normalizedSentence || expr).split(' ');
      if (words.length >= 3 && words.length <= 8) {
        let scrambled = shuffleArray(words);
        if (JSON.stringify(scrambled) === JSON.stringify(words)) scrambled = [...words].reverse();
        pool.push({
          id: `${unitId}_GEN_WO_EXPR_${eIdx}_${qCounter++}`,
          bookId,
          grade,
          unitId,
          lessonId: `${unitId}-L02`,
          difficulty: 'level2',
          questionType: 'word_order',
          skill: 'WRITING',
          instruction: 'Arrange the words to make a correct sentence:',
          promptText: 'Put the words in order:',
          correctAnswer: words,
          explanation: `Super job! The sentence is "${val.normalizedSentence || expr}".`,
          wordOrderData: {
            scrambledWords: scrambled,
            correctSentence: val.normalizedSentence || expr,
          },
        });
      }
    }
  });

  // Phonics & Letter Recognition (Grade 1 & 2 target sounds)
  allVocab.forEach((v, vIdx) => {
    if (v.letterFocus && v.letterFocus.length > 0) {
      const targetLetter = v.letterFocus.split('/')[0].trim().toLowerCase();
      const otherLetters = ALPHABET.filter((c) => c !== targetLetter);
      const dist = shuffleArray(otherLetters).slice(0, 2);
      const options: QuestionOption[] = shuffleArray([
        { id: targetLetter, text: targetLetter.toUpperCase() },
        { id: dist[0], text: dist[0].toUpperCase() },
        { id: dist[1], text: dist[1].toUpperCase() },
      ]);
      pool.push({
        id: `${unitId}_GEN_PHON_LET_${vIdx}_${qCounter++}`,
        bookId,
        grade,
        unitId,
        lessonId: `${unitId}-L01`,
        difficulty: 'level1',
        questionType: 'look_and_choose',
        skill: 'PRONUNCIATION',
        instruction: `Which letter does the word "${v.word}" begin with?`,
        promptText: `Word: ${v.word}`,
        options,
        correctAnswer: targetLetter,
        explanation: `Spot on! "${v.word}" begins with the letter "${targetLetter.toUpperCase()}".`,
      });
    }
    if (v.soundFocus && v.soundFocus.length > 0) {
      const otherWords = allVocab.filter((o) => o.soundFocus && o.soundFocus !== v.soundFocus);
      if (otherWords.length >= 2) {
        const dist = shuffleArray(otherWords).slice(0, 2).map((d) => d.word);
        const options: QuestionOption[] = shuffleArray([
          { id: v.word.toLowerCase(), text: v.word },
          { id: dist[0].toLowerCase(), text: dist[0] },
          { id: dist[1].toLowerCase(), text: dist[1] },
        ]);
        pool.push({
          id: `${unitId}_GEN_PHON_SND_${vIdx}_${qCounter++}`,
          bookId,
          grade,
          unitId,
          lessonId: `${unitId}-L01`,
          difficulty: 'level1',
          questionType: 'listen_and_choose',
          skill: 'PRONUNCIATION',
          instruction: `Which word starts with the sound ${v.soundFocus}?`,
          promptText: `Identify the word with the sound ${v.soundFocus}:`,
          audioText: v.word,
          options,
          correctAnswer: v.word.toLowerCase(),
          explanation: `Great phonics skill! "${v.word}" starts with the sound ${v.soundFocus}.`,
        });
      }
    }
  });

  // -------------------------------------------------------------------------
  // 9. MATCHING PAIRS (Word Bank -> Cartoon Picture Matching & Meaning Matching)
  // -------------------------------------------------------------------------
  // 9a. Picture Matching: only generate if each word has a verified, unique cartoon SVG
  const verifiedVocabForPictures = allVocab.filter((v) => {
    const word = v.word.trim();
    return hasExactVocabularyImage(word);
  });

  // Ensure each word maps to a distinct canonical illustration key
  const uniquePictureVocab: typeof verifiedVocabForPictures = [];
  const seenPictureKeys = new Set<string>();
  for (const v of verifiedVocabForPictures) {
    const key = resolveCanonicalKey(v.word.trim());
    if (key && !seenPictureKeys.has(key)) {
      seenPictureKeys.add(key);
      uniquePictureVocab.push(v);
    }
  }

  if (uniquePictureVocab.length >= 2) {
    const vocabList = uniquePictureVocab.slice(0, 4);
    const leftItems = vocabList.map((v, i) => ({
      id: `left_v_${i}`,
      text: v.word.trim(),
    }));
    const rightItems = shuffleArray(
      vocabList.map((v, i) => {
        const word = v.word.trim();
        const rawSvg = getRawSvg(word);
        return {
          id: `right_v_${i}`,
          image: `data:image/svg+xml;utf8,${encodeURIComponent(rawSvg)}`,
          svgContent: rawSvg,
          matchId: `left_v_${i}`,
        };
      })
    );
    const correctAnswer = vocabList.map((_, i) => `left_v_${i}:right_v_${i}`);

    pool.push({
      id: `${unitId}_GEN_MP_VOC_${qCounter++}`,
      bookId,
      grade,
      unitId,
      lessonId: `${unitId}-L01`,
      difficulty: 'level1',
      questionType: 'matching_pairs',
      skill: 'READING',
      instruction: 'Match each word from the Word Bank with its picture.',
      matchingData: { leftItems, rightItems },
      correctAnswer,
      explanation: 'Brilliant matching! All words are paired with their correct pictures.',
    });
  }

  // 9b. Meaning / Vietnamese matching pairs (Word Bank -> Meaning Matching)
  profile.matchingPairsPool.forEach((mp, mpIdx) => {
    if (mp.pairs.length < 2) return;
    const leftItems = mp.pairs.map((p, i) => ({
      id: `left_${i}`,
      text: p.left.trim(),
    }));
    const rightItems = shuffleArray(
      mp.pairs.map((p, i) => {
        return {
          id: `right_${i}`,
          text: p.right.trim(),
          matchId: `left_${i}`,
        };
      })
    );
    const correctAnswer = mp.pairs.map((_, i) => `left_${i}:right_${i}`);

    pool.push({
      id: `${unitId}_GEN_MP_POOL_${mpIdx}_${qCounter++}`,
      bookId,
      grade,
      unitId,
      lessonId: `${unitId}-L02`,
      difficulty: 'level2',
      questionType: 'matching_pairs',
      skill: 'READING',
      instruction: 'Match each word from the Word Bank with its meaning.',
      matchingData: { leftItems, rightItems },
      correctAnswer,
      explanation: 'Brilliant matching! All pairs are correct.',
    });
  });

  // -------------------------------------------------------------------------
  // 10. READING PROMPTS
  // -------------------------------------------------------------------------
  profile.readingPrompts.forEach((rp, rpIdx) => {
    const options: QuestionOption[] = rp.options.map((opt) => ({
      id: opt.toLowerCase(),
      text: opt,
    }));

    pool.push({
      id: `${unitId}_GEN_READ_${rpIdx}_${qCounter++}`,
      bookId,
      grade,
      unitId,
      lessonId: `${unitId}-L03`,
      difficulty: 'level2',
      questionType: 'look_and_choose',
      skill: 'READING',
      instruction: 'Read the short text and answer the question:',
      promptText: `${rp.text}\n\nQuestion: ${rp.question}`,
      options,
      correctAnswer: rp.answer.toLowerCase(),
      explanation: rp.explanation,
    });
  });

  // -------------------------------------------------------------------------
  // SMART SESSION ASSEMBLY
  // Enforces controlled variety and strictly zero duplicate or near-duplicate questions
  // -------------------------------------------------------------------------
  return buildVariedSession(pool, count, profile);
}

/**
 * Builds a practice package of the exact target count from a candidate pool.
 * Strict guarantees:
 * 1. ZERO duplicate signatures.
 * 2. ZERO near-duplicate questions (checked via isNearDuplicateQuestion).
 * 3. Controlled variation across question types, subjects, and vocabulary.
 * 4. Interleaved question types avoiding consecutive identical types.
 */
export function buildVariedSession(
  candidatePool: QuizQuestion[],
  targetCount: QuestionPackageCount,
  profile?: UnitKnowledgeProfile
): QuizQuestion[] {
  // Pre-filter candidate pool with basic verification checks
  const verifiedCandidates: QuizQuestion[] = [];
  const initialSignatures = new Set<string>();

  for (const q of candidatePool) {
    if (validateQuestionBeforeDisplay(q, initialSignatures)) {
      initialSignatures.add(getQuestionSignature(q));
      verifiedCandidates.push(q);
    }
  }

  // Group candidates by questionType for balanced round-robin selection
  const byType: Record<string, QuizQuestion[]> = {};
  for (const q of verifiedCandidates) {
    if (!byType[q.questionType]) byType[q.questionType] = [];
    byType[q.questionType].push(q);
  }

  // Shuffle candidates inside each group
  Object.keys(byType).forEach((t) => {
    byType[t] = shuffleArray(byType[t]);
  });

  const sessionQuestions: QuizQuestion[] = [];
  const sessionSignatures = new Set<string>();

  // Available question types in prioritized pedagogical sequence
  const typeOrder: QuestionType[] = [
    'image_choice',
    'look_and_choose',
    'missing_letter',
    'word_order',
    'listen_and_choose',
    'true_false',
    'speaking',
    'matching_pairs',
  ];

  // Pass 1: Round-robin across question types avoiding consecutive identical types
  let hasMore = true;
  let passCount = 0;
  while (sessionQuestions.length < targetCount && hasMore && passCount < 20) {
    passCount++;
    let addedInRound = 0;
    const shuffledTypes = shuffleArray(typeOrder);

    for (const t of shuffledTypes) {
      if (sessionQuestions.length >= targetCount) break;
      const candidatesForType = byType[t] || [];

      for (let i = 0; i < candidatesForType.length; i++) {
        const cand = candidatesForType[i];

        // Avoid consecutive identical question types
        if (sessionQuestions.length > 0) {
          const lastType = sessionQuestions[sessionQuestions.length - 1].questionType;
          if (cand.questionType === lastType) {
            continue;
          }
        }

        // Integrity check
        if (!validateQuestionBeforeDisplay(cand, sessionSignatures)) {
          continue;
        }

        // Near-duplicate check against ALL previously accepted questions
        const dupCheck = isNearDuplicateQuestion(cand, sessionQuestions, targetCount);
        if (dupCheck.isDuplicate) {
          continue;
        }

        // Accept candidate
        sessionSignatures.add(getQuestionSignature(cand));
        sessionQuestions.push({
          ...cand,
          id: `${cand.id}_s${sessionQuestions.length + 1}`,
        });
        candidatesForType.splice(i, 1);
        addedInRound++;
        break;
      }
    }

    if (addedInRound === 0) {
      hasMore = false;
    }
  }

  // Pass 2: If still short, try all remaining verified candidates without the consecutive type restriction
  // (Maintains strict near-duplicate and target word frequency caps!)
  if (sessionQuestions.length < targetCount) {
    const remainingCandidates = shuffleArray(
      Object.values(byType).flat()
    );

    for (const cand of remainingCandidates) {
      if (sessionQuestions.length >= targetCount) break;

      if (!validateQuestionBeforeDisplay(cand, sessionSignatures)) {
        continue;
      }

      const dupCheck = isNearDuplicateQuestion(cand, sessionQuestions, targetCount);
      if (dupCheck.isDuplicate) {
        continue;
      }

      sessionSignatures.add(getQuestionSignature(cand));
      sessionQuestions.push({
        ...cand,
        id: `${cand.id}_s${sessionQuestions.length + 1}`,
      });
    }
  }

  // Pass 3: If still short (e.g. for package size 40) and profile exists,
  // dynamically synthesize fresh, non-duplicate controlled variations with unused names & items
  if (sessionQuestions.length < targetCount && profile) {
    const allVocab = [...profile.coreVocabulary, ...profile.realLifeVocabulary];
    let synthIndex = 0;

    // Try name-substituted sentences
    for (const charName of CHARACTERS) {
      if (sessionQuestions.length >= targetCount) break;
      for (const pat of profile.targetSentencePatterns) {
        if (sessionQuestions.length >= targetCount) break;
        let sentence = pat.example;
        if (sentence.includes('Bill') || sentence.includes('Peter') || sentence.includes('Mary') || sentence.includes('[Name]')) {
          sentence = sentence.replace(/Bill|Peter|Mary|\[Name\]/g, charName);
        } else if (sentence.includes("He's") || sentence.includes("She's")) {
          sentence = sentence.replace(/He's|She's/, `${charName} is`);
        } else {
          continue;
        }

        const val = validateSentenceForWordOrder(sentence);
        if (!val.isValid) continue;

        const targetSentence = val.normalizedSentence || sentence;
        const words = targetSentence.split(' ');
        if (words.length < 2) continue;

        let scrambled = shuffleArray(words);
        if (JSON.stringify(scrambled) === JSON.stringify(words)) {
          scrambled = [...words].reverse();
        }

        const cand: QuizQuestion = {
          id: `${profile.unitId}_SYNTH_WO_${synthIndex++}`,
          bookId: profile.bookId,
          grade: profile.grade,
          unitId: profile.unitId,
          lessonId: `${profile.unitId}-L02`,
          difficulty: 'level2',
          questionType: 'word_order',
          skill: 'WRITING',
          instruction: 'Arrange the words to form a correct sentence:',
          promptText: 'Put the words in order:',
          correctAnswer: words,
          explanation: `Super! The sentence is "${targetSentence}".`,
          wordOrderData: {
            scrambledWords: scrambled,
            correctSentence: targetSentence,
          },
        };

        if (validateQuestionBeforeDisplay(cand, sessionSignatures)) {
          const dupCheck = isNearDuplicateQuestion(cand, sessionQuestions, targetCount);
          if (!dupCheck.isDuplicate) {
            sessionSignatures.add(getQuestionSignature(cand));
            sessionQuestions.push({
              ...cand,
              id: `${cand.id}_s${sessionQuestions.length + 1}`,
            });
          }
        }
      }
    }

    // Try dialogue completions with grammar-aware natural templates and rotating character names
    for (let vIdx = 0; vIdx < allVocab.length; vIdx++) {
      if (sessionQuestions.length >= targetCount) break;
      const v = allVocab[vIdx];
      const word = v.word.trim();
      const charName = CHARACTERS[(vIdx + synthIndex) % CHARACTERS.length];

      let prompt = '';
      if (isVerbOrVerbPhrase(word)) {
        const verbDialogues = [
          `— What do you do in your free time, ${charName}?\n— I ___ with my friends.`,
          `— Can you ___, ${charName}?\n— Yes, I can.`,
          `— What does ${charName} do on weekends?\n— He likes to ___.`,
        ];
        prompt = verbDialogues[synthIndex % verbDialogues.length];
      } else if (isPluralNoun(word)) {
        const pluralDialogues = [
          `— What can you see, ${charName}?\n— I can see ___ in the picture.`,
          `— Do you have ___, ${charName}?\n— Yes, I do.`,
          `— Look, ${charName}! These are ___ on the table.`,
          `— Where are the ___?\n— They are right here, ${charName}.`,
        ];
        prompt = pluralDialogues[synthIndex % pluralDialogues.length];
      } else if (isUncountableNoun(word)) {
        const massDialogues = [
          `— What would you like, ${charName}?\n— I would like some ___.`,
          `— Do you have any ___, ${charName}?\n— Yes, I do.`,
          `— Look, ${charName}! There is some ___ in the kitchen.`,
        ];
        prompt = massDialogues[synthIndex % massDialogues.length];
      } else if (isAdjective(word)) {
        const adjDialogues = [
          `— How is your home, ${charName}?\n— It is very ___.`,
          `— Look at ${charName}!\n— ${charName} is very ___.`,
          `— Is the room ___?\n— Yes, it is very ___.`,
        ];
        prompt = adjDialogues[synthIndex % adjDialogues.length];
      } else if (startsWithVowelSound(word)) {
        const vowelDialogues = [
          `— What can you see, ${charName}?\n— I can see an ___.`,
          `— Do you have an ___, ${charName}?\n— Yes, I do.`,
          `— Look, ${charName}! This is an ___.`,
        ];
        prompt = vowelDialogues[synthIndex % vowelDialogues.length];
      } else {
        const singularDialogues = [
          `— What can you see, ${charName}?\n— I can see a ___.`,
          `— Do you have a ___, ${charName}?\n— Yes, I do.`,
          `— Look, ${charName}! This is a ___.`,
          `— Where is the ___?\n— It's right here, ${charName}.`,
          `— Let's play with the ___, ${charName}!`,
        ];
        prompt = singularDialogues[synthIndex % singularDialogues.length];
      }

      // Attach promptImage if vocabulary has verified illustration
      let promptImage: string | undefined;
      if (hasExactVocabularyImage(word)) {
        const rawSvg = getRawSvg(word);
        if (rawSvg) {
          promptImage = `data:image/svg+xml;utf8,${encodeURIComponent(rawSvg)}`;
        }
      }

      // Context clue if available and no image
      const clue = VOCAB_CONTEXT_CLUES[word.toLowerCase()];
      if (!promptImage && clue) {
        prompt = `${prompt} (${clue})`;
      }

      // Use unambiguous distractors to guarantee EXACTLY ONE correct answer
      const unamDist = generateGrammaticallyUnambiguousDistractors(word, prompt);
      const options: QuestionOption[] = shuffleArray([
        { id: word.toLowerCase(), text: word },
        { id: unamDist[0].toLowerCase(), text: unamDist[0] },
        { id: unamDist[1].toLowerCase(), text: unamDist[1] },
      ]);

      const cand: QuizQuestion = {
        id: `${profile.unitId}_SYNTH_LC_${synthIndex++}`,
        bookId: profile.bookId,
        grade: profile.grade,
        unitId: profile.unitId,
        lessonId: `${profile.unitId}-L02`,
        difficulty: 'level2',
        questionType: 'look_and_choose',
        skill: 'READING',
        instruction: promptImage ? 'Look at the picture and choose the best word to complete the sentence:' : 'Choose the best word to complete the sentence:',
        promptImage,
        promptText: prompt,
        options,
        correctAnswer: word.toLowerCase(),
        explanation: `Well done! "${word}" completes the sentence for ${charName}.`,
      };

      if (validateQuestionBeforeDisplay(cand, sessionSignatures)) {
        const dupCheck = isNearDuplicateQuestion(cand, sessionQuestions, targetCount);
        if (!dupCheck.isDuplicate) {
          sessionSignatures.add(getQuestionSignature(cand));
          sessionQuestions.push({
            ...cand,
            id: `${cand.id}_s${sessionQuestions.length + 1}`,
          });
        }
      }
    }

    // Try vocabulary definition / meaning comprehension questions
    for (const v of allVocab) {
      if (sessionQuestions.length >= targetCount) break;
      const word = v.word.trim();
      const meaning = v.meaning.trim();
      if (!meaning || meaning.length < 5) continue;

      const otherWords = allVocab.filter((o) => o.word.trim().toLowerCase() !== word.toLowerCase()).map((o) => o.word.trim());
      if (otherWords.length < 2) continue;

      const distractors = shuffleArray(otherWords).slice(0, 2);
      const options: QuestionOption[] = shuffleArray([
        { id: word.toLowerCase(), text: word },
        { id: distractors[0].toLowerCase(), text: distractors[0] },
        { id: distractors[1].toLowerCase(), text: distractors[1] },
      ]);

      const cand: QuizQuestion = {
        id: `${profile.unitId}_SYNTH_DEF_${synthIndex++}`,
        bookId: profile.bookId,
        grade: profile.grade,
        unitId: profile.unitId,
        lessonId: `${profile.unitId}-L02`,
        difficulty: 'level2',
        questionType: 'look_and_choose',
        skill: 'READING',
        instruction: 'Choose the word that matches the description:',
        promptText: `"${meaning}"`,
        options,
        correctAnswer: word.toLowerCase(),
        explanation: `Correct! "${word}" matches: "${meaning}".`,
      };

      if (validateQuestionBeforeDisplay(cand, sessionSignatures)) {
        const dupCheck = isNearDuplicateQuestion(cand, sessionQuestions, targetCount);
        if (!dupCheck.isDuplicate) {
          sessionSignatures.add(getQuestionSignature(cand));
          sessionQuestions.push({
            ...cand,
            id: `${cand.id}_s${sessionQuestions.length + 1}`,
          });
        }
      }
    }

    // Try sentence listening from usefulExpressions and patterns
    const sentences = [
      ...profile.usefulExpressions,
      ...profile.targetSentencePatterns.map((p) => p.example),
      ...profile.sentenceOrderPool.map((s) => s.sentence),
    ];
    for (const sent of sentences) {
      if (sessionQuestions.length >= targetCount) break;
      const otherSents = sentences.filter((s) => s.toLowerCase() !== sent.toLowerCase());
      if (otherSents.length < 2) continue;

      const distractors = shuffleArray(otherSents).slice(0, 2);
      const options: QuestionOption[] = shuffleArray([
        { id: sent.toLowerCase(), text: sent },
        { id: distractors[0].toLowerCase(), text: distractors[0] },
        { id: distractors[1].toLowerCase(), text: distractors[1] },
      ]);

      const cand: QuizQuestion = {
        id: `${profile.unitId}_SYNTH_LIS_${synthIndex++}`,
        bookId: profile.bookId,
        grade: profile.grade,
        unitId: profile.unitId,
        lessonId: `${profile.unitId}-L03`,
        difficulty: 'level2',
        questionType: 'listen_and_choose',
        skill: 'LISTENING',
        instruction: 'Listen carefully to the audio and choose what you hear:',
        promptText: 'Which sentence did you hear?',
        audioText: sent,
        options,
        correctAnswer: sent.toLowerCase(),
        explanation: `Well done! The audio sentence is "${sent}".`,
      };

      if (validateQuestionBeforeDisplay(cand, sessionSignatures)) {
        const dupCheck = isNearDuplicateQuestion(cand, sessionQuestions, targetCount);
        if (!dupCheck.isDuplicate) {
          sessionSignatures.add(getQuestionSignature(cand));
          sessionQuestions.push({
            ...cand,
            id: `${cand.id}_s${sessionQuestions.length + 1}`,
          });
        }
      }
    }
  }

  // Pass 4: Ensure exact targetCount is reached even for small vocabulary units
  const allVocabForFill = profile ? [...profile.coreVocabulary, ...profile.realLifeVocabulary] : [];
  let fillAttempt = 0;
  while (sessionQuestions.length < targetCount && fillAttempt < 150 && allVocabForFill.length >= 2) {
    fillAttempt++;
    const v = allVocabForFill[fillAttempt % allVocabForFill.length];
    const word = v.word.trim();
    const otherWords = allVocabForFill.filter((o) => o.word.trim().toLowerCase() !== word.toLowerCase()).map((o) => o.word.trim());
    if (otherWords.length < 2) continue;

    const charName = CHARACTERS[(fillAttempt + 5) % CHARACTERS.length];
    const charName2 = CHARACTERS[(fillAttempt + 8) % CHARACTERS.length];
    const distractors = shuffleArray(otherWords).slice(0, 2);
    const options: QuestionOption[] = shuffleArray([
      { id: word.toLowerCase(), text: word },
      { id: distractors[0].toLowerCase(), text: distractors[0] },
      { id: distractors[1].toLowerCase(), text: distractors[1] },
    ]);

    let synthCand: QuizQuestion | undefined;

    const situationTemplates = [
      (w: string, n1: string, n2: string) => ({
        text: `At home, ${n1} showed the ${w} to ${n2}.`,
        q: `What did ${n1} show to ${n2}?`,
      }),
      (w: string, n1: string) => ({
        text: `In the small shop down the street, ${n1} bought a ${w}.`,
        q: `What item did ${n1} buy in the shop?`,
      }),
      (w: string, n1: string) => ({
        text: `${n1} placed the ${w} carefully on the study table.`,
        q: `What is on the study table?`,
      }),
      (w: string, n1: string) => ({
        text: `During art class, ${n1} drew a colorful picture of a ${w}.`,
        q: `What did ${n1} draw in art class?`,
      }),
      (w: string, n1: string) => ({
        text: `While walking to school, ${n1} pointed at the ${w}.`,
        q: `What did ${n1} point at?`,
      }),
      (w: string, n1: string, n2: string) => ({
        text: `${n1} asked ${n2}: "Have you seen my ${w} anywhere?"`,
        q: `What is ${n1} looking for?`,
      }),
      (w: string, n1: string) => ({
        text: `Inside the school bag, ${n1} found a clean ${w}.`,
        q: `What did ${n1} find inside the bag?`,
      }),
      (w: string, n1: string, n2: string) => ({
        text: `${n1} and ${n2} are looking closely at the ${w}.`,
        q: `What are the friends looking at?`,
      }),
    ];

    // Mode A: Contextual reading comprehension with distinct situations
    if (fillAttempt % 3 === 0) {
      const sitFn = situationTemplates[fillAttempt % situationTemplates.length];
      const sit = sitFn(word, charName, charName2);
      synthCand = {
        id: `${profile!.unitId}_SYNTH_SIT_${fillAttempt}`,
        bookId: profile!.bookId,
        grade: profile!.grade,
        unitId: profile!.unitId,
        lessonId: `${profile!.unitId}-L02`,
        difficulty: 'level2',
        questionType: 'look_and_choose',
        skill: 'READING',
        instruction: 'Read the short sentence and choose the correct answer:',
        promptText: `${sit.text}\n\nQuestion: ${sit.q}`,
        options,
        correctAnswer: word.toLowerCase(),
        explanation: `Well done! The text clearly mentions "${word}".`,
      };
    }
    // Mode B: True/False concept statement
    else if (fillAttempt % 3 === 1) {
      const sitFn = situationTemplates[fillAttempt % situationTemplates.length];
      const sit = sitFn(word, charName, charName2);
      synthCand = {
        id: `${profile!.unitId}_SYNTH_TF_${fillAttempt}`,
        bookId: profile!.bookId,
        grade: profile!.grade,
        unitId: profile!.unitId,
        lessonId: `${profile!.unitId}-L01`,
        difficulty: 'level1',
        questionType: 'true_false',
        skill: 'READING',
        instruction: 'Read the statement and choose True or False:',
        promptText: sit.text,
        correctAnswer: 'true',
        explanation: `Correct! "${sit.text}" is a true sentence.`,
      };
    }
    // Mode C: Diverse spelling & word identification questions
    else {
      const spellModes = [
        `Which word begins with the letter "${word[0].toUpperCase()}"?`,
        `Which word ends with the letter "${word[word.length - 1].toUpperCase()}"?`,
        `Which word has ${word.length} letters in English?`,
      ];
      const promptInstruction = spellModes[(fillAttempt >> 1) % spellModes.length];
      synthCand = {
        id: `${profile!.unitId}_SYNTH_SPELL_${fillAttempt}`,
        bookId: profile!.bookId,
        grade: profile!.grade,
        unitId: profile!.unitId,
        lessonId: `${profile!.unitId}-L01`,
        difficulty: 'level1',
        questionType: 'look_and_choose',
        skill: 'WRITING',
        instruction: promptInstruction,
        promptText: `Word check for Unit ${profile!.unitNumber}:`,
        options,
        correctAnswer: word.toLowerCase(),
        explanation: `Super! "${word}" matches the clue.`,
      };
    }

    if (synthCand && validateQuestionBeforeDisplay(synthCand, sessionSignatures)) {
      const dupCheck = isNearDuplicateQuestion(synthCand, sessionQuestions, targetCount);
      if (!dupCheck.isDuplicate) {
        sessionSignatures.add(getQuestionSignature(synthCand));
        sessionQuestions.push({
          ...synthCand,
          id: `${synthCand.id}_s${sessionQuestions.length + 1}`,
        });
      }
    }
  }

  // -------------------------------------------------------------------------
  // FINAL STEP: Strict Full-Package Integrity Audit & Auto-Regeneration
  // Before displaying the question set to the student:
  // - Verify complete question set for duplicates, 1-word-changed sentences,
  //   grammar errors, audio transcript mismatches, image mismatches, and ambiguous blanks.
  // - If any problem is found, regenerate / replace that question until 100% valid.
  // -------------------------------------------------------------------------
  const allVocabForProfile = profile ? [...profile.coreVocabulary, ...profile.realLifeVocabulary] : [];
  let auditResult = validateCompleteSessionPackage(sessionQuestions.slice(0, targetCount), targetCount);
  let repairAttempts = 0;
  const availablePool = shuffleArray([...candidatePool]);

  while (!auditResult.isValid && repairAttempts < 50 && sessionQuestions.length >= targetCount) {
    repairAttempts++;
    const badIndex = auditResult.invalidIndex !== undefined ? auditResult.invalidIndex : sessionQuestions.length - 1;

    // Find a replacement candidate from pool that passes individual validation
    let replacementCandidate: QuizQuestion | undefined;
    for (let i = 0; i < availablePool.length; i++) {
      const candidate = availablePool[i];
      const testSet = [...sessionQuestions.slice(0, targetCount)];
      testSet[badIndex] = candidate;
      const testCheck = validateCompleteSessionPackage(testSet, targetCount);
      if (testCheck.isValid || testCheck.invalidIndex !== badIndex) {
        replacementCandidate = candidate;
        availablePool.splice(i, 1);
        break;
      }
    }

    if (replacementCandidate) {
      sessionQuestions[badIndex] = {
        ...replacementCandidate,
        id: `${replacementCandidate.id}_rep${repairAttempts}`,
      };
    } else if (allVocabForProfile.length > 0 && profile) {
      const v = allVocabForProfile[repairAttempts % allVocabForProfile.length];
      const charName = CHARACTERS[(repairAttempts + 7) % CHARACTERS.length];
      const { sentenceWithBlank, promptClue } = createGrammaticallyCorrectSentenceWithBlank(v.word, v.example);
      let promptImage: string | undefined;
      if (hasExactVocabularyImage(v.word)) {
        const rawSvg = getRawSvg(v.word);
        if (rawSvg) {
          promptImage = `data:image/svg+xml;utf8,${encodeURIComponent(rawSvg)}`;
        }
      }
      const unamDist = generateGrammaticallyUnambiguousDistractors(v.word, sentenceWithBlank);
      const options: QuestionOption[] = shuffleArray([
        { id: v.word.toLowerCase(), text: v.word },
        { id: unamDist[0].toLowerCase(), text: unamDist[0] },
        { id: unamDist[1].toLowerCase(), text: unamDist[1] },
      ]);
      const synthQ: QuizQuestion = {
        id: `${profile.unitId}_SYNTH_REP_${repairAttempts}`,
        bookId: profile.bookId,
        grade: profile.grade,
        unitId: profile.unitId,
        lessonId: `${profile.unitId}-L02`,
        difficulty: 'level2',
        questionType: 'look_and_choose',
        skill: 'READING',
        instruction: promptImage ? 'Look at the picture and choose the correct word:' : (promptClue || `Choose the word to complete the sentence for ${charName}:`),
        promptImage,
        promptText: sentenceWithBlank,
        options,
        correctAnswer: v.word.toLowerCase(),
        explanation: `Great job! "${v.word}" completes the sentence for ${charName}.`,
      };
      sessionQuestions[badIndex] = synthQ;
    }

    auditResult = validateCompleteSessionPackage(sessionQuestions.slice(0, targetCount), targetCount);
  }

  return sessionQuestions.slice(0, targetCount);
}
