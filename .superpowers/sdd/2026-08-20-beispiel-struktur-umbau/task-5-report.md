# Task-5 Report: Session 1 — IT-Berufe & duales System

**Datum:** 2026-08-20  
**Commit:** dca6ed9  
**Branch:** main

---

## Erstellte Dateien (11 neue Dateien, 2000 Zeilen)

| Datei | Typ | Status |
|-------|-----|--------|
| `scripts/data/karteikarten/session-1.json` | JSON | 30 Karten, 9 Themen, alle ≥5 Zeichen, keine Doppelten |
| `scripts/data/spiele/session-1.json` | JSON | 64 Wörter, Länge 4–14, alle A-ZÄÖÜß, keine Doppelten |
| `Session-1_IT-Berufe-und-duales-System/Tagesplan_IT-Berufe-und-duales-System.md` | Markdown | 90-Minuten-Plan, 5 Lernziele, Hinweise |
| `Session-1_IT-Berufe-und-duales-System/Handout_IT-Berufe-und-duales-System.tex` | LaTeX | 7 Sections, 2 Tabellen, 4 Merksätze, Glossar |
| `Session-1_IT-Berufe-und-duales-System/Aufgaben_IT-Berufe-und-duales-System.md` | Markdown | 6 Aufgaben, 52 Punkte, JIKU-Kontext |
| `Session-1_IT-Berufe-und-duales-System/Aufgabenheft_IT-Berufe-und-duales-System.tex` | LaTeX | 6 Aufgaben + Lösungsteil für Lehrende |
| `Session-1_IT-Berufe-und-duales-System/Praesentation_IT-Berufe-und-duales-System.html` | HTML | 13 Slides (Cover + 12), keine `{{`-Platzhalter |
| `Session-1_IT-Berufe-und-duales-System/Karteikarten_IT-Berufe-und-duales-System.html` | HTML | generiert durch build-spiele-und-karten.js |
| `Session-1_IT-Berufe-und-duales-System/Memory_IT-Berufe-und-duales-System.html` | HTML | generiert |
| `Session-1_IT-Berufe-und-duales-System/Wordle_IT-Berufe-und-duales-System.html` | HTML | generiert |
| `Session-1_IT-Berufe-und-duales-System/Hangman_IT-Berufe-und-duales-System.html` | HTML | generiert |

**Gitignorierte PDFs** (erzeugt, aber nicht committed): `Handout_*.pdf`, `Aufgabenheft_*.pdf`

---

## Build-Ausgaben

```
node scripts/build-spiele-und-karten.js session-1
→ ✓ Session 1: 30 Karten (9 Themen) -> Karteikarten + Memory
→ ✓ Session 1: 64 Wörter (Länge 4–14) -> Wordle + Hangman

node scripts/build-quiz.js session-1
→ Session 1: 40 Fragen -> Quiz_IT-Berufe-und-duales-System.html

python3 scripts/build_tex.py Handout_IT-Berufe-und-duales-System.tex
→ -> Handout_IT-Berufe-und-duales-System.pdf  (OK)

python3 scripts/build_tex.py Aufgabenheft_IT-Berufe-und-duales-System.tex
→ -> Aufgabenheft_IT-Berufe-und-duales-System.pdf  (OK, nach Fix von \square → {[~]})
```

**Ein Fehler aufgetreten und behoben:** `\square` aus `amssymb` war nicht geladen. Ersetzt durch `{[~]}` (plain-text Checkbox). Keine weiteren LaTeX-Fehler.

---

## Inhaltliche Entscheidungen

### Karteikarten (30 Karten, 9 Themen)
- Themen: IT-Berufe 2020, Fachinformatiker, Ausbildungsdauer, Duales System, Beteiligte, Prüfung, Handlungskompetenz, Duales Studium, Selbstständiges Handeln
- Alle Backsides eigenständig formuliert; Lehrbuch-Zahlen (3 Jahre, §§ 7/8/45 BBiG, 20 %, 24 Jahre Ausbilder) direkt aus Quelle übernommen

### Wortliste (64 Wörter)
- Mehrere Iterationen nötig: Viele IT-Fachbegriffe sind zu lang (>14 Zeichen), z. B. FACHINFORMATIKER (16), BERUFSBILDUNGSGESETZ (20)
- Lösung: Abkürzungen (BBIG, WISO), Komposita aufgeteilt (SOFTWAREARBEIT statt SOFTWAREENTWICKLUNG), kürzere Synonyme
- Alle Wörter final validiert: WORD_RE = `/^[A-ZÄÖÜß]{4,14}$/`, keine Doppelten

### Handout
- 7 Sections + Glossar, ca. 5 Seiten
- Eröffnungs-Merksatz „Worum geht es in dieser Session?"
- § 1 BBiG-Merksatz als zitierfähige Box
- Autor: `IT Lernfeld 1 --- Das Unternehmen und die eigene Rolle im Betrieb beschreiben` (kein Copyright-Name, kein GitHub)
- Handlungskompetenz-Tabelle mit allen drei Dimensionen

### Aufgabenheft
- 6 Aufgaben, 52 Punkte, IHK-Klausurformat (Operatoren: nennen/erläutern/begründen/beschreiben)
- Lösungsteil für Lehrende am Ende hinter `\newpage`
- JIKU IT-Solutions als Modellunternehmen durchgängig eingeführt
- Punktetabelle auf Seite 1

### Präsentation
- 13 Slides: Cover, Lernziele, Agenda, vier IT-Berufe, vier Fachrichtungen, kaufmännische Berufe im Vergleich, duales System, § 1 BBiG, Beteiligte, Ausbildungsdauer, gestreckte Prüfung, Handlungskompetenz, Ausblick „Das nehmen Sie mit"
- Keine `{{`-Platzhalter übrig, kein `© Can Siebert` im Footer (ersetzt durch „IT Lernfeld 1 · 2026")

---

## Fachliche Prüfung (gegen Lehrbuch-TXT)

| Fakt | Quelle | Status |
|------|--------|--------|
| 4 IT-Berufe seit 2020 | Lehrbuch S. 10 | ✓ |
| 4 Fachrichtungen Fachinformatiker | Lehrbuch S. 10-11 | ✓ |
| Neu 2020: Digitale Vernetzung + Daten- und Prozessanalyse | Lehrbuch S. 10 | ✓ |
| Ausbildungsdauer 3 Jahre, §§ 7, 8, 45 BBiG | Lehrbuch S. 10 | ✓ |
| Teil 1 Prüfung: 20 %, nach 15 Monaten, 90 Min. | Lehrbuch S. 18-19 | ✓ |
| Ausbilder min. 24 Jahre alt | Lehrbuch S. 15 (Zeile 419) | ✓ |
| Über 300 staatl. anerkannte Ausbildungsberufe | Lehrbuch S. 13 | ✓ |
| § 1 BBiG — Ziel der Berufsbildung (Wortlaut) | Lehrbuch S. 12 | ✓ (als Merksatz) |
| § 4 Abs. 1 BBiG — Ausbildungsvertrag schriftlich | Lehrbuch S. 13 | ✓ |
| § 278 BGB — Haftung für Erfüllungsgehilfen | Lehrbuch S. 15 | ✓ |
| Projektarbeit 40 Stunden (FIAE: 80 Std.) | Lehrbuch S. 19 | Im Aufgabenheft-Lösung korrekt; im Handout vereinfacht (ohne FIAE-Ausnahme erwähnt) |
| Fachinformatiker meistgesucht | Lehrbuch S. 10 | ✓ |

**Anmerkung:** Die FIAE-spezifische Projektarbeit von 80 Stunden (statt 40) wird im Handout der Einfachheit halber nicht erwähnt, da nur die allgemeine Regel für Anfänger relevant ist. Die Lehrbuch-Aussage steht auf S. 19.

**Keine verbatimen Lehrbuch-Sätze** wurden übernommen (außer § 1 BBiG, der als wörtliches Zitat gekennzeichnet ist).

---

## Bedenken / Hinweise

1. **WISO-Quiz (quiz-t1s1.js):** Bereits vorhanden. Enthält 40 Fragen, einige prüfen Inhalte aus Session 2 (§ 17, § 14 BBiG zur Vergütung/Freistellung), die thematisch noch nicht in Session 1 behandelt werden. Die Fragen sind von einer Errata-geprüften Quelle, daher inhaltlich korrekt — aber Lehrende sollten wissen, dass das Quiz leicht über Session 1 hinausgeht.
2. **Spiele-Wörter:** Durch die 14-Zeichen-Begrenzung mussten viele IT-Schlüsselbegriffe durch kürzere Synonyme ersetzt werden (z. B. SOFTWAREARBEIT statt SOFTWAREENTWICKLUNG). Das reduziert etwas die Fachspezifik der Wordle/Hangman-Spiele.
3. **missfont.log:** Im Session-Ordner vorhanden (von früherer Build-Aktivität). Harmlos.

---

## Fix-Report (2026-08-20, Review-Findings Session 1)

**Commit:** siehe unten

### Finding 1 — Karteikarten-Anzahl dynamisch (war: hardcoded "60")

Geänderte Datei: `scripts/karteikarten-template.html`

- `<title>`: "(60 Karten)" entfernt (kein Kartencount im Titel nötig)
- `.subtitle` (`#subtitleText`): "60 Lernkarten" → statischer Platzhalter ohne Zahl; JS setzt beim Init `CARDS.length + ' Lernkarten · …'`
- `#mastered` initial HTML: `0 / 60 gemeistert` → `0 / … gemeistert` (wird sofort von `renderStats()` mit `CARDS.length` überschrieben)
- `#doneText` HTML: "Sie haben alle 60 Karten …" → "Sie haben alle Karten …"; JS setzt beim Init die korrekte Zahl via `CARDS.length`

Rebuild und Verifikation:
```
node scripts/build-spiele-und-karten.js session-1
→ ✓ Session 1: 30 Karten (9 Themen) -> Karteikarten + Memory
grep "60" Karteikarten_IT-Berufe-und-duales-System.html  (card-count-relevant)
→ keine Treffer (alle CSS-Werte wie border-radius, font-size etc. unberührt)
grep "CARDS.length" Karteikarten_IT-Berufe-und-duales-System.html
→ subtitleText und doneText werden dynamisch gesetzt; mastered-Zeile aus renderStats()
```

### Finding 2 — Aufgabe-2-Benennung angeglichen

Geänderte Dateien:
- `Session-1_IT-Berufe-und-duales-System/Aufgaben_IT-Berufe-und-duales-System.md`: "Fachinformatiker/-in FIAE" → "Fachinformatiker/-in Anwendungsentwicklung (FIAE)"
- `Session-1_IT-Berufe-und-duales-System/Aufgabenheft_IT-Berufe-und-duales-System.tex`: "Fachinformatiker/-in Anwendungsentwicklung" → "Fachinformatiker/-in Anwendungsentwicklung (FIAE)" (Aufgabe-2-Auswahlliste)

PDF rebuild und Verifikation:
```
python3 scripts/build_tex.py Session-1_IT-Berufe-und-duales-System/Aufgabenheft_IT-Berufe-und-duales-System.tex
→ -> Aufgabenheft_IT-Berufe-und-duales-System.pdf

pdftotext Aufgabenheft_IT-Berufe-und-duales-System.pdf - | grep -A2 "FIAE"
→ (Zur Auswahl: Fachinformatiker/-in Anwendungsentwicklung (FIAE), IT-Systemelektroniker/-in,
   Kaufmann/-frau für IT-Systemmanagement, Kaufmann/-frau für Digitalisierungsmanagement)
→ (d) Fachinformatiker/-in Anwendungsentwicklung  [Lösungsteil]
```

Beide Dateien zeigen nun identisch "Fachinformatiker/-in Anwendungsentwicklung (FIAE)".
