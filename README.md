# Mathe Auffrischung

Eine Lern-App für Erwachsene, die wichtige Mathematik wieder auffrischen wollen: **Analysis**, **Lineare Algebra** und **Statistik & Wahrscheinlichkeit**. Die gesamte App steckt in einer einzigen Datei (`index.html`), läuft lokal im Browser und braucht keinen Server.

## Was die App kann

- **21 Themen in 3 Fachgebieten** mit über 80 Aufgabentypen. Alle Aufgaben werden mit zufälligen Zahlen erzeugt, jede Aufgabe hat einen Tipp und einen Lösungsweg.
  - Analysis: Potenz-, Ketten-, Produkt- und Quotientenregel, Integrale, Extremwerte, Grenzwerte, Exponentialgleichungen
  - Lineare Algebra: Skalarprodukt, Vektorlänge, Determinanten (2×2, 3×3), Matrixprodukt, Gleichungssysteme, Eigenwerte
  - Statistik: Mittelwert und Median, Varianz, Kombinatorik, Bayes, Binomialverteilung, Erwartungswert, Normalverteilung
- **Einstufungstest pro Fachgebiet:** eine Aufgabe je Thema ohne Feedback, bei falscher Antwort ein Zweitversuch mit neuer Aufgabe. Das Ergebnis (sicher, mit Lücken, neu) steuert den Wiederholungsplan.
- **Training in Sessions** zu 10 gemischten Aufgaben. Fällige Themen kommen zuerst, dazu ein bis drei neue.
- **Wiederholungsplan** mit wachsenden Abständen (vereinfacht an den SM-2-Algorithmus angelehnt).
- **Lektionen** mit fester Struktur: Merksatz, Nutzen, Kernidee, Merkkasten, Beispiel zum schrittweisen Aufdecken, typischer Fehler und eine Mini-Aufgabe, die nicht in den Wiederholungsplan eingeht.
- **Optionales Rechenweg-Feld** für den Fall, dass kein Stift und Papier zur Hand ist. Der Rechenweg wird nach dem Prüfen neben dem Lösungsweg angezeigt, aber nicht bewertet.
- **Fortschritt** wird im Browser gespeichert (`localStorage`) und lässt sich als JSON exportieren und importieren.

## Benutzung

`index.html` im Browser öffnen, fertig.

- Die Formeln werden mit [KaTeX](https://katex.org) dargestellt, das beim Laden von jsDelivr geholt wird. Ohne Internetverbindung erscheint der Formel-Quelltext statt der Formeln.
- Der Fortschritt liegt pro Browser **und pro Adresse**. Eine lokal geöffnete Datei (`file://`) und eine Veröffentlichung auf GitHub Pages haben getrennte Speicher. Wer wechselt, nimmt den Fortschritt per Export und Import mit.
- Veröffentlichen mit GitHub Pages: im Repository unter *Settings → Pages* den Branch `main` und den Ordner `/ (root)` wählen.

## Lernprinzipien und Quellenlage

Die App setzt Prinzipien um, die in der Lernforschung gut untersucht sind. Die Einordnung der Quellen ist bewusst nüchtern gehalten.

| Prinzip | Umsetzung in der App | Quelle | Einordnung der Evidenz |
|---|---|---|---|
| Abrufübung | Aufgaben statt Wiederlesen, Einstufungstest ohne Feedback | Roediger & Karpicke (2006), *Psychological Science*; Dunlosky et al. (2013), *Psychological Science in the Public Interest* | Peer-Review-Experimente und eine breite Übersichtsarbeit. Die Studien arbeiten oft mit Studierenden und Textmaterial, die Übertragung auf Mathematik ist plausibel, aber nicht in jeder Studie direkt geprüft. |
| Verteiltes Wiederholen | Wiederholungsplan mit wachsenden Abständen | Cepeda et al. (2006), *Psychological Bulletin* | Meta-Analyse von Laborstudien. Die günstigsten Abstände hängen davon ab, wie lange etwas behalten werden soll; die Intervalle der App sind eine Heuristik und nicht empirisch kalibriert. |
| Durchmischtes Üben (Interleaving) | Sessions mischen Themen, gleiche Themen folgen möglichst nicht direkt aufeinander | Rohrer, Dedrick, Hartwig & Cheung (2020), *Journal of Educational Psychology* | Randomisierte Studie im Klassenraum mit Schülerinnen und Schülern. Für Erwachsene nicht gesondert belegt. |
| Ausgearbeitete Beispiele | Beispiel zum schrittweisen Aufdecken (vorher selbst rechnen), danach Mini-Aufgabe | Sweller, Ayres & Kalyuga (2011), *Cognitive Load Theory* (Springer); Kalyuga et al. (2003), *Educational Psychologist* | Theorieüberblick und Experimente. Bei Fortgeschrittenen kehrt sich der Effekt um (Expertise-Reversal-Effekt), deshalb soll man vor dem Aufdecken selbst rechnen. |
| Gamification | bewusst sparsam: keine Punkte, keine Streaks | Sailer & Homner (2020), *Educational Psychology Review* | Meta-Analyse mit kleinen bis mittleren Effekten bei großer Streuung. Mehr Nutzung bedeutet nicht automatisch mehr Lernen. |

**Grenzen:** Die App selbst wurde nicht in einer Studie evaluiert, ob sie beim Lernen tatsächlich hilft, lässt sich nur durch Erproben beantworten (Statistik pro Thema, Vor- und Nachtest). Der Einstufungstest ist mit ein bis zwei Aufgaben je Thema eine grobe Einschätzung und kein validiertes Testverfahren.

## Entwicklung

```
index.html          komplette App (HTML, CSS, JavaScript)
tests/              automatische Tests (Node.js, jsdom, KaTeX)
package.json        Abhängigkeiten nur für die Tests
```

Aufbau von `index.html`:

- **Generatorblock** zwischen `// ==GEN-START==` und `// ==GEN-END==`: Hilfsfunktionen, die Basisaufgabe jedes Themas (`GEN.<id>`), Zusatzvarianten (`X.<id>`, eine Liste von Funktionen) und die Themenliste `SKILLS`.
- **App-Teil:** Zustand und Speicherung (Schlüssel `mathe_auffrischen_v1`), Einstufungstest, Sessions, Wiederholungsplan und die Lektionsansicht (`LES`).

Eine Aufgabe erzeugt `mk(frage, antwort, nachkommastellen, [lösungsschritte], tipp)`. Fragen und Schritte sind HTML mit KaTeX-Formeln (`$...$` und `$$...$$`).

**Neues Thema ergänzen:**

1. Generator `GEN.mein_thema = () => mk(...)` schreiben (optional Varianten in `X.mein_thema = [...]`).
2. Eintrag in der Liste `SKILLS` ergänzen (`[id, fachgebiet, titel]`).
3. Lektion in `LES` ergänzen.
4. `npm test` ausführen.

Ein neues **Fachgebiet** braucht zusätzlich einen Eintrag in `TOPICS` und eine CSS-Klasse `tc-<kürzel>` für die Farbe.

### Tests

```
npm install
npm test
```

- `tests/generators.test.js`: erzeugt jede Aufgabenvariante tausendfach und prüft Struktur und Formeltext (endliche Antwort, keine kaputten Platzhalter, Tipp und Lösungsweg vorhanden).
- `tests/app.test.js`: spielt Startseite, Einstufungstest, Training, Rechenweg-Feld und Tastatursteuerung in jsdom durch.
- `tests/lessons.test.js`: bedient alle Lektionen und prüft sämtliche Formeln aus Lektionen und Aufgaben mit KaTeX auf Syntaxfehler.

Die Tests prüfen Struktur und Ablauf. Die mathematische Richtigkeit jeder einzelnen Aufgabe wird nicht unabhängig nachgerechnet, dafür gibt es in einigen Generatoren eingebaute Konsistenzprüfungen. Getestet wird automatisiert in jsdom, nicht in echten Browsern.

## Lizenz

Noch keine Lizenz festgelegt. Ohne Lizenzdatei gelten die gesetzlichen Urheberrechte, andere dürfen den Code also nicht ohne Weiteres weiterverwenden.
