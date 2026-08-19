/* Lernfeld 1 Fachinformatiker — gemeinsame Logik aller Seiten */

const LF1 = {
  code: 'lernfeld1',               // Zugangscode (Vergleich kleingeschrieben)
  storageKey: 'it_lf1_unlocked'
};

/* ---------- Zugangstor (nur index.html) ---------- */
function initGate() {
  const gate = document.getElementById('gate');
  const grid = document.getElementById('tagGrid');
  if (!gate || !grid) return;
  const form = document.getElementById('gateForm');
  const input = document.getElementById('gateInput');
  const error = document.getElementById('gateError');

  function freischalten() {
    localStorage.setItem(LF1.storageKey, '1');
    gate.style.display = 'none';
    grid.style.display = 'grid';
  }

  if (localStorage.getItem(LF1.storageKey) === '1') { freischalten(); return; }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value.trim().toLowerCase() === LF1.code) {
      error.textContent = '';
      freischalten();
    } else {
      error.textContent = 'Falscher Zugangscode. Bitte erneut versuchen.';
      input.value = '';
      input.focus();
    }
  });
}

/* ---------- Session-Schutz ---------- */
function guardSession() {
  if (localStorage.getItem(LF1.storageKey) !== '1') location.href = 'index.html';
}

/* ---------- Foliendeck ---------- */
function initSlides() {
  const deck = document.getElementById('slides');
  if (!deck) return;
  const slides = Array.from(deck.querySelectorAll('.slide'));
  const counter = document.getElementById('slideCounter');
  let idx = 0;
  function zeige(i) {
    idx = Math.max(0, Math.min(slides.length - 1, i));
    slides.forEach((s, n) => s.classList.toggle('aktiv', n === idx));
    counter.textContent = (idx + 1) + ' / ' + slides.length;
  }
  document.getElementById('slidePrev').addEventListener('click', () => zeige(idx - 1));
  document.getElementById('slideNext').addEventListener('click', () => zeige(idx + 1));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') zeige(idx - 1);
    if (e.key === 'ArrowRight') zeige(idx + 1);
  });
  zeige(0);
}

/* ---------- Medien-Erkennung (Video/Podcast folgen später) ---------- */
function initMedia() {
  const session = document.body.dataset.session;
  if (!session) return;
  pruefeMedium('media/' + session + '-video.mp4', 'videoSlot', 'video');
  pruefeMedium('media/' + session + '-podcast.mp3', 'podcastSlot', 'audio');
}
function pruefeMedium(url, slotId, tag) {
  const slot = document.getElementById(slotId);
  if (!slot) return;
  fetch(url, { method: 'HEAD' }).then((res) => {
    if (!res.ok) return;
    const el = document.createElement(tag);
    el.controls = true;
    el.src = url;
    el.style.width = '100%';
    slot.innerHTML = '';
    slot.appendChild(el);
  }).catch(() => { /* Datei fehlt oder file:// — Platzhalter bleibt stehen */ });
}

/* ---------- Quiz ---------- */
function initQuiz() {
  const startBtn = document.getElementById('quizStart');
  const overlay = document.getElementById('quizOverlay');
  if (!startBtn || !overlay || !window.QUIZ_DATA) return;
  const inhalt = document.getElementById('quizInhalt');
  const fragen = window.QUIZ_DATA.fragen;
  let idx = 0, punkte = 0;

  function start() {
    idx = 0; punkte = 0;
    overlay.classList.add('offen');
    zeigeFrage();
  }
  function zeigeFrage() {
    const f = fragen[idx];
    inhalt.innerHTML =
      '<div class="quiz-kopf"><span>Frage ' + (idx + 1) + ' / ' + fragen.length + '</span>' +
      '<button type="button" class="quiz-schliessen" id="quizAbbruch">✕</button></div>' +
      '<div class="quiz-fortschritt"><div style="width:' + (idx / fragen.length * 100) + '%"></div></div>' +
      '<p class="quiz-frage">' + f.frage + '</p>' +
      '<div class="quiz-optionen">' +
      f.optionen.map((o, n) => '<button type="button" class="quiz-option" data-n="' + n + '">' + o + '</button>').join('') +
      '</div><div class="quiz-feedback" id="quizFeedback"></div>';
    document.getElementById('quizAbbruch').addEventListener('click', schliessen);
    inhalt.querySelectorAll('.quiz-option').forEach((btn) => btn.addEventListener('click', () => antworte(btn)));
  }
  function antworte(btn) {
    const f = fragen[idx];
    const n = Number(btn.dataset.n);
    inhalt.querySelectorAll('.quiz-option').forEach((b) => {
      b.disabled = true;
      if (Number(b.dataset.n) === f.richtig) b.classList.add('richtig');
    });
    if (n === f.richtig) { punkte++; } else { btn.classList.add('falsch'); }
    const fb = document.getElementById('quizFeedback');
    fb.innerHTML = '<p>' + (n === f.richtig ? '✅ Richtig! ' : '❌ Leider falsch. ') + f.erklaerung + '</p>' +
      '<button type="button" class="quiz-weiter" id="quizWeiter">' +
      (idx + 1 < fragen.length ? 'Weiter →' : 'Zur Auswertung →') + '</button>';
    document.getElementById('quizWeiter').addEventListener('click', () => {
      idx++;
      if (idx < fragen.length) zeigeFrage(); else zeigeErgebnis();
    });
  }
  function zeigeErgebnis() {
    const prozent = Math.round(punkte / fragen.length * 100);
    inhalt.innerHTML =
      '<div class="quiz-ergebnis"><h3>Auswertung</h3>' +
      '<p class="quiz-punkte">' + punkte + ' von ' + fragen.length + ' richtig (' + prozent + ' %)</p>' +
      '<p>' + (prozent >= 80 ? 'Stark! Sie beherrschen den Stoff.' :
               prozent >= 50 ? 'Gute Basis — wiederholen Sie die Erklärungen zu den falsch beantworteten Fragen.' :
               'Arbeiten Sie Handout und Präsentation noch einmal durch und versuchen Sie es erneut.') + '</p>' +
      '<button type="button" class="quiz-weiter" id="quizNochmal">Nochmal</button> ' +
      '<button type="button" class="quiz-weiter alt" id="quizZu">Schließen</button></div>';
    document.getElementById('quizNochmal').addEventListener('click', start);
    document.getElementById('quizZu').addEventListener('click', schliessen);
  }
  function schliessen() { overlay.classList.remove('offen'); }
  startBtn.addEventListener('click', start);
}

/* ---------- Start ---------- */
document.addEventListener('DOMContentLoaded', () => {
  initGate();
  if (document.body.dataset.session) {
    guardSession();
    initSlides();
    initMedia();
    initQuiz();
  }
});
