// Generates the HTML for the four example portfolio sites.
// Run with:  node tools/mock-sites.mjs <outDir> <imgDir>
// Screenshots are then captured from these pages (see tools/capture.mjs).
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const [outDir, imgDir] = process.argv.slice(2)
fs.mkdirSync(outDir, { recursive: true })
const root = path.resolve('node_modules')
const font = (p) => pathToFileURL(path.join(root, p)).href
const img = (n) => pathToFileURL(path.join(imgDir, n)).href

const FONTS = `
@font-face{font-family:'HG';src:url('${font('@fontsource-variable/hanken-grotesk/files/hanken-grotesk-latin-wght-normal.woff2')}');font-weight:100 900}
@font-face{font-family:'IS';src:url('${font('@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff2')}')}
@font-face{font-family:'IS';font-style:italic;src:url('${font('@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2')}')}
*{box-sizing:border-box;margin:0;padding:0}body{width:1440px;height:900px;overflow:hidden;-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}`

const write = (name, css, body) =>
  fs.writeFileSync(path.join(outDir, name + '.html'), `<!doctype html><meta charset=utf-8><style>${FONTS}${css}</style><body>${body}`)

/* ------------------------------------------------------------------ */
/* 1. Foldline — SaaS                                                   */
/* ------------------------------------------------------------------ */
const saasCss = `
body{font-family:'HG';background:#F5F6F4;color:#10201C}
:root{--g:#0F7A5F;--line:#DCE2DE}
nav{display:flex;align-items:center;justify-content:space-between;padding:26px 80px}
.logo{font-weight:800;font-size:22px;letter-spacing:-.03em;display:flex;gap:10px;align-items:center}
.logo i{width:22px;height:22px;border-radius:6px;background:var(--g);display:block;position:relative}
.logo i:after{content:'';position:absolute;inset:6px 6px 6px 6px;border-left:3px solid #fff;border-bottom:3px solid #fff}
.links{display:flex;gap:34px;font-size:15px;color:#41544E;font-weight:500}
.btn{background:var(--g);color:#fff;padding:12px 22px;border-radius:10px;font-weight:600;font-size:15px}
.btn.o{background:none;color:#10201C;border:1px solid #B9C4BF}
.hero{padding:40px 80px 0;display:grid;grid-template-columns:5fr 7fr;gap:60px;align-items:start}
h1{font-size:64px;line-height:1.02;letter-spacing:-.045em;font-weight:700;margin-top:34px}
.sub{font-size:19px;line-height:1.55;color:#41544E;margin:26px 0 34px;max-width:480px}
.eyebrow{font-size:13px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--g)}
.app{background:#fff;border:1px solid var(--line);border-radius:16px;box-shadow:0 30px 60px -30px rgba(16,32,28,.25);display:grid;grid-template-columns:170px 1fr;height:600px;overflow:hidden}
.side{border-right:1px solid var(--line);padding:22px 16px;font-size:13.5px;color:#41544E;display:flex;flex-direction:column;gap:6px}
.side b{padding:9px 12px;border-radius:8px;font-weight:600}.side .on{background:#E6F1EC;color:var(--g)}
.main{padding:26px 28px;overflow:hidden}
.kpis{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin:18px 0 22px}
.kpi{border:1px solid var(--line);border-radius:12px;padding:16px}.kpi small{color:#6B7C76;font-size:12px}.kpi div{font-size:26px;font-weight:700;letter-spacing:-.03em;margin-top:6px}
.kpi em{font-style:normal;font-size:12px;color:var(--g);font-weight:600}
table{width:100%;border-collapse:collapse;font-size:13.5px}td,th{padding:11px 6px;border-bottom:1px solid #E8ECE9;text-align:left}th{color:#6B7C76;font-weight:600;font-size:12px}
.pill{padding:3px 10px;border-radius:99px;font-size:12px;font-weight:600}.paid{background:#E1F2EA;color:#0F7A5F}.due{background:#FCEFD9;color:#946100}.late{background:#FBE4E1;color:#A12B1F}
.sec{padding:70px 80px}
h2{font-size:46px;letter-spacing:-.04em;line-height:1.05;font-weight:700;max-width:700px}
.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:50px}
.card{background:#fff;border:1px solid var(--line);border-radius:16px;padding:28px;height:400px;display:flex;flex-direction:column}
.card h3{font-size:22px;letter-spacing:-.02em;margin-top:auto}.card p{color:#41544E;line-height:1.55;margin-top:10px;font-size:15.5px}
.steps{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid #10201C;margin-top:60px}
.step{padding:26px 26px 0 0}.step span{font-size:13px;font-weight:700;color:var(--g)}.step h3{font-size:24px;margin:14px 0 10px;letter-spacing:-.02em}.step p{color:#41544E;line-height:1.55;font-size:15.5px}
.dark{background:#10201C;color:#F5F6F4;border-radius:0}.dark .eyebrow{color:#7FD6B8}
`
const chart = (h = 200, color = '#0F7A5F') => `<svg viewBox="0 0 600 ${h}" width="100%" height="${h}" preserveAspectRatio="none"><defs><linearGradient id="a" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="${color}" stop-opacity=".22"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></linearGradient></defs><path d="M0 ${h*.8} C80 ${h*.75},120 ${h*.5},190 ${h*.55} S320 ${h*.3},380 ${h*.35} S520 ${h*.12},600 ${h*.08} V${h} H0Z" fill="url(#a)"/><path d="M0 ${h*.8} C80 ${h*.75},120 ${h*.5},190 ${h*.55} S320 ${h*.3},380 ${h*.35} S520 ${h*.12},600 ${h*.08}" fill="none" stroke="${color}" stroke-width="3"/></svg>`
const saasNav = `<nav><div class="logo"><i></i>Foldline</div><div class="links"><a>Product</a><a>Workflow</a><a>Integrations</a><a>Company</a></div><a class="btn">Book a demo</a></nav>`
const rows = [['INV-2041','Harbor Studio','Mar 04','$4,200','paid','Paid'],['INV-2042','Oakline Supply','Mar 09','$1,860','due','Due in 5d'],['INV-2043','Nimbus Labs','Mar 11','$9,400','paid','Paid'],['INV-2044','Cedar & Row','Mar 14','$2,310','late','Overdue'],['INV-2045','Tallis Group','Mar 18','$6,050','due','Due in 12d']]
const table = `<table><tr><th>Invoice</th><th>Client</th><th>Issued</th><th>Amount</th><th>Status</th></tr>${rows.map(r=>`<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td><b>${r[3]}</b></td><td><span class="pill ${r[4]}">${r[5]}</span></td></tr>`).join('')}</table>`
const appShell = (inner) => `<div class="app"><div class="side"><b class="on">Overview</b><b>Invoices</b><b>Clients</b><b>Payments</b><b>Reports</b><b>Settings</b></div><div class="main">${inner}</div></div>`

write('saas-1', saasCss, `${saasNav}<div class="hero"><div><div class="eyebrow">Invoicing &amp; cash-flow</div><h1>Know what you’re owed, and when.</h1><p class="sub">Foldline keeps invoices, payments and reminders in one calm workspace, so small teams spend less time chasing money.</p><a class="btn">Book a demo</a> &nbsp; <a class="btn o">See how it works</a></div>${appShell(`<div style="font-weight:700;font-size:20px;letter-spacing:-.02em">Cash flow</div><div class="kpis"><div class="kpi"><small>Outstanding</small><div>$23,620</div><em>▲ 8.2%</em></div><div class="kpi"><small>Collected (30d)</small><div>$41,900</div><em>▲ 12.5%</em></div><div class="kpi"><small>Avg. days to pay</small><div>14.2</div><em>▼ 3.1d</em></div></div>${chart(190)}<div style="height:14px"></div>${table}`)}</div>`)

write('saas-2', saasCss, `${saasNav}<div class="sec"><div class="eyebrow">Product</div><h2 style="margin-top:14px">Everything between “sent” and “paid”, handled.</h2><div class="cards">
<div class="card">${chart(150)}<h3>Live cash-flow view</h3><p>See expected income by week and spot gaps before they become problems.</p></div>
<div class="card"><div style="display:flex;flex-direction:column;gap:10px"><div class="kpi"><small>Reminder · sent</small><div style="font-size:16px">Invoice INV-2044 is 3 days late</div></div><div class="kpi"><small>Reminder · scheduled</small><div style="font-size:16px">Friendly nudge · Tomorrow 9:00</div></div><div class="kpi"><small>Paid</small><div style="font-size:16px">Nimbus Labs · $9,400</div></div></div><h3>Automatic reminders</h3><p>Polite follow-ups go out on your schedule, in your tone.</p></div>
<div class="card"><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;align-items:end;height:150px">${[40,64,52,90,70,110,86,130].slice(0,4).map(h=>`<div style="background:#E6F1EC;border-radius:6px;height:${h}px"></div>`).join('')}${[70,110,86,140].map(h=>`<div style="background:#0F7A5F;border-radius:6px;height:${h}px"></div>`).join('')}</div><h3>Reports you can read</h3><p>Monthly summaries by client, service and payment method.</p></div></div></div>`)

write('saas-3', saasCss, `${saasNav}<div class="sec dark" style="height:790px"><div class="eyebrow">Workflow</div><h2 style="margin-top:14px;color:#fff">From quote to payment in four steps.</h2><div class="steps" style="border-color:#3A4F49"><div class="step"><span>01</span><h3>Create</h3><p>Start from a template or a past invoice. Taxes and currencies fill in for you.</p></div><div class="step"><span>02</span><h3>Send</h3><p>Share a secure link or a PDF. You’ll see when it has been opened.</p></div><div class="step"><span>03</span><h3>Follow up</h3><p>Reminders run in the background until the balance reaches zero.</p></div><div class="step"><span>04</span><h3>Reconcile</h3><p>Payments match themselves to invoices and appear in your reports.</p></div></div>
<div style="margin-top:70px;display:grid;grid-template-columns:1fr 1fr;gap:22px"><div style="border:1px solid #3A4F49;border-radius:16px;padding:28px"><div class="eyebrow">Integrations</div><p style="margin-top:12px;font-size:20px;line-height:1.5;color:#CFE0DA">Connect your bank feed, accounting software and calendar in a few clicks.</p></div><div style="border:1px solid #3A4F49;border-radius:16px;padding:28px;display:flex;gap:14px;align-items:center">${['Bank','Ledger','Calendar','Mail','Export'].map(x=>`<span style="border:1px solid #58726A;border-radius:10px;padding:12px 16px;font-weight:600">${x}</span>`).join('')}</div></div></div>`)

write('saas-4', saasCss, `${saasNav}<div style="padding:10px 80px"><div class="app" style="grid-template-columns:170px 1fr 380px;height:740px">
<div class="side"><b>Overview</b><b class="on">Invoices</b><b>Clients</b><b>Payments</b><b>Reports</b><b>Settings</b></div>
<div class="main"><div class="eyebrow">Invoice INV-2044</div><div style="font-size:34px;font-weight:700;letter-spacing:-.04em;margin:8px 0 22px">Cedar &amp; Row</div>
<table><tr><th>Item</th><th>Qty</th><th>Rate</th><th>Total</th></tr><tr><td>Brand refresh — phase 1</td><td>1</td><td>$1,600</td><td><b>$1,600</b></td></tr><tr><td>Asset export &amp; handoff</td><td>6h</td><td>$95</td><td><b>$570</b></td></tr><tr><td>Rush fee</td><td>1</td><td>$140</td><td><b>$140</b></td></tr></table>
<div style="display:flex;justify-content:space-between;margin-top:26px;font-size:22px;font-weight:700"><span>Total due</span><span>$2,310</span></div>
<div style="margin-top:30px;display:flex;gap:12px"><a class="btn">Send reminder</a><a class="btn o">Download PDF</a></div></div>
<div class="main" style="border-left:1px solid var(--line);background:#FAFBFA"><div style="font-weight:700;margin-bottom:18px">Activity</div>${['Reminder sent · 2 days ago','Invoice viewed · 5 days ago','Invoice sent · 12 days ago','Invoice created · 12 days ago'].map((t,i)=>`<div style="display:flex;gap:12px;padding:14px 0;border-bottom:1px solid #E8ECE9;font-size:14px"><i style="width:9px;height:9px;border-radius:50%;background:${i?'#B9C4BF':'#0F7A5F'};margin-top:5px"></i>${t}</div>`).join('')}</div></div></div>`)

/* ------------------------------------------------------------------ */
/* 2. Aster Dental — healthcare                                        */
/* ------------------------------------------------------------------ */
const clCss = `
body{font-family:'HG';background:#F7FAF9;color:#14302E}
:root{--t:#1B6F6A;--soft:#E3F0EE}
.top{background:var(--t);color:#DDEEEC;font-size:13px;padding:9px 90px;display:flex;justify-content:space-between}
nav{display:flex;align-items:center;justify-content:space-between;padding:24px 90px}
.logo{font-family:'IS';font-size:32px;display:flex;align-items:center;gap:10px}
.logo i{width:30px;height:30px;border-radius:50% 50% 50% 4px;background:var(--t)}
.links{display:flex;gap:32px;font-size:15px;font-weight:500;color:#3E5E5B}
.btn{background:var(--t);color:#fff;padding:13px 24px;border-radius:99px;font-weight:600;font-size:15px}
.btn.o{background:none;border:1.5px solid var(--t);color:var(--t)}
h1{font-family:'IS';font-weight:400;font-size:84px;line-height:.98;letter-spacing:-.02em}
h1 em{color:var(--t)}
.hero{display:grid;grid-template-columns:1.1fr 1fr;gap:50px;padding:36px 90px;align-items:center}
.sub{font-size:19px;line-height:1.6;color:#3E5E5B;margin:26px 0 34px;max-width:520px}
.blob{height:560px;border-radius:280px 280px 24px 24px;background:linear-gradient(160deg,#CFE5E2,#EAF3F1);position:relative;overflow:hidden}
.blob .c{position:absolute;left:50%;bottom:0;transform:translateX(-50%);width:76%;height:76%;border-radius:200px 200px 0 0;background:#fff;opacity:.6}
.tag{position:absolute;background:#fff;border-radius:16px;padding:16px 20px;box-shadow:0 18px 40px -20px rgba(20,48,46,.35);font-size:14px}
.tag b{display:block;font-size:22px;font-family:'IS';font-weight:400}
h2{font-family:'IS';font-weight:400;font-size:56px;line-height:1.02}
.sec{padding:60px 90px}
.svc{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:44px}
.s{background:#fff;border:1px solid #DCE8E6;border-radius:24px;padding:28px 32px;height:236px;display:flex;flex-direction:column}
.s .ic{width:54px;height:54px;border-radius:16px;background:var(--soft);margin-bottom:auto;display:grid;place-items:center;color:var(--t);font-size:22px;width:46px;height:46px}
.s h3{font-family:'IS';font-weight:400;font-size:32px}.s p{color:#3E5E5B;margin-top:8px;line-height:1.55}
.form{background:#fff;border:1px solid #DCE8E6;border-radius:24px;padding:36px}
.f{border:1px solid #CFE0DD;border-radius:12px;padding:15px 16px;color:#6B8481;margin-bottom:14px;font-size:15px}
.slots{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin:8px 0 22px}.slots span{border:1px solid #CFE0DD;border-radius:12px;padding:12px;text-align:center;font-weight:600;font-size:14px}.slots .on{background:var(--t);color:#fff;border-color:var(--t)}
`
const clNav = `<div class="top"><span>Mon–Sat · 9:00 – 19:00</span><span>Book online or call (000) 555-0142</span></div><nav><div class="logo"><i></i>Aster Dental</div><div class="links"><a>Treatments</a><a>Our team</a><a>First visit</a><a>Contact</a></div><a class="btn">Book a visit</a></nav>`
write('clinic-1', clCss, `${clNav}<div class="hero"><div><h1>Gentle dentistry, <em>explained</em> clearly.</h1><p class="sub">A neighbourhood clinic for check-ups, whitening and family care, with unhurried appointments and no surprises on the day.</p><a class="btn">Book a visit</a> &nbsp; <a class="btn o">View treatments</a></div><div class="blob"><div class="c"></div><div class="tag" style="left:24px;top:60px"><b>Same-week</b>appointments available</div><div class="tag" style="right:24px;bottom:70px"><b>Calm rooms</b>Designed to feel relaxed</div></div></div>`)
const ic = ['✦','◐','❖','◍','✚','☼']
write('clinic-2', clCss, `${clNav}<div class="sec"><h2>Care for every stage,<br>in one place.</h2><div class="svc">${[['Check-ups & cleaning','Thorough exams and gentle hygiene visits to keep small issues small.'],['Whitening','Safe, supervised whitening with results you can actually expect.'],['Family dentistry','Relaxed appointments for children and adults, booked back to back.'],['Orthodontics','Clear aligners and braces, planned with a full treatment timeline.'],['Restorations','Fillings, crowns and bridges matched carefully to your teeth.'],['Emergency care','Same-day pain relief and quick repair when something goes wrong.']].map((s,i)=>`<div class="s"><div class="ic">${ic[i]}</div><h3>${s[0]}</h3><p>${s[1]}</p></div>`).join('')}</div></div>`)
write('clinic-3', clCss, `${clNav}<div class="sec" style="display:grid;grid-template-columns:1fr 1fr;gap:70px"><div><h2>Your first visit, step by step.</h2><div style="margin-top:40px">${[['Say hello','A short conversation about your goals and any concerns.'],['Full check-up','Exam, X-rays if needed, and a clear plan in plain language.'],['Your plan','Costs and timing explained before any treatment begins.']].map((x,i)=>`<div style="display:flex;gap:22px;padding:24px 0;border-top:1px solid #CFE0DD"><span style="font-family:'IS';font-size:40px;color:var(--t);width:50px">0${i+1}</span><div><div style="font-size:21px;font-weight:700">${x[0]}</div><p style="color:#3E5E5B;margin-top:6px;line-height:1.55">${x[1]}</p></div></div>`).join('')}</div></div>
<div class="blob" style="height:650px;border-radius:24px;background:linear-gradient(160deg,#DCEBE8,#F1F7F6);padding:50px"><div style="font-family:'IS';font-size:44px;line-height:1.1">“I was nervous, and nobody made me feel rushed.”</div><p style="margin-top:22px;color:#3E5E5B">Example patient feedback placeholder for design purposes.</p><div class="tag" style="left:50px;bottom:50px;right:50px"><b>Aster Dental</b>Open six days a week</div></div></div>`)
write('clinic-4', clCss, `${clNav}<div class="sec" style="display:grid;grid-template-columns:1fr 1fr;gap:70px;align-items:start"><div><h2>Book your appointment.</h2><p class="sub">Choose a time that suits you. We’ll confirm by message and send a reminder the day before.</p><div style="margin-top:36px;line-height:2;color:#3E5E5B"><b style="color:#14302E">Aster Dental Clinic</b><br>12 Garden Row, Suite 3<br>(000) 555-0142 · hello@aster-example.com</div></div><div class="form"><div style="font-weight:700;margin-bottom:16px">Pick a day</div><div class="slots"><span>Mon 12</span><span class="on">Tue 13</span><span>Wed 14</span><span>Thu 15</span></div><div style="font-weight:700;margin-bottom:12px">Pick a time</div><div class="slots"><span>09:30</span><span>11:00</span><span class="on">14:15</span><span>16:30</span></div><div class="f">Full name</div><div class="f">Phone number</div><div class="f">Treatment (optional)</div><a class="btn" style="display:block;text-align:center;margin-top:8px">Request appointment</a></div></div>`)

/* ------------------------------------------------------------------ */
/* 3. Halden Goods — e-commerce                                        */
/* ------------------------------------------------------------------ */
const shCss = `
body{font-family:'Bahnschrift','Franklin Gothic Medium','Segoe UI',sans-serif;background:#fff;color:#111}
.ann{background:#111;color:#fff;text-align:center;padding:9px;font-size:12px;letter-spacing:.14em;text-transform:uppercase}
nav{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding:20px 60px;border-bottom:1px solid #E5E5E5}
.links{display:flex;gap:28px;font-size:13px;letter-spacing:.12em;text-transform:uppercase}
.logo{font-size:26px;letter-spacing:.32em;font-weight:600}
.r{display:flex;gap:26px;justify-content:flex-end;font-size:13px;letter-spacing:.12em;text-transform:uppercase}
.hero{display:grid;grid-template-columns:1fr 1fr;height:640px}
.hero .t{background:#EDE9E2;padding:80px 70px;display:flex;flex-direction:column;justify-content:center}
.hero h1{font-size:76px;line-height:.98;text-transform:uppercase;letter-spacing:-.01em;font-weight:500}
.hero p{margin:24px 0 34px;max-width:420px;line-height:1.6;font-size:17px;color:#444}
.btn{background:#111;color:#fff;padding:16px 34px;font-size:13px;letter-spacing:.16em;text-transform:uppercase;display:inline-block}
.hero .i{background-size:cover;background-position:center}
.strip{display:flex;justify-content:space-between;padding:22px 60px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#555;border-bottom:1px solid #E5E5E5}
.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:22px;padding:0 60px}
.p .im{height:400px;background-size:cover;background-position:center;background-color:#F1EFEA;position:relative}
.p .n{margin-top:14px;font-size:15px;display:flex;justify-content:space-between}.p .c{color:#777;font-size:13px;margin-top:4px}
.badge{position:absolute;left:12px;top:12px;background:#fff;font-size:11px;letter-spacing:.12em;text-transform:uppercase;padding:5px 9px}
h2{font-size:34px;text-transform:uppercase;font-weight:500;letter-spacing:.02em}
.sec{padding:44px 60px 22px;display:flex;justify-content:space-between;align-items:end}
.cat{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;padding:0 60px}
.cat div{height:520px;background-size:cover;background-position:center;position:relative;display:flex;align-items:end;padding:26px;color:#fff;font-size:22px;letter-spacing:.08em;text-transform:uppercase}
.cat div:after{content:'';position:absolute;inset:0;background:linear-gradient(transparent 50%,rgba(0,0,0,.5))}.cat span{position:relative;z-index:1}
.pd{display:grid;grid-template-columns:1.1fr 1fr;gap:0;padding:30px 60px}
.thumbs{display:grid;grid-template-columns:90px 1fr;gap:16px}.thumbs .col{display:flex;flex-direction:column;gap:12px}.thumbs .col div{height:110px;background-size:cover;background-position:center;border:1px solid #E5E5E5}.thumbs .col .on{border-color:#111}
.info{padding:20px 0 0 70px}.info h1{font-size:44px;font-weight:500;text-transform:uppercase;letter-spacing:.01em}.price{font-size:26px;margin:14px 0 22px}
.sw{display:flex;gap:10px;margin:14px 0 26px}.sw i{width:34px;height:34px;border-radius:50%;border:1px solid #CCC}.sw .on{outline:2px solid #111;outline-offset:3px}
.acc div{border-top:1px solid #E5E5E5;padding:18px 0;display:flex;justify-content:space-between;font-size:14px;letter-spacing:.1em;text-transform:uppercase}
`
const bg = (n) => `background-image:url('${img(n)}')`
const shNav = `<div class="ann">Free delivery on orders over $80 · 30-day returns</div><nav><div class="links"><a>Shop</a><a>Audio</a><a>Watches</a><a>Journal</a></div><div class="logo">HALDEN</div><div class="r"><a>Search</a><a>Account</a><a>Bag (2)</a></div></nav>`
const prod = (n, name, price, cat, badge) => `<div class="p"><div class="im" style="${bg(n)}">${badge ? `<span class="badge">${badge}</span>` : ''}</div><div class="n"><span>${name}</span><span>${price}</span></div><div class="c">${cat}</div></div>`
write('shop-1', shCss, `${shNav}<div class="hero"><div class="t"><div style="font-size:12px;letter-spacing:.18em;text-transform:uppercase;margin-bottom:22px">New season</div><h1>Objects made to be kept.</h1><p>A small edit of headphones, watches and everyday accessories, chosen for how they look and how long they last.</p><div><a class="btn">Shop the edit</a></div></div><div class="i" style="${bg('hp-white.jpg')}"></div></div><div class="strip"><span>Free delivery over $80</span><span>30-day returns</span><span>2-year warranty</span><span>Secure checkout</span></div>`)
write('shop-2', shCss, `${shNav}<div class="sec"><h2>Bestsellers</h2><a style="font-size:13px;letter-spacing:.14em;text-transform:uppercase;border-bottom:1px solid #111">View all</a></div><div class="grid">${prod('hp-brown.jpg','Aria Wired Headphones','$129','Audio','Bestseller')}${prod('watch.jpg','Field Watch 38mm','$249','Watches','')}${prod('hp-yellow.jpg','Studio Over-ear','$159','Audio','New')}${prod('hp-white.jpg','Cloud Wireless','$189','Audio','')}</div><div class="sec" style="padding-top:44px"><h2>Shop by category</h2></div><div class="cat" style="grid-template-columns:repeat(3,1fr)"><div style="${bg('hp-yellow.jpg')};height:250px"><span>Audio</span></div><div style="${bg('watch.jpg')};height:250px"><span>Watches</span></div><div style="${bg('hp-brown.jpg')};height:250px"><span>Accessories</span></div></div>`)
write('shop-3', shCss, `${shNav}<div class="pd"><div class="thumbs"><div class="col"><div class="on" style="${bg('hp-brown.jpg')}"></div><div style="${bg('hp-white.jpg')}"></div><div style="${bg('hp-yellow.jpg')}"></div><div style="${bg('watch.jpg')}"></div></div><div style="${bg('hp-brown.jpg')};height:690px;background-size:cover;background-position:center"></div></div><div class="info"><div style="font-size:12px;letter-spacing:.14em;color:#777;text-transform:uppercase">Audio / Wired</div><h1 style="margin-top:12px">Aria Wired Headphones</h1><div class="price">$129.00</div><p style="line-height:1.65;color:#444;font-size:16px;max-width:460px">Warm, balanced sound in a folding aluminium and leather frame. Detachable cable, replaceable ear pads.</p><div style="font-size:12px;letter-spacing:.14em;text-transform:uppercase;margin-top:30px">Finish</div><div class="sw"><i class="on" style="background:#9C6B3F"></i><i style="background:#222"></i><i style="background:#D8D2C6"></i></div><a class="btn" style="display:block;text-align:center">Add to bag</a><div class="acc" style="margin-top:34px"><div><span>Details</span><span>+</span></div><div><span>Delivery &amp; returns</span><span>+</span></div><div style="border-bottom:1px solid #E5E5E5"><span>Warranty</span><span>+</span></div></div></div></div>`)
write('shop-4', shCss, `${shNav}<div style="padding:34px 60px;display:grid;grid-template-columns:1.4fr 1fr;gap:70px"><div><h2>Your bag (2)</h2>${[['hp-brown.jpg','Aria Wired Headphones','Copper · 1','$129.00'],['watch.jpg','Field Watch 38mm','Steel · 1','$249.00']].map(x=>`<div style="display:grid;grid-template-columns:130px 1fr auto;gap:22px;padding:26px 0;border-bottom:1px solid #E5E5E5;align-items:center;margin-top:0"><div style="height:130px;${bg(x[0])};background-size:cover;background-position:center"></div><div><div style="font-size:18px">${x[1]}</div><div style="color:#777;font-size:14px;margin-top:6px">${x[2]}</div><div style="margin-top:14px;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#777;text-decoration:underline">Remove</div></div><div style="font-size:18px">${x[3]}</div></div>`).join('')}</div>
<div style="background:#F4F2EE;padding:36px;height:max-content"><h2 style="font-size:24px">Order summary</h2><div style="margin-top:26px;line-height:2.4;font-size:16px"><div style="display:flex;justify-content:space-between"><span>Subtotal</span><span>$378.00</span></div><div style="display:flex;justify-content:space-between"><span>Delivery</span><span>Free</span></div><div style="display:flex;justify-content:space-between;border-top:1px solid #CFCBC3;margin-top:10px;padding-top:10px;font-size:20px"><b>Total</b><b>$378.00</b></div></div><a class="btn" style="display:block;text-align:center;margin-top:24px">Checkout securely</a><p style="margin-top:16px;font-size:13px;color:#666;text-align:center">Taxes calculated at checkout · 30-day returns</p></div></div>`)

/* ------------------------------------------------------------------ */
/* 4. Verra Interiors — small business / studio                        */
/* ------------------------------------------------------------------ */
const stCss = `
body{font-family:'HG';background:#EFEBE4;color:#26221D}
nav{display:flex;justify-content:space-between;align-items:center;padding:30px 70px;position:absolute;left:0;right:0;top:0;z-index:2}
.logo{font-family:'IS';font-size:34px;letter-spacing:.01em}
.links{display:flex;gap:34px;font-size:14px;letter-spacing:.08em;text-transform:uppercase}
.btn{border:1px solid currentColor;padding:12px 24px;font-size:13px;letter-spacing:.1em;text-transform:uppercase}
.solid nav{position:static;background:#EFEBE4}
h1{font-family:'IS';font-weight:400;font-size:120px;line-height:.9;letter-spacing:-.02em}
h2{font-family:'IS';font-weight:400;font-size:64px;line-height:1;letter-spacing:-.01em}
.full{height:900px;background-size:cover;background-position:center;color:#fff;position:relative;display:flex;align-items:flex-end;padding:70px}
.full:before{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(20,15,10,.35),rgba(20,15,10,.1) 40%,rgba(20,15,10,.6))}
.full>*{position:relative}.full>nav{position:absolute}
.cols{display:grid;grid-template-columns:repeat(12,1fr);gap:22px;padding:20px 70px}
.proj{background-size:cover;background-position:center;position:relative;display:flex;align-items:flex-end;padding:22px;color:#fff}
.proj:after{content:'';position:absolute;inset:0;background:linear-gradient(transparent 55%,rgba(20,15,10,.55))}.proj span{position:relative;z-index:1;font-size:14px;letter-spacing:.08em;text-transform:uppercase}
.lbl{font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:#7A6F62}
`
const stNav = `<nav><div class="logo">Verra</div><div class="links"><a>Projects</a><a>Approach</a><a>Studio</a><a>Journal</a></div><a class="btn">Enquire</a></nav>`
write('studio-1', stCss, `<div class="full" style="${bg('living1.jpg')}">${stNav}<div style="display:flex;justify-content:space-between;align-items:flex-end;width:100%"><h1>Rooms that feel<br><i>quietly</i> right.</h1><div style="max-width:340px;font-size:17px;line-height:1.6;padding-bottom:12px">An independent interior design studio for homes and small workplaces.<br><br><a class="btn" style="display:inline-block">View projects</a></div></div></div>`)
write('studio-2', stCss + `body{background:#EFEBE4}`, `<div class="solid">${stNav}<div style="padding:30px 70px 22px;display:flex;justify-content:space-between;align-items:end"><h2>Selected projects</h2><span class="lbl">2022 — Present · Concept examples</span></div><div class="cols" style="grid-template-rows:330px 330px"><div class="proj" style="grid-column:span 7;grid-row:span 2;${bg('living2.jpg')}"><span>Garden House</span></div><div class="proj" style="grid-column:span 5;${bg('living3.jpg')}"><span>Studio Loft</span></div><div class="proj" style="grid-column:span 5;${bg('chair.jpg')}"><span>Reading Room</span></div></div></div>`)
write('studio-3', stCss, `<div class="solid">${stNav}<div class="cols" style="padding-top:40px;align-items:start"><div style="grid-column:span 5;padding-top:30px"><div class="lbl">Approach</div><h2 style="margin-top:18px">Listen first.<br>Then edit.</h2><p style="margin-top:34px;line-height:1.7;font-size:18px;color:#4A4239">We begin with how you live, not with a mood board. Every project moves through three stages, each with a clear outcome and a fixed scope.</p><div style="margin-top:44px">${[['Brief','A site visit and a detailed conversation about routines, light and budget.'],['Concept','Layouts, materials and a considered palette, presented as a single clear proposal.'],['Delivery','Sourcing, supplier coordination and on-site supervision through to styling.']].map((x,i)=>`<div style="display:grid;grid-template-columns:60px 1fr;padding:22px 0;border-top:1px solid #CFC7BB"><span style="font-family:'IS';font-size:28px;color:#8A7A66">0${i+1}</span><div><b style="font-size:19px">${x[0]}</b><p style="margin-top:6px;line-height:1.6;color:#4A4239">${x[1]}</p></div></div>`).join('')}</div></div><div style="grid-column:8/13;height:700px;background-size:cover;background-position:center;${bg('house.jpg')}"></div></div></div>`)
write('studio-4', stCss, `<div class="solid">${stNav}<div class="cols" style="padding-top:50px;align-items:start"><div style="grid-column:span 6"><div class="lbl">Enquiries</div><h2 style="margin-top:18px;font-size:84px">Tell us about<br>your space.</h2><p style="margin-top:34px;line-height:1.7;font-size:18px;color:#4A4239;max-width:460px">We take on a limited number of projects each season. Share a few details and we’ll reply within two working days.</p><div style="margin-top:50px;line-height:2;color:#4A4239">hello@verra-example.com<br>By appointment · Studio open Tue–Fri</div></div><div style="grid-column:8/13;background:#fff;padding:40px">${['Your name','Email address','Project type','Location and approximate size'].map(x=>`<div style="border-bottom:1px solid #CFC7BB;padding:18px 0;color:#8A7F72">${x}</div>`).join('')}<div style="border-bottom:1px solid #CFC7BB;padding:18px 0 90px;color:#8A7F72">Tell us more</div><a class="btn" style="display:inline-block;margin-top:32px;background:#26221D;color:#fff">Send enquiry</a></div></div></div>`)
console.log('generated', fs.readdirSync(outDir).length, 'pages')
