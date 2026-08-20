# IT_Lernfeld1 Beispiel-Struktur-Umbau — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** IT_Lernfeld1 auf die Struktur der Beispiel-Lernplattform umbauen: 8 Session-Ordner mit vollem Artefakt-Satz, Kachel-Kursseite mit Abmelden, Prüfungssimulator, generierende Build-Pipeline.

**Architecture:** Inhalte liegen als Daten (JSON/Markdown/TeX) unter `scripts/data/` bzw. in den Session-Ordnern; Node-Skripte füllen HTML-Templates (Spiele, Quiz), `build_tex.py` kompiliert Handouts/Aufgabenhefte mit xelatex, `split_pdf.py` erzeugt die Literatur-Auszüge. `index.html` und `pruefungssimulator.html` sind statische Seiten ohne Backend.

**Tech Stack:** Node.js (Build-Skripte, keine npm-Abhängigkeiten), Python 3 + pypdf + pdftotext, xelatex/latexmk, Vanilla-HTML/CSS/JS, Playwright-MCP für Smoke-Tests.

**Spec:** `docs/superpowers/specs/2026-08-20-beispiel-struktur-umbau-design.md`

## Global Constraints

- Arbeitsverzeichnis ist IMMER `~/IT_Lernfeld1` (Git-Repo, Branch `main`). NIE direkt im Shared Folder `/media/sf_Lernfeld_1/IT_Lernfeld1` arbeiten (Sync erst in Task 16).
- Beispiel-Repo (nur LESEN, nie ändern): `/media/sf_Lernfeld_1/Beispiel_einer_Lernplattform` — im Folgenden `$BEISPIEL`.
- Quelltexte: `~/IT_Lernfeld1_quellen/split/{lehrbuch,arbeitsbuch}/Session-N_<Slug>.txt` (+ PDFs).
- Fragen-Quelle: `data/quiz-t*.js`, Format `window.QUIZ_DATA = { titel, fragen: [{frage, optionen[4], richtig(0..3), erklaerung}] }` — 8 Dateien × 40 Fragen. Diese Dateien werden NICHT verändert.
- Artefakt-Namensschema exakt: `<Art>_<Slug>.<ext>` im Ordner `Session-<N>_<Slug>/`.
- Urheberrecht: `Grundlagen_*.pdf` und `Arbeitsbuch_*.pdf` (Verlagsauszüge) niemals committen (.gitignore, Task 1). Eigene Texte (Handout, Aufgaben) dürfen den Lehrbuchtext NICHT wörtlich kopieren — eigenständig formulieren.
- LaTeX: `\documentclass[11pt, a4paper]{article}` + `\input{bfw-style.tex}`; Kompilation ausschließlich über `python3 scripts/build_tex.py` (setzt TEXINPUTS auf `templates/`), Engine xelatex, 2 Läufe.
- Alte Dateien `tag*-session*.html`, `assets/`, `docs/session-template.html` bleiben bis Task 16 unangetastet.
- Commit nach jedem Task, Nachricht deutsch, Format wie bisherige Historie, Schlusszeile `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`.
- Jeder Task endet erst, wenn der genannte Verify-Befehl die erwartete Ausgabe liefert (Ausgabe ansehen, nicht annehmen).

## Session-Stammdaten (überall identisch zu verwenden)

| N | Slug | Titel | Quiz | Lehrbuch-Kapitel |
|---|------|-------|------|------------------|
| 1 | IT-Berufe-und-duales-System | IT-Berufe & duales System | t1s1 | 1.1 |
| 2 | Rechte-Pflichten-und-Arbeitsrecht | Rechte, Pflichten & Arbeitsrecht | t1s2 | 1.2.1–1.2.3 |
| 3 | Betrieb-Unternehmen-und-Ziele | Betrieb, Unternehmen & Unternehmensziele | t2s1 | 1.3.1–1.3.3 |
| 4 | Rechtsformen-und-Aufbauorganisation | Rechtsformen & Aufbauorganisation | t2s2 | 1.3.4 |
| 5 | Geschaeftsprozesse-Produktionsfaktoren-Gueterarten | Geschäftsprozesse, Produktionsfaktoren & Güterarten | t3s1 | 1.3.5–1.3.6 |
| 6 | Wirtschaftskreislauf-und-Marktsituationen | Wirtschaftskreislauf & Marktsituationen | t3s2 | 1.4.1–1.4.2 |
| 7 | Praesentation-vorbereiten-und-planen | Präsentation vorbereiten & planen | t4s1 | 1.5.1–1.5.2 |
| 8 | Praesentieren-Feedback-und-Wiederholung | Präsentieren, Feedback & Gesamtwiederholung | t4s2 | 1.5.3 |

---

### Task 1: Konfiguration, Ordner, Templates, .gitignore, Split-Erweiterung

**Files:**
- Create: `scripts/config.js`, 8× `Session-N_<Slug>/` (per Skript), `templates/bfw-style.tex`, `templates/bfw-style.css`, `scripts/karteikarten-template.html`, `scripts/memory-template.html`, `scripts/wordle-template.html`, `scripts/hangman-template.html`, `scripts/skeletons/praesentation-skeleton.html`
- Modify: `.gitignore`, `scripts/split_pdf.py`

**Interfaces:**
- Produces: `scripts/config.js` exportiert `SESSIONS` (Array) und `folderOf(s)`. Alle späteren Skripte konsumieren genau diese Struktur:

```js
// scripts/config.js
// Zentrale Session-Stammdaten — einzige Quelle für Ordnernamen/Slugs/Titel.
module.exports.SESSIONS = [
  { nr: 1, slug: 'IT-Berufe-und-duales-System', titel: 'IT-Berufe & duales System', quiz: 't1s1' },
  { nr: 2, slug: 'Rechte-Pflichten-und-Arbeitsrecht', titel: 'Rechte, Pflichten & Arbeitsrecht', quiz: 't1s2' },
  { nr: 3, slug: 'Betrieb-Unternehmen-und-Ziele', titel: 'Betrieb, Unternehmen & Unternehmensziele', quiz: 't2s1' },
  { nr: 4, slug: 'Rechtsformen-und-Aufbauorganisation', titel: 'Rechtsformen & Aufbauorganisation', quiz: 't2s2' },
  { nr: 5, slug: 'Geschaeftsprozesse-Produktionsfaktoren-Gueterarten', titel: 'Geschäftsprozesse, Produktionsfaktoren & Güterarten', quiz: 't3s1' },
  { nr: 6, slug: 'Wirtschaftskreislauf-und-Marktsituationen', titel: 'Wirtschaftskreislauf & Marktsituationen', quiz: 't3s2' },
  { nr: 7, slug: 'Praesentation-vorbereiten-und-planen', titel: 'Präsentation vorbereiten & planen', quiz: 't4s1' },
  { nr: 8, slug: 'Praesentieren-Feedback-und-Wiederholung', titel: 'Präsentieren, Feedback & Gesamtwiederholung', quiz: 't4s2' },
];
module.exports.folderOf = s => `Session-${s.nr}_${s.slug}`;
module.exports.ROOT = require('path').resolve(__dirname, '..');
```

- [ ] **Step 1:** `scripts/config.js` mit exakt obigem Inhalt anlegen. Verify: `cd ~/IT_Lernfeld1 && node -e "const c=require('./scripts/config');console.log(c.SESSIONS.length, c.folderOf(c.SESSIONS[3]))"` → `8 Session-4_Rechtsformen-und-Aufbauorganisation`.
- [ ] **Step 2:** Session-Ordner anlegen: `cd ~/IT_Lernfeld1 && node -e "const c=require('./scripts/config');const fs=require('fs');c.SESSIONS.forEach(s=>fs.mkdirSync(c.folderOf(s),{recursive:true}))" && ls -d Session-*` → 8 Ordner.
- [ ] **Step 3:** Templates kopieren (Quelle `$BEISPIEL`):
```bash
cd ~/IT_Lernfeld1 && mkdir -p templates scripts/skeletons
cp "/media/sf_Lernfeld_1/Beispiel_einer_Lernplattform/templates/bfw-style.tex" templates/
cp "/media/sf_Lernfeld_1/Beispiel_einer_Lernplattform/templates/bfw-style.css" templates/
for t in karteikarten memory wordle hangman; do cp "/media/sf_Lernfeld_1/Beispiel_einer_Lernplattform/scripts/${t}-template.html" scripts/; done
```
- [ ] **Step 4:** Präsentations-Skelett gewinnen: `$BEISPIEL/Lernfeld1/Session-1_Rechtliche-Grundlagen-der-Berufsausbildung/Praesentation_Rechtliche-Grundlagen-der-Berufsausbildung.html` nach `scripts/skeletons/praesentation-skeleton.html` kopieren. Darin: alle `<section class="slide">…</section>` außer der Cover-Folie entfernen; in der Cover-Folie Titel/Untertitel/Meta durch `{{TITEL}}`, `{{UNTERTITEL}}`, `Session {{NR}}` ersetzen; Kurs-Branding „Lernfeld 1" beibehalten; CSS/Nav/Keyboard-JS unverändert lassen. Verify: Datei im Browser öffnen (`file://`) → Cover-Folie mit Platzhaltern, Pfeiltasten-Navigation ohne JS-Fehler (Konsole leer).
- [ ] **Step 5:** `.gitignore` ergänzen (an bestehenden Inhalt anhängen):
```gitignore
# Verlagsmaterial — urheberrechtlich geschützt, nur lokal
Session-*/Grundlagen_*.pdf
Session-*/Arbeitsbuch_*.pdf
# LaTeX-Zwischendateien
*.aux
*.log
*.out
*.toc
```
- [ ] **Step 6:** `scripts/split_pdf.py` erweitern: nach dem bestehenden Split zusätzlich in die Session-Ordner kopieren. In `main()` nach `extract_text(...)` einfügen:
```python
            # Zusätzlich in den Session-Ordner der Plattform legen
            repo = Path.home() / "IT_Lernfeld1"
            art = "Grundlagen" if kind == "lehrbuch" else "Arbeitsbuch"
            sess_dir = repo / f"Session-{nr}_{slug}"
            if sess_dir.is_dir():
                import shutil
                shutil.copy2(pdf, sess_dir / f"{art}_{slug}.pdf")
```
- [ ] **Step 7:** Ausführen + prüfen: `python3 scripts/split_pdf.py && ls Session-1_IT-Berufe-und-duales-System/` → enthält `Grundlagen_IT-Berufe-und-duales-System.pdf` und `Arbeitsbuch_IT-Berufe-und-duales-System.pdf`. `git status` darf diese PDFs NICHT als untracked zeigen (gitignore wirkt).
- [ ] **Step 8:** Commit: `git add -A && git commit -m "Infrastruktur: config.js, Session-Ordner, Templates, Split in Session-Ordner"`.

---

### Task 2: build-spiele-und-karten.js (Karteikarten, Memory, Wordle, Hangman)

**Files:**
- Create: `scripts/build-spiele-und-karten.js`, `scripts/data/karteikarten/.gitkeep`, `scripts/data/spiele/.gitkeep`

**Interfaces:**
- Consumes: `scripts/config.js` (`SESSIONS`, `folderOf`, `ROOT`); Templates aus Task 1.
- Produces: CLI `node scripts/build-spiele-und-karten.js [session-N]`. Datenschemata (spätere Session-Tasks liefern die Dateien):
  - `scripts/data/karteikarten/session-N.json`: `{ session, thema, slug, day_id, cards: [{topic, front, back}] }` — mind. 20 Karten.
  - `scripts/data/spiele/session-N.json`: `{ session, thema, slug, day_id, words: [{word, hint}] }` — mind. 60 Wörter, `word` matcht `/^[A-ZÄÖÜß]{4,14}$/`.
  - Output je Session: `Karteikarten_<slug>.html`, `Memory_<slug>.html`, `Wordle_<slug>.html`, `Hangman_<slug>.html` im Session-Ordner.

- [ ] **Step 1:** Vorbild lesen: `$BEISPIEL/scripts/build-lernfeld1.js` (komplett). Es ist bereits session-basiert und nutzt dieselben vier Templates.
- [ ] **Step 2:** `scripts/build-spiele-und-karten.js` erstellen = Kopie von build-lernfeld1.js mit genau diesen Änderungen:
  1. Kopf ersetzen durch: `const { SESSIONS, folderOf, ROOT } = require('./config');` — kein hartes `/media/sf_BFW`.
  2. `COURSE = ROOT` (Session-Ordner liegen im Repo-Root); Zielpfad je Session: `path.join(ROOT, folderOf(sess))`.
  3. `KART_DIR = path.join(ROOT,'scripts','data','karteikarten')`, `SPIELE_DIR = path.join(ROOT,'scripts','data','spiele')`, Templates aus `path.join(ROOT,'scripts')`.
  4. `SESSION_FOLDERS`-Objekt entfernen; stattdessen `const bySession = Object.fromEntries(SESSIONS.map(s=>[s.nr,s]))` und Ordner via `folderOf`.
  5. `EXPECT_CARDS = 20` (Minimum, mehr erlaubt: Fehler nur bei `< EXPECT_CARDS`), `MIN_WORDS = 60`, `MIN_PAIRS = 8`, `WORD_RE` unverändert.
  6. Branding-Replacements in `fill()`: `'Büroprozesse (M-067)'` → Ersetzung auf `'IT Lernfeld 1'`; `Tag {{TAG}}` → `Session {{TAG}}` beibehalten.
  7. Validierungen des Vorbilds beibehalten (Kartenzahl, Wort-Regex, Pflichtfelder); bei Fehler `process.exit(1)`.
- [ ] **Step 3:** Smoke-Test mit Wegwerf-Daten (noch keine echten Inhalte):
```bash
cd ~/IT_Lernfeld1
python3 - <<'EOF'
import json, pathlib
k = {"session":1,"thema":"Testthema","slug":"IT-Berufe-und-duales-System","day_id":"s1",
     "cards":[{"topic":"T","front":f"Begriff {i}","back":f"Definition {i}"} for i in range(20)]}
s = {"session":1,"thema":"Testthema","slug":"IT-Berufe-und-duales-System","day_id":"s1",
     "words":[{"word":f"TESTWORT{chr(65+i)}","hint":f"Hinweis {i}"} for i in range(60)]}
pathlib.Path("scripts/data/karteikarten/session-1.json").write_text(json.dumps(k,ensure_ascii=False))
pathlib.Path("scripts/data/spiele/session-1.json").write_text(json.dumps(s,ensure_ascii=False))
EOF
node scripts/build-spiele-und-karten.js session-1
ls Session-1_IT-Berufe-und-duales-System/*.html
```
Expected: 4 HTML-Dateien (Karteikarten/Memory/Wordle/Hangman). Eine davon im Browser öffnen: Titel zeigt „Session 1", Spiel läuft ohne Konsolen-Fehler.
- [ ] **Step 4:** Wegwerf-Daten löschen (`rm scripts/data/*/session-1.json Session-1_*/{Karteikarten,Memory,Wordle,Hangman}_*.html`), `.gitkeep` in beide data-Ordner.
- [ ] **Step 5:** Commit: `feat: Build-Skript für Karteikarten/Memory/Wordle/Hangman (config-basiert)`.

---

### Task 3: build-quiz.js + quiz-template.html

**Files:**
- Create: `scripts/build-quiz.js`, `scripts/quiz-template.html`

**Interfaces:**
- Consumes: `scripts/config.js`; `data/quiz-<quiz>.js` (Format s. Global Constraints).
- Produces: CLI `node scripts/build-quiz.js [session-N]` → `Quiz_<slug>.html` je Session (standalone, Daten eingebettet). Außerdem exportiert das Skript `loadQuizData(quizId)` (Node-Funktion, gibt das QUIZ_DATA-Objekt zurück) — wird von Task 15 (validate-quiz) wiederverwendet.

- [ ] **Step 1:** `scripts/quiz-template.html` anlegen — eigenständige Quiz-Seite im Stil von `templates/bfw-style.css` (Farbwelt Petrol/Amber wie Beispiel). Pflicht-Elemente und Verhalten:
```html
<!doctype html><html lang="de"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Quiz · Session {{NR}} — {{THEMA}}</title>
<style>/* kompakt: Karte zentriert, .option-Buttons, .richtig grün #10B981, .falsch orange #F97316,
  .erklaerung-Box grau, Fortschritt oben, Ergebnis-Screen mit Prozent */</style></head>
<body>
<header><a href="../index.html">← Kursübersicht</a><h1>Session {{NR}}: {{THEMA}}</h1></header>
<main id="app"></main>
<script>const QUIZ = {{QUIZ_JSON}};
/* Ablauf: Fragen mischen (Fisher-Yates), Optionen mischen (richtig-Index mitführen),
   je Frage: Klick auf Option → sofort einfärben (gewählt + korrekt), Erklärung einblenden,
   Button "Weiter"; am Ende: x/N richtig, Prozent, Button "Nochmal" (neu mischen). */
</script></body></html>
```
Das `<style>`- und Ablauf-JS vollständig ausformulieren (ca. 120 Zeilen); keine externen Abhängigkeiten.
- [ ] **Step 2:** `scripts/build-quiz.js`:
```js
#!/usr/bin/env node
const fs = require('fs'); const path = require('path'); const vm = require('vm');
const { SESSIONS, folderOf, ROOT } = require('./config');

function loadQuizData(quizId) {
  const src = fs.readFileSync(path.join(ROOT, 'data', `quiz-${quizId}.js`), 'utf8');
  const sandbox = { window: {} };
  vm.runInNewContext(src, sandbox);           // führt "window.QUIZ_DATA = {...}" aus
  const d = sandbox.window.QUIZ_DATA;
  if (!d || !Array.isArray(d.fragen)) throw new Error(`QUIZ_DATA fehlt in quiz-${quizId}.js`);
  d.fragen.forEach((f, i) => {
    if (!f.frage || f.optionen.length !== 4 || f.richtig < 0 || f.richtig > 3 || !f.erklaerung)
      throw new Error(`quiz-${quizId}.js Frage ${i + 1} ungültig`);
  });
  return d;
}
module.exports = { loadQuizData };

if (require.main === module) {
  const tpl = fs.readFileSync(path.join(__dirname, 'quiz-template.html'), 'utf8');
  const filter = process.argv[2];
  for (const s of SESSIONS) {
    if (filter && filter !== `session-${s.nr}`) continue;
    const data = loadQuizData(s.quiz);
    const html = tpl.replaceAll('{{NR}}', String(s.nr)).replaceAll('{{THEMA}}', s.titel)
      .replace('{{QUIZ_JSON}}', JSON.stringify(data.fragen));
    const out = path.join(ROOT, folderOf(s), `Quiz_${s.slug}.html`);
    fs.writeFileSync(out, html);
    console.log(`Session ${s.nr}: ${data.fragen.length} Fragen -> ${path.basename(out)}`);
  }
}
```
- [ ] **Step 3:** Bauen + prüfen: `node scripts/build-quiz.js` → 8 Zeilen à „40 Fragen". `Session-3_*/Quiz_*.html` im Browser öffnen: Frage beantworten → Einfärbung + Erklärung; Durchlauf bis Ergebnis-Screen; Konsole fehlerfrei.
- [ ] **Step 4:** Commit: `feat: Quiz-Template + build-quiz.js (8 Session-Quizze aus data/quiz-*.js)`.

---

### Task 4: build_tex.py übernehmen und anpassen

**Files:**
- Create: `scripts/build_tex.py` (Basis: `$BEISPIEL/scripts/build_tex.py`)

**Interfaces:**
- Produces: `python3 scripts/build_tex.py [pfad/zur/datei.tex]` — ohne Argument baut es ALLE `.tex` in `Session-*/`-Ordnern. Exit-Code 0 nur wenn alle Builds erfolgreich.

- [ ] **Step 1:** Datei kopieren: `cp "$BEISPIEL/scripts/build_tex.py" scripts/build_tex.py`. Anpassen: Zeile `KURS_DIRS = sorted(p for p in ROOT.glob("Kurs *") if p.is_dir())` ersetzen durch `KURS_DIRS = sorted(p for p in ROOT.glob("Session-*") if p.is_dir())`. Rest (TEXINPUTS auf `templates/`, xelatex, 2 Läufe, Aufräumen von .aux/.log/.out/.toc) unverändert.
- [ ] **Step 2:** Probe: Minimal-Dokument `Session-1_IT-Berufe-und-duales-System/probe.tex` anlegen:
```latex
\documentclass[11pt, a4paper]{article}
\input{bfw-style.tex}
\begin{document}
\section{Probe}
\begin{merksatz}[title={Test}] Umlaute: äöüß — Farbtest. \end{merksatz}
\end{document}
```
`python3 scripts/build_tex.py Session-1_IT-Berufe-und-duales-System/probe.tex` → `probe.pdf` entsteht, Merksatz-Box farbig. Danach `rm Session-1_*/probe.*`.
- [ ] **Step 3:** Commit: `feat: build_tex.py für Session-Ordner (xelatex + bfw-style)`.

---

### Tasks 5–12: Inhalte je Session (ein Task pro Session, identischer Ablauf, sessionspezifische Werte)

Diese acht Tasks sind unabhängig voneinander und folgen ALLE exakt dem folgenden Ablauf. Die sessionspezifischen Werte stehen in der Tabelle „Session-Stammdaten" oben; Quellen je Session N:
- `~/IT_Lernfeld1_quellen/split/lehrbuch/Session-N_<Slug>.txt` (Fachinhalt — maßgeblich)
- `~/IT_Lernfeld1_quellen/split/arbeitsbuch/Session-N_<Slug>.txt` (Aufgabenideen — NUR als Inspiration, nichts wörtlich übernehmen)
- Alte Seite `tag⌈N/2⌉-session⌈((N-1)%2)+1⌉.html` (bereits geprüfte Inhalte/Struktur): Session 1→tag1-session1.html, 2→tag1-session2.html, 3→tag2-session1.html, 4→tag2-session2.html, 5→tag3-session1.html, 6→tag3-session2.html, 7→tag4-session1.html, 8→tag4-session2.html
- `data/quiz-<quiz>.js` (Begriffsquelle für Karteikarten/Wortlisten)

**Files (je Session N, `<Slug>` aus Tabelle):**
- Create: `scripts/data/karteikarten/session-N.json`, `scripts/data/spiele/session-N.json`, `Session-N_<Slug>/Tagesplan_<Slug>.md`, `Session-N_<Slug>/Handout_<Slug>.tex`, `Session-N_<Slug>/Aufgaben_<Slug>.md`, `Session-N_<Slug>/Aufgabenheft_<Slug>.tex`, `Session-N_<Slug>/Praesentation_<Slug>.html`

**Interfaces:**
- Consumes: Skripte aus Task 2/3/4, Skelett aus Task 1, Datenschemata aus Task 2.
- Produces: vollständiger Artefakt-Satz der Session; generierte Dateien `Karteikarten_/Memory_/Wordle_/Hangman_/Quiz_<Slug>.html`, `Handout_/Aufgabenheft_<Slug>.pdf`.

- [ ] **Step 1 — Quellen lesen:** Lehrbuch-TXT der Session vollständig lesen, alte Session-HTML lesen (Themenliste, Merksätze, Tabellen), Arbeitsbuch-TXT überfliegen (Aufgabentypen).
- [ ] **Step 2 — Karteikarten:** `scripts/data/karteikarten/session-N.json` mit 20–30 Karten schreiben. `topic` = Unterkapitel (z. B. „BBiG"), `front` = Begriff/Frage kurz, `back` = Definition in 1–2 Sätzen, eigene Formulierung. `day_id` = `"sN"`, `thema` = Titel aus Tabelle, `session` = N, `slug` = Slug.
- [ ] **Step 3 — Wortliste:** `scripts/data/spiele/session-N.json` mit ≥60 Einträgen. `word` GROSS, nur `A-ZÄÖÜß`, 4–14 Zeichen (Komposita ggf. kürzen: „BERUFSBILDUNG" ok, „BERUFSBILDUNGSGESETZ" zu lang → „BBIG" nicht erlaubt (3), also z. B. „BILDUNGSGESETZ"); `hint` = eindeutiger Hinweis-Satz ohne das Wort selbst.
- [ ] **Step 4 — Tagesplan:** `Tagesplan_<Slug>.md`:
```markdown
# Session N: <Titel>

**Lernfeld 1 · <Lehrbuch-Kapitel> · 90 Minuten**

## Lernziele
- [3–5 überprüfbare Ziele, „Die Teilnehmenden können …"]

## Ablauf
| Zeit | Phase | Inhalt | Material |
|------|-------|--------|----------|
| 00:00–00:10 | Einstieg | [Anknüpfung/Morgenquiz] | Quiz |
| 00:10–00:45 | Erarbeitung | [Kerninhalte] | Präsentation, Handout |
| 00:45–01:10 | Übung | [Aufgaben] | Aufgabenheft |
| 01:10–01:25 | Sicherung | [Spiel/Wiederholung] | Karteikarten/Memory |
| 01:25–01:30 | Abschluss | Ausblick | — |

## Hinweise für Lehrende
- [Stolperstellen, typische Fehlvorstellungen aus der Errata-Historie]
```
- [ ] **Step 5 — Handout:** `Handout_<Slug>.tex`, 4–6 Seiten. Aufbau exakt wie Beispiel-Handout (`$BEISPIEL/Lernfeld1/Session-1_*/Handout_*.tex` als Muster): `\documentclass[11pt, a4paper]{article}`, `\input{bfw-style.tex}`, `\title{...Session~N: <Titel>...}`, `\author{\textsf{IT Lernfeld 1 --- ...}}`, Eröffnungs-`merksatz` „Worum geht es in dieser Session?", `\tableofcontents`, dann `\section` je Unterthema mit Fließtext, `merksatz`-Boxen für Kernaussagen, Tabellen für Gegenüberstellungen. Inhalt aus Lehrbuch-TXT eigenständig formuliert; Zahlen/Paragraphen exakt übernehmen (§-Angaben gegen Quelle prüfen).
- [ ] **Step 6 — Aufgaben:** `Aufgaben_<Slug>.md` (Aufgabenliste als Markdown: 6–10 Aufgaben, Mischung aus Wissensfragen, Ankreuzaufgaben, Fallaufgaben zum Modellunternehmen JIKU IT-Solutions, mit Punktangaben) und `Aufgabenheft_<Slug>.tex` (dieselben Aufgaben als LaTeX im Muster von `$BEISPIEL/.../Aufgabenheft_*.tex`: Titel, Punktetabelle, Aufgaben mit Linien/Kästchen zum Ausfüllen, KEINE Lösungen im Heft; Lösungsteil am Ende hinter `\newpage\section*{Lösungshinweise für Lehrende}`).
- [ ] **Step 7 — Präsentation:** `scripts/skeletons/praesentation-skeleton.html` nach `Praesentation_<Slug>.html` kopieren; Platzhalter füllen (`{{TITEL}}`=Titel, `{{UNTERTITEL}}`=1 Satz, `{{NR}}`=N); 12–20 Folien als `<section class="slide">` ergänzen: Agenda, je Unterthema 2–4 Folien (`.cards` mit `.card teal/amber`, `merksatz` für Kernsätze), Abschlussfolie „Das nehmen Sie mit". Inhalte aus Handout verdichten (Stichpunkte, keine Textwände).
- [ ] **Step 8 — Bauen:** 
```bash
node scripts/build-spiele-und-karten.js session-N
node scripts/build-quiz.js session-N
python3 scripts/build_tex.py Session-N_<Slug>/Handout_<Slug>.tex
python3 scripts/build_tex.py Session-N_<Slug>/Aufgabenheft_<Slug>.tex
ls Session-N_<Slug>/
```
Expected: 5 HTML (Quiz+4 Spiele), 2 PDF (+ 2 Auszug-PDFs aus Task 1), .tex/.md-Quellen — Namensschema exakt eingehalten.
- [ ] **Step 9 — Fachliche Prüfung:** Handout-PDF und Aufgabenheft-PDF öffnen und gegen Lehrbuch-TXT prüfen: alle §-Angaben korrekt, Zahlen korrekt, keine wörtlichen Lehrbuch-Passagen, Umlaute sauber. Präsentation im Browser: alle Folien per Pfeiltaste erreichbar, Konsole leer.
- [ ] **Step 10 — Commit:** `Session N: <Titel> — kompletter Artefakt-Satz (Beispiel-Struktur)`.

---

### Task 13: Kursseite index.html (Kacheln, Gate, Abmelden, Medien-Platzhalter)

**Files:**
- Modify: `index.html` (vollständig neu schreiben; alte Datei wird ersetzt — Inhalte der alten Startseite werden nicht mehr gebraucht, alte Session-Seiten bleiben aber im Repo)

**Interfaces:**
- Consumes: Ordner-/Dateinamen-Schema aus Task 1; Zugangscode aus ALTER `index.html` (vor dem Überschreiben auslesen und identisch übernehmen).
- Produces: `SESSIONS`-JS-Konstante in der Seite (nr, slug, titel — identisch zu `scripts/config.js`); Link `pruefungssimulator.html`.

- [ ] **Step 1:** Alte `index.html` lesen: Zugangscode-Konstante + localStorage-Key notieren. Vorbild `$BEISPIEL/kurs-lernfeld1.html` lesen (Kachel-Rendering, Gate).
- [ ] **Step 2:** Neue `index.html` schreiben, Struktur wie Vorbild, mit diesen Abweichungen:
  1. `SESSIONS`-Konstante mit 8 Einträgen `{nr, slug, titel}`; `base = 'Session-'+nr+'_'+slug`.
  2. Kacheln je Session: Präsentation, Handout (PDF), Quiz, Karteikarten, Wordle, Hangman, Memory, Aufgabenheft (PDF), Grundlagen (PDF), Arbeitsbuch (PDF).
  3. Medien-Platzhalter: Kacheln „Video"/„Podcast" initial mit Klasse `disabled` und Text „folgt"; beim Laden je Session `fetch(base+'/Session-'+nr+'_Video.mp4', {method:'HEAD'})` (und Podcast analog) — bei `res.ok` Kachel aktivieren (Klasse entfernen, href setzen). Fehler still schlucken (`catch(()=>{})`).
  4. Hervorgehobene Kachel oben: „🎓 Prüfungssimulator — 320 Fragen üben & Prüfung simulieren" → `pruefungssimulator.html`.
  5. Gate wie bisher (gleicher Code, gleicher localStorage-Key). NEU: Button „Abmelden" rechts im Header, nur sichtbar wenn freigeschaltet; Klick: `localStorage.removeItem(<key>)` + `location.reload()`.
- [ ] **Step 3:** Test lokal: `cd ~/IT_Lernfeld1 && python3 -m http.server 8010` + Playwright: Seite öffnen → Gate erscheint; Code eingeben → Kacheln aller 8 Sessions sichtbar; Video/Podcast-Kacheln ausgegraut; Klick auf 3 Stichproben-Kacheln (Quiz S1, Handout-PDF S4, Präsentation S7) → Ziel lädt; „Abmelden" → Gate erscheint wieder. Konsole: keine Errors (HEAD-404s sind ok, keine Exceptions).
- [ ] **Step 4:** Commit: `feat: Kursseite im Beispiel-Stil — Kacheln, Medien-Platzhalter, Abmelden`.

---

### Task 14: pruefungssimulator.html

**Files:**
- Create: `pruefungssimulator.html`

**Interfaces:**
- Consumes: `data/quiz-t*.js` via 8 `<script src="data/quiz-t1s1.js">`-Tags — ABER: alle 8 Dateien setzen `window.QUIZ_DATA` und überschreiben sich. Lösung: nach jedem `<script src>`-Tag ein Inline-`<script>Simulator.register('t1s1', window.QUIZ_DATA)</script>`. `Simulator.register` speichert Kopien in `POOLS[quizId]`.
- Produces: eigenständige Seite, Rückweg-Link `index.html`.

- [ ] **Step 1:** Seite mit drei Modus-Karten bauen (gleiche Optik wie Kursseite):
  1. **Einzeln üben:** 8 Buttons (Session-Titel) → Übungslauf über die 40 Fragen der Session, Sofort-Feedback (wie Quiz-Template: einfärben + Erklärung), Fortschritt x/40, am Ende Trefferquote.
  2. **Gebündelt üben:** 8 Checkboxen + „Start" (mind. 1 gewählt, sonst Button disabled) → Fragen der gewählten Sessions gemischt, Sofort-Feedback, Ende mit Trefferquote.
  3. **Prüfungssimulation:** Button „Prüfung starten (30 Fragen)". Ziehung: erst 2 Zufallsfragen aus JEDER Session (16), dann 14 weitere zufällig aus dem Rest des Gesamtpools (ohne Duplikate). KEIN Sofort-Feedback; Navigation Vor/Zurück, Antworten änderbar, Fragenleiste 1–30 (beantwortet = gefüllt), Button „Abgeben" (mit confirm-Dialog wenn unbeantwortete Fragen).
- [ ] **Step 2:** Auswertung der Simulation: Punkte = richtige Antworten (1 je Frage), Prozent, IHK-Notenschlüssel: ≥92 % sehr gut, ≥81 % gut, ≥67 % befriedigend, ≥50 % ausreichend (bestanden ab hier), ≥30 % mangelhaft, sonst ungenügend. Danach: Themen-Auswertung je Session (x/y richtig, bei <50 % Hinweis „→ Session N wiederholen") und aufklappbare Liste ALLER Fragen mit eigener Antwort, richtiger Antwort, Erklärung.
- [ ] **Step 3:** Kern-Sampling als benannte Funktionen implementieren:
```js
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function drawExam(pools){            // pools: {quizId: fragen[]}, Rückgabe: 30 Fragen mit .quizId
  const picked=[];
  for(const [id,fragen] of Object.entries(pools))
    picked.push(...shuffle(fragen.map(f=>({...f,quizId:id}))).slice(0,2));
  const rest=Object.entries(pools).flatMap(([id,fragen])=>fragen.map(f=>({...f,quizId:id})))
    .filter(f=>!picked.some(p=>p.frage===f.frage));
  picked.push(...shuffle(rest).slice(0,30-picked.length));
  return shuffle(picked);
}
```
  Optionen jeder Frage vor Anzeige mischen (richtig-Index mitführen).
- [ ] **Step 4:** Test via Playwright (http.server aus Task 13): Modus 1 (S2 wählen, 3 Fragen beantworten, Feedback korrekt), Modus 2 (S1+S5, Start), Modus 3 kompletter Durchlauf: 30 Fragen antworten (per JS-Eval automatisiert), Abgeben → Ergebnis mit Note, Themen-Auswertung zeigt 8 Zeilen, Fragenliste aufklappbar. Konsole fehlerfrei. Zweiter Start → andere Fragenreihenfolge (Stichprobe).
- [ ] **Step 5:** Kachel-Text auf `index.html` prüfen (Link existiert bereits aus Task 13). Commit: `feat: Prüfungssimulator — einzeln/gebündelt/Simulation mit IHK-Bewertung`.

---

### Task 15: Audits und Gesamtvalidierung

**Files:**
- Create: `scripts/audit-links.js`, `scripts/validate-quiz.js`

**Interfaces:**
- Consumes: `scripts/config.js`, `loadQuizData` aus `scripts/build-quiz.js`.
- Produces: beide Skripte mit Exit-Code 0 = alles ok, 1 = Fehler (Liste auf stderr).

- [ ] **Step 1:** `scripts/audit-links.js`: für jede Session prüfen, dass im Session-Ordner existieren: `Tagesplan_`, `Handout_.tex+.pdf`, `Aufgaben_.md`, `Aufgabenheft_.tex+.pdf`, `Praesentation_.html`, `Quiz_.html`, `Karteikarten_.html`, `Memory_.html`, `Wordle_.html`, `Hangman_.html`, `Grundlagen_.pdf`, `Arbeitsbuch_.pdf` (PDF-Auszüge: nur Warnung, kein Fehler — sie sind lokal generiert). Zusätzlich: `index.html` einlesen und prüfen, dass jeder Session-Slug und `pruefungssimulator.html` darin vorkommen.
- [ ] **Step 2:** `scripts/validate-quiz.js`: via `loadQuizData` alle 8 Pools laden; prüfen: exakt 40 Fragen je Session, `richtig` ∈ 0..3, 4 nichtleere Optionen, `erklaerung` vorhanden, keine identische `frage` innerhalb einer Session UND über Sessions hinweg (Duplikat = Fehler mit beiden Fundstellen).
- [ ] **Step 3:** Alles bauen + auditieren:
```bash
node scripts/build-spiele-und-karten.js && node scripts/build-quiz.js && python3 scripts/build_tex.py
node scripts/audit-links.js && node scripts/validate-quiz.js && echo ALLES-OK
```
Expected: `ALLES-OK`. Gefundene Fehler beheben (fehlende Dateien nachziehen, Duplikate im entsprechenden Session-Task-Stil korrigieren), erneut laufen lassen.
- [ ] **Step 4:** Playwright-Smoke final: index (Gate→Kacheln→Abmelden), 1 Präsentation, 1 Quiz, 1 Wordle, 1 Memory, Simulator-Simulation — alle ohne Konsolen-Errors.
- [ ] **Step 5:** Commit: `test: Link-Audit + Quiz-Validierung, Gesamtbuild grün`.

---

### Task 16: Aufräumen, README, Sync in den Shared Folder

**Files:**
- Delete: `tag1-session1.html` … `tag4-session2.html`, `assets/app.js`, `assets/style.css`, `docs/session-template.html`
- Modify: `README.md`
- Create: `scripts/sync-to-shared.sh`

- [ ] **Step 1:** Vor dem Löschen prüfen, dass nichts Neues auf die alten Dateien verweist: `grep -rn "tag[1-4]-session\|assets/app.js\|assets/style.css" index.html pruefungssimulator.html Session-*/ scripts/*.js | grep -v Binary` → keine Treffer. (Treffer = erst Referenz fixen.) Dann löschen per `git rm`.
- [ ] **Step 2:** `README.md` neu: Projektziel, Ordnerstruktur (wie Spec), Build-Kommandos (`split_pdf.py`, `build-spiele-und-karten.js`, `build-quiz.js`, `build_tex.py`, Audits), Hinweis Verlagsmaterial nicht im Repo, Abschnitt „Neue Session ergänzen" (config.js erweitern → Daten anlegen → bauen).
- [ ] **Step 3:** `scripts/sync-to-shared.sh`:
```bash
#!/usr/bin/env bash
# Spiegelt das Projekt in den VirtualBox-Shared-Folder (ohne .git-Interna zu beschädigen).
set -euo pipefail
SRC="$HOME/IT_Lernfeld1/"
DST="/media/sf_Lernfeld_1/IT_Lernfeld1/"
rsync -av --exclude '.git/' "$SRC" "$DST"
cd "$DST" && git --git-dir="$DST/.git" config core.fileMode false 2>/dev/null || true
echo "Sync fertig: $DST"
```
  Hinweis: Das Ziel enthält bereits ein .git aus der Erstkopie — rsync lässt es unangetastet; danach einmal `cp -a ~/IT_Lernfeld1/.git "$DST"` NICHT nötig (Repo im Shared Folder bleibt Lesekopie; maßgeblich ist ~/IT_Lernfeld1). Skript ausführbar machen (`chmod +x`).
- [ ] **Step 4:** Audits erneut (`node scripts/audit-links.js && node scripts/validate-quiz.js`), dann `bash scripts/sync-to-shared.sh`. Verify: `ls /media/sf_Lernfeld_1/IT_Lernfeld1/Session-3_*/` zeigt vollen Artefakt-Satz; `index.html` dort im Browser öffnen → Gate + Kacheln funktionieren (file:// reicht für Struktur-Check; HEAD-Checks der Medien schlagen bei file:// still fehl — ok).
- [ ] **Step 5:** Commit: `chore: alte Plattform-Seiten entfernt, README + Sync-Skript` und Sync erneut ausführen (damit der letzte Commit-Stand gespiegelt ist).

---

## Self-Review (durchgeführt)

- **Spec-Abdeckung:** 8 Session-Ordner (T1, T5–12), Artefakt-Satz inkl. beider PDF-Auszüge (T1, T5–12), Kursseite mit Kacheln/Platzhaltern/Abmelden (T13), Prüfungssimulator 3 Modi + IHK-Bewertung + Themen-Auswertung (T14), Pipeline config-basiert ohne harte Pfade (T1–4), Audits/Playwright (T15), Sync + Aufräumen alter Seiten nach Abnahme (T16). Podcast/Video-Produktion und Beispiel-Repo-Änderungen: bewusst nicht enthalten (Spec „Nicht im Umfang").
- **Platzhalter-Scan:** Content-Tasks 5–12 definieren Format vollständig über Skeleton-Dateien (Task 1) + Muster-Pfade im Beispiel + Checklisten; Build-/Seiten-Tasks enthalten Code bzw. exakte Änderungsanweisungen mit Quellenangabe. Keine TBD/TODO.
- **Typ-Konsistenz:** `SESSIONS`/`folderOf` (T1) wird in T2, T3, T15 identisch konsumiert; `loadQuizData` (T3) in T15; Namensschema `<Art>_<Slug>` einheitlich in T1, T5–12, T13, T15; `day_id:"sN"` einheitlich T2-Schema und T5–12.
