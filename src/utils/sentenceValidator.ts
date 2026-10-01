/**
 * ENGLISH GO! - Sentence Grammar and Semantic Naturalness Validator
 * 
 * Enforces grammatical correctness and natural semantic meaning for all
 * word-order / sentence-building questions, fill-in-the-blank, multiple choice,
 * listening, speaking, and CLC grammar exercises.
 * 
 * Rules:
 * 1. Never generate or display grammatically incorrect or incomplete sentences.
 * 2. Never omit required articles (a/an/the) for singular countable nouns.
 * 3. Never insert base verbs or verb phrases directly after articles/determiners
 *    (e.g., "Look at the do karate." ❌ -> REJECT; must be "Look at the boy doing karate." ✓).
 * 4. Never use bare verb phrases in noun slots (e.g., "This is a surf the internet." ❌ -> REJECT).
 * 5. "party" requires an article in these contexts ("a party", "the party", "parties").
 * 6. Checks article agreement (a vs an before vowels: "an apple", "an insect", "an ear", not "a ear").
 * 7. Discards ungrammatical patterns like "This is a Bill.", "There is a big.", "Is there a hay?".
 * 8. Never accept or mark an answer CORRECT unless the reconstructed sentence is a complete,
 *    natural and grammatically correct English sentence.
 */

export interface SentenceValidationResult {
  isValid: boolean;
  normalizedSentence?: string;
  reason?: string;
}

// Nouns that are strictly uncountable mass nouns in primary school English
export const UNCOUNTABLE_MASS_NOUNS = new Set([
  'water', 'milk', 'tea', 'juice', 'rice', 'bread', 'hay', 'ink', 'sand',
  'soup', 'pasta', 'popcorn', 'music', 'art', 'english', 'maths',
  'science', 'pe', 'vietnamese', 'money', 'energy', 'rubbish', 'trash',
  'weather', 'sunlight', 'homework'
]);

// Proper personal/place names that cannot be preceded by an indefinite article
export const PROPER_NAMES = new Set([
  'bill', 'mary', 'peter', 'ba', 'ben', 'nam', 'mai', 'linda', 'tony',
  'phong', 'hoa', 'tom', 'akiko', 'lucy', 'an tiem', 'vietnam', 'japan',
  'england', 'america', 'australia', 'malaysia', 'david', 'daisy', 'linh',
  'hanoi', 'danang', 'hue', 'london', 'tokyo', 'sydney'
]);

// Adjectives that cannot stand as bare object nouns (e.g. "I have a smart.", "There is a big.")
export const ADJECTIVES = new Set([
  'big', 'small', 'new', 'old', 'tall', 'short', 'red', 'blue', 'green',
  'yellow', 'brown', 'black', 'white', 'clean', 'dirty', 'happy', 'sad',
  'clever', 'friendly', 'fast', 'slow', 'busy', 'quiet', 'noisy', 'sunny',
  'rainy', 'windy', 'cloudy', 'snowy', 'stormy', 'warm', 'cold', 'hot',
  'fine', 'wonderful', 'hard-working', 'greedy', 'famous', 'ancient',
  'smart', 'interesting', 'difficult', 'easy', 'young', 'slim', 'pretty',
  'polite', 'helpful', 'cheerful', 'strong', 'sweet', 'delicious', 'hungry',
  'thirsty', 'tired', 'sleepy', 'great', 'nice'
]);

// Primary school action verbs that CANNOT follow an article as a bare noun
export const ACTION_VERBS = new Set([
  'get', 'wake', 'go', 'come', 'do', 'surf', 'clean', 'play', 'swim', 'jog', 'skate', 'sing', 'dance',
  'jump', 'climb', 'cook', 'wash', 'water', 'ride', 'fly', 'open', 'close',
  'listen', 'read', 'write', 'draw', 'sleep', 'eat', 'drink', 'visit',
  'study', 'speak', 'talk', 'watch', 'run', 'walk', 'kick', 'skip', 'catch',
  'brush', 'turn', 'save', 'recycle', 'plant', 'point', 'help', 'set', 'make'
]);

// Primary school phrasal verbs and verb collocations
export const PHRASAL_VERBS = new Set([
  'get up', 'wake up', 'go to school', 'go to bed', 'go to sleep', 'go home',
  'come home', 'go swimming', 'go fishing', 'go camping', 'go jogging',
  'go cycling', 'go shopping', 'set the table', 'wash dishes', 'wash face',
  'brush teeth', 'brush my teeth', 'wash my face', 'turn on', 'turn off',
  'save water', 'look at', 'look after', 'grow up'
]);

// Primary school verb phrases and collocations
export const VERB_PHRASES = new Set([
  'get up', 'wake up', 'go to school', 'go to bed', 'go to sleep', 'go home',
  'come home', 'do karate', 'do judo', 'do gymnastics', 'do homework', 'do housework',
  'surf the internet', 'surf the web', 'clean the house', 'clean houses',
  'play chess', 'play football', 'play badminton', 'play basketball', 'play tennis',
  'play volleyball', 'play the piano', 'play the guitar', 'go swimming', 'go fishing',
  'go camping', 'go jogging', 'go cycling', 'go shopping', 'ride a bike', 'ride my bike',
  'ride a bicycle', 'water the flowers', 'cook dinner', 'cook meals', 'wash dishes',
  'wash face', 'brush teeth', 'have breakfast', 'have lunch', 'have dinner',
  'watch tv', 'listen to music', 'read comic books', 'read books', 'draw pictures',
  'save water', 'recycle', 'plant trees'
]);

// Isolated time words and adverbs that cannot be treated as nouns
export const TIME_AND_ADVERB_WORDS = new Set([
  "o'clock", 'yesterday', 'tomorrow', 'today', 'tonight', 'always', 'usually', 'often',
  'sometimes', 'never', 'early', 'late'
]);

// Singular words ending in 's' that are NOT plural nouns
const PLURAL_EXCEPTIONS = new Set([
  'this', 'is', 'was', 'has', 'does', 'bus', 'dress', 'glass', 'grass', 'class',
  'chess', 'cross', 'kiss', 'miss', 'pass', 'boss', 'mass', 'compass', 'lens',
  'series', 'species', 'news', 'gas', 'yes', 'us', 'its', 'his', 'maths'
]);

// Irregular plural nouns
const IRREGULAR_PLURALS = new Set([
  'feet', 'teeth', 'geese', 'men', 'women', 'children', 'people', 'mice'
]);

/**
 * Checks whether a word or compound phrase represents a plural noun.
 * Examples: 'solar panels' -> true, 'shoes' -> true, 'trousers' -> true, 'book' -> false
 */
export function isPluralNoun(rawWord: string): boolean {
  if (!rawWord) return false;
  const s = rawWord.trim().toLowerCase();
  if (IRREGULAR_PLURALS.has(s)) return true;
  const parts = s.split(/\s+/);
  const lastWord = parts[parts.length - 1];
  if (PLURAL_EXCEPTIONS.has(lastWord)) return false;
  if (lastWord.endsWith('ss') || lastWord.endsWith('us') || lastWord.endsWith('is')) return false;
  return lastWord.endsWith('s') && lastWord.length > 2;
}

export function isUncountableNoun(rawWord: string): boolean {
  return UNCOUNTABLE_MASS_NOUNS.has(rawWord.trim().toLowerCase());
}

export function isAdjective(rawWord: string): boolean {
  return ADJECTIVES.has(rawWord.trim().toLowerCase());
}

export function isVerbOrVerbPhrase(rawWord: string): boolean {
  if (!rawWord) return false;
  const s = rawWord.trim().toLowerCase();
  if (VERB_PHRASES.has(s)) return true;
  const firstWord = s.split(/\s+/)[0];
  return ACTION_VERBS.has(firstWord);
}

/**
 * Checks whether a word starts with an English vowel sound (requiring "an").
 */
export function startsWithVowelSound(rawWord: string): boolean {
  if (!rawWord) return false;
  const s = rawWord.trim().toLowerCase();
  // Words starting with 'u' that sound like /juː/ (e.g. uniform, university) or 'one'
  if (/^u[b-df-hj-np-tv-z]/i.test(s) || /^one\b/i.test(s)) return false;
  // Silent 'h' words
  if (/^(?:hour|honest)\b/i.test(s)) return true;
  return /^[aeiou]/i.test(s);
}

// Consumable foods and drinks that fit "I'm having [food]" or "Have some [food]"
const CONSUMABLE_FOOD_AND_DRINK = new Set([
  'pizza', 'popcorn', 'pasta', 'bread', 'rice', 'noodles', 'sandwich', 'cake',
  'salad', 'water', 'milk', 'juice', 'tea', 'biscuit', 'biscuits', 'chips',
  'soup', 'fruit', 'breakfast', 'lunch', 'dinner', 'a snack', 'an apple',
  'a sandwich', 'a slice of pizza', 'a bowl of noodles', 'yoghurt', 'chicken',
  'eggs', 'fish', 'meat', 'toast'
]);

// Physical, movable objects that can naturally be passed across a dining table or desk
const PASSABLE_TABLE_OBJECTS = new Set([
  'pizza', 'popcorn', 'pasta', 'bread', 'rice', 'noodles', 'sandwich', 'cake',
  'salt', 'sugar', 'butter', 'cheese', 'salad', 'water', 'milk', 'juice', 'tea',
  'pen', 'pencil', 'ruler', 'rubber', 'eraser', 'book', 'plate', 'cup', 'glass',
  'fork', 'spoon', 'tissue', 'sauce', 'biscuit', 'chips', 'bowl', 'dish'
]);

/**
 * Validates a complete original sentence for both grammar and natural semantics.
 * Strictly enforces complete sentence structure, rejects impossible word combinations
 * such as "Look at the do karate" or "This is a surf the internet".
 */
export function validateSentenceForWordOrder(rawSentence: string): SentenceValidationResult {
  let s = (rawSentence || '').trim();
  if (!s) return { isValid: false, reason: 'Empty sentence' };

  // 1. Placeholder check - ensure no template tokens remain
  if (/\[.*?\]/.test(s)) {
    return { isValid: false, reason: 'Contains unreplaced placeholder bracket' };
  }

  // 2. Strict rejection of phrasal verbs, action verbs, or time words treated as nouns
  // E.g. "This is a get up.", "Nam has a get up.", "I have a get up.", "Look at the get up.", "a get up"
  // E.g. "This is a go to school.", "a go to school", "a play chess", "a do karate"
  // E.g. "Look at the o'clock.", "This is a o'clock.", "Mai has a o'clock.", "a o'clock"
  if (/\b(?:a|an|the|my|your|his|her|our|their|this|that)\s+(?:get\s+up|wake\s+up|go\s+to\s+school|go\s+to\s+bed|go\s+to\s+sleep|go\s+home|come\s+home|play\s+chess|play\s+football|play\s+badminton|play\s+tennis|play\s+volleyball|play\s+the\s+piano|play\s+the\s+guitar|do\s+karate|do\s+judo|do\s+gymnastics|surf\s+the\s+internet|save\s+water|recycle|o'clock)\b/i.test(s)) {
    return { isValid: false, reason: 'Phrasal verbs, verb phrases, or "o\'clock" cannot be preceded by an article or determiner' };
  }

  // E.g. "This is a [verb]", "That is a [verb]"
  if (/\b(?:this|that|it)\s+is\s+a\s+(?:get(?:\s+up)?|wake(?:\s+up)?|go(?:\s+to\s+school|\s+to\s+bed|\s+home)?|surf(?:\s+the\s+internet)?|do(?:\s+karate)?|clean\s+houses|clean\s+the\s+house|play(?:\s+(?:chess|football|badminton|tennis))?|close\b|open\b(?!\s+(?:door|window|book))|swim\b|jog\b|skate\b|sing\b|dance\b|cook\b|o'clock\b)/i.test(s)) {
    return { isValid: false, reason: 'Verb phrase, phrasal verb, or "o\'clock" cannot follow "This is a"' };
  }

  // E.g. "I have a get up.", "Mai has a get up.", "Nam has a get up.", "Nam has a o'clock."
  if (/\b(?:have|has|had)\s+a\s+(?:get(?:\s+up)?|wake(?:\s+up)?|go(?:\s+to\s+school|\s+to\s+bed|\s+home)?|surf(?:\s+the\s+internet)?|do(?:\s+karate)?|clean\s+houses|clean\s+the\s+house|play(?:\s+(?:chess|football|badminton|tennis))?|close\b|open\b(?!\s+(?:door|window|book))|swim\b|jog\b|skate\b|sing\b|dance\b|cook\b|o'clock\b)/i.test(s)) {
    return { isValid: false, reason: 'Verb phrase, phrasal verb, or "o\'clock" cannot follow "have/has a"' };
  }

  // E.g. "Look at the get up.", "Look at the do karate.", "Look at the o'clock.", "Look at the cook."
  if (/\b(?:look\s+at\s+the)\s+(?:get(?:\s+up)?|wake(?:\s+up)?|go(?:\s+to\s+school|\s+to\s+bed)?|do(?:\s+karate)?|surf|play(?:\s+chess)?|clean|open|close|swim|jog|skate|sing|dance|jump|climb|cook|wash|ride|fly|o'clock)\b/i.test(s)) {
    return { isValid: false, reason: 'Bare verb or phrasal verb cannot follow "Look at the [verb]"' };
  }

  // E.g. "Look at the cycling." without agent or object -> reject in favor of complete "Look at the boy cycling."
  if (/^Look at the (?:cycling|skating|reading|jogging|singing|dancing)\.?$/i.test(s)) {
    return { isValid: false, reason: 'Incomplete participle structure without agent or noun' };
  }

  // E.g. "A do karate can fly...", "a get up...", "a surf the internet..."
  if (/^a\s+(?:get up|wake up|go to school|go to bed|do karate|surf the internet|clean the house|play chess|o'clock)\b/i.test(s)) {
    return { isValid: false, reason: 'Phrasal verb or time word cannot be subject with article "a"' };
  }

  // 3. Specific rule for "party":
  if (/\bpart(?:y|ies)\b/i.test(s)) {
    if (/Pass me the\s+party\b/i.test(s)) {
      return { isValid: false, reason: '"party" cannot be physically passed at a table' };
    }
    if (/\bhaving party\b/i.test(s)) {
      s = s.replace(/\bhaving party\b/gi, 'having a party');
    }
    if (/\b(this|that|it)\s+is\s+party\b/i.test(s)) {
      s = s.replace(/\b(this|that|it)\s+is\s+party\b/gi, '$1 is a party');
    }
    if (/\bI\s+like\s+party\b/i.test(s)) {
      s = s.replace(/\bI\s+like\s+party\b/gi, 'I like parties');
    }
    if (/\b(do\s+you\s+like)\s+party\b/i.test(s)) {
      s = s.replace(/\b(do\s+you\s+like)\s+party\b/gi, '$1 parties');
    }
    if (/\b(at|to|for|join|in)\s+party\b/i.test(s)) {
      s = s.replace(/\b(at|to|for|join|in)\s+party\b/gi, '$1 a party');
    }
    if (/\b(?:having|is|at|to|for|join)\s+party\b/i.test(s)) {
      return { isValid: false, reason: 'Singular countable noun "party" requires article "a"' };
    }
  }

  // 4. "Pass me the [X], please." semantic check
  const passMeMatch = s.match(/^Pass me the\s+([a-zA-Z\s]+?),\s*please\.$/i);
  if (passMeMatch) {
    const item = passMeMatch[1].trim().toLowerCase();
    if (!PASSABLE_TABLE_OBJECTS.has(item)) {
      return { isValid: false, reason: `"${item}" is not a natural passable table object` };
    }
  }

  // 5. "I'm having [X]." semantic and grammar check
  const havingMatch = s.match(/^I'm having\s+([a-zA-Z\s]+?)\.?$/i);
  if (havingMatch) {
    const item = havingMatch[1].trim().toLowerCase();
    if (item === 'a party' || item === 'a picnic' || item === 'a great time' || item === 'fun') {
      // Natural event with article
    } else if (CONSUMABLE_FOOD_AND_DRINK.has(item)) {
      // Natural consumable food/drink
    } else {
      return { isValid: false, reason: `Unnatural object for "I'm having": "${item}"` };
    }
  }

  // 6. "Have some [X]." semantic check
  const haveSomeMatch = s.match(/^Have some\s+([a-zA-Z\s]+?)\.?$/i);
  if (haveSomeMatch) {
    const item = haveSomeMatch[1].trim().toLowerCase();
    if (!CONSUMABLE_FOOD_AND_DRINK.has(item)) {
      return { isValid: false, reason: `Unnatural consumable item for "Have some": "${item}"` };
    }
  }

  // 7. Article agreement and invalid combinations
  // a) Proper names after indefinite article: "This is a Bill."
  const properNameArticleMatch = s.match(/\b(?:a|an)\s+([A-Z][a-z]+)\b/);
  if (properNameArticleMatch) {
    const name = properNameArticleMatch[1].toLowerCase();
    if (PROPER_NAMES.has(name)) {
      return { isValid: false, reason: `Proper name cannot take indefinite article: "${properNameArticleMatch[0]}"` };
    }
  }

  // b) Plural head nouns after indefinite article: "I have a solar panels.", "This is a shoes.", "Nam has a trousers.", "a clean houses"
  const articlePhraseMatches = s.matchAll(/\b(a|an)\s+([a-zA-Z-]+(?:\s+[a-zA-Z-]+)*?)(?=[.,!?;:]|\s+(?:is|are|was|were|can|will|do|does|did|have|has|had|and|or|but|because|with|on|in|at|to|for|from)\b|$)/gi);
  for (const m of articlePhraseMatches) {
    const article = m[1].toLowerCase();
    const phrase = m[2].trim().toLowerCase();
    const words = phrase.split(/\s+/);
    const firstWord = words[0];
    const lastWord = words[words.length - 1];

    // Bare action verb phrase after article: "a do karate", "a surf the internet", "a clean the house", "a play chess"
    if (VERB_PHRASES.has(phrase)) {
      return { isValid: false, reason: `Verb phrase cannot follow article: "${article} ${phrase}"` };
    }
    if (words.length === 1 && ACTION_VERBS.has(firstWord)) {
      return { isValid: false, reason: `Bare verb cannot follow article: "${article} ${firstWord}"` };
    }
    if (words.length > 1 && ACTION_VERBS.has(firstWord) && !ADJECTIVES.has(firstWord)) {
      return { isValid: false, reason: `Verb phrase cannot follow article: "${article} ${phrase}"` };
    }

    // Bare adjective with no following noun: "I have a smart.", "This is a big."
    if (words.length === 1 && ADJECTIVES.has(firstWord)) {
      return { isValid: false, reason: `Adjective cannot stand alone after article: "${article} ${firstWord}"` };
    }

    // Uncountable mass noun: "Is there a hay?", "I have a water.", "I have a rice."
    if (words.length === 1 && UNCOUNTABLE_MASS_NOUNS.has(firstWord)) {
      return { isValid: false, reason: `Uncountable noun cannot take article: "${article} ${firstWord}"` };
    }

    // Plural noun: "a solar panels", "a shoes", "a trousers", "a clean houses"
    if (isPluralNoun(lastWord)) {
      return { isValid: false, reason: `Plural noun cannot take indefinite article: "${article} ${phrase}"` };
    }

    // Check vowel vs consonant sound on first word: "a ear" -> invalid; "an ear" -> valid
    const hasVowelSound = startsWithVowelSound(firstWord);
    if (article === 'a' && hasVowelSound) {
      return { isValid: false, reason: `Word starting with vowel requires "an": "a ${firstWord}"` };
    }
    if (article === 'an' && !hasVowelSound) {
      return { isValid: false, reason: `Word starting with consonant requires "a": "an ${firstWord}"` };
    }
  }

  // 8. Demonstrative plural agreement: 'These is', 'Those is', 'This are', 'These are a ...'
  if (/\b(?:these|those)\s+(?:is|are\s+a|are\s+an)\b/i.test(s)) {
    return { isValid: false, reason: 'Invalid demonstrative plural combination' };
  }
  if (/\b(?:this|that)\s+are\b/i.test(s)) {
    return { isValid: false, reason: 'Singular demonstrative cannot take plural verb' };
  }

  // 9. Subject-verb agreement checks
  // He/She/It have -> has
  if (/\b(he|she|it|nam|mai|peter|mary|linda|tony|tom|bill|ben)\s+have\b/i.test(s)) {
    return { isValid: false, reason: 'Third-person singular subject requires "has", not "have"' };
  }
  // I/You/We/They has -> have
  if (/\b(I|you|we|they)\s+has\b/i.test(s)) {
    return { isValid: false, reason: 'Subject requires "have", not "has"' };
  }
  // I/You/We/They does -> do
  if (/\b(I|you|we|they)\s+does\b/i.test(s)) {
    return { isValid: false, reason: 'Subject requires "do", not "does"' };
  }

  // 10. "I like [X]." bare singular countable check
  const iLikeMatch = s.match(/^I like\s+([a-zA-Z\s]+?)\.?$/i);
  if (iLikeMatch) {
    const item = iLikeMatch[1].trim().toLowerCase();
    const bareSingularBad = [
      'father', 'mother', 'brother', 'sister', 'foot', 'fox', 'nest', 'net',
      'nine', 'nose', 'nut', 'dog', 'cat', 'book', 'pen', 'ruler', 'bag',
      'desk', 'chair', 'bed', 'car', 'bus', 'train', 'plane', 'boat'
    ];
    if (bareSingularBad.includes(item)) {
      return { isValid: false, reason: `Bare singular countable noun in "I like": "${item}"` };
    }
  }

  // 11. "Do you like [X]?" bare singular countable check
  const doYouLikeMatch = s.match(/^Do you like\s+([a-zA-Z\s]+?)\??$/i);
  if (doYouLikeMatch) {
    const item = doYouLikeMatch[1].trim().toLowerCase();
    const badItems = ['yacht', 'yam', 'yellow', 'yes', 'yo-yo', 'dog', 'cat', 'book'];
    if (badItems.includes(item)) {
      return { isValid: false, reason: `Unnatural bare noun in "Do you like": "${item}"` };
    }
  }

  // 12. "Where's the [X]?" malformed room check
  if (s.toLowerCase().includes("where's the dining.") || s.toLowerCase().includes("where's the dining?")) {
    return { isValid: false, reason: 'Unnatural incomplete room phrase: "dining"' };
  }

  // 13. Check for repeated duplicate articles/determiners like "a a", "the the", "a an"
  if (/\b(a|an|the|my|your)\s+\1\b/i.test(s) || /\b(a\s+an|an\s+a)\b/i.test(s)) {
    return { isValid: false, reason: 'Duplicate articles in sentence' };
  }

  // 14. Subject-Verb Agreement: be verbs (am/is/are)
  if (/\bI\s+(?:is|are)\b/i.test(s)) {
    return { isValid: false, reason: 'First person "I" requires "am", not "is" or "are"' };
  }
  if (/\b(?:he|she|it|nam|mai|peter|mary|linda|tony|tom|bill|ben)\s+are\b/i.test(s)) {
    return { isValid: false, reason: 'Third-person singular subject requires "is", not "are"' };
  }
  if (/\b(?:we|they|you)\s+is\b/i.test(s)) {
    return { isValid: false, reason: 'Plural / second-person subject requires "are", not "is"' };
  }

  // 15. Negative auxiliaries
  if (/\b(?:he|she|it|nam|mai|peter|mary|linda|tony|tom|bill|ben)\s+don't\b/i.test(s)) {
    return { isValid: false, reason: 'Third-person singular subject requires "doesn\'t", not "don\'t"' };
  }
  if (/\b(?:I|you|we|they)\s+doesn't\b/i.test(s)) {
    return { isValid: false, reason: 'Subject requires "don\'t", not "doesn\'t"' };
  }
  if (/\b(?:he|she|it)\s+aren't\b/i.test(s) || /\b(?:we|they|you)\s+isn't\b/i.test(s)) {
    return { isValid: false, reason: 'Subject-be negative agreement mismatch' };
  }

  // 16. Question auxiliary agreement
  if (/\bdoes\s+(?:you|they|we|I)\b/i.test(s)) {
    return { isValid: false, reason: 'Question auxiliary "Does" cannot be used with I/you/we/they' };
  }
  if (/\bdo\s+(?:he|she|it|nam|mai|peter|mary|linda|tony|tom|bill|ben)\b/i.test(s)) {
    return { isValid: false, reason: 'Question auxiliary "Do" cannot be used with 3rd-person singular' };
  }

  // 17. Pronoun case (Subject vs Object)
  if (/^(?:Me|Him|Her|Them|Us)\s+(?:is|are|am|have|has|like|likes|want|wants|can|will)\b/i.test(s) ||
      /\b(?:—|-)\s*(?:Me|Him|Her|Them|Us)\s+(?:is|are|am|have|has|like|likes|want|wants)\b/i.test(s)) {
    return { isValid: false, reason: 'Object pronoun cannot be used as sentence subject' };
  }

  // 18. Preposition agreement in primary school expressions
  if (/\bat\s+(?:the\s+)?(?:morning|afternoon|evening)\b/i.test(s)) {
    return { isValid: false, reason: 'Time expression requires "in the morning/afternoon/evening", not "at"' };
  }
  if (/\bin\s+night\b/i.test(s)) {
    return { isValid: false, reason: 'Time expression requires "at night", not "in night"' };
  }
  if (/\blisten\s+music\b/i.test(s)) {
    return { isValid: false, reason: 'Verb "listen" requires preposition "to": "listen to music"' };
  }

  // 19. Countable vs Uncountable with much/many
  if (/\bhow\s+much\s+(?:books|pens|balls|bikes|friends|apples|cars|dogs|cats|pencils)\b/i.test(s)) {
    return { isValid: false, reason: 'Plural countable nouns require "how many", not "how much"' };
  }
  if (/\bhow\s+many\s+(?:water|milk|juice|tea|rice|bread|money|weather|sand)\b/i.test(s)) {
    return { isValid: false, reason: 'Uncountable nouns require "how much", not "how many"' };
  }

  // 20. Consecutive duplicate words (e.g. "is is", "to to", "in in")
  if (/\b(is|are|am|was|were|to|in|on|at|it|we|they|he|she)\s+\1\b/i.test(s)) {
    return { isValid: false, reason: 'Consecutive duplicate word in sentence' };
  }

  // 21. Complete sentence structure check:
  // Must end with punctuation (. ? !) and start with a capital letter or dialogue dash
  const cleanStripped = s.replace(/^[—–-]\s*/, '').trim();
  if (!/^[A-Z0-9"']/.test(cleanStripped)) {
    return { isValid: false, reason: 'Sentence must start with a capital letter' };
  }
  if (!/[.?!]$/.test(cleanStripped)) {
    return { isValid: false, reason: 'Sentence must end with proper punctuation' };
  }

  return { isValid: true, normalizedSentence: s };
}

/**
 * Validates any English sentence against comprehensive grammar rules.
 */
export function validateSentenceGrammar(sentence: string): SentenceValidationResult {
  return validateSentenceForWordOrder(sentence);
}

/**
 * Normalizes sentence for exact token and semantic comparison.
 */
export function normalizeSentenceForComparison(sentence: string): string {
  return (sentence || '')
    .trim()
    .replace(/[’‘]/g, "'")
    .replace(/\s+/g, ' ')
    .toLowerCase();
}

/**
 * Comprehensive check for reconstructed sentence against original target sentence.
 * Strictly verifies grammar, meaning, punctuation, and word order BEFORE marking correct.
 */
export function validateReconstructedSentence(
  reconstructedSentence: string,
  originalTargetSentence: string
): { isValid: boolean; isCorrect: boolean; reason?: string } {
  const reconClean = (reconstructedSentence || '').trim();
  const targetClean = (originalTargetSentence || '').trim();

  if (!reconClean) {
    return { isValid: false, isCorrect: false, reason: 'Reconstructed sentence is empty' };
  }

  // 1. Reconstructed sentence MUST pass strict grammar & semantic validation
  const grammarCheck = validateSentenceForWordOrder(reconClean);
  if (!grammarCheck.isValid) {
    return {
      isValid: false,
      isCorrect: false,
      reason: `Grammar validation failed: ${grammarCheck.reason}`
    };
  }

  // 2. Original target sentence must also be valid
  const targetCheck = validateSentenceForWordOrder(targetClean);
  if (!targetCheck.isValid) {
    return {
      isValid: false,
      isCorrect: false,
      reason: `Target sentence is invalid: ${targetCheck.reason}`
    };
  }

  // 3. Exact match comparison (case-insensitive and normalized spaces/quotes)
  const isMatch = normalizeSentenceForComparison(reconClean) === normalizeSentenceForComparison(targetClean);

  return {
    isValid: true,
    isCorrect: isMatch,
    reason: isMatch ? undefined : 'Sentence order does not match target'
  };
}

/**
 * Inserts the chosen answer into a sentence template with a blank (e.g. "I have a ___.")
 * and checks whether the resulting complete sentence is grammatically correct and meaningful.
 */
export function validateCompletedSentence(
  sentenceWithBlank: string,
  chosenWord: string
): SentenceValidationResult {
  if (!sentenceWithBlank || !chosenWord) {
    return { isValid: false, reason: 'Missing sentence or chosen word' };
  }

  // Extract the sentence containing the blank
  const lines = sentenceWithBlank.split('\n');
  const blankLine = lines.find((l) => l.includes('___') || l.includes('__') || l.includes('...')) || sentenceWithBlank;
  
  // Clean prefix like "Sentence: " or "— "
  const cleanedLine = blankLine.replace(/^(?:Sentence:\s*|[—–-]\s*)/i, '').trim();

  // Substitute the blank with the chosen word
  const completedSentence = cleanedLine.replace(/_{2,}|\.{3,}/g, chosenWord.trim());

  // Run comprehensive sentence grammar validation
  return validateSentenceGrammar(completedSentence);
}
