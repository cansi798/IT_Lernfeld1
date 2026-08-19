# Design: Lernplattform IT Lernfeld 1 — „Das Unternehmen und die eigene Rolle im Betrieb beschreiben"

**Datum:** 2026-08-19
**Status:** Entwurf zur Freigabe
**Repo:** https://github.com/cansi798/IT_Lernfeld1 (GitHub Pages, `main`-Branch, Root)

## 1. Ziel

Eine statische Lernplattform für einen 4-tägigen Kurs zu Lernfeld 1 der
IT-Berufe (Fachinformatiker). Jeder Kurstag besteht aus zwei Sessions.
Jede Session bietet: Präsentation, Handout, Video, Podcast, 40-Fragen-Quiz
und adaptierte Arbeitsbuch-Aufgaben („Lernbereich-Aufgaben").

**Quellen:**
- Lehrbuch: `Lernfeld 1.pdf` (108 Seiten, Kapitel 1.1–1.5) — lokal, nicht im Repo
- Arbeitsbuch: `Lernfeld1_Arbeitsbuch (optional).pdf` — lokal, nicht im Repo
- Gestaltungsvorlage: Beispielplattform `bfw_Lernplattform` (Farbwelt, Quiz-Overlay)

**Zugangscode:** `Lernfeld1` (JavaScript-Tor auf `index.html`; kein echter
Schutz, nur Zugangshürde — Plattform ist technisch öffentlich).

## 2. Getroffene Entscheidungen

| Thema | Entscheidung |
|---|---|
| Architektur | Eine HTML-Seite pro Session (8 Seiten) + Index; Quizdaten als separate JS-Dateien |
| Videos/Podcasts | Werden vom Kursleiter **später manuell** in `media/` hochgeladen; Seiten erkennen die Dateien automatisch |
| Medien-Namenskonvention | `media/tagN-sessionM-video.mp4` und `media/tagN-sessionM-podcast.mp3` |
| Arbeitsbuch-Aufgaben | **Adaptiert/umformuliert** (urheberrechtlich sauber), inhaltlich äquivalent, Fehler korrigiert |
| Fehler in Buch/Arbeitsbuch | Werden fachlich geprüft, auf der Plattform korrigiert und in `docs/errata.md` dokumentiert |
| Fußzeile | Auf **allen** Seiten „Lernfeld 1 Fachinformatiker" — **kein** „BFW"; grep-Audit vor jedem Abschluss |
| Deployment | GitHub Pages vom `main`-Branch (Root) |

## 3. Kursstruktur (4 Tage × 2 Sessions)

| Tag | Session 1 | Session 2 | Buchkapitel |
|---|---|---|---|
| 1 | IT-Berufe & duales System | Rechte & Pflichten in der Ausbildung, Arbeitsrecht & Mitbestimmung, Berufs-/Lebensplanung | 1.1 / 1.2 |
| 2 | Betrieb & Unternehmen: Modellunternehmen JIKU, Umfeld, Unternehmensziele | Rechtsformen & Aufbauorganisation | 1.3.1–1.3.3 / 1.3.4 |
| 3 | Wertschöpfungs- & Geschäftsprozesse, Produktionsfaktoren, Güterarten | Wirtschaftskreislauf & Marktsituationen | 1.3.5–1.3.6 / 1.4 |
| 4 | Präsentation vorbereiten & planen (Teamarbeit) | Präsentieren, Kontrolle & Reflexion + Gesamtwiederholung | 1.5.1–1.5.2 / 1.5.3 |

Bezug Arbeitsbuch: Lernsituation 1 „Wir beschreiben unsere Rolle im Betrieb"
(Tag 1), Lernsituation 2 „Wir beschreiben und präsentieren unseren
Ausbildungsbetrieb" (Tag 2–4). Die Arbeitsbuch-Aufgaben werden entsprechend
den Sessions zugeordnet.

## 4. Dateistruktur

```
IT_Lernfeld1/
├── index.html                  Zugangstor (Code: Lernfeld1) + Kursübersicht (4 Tageskarten → 8 Sessions)
├── tag1-session1.html          … bis tag4-session2.html (8 Session-Seiten)
├── assets/
│   ├── style.css               Gemeinsames Design
│   └── app.js                  Zugangstor-Logik, Quiz-Engine, Medien-Erkennung, Folien-Navigation
├── data/
│   └── quiz-t1s1.js … quiz-t4s2.js   8 Dateien à 40 Fragen (gesamt 320)
├── media/
│   └── README.md               Anleitung + Namenskonvention (Videos/Podcasts kommen später hierher)
├── docs/
│   ├── superpowers/specs/      Dieses Dokument
│   └── errata.md               Dokumentierte Fehler aus Buch/Arbeitsbuch
└── README.md
```

Verlagsmaterial (PDF-Quellen) wird nicht ins Repo aufgenommen (`.gitignore`
für `*.pdf` als Schutz gegen versehentliches Committen).

## 5. Session-Seite: Aufbau

Jede der 8 Seiten hat dieselben sechs Bereiche in fester Reihenfolge:

1. **Lernziele & Überblick** — Kapitelbezug, 4–6 Lernziele
2. **Präsentation** — Foliendeck im Browser: Folien als HTML-Abschnitte,
   Navigation über Buttons und Pfeiltasten, Folienzähler. Inhalt fachlich
   aus dem jeweiligen Buchkapitel erarbeitet (eigenständig formuliert).
3. **Handout** — kompakte Zusammenfassung (Merksätze, Tabellen,
   Schaubilder als HTML/CSS), druckoptimiert über Print-CSS + „Drucken"-Button.
4. **Video & Podcast** — zwei Platzhalterkarten. `app.js` prüft per
   `fetch(url, {method:'HEAD'})`, ob die Mediendatei existiert:
   vorhanden → `<video>`/`<audio>`-Player wird eingesetzt;
   404 → Hinweis „folgt in Kürze". Kein Codeeingriff beim Hochladen nötig.
5. **Lernbereich-Aufgaben** — adaptierte Arbeitsbuch-Aufgaben der Session,
   nummeriert, mit aufklappbaren Lösungshinweisen (`<details>`).
6. **Quiz** — Start-Button öffnet das 40-Fragen-Quiz als Overlay.

## 6. Quiz-Engine

**Datenformat** (pro Datei `data/quiz-tNsM.js`):

```js
window.QUIZ_DATA = {
  titel: "Tag 1 · Session 1 — IT-Berufe & duales System",
  fragen: [
    {
      frage: "…",
      optionen: ["A", "B", "C", "D"],
      richtig: 2,             // Index der richtigen Option
      erklaerung: "…"         // 1–2 Sätze, warum richtig
    }
    // … 40 Fragen
  ]
};
```

**Verhalten:** Overlay-Modal (wie Beispielplattform), Frage für Frage,
sofortiges Feedback (richtig/falsch + Erklärung), Fortschrittsanzeige
(„Frage 12/40"), Endauswertung mit Punktzahl und Prozent, „Nochmal"-Button.
Fragen decken den Sessionstoff systematisch ab (Wissen, Verständnis,
Anwendung). Keine Persistenz, kein Backend — bewusst einfach (YAGNI).

## 7. Qualitätssicherung der Inhalte

- Beim Adaptieren der Buch-/Arbeitsbuchaufgaben wird die fachliche
  Korrektheit geprüft (u. a. BBiG/JArbSchG-Regelungen, Rechtsformen-Details,
  Wirtschaftskreislauf, IT-Berufsbilder nach Neuordnung 2020).
- Gefundene Fehler: auf der Plattform in korrigierter Form, zusätzlich in
  `docs/errata.md` mit Fundstelle (Quelle, Seite/Aufgabe), Beschreibung des
  Fehlers und Korrektur.
- **Fußzeilen-Audit:** Vor jedem Abschluss wird geprüft
  (`grep -ri "bfw" *.html`), dass keine Seite „BFW" enthält; die Fußzeile
  lautet einheitlich „Lernfeld 1 Fachinformatiker".

## 8. Umsetzungsablauf & Commits

Etappen mit je einem Commit (mindestens):

1. Grundgerüst: `index.html`, `assets/`, `media/README.md`, `.gitignore`, Repo-README
2. Tag 1 (beide Sessions komplett: Seiten + Quizdaten + Aufgaben)
3. Tag 2, 4. Tag 3, 5. Tag 4
6. `docs/errata.md` + Fußzeilen-Audit + Endprüfung

Danach Push nach `main` und Aktivierung von GitHub Pages.

## 9. Tests / Abnahmekriterien

- Zugangstor: falscher Code → Fehlermeldung; `Lernfeld1` → Kursübersicht
- Alle 8 Session-Links funktionieren; keine toten Links
- Jedes Quiz lädt 40 Fragen, Auswertung rechnet korrekt
- Medien-Platzhalter: ohne Datei „folgt in Kürze"; mit Testdatei erscheint Player
- Print-Ansicht des Handouts ist lesbar (keine abgeschnittenen Bereiche)
- Fußzeilen-Audit besteht (kein „BFW", überall „Lernfeld 1 Fachinformatiker")
- Seiten funktionieren auf Mobilgeräten (responsive)

## 10. Nicht im Umfang (YAGNI)

- Kein Backend, keine Nutzerkonten, keine Fortschrittsspeicherung
- Keine automatische Medien-Konvertierung
- Kein Build-System / Site-Generator
- Videos/Podcasts selbst (werden später manuell ergänzt)
