export function createRandom(seed = 1) {
  let state = Number(seed) >>> 0;
  const next = () => {
    state += 0x6D2B79F5;
    let value = state;
    value = Math.imul(value ^ value >>> 15, value | 1);
    value ^= value + Math.imul(value ^ value >>> 7, value | 61);
    return ((value ^ value >>> 14) >>> 0) / 4294967296;
  };
  return { next, range: (min, max) => min + next() * (max - min), pick: array => array[Math.floor(next() * array.length)] };
}
