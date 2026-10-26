// Prepara las vistas del recorrido del club para la web.
//
// Uso (desde frontend/):  node scripts/club3d/vistas.mjs
//
// Entrada: scripts/club3d/hq/<vista>.jpg (fotos mejoradas por Bruno, con letreros cambiados; ver hq.mjs)
//          y scripts/.cache/club3d/hq/<vista>-depth.png (profundidad con Depth Anything V2).
// Salida:  projects/gym-umbral/public/media/club3/<vista>.webp, <vista>-sm.webp y <vista>-depth.webp
//          (los mapas de objetos <vista>-ids.png los escribe ia/objetos.mjs en la misma carpeta).
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '../..');
const HQ = path.join(ROOT, 'scripts/club3d/hq');
const DEPTH = path.join(ROOT, 'scripts/.cache/club3d/hq');
const OUT = path.join(ROOT, 'projects/gym-umbral/public/media/club3');
fs.mkdirSync(OUT, { recursive: true });
sharp.cache(false);

const views = fs.readdirSync(HQ).filter((f) => f.startsWith('v-') && f.endsWith('.jpg')).map((f) => f.replace('.jpg', ''));
for (const v of views) {
  const hd = path.join(HQ, `${v}.jpg`);
  const depth = path.join(DEPTH, `${v}-depth.png`);
  if (!fs.existsSync(depth)) {
    console.log('falta la profundidad de', v);
    continue;
  }
  // Un toque de nitidez y el tono cálido de la marca.
  const base = sharp(hd).modulate({ saturation: 0.94 });
  await base.clone().resize({ width: 2400, withoutEnlargement: true }).webp({ quality: 78, effort: 5 }).toFile(path.join(OUT, `${v}.webp`));
  await base.clone().resize({ width: 1000, withoutEnlargement: true }).webp({ quality: 76, effort: 5 }).toFile(path.join(OUT, `${v}-sm.webp`));
  // Profundidad suavizada (sin ruido) en 768 px: alcanza para la luz del hover.
  await sharp(depth).greyscale().resize({ width: 768, height: 768, fit: 'inside' }).blur(1.2).webp({ quality: 85 }).toFile(path.join(OUT, `${v}-depth.webp`));
  const kb = ['', '-sm', '-depth'].map((s) => Math.round(fs.statSync(path.join(OUT, `${v}${s}.webp`)).size / 1024));
  console.log(v, kb.join(' / '), 'KB');
}
