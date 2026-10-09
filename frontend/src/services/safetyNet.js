const RED_FLAGS = [
  'ما بيتنفس', 'مش عم يتنفس', 'وقف نفسه', 'ازرق', 'مغمى عليه', 'فاقد الوعي',
  'نزيف ما بيوقف', 'دم كثير', 'الم بالصدر', 'وجع بالصدر', 'تشنجات',
  'بلع كلور', 'بلع دوا', 'not breathing', 'unconscious',
];

function normalize(text) {
  return text
    .replace(/[ً-ٰٟ]/g, '')
    .replace(/[أإآ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .toLowerCase()
    .trim();
}

export function check(text) {
  if (!text) return { hit: false, reasons: [] };
  const normalized = normalize(text);
  const reasons = RED_FLAGS.filter((flag) => normalized.includes(normalize(flag)));
  return { hit: reasons.length > 0, reasons };
}
