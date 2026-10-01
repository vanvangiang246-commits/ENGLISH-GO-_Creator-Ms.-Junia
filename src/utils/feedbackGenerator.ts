/**
 * ENGLISH GO! - Child Feedback Messages Generator
 * Author: Ms. Junia
 *
 * Guarantees varied positive reinforcement and non-shaming encouragement.
 */

import { validateFeedbackMessage } from './questionValidator';

export const POSITIVE_PRAISES = [
  'Excellent!',
  'Well done!',
  'Fantastic!',
  'Great work!',
  'Nice job!',
  'You got it!',
  'Wonderful!',
  'Brilliant!',
  'That’s right!',
  'Super!',
  'Keep it up!',
  'Nice thinking!',
  'Amazing!',
  'Perfect!',
];

export const ENCOURAGING_MESSAGES = [
  'Try again!',
  'Almost!',
  'Have another look!',
  'Let’s try once more.',
  'Good try!',
  'Think carefully.',
  'You can do it!',
  'Take another look.',
  'Look carefully.',
];

export const getRandomPraise = (): string => {
  const filtered = POSITIVE_PRAISES.filter((p) => validateFeedbackMessage(p).isValid);
  const index = Math.floor(Math.random() * filtered.length);
  return filtered[index] || 'Well done!';
};

export const getRandomEncouragement = (): string => {
  const filtered = ENCOURAGING_MESSAGES.filter((e) => validateFeedbackMessage(e).isValid);
  const index = Math.floor(Math.random() * filtered.length);
  return filtered[index] || 'Good try! You can do it!';
};

