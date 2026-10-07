'use strict';
// Lektionen und Formeln: Alle Lektionen werden gerendert und bedient
// (Schritte aufdecken, Mini-Aufgabe, Enter). Sämtliche LaTeX-Formeln aus
// Lektionen und Aufgabengeneratoren werden mit KaTeX auf Syntaxfehler geprüft.
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const katex = require('katex');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const dom = new JSDOM(html, { runScripts: 'dangerously', url: 'http://localhost/', pretendToBeVisual: true });
const w = dom.window;
w.scrollTo = () => {};
const errs = [];
w.addEventListener('error', e => errs.push(e.message));
const GEN_RUNS = Number(process.env.RUNS) || 300;

let fail = 0;
const check = (c, msg) => { if (!c) { console.log('FEHLER:', msg); fail++; } };

const mathOf = s => {
  const out = [];
  const rest = s.replace(/\$\$([\s\S]*?)\$\$/g, (_, m) => { out.push([m, true]); return ' '; });
  rest.replace(/\$([^$]+?)\$/g, (_, m) => { out.push([m, false]); return ' '; });
  return out;
};
const seen = new Set();
let nMath = 0;
function kcheck(s, where) {
  if ((s.match(/\$/g) || []).length % 2) { console.log('FEHLER: ungerade $-Anzahl in', where, s.slice(0, 80)); fail++; return; }
  for (const [m, display] of mathOf(s)) {
    nMath++;
    try { katex.renderToString(m, { throwOnError: true, strict: 'ignore', displayMode: display }); }
    catch (e) {
      const key = where + ' :: ' + m.slice(0, 90);
      if (!seen.has(key)) { seen.add(key); console.log('FEHLER: KaTeX', key, '|', e.message.slice(0, 80)); fail++; }
    }
  }
}

w.addEventListener('load', () => {
  const ids = w.eval('SKILLS.map(s=>s.id)');
  const LES = w.eval('LES');
  check(ids.every(id => LES[id]), 'Jedes Thema hat eine Lektion');

  for (const id of ids) {
    const d = LES[id];
    [d.memo, d.hook, d.idea, d.pitfall, d.ex.task, ...d.ex.steps, ...d.rules.flat(), ...d.more.flat()]
      .forEach((t, i) => kcheck(String(t), `LES ${id}#${i}`));

    w.eval(`showLesson('${id}', false)`);
    const app = w.document.getElementById('app');
    const n = d.ex.steps.length;
    check(app.querySelectorAll('.lstep').length === n, id + ': Schritte vorhanden');
    check([...app.querySelectorAll('.lstep')].every(e => e.style.display === 'none'), id + ': Schritte anfangs verborgen');
    w.eval('revealStep()');
    check(app.querySelectorAll('.lstep')[0].style.display === 'flex', id + ': erster Schritt sichtbar');
    w.eval('revealAll()');
    check(w.document.getElementById('stbtn').style.display === 'none', id + ': alle Schritte aufgedeckt');

    w.document.getElementById('mans').value = String(w.eval('lq.ans') + 777);
    w.eval('miniCheck()');
    check(/class="fb bad"/.test(w.document.getElementById('mfb').innerHTML), id + ': falsche Mini-Antwort erkannt');
    w.eval('newMini()');
    const inp = w.document.getElementById('mans');
    inp.value = String(w.eval('lq.ans'));
    inp.dispatchEvent(new w.KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }));
    check(/class="fb ok"/.test(w.document.getElementById('mfb').innerHTML), id + ': Enter prüft, richtige Antwort erkannt');
    check(w.eval(`S.skills["${id}"]`) === undefined, id + ': Mini-Aufgabe ändert den Lernstand nicht');

    w.eval(`showLesson('${id}', true)`);
    check(/Weiter zur Aufgabe/.test(app.innerHTML), id + ': Button in der Session');
  }

  // Veranschaulichungen: gültiges XML, keine NaN-Koordinaten, nur in Lektionen mit Grafik
  const vizIds = w.eval('Object.keys(VIZ)');
  check(vizIds.length >= 8 && vizIds.every(id => ids.includes(id)), 'Veranschaulichungen gehören zu existierenden Themen');
  for (const id of ids) {
    w.eval(`showLesson('${id}', false)`);
    const has = !!w.document.querySelector('.viz svg');
    check(has === vizIds.includes(id), id + ': Grafik nur in Lektionen mit VIZ-Eintrag');
  }
  for (const id of vizIds) {
    const svg = w.eval(`VIZ['${id}'].svg()`);
    check(!/NaN|undefined|Infinity/.test(svg), id + ': Grafik ohne ungültige Zahlen');
    const doc = new w.DOMParser().parseFromString(svg, 'image/svg+xml');
    check(!doc.querySelector('parsererror'), id + ': Grafik ist wohlgeformtes XML');
    check(/role="img"/.test(svg) && /aria-label="[^"]{10,}"/.test(svg), id + ': Grafik hat Textalternative');
    check(!/\$/.test(w.eval(`VIZ['${id}'].cap`)), id + ': Bildunterschrift ohne TeX');
  }

  for (const id of ids) {
    for (let i = 0; i < GEN_RUNS; i++) {
      const q = w.eval(`SKILLS.find(s=>s.id==='${id}').gen()`);
      kcheck(q.q, `GEN ${id} q`);
      q.steps.forEach((t, j) => kcheck(t, `GEN ${id} step${j}`));
      kcheck(q.hint, `GEN ${id} hint`);
    }
  }

  check(errs.length === 0, 'Keine JS-Fehler' + (errs.length ? ': ' + errs.slice(0, 3).join(' | ') : ''));
  console.log(`Formeln geprüft: ${nMath} | Fehler: ${fail}`);
  process.exit(fail ? 1 : 0);
});
