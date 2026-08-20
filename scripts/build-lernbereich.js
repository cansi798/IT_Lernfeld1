#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');
const { SESSIONS, folderOf, ROOT } = require('./config');

const DATA_DIR = path.join(__dirname, 'data', 'lernbereich');
const TPL_PATH = path.join(__dirname, 'lernbereich-template.html');

function loadSessionData(nr) {
  const file = path.join(DATA_DIR, `session-${nr}.json`);
  if (!fs.existsSync(file)) {
    console.warn(`WARNUNG: Datendatei nicht gefunden – übersprungen: ${file}`);
    return null;
  }
  let raw;
  try {
    raw = fs.readFileSync(file, 'utf8');
  } catch (e) {
    console.warn(`WARNUNG: Fehler beim Lesen von ${file}: ${e.message} – übersprungen.`);
    return null;
  }
  let data;
  try {
    data = JSON.parse(raw);
  } catch (e) {
    console.error(`FEHLER: Ungültiges JSON in ${file}: ${e.message}`);
    process.exit(1);
  }
  return data;
}

function validateData(data, nr) {
  const file = `session-${nr}.json`;
  if (!data.session || !data.thema || !data.slug) {
    console.error(`FEHLER: ${file} fehlt eines von: session, thema, slug`);
    process.exit(1);
  }
  if (!Array.isArray(data.aufgaben) || data.aufgaben.length === 0) {
    console.error(`FEHLER: ${file} enthält keine Aufgaben.`);
    process.exit(1);
  }
  const nrs = new Set();
  for (let i = 0; i < data.aufgaben.length; i++) {
    const a = data.aufgaben[i];
    const idx = i + 1;
    if (a.nr === undefined || a.nr === null || String(a.nr).trim() === '') {
      console.error(`FEHLER: ${file} Aufgabe ${idx}: Feld "nr" fehlt oder leer.`);
      process.exit(1);
    }
    if (!a.titel || String(a.titel).trim() === '') {
      console.error(`FEHLER: ${file} Aufgabe ${idx} (nr=${a.nr}): Feld "titel" fehlt oder leer.`);
      process.exit(1);
    }
    if (a.punkte === undefined || a.punkte === null || String(a.punkte).trim() === '') {
      console.error(`FEHLER: ${file} Aufgabe ${idx} (nr=${a.nr}): Feld "punkte" fehlt oder leer.`);
      process.exit(1);
    }
    if (!a.aufgabentext || String(a.aufgabentext).trim() === '') {
      console.error(`FEHLER: ${file} Aufgabe ${idx} (nr=${a.nr}): Feld "aufgabentext" fehlt oder leer.`);
      process.exit(1);
    }
    if (!a.loesung || String(a.loesung).trim() === '') {
      console.error(`FEHLER: ${file} Aufgabe ${idx} (nr=${a.nr}): Feld "loesung" fehlt oder leer.`);
      process.exit(1);
    }
    const key = String(a.nr);
    if (nrs.has(key)) {
      console.error(`FEHLER: ${file} Aufgabe-Nr. ${a.nr} ist nicht eindeutig.`);
      process.exit(1);
    }
    nrs.add(key);
  }
}

function buildPage(tpl, sessionCfg, data) {
  const html = tpl
    .replaceAll('{{NR}}', String(sessionCfg.nr))
    .replaceAll('{{THEMA}}', data.thema)
    .replace('{{AUFGABEN_JSON}}', JSON.stringify(data.aufgaben));
  return html;
}

if (require.main === module) {
  const tpl = fs.readFileSync(TPL_PATH, 'utf8');
  const filter = process.argv[2];

  for (const s of SESSIONS) {
    if (filter && filter !== `session-${s.nr}`) continue;

    const data = loadSessionData(s.nr);
    if (!data) continue; // skip with warning already printed

    validateData(data, s.nr);

    const html = buildPage(tpl, s, data);
    const outDir = path.join(ROOT, folderOf(s));
    const outFile = path.join(outDir, `Lernbereich_${data.slug}.html`);
    fs.writeFileSync(outFile, html);
    console.log(`Session ${s.nr}: ${data.aufgaben.length} Aufgaben -> ${path.relative(ROOT, outFile)}`);
  }
}
