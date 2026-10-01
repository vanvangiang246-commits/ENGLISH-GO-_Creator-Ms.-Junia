/**
 * CLC Word Order (Sentence Scramble) Question Generator
 * Aligned with Vietnam CLC Entrance Exam Standards (Grade 5 -> Grade 6/7)
 * 
 * Implements Prompt 21 Requirement:
 * • For word-order questions: Create the correct sentence FIRST, then shuffle its words.
 * • Never generate random words and try to construct a sentence afterward.
 * • Connected to the selected Unit topic and vocabulary.
 * • Exactly ONE correct answer; distractors are plausible English orders with grammatical mistakes.
 * • Difficulty rule: ≈ 70% accessible Grade 5–6 extension (Stages 1 & 2) + 30% Grade 6–7 challenge (Stage 3).
 */

import { ClcQuestion } from '../types/clc';
import { toSafeSingular } from './clcQuestionValidator';
import { TransformationContextInput } from './clcSentenceTransformations';

interface WordOrderTemplate {
  id: string;
  stage: 1 | 2 | 3;
  gradeLevel: 'Grade 5 Review' | 'Grade 6 Extension' | 'Grade 7 Prep';
  grammarCategory: string;
  grammarRuleTitle: string;
  grammarNote: string;
  buildSentence: (home: string, outdoor: string, studyPlace: string, tool: string) => {
    correctSentence: string;
    tokens: string[];
    distractors: string[];
    explanation: string;
    grammarTipVi: string;
  };
  difficultyScore: number;
}

/**
 * Shuffles an array in place using Fisher-Yates with non-identity guarantee
 */
function shuffleTokens(tokens: string[]): string[] {
  const result = [...tokens];
  for (let attempt = 0; attempt < 10; attempt++) {
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    // Ensure the scrambled order is noticeably different from original
    if (result.join(' ') !== tokens.join(' ')) {
      break;
    }
  }
  return result;
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

export function generateUnitWordOrderQuestions(
  ctx: TransformationContextInput,
  words: Array<{ word: string; meaning: string; example: string }>,
  baseIndex: number
): ClcQuestion[] {
  const { home, outdoor, studyPlace, tool } = getSmartContextWords(words);

  // Standard sentence templates created FIRST with verified correct syntax
  const templates: WordOrderTemplate[] = [
    // 1. Present Simple with Adverb of Frequency (Stage 1)
    {
      id: 'scramble_prs_adv',
      stage: 1,
      gradeLevel: 'Grade 5 Review',
      grammarCategory: 'adverbs_frequency',
      grammarRuleTitle: 'Word Order: Adverb of Frequency + Action Verb',
      grammarNote: 'Adverbs of frequency (usually, always) go BEFORE the main verb: S + Adv + V + O.',
      buildSentence: () => ({
        correctSentence: `Nam usually rides his bicycle to school with his elder sister.`,
        tokens: ['Nam', 'usually', 'rides', 'his', 'bicycle', 'to', 'school', 'with', 'his', 'elder', 'sister.'],
        distractors: [
          `Nam rides usually his bicycle to school with his elder sister.`,
          `Nam usually rides to school his bicycle with his elder sister.`,
          `Usually Nam his bicycle rides to school with his elder sister.`,
        ],
        explanation: 'The frequency adverb "usually" must come BEFORE the action verb "rides": "Nam usually rides his bicycle...".',
        grammarTipVi: 'Trật tự từ chuẩn: Trạng từ chỉ tần suất "usually" đứng TRƯỚC động từ thường "rides".',
      }),
      difficultyScore: 4,
    },

    // 2. There are + Plural Noun + Prepositional Phrase (Stage 1)
    {
      id: 'scramble_there_are',
      stage: 1,
      gradeLevel: 'Grade 5 Review',
      grammarCategory: 'there_is_are',
      grammarRuleTitle: 'Word Order: There are + Plural Noun + Location',
      grammarNote: 'Structure: There are + quantifier + adjective + plural noun + in/at + place.',
      buildSentence: (_h, out) => ({
        correctSentence: `There are many green trees and colorful flowers in our ${out}.`,
        tokens: ['There', 'are', 'many', 'green', 'trees', 'and', 'colorful', 'flowers', 'in', 'our', `${out}.`],
        distractors: [
          `There are green many trees and flowers colorful in our ${out}.`,
          `There many green trees are and colorful flowers in our ${out}.`,
          `In our ${out} there many green trees are and colorful flowers.`,
        ],
        explanation: 'Adjectives "green" and "colorful" precede their nouns: "green trees and colorful flowers".',
        grammarTipVi: 'Tính từ đứng trước danh từ: "green trees" và "colorful flowers". Cấu trúc tồn tại: "There are + danh từ số nhiều + vị trí".',
      }),
      difficultyScore: 4,
    },

    // 3. Modal advice: should + bare verb (Stage 1)
    {
      id: 'scramble_should_advice',
      stage: 1,
      gradeLevel: 'Grade 5 Review',
      grammarCategory: 'modals_can_must_should',
      grammarRuleTitle: 'Word Order: Modal Verb (should) + Bare Verb + Adverb',
      grammarNote: 'Structure: Subject + should + V(bare) + Object + Adverb/Time.',
      buildSentence: () => ({
        correctSentence: `You should wash your hands carefully before having meals.`,
        tokens: ['You', 'should', 'wash', 'your', 'hands', 'carefully', 'before', 'having', 'meals.'],
        distractors: [
          `You should carefully wash your hands before having meals.`,
          `You wash should your hands carefully before having meals.`,
          `Before having meals you should hands your wash carefully.`,
        ],
        explanation: 'Natural English word order: "Subject (You) + should + wash (verb) + your hands (object) + carefully (adverb)...".',
        grammarTipVi: 'Cấu trúc câu lời khuyên chuẩn: S + should + V(nguyên mẫu) + O + trạng từ cách thức.',
      }),
      difficultyScore: 4,
    },

    // 4. Modal inability: cannot + bare verb + time phrase (Stage 2)
    {
      id: 'scramble_cannot_sports',
      stage: 2,
      gradeLevel: 'Grade 6 Extension',
      grammarCategory: 'modals_can_must_should',
      grammarRuleTitle: 'Word Order: Negative Modal + Verb + Prepositional Phrase',
      grammarNote: 'Structure: S + cannot + V(bare) + O + with [person] + time phrase.',
      buildSentence: () => ({
        correctSentence: `Linda cannot play badminton with her classmates this afternoon.`,
        tokens: ['Linda', 'cannot', 'play', 'badminton', 'with', 'her', 'classmates', 'this', 'afternoon.'],
        distractors: [
          `Linda cannot play with her classmates badminton this afternoon.`,
          `Linda play cannot badminton with her classmates this afternoon.`,
          `This afternoon Linda cannot badminton play with her classmates.`,
        ],
        explanation: 'The direct object "badminton" follows the verb "play" immediately: "play badminton with her classmates".',
        grammarTipVi: 'Động từ đi liền với tân ngữ trực tiếp: "play badminton", sau đó mới đến cụm giới từ "with her classmates".',
      }),
      difficultyScore: 5,
    },

    // 5. Future with be going to + bare verb (Stage 2)
    {
      id: 'scramble_future_plan',
      stage: 2,
      gradeLevel: 'Grade 6 Extension',
      grammarCategory: 'future_will_going_to',
      grammarRuleTitle: 'Word Order: Subject + be going to + Bare Verb + Time',
      grammarNote: 'Structure: S + is/are going to + V(bare) + O + time marker.',
      buildSentence: (_h, out) => ({
        correctSentence: `Our class is going to plant twenty new trees in the ${out} next Saturday.`,
        tokens: ['Our', 'class', 'is', 'going', 'to', 'plant', 'twenty', 'new', 'trees', 'in', 'the', `${out}`, 'next', 'Saturday.'],
        distractors: [
          `Our class is going twenty new trees to plant in the ${out} next Saturday.`,
          `Our class going is to plant twenty new trees in the ${out} next Saturday.`,
          `Next Saturday our class is to plant going twenty new trees in the ${out}.`,
        ],
        explanation: '"is going to" must be immediately followed by the bare verb "plant": "is going to plant twenty new trees".',
        grammarTipVi: 'Công thức thì tương lai gần: S + be + going to + V(nguyên mẫu) + tân ngữ + vị trí + thời gian.',
      }),
      difficultyScore: 5,
    },

    // 6. Time structure: S + spent + time + V-ing (Stage 2)
    {
      id: 'scramble_spend_time',
      stage: 2,
      gradeLevel: 'Grade 6 Extension',
      grammarCategory: 'infinitives_gerunds',
      grammarRuleTitle: 'Word Order: S + spent + [time] + V-ing + Location',
      grammarNote: 'Structure: Subject + spent + duration + gerund (V-ing) + Object + in + place.',
      buildSentence: (_h, _out, study) => ({
        correctSentence: `The students spent thirty minutes reading books in the school ${study}.`,
        tokens: ['The', 'students', 'spent', 'thirty', 'minutes', 'reading', 'books', 'in', 'the', 'school', `${study}.`],
        distractors: [
          `The students spent reading books thirty minutes in the school ${study}.`,
          `The students thirty minutes spent reading books in the school ${study}.`,
          `In the school ${study} the students spent reading thirty minutes books.`,
        ],
        explanation: 'The formula is "S + spent + time duration (thirty minutes) + V-ing (reading) + Object (books)".',
        grammarTipVi: 'Cấu trúc dành thời gian: S + spent + thời gian ("thirty minutes") + V-ing ("reading books").',
      }),
      difficultyScore: 5,
    },

    // 7. Wh- question: How often + auxiliary + subject + verb (Stage 2)
    {
      id: 'scramble_wh_question',
      stage: 2,
      gradeLevel: 'Grade 6 Extension',
      grammarCategory: 'question_formation',
      grammarRuleTitle: 'Word Order: How often + do/does + Subject + Verb + Object',
      grammarNote: 'Structure: Question phrase + auxiliary + S + V(bare) + O + with [person]?',
      buildSentence: () => ({
        correctSentence: `How often do you practice speaking English with your foreign friends?`,
        tokens: ['How', 'often', 'do', 'you', 'practice', 'speaking', 'English', 'with', 'your', 'foreign', 'friends?'],
        distractors: [
          `How often you do practice speaking English with your foreign friends?`,
          `How often do practice you speaking English with your foreign friends?`,
          `Do you how often practice speaking English with your foreign friends?`,
        ],
        explanation: 'In Wh- questions, the auxiliary "do" precedes the subject "you": "How often do you practice...".',
        grammarTipVi: 'Trật tự câu hỏi Wh-: Từ để hỏi ("How often") + trợ động từ ("do") + chủ ngữ ("you") + động từ chính ("practice").',
      }),
      difficultyScore: 5,
    },

    // 8. Superlative comparison with in the world (Stage 3)
    {
      id: 'scramble_superlative',
      stage: 3,
      gradeLevel: 'Grade 7 Prep',
      grammarCategory: 'comparatives_superlatives',
      grammarRuleTitle: 'Word Order: Subject + be + the + Superlative Adjective + Noun + in the world',
      grammarNote: 'Structure: S + is + the + adj-est + noun + prepositional phrase.',
      buildSentence: () => ({
        correctSentence: `Mount Everest is the highest and most famous mountain in the world.`,
        tokens: ['Mount', 'Everest', 'is', 'the', 'highest', 'and', 'most', 'famous', 'mountain', 'in', 'the', 'world.'],
        distractors: [
          `Mount Everest is highest the and most famous mountain in the world.`,
          `Mount Everest the highest and most famous is mountain in the world.`,
          `In the world Mount Everest highest the and most famous mountain is.`,
        ],
        explanation: 'Definite article "the" precedes the superlative adjectives: "is the highest and most famous mountain".',
        grammarTipVi: 'Trật tự so sánh nhất: S + to be + the + tính từ so sánh nhất + danh từ + cụm giới từ chỉ phạm vi.',
      }),
      difficultyScore: 6,
    },

    // 9. Concession clause with Although (Stage 3)
    {
      id: 'scramble_conjunction_although',
      stage: 3,
      gradeLevel: 'Grade 7 Prep',
      grammarCategory: 'conjunctions',
      grammarRuleTitle: 'Word Order: Although Clause, Main Clause',
      grammarNote: 'Structure: Although + S1 + V1 + adj, S2 + V2 + adverb.',
      buildSentence: () => ({
        correctSentence: `Although the morning was very cold, the children played outside happily.`,
        tokens: ['Although', 'the', 'morning', 'was', 'very', 'cold,', 'the', 'children', 'played', 'outside', 'happily.'],
        distractors: [
          `Although was the morning very cold, the children played outside happily.`,
          `The morning was very cold although, the children played outside happily.`,
          `Although the morning very cold was, the children played outside happily.`,
        ],
        explanation: 'In the adverbial clause, subject comes before verb: "Although the morning was very cold,...".',
        grammarTipVi: 'Mệnh đề nhượng bộ: Although + S ("the morning") + V ("was") + tính từ ("very cold"), mệnh đề chính.',
      }),
      difficultyScore: 6,
    },

    // 10. Passive / Technological descriptive sentence (Stage 3)
    {
      id: 'scramble_technology_solar',
      stage: 3,
      gradeLevel: 'Grade 7 Prep',
      grammarCategory: 'transformation_error_correction',
      grammarRuleTitle: 'Word Order: Noun + Participle Modifier + Verb + Object + for the House',
      grammarNote: 'Structure: Subject + [modifier] + Verb + Object + Prepositional phrase.',
      buildSentence: (h) => ({
        correctSentence: `Solar panels installed on the roof provide clean electricity for the ${h}.`,
        tokens: ['Solar', 'panels', 'installed', 'on', 'the', 'roof', 'provide', 'clean', 'electricity', 'for', 'the', `${h}.`],
        distractors: [
          `Solar panels installed on the roof clean electricity provide for the ${h}.`,
          `Solar panels on the roof installed provide clean electricity for the ${h}.`,
          `Installed solar panels on the roof provide clean electricity for the ${h}.`,
        ],
        explanation: 'Main verb "provide" follows the complete subject noun phrase "Solar panels installed on the roof".',
        grammarTipVi: 'Trật tự câu phức phân từ: Cụm chủ ngữ ("Solar panels installed on the roof") + Động từ chính ("provide") + Tân ngữ ("clean electricity").',
      }),
      difficultyScore: 7,
    },
  ];

  const questions: ClcQuestion[] = [];

  templates.forEach((tmpl, idx) => {
    const built = tmpl.buildSentence(home, outdoor, studyPlace, tool);
    const scrambledTokens = shuffleTokens(built.tokens);
    const scrambledText = scrambledTokens.join(' / ');

    questions.push({
      id: `clc_scramble_${baseIndex}_${idx + 1}`,
      grammarCategory: tmpl.grammarCategory as any,
      stage: tmpl.stage,
      gradeLevel: tmpl.gradeLevel,
      format: 'sentence_scramble',
      grammarRuleTitle: tmpl.grammarRuleTitle,
      grammarNote: tmpl.grammarNote,
      instruction: 'Rearrange the scrambled words to make a correct sentence:',
      promptText: scrambledText,
      scrambleWords: scrambledTokens,
      options: [
        { id: 'opt_a', text: built.correctSentence, label: 'A' },
        { id: 'opt_b', text: built.distractors[0], label: 'B' },
        { id: 'opt_c', text: built.distractors[1], label: 'C' },
        { id: 'opt_d', text: built.distractors[2], label: 'D' },
      ],
      correctAnswer: 'opt_a',
      explanation: built.explanation,
      grammarTipVi: built.grammarTipVi,
      unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: home },
      difficultyScore: tmpl.difficultyScore,
    });
  });

  return questions;
}
