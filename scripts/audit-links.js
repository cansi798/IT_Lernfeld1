#!/usr/bin/env node
// scripts/audit-links.js
// Prüft, ob alle erwarteten Dateien in den Session-Ordnern vorhanden sind
// und ob index.html alle Session-Slugs + pruefungssimulator.html enthält.
// Exit 0 = alles ok, Exit 1 = Fehler gefunden.

const fs = require('fs');
const path = require('path');
const { SESSIONS, folderOf, ROOT } = require('./config');

const errors = [];
const warnings = [];

// Pflicht-Dateien: fehlen = FEHLER
const REQUIRED = (slug) => [
  `Tagesplan_${slug}.md`,
  `Handout_${slug}.tex`,
  `Handout_${slug}.pdf`,
  `Aufgaben_${slug}.md`,
  `Aufgabenheft_${slug}.tex`,
  `Aufgabenheft_${slug}.pdf`,
  `Praesentation_${slug}.html`,
  `Quiz_${slug}.html`,
  `Karteikarten_${slug}.html`,
  `Memory_${slug}.html`,
  `Wordle_${slug}.html`,
  `Hangman_${slug}.html`,
];

// Optionale Dateien: fehlen = nur WARNUNG
const OPTIONAL = (slug) => [
  `Grundlagen_${slug}.pdf`,
  `Arbeitsbuch_${slug}.pdf`,
];

console.log('=== Link-Audit ===\n');

for (const s of SESSIONS) {
  const folder = path.join(ROOT, folderOf(s));
  const slug = s.slug;

  if (!fs.existsSync(folder)) {
    errors.push(`FEHLER: Ordner nicht gefunden: ${folderOf(s)}`);
    continue;
  }

  for (const file of REQUIRED(slug)) {
    const fullPath = path.join(folder, file);
    if (!fs.existsSync(fullPath)) {
      errors.push(`FEHLER [Session ${s.nr}]: ${file} fehlt`);
    }
  }

  for (const file of OPTIONAL(slug)) {
    const fullPath = path.join(folder, file);
    if (!fs.existsSync(fullPath)) {
      warnings.push(`WARNUNG [Session ${s.nr}]: ${file} fehlt (optional)`);
    }
  }
}

// index.html prüfen
const indexPath = path.join(ROOT, 'index.html');
if (!fs.existsSync(indexPath)) {
  errors.push('FEHLER: index.html nicht gefunden');
} else {
  const indexContent = fs.readFileSync(indexPath, 'utf8');

  for (const s of SESSIONS) {
    if (!indexContent.includes(s.slug)) {
      errors.push(`FEHLER: index.html enthält nicht den Session-Slug "${s.slug}"`);
    }
  }

  if (!indexContent.includes('pruefungssimulator.html')) {
    errors.push('FEHLER: index.html enthält nicht "pruefungssimulator.html"');
  }
}

// Ausgabe
if (warnings.length > 0) {
  console.warn('--- Warnungen ---');
  for (const w of warnings) console.warn(w);
  console.warn('');
}

if (errors.length > 0) {
  console.error('--- Fehler ---');
  for (const e of errors) console.error(e);
  console.error(`\n${errors.length} Fehler gefunden.`);
  process.exit(1);
} else {
  console.log(`Alle Pflichtdateien vorhanden. ${warnings.length} Warnung(en).`);
  process.exit(0);
}
