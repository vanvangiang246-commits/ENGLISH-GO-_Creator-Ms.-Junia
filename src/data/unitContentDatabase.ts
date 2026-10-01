/**
 * ENGLISH GO! - Verified Unit Content Database
 * Author: Ms. Junia
 *
 * Source of Truth:
 * Tiếng Anh 1 Global Success (Hoàng Văn Vân, NXB Giáo Dục Việt Nam)
 */

import { UnitContentData } from '../types/content';
import { getUnitCurriculumProfile, convertProfileToUnitContentData } from './curriculum';

export const GLOBAL_SUCCESS_1_UNIT_1: UnitContentData = {
  unitId: 'GS1-U01',
  bookId: 'gs1',
  grade: 1,
  unitNumber: 1,
  title: 'In the school playground',
  topic: 'School playground, greetings, and letter B',
  mainLanguageFocus: 'Letter sound /b/ and everyday greetings: "Hi, I\'m [Name]" / "Bye, [Name]"',
  learningObjectives: [
    'Identify and pronounce the letter sound /b/ accurately in target words.',
    'Recognize and name playground items: book, ball, bike, and character Bill.',
    'Greet peers and introduce oneself using "Hi, I\'m [Name]".',
    'Say goodbye politely using "Bye, [Name]".',
  ],
  sourceStatus: 'SOURCE_VERIFIED',
  sourceReference: 'Tiếng Anh 1 Global Success - Unit 1 (NXB Giáo Dục Việt Nam, 2018 Curriculum)',
  lessons: [
    {
      id: 'GS1-U01-L01',
      lessonNumber: 1,
      title: 'Lesson 1: Letter B & Target Words',
      activities: [
        {
          number: 1,
          name: '1. Listen and repeat',
          description: 'Listen to the letter B, sound /b/, and repeat the words: Bill, book, ball, bike.',
        },
        {
          number: 2,
          name: '2. Point and say',
          description: 'Look at the school playground scene, point to each item, and pronounce the words.',
        },
      ],
      vocabularyIds: ['GS1-U01-VOC-01', 'GS1-U01-VOC-02', 'GS1-U01-VOC-03', 'GS1-U01-VOC-04'],
      sentencePatternIds: [],
      grammarIds: ['GS1-U01-LANG-01'],
      skills: ['PRONUNCIATION', 'LISTENING', 'SPEAKING'],
      sourceStatus: 'SOURCE_VERIFIED',
    },
    {
      id: 'GS1-U01-L02',
      lessonNumber: 2,
      title: 'Lesson 2: Listen, Chant & Trace',
      activities: [
        {
          number: 3,
          name: '3. Listen and chant',
          description: 'Join the rhythmic phonics chant reinforcing /b/ sound with ball, book, and bike.',
        },
        {
          number: 4,
          name: '4. Listen and tick',
          description: 'Listen to audio cues and tick the correct picture in the exercise box.',
        },
        {
          number: 5,
          name: '5. Look and trace',
          description: 'Trace uppercase letter B and lowercase letter b with proper stroke order.',
        },
      ],
      vocabularyIds: ['GS1-U01-VOC-01', 'GS1-U01-VOC-02', 'GS1-U01-VOC-03', 'GS1-U01-VOC-04'],
      sentencePatternIds: [],
      grammarIds: ['GS1-U01-LANG-01'],
      skills: ['LISTENING', 'PRONUNCIATION', 'READING', 'WRITING'],
      sourceStatus: 'SOURCE_VERIFIED',
    },
    {
      id: 'GS1-U01-L03',
      lessonNumber: 3,
      title: 'Lesson 3: Greetings & Communication',
      activities: [
        {
          number: 6,
          name: '6. Listen and repeat',
          description: 'Listen and practice greeting exchanges: "Hi, I\'m Bill." - "Hi, Bill." - "Bye, Bill."',
        },
        {
          number: 7,
          name: '7. Let\'s talk',
          description: 'Pair with classmates in the playground to greet each other and say goodbye.',
        },
        {
          number: 8,
          name: '8. Let\'s sing',
          description: 'Sing along to the welcoming greeting song.',
        },
      ],
      vocabularyIds: ['GS1-U01-VOC-01'],
      sentencePatternIds: ['GS1-U01-PAT-01', 'GS1-U01-PAT-02'],
      grammarIds: ['GS1-U01-LANG-02'],
      skills: ['LISTENING', 'SPEAKING', 'COMMUNICATION'],
      sourceStatus: 'SOURCE_VERIFIED',
    },
  ],
  vocabulary: [
    {
      id: 'GS1-U01-VOC-01',
      word: 'Bill',
      pronunciation: '/bɪl/',
      meaning: 'A friendly boy and school classmate in the playground',
      example: "Hi, I'm Bill.",
      imageUrl: '/src/assets/images/vocab_bill_1790434346720.jpg',
      letterFocus: 'B / b',
      soundFocus: '/b/',
      sourceUnit: 'GS1-U01',
      sourceLesson: 'Lesson 1 & Lesson 3',
      sourceStatus: 'SOURCE_VERIFIED',
    },
    {
      id: 'GS1-U01-VOC-02',
      word: 'book',
      pronunciation: '/bʊk/',
      meaning: 'A printed school book for reading and learning',
      example: 'A blue English book.',
      imageUrl: '/src/assets/images/vocab_book_1790434304846.jpg',
      letterFocus: 'B / b',
      soundFocus: '/b/',
      sourceUnit: 'GS1-U01',
      sourceLesson: 'Lesson 1 & Lesson 2',
      sourceStatus: 'SOURCE_VERIFIED',
    },
    {
      id: 'GS1-U01-VOC-03',
      word: 'ball',
      pronunciation: '/bɔːl/',
      meaning: 'A round play ball used for games in the school playground',
      example: 'A colorful ball on the grass.',
      imageUrl: '/src/assets/images/vocab_ball_1790434318587.jpg',
      letterFocus: 'B / b',
      soundFocus: '/b/',
      sourceUnit: 'GS1-U01',
      sourceLesson: 'Lesson 1 & Lesson 2',
      sourceStatus: 'SOURCE_VERIFIED',
    },
    {
      id: 'GS1-U01-VOC-04',
      word: 'bike',
      pronunciation: '/baɪk/',
      meaning: 'A bicycle with two wheels to ride to school',
      example: 'A bright yellow bike.',
      imageUrl: '/src/assets/images/vocab_bike_1790434332360.jpg',
      letterFocus: 'B / b',
      soundFocus: '/b/',
      sourceUnit: 'GS1-U01',
      sourceLesson: 'Lesson 1 & Lesson 2',
      sourceStatus: 'SOURCE_VERIFIED',
    },
  ],
  sentencePatterns: [
    {
      id: 'GS1-U01-PAT-01',
      pattern: "Hi, I'm [Name].",
      example: "Hi, I'm Bill.",
      communicativePurpose: 'Greeting a friend and introducing your name',
      responseExample: 'Hi, Bill.',
      sourceLesson: 'Lesson 3 (Activity 6 & 7)',
      sourceStatus: 'SOURCE_VERIFIED',
    },
    {
      id: 'GS1-U01-PAT-02',
      pattern: 'Bye, [Name].',
      example: 'Bye, Bill.',
      communicativePurpose: 'Saying goodbye to a friend politely when leaving',
      responseExample: 'Bye!',
      sourceLesson: 'Lesson 3 (Activity 6 & 7)',
      sourceStatus: 'SOURCE_VERIFIED',
    },
  ],
  grammar: [
    {
      id: 'GS1-U01-LANG-01',
      title: 'Phonics: Initial Sound /b/ (Letter B / b)',
      description: 'The letter B makes the voiced bilabial stop sound /b/ at the start of words.',
      rules: [
        'Place both lips together, then release air gently to make the /b/ sound.',
        'Capital "B" is used for names like Bill.',
        'Lowercase "b" is used in common objects: ball, bike, book.',
      ],
      examples: ['Bill (/bɪl/)', 'ball (/bɔːl/)', 'bike (/baɪk/)', 'book (/bʊk/)'],
      category: 'phonics',
      sourceStatus: 'SOURCE_VERIFIED',
    },
    {
      id: 'GS1-U01-LANG-02',
      title: 'Language Pattern: Friendly Greetings',
      description: 'Simple and natural spoken communication formulas for Grade 1 primary students.',
      rules: [
        'Use "Hi" for a cheerful, friendly greeting with friends.',
        'Combine "Hi, I\'m..." with your name to introduce yourself.',
        'Use "Bye" when departing or ending a conversation.',
      ],
      examples: [
        "Greeting: \"Hi, I'm Bill.\"",
        'Response: "Hi, Bill."',
        'Parting: "Bye, Bill."',
      ],
      category: 'language_pattern',
      sourceStatus: 'SOURCE_VERIFIED',
    },
  ],
  skills: [
    {
      id: 'SKILL-01',
      name: 'PRONUNCIATION',
      description: 'Producing the /b/ sound accurately in words and phonics chants.',
      active: true,
    },
    {
      id: 'SKILL-02',
      name: 'LISTENING',
      description: 'Hearing and recognizing words (book, ball, bike, Bill) and greetings.',
      active: true,
    },
    {
      id: 'SKILL-03',
      name: 'SPEAKING',
      description: 'Saying target vocabulary words aloud and introducing oneself.',
      active: true,
    },
    {
      id: 'SKILL-04',
      name: 'READING',
      description: 'Recognizing letter forms B/b and matching them with picture objects.',
      active: true,
    },
    {
      id: 'SKILL-05',
      name: 'WRITING',
      description: 'Tracing the letter B and b along designated directional strokes.',
      active: true,
    },
    {
      id: 'SKILL-06',
      name: 'COMMUNICATION',
      description: 'Interacting with peers using authentic English greetings in playground contexts.',
      active: true,
    },
  ],
};

/**
 * Strict content retriever:
 * Returns verified textbook data for GS1-U01.
 * For any other unit, returns a SOURCE_PENDING structure with explicit instructions,
 * adhering to the strict "No fake content" rule.
 */
export const getUnitContentData = (unitId: string): UnitContentData => {
  if (unitId === 'GS1-U01') {
    return GLOBAL_SUCCESS_1_UNIT_1;
  }

  // Look up in verified curriculum knowledge base (92 units)
  const profile = getUnitCurriculumProfile(unitId);
  if (profile) {
    return convertProfileToUnitContentData(profile);
  }

  // Derive book and unit number from unit ID e.g. "GS2-U05"
  const match = unitId.match(/^([A-Z0-9]+)-U([0-9]+)$/);
  const bookCode = match ? match[1].toLowerCase() : 'gs1';
  const unitNum = match ? parseInt(match[2], 10) : 1;
  const gradeNum = parseInt(bookCode.replace(/[^0-9]/g, ''), 10) || 1;

  return {
    unitId,
    bookId: bookCode,
    grade: gradeNum,
    unitNumber: unitNum,
    title: `Unit ${unitNum}`,
    topic: 'Textbook source pending',
    mainLanguageFocus: 'Source verification required',
    learningObjectives: [
      'Official textbook source required before learning objectives can be populated.',
    ],
    sourceStatus: 'SOURCE_PENDING',
    sourceReference: `Global Success ${gradeNum} - Unit ${unitNum}`,
    sourceNote: `Upload the official Global Success ${gradeNum} textbook source before importing Unit ${unitNum} content.`,
    lessons: [],
    vocabulary: [],
    sentencePatterns: [],
    grammar: [],
    skills: [],
  };
};
