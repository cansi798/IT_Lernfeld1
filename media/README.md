# Medien — Videos & Podcasts

Mediendateien gehören **nicht** in diesen Ordner, sondern jeweils in den
zugehörigen Session-Ordner. Die Kursseite erkennt die Dateien automatisch
und aktiviert die Kacheln — **kein Codeeingriff nötig**, einfach Datei
hochladen, committen, pushen.

## Namenskonvention (verbindlich)

Lege die Datei im Session-Ordner ab:

```
Session-N_<Slug>/Session-N_Video.mp4
Session-N_<Slug>/Session-N_Podcast.m4a
```

Beispiele:

| Session | Video | Podcast |
|---------|-------|---------|
| Session 1 | `Session-1_IT-Berufe-und-duales-System/Session-1_Video.mp4` | `Session-1_IT-Berufe-und-duales-System/Session-1_Podcast.m4a` |
| Session 2 | `Session-2_Rechte-Pflichten-und-Arbeitsrecht/Session-2_Video.mp4` | `Session-2_Rechte-Pflichten-und-Arbeitsrecht/Session-2_Podcast.m4a` |
| Session 3 | `Session-3_Betrieb-Unternehmen-und-Ziele/Session-3_Video.mp4` | `Session-3_Betrieb-Unternehmen-und-Ziele/Session-3_Podcast.m4a` |
| … | … | … |

Solange eine Datei fehlt, zeigt die Seite „folgt in Kürze".
Hinweis: GitHub begrenzt Dateien auf 100 MB; Videos ggf. komprimieren
oder per Git LFS verwalten.
