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
// Alle per innerHTML gesetzten Strings mitschneiden: jsdom repariert unausgewogene Tags
// stillschweigend, deshalb wird die Ausgewogenheit am Quelltext der Templates geprüft.
const captured = [];
const innerDesc = Object.getOwnPropertyDescriptor(w.Element.prototype, 'innerHTML');
Object.defineProperty(w.Element.prototype, 'innerHTML', { configurable: true, get: innerDesc.get, set(v) { captured.push(String(v)); innerDesc.set.call(this, v); } });
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

  // Startseite: Heute-Karte, Wochenrhythmus, Wochenziel, Session-Länge
  const lessonGate = () => { if (/Weiter zur Aufgabe/.test($('#app').innerHTML)) ev('showQuestion(true)'); };
  ev('home()');
  check(!!$('.today') && /Session starten \(10 Aufgaben\)/.test($('.today').innerHTML), 'Startseite: Heute-Karte mit Session-Button');
  check(w.document.querySelectorAll('.week .day').length === 7, 'Wochenstreifen zeigt 7 Tage');
  check(!!$('.week .day.now.on'), 'Heutiger Tag ist nach dem Üben als Lerntag markiert');
  check(ev('S.days.includes(dayKey(Date.now()))') && ev('S.days.length') === 1, 'Lerntag wird genau einmal pro Tag gespeichert');
  ev('setGoal(1)'); check(ev('S.settings.weeklyGoal') === 4, 'Wochenziel lässt sich erhöhen');
  ev('setGoal(-10)'); check(ev('S.settings.weeklyGoal') === 1, 'Wochenziel nicht unter 1');
  ev('setGoal(10)'); check(ev('S.settings.weeklyGoal') === 7, 'Wochenziel nicht über 7');
  ev('setGoal(-4)'); check(ev('S.settings.weeklyGoal') === 3 && /1 von 3 Lerntagen/.test($('.today').textContent), 'Wochenziel-Text nennt Fortschritt');
  ev('setLen(5)'); ev('startSession()');
  check(ev('sess.queue.length') === 5, 'Session-Länge 5 wird übernommen');
  ev('setLen(10)'); ev('home()');
  check(/gefestigt/.test($('.stats').textContent) && /Themen gefestigt/.test($('#app').textContent), 'Kompetenzanzeige je Fachgebiet vorhanden');

  // Hilfe-Stufen, informationsreiches Feedback, Auswertung
  ev('startSession()'); lessonGate();
  check(!!$('#hbtn') && !!$('#ebtn'), 'Training: Tipp- und Beispiel-Button vorhanden');
  ev('showExample()');
  check(ev('sess.help') === 2 && ev('sess.hint') === true, 'Beispiel zählt als zweite Hilfestufe');
  check(/So geht eine ähnliche Aufgabe/.test($('#exbox').innerHTML) && /Ergebnis:/.test($('#exbox').innerHTML) && /Lösungsweg/.test($('#exbox').innerHTML), 'Beispiel zeigt Aufgabe, Lösungsweg und Ergebnis');
  const helpId = ev('sess.queue[sess.i]');
  $('#ans').value = String(ev('sess.q.ans')); ev('submit()');
  check(/Mit Hilfe gelöst/.test($('#fb').innerHTML), 'Richtig mit Hilfe: Hinweis auf frühere Wiederholung');
  check(ev(`st('${helpId}').interval`) === 1 && ev('S.log[S.log.length-1].h') === 2, 'Hilfe verkürzt das Intervall und wird mit Stufe geloggt');
  check(!$('#ebtn') || $('#ebtn').style.display === 'none', 'Beispiel-Button nach der Prüfung verborgen');
  ev('next()'); lessonGate();
  $('#ans').value = String(ev('sess.q.ans')); ev('submit()');
  check(/nächste Wiederholung/.test($('#fb').innerHTML) && !/Mit Hilfe/.test($('#fb').innerHTML), 'Richtig ohne Hilfe: nächste Wiederholung wird genannt');
  ev('next()'); lessonGate();
  const wrongAns = ev('sess.q.ans') + 1000;
  $('#ans').value = String(wrongAns); ev('submit()');
  check(/Typischer Fehler/.test($('#fb').innerHTML) && /Deine Antwort/.test($('#fb').innerHTML) && /Merksatz und Regeln nachschlagen/.test($('#fb').innerHTML), 'Falsch: Gegenüberstellung, typischer Fehler und Regeln');
  ev('sess.i = sess.queue.length'); ev('showQuestion(false)');
  check(/Session beendet/.test($('#app').innerHTML) && /Das hat sich getan/.test($('#app').innerHTML) && /Diese Woche/.test($('#app').innerHTML), 'Auswertung: Statuswechsel und Wochenfortschritt');
  check(w.document.querySelectorAll('.chg').length >= 1, 'Auswertung nennt mindestens einen Themenwechsel');
  ev("startPlacement('la')");
  check(!$('#ebtn') && !$('#hbtn') && !!$('#skipbtn'), 'Einstufungstest bleibt ohne Hilfe');

  // Alter Speicherstand ohne neue Felder bleibt ladbar
  w.localStorage.setItem('mathe_auffrischen_v1', JSON.stringify({ skills: {}, log: [], placement: {}, settings: { topics: ['ana'], workField: false } }));
  const old = JSON.parse(ev('JSON.stringify(loadState())'));
  check(Array.isArray(old.days) && old.days.length === 0 && old.settings.weeklyGoal === 3 && old.settings.sessionLen === 10 && old.settings.topics[0] === 'ana', 'Alter Speicherstand: neue Felder bekommen Standardwerte');
  ev('save()');

  // Speicherung
  const saved = JSON.parse(w.localStorage.getItem('mathe_auffrischen_v1'));
  check(saved.placement.st && saved.settings.workField === true, 'Zustand in localStorage gespeichert');
  const tagList = ['div', 'details', 'summary', 'span', 'button', 'table', 'tr', 'td', 'svg', 'p', 'h1', 'h2', 'label', 'textarea', 'g', 'text'];
  const unbalanced = captured.filter(h => tagList.some(t => (h.match(new RegExp(`<${t}[\\s>]`, 'g')) || []).length !== (h.match(new RegExp(`</${t}>`, 'g')) || []).length));
  check(captured.length > 20 && unbalanced.length === 0, `HTML-Templates sind ausgewogen (${captured.length} Strings geprüft)` + (unbalanced.length ? ': ' + unbalanced[0].slice(0, 160) : ''));
  check(errs.length === 0, 'Keine JS-Fehler' + (errs.length ? ': ' + errs.join(' | ') : ''));

  console.log(fail ? `FEHLGESCHLAGEN: ${fail}` : 'ALLE APP-TESTS OK');
  process.exit(fail ? 1 : 0);
});
