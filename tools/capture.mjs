// Screenshots the generated example pages with headless Edge and converts them to WebP.
// Run with:  node tools/capture.mjs <htmlDir> <outDir>
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import sharp from 'sharp'

const [htmlDir, outDir] = process.argv.slice(2)
const edge = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
fs.mkdirSync(outDir, { recursive: true })
for (const f of fs.readdirSync(htmlDir).filter((x) => x.endsWith('.html'))) {
  const name = f.replace('.html', '')
  const png = path.join(htmlDir, name + '.png')
  execFileSync(edge, ['--headless', '--disable-gpu', '--hide-scrollbars', '--virtual-time-budget=4000',
    `--screenshot=${png}`, '--window-size=1440,900', pathToFileURL(path.join(htmlDir, f)).href], { stdio: 'ignore' })
  await sharp(png).resize(1400).webp({ quality: 82 }).toFile(path.join(outDir, name + '.webp'))
  console.log(name)
}
