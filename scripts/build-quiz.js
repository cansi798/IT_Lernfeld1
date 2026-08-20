#!/usr/bin/env node
const fs = require('fs'); const path = require('path'); const vm = require('vm');
const { SESSIONS, folderOf, ROOT } = require('./config');

function loadQuizData(quizId) {
  const src = fs.readFileSync(path.join(ROOT, 'data', `quiz-${quizId}.js`), 'utf8');
  const sandbox = { window: {} };
  vm.runInNewContext(src, sandbox);           // führt "window.QUIZ_DATA = {...}" aus
  const d = sandbox.window.QUIZ_DATA;
  if (!d || !Array.isArray(d.fragen)) throw new Error(`QUIZ_DATA fehlt in quiz-${quizId}.js`);
  d.fragen.forEach((f, i) => {
    if (!f.frage || f.optionen.length !== 4 || f.richtig < 0 || f.richtig > 3 || !f.erklaerung)
      throw new Error(`quiz-${quizId}.js Frage ${i + 1} ungültig`);
  });
  return d;
}
module.exports = { loadQuizData };

if (require.main === module) {
  const tpl = fs.readFileSync(path.join(__dirname, 'quiz-template.html'), 'utf8');
  const filter = process.argv[2];
  for (const s of SESSIONS) {
    if (filter && filter !== `session-${s.nr}`) continue;
    const data = loadQuizData(s.quiz);
    const html = tpl.replaceAll('{{NR}}', String(s.nr)).replaceAll('{{THEMA}}', s.titel)
      .replace('{{QUIZ_JSON}}', JSON.stringify(data.fragen));
    const out = path.join(ROOT, folderOf(s), `Quiz_${s.slug}.html`);
    fs.writeFileSync(out, html);
    console.log(`Session ${s.nr}: ${data.fragen.length} Fragen -> ${path.basename(out)}`);
  }
}
