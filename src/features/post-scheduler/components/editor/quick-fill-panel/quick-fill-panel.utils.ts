const WORDS = [
  'Believe',
  'in',
  'yourself',
  'and',
  'keep',
  'moving',
  'forward',
  '#motivation',
  'every',
  'small',
  'step',
  'counts',
  '@flintzy',
  'success',
  'takes',
  'patience',
  '#growth',
  'consistency',
  'and',
  'courage',
];

/** Generates placeholder text of exactly `length` characters. For testing only. */
export function generateTestContent(length: number): string {
  let text = '';
  for (let index = 0; text.length < length; index++) {
    text += `${WORDS[index % WORDS.length]} `;
  }
  return text.slice(0, length);
}
