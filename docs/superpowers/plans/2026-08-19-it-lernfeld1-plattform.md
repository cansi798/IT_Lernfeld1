# Lernplattform IT Lernfeld 1 — Implementierungsplan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Statische Lernplattform (GitHub Pages) für einen 4-tägigen Lernfeld-1-Kurs der IT-Berufe: 8 Session-Seiten mit Präsentation, Handout, Medien-Platzhaltern, Lernbereich-Aufgaben und je einem 40-Fragen-Quiz.

**Architecture:** Reines statisches HTML/CSS/JS ohne Build-System. Eine HTML-Seite pro Session (8 Stück) + `index.html` mit Zugangstor. Gemeinsame Logik in `assets/app.js` (Tor, Foliendeck, Medien-Erkennung, Quiz-Engine), Quizfragen als separate JS-Datendateien in `data/`.

**Tech Stack:** HTML5, CSS3, Vanilla JavaScript, GitHub Pages. Validierung mit `node -e`, lokaler Test mit `python3 -m http.server`.

**Spec:** `docs/superpowers/specs/2026-08-19-it-lernfeld1-plattform-design.md`

## Global Constraints

- **Arbeitsverzeichnis:** `/home/ki-ubuntu/IT_Lernfeld1` (Klon von `https://github.com/cansi798/IT_Lernfeld1.git`). NIEMALS unter `/media/sf_Lernfeld_1` arbeiten — vboxsf verträgt kein git. Git-Identität ist repo-lokal bereits gesetzt.
- **Quelltexte (nicht im Repo):** `~/IT_Lernfeld1_quellen/lehrbuch.txt` und `~/IT_Lernfeld1_quellen/arbeitsbuch.txt`. Falls fehlend, neu erzeugen mit:
  `pdftotext -layout "/media/sf_Lernfeld_1/Lernfeld 1.pdf" ~/IT_Lernfeld1_quellen/lehrbuch.txt` bzw.
  `pdftotext -layout "/media/sf_Lernfeld_1/Lernfeld1_Arbeitsbuch (optional).pdf" ~/IT_Lernfeld1_quellen/arbeitsbuch.txt`.
  Seitenscharfe Auszüge: `pdftotext -layout -f <von> -l <bis> "<PDF>" -`.
- **Zugangscode:** `Lernfeld1` (Vergleich case-insensitiv, also `lernfeld1`).
- **Fußzeile auf JEDER Seite exakt:** `Lernfeld 1 Fachinformatiker · © Can Siebert 2026 · Material nur für unterrichtliche Zwecke im Rahmen des Kurses`. Die Zeichenfolge „BFW" darf NIRGENDS vorkommen (Audit: `grep -ri "bfw" *.html assets/ data/` muss leer sein).
- **Sprache aller Inhalte:** Deutsch, Anrede „Sie".
- **Urheberrecht:** Alle Texte (Folien, Handouts, Aufgaben, Quizfragen) werden aus den Quellen fachlich erarbeitet, aber EIGENSTÄNDIG formuliert — keine wörtliche Übernahme ganzer Absätze. Keine PDFs ins Repo (`.gitignore` enthält `*.pdf`).
- **Fachliche Prüfung:** Beim Adaptieren von Aufgaben Fakten prüfen (BBiG, JArbSchG, Rechtsformen, IT-Berufe-Neuordnung 2020, Wirtschaftskreislauf). Gefundene Fehler in Buch/Arbeitsbuch nach `docs/errata.md` (Format siehe Task 1) UND auf der Plattform korrigiert umsetzen.
- **Quiz-Kontrakt:** Jede Datei `data/quiz-tNsM.js` definiert `window.QUIZ_DATA = { titel, fragen }` mit exakt 40 Fragen: `{ frage, optionen (4 Strings, alle verschieden), richtig (Index 0–3), erklaerung }`. Antwortverteilung: jeder Index mindestens 5-mal richtig. Keine doppelten Fragen.
- **Mediendateien-Konvention:** `media/tagN-sessionM-video.mp4`, `media/tagN-sessionM-podcast.mp3` (N=1–4, M=1–2). Werden später manuell hochgeladen — Code muss ohne sie funktionieren.
- **Commits:** Deutsche Commit-Messages, Abschluss jeder Task-Nummer = eigener Commit mit
  `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`.

## Kursstruktur-Referenz (für alle Tasks)

| Session | Datei | Quizdatei | Thema | Lehrbuch (PDF-Seiten) | Arbeitsbuch (PDF-Seiten) |
|---|---|---|---|---|---|
| Tag 1 · S1 | `tag1-session1.html` | `data/quiz-t1s1.js` | IT-Berufe & duales System (Kap. 1.1) | 2–12 | LS1: 5–30 (Teil Berufe/System) |
| Tag 1 · S2 | `tag1-session2.html` | `data/quiz-t1s2.js` | Rechte & Pflichten, Arbeitsrecht, Berufsplanung (Kap. 1.2) | 13–31 | LS1: 5–30 (Teil Rechte/Planung) |
| Tag 2 · S1 | `tag2-session1.html` | `data/quiz-t2s1.js` | Betrieb & Unternehmen, JIKU, Unternehmensziele (Kap. 1.3.1–1.3.3) | 32–56 | LS2: 31–82 (Teil Betrieb/Ziele) |
| Tag 2 · S2 | `tag2-session2.html` | `data/quiz-t2s2.js` | Rechtsformen & Aufbauorganisation (Kap. 1.3.4) | 57–71 | LS2: 31–82 (Teil Rechtsformen/Organisation) |
| Tag 3 · S1 | `tag3-session1.html` | `data/quiz-t3s1.js` | Geschäftsprozesse, Produktionsfaktoren, Güterarten (Kap. 1.3.5–1.3.6) | 72–84 | LS2: 31–82 (Teil Prozesse/Faktoren) |
| Tag 3 · S2 | `tag3-session2.html` | `data/quiz-t3s2.js` | Wirtschaftskreislauf & Marktsituationen (Kap. 1.4) | 85–97 | LS2: 31–82 (Teil Markt/Kreislauf) |
| Tag 4 · S1 | `tag4-session1.html` | `data/quiz-t4s1.js` | Präsentation vorbereiten & planen (Kap. 1.5.1–1.5.2) | 98–107 | LS2: 31–82 (Teil Präsentation) |
| Tag 4 · S2 | `tag4-session2.html` | `data/quiz-t4s2.js` | Präsentieren, Reflexion + Gesamtwiederholung (Kap. 1.5.3 + alle) | 108 + 2–107 (Wdh.) | LS2: 31–82 (Teil Reflexion) |

Die passenden Arbeitsbuch-Aufgaben je Session per Stichwortsuche finden, z. B.:
`grep -n -i "rechtsform\|GmbH\|Organigramm" ~/IT_Lernfeld1_quellen/arbeitsbuch.txt`

## Wiederverwendete Prüfkommandos

**Quiz-Validierung** (im Repo-Root ausführen, Dateiname anpassen):

```bash
node -e '
const fs=require("fs");const window={};
eval(fs.readFileSync(process.argv[1],"utf8"));
const q=window.QUIZ_DATA,f=q.fragen;
if(typeof q.titel!=="string"||!q.titel)throw new Error("titel fehlt");
if(f.length!==40)throw new Error("Fragenzahl: "+f.length+" statt 40");
const seen=new Set(),dist=[0,0,0,0];
f.forEach((x,i)=>{
 if(typeof x.frage!=="string"||x.frage.length<10)throw new Error("Frage "+(i+1)+": Text fehlt/zu kurz");
 if(!Array.isArray(x.optionen)||x.optionen.length!==4)throw new Error("Frage "+(i+1)+": braucht genau 4 Optionen");
 if(new Set(x.optionen).size!==4)throw new Error("Frage "+(i+1)+": doppelte Optionen");
 if(!Number.isInteger(x.richtig)||x.richtig<0||x.richtig>3)throw new Error("Frage "+(i+1)+": richtig ungueltig");
 if(typeof x.erklaerung!=="string"||x.erklaerung.length<10)throw new Error("Frage "+(i+1)+": Erklaerung fehlt/zu kurz");
 if(seen.has(x.frage))throw new Error("Frage "+(i+1)+": Duplikat");
 seen.add(x.frage);dist[x.richtig]++;
});
if(Math.min(...dist)<5)throw new Error("Antwortverteilung unausgewogen: "+dist);
console.log("OK:",process.argv[1],"— 40 Fragen, Verteilung",dist.join("/"));
' data/quiz-t1s1.js
```

**Seiten-Validierung** (Dateiname anpassen; Muster `class="slide` ohne schließendes Anführungszeichen, damit auch `class="slide aktiv"` zählt):

```bash
f=tag1-session1.html
test "$(grep -c 'class="slide' $f)" -ge 12 && echo "FOLIEN-OK ($(grep -c 'class="slide' $f))"
test "$(grep -c '<details' $f)" -ge 6 && echo "AUFGABEN-OK ($(grep -c '<details' $f))"
grep -q 'Lernfeld 1 Fachinformatiker' $f && ! grep -qi 'bfw' $f && echo FOOTER-OK
grep -q "data/quiz-" $f && echo QUIZ-EINGEBUNDEN
grep -q 'data-session=' $f && echo SESSION-ATTR-OK
```

**Rauchtest** (Session-Seite + Quizdatei anpassen):

```bash
cd ~/IT_Lernfeld1 && python3 -m http.server 8123 >/dev/null 2>&1 & sleep 1
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:8123/tag1-session1.html   # erwartet: 200
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:8123/data/quiz-t1s1.js    # erwartet: 200
kill %1
node --check data/quiz-t1s1.js   # gültige Syntax (window.-Zuweisung parst auch in Node)
```

**Aufgaben-Markup** (verbindliche Struktur jedes `{{AUFGABEN}}`-Blocks; Text jeweils eigenständig formuliert):

```html
<div class="aufgabe">
  <p><span class="aufgabe-nr">Aufgabe 1:</span> Aufgabentext in eigener Formulierung …</p>
  <details><summary>Lösungshinweis anzeigen</summary>
    <div>Musterlösung bzw. Lösungshinweis …</div>
  </details>
</div>
```

---

### Task 1: Grundgerüst — Index, Styles, App-Logik, Vorlage

**Files:**
- Create: `.gitignore`
- Create: `README.md` (überschreiben — enthält nur den Initial-Platzhalter)
- Create: `media/README.md`
- Create: `docs/errata.md`
- Create: `assets/style.css`
- Create: `assets/app.js`
- Create: `index.html`
- Create: `docs/session-template.html`

**Interfaces:**
- Produces: `assets/app.js` erwartet auf Session-Seiten: `<body data-session="tagN-sessionM">`, Elemente mit IDs `slides`, `slideCounter`, `slidePrev`, `slideNext`, `videoSlot`, `podcastSlot`, `quizStart`, `quizOverlay`, `quizInhalt` sowie eine eingebundene Quizdatei, die `window.QUIZ_DATA` setzt. Auf der Indexseite: IDs `gate`, `gateForm`, `gateInput`, `gateError`, `tagGrid`.
- Produces: `docs/session-template.html` — Kopiervorlage für Tasks 2–9 mit Slots `{{TITEL}}`, `{{TAG_SESSION_LABEL}}`, `{{SESSION_SLUG}}`, `{{KAPITEL}}`, `{{LERNZIELE_LIS}}`, `{{SLIDES}}`, `{{HANDOUT}}`, `{{AUFGABEN}}`, `{{QUIZDATEI}}`.
- Produces: localStorage-Schlüssel `it_lf1_unlocked` (Wert `'1'`).

- [ ] **Step 1: `.gitignore` anlegen**

```gitignore
*.pdf
*.log
.DS_Store
```

- [ ] **Step 2: `media/README.md` anlegen**

```markdown
# Medien — Videos & Podcasts

Hier werden die Video- und Audiodateien abgelegt. Die Session-Seiten
erkennen die Dateien automatisch — **kein Codeeingriff nötig**, einfach
Datei hochladen, committen, pushen.

## Namenskonvention (verbindlich)

| Session | Video | Podcast |
|---|---|---|
| Tag 1 · Session 1 | `tag1-session1-video.mp4` | `tag1-session1-podcast.mp3` |
| Tag 1 · Session 2 | `tag1-session2-video.mp4` | `tag1-session2-podcast.mp3` |
| Tag 2 · Session 1 | `tag2-session1-video.mp4` | `tag2-session1-podcast.mp3` |
| Tag 2 · Session 2 | `tag2-session2-video.mp4` | `tag2-session2-podcast.mp3` |
| Tag 3 · Session 1 | `tag3-session1-video.mp4` | `tag3-session1-podcast.mp3` |
| Tag 3 · Session 2 | `tag3-session2-video.mp4` | `tag3-session2-podcast.mp3` |
| Tag 4 · Session 1 | `tag4-session1-video.mp4` | `tag4-session1-podcast.mp3` |
| Tag 4 · Session 2 | `tag4-session2-video.mp4` | `tag4-session2-podcast.mp3` |

Solange eine Datei fehlt, zeigt die Seite „folgt in Kürze".
Hinweis: GitHub begrenzt Dateien auf 100 MB; Videos ggf. komprimieren.
```

- [ ] **Step 3: `docs/errata.md` anlegen**

```markdown
# Errata — gefundene Fehler in Lehrbuch und Arbeitsbuch

Beim Erarbeiten der Plattforminhalte gefundene fachliche Fehler.
Auf der Plattform sind alle Inhalte in **korrigierter** Form umgesetzt.

Format je Eintrag:

## [Quelle] Seite X, [Kapitel/Aufgabe]
- **Fundstelle:** …
- **Fehler:** …
- **Korrektur:** …
- **Begründung/Beleg:** …

---

*(Einträge folgen während der Content-Erstellung; bleibt der Abschnitt
leer, wurden keine Fehler gefunden.)*
```

- [ ] **Step 4: `assets/style.css` anlegen**

```css
/* Lernfeld 1 Fachinformatiker — gemeinsames Design */
:root {
  --lf1-primary:#1D4ED8; --lf1-primary-dark:#1E3A8A;
  --lf1-accent:#F59E0B; --lf1-success:#10B981; --lf1-danger:#EF4444;
  --lf1-ink:#0F172A; --lf1-ink-soft:#475569;
  --lf1-bg:#F8FAFC; --lf1-bg-blue:#EFF6FF; --lf1-bg-amber:#FEF3C7;
  --lf1-border:#E2E8F0;
}
* { box-sizing:border-box; margin:0; padding:0; }
body {
  font-family:'Inter',system-ui,-apple-system,'Segoe UI',sans-serif;
  background:linear-gradient(135deg,var(--lf1-bg-blue) 0%,var(--lf1-bg) 50%,var(--lf1-bg-amber) 100%);
  min-height:100vh; color:var(--lf1-ink); display:flex; flex-direction:column;
  -webkit-font-smoothing:antialiased;
}
main { flex:1; width:100%; max-width:980px; margin:0 auto; padding:2rem 1.2rem; }
h1 { color:var(--lf1-primary-dark); letter-spacing:-0.01em; }
h2 { color:var(--lf1-primary-dark); margin-bottom:0.8rem; }
a { color:var(--lf1-primary-dark); }

/* Kopfbereich */
.seitenkopf { text-align:center; margin-bottom:2rem; }
.seitenkopf .untertitel { color:var(--lf1-ink-soft); margin-top:0.4rem; }
.zurueck { display:inline-block; margin-bottom:1rem; text-decoration:none; font-weight:600; }

/* Zugangstor */
.gate { max-width:420px; margin:3rem auto; background:white; border:1px solid var(--lf1-border);
  border-radius:18px; padding:2rem 1.8rem; box-shadow:0 4px 16px rgba(15,23,42,0.06); text-align:center; }
.gate p { color:var(--lf1-ink-soft); margin-bottom:1.2rem; }
.gate-form { display:flex; flex-direction:column; gap:0.7rem; }
.gate input { padding:0.8rem 1rem; font-size:1.05rem; border:1.5px solid var(--lf1-border);
  border-radius:10px; font-family:inherit; text-align:center; }
.gate input:focus { outline:none; border-color:var(--lf1-primary); }
.gate button { padding:0.8rem 1rem; font-size:1.02rem; font-weight:700; border:none;
  border-radius:10px; cursor:pointer; background:var(--lf1-primary); color:white; }
.gate button:hover { background:var(--lf1-primary-dark); }
.gate-error { color:var(--lf1-danger); font-size:0.9rem; min-height:1.1em; }

/* Tages-/Sessionkarten (Index) */
.tag-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(300px,1fr)); gap:1.4rem; }
.tag-card { background:white; border:1px solid var(--lf1-border); border-radius:18px;
  padding:1.6rem 1.5rem; box-shadow:0 4px 16px rgba(15,23,42,0.04); position:relative; overflow:hidden; }
.tag-card::before { content:''; position:absolute; top:0; left:0; right:0; height:5px;
  background:linear-gradient(90deg,var(--lf1-primary) 0%,var(--lf1-accent) 100%); }
.tag-nummer { display:inline-block; background:var(--lf1-bg-blue); color:var(--lf1-primary-dark);
  font-weight:700; font-size:0.78rem; padding:0.28rem 0.75rem; border-radius:999px;
  text-transform:uppercase; letter-spacing:0.05em; margin-bottom:0.8rem; }
.tag-card h2 { font-size:1.15rem; margin-bottom:0.9rem; }
.session-link { display:block; padding:0.7rem 0.9rem; margin-top:0.5rem; border:1px solid var(--lf1-border);
  border-radius:10px; text-decoration:none; font-weight:600; transition:all 0.15s; }
.session-link:hover { border-color:var(--lf1-primary); background:var(--lf1-bg-blue); }
.session-link small { display:block; font-weight:400; color:var(--lf1-ink-soft); }

/* Session-Seiten: Abschnitte */
section { background:white; border:1px solid var(--lf1-border); border-radius:18px;
  padding:1.6rem 1.5rem; margin-bottom:1.5rem; box-shadow:0 4px 16px rgba(15,23,42,0.04); }
section ul, section ol { padding-left:1.3rem; line-height:1.7; }
section p { line-height:1.65; margin-bottom:0.8rem; }
section table { border-collapse:collapse; width:100%; margin:0.8rem 0; }
section th, section td { border:1px solid var(--lf1-border); padding:0.5rem 0.7rem; text-align:left; }
section th { background:var(--lf1-bg-blue); }

/* Foliendeck */
.slides { position:relative; min-height:340px; border:1px solid var(--lf1-border);
  border-radius:12px; background:var(--lf1-bg); overflow:hidden; }
.slide { display:none; padding:1.6rem 1.8rem; }
.slide.aktiv { display:block; }
.slide h3 { color:var(--lf1-primary-dark); margin-bottom:0.8rem; font-size:1.25rem; }
.slide ul { padding-left:1.3rem; line-height:1.8; }
.slide li { margin-bottom:0.35rem; }
.slide-nav { display:flex; align-items:center; justify-content:center; gap:1rem; margin-top:0.9rem; }
.slide-nav button { padding:0.55rem 1.2rem; border:none; border-radius:10px; cursor:pointer;
  background:var(--lf1-primary); color:white; font-weight:700; font-size:0.95rem; }
.slide-nav button:hover { background:var(--lf1-primary-dark); }
#slideCounter { color:var(--lf1-ink-soft); font-variant-numeric:tabular-nums; }

/* Medien */
.medien-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:1.2rem; }
.medien-slot { border:1.5px dashed var(--lf1-border); border-radius:12px; padding:1.2rem;
  text-align:center; color:var(--lf1-ink-soft); background:var(--lf1-bg); }
.medien-slot h3 { color:var(--lf1-ink); margin-bottom:0.5rem; }

/* Aufgaben */
.aufgabe { border:1px solid var(--lf1-border); border-radius:12px; padding:1rem 1.2rem; margin-bottom:0.9rem; }
.aufgabe .aufgabe-nr { font-weight:700; color:var(--lf1-primary-dark); }
.aufgabe details { margin-top:0.6rem; }
.aufgabe summary { cursor:pointer; font-weight:600; color:var(--lf1-primary-dark); }
.aufgabe details > div { margin-top:0.5rem; padding:0.7rem 0.9rem; background:var(--lf1-bg-blue);
  border-radius:8px; line-height:1.6; }

/* Quiz */
.quiz-start-box { text-align:center; }
#quizStart { padding:0.9rem 2rem; font-size:1.05rem; font-weight:700; border:none; border-radius:12px;
  cursor:pointer; background:var(--lf1-accent); color:var(--lf1-ink); }
#quizStart:hover { filter:brightness(0.95); }
.quiz-overlay { display:none; position:fixed; inset:0; background:rgba(15,23,42,0.6);
  z-index:50; padding:1.2rem; overflow-y:auto; }
.quiz-overlay.offen { display:flex; align-items:flex-start; justify-content:center; }
.quiz-modal { background:white; border-radius:18px; max-width:680px; width:100%;
  margin:2rem auto; padding:1.6rem 1.6rem 1.8rem; }
.quiz-kopf { display:flex; justify-content:space-between; align-items:center;
  color:var(--lf1-ink-soft); margin-bottom:0.6rem; }
.quiz-schliessen { border:none; background:none; font-size:1.2rem; cursor:pointer; color:var(--lf1-ink-soft); }
.quiz-fortschritt { height:6px; background:var(--lf1-border); border-radius:999px; margin-bottom:1.1rem; }
.quiz-fortschritt div { height:100%; background:var(--lf1-primary); border-radius:999px; transition:width 0.2s; }
.quiz-frage { font-weight:600; font-size:1.08rem; margin-bottom:1rem; line-height:1.5; }
.quiz-optionen { display:flex; flex-direction:column; gap:0.6rem; }
.quiz-option { text-align:left; padding:0.75rem 1rem; border:1.5px solid var(--lf1-border);
  border-radius:10px; background:white; cursor:pointer; font-size:0.98rem; font-family:inherit; }
.quiz-option:hover:not(:disabled) { border-color:var(--lf1-primary); background:var(--lf1-bg-blue); }
.quiz-option.richtig { border-color:var(--lf1-success); background:#ECFDF5; }
.quiz-option.falsch { border-color:var(--lf1-danger); background:#FEF2F2; }
.quiz-feedback p { margin:0.9rem 0 0.7rem; line-height:1.55; }
.quiz-weiter { padding:0.6rem 1.4rem; border:none; border-radius:10px; cursor:pointer;
  background:var(--lf1-primary); color:white; font-weight:700; }
.quiz-weiter.alt { background:var(--lf1-ink-soft); }
.quiz-ergebnis { text-align:center; }
.quiz-punkte { font-size:1.4rem; font-weight:700; color:var(--lf1-primary-dark); margin:0.8rem 0; }

/* Fußzeile */
footer { text-align:center; padding:1.8rem 1.2rem; color:var(--lf1-ink-soft); font-size:0.85rem; line-height:1.6; }

/* Druck: nur das Handout */
@media print {
  body { background:white; }
  header, footer, .zurueck, main > section:not(#handout), .slide-nav { display:none !important; }
  main { max-width:100%; padding:0; }
  #handout { border:none; box-shadow:none; }
  #handout .druck-knopf { display:none; }
}
@media (max-width:640px) {
  .slide { padding:1.1rem 1rem; }
  main { padding:1.2rem 0.8rem; }
}
```

- [ ] **Step 5: `assets/app.js` anlegen**

```js
/* Lernfeld 1 Fachinformatiker — gemeinsame Logik aller Seiten */

const LF1 = {
  code: 'lernfeld1',               // Zugangscode (Vergleich kleingeschrieben)
  storageKey: 'it_lf1_unlocked'
};

/* ---------- Zugangstor (nur index.html) ---------- */
function initGate() {
  const gate = document.getElementById('gate');
  const grid = document.getElementById('tagGrid');
  if (!gate || !grid) return;
  const form = document.getElementById('gateForm');
  const input = document.getElementById('gateInput');
  const error = document.getElementById('gateError');

  function freischalten() {
    localStorage.setItem(LF1.storageKey, '1');
    gate.style.display = 'none';
    grid.style.display = 'grid';
  }

  if (localStorage.getItem(LF1.storageKey) === '1') { freischalten(); return; }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value.trim().toLowerCase() === LF1.code) {
      error.textContent = '';
      freischalten();
    } else {
      error.textContent = 'Falscher Zugangscode. Bitte erneut versuchen.';
      input.value = '';
      input.focus();
    }
  });
}

/* ---------- Session-Schutz ---------- */
function guardSession() {
  if (localStorage.getItem(LF1.storageKey) !== '1') location.href = 'index.html';
}

/* ---------- Foliendeck ---------- */
function initSlides() {
  const deck = document.getElementById('slides');
  if (!deck) return;
  const slides = Array.from(deck.querySelectorAll('.slide'));
  const counter = document.getElementById('slideCounter');
  let idx = 0;
  function zeige(i) {
    idx = Math.max(0, Math.min(slides.length - 1, i));
    slides.forEach((s, n) => s.classList.toggle('aktiv', n === idx));
    counter.textContent = (idx + 1) + ' / ' + slides.length;
  }
  document.getElementById('slidePrev').addEventListener('click', () => zeige(idx - 1));
  document.getElementById('slideNext').addEventListener('click', () => zeige(idx + 1));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') zeige(idx - 1);
    if (e.key === 'ArrowRight') zeige(idx + 1);
  });
  zeige(0);
}

/* ---------- Medien-Erkennung (Video/Podcast folgen später) ---------- */
function initMedia() {
  const session = document.body.dataset.session;
  if (!session) return;
  pruefeMedium('media/' + session + '-video.mp4', 'videoSlot', 'video');
  pruefeMedium('media/' + session + '-podcast.mp3', 'podcastSlot', 'audio');
}
function pruefeMedium(url, slotId, tag) {
  const slot = document.getElementById(slotId);
  if (!slot) return;
  fetch(url, { method: 'HEAD' }).then((res) => {
    if (!res.ok) return;
    const el = document.createElement(tag);
    el.controls = true;
    el.src = url;
    el.style.width = '100%';
    slot.innerHTML = '';
    slot.appendChild(el);
  }).catch(() => { /* Datei fehlt oder file:// — Platzhalter bleibt stehen */ });
}

/* ---------- Quiz ---------- */
function initQuiz() {
  const startBtn = document.getElementById('quizStart');
  const overlay = document.getElementById('quizOverlay');
  if (!startBtn || !overlay || !window.QUIZ_DATA) return;
  const inhalt = document.getElementById('quizInhalt');
  const fragen = window.QUIZ_DATA.fragen;
  let idx = 0, punkte = 0;

  function start() {
    idx = 0; punkte = 0;
    overlay.classList.add('offen');
    zeigeFrage();
  }
  function zeigeFrage() {
    const f = fragen[idx];
    inhalt.innerHTML =
      '<div class="quiz-kopf"><span>Frage ' + (idx + 1) + ' / ' + fragen.length + '</span>' +
      '<button type="button" class="quiz-schliessen" id="quizAbbruch">✕</button></div>' +
      '<div class="quiz-fortschritt"><div style="width:' + (idx / fragen.length * 100) + '%"></div></div>' +
      '<p class="quiz-frage">' + f.frage + '</p>' +
      '<div class="quiz-optionen">' +
      f.optionen.map((o, n) => '<button type="button" class="quiz-option" data-n="' + n + '">' + o + '</button>').join('') +
      '</div><div class="quiz-feedback" id="quizFeedback"></div>';
    document.getElementById('quizAbbruch').addEventListener('click', schliessen);
    inhalt.querySelectorAll('.quiz-option').forEach((btn) => btn.addEventListener('click', () => antworte(btn)));
  }
  function antworte(btn) {
    const f = fragen[idx];
    const n = Number(btn.dataset.n);
    inhalt.querySelectorAll('.quiz-option').forEach((b) => {
      b.disabled = true;
      if (Number(b.dataset.n) === f.richtig) b.classList.add('richtig');
    });
    if (n === f.richtig) { punkte++; } else { btn.classList.add('falsch'); }
    const fb = document.getElementById('quizFeedback');
    fb.innerHTML = '<p>' + (n === f.richtig ? '✅ Richtig! ' : '❌ Leider falsch. ') + f.erklaerung + '</p>' +
      '<button type="button" class="quiz-weiter" id="quizWeiter">' +
      (idx + 1 < fragen.length ? 'Weiter →' : 'Zur Auswertung →') + '</button>';
    document.getElementById('quizWeiter').addEventListener('click', () => {
      idx++;
      if (idx < fragen.length) zeigeFrage(); else zeigeErgebnis();
    });
  }
  function zeigeErgebnis() {
    const prozent = Math.round(punkte / fragen.length * 100);
    inhalt.innerHTML =
      '<div class="quiz-ergebnis"><h3>Auswertung</h3>' +
      '<p class="quiz-punkte">' + punkte + ' von ' + fragen.length + ' richtig (' + prozent + ' %)</p>' +
      '<p>' + (prozent >= 80 ? 'Stark! Sie beherrschen den Stoff.' :
               prozent >= 50 ? 'Gute Basis — wiederholen Sie die Erklärungen zu den falsch beantworteten Fragen.' :
               'Arbeiten Sie Handout und Präsentation noch einmal durch und versuchen Sie es erneut.') + '</p>' +
      '<button type="button" class="quiz-weiter" id="quizNochmal">Nochmal</button> ' +
      '<button type="button" class="quiz-weiter alt" id="quizZu">Schließen</button></div>';
    document.getElementById('quizNochmal').addEventListener('click', start);
    document.getElementById('quizZu').addEventListener('click', schliessen);
  }
  function schliessen() { overlay.classList.remove('offen'); }
  startBtn.addEventListener('click', start);
}

/* ---------- Start ---------- */
document.addEventListener('DOMContentLoaded', () => {
  initGate();
  if (document.body.dataset.session) {
    guardSession();
    initSlides();
    initMedia();
    initQuiz();
  }
});
```

- [ ] **Step 6: `index.html` anlegen**

```html
<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<title>Lernfeld 1 Fachinformatiker — Kursübersicht</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="assets/style.css">
</head>
<body>

<main>
  <div class="seitenkopf">
    <h1>Lernfeld 1 — Das Unternehmen und die eigene Rolle im Betrieb beschreiben</h1>
    <p class="untertitel">4 Kurstage · 8 Sessions · Präsentationen, Handouts, Aufgaben &amp; Quizze</p>
  </div>

  <div class="gate" id="gate">
    <p>Bitte geben Sie Ihren Kurs-Zugangscode ein.</p>
    <form class="gate-form" id="gateForm" autocomplete="off">
      <input type="password" id="gateInput" placeholder="Zugangscode" autocomplete="off" required autofocus>
      <button type="submit">Zum Kurs →</button>
      <div class="gate-error" id="gateError"></div>
    </form>
  </div>

  <div class="tag-grid" id="tagGrid" style="display:none;">

    <div class="tag-card">
      <span class="tag-nummer">Tag 1</span>
      <h2>Ausbildung &amp; eigene Rolle</h2>
      <a class="session-link" href="tag1-session1.html">Session 1: IT-Berufe &amp; duales System
        <small>Kapitel 1.1 — Berufsbilder, Beteiligte, Lernorte</small></a>
      <a class="session-link" href="tag1-session2.html">Session 2: Rechte &amp; Pflichten in der Ausbildung
        <small>Kapitel 1.2 — BBiG, JArbSchG, Mitbestimmung, Berufsplanung</small></a>
    </div>

    <div class="tag-card">
      <span class="tag-nummer">Tag 2</span>
      <h2>Betrieb, Ziele &amp; Organisation</h2>
      <a class="session-link" href="tag2-session1.html">Session 1: Betrieb &amp; Unternehmen
        <small>Kapitel 1.3.1–1.3.3 — Modellunternehmen, Umfeld, Unternehmensziele</small></a>
      <a class="session-link" href="tag2-session2.html">Session 2: Rechtsformen &amp; Aufbauorganisation
        <small>Kapitel 1.3.4 — GmbH, AG &amp; Co., Organigramme</small></a>
    </div>

    <div class="tag-card">
      <span class="tag-nummer">Tag 3</span>
      <h2>Prozesse, Faktoren &amp; Markt</h2>
      <a class="session-link" href="tag3-session1.html">Session 1: Geschäftsprozesse &amp; Produktionsfaktoren
        <small>Kapitel 1.3.5–1.3.6 — Wertschöpfung, Güterarten</small></a>
      <a class="session-link" href="tag3-session2.html">Session 2: Wirtschaftskreislauf &amp; Markt
        <small>Kapitel 1.4 — Kreisläufe, Marktsituationen</small></a>
    </div>

    <div class="tag-card">
      <span class="tag-nummer">Tag 4</span>
      <h2>Den Ausbildungsbetrieb präsentieren</h2>
      <a class="session-link" href="tag4-session1.html">Session 1: Präsentation vorbereiten &amp; planen
        <small>Kapitel 1.5.1–1.5.2 — Teamarbeit, Medien, Aufbau</small></a>
      <a class="session-link" href="tag4-session2.html">Session 2: Präsentieren &amp; reflektieren
        <small>Kapitel 1.5.3 — Feedback, Reflexion + Gesamtwiederholung</small></a>
    </div>

  </div>
</main>

<footer>
  Lernfeld 1 Fachinformatiker · © Can Siebert 2026 · Material nur für unterrichtliche Zwecke im Rahmen des Kurses<br>
  <a href="https://github.com/cansi798/IT_Lernfeld1">github.com/cansi798/IT_Lernfeld1</a>
</footer>

<script src="assets/app.js"></script>
</body>
</html>
```

- [ ] **Step 7: `docs/session-template.html` anlegen** (Kopiervorlage für Tasks 2–9; `{{…}}`-Slots werden dort ersetzt)

```html
<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<title>{{TITEL}} — Lernfeld 1 Fachinformatiker</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="assets/style.css">
</head>
<body data-session="{{SESSION_SLUG}}">

<main>
  <a class="zurueck" href="index.html">← Zur Kursübersicht</a>
  <div class="seitenkopf">
    <h1>{{TITEL}}</h1>
    <p class="untertitel">{{TAG_SESSION_LABEL}} · Lehrbuch {{KAPITEL}}</p>
  </div>

  <section id="lernziele">
    <h2>🎯 Lernziele &amp; Überblick</h2>
    <ul>
{{LERNZIELE_LIS}}
    </ul>
  </section>

  <section id="praesentation">
    <h2>📊 Präsentation</h2>
    <div class="slides" id="slides">
{{SLIDES}}
    </div>
    <div class="slide-nav">
      <button type="button" id="slidePrev">← Zurück</button>
      <span id="slideCounter">1 / 1</span>
      <button type="button" id="slideNext">Weiter →</button>
    </div>
  </section>

  <section id="handout">
    <h2>📄 Handout</h2>
    <p class="druck-knopf"><button type="button" onclick="window.print()" class="quiz-weiter">🖨️ Handout drucken</button></p>
{{HANDOUT}}
  </section>

  <section id="medien">
    <h2>🎬 Video &amp; Podcast</h2>
    <div class="medien-grid">
      <div class="medien-slot" id="videoSlot">
        <h3>Video</h3>
        <p>folgt in Kürze</p>
      </div>
      <div class="medien-slot" id="podcastSlot">
        <h3>Podcast</h3>
        <p>folgt in Kürze</p>
      </div>
    </div>
  </section>

  <section id="aufgaben">
    <h2>✏️ Lernbereich-Aufgaben</h2>
{{AUFGABEN}}
  </section>

  <section id="quiz">
    <h2>🧠 Quiz</h2>
    <div class="quiz-start-box">
      <p>40 Fragen zum Stoff dieser Session — mit Sofort-Feedback und Erklärungen.</p>
      <p><button type="button" id="quizStart">Quiz starten</button></p>
    </div>
  </section>
</main>

<div class="quiz-overlay" id="quizOverlay">
  <div class="quiz-modal" id="quizInhalt"></div>
</div>

<footer>
  Lernfeld 1 Fachinformatiker · © Can Siebert 2026 · Material nur für unterrichtliche Zwecke im Rahmen des Kurses<br>
  <a href="https://github.com/cansi798/IT_Lernfeld1">github.com/cansi798/IT_Lernfeld1</a>
</footer>

<script src="data/{{QUIZDATEI}}"></script>
<script src="assets/app.js"></script>
</body>
</html>
```

- [ ] **Step 8: `README.md` (Repo-Root) überschreiben**

```markdown
# IT Lernfeld 1 — Lernplattform

Kursplattform für **Lernfeld 1: „Das Unternehmen und die eigene Rolle im
Betrieb beschreiben"** (IT-Berufe / Fachinformatiker).

🌐 **Live über GitHub Pages:** https://cansi798.github.io/IT_Lernfeld1/
(Zugangscode: `Lernfeld1`)

## Aufbau

4 Kurstage × 2 Sessions. Jede Session bietet: Präsentation (Foliendeck im
Browser), druckbares Handout, Video- & Podcast-Bereich, Lernbereich-Aufgaben
mit Lösungshinweisen und ein 40-Fragen-Quiz.

| Tag | Sessions | Lehrbuch-Kapitel |
|---|---|---|
| 1 | IT-Berufe & duales System · Rechte & Pflichten | 1.1 / 1.2 |
| 2 | Betrieb & Unternehmen · Rechtsformen & Organisation | 1.3.1–1.3.4 |
| 3 | Prozesse & Produktionsfaktoren · Wirtschaftskreislauf & Markt | 1.3.5–1.4 |
| 4 | Präsentation vorbereiten · Präsentieren & Reflexion | 1.5 |

## Videos & Podcasts nachrüsten

Dateien nach `media/` hochladen (Namenskonvention siehe `media/README.md`),
committen, pushen — die Seiten erkennen sie automatisch.

## Hinweise

- Verlagsmaterial (Lehrbuch-/Arbeitsbuch-PDFs) ist **nicht** im Repo
  (`.gitignore`); alle Inhalte sind eigenständig formuliert.
- Gefundene Fehler der Quellen: siehe `docs/errata.md`.
- Design-Dokument: `docs/superpowers/specs/2026-08-19-it-lernfeld1-plattform-design.md`
```

- [ ] **Step 9: Prüfen — Syntax & lokaler Rauchtest**

```bash
cd ~/IT_Lernfeld1
node --check assets/app.js && echo JS-OK
python3 -m http.server 8123 >/dev/null 2>&1 &
sleep 1
curl -s http://localhost:8123/index.html | grep -q 'Lernfeld 1 Fachinformatiker' && echo INDEX-OK
curl -s http://localhost:8123/assets/style.css | head -1
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:8123/assets/app.js   # erwartet: 200
kill %1
grep -ri "bfw" *.html assets/ docs/errata.md media/ && echo "AUDIT-FEHLER" || echo "AUDIT-OK (kein BFW)"
```

Erwartung: `JS-OK`, `INDEX-OK`, `200`, `AUDIT-OK`.

- [ ] **Step 10: Commit**

```bash
cd ~/IT_Lernfeld1
git add .gitignore README.md media/ docs/ assets/ index.html
git commit -m "Grundgerüst: Index mit Zugangstor, Styles, App-Logik, Session-Vorlage

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 2: Tag 1 · Session 1 — IT-Berufe & duales System

**Files:**
- Create: `tag1-session1.html` (aus `docs/session-template.html`)
- Create: `data/quiz-t1s1.js`
- Modify: `docs/errata.md` (nur falls Fehler gefunden)

**Interfaces:**
- Consumes: `docs/session-template.html` (Slots ersetzen), `assets/app.js`-Kontrakt aus Task 1 (`data-session`, Element-IDs, `window.QUIZ_DATA`).
- Produces: `tag1-session1.html` mit `data-session="tag1-session1"`, `data/quiz-t1s1.js` mit `window.QUIZ_DATA` (40 Fragen).

- [ ] **Step 1: Quelltext lesen**

```bash
pdftotext -layout -f 2 -l 12 "/media/sf_Lernfeld_1/Lernfeld 1.pdf" - | less   # Kapitel 1.1
grep -n -i "IT-Beruf\|dual\|Fachinformatiker\|Kammer\|Berufsschule" ~/IT_Lernfeld1_quellen/arbeitsbuch.txt | head -30
```

Arbeitsbuch-Aufgaben zu dieser Session liegen in Lernsituation 1 (Arbeitsbuch-PDF S. 5–30); die Treffer-Zeilennummern im Volltext lokalisieren die Aufgabentexte.

- [ ] **Step 2: Seite `tag1-session1.html` aus der Vorlage erstellen**

`cp docs/session-template.html tag1-session1.html`, dann Slots ersetzen:
- `{{TITEL}}` → `Tag 1 · Session 1 — IT-Berufe & duales System`
- `{{TAG_SESSION_LABEL}}` → `Tag 1 · Session 1`
- `{{SESSION_SLUG}}` → `tag1-session1`
- `{{KAPITEL}}` → `Kapitel 1.1`
- `{{QUIZDATEI}}` → `quiz-t1s1.js`
- `{{LERNZIELE_LIS}}` → 5 `<li>`-Lernziele (die vier IT-Berufe unterscheiden; Fachrichtungen des Fachinformatikers nennen; duales System und Lernorte erklären; Beteiligte — Betrieb, Berufsschule, Kammer — und ihre Rollen beschreiben; Ablauf und Prüfungen der Ausbildung skizzieren)
- `{{SLIDES}}` → mindestens 12 `<div class="slide">`-Folien (erste zusätzlich mit Klasse `aktiv`), inhaltlich: (1) Titelfolie, (2) Die vier IT-Berufe seit Neuordnung 2020, (3) Fachinformatiker: vier Fachrichtungen, (4) IT-Systemelektroniker, (5) Kaufmännische IT-Berufe (IT-System-Management, Digitalisierungsmanagement), (6) Das duale System: zwei Lernorte, (7) Beteiligte & ihre Aufgaben (Betrieb, Berufsschule, Kammer), (8) Ausbildungsordnung & Rahmenlehrplan, (9) Dauer, Verkürzung, Teilzeit, (10) Prüfungen: gestreckte Abschlussprüfung Teil 1 + 2, (11) Rechte im Überblick / Ausblick Session 2, (12) Zusammenfassung. Jede Folie: `<h3>` + 3–6 Stichpunkte.
- `{{HANDOUT}}` → kompakte Zusammenfassung (500–900 Wörter): Absätze + mindestens 1 Tabelle (z. B. die vier IT-Berufe mit Schwerpunkt und typischen Einsatzgebieten) + Merkkasten-Absätze.
- `{{AUFGABEN}}` → mindestens 6 Aufgaben-Blöcke gemäß „Aufgaben-Markup"-Referenz (oben), adaptiert aus Lernsituation 1 des Arbeitsbuchs (Zuordnung IT-Berufe ↔ Tätigkeiten, Lernorte-Vergleich, Beteiligten-Rollen, Fallbeispiel Verkürzung/Teilzeit u. Ä.)

- [ ] **Step 3: Fachliche Prüfung + ggf. Errata**

Beim Adaptieren jede Faktenaussage der Quelle prüfen (Berufsbezeichnungen, Zuständigkeit der Kammern, Prüfungsstruktur, Fristen). Bei Fehlern: Eintrag nach `docs/errata.md` im dortigen Format anhängen und auf der Plattform die korrigierte Fassung verwenden.

- [ ] **Step 4: `data/quiz-t1s1.js` mit 40 Fragen schreiben**

Kopfzeile und Format:

```js
window.QUIZ_DATA = {
  titel: "Tag 1 · Session 1 — IT-Berufe & duales System",
  fragen: [
    {
      frage: "Wie viele IT-Ausbildungsberufe gibt es seit der Neuordnung 2020?",
      optionen: ["Zwei", "Drei", "Vier", "Fünf"],
      richtig: 2,
      erklaerung: "Seit 2020 gibt es vier IT-Berufe: Fachinformatiker, IT-Systemelektroniker, Kaufmann für IT-System-Management und Kaufmann für Digitalisierungsmanagement."
    }
    // … insgesamt 40 Fragen
  ]
};
```

Abdeckung (Richtwert): 8 Fragen IT-Berufe/Fachrichtungen, 8 duales System/Lernorte, 8 Beteiligte & Zuständigkeiten, 6 Ausbildungsordnung/Rahmenlehrplan, 6 Dauer/Verkürzung/Teilzeit, 4 Prüfungswesen. Mischung: ca. 60 % Wissen, 25 % Verständnis (Warum/Abgrenzung), 15 % Anwendung (Fallmini-Szenarien). `richtig`-Indizes streuen (jeder Index ≥ 5×).

- [ ] **Step 5: Quiz validieren**

Kommando „Quiz-Validierung" (siehe oben) mit `data/quiz-t1s1.js` ausführen. Erwartung: `OK: … 40 Fragen …`.

- [ ] **Step 6: Seite validieren**

Kommandos „Seiten-Validierung" (mit `f=tag1-session1.html`) und „Rauchtest" (mit `tag1-session1.html` / `data/quiz-t1s1.js`) aus dem Referenzteil ausführen. Erwartung: alle 5 OK-Zeilen, zweimal HTTP 200, `node --check` ohne Fehler.

- [ ] **Step 7: Commit**

```bash
cd ~/IT_Lernfeld1
git add tag1-session1.html data/quiz-t1s1.js docs/errata.md
git commit -m "Tag 1 Session 1: IT-Berufe & duales System (Folien, Handout, Aufgaben, 40 Quizfragen)

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 3: Tag 1 · Session 2 — Rechte & Pflichten, Arbeitsrecht, Berufsplanung

**Files:**
- Create: `tag1-session2.html` (aus `docs/session-template.html`)
- Create: `data/quiz-t1s2.js`
- Modify: `docs/errata.md` (nur falls Fehler gefunden)

**Interfaces:**
- Consumes: `docs/session-template.html`, `assets/app.js`-Kontrakt (wie Task 2).
- Produces: `tag1-session2.html` mit `data-session="tag1-session2"`, `data/quiz-t1s2.js` mit `window.QUIZ_DATA` (40 Fragen).

- [ ] **Step 1: Quelltext lesen**

```bash
pdftotext -layout -f 13 -l 31 "/media/sf_Lernfeld_1/Lernfeld 1.pdf" - | less   # Kapitel 1.2
grep -n -i "Pflicht\|Recht\|Vergütung\|Urlaub\|JArbSchG\|Betriebsrat\|JAV\|Kündigung\|Zeugnis\|Bewerbung" ~/IT_Lernfeld1_quellen/arbeitsbuch.txt | head -40
```

- [ ] **Step 2: Seite `tag1-session2.html` aus der Vorlage erstellen** — Slot-Werte:
- `{{TITEL}}` → `Tag 1 · Session 2 — Rechte & Pflichten in der Ausbildung`
- `{{TAG_SESSION_LABEL}}` → `Tag 1 · Session 2` · `{{SESSION_SLUG}}` → `tag1-session2` · `{{KAPITEL}}` → `Kapitel 1.2` · `{{QUIZDATEI}}` → `quiz-t1s2.js`
- `{{LERNZIELE_LIS}}` → 5 `<li>` (Rechte/Pflichten beider Vertragsparteien aus dem BBiG nennen; Inhalte des Ausbildungsvertrags erklären; Schutzvorschriften — JArbSchG, Probezeit, Kündigung — anwenden; Mitbestimmung — Betriebsrat, JAV — erklären; die eigene Berufs- und Lebensplanung strukturieren)
- `{{SLIDES}}` → mindestens 12 Folien: (1) Titel, (2) Der Ausbildungsvertrag: Mindestinhalte nach § 11 BBiG, (3) Pflichten der Auszubildenden, (4) Pflichten der Ausbildenden, (5) Vergütung & Urlaub, (6) Probezeit & Kündigung, (7) Jugendarbeitsschutzgesetz, (8) Arbeitszeiten & Grenzen, (9) Mitbestimmung: Betriebsrat, (10) JAV — Jugend- und Auszubildendenvertretung, (11) Berufs- und Lebensplanung / Weiterbildungswege nach der Ausbildung, (12) Zusammenfassung.
- `{{HANDOUT}}` → 500–900 Wörter, mindestens 1 Tabelle (z. B. Gegenüberstellung Pflichten Azubi ↔ Ausbildender mit BBiG-Paragrafen).
- `{{AUFGABEN}}` → mindestens 6 adaptierte Aufgaben aus Lernsituation 1 (Fallbeispiele zu Rechten/Pflichten, Vertragsprüfung, JArbSchG-Fälle, Bewerbung/Zukunftsplanung), Struktur gemäß „Aufgaben-Markup"-Referenz (oben).

- [ ] **Step 3: Fachliche Prüfung + ggf. Errata** — besonders prüfen: BBiG-Paragrafen (§§ 10–16), JArbSchG-Grenzwerte (Arbeitszeit, Ruhepausen, Urlaubsstaffelung), Kündigungsregeln in der Probezeit. Fehler → `docs/errata.md` + korrigiert umsetzen.

- [ ] **Step 4: `data/quiz-t1s2.js` mit 40 Fragen** — Format identisch zum Kontrakt (Global Constraints). Beispielfrage für diese Session:

```js
{
  frage: "Ein 17-jähriger Auszubildender soll 9,5 Stunden täglich arbeiten. Ist das zulässig?",
  optionen: [
    "Ja, mit Einverständnis der Eltern",
    "Nein, das JArbSchG begrenzt die tägliche Arbeitszeit Jugendlicher",
    "Ja, wenn ein Ausgleichstag gewährt wird und 10 Stunden nicht überschritten werden",
    "Nur in den ersten sechs Monaten der Ausbildung"
  ],
  richtig: 1,
  erklaerung: "Für Jugendliche gilt das Jugendarbeitsschutzgesetz: grundsätzlich höchstens 8 Stunden täglich und 40 Stunden wöchentlich."
}
```

Abdeckung: 8 Vertrag/BBiG, 8 Pflichten beider Seiten, 6 Vergütung/Urlaub/Probezeit/Kündigung, 8 JArbSchG, 6 Mitbestimmung (Betriebsrat/JAV), 4 Berufs-/Lebensplanung.

- [ ] **Step 5: Quiz validieren** — „Quiz-Validierung" mit `data/quiz-t1s2.js`. Erwartung: OK.
- [ ] **Step 6: Seite validieren** — „Seiten-Validierung" mit `f=tag1-session2.html` + „Rauchtest" (Referenzteil, Dateinamen `tag1-session2.html` / `data/quiz-t1s2.js`). Erwartung: alle OK, HTTP 200.
- [ ] **Step 7: Commit**

```bash
cd ~/IT_Lernfeld1
git add tag1-session2.html data/quiz-t1s2.js docs/errata.md
git commit -m "Tag 1 Session 2: Rechte & Pflichten, Arbeitsrecht, Berufsplanung

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 4: Tag 2 · Session 1 — Betrieb & Unternehmen, JIKU, Unternehmensziele

**Files:**
- Create: `tag2-session1.html` (aus `docs/session-template.html`)
- Create: `data/quiz-t2s1.js`
- Modify: `docs/errata.md` (nur falls Fehler gefunden)

**Interfaces:**
- Consumes: `docs/session-template.html`, `assets/app.js`-Kontrakt (wie Task 2).
- Produces: `tag2-session1.html` mit `data-session="tag2-session1"`, `data/quiz-t2s1.js` mit `window.QUIZ_DATA` (40 Fragen).

- [ ] **Step 1: Quelltext lesen**

```bash
pdftotext -layout -f 32 -l 56 "/media/sf_Lernfeld_1/Lernfeld 1.pdf" - | less   # Kapitel 1.3.1–1.3.3
grep -n -i "JIKU\|Systemhaus\|Unternehmensziel\|Leitbild\|Betrieb\|Firma\|gemeinnützig" ~/IT_Lernfeld1_quellen/arbeitsbuch.txt | head -40
```

Das Modellunternehmen „JIKU IT-Solutions GmbH" ist im Arbeitsbuch ab S. 1 beschrieben (Systemhaus-Verbund, 480 Mitarbeiter, 16 Standorte, Standort Hamburg 32 Mitarbeiter/8 Azubis) — diese Eckdaten für Folien/Aufgaben nutzen.

- [ ] **Step 2: Seite `tag2-session1.html` aus der Vorlage erstellen** — Slot-Werte:
- `{{TITEL}}` → `Tag 2 · Session 1 — Betrieb & Unternehmen`
- `{{TAG_SESSION_LABEL}}` → `Tag 2 · Session 1` · `{{SESSION_SLUG}}` → `tag2-session1` · `{{KAPITEL}}` → `Kapitel 1.3.1–1.3.3` · `{{QUIZDATEI}}` → `quiz-t2s1.js`
- `{{LERNZIELE_LIS}}` → 5 `<li>` (das Modellunternehmen JIKU IT-Solutions beschreiben; Begriffe Betrieb, Unternehmen, Firma abgrenzen; Betriebe im Umfeld klassifizieren; ökonomische, soziale und ökologische Unternehmensziele unterscheiden; Zielbeziehungen und Leitbild erklären)
- `{{SLIDES}}` → mindestens 12 Folien: (1) Titel, (2) JIKU IT-Solutions: das Modellunternehmen, (3) Leistungsportfolio eines IT-Systemhauses, (4) Betrieb ≠ Unternehmen ≠ Firma, (5) Klassifikation von Betrieben (Größe, Branche, Träger), (6) Erwerbswirtschaftliche vs. gemeinnützige Ziele, (7) Ökonomische Ziele (Gewinn, Rentabilität, Marktanteil), (8) Soziale & ökologische Ziele, (9) Zielbeziehungen (komplementär, konkurrierend, indifferent), (10) Unternehmensleitbild & Corporate Identity, (11) Shareholder vs. Stakeholder, (12) Zusammenfassung.
- `{{HANDOUT}}` → 500–900 Wörter, mindestens 1 Tabelle (z. B. Zielarten mit Beispielen aus dem IT-Systemhaus).
- `{{AUFGABEN}}` → mindestens 6 adaptierte Aufgaben aus Lernsituation 2 (JIKU-Steckbrief erstellen, Ziele klassifizieren, Zielkonflikt-Fälle), Struktur gemäß „Aufgaben-Markup"-Referenz (oben).

- [ ] **Step 3: Fachliche Prüfung + ggf. Errata** — besonders prüfen: Begriffsabgrenzung Betrieb/Unternehmen/Firma (Firma = Name des Kaufmanns!), Zielbeziehungs-Beispiele. Fehler → `docs/errata.md`.

- [ ] **Step 4: `data/quiz-t2s1.js` mit 40 Fragen** — Beispielfrage:

```js
{
  frage: "Was bezeichnet der Begriff „Firma“ im juristischen Sinn?",
  optionen: [
    "Das Gebäude, in dem produziert wird",
    "Den Namen, unter dem ein Kaufmann seine Geschäfte betreibt",
    "Jedes Unternehmen mit mehr als 10 Mitarbeitern",
    "Die Gesamtheit aller Betriebsstätten"
  ],
  richtig: 1,
  erklaerung: "Die Firma ist nach § 17 HGB der Handelsname des Kaufmanns — nicht das Unternehmen oder Gebäude selbst."
}
```

Abdeckung: 6 Modellunternehmen/Systemhaus, 8 Begriffsabgrenzungen, 8 Klassifikation von Betrieben, 10 Unternehmensziele & Zielbeziehungen, 8 Leitbild/CI/Stakeholder.

- [ ] **Step 5: Quiz validieren** — „Quiz-Validierung" mit `data/quiz-t2s1.js`.
- [ ] **Step 6: Seite validieren** — „Seiten-Validierung" mit `f=tag2-session1.html` + „Rauchtest" (Referenzteil, Dateinamen entsprechend anpassen).
- [ ] **Step 7: Commit**

```bash
cd ~/IT_Lernfeld1
git add tag2-session1.html data/quiz-t2s1.js docs/errata.md
git commit -m "Tag 2 Session 1: Betrieb & Unternehmen, Modellunternehmen, Unternehmensziele

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 5: Tag 2 · Session 2 — Rechtsformen & Aufbauorganisation

**Files:**
- Create: `tag2-session2.html` (aus `docs/session-template.html`)
- Create: `data/quiz-t2s2.js`
- Modify: `docs/errata.md` (nur falls Fehler gefunden)

**Interfaces:**
- Consumes: `docs/session-template.html`, `assets/app.js`-Kontrakt (wie Task 2).
- Produces: `tag2-session2.html` mit `data-session="tag2-session2"`, `data/quiz-t2s2.js` mit `window.QUIZ_DATA` (40 Fragen).

- [ ] **Step 1: Quelltext lesen**

```bash
pdftotext -layout -f 57 -l 71 "/media/sf_Lernfeld_1/Lernfeld 1.pdf" - | less   # Kapitel 1.3.4
grep -n -i "Rechtsform\|GmbH\|Aktiengesellschaft\|OHG\|KG\|Einzelunternehm\|Organigramm\|Stabsstelle\|Einlinien\|Matrix" ~/IT_Lernfeld1_quellen/arbeitsbuch.txt | head -40
```

- [ ] **Step 2: Seite `tag2-session2.html` aus der Vorlage erstellen** — Slot-Werte:
- `{{TITEL}}` → `Tag 2 · Session 2 — Rechtsformen & Aufbauorganisation`
- `{{TAG_SESSION_LABEL}}` → `Tag 2 · Session 2` · `{{SESSION_SLUG}}` → `tag2-session2` · `{{KAPITEL}}` → `Kapitel 1.3.4` · `{{QUIZDATEI}}` → `quiz-t2s2.js`
- `{{LERNZIELE_LIS}}` → 5 `<li>` (Einzelunternehmen, Personen- und Kapitalgesellschaften unterscheiden; Haftung, Kapital, Leitung je Rechtsform erklären; die passende Rechtsform für Fallbeispiele begründen; Aufbauorganisation und Organigramme lesen; Leitungssysteme — Einlinien-, Mehrlinien-, Stablinien-, Matrixorganisation — vergleichen)
- `{{SLIDES}}` → mindestens 13 Folien: (1) Titel, (2) Überblick Rechtsformen-Systematik, (3) Einzelunternehmen, (4) GbR & OHG, (5) KG, (6) GmbH & UG (haftungsbeschränkt), (7) AG, (8) Rechtsformwahl: Kriterien (Haftung, Kapital, Gründungsaufwand, Publizität), (9) Aufbau- vs. Ablauforganisation, (10) Stellen, Instanzen, Abteilungen, (11) Einlinien- und Mehrliniensystem, (12) Stablinien- und Matrixorganisation, (13) Zusammenfassung.
- `{{HANDOUT}}` → 600–1000 Wörter, ZWEI Tabellen: Rechtsformen-Vergleich (Haftung/Mindestkapital/Leitung/Beispiel) und Leitungssysteme (Vor-/Nachteile). Organigramm-Beispiele als verschachtelte Listen oder Tabellen darstellen (kein Bild nötig).
- `{{AUFGABEN}}` → mindestens 6 adaptierte Aufgaben (Rechtsform-Fallentscheidungen, JIKU-Organigramm analysieren, Haftungsfälle), Struktur gemäß „Aufgaben-Markup"-Referenz (oben).

- [ ] **Step 3: Fachliche Prüfung + ggf. Errata** — besonders prüfen: Mindestkapital GmbH 25.000 €, UG 1 €, AG 50.000 €; Haftungsregeln OHG/KG (Komplementär vs. Kommanditist); seit MoPeG 2024 geltende GbR-Regeln. Fehler → `docs/errata.md`.

- [ ] **Step 4: `data/quiz-t2s2.js` mit 40 Fragen** — Beispielfrage:

```js
{
  frage: "Welches Mindeststammkapital ist für die Gründung einer GmbH erforderlich?",
  optionen: ["1 Euro", "12.500 Euro", "25.000 Euro", "50.000 Euro"],
  richtig: 2,
  erklaerung: "Das GmbH-Gesetz verlangt 25.000 Euro Stammkapital; bei Gründung muss mindestens die Hälfte (12.500 Euro) eingezahlt sein. 50.000 Euro gelten für die AG."
}
```

Abdeckung: 14 Rechtsformen (je Form + Vergleich), 6 Rechtsformwahl-Kriterien, 8 Aufbauorganisation/Stellenbegriffe, 8 Leitungssysteme, 4 Anwendungsfälle JIKU.

- [ ] **Step 5: Quiz validieren** — „Quiz-Validierung" mit `data/quiz-t2s2.js`.
- [ ] **Step 6: Seite validieren** — „Seiten-Validierung" mit `f=tag2-session2.html` + „Rauchtest" (Referenzteil, Dateinamen entsprechend anpassen).
- [ ] **Step 7: Commit**

```bash
cd ~/IT_Lernfeld1
git add tag2-session2.html data/quiz-t2s2.js docs/errata.md
git commit -m "Tag 2 Session 2: Rechtsformen & Aufbauorganisation

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 6: Tag 3 · Session 1 — Geschäftsprozesse, Produktionsfaktoren, Güterarten

**Files:**
- Create: `tag3-session1.html` (aus `docs/session-template.html`)
- Create: `data/quiz-t3s1.js`
- Modify: `docs/errata.md` (nur falls Fehler gefunden)

**Interfaces:**
- Consumes: `docs/session-template.html`, `assets/app.js`-Kontrakt (wie Task 2).
- Produces: `tag3-session1.html` mit `data-session="tag3-session1"`, `data/quiz-t3s1.js` mit `window.QUIZ_DATA` (40 Fragen).

- [ ] **Step 1: Quelltext lesen**

```bash
pdftotext -layout -f 72 -l 84 "/media/sf_Lernfeld_1/Lernfeld 1.pdf" - | less   # Kapitel 1.3.5–1.3.6
grep -n -i "Prozess\|Wertschöpfung\|Kernprozess\|Produktionsfaktor\|Güter\|Organisationsmittel" ~/IT_Lernfeld1_quellen/arbeitsbuch.txt | head -40
```

- [ ] **Step 2: Seite `tag3-session1.html` aus der Vorlage erstellen** — Slot-Werte:
- `{{TITEL}}` → `Tag 3 · Session 1 — Geschäftsprozesse & Produktionsfaktoren`
- `{{TAG_SESSION_LABEL}}` → `Tag 3 · Session 1` · `{{SESSION_SLUG}}` → `tag3-session1` · `{{KAPITEL}}` → `Kapitel 1.3.5–1.3.6` · `{{QUIZDATEI}}` → `quiz-t3s1.js`
- `{{LERNZIELE_LIS}}` → 5 `<li>` (Wertschöpfung erklären; Kern-, Unterstützungs- und Führungsprozesse unterscheiden; Geschäftsprozesse eines IT-Systemhauses beschreiben; volkswirtschaftliche und betriebswirtschaftliche Produktionsfaktoren nennen; Güterarten klassifizieren)
- `{{SLIDES}}` → mindestens 12 Folien: (1) Titel, (2) Wertschöpfung: vom Input zum Output, (3) Was ist ein Geschäftsprozess?, (4) Kernprozesse am Beispiel IT-Systemhaus, (5) Unterstützungsprozesse, (6) Führungsprozesse, (7) Prozessdarstellung (Flussdiagramm/Ereigniskette einfach), (8) Volkswirtschaftliche Produktionsfaktoren (Arbeit, Boden, Kapital, Wissen), (9) Betriebswirtschaftliche Produktionsfaktoren (elementare/dispositive), (10) Güterarten: frei/knapp, Sach-/Dienstleistung, Konsum-/Investitionsgut, (11) Organisationsmittel im Büro- und IT-Alltag, (12) Zusammenfassung.
- `{{HANDOUT}}` → 500–900 Wörter, mindestens 1 Tabelle (z. B. Güterarten-Matrix mit IT-Beispielen: Standardsoftware, Server, Cloud-Dienst, Beratung).
- `{{AUFGABEN}}` → mindestens 6 adaptierte Aufgaben (Prozesse bei JIKU einordnen, Produktionsfaktoren zuordnen, Güterarten klassifizieren), Struktur gemäß „Aufgaben-Markup"-Referenz (oben).

- [ ] **Step 3: Fachliche Prüfung + ggf. Errata** — besonders prüfen: Abgrenzung volkswirtschaftliche vs. betriebswirtschaftliche Faktoren (Gutenberg), Klassifikationsbeispiele. Fehler → `docs/errata.md`.

- [ ] **Step 4: `data/quiz-t3s1.js` mit 40 Fragen** — Beispielfrage:

```js
{
  frage: "Ein Kunde beauftragt das Systemhaus mit der Einrichtung eines Netzwerks. Zu welcher Prozessart gehört die Leistungserbringung beim Kunden?",
  optionen: ["Führungsprozess", "Kernprozess", "Unterstützungsprozess", "Verwaltungsprozess"],
  richtig: 1,
  erklaerung: "Kernprozesse stiften unmittelbar Kundennutzen und erwirtschaften die Wertschöpfung — hier die Installation der IT-Lösung beim Kunden."
}
```

Abdeckung: 10 Prozessarten & Wertschöpfung, 6 Prozessbeispiele IT-Systemhaus, 8 volkswirtschaftliche Faktoren, 8 betriebswirtschaftliche Faktoren, 8 Güterarten/Organisationsmittel.

- [ ] **Step 5: Quiz validieren** — „Quiz-Validierung" mit `data/quiz-t3s1.js`.
- [ ] **Step 6: Seite validieren** — „Seiten-Validierung" mit `f=tag3-session1.html` + „Rauchtest" (Referenzteil, Dateinamen entsprechend anpassen).
- [ ] **Step 7: Commit**

```bash
cd ~/IT_Lernfeld1
git add tag3-session1.html data/quiz-t3s1.js docs/errata.md
git commit -m "Tag 3 Session 1: Geschäftsprozesse, Produktionsfaktoren, Güterarten

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 7: Tag 3 · Session 2 — Wirtschaftskreislauf & Marktsituationen

**Files:**
- Create: `tag3-session2.html` (aus `docs/session-template.html`)
- Create: `data/quiz-t3s2.js`
- Modify: `docs/errata.md` (nur falls Fehler gefunden)

**Interfaces:**
- Consumes: `docs/session-template.html`, `assets/app.js`-Kontrakt (wie Task 2).
- Produces: `tag3-session2.html` mit `data-session="tag3-session2"`, `data/quiz-t3s2.js` mit `window.QUIZ_DATA` (40 Fragen).

- [ ] **Step 1: Quelltext lesen**

```bash
pdftotext -layout -f 85 -l 97 "/media/sf_Lernfeld_1/Lernfeld 1.pdf" - | less   # Kapitel 1.4
grep -n -i "Kreislauf\|Haushalt\|Markt\|Angebot\|Nachfrage\|Monopol\|Oligopol\|Polypol\|Preis" ~/IT_Lernfeld1_quellen/arbeitsbuch.txt | head -40
```

- [ ] **Step 2: Seite `tag3-session2.html` aus der Vorlage erstellen** — Slot-Werte:
- `{{TITEL}}` → `Tag 3 · Session 2 — Wirtschaftskreislauf & Markt`
- `{{TAG_SESSION_LABEL}}` → `Tag 3 · Session 2` · `{{SESSION_SLUG}}` → `tag3-session2` · `{{KAPITEL}}` → `Kapitel 1.4` · `{{QUIZDATEI}}` → `quiz-t3s2.js`
- `{{LERNZIELE_LIS}}` → 5 `<li>` (den einfachen und erweiterten Wirtschaftskreislauf beschreiben; Geld- und Güterströme unterscheiden; die Rolle von Staat, Banken und Ausland erklären; Marktarten und Marktformen — Monopol, Oligopol, Polypol — unterscheiden; Preisbildung durch Angebot und Nachfrage erklären)
- `{{SLIDES}}` → mindestens 12 Folien: (1) Titel, (2) Der einfache Wirtschaftskreislauf: Haushalte ↔ Unternehmen, (3) Geldstrom vs. Güterstrom, (4) Erweiterter Kreislauf: Staat, (5) Erweiterter Kreislauf: Banken & Ausland, (6) Was ist ein Markt? Marktarten, (7) Marktformen: Monopol, (8) Oligopol & Polypol, (9) Angebot & Nachfrage, (10) Preisbildung & Gleichgewichtspreis, (11) Besonderheiten von IT-Märkten (Plattformen, Netzwerkeffekte), (12) Zusammenfassung.
- `{{HANDOUT}}` → 500–900 Wörter, mindestens 1 Tabelle (Marktformen-Übersicht Anbieter×Nachfrager mit Beispielen aus der IT-Branche). Kreislauf-Darstellung als strukturierte Liste der Ströme.
- `{{AUFGABEN}}` → mindestens 6 adaptierte Aufgaben (Ströme zuordnen, Marktform-Fälle aus der IT-Branche, Preisbildungsszenario), Struktur gemäß „Aufgaben-Markup"-Referenz (oben).

- [ ] **Step 3: Fachliche Prüfung + ggf. Errata** — besonders prüfen: Richtung der Geld-/Güterströme, korrekte Marktform-Beispiele. Fehler → `docs/errata.md`.

- [ ] **Step 4: `data/quiz-t3s2.js` mit 40 Fragen** — Beispielfrage:

```js
{
  frage: "Private Haushalte stellen den Unternehmen Arbeitskraft zur Verfügung. Welcher Strom fließt dafür im Gegenzug von den Unternehmen zu den Haushalten?",
  optionen: ["Güterstrom (Konsumgüter)", "Geldstrom (Löhne und Gehälter)", "Steuern", "Subventionen"],
  richtig: 1,
  erklaerung: "Für den Produktionsfaktor Arbeit zahlen Unternehmen Löhne und Gehälter — ein Geldstrom in Richtung der Haushalte."
}
```

Abdeckung: 12 Wirtschaftskreislauf (einfach/erweitert), 8 Marktarten/-formen, 10 Angebot/Nachfrage/Preisbildung, 6 IT-Marktbeispiele, 4 Transfer-/Anwendungsfälle.

- [ ] **Step 5: Quiz validieren** — „Quiz-Validierung" mit `data/quiz-t3s2.js`.
- [ ] **Step 6: Seite validieren** — „Seiten-Validierung" mit `f=tag3-session2.html` + „Rauchtest" (Referenzteil, Dateinamen entsprechend anpassen).
- [ ] **Step 7: Commit**

```bash
cd ~/IT_Lernfeld1
git add tag3-session2.html data/quiz-t3s2.js docs/errata.md
git commit -m "Tag 3 Session 2: Wirtschaftskreislauf & Marktsituationen

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 8: Tag 4 · Session 1 — Präsentation vorbereiten & planen

**Files:**
- Create: `tag4-session1.html` (aus `docs/session-template.html`)
- Create: `data/quiz-t4s1.js`
- Modify: `docs/errata.md` (nur falls Fehler gefunden)

**Interfaces:**
- Consumes: `docs/session-template.html`, `assets/app.js`-Kontrakt (wie Task 2).
- Produces: `tag4-session1.html` mit `data-session="tag4-session1"`, `data/quiz-t4s1.js` mit `window.QUIZ_DATA` (40 Fragen).

- [ ] **Step 1: Quelltext lesen**

```bash
pdftotext -layout -f 98 -l 107 "/media/sf_Lernfeld_1/Lernfeld 1.pdf" - | less   # Kapitel 1.5.1–1.5.2
grep -n -i "Präsentation\|Team\|Medien\|Folie\|Storyboard\|Zielgruppe\|Feedback" ~/IT_Lernfeld1_quellen/arbeitsbuch.txt | head -40
```

- [ ] **Step 2: Seite `tag4-session1.html` aus der Vorlage erstellen** — Slot-Werte:
- `{{TITEL}}` → `Tag 4 · Session 1 — Präsentation vorbereiten & planen`
- `{{TAG_SESSION_LABEL}}` → `Tag 4 · Session 1` · `{{SESSION_SLUG}}` → `tag4-session1` · `{{KAPITEL}}` → `Kapitel 1.5.1–1.5.2` · `{{QUIZDATEI}}` → `quiz-t4s1.js`
- `{{LERNZIELE_LIS}}` → 5 `<li>` (Teamarbeit organisieren — Rollen, Regeln, Zeitplan; Zielgruppe und Ziel einer Präsentation bestimmen; Inhalte strukturieren — Einstieg, Hauptteil, Schluss; Medien und Visualisierung sinnvoll wählen; Foliengestaltungsregeln anwenden)
- `{{SLIDES}}` → mindestens 12 Folien: (1) Titel, (2) Die Aufgabe: den Ausbildungsbetrieb präsentieren, (3) Teamarbeit: Rollen & Regeln, (4) Projektphasen & Zeitplan, (5) Zielgruppenanalyse, (6) Stoffsammlung & Auswahl, (7) Struktur: Einstieg — Hauptteil — Schluss, (8) Storyboard & roter Faden, (9) Medienwahl (Folien, Flipchart, Live-Demo), (10) Foliengestaltung: Regeln (wenig Text, Kontrast, Schriftgröße), (11) Visualisierung: Diagramme & Bilder, (12) Zusammenfassung & Checkliste.
- `{{HANDOUT}}` → 500–900 Wörter, mindestens 1 Tabelle (z. B. Präsentationsphasen mit Leitfragen) + Checkliste als Liste.
- `{{AUFGABEN}}` → mindestens 6 adaptierte Aufgaben (Teamregeln formulieren, Storyboard für die JIKU-Präsentation entwerfen, Folien-Kritik), Struktur gemäß „Aufgaben-Markup"-Referenz (oben).

- [ ] **Step 3: Fachliche Prüfung + ggf. Errata** — Gestaltungs-Faustregeln konsistent halten (z. B. Schriftgrößen-Empfehlungen). Fehler → `docs/errata.md`.

- [ ] **Step 4: `data/quiz-t4s1.js` mit 40 Fragen** — Beispielfrage:

```js
{
  frage: "Was gehört an den Anfang der Präsentationsplanung?",
  optionen: [
    "Die Auswahl der Schriftart",
    "Die Analyse von Zielgruppe und Präsentationsziel",
    "Das Erstellen der letzten Folie",
    "Die Generalprobe"
  ],
  richtig: 1,
  erklaerung: "Erst wenn Ziel und Zielgruppe klar sind, lassen sich Inhalte, Tiefe und Medien sinnvoll festlegen — alles andere folgt danach."
}
```

Abdeckung: 8 Teamarbeit/Organisation, 8 Planung/Zielgruppe, 8 Struktur/Storyboard, 8 Medien/Foliengestaltung, 8 Anwendung (Was-wäre-richtig-Szenarien).

- [ ] **Step 5: Quiz validieren** — „Quiz-Validierung" mit `data/quiz-t4s1.js`.
- [ ] **Step 6: Seite validieren** — „Seiten-Validierung" mit `f=tag4-session1.html` + „Rauchtest" (Referenzteil, Dateinamen entsprechend anpassen).
- [ ] **Step 7: Commit**

```bash
cd ~/IT_Lernfeld1
git add tag4-session1.html data/quiz-t4s1.js docs/errata.md
git commit -m "Tag 4 Session 1: Präsentation vorbereiten & planen

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 9: Tag 4 · Session 2 — Präsentieren, Reflexion & Gesamtwiederholung

**Files:**
- Create: `tag4-session2.html` (aus `docs/session-template.html`)
- Create: `data/quiz-t4s2.js`
- Modify: `docs/errata.md` (nur falls Fehler gefunden)

**Interfaces:**
- Consumes: `docs/session-template.html`, `assets/app.js`-Kontrakt (wie Task 2).
- Produces: `tag4-session2.html` mit `data-session="tag4-session2"`, `data/quiz-t4s2.js` mit `window.QUIZ_DATA` (40 Fragen).

- [ ] **Step 1: Quelltext lesen**

```bash
pdftotext -layout -f 108 -l 108 "/media/sf_Lernfeld_1/Lernfeld 1.pdf" -   # Kapitel 1.5.3 (kurz)
pdftotext -layout -f 2 -l 107 "/media/sf_Lernfeld_1/Lernfeld 1.pdf" - | grep -A3 -i "zusammenfassung\|merke" | head -60   # Stoff für Wiederholung
grep -n -i "Reflexion\|Feedback\|Beobachtung\|Bewertung" ~/IT_Lernfeld1_quellen/arbeitsbuch.txt | head -30
```

- [ ] **Step 2: Seite `tag4-session2.html` aus der Vorlage erstellen** — Slot-Werte:
- `{{TITEL}}` → `Tag 4 · Session 2 — Präsentieren, Feedback & Gesamtwiederholung`
- `{{TAG_SESSION_LABEL}}` → `Tag 4 · Session 2` · `{{SESSION_SLUG}}` → `tag4-session2` · `{{KAPITEL}}` → `Kapitel 1.5.3 + Wiederholung 1.1–1.4` · `{{QUIZDATEI}}` → `quiz-t4s2.js`
- `{{LERNZIELE_LIS}}` → 5 `<li>` (eine Präsentation souverän durchführen — Körpersprache, Stimme, Lampenfieber; konstruktives Feedback geben und annehmen; Präsentationen anhand von Kriterien bewerten; die eigene Teamarbeit reflektieren; den gesamten Lernfeld-1-Stoff für die Prüfung wiederholen)
- `{{SLIDES}}` → mindestens 12 Folien: (1) Titel, (2) Vortragstechnik: Stimme & Körpersprache, (3) Umgang mit Lampenfieber, (4) Feedbackregeln, (5) Bewertungskriterien für Präsentationen, (6) Reflexion der Teamarbeit, (7) Wiederholung Tag 1: IT-Berufe & Ausbildungsrecht, (8) Wiederholung Tag 2: Betrieb, Ziele, Rechtsformen, (9) Wiederholung Tag 2/3: Organisation & Prozesse, (10) Wiederholung Tag 3: Produktionsfaktoren, Kreislauf, Markt, (11) Prüfungstipps, (12) Abschluss & Ausblick Lernfeld 2.
- `{{HANDOUT}}` → 500–900 Wörter: Feedback-/Bewertungsbogen als Tabelle + kompakte Wiederholungsübersicht aller vier Tage (Tabelle: Thema → Kernbegriffe).
- `{{AUFGABEN}}` → mindestens 6 adaptierte Aufgaben (Beobachtungsbogen ausfüllen, Feedback formulieren, Reflexionsfragen, 2 gemischte Wiederholungsaufgaben über alle Tage), Struktur gemäß „Aufgaben-Markup"-Referenz (oben).

- [ ] **Step 3: Fachliche Prüfung + ggf. Errata** — Wiederholungsfolien gegen die bereits erstellten Sessions Tag 1–3 abgleichen (gleiche Zahlen/Fakten!). Fehler → `docs/errata.md`.

- [ ] **Step 4: `data/quiz-t4s2.js` mit 40 Fragen** — Beispielfrage:

```js
{
  frage: "Welche Feedbackregel ist korrekt formuliert?",
  optionen: [
    "Feedback beginnt immer mit der härtesten Kritik",
    "Feedback beschreibt konkretes Verhalten und wird als Ich-Botschaft formuliert",
    "Feedback bewertet die Person, nicht die Sache",
    "Feedback wird erst Tage später gegeben"
  ],
  richtig: 1,
  erklaerung: "Gutes Feedback ist konkret, beschreibend statt wertend und als Ich-Botschaft formuliert — zeitnah und mit Positivem beginnend."
}
```

Abdeckung: 10 Präsentieren/Feedback/Reflexion (Kap. 1.5.3), 30 Gesamtwiederholung quer über 1.1–1.4 (je ca. 7–8 Fragen pro Kurstag 1–3 plus gemischte Transferfälle) — Fragen NEU formulieren, nicht aus den Tasks 2–7 kopieren.

- [ ] **Step 5: Quiz validieren** — „Quiz-Validierung" mit `data/quiz-t4s2.js`. Zusätzlich Duplikatprüfung gegen alle anderen Quizdateien:

```bash
cd ~/IT_Lernfeld1
node -e '
const fs=require("fs");let alle=[];
for(const d of fs.readdirSync("data")){const window={};eval(fs.readFileSync("data/"+d,"utf8"));alle.push(...window.QUIZ_DATA.fragen.map(f=>f.frage));}
const dup=alle.filter((f,i)=>alle.indexOf(f)!==i);
if(dup.length)throw new Error("Duplikate über Dateien: "+dup.join(" | "));
console.log("OK: keine sessionübergreifenden Duplikate,",alle.length,"Fragen gesamt");
'
```

- [ ] **Step 6: Seite validieren** — „Seiten-Validierung" mit `f=tag4-session2.html` + „Rauchtest" (Referenzteil, Dateinamen entsprechend anpassen).
- [ ] **Step 7: Commit**

```bash
cd ~/IT_Lernfeld1
git add tag4-session2.html data/quiz-t4s2.js docs/errata.md
git commit -m "Tag 4 Session 2: Präsentieren, Feedback & Gesamtwiederholung

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 10: Endabnahme, Push & GitHub Pages

**Files:**
- Modify: `docs/errata.md` (Abschlussvermerk)
- Keine neuen Dateien; Gesamtprüfung + Deployment.

**Interfaces:**
- Consumes: alle Artefakte aus Tasks 1–9.
- Produces: Live-Site `https://cansi798.github.io/IT_Lernfeld1/`.

- [ ] **Step 1: Vollständigkeitsprüfung**

```bash
cd ~/IT_Lernfeld1
ls tag1-session1.html tag1-session2.html tag2-session1.html tag2-session2.html \
   tag3-session1.html tag3-session2.html tag4-session1.html tag4-session2.html
ls data/quiz-t1s1.js data/quiz-t1s2.js data/quiz-t2s1.js data/quiz-t2s2.js \
   data/quiz-t3s1.js data/quiz-t3s2.js data/quiz-t4s1.js data/quiz-t4s2.js
```

Erwartung: alle 16 Dateien vorhanden (kein „No such file").

- [ ] **Step 2: Alle Quizze gesammelt validieren**

```bash
cd ~/IT_Lernfeld1
for q in data/quiz-*.js; do
  node -e '
const fs=require("fs");const window={};
eval(fs.readFileSync(process.argv[1],"utf8"));
const f=window.QUIZ_DATA.fragen,dist=[0,0,0,0],seen=new Set();
if(f.length!==40)throw new Error(process.argv[1]+": "+f.length+" Fragen");
f.forEach((x,i)=>{if(x.optionen.length!==4||new Set(x.optionen).size!==4||!Number.isInteger(x.richtig)||x.richtig<0||x.richtig>3||!x.erklaerung||seen.has(x.frage))throw new Error(process.argv[1]+" Frage "+(i+1));seen.add(x.frage);dist[x.richtig]++});
if(Math.min(...dist)<5)throw new Error(process.argv[1]+" Verteilung "+dist);
console.log("OK",process.argv[1],dist.join("/"));
' "$q" || exit 1
done
echo "ALLE QUIZZE OK (320 Fragen)"
```

- [ ] **Step 3: Fußzeilen- und BFW-Audit**

```bash
cd ~/IT_Lernfeld1
grep -riL "Lernfeld 1 Fachinformatiker" *.html && echo "FEHLER: Seite ohne Fußzeile" || echo "FUSSZEILE-OK"
grep -ri "bfw" *.html assets/ data/ media/ docs/errata.md README.md && echo "FEHLER: BFW gefunden" || echo "BFW-AUDIT-OK"
```

Erwartung: `FUSSZEILE-OK` und `BFW-AUDIT-OK` (grep -L listet Dateien OHNE Treffer — es darf keine geben). Hinweis: `docs/superpowers/` ist bewusst NICHT im Audit-Scope — Spec und Plan erwähnen die alte Beispielplattform `bfw_Lernplattform` legitim als Herkunftsangabe.

- [ ] **Step 4: Linkprüfung aller internen Verweise**

```bash
cd ~/IT_Lernfeld1
python3 - <<'EOF'
import re, pathlib, sys
fehler = []
for html in pathlib.Path('.').glob('*.html'):
    for ziel in re.findall(r'(?:href|src)="([^"#]+)"', html.read_text(encoding='utf-8')):
        if ziel.startswith(('http', 'mailto')): continue
        if not pathlib.Path(ziel).exists(): fehler.append(f"{html}: {ziel}")
if fehler: sys.exit("KAPUTTE LINKS:\n" + "\n".join(fehler))
print("LINKS-OK")
EOF
```

- [ ] **Step 5: Lokaler Gesamt-Rauchtest**

```bash
cd ~/IT_Lernfeld1 && python3 -m http.server 8123 >/dev/null 2>&1 & sleep 1
for p in index.html tag1-session1.html tag1-session2.html tag2-session1.html tag2-session2.html \
         tag3-session1.html tag3-session2.html tag4-session1.html tag4-session2.html; do
  printf '%s: ' $p; curl -s -o /dev/null -w '%{http_code}\n' http://localhost:8123/$p
done
kill %1
```

Erwartung: 9 × `200`.

- [ ] **Step 6: Errata-Abschlussvermerk** — In `docs/errata.md` unter den Einträgen ergänzen (Datum fest einsetzen): `*Stand 2026-08-19: Prüfung aller acht Sessions abgeschlossen.*` Falls keine Einträge entstanden sind, zusätzlich: `*Keine fachlichen Fehler gefunden.*`

- [ ] **Step 7: Push**

```bash
cd ~/IT_Lernfeld1
git add docs/errata.md && git commit -m "Errata-Abschlussvermerk nach Endabnahme

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>" || echo "nichts zu committen"
git push origin main
```

- [ ] **Step 8: GitHub Pages aktivieren**

```bash
gh api repos/cansi798/IT_Lernfeld1/pages -X POST \
  -f "source[branch]=main" -f "source[path]=/" 2>&1 || \
gh api repos/cansi798/IT_Lernfeld1/pages 2>&1   # falls schon aktiv: Status anzeigen
```

Falls `gh` nicht authentifiziert ist: den Nutzer bitten, `! gh auth login` auszuführen, oder Pages manuell zu aktivieren (GitHub → Settings → Pages → Source: `main` / root).

- [ ] **Step 9: Live-Prüfung** (Pages-Build braucht 1–3 Minuten; bei 404 kurz warten und wiederholen)

```bash
for i in 1 2 3 4 5; do
  code=$(curl -s -o /dev/null -w '%{http_code}' https://cansi798.github.io/IT_Lernfeld1/)
  echo "Versuch $i: $code"; [ "$code" = "200" ] && break; sleep 30
done
curl -s https://cansi798.github.io/IT_Lernfeld1/ | grep -q 'Lernfeld 1 Fachinformatiker' && echo LIVE-OK
```

- [ ] **Step 10: Medien-Erkennung nachweisen** — lokal eine Dummy-Datei anlegen und per HEAD-Request prüfen, dass der Erkennungspfad greift (die Player-Einblendung selbst passiert clientseitig in `pruefeMedium()`):

```bash
cd ~/IT_Lernfeld1
printf 'dummy' > media/tag1-session1-video.mp4
python3 -m http.server 8123 >/dev/null 2>&1 & sleep 1
curl -s -I http://localhost:8123/media/tag1-session1-video.mp4 | head -1   # erwartet: 200
curl -s -I http://localhost:8123/media/tag1-session1-podcast.mp3 | head -1 # erwartet: 404
kill %1
rm media/tag1-session1-video.mp4   # Dummy NICHT committen
```

Vollständige Sichtprüfung des Players im Browser dem Nutzer beim ersten echten Upload überlassen (in Abschlussbericht aufnehmen).

- [ ] **Step 11: Abschlussbericht an den Nutzer** — Live-URL, Zugangscode `Lernfeld1`, Hinweis auf `media/README.md` (Video/Podcast-Upload, danach Sichtprüfung des Players) und `docs/errata.md` (gefundene Buchfehler) nennen.
