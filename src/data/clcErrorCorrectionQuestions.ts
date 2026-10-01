/**
 * CLC Error Correction (Error Identification) Question Generator
 * Aligned with Vietnam CLC Entrance Exam Standards (Grade 5 -> Grade 6/7)
 * 
 * Implements Prompt 21 Requirement:
 * • The sentence must contain exactly ONE intended error.
 * • Marked with (A), (B), (C), (D).
 * • Exactly ONE correct answer per question.
 * • Connected to the selected Unit topic and vocabulary.
 * • Difficulty rule: ≈ 70% accessible Grade 5–6 extension (Stages 1 & 2) + 30% Grade 6–7 challenge (Stage 3).
 */

import { ClcQuestion } from '../types/clc';
import { toSafeSingular, toSafePlural } from './clcQuestionValidator';
import { TransformationContextInput } from './clcSentenceTransformations';

interface ErrorCorrectionTemplate {
  id: string;
  stage: 1 | 2 | 3;
  gradeLevel: 'Grade 5 Review' | 'Grade 6 Extension' | 'Grade 7 Prep';
  grammarCategory: string;
  grammarRuleTitle: string;
  grammarNote: string;
  buildItem: (home: string, outdoor: string, studyPlace: string, tool: string) => {
    sentenceWithMarkers: string;
    mistakeLetter: 'A' | 'B' | 'C' | 'D';
    options: {
      A: string;
      B: string;
      C: string;
      D: string;
    };
    correctedPart: string;
    explanation: string;
    grammarTipVi: string;
  };
  difficultyScore: number;
}

function getSmartContextWords(words: Array<{ word: string; meaning: string; example: string }>) {
  const allWordTexts = words.map((w) => toSafeSingular(w.word.toLowerCase()));

  const home =
    allWordTexts.find((w) =>
      ['house', 'home', 'flat', 'apartment', 'villa', 'cottage', 'room'].includes(w)
    ) || 'house';

  const outdoor =
    allWordTexts.find((w) =>
      ['garden', 'park', 'yard', 'playground', 'sports ground', 'farm', 'forest', 'beach', 'lake'].includes(w)
    ) || 'garden';

  const studyPlace =
    allWordTexts.find((w) =>
      ['library', 'classroom', 'computer room', 'laboratory', 'school'].includes(w)
    ) || 'library';

  const tool =
    allWordTexts.find((w) =>
      ['computer', 'laptop', 'tablet', 'robot', 'piano', 'guitar', 'bicycle', 'bike'].includes(w)
    ) || 'computer';

  return { home, outdoor, studyPlace, tool };
}

export function generateUnitErrorCorrectionQuestions(
  ctx: TransformationContextInput,
  words: Array<{ word: string; meaning: string; example: string }>,
  baseIndex: number
): ClcQuestion[] {
  const { home, outdoor, studyPlace, tool } = getSmartContextWords(words);
  const homePlural = toSafePlural(home);

  const templates: ErrorCorrectionTemplate[] = [
    // 1. Subject-Verb Agreement: He/She/It + V-s/es in Present Simple (Stage 1)
    {
      id: 'err_present_agreement',
      stage: 1,
      gradeLevel: 'Grade 5 Review',
      grammarCategory: 'present_simple_continuous',
      grammarRuleTitle: 'Error Correction: Subject-Verb Agreement (Present Simple)',
      grammarNote: 'With singular subjects (He, She, Nam), the verb must take -s or -es: Nam rides, not Nam ride.',
      buildItem: () => ({
        sentenceWithMarkers: `Every morning, Nam ride (A) his bicycle (B) to school with (C) his elder brother (D).`,
        mistakeLetter: 'A',
        options: {
          A: 'ride',
          B: 'his bicycle',
          C: 'with',
          D: 'his elder brother',
        },
        correctedPart: 'rides',
        explanation: 'The subject "Nam" is third-person singular, so the verb in the Present Simple must be "rides", not "ride".',
        grammarTipVi: 'Chủ ngữ "Nam" là ngôi thứ ba số ít, nên ở thì hiện tại đơn động từ phải thêm "s": "rides".',
      }),
      difficultyScore: 4,
    },

    // 2. Modal verb + Bare infinitive: should + V(bare) (Stage 1)
    {
      id: 'err_modal_bare_verb',
      stage: 1,
      gradeLevel: 'Grade 5 Review',
      grammarCategory: 'modals_can_must_should',
      grammarRuleTitle: 'Error Correction: Modal Verb + Bare Infinitive',
      grammarNote: 'Modal verbs (should, must, can) are followed by the bare infinitive without "to": should wash, not should to wash.',
      buildItem: () => ({
        sentenceWithMarkers: `You should to wash (A) your hands (B) carefully before (C) having your meals (D).`,
        mistakeLetter: 'A',
        options: {
          A: 'should to wash',
          B: 'your hands',
          C: 'before',
          D: 'having your meals',
        },
        correctedPart: 'should wash',
        explanation: 'After modal verbs like "should", use the bare infinitive without "to": "should wash your hands".',
        grammarTipVi: 'Sau động từ khuyết thiếu "should", dùng động từ nguyên mẫu không "to": "should wash", không dùng "should to wash".',
      }),
      difficultyScore: 4,
    },

    // 3. Past Simple negative with didn't + V(bare) (Stage 1)
    {
      id: 'err_past_negative_bare',
      stage: 1,
      gradeLevel: 'Grade 5 Review',
      grammarCategory: 'past_simple',
      grammarRuleTitle: 'Error Correction: Past Simple Negative Auxiliary didn\'t + V(bare)',
      grammarNote: 'In the past simple negative, didn\'t is followed by the bare infinitive: didn\'t go, not didn\'t went.',
      buildItem: (_h, _out, study) => ({
        sentenceWithMarkers: `Yesterday, Phong didn't went (A) to the school (B) ${study} because he was (C) tired (D).`,
        mistakeLetter: 'A',
        options: {
          A: "didn't went",
          B: 'to the school',
          C: 'because he was',
          D: 'tired',
        },
        correctedPart: "didn't go",
        explanation: 'After the auxiliary "didn\'t", the verb must be in its base form: "didn\'t go", not "didn\'t went".',
        grammarTipVi: 'Sau trợ động từ phủ định quá khứ "didn\'t", động từ trở về nguyên mẫu: "didn\'t go".',
      }),
      difficultyScore: 4,
    },

    // 4. Preposition of time with days of the week: on Monday, not in Monday (Stage 1)
    {
      id: 'err_preposition_days',
      stage: 1,
      gradeLevel: 'Grade 5 Review',
      grammarCategory: 'prepositions',
      grammarRuleTitle: 'Error Correction: Preposition of Time for Days of the Week',
      grammarNote: 'Use the preposition "on" with days of the week (on Monday, on Sunday morning), not "in".',
      buildItem: () => ({
        sentenceWithMarkers: `Our class usually has (A) English and Music lessons in (B) Friday morning (C) every week (D).`,
        mistakeLetter: 'B',
        options: {
          A: 'usually has',
          B: 'in',
          C: 'Friday morning',
          D: 'every week',
        },
        correctedPart: 'on',
        explanation: 'For specific days and day parts (Friday morning), use the preposition "on", not "in".',
        grammarTipVi: 'Với ngày trong tuần hoặc buổi của ngày cụ thể ("Friday morning"), bắt buộc dùng giới từ "on", không dùng "in".',
      }),
      difficultyScore: 4,
    },

    // 5. Quantifier with Countable/Uncountable: many vs. much (Stage 2)
    {
      id: 'err_quantifier_how_many',
      stage: 2,
      gradeLevel: 'Grade 6 Extension',
      grammarCategory: 'countable_uncountable',
      grammarRuleTitle: 'Error Correction: Quantifier with Plural Countable Noun',
      grammarNote: 'Use "how many" with countable plural nouns (books, students), not "how much".',
      buildItem: (_h, _out, study) => ({
        sentenceWithMarkers: `How much (A) English storybooks did (B) you borrow from (C) the school ${study} (D)?`,
        mistakeLetter: 'A',
        options: {
          A: 'How much',
          B: 'did',
          C: 'borrow from',
          D: `the school ${study}`,
        },
        correctedPart: 'How many',
        explanation: '"English storybooks" is a plural countable noun, so use "How many", not "How much".',
        grammarTipVi: '"English storybooks" là danh từ đếm được số nhiều, vì vậy phải dùng từ hỏi "How many", không dùng "How much".',
      }),
      difficultyScore: 5,
    },

    // 6. Double comparison mistake: more bigger -> bigger (Stage 2)
    {
      id: 'err_double_comparative',
      stage: 2,
      gradeLevel: 'Grade 6 Extension',
      grammarCategory: 'comparatives_superlatives',
      grammarRuleTitle: 'Error Correction: Double Comparative Error',
      grammarNote: 'Short adjectives take -er (bigger). Never use "more bigger".',
      buildItem: (_h, out) => ({
        sentenceWithMarkers: `The new sports ground (A) is more bigger (B) than the old (C) ${out} behind our school (D).`,
        mistakeLetter: 'B',
        options: {
          A: 'The new sports ground',
          B: 'more bigger',
          C: 'than the old',
          D: `behind our school`,
        },
        correctedPart: 'bigger',
        explanation: '"Big" is a one-syllable short adjective; its comparative form is "bigger". Using "more bigger" is a double comparative error.',
        grammarTipVi: '"Big" là tính từ ngắn 1 âm tiết, dạng so sánh hơn là "bigger", tuyệt đối không dùng "more bigger".',
      }),
      difficultyScore: 5,
    },

    // 7. Spend time V-ing vs. spend time to V (Stage 2)
    {
      id: 'err_spend_time_gerund',
      stage: 2,
      gradeLevel: 'Grade 6 Extension',
      grammarCategory: 'infinitives_gerunds',
      grammarRuleTitle: 'Error Correction: S + spend + time + V-ing',
      grammarNote: 'The verb "spend" takes a gerund (V-ing) for activities: spend 30 minutes reading, not to read.',
      buildItem: (_h, _out, _s, t) => ({
        sentenceWithMarkers: `Lan spent (A) forty minutes to practice (B) typing English exercises on (C) her new ${t} (D).`,
        mistakeLetter: 'B',
        options: {
          A: 'spent',
          B: 'to practice',
          C: 'typing English exercises on',
          D: `her new ${t}`,
        },
        correctedPart: 'practicing',
        explanation: 'The structure is "spend + time + V-ing". Therefore, "to practice" must be changed to "practicing".',
        grammarTipVi: 'Cấu trúc: "S + spend + thời gian + V-ING". Do đó phải sửa "to practice" thành "practicing".',
      }),
      difficultyScore: 5,
    },

    // 8. Subject-Verb Agreement with "There is" + Plural Nouns (Stage 2)
    {
      id: 'err_there_is_plural',
      stage: 2,
      gradeLevel: 'Grade 6 Extension',
      grammarCategory: 'there_is_are',
      grammarRuleTitle: 'Error Correction: Agreement with There is / There are',
      grammarNote: 'Use "There are" before plural nouns: There are many trees, not There is many trees.',
      buildItem: (_h, out) => ({
        sentenceWithMarkers: `There is (A) many green trees (B) and colorful flowers in (C) the school ${out} (D).`,
        mistakeLetter: 'A',
        options: {
          A: 'There is',
          B: 'many green trees',
          C: 'and colorful flowers in',
          D: `the school ${out}`,
        },
        correctedPart: 'There are',
        explanation: '"many green trees and colorful flowers" is plural, so the existential verb must be "There are", not "There is".',
        grammarTipVi: 'Danh từ phía sau "many green trees and colorful flowers" là số nhiều, vì vậy phải dùng "There are".',
      }),
      difficultyScore: 5,
    },

    // 9. Conjunction redundancy: Because ... so (Stage 3)
    {
      id: 'err_because_so_redundancy',
      stage: 3,
      gradeLevel: 'Grade 7 Prep',
      grammarCategory: 'conjunctions',
      grammarRuleTitle: 'Error Correction: Redundant Conjunction (Because ... so)',
      grammarNote: 'Never use "because" and "so" together in the same sentence: Because it rained, we stayed home (no "so").',
      buildItem: () => ({
        sentenceWithMarkers: `Because the weather was (A) cold and windy (B), so (C) the students stayed inside (D).`,
        mistakeLetter: 'C',
        options: {
          A: 'the weather was',
          B: 'cold and windy',
          C: 'so',
          D: 'the students stayed inside',
        },
        correctedPart: '(remove "so")',
        explanation: 'In English, "Because" and "so" cannot both connect the same two clauses. Delete "so".',
        grammarTipVi: 'Quy tắc vàng: Trong tiếng Anh không dùng đồng thời "Because" và "so" trong cùng một câu. Bỏ "so".',
      }),
      difficultyScore: 6,
    },

    // 10. Conditional / Future clause tense: When S + present simple, S + will + V (Stage 3)
    {
      id: 'err_time_clause_will',
      stage: 3,
      gradeLevel: 'Grade 7 Prep',
      grammarCategory: 'future_will_going_to',
      grammarRuleTitle: 'Error Correction: Present Simple in Future Time Clauses',
      grammarNote: 'In time clauses starting with when, as soon as, before, use Present Simple (not will): When she arrives, not when she will arrive.',
      buildItem: (h) => ({
        sentenceWithMarkers: `When my uncle will visit (A) us next weekend (B), he will bring (C) some fresh fruit from his ${h} (D).`,
        mistakeLetter: 'A',
        options: {
          A: 'will visit',
          B: 'next weekend',
          C: 'he will bring',
          D: `some fresh fruit from his ${h}`,
        },
        correctedPart: 'visits',
        explanation: 'In adverbial clauses of time introduced by "When", use the Present Simple ("visits") to express future time, never "will visit".',
        grammarTipVi: 'Trong mệnh đề trạng ngữ chỉ thời gian bắt đầu bằng "When", dùng thì hiện tại đơn ("visits") thay vì "will visit".',
      }),
      difficultyScore: 6,
    },
  ];

  const questions: ClcQuestion[] = [];

  templates.forEach((tmpl, idx) => {
    const item = tmpl.buildItem(home, outdoor, studyPlace, tool);

    const optionIds: Record<'A' | 'B' | 'C' | 'D', string> = {
      A: 'opt_a',
      B: 'opt_b',
      C: 'opt_c',
      D: 'opt_d',
    };

    questions.push({
      id: `clc_err_cor_${baseIndex}_${idx + 1}`,
      grammarCategory: tmpl.grammarCategory as any,
      stage: tmpl.stage,
      gradeLevel: tmpl.gradeLevel,
      format: 'error_identification',
      grammarRuleTitle: tmpl.grammarRuleTitle,
      grammarNote: tmpl.grammarNote,
      instruction: 'Identify the ONE underlined part (A, B, C, or D) that contains an error:',
      promptText: item.sentenceWithMarkers,
      options: [
        {
          id: 'opt_a',
          text: item.options.A,
          label: 'A',
          isMistakePart: item.mistakeLetter === 'A',
          correctedPart: item.mistakeLetter === 'A' ? item.correctedPart : undefined,
        },
        {
          id: 'opt_b',
          text: item.options.B,
          label: 'B',
          isMistakePart: item.mistakeLetter === 'B',
          correctedPart: item.mistakeLetter === 'B' ? item.correctedPart : undefined,
        },
        {
          id: 'opt_c',
          text: item.options.C,
          label: 'C',
          isMistakePart: item.mistakeLetter === 'C',
          correctedPart: item.mistakeLetter === 'C' ? item.correctedPart : undefined,
        },
        {
          id: 'opt_d',
          text: item.options.D,
          label: 'D',
          isMistakePart: item.mistakeLetter === 'D',
          correctedPart: item.mistakeLetter === 'D' ? item.correctedPart : undefined,
        },
      ],
      correctAnswer: optionIds[item.mistakeLetter],
      explanation: item.explanation,
      grammarTipVi: item.grammarTipVi,
      unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: home },
      difficultyScore: tmpl.difficultyScore,
    });
  });

  return questions;
}
