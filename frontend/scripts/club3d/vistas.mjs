// Prepara las vistas del recorrido del club para la web.
//
// Uso (desde frontend/):  node scripts/club3d/vistas.mjs
//
// Entrada: scripts/.cache/club3d/hd/<vista>-hd.png (foto ampliada x2 con Swin2SR) y
//          <vista>-depth.png (profundidad con Depth Anything V2), generadas a partir de
//          scripts/club3d/fotos/ (fotos de referencia con los letreros de otras marcas cambiados).
// Salida:  projects/gym-umbral/public/media/club/<vista>.webp, <vista>-sm.webp y <vista>-depth.webp
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '../..');
const HD = path.join(ROOT, 'scripts/.cache/club3d/hd');
const OUT = path.join(ROOT, 'projects/gym-umbral/public/media/club');
fs.mkdirSync(OUT, { recursive: true });
sharp.cache(false);

const views = fs.readdirSync(HD).filter((f) => f.startsWith('v-') && f.endsWith('-hd.png')).map((f) => f.replace('-hd.png', ''));
for (const v of views) {
  const hd = path.join(HD, `${v}-hd.png`);
  const depth = path.join(HD, `${v}-depth.png`);
  if (!fs.existsSync(depth)) {
    console.log('falta la profundidad de', v);
    continue;
  }
  // Un toque de nitidez y el tono cálido de la marca.
  const base = sharp(hd).sharpen({ sigma: 0.6 }).modulate({ saturation: 0.92 });
  await base.clone().resize({ width: 1800, height: 1800, fit: 'inside', withoutEnlargement: true }).webp({ quality: 80, effort: 5 }).toFile(path.join(OUT, `${v}.webp`));
  await base.clone().resize({ width: 1000, height: 1000, fit: 'inside' }).webp({ quality: 76, effort: 5 }).toFile(path.join(OUT, `${v}-sm.webp`));
  // Profundidad suavizada (sin ruido) en 768 px: alcanza para la luz del hover.
  await sharp(depth).greyscale().resize({ width: 768, height: 768, fit: 'inside' }).blur(1.2).webp({ quality: 85 }).toFile(path.join(OUT, `${v}-depth.webp`));
  const kb = ['', '-sm', '-depth'].map((s) => Math.round(fs.statSync(path.join(OUT, `${v}${s}.webp`)).size / 1024));
  console.log(v, kb.join(' / '), 'KB');
}
