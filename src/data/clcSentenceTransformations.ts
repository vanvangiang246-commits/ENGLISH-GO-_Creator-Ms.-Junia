/**
 * CLC Sentence Transformations and Identical-Meaning Question Generator
 * Aligned with Vietnam CLC Entrance Exam Standards (Grade 5 -> Grade 6/7)
 * 
 * Implements Prompt 19 Requirements:
 * • Varied sentence transformation and identical-meaning questions using selected Unit vocabulary.
 * • Short, familiar sentences suitable for strong Grade 5 students extending toward Grade 6.
 * • Prioritized transformation categories:
 *   1. Change between simple present / present continuous when appropriate
 *   2. can ↔ be able to
 *   3. should / shouldn't
 *   4. simple past ↔ time expressions
 *   5. be going to ↔ simple future when meaning is identical
 *   6. simple sentence rewrites with the same meaning (because ↔ so, comparatives, belongs to, there is/are ↔ has, suggestions)
 *   7. choose the sentence with the closest meaning
 * 
 * Strict Quality Constraints:
 * • Exactly ONE correct answer.
 * • All options must be grammatically valid English sentences, but only ONE must have the same meaning.
 * • Never create misleading, unnatural or unnecessarily difficult transformations.
 * • Difficulty rule: ≈ 70% accessible Grade 5–6 extension (Stage 1 & 2) + 30% Grade 6–7 challenge (Stage 3).
 * • No repetition within the same set.
 */

import { ClcQuestion, ClcGrammarCategoryId, ClcStage } from '../types/clc';
import { toSafeSingular, toSafePlural } from './clcQuestionValidator';

export interface TransformationContextInput {
  unitId: string;
  unitTitle: string;
  topic: string;
  vocab: Array<{ word: string; meaning: string; example: string }>;
}

export function generateUnitSentenceTransformations(
  ctx: TransformationContextInput,
  words: Array<{ word: string; meaning: string; example: string }>,
  baseIndex: number
): ClcQuestion[] {
  const smartWords = getSmartContextWords(words);
  const home = smartWords.home;
  const outdoor = smartWords.outdoor;
  const studyPlace = smartWords.studyPlace;
  const tool = smartWords.tool;

  const questions: ClcQuestion[] = [];
  const INSTRUCTION_CLOSEST_MEANING = 'Choose the sentence that has the closest meaning to the given sentence:';

  // =========================================================================
  // 1. CHANGE BETWEEN SIMPLE PRESENT / PRESENT CONTINUOUS
  // =========================================================================

  // 1.1 Habitual routine vs. today's temporary change (Stage 2 - Accessible Grade 6)
  questions.push({
    id: `clc_tr_prs_cont_${baseIndex}_1`,
    grammarCategory: 'present_simple_continuous',
    stage: 2,
    gradeLevel: 'Grade 6 Extension',
    format: 'sentence_transformation',
    grammarRuleTitle: 'Transformation: Habitual Routine vs. Temporary Action Today',
    grammarNote: 'Present Simple expresses daily routines; Present Continuous expresses actions happening today/at present.',
    instruction: INSTRUCTION_CLOSEST_MEANING,
    promptText: `Alex usually walks to school on Mondays, but today he is taking the bus.`,
    options: [
      { id: 'opt_a', text: `Today, Alex is going to school by bus instead of walking as usual.`, label: 'A' },
      { id: 'opt_b', text: `Alex always takes the bus to school and never walks.`, label: 'B' },
      { id: 'opt_c', text: `Alex usually takes the bus to school every Monday morning.`, label: 'C' },
      { id: 'opt_d', text: `Alex is walking to school today because the bus is late.`, label: 'D' },
    ],
    correctAnswer: 'opt_a',
    explanation: 'Alex usually walks, but today he rides the bus. Therefore, today he goes by bus instead of walking as usual.',
    grammarTipVi: 'Câu gốc diễn tả thói quen đi bộ ("usually walks"), nhưng hôm nay đi xe buýt ("today he is taking the bus"). Câu viết lại tương đương: "instead of walking as usual" (thay vì đi bộ như thường lệ).',
    unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: home },
    difficultyScore: 5,
  });

  // 1.2 Inquiry about occupation/routine (Stage 1 - Accessible Grade 5)
  questions.push({
    id: `clc_tr_prs_cont_${baseIndex}_2`,
    grammarCategory: 'present_simple_continuous',
    stage: 1,
    gradeLevel: 'Grade 5 Review',
    format: 'sentence_transformation',
    grammarRuleTitle: 'Transformation: Asking About Occupations',
    grammarNote: '"What is your job?" = "What do you do?". Do not confuse with "What are you doing?" (action at the moment).',
    instruction: INSTRUCTION_CLOSEST_MEANING,
    promptText: `What is your mother\'s occupation?`,
    options: [
      { id: 'opt_a', text: `What does your mother do?`, label: 'A' },
      { id: 'opt_b', text: `What is your mother doing right now?`, label: 'B' },
      { id: 'opt_c', text: `Where is your mother working at the moment?`, label: 'C' },
      { id: 'opt_d', text: `How does your mother travel to work?`, label: 'D' },
    ],
    correctAnswer: 'opt_a',
    explanation: '"What is your occupation/job?" is identical in meaning to "What do you do?". Option B asks about action right now.',
    grammarTipVi: 'Cặp câu hỏi đồng nghĩa kinh điển: "What is your job/occupation?" = "What do you do?" (Hỏi về nghề nghiệp). Phân biệt với "What are you doing?" (Hỏi đang làm gì lúc này).',
    unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: home },
    difficultyScore: 4,
  });

  // 1.3 Weather / Nature at present (Stage 1 - Accessible Grade 5)
  questions.push({
    id: `clc_tr_prs_cont_${baseIndex}_3`,
    grammarCategory: 'present_simple_continuous',
    stage: 1,
    gradeLevel: 'Grade 5 Review',
    format: 'sentence_transformation',
    grammarRuleTitle: 'Transformation: Present Weather Observation',
    grammarNote: 'Heavy rain is falling = It is raining heavily.',
    instruction: INSTRUCTION_CLOSEST_MEANING,
    promptText: `Look! Heavy rain is falling outside in the ${outdoor}.`,
    options: [
      { id: 'opt_a', text: `Look! It is raining heavily outside in the ${outdoor}.`, label: 'A' },
      { id: 'opt_b', text: `It usually rains heavily outside in the ${outdoor} during summer.`, label: 'B' },
      { id: 'opt_c', text: `It rained heavily outside in the ${outdoor} yesterday morning.`, label: 'C' },
      { id: 'opt_d', text: `It is going to be sunny outside in the ${outdoor} all afternoon.`, label: 'D' },
    ],
    correctAnswer: 'opt_a',
    explanation: '"Heavy rain is falling" is equivalent to "It is raining heavily". Both describe the current weather condition right now.',
    grammarTipVi: 'Chuyển đổi miêu tả thời tiết hiện tại: "Heavy rain is falling" = "It is raining heavily" (Trời đang mưa to).',
    unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: outdoor },
    difficultyScore: 4,
  });

  // =========================================================================
  // 2. CAN ↔ BE ABLE TO
  // =========================================================================

  // 2.1 Present ability: can -> is able to (Stage 1 - Accessible Grade 5)
  questions.push({
    id: `clc_tr_can_able_${baseIndex}_1`,
    grammarCategory: 'modals_can_must_should',
    stage: 1,
    gradeLevel: 'Grade 5 Review',
    format: 'sentence_transformation',
    grammarRuleTitle: 'Transformation: can ↔ be able to (Present Ability)',
    grammarNote: 'S + can + V(bare) = S + is/are/am able to + V(bare).',
    instruction: INSTRUCTION_CLOSEST_MEANING,
    promptText: `Nam can use the new ${tool} to design lovely cards.`,
    options: [
      { id: 'opt_a', text: `Nam is able to use the new ${tool} to design lovely cards.`, label: 'A' },
      { id: 'opt_b', text: `Nam must use the new ${tool} to design lovely cards.`, label: 'B' },
      { id: 'opt_c', text: `Nam should use the new ${tool} to design lovely cards.`, label: 'C' },
      { id: 'opt_d', text: `Nam was able to use the new ${tool} to design lovely cards yesterday.`, label: 'D' },
    ],
    correctAnswer: 'opt_a',
    explanation: '"can + V" expresses present ability, which is identical in meaning to "is able to + V".',
    grammarTipVi: 'Công thức chuyển đổi khả năng: "S + can + V" = "S + be able to + V". Chủ ngữ Nam số ít đi với "is able to".',
    unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: tool },
    difficultyScore: 4,
  });

  // 2.2 Present inability: cannot -> is not able to (Stage 2 - Accessible Grade 6)
  questions.push({
    id: `clc_tr_can_able_${baseIndex}_2`,
    grammarCategory: 'modals_can_must_should',
    stage: 2,
    gradeLevel: 'Grade 6 Extension',
    format: 'sentence_transformation',
    grammarRuleTitle: 'Transformation: cannot ↔ be unable to / is not able to',
    grammarNote: 'cannot + V = is/are not able to + V.',
    instruction: INSTRUCTION_CLOSEST_MEANING,
    promptText: `Linda cannot participate in the sports match this afternoon.`,
    options: [
      { id: 'opt_a', text: `Linda is not able to participate in the sports match this afternoon.`, label: 'A' },
      { id: 'opt_b', text: `Linda should not participate in the sports match this afternoon.`, label: 'B' },
      { id: 'opt_c', text: `Linda does not want to participate in the sports match this afternoon.`, label: 'C' },
      { id: 'opt_d', text: `Linda was not able to participate in the sports match yesterday.`, label: 'D' },
    ],
    correctAnswer: 'opt_a',
    explanation: '"cannot participate" expresses inability today, identical to "is not able to participate".',
    grammarTipVi: 'Dạng phủ định chỉ sự không thể làm gì: "cannot + V" = "is not able to + V".',
    unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: outdoor },
    difficultyScore: 5,
  });

  // 2.3 Past ability: was able to -> could (Stage 3 - Grade 6-7 Challenge)
  questions.push({
    id: `clc_tr_can_able_${baseIndex}_3`,
    grammarCategory: 'modals_can_must_should',
    stage: 3,
    gradeLevel: 'Grade 7 Prep',
    format: 'sentence_transformation',
    grammarRuleTitle: 'Transformation: could ↔ was/were able to (Past Ability)',
    grammarNote: 'In the past, could + V = was/were able to + V.',
    instruction: INSTRUCTION_CLOSEST_MEANING,
    promptText: `When Mary was six years old, she was able to read English storybooks.`,
    options: [
      { id: 'opt_a', text: `When Mary was six years old, she could read English storybooks.`, label: 'A' },
      { id: 'opt_b', text: `When Mary was six years old, she had to read English storybooks.`, label: 'B' },
      { id: 'opt_c', text: `When Mary was six years old, she is able to read English storybooks.`, label: 'C' },
      { id: 'opt_d', text: `When Mary was six years old, she wanted to read English storybooks.`, label: 'D' },
    ],
    correctAnswer: 'opt_a',
    explanation: '"was able to read" in the past has the same meaning as "could read".',
    grammarTipVi: 'Khả năng trong quá khứ: "was/were able to + V" = "could + V". Mary là số ít ở quá khứ nên dùng "could".',
    unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: studyPlace },
    difficultyScore: 6,
  });

  // =========================================================================
  // 3. SHOULD / SHOULDN'T
  // =========================================================================

  // 3.1 Good idea -> should (Stage 1 - Accessible Grade 5)
  questions.push({
    id: `clc_tr_should_${baseIndex}_1`,
    grammarCategory: 'modals_can_must_should',
    stage: 1,
    gradeLevel: 'Grade 5 Review',
    format: 'sentence_transformation',
    grammarRuleTitle: 'Transformation: It is a good idea to V ↔ should',
    grammarNote: 'It is a good idea for [someone] to V = [Someone] should + V(bare).',
    instruction: INSTRUCTION_CLOSEST_MEANING,
    promptText: `It is a good idea for you to read more books in the school ${studyPlace}.`,
    options: [
      { id: 'opt_a', text: `You should read more books in the school ${studyPlace}.`, label: 'A' },
      { id: 'opt_b', text: `You must not read books in the school ${studyPlace}.`, label: 'B' },
      { id: 'opt_c', text: `You might read books in the school ${studyPlace} next year.`, label: 'C' },
      { id: 'opt_d', text: `You shouldn\'t read books in the school ${studyPlace}.`, label: 'D' },
    ],
    correctAnswer: 'opt_a',
    explanation: '"It is a good idea for you to V" expresses advice, which is rewritten as "You should + V".',
    grammarTipVi: 'Dạng viết lại câu lời khuyên tiêu biểu: "It is a good idea (for S) to V" = "S + should + V(nguyên mẫu)".',
    unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: studyPlace },
    difficultyScore: 4,
  });

  // 3.2 Not good to V -> shouldn't (Stage 1 - Accessible Grade 5)
  questions.push({
    id: `clc_tr_should_${baseIndex}_2`,
    grammarCategory: 'modals_can_must_should',
    stage: 1,
    gradeLevel: 'Grade 5 Review',
    format: 'sentence_transformation',
    grammarRuleTitle: 'Transformation: It is not good to V ↔ shouldn\'t',
    grammarNote: 'It is bad / not good for [someone] to V = [Someone] shouldn\'t + V(bare).',
    instruction: INSTRUCTION_CLOSEST_MEANING,
    promptText: `It is not good for children to spend too much time on ${tool} screens.`,
    options: [
      { id: 'opt_a', text: `Children shouldn\'t spend too much time on ${tool} screens.`, label: 'A' },
      { id: 'opt_b', text: `Children should spend too much time on ${tool} screens.`, label: 'B' },
      { id: 'opt_c', text: `Children cannot spend too much time on ${tool} screens.`, label: 'C' },
      { id: 'opt_d', text: `Children always spend too much time on ${tool} screens.`, label: 'D' },
    ],
    correctAnswer: 'opt_a',
    explanation: '"It is not good for children to spend..." transforms directly into "Children shouldn\'t spend...".',
    grammarTipVi: 'Lời khuyên không nên làm: "It is not good to V" = "S + shouldn\'t + V(nguyên mẫu)".',
    unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: tool },
    difficultyScore: 4,
  });

  // 3.3 Teacher / Doctor advises -> should (Stage 2 - Accessible Grade 6)
  questions.push({
    id: `clc_tr_should_${baseIndex}_3`,
    grammarCategory: 'modals_can_must_should',
    stage: 2,
    gradeLevel: 'Grade 6 Extension',
    format: 'sentence_transformation',
    grammarRuleTitle: 'Transformation: advise someone to V ↔ should',
    grammarNote: '[Someone] advises you to V = You should + V(bare).',
    instruction: INSTRUCTION_CLOSEST_MEANING,
    promptText: `Our teacher advises us to review our vocabulary notes before the examination.`,
    options: [
      { id: 'opt_a', text: `We should review our vocabulary notes before the examination.`, label: 'A' },
      { id: 'opt_b', text: `We shouldn\'t review our vocabulary notes before the examination.`, label: 'B' },
      { id: 'opt_c', text: `We might review our vocabulary notes after the examination.`, label: 'C' },
      { id: 'opt_d', text: `We are able to forget our vocabulary notes before the examination.`, label: 'D' },
    ],
    correctAnswer: 'opt_a',
    explanation: '"Our teacher advises us to V" is rewritten with the modal of advice: "We should + V".',
    grammarTipVi: 'Chuyển đổi câu chứa động từ khuyên bảo: "advise sb to V" = "S + should + V".',
    unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: home },
    difficultyScore: 5,
  });

  // =========================================================================
  // 4. SIMPLE PAST ↔ TIME EXPRESSIONS
  // =========================================================================

  // 4.1 The last time ... was ... ago ↔ last + V ... ago (Stage 2 - Accessible Grade 6)
  questions.push({
    id: `clc_tr_past_time_${baseIndex}_1`,
    grammarCategory: 'past_simple',
    stage: 2,
    gradeLevel: 'Grade 6 Extension',
    format: 'sentence_transformation',
    grammarRuleTitle: 'Transformation: The last time S + V was [time] ago ↔ S last + V [time] ago',
    grammarNote: 'The last time we visited X was two years ago = We last visited X two years ago.',
    instruction: INSTRUCTION_CLOSEST_MEANING,
    promptText: `The last time our family visited Ha Long Bay was two years ago.`,
    options: [
      { id: 'opt_a', text: `Our family last visited Ha Long Bay two years ago.`, label: 'A' },
      { id: 'opt_b', text: `Our family has visited Ha Long Bay for two years.`, label: 'B' },
      { id: 'opt_c', text: `Our family will visit Ha Long Bay in two years.`, label: 'C' },
      { id: 'opt_d', text: `Our family visits Ha Long Bay every two years.`, label: 'D' },
    ],
    correctAnswer: 'opt_a',
    explanation: '"The last time S + V was [time] ago" means "S last + V(past) [time] ago".',
    grammarTipVi: 'Dạng bài viết lại thì quá khứ rất phổ biến trong đề thi: "The last time S + V(quá khứ) was + thời gian + ago" = "S + last + V(quá khứ) + thời gian + ago".',
    unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: home },
    difficultyScore: 5,
  });

  // 4.2 started V-ing ... ago ↔ began V-ing at the age of ... (Stage 2 - Accessible Grade 6)
  questions.push({
    id: `clc_tr_past_time_${baseIndex}_2`,
    grammarCategory: 'past_simple',
    stage: 2,
    gradeLevel: 'Grade 6 Extension',
    format: 'sentence_transformation',
    grammarRuleTitle: 'Transformation: started V-ing ↔ began V-ing',
    grammarNote: 'S + started + V-ing when S was X = S + began + V-ing at the age of X.',
    instruction: INSTRUCTION_CLOSEST_MEANING,
    promptText: `Mai started learning English when she was six years old.`,
    options: [
      { id: 'opt_a', text: `Mai began learning English at the age of six.`, label: 'A' },
      { id: 'opt_b', text: `Mai will begin learning English when she is six years old.`, label: 'B' },
      { id: 'opt_c', text: `Mai stopped learning English when she was six years old.`, label: 'C' },
      { id: 'opt_d', text: `Mai learns English six days every week.`, label: 'D' },
    ],
    correctAnswer: 'opt_a',
    explanation: '"started learning... when she was six" is equivalent to "began learning English at the age of six".',
    grammarTipVi: 'Cặp từ đồng nghĩa ở quá khứ: "started + V-ing" = "began + V-ing"; "when she was six" = "at the age of six".',
    unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: home },
    difficultyScore: 5,
  });

  // 4.3 It took [person] [time] to V ↔ S spent [time] V-ing (Stage 3 - Grade 6-7 Challenge)
  questions.push({
    id: `clc_tr_past_time_${baseIndex}_3`,
    grammarCategory: 'past_simple',
    stage: 3,
    gradeLevel: 'Grade 7 Prep',
    format: 'sentence_transformation',
    grammarRuleTitle: 'Transformation: It took [person] [time] to V ↔ spent [time] V-ing',
    grammarNote: 'It took + O + time + to V = S + spent + time + V-ing.',
    instruction: INSTRUCTION_CLOSEST_MEANING,
    promptText: `It took Nam thirty minutes to draw a picture of his dream ${home}.`,
    options: [
      { id: 'opt_a', text: `Nam spent thirty minutes drawing a picture of his dream ${home}.`, label: 'A' },
      { id: 'opt_b', text: `Nam spent thirty minutes to draw a picture of his dream ${home}.`, label: 'B' },
      { id: 'opt_c', text: `Nam took thirty minutes drawing a picture of his dream ${home}.`, label: 'C' },
      { id: 'opt_d', text: `Nam will spend thirty minutes on his picture tomorrow.`, label: 'D' },
    ],
    correctAnswer: 'opt_a',
    explanation: `"It took Nam thirty minutes to draw..." transforms into "Nam spent thirty minutes drawing...". Remember "spend + time + V-ing".`,
    grammarTipVi: 'Cấu trúc chuyển đổi thời gian kinh điển thi vào lớp 6 CLC: "It took + sb + time + to V" = "S + spent + time + V-ing". Chú ý sau spend là V-ing ("drawing").',
    unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: home },
    difficultyScore: 6,
  });

  // =========================================================================
  // 5. BE GOING TO ↔ SIMPLE FUTURE
  // =========================================================================

  // 5.1 Plan to V ↔ be going to V (Stage 2 - Accessible Grade 6)
  questions.push({
    id: `clc_tr_future_${baseIndex}_1`,
    grammarCategory: 'future_will_going_to',
    stage: 2,
    gradeLevel: 'Grade 6 Extension',
    format: 'sentence_transformation',
    grammarRuleTitle: 'Transformation: plan to V ↔ be going to V',
    grammarNote: 'S + plan to V = S + be going to + V(bare).',
    instruction: INSTRUCTION_CLOSEST_MEANING,
    promptText: `Our class plans to plant twenty new trees in the school ${outdoor} next Saturday.`,
    options: [
      { id: 'opt_a', text: `Our class is going to plant twenty new trees in the school ${outdoor} next Saturday.`, label: 'A' },
      { id: 'opt_b', text: `Our class planted twenty new trees in the school ${outdoor} last Saturday.`, label: 'B' },
      { id: 'opt_c', text: `Our class should plant twenty new trees because it is mandatory.`, label: 'C' },
      { id: 'opt_d', text: `Our class never plants trees in the school ${outdoor}.`, label: 'D' },
    ],
    correctAnswer: 'opt_a',
    explanation: '"plans to plant" expresses a definite future plan, rewritten as "is going to plant".',
    grammarTipVi: 'Kế hoạch trong tương lai: "S + plan to V" = "S + be going to + V". "Our class" là danh từ tập hợp số ít nên dùng "is going to".',
    unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: outdoor },
    difficultyScore: 5,
  });

  // 5.2 Intend to V ↔ will / is going to V (Stage 2 - Accessible Grade 6)
  questions.push({
    id: `clc_tr_future_${baseIndex}_2`,
    grammarCategory: 'future_will_going_to',
    stage: 2,
    gradeLevel: 'Grade 6 Extension',
    format: 'sentence_transformation',
    grammarRuleTitle: 'Transformation: intend to V ↔ will / be going to V',
    grammarNote: 'intend to V = will V / be going to V.',
    instruction: INSTRUCTION_CLOSEST_MEANING,
    promptText: `My family intends to spend our summer holiday in Da Nang.`,
    options: [
      { id: 'opt_a', text: `My family will spend our summer holiday in Da Nang.`, label: 'A' },
      { id: 'opt_b', text: `My family spent our summer holiday in Da Nang last year.`, label: 'B' },
      { id: 'opt_c', text: `My family is spending our summer holiday in Da Nang right now.`, label: 'C' },
      { id: 'opt_d', text: `My family cannot spend our summer holiday in Da Nang.`, label: 'D' },
    ],
    correctAnswer: 'opt_a',
    explanation: '"intends to spend" expresses a future intention, rewritten with future simple "will spend".',
    grammarTipVi: 'Diễn đạt ý định tương lai: "intend to V" chuyển thành tương lai đơn "will + V" hoặc "be going to + V".',
    unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: home },
    difficultyScore: 5,
  });

  // 5.3 Clear present evidence prediction (Stage 2 - Accessible Grade 6)
  questions.push({
    id: `clc_tr_future_${baseIndex}_3`,
    grammarCategory: 'future_will_going_to',
    stage: 2,
    gradeLevel: 'Grade 6 Extension',
    format: 'sentence_transformation',
    grammarRuleTitle: 'Transformation: Clear Evidence Prediction with be going to',
    grammarNote: 'When there is clear visual evidence, use "be going to".',
    instruction: INSTRUCTION_CLOSEST_MEANING,
    promptText: `Look at those dark clouds! It is certain that heavy rain is coming.`,
    options: [
      { id: 'opt_a', text: `Look at those dark clouds! It is going to rain heavily.`, label: 'A' },
      { id: 'opt_b', text: `Look at those dark clouds! It rained heavily yesterday.`, label: 'B' },
      { id: 'opt_c', text: `Look at those dark clouds! It seldom rains here in winter.`, label: 'C' },
      { id: 'opt_d', text: `Look at those dark clouds! It does not rain today.`, label: 'D' },
    ],
    correctAnswer: 'opt_a',
    explanation: '"Look at those dark clouds! ... rain is coming" provides visible evidence of imminent rain, rewritten with "is going to rain heavily".',
    grammarTipVi: 'Dấu hiệu dự đoán có căn cứ mắt thấy tai nghe: "Look at those dark clouds" -> "It is going to rain heavily".',
    unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: home },
    difficultyScore: 5,
  });

  // =========================================================================
  // 6. SIMPLE SENTENCE REWRITES WITH THE SAME MEANING
  // =========================================================================

  // 6.1 Because ↔ So (Cause and Effect) (Stage 2 - Accessible Grade 6)
  questions.push({
    id: `clc_tr_rewrite_${baseIndex}_1`,
    grammarCategory: 'conjunctions',
    stage: 2,
    gradeLevel: 'Grade 6 Extension',
    format: 'sentence_transformation',
    grammarRuleTitle: 'Transformation: Because ↔ So (Cause & Effect)',
    grammarNote: 'Because Clause A, Clause B = Clause A, so Clause B.',
    instruction: INSTRUCTION_CLOSEST_MEANING,
    promptText: `Because the weather was rainy and cold, the students stayed indoors to read books.`,
    options: [
      { id: 'opt_a', text: `The weather was rainy and cold, so the students stayed indoors to read books.`, label: 'A' },
      { id: 'opt_b', text: `The weather was rainy and cold, but the students stayed indoors to read books.`, label: 'B' },
      { id: 'opt_c', text: `The students stayed indoors to read books, so the weather was rainy and cold.`, label: 'C' },
      { id: 'opt_d', text: `Although the weather was rainy and cold, the students stayed indoors to read books.`, label: 'D' },
    ],
    correctAnswer: 'opt_a',
    explanation: '"Because A, B" is equivalent to "A, so B". Option C reverses the cause and effect.',
    grammarTipVi: 'Quy tắc chuyển đổi liên từ nguyên nhân - kết quả: "Because + A, B" = "A, so + B". Không được đảo ngược trật tự nhân quả.',
    unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: studyPlace },
    difficultyScore: 5,
  });

  // 6.2 Comparative inverse: taller ↔ shorter (Stage 1 - Accessible Grade 5)
  questions.push({
    id: `clc_tr_rewrite_${baseIndex}_2`,
    grammarCategory: 'comparatives_superlatives',
    stage: 1,
    gradeLevel: 'Grade 5 Review',
    format: 'sentence_transformation',
    grammarRuleTitle: 'Transformation: Comparative Inverse (taller ↔ shorter)',
    grammarNote: 'A is taller than B = B is shorter than A.',
    instruction: INSTRUCTION_CLOSEST_MEANING,
    promptText: `Phong is taller than his younger brother Huy.`,
    options: [
      { id: 'opt_a', text: `Huy is shorter than his older brother Phong.`, label: 'A' },
      { id: 'opt_b', text: `Phong is shorter than his younger brother Huy.`, label: 'B' },
      { id: 'opt_c', text: `Huy is as tall as his older brother Phong.`, label: 'C' },
      { id: 'opt_d', text: `Huy is taller than his older brother Phong.`, label: 'D' },
    ],
    correctAnswer: 'opt_a',
    explanation: 'If Phong is taller than Huy, then Huy is shorter than Phong.',
    grammarTipVi: 'Dạng so sánh đảo ngược tính từ trái nghĩa: "A is taller than B" = "B is shorter than A".',
    unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: home },
    difficultyScore: 4,
  });

  // 6.3 Superlative ↔ No other ... is as / -er than (Stage 3 - Grade 6-7 Challenge)
  questions.push({
    id: `clc_tr_rewrite_${baseIndex}_3`,
    grammarCategory: 'comparatives_superlatives',
    stage: 3,
    gradeLevel: 'Grade 7 Prep',
    format: 'sentence_transformation',
    grammarRuleTitle: 'Transformation: Superlative ↔ Comparative with Any Other',
    grammarNote: 'X is higher than any other Y = X is the highest Y.',
    instruction: INSTRUCTION_CLOSEST_MEANING,
    promptText: `Mount Everest is higher than any other mountain in the world.`,
    options: [
      { id: 'opt_a', text: `Mount Everest is the highest mountain in the world.`, label: 'A' },
      { id: 'opt_b', text: `Mount Everest is not as high as other mountains in the world.`, label: 'B' },
      { id: 'opt_c', text: `Mount Everest is lower than many mountains in the world.`, label: 'C' },
      { id: 'opt_d', text: `Other mountains in the world are higher than Mount Everest.`, label: 'D' },
    ],
    correctAnswer: 'opt_a',
    explanation: 'If Mount Everest is higher than every other mountain, it is the highest mountain in the world.',
    grammarTipVi: 'Dạng viết lại so sánh hơn sang so sánh nhất: "A is adj-er than any other..." = "A is the adj-est...".',
    unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: home },
    difficultyScore: 6,
  });

  // 6.4 Belongs to ↔ Possessive 's (Stage 1 - Accessible Grade 5)
  questions.push({
    id: `clc_tr_rewrite_${baseIndex}_4`,
    grammarCategory: 'possessives',
    stage: 1,
    gradeLevel: 'Grade 5 Review',
    format: 'sentence_transformation',
    grammarRuleTitle: 'Transformation: Belongs to ↔ Possessive \'s',
    grammarNote: 'This X belongs to Y = This is Y\'s X.',
    instruction: INSTRUCTION_CLOSEST_MEANING,
    promptText: `That modern blue backpack belongs to my cousin Peter.`,
    options: [
      { id: 'opt_a', text: `That is my cousin Peter\'s modern blue backpack.`, label: 'A' },
      { id: 'opt_b', text: `Peter wants to buy that modern blue backpack tomorrow.`, label: 'B' },
      { id: 'opt_c', text: `That modern blue backpack belonged to Peter last year.`, label: 'C' },
      { id: 'opt_d', text: `My cousin Peter lost that modern blue backpack yesterday.`, label: 'D' },
    ],
    correctAnswer: 'opt_a',
    explanation: '"belongs to my cousin Peter" means "is my cousin Peter\'s backpack".',
    grammarTipVi: 'Chuyển đổi sở hữu: "X belongs to Y" = "This/That is Y\'s X".',
    unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: home },
    difficultyScore: 4,
  });

  // 6.5 There is/are ↔ has/have (Stage 1 - Accessible Grade 5)
  questions.push({
    id: `clc_tr_rewrite_${baseIndex}_5`,
    grammarCategory: 'there_is_are',
    stage: 1,
    gradeLevel: 'Grade 5 Review',
    format: 'sentence_transformation',
    grammarRuleTitle: 'Transformation: There are [N] in [place] ↔ [Place] has [N]',
    grammarNote: 'There are X in Y = Y has X.',
    instruction: INSTRUCTION_CLOSEST_MEANING,
    promptText: `There are thirty-five students in our class 5B.`,
    options: [
      { id: 'opt_a', text: `Our class 5B has thirty-five students.`, label: 'A' },
      { id: 'opt_b', text: `Our class 5B had thirty-five students last school year.`, label: 'B' },
      { id: 'opt_c', text: `Our class 5B needs thirty-five students for the football team.`, label: 'C' },
      { id: 'opt_d', text: `There were thirty-five students in our class 5B yesterday.`, label: 'D' },
    ],
    correctAnswer: 'opt_a',
    explanation: '"There are thirty-five students in our class" is rewritten with have/has: "Our class 5B has thirty-five students".',
    grammarTipVi: 'Cặp cấu trúc tồn tại và sở hữu cơ bản: "There are + số lượng + in + N" = "N + has + số lượng".',
    unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: studyPlace },
    difficultyScore: 4,
  });

  // 6.6 Suggestions: Why don't we ↔ How about ↔ Let's (Stage 2 - Accessible Grade 6)
  questions.push({
    id: `clc_tr_rewrite_${baseIndex}_6`,
    grammarCategory: 'transformation_error_correction',
    stage: 2,
    gradeLevel: 'Grade 6 Extension',
    format: 'sentence_transformation',
    grammarRuleTitle: 'Transformation: Suggestions (Why don\'t we ↔ How about)',
    grammarNote: 'Why don\'t we + V(bare)? = How about + V-ing? = Let\'s + V(bare).',
    instruction: INSTRUCTION_CLOSEST_MEANING,
    promptText: `Why don\'t we clean up our classroom and the school ${outdoor} this afternoon?`,
    options: [
      { id: 'opt_a', text: `How about cleaning up our classroom and the school ${outdoor} this afternoon?`, label: 'A' },
      { id: 'opt_b', text: `How about clean up our classroom and the school ${outdoor} this afternoon?`, label: 'B' },
      { id: 'opt_c', text: `We shouldn\'t clean up our classroom and the school ${outdoor} this afternoon.`, label: 'C' },
      { id: 'opt_d', text: `Why do we have to clean up our classroom and the school ${outdoor} this afternoon?`, label: 'D' },
    ],
    correctAnswer: 'opt_a',
    explanation: '"Why don\'t we + V(bare)?" is rewritten as "How about + V-ing?". Option B incorrectly uses bare verb after about.',
    grammarTipVi: 'Công thức viết lại câu gợi ý: "Why don\'t we + V(nguyên mẫu)?" = "How about + V-ing?". Lưu ý sau giới từ "about" phải dùng V-ing ("cleaning up").',
    unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: outdoor },
    difficultyScore: 5,
  });

  // 6.7 Polite request: Please + V ↔ Could you please + V (Stage 1 - Accessible Grade 5)
  questions.push({
    id: `clc_tr_rewrite_${baseIndex}_7`,
    grammarCategory: 'imperatives',
    stage: 1,
    gradeLevel: 'Grade 5 Review',
    format: 'sentence_transformation',
    grammarRuleTitle: 'Transformation: Polite Request (Please + V ↔ Could you please)',
    grammarNote: 'Please + V = Could you please + V(bare)?',
    instruction: INSTRUCTION_CLOSEST_MEANING,
    promptText: `Please show me the way to the school ${studyPlace}.`,
    options: [
      { id: 'opt_a', text: `Could you please show me the way to the school ${studyPlace}?`, label: 'A' },
      { id: 'opt_b', text: `You must show me the way to the school ${studyPlace} immediately.`, label: 'B' },
      { id: 'opt_c', text: `Do you like showing me the way to the school ${studyPlace}?`, label: 'C' },
      { id: 'opt_d', text: `Why didn\'t you show me the way to the school ${studyPlace}?`, label: 'D' },
    ],
    correctAnswer: 'opt_a',
    explanation: '"Please show me..." is converted into the polite request "Could you please show me...?".',
    grammarTipVi: 'Chuyển đổi câu yêu cầu lịch sự: "Please + V" = "Could you please + V(nguyên mẫu)?".',
    unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: studyPlace },
    difficultyScore: 4,
  });

  // 6.8 Equality with not as ... as (Stage 2 - Accessible Grade 6)
  questions.push({
    id: `clc_tr_rewrite_${baseIndex}_8`,
    grammarCategory: 'comparatives_superlatives',
    stage: 2,
    gradeLevel: 'Grade 6 Extension',
    format: 'sentence_transformation',
    grammarRuleTitle: 'Transformation: Comparative ↔ Not as ... as',
    grammarNote: 'A was smaller than B = A was not as big as B.',
    instruction: INSTRUCTION_CLOSEST_MEANING,
    promptText: `The old school library was smaller than the new one.`,
    options: [
      { id: 'opt_a', text: `The old school library was not as big as the new one.`, label: 'A' },
      { id: 'opt_b', text: `The old school library was bigger than the new one.`, label: 'B' },
      { id: 'opt_c', text: `The new school library was smaller than the old one.`, label: 'C' },
      { id: 'opt_d', text: `Both school libraries were exactly the same size.`, label: 'D' },
    ],
    correctAnswer: 'opt_a',
    explanation: 'If the old library was smaller than the new one, then the old library was not as big as the new one.',
    grammarTipVi: 'Dạng so sánh không bằng tương đương: "A was smaller than B" = "A was not as big as B".',
    unitContext: { unitId: ctx.unitId, unitTitle: ctx.unitTitle, topic: ctx.topic, keyword: studyPlace },
    difficultyScore: 5,
  });

  return questions;
}

/**
 * Maps unit vocabulary items to natural syntactic slots (home, outdoor, studyPlace, tool)
 * to guarantee that all generated sentences are 100% fluent, idiomatic English.
 */
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
