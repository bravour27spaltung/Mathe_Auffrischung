# Mathe Auffrischung

Eine Lern-App für Erwachsene, die wichtige Mathematik wieder auffrischen wollen: **Analysis**, **Lineare Algebra** und **Statistik & Wahrscheinlichkeit**. Die gesamte App steckt in einer einzigen Datei (`index.html`), läuft lokal im Browser und braucht keinen Server.

## Was die App kann

- **21 Themen in 3 Fachgebieten** mit über 80 Aufgabentypen. Alle Aufgaben werden mit zufälligen Zahlen erzeugt, jede Aufgabe hat einen Tipp und einen Lösungsweg.
  - Analysis: Potenz-, Ketten-, Produkt- und Quotientenregel, Integrale, Extremwerte, Grenzwerte, Exponentialgleichungen
  - Lineare Algebra: Skalarprodukt, Vektorlänge, Determinanten (2×2, 3×3), Matrixprodukt, Gleichungssysteme, Eigenwerte
  - Statistik: Mittelwert und Median, Varianz, Kombinatorik, Bayes, Binomialverteilung, Erwartungswert, Normalverteilung
- **Einstufungstest pro Fachgebiet:** eine Aufgabe je Thema ohne Feedback, bei falscher Antwort ein Zweitversuch mit neuer Aufgabe. Das Ergebnis (sicher, mit Lücken, neu) steuert den Wiederholungsplan.
- **Heute-Karte:** zeigt, was dran ist (fällige Wiederholungen, neue Themen), und startet die Session. Die Länge ist wählbar (5, 10 oder 15 Aufgaben).
- **Wochenrhythmus statt Streak:** Ein frei wählbares Wochenziel (1 bis 7 Lerntage) und ein Wochenstreifen zeigen, an welchen Tagen du gelernt hast. Ein verpasster Tag setzt nichts zurück.
- **Training in Sessions** mit gemischten Aufgaben. Fällige Themen kommen zuerst, dazu ein bis drei neue.
- **Abgestufte Hilfe:** erst der Tipp, dann „Ähnliches Beispiel" (eine vorgerechnete Aufgabe desselben Typs, die deine eigene Antwort nicht verrät). Mit Hilfe gelöste Aufgaben kommen am nächsten Tag wieder.
- **Rückmeldung mit Information:** Bei einem Fehler siehst du deine Antwort neben der richtigen, den typischen Fehler des Themas und (aufklappbar) Merksatz und Regeln. Bei richtigen Antworten steht, wann das Thema wiederkommt.
- **Auswertung mit Substanz:** Nach jeder Session zeigt die App, welche Themen ihren Status gewechselt haben (Neu, Lernend, Gefestigt), dazu den Wochenfortschritt. Je Fachgebiet gibt es eine Fortschrittsanzeige.
- **Wiederholungsplan** mit wachsenden Abständen (vereinfacht an den SM-2-Algorithmus angelehnt).
- **Lektionen** mit fester Struktur: Merksatz, Nutzen, Kernidee, Merkkasten, Beispiel zum schrittweisen Aufdecken, typischer Fehler und eine Mini-Aufgabe, die nicht in den Wiederholungsplan eingeht. Acht Lektionen haben zusätzlich eine beschriftete Grafik (Tangente, Fläche, Extrema, Vektorlänge, Determinante, Skalarprodukt, z-Wert, Binomialverteilung).
- **Optionales Rechenweg-Feld** für den Fall, dass kein Stift und Papier zur Hand ist. Der Rechenweg wird nach dem Prüfen neben dem Lösungsweg angezeigt, aber nicht bewertet.
- **Fortschritt** (Lernstand, Lerntage, Einstellungen) wird im Browser gespeichert (`localStorage`) und lässt sich als JSON exportieren und importieren. Ältere Exporte ohne Lerntage lassen sich weiter importieren.

## Benutzung

`index.html` im Browser öffnen, fertig.

- Die Formeln werden mit [KaTeX](https://katex.org) dargestellt, das beim Laden von jsDelivr geholt wird. Ohne Internetverbindung erscheint der Formel-Quelltext statt der Formeln.
- Der Fortschritt liegt pro Browser **und pro Adresse**. Eine lokal geöffnete Datei (`file://`) und eine Veröffentlichung auf GitHub Pages haben getrennte Speicher. Wer wechselt, nimmt den Fortschritt per Export und Import mit.
- Veröffentlichen mit GitHub Pages: im Repository unter *Settings → Pages* den Branch `main` und den Ordner `/ (root)` wählen.

## Lernprinzipien und Quellenlage

Die App setzt Prinzipien um, die in der Lernforschung gut untersucht sind. Die Einordnung ist bewusst nüchtern. Die ausführliche Recherche mit Qualitätsstufen, Zahlen, Grenzen und den bewusst verworfenen Mechaniken steht in [`docs/LERNMECHANIKEN.md`](docs/LERNMECHANIKEN.md). „Stufe A“ heißt: peer-reviewte Meta-Analyse oder Übersicht über Reviews.

| Prinzip | Umsetzung in der App | Quelle (Stufe) | Einordnung der Evidenz |
|---|---|---|---|
| Abrufübung mit Feedback | Aufgaben statt Wiederlesen, Lösungsweg nach jeder Antwort, Einstufungstest ohne Feedback als Messung | Rowland (2014) und Yang et al. (2021), beide *Psychological Bulletin* (A) | g ≈ 0,50 in beiden; mit Feedback größer (0,73 gegen 0,39). Rowland: nur Laborstudien, Publikationsverzerrung, hohe Heterogenität. Meist Gedächtnis- und Textmaterial bei Studierenden, die Übertragung auf Rechenverfahren ist plausibel, aber nicht direkt belegt. |
| Verteiltes Wiederholen | Wiederholungsplan, Hilfe verkürzt das Intervall | Latimier, Peyre & Ramus (2021), *Educational Psychology Review* (A); Cepeda et al. (2006), *Psychological Bulletin* (A, nicht neu geprüft) | Verteilt gegen gehäuft g = 0,74. **Wachsende Abstände waren nicht besser als gleichmäßige (g = 0,03).** Die Intervalle der App sind eine Heuristik und nicht empirisch kalibriert. |
| Durchmischtes Üben (Interleaving) | Sessions mischen Themen, gleiche Themen folgen möglichst nicht direkt aufeinander | Brunmair & Richter (2019), *Psychological Bulletin* (A); Rohrer, Dedrick, Hartwig & Cheung (2020), *Journal of Educational Psychology* (B, nicht neu geprüft) | g = 0,42 gesamt, Mathematikaufgaben 0,34. Schwächer bei Älteren und nicht mehr signifikant, wenn zwischen den Aufgaben zeitlicher Abstand lag. Von Erwachsenen mit Wiederholungsplan ist kein großer Zusatzeffekt zu erwarten. |
| Informationsreiches Feedback | Bei Fehlern: eigene Antwort neben richtiger, typischer Fehler, Regeln zum Nachschlagen; kein Lob-Feuerwerk | Wisniewski, Zierer & Hattie (2020), *Frontiers in Psychology* (A) | d = 0,99 für Feedback mit Aufgaben-, Vorgehens- und Selbststeuerungsinformation, d = 0,24 für Verstärkung oder Bestrafung. Stark heterogen (I² = 83 %), Hinweis auf Publikationsverzerrung: Zahlen als Obergrenze lesen. |
| Vorgerechnete Beispiele und abgestufte Hilfe | Beispiel zum schrittweisen Aufdecken (vorher selbst rechnen); im Training Tipp, dann „Ähnliches Beispiel“ | Barbieri et al. (2023), *Educational Psychology Review* (A); Kulik & Fletcher (2016), *Review of Educational Research* (A); Sweller, Ayres & Kalyuga (2011), *Cognitive Load Theory* (Springer); Kalyuga et al. (2003), *Educational Psychologist* | Beispiele wirken in Mathematik mittelstark; richtige Beispiele besser als fehlerhafte, Selbsterklärungs-Aufforderungen schadeten eher und fehlen deshalb. Tutorsysteme: Median 0,66 Standardabweichungen, stark abhängig vom Testtyp; die App ist kein Tutorsystem. Bei Fortgeschrittenen kehrt sich der Beispieleffekt um (Expertise-Reversal-Effekt), deshalb soll man vor dem Aufdecken selbst rechnen. |
| Veranschaulichung | Beschriftete Grafik in acht Lektionen | Noetel et al. (2022), *Review of Educational Research* (A, Übersicht über 29 Reviews) | Räumliche Nähe und Signalisierung wirksam; bei selbstgesteuertem Lernen ist der Zusatznutzen guten Designs kleiner als bei vorgegebenem Tempo. |
| Motivation und Gewohnheit | Heute-Karte, wählbares Wochenziel und Session-Länge, Fortschritt je Fachgebiet, Statuswechsel nach der Session, kein Streak | Patzak & Zhang (2025), *Educational Psychology Review* (A, indirekt); Lally et al. (2010), *European Journal of Social Psychology* (nur über Pressetext gelesen, C) | Indirekte Evidenz aus Schulklassen, stark heterogen; Gewohnheitsstudie klein und ohne Lernmessung. Das sind begründete Gestaltungsentscheidungen, **keine belegten Lerngewinne**. |
| Gamification | bewusst sparsam: keine Punkte, Abzeichen, Ranglisten, Streaks | Sailer & Homner (2020), *Educational Psychology Review* (A) | g = 0,25 bis 0,49 bei großer Streuung; in Studien mit strengem Design waren die motivationalen und Verhaltenseffekte nicht mehr signifikant. Mehr Nutzung bedeutet nicht automatisch mehr Lernen. |

**Grenzen:** Die Zahlen stammen aus den Zusammenfassungen der Originalarbeiten, nicht aus den Volltexten. Einige Quellen waren bei der Recherche nicht erreichbar (siehe `docs/LERNMECHANIKEN.md`). Die App selbst wurde nicht in einer Studie evaluiert; ob sie beim Lernen tatsächlich hilft, lässt sich nur durch Erproben beantworten (Statistik pro Thema, Vor- und Nachtest). Der Einstufungstest ist mit ein bis zwei Aufgaben je Thema eine grobe Einschätzung und kein validiertes Testverfahren.

## Entwicklung

```
index.html          komplette App (HTML, CSS, JavaScript)
tests/              automatische Tests (Node.js, jsdom, KaTeX)
package.json        Abhängigkeiten nur für die Tests
```

Aufbau von `index.html`:

- **Generatorblock** zwischen `// ==GEN-START==` und `// ==GEN-END==`: Hilfsfunktionen, die Basisaufgabe jedes Themas (`GEN.<id>`), Zusatzvarianten (`X.<id>`, eine Liste von Funktionen) und die Themenliste `SKILLS`.
- **App-Teil:** Zustand und Speicherung (Schlüssel `mathe_auffrischen_v1`, dazu Lerntage in `days`), Startseite mit Wochenrhythmus, Einstufungstest, Sessions mit Hilfestufen, Wiederholungsplan, die Lektionsansicht (`LES`) und die Grafiken (`VIZ`, eine Funktion je Thema, die ein inline-SVG liefert).

Eine Aufgabe erzeugt `mk(frage, antwort, nachkommastellen, [lösungsschritte], tipp)`. Fragen und Schritte sind HTML mit KaTeX-Formeln (`$...$` und `$$...$$`).

**Neues Thema ergänzen:**

1. Generator `GEN.mein_thema = () => mk(...)` schreiben (optional Varianten in `X.mein_thema = [...]`).
2. Eintrag in der Liste `SKILLS` ergänzen (`[id, fachgebiet, titel]`).
3. Lektion in `LES` ergänzen.
4. `npm test` ausführen.

Optional ergänzt man eine Grafik in `VIZ.<id> = { svg(), cap }`. Das SVG nutzt nur die Farbvariablen des Themas (`var(--tc)`, `var(--tcbg)`, `var(--new)`, `var(--muted)`), beschriftet direkt im Bild, hat `role="img"` mit `aria-label` und escapet `<`, `>` und `&` im Text.

Ein neues **Fachgebiet** braucht zusätzlich einen Eintrag in `TOPICS` und eine CSS-Klasse `tc-<kürzel>` für die Farbe.

### Tests

```
npm install
npm test
```

- `tests/generators.test.js`: erzeugt jede Aufgabenvariante tausendfach und prüft Struktur und Formeltext (endliche Antwort, keine kaputten Platzhalter, Tipp und Lösungsweg vorhanden).
- `tests/app.test.js`: spielt Startseite (Heute-Karte, Wochenstreifen, Wochenziel, Session-Länge), Einstufungstest, Training mit Hilfestufen und Feedback, Auswertung, Rechenweg-Feld, Tastatursteuerung und das Laden alter Speicherstände in jsdom durch.
- `tests/lessons.test.js`: bedient alle Lektionen und prüft sämtliche Formeln aus Lektionen und Aufgaben mit KaTeX auf Syntaxfehler. Die Grafiken werden auf wohlgeformtes XML, gültige Zahlen und Textalternativen geprüft.

Die Tests prüfen Struktur und Ablauf. Die mathematische Richtigkeit jeder einzelnen Aufgabe wird nicht unabhängig nachgerechnet, dafür gibt es in einigen Generatoren eingebaute Konsistenzprüfungen. Getestet wird automatisiert in jsdom, nicht in echten Browsern.

## Lizenz

Noch keine Lizenz festgelegt. Ohne Lizenzdatei gelten die gesetzlichen Urheberrechte, andere dürfen den Code also nicht ohne Weiteres weiterverwenden.
