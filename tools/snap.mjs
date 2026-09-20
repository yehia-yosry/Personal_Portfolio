// Dev helper: screenshots the running preview at chosen widths/sections.
// Usage: node tools/snap.mjs <outDir> <width> <height> <path[@scrollY|#id]>...
import puppeteer from 'puppeteer-core'
const [out, w, h, ...targets] = process.argv.slice(2)
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true })
const page = await browser.newPage()
await page.setViewport({ width: +w, height: +h })
const errors = []
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
page.on('pageerror', (e) => errors.push(String(e)))
for (const t of targets) {
  const [path, anchor] = t.split('@')
  await page.goto('http://localhost:4173' + path, { waitUntil: 'networkidle0' })
  await page.addStyleTag({ content: 'html{scroll-behavior:auto!important}' })
  if (anchor) {
    await page.evaluate((a) => { const el = document.getElementById(a); window.scrollTo(0, el ? el.getBoundingClientRect().top + scrollY - 40 : +a) }, anchor)
    await new Promise((r) => setTimeout(r, 1200))
  }
  const name = (path.replace(/\W+/g, '_') + '_' + (anchor ?? 'top')).slice(0, 40)
  await page.screenshot({ path: `${out}/${w}_${name}.png` })
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)
  console.log(name, 'overflowX:', overflow)
}
console.log('console errors:', errors)
await browser.close()
