# Lernmechaniken: Recherche und Entscheidungen

Stand: 7. Oktober 2026. Dieses Dokument hält fest, welche Lernmechaniken recherchiert wurden, wie belastbar die Belege sind und was davon (und warum) in die App eingebaut wurde oder nicht.

## Fragestellung und Vorgehen

**Frage:** Welche Lernmechaniken haben die beste Evidenz, und welche davon passen zu einer lokalen Ein-Datei-App, mit der Erwachsene Analysis, Lineare Algebra und Statistik wiederholen?

**Vorgehen:** Gesucht wurde zuerst nach Meta-Analysen und Übersichtsarbeiten, Einzelstudien nur zur Klärung von Streitpunkten. Gelesen wurden die Zusammenfassungen (Abstracts bzw. Verlagsseiten) der Originalquellen. **Die Zahlen unten stammen aus diesen Zusammenfassungen und wurden nicht gegen die Volltexte geprüft.**

**Qualitätsraster für Quellen:**

| Stufe | Quelle | Umgang |
|---|---|---|
| A | Peer-Review-Meta-Analyse oder Übersicht über Reviews | Grundlage für Entscheidungen, aber Heterogenität, Publikationsverzerrung und Übertragbarkeit (Stichprobe, Material, Messung) werden mitgenannt |
| B | Peer-Review-Einzelstudie | Nur zur Klärung offener Fragen oder als Gegenbeleg |
| C | Pressetext, Hochschulmeldung, Fachblog zu einer A/B-Quelle | Nur zur Orientierung, wenn die Primärquelle nicht erreichbar war; als solche gekennzeichnet |
| D | Wiki, Werbe- oder Ratgeberseiten | nicht verwendet |

Ein Effekt ist nicht schon deshalb belastbar, weil er in einer Meta-Analyse steht: Viele der Zahlen stammen aus Laborstudien mit Studierenden und Wortlisten oder Texten, nicht aus Rechenverfahren bei Erwachsenen.

## Ergebnis auf einen Blick

| Mechanik | Beste Evidenz (Stufe) | Kernzahl | Übertragbarkeit auf diese App | Entscheidung |
|---|---|---|---|---|
| Abrufübung mit Feedback | Rowland 2014, Yang et al. 2021 (A) | g ≈ 0,50 | gut, Rechenaufgaben mit sofortigem Feedback | war schon da, **Feedback verstärkt** |
| Zeitlich verteiltes Wiederholen | Latimier et al. 2021 (A) | verteilt vs. gehäuft g = 0,74 | gut | war schon da, **Doku korrigiert** (wachsende Abstände nicht nachweislich besser) |
| Durchmischtes Üben | Brunmair & Richter 2019 (A) | g = 0,42 gesamt, Mathematik g = 0,34 | mäßig, Effekt sinkt mit dem Alter | bleibt, **Erwartung gedämpft** |
| Informationsreiches Feedback | Wisniewski et al. 2020 (A) | d = 0,99 vs. 0,24 (Lob/Verstärkung) | gut | **neu: typischer Fehler, Gegenüberstellung, Regeln** |
| Vorgerechnete Beispiele, abgestufte Hilfe | Barbieri et al. 2023, Kulik & Fletcher 2016 (A) | g = 0,48 bzw. Median 0,66 SD | gut für Beispiele, Tutor-Evidenz nur indirekt | **neu: Hilfestufe „Ähnliches Beispiel"** |
| Veranschaulichungen | Noetel et al. 2022 (A, Übersicht) | 11 Prinzipien mit Effekt | mäßig, bei Selbstlernen kleiner | **neu: 8 beschriftete Grafiken** |
| Autonomie, Struktur, Rhythmus | Patzak & Zhang 2025 (A, indirekt), Lally et al. 2010 (C) | r = 0,53 zwischen Autonomieunterstützung und Struktur | indirekt (Schulklassen) | **neu: Wochenrhythmus, Wahlfreiheit, Kompetenz-Rückmeldung** |
| Punkte, Abzeichen, Ranglisten, Streaks | Sailer & Homner 2020 (A) | g = 0,25 bis 0,49, in strengen Studien instabil | unklar | **bewusst nicht** |

## Details

### 1. Abrufübung mit Feedback

- **Rowland (2014), *Psychological Bulletin*:** 61 Studien, 159 Effektstärken, Testen gegen Wiederlesen g = 0,50. Mit Feedback g = 0,73, ohne Feedback g = 0,39. Ohne Feedback war der Effekt bei höchstens 50 % richtigen Antworten praktisch null (g = 0,03) und bei über 75 % deutlich (g = 0,56). Grenzen: nur Laborstudien, Publikationsverzerrung (veröffentlichte g = 0,58, unveröffentlichte g = 0,25), hohe Heterogenität (I² ≈ 84 %).
- **Yang, Luo, Vadillo, Yu & Shanks (2021), *Psychological Bulletin*:** 222 Studien im Unterricht, 48 478 Lernende, g = 0,50. Moderatoren u. a. korrigierendes Feedback und Zahl der Wiederholungen.
- **Folgerung:** Jede Aufgabe bekommt Feedback; Hilfestufen sorgen dafür, dass Abrufe häufiger gelingen. Der Einstufungstest ist bewusst eine Messung ohne Feedback und kein Lernmodus.

### 2. Zeitlich verteiltes Wiederholen

- **Latimier, Peyre & Ramus (2021), *Educational Psychology Review*:** 29 Studien, 93 Effektstärken. Verteiltes gegen gehäuftes Abrufen g = 0,74. **Wachsende gegen gleichmäßige Abstände g = 0,03, kein Unterschied.** Mit mehr Abrufen wird die wachsende Variante etwas günstiger.
- **Folgerung:** Wichtig ist das Verteilen, nicht die genaue Form der Abstände. Die Intervalle der App (1 Tag, 3 Tage, dann wachsend) sind eine Heuristik; ihr Vorteil gegenüber festen Abständen ist nicht belegt. Deshalb wurde der Algorithmus nicht aufwendiger gemacht.

### 3. Durchmischtes Üben

- **Brunmair & Richter (2019), *Psychological Bulletin*:** 59 Studien, 238 Effektstärken, g = 0,42; Mathematikaufgaben g = 0,34; Wörter g = −0,39 (Blocken besser); Fließtexte ohne klaren Effekt. Der Effekt war bei jüngeren Teilnehmenden stärker und in Studien mit zeitlichem Abstand zwischen den Aufgaben nicht mehr signifikant (g = 0,22).
- **Folgerung:** Die App durchmischt weiter, weil es nichts kostet. Von Erwachsenen mit Wiederholungsabständen darf man aber keinen großen Zusatzeffekt erwarten. Rohrer et al. (2020) wurde in dieser Recherche nicht neu geprüft.

### 4. Informationsreiches Feedback

- **Wisniewski, Zierer & Hattie (2020), *Frontiers in Psychology*:** 435 Studien, 994 Effekte, über 61 000 Teilnehmende, d = 0,48. Feedback mit Information zu Aufgabe, Vorgehen und Selbststeuerung d = 0,99; korrigierendes Feedback d = 0,46; Verstärkung oder Bestrafung d = 0,24. Grenzen: sehr heterogen (I² = 83 %), asymmetrischer Funnel-Plot (Hinweis auf Publikationsverzerrung), Vorher-Nachher-Designs zeigen größere Effekte (0,63) als kontrollierte (0,42). Die Zahlen sind deshalb eher als Obergrenze zu lesen.
- **Umsetzung:** Bei einer falschen Antwort zeigt die App die eigene Antwort neben der richtigen, den typischen Fehler des Themas und (aufklappbar) Merksatz und Regeln. Bei einer richtigen Antwort steht die nächste Wiederholung, kein Lob-Feuerwerk.

### 5. Vorgerechnete Beispiele und abgestufte Hilfe

- **Barbieri, Miller-Cotto, Clerjuste & Chawla (2023), *Educational Psychology Review* 35, Art. 11:** 55 Studien, mittlere Wirkung (g ≈ 0,48 laut Kurzbeleg). Richtige Beispiele wirkten besser als fehlerhafte oder gemischte; Aufforderungen zur Selbsterklärung **verringerten** den Nutzen. Die Autorinnen halten fest, dass fehlerhafte Beispiele bei sehr geringem Vorwissen trotzdem helfen könnten. Bestätigt über Lebenslauf der Erstautorin und einen Fachblog (Stufe C); die Effektstärke selbst stammt aus einem Repositoriums-Kurzbeleg.
- **Kulik & Fletcher (2016), *Review of Educational Research*:** 50 Evaluationen intelligenter Tutorsysteme, Median 0,66 Standardabweichungen. Der Effekt hing stark davon ab, ob mit selbst entwickelten oder standardisierten Tests gemessen wurde.
- **Umsetzung:** Hilfe in zwei Stufen. Erst der Tipp, dann „Ähnliches Beispiel": eine vorgerechnete Aufgabe desselben Typs (Beispiel-Aufgaben-Paar), die die eigene Antwort nicht verrät. Wer Hilfe nutzt, bekommt das Thema am nächsten Tag wieder. Die App ist kein Tutorsystem; sie übernimmt nur das Prinzip der abgestuften Hilfe.

### 6. Veranschaulichungen

- **Noetel et al. (2022), *Review of Educational Research*:** Übersicht über 29 Reviews mit 1 189 Studien und 78 177 Teilnehmenden. Wirksam waren u. a. räumliche und zeitliche Nähe von Bild und Text sowie Signalisierung. Gutes Design war bei komplexem Material und fremdbestimmtem Tempo wichtiger als beim selbstgesteuerten Lernen.
- **Umsetzung:** Acht Lektionen mit Grafik (Tangente, Fläche, Extrema, Vektorlänge, Determinante, Skalarprodukt, z-Wert, Binomialverteilung). Beschriftung direkt im Bild, Hervorhebung nur durch Farbe, kein Zierrat. Der Zusatznutzen beim Selbstlernen dürfte klein sein; die Grafiken tragen aber auch zur Verständlichkeit bei.

### 7. Motivation, Autonomie und Rhythmus

- **Patzak & Zhang (2025), *Educational Psychology Review*:** 94 Studien zum Zusammenspiel von Autonomieunterstützung und Struktur im Unterricht (Zusammenhang r = 0,53), beide förderten Motivation und Engagement. Grenzen: Lehrkräfte-Kontext, I² ≈ 99 %, Hinweise auf fehlende kleine oder negative Studien. Die Übertragung auf eine Selbstlern-App ist indirekt.
- **Lally et al. (2010), *European Journal of Social Psychology* (nur über einen UCL-Pressetext gelesen, Stufe C):** Im Mittel 66 Tage bis zur Automatisierung (bei Personen, auf die das Modell passte); ein ausgelassener Tag schadete nicht wesentlich, unregelmäßiges Verhalten bildete aber keine Gewohnheit. Kleine Freiwilligenstudie, Selbstauskünfte, kein Lernerfolg gemessen.
- **Umsetzung:** „Heute"-Karte mit klarem nächsten Schritt (weniger Entscheidungsaufwand), frei wählbares Wochenziel (1 bis 7 Lerntage), wählbare Session-Länge (5, 10, 15), Fortschritt je Fachgebiet, Statuswechsel nach jeder Session. Der Wochenrhythmus verzeiht Lücken ausdrücklich. Das sind begründete Gestaltungsentscheidungen, **keine belegten Lerngewinne**.

## Bewusst nicht umgesetzt

| Mechanik | Grund |
|---|---|
| Punkte, Abzeichen, Ranglisten | Sailer & Homner (2020; 40 Experimente): g = 0,49 (kognitiv), 0,36 (motivational), 0,25 (Verhalten); in der Teilmenge mit strengem Design wurden die motivationalen und Verhaltenseffekte nicht mehr signifikant. Eine neuere Meta-Analyse (Li, Ma & Shi 2023, *Frontiers in Psychology*) berichtet g = 0,82 und Untergruppeneffekte über 3. Das sind für Bildungsinterventionen unplausibel große Werte (Warnsignal für Heterogenität oder Verzerrung); die Studie wurde nicht als Grundlage genutzt. |
| Tägliche Streaks | Kein belastbarer Beleg gefunden; Lally et al. sprechen eher für verzeihende Rhythmen. Streaks können außerdem Druck erzeugen, der zu Erwachsenen mit wechselndem Alltag schlecht passt. |
| Selbsterklärungs-Aufforderungen zu Beispielen | Barbieri et al. (2023): verringerten in Mathematik den Nutzen. |
| Fehlerbeispiele („Finde den Fehler") | Barbieri et al. (2023): richtige Beispiele wirkten besser; der Vorteil bei wenig Vorwissen ist nur vermutet. Möglicher späterer Test. |
| Erst selbst probieren, dann Lektion (Problemlösen vor Instruktion) | Sinha & Kapur (2021; 53 Studien): Vorteil für Konzeptwissen (g = 0,36), keiner für Verfahrenswissen (g = −0,03). Die App trainiert vor allem Verfahren, und die wirksame Variante verlangt Gruppenarbeit und Lehrerführung. |
| Wachstumsdenken-Botschaften | Sisk et al. (2018; 273 und 43 Studien): schwache Effekte, am ehesten bei benachteiligten Gruppen. |
| Konfidenzabfrage („Wie sicher bist du?") | Der Befund, dass sicher geglaubte Fehler besonders gut korrigiert werden (Hypercorrection), ist umstritten: Sitzman, Rhodes & Tauber (2014, *Memory & Cognition*) fanden Vorwissen als besseren Prädiktor als die Selbstsicherheit. Der Nutzen für das Lernen ist unklar, der Aufwand pro Aufgabe real. |

## Nicht geprüft und offene Punkte

- **Nicht erreichbar bzw. nicht gelesen:** Dunlosky et al. (2013), Metcalfe (2017, *Annual Review of Psychology*), Pan & Rickard (2018), Wilson et al. (2019, „85-Prozent-Regel"), Gollwitzer & Sheeran (2006), Cepeda et al. (2006), Rohrer et al. (2020). Für Dunlosky lag nur ein Hochschul-Pressetext vor (Stufe C): Abrufübung und verteiltes Üben wurden als besonders nützlich eingestuft, Zusammenfassen, Markieren und Wiederlesen als wenig nützlich.
- **Schwierigkeit gezielt steuern** (etwa Aufgaben so wählen, dass ein hoher Anteil gelingt): Rowland stützt den Gedanken, dass Abrufe gelingen sollten. Die generierten Aufgaben haben aber keine Schwierigkeitsstufen, und die „85-Prozent-Regel" stammt aus Lernmodellen und wurde hier nicht geprüft. Deshalb nur indirekt über Hilfestufen und Wiederholungsplan.
- **Die App selbst ist nicht evaluiert.** Ob sie das Lernen verbessert, zeigt nur Erproben, zum Beispiel mit einem Vor- und Nachtest zu denselben Themen im Abstand mehrerer Wochen.

## Ideen für später

1. Aufgaben mit Strategiewahl („Welche Regel brauche ich?"), weil Durchmischen vor allem beim Unterscheiden von Aufgabentypen wirkt. Braucht Aufgabentexte, die den Typ nicht verraten.
2. Schwierigkeitsstufen je Thema und Auswahl nach bisheriger Trefferquote.
3. Weitere Grafiken (Grenzwert, Exponentialfunktion, Eigenvektoren, Normalverteilung mit Intervallen).
4. Eingebauter Vor- und Nachtest, um die Wirkung der App für sich selbst zu messen.
