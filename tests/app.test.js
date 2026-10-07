'use strict';
// Ablauftest der App in jsdom: Startseite, Einstufungstest, Training,
// Rechenweg-Feld, Tastatursteuerung, Speicherung.
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const dom = new JSDOM(html, { runScripts: 'dangerously', url: 'http://localhost/', pretendToBeVisual: true });
const w = dom.window;
w.scrollTo = () => {};
w.confirm = () => true;
const errs = [];
w.addEventListener('error', e => errs.push(e.message));

let fail = 0;
const check = (c, msg) => { if (c) console.log('ok:', msg); else { console.log('FEHLER:', msg); fail++; } };
const $ = s => w.document.querySelector(s);
const ev = code => w.eval(code);

w.addEventListener('load', () => {
  // Startseite
  check(/Neu hier\?/.test($('#app').innerHTML), 'Hinweis "Neu hier?" sichtbar');
  check(($('#app').innerHTML.match(/Einstufungstest/g) || []).length >= 3, 'Einstufungstest-Buttons vorhanden');
  check(/Rechenweg-Feld einblenden/.test($('#app').innerHTML), 'Schalter für das Rechenweg-Feld vorhanden');

  // Einstufungstest Statistik
  ev("startPlacement('st')");
  check(ev('sess.mode') === 'test' && ev('sess.queue.length') === 7, 'Test startet mit 7 Aufgaben');
  check(!$('#hbtn') && $('#skipbtn'), 'Test: kein Tipp-Button, aber "Weiß ich nicht"');
  const answer = (ok, work) => {
    const a = ev('sess.q.ans');
    $('#ans').value = ok ? String(a) : String(a + 1000);
    if (work) { $('#workbox').style.display = 'block'; $('#work').value = work; }
    ev('submit()');
  };
  answer(true);                      // st_mean sicher
  answer(false, 'meine Rechnung');   // st_var falsch, Zweitversuch folgt
  check(ev('sess.queue.length') === 8, 'Falsche erste Antwort hängt Zweitversuch an');
  ev('submit(true)');                // st_comb übersprungen
  for (let i = 0; i < 4; i++) answer(true); // bayes, binom, ev, z
  check(ev('sess.queue[sess.i]') === 'st_var', 'Zweitversuch kommt zum Schluss');
  answer(true);
  check(/Ergebnis:/.test($('#app').innerHTML), 'Ergebnisseite erscheint');
  const pl = JSON.parse(ev('JSON.stringify(S.placement.st.res)'));
  check(pl.st_mean === 'known' && pl.st_var === 'partial' && pl.st_comb === 'new' && pl.st_ev === 'known', 'Einstufung known/partial/new korrekt');
  check(ev("st('st_mean').seen && st('st_mean').reps===2") && ev("st('st_var').reps===1") && !ev("st('st_comb').seen"), 'Wiederholungsplan korrekt initialisiert');
  check(/meine Rechnung/.test($('#app').innerHTML), 'Rechenweg wird im Nachlesen angezeigt');

  // Training
  ev('startSession()');
  check(ev('sess.mode') === 'train', 'Session im Trainingsmodus');
  if (/Weiter zur Aufgabe/.test($('#app').innerHTML)) ev('showQuestion(true)');
  check($('#workbox').style.display === 'none', 'Rechenweg-Feld standardmäßig ausgeblendet');
  $('#wchk').checked = true; $('#wchk').dispatchEvent(new w.Event('change'));
  check($('#workbox').style.display === 'block' && ev('S.settings.workField') === true, 'Schalter blendet Feld ein und speichert');
  $('#work').value = 'Zeile1\nZeile2 <b>';
  $('#ans').value = String(ev('sess.q.ans'));
  ev('submit()');
  check(/Richtig\./.test($('#fb').innerHTML), 'Training: richtige Antwort erkannt');
  check(/Dein Rechenweg/.test($('#fb').innerHTML) && /&lt;b&gt;/.test($('#fb').innerHTML), 'Eigener Rechenweg wird maskiert angezeigt');
  ev('next()');
  if (/Weiter zur Aufgabe/.test($('#app').innerHTML)) ev('showQuestion(true)');
  $('#ans').value = String(ev('sess.q.ans'));
  const ta = $('#work');
  ta.dispatchEvent(new w.KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }));
  check(ev('sess.answered') === false, 'Enter im Rechenweg-Feld löst keine Prüfung aus');
  ta.dispatchEvent(new w.KeyboardEvent('keydown', { key: 'Enter', ctrlKey: true, bubbles: true, cancelable: true }));
  check(ev('sess.answered') === true, 'Strg+Enter im Rechenweg-Feld prüft');

  // Speicherung
  const saved = JSON.parse(w.localStorage.getItem('mathe_auffrischen_v1'));
  check(saved.placement.st && saved.settings.workField === true, 'Zustand in localStorage gespeichert');
  check(errs.length === 0, 'Keine JS-Fehler' + (errs.length ? ': ' + errs.join(' | ') : ''));

  console.log(fail ? `FEHLGESCHLAGEN: ${fail}` : 'ALLE APP-TESTS OK');
  process.exit(fail ? 1 : 0);
});
