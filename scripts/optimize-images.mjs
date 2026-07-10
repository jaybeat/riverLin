// Convert every raster image under public/images to WebP (q80) and drop the
// original. Runs automatically via the `predev` / `prebuild` npm hooks, so both
// local dev and the Vercel production build ship WebP only.
//
// Workflow when adding a screenshot: put the source PNG/JPG in
// public/images/<project>/ and reference it with a `.webp` extension in
// src/data/*.ts — the conversion happens on the next `npm run dev` / `build`.
//
// Run manually any time with:  npm run optimize:images
import sharp from 'sharp'
import { readdirSync, statSync, unlinkSync } from 'node:fs'
import { join, extname, resolve, relative } from 'node:path'

const ROOT = resolve('public/images')
const CONVERT = new Set(['.png', '.jpg', '.jpeg'])

function walk(dir) {
  const out = []
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) out.push(...walk(p))
    else if (CONVERT.has(extname(p).toLowerCase())) out.push(p)
  }
  return out
}

const sources = walk(ROOT)
if (sources.length === 0) {
  console.log('[optimize-images] no PNG/JPG to convert — all images already WebP.')
  process.exit(0)
}

let totalOld = 0
let totalNew = 0
for (const src of sources) {
  const webp = src.replace(/\.(png|jpe?g)$/i, '.webp')
  const oldSize = statSync(src).size
  await sharp(src).webp({ quality: 80, effort: 6 }).toFile(webp)
  const newSize = statSync(webp).size
  unlinkSync(src) // only reached if the WebP wrote successfully
  totalOld += oldSize
  totalNew += newSize
  const rel = relative(ROOT, src).replace(/\\/g, '/')
  const pct = ((1 - newSize / oldSize) * 100).toFixed(0)
  console.log(
    `[optimize-images] ${rel} ${(oldSize / 1024).toFixed(0)}KB -> ${(newSize / 1024).toFixed(0)}KB (-${pct}%)  →  reference it as /images/${rel.replace(/\.(png|jpe?g)$/i, '.webp')}`
  )
}
console.log(
  `[optimize-images] done: ${(totalOld / 1024 / 1024).toFixed(2)}MB -> ${(totalNew / 1024 / 1024).toFixed(2)}MB (-${((1 - totalNew / totalOld) * 100).toFixed(0)}%) across ${sources.length} file(s).`
)
