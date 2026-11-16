export const STEP = 1 / 60;
export const PLAYER = { radius: 12, speed: 190, maxHp: 5, invulnerable: 0.72 };
export const LANTERN = { range: 310, fireInterval: 0.72, emberSpeed: 420, damage: 1, radius: 4 };
export const WAVE = { firstSpawn: 1.8, baseInterval: 2.45, minimumInterval: 0.62, surgeEvery: 60, surgeCount: 7 };
export const XP = { first: 6, growth: 1.32 };
export const ENEMIES = {
  wisp: { hp: 1, speed: 48, radius: 10, shards: 1, damage: 1, color: '#ad7aff' },
  darter: { hp: 1, speed: 88, radius: 9, shards: 1, damage: 1, color: '#826cff' },
  brute: { hp: 8, speed: 30, radius: 19, shards: 5, damage: 2, color: '#6f50a4' },
  spitter: { hp: 3, speed: 38, radius: 13, shards: 3, damage: 1, color: '#9668c4' }
};
export const UPGRADES = [
  { id:'twin', name:'Twin Wick', effect:'Fire one extra ember per shot.', max:3 },
  { id:'quick', name:'Quick Wick', effect:'Embers fire 25% faster.', max:4 },
  { id:'heavy', name:'Heavy Ember', effect:'Embers deal +1 damage.', max:4 },
  { id:'range', name:'Long Glow', effect:'Lantern range +25%.', max:3 },
  { id:'magnet', name:'Wide Net', effect:'Shard pickup radius +40%.', max:3 },
  { id:'orbit', name:'Orbiting Flame', effect:'Add a flame that burns nearby shadows.', max:3 },
  { id:'swift', name:'Swift Boots', effect:'Move 15% faster.', max:3 },
  { id:'heart', name:'Thick Wick', effect:'+1 max heart and heal 1 heart.', max:3 },
  { id:'pierce', name:'Piercing Ember', effect:'Embers pass through one extra shadow.', max:3 }
];
