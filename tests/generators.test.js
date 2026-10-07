'use strict';
// Stresstest aller Aufgabengeneratoren: Jede Aufgabenvariante wird oft erzeugt
// und auf strukturelle Gültigkeit geprüft (endliche Antwort, keine kaputten
// Platzhalter, ausgewogene $-Zeichen, keine TeX-Befehle im Fließtext, Tipp und
// Lösungsweg vorhanden). Die mathematische Richtigkeit jeder Antwort wird hier
// NICHT unabhängig nachgerechnet; Konsistenzprüfungen stecken in den Generatoren.
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const m = html.match(/\/\/ ==GEN-START==([\s\S]*?)\/\/ ==GEN-END==/);
if (!m) { console.error('GEN-Block in index.html nicht gefunden'); process.exit(1); }
const mod = { exports: {} };
new Function('module', m[1] + '\nmodule.exports={SKILLS,X};')(mod);
const { SKILLS, X } = mod.exports;
const RUNS = Number(process.env.RUNS) || 2000;

const outsideMath = s => s.replace(/\$\$[\s\S]*?\$\$/g, ' ').replace(/\$[^$]*\$/g, ' ');
function lint(q) {
  const all = q.q + ' ' + q.steps.join(' ');
  if (!Number.isFinite(q.ans) || Math.abs(q.ans) > 5000) return 'Antwort ungültig oder zu groß: ' + q.ans;
  if (!Number.isFinite(q.tol)) return 'Toleranz ungültig';
  if (/undefined|NaN|Infinity|\[object/.test(all)) return 'Platzhalter im Text';
  if ((all.match(/\$/g) || []).length % 2) return 'ungerade Anzahl $-Zeichen';
  if (/\{,\}|\\[a-z]+/.test(outsideMath(q.q))) return 'TeX außerhalb von Formeln: ' + outsideMath(q.q).slice(0, 100);
  if (/\+\s*-|--|\(\s*\)/.test(q.q.replace(/<[^>]+>/g, ''))) return 'Vorzeichen-Glitch';
  if (!q.hint || !q.steps.length) return 'Tipp oder Lösungsweg fehlt';
  return null;
}

let problems = 0, total = 0;
for (const s of SKILLS) {
  if (!s.lesson) { console.log('FEHLER: kein Lektionstext für', s.id); problems++; }
  const variants = X[s.id] || [];
  variants.forEach((f, vi) => {
    for (let i = 0; i < RUNS; i++) {
      let q;
      try { q = f(); } catch (e) { console.log('FEHLER: Exception', s.id, 'Variante', vi, e.message); problems++; return; }
      total++;
      const r = lint(q);
      if (r) { console.log('FEHLER:', s.id, 'Variante', vi, r); problems++; return; }
    }
  });
  for (let i = 0; i < RUNS; i++) {
    const q = s.gen(); total++;
    const r = lint(q);
    if (r) { console.log('FEHLER (Gesamtgenerator):', s.id, r); problems++; break; }
  }
}
const nv = Object.values(X).reduce((a, v) => a + v.length, 0);
console.log(`Themen: ${SKILLS.length} | Zusatzvarianten: ${nv} | geprüfte Aufgaben: ${total} | Probleme: ${problems}`);
process.exit(problems ? 1 : 0);
