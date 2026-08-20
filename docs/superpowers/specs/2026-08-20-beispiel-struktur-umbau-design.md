# IT_Lernfeld1 — Umbau auf Beispiel-Lernplattform-Struktur

**Datum:** 2026-08-20
**Status:** Entwurf zur Abnahme
**Ersetzt teilweise:** `2026-08-19-it-lernfeld1-plattform-design.md` (die dort gebauten
Session-Seiten und Quiz-Daten bleiben Inhaltsquelle, die Plattform-Struktur wird ersetzt)

## Ziel

IT_Lernfeld1 wird nach dem Vorbild von `Beispiel_einer_Lernplattform` umgebaut:
ein Ordner pro Session mit vollständigem Artefakt-Satz (Handout-PDF, einzeln startbare
Präsentation, Quiz, vier Lernspiele, Aufgabenheft, Tagesplan, Literatur-Auszüge) plus
eine Kursübersicht mit Kacheln und ein neuer **Prüfungssimulator**.

## Rahmenentscheidungen (mit Nutzer abgestimmt)

1. **8 Session-Ordner** (Tag 1–4 × 2 Sessions bleiben als 8 Einheiten erhalten).
2. **Eigenständiges Projekt** — kein Merge in das Beispiel-Repo; Optik und Struktur folgen dem Beispiel.
3. **Podcast/Video:** Platzhalter-Kacheln, ausgegraut; Kursseite aktiviert die Kachel
   automatisch, sobald `Session-N_Podcast.m4a` / `Session-N_Video.mp4` im Ordner liegt.
4. **Literatur-Auszüge:** Lehrbuch **und** Arbeitsbuch werden pro Session gesplittet
   (bereits umgesetzt, `scripts/split_pdf.py`); PDFs sind urheberrechtlich geschützt
   und werden per `.gitignore` vom Repo ausgeschlossen (wie im Beispiel).
5. **Artefakte werden generiert** (Pipeline des Beispiels adaptiert), nicht von Hand gepflegt.

## Sessions und Quellen-Zuordnung

| Nr | Slug | Lehrbuch (PDF-S.) | Arbeitsbuch (PDF-S.) | Inhaltsquelle (bestehend) |
|----|------|-------------------|----------------------|---------------------------|
| 1 | IT-Berufe-und-duales-System | 1–12 | 1–7 | tag1-session1.html, quiz-t1s1.js |
| 2 | Rechte-Pflichten-und-Arbeitsrecht | 13–31 | 8–30 | tag1-session2.html, quiz-t1s2.js |
| 3 | Betrieb-Unternehmen-und-Ziele | 32–56 | 31–46 | tag2-session1.html, quiz-t2s1.js |
| 4 | Rechtsformen-und-Aufbauorganisation | 57–71 | 47–55 | tag2-session2.html, quiz-t2s2.js |
| 5 | Geschaeftsprozesse-Produktionsfaktoren-Gueterarten | 72–84 | 56–68 | tag3-session1.html, quiz-t3s1.js |
| 6 | Wirtschaftskreislauf-und-Marktsituationen | 85–97 | 69–80 | tag3-session2.html, quiz-t3s2.js |
| 7 | Praesentation-vorbereiten-und-planen | 98–107 | 80–82 | tag4-session1.html, quiz-t4s1.js |
| 8 | Praesentieren-Feedback-und-Wiederholung | 108 | 81–82 | tag4-session2.html, quiz-t4s2.js |

Gesplittete Auszüge liegen unter `~/IT_Lernfeld1_quellen/split/{lehrbuch,arbeitsbuch}/`
als PDF + TXT (TXT = Arbeitsgrundlage für Handouts, Karteikarten, Wortlisten).

## Zielstruktur

```
IT_Lernfeld1/
├── index.html                          Kursübersicht im Beispiel-Stil (Kacheln je Session)
├── pruefungssimulator.html             eigenständige Seite, s. u.
├── Session-N_<Slug>/                   8 Ordner, je:
│   ├── Tagesplan_<Slug>.md
│   ├── Grundlagen_<Slug>.pdf           Lehrbuch-Auszug   (generiert, nicht im Git)
│   ├── Arbeitsbuch_<Slug>.pdf          Arbeitsbuch-Auszug (generiert, nicht im Git)
│   ├── Handout_<Slug>.tex + .pdf       LaTeX, templates/bfw-style.tex
│   ├── Aufgaben_<Slug>.md
│   ├── Aufgabenheft_<Slug>.tex + .pdf
│   ├── Praesentation_<Slug>.html       einzeln startbare Folien
│   ├── Quiz_<Slug>.html                aus den 40 Session-Fragen
│   ├── Karteikarten_<Slug>.html        ~20 Karten
│   ├── Memory_<Slug>.html              Begriffspaare
│   ├── Wordle_<Slug>.html + Hangman_<Slug>.html   gemeinsame Wortliste (~60 Wörter)
│   └── (Session-N_Podcast.m4a / _Video.mp4 — optional, aktiviert Kachel)
├── data/quiz-t*.js                     bleibt: 8×40 Fragen, einzige Fragen-Quelle
├── scripts/                            Pipeline (s. u.) + Daten (JSON) + Templates
├── templates/                          bfw-style.tex/.css (aus Beispiel kopiert)
└── docs/superpowers/…                  Specs & Pläne
```

Die alten Seiten `tagX-sessionY.html` + `assets/` bleiben bis zur Abnahme der neuen
Struktur unangetastet und werden erst danach entfernt (eigener Commit).

## Kursseite (index.html)

Wie `kurs-lernfeld1.html` im Beispiel: Zugangs-Gate (Code wie bisher), pro Session eine
Kachel-Gruppe mit Links auf Präsentation, Handout, Quiz, Karteikarten, Wordle, Hangman,
Memory, Aufgabenheft, Grundlagen- und Arbeitsbuch-Auszug; Podcast/Video ausgegraut
(„folgt"), per `fetch`-HEAD-Check aktiviert, wenn die Datei existiert. Zusätzlich eine
hervorgehobene Kachel **Prüfungssimulator**. Session-Metadaten (Titel, Slug, Ordner)
stehen als JS-Konstante `SESSIONS` in der Seite — analog zum Beispiel.

**Abmelden:** Im Kopfbereich der Kursseite gibt es einen „Abmelden"-Button (fehlt im
Beispiel). Er löscht die Freischaltung (`localStorage.removeItem(...)`) und zeigt
wieder das Zugangscode-Gate. Der Button erscheint nur im freigeschalteten Zustand.

**Keine GitHub-Verlinkung:** Anders als das Beispiel enthält die Kursseite (und alle
anderen Seiten) KEINE Fußnote/Link auf ein GitHub-Repository (Nutzer-Anforderung
vom 2026-08-20).

## Prüfungssimulator (pruefungssimulator.html)

Eigenständige Seite, lädt alle 8 `data/quiz-t*.js` (320 Fragen). Drei Modi:

1. **Einzeln üben:** eine Session wählen → alle 40 Fragen, Sofort-Feedback mit Erklärung.
2. **Gebündelt üben:** Sessions per Checkbox kombinieren → Fragen gemischt, Sofort-Feedback.
3. **Prüfungssimulation:** 30 Zufallsfragen über alle Sessions (mind. 2 je Session,
   Rest zufällig), keine Zwischenauflösung; am Ende Auswertung mit Punkten, Prozent,
   IHK-Notenschlüssel (≥ 50 % bestanden), Einzel-Feedback je Frage mit Erklärung und
   Themen-Auswertung je Session („Session 3 wiederholen").

Kein Backend, kein LocalStorage-Zwang; Fragen werden per Fisher-Yates gemischt,
Antwort-Reihenfolge ebenfalls.

## Pipeline (scripts/)

Adaptiert aus dem Beispiel, Pfade **relativ zum Repo-Root** (kein hartes `/media/sf_BFW`):

| Skript | Eingabe | Ausgabe |
|---|---|---|
| `split_pdf.py` (fertig) | Quell-PDFs + Seitentabelle | Grundlagen-/Arbeitsbuch-Auszüge |
| `build-spiele.js` | `scripts/spiele-data/session-N.json` (Wortliste ~60) | Wordle + Hangman HTML |
| `build-karteikarten.js` | `scripts/karteikarten-data/session-N.json` (~20 Karten) | Karteikarten HTML |
| `build-memory.js` | `scripts/memory-data/session-N.json` (Paare) | Memory HTML |
| `build-quiz.js` (neu) | `data/quiz-tNsM.js` | Quiz HTML je Session |
| `build_tex.py` | `Handout_*.tex`, `Aufgabenheft_*.tex` | PDFs via pdflatex |
| `audit-links.js` (neu) | index.html + Ordner | prüft: jede Kachel-Datei existiert |

Templates (`wordle-`, `hangman-`, `karteikarten-`, `memory-template.html`) werden aus dem
Beispiel kopiert und nur im Branding angepasst (Kurs-Titel, Zurück-Link).

## Inhalte-Erstellung je Session

Aus bestehenden Session-Seiten + Lehrbuch-/Arbeitsbuch-TXT werden je Session erstellt:
Tagesplan (Ablauf, Lernziele), Handout-TeX (Kerninhalte, 4–6 Seiten), Aufgaben.md +
Aufgabenheft-TeX (Übungsaufgaben, angelehnt ans Arbeitsbuch, ohne dessen Text zu
kopieren), Präsentations-HTML (Folienstruktur aus Session-Seite), Karteikarten-,
Memory- und Wortlisten-JSON. Fachliche Korrektheit prüft je Session ein Review gegen
den Lehrbuch-Auszug (wie beim Erstaufbau, siehe Errata-Historie).

## Qualität & Abnahme

- `audit-links.js`: 0 tote Kachel-Links.
- `build_tex.py`: alle 16 PDFs bauen ohne LaTeX-Fehler.
- Playwright-Stichprobe: Kursseite, 1 Präsentation, 1 Quiz, alle 3 Simulator-Modi,
  je 1 Spiel pro Typ laden fehlerfrei (keine Konsolen-Errors).
- Fragen-Validierung: 8×40 Fragen, `richtig`-Index in [0..3], keine Duplikate.
- Git: ein Commit pro Session/Baustein; Arbeit in `~/IT_Lernfeld1`, am Ende Sync
  nach `/media/sf_Lernfeld_1/IT_Lernfeld1` (inkl. `git config core.fileMode false`).

## Nicht im Umfang

- Produktion von Podcast-/Video-Dateien.
- Änderungen am Beispiel-Repo `Beispiel_einer_Lernplattform`.
- GitHub-Pages-Deployment (kann später ergänzt werden).
