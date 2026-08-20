// scripts/config.js
// Zentrale Session-Stammdaten — einzige Quelle für Ordnernamen/Slugs/Titel.
module.exports.SESSIONS = [
  { nr: 1, slug: 'IT-Berufe-und-duales-System', titel: 'IT-Berufe & duales System', quiz: 't1s1' },
  { nr: 2, slug: 'Rechte-Pflichten-und-Arbeitsrecht', titel: 'Rechte, Pflichten & Arbeitsrecht', quiz: 't1s2' },
  { nr: 3, slug: 'Betrieb-Unternehmen-und-Ziele', titel: 'Betrieb, Unternehmen & Unternehmensziele', quiz: 't2s1' },
  { nr: 4, slug: 'Rechtsformen-und-Aufbauorganisation', titel: 'Rechtsformen & Aufbauorganisation', quiz: 't2s2' },
  { nr: 5, slug: 'Geschaeftsprozesse-Produktionsfaktoren-Gueterarten', titel: 'Geschäftsprozesse, Produktionsfaktoren & Güterarten', quiz: 't3s1' },
  { nr: 6, slug: 'Wirtschaftskreislauf-und-Marktsituationen', titel: 'Wirtschaftskreislauf & Marktsituationen', quiz: 't3s2' },
  { nr: 7, slug: 'Praesentation-vorbereiten-und-planen', titel: 'Präsentation vorbereiten & planen', quiz: 't4s1' },
  { nr: 8, slug: 'Praesentieren-Feedback-und-Wiederholung', titel: 'Präsentieren, Feedback & Gesamtwiederholung', quiz: 't4s2' },
];
module.exports.folderOf = s => `Session-${s.nr}_${s.slug}`;
module.exports.ROOT = require('path').resolve(__dirname, '..');
