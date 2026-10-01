/**
 * CLC Short Reading-and-Grammar Question Generator
 * Aligned with Vietnam CLC Entrance Exam Standards (Grade 5 -> Grade 6/7)
 * 
 * Implements Prompt 20 Requirements:
 * • Short reading texts of 3–5 sentences connected to the selected Unit topic and vocabulary.
 * • Followed by 1 focused question each.
 * • Key grammar & reading focus areas:
 *   1. Present simple / present continuous in context
 *   2. Simple past in familiar situations
 *   3. will / be going to for future plans & predictions
 *   4. can / should / must for abilities, rules & advice
 *   5. Basic Wh-questions (Who, Where, When, Why, How often, How many)
 *   6. Pronouns, articles, prepositions and conjunctions in connected text
 *   7. Choosing the correct word or sentence from context
 *   8. Simple inference from clear, unambiguous information
 * 
 * Strict Quality Constraints:
 * • Answer must be clearly supported by the text.
 * • Exactly ONE correct answer; distractors are plausible English options with different meanings.
 * • Natural, age-appropriate language (avoiding obscure facts or confusing grammar).
 * • Difficulty rule: ≈ 70% accessible Grade 5–6 extension (Stages 1 & 2) + 30% Grade 6–7 challenge (Stage 3).
 * • No repetition within the same session.
 */

import { ClcQuestion } from '../types/clc';
import { toSafeSingular } from './clcQuestionValidator';
import { TransformationContextInput } from './clcSentenceTransformations';

/**
 * Maps unit vocabulary items to natural syntactic slots (home, outdoor, studyPlace, tool, activity)
 * to guarantee that all generated reading texts are 100% fluent, idiomatic English.
 */
function getSmartReadingWords(words: Array<{ word: string; meaning: string; example: string }>) {
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

export function generateUnitReadingQuestions(
  ctx: TransformationContextInput,
  words: Array<{ word: string; meaning: string; example: string }>,
  baseIndex: number
): ClcQuestion[] {
  const smartWords = getSmartReadingWords(words);
  const home = smartWords.home;
  const outdoor = smartWords.outdoor;
  const studyPlace = smartWords.studyPlace;
  const tool = smartWords.tool;

  const questions: ClcQuestion[] = [];
  const INSTRUCTION_READING = 'Read the short text and choose the best answer:';

  // =========================================================================
  // 1. PRESENT SIMPLE VS. PRESENT CONTINUOUS IN CONTEXT
  // =========================================================================

  // 1.1 Habitual routine vs. right now (Stage 1 - Accessible Grade 5)
  questions.push({
    id: `clc_read_prs_${baseIndex}_1`,
    grammarCategory: 'present_simple_continuous',
    stage: 1,
    gradeLevel: 'Grade 5 Review',
    format: 'multiple_choice',
    grammarRuleTitle: 'Reading Context: Habit vs. Action Happening Right Now',
    grammarNote: 'Present Simple describes daily routines; Present Continuous describes actions happening at the moment.',
    instruction: INSTRUCTION_READING,
    promptContext: `Nam usually gets up at six o'clock and rides his bicycle to school. However, this morning it is raining heavily outside, so he is traveling by bus with his elder sister. He is looking out of the bus window at the green trees along the road.`,
    promptText: `How is Nam traveling to school this morning?`,
    options: [
      { id: 'opt_a', text: `By bus with his elder sister.`, label: 'A' },
      { id: 'opt_b', text: `By bicycle as usual.`, label: 'B' },
      { id: 'opt_c', text: `On foot with his classmates.`, label: 'C' },
      { id: 'opt_d', text: `By car with his father.`, label: 'D' },
    ],
    correctAnswer: 'opt_a',
    explanation: 'The passage explicitly states: "this morning it is raining heavily outside, so he is traveling by bus with his elder sister."',
    grammarTipVi: 'Đoạn văn nêu rõ thông tin: "this morning... he is traveling by bus with his elder sister", vì vậy đáp án đúng là đi bằng xe buýt.',
    unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: home },
    difficultyScore: 4,
  });

  // 1.2 Weekend routine vs. current activity (Stage 2 - Accessible Grade 6)
  questions.push({
    id: `clc_read_prs_${baseIndex}_2`,
    grammarCategory: 'present_simple_continuous',
    stage: 2,
    gradeLevel: 'Grade 6 Extension',
    format: 'multiple_choice',
    grammarRuleTitle: 'Reading Context: Present Simple Fact vs. Temporary Activity',
    grammarNote: 'Identify current actions signaled by "Today" or "Right now".',
    instruction: INSTRUCTION_READING,
    promptContext: `Mai loves nature and outdoor activities. Every Sunday, she helps her mother water the flowers in their ${outdoor}. Today is Sunday, and she is feeding the birds on the balcony. The birds are chirping happily in the morning sunshine.`,
    promptText: `What is Mai doing on the balcony today?`,
    options: [
      { id: 'opt_a', text: `She is feeding the birds.`, label: 'A' },
      { id: 'opt_b', text: `She is watering the flowers in the garden.`, label: 'B' },
      { id: 'opt_c', text: `She is reading books in the library.`, label: 'C' },
      { id: 'opt_d', text: `She is planting a new tree.`, label: 'D' },
    ],
    correctAnswer: 'opt_a',
    explanation: 'The passage clearly says: "Today is Sunday, and she is feeding the birds on the balcony."',
    grammarTipVi: 'Thông tin trực tiếp trong bài đọc: "Today is Sunday, and she is feeding the birds on the balcony".',
    unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: outdoor },
    difficultyScore: 5,
  });

  // =========================================================================
  // 2. SIMPLE PAST IN FAMILIAR SITUATIONS
  // =========================================================================

  // 2.1 Past event sequencing (Stage 1 - Accessible Grade 5)
  questions.push({
    id: `clc_read_past_${baseIndex}_1`,
    grammarCategory: 'past_simple',
    stage: 1,
    gradeLevel: 'Grade 5 Review',
    format: 'multiple_choice',
    grammarRuleTitle: 'Reading Context: Past Simple Events and Time',
    grammarNote: 'Identify completed past events using clear time markers.',
    instruction: INSTRUCTION_READING,
    promptContext: `Last Saturday, Peter and his classmates went on a school trip to the history museum. They arrived at eight o'clock in the morning and listened carefully to the guide. After that, they took many photos of ancient objects. They returned home at four o'clock in the afternoon.`,
    promptText: `At what time did Peter and his classmates return home?`,
    options: [
      { id: 'opt_a', text: `At four o'clock in the afternoon.`, label: 'A' },
      { id: 'opt_b', text: `At eight o'clock in the morning.`, label: 'B' },
      { id: 'opt_c', text: `At twelve o'clock at noon.`, label: 'C' },
      { id: 'opt_d', text: `Late in the evening.`, label: 'D' },
    ],
    correctAnswer: 'opt_a',
    explanation: 'The text clearly specifies: "They returned home at four o\'clock in the afternoon."',
    grammarTipVi: 'Chi tiết câu cuối của đoạn văn nêu rõ: "They returned home at four o\'clock in the afternoon" (4 giờ chiều).',
    unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: studyPlace },
    difficultyScore: 4,
  });

  // 2.2 Past activity with place preposition (Stage 2 - Accessible Grade 6)
  questions.push({
    id: `clc_read_past_${baseIndex}_2`,
    grammarCategory: 'past_simple',
    stage: 2,
    gradeLevel: 'Grade 6 Extension',
    format: 'multiple_choice',
    grammarRuleTitle: 'Reading Context: Past Simple Activity and Location',
    grammarNote: 'Check the location preposition used with the past action.',
    instruction: INSTRUCTION_READING,
    promptContext: `Yesterday was a warm and sunny day in our town. Lan bought an interesting storybook from the bookshop near her ${home}. In the afternoon, she spent two hours reading the book under a shade tree in the ${outdoor}. She felt very relaxed and peaceful.`,
    promptText: `Where did Lan spend two hours reading her new storybook?`,
    options: [
      { id: 'opt_a', text: `Under a shade tree in the ${outdoor}.`, label: 'A' },
      { id: 'opt_b', text: `Inside the school ${studyPlace}.`, label: 'B' },
      { id: 'opt_c', text: `In her bedroom at home.`, label: 'C' },
      { id: 'opt_d', text: `At the bookshop counter.`, label: 'D' },
    ],
    correctAnswer: 'opt_a',
    explanation: 'The passage says: "she spent two hours reading the book under a shade tree in the ' + outdoor + '."',
    grammarTipVi: 'Vị trí được nêu trực tiếp: "under a shade tree in the ' + outdoor + '".',
    unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: outdoor },
    difficultyScore: 5,
  });

  // =========================================================================
  // 3. WILL / BE GOING TO FOR PLANS & PREDICTIONS
  // =========================================================================

  // 3.1 Definite planned event with be going to (Stage 2 - Accessible Grade 6)
  questions.push({
    id: `clc_read_fut_${baseIndex}_1`,
    grammarCategory: 'future_will_going_to',
    stage: 2,
    gradeLevel: 'Grade 6 Extension',
    format: 'multiple_choice',
    grammarRuleTitle: 'Reading Context: Planned Future Action with be going to',
    grammarNote: '"be going to" expresses arranged plans and prepared activities.',
    instruction: INSTRUCTION_READING,
    promptContext: `Our school is organizing a Green Environment Day next Saturday. The teachers and students are going to clean up the school grounds and plant twenty young trees. Alex has already prepared his gloves and a watering can. He hopes that the weather will be pleasant.`,
    promptText: `What are the teachers and students going to do next Saturday?`,
    options: [
      { id: 'opt_a', text: `Clean up the grounds and plant twenty young trees.`, label: 'A' },
      { id: 'opt_b', text: `Visit the city science museum.`, label: 'B' },
      { id: 'opt_c', text: `Paint the classroom desks and chairs.`, label: 'C' },
      { id: 'opt_d', text: `Hold a sports competition on the ground.`, label: 'D' },
    ],
    correctAnswer: 'opt_a',
    explanation: 'The second sentence explicitly mentions: "The teachers and students are going to clean up the school grounds and plant twenty young trees."',
    grammarTipVi: 'Kế hoạch tương lai đã chuẩn bị được nêu rõ: "are going to clean up the school grounds and plant twenty young trees".',
    unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: outdoor },
    difficultyScore: 5,
  });

  // 3.2 Visible evidence prediction with be going to (Stage 2 - Accessible Grade 6)
  questions.push({
    id: `clc_read_fut_${baseIndex}_2`,
    grammarCategory: 'future_will_going_to',
    stage: 2,
    gradeLevel: 'Grade 6 Extension',
    format: 'multiple_choice',
    grammarRuleTitle: 'Reading Context: Evidence-Based Prediction',
    grammarNote: 'Present visible signs lead directly to a prediction with "be going to".',
    instruction: INSTRUCTION_READING,
    promptContext: `Look at the dark grey clouds gathering over the hills. The wind is blowing stronger, and the temperature is falling quickly. It is going to rain very heavily in a few minutes. We should go indoors and close all the windows.`,
    promptText: `According to the clear clues in the text, what is going to happen soon?`,
    options: [
      { id: 'opt_a', text: `It is going to rain very heavily.`, label: 'A' },
      { id: 'opt_b', text: `The sun will shine brightly.`, label: 'B' },
      { id: 'opt_c', text: `A colourful rainbow is going to appear.`, label: 'C' },
      { id: 'opt_d', text: `The weather is going to become warm and dry.`, label: 'D' },
    ],
    correctAnswer: 'opt_a',
    explanation: 'The text states: "It is going to rain very heavily in a few minutes."',
    grammarTipVi: 'Dấu hiệu mây đen và gió mạnh dẫn đến dự đoán chắc chắn: "It is going to rain very heavily in a few minutes".',
    unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: home },
    difficultyScore: 5,
  });

  // =========================================================================
  // 4. CAN / SHOULD / MUST FOR ABILITIES, RULES & ADVICE
  // =========================================================================

  // 4.1 Prohibition & rules with must not (Stage 1 - Accessible Grade 5)
  questions.push({
    id: `clc_read_mod_${baseIndex}_1`,
    grammarCategory: 'modals_can_must_should',
    stage: 1,
    gradeLevel: 'Grade 5 Review',
    format: 'multiple_choice',
    grammarRuleTitle: 'Reading Context: Library Rules with Modals',
    grammarNote: 'must = obligation; must not = prohibition; can = permission.',
    instruction: INSTRUCTION_READING,
    promptContext: `Welcome to our school ${studyPlace}! All students must show their student cards at the entrance desk. You can borrow up to three books at a time for two weeks. However, students must not bring food or sweet drinks into the reading room.`,
    promptText: `According to the rules, what must students NOT do in the reading room?`,
    options: [
      { id: 'opt_a', text: `Bring food or sweet drinks inside.`, label: 'A' },
      { id: 'opt_b', text: `Borrow books for two weeks.`, label: 'B' },
      { id: 'opt_c', text: `Show their student cards.`, label: 'C' },
      { id: 'opt_d', text: `Read books quietly at the desks.`, label: 'D' },
    ],
    correctAnswer: 'opt_a',
    explanation: 'The rule explicitly states: "students must not bring food or sweet drinks into the reading room."',
    grammarTipVi: 'Quy định cấm đoán "must not" được nêu rõ: "must not bring food or sweet drinks into the reading room".',
    unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: studyPlace },
    difficultyScore: 4,
  });

  // 4.2 Advice with should not (Stage 1 - Accessible Grade 5)
  questions.push({
    id: `clc_read_mod_${baseIndex}_2`,
    grammarCategory: 'modals_can_must_should',
    stage: 1,
    gradeLevel: 'Grade 5 Review',
    format: 'multiple_choice',
    grammarRuleTitle: 'Reading Context: Advice for Healthy Habits',
    grammarNote: 'should / shouldn\'t give helpful advice.',
    instruction: INSTRUCTION_READING,
    promptContext: `Hoa has an important English examination tomorrow morning. Her teacher advised the class to review their vocabulary notes and get plenty of rest tonight. Hoa shouldn't stay up late playing on the ${tool}. A good night's sleep will help her remember the words clearly.`,
    promptText: `What shouldn't Hoa do tonight before the examination?`,
    options: [
      { id: 'opt_a', text: `Stay up late playing on the ${tool}.`, label: 'A' },
      { id: 'opt_b', text: `Review her vocabulary notes.`, label: 'B' },
      { id: 'opt_c', text: `Get a good night's sleep.`, label: 'C' },
      { id: 'opt_d', text: `Listen to her teacher's advice.`, label: 'D' },
    ],
    correctAnswer: 'opt_a',
    explanation: 'The text advises: "Hoa shouldn\'t stay up late playing on the ' + tool + '."',
    grammarTipVi: 'Lời khuyên không nên làm được nêu rõ: "Hoa shouldn\'t stay up late playing on the ' + tool + '".',
    unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: tool },
    difficultyScore: 4,
  });

  // =========================================================================
  // 5. BASIC WH-QUESTIONS (WHO, WHERE, WHY, HOW OFTEN, HOW MANY)
  // =========================================================================

  // 5.1 Why question with cause/reason (Stage 2 - Accessible Grade 6)
  questions.push({
    id: `clc_read_wh_${baseIndex}_1`,
    grammarCategory: 'question_formation',
    stage: 2,
    gradeLevel: 'Grade 6 Extension',
    format: 'multiple_choice',
    grammarRuleTitle: 'Reading Context: Finding the Reason (Why ...?)',
    grammarNote: 'Answers to "Why" questions provide reasons, often introduced by "because".',
    instruction: INSTRUCTION_READING,
    promptContext: `David lives in a pleasant flat on the third floor with his parents. The flat has two bright bedrooms, a cozy living room, and a small balcony. David walks to school every morning in just five minutes. He likes living there because his flat is very close to his school.`,
    promptText: `Why does David like living in his flat?`,
    options: [
      { id: 'opt_a', text: `Because his flat is very close to his school.`, label: 'A' },
      { id: 'opt_b', text: `Because the building has a huge swimming pool.`, label: 'B' },
      { id: 'opt_c', text: `Because he takes the school bus every day.`, label: 'C' },
      { id: 'opt_d', text: `Because his flat is on the tenth floor.`, label: 'D' },
    ],
    correctAnswer: 'opt_a',
    explanation: 'The text provides the exact reason: "He likes living there because his flat is very close to his school."',
    grammarTipVi: 'Lý do trả lời cho câu hỏi "Why" nằm ở câu cuối: "because his flat is very close to his school".',
    unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: home },
    difficultyScore: 5,
  });

  // 5.2 How often question with frequency (Stage 2 - Accessible Grade 6)
  questions.push({
    id: `clc_read_wh_${baseIndex}_2`,
    grammarCategory: 'question_formation',
    stage: 2,
    gradeLevel: 'Grade 6 Extension',
    format: 'multiple_choice',
    grammarRuleTitle: 'Reading Context: Identifying Frequency (How often ...?)',
    grammarNote: 'Identify frequency expressions (twice a week, three times a week).',
    instruction: INSTRUCTION_READING,
    promptContext: `Minh loves sports, especially badminton. He practices playing badminton three times a week with his father. They usually play on the school sports ground on Tuesday, Thursday, and Saturday afternoons. Playing sports helps Minh stay healthy and full of energy.`,
    promptText: `How often does Minh practice playing badminton with his father?`,
    options: [
      { id: 'opt_a', text: `Three times a week.`, label: 'A' },
      { id: 'opt_b', text: `Every day after school.`, label: 'B' },
      { id: 'opt_c', text: `Once a week on Sunday.`, label: 'C' },
      { id: 'opt_d', text: `Twice a month in the morning.`, label: 'D' },
    ],
    correctAnswer: 'opt_a',
    explanation: 'The second sentence explicitly states: "He practices playing badminton three times a week with his father."',
    grammarTipVi: 'Tần suất được nêu rõ trong bài: "three times a week" (ba lần một tuần: thứ Ba, thứ Năm và thứ Bảy).',
    unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: outdoor },
    difficultyScore: 5,
  });

  // =========================================================================
  // 6. PRONOUNS, PREPOSITIONS & CONJUNCTIONS IN CONNECTED TEXT
  // =========================================================================

  // 6.1 Pronoun reference in cohesive text (Stage 3 - Grade 6-7 Challenge)
  questions.push({
    id: `clc_read_conn_${baseIndex}_1`,
    grammarCategory: 'pronouns',
    stage: 3,
    gradeLevel: 'Grade 7 Prep',
    format: 'multiple_choice',
    grammarRuleTitle: 'Reading Context: Pronoun Reference in Context',
    grammarNote: 'Determine which noun phrase a pronoun refers back to in the preceding sentence.',
    instruction: INSTRUCTION_READING,
    promptContext: `Yesterday, Tom and his sister went to the supermarket near their ${home}. They bought a fresh loaf of bread, two bottles of milk, and some red apples. When they arrived home, Mary placed the milk in the refrigerator while Tom prepared the table. They enjoyed a delicious breakfast together.`,
    promptText: `In the third sentence ("When they arrived home..."), what does the word "they" refer to?`,
    options: [
      { id: 'opt_a', text: `Tom and his sister.`, label: 'A' },
      { id: 'opt_b', text: `The supermarket clerks.`, label: 'B' },
      { id: 'opt_c', text: `The two bottles of milk.`, label: 'C' },
      { id: 'opt_d', text: `The fresh red apples.`, label: 'D' },
    ],
    correctAnswer: 'opt_a',
    explanation: '"they" refers back to the two people mentioned in the first sentence: "Tom and his sister".',
    grammarTipVi: 'Đại từ nhân xưng "they" thay thế cho hai nhân vật chính đã được nhắc đến ở câu trước: "Tom and his sister".',
    unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: home },
    difficultyScore: 6,
  });

  // 6.2 Conjunction of contrast (Although ... but) (Stage 3 - Grade 6-7 Challenge)
  questions.push({
    id: `clc_read_conn_${baseIndex}_2`,
    grammarCategory: 'conjunctions',
    stage: 3,
    gradeLevel: 'Grade 7 Prep',
    format: 'multiple_choice',
    grammarRuleTitle: 'Reading Context: Conjunctions of Contrast (Although / Because)',
    grammarNote: 'Identify the cause of the children\'s happiness from the text.',
    instruction: INSTRUCTION_READING,
    promptContext: `Although the morning was chilly and windy, the children went outside to fly their kites in the field. The strong wind carried their colourful kites high into the blue sky. The children ran happily across the grass because the kites stayed up in the air easily. By lunchtime, they returned home with cheerful smiles.`,
    promptText: `Why did the children run happily across the grass?`,
    options: [
      { id: 'opt_a', text: `Because their kites stayed up in the air easily.`, label: 'A' },
      { id: 'opt_b', text: `Because they felt cold and wanted to go home.`, label: 'B' },
      { id: 'opt_c', text: `Because it started raining heavily.`, label: 'C' },
      { id: 'opt_d', text: `Because they lost their colourful kites.`, label: 'D' },
    ],
    correctAnswer: 'opt_a',
    explanation: 'The text gives the reason directly: "The children ran happily across the grass because the kites stayed up in the air easily."',
    grammarTipVi: 'Nguyên nhân nằm ngay sau liên từ "because": "because the kites stayed up in the air easily".',
    unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: outdoor },
    difficultyScore: 6,
  });

  // =========================================================================
  // 7. CHOOSING THE CORRECT WORD OR SENTENCE FROM CONTEXT
  // =========================================================================

  // 7.1 Completing statement from informational context (Stage 2 - Accessible Grade 6)
  questions.push({
    id: `clc_read_compl_${baseIndex}_1`,
    grammarCategory: 'transformation_error_correction',
    stage: 2,
    gradeLevel: 'Grade 6 Extension',
    format: 'multiple_choice',
    grammarRuleTitle: 'Reading Context: Completing Statements from Scientific/Daily Text',
    grammarNote: 'Match key verbs and details accurately from the reading.',
    instruction: INSTRUCTION_READING,
    promptContext: `Solar panels installed on the roof capture clean energy from sunlight. This solar energy is converted into electricity to power the lights and the ${tool} in the smart house. Using solar power helps our family save money and protect the environment. It is a modern and clean way to produce energy.`,
    promptText: `According to the passage, using solar energy helps the family _____ and protect the environment.`,
    options: [
      { id: 'opt_a', text: `save money`, label: 'A' },
      { id: 'opt_b', text: `spend more money`, label: 'B' },
      { id: 'opt_c', text: `waste electricity`, label: 'C' },
      { id: 'opt_d', text: `pollute the air`, label: 'D' },
    ],
    correctAnswer: 'opt_a',
    explanation: 'The third sentence states: "Using solar power helps our family save money and protect the environment."',
    grammarTipVi: 'Cụm từ chính xác trong bài: "save money and protect the environment".',
    unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: tool },
    difficultyScore: 5,
  });

  // =========================================================================
  // 8. SIMPLE INFERENCE FROM CLEAR INFORMATION
  // =========================================================================

  // 8.1 Simple deduction: weather inference (Stage 3 - Grade 6-7 Challenge)
  questions.push({
    id: `clc_read_infer_${baseIndex}_1`,
    grammarCategory: 'transformation_error_correction',
    stage: 3,
    gradeLevel: 'Grade 7 Prep',
    format: 'multiple_choice',
    grammarRuleTitle: 'Reading Context: Simple Inference from Weather Clues',
    grammarNote: 'Infer conditions from actions: putting on raincoat + taking umbrella = wet, rainy weather.',
    instruction: INSTRUCTION_READING,
    promptContext: `Before leaving her ${home} for school, Lan looked outside and saw dark clouds and heavy raindrops splashing on the windows. She quickly put on her waterproof yellow raincoat, took her sturdy umbrella, and put her books inside a plastic bag. Then she stepped outside carefully into the street.`,
    promptText: `We can clearly infer from Lan\'s actions that the weather outside was _____.`,
    options: [
      { id: 'opt_a', text: `rainy and wet`, label: 'A' },
      { id: 'opt_b', text: `dry and sunny`, label: 'B' },
      { id: 'opt_c', text: `very hot and dusty`, label: 'C' },
      { id: 'opt_d', text: `freezing cold with snow`, label: 'D' },
    ],
    correctAnswer: 'opt_a',
    explanation: 'Lan saw heavy raindrops, put on a waterproof raincoat, and took an umbrella, which clearly indicates rainy and wet weather.',
    grammarTipVi: 'Suy luận hợp lý từ các chi tiết rõ ràng: hạt mưa rơi ("raindrops"), mặc áo mưa ("raincoat"), cầm ô ("umbrella") -> thời tiết mưa và ẩm ướt ("rainy and wet").',
    unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: home },
    difficultyScore: 6,
  });

  // 8.2 Simple deduction: punctuality / time inference (Stage 3 - Grade 6-7 Challenge)
  questions.push({
    id: `clc_read_infer_${baseIndex}_2`,
    grammarCategory: 'past_simple',
    stage: 3,
    gradeLevel: 'Grade 7 Prep',
    format: 'multiple_choice',
    grammarRuleTitle: 'Reading Context: Simple Inference from Time Details',
    grammarNote: 'Compare departure time (7:20), travel time (2 minutes), and bell time (7:30).',
    instruction: INSTRUCTION_READING,
    promptContext: `At Nguyen Du Primary School, the morning bell rings at seven thirty. Nam lives right next door to the school gate and only needs two minutes to walk there. This morning, Nam left his ${home} at seven twenty. He walked at a relaxed pace and arrived at his classroom with plenty of time to spare.`,
    promptText: `We can clearly infer that Nam arrived at his classroom _____.`,
    options: [
      { id: 'opt_a', text: `on time before the morning bell rang`, label: 'A' },
      { id: 'opt_b', text: `late after class had already started`, label: 'B' },
      { id: 'opt_c', text: `in the afternoon after lunch`, label: 'C' },
      { id: 'opt_d', text: `by riding a fast motorcycle`, label: 'D' },
    ],
    correctAnswer: 'opt_a',
    explanation: 'Nam left at 7:20, needs only 2 minutes (arrived ~7:22), and the bell rings at 7:30 with plenty of time to spare -> on time before the bell rang.',
    grammarTipVi: 'Suy luận thời gian đơn giản: Nam rời nhà lúc 7:20, đi mất 2 phút (tới lúc 7:22), trống vào lớp lúc 7:30 -> Nam đến đúng giờ trước khi trống điểm ("on time before the morning bell rang").',
    unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: home },
    difficultyScore: 6,
  });

  return questions;
}
