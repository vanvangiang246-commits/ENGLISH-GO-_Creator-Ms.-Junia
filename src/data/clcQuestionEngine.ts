/**
 * CLC Question Engine
 * Generates Grade 5-6 extension and Grade 6-7 entrance exam preparation questions
 * contextualized with vocabulary and topics from the selected Unit.
 * 
 * Aligned with User Guidelines:
 * - Reduced difficulty: Keep Grade 6-7 grammar extension, but make it accessible to strong Grade 5 students.
 * - Short, clear, familiar contexts connected to the selected Unit vocabulary.
 * - Prioritized areas:
 *   • present simple / present continuous
 *   • past simple in familiar situations
 *   • be going to / will for simple future
 *   • can / should / must
 *   • comparative and superlative forms
 *   • basic Wh-questions
 *   • basic prepositions and conjunctions
 *   • simple sentence transformation and meaning matching
 *   • short reading contexts with clear clues
 * - Avoid advanced/confusing grammar (e.g. negative inversions, complex clauses, rare words).
 * - Difficulty rule: ≈ 70% accessible Grade 5–6 extension (Stage 1 + 2) + 30% Grade 6–7 challenge (Stage 3).
 * - Exactly ONE clearly correct answer.
 * - No duplicate questions, repeated patterns, or ambiguous choices within the same set.
 */

import {
  ClcGrammarCategoryId,
  ClcQuestion,
  ClcStage,
  ClcSessionConfig,
} from '../types/clc';
import { ALL_CURRICULUM_PROFILES, getUnitCurriculumProfile } from './curriculum/index';
import { CLC_GRAMMAR_CATEGORIES } from './clcCategories';
import { UnitKnowledgeProfile } from '../types/curriculumKnowledge';
import { getClcLessonForUnit } from './clcUnitLessons';
import { processAndValidateClcQuestions, toSafePlural, toSafeSingular } from './clcQuestionValidator';
import { generateUnitSentenceTransformations } from './clcSentenceTransformations';
import { generateUnitReadingQuestions } from './clcReadingQuestions';
import { generateUnitWordOrderQuestions } from './clcWordOrderQuestions';
import { generateUnitErrorCorrectionQuestions } from './clcErrorCorrectionQuestions';

interface UnitWordItem {
  word: string;
  meaning: string;
  example: string;
}

/**
 * Top prioritized grammar categories as requested:
 * present simple/cont, past simple, future, modals, comparatives, questions, prepositions,
 * conjunctions, sentence transformation/meaning matching.
 */
export const CLC_PRIORITIZED_CATEGORIES: ClcGrammarCategoryId[] = [
  'present_simple_continuous',
  'past_simple',
  'future_will_going_to',
  'modals_can_must_should',
  'comparatives_superlatives',
  'question_formation',
  'prepositions',
  'conjunctions',
  'transformation_error_correction',
  'be_verbs',
  'have_verbs',
  'there_is_are',
  'articles',
  'pronouns',
  'possessives',
  'quantifiers',
  'countable_uncountable',
  'adverbs_frequency',
  'imperatives',
  'basic_modals',
  'infinitives_gerunds',
];

/**
 * Extracts clean vocabulary words and topic context from a Unit profile
 */
function extractUnitContext(profile: UnitKnowledgeProfile) {
  const vocab: UnitWordItem[] = profile.coreVocabulary.map((v) => ({
    word: v.word.trim(),
    meaning: v.meaning,
    example: v.example,
  }));

  if (profile.realLifeVocabulary && profile.realLifeVocabulary.length > 0) {
    profile.realLifeVocabulary.forEach((v) => {
      if (!vocab.some((existing) => existing.word.toLowerCase() === v.word.toLowerCase())) {
        vocab.push({
          word: v.word.trim(),
          meaning: v.meaning,
          example: v.example,
        });
      }
    });
  }

  const topic = profile.topic || 'English Communication';
  const unitTitle = profile.title || `Unit ${profile.unitNumber}`;

  return {
    unitId: profile.unitId,
    unitTitle,
    topic,
    vocab,
  };
}

/**
 * Child-friendly fallback vocabulary connected to daily life and school
 */
const DEFAULT_WORDS: UnitWordItem[] = [
  { word: 'smart house', meaning: 'ngôi nhà thông minh', example: 'We will live in a comfortable smart house.' },
  { word: 'solar panel', meaning: 'tấm pin mặt trời', example: 'Solar panels provide clean energy.' },
  { word: 'garden', meaning: 'khu vườn', example: 'There are many green trees in the garden.' },
  { word: 'computer room', meaning: 'phòng máy tính', example: 'Students practice in the computer room.' },
  { word: 'sports ground', meaning: 'sân thể thao', example: 'We play badminton on the sports ground.' },
  { word: 'library', meaning: 'thư viện', example: 'The school library is quiet and bright.' },
];

/**
 * Main Question Generator for CLC Grammar Mode
 */
export function generateClcQuestions(config: ClcSessionConfig): ClcQuestion[] {
  let profile = getUnitCurriculumProfile(config.unitId);
  if (!profile) {
    profile = ALL_CURRICULUM_PROFILES['GS5-U20'] || Object.values(ALL_CURRICULUM_PROFILES)[0];
  }

  const ctx = extractUnitContext(profile);
  const words = ctx.vocab.length >= 3 ? ctx.vocab : [...ctx.vocab, ...DEFAULT_WORDS];

  // Determine active categories: prioritize user-requested core grammar categories
  let activeCategories: ClcGrammarCategoryId[];
  if (config.selectedCategories && config.selectedCategories.length > 0) {
    activeCategories = config.selectedCategories;
  } else {
    // Default full mode: use prioritized categories sequence
    activeCategories = CLC_PRIORITIZED_CATEGORIES;
  }

  // Filter by stage if requested
  if (config.stageFilter && config.stageFilter !== 'all') {
    const targetStage = config.stageFilter;
    const stageCats = CLC_GRAMMAR_CATEGORIES.filter((c) => c.stage === targetStage).map((c) => c.id);
    activeCategories = activeCategories.filter((catId) => stageCats.includes(catId));
    if (activeCategories.length === 0) {
      activeCategories = stageCats;
    }
  }

  const pool: ClcQuestion[] = [];
  let questionSeed = 1;

  // Include curated questions from the structured unit lesson
  const unitLesson = getClcLessonForUnit(config.unitId);
  if (unitLesson) {
    const curatedQuestions = [
      ...unitLesson.practiceQuestions,
      ...unitLesson.challengeQuestions,
      ...unitLesson.reviewQuestions,
    ].filter((q) => activeCategories.includes(q.grammarCategory));
    pool.push(...curatedQuestions);
  }

  // Generate dynamic questions per category connected to unit vocab words
  for (const catId of activeCategories) {
    const catInfo = CLC_GRAMMAR_CATEGORIES.find((c) => c.id === catId);
    const stage = catInfo?.stage || 1;

    const questionsForCategory = createQuestionsForCategory(
      catId,
      stage,
      ctx,
      words,
      questionSeed
    );

    pool.push(...questionsForCategory);
    questionSeed += questionsForCategory.length;
  }

  // Generate dedicated sentence transformations and identical-meaning questions (Prompt 19)
  const unitTransformations = generateUnitSentenceTransformations(ctx, words, questionSeed);
  const activeTransformations =
    config.mode === 'mixed_review'
      ? unitTransformations
      : unitTransformations.filter((q) => activeCategories.includes(q.grammarCategory));
  pool.push(...activeTransformations);
  questionSeed += unitTransformations.length;

  // Generate dedicated short reading-and-grammar questions (Prompt 20)
  const unitReadings = generateUnitReadingQuestions(ctx, words, questionSeed);
  const activeReadings =
    config.mode === 'mixed_review'
      ? unitReadings
      : unitReadings.filter((q) => activeCategories.includes(q.grammarCategory));
  pool.push(...activeReadings);
  questionSeed += unitReadings.length;

  // Generate dedicated word order (sentence scramble) questions (Prompt 21)
  const unitWordOrders = generateUnitWordOrderQuestions(ctx, words, questionSeed);
  const activeWordOrders =
    config.mode === 'mixed_review'
      ? unitWordOrders
      : unitWordOrders.filter((q) => activeCategories.includes(q.grammarCategory));
  pool.push(...activeWordOrders);
  questionSeed += unitWordOrders.length;

  // Generate dedicated error correction questions (Prompt 21)
  const unitErrorCorrections = generateUnitErrorCorrectionQuestions(ctx, words, questionSeed);
  const activeErrorCorrections =
    config.mode === 'mixed_review'
      ? unitErrorCorrections
      : unitErrorCorrections.filter((q) => activeCategories.includes(q.grammarCategory));
  pool.push(...activeErrorCorrections);
  questionSeed += unitErrorCorrections.length;

  const targetCount = config.questionCount || 20;

  let selected: ClcQuestion[] = [];

  if (config.mode === 'mixed_review') {
    // Mixed Review Mode combining all 8 CLC skills (Prompt 21)
    selected = sampleMixedReviewBatch(pool, targetCount, config.stageFilter);
  } else if (config.stageFilter && config.stageFilter !== 'all') {
    // Single stage requested
    const targetPool = pool.filter((q) => q.stage === config.stageFilter);
    selected = sampleStageBalancedBatch(targetPool, targetCount);
  } else {
    // Standard Mode:
    // Difficulty rule:
    // ≈ 70% accessible Grade 5–6 extension (Stage 1 + Stage 2) + 30% Grade 6–7 challenge (Stage 3)
    const stage1Questions = pool.filter((q) => q.stage === 1);
    const stage2Questions = pool.filter((q) => q.stage === 2);
    const stage3Questions = pool.filter((q) => q.stage === 3);

    const countStage1 = Math.round(targetCount * 0.40);
    const countStage2 = Math.round(targetCount * 0.30);
    const countStage3 = targetCount - countStage1 - countStage2;

    const result: ClcQuestion[] = [];
    result.push(...sampleStageBalancedBatch(stage1Questions, countStage1));
    result.push(...sampleStageBalancedBatch(stage2Questions, countStage2));
    result.push(...sampleStageBalancedBatch(stage3Questions, countStage3));

    // If any stage bucket was short, fill from remaining distinct questions in pool
    if (result.length < targetCount) {
      const remaining = pool.filter((q) => !result.some((r) => r.id === q.id));
      shuffleArray(remaining);
      result.push(...remaining.slice(0, targetCount - result.length));
    }
    selected = result.slice(0, targetCount);
  }

  // Run rigorous language proofreading, option validation, and balanced A/B/C/D answer distribution
  return processAndValidateClcQuestions(selected, pool);
}

export type ClcMixedSkill =
  | 'grammar_multiple_choice'
  | 'sentence_completion'
  | 'sentence_transformation'
  | 'meaning_matching'
  | 'short_reading'
  | 'error_correction'
  | 'word_order'
  | 'practical_situations';

export const CLC_MIXED_SKILLS_INFO: Record<
  ClcMixedSkill,
  { label: string; labelVi: string; icon: string; descriptionVi: string }
> = {
  grammar_multiple_choice: {
    label: 'Grammar Multiple Choice',
    labelVi: 'Trắc nghiệm Ngữ pháp',
    icon: '🔠',
    descriptionVi: 'Kiểm tra quy tắc ngữ pháp cốt lõi: thì, trợ động từ, mạo từ, giới từ, liên từ.',
  },
  sentence_completion: {
    label: 'Sentence Completion',
    labelVi: 'Hoàn thành câu theo ngữ cảnh',
    icon: '✍️',
    descriptionVi: 'Điền từ/cụm từ phù hợp vào chỗ trống dựa trên dấu hiệu ngữ cảnh câu.',
  },
  sentence_transformation: {
    label: 'Sentence Transformation',
    labelVi: 'Viết lại câu tương đương',
    icon: '🔄',
    descriptionVi: 'Chuyển đổi cấu trúc câu giữ nguyên ý nghĩa (because -> so, why don\'t we -> how about...).',
  },
  meaning_matching: {
    label: 'Meaning Matching',
    labelVi: 'Tìm câu đồng nghĩa',
    icon: '🎯',
    descriptionVi: 'Chọn câu có ý nghĩa gần nhất hoặc tương đương với câu đã cho.',
  },
  short_reading: {
    label: 'Short Reading Comprehension',
    labelVi: 'Đọc hiểu đoạn văn ngắn (3–5 câu)',
    icon: '📖',
    descriptionVi: 'Đoạn văn ngắn 3–5 câu theo chủ đề Unit kèm 1 câu hỏi có căn cứ trực tiếp.',
  },
  error_correction: {
    label: 'Error Correction',
    labelVi: 'Tìm lỗi sai ngữ pháp',
    icon: '🔍',
    descriptionVi: 'Xác định phần gạch chân chứa đúng 1 lỗi sai ngữ pháp duy nhất.',
  },
  word_order: {
    label: 'Word Order / Sentence Scramble',
    labelVi: 'Sắp xếp trật tự từ',
    icon: '🔀',
    descriptionVi: 'Sắp xếp các từ xáo trộn để tạo thành câu hoàn chỉnh đúng ngữ pháp.',
  },
  practical_situations: {
    label: 'Practical Everyday Situations',
    labelVi: 'Tình huống thực tế đời sống',
    icon: '💬',
    descriptionVi: 'Hội thoại, biển báo, nội quy trường lớp, chỉ đường và giao tiếp đời sống.',
  },
};

/**
 * Classifies any CLC question into one of the 8 canonical mixed skills (Prompt 21).
 */
export function classifyQuestionSkill(q: ClcQuestion): ClcMixedSkill {
  if (q.format === 'sentence_scramble') {
    return 'word_order';
  }
  if (Boolean(q.promptContext)) {
    return 'short_reading';
  }
  if (q.format === 'error_identification') {
    return 'error_correction';
  }
  if (q.format === 'sentence_transformation') {
    const title = q.grammarRuleTitle.toLowerCase();
    const inst = q.instruction.toLowerCase();
    if (
      title.includes('meaning') ||
      title.includes('equivalence') ||
      inst.includes('closest meaning') ||
      inst.includes('identical meaning') ||
      title.includes('equality') ||
      title.includes('preference')
    ) {
      return 'meaning_matching';
    }
    return 'sentence_transformation';
  }

  // format === 'multiple_choice'
  const prompt = q.promptText.toLowerCase();
  const inst = q.instruction.toLowerCase();
  const rule = q.grammarRuleTitle.toLowerCase();

  if (
    prompt.includes(':') ||
    inst.includes('situation') ||
    inst.includes('dialogue') ||
    rule.includes('situation') ||
    rule.includes('advice') ||
    rule.includes('rule') ||
    rule.includes('request') ||
    rule.includes('direction') ||
    rule.includes('modal')
  ) {
    return 'practical_situations';
  }

  if (
    prompt.includes('...') ||
    prompt.includes('___') ||
    inst.includes('complete') ||
    inst.includes('fill')
  ) {
    return 'sentence_completion';
  }

  return 'grammar_multiple_choice';
}

/**
 * Samples a balanced question batch for Prompt 21 (Mixed Review Mode):
 * Guaranteed representation across all 8 CLC skills:
 * 1. grammar multiple choice
 * 2. sentence completion
 * 3. sentence transformation
 * 4. meaning matching
 * 5. short reading comprehension
 * 6. error correction
 * 7. word order (sentence scramble)
 * 8. practical everyday situations
 *
 * Enforces difficulty rule:
 * ≈ 70% accessible Grade 5–6 extension (Stage 1: ~40%, Stage 2: ~30%) + 30% Grade 6–7 challenge (Stage 3).
 * Exactly ONE correct answer per question.
 */
function sampleMixedReviewBatch(
  pool: ClcQuestion[],
  targetCount: number,
  stageFilter?: ClcStage | 'all'
): ClcQuestion[] {
  const eligiblePool =
    stageFilter && stageFilter !== 'all'
      ? pool.filter((q) => q.stage === stageFilter)
      : pool;

  const ALL_SKILLS: ClcMixedSkill[] = [
    'grammar_multiple_choice',
    'sentence_completion',
    'sentence_transformation',
    'meaning_matching',
    'short_reading',
    'error_correction',
    'word_order',
    'practical_situations',
  ];

  // Group pool by skill
  const bySkill: Record<ClcMixedSkill, ClcQuestion[]> = {
    grammar_multiple_choice: [],
    sentence_completion: [],
    sentence_transformation: [],
    meaning_matching: [],
    short_reading: [],
    error_correction: [],
    word_order: [],
    practical_situations: [],
  };

  eligiblePool.forEach((q) => {
    const skill = classifyQuestionSkill(q);
    bySkill[skill].push(q);
  });

  ALL_SKILLS.forEach((skill) => {
    shuffleArray(bySkill[skill]);
  });

  // Calculate target stage distribution:
  // 70% accessible (Stage 1: ~40%, Stage 2: ~30%) + 30% challenge (Stage 3)
  const isFilterActive = stageFilter && stageFilter !== 'all';
  const targetStage1 = isFilterActive ? (stageFilter === 1 ? targetCount : 0) : Math.round(targetCount * 0.40);
  const targetStage2 = isFilterActive ? (stageFilter === 2 ? targetCount : 0) : Math.round(targetCount * 0.30);
  const targetStage3 = isFilterActive ? (stageFilter === 3 ? targetCount : 0) : (targetCount - targetStage1 - targetStage2);

  // Quotas per skill:
  // Ensure every skill gets representation
  const basePerSkill = Math.max(1, Math.floor(targetCount / ALL_SKILLS.length));
  const remainder = targetCount - basePerSkill * ALL_SKILLS.length;
  const quotas: Record<ClcMixedSkill, number> = {} as any;
  ALL_SKILLS.forEach((sk, idx) => {
    quotas[sk] = basePerSkill + (idx < remainder ? 1 : 0);
  });

  const selected: ClcQuestion[] = [];
  const selectedIds = new Set<string>();

  let currentStage1 = 0;
  let currentStage2 = 0;
  let currentStage3 = 0;

  // Pass 1: Select up to quota for each skill with stage awareness
  for (const skill of ALL_SKILLS) {
    const quota = quotas[skill];
    const candidates = bySkill[skill];

    let pickedForSkill = 0;

    // Filter/prioritize candidates based on current stage needs:
    // If targetStage3 is already met, prioritize accessible (stage 1 & 2)
    candidates.sort((a, b) => {
      const needStage3 = currentStage3 < targetStage3;
      const needAccessible = currentStage1 + currentStage2 < targetStage1 + targetStage2;

      const aIsStage3 = a.stage === 3;
      const bIsStage3 = b.stage === 3;

      if (needStage3 && !needAccessible) {
        return (bIsStage3 ? 1 : 0) - (aIsStage3 ? 1 : 0);
      }
      if (!needStage3 && needAccessible) {
        return (!bIsStage3 ? 1 : 0) - (!aIsStage3 ? 1 : 0);
      }

      // Both needed: balance stage 1 & 2
      const needS1 = currentStage1 < targetStage1;
      const needS2 = currentStage2 < targetStage2;
      const scoreA =
        (a.stage === 1 && needS1 ? 2 : 0) +
        (a.stage === 2 && needS2 ? 2 : 0) +
        (a.stage === 3 && needStage3 ? 1 : 0);
      const scoreB =
        (b.stage === 1 && needS1 ? 2 : 0) +
        (b.stage === 2 && needS2 ? 2 : 0) +
        (b.stage === 3 && needStage3 ? 1 : 0);
      return scoreB - scoreA;
    });

    for (const q of candidates) {
      if (pickedForSkill >= quota) break;
      if (!selectedIds.has(q.id)) {
        // If stage 3 is full and accessible is still needed, don't take stage 3 if an accessible exists
        if (
          !isFilterActive &&
          q.stage === 3 &&
          currentStage3 >= targetStage3 &&
          currentStage1 + currentStage2 < targetStage1 + targetStage2
        ) {
          const hasAccessible = candidates.some((c) => !selectedIds.has(c.id) && c.stage !== 3);
          if (hasAccessible) continue;
        }

        selected.push(q);
        selectedIds.add(q.id);
        pickedForSkill++;
        if (q.stage === 1) currentStage1++;
        else if (q.stage === 2) currentStage2++;
        else currentStage3++;
      }
    }
  }

  // Pass 2: Fill any remaining slots to reach targetCount exactly
  if (selected.length < targetCount) {
    const remaining = eligiblePool.filter((q) => !selectedIds.has(q.id));
    shuffleArray(remaining);

    remaining.sort((a, b) => {
      const needStage3 = currentStage3 < targetStage3;
      const needAccessible = currentStage1 + currentStage2 < targetStage1 + targetStage2;

      if (!needStage3 && needAccessible) {
        return (b.stage !== 3 ? 1 : 0) - (a.stage !== 3 ? 1 : 0);
      }
      if (needStage3 && !needAccessible) {
        return (b.stage === 3 ? 1 : 0) - (a.stage === 3 ? 1 : 0);
      }
      return 0;
    });

    for (const q of remaining) {
      if (selected.length >= targetCount) break;
      if (
        !isFilterActive &&
        q.stage === 3 &&
        currentStage3 >= targetStage3 &&
        currentStage1 + currentStage2 < targetStage1 + targetStage2
      ) {
        const hasAccessible = remaining.some((c) => !selectedIds.has(c.id) && c.stage !== 3);
        if (hasAccessible) continue;
      }
      selected.push(q);
      selectedIds.add(q.id);
      if (q.stage === 1) currentStage1++;
      else if (q.stage === 2) currentStage2++;
      else currentStage3++;
    }
  }

  shuffleArray(selected);
  return selected.slice(0, targetCount);
}

/**
 * Samples a balanced question batch for a stage, ensuring varied sentence transformations (Prompt 19)
 * and short reading-and-grammar questions (Prompt 20) are well-represented alongside standard questions.
 */
function sampleStageBalancedBatch(
  stageQuestions: ClcQuestion[],
  count: number
): ClcQuestion[] {
  if (stageQuestions.length <= count) {
    const copy = [...stageQuestions];
    shuffleArray(copy);
    return copy;
  }

  const readings = stageQuestions.filter((q) => Boolean(q.promptContext));
  const scrambles = stageQuestions.filter((q) => q.format === 'sentence_scramble');
  const errors = stageQuestions.filter((q) => q.format === 'error_identification');
  const transformations = stageQuestions.filter(
    (q) => !q.promptContext && q.format === 'sentence_transformation'
  );
  const standards = stageQuestions.filter(
    (q) =>
      !q.promptContext &&
      q.format !== 'sentence_transformation' &&
      q.format !== 'sentence_scramble' &&
      q.format !== 'error_identification'
  );

  shuffleArray(readings);
  shuffleArray(transformations);
  shuffleArray(scrambles);
  shuffleArray(errors);
  shuffleArray(standards);

  // Target quotas per batch:
  const desiredReadCount = Math.max(1, Math.round(count * 0.20));
  const desiredTransCount = Math.max(1, Math.round(count * 0.20));
  const desiredScrambleCount = Math.max(1, Math.round(count * 0.15));
  const desiredErrorCount = Math.max(1, Math.round(count * 0.15));

  const actualReadCount = Math.min(desiredReadCount, readings.length);
  const actualTransCount = Math.min(desiredTransCount, transformations.length);
  const actualScrambleCount = Math.min(desiredScrambleCount, scrambles.length);
  const actualErrorCount = Math.min(desiredErrorCount, errors.length);
  const actualStdCount = Math.max(
    0,
    count - actualReadCount - actualTransCount - actualScrambleCount - actualErrorCount
  );

  const picked: ClcQuestion[] = [];
  picked.push(...readings.slice(0, actualReadCount));
  picked.push(...transformations.slice(0, actualTransCount));
  picked.push(...scrambles.slice(0, actualScrambleCount));
  picked.push(...errors.slice(0, actualErrorCount));
  picked.push(...standards.slice(0, actualStdCount));

  if (picked.length < count) {
    const remaining = stageQuestions.filter((q) => !picked.some((p) => p.id === q.id));
    shuffleArray(remaining);
    picked.push(...remaining.slice(0, count - picked.length));
  }

  shuffleArray(picked);
  return picked;
}

/**
 * Creates dedicated, accessible, child-friendly CLC questions for a given grammar category.
 * Grounded in familiar situations (school, family, friends, daily routines, hobbies, hometown).
 */
function createQuestionsForCategory(
  catId: ClcGrammarCategoryId,
  stage: ClcStage,
  ctx: { unitId: string; unitTitle: string; topic: string },
  words: UnitWordItem[],
  baseIndex: number
): ClcQuestion[] {
  const w1Raw = words[0]?.word || 'house';
  const w2Raw = words[1]?.word || 'garden';
  const w3Raw = words[2]?.word || 'library';
  const w4Raw = words[3]?.word || 'computer';
  const w5Raw = words[4]?.word || 'park';

  // Safe singular and plural forms
  const w1 = toSafeSingular(w1Raw);
  const w1Plural = toSafePlural(w1Raw);
  const w2 = toSafeSingular(w2Raw);
  const w2Plural = toSafePlural(w2Raw);
  const w3 = toSafeSingular(w3Raw);
  const w4 = toSafeSingular(w4Raw);
  const w5 = toSafeSingular(w5Raw);

  const questions: ClcQuestion[] = [];

  switch (catId) {
    case 'present_simple_continuous': {
      // Q1: Routine (usually) vs. Right now (at the moment)
      questions.push({
        id: `clc_prs_cont_${baseIndex}_1`,
        grammarCategory: 'present_simple_continuous',
        stage: 1,
        gradeLevel: 'Grade 5 Review',
        format: 'multiple_choice',
        grammarRuleTitle: 'Habitual Action vs. Action Happening Right Now',
        grammarNote: 'Present Simple indicates routines (usually, every day). Present Continuous indicates actions happening now (at the moment, now, Look!).',
        instruction: 'Choose the correct forms of the verbs:',
        promptText: `Alex usually _____ to school by bicycle, but this morning he _____ by bus with his sister.`,
        options: [
          { id: 'opt_a', text: 'goes / is traveling', label: 'A' },
          { id: 'opt_b', text: 'is going / travels', label: 'B' },
          { id: 'opt_c', text: 'go / is traveling', label: 'C' },
          { id: 'opt_d', text: 'goes / travels', label: 'D' },
        ],
        correctAnswer: 'opt_a',
        explanation: '"Usually" triggers Present Simple singular ("goes"). "This morning" indicates a temporary action happening today ("is traveling").',
        grammarTipVi: 'Dấu hiệu "usually" chỉ thói quen chia Hiện tại đơn (Alex goes); "this morning" chỉ hành động tạm thời chia Hiện tại tiếp diễn (is traveling).',
        unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: w1 },
        difficultyScore: 5,
      });

      // Q2: Error identification with stative verbs (want, like, need)
      questions.push({
        id: `clc_prs_cont_${baseIndex}_2`,
        grammarCategory: 'present_simple_continuous',
        stage: 1,
        gradeLevel: 'Grade 5 Review',
        format: 'error_identification',
        grammarRuleTitle: 'Stative Verbs (want, like, need) in Present Tense',
        grammarNote: 'Verbs of feeling and desire (like, love, want, need) are not used in continuous forms.',
        instruction: 'Find the underlined part (A, B, C, or D) that contains an error:',
        promptText: `Look at the children! They are playing (A) happily in the ${w2} (B) and are wanting (C) to build a small treehouse (D).`,
        options: [
          { id: 'opt_a', text: 'are playing', label: 'A' },
          { id: 'opt_b', text: 'in the ' + w2, label: 'B' },
          { id: 'opt_c', text: 'are wanting', label: 'C', isMistakePart: true, correctedPart: 'want' },
          { id: 'opt_d', text: 'to build a small treehouse', label: 'D' },
        ],
        correctAnswer: 'opt_c',
        explanation: '"Want" is a stative verb and cannot be used in continuous tense. Sửa "are wanting" thành "want".',
        grammarTipVi: 'Động từ chỉ ý muốn như "want", "like", "need" không chia ở thì tiếp diễn. Sửa "are wanting" thành "want".',
        unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: w2 },
        difficultyScore: 6,
      });

      // Q3: Short reading context with clear clues
      questions.push({
        id: `clc_prs_cont_${baseIndex}_3`,
        grammarCategory: 'present_simple_continuous',
        stage: 2,
        gradeLevel: 'Grade 6 Extension',
        format: 'multiple_choice',
        grammarRuleTitle: 'Reading Context: Present Simple vs. Continuous',
        grammarNote: 'Look for time signal clues in the reading context.',
        instruction: 'Read the short context and complete the answer:',
        promptContext: `Hoa usually helps her mother cook dinner at seven o'clock. Right now, it is seven o'clock and Hoa is in the kitchen with her mother.`,
        promptText: `What is Hoa doing right now? — She _____ dinner with her mother.`,
        options: [
          { id: 'opt_a', text: 'is cooking', label: 'A' },
          { id: 'opt_b', text: 'cooks', label: 'B' },
          { id: 'opt_c', text: 'cooked', label: 'C' },
          { id: 'opt_d', text: 'cook', label: 'D' },
        ],
        correctAnswer: 'opt_a',
        explanation: '"Right now" is a clear signal that the action is happening at the moment of speaking, requiring "is cooking".',
        grammarTipVi: 'Đoạn văn có dấu hiệu rõ ràng "Right now" chỉ hành động đang diễn ra lúc này, vì vậy chọn "is cooking".',
        unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: w1 },
        difficultyScore: 5,
      });

      // Q4: Sentence transformation: Habitual routine vs. Temporary action today (Prompt 19)
      questions.push({
        id: `clc_prs_cont_${baseIndex}_4`,
        grammarCategory: 'present_simple_continuous',
        stage: 2,
        gradeLevel: 'Grade 6 Extension',
        format: 'sentence_transformation',
        grammarRuleTitle: 'Transformation: Habitual Routine vs. Temporary Action Today',
        grammarNote: 'Present Simple expresses daily habits; Present Continuous expresses actions happening today.',
        instruction: 'Choose the sentence that has the closest meaning to the given sentence:',
        promptText: `Alex usually walks to school on Mondays, but today he is taking the bus.`,
        options: [
          { id: 'opt_a', text: `Today, Alex is going to school by bus instead of walking as usual.`, label: 'A' },
          { id: 'opt_b', text: `Alex always takes the bus to school and never walks.`, label: 'B' },
          { id: 'opt_c', text: `Alex usually takes the bus to school every Monday morning.`, label: 'C' },
          { id: 'opt_d', text: `Alex is walking to school today because the bus is late.`, label: 'D' },
        ],
        correctAnswer: 'opt_a',
        explanation: 'Alex usually walks, but today he travels by bus. The closest meaning is that he goes by bus instead of walking as usual.',
        grammarTipVi: 'Dạng viết lại câu chỉ sự thay đổi thói quen: "instead of walking as usual" (thay vì đi bộ như thường lệ).',
        unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: w1 },
        difficultyScore: 5,
      });
      break;
    }

    case 'past_simple': {
      // Q1: Regular & Irregular past tense with didn't
      questions.push({
        id: `clc_past_${baseIndex}_1`,
        grammarCategory: 'past_simple',
        stage: 1,
        gradeLevel: 'Grade 5 Review',
        format: 'multiple_choice',
        grammarRuleTitle: 'Past Simple: Affirmative & Negative with didn\'t',
        grammarNote: 'Use past form (V2/ed) in positive sentences. In negative sentences, use didn\'t + bare infinitive.',
        instruction: 'Select the correct option to fill in the blanks:',
        promptText: `Yesterday, our teacher _____ us a fascinating story about the new ${w1}, but she _____ give us any homework.`,
        options: [
          { id: 'opt_a', text: 'told / didn\'t', label: 'A' },
          { id: 'opt_b', text: 'tells / didn\'t', label: 'B' },
          { id: 'opt_c', text: 'told / doesn\'t', label: 'C' },
          { id: 'opt_d', text: 'tell / didn\'t', label: 'D' },
        ],
        correctAnswer: 'opt_a',
        explanation: 'Past tense requires irregular past "told". The negative auxiliary for past simple is "didn\'t".',
        grammarTipVi: 'Dấu hiệu "Yesterday" đòi hỏi động từ quá khứ "told" và trợ động từ phủ định quá khứ "didn\'t".',
        unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: w1 },
        difficultyScore: 5,
      });

      // Q2: Common irregular verbs in familiar context
      questions.push({
        id: `clc_past_${baseIndex}_2`,
        grammarCategory: 'past_simple',
        stage: 1,
        gradeLevel: 'Grade 5 Review',
        format: 'multiple_choice',
        grammarRuleTitle: 'Common Irregular Past Verbs (buy -> bought, see -> saw)',
        grammarNote: 'Irregular verbs change their spelling in the past: buy -> bought, see -> saw, find -> found.',
        instruction: 'Choose the correct past forms to complete the sentence:',
        promptText: `Last Saturday, Nam _____ a model plane and _____ it to his classmates in the school yard.`,
        options: [
          { id: 'opt_a', text: 'bought / showed', label: 'A' },
          { id: 'opt_b', text: 'buyed / showed', label: 'B' },
          { id: 'opt_c', text: 'bought / shown', label: 'C' },
          { id: 'opt_d', text: 'buy / show', label: 'D' },
        ],
        correctAnswer: 'opt_a',
        explanation: 'The past form of buy is "bought". "Show" is a regular verb with past form "showed".',
        grammarTipVi: 'Động từ bất quy tắc: buy -> bought (không có buyed). Show là động từ có quy tắc -> showed.',
        unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: w2 },
        difficultyScore: 5,
      });

      // Q3: Short reading context with clear clues
      questions.push({
        id: `clc_past_${baseIndex}_3`,
        grammarCategory: 'past_simple',
        stage: 2,
        gradeLevel: 'Grade 6 Extension',
        format: 'multiple_choice',
        grammarRuleTitle: 'Reading Context: Past Simple Events',
        grammarNote: 'Identify completed past events using clear time markers.',
        instruction: 'Read the short context and complete the sentence:',
        promptContext: `Last Sunday was warm and sunny. Mai and her brother went to the supermarket. They bought two boxes of biscuits and some fresh fruit for their grandparents.`,
        promptText: `What did Mai and her brother buy? — They _____ biscuits and fresh fruit.`,
        options: [
          { id: 'opt_a', text: 'bought', label: 'A' },
          { id: 'opt_b', text: 'buys', label: 'B' },
          { id: 'opt_c', text: 'are buying', label: 'C' },
          { id: 'opt_d', text: 'will buy', label: 'D' },
        ],
        correctAnswer: 'opt_a',
        explanation: 'The question asks in the past simple ("What did... buy?"), so the answer uses past tense "bought".',
        grammarTipVi: 'Câu hỏi ở thì quá khứ "What did... buy?" nên câu trả lời dùng dạng quá khứ của động từ: "bought".',
        unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: w3 },
        difficultyScore: 5,
      });

      // Q4: Sentence transformation: The last time ... was ... ago ↔ last + V ... ago (Prompt 19)
      questions.push({
        id: `clc_past_${baseIndex}_4`,
        grammarCategory: 'past_simple',
        stage: 2,
        gradeLevel: 'Grade 6 Extension',
        format: 'sentence_transformation',
        grammarRuleTitle: 'Transformation: The last time S + V was [time] ago ↔ S last + V [time] ago',
        grammarNote: 'The last time we visited X was two years ago = We last visited X two years ago.',
        instruction: 'Choose the sentence that has the closest meaning to the given sentence:',
        promptText: `The last time our family visited Ha Long Bay was two years ago.`,
        options: [
          { id: 'opt_a', text: `Our family last visited Ha Long Bay two years ago.`, label: 'A' },
          { id: 'opt_b', text: `Our family has visited Ha Long Bay for two years.`, label: 'B' },
          { id: 'opt_c', text: `Our family will visit Ha Long Bay in two years.`, label: 'C' },
          { id: 'opt_d', text: `Our family visits Ha Long Bay every two years.`, label: 'D' },
        ],
        correctAnswer: 'opt_a',
        explanation: '"The last time S + V was [time] ago" means "S last + V(past) [time] ago".',
        grammarTipVi: 'Dạng bài viết lại thì quá khứ: "The last time S + V was + time + ago" = "S + last + V(quá khứ) + time + ago".',
        unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: w1 },
        difficultyScore: 5,
      });
      break;
    }

    case 'future_will_going_to': {
      // Q1: Visual evidence (be going to) vs Spontaneous / Prediction (will)
      questions.push({
        id: `clc_fut_${baseIndex}_1`,
        grammarCategory: 'future_will_going_to',
        stage: 2,
        gradeLevel: 'Grade 6 Extension',
        format: 'multiple_choice',
        grammarRuleTitle: 'Prediction with will vs. Clear Evidence with be going to',
        grammarNote: 'Use "be going to" when there is clear present evidence (e.g. Look at the clouds!). Use "will" after "I think / I hope".',
        instruction: 'Choose the best future forms according to the clues:',
        promptText: `Look at those dark clouds! It _____ rain soon. I think we _____ pack our bags quickly.`,
        options: [
          { id: 'opt_a', text: 'is going to / will', label: 'A' },
          { id: 'opt_b', text: 'will / are going to', label: 'B' },
          { id: 'opt_c', text: 'is going to / are going to', label: 'C' },
          { id: 'opt_d', text: 'will / will', label: 'D' },
        ],
        correctAnswer: 'opt_a',
        explanation: '"Look at those dark clouds" provides visible evidence -> "is going to rain". "I think..." expresses an instant opinion -> "will pack".',
        grammarTipVi: 'Dấu hiệu nhìn thấy trước (dark clouds) dùng "is going to"; phỏng đoán sau "I think" dùng "will".',
        unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: w1 },
        difficultyScore: 6,
      });

      // Q2: Simple sentence transformation (plan to <-> be going to)
      questions.push({
        id: `clc_fut_${baseIndex}_2`,
        grammarCategory: 'future_will_going_to',
        stage: 2,
        gradeLevel: 'Grade 6 Extension',
        format: 'sentence_transformation',
        grammarRuleTitle: 'Transformation: Plan to V <-> Be going to V',
        grammarNote: 'S + plan/intend to V = S + be going to + V.',
        instruction: 'Choose the sentence that has the identical meaning:',
        promptText: `My parents plan to plant many flowers in our new ${w2} next weekend.`,
        options: [
          { id: 'opt_a', text: `My parents are going to plant many flowers in our new ${w2} next weekend.`, label: 'A' },
          { id: 'opt_b', text: `My parents will planting many flowers in our new ${w2} next weekend.`, label: 'B' },
          { id: 'opt_c', text: `My parents planted many flowers in our new ${w2} next weekend.`, label: 'C' },
          { id: 'opt_d', text: `My parents are going plant many flowers in our new ${w2} next weekend.`, label: 'D' },
        ],
        correctAnswer: 'opt_a',
        explanation: '"plan to plant" transforms cleanly into "are going to plant" for plural subject "parents".',
        grammarTipVi: 'Cấu trúc viết lại câu: "S + plan to V" chuyển thành "S + be going to + V". Chú ý "parents" số nhiều dùng "are going to".',
        unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: w2 },
        difficultyScore: 6,
      });

      // Q3: Short reading context with clear clues
      questions.push({
        id: `clc_fut_${baseIndex}_3`,
        grammarCategory: 'future_will_going_to',
        stage: 2,
        gradeLevel: 'Grade 6 Extension',
        format: 'multiple_choice',
        grammarRuleTitle: 'Reading Context: Future Intentions',
        grammarNote: 'Decisions made before the moment of speaking use "be going to".',
        instruction: 'Read the short context and complete the sentence:',
        promptContext: `Minh has already bought his train ticket. He packed his clothes yesterday. Tomorrow morning, he travels to Da Nang.`,
        promptText: `Minh _____ visit Da Nang tomorrow.`,
        options: [
          { id: 'opt_a', text: 'is going to', label: 'A' },
          { id: 'opt_b', text: 'was', label: 'B' },
          { id: 'opt_c', text: 'did', label: 'C' },
          { id: 'opt_d', text: 'goes', label: 'D' },
        ],
        correctAnswer: 'opt_a',
        explanation: 'Minh already bought the ticket and prepared, so it is a definite planned intention -> "is going to".',
        grammarTipVi: 'Kế hoạch đã chuẩn bị sẵn vé và hành lý dùng thì tương lai gần "is going to".',
        unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: w3 },
        difficultyScore: 5,
      });
      break;
    }

    case 'modals_can_must_should': {
      // Q1: can, must, should distinction in daily school safety
      questions.push({
        id: `clc_modal_${baseIndex}_1`,
        grammarCategory: 'modals_can_must_should',
        stage: 2,
        gradeLevel: 'Grade 6 Extension',
        format: 'multiple_choice',
        grammarRuleTitle: 'Prohibition (mustn\'t) and Advice (should)',
        grammarNote: 'mustn\'t = strictly forbidden / dangerous. should = good advice.',
        instruction: 'Select the correct modal verbs for each clause:',
        promptText: `You _____ touch wet electrical switches; it is dangerous! You _____ ask an adult for help instead.`,
        options: [
          { id: 'opt_a', text: 'mustn\'t / should', label: 'A' },
          { id: 'opt_b', text: 'shouldn\'t / can', label: 'B' },
          { id: 'opt_c', text: 'can\'t / must', label: 'C' },
          { id: 'opt_d', text: 'don\'t have to / should', label: 'D' },
        ],
        correctAnswer: 'opt_a',
        explanation: '"dangerous" requires the prohibition "mustn\'t". The second clause gives helpful advice ("should").',
        grammarTipVi: 'Cấm làm điều nguy hiểm dùng "mustn\'t" (không được phép); lời khuyên nên làm gì dùng "should".',
        unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: w1 },
        difficultyScore: 6,
      });

      // Q2: Error identification with modal + V(bare)
      questions.push({
        id: `clc_modal_${baseIndex}_2`,
        grammarCategory: 'modals_can_must_should',
        stage: 2,
        gradeLevel: 'Grade 6 Extension',
        format: 'error_identification',
        grammarRuleTitle: 'Modal Verbs (can, must, should) + Bare Infinitive',
        grammarNote: 'After modals like can, must, should, always use the base verb without "to" or "-ing".',
        instruction: 'Find the underlined part (A, B, C, or D) that contains an error:',
        promptText: `Every student should (A) to keep (B) the classroom clean (C) and put trash in the bin (D).`,
        options: [
          { id: 'opt_a', text: 'should', label: 'A' },
          { id: 'opt_b', text: 'to keep', label: 'B', isMistakePart: true, correctedPart: 'keep' },
          { id: 'opt_c', text: 'the classroom clean', label: 'C' },
          { id: 'opt_d', text: 'put trash in the bin', label: 'D' },
        ],
        correctAnswer: 'opt_b',
        explanation: 'Modal verbs like "should" must be followed by bare infinitive without "to" (should keep).',
        grammarTipVi: 'Quy tắc cơ bản: Sau động từ khuyết thiếu (can, must, should) là động từ nguyên mẫu không "to" (sửa "to keep" thành "keep").',
        unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: w2 },
        difficultyScore: 5,
      });

      // Q3: Short reading context with clear clues
      questions.push({
        id: `clc_modal_${baseIndex}_3`,
        grammarCategory: 'modals_can_must_should',
        stage: 2,
        gradeLevel: 'Grade 6 Extension',
        format: 'multiple_choice',
        grammarRuleTitle: 'Reading Context: Library Rules with Modals',
        grammarNote: 'Identify obligations and permissions from short rules.',
        instruction: 'Read the short context and complete the sentence:',
        promptContext: `Library Rules:
1. Students must show their student cards at the desk.
2. Students must not bring food or drinks into the reading room.
3. Students can borrow up to three books for two weeks.`,
        promptText: `According to the rules, students _____ bring drinks into the reading room.`,
        options: [
          { id: 'opt_a', text: 'must not', label: 'A' },
          { id: 'opt_b', text: 'can', label: 'B' },
          { id: 'opt_c', text: 'should', label: 'C' },
          { id: 'opt_d', text: 'need', label: 'D' },
        ],
        correctAnswer: 'opt_a',
        explanation: 'Rule 2 explicitly says: "Students must not bring food or drinks into the reading room."',
        grammarTipVi: 'Nội quy số 2 nêu rõ ràng: "must not bring food or drinks", vì vậy đáp án chính xác là "must not".',
        unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: w3 },
        difficultyScore: 5,
      });

      // Q4: Sentence transformation: can ↔ be able to (Prompt 19)
      questions.push({
        id: `clc_modal_${baseIndex}_4`,
        grammarCategory: 'modals_can_must_should',
        stage: 1,
        gradeLevel: 'Grade 5 Review',
        format: 'sentence_transformation',
        grammarRuleTitle: 'Transformation: can ↔ be able to (Ability)',
        grammarNote: 'S + can + V(bare) = S + is/are/am able to + V(bare).',
        instruction: 'Choose the sentence that has the closest meaning to the given sentence:',
        promptText: `Nam can use the new ${w4} to design lovely cards.`,
        options: [
          { id: 'opt_a', text: `Nam is able to use the new ${w4} to design lovely cards.`, label: 'A' },
          { id: 'opt_b', text: `Nam must use the new ${w4} to design lovely cards.`, label: 'B' },
          { id: 'opt_c', text: `Nam should use the new ${w4} to design lovely cards.`, label: 'C' },
          { id: 'opt_d', text: `Nam was able to use the new ${w4} to design lovely cards yesterday.`, label: 'D' },
        ],
        correctAnswer: 'opt_a',
        explanation: '"can use" expresses present ability, which is equivalent to "is able to use".',
        grammarTipVi: 'Chuyển đổi câu chỉ khả năng: "S + can + V" = "S + be able to + V". Nam là số ít nên đi với "is able to".',
        unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: w4 },
        difficultyScore: 4,
      });

      // Q5: Sentence transformation: should / shouldn't advice (Prompt 19)
      questions.push({
        id: `clc_modal_${baseIndex}_5`,
        grammarCategory: 'modals_can_must_should',
        stage: 1,
        gradeLevel: 'Grade 5 Review',
        format: 'sentence_transformation',
        grammarRuleTitle: 'Transformation: It is a good idea to V ↔ should',
        grammarNote: 'It is a good idea for [someone] to V = [Someone] should + V(bare).',
        instruction: 'Choose the sentence that has the closest meaning to the given sentence:',
        promptText: `It is a good idea for you to read more books in the school ${w3}.`,
        options: [
          { id: 'opt_a', text: `You should read more books in the school ${w3}.`, label: 'A' },
          { id: 'opt_b', text: `You must not read books in the school ${w3}.`, label: 'B' },
          { id: 'opt_c', text: `You might read books in the school ${w3} next year.`, label: 'C' },
          { id: 'opt_d', text: `You shouldn\'t read books in the school ${w3}.`, label: 'D' },
        ],
        correctAnswer: 'opt_a',
        explanation: '"It is a good idea for you to V" expresses advice, rewritten as "You should + V".',
        grammarTipVi: 'Chuyển đổi lời khuyên: "It is a good idea for S to V" = "S + should + V".',
        unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: w3 },
        difficultyScore: 4,
      });
      break;
    }

    case 'comparatives_superlatives': {
      // Q1: Short vs. Long adjective comparatives
      questions.push({
        id: `clc_comp_${baseIndex}_1`,
        grammarCategory: 'comparatives_superlatives',
        stage: 2,
        gradeLevel: 'Grade 6 Extension',
        format: 'multiple_choice',
        grammarRuleTitle: 'Comparatives & Superlatives: Short and Long Adjectives',
        grammarNote: 'Short adjectives: adj-er than / the adj-est. Long adjectives: more adj than / the most adj. Irregular: good -> better -> the best.',
        instruction: 'Choose the correct comparative and superlative forms:',
        promptText: `The new school library is _____ than the old one, and it is also _____ place in our school.`,
        options: [
          { id: 'opt_a', text: 'quieter / the best', label: 'A' },
          { id: 'opt_b', text: 'more quiet / best', label: 'B' },
          { id: 'opt_c', text: 'quiet / the better', label: 'C' },
          { id: 'opt_d', text: 'quietest / good', label: 'D' },
        ],
        correctAnswer: 'opt_a',
        explanation: '"quiet" takes comparative "quieter". The superlative of "good" is "the best".',
        grammarTipVi: '"quiet" có dạng so sánh hơn là "quieter". So sánh nhất của "good" là "the best".',
        unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: w3 },
        difficultyScore: 6,
      });

      // Q2: Simple sentence transformation (No one is... than -> the -est)
      questions.push({
        id: `clc_comp_${baseIndex}_2`,
        grammarCategory: 'comparatives_superlatives',
        stage: 2,
        gradeLevel: 'Grade 6 Extension',
        format: 'sentence_transformation',
        grammarRuleTitle: 'Transformation: Comparative <-> Superlative',
        grammarNote: 'No one in [group] is [adj-er] than X = X is the [adj-est] in [group].',
        instruction: 'Select the sentence that has the same meaning:',
        promptText: `No student in class 5A is taller than Minh.`,
        options: [
          { id: 'opt_a', text: `Minh is the tallest student in class 5A.`, label: 'A' },
          { id: 'opt_b', text: `Minh is more tall than any student in class 5A.`, label: 'B' },
          { id: 'opt_c', text: `Class 5A has no taller student than nobody.`, label: 'C' },
          { id: 'opt_d', text: `Minh is as tall as other students in class 5A.`, label: 'D' },
        ],
        correctAnswer: 'opt_a',
        explanation: '"No student is taller than Minh" means "Minh is the tallest student in class 5A".',
        grammarTipVi: 'Dạng bài viết lại câu so sánh quen thuộc thi CLC: "Không ai cao hơn Minh" = "Minh là học sinh cao nhất lớp".',
        unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: w1 },
        difficultyScore: 6,
      });

      // Q3: Short reading context with clear clues
      questions.push({
        id: `clc_comp_${baseIndex}_3`,
        grammarCategory: 'comparatives_superlatives',
        stage: 2,
        gradeLevel: 'Grade 6 Extension',
        format: 'multiple_choice',
        grammarRuleTitle: 'Reading Context: Comparing Objects with Clear Clues',
        grammarNote: 'Compare numbers and prices from the passage.',
        instruction: 'Read the short context and complete the sentence:',
        promptContext: `Tom has three pets:
- Snowy the rabbit weighs 2 kilograms.
- Mimi the cat weighs 4 kilograms.
- Lucky the dog weighs 12 kilograms.`,
        promptText: `Lucky the dog is _____ of the three pets.`,
        options: [
          { id: 'opt_a', text: 'the heaviest', label: 'A' },
          { id: 'opt_b', text: 'heavier', label: 'B' },
          { id: 'opt_c', text: 'heavy', label: 'C' },
          { id: 'opt_d', text: 'the most heavy', label: 'D' },
        ],
        correctAnswer: 'opt_a',
        explanation: 'Comparing all three pets (2kg, 4kg, 12kg), Lucky weighs the most, so he is "the heaviest".',
        grammarTipVi: 'So sánh giữa 3 con vật, Lucky nặng 12kg (nặng nhất) -> dùng so sánh nhất "the heaviest".',
        unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: w2 },
        difficultyScore: 5,
      });
      break;
    }

    case 'question_formation': {
      // Q1: Wh- questions and auxiliary inversion
      questions.push({
        id: `clc_quest_${baseIndex}_1`,
        grammarCategory: 'question_formation',
        stage: 2,
        gradeLevel: 'Grade 6 Extension',
        format: 'multiple_choice',
        grammarRuleTitle: 'How often + Auxiliary (does) + Subject + Verb',
        grammarNote: 'To ask about frequency (twice a week), use: How often + do/does + S + V(bare)?',
        instruction: 'Select the grammatically correct question for the given statement:',
        promptText: `Statement: "Nam waters the flowers in the ${w2} twice a week."\nQuestion: _____`,
        options: [
          { id: 'opt_a', text: `How often does Nam water the flowers in the ${w2}?`, label: 'A' },
          { id: 'opt_b', text: `How often Nam waters the flowers in the ${w2}?`, label: 'B' },
          { id: 'opt_c', text: `How many does Nam waters the flowers in the ${w2}?`, label: 'C' },
          { id: 'opt_d', text: `How often does Nam watered the flowers in the ${w2}?`, label: 'D' },
        ],
        correctAnswer: 'opt_a',
        explanation: 'Asking about frequency ("twice a week") requires "How often". Singular subject "Nam" requires auxiliary "does" followed by base verb "water".',
        grammarTipVi: 'Hỏi về tần suất (twice a week) dùng "How often". Cấu trúc: How often + does + S + V(nguyên mẫu).',
        unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: w2 },
        difficultyScore: 6,
      });

      // Q2: Preposition at the end of Wh- questions
      questions.push({
        id: `clc_quest_${baseIndex}_2`,
        grammarCategory: 'question_formation',
        stage: 2,
        gradeLevel: 'Grade 6 Extension',
        format: 'multiple_choice',
        grammarRuleTitle: 'Wh- Question with Preposition (What are you looking at?)',
        grammarNote: 'When verbs have prepositions (listen to, look at, talk to), the preposition stays with the verb phrase.',
        instruction: 'Choose the correct question to complete the dialogue:',
        promptText: `— _____?\n— We are looking at the new picture of our ${w1}.`,
        options: [
          { id: 'opt_a', text: 'What are you looking at', label: 'A' },
          { id: 'opt_b', text: 'Where are you looking', label: 'B' },
          { id: 'opt_c', text: 'What you are looking at', label: 'C' },
          { id: 'opt_d', text: 'Which do you look', label: 'D' },
        ],
        correctAnswer: 'opt_a',
        explanation: 'Inverted question in Present Continuous asking about an object: "What are you looking at?".',
        grammarTipVi: 'Đảo ngữ câu hỏi thì tiếp diễn: What + are + you + looking at? Không bỏ quên giới từ "at" đi sau "look".',
        unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: w1 },
        difficultyScore: 6,
      });

      // Q3: Short reading context with clear clues
      questions.push({
        id: `clc_quest_${baseIndex}_3`,
        grammarCategory: 'question_formation',
        stage: 2,
        gradeLevel: 'Grade 6 Extension',
        format: 'multiple_choice',
        grammarRuleTitle: 'Reading Context: Identifying Correct Question Words',
        grammarNote: 'Match the question word (Why, Where, When, How) to the answer clue.',
        instruction: 'Read the short context and complete the question:',
        promptContext: `Hoa usually walks to school every morning because her house is only two hundred meters away from the school gate.`,
        promptText: `— _____ does Hoa walk to school? — Because her house is very close.`,
        options: [
          { id: 'opt_a', text: 'Why', label: 'A' },
          { id: 'opt_b', text: 'Where', label: 'B' },
          { id: 'opt_c', text: 'When', label: 'C' },
          { id: 'opt_d', text: 'Who', label: 'D' },
        ],
        correctAnswer: 'opt_a',
        explanation: 'The answer starts with "Because" (giving a reason), so the question word must be "Why".',
        grammarTipVi: 'Câu trả lời giải thích lý do bắt đầu bằng "Because", do đó từ để hỏi tương ứng bắt buộc là "Why".',
        unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: w4 },
        difficultyScore: 5,
      });
      break;
    }

    case 'prepositions': {
      // Q1: Prepositions of time (in, on, at)
      questions.push({
        id: `clc_prep_${baseIndex}_1`,
        grammarCategory: 'prepositions',
        stage: 2,
        gradeLevel: 'Grade 6 Extension',
        format: 'multiple_choice',
        grammarRuleTitle: 'Prepositions of Time: in vs. on vs. at',
        grammarNote: 'at + exact time (at 8:00 AM); on + days/dates (on Friday, on October 10th); in + months/years/seasons (in October, in 2026).',
        instruction: 'Choose the correct set of prepositions of time:',
        promptText: `Our school sports festival will take place _____ 8:00 AM _____ Friday, _____ October 15th.`,
        options: [
          { id: 'opt_a', text: 'at / on / on', label: 'A' },
          { id: 'opt_b', text: 'in / at / on', label: 'B' },
          { id: 'opt_c', text: 'at / in / in', label: 'C' },
          { id: 'opt_d', text: 'on / on / at', label: 'D' },
        ],
        correctAnswer: 'opt_a',
        explanation: '"at 8:00 AM" (exact time), "on Friday" (day of week), "on October 15th" (specific calendar date).',
        grammarTipVi: 'Quy tắc giới từ thời gian: "at" + giờ cụ thể (8:00 AM); "on" + thứ trong tuần (Friday); "on" + ngày tháng cụ thể (October 15th).',
        unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: w5 },
        difficultyScore: 6,
      });

      // Q2: Prepositions of place (between, opposite, next to)
      questions.push({
        id: `clc_prep_${baseIndex}_2`,
        grammarCategory: 'prepositions',
        stage: 2,
        gradeLevel: 'Grade 6 Extension',
        format: 'multiple_choice',
        grammarRuleTitle: 'Prepositions of Place: between A and B',
        grammarNote: 'Use "between" when referring to a position between two distinct landmarks.',
        instruction: 'Select the accurate preposition for the place description:',
        promptText: `The new ${w3} is located _____ the science classroom and the art club.`,
        options: [
          { id: 'opt_a', text: 'between', label: 'A' },
          { id: 'opt_b', text: 'among', label: 'B' },
          { id: 'opt_c', text: 'next', label: 'C' },
          { id: 'opt_d', text: 'opposite to', label: 'D' },
        ],
        correctAnswer: 'opt_a',
        explanation: '"between A and B" is used when referring to two specific places.',
        grammarTipVi: 'Cấu trúc "between A and B" dùng khi một địa điểm nằm ở giữa hai đối tượng cụ thể.',
        unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: w3 },
        difficultyScore: 5,
      });

      // Q3: Short reading context with clear clues
      questions.push({
        id: `clc_prep_${baseIndex}_3`,
        grammarCategory: 'prepositions',
        stage: 2,
        gradeLevel: 'Grade 6 Extension',
        format: 'multiple_choice',
        grammarRuleTitle: 'Reading Context: Prepositions of Address and Place',
        grammarNote: 'at + street number; on + street name; in + city/country.',
        instruction: 'Read the short context and complete the sentence:',
        promptContext: `Linh lives with her family in Da Nang. Her house is located at 54 Tran Phu Street. She loves walking on Tran Phu Street on sunny afternoons.`,
        promptText: `Linh lives _____ 54 Tran Phu Street _____ Da Nang.`,
        options: [
          { id: 'opt_a', text: 'at / in', label: 'A' },
          { id: 'opt_b', text: 'on / at', label: 'B' },
          { id: 'opt_c', text: 'in / on', label: 'C' },
          { id: 'opt_d', text: 'at / on', label: 'D' },
        ],
        correctAnswer: 'opt_a',
        explanation: 'There is a specific street number (54 Tran Phu Street) -> "at". For cities (Da Nang) -> "in".',
        grammarTipVi: 'Có số nhà cụ thể (54 Tran Phu Street) dùng "at"; tên thành phố (Da Nang) dùng "in".',
        unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: w1 },
        difficultyScore: 5,
      });
      break;
    }

    case 'conjunctions': {
      // Q1: and, but, because, so, or
      questions.push({
        id: `clc_conj_${baseIndex}_1`,
        grammarCategory: 'conjunctions',
        stage: 3,
        gradeLevel: 'Grade 7 Prep',
        format: 'multiple_choice',
        grammarRuleTitle: 'Conjunction of Result: so',
        grammarNote: 'because + reason clause; so + result clause.',
        instruction: 'Select the conjunction that best fits the sentence meaning:',
        promptText: `The weather was very cold and rainy yesterday, _____ the children stayed indoors and read books.`,
        options: [
          { id: 'opt_a', text: 'so', label: 'A' },
          { id: 'opt_b', text: 'because', label: 'B' },
          { id: 'opt_c', text: 'but', label: 'C' },
          { id: 'opt_d', text: 'or', label: 'D' },
        ],
        correctAnswer: 'opt_a',
        explanation: 'The second clause ("the children stayed indoors") is the result of the cold weather, so "so" is correct.',
        grammarTipVi: 'Mệnh đề sau là kết quả của việc trời lạnh mưa, vì vậy dùng liên từ chỉ kết quả "so" (vì thế).',
        unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: w1 },
        difficultyScore: 6,
      });

      // Q2: Simple sentence transformation (Because <-> So)
      questions.push({
        id: `clc_conj_${baseIndex}_2`,
        grammarCategory: 'conjunctions',
        stage: 3,
        gradeLevel: 'Grade 7 Prep',
        format: 'sentence_transformation',
        grammarRuleTitle: 'Transformation: Because <-> So',
        grammarNote: 'Because Clause A, Clause B = Clause A, so Clause B.',
        instruction: 'Choose the sentence that correctly rewrites the given sentence:',
        promptText: `Because Nam practiced speaking English every day, he won first prize in the school contest.`,
        options: [
          { id: 'opt_a', text: `Nam practiced speaking English every day, so he won first prize in the school contest.`, label: 'A' },
          { id: 'opt_b', text: `Nam practiced speaking English every day, but he won first prize in the school contest.`, label: 'B' },
          { id: 'opt_c', text: `Nam won first prize in the school contest because so he practiced English.`, label: 'C' },
          { id: 'opt_d', text: `Although Nam practiced speaking English every day, so he won first prize.`, label: 'D' },
        ],
        correctAnswer: 'opt_a',
        explanation: '"Because A, B" is equivalent to "A, so B". Remember: never use because and so in the same sentence.',
        grammarTipVi: 'Dạng bài viết lại câu quen thuộc: "Because + Nguyên nhân, Kết quả" = "Nguyên nhân, so + Kết quả".',
        unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: w4 },
        difficultyScore: 6,
      });

      // Q3: Short reading context with clear clues
      questions.push({
        id: `clc_conj_${baseIndex}_3`,
        grammarCategory: 'conjunctions',
        stage: 3,
        gradeLevel: 'Grade 7 Prep',
        format: 'multiple_choice',
        grammarRuleTitle: 'Reading Context: Conjunctions with Clear Clues',
        grammarNote: 'Identify contrast (but/although) or reason (because).',
        instruction: 'Read the short context and complete the sentence:',
        promptContext: `Mai wanted to buy a new English storybook, but she did not have enough pocket money with her yesterday.`,
        promptText: `Mai could not buy the storybook _____ she did not have enough money.`,
        options: [
          { id: 'opt_a', text: 'because', label: 'A' },
          { id: 'opt_b', text: 'so', label: 'B' },
          { id: 'opt_c', text: 'although', label: 'C' },
          { id: 'opt_d', text: 'or', label: 'D' },
        ],
        correctAnswer: 'opt_a',
        explanation: '"she did not have enough money" is the reason why she could not buy it, so "because" is correct.',
        grammarTipVi: 'Vế sau là nguyên nhân giải thích vì sao Mai không mua được sách, do đó dùng liên từ "because".',
        unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: w3 },
        difficultyScore: 5,
      });
      break;
    }

    case 'transformation_error_correction': {
      // Q1: Suggestions (Why don't we <-> How about)
      questions.push({
        id: `clc_trans_err_${baseIndex}_1`,
        grammarCategory: 'transformation_error_correction',
        stage: 3,
        gradeLevel: 'Grade 7 Prep',
        format: 'sentence_transformation',
        grammarRuleTitle: 'Sentence Transformation: Suggestions',
        grammarNote: 'Why don\'t we + V(bare)...? = How about + V-ing...? = Let\'s + V(bare).',
        instruction: 'Choose the sentence that has the identical meaning:',
        promptText: `Why don\'t we visit the new school ${w3} this afternoon?`,
        options: [
          { id: 'opt_a', text: `How about visiting the new school ${w3} this afternoon?`, label: 'A' },
          { id: 'opt_b', text: `How about visit the new school ${w3} this afternoon?`, label: 'B' },
          { id: 'opt_c', text: `Let\'s to visit the new school ${w3} this afternoon.`, label: 'C' },
          { id: 'opt_d', text: `Why not we visiting the new school ${w3} this afternoon?`, label: 'D' },
        ],
        correctAnswer: 'opt_a',
        explanation: '"Why don\'t we + V(bare)" transforms into "How about + V-ing".',
        grammarTipVi: 'Công thức viết lại câu gợi ý: "Why don\'t we + V(nguyên mẫu)?" = "How about + V-ing?". Chú ý sau "How about" bắt buộc dùng V-ing.',
        unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: w3 },
        difficultyScore: 6,
      });

      // Q2: Time transformation (It takes... <-> spend)
      questions.push({
        id: `clc_trans_err_${baseIndex}_2`,
        grammarCategory: 'transformation_error_correction',
        stage: 3,
        gradeLevel: 'Grade 7 Prep',
        format: 'sentence_transformation',
        grammarRuleTitle: 'Transformation: It takes [person] [time] to V <-> S spends [time] V-ing',
        grammarNote: 'It took Nam 30 minutes to clean = Nam spent 30 minutes cleaning.',
        instruction: 'Select the correct transformation of the given sentence:',
        promptText: `It took Nam twenty minutes to walk from his ${w1} to the school.`,
        options: [
          { id: 'opt_a', text: `Nam spent twenty minutes walking from his ${w1} to the school.`, label: 'A' },
          { id: 'opt_b', text: `Nam spent twenty minutes to walk from his ${w1} to the school.`, label: 'B' },
          { id: 'opt_c', text: `Nam took twenty minutes walking from his ${w1} to the school.`, label: 'C' },
          { id: 'opt_d', text: `Nam has spent twenty minutes to walking from his ${w1} to the school.`, label: 'D' },
        ],
        correctAnswer: 'opt_a',
        explanation: '"It took [person] [time] to V" is rewritten as "[Person] spent [time] V-ing". Remember the gerund "walking".',
        grammarTipVi: 'Dạng viết lại câu mẫu mực thi vào lớp 6 CLC: "It takes/took + O + thời gian + to V" = "S + spend/spent + thời gian + V-ING".',
        unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: w1 },
        difficultyScore: 7,
      });

      // Q3: Accessible Error identification (there is / there are with plural)
      questions.push({
        id: `clc_trans_err_${baseIndex}_3`,
        grammarCategory: 'transformation_error_correction',
        stage: 3,
        gradeLevel: 'Grade 7 Prep',
        format: 'error_identification',
        grammarRuleTitle: 'Error Identification: Subject-Verb Agreement with There is/are',
        grammarNote: 'There are + plural noun. There is + singular noun.',
        instruction: 'Identify the ONE underlined option (A, B, C, or D) that contains an error:',
        promptText: `Although there is (A) many green trees (B) in our school yard (C), it is still hot at noon (D).`,
        options: [
          { id: 'opt_a', text: 'there is', label: 'A', isMistakePart: true, correctedPart: 'there are' },
          { id: 'opt_b', text: 'many green trees', label: 'B' },
          { id: 'opt_c', text: 'in our school yard', label: 'C' },
          { id: 'opt_d', text: 'it is still hot at noon', label: 'D' },
        ],
        correctAnswer: 'opt_a',
        explanation: '"many green trees" is a plural noun phrase, so the existential verb must be "there are", not "there is".',
        grammarTipVi: 'Lỗi hòa hợp chủ - vị: "many green trees" là danh từ số nhiều, vì vậy phải sửa "there is" thành "there are".',
        unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: w2 },
        difficultyScore: 6,
      });

      // Q4: can ↔ be able to (Prompt 19)
      questions.push({
        id: `clc_trans_err_${baseIndex}_4`,
        grammarCategory: 'transformation_error_correction',
        stage: 2,
        gradeLevel: 'Grade 6 Extension',
        format: 'sentence_transformation',
        grammarRuleTitle: 'Transformation: cannot ↔ is not able to',
        grammarNote: 'cannot + V = is/are not able to + V.',
        instruction: 'Choose the sentence that has the closest meaning to the given sentence:',
        promptText: `Linda cannot participate in the sports match this afternoon.`,
        options: [
          { id: 'opt_a', text: `Linda is not able to participate in the sports match this afternoon.`, label: 'A' },
          { id: 'opt_b', text: `Linda should not participate in the sports match this afternoon.`, label: 'B' },
          { id: 'opt_c', text: `Linda does not want to participate in the sports match this afternoon.`, label: 'C' },
          { id: 'opt_d', text: `Linda was not able to participate in the sports match yesterday.`, label: 'D' },
        ],
        correctAnswer: 'opt_a',
        explanation: '"cannot participate" is equivalent to "is not able to participate".',
        grammarTipVi: 'Chuyển đổi phủ định chỉ khả năng: "cannot + V" = "is/are not able to + V".',
        unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: w5 },
        difficultyScore: 5,
      });

      // Q5: should / shouldn't (Prompt 19)
      questions.push({
        id: `clc_trans_err_${baseIndex}_5`,
        grammarCategory: 'transformation_error_correction',
        stage: 1,
        gradeLevel: 'Grade 5 Review',
        format: 'sentence_transformation',
        grammarRuleTitle: 'Transformation: It is not good to V ↔ shouldn\'t',
        grammarNote: 'It is bad / not good to V = shouldn\'t + V.',
        instruction: 'Choose the sentence that has the closest meaning to the given sentence:',
        promptText: `It is not good for children to spend too much time on ${w4} screens.`,
        options: [
          { id: 'opt_a', text: `Children shouldn\'t spend too much time on ${w4} screens.`, label: 'A' },
          { id: 'opt_b', text: `Children should spend too much time on ${w4} screens.`, label: 'B' },
          { id: 'opt_c', text: `Children cannot spend too much time on ${w4} screens.`, label: 'C' },
          { id: 'opt_d', text: `Children always spend too much time on ${w4} screens.`, label: 'D' },
        ],
        correctAnswer: 'opt_a',
        explanation: '"It is not good for children to spend..." transforms directly into "Children shouldn\'t spend...".',
        grammarTipVi: 'Chuyển đổi lời khuyên không nên: "It is not good for S to V" = "S + shouldn\'t + V".',
        unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: w4 },
        difficultyScore: 4,
      });

      // Q6: be going to ↔ simple future (Prompt 19)
      questions.push({
        id: `clc_trans_err_${baseIndex}_6`,
        grammarCategory: 'transformation_error_correction',
        stage: 2,
        gradeLevel: 'Grade 6 Extension',
        format: 'sentence_transformation',
        grammarRuleTitle: 'Transformation: plan to V ↔ be going to V',
        grammarNote: 'S + plan to V = S + be going to + V.',
        instruction: 'Choose the sentence that has the closest meaning to the given sentence:',
        promptText: `Our class plans to plant twenty new trees in the school ${w2} next Saturday.`,
        options: [
          { id: 'opt_a', text: `Our class is going to plant twenty new trees in the school ${w2} next Saturday.`, label: 'A' },
          { id: 'opt_b', text: `Our class planted twenty new trees in the school ${w2} last Saturday.`, label: 'B' },
          { id: 'opt_c', text: `Our class should plant twenty new trees because it is mandatory.`, label: 'C' },
          { id: 'opt_d', text: `Our class never plants trees in the school ${w2}.`, label: 'D' },
        ],
        correctAnswer: 'opt_a',
        explanation: '"plans to plant" expresses a planned future action, rewritten with "is going to plant".',
        grammarTipVi: 'Chuyển đổi kế hoạch tương lai: "S + plan to V" = "S + be going to + V".',
        unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: w2 },
        difficultyScore: 5,
      });

      // Q7: simple past ↔ time expressions (Prompt 19)
      questions.push({
        id: `clc_trans_err_${baseIndex}_7`,
        grammarCategory: 'transformation_error_correction',
        stage: 2,
        gradeLevel: 'Grade 6 Extension',
        format: 'sentence_transformation',
        grammarRuleTitle: 'Transformation: started V-ing ↔ began V-ing at the age of',
        grammarNote: 'started V-ing when S was X = began V-ing at the age of X.',
        instruction: 'Choose the sentence that has the closest meaning to the given sentence:',
        promptText: `Mai started learning English when she was six years old.`,
        options: [
          { id: 'opt_a', text: `Mai began learning English at the age of six.`, label: 'A' },
          { id: 'opt_b', text: `Mai will begin learning English when she is six years old.`, label: 'B' },
          { id: 'opt_c', text: `Mai stopped learning English when she was six years old.`, label: 'C' },
          { id: 'opt_d', text: `Mai learns English six days every week.`, label: 'D' },
        ],
        correctAnswer: 'opt_a',
        explanation: '"started learning... when she was six" has the same meaning as "began learning English at the age of six".',
        grammarTipVi: 'Cặp diễn đạt quá khứ tương đương: "started + V-ing when she was six" = "began + V-ing at the age of six".',
        unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: w1 },
        difficultyScore: 5,
      });
      break;
    }

    case 'be_verbs': {
      // Q1: Present/Past contrast with be
      questions.push({
        id: `clc_be_${baseIndex}_1`,
        grammarCategory: 'be_verbs',
        stage: 1,
        gradeLevel: 'Grade 5 Review',
        format: 'multiple_choice',
        grammarRuleTitle: 'Verb to be: Past vs. Present contrast',
        grammarNote: 'Use was/were for past time markers (ten years ago, yesterday), and am/is/are for present facts.',
        instruction: 'Choose the correct form of the verb to be to complete the sentence:',
        promptText: `Ten years ago, there _____ only small cottages here, but today almost every ${w1} _____ very modern.`,
        options: [
          { id: 'opt_a', text: 'were / is', label: 'A' },
          { id: 'opt_b', text: 'was / are', label: 'B' },
          { id: 'opt_c', text: 'are / is', label: 'C' },
          { id: 'opt_d', text: 'were / are', label: 'D' },
        ],
        correctAnswer: 'opt_a',
        explanation: '"small cottages" is plural, so past plural requires "were". "every house" is singular, so present requires "is".',
        grammarTipVi: '"Ten years ago" dùng quá khứ "were" (cho danh từ số nhiều cottages); "every house" đi với động từ số ít "is".',
        unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: w1 },
        difficultyScore: 5,
      });

      // Q2: Error identification with compound subject
      questions.push({
        id: `clc_be_${baseIndex}_2`,
        grammarCategory: 'be_verbs',
        stage: 1,
        gradeLevel: 'Grade 5 Review',
        format: 'error_identification',
        grammarRuleTitle: 'Subject-Verb Agreement with To Be',
        grammarNote: 'A compound plural subject (Nam and his brother) requires are/were, not is/was.',
        instruction: 'Find the underlined part (A, B, C, or D) that contains a grammatical error:',
        promptText: `Both Nam (A) and his brother (B) was (C) at the school library yesterday afternoon (D).`,
        options: [
          { id: 'opt_a', text: 'Both Nam', label: 'A' },
          { id: 'opt_b', text: 'and his brother', label: 'B' },
          { id: 'opt_c', text: 'was', label: 'C', isMistakePart: true, correctedPart: 'were' },
          { id: 'opt_d', text: 'at the school library yesterday afternoon', label: 'D' },
        ],
        correctAnswer: 'opt_c',
        explanation: 'The subject is plural ("Both Nam and his brother"), so the verb must be "were", not "was".',
        grammarTipVi: 'Cấu trúc "Both A and B" luôn đi với động từ số nhiều (were/are), do đó "was" là lỗi sai, sửa thành "were".',
        unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: w3 },
        difficultyScore: 5,
      });
      break;
    }

    case 'have_verbs': {
      // Q1: have/has in negative present simple
      questions.push({
        id: `clc_have_${baseIndex}_1`,
        grammarCategory: 'have_verbs',
        stage: 1,
        gradeLevel: 'Grade 5 Review',
        format: 'multiple_choice',
        grammarRuleTitle: 'Negative forms of have/has',
        grammarNote: 'In standard English, the negative for simple present possession uses "doesn\'t have / don\'t have".',
        instruction: 'Choose the grammatically correct option to complete the statement:',
        promptText: `My friend's new ${w1} _____ a big garden, so he _____ some pretty flowers in pots on the balcony.`,
        options: [
          { id: 'opt_a', text: 'doesn\'t have / has', label: 'A' },
          { id: 'opt_b', text: 'hasn\'t / have', label: 'B' },
          { id: 'opt_c', text: 'don\'t have / had', label: 'C' },
          { id: 'opt_d', text: 'doesn\'t has / has', label: 'D' },
        ],
        correctAnswer: 'opt_a',
        explanation: '"My friend\'s new house" is singular (it), requiring "doesn\'t have". The second clause requires 3rd person singular "has".',
        grammarTipVi: 'Phủ định của thì Hiện tại đơn với chủ ngữ số ít là "doesn\'t have" (động từ sau trợ động từ đưa về nguyên mẫu).',
        unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: w1 },
        difficultyScore: 5,
      });

      // Q2: Sentence transformation: There is/are <-> Have/Has
      questions.push({
        id: `clc_have_${baseIndex}_2`,
        grammarCategory: 'have_verbs',
        stage: 1,
        gradeLevel: 'Grade 5 Review',
        format: 'sentence_transformation',
        grammarRuleTitle: 'Transformation: There is/are <-> Have/Has',
        grammarNote: '"There are X in Y" can be transformed to "Y has X".',
        instruction: 'Choose the sentence that has the closest meaning to the given sentence:',
        promptText: `There are four large rooms in our new ${w1}.`,
        options: [
          { id: 'opt_a', text: `Our new ${w1} has four large rooms.`, label: 'A' },
          { id: 'opt_b', text: `Our new ${w1} have four large rooms.`, label: 'B' },
          { id: 'opt_c', text: `There have four large rooms in our new ${w1}.`, label: 'C' },
          { id: 'opt_d', text: `Four large rooms has been in our new ${w1}.`, label: 'D' },
        ],
        correctAnswer: 'opt_a',
        explanation: '"Our new house" is singular, so it correctly pairs with "has".',
        grammarTipVi: 'Dạng chuyển đổi quen thuộc: "There are [noun] in [place]" = "[place] has [noun]". Chú ý chia động từ số ít "has".',
        unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: w1 },
        difficultyScore: 5,
      });
      break;
    }

    case 'there_is_are': {
      // Q1: Proximity rule with There is / There are
      questions.push({
        id: `clc_there_${baseIndex}_1`,
        grammarCategory: 'there_is_are',
        stage: 1,
        gradeLevel: 'Grade 5 Review',
        format: 'multiple_choice',
        grammarRuleTitle: 'Proximity Rule with There is / There are',
        grammarNote: 'With there is/are, the verb agrees with the noun immediately following it.',
        instruction: 'Select the correct form to complete the sentence:',
        promptText: `In our school garden, there _____ a big mango tree and many colorful flowers.`,
        options: [
          { id: 'opt_a', text: 'is', label: 'A' },
          { id: 'opt_b', text: 'are', label: 'B' },
          { id: 'opt_c', text: 'were', label: 'C' },
          { id: 'opt_d', text: 'have', label: 'D' },
        ],
        correctAnswer: 'opt_a',
        explanation: 'The noun immediately following the verb is singular ("a big mango tree"), so "is" is used.',
        grammarTipVi: 'Quy tắc ngữ pháp: Với "There is/are", động từ chia theo danh từ đứng liền kề. "a big mango tree" là số ít -> chọn "is".',
        unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: w2 },
        difficultyScore: 5,
      });

      // Q2: Past form of there is/are
      questions.push({
        id: `clc_there_${baseIndex}_2`,
        grammarCategory: 'there_is_are',
        stage: 1,
        gradeLevel: 'Grade 5 Review',
        format: 'multiple_choice',
        grammarRuleTitle: 'Past Tense: There was vs. There were',
        grammarNote: 'There was + singular noun; There were + plural noun.',
        instruction: 'Choose the correct form for the past statement:',
        promptText: `Ten years ago, there _____ no computer labs in this primary school.`,
        options: [
          { id: 'opt_a', text: 'were', label: 'A' },
          { id: 'opt_b', text: 'was', label: 'B' },
          { id: 'opt_c', text: 'are', label: 'C' },
          { id: 'opt_d', text: 'had', label: 'D' },
        ],
        correctAnswer: 'opt_a',
        explanation: '"computer labs" is plural, and the time marker is past ("Ten years ago"), so "were" is correct.',
        grammarTipVi: 'Dấu hiệu "Ten years ago" là quá khứ, đi với danh từ số nhiều (computer labs) nên dùng "There were".',
        unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: w4 },
        difficultyScore: 5,
      });
      break;
    }

    case 'countable_uncountable': {
      // Q1: Countable vs uncountable nouns
      questions.push({
        id: `clc_count_${baseIndex}_1`,
        grammarCategory: 'countable_uncountable',
        stage: 2,
        gradeLevel: 'Grade 6 Extension',
        format: 'multiple_choice',
        grammarRuleTitle: 'Countable vs. Uncountable Nouns',
        grammarNote: 'Uncountable nouns (water, milk, electricity, advice) do not have plural -s and do not take a/an.',
        instruction: 'Choose the correct combination of words:',
        promptText: `My mother bought some fresh _____ and two bottles of clean _____ for our picnic.`,
        options: [
          { id: 'opt_a', text: 'bread / water', label: 'A' },
          { id: 'opt_b', text: 'breads / waters', label: 'B' },
          { id: 'opt_c', text: 'a bread / waters', label: 'C' },
          { id: 'opt_d', text: 'breads / water', label: 'D' },
        ],
        correctAnswer: 'opt_a',
        explanation: '"Bread" and "water" are uncountable nouns; they do not take -s in standard English.',
        grammarTipVi: '"bread" (bánh mì) và "water" (nước) là danh từ không đếm được, không thêm "-s".',
        unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: w1 },
        difficultyScore: 5,
      });

      // Q2: Error identification with uncountable nouns
      questions.push({
        id: `clc_count_${baseIndex}_2`,
        grammarCategory: 'countable_uncountable',
        stage: 2,
        gradeLevel: 'Grade 6 Extension',
        format: 'error_identification',
        grammarRuleTitle: 'Uncountable Noun Measurement',
        grammarNote: 'We say "two pieces of advice", never "two advices".',
        instruction: 'Find the underlined part (A, B, C, or D) that contains an error:',
        promptText: `Our teacher (A) gave (B) the students two useful advices (C) for the speaking test (D).`,
        options: [
          { id: 'opt_a', text: 'Our teacher', label: 'A' },
          { id: 'opt_b', text: 'gave', label: 'B' },
          { id: 'opt_c', text: 'two useful advices', label: 'C', isMistakePart: true, correctedPart: 'two pieces of useful advice' },
          { id: 'opt_d', text: 'for the speaking test', label: 'D' },
        ],
        correctAnswer: 'opt_c',
        explanation: '"Advice" is an uncountable noun. It cannot be pluralized as "advices". Use "two pieces of advice".',
        grammarTipVi: 'Bẫy đề thi CLC: "Advice" là danh từ không đếm được, không có dạng "advices" (phải dùng "pieces of advice").',
        unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: w3 },
        difficultyScore: 6,
      });
      break;
    }

    case 'quantifiers': {
      // Q1: much vs. many
      questions.push({
        id: `clc_quant_${baseIndex}_1`,
        grammarCategory: 'quantifiers',
        stage: 2,
        gradeLevel: 'Grade 6 Extension',
        format: 'multiple_choice',
        grammarRuleTitle: 'Quantifiers: much vs. many',
        grammarNote: 'Use "many" with plural countable nouns, and "much" with uncountable nouns in questions and negatives.',
        instruction: 'Complete the sentence with the appropriate quantifiers:',
        promptText: `How _____ books are there in your backpack? Do you drink _____ water after gym class?`,
        options: [
          { id: 'opt_a', text: 'many / much', label: 'A' },
          { id: 'opt_b', text: 'much / many', label: 'B' },
          { id: 'opt_c', text: 'many / many', label: 'C' },
          { id: 'opt_d', text: 'much / much', label: 'D' },
        ],
        correctAnswer: 'opt_a',
        explanation: '"books" is countable plural -> "many". "water" is uncountable -> "much".',
        grammarTipVi: '"books" đếm được số nhiều dùng "many"; "water" không đếm được dùng "much".',
        unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: w3 },
        difficultyScore: 5,
      });

      // Q2: some in polite offers vs. any in negative
      questions.push({
        id: `clc_quant_${baseIndex}_2`,
        grammarCategory: 'quantifiers',
        stage: 2,
        gradeLevel: 'Grade 6 Extension',
        format: 'multiple_choice',
        grammarRuleTitle: 'Using "some" in Polite Offers and Invitations',
        grammarNote: 'Polite offers with "Would you like...?" take "some". Negative sentences take "any".',
        instruction: 'Choose the correct quantifiers for the dialogue:',
        promptText: `— Would you like _____ fresh orange juice?\n— Thank you, but I don\'t want _____ sweet drinks right now.`,
        options: [
          { id: 'opt_a', text: 'some / any', label: 'A' },
          { id: 'opt_b', text: 'any / some', label: 'B' },
          { id: 'opt_c', text: 'any / any', label: 'C' },
          { id: 'opt_d', text: 'some / some', label: 'D' },
        ],
        correctAnswer: 'opt_a',
        explanation: '"Would you like some...?" is a polite offer. "don\'t want any" is a negative statement.',
        grammarTipVi: 'Câu mời lịch sự "Would you like...?" dùng "some", còn câu phủ định dùng "any".',
        unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: w1 },
        difficultyScore: 6,
      });
      break;
    }

    case 'articles': {
      // Q1: a / an / the
      questions.push({
        id: `clc_art_${baseIndex}_1`,
        grammarCategory: 'articles',
        stage: 1,
        gradeLevel: 'Grade 5 Review',
        format: 'multiple_choice',
        grammarRuleTitle: 'Articles: a vs. an vs. the',
        grammarNote: 'Use "an" before vowel sounds (an apple, an active student). Use "the" for specific or unique entities.',
        instruction: 'Select the correct articles to fill in the blanks:',
        promptText: `My brother is _____ active student in _____ class 5A at Nguyen Du School.`,
        options: [
          { id: 'opt_a', text: 'an / the', label: 'A' },
          { id: 'opt_b', text: 'a / the', label: 'B' },
          { id: 'opt_c', text: 'an / a', label: 'C' },
          { id: 'opt_d', text: 'the / a', label: 'D' },
        ],
        correctAnswer: 'opt_a',
        explanation: '"active" starts with vowel sound /æ/, requiring "an". "class 5A" is a specific group requiring "the".',
        grammarTipVi: '"active" bắt đầu bằng nguyên âm /æ/ nên dùng "an"; chỉ lớp học cụ thể dùng "the".',
        unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: w1 },
        difficultyScore: 5,
      });

      // Q2: Error identification with unique entities (the Sun / the Moon)
      questions.push({
        id: `clc_art_${baseIndex}_2`,
        grammarCategory: 'articles',
        stage: 1,
        gradeLevel: 'Grade 5 Review',
        format: 'error_identification',
        grammarRuleTitle: 'Definite Article with Unique Celestial Bodies',
        grammarNote: 'Unique natural objects take "the" (the Sun, the Moon, the Earth).',
        instruction: 'Find the underlined part (A, B, C, or D) that contains an error:',
        promptText: `Every morning (A), Sun (B) rises in the east and shines (C) on our green garden (D).`,
        options: [
          { id: 'opt_a', text: 'Every morning', label: 'A' },
          { id: 'opt_b', text: 'Sun', label: 'B', isMistakePart: true, correctedPart: 'the Sun' },
          { id: 'opt_c', text: 'shines', label: 'C' },
          { id: 'opt_d', text: 'on our green garden', label: 'D' },
        ],
        correctAnswer: 'opt_b',
        explanation: 'Unique celestial bodies take the definite article: "the Sun", not just "Sun".',
        grammarTipVi: 'Mặt trời là vật thể duy nhất trong tự nhiên, bắt buộc phải có mạo từ xác định "the Sun".',
        unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: w2 },
        difficultyScore: 5,
      });
      break;
    }

    case 'possessives': {
      // Q1: Possessive Adjective vs. Possessive Pronoun
      questions.push({
        id: `clc_poss_${baseIndex}_1`,
        grammarCategory: 'possessives',
        stage: 1,
        gradeLevel: 'Grade 5 Review',
        format: 'multiple_choice',
        grammarRuleTitle: 'Possessive Adjectives (my) vs. Possessive Pronouns (mine)',
        grammarNote: 'Possessive adjectives (my, our) must precede a noun. Possessive pronouns (mine, ours) stand alone.',
        instruction: 'Choose the correct pair of possessive forms:',
        promptText: `This pencil case is _____ brother\'s, but that blue backpack over there is _____.`,
        options: [
          { id: 'opt_a', text: 'my / mine', label: 'A' },
          { id: 'opt_b', text: 'mine / my', label: 'B' },
          { id: 'opt_c', text: 'my / my', label: 'C' },
          { id: 'opt_d', text: 'mine / mine', label: 'D' },
        ],
        correctAnswer: 'opt_a',
        explanation: '"brother" is a noun, requiring possessive adjective "my". The second blank stands alone at the end, requiring possessive pronoun "mine".',
        grammarTipVi: 'Đứng trước danh từ "brother" dùng tính từ sở hữu "my". Đứng một mình cuối câu thay thế cho danh từ dùng đại từ sở hữu "mine".',
        unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: w1 },
        difficultyScore: 5,
      });

      // Q2: Sentence transformation: Belongs to <-> Possessive
      questions.push({
        id: `clc_poss_${baseIndex}_2`,
        grammarCategory: 'possessives',
        stage: 1,
        gradeLevel: 'Grade 5 Review',
        format: 'sentence_transformation',
        grammarRuleTitle: 'Transformation: Belongs to <-> Possessive \'s',
        grammarNote: '"This X belongs to Y" = "This is Y\'s X".',
        instruction: 'Choose the sentence that has the same meaning:',
        promptText: `That red bicycle belongs to my cousin Peter.`,
        options: [
          { id: 'opt_a', text: `That is my cousin Peter\'s red bicycle.`, label: 'A' },
          { id: 'opt_b', text: `That is my cousin\'s Peter red bicycle.`, label: 'B' },
          { id: 'opt_c', text: `That red bicycle is belong to Peter.`, label: 'C' },
          { id: 'opt_d', text: `Peter belongs that red bicycle.`, label: 'D' },
        ],
        correctAnswer: 'opt_a',
        explanation: '"belongs to my cousin Peter" translates naturally into "my cousin Peter\'s red bicycle".',
        grammarTipVi: 'Cấu trúc chuyển đổi sở hữu cách: "belongs to Peter" = "Peter\'s bicycle".',
        unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: w1 },
        difficultyScore: 5,
      });
      break;
    }

    case 'pronouns': {
      // Q1: Subject vs. Object Pronouns
      questions.push({
        id: `clc_pron_${baseIndex}_1`,
        grammarCategory: 'pronouns',
        stage: 1,
        gradeLevel: 'Grade 5 Review',
        format: 'multiple_choice',
        grammarRuleTitle: 'Subject vs. Object Pronouns',
        grammarNote: 'Subject pronouns perform actions (they, we). Object pronouns receive actions (them, us, me).',
        instruction: 'Select the correct pronouns to complete the sentence:',
        promptText: `Our teacher invited _____ to visit the new ${w3}, and _____ showed us all the interesting books.`,
        options: [
          { id: 'opt_a', text: 'us / she', label: 'A' },
          { id: 'opt_b', text: 'we / her', label: 'B' },
          { id: 'opt_c', text: 'us / her', label: 'C' },
          { id: 'opt_d', text: 'our / she', label: 'D' },
        ],
        correctAnswer: 'opt_a',
        explanation: 'After verb "invited" comes object pronoun "us". The second clause needs subject pronoun "she".',
        grammarTipVi: 'Sau động từ "invited" là tân ngữ "us"; làm chủ ngữ cho vế sau là đại từ nhân xưng "she".',
        unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: w3 },
        difficultyScore: 5,
      });

      // Q2: Demonstratives this/these vs that/those
      questions.push({
        id: `clc_pron_${baseIndex}_2`,
        grammarCategory: 'pronouns',
        stage: 1,
        gradeLevel: 'Grade 5 Review',
        format: 'multiple_choice',
        grammarRuleTitle: 'Demonstrative Pronouns: These vs. That',
        grammarNote: 'these + plural near; that + singular far.',
        instruction: 'Choose the correct demonstrative words:',
        promptText: `_____ books right here on my desk are very interesting, but _____ dictionary over there is very old.`,
        options: [
          { id: 'opt_a', text: 'These / that', label: 'A' },
          { id: 'opt_b', text: 'This / those', label: 'B' },
          { id: 'opt_c', text: 'Those / this', label: 'C' },
          { id: 'opt_d', text: 'These / these', label: 'D' },
        ],
        correctAnswer: 'opt_a',
        explanation: '"right here" + plural "books" = "These". "over there" + singular "dictionary" = "that".',
        grammarTipVi: '"right here" (ở đây - gần) + số nhiều dùng "These"; "over there" (ở đằng kia - xa) + số ít dùng "that".',
        unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: w3 },
        difficultyScore: 5,
      });
      break;
    }

    case 'adverbs_frequency': {
      // Q1: Word order of frequency adverbs
      questions.push({
        id: `clc_adv_freq_${baseIndex}_1`,
        grammarCategory: 'adverbs_frequency',
        stage: 2,
        gradeLevel: 'Grade 6 Extension',
        format: 'multiple_choice',
        grammarRuleTitle: 'Position of Adverbs of Frequency',
        grammarNote: 'Adverbs of frequency go BEFORE the action verb, but AFTER the verb to be.',
        instruction: 'Select the sentence with the correct word order:',
        promptText: `Which sentence has the correct adverb position?`,
        options: [
          { id: 'opt_a', text: `Nam always brushes his teeth before going to bed.`, label: 'A' },
          { id: 'opt_b', text: `Nam brushes always his teeth before going to bed.`, label: 'B' },
          { id: 'opt_c', text: `Nam brushes his teeth always before going to bed.`, label: 'C' },
          { id: 'opt_d', text: `Always Nam brushes his teeth before going to bed.`, label: 'D' },
        ],
        correctAnswer: 'opt_a',
        explanation: 'Adverbs of frequency (always, usually, often) must precede the action verb ("always brushes").',
        grammarTipVi: 'Vị trí trạng từ chỉ tần suất: đứng TRƯỚC động từ thường ("always brushes") và SAU động từ "to be".',
        unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: w1 },
        difficultyScore: 5,
      });

      // Q2: Frequency adverb with to be vs. action verb
      questions.push({
        id: `clc_adv_freq_${baseIndex}_2`,
        grammarCategory: 'adverbs_frequency',
        stage: 2,
        gradeLevel: 'Grade 6 Extension',
        format: 'multiple_choice',
        grammarRuleTitle: 'Frequency Adverbs: To Be + Adv vs. Adv + Verb',
        grammarNote: 'is usually / is never vs. always wakes / often walks.',
        instruction: 'Choose the correct word order combination:',
        promptText: `Hoa _____ late for class because she _____ to school on time.`,
        options: [
          { id: 'opt_a', text: 'is never / always arrives', label: 'A' },
          { id: 'opt_b', text: 'never is / arrives always', label: 'B' },
          { id: 'opt_c', text: 'is never / arrives always', label: 'C' },
          { id: 'opt_d', text: 'never is / always arrives', label: 'D' },
        ],
        correctAnswer: 'opt_a',
        explanation: 'After "be": "is never". Before action verb "arrives": "always arrives".',
        grammarTipVi: 'Ghi nhớ công thức vàng: To Be + Trạng từ ("is never"); Trạng từ + Động từ thường ("always arrives").',
        unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: w1 },
        difficultyScore: 6,
      });
      break;
    }

    case 'imperatives': {
      // Q1: Positive and negative imperatives
      questions.push({
        id: `clc_imp_${baseIndex}_1`,
        grammarCategory: 'imperatives',
        stage: 1,
        gradeLevel: 'Grade 5 Review',
        format: 'multiple_choice',
        grammarRuleTitle: 'Imperatives & Safety Instructions',
        grammarNote: 'Positive imperative: V(bare). Negative imperative: Don\'t + V(bare).',
        instruction: 'Complete the safety rules for the school laboratory:',
        promptText: `_____ careful when using the equipment, and _____ forget to wash your hands after class!`,
        options: [
          { id: 'opt_a', text: 'Be / don\'t', label: 'A' },
          { id: 'opt_b', text: 'Being / not', label: 'B' },
          { id: 'opt_c', text: 'Be / doesn\'t', label: 'C' },
          { id: 'opt_d', text: 'Is / don\'t', label: 'D' },
        ],
        correctAnswer: 'opt_a',
        explanation: 'Imperative sentences begin with bare verb "Be" and negative auxiliary "don\'t".',
        grammarTipVi: 'Câu mệnh lệnh bắt đầu bằng động từ nguyên mẫu ("Be careful"), và câu mệnh lệnh phủ định bắt đầu bằng "Don\'t".',
        unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: w4 },
        difficultyScore: 5,
      });

      // Q2: Polite request transformation
      questions.push({
        id: `clc_imp_${baseIndex}_2`,
        grammarCategory: 'imperatives',
        stage: 1,
        gradeLevel: 'Grade 5 Review',
        format: 'sentence_transformation',
        grammarRuleTitle: 'Transformation: Imperative <-> Could you please',
        grammarNote: 'Open the door, please = Could you please open the door?',
        instruction: 'Select the most polite equivalent of the command:',
        promptText: `Show me the picture of your new ${w1}, please.`,
        options: [
          { id: 'opt_a', text: `Could you please show me the picture of your new ${w1}?`, label: 'A' },
          { id: 'opt_b', text: `You must showing me the picture of your new ${w1}.`, label: 'B' },
          { id: 'opt_c', text: `Do you want showing me the picture of your new ${w1}?`, label: 'C' },
          { id: 'opt_d', text: `Why don\'t you showing me the picture of your new ${w1}?`, label: 'D' },
        ],
        correctAnswer: 'opt_a',
        explanation: '"Could you please + V(bare)...?" is the standard polite request equivalent of a command with please.',
        grammarTipVi: 'Chuyển đổi câu mệnh lệnh lịch sự: "V + please" = "Could you please + V(nguyên mẫu)?".',
        unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: w1 },
        difficultyScore: 5,
      });
      break;
    }

    case 'infinitives_gerunds': {
      // Q1: Verbs taking to-V vs V-ing
      questions.push({
        id: `clc_inf_ger_${baseIndex}_1`,
        grammarCategory: 'infinitives_gerunds',
        stage: 3,
        gradeLevel: 'Grade 7 Prep',
        format: 'multiple_choice',
        grammarRuleTitle: 'Verb Patterns: hope + to V vs. enjoy + V-ing',
        grammarNote: 'want / hope / decide + to V. enjoy / like / practice + V-ing.',
        instruction: 'Choose the correct verb forms to fill in the blanks:',
        promptText: `My brother hopes _____ an English teacher because he enjoys _____ with children.`,
        options: [
          { id: 'opt_a', text: 'to become / working', label: 'A' },
          { id: 'opt_b', text: 'becoming / to work', label: 'B' },
          { id: 'opt_c', text: 'to become / to work', label: 'C' },
          { id: 'opt_d', text: 'become / working', label: 'D' },
        ],
        correctAnswer: 'opt_a',
        explanation: '"hope" is followed by a to-infinitive ("to become"), while "enjoy" is followed by a gerund ("working").',
        grammarTipVi: 'Quy tắc cơ bản: "hope + to V" (hy vọng làm gì) và "enjoy + V-ing" (thích làm gì).',
        unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: w1 },
        difficultyScore: 6,
      });

      // Q2: Preposition + V-ing (interested in V-ing)
      questions.push({
        id: `clc_inf_ger_${baseIndex}_2`,
        grammarCategory: 'infinitives_gerunds',
        stage: 3,
        gradeLevel: 'Grade 7 Prep',
        format: 'sentence_transformation',
        grammarRuleTitle: 'Transformation: like V-ing <-> be interested in V-ing',
        grammarNote: 'like / love V-ing = be interested in + V-ing.',
        instruction: 'Select the sentence that has the identical meaning:',
        promptText: `David likes reading books about nature in his free time.`,
        options: [
          { id: 'opt_a', text: `David is interested in reading books about nature in his free time.`, label: 'A' },
          { id: 'opt_b', text: `David is interested to read books about nature in his free time.`, label: 'B' },
          { id: 'opt_c', text: `David fond of read books about nature in his free time.`, label: 'C' },
          { id: 'opt_d', text: `David enjoys to reading books about nature in his free time.`, label: 'D' },
        ],
        correctAnswer: 'opt_a',
        explanation: '"be interested in + V-ing" correctly expresses personal interest with a gerund after preposition "in".',
        grammarTipVi: 'Cấu trúc chuyển đổi sở thích: "like + V-ing" = "be interested in + V-ing" (sau giới từ "in" bắt buộc dùng V-ing).',
        unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: w3 },
        difficultyScore: 6,
      });
      break;
    }

    case 'basic_modals': {
      // Q1: may / might / would like
      questions.push({
        id: `clc_mod_ext_${baseIndex}_1`,
        grammarCategory: 'basic_modals',
        stage: 3,
        gradeLevel: 'Grade 7 Prep',
        format: 'multiple_choice',
        grammarRuleTitle: 'Modals of Possibility (might) and Desire (would like to V)',
        grammarNote: 'might + V(bare) = 50% possibility. would like + to V = polite desire.',
        instruction: 'Select the appropriate modal verb forms:',
        promptText: `We are not completely certain, but it _____ rain later this afternoon. I _____ to stay at home.`,
        options: [
          { id: 'opt_a', text: 'might / would like', label: 'A' },
          { id: 'opt_b', text: 'must / would like to', label: 'B' },
          { id: 'opt_c', text: 'can / like to', label: 'C' },
          { id: 'opt_d', text: 'might / would like to', label: 'D' },
        ],
        correctAnswer: 'opt_a',
        explanation: '"not completely certain" expresses possibility ("might"). Before "to stay", use "would like".',
        grammarTipVi: '"not completely certain" (không chắc chắn 100%) dùng "might"; "would like + to V" diễn tả mong muốn lịch sự.',
        unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: w1 },
        difficultyScore: 6,
      });

      // Q2: Error identification: would like + to V (not V-ing)
      questions.push({
        id: `clc_mod_ext_${baseIndex}_2`,
        grammarCategory: 'basic_modals',
        stage: 3,
        gradeLevel: 'Grade 7 Prep',
        format: 'error_identification',
        grammarRuleTitle: 'Would like + to Infinitive',
        grammarNote: 'would like must be followed by "to V", not V-ing.',
        instruction: 'Find the underlined part (A, B, C, or D) that contains an error:',
        promptText: `My grandfather (A) would like living (B) in a peaceful (C) countryside village (D).`,
        options: [
          { id: 'opt_a', text: 'My grandfather', label: 'A' },
          { id: 'opt_b', text: 'would like living', label: 'B', isMistakePart: true, correctedPart: 'would like to live' },
          { id: 'opt_c', text: 'peaceful', label: 'C' },
          { id: 'opt_d', text: 'countryside village', label: 'D' },
        ],
        correctAnswer: 'opt_b',
        explanation: '"would like" is followed by a to-infinitive ("would like to live"), not the gerund "living".',
        grammarTipVi: 'Bẫy đề thi: "like + V-ing", NHƯNG "would like + TO V" (sửa "would like living" thành "would like to live").',
        unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: w1 },
        difficultyScore: 6,
      });
      break;
    }
  }

  return questions;
}

/**
 * Fisher-Yates array shuffle helper
 */
function shuffleArray<T>(array: T[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
