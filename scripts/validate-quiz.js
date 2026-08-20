#!/usr/bin/env node
// scripts/validate-quiz.js
// Lädt alle 8 Quiz-Pools via loadQuizData und prüft:
//  - genau 40 Fragen je Session
//  - richtig ∈ 0..3
//  - 4 nichtleere Optionen
//  - erklaerung vorhanden
//  - keine identische frage innerhalb einer Session
//  - keine identische frage über Sessions hinweg (Cross-Session-Duplikate)
// Exit 0 = alles ok, Exit 1 = Fehler gefunden.

const { SESSIONS } = require('./config');
const { loadQuizData } = require('./build-quiz');

const errors = [];

// Map: fragentext -> [{session, index}]
const allFragen = new Map();

console.log('=== Quiz-Validierung ===\n');

for (const s of SESSIONS) {
  let data;
  try {
    data = loadQuizData(s.quiz);
  } catch (e) {
    errors.push(`FEHLER [Session ${s.nr}]: ${e.message}`);
    continue;
  }

  const fragen = data.fragen;

  // 1. Exakt 40 Fragen
  if (fragen.length !== 40) {
    errors.push(`FEHLER [Session ${s.nr}]: ${fragen.length} Fragen (erwartet: 40)`);
  }

  // Session-interne Duplikat-Erkennung
  const sessionFragen = new Map();

  for (let i = 0; i < fragen.length; i++) {
    const f = fragen[i];
    const idx = i + 1;

    // 2. richtig ∈ 0..3
    if (typeof f.richtig !== 'number' || f.richtig < 0 || f.richtig > 3) {
      errors.push(`FEHLER [Session ${s.nr}, Frage ${idx}]: richtig=${f.richtig} ungültig (erwartet 0-3)`);
    }

    // 3. 4 nichtleere Optionen
    if (!Array.isArray(f.optionen) || f.optionen.length !== 4) {
      errors.push(`FEHLER [Session ${s.nr}, Frage ${idx}]: ${f.optionen ? f.optionen.length : 0} Optionen (erwartet: 4)`);
    } else {
      for (let j = 0; j < f.optionen.length; j++) {
        if (!f.optionen[j] || String(f.optionen[j]).trim() === '') {
          errors.push(`FEHLER [Session ${s.nr}, Frage ${idx}]: Option ${j + 1} ist leer`);
        }
      }
    }

    // 4. erklaerung vorhanden
    if (!f.erklaerung || String(f.erklaerung).trim() === '') {
      errors.push(`FEHLER [Session ${s.nr}, Frage ${idx}]: erklaerung fehlt oder leer`);
    }

    // 5. Intra-Session-Duplikate
    if (!f.frage || String(f.frage).trim() === '') {
      errors.push(`FEHLER [Session ${s.nr}, Frage ${idx}]: frage fehlt oder leer`);
      continue;
    }

    const norm = f.frage.trim();
    if (sessionFragen.has(norm)) {
      const prev = sessionFragen.get(norm);
      const preview = norm.length > 80 ? norm.substring(0, 80) + "..." : norm;
      errors.push(`FEHLER [Session ${s.nr}]: Duplikat-Frage: Frage ${prev} und Frage ${idx}: "${preview}"`);
    } else {
      sessionFragen.set(norm, idx);
    }

    // Für Cross-Session-Prüfung sammeln
    const loc = { session: s.nr, index: idx };
    if (!allFragen.has(norm)) {
      allFragen.set(norm, [loc]);
    } else {
      allFragen.get(norm).push(loc);
    }
  }

  console.log(`Session ${s.nr} (${s.quiz}): ${fragen.length} Fragen geladen.`);
}

// 6. Cross-Session-Duplikate
console.log('');
let crossDupCount = 0;
for (const [frage, locs] of allFragen) {
  if (locs.length > 1) {
    // Nur ausgeben, wenn aus verschiedenen Sessions
    const sessions = new Set(locs.map(l => l.session));
    if (sessions.size > 1) {
      crossDupCount++;
      const locStr = locs.map(l => `Session ${l.session} Frage ${l.index}`).join(' UND ');
      const preview = frage.length > 80 ? frage.substring(0, 80) + "..." : frage;
      errors.push(`FEHLER: Cross-Session-Duplikat: "${preview}" → ${locStr}`);
    }
  }
}

if (crossDupCount > 0) {
  console.error(`${crossDupCount} Cross-Session-Duplikate gefunden.`);
}

// Ausgabe
if (errors.length > 0) {
  console.error('--- Fehler ---');
  for (const e of errors) console.error(e);
  console.error(`\n${errors.length} Fehler gefunden.`);
  process.exit(1);
} else {
  console.log('Alle Quiz-Daten valide. Keine Fehler.');
  process.exit(0);
}
