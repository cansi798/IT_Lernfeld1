# IT Lernfeld 1 — Lernplattform

Kursplattform für **Lernfeld 1: „Das Unternehmen und die eigene Rolle im
Betrieb beschreiben"** (IT-Berufe / Fachinformatiker).

Die Kursseite (`index.html`) ist mit einem Zugangscode geschützt. Der
Zugangscode ist ein einfacher Zugriffsschutz (im Quelltext von `index.html`
einsehbar) — kein Sicherheitsmerkmal.

> **Hinweis Verlagsmaterial:** Die Grundlagen-PDFs und Arbeitsbuch-PDFs
> (Auszüge aus dem Lehrbuch) sind reines lokales Arbeitsmaterial, aus
> urheberrechtlichen Gründen nicht im Repository (`.gitignore`) und werden
> auf der Kursseite nicht verlinkt.

---

## Aufbau

8 Sessions in 4 Kurstagen. Jede Session hat einen eigenen Ordner
`Session-<Nr>_<Slug>/` mit vollständigem Artefakt-Satz.

| Nr | Ordner-Slug | Tag |
|----|-------------|-----|
| 1 | IT-Berufe-und-duales-System | 1 |
| 2 | Rechte-Pflichten-und-Arbeitsrecht | 1 |
| 3 | Betrieb-Unternehmen-und-Ziele | 2 |
| 4 | Rechtsformen-und-Aufbauorganisation | 2 |
| 5 | Geschaeftsprozesse-Produktionsfaktoren-Gueterarten | 3 |
| 6 | Wirtschaftskreislauf-und-Marktsituationen | 3 |
| 7 | Praesentation-vorbereiten-und-planen | 4 |
| 8 | Praesentieren-Feedback-und-Wiederholung | 4 |

### Artefakte je Session

```
Session-N_<Slug>/
├── Praesentation_<Slug>.html       # Foliendeck (Browser)
├── Handout_<Slug>.pdf              # Druckbares Handout
├── Handout_<Slug>.tex              # LaTeX-Quelle
├── Aufgabenheft_<Slug>.pdf         # Aufgabenheft
├── Aufgabenheft_<Slug>.tex         # LaTeX-Quelle
├── Grundlagen_<Slug>.pdf           # Lehrbuch-Auszug (nur lokal, ohne Kachel)
├── Arbeitsbuch_<Slug>.pdf          # Arbeitsbuch-Auszug (nur lokal, ohne Kachel)
├── Quiz_<Slug>.html                # Interaktives Quiz
├── Hangman_<Slug>.html             # Hangman-Spiel
├── Wordle_<Slug>.html              # Wordle-Spiel
├── Memory_<Slug>.html              # Memory-Kartenspiel
├── Karteikarten_<Slug>.html        # Karteikarten-Lernset
├── Lernbereich_<Slug>.html         # Interaktive Aufgabenbearbeitung mit localStorage-Speicherung und einblendbarer Musterlösung
├── Aufgaben_<Slug>.md              # Aufgaben-Quelldaten (Markdown)
└── Tagesplan_<Slug>.md             # Tagesplanung
```

### Weitere Verzeichnisse

```
data/                    # Quiz-Quelldaten (JSON, eine Datei je Session)
media/                   # Videos & Podcast-Audiodateien liegen im jeweiligen Session-Ordner
scripts/                 # Build- und Audit-Skripte
templates/               # HTML/CSS-Vorlagen
docs/
├── errata.md            # Quellfehler-Protokoll
└── superpowers/specs/   # Planungsdokumente
```

---

## Build-Pipeline

Alle Skripte arbeiten config-basiert (`scripts/config.js`) — keine harten
Session-Pfade im Code.

### PDF-Auszüge extrahieren

```bash
# Grundlagen- und Arbeitsbuch-PDFs aus dem Lehrbuch-PDF heraustrennen
python3 scripts/split_pdf.py
```

### Lernbereich generieren

```bash
# Interaktive Aufgabenbearbeitung (Lernbereich_<Slug>.html) aus scripts/data/lernbereich/session-N.json bauen
node scripts/build-lernbereich.js
```

### Spiele & Karteikarten generieren

```bash
# Hangman, Wordle, Memory, Karteikarten aus scripts/data/{karteikarten,spiele}/session-N.json bauen
node scripts/build-spiele-und-karten.js
```

### Quiz generieren

```bash
# Quiz-HTMLs aus data/quiz-tNsM.js bauen
node scripts/build-quiz.js
```

### LaTeX-PDFs bauen (Handout & Aufgabenheft)

```bash
# .tex → .pdf für alle Sessions (benötigt xelatex im PATH)
python3 scripts/build_tex.py
```

### Audits

```bash
# Interne Links prüfen + Quiz-Daten validieren
node scripts/audit-links.js && node scripts/validate-quiz.js && echo OK
```

---

## Neue Session ergänzen

1. **`scripts/config.js`** — neuen Eintrag im `SESSIONS`-Array hinzufügen
   (`nr`, `slug`, `titel`, `quiz`-Kürzel).
2. **Daten anlegen** — `scripts/data/karteikarten/session-N.json` und
   `scripts/data/spiele/session-N.json` mit Karten-/Spieldaten befüllen
   (Schema: vorhandene JSON-Dateien als Vorlage).
3. **LaTeX-Quellen** — `Session-<Nr>_<Slug>/Handout_<Slug>.tex` und
   `Aufgabenheft_<Slug>.tex` anlegen.
4. **Bauen** — Build-Skripte der Reihe nach ausführen (s. o.).
5. **Audits** — `node scripts/audit-links.js && node scripts/validate-quiz.js`
   grün halten.

---

## Hinweise

- Verlagsmaterial (Grundlagen-/Arbeitsbuch-PDFs) ist nicht eingecheckt
  (`.gitignore`); alle eigenständig formulierten Inhalte sind frei lizenzierbar.
- Gefundene Quellfehler: `docs/errata.md`.
- Design-Dokument: `docs/superpowers/specs/2026-08-20-beispiel-struktur-umbau-design.md`
- Sync in den VirtualBox-Shared-Folder: `bash scripts/sync-to-shared.sh`
