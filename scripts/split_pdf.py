#!/usr/bin/env python3
"""Splittet Lehrbuch- und Arbeitsbuch-PDF in Session-Auszüge.

Quellen (VirtualBox-Shared-Folder):
  Lernfeld 1.pdf                      108 Seiten (Lehrbuch, Textebene)
  Lernfeld1_Arbeitsbuch (optional).pdf 82 Seiten (Scan mit OCR-Ebene)

Ausgabe: <OUT>/lehrbuch/Session-N_<slug>.pdf (+ .txt) und
         <OUT>/arbeitsbuch/Session-N_<slug>.pdf (+ .txt)

Seitengrenzen wurden aus den Abschnittsüberschriften (Lehrbuch) bzw.
per Themen-Schlüsselwort-Analyse der OCR-Ebene (Arbeitsbuch) ermittelt.
Aufruf:  python3 scripts/split_pdf.py [nur-session-nr]
"""
import subprocess
import sys
from pathlib import Path

from pypdf import PdfReader, PdfWriter

SRC_DIR = Path("/media/sf_Lernfeld_1")
LEHRBUCH = SRC_DIR / "Lernfeld 1.pdf"
ARBEITSBUCH = SRC_DIR / "Lernfeld1_Arbeitsbuch (optional).pdf"
OUT = Path.home() / "IT_Lernfeld1_quellen" / "split"

# (nr, slug, lehrbuch (von, bis), arbeitsbuch (von, bis)) — PDF-Seiten, 1-basiert, inklusive
SESSIONS = [
    (1, "IT-Berufe-und-duales-System",                      (1, 12),   (1, 7)),
    (2, "Rechte-Pflichten-und-Arbeitsrecht",                (13, 31),  (8, 30)),
    (3, "Betrieb-Unternehmen-und-Ziele",                    (32, 56),  (31, 46)),
    (4, "Rechtsformen-und-Aufbauorganisation",              (57, 71),  (47, 55)),
    (5, "Geschaeftsprozesse-Produktionsfaktoren-Gueterarten", (72, 84), (56, 68)),
    (6, "Wirtschaftskreislauf-und-Marktsituationen",        (85, 97),  (69, 80)),
    (7, "Praesentation-vorbereiten-und-planen",             (98, 107), (80, 82)),
    (8, "Praesentieren-Feedback-und-Wiederholung",          (108, 108), (81, 82)),
]


def split(src: Path, first: int, last: int, dest: Path) -> None:
    reader = PdfReader(src)
    writer = PdfWriter()
    for pg in range(first - 1, last):
        writer.add_page(reader.pages[pg])
    dest.parent.mkdir(parents=True, exist_ok=True)
    with open(dest, "wb") as fh:
        writer.write(fh)


def extract_text(src: Path, first: int, last: int, dest: Path) -> None:
    subprocess.run(
        ["pdftotext", "-layout", "-f", str(first), "-l", str(last), str(src), str(dest)],
        check=True,
    )


def main() -> None:
    only = int(sys.argv[1]) if len(sys.argv) > 1 else None
    for nr, slug, lb_range, ab_range in SESSIONS:
        if only and nr != only:
            continue
        for kind, src, (first, last) in [
            ("lehrbuch", LEHRBUCH, lb_range),
            ("arbeitsbuch", ARBEITSBUCH, ab_range),
        ]:
            pdf = OUT / kind / f"Session-{nr}_{slug}.pdf"
            split(src, first, last, pdf)
            extract_text(src, first, last, pdf.with_suffix(".txt"))
            print(f"Session {nr} {kind}: S.{first}-{last} -> {pdf.name} ({last - first + 1} Seiten)")
            # Zusätzlich in den Session-Ordner der Plattform legen
            repo = Path.home() / "IT_Lernfeld1"
            art = "Grundlagen" if kind == "lehrbuch" else "Arbeitsbuch"
            sess_dir = repo / f"Session-{nr}_{slug}"
            if sess_dir.is_dir():
                import shutil
                shutil.copy2(pdf, sess_dir / f"{art}_{slug}.pdf")


if __name__ == "__main__":
    main()
