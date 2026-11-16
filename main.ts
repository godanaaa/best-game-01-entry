// EMBERHOLD — bounty best-game-01
import { cpSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { buildDossier } from './vendor/makefun-game.ts';

const output = resolve(process.env.MAKEFUN_OUTPUT_DIR || '/output');
mkdirSync(output, { recursive: true });
cpSync(new URL('./game/', import.meta.url), join(output, 'game'), { recursive: true, force: true });
cpSync(new URL('./screenshots/', import.meta.url), join(output, 'screenshots'), { recursive: true, force: true });
const dossier = buildDossier(output, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  game_max_files: 993,
  game_max_bytes: 50331648,
  game_path_max_bytes: 1000
});
writeFileSync(join(output, 'dossier.json'), dossier);
