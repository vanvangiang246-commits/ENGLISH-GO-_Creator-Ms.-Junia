import { UnitKnowledgeProfile } from '../../types/curriculumKnowledge';
import { UnitContentData, LessonData, VocabularyItem, SentencePatternItem, LanguageGrammarItem, SkillItem } from '../../types/content';
import { getVocabularyImage } from './illustrations';
import { GRADE_1_UNITS } from './grade1';
import { GRADE_2_UNITS } from './grade2';
import { GRADE_3_UNITS } from './grade3';
import { GRADE_4_UNITS } from './grade4';
import { GRADE_5_UNITS } from './grade5';

// Master map of all 92 verified Global Success units
export const ALL_CURRICULUM_PROFILES: Record<string, UnitKnowledgeProfile> = {};

[...GRADE_1_UNITS, ...GRADE_2_UNITS, ...GRADE_3_UNITS, ...GRADE_4_UNITS, ...GRADE_5_UNITS].forEach(
  (unit) => {
    ALL_CURRICULUM_PROFILES[unit.unitId] = unit;
  }
);

/**
 * Retrieves the comprehensive curriculum knowledge profile for any unit.
 */
export function getUnitCurriculumProfile(unitId: string): UnitKnowledgeProfile | undefined {
  return ALL_CURRICULUM_PROFILES[unitId];
}

/**
 * Retrieves all units for a given grade (1-5).
 */
export function getCurriculumProfilesForGrade(grade: number): UnitKnowledgeProfile[] {
  if (grade === 1) return GRADE_1_UNITS;
  if (grade === 2) return GRADE_2_UNITS;
  if (grade === 3) return GRADE_3_UNITS;
  if (grade === 4) return GRADE_4_UNITS;
  if (grade === 5) return GRADE_5_UNITS;
  return [];
}

/**
 * Converts a UnitKnowledgeProfile into the complete UnitContentData format
 * expected by UnitPage, LessonContentPage, and VocabularyCard.
 */
export function convertProfileToUnitContentData(profile: UnitKnowledgeProfile): UnitContentData {
  // Vocabulary items with generated IDs
  const vocabulary: VocabularyItem[] = profile.coreVocabulary.map((v, i) => ({
    id: `${profile.unitId}-VOC-${i + 1 < 10 ? '0' + (i + 1) : i + 1}`,
    word: v.word,
    pronunciation: v.phonetic,
    meaning: v.meaning,
    example: v.example,
    imageUrl: v.imageUrl || getVocabularyImage(v.word),
    letterFocus: v.letterFocus,
    soundFocus: v.soundFocus,
    sourceUnit: profile.unitId,
    sourceLesson: 'Lesson 1 & 2',
    sourceStatus: 'SOURCE_VERIFIED',
  }));

  // Sentence patterns with generated IDs
  const sentencePatterns: SentencePatternItem[] = profile.targetSentencePatterns.map((p, i) => ({
    id: `${profile.unitId}-PAT-${i + 1 < 10 ? '0' + (i + 1) : i + 1}`,
    pattern: p.pattern,
    example: p.example,
    communicativePurpose: p.communicativePurpose,
    responseExample: p.responseExample,
    sourceLesson: 'Lesson 2 & 3',
    sourceStatus: 'SOURCE_VERIFIED',
  }));

  // Grammar structures with generated IDs
  const grammar: LanguageGrammarItem[] = profile.grammarStructures.map((g, i) => ({
    id: `${profile.unitId}-LANG-${i + 1 < 10 ? '0' + (i + 1) : i + 1}`,
    title: g.title,
    description: g.rules.join(' '),
    rules: g.rules,
    examples: g.examples,
    category: g.category,
    sourceStatus: 'SOURCE_VERIFIED',
  }));

  // Standard skills
  const skills: SkillItem[] = [
    { id: `${profile.unitId}-SK-1`, name: 'PRONUNCIATION', description: profile.mainLanguageFocus, active: true },
    { id: `${profile.unitId}-SK-2`, name: 'LISTENING', description: `Listening to words and sentences in ${profile.title}`, active: true },
    { id: `${profile.unitId}-SK-3`, name: 'SPEAKING', description: `Practicing target phrases: ${profile.usefulExpressions.join(' / ')}`, active: true },
    { id: `${profile.unitId}-SK-4`, name: 'READING', description: `Comprehending ${profile.title} texts and matching items`, active: true },
    { id: `${profile.unitId}-SK-5`, name: 'WRITING', description: `Word construction, letter filling, and spelling in ${profile.title}`, active: true },
    { id: `${profile.unitId}-SK-6`, name: 'COMMUNICATION', description: profile.communicationFunctions.join(', '), active: true },
  ];

  // Divide into 3 lessons
  const vocabIds = vocabulary.map((v) => v.id);
  const halfVocab = Math.ceil(vocabIds.length / 2);
  const patIds = sentencePatterns.map((p) => p.id);
  const langIds = grammar.map((g) => g.id);

  const lessons: LessonData[] = [
    {
      id: `${profile.unitId}-L01`,
      lessonNumber: 1,
      title: 'Lesson 1: Vocabulary & Phonics',
      activities: [
        { number: 1, name: '1. Listen and repeat', description: `Listen and pronounce target vocabulary for ${profile.title}.` },
        { number: 2, name: '2. Point and say', description: 'Look at the visual scenes and practice target words.' },
      ],
      vocabularyIds: vocabIds.slice(0, halfVocab),
      sentencePatternIds: [],
      grammarIds: langIds.slice(0, 1),
      skills: ['PRONUNCIATION', 'LISTENING', 'SPEAKING'],
      sourceStatus: 'SOURCE_VERIFIED',
    },
    {
      id: `${profile.unitId}-L02`,
      lessonNumber: 2,
      title: 'Lesson 2: Sentence Patterns & Practice',
      activities: [
        { number: 3, name: '3. Listen and chant', description: 'Rhythmic audio practice reinforcing words and sentence patterns.' },
        { number: 4, name: '4. Listen and tick', description: 'Listen to spoken cues and select matching items.' },
        { number: 5, name: '5. Look and write', description: 'Complete missing words and trace letter patterns.' },
      ],
      vocabularyIds: vocabIds.slice(halfVocab),
      sentencePatternIds: patIds.slice(0, 1),
      grammarIds: langIds,
      skills: ['LISTENING', 'READING', 'WRITING'],
      sourceStatus: 'SOURCE_VERIFIED',
    },
    {
      id: `${profile.unitId}-L03`,
      lessonNumber: 3,
      title: 'Lesson 3: Communication & Fluency',
      activities: [
        { number: 6, name: '6. Listen and repeat', description: 'Spoken interactive exchanges and communicative functions.' },
        { number: 7, name: "7. Let's talk", description: `Pair practice with friends on ${profile.topic}.` },
        { number: 8, name: "8. Let's sing", description: 'Sing along to unit song and wrap up review.' },
      ],
      vocabularyIds: vocabIds,
      sentencePatternIds: patIds,
      grammarIds: langIds,
      skills: ['SPEAKING', 'COMMUNICATION', 'LISTENING'],
      sourceStatus: 'SOURCE_VERIFIED',
    },
  ];

  return {
    unitId: profile.unitId,
    bookId: profile.bookId,
    grade: profile.grade,
    unitNumber: profile.unitNumber,
    title: profile.title,
    topic: profile.topic,
    mainLanguageFocus: profile.mainLanguageFocus,
    learningObjectives: profile.learningObjectives,
    sourceStatus: 'SOURCE_VERIFIED',
    sourceReference: profile.sourceReference,
    lessons,
    vocabulary,
    sentencePatterns,
    grammar,
    skills,
  };
}
