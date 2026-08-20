#!/usr/bin/env bash
# Spiegelt das Projekt in den VirtualBox-Shared-Folder (ohne .git-Interna zu beschädigen).
set -euo pipefail
SRC="$HOME/IT_Lernfeld1/"
DST="/media/sf_Lernfeld_1/IT_Lernfeld1/"
rsync -av --exclude '.git/' "$SRC" "$DST"
cd "$DST" && git --git-dir="$DST/.git" config core.fileMode false 2>/dev/null || true
echo "Sync fertig: $DST"
