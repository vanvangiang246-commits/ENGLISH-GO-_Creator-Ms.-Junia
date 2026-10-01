import * as fs from 'fs';
import * as path from 'path';

const illustrationsPath = path.join(process.cwd(), 'src/data/curriculum/illustrations.ts');
const original = fs.readFileSync(illustrationsPath, 'utf8');

// Load NEW_ICONS from updateIllustrations.ts
import { NEW_ICONS } from './updateIllustrations.ts';

// 1. Add NEW_ICONS before `};` of SVG_ICONS
let newIconsString = '';
for (const [key, svg] of Object.entries(NEW_ICONS)) {
  newIconsString += `  ${key}: \`${svg}\`,\n\n`;
}

// Find `van:` and `shell:`
const shellIdx = original.indexOf('  shell:');
if (shellIdx === -1) {
  throw new Error('Could not find shell: in illustrations.ts');
}
const closingSvgIconsIdx = original.indexOf('};', shellIdx);

let updated = original.slice(0, closingSvgIconsIdx) + newIconsString + original.slice(closingSvgIconsIdx);

// Ensure every SVG has data-key attribute matching its object key
updated = updated.replace(/([a-zA-Z0-9_]+):\s*`<svg\s+([^>]*?)>/g, (match, key, attrs) => {
  if (attrs.includes('data-key=')) {
    return `${key}: \`<svg ${attrs}>`;
  }
  return `${key}: \`<svg data-key="${key}" ${attrs}>`;
});

// Replace resolveCanonicalKey and helper functions with the enhanced, exported versions
const resolveStart = updated.indexOf('function resolveCanonicalKey(');
if (resolveStart === -1) {
  throw new Error('Could not find resolveCanonicalKey in illustrations.ts');
}

const newFunctions = `export function resolveCanonicalKey(rawWord: string): string | null {
  const w = (rawWord || '').trim().toLowerCase();

  // Direct exact match
  if (SVG_ICONS[w]) return w;

  // Routines & Everyday Actions
  if (w === 'get up' || w === 'wake up') return 'get_up';
  if (w === 'breakfast') return 'breakfast';
  if (w === 'dinner') return 'dinner';
  if (w === 'lunch') return 'lunch';
  if (w === 'go to school') return 'go_to_school';
  if (w === 'go to bed' || w === 'sleep') return 'go_to_bed';
  if (w.includes('clean') && w.includes('house')) return 'clean_house';
  if (w.includes('surf') && w.includes('internet')) return 'surf_internet';
  if (w.includes('water') && w.includes('flower')) return 'water_flowers';
  if (w.includes('karate')) return 'karate';
  if (w.includes('chess')) return 'chess';
  if (w === 'swim' || w === 'swimming') return 'swim';
  if (w === 'run' || w === 'running' || w === 'jogging') return 'run';
  if (w === 'cook' || w === 'cooking') return 'cook';
  if (w === 'sing' || w === 'singing') return 'sing';
  if (w === 'dance' || w === 'dancing') return 'dance';
  if (w.includes('skate') || w.includes('roller-skating')) return 'skate';
  if (w.includes('skip') || w.includes('skipping')) return 'skip';

  // Emotions
  if (w === 'happy') return 'happy';
  if (w === 'sad') return 'sad';
  if (w === 'angry') return 'angry';
  if (w === 'sleepy') return 'sleepy';

  // Specific user requirements: plate, cup, party
  if (w.includes('plate') || w.includes('dish')) return 'plate';
  if (w.includes('cup') || w.includes('mug') || w.includes('glass')) return 'cup';
  if (w.includes('party')) return 'party';

  // Food & drink phrases
  if (w.includes('mango')) return 'mango';
  if (w.includes('lemon')) return 'lemon';
  if (w.includes('nut')) return 'nut';
  if (w.includes('pasta') || w.includes('spaghetti')) return 'pasta';
  if (w.includes('popcorn')) return 'popcorn';
  if (w.includes('present') || w.includes('gift')) return 'present';
  if (w.includes('pizza')) return 'pizza';
  if (w.includes('noodle')) return 'noodles';
  if (w.includes('rice')) return 'rice';
  if (w.includes('cake') || w.includes('pie')) return 'cake';
  if (w.includes('bread') || w.includes('toast')) return 'bread';
  if (w.includes('milk')) return 'milk';
  if (w.includes('water')) return 'water';
  if (w.includes('tea') || w.includes('teapot')) return 'tea';
  if (w.includes('juice')) return 'juice';
  if (w.includes('apple')) return 'apple';
  if (w.includes('banana')) return 'banana';
  if (w.includes('chicken') || w.includes('meat')) return 'chicken';
  if (w.includes('egg')) return 'eggs';
  if (w.includes('candy') || w.includes('sweet')) return 'candy';
  if (w.includes('chip') || w.includes('fries')) return 'chips';
  if (w.includes('sandwich') || w.includes('burger')) return 'sandwich';
  if (w.includes('salad')) return 'salad';
  if (w.includes('biscuit') || w.includes('cookie')) return 'biscuit';
  if (w.includes('soup')) return 'soup';
  if (w.includes('pot')) return 'pot';
  if (w.includes('box')) return 'box';

  // Animals
  if (w.includes('crocodile')) return 'crocodile';
  if (w.includes('kangaroo')) return 'kangaroo';
  if (w.includes('peacock')) return 'peacock';
  if (w.includes('ant')) return 'ant';
  if (w.includes('cat') || w.includes('kitten')) return 'cat';
  if (w.includes('dog') || w.includes('puppy')) return 'dog';
  if (w.includes('bird')) return 'bird';
  if (w.includes('parrot')) return 'parrot';
  if (w.includes('duck')) return 'duck';
  if (w.includes('fish') || w.includes('goldfish')) return 'fish';
  if (w.includes('monkey')) return 'monkey';
  if (w.includes('elephant')) return 'elephant';
  if (w.includes('tiger')) return 'tiger';
  if (w.includes('lion')) return 'lion';
  if (w.includes('rabbit')) return 'rabbit';
  if (w.includes('pig')) return 'pig';
  if (w.includes('bear') || w.includes('teddy')) return 'bear';
  if (w.includes('mouse')) return 'mouse';
  if (w.includes('horse')) return 'horse';
  if (w.includes('frog')) return 'frog';
  if (w.includes('cow')) return 'cow';
  if (w.includes('goat')) return 'goat';
  if (w.includes('giraffe')) return 'giraffe';
  if (w.includes('zebra')) return 'zebra';

  // School items & Subjects
  if (w.includes('maths') || w.includes('math')) return 'maths';
  if (w.includes('science')) return 'science';
  if (w.includes('art')) return 'art';
  if (w.includes('key')) return 'key';
  if (w.includes('book') || w.includes('story') || w.includes('read')) return 'book';
  if (w.includes('pencil') || w.includes('crayon')) return 'pencil';
  if (w.includes('pen')) return 'pen';
  if (w.includes('ruler')) return 'ruler';
  if (w.includes('rubber') || w.includes('eraser')) return 'rubber';
  if (w.includes('bag') || w.includes('backpack')) return 'bag';
  if (w.includes('desk')) return 'desk';
  if (w.includes('chair')) return 'chair';
  if (w.includes('clock') || w.includes("o'clock")) return 'clock';
  if (w.includes('bell')) return 'bell';
  if (w.includes('school')) return 'school';
  if (w.includes('classroom')) return 'classroom';
  if (w.includes('library')) return 'library';

  // Toys & Transport & Actions
  if (w.includes('van')) return 'van';
  if (w.includes('net')) return 'net';
  if (w.includes('nest')) return 'nest';
  if (w.includes('kick')) return 'kick';
  if (w.includes('ball') || w.includes('football') || w.includes('basketball') || w.includes('volleyball')) return 'ball';
  if (w.includes('bike') || w.includes('bicycle') || w.includes('cycling') || w.includes('riding')) return 'bike';
  if (w.includes('car') || w.includes('taxi')) return 'car';
  if (w.includes('bus')) return 'bus';
  if (w.includes('plane') || w.includes('fly')) return 'plane';
  if (w.includes('train')) return 'train';
  if (w.includes('boat') || w.includes('ship') || w.includes('yacht') || w.includes('sail')) return 'boat';
  if (w.includes('kite')) return 'kite';
  if (w.includes('robot')) return 'robot';
  if (w.includes('doll') || w.includes('puppet')) return 'doll';
  if (w.includes('yo-yo') || w.includes('yoyo')) return 'yo_yo';

  // Clothing
  if (w.includes('hat')) return 'hat';
  if (w.includes('cap')) return 'cap';
  if (w.includes('shirt') || w.includes('t-shirt')) return 'shirt';
  if (w.includes('dress') || w.includes('skirt')) return 'dress';
  if (w.includes('shoe') || w.includes('boot') || w.includes('sock') || w.includes('trousers')) return 'shoes';

  // Weather
  if (w.includes('rain') || w.includes('rainy')) return 'rainy';
  if (w.includes('wind') || w.includes('windy')) return 'windy';
  if (w.includes('cloud') || w.includes('cloudy')) return 'cloudy';
  if (w.includes('snow') || w.includes('snowy')) return 'snowy';

  // House, Nature & Places
  if (w.includes('village')) return 'village';
  if (w.includes('cinema') || w.includes('movie')) return 'cinema';
  if (w.includes('hospital')) return 'hospital';
  if (w.includes('supermarket')) return 'supermarket';
  if (w.includes('grass') || w.includes('lawn')) return 'grass';
  if (w.includes('lake')) return 'lake';
  if (w.includes('river')) return 'river';
  if (w.includes('hill')) return 'hill';
  if (w.includes('shell')) return 'shell';
  if (w.includes('house') || w.includes('home') || w.includes('cottage') || w.includes('flat')) return 'house';
  if (w.includes('bed')) return 'bed';
  if (w.includes('door') || w.includes('gate')) return 'door';
  if (w.includes('window')) return 'window';
  if (w.includes('tree') || w.includes('plant') || w.includes('leaf')) return 'tree';
  if (w.includes('flower') || w.includes('rose') || w.includes('blossom')) return 'flower';
  if (w.includes('sun') || w.includes('sunny')) return 'sun';
  if (w.includes('moon')) return 'moon';
  if (w.includes('star')) return 'star';
  if (w.includes('tent') || w.includes('camp') || w.includes('campfire')) return 'tent';
  if (w.includes('beach') || w.includes('sand')) return 'beach';
  if (w.includes('sea') || w.includes('ocean')) return 'sea';
  if (w.includes('park') || w.includes('garden')) return 'park';
  if (w.includes('zoo')) return 'zoo';
  if (w.includes('guitar') || w.includes('music') || w.includes('violin')) return 'guitar';
  if (w.includes('piano')) return 'piano';
  if (w.includes('temple') || w.includes('pagoda')) return 'temple';
  if (w.includes('solar')) return 'solar_panels';
  if (w.includes('table')) return 'table';
  if (w.includes('room') || w.includes('bedroom') || w.includes('kitchen')) return 'room';

  // People, Body & Occupations
  if (w.includes('hand')) return 'hand';
  if (w.includes('nose')) return 'nose';
  if (w.includes('eye')) return 'eye';
  if (w.includes('hair') || w.includes('head')) return 'hair';
  if (w.includes('doctor') || w.includes('nurse')) return 'doctor';
  if (w.includes('teacher')) return 'teacher';
  if (w.includes('farmer')) return 'farmer';
  if (w.includes('pilot')) return 'pilot';
  if (w.includes('singer')) return 'singer';
  if (w.includes('family') || w.includes('mother') || w.includes('father') || w.includes('brother') || w.includes('sister') || w.includes('parents') || w.includes('grandparent') || w.includes('friend') || w.includes('boy') || w.includes('girl')) return 'family';

  // STRICT RULE: If no semantic visual match exists, DO NOT fall back to 'book'!
  return null;
}

/**
 * Checks whether a vocabulary word has an exact verified semantic cartoon illustration.
 */
export function hasExactVocabularyImage(word: string): boolean {
  const canonicalKey = resolveCanonicalKey(word);
  return !!canonicalKey && !!SVG_ICONS[canonicalKey];
}

/**
 * Extracts the canonical image key from a data-URI, raw SVG string, or image URL.
 */
export function resolveKeyFromImage(imageStr?: string): string | null {
  if (!imageStr) return null;

  // Check data-key attribute first (fastest and 100% deterministic)
  const dataKeyMatch = imageStr.match(/data-key=["']([^"']+)["']/);
  if (dataKeyMatch && dataKeyMatch[1]) {
    return dataKeyMatch[1];
  }

  // Check URL encoded data-key
  if (imageStr.includes('data-key%3D%22')) {
    const encMatch = imageStr.match(/data-key%3D%22([a-zA-Z0-9_]+)%22/);
    if (encMatch && encMatch[1]) return encMatch[1];
  }

  // Decode URI if present
  let decoded = imageStr;
  if (imageStr.startsWith('data:image/svg+xml;utf8,')) {
    try {
      decoded = decodeURIComponent(imageStr.replace('data:image/svg+xml;utf8,', ''));
      const decMatch = decoded.match(/data-key=["']([^"']+)["']/);
      if (decMatch && decMatch[1]) return decMatch[1];
    } catch {
      // fallback
    }
  }

  return null;
}

/**
 * Strictly verifies that a target word matches the visual meaning of an image.
 * Guarantees TARGET = IMAGE MEANING.
 */
export function validateTargetMatchesImage(targetWord: string, imageStr?: string): boolean {
  if (!targetWord || !imageStr) return false;
  const targetKey = resolveCanonicalKey(targetWord);
  if (!targetKey) return false;

  const imgKey = resolveKeyFromImage(imageStr);
  if (!imgKey) return false;

  return targetKey === imgKey;
}

/**
 * Returns raw, inline-renderable SVG string for any vocabulary word.
 * Returns empty string if no verified semantic image exists.
 */
export function getRawSvg(word: string): string {
  const canonicalKey = resolveCanonicalKey(word);
  if (canonicalKey && SVG_ICONS[canonicalKey]) {
    return SVG_ICONS[canonicalKey];
  }
  return '';
}

/**
 * Returns a verified, child-friendly cartoon image data-URI SVG for a vocabulary word.
 * Returns empty string if no verified semantic image exists.
 */
export function getVocabularyImage(word: string): string {
  const rawSvg = getRawSvg(word);
  if (rawSvg) {
    return \`data:image/svg+xml;utf8,\${encodeURIComponent(rawSvg)}\`;
  }
  return '';
}
`;

updated = updated.slice(0, resolveStart) + newFunctions;
fs.writeFileSync(illustrationsPath, updated, 'utf8');
console.log('Successfully patched illustrations.ts with new SVGs and semantic validation functions!');
