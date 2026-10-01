/**
 * CLC Grammar Mode - Structured Lessons Database for Grade 5 Units 1 to 20
 * and Dynamic Builder for Any Selected Unit.
 */

import { ClcUnitLesson } from '../types/clc';
import { CLC_LESSONS_UNIT_01_TO_05 } from './clcLessons/unit01to05';
import { CLC_LESSONS_UNIT_06_TO_10 } from './clcLessons/unit06to10';
import { CLC_LESSONS_UNIT_11_TO_15 } from './clcLessons/unit11to15';
import { CLC_LESSONS_UNIT_16_TO_20 } from './clcLessons/unit16to20';
import { getUnitCurriculumProfile, ALL_CURRICULUM_PROFILES } from './curriculum/index';

/**
 * All 20 curated Grade 5 CLC lessons
 */
export const GRADE_5_CLC_LESSONS: Record<string, ClcUnitLesson> = {
  ...CLC_LESSONS_UNIT_01_TO_05,
  ...CLC_LESSONS_UNIT_06_TO_10,
  ...CLC_LESSONS_UNIT_11_TO_15,
  ...CLC_LESSONS_UNIT_16_TO_20,
};

/**
 * Returns the structured CLC grammar lesson for any unit.
 * If unitId is in Grade 5 (U01-U20), returns the exact curated lesson.
 * If unitId is from another grade (e.g. Grade 4, 3, 2, 1), generates a complete,
 * structured lesson connected to that unit's vocabulary and topic so that
 * the CLC page is NEVER empty.
 */
export function getClcLessonForUnit(unitId: string): ClcUnitLesson {
  if (GRADE_5_CLC_LESSONS[unitId]) {
    return GRADE_5_CLC_LESSONS[unitId];
  }

  // Fallback / Dynamic generation for other units
  const profile = getUnitCurriculumProfile(unitId) || ALL_CURRICULUM_PROFILES['GS5-U20'];
  const title = profile?.title || 'Selected Unit';
  const topic = profile?.topic || 'English Communication';
  const unitNum = profile?.unitNumber || 1;
  const grade = profile?.grade || 5;

  const coreVocab = profile?.coreVocabulary || [];
  const word1 = coreVocab[0]?.word || 'school';
  const word2 = coreVocab[1]?.word || 'friend';
  const word3 = coreVocab[2]?.word || 'activity';

  return {
    unitId: profile?.unitId || unitId,
    unitNumber: unitNum,
    unitTitle: title,
    topic,
    targetLevel: `Grade ${grade} Foundation → Grade 6/7 Advanced CLC`,
    grammarFocus: {
      title: `Grammar Focus for ${title}: Sentence Structure, Tenses & Vocabulary Syntax`,
      vietnameseTitle: `Trọng tâm ngữ pháp Unit ${unitNum}: Cấu trúc câu, Thì & Từ vựng chủ đề ${topic}`,
      badge: 'TOPIC & SYNTAX EXPANSION',
      levelTag: `Grade ${grade} Review → Grade 6/7 Extension`,
      overview: `Review fundamental sentence patterns from ${title} and extend knowledge to compound sentences, relative clauses, and specialized entrance examination structures.`,
      targetExams: 'Hà Nội - Amsterdam, Chuyên Ngoại Ngữ, Cầu Giấy, Archimedes',
    },
    quickRule: {
      summary: `Nắm vững cấu trúc câu miêu tả chủ đề ${topic}. Kết hợp thì Hiện tại đơn, Quá khứ đơn và Động từ khuyết thiếu để diễn đạt ý tưởng trọn vẹn trong các bài thi Chuyên.`,
      formulas: [
        {
          pattern: `S + Verb (s/es) + ${word1} / ${word2} ...`,
          meaning: `Cấu trúc cơ bản sử dụng từ vựng chủ đề ${topic}`,
          usageVi: `Ví dụ: Students regularly use ${word1} in their daily routines.`,
        },
        {
          pattern: `Compound: Clause 1, AND / BUT / SO + Clause 2`,
          meaning: `Nối các câu đơn thành câu ghép mở rộng`,
          usageVi: `Ví dụ: They enjoy ${word2}, but they also focus on academic excellence.`,
        },
        {
          pattern: `Complex: BECAUSE / ALTHOUGH + Clause, Main Clause`,
          meaning: `Mệnh đề phụ thuộc nâng cao thường gặp trong đề thi lớp 6-7`,
          usageVi: `Ví dụ: Although ${word3} was demanding, all learners performed admirably.`,
        },
      ],
      goldenRulesVi: [
        `Luôn chú ý hòa hợp giữa Chủ ngữ và Động từ với từ vựng "${word1}".`,
        `Không nhầm lẫn giữa tính từ và trạng từ khi miêu tả các hoạt động trong bài.`,
        `Áp dụng linh hoạt các liên từ để câu văn phong phú, đạt điểm cao trong bài thi Chuyên.`,
      ],
      commonMistakeAlert: {
        wrongExample: `Students does not practice ${word1} and they is very happily.`,
        correctExample: `Students DO NOT practice ${word1} and they ARE very HAPPY.`,
        whyVi: `Chủ ngữ số nhiều "students" phải đi với "do not" và "are"; sau to be phải dùng tính từ "happy", không dùng trạng từ "happily".`,
      },
    },
    examples: [
      {
        id: `dyn-ex1`,
        english: `In our lesson about ${topic.toLowerCase()}, we learned that ${word1} is very important for every student.`,
        vietnamese: `Trong bài học về ${topic.toLowerCase()}, chúng ta đã biết rằng ${word1} rất quan trọng đối với mỗi học sinh.`,
        highlightWord: `${word1} is very important`,
        grammarNote: `Sử dụng to be "is" với danh từ số ít "${word1}".`,
      },
      {
        id: `dyn-ex2`,
        english: `Although ${word2} was unfamiliar at first, the pupils quickly understood its practical application.`,
        vietnamese: `Mặc dù ${word2} ban đầu còn bỡ ngỡ, các bạn học sinh đã nhanh chóng nắm được cách ứng dụng thực tế.`,
        highlightWord: `Although ${word2} was unfamiliar`,
        grammarNote: `Mệnh đề nhượng bộ với "Although", vế sau chia thì quá khứ đơn "understood".`,
      },
      {
        id: `dyn-ex3`,
        english: `Every learner should take advantage of ${word3} to broaden their horizons.`,
        vietnamese: `Mỗi bạn học sinh nên tận dụng ${word3} để mở rộng chân trời hiểu biết của mình.`,
        highlightWord: `should take advantage of`,
        grammarNote: `Động từ khuyết thiếu "should + V-nguyên thể" đưa ra lời khuyên học tập.`,
      },
    ],
    practiceQuestions: [
      {
        id: `dyn-p1`,
        grammarCategory: 'transformation_error_correction',
        stage: 1,
        gradeLevel: 'Grade 5 Review',
        format: 'multiple_choice',
        grammarRuleTitle: `Subject-Verb Agreement with ${word1}`,
        grammarNote: 'Chia động từ theo chủ ngữ số ít/nhiều.',
        instruction: 'Choose the correct form of the verb:',
        promptText: `Every student in the classroom ______ enthusiastic about learning ${word1} today.`,
        options: [
          { id: 'a', text: 'is', label: 'A' },
          { id: 'b', text: 'are', label: 'B' },
          { id: 'c', text: 'were', label: 'C' },
          { id: 'd', text: 'be', label: 'D' },
        ],
        correctAnswer: 'a',
        explanation: '"Every student" is a singular subject requiring the singular verb "is".',
        grammarTipVi: '"Every + danh từ số ít" là chủ ngữ số ít nên chia động từ "is".',
        unitContext: { unitId: profile.unitId, unitTitle: title, topic, keyword: word1 },
        difficultyScore: 3,
      },
      {
        id: `dyn-p2`,
        grammarCategory: 'conjunctions',
        stage: 1,
        gradeLevel: 'Grade 5 Review',
        format: 'multiple_choice',
        grammarRuleTitle: 'Conjunction of Reason: Because',
        grammarNote: 'because + S + V.',
        instruction: 'Select the best conjunction to connect the reason:',
        promptText: `We practiced ${word2} repeatedly ______ we wanted to master the unit vocabulary thoroughly.`,
        options: [
          { id: 'a', text: 'because', label: 'A' },
          { id: 'b', text: 'although', label: 'B' },
          { id: 'c', text: 'so', label: 'C' },
          { id: 'd', text: 'but', label: 'D' },
        ],
        correctAnswer: 'a',
        explanation: '"because" introduces the clause giving the reason for practicing.',
        grammarTipVi: 'Dùng liên từ "because" để giải thích lý do.',
        unitContext: { unitId: profile.unitId, unitTitle: title, topic, keyword: word2 },
        difficultyScore: 3,
      },
    ],
    challengeQuestions: [
      {
        id: `dyn-c1`,
        grammarCategory: 'transformation_error_correction',
        stage: 2,
        gradeLevel: 'Grade 6 Extension',
        format: 'sentence_transformation',
        grammarRuleTitle: 'Sentence Transformation: Suggestions',
        grammarNote: "Why don't we + V...? = How about + V-ing...?",
        instruction: 'Choose the sentence that has the same meaning:',
        promptText: `Why don't we practice speaking about ${topic.toLowerCase()} together this weekend?`,
        options: [
          { id: 'a', text: `How about practicing speaking about ${topic.toLowerCase()} together this weekend?`, label: 'A' },
          { id: 'b', text: `How about to practice speaking about ${topic.toLowerCase()} together this weekend?`, label: 'B' },
          { id: 'c', text: `Why not we practice speaking about ${topic.toLowerCase()} together this weekend?`, label: 'C' },
          { id: 'd', text: `Let's to practice speaking about ${topic.toLowerCase()} together this weekend?`, label: 'D' },
        ],
        correctAnswer: 'a',
        explanation: '"Why don\'t we + V(bare)" transforms into "How about + V-ing".',
        grammarTipVi: 'Cấu trúc viết lại câu gợi ý: "Why don\'t we + V(bare)?" = "How about + V-ing?". Chú ý sau "How about" dùng V-ing.',
        unitContext: { unitId: profile.unitId, unitTitle: title, topic, keyword: word1 },
        difficultyScore: 6,
      },
    ],
    reviewQuestions: [
      {
        id: `dyn-r1`,
        grammarCategory: 'transformation_error_correction',
        stage: 1,
        gradeLevel: 'Grade 5 Review',
        format: 'multiple_choice',
        grammarRuleTitle: 'Review Diagnostic: Modal Advice',
        grammarNote: 'should + V.',
        instruction: 'Choose the appropriate modal verb:',
        promptText: `To achieve top scores in CLC entrance exams, candidates ______ review ${topic.toLowerCase()} systematically.`,
        options: [
          { id: 'a', text: 'should', label: 'A' },
          { id: 'b', text: 'must to', label: 'B' },
          { id: 'c', text: 'ought', label: 'C' },
          { id: 'd', text: 'had better to', label: 'D' },
        ],
        correctAnswer: 'a',
        explanation: '"should" correctly precedes the bare infinitive "review".',
        grammarTipVi: '"should + V-nguyên thể" (nên ôn tập có hệ thống).',
        unitContext: { unitId: profile.unitId, unitTitle: title, topic, keyword: word3 },
        difficultyScore: 3,
      },
    ],
  };
}
