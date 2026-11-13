/* Auto Word — 중학 → 고등 → 토익 영단어 학습 앱 (의존성 없는 단일 스크립트) */
(() => {
  'use strict';

  /* ───────────────────────── 기본 상수 ───────────────────────── */
  const LEVELS = [
    { id: 'middle', key: 'm', name: '중학', title: '중학 필수 영단어', desc: '교과서 핵심 기초 어휘', step: 'STEP 1' },
    { id: 'high', key: 'h', name: '고등', title: '고등 · 수능 영단어', desc: '수능 · 내신 필수 어휘', step: 'STEP 2' },
    { id: 'toeic', key: 't', name: '토익', title: '토익 빈출 영단어', desc: '비즈니스 · TOEIC 핵심 어휘', step: 'STEP 3' },
  ];
  const POS = { n: '명사', v: '동사', a: '형용사', ad: '부사', prep: '전치사', conj: '접속사', phr: '숙어' };
  const INTERVAL = [0, 1, 2, 4, 7, 15, 30];   // 기억 단계별 복습 간격(일)
  const PASS = 80;                            // Day 테스트 통과 점수
  const REVIEW_MAX = 30;
  const MODES = [
    { id: 'cards', name: '카드 암기', desc: '카드를 넘기며 뜻을 떠올려요', icon: 'cards' },
    { id: 'quiz', name: '뜻 퀴즈', desc: '4지선다 · 듣고 고르기 포함', icon: 'quiz' },
    { id: 'spell', name: '스펠링', desc: '뜻을 보고 철자를 직접 입력', icon: 'pen' },
    { id: 'test', name: 'Day 테스트', desc: `${PASS}점 이상이면 다음 Day가 열려요`, icon: 'flag' },
  ];
  const NAV = [
    { id: 'home', label: '홈', icon: 'home' },
    { id: 'course', label: '코스', icon: 'course' },
    { id: 'review', label: '복습', icon: 'review' },
    { id: 'words', label: '단어장', icon: 'book' },
    { id: 'stats', label: '통계', icon: 'stats' },
    { id: 'settings', label: '설정', icon: 'gear' },
  ];
  const TTS = 'speechSynthesis' in window;

  /* ───────────────────────── 유틸 ───────────────────────── */
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const shuffle = (a) => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pad = (n) => String(n).padStart(2, '0');
  const dnum = (d = new Date()) => Math.floor((d.getTime() - d.getTimezoneOffset() * 6e4) / 864e5);
  const today = () => dnum();
  const dateOf = (n) => new Date(n * 864e5);
  const WD = ['일', '월', '화', '수', '목', '금', '토'];
  const norm = (s) => s.trim().toLowerCase().replace(/\s+/g, ' ');

  const ICONS = {
    home: 'M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z',
    course: 'M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2zM9 4v14M15 6v14',
    review: 'M20 11a8 8 0 1 0-2.3 5.7M20 4v7h-7',
    book: 'M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 19V5M8 7h7',
    stats: 'M4 20V10M10 20V4M16 20v-7M22 20H2',
    gear: 'M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M16 4v4M10 10v4M18 16v4',
    sound: 'M4 9v6h4l5 4V5L8 9zM16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11',
    star: 'M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z',
    lock: 'M6 11h12v9H6zM8.5 11V8a3.5 3.5 0 0 1 7 0v3',
    check: 'M5 12.5l4.5 4.5L19 7.5',
    x: 'M6 6l12 12M18 6 6 18',
    arrow: 'M5 12h14M13 6l6 6-6 6',
    back: 'M19 12H5M11 6l-6 6 6 6',
    flame: 'M12 3c1 3 4 4.5 4 8.5a4 4 0 0 1-8 0c0-1.5.5-2.5 1-3.5C6.5 9.5 5 12 5 14.5a7 7 0 0 0 14 0C19 9 14.5 6.5 12 3z',
    cards: 'M8 4h10a2 2 0 0 1 2 2v9M4 8h11a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z',
    quiz: 'M4 6l1.5 1.5L8 5M4 12l1.5 1.5L8 11M4 18l1.5 1.5L8 17M11 6h9M11 12h9M11 18h9',
    pen: 'M4 20l1-4L16.5 4.5a2.1 2.1 0 0 1 3 3L8 19zM14 7l3 3',
    flag: 'M5 21V4M5 4h11l-2 4 2 4H5',
    search: 'M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14zM20 20l-4-4',
    eye: 'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z',
    target: 'M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18zM12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8z',
    chev: 'M6 9l6 6 6-6',
    bulb: 'M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.3 1 2.1h5c0-.8.4-1.6 1-2.1A6 6 0 0 0 12 3z',
  };
  const ic = (n, cls = '') => `<svg class="ic ${cls}" viewBox="0 0 24 24" aria-hidden="true"><path d="${ICONS[n]}"/></svg>`;

  const ring = (pct, size, sw) => {
    const r = (size - sw) / 2, c = 2 * Math.PI * r, h = size / 2;
    return `<svg class="ring" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" aria-hidden="true">
      <circle cx="${h}" cy="${h}" r="${r}" fill="none" stroke="var(--track)" stroke-width="${sw}"/>
      <circle cx="${h}" cy="${h}" r="${r}" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round"
        stroke-dasharray="${c.toFixed(2)}" stroke-dashoffset="${(c * (1 - Math.max(0, Math.min(1, pct)))).toFixed(2)}" transform="rotate(-90 ${h} ${h})"/>
    </svg>`;
  };

  /* ───────────────────────── 단어 데이터 ───────────────────────── */
  const WORDS = {};
  const ALL = [];
  const UNITS = {};
  LEVELS.forEach((lv) => {
    lv.units = []; lv.words = [];
    let unit = null;
    ((window.VOCAB || {})[lv.id] || '').split('\n').forEach((raw) => {
      const line = raw.trim();
      if (!line) return;
      if (line[0] === '#') {
        unit = { id: `${lv.key}-${lv.units.length}`, level: lv, idx: lv.units.length, title: line.slice(1).trim(), words: [] };
        lv.units.push(unit); UNITS[unit.id] = unit;
        return;
      }
      const p = line.split('|');
      if (p.length < 5 || !unit) return;
      const w = { id: `${lv.key}:${p[0]}`, w: p[0], pos: p[1], ko: p[2], ex: p[3], exko: p[4], level: lv, unit };
      unit.words.push(w); lv.words.push(w); ALL.push(w); WORDS[w.id] = w;
    });
  });

  /* ───────────────────────── 저장소 ───────────────────────── */
  const KEY = 'autoword.v1';
  const defaults = () => ({
    onboarded: false, start: 0, free: false, goal: 30, theme: 'auto',
    rate: 0.9, accent: 'en-US', autoSpeak: true,
    words: {}, units: {}, days: {},
  });
  let S = load();
  const EH = window.EH;
  /* 파트 표시: 펼친 책. 듣기(파형) · 문법(새싹)과 같은 굵기의 선 아이콘이다. */
  const LOGO = '<span class="logo-mark"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 6.5c-2-1.600-4.600-2-8-2v13c3.400 0 6 .4 8 2 2-1.600 4.600-2 8-2v-13c-3.400 0-6 .4-8 2zM12 6.5v13"/></svg></span>';
  /* English Hub: 테마는 통합 홈 · 세 파트가 같이 쓴다. 허브에 저장된 값이 있으면 그것을 따른다. */
  if (EH) { if (EH.stored()) S.theme = EH.mode(); else EH.setMode(S.theme); }
  function load() {
    try { return Object.assign(defaults(), JSON.parse(localStorage.getItem(KEY) || '{}')); }
    catch (e) { return defaults(); }
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* 저장 불가 환경 */ } }

  const EMPTY = Object.freeze({ b: 0, d: 0, n: 0, r: 0, x: 0, s: 0 });
  const ws = (id) => S.words[id] || EMPTY;
  const wsm = (id) => S.words[id] || (S.words[id] = { b: 0, d: 0, n: 0, r: 0, x: 0, s: 0 });
  const us = (id) => S.units[id] || {};
  const usm = (id) => S.units[id] || (S.units[id] = {});
  const dayRec = () => S.days[today()] || (S.days[today()] = { n: 0, r: 0, x: 0, nw: 0 });

  const statusOf = (id) => { const s = ws(id); return !s.n ? 'new' : s.b >= 4 ? 'done' : 'learning'; };
  const STATUS = { new: '미학습', learning: '학습 중', done: '암기 완료' };

  /* 퀴즈·스펠링 채점 → 기억 단계 갱신 */
  function grade(word, ok) {
    const st = wsm(word.id), day = dayRec();
    if (!st.n) day.nw++;
    st.n++; day.n++;
    if (ok) { st.r++; day.r++; st.b = Math.min(6, Math.max(st.b, 1) + 1); st.d = today() + INTERVAL[st.b]; }
    else { st.x++; day.x++; st.b = 1; st.d = today(); }
  }
  /* 카드 암기는 단계 상승 없이 '본 단어'로만 기록 */
  function cardGrade(word, know) {
    const st = wsm(word.id), day = dayRec();
    if (!st.n) day.nw++;
    st.n++; day.n++;
    if (know) { if (st.b < 1) { st.b = 1; st.d = today() + 1; } }
    else { st.b = 1; st.d = today(); }
  }

  const dueWords = () => ALL.filter((w) => { const s = ws(w.id); return s.n > 0 && s.d <= today(); })
    .sort((a, b) => ws(a.id).b - ws(b.id).b || ws(a.id).d - ws(b.id).d);
  const wrongWords = () => ALL.filter((w) => { const s = ws(w.id); return s.x > 0 && s.b < 4; })
    .sort((a, b) => ws(b.id).x - ws(a.id).x);
  const starWords = () => ALL.filter((w) => ws(w.id).s);

  function streak() {
    let d = today(), n = 0;
    if (!(S.days[d] && S.days[d].n)) d--;
    while (S.days[d] && S.days[d].n) { n++; d--; }
    return n;
  }
  function bestStreak() {
    const ds = Object.keys(S.days).map(Number).filter((d) => S.days[d].n).sort((a, b) => a - b);
    let best = 0, run = 0, prev = null;
    ds.forEach((d) => { run = prev !== null && d === prev + 1 ? run + 1 : 1; best = Math.max(best, run); prev = d; });
    return best;
  }

  function unlocked(u) {
    if (S.free) return true;
    const li = LEVELS.indexOf(u.level);
    if (li < S.start) return true;
    if (u.idx === 0) {
      if (li === S.start) return true;
      const prev = LEVELS[li - 1].units;
      return !!us(prev[prev.length - 1].id).p;
    }
    return !!us(u.level.units[u.idx - 1].id).p;
  }
  function nextUnit() {
    for (let li = S.start; li < LEVELS.length; li++) {
      const u = LEVELS[li].units.find((x) => !us(x.id).p);
      if (u) return unlocked(u) ? u : null;
    }
    return null;
  }
  function levelStat(lv) {
    let done = 0, learning = 0;
    lv.words.forEach((w) => { const s = statusOf(w.id); if (s === 'done') done++; else if (s === 'learning') learning++; });
    const passed = lv.units.filter((u) => us(u.id).p).length;
    return { total: lv.words.length, done, learning, fresh: lv.words.length - done - learning, passed, units: lv.units.length };
  }
  const unitSteps = (u) => { const s = us(u.id); return [!!s.c, s.q != null, s.s != null, !!s.p]; };

  /* ───────────────────────── 발음 ───────────────────────── */
  // macOS 에는 Albert·Bad News·Zarvox 같은 효과음용 목소리가 en-US 로 등록되어 있어
  // 목록의 첫 목소리를 그대로 쓰면 이상한 소리가 난다. 자연스러운 목소리를 골라 쓴다.
  const NOVELTY = /^(albert|bad news|bahh|bells|boing|bubbles|cellos|deranged|good news|hysterical|jester|junior|kathy|organ|pipe organ|princess|ralph|superstar|trinoids|whisper|wobble|zarvox|fred|eddy|flo|grandma|grandpa|reed|rocko|sandy|shelley)\b/i;
  const GOOD = [/google us english/i, /google uk english female/i, /samantha/i, /\bava\b/i, /allison/i, /\balex\b/i, /daniel/i, /\bkate\b/i, /serena/i, /microsoft (aria|jenny|zira|sonia|libby)/i, /karen/i];
  function pickVoice(accent) {
    const all = speechSynthesis.getVoices();
    const norm = (x) => x.lang.replace('_', '-');
    const sane = (list) => list.filter((x) => !NOVELTY.test(x.name));
    let c = sane(all.filter((x) => norm(x) === accent));
    if (!c.length) c = sane(all.filter((x) => norm(x).slice(0, 2) === accent.slice(0, 2)));
    if (!c.length) return null;                    // 알맞은 목소리가 없으면 브라우저 기본값에 맡김
    for (const re of GOOD) { const v = c.find((x) => re.test(x.name)); if (v) return v; }
    return c.find((x) => x.default) || c[0];
  }
  function speak(text) {
    if (!TTS) return;
    try {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = S.accent; u.rate = S.rate;
      const v = pickVoice(S.accent);
      if (v) u.voice = v;
      speechSynthesis.speak(u);
    } catch (e) { /* 무시 */ }
  }
  if (TTS) speechSynthesis.getVoices();

  /* ───────────────────────── 토스트 · 모달 · 테마 ───────────────────────── */
  let toastTimer;
  function toast(msg) {
    const el = $('#toast');
    el.textContent = msg; el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2400);
  }
  function openModal(html, cls = '') {
    const m = $('#modal');
    m.innerHTML = `<div class="modal-back" data-a="modal-close"></div><div class="modal-card ${cls}" role="dialog" aria-modal="true">${html}</div>`;
    m.hidden = false;
  }
  function closeModal() { const m = $('#modal'); m.hidden = true; m.innerHTML = ''; }
  let confirmCb = null;
  function confirmBox(title, msg, okLabel, cb, danger) {
    confirmCb = cb;
    openModal(`<h3 class="modal-title">${esc(title)}</h3><p class="modal-msg">${esc(msg)}</p>
      <div class="modal-actions"><button class="btn ghost" data-a="modal-close">취소</button>
      <button class="btn ${danger ? 'danger' : 'primary'}" data-a="confirm-ok">${esc(okLabel)}</button></div>`, 'sm');
  }
  const mq = matchMedia('(prefers-color-scheme: dark)');
  function applyTheme() {
    const t = S.theme === 'auto' ? (mq.matches ? 'dark' : 'light') : S.theme;
    document.documentElement.dataset.theme = t;
    const meta = $('meta[name=theme-color]');
    if (meta) meta.content = t === 'dark' ? '#0C111B' : '#F6F8FB';
  }
  mq.addEventListener && mq.addEventListener('change', applyTheme);

  /* ───────────────────────── 공용 조각 ───────────────────────── */
  /* 표제어 아래 한 줄: 동사의 과거 · 과거분사 · -ing, 명사의 복수형 · 셀 수 없음, 형용사의 비교급 · 최상급.
     표(assets/data/forms.js)는 데스크톱 앱의 autoword/inflect.py 로 만든다. show=false 면 자리만 잡는다. */
  const FORMS = window.AW_FORMS || {}, SHAPES = window.AW_FORM_SHAPES || [];
  function formsHtml(w, show = true, cls = '') {
    const f = show ? FORMS[`${w.w}|${w.pos}`] : null;
    if (!f) return `<p class="forms ${cls}" aria-hidden="true"></p>`;
    const [tag, note, cells] = SHAPES[f[0]];
    return `<p class="forms ${cls}">${tag ? `<span class="f-tag">${esc(tag)}</span>` : ''}${cells.map((c, i) =>
      `<span class="f-cell ${c[1] ? 'hot' : ''}"><small>${esc(c[0])}</small><b>${esc(f[i + 1])}</b></span>`).join('')}${note ? `<span class="f-note">${esc(note)}</span>` : ''}</p>`;
  }
  const hasForms = (w) => !!FORMS[`${w.w}|${w.pos}`];
  const posTag = (p) => `<span class="pos">${POS[p] || p}</span>`;
  const speakBtn = (w, cls = '') => TTS ? `<button class="icon-btn ${cls}" data-a="speak" data-w="${esc(w)}" aria-label="발음 듣기">${ic('sound')}</button>` : '';
  const starBtn = (id) => `<button class="icon-btn star ${ws(id).s ? 'on' : ''}" data-a="star" data-id="${esc(id)}" aria-label="즐겨찾기">${ic('star')}</button>`;

  /* 예문 속 표제어 찾기 */
  function findInEx(w) {
    const e = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    let m = new RegExp(`\\b${e(w.w)}\\w*`, 'i').exec(w.ex);
    if (!m && !w.w.includes(' ')) m = new RegExp(`\\b${e(w.w.slice(0, Math.max(3, w.w.length - 2)))}\\w*`, 'i').exec(w.ex);
    if (!m && w.w.includes(' ')) {
      // 숙어: 첫 단어의 굴절(looks after, turned down)과 someone / one's 자리(pick you up)를 허용
      const parts = w.w.replace(/^be /, '').split(' ');
      const src = parts.map((t, i) => {
        if (t === 'someone' || t === "one's") return "[\\w']+";
        return i === 0 ? `${e(t.slice(0, Math.max(3, t.length - 1)))}\\w*` : e(t);
      }).join('\\s+');
      m = new RegExp(`\\b${src}\\b`, 'i').exec(w.ex);
    }
    return m;
  }
  function exHtml(w, mask) {
    const m = findInEx(w);
    if (!m) return mask ? '' : esc(w.ex);
    const mid = mask ? `<span class="blank">${'_'.repeat(Math.max(4, m[0].length))}</span>` : `<mark>${esc(m[0])}</mark>`;
    return esc(w.ex.slice(0, m.index)) + mid + esc(w.ex.slice(m.index + m[0].length));
  }

  function wordRow(w, showLevel) {
    const st = statusOf(w.id);
    return `<div class="wrow" data-a="word" data-id="${esc(w.id)}" role="button" tabindex="0">
      ${speakBtn(w.w)}
      <div class="wrow-main"><b>${esc(w.w)}</b>${posTag(w.pos)}${showLevel ? `<span class="lvchip lv-${w.level.key}">${w.level.name}</span>` : ''}</div>
      <div class="wrow-ko">${esc(w.ko)}</div>
      <span class="dot st-${st}" title="${STATUS[st]}"></span>
      ${starBtn(w.id)}
    </div>`;
  }

  function weekChart(days) {
    const t = today(), arr = [];
    for (let i = days - 1; i >= 0; i--) arr.push(t - i);
    const max = Math.max(S.goal, ...arr.map((d) => (S.days[d] || {}).n || 0));
    return `<div class="chart ${days > 7 ? 'dense' : ''}" style="--g:${(S.goal / max).toFixed(3)}"><span class="goal-tag">목표 ${S.goal}</span>${arr.map((d) => {
      const n = (S.days[d] || {}).n || 0, dt = dateOf(d);
      return `<div class="bar ${n ? 'has' : ''} ${n >= S.goal ? 'hit' : ''} ${d === t ? 'today' : ''}" title="${dt.getUTCMonth() + 1}/${dt.getUTCDate()} · ${n}회">
        <div class="bar-track" style="--v:${(n / max).toFixed(3)}"><span class="bar-n">${n || ''}</span><i></i></div>
        <em>${days > 7 ? dt.getUTCDate() : WD[dt.getUTCDay()]}</em></div>`;
    }).join('')}</div>`;
  }

  const seg = (k, opts) => `<div class="seg">${opts.map(([v, l]) =>
    `<button class="${S[k] === v ? 'on' : ''}" data-a="set" data-k="${k}" data-v='${JSON.stringify(v)}'>${l}</button>`).join('')}</div>`;
  const toggle = (k) => `<button class="switch ${S[k] ? 'on' : ''}" data-a="set" data-k="${k}" data-v='${JSON.stringify(!S[k])}' role="switch" aria-checked="${!!S[k]}"><i></i></button>`;

  /* ───────────────────────── 화면: 홈 ───────────────────────── */
  function vHome() {
    const nu = nextUnit(), due = dueWords().length, day = S.days[today()] || { n: 0 }, sk = streak();
    const now = new Date(), hello = now.getHours() < 12 ? '좋은 아침입니다' : now.getHours() < 18 ? '좋은 오후입니다' : '좋은 저녁입니다';
    const totalDone = ALL.filter((w) => statusOf(w.id) === 'done').length;

    let hero;
    if (nu) {
      const steps = unitSteps(nu), stepN = steps.filter(Boolean).length;
      const nextMode = MODES[Math.min(3, steps.indexOf(false) < 0 ? 3 : steps.indexOf(false))];
      hero = `<section class="hero lv-${nu.level.key}">
        <div class="hero-body">
          <span class="eyebrow">${nu.level.step} · ${nu.level.name}</span>
          <h2><span class="num">Day ${pad(nu.idx + 1)}</span> <span>${esc(nu.title)}</span></h2>
          <div class="hero-words">${nu.words.slice(0, 4).map((w) => `<span>${esc(w.w)}</span>`).join('')}<span>+${nu.words.length - 4}단어</span></div>
          <div class="hero-actions">
            <button class="btn light lg" data-a="start" data-unit="${nu.id}" data-mode="${nextMode.id}">${stepN ? '이어서 학습' : '학습 시작'} · ${nextMode.name} ${ic('arrow')}</button>
            <a class="btn glass lg" href="#/unit/${nu.id}">단어 미리 보기</a>
          </div>
        </div>
        <span class="hero-ghost" aria-hidden="true">${pad(nu.idx + 1)}</span>
        <div class="hero-steps">${MODES.map((m, i) => `<div class="hstep ${steps[i] ? 'on' : m === nextMode ? 'cur' : ''}">${steps[i] ? ic('check') : `<b>${i + 1}</b>`}<span>${m.name}</span></div>`).join('')}</div>
      </section>`;
    } else {
      hero = `<section class="hero lv-t"><div class="hero-body"><span class="eyebrow">ALL CLEAR</span>
        <h2>모든 코스를 완주했어요</h2><p>이제 복습으로 기억을 오래 유지해 보세요.</p>
        <div class="hero-actions"><a class="btn light lg" href="#/review">복습하러 가기 ${ic('arrow')}</a></div></div></section>`;
    }

    return `<div class="page">
      <header class="page-head">
        <div><p class="sub">${now.getMonth() + 1}월 ${now.getDate()}일 ${WD[now.getDay()]}요일</p><h1>${hello}</h1></div>
      </header>
      ${hero}
      <section class="grid3">
        <div class="card stat">
          <div class="stat-ring" style="color:var(--ok)">${ring(day.n / S.goal, 64, 7)}<b>${Math.min(100, Math.round(day.n / S.goal * 100))}%</b></div>
          <div><span class="label">오늘의 목표</span><strong>${day.n}<small> / ${S.goal}회</small></strong>
          <p>${day.n >= S.goal ? '오늘 목표를 달성했습니다' : `${S.goal - day.n}회만 더 하면 달성`}</p></div>
        </div>
        <div class="card stat">
          <div class="stat-icon flame ${sk ? 'on' : ''}">${ic('flame')}</div>
          <div><span class="label">연속 학습</span><strong>${sk}<small>일</small></strong>
          <p>${sk ? '오늘도 흐름을 이어 가요' : '오늘 첫 학습을 시작해요'}</p></div>
        </div>
        <div class="card stat">
          <div class="stat-icon review ${due ? 'on' : ''}">${ic('review')}</div>
          <div><span class="label">복습할 단어</span><strong>${due}<small>개</small></strong>
          ${due ? `<button class="link" data-a="review-start">지금 복습하기 ${ic('arrow')}</button>` : '<p>밀린 복습이 없어요</p>'}</div>
        </div>
      </section>

      <section class="section">
        <div class="section-head"><h3>학습 로드맵</h3><span class="sub">암기 완료 ${totalDone} / ${ALL.length} 단어</span></div>
        <div class="road card">${LEVELS.map((lv, i) => {
          const s = levelStat(lv), open = S.free || i <= S.start || unlocked(lv.units[0]);
          return `<a class="road-item lv-${lv.key} ${open ? '' : 'is-locked'}" href="#/course/${lv.id}">
            <div class="road-badge">${s.passed === s.units ? ic('check') : open ? i + 1 : ic('lock')}</div>
            <div class="road-main"><span class="eyebrow">${lv.step}</span><b>${lv.title}</b><span class="sub">${lv.desc}</span>
              <div class="progress"><i style="width:${s.passed / s.units * 100}%"></i></div></div>
            <div class="road-num"><b>${s.passed}</b><span>/ ${s.units} Day</span></div>
          </a>`;
        }).join('')}</div>
      </section>

      <section class="section">
        <div class="section-head"><h3>이번 주 학습량</h3><a class="sub" href="#/stats">통계 전체 보기</a></div>
        <div class="card">${weekChart(7)}</div>
      </section>
    </div>`;
  }

  /* ───────────────────────── 화면: 코스 ───────────────────────── */
  const PART_SIZE = 10, PART_OPEN = {};
  function vCourse(lid) {
    const nu = nextUnit();
    const lv = LEVELS.find((l) => l.id === lid) || (nu ? nu.level : LEVELS[S.start]);
    const s = levelStat(lv);
    const parts = [];
    for (let i = 0; i < lv.units.length; i += PART_SIZE) parts.push(lv.units.slice(i, i + PART_SIZE));
    // 기본으로 펼칠 Part: 지금 학습할 Day가 있는 곳(없으면 아직 통과하지 못한 첫 Part)
    const focus = nu && nu.level === lv ? nu : lv.units.find((u) => !us(u.id).p) || lv.units[0];
    const focusPart = Math.floor(focus.idx / PART_SIZE);
    const isOpen = (pi) => { const v = PART_OPEN[`${lv.id}:${pi}`]; return v === undefined ? pi === focusPart : v; };
    const unitCard = (u) => {
      const open = unlocked(u), st = us(u.id), steps = unitSteps(u), cur = nu === u;
      const seen = u.words.filter((w) => ws(w.id).n).length;
      return `<button class="unit ${open ? '' : 'is-locked'} ${st.p ? 'is-passed' : ''} ${cur ? 'is-current' : ''}" data-a="unit" data-id="${u.id}">
        <div class="unit-top"><span class="unit-day"><small>DAY</small>${pad(u.idx + 1)}</span>
          ${st.p ? `<span class="badge ok">${ic('check')} ${st.t}점</span>` : !open ? `<span class="badge mute">${ic('lock')}</span>` : cur ? '<span class="badge now">학습 차례</span>' : ''}</div>
        <strong>${esc(u.title)}</strong>
        <span class="unit-meta">${u.words.length}단어 · 학습 ${seen}/${u.words.length}</span>
        <div class="steps">${steps.map((x) => `<i class="${x ? 'on' : ''}"></i>`).join('')}</div>
      </button>`;
    };
    return `<div class="page lv-${lv.key}">
      <header class="page-head"><div><p class="sub">중학 → 고등 → 토익 순서로 차근차근</p><h1>코스</h1></div></header>
      <div class="tabs">${LEVELS.map((l) => `<a class="tab lv-${l.key} ${l === lv ? 'on' : ''}" href="#/course/${l.id}"><small>${l.step}</small>${l.name}</a>`).join('')}</div>
      <section class="card course-sum">
        <div class="stat-ring lg">${ring(s.passed / s.units, 84, 8)}<b>${Math.round(s.passed / s.units * 100)}%</b></div>
        <div class="course-sum-main"><h2>${lv.title}</h2><p class="sub">${lv.desc} · ${s.units} Day · ${s.total}단어</p>
          <div class="stack"><i class="s-done" style="flex:${s.done}"></i><i class="s-learning" style="flex:${s.learning}"></i><i class="s-new" style="flex:${s.fresh}"></i></div>
          <div class="legend"><span><i class="dot st-done"></i>암기 완료 ${s.done}</span><span><i class="dot st-learning"></i>학습 중 ${s.learning}</span><span><i class="dot st-new"></i>미학습 ${s.fresh}</span></div>
        </div>
      </section>
      <div class="parts">${parts.map((pt, pi) => {
        const passed = pt.filter((u) => us(u.id).p).length, open = isOpen(pi), locked = !unlocked(pt[0]);
        return `<section class="part ${open ? 'is-open' : ''} ${passed === pt.length ? 'is-done' : ''}">
          <button class="part-head" data-a="part" data-k="${lv.id}:${pi}" data-open="${open ? 1 : 0}" aria-expanded="${open}">
            <span class="part-no">PART ${pi + 1}</span>
            <span class="part-range">Day ${pad(pt[0].idx + 1)} – ${pad(pt[pt.length - 1].idx + 1)}</span>
            <span class="part-prog">${locked ? ic('lock') : passed === pt.length ? `${ic('check')} 완료` : `${passed} / ${pt.length}`}</span>
            <span class="part-bar"><i style="width:${passed / pt.length * 100}%"></i></span>
            ${ic('chev', 'part-chev')}
          </button>
          ${open ? `<div class="units">${pt.map(unitCard).join('')}</div>` : ''}
        </section>`;
      }).join('')}</div>
    </div>`;
  }

  /* ───────────────────────── 화면: Day 상세 ───────────────────────── */
  let hideKo = false;
  function vUnit(id) {
    const u = UNITS[id];
    if (!u) return vCourse();
    const st = us(u.id), open = unlocked(u);
    const badge = (m) => {
      if (m.id === 'cards') return st.c ? `<span class="badge ok">${ic('check')} 완료</span>` : '';
      const v = st[m.id[0]];
      return v != null ? `<span class="badge ${m.id === 'test' ? (st.p ? 'ok' : 'bad') : 'ok'}">최고 ${v}점</span>` : '';
    };
    return `<div class="page lv-${u.level.key}">
      <a class="backlink" href="#/course/${u.level.id}">${ic('back')} ${u.level.name} 코스</a>
      <header class="page-head"><div><p class="sub lvtext">${u.level.step} · DAY ${pad(u.idx + 1)}</p><h1>${esc(u.title)}</h1></div>
        ${st.p ? `<span class="badge ok big">${ic('check')} 통과</span>` : ''}</header>
      ${open ? '' : `<div class="notice">${ic('lock')} 이전 Day 테스트를 ${PASS}점 이상으로 통과하면 열려요. 설정에서 ‘자유 학습 모드’를 켜면 바로 학습할 수 있습니다.</div>`}
      <section class="modes">${MODES.map((m, i) => `<button class="mode ${m.id === 'test' ? 'is-test' : ''}" data-a="start" data-unit="${u.id}" data-mode="${m.id}" ${open ? '' : 'disabled'}>
        <span class="mode-ic">${ic(m.icon)}</span>
        <span class="mode-main"><small>${i + 1}단계</small><b>${m.name}</b><em>${m.desc}</em></span>${badge(m)}</button>`).join('')}</section>
      <section class="section">
        <div class="section-head"><h3>단어 ${u.words.length}개</h3>
          <button class="chip ${hideKo ? 'on' : ''}" data-a="hide-ko">${ic('eye')} 뜻 가리기</button></div>
        <div class="card wlist ${hideKo ? 'hide-ko' : ''}">${u.words.map((w) => wordRow(w)).join('')}</div>
      </section>
    </div>`;
  }

  /* ───────────────────────── 화면: 복습 ───────────────────────── */
  function vReview() {
    const due = dueWords(), wrong = wrongWords(), stars = starWords();
    const boxes = [1, 2, 3, 4, 5, 6].map((b) => ALL.filter((w) => ws(w.id).n && ws(w.id).b === b).length);
    const bmax = Math.max(1, ...boxes);
    return `<div class="page">
      <header class="page-head"><div><p class="sub">잊어버릴 때쯤 다시 만나는 간격 반복 복습</p><h1>복습</h1></div></header>
      <section class="hero lv-h">
        <div class="hero-body"><span class="eyebrow">TODAY'S REVIEW</span>
          <h2>${due.length ? `복습할 단어 <span>${due.length}개</span>` : '오늘 복습을 모두 마쳤어요'}</h2>
          <p>${due.length ? `한 번에 최대 ${REVIEW_MAX}개씩, 약한 단어부터 나와요.` : '새 단어를 학습하면 복습 일정이 자동으로 잡혀요.'}</p>
          <div class="hero-actions">${due.length ? `<button class="btn light lg" data-a="review-start">복습 시작 ${ic('arrow')}</button>` : `<a class="btn light lg" href="#/course">코스로 가기 ${ic('arrow')}</a>`}</div>
        </div>
        <div class="boxes" aria-label="기억 단계 분포">${boxes.map((n, i) => `<div class="box"><span>${n}</span><i style="height:${n ? Math.max(8, n / bmax * 100) : 3}%"></i><em>${i + 1}단계</em></div>`).join('')}</div>
      </section>

      <section class="section">
        <div class="section-head"><h3>오답 노트 <span class="count">${wrong.length}</span></h3>
          ${wrong.length ? `<button class="btn sm" data-a="wrong-start">오답 집중 퀴즈</button>` : ''}</div>
        ${wrong.length ? `<div class="card wlist">${wrong.slice(0, 20).map((w) => wordRow(w, true)).join('')}</div>${wrong.length > 20 ? `<p class="more">외 ${wrong.length - 20}개 — 단어장에서 전체를 볼 수 있어요</p>` : ''}`
          : `<div class="empty">${ic('check')}<p>틀린 단어가 없어요. 퀴즈에서 틀린 단어가 여기에 모여요.</p></div>`}
      </section>

      <section class="section">
        <div class="section-head"><h3>즐겨찾기 <span class="count">${stars.length}</span></h3>
          ${stars.length ? `<button class="btn sm" data-a="star-start">카드로 보기</button>` : ''}</div>
        ${stars.length ? `<div class="card wlist">${stars.slice(0, 20).map((w) => wordRow(w, true)).join('')}</div>`
          : `<div class="empty">${ic('star')}<p>단어 옆 별을 누르면 여기에 모아 볼 수 있어요.</p></div>`}
      </section>
    </div>`;
  }

  /* ───────────────────────── 화면: 단어장 ───────────────────────── */
  const WF = { q: '', lv: 'all', st: 'all', limit: 60 };
  function wordsFiltered() {
    const q = norm(WF.q);
    return ALL.filter((w) =>
      (WF.lv === 'all' || w.level.id === WF.lv) &&
      (WF.st === 'all' || (WF.st === 'star' ? ws(w.id).s : statusOf(w.id) === WF.st)) &&
      (!q || w.w.toLowerCase().includes(q) || w.ko.includes(q)));
  }
  function wordsListHtml() {
    const list = wordsFiltered();
    if (!list.length) return `<div class="empty">${ic('search')}<p>조건에 맞는 단어가 없어요.</p></div>`;
    return `<p class="result-n">${list.length.toLocaleString()}개 단어</p>
      <div class="card wlist">${list.slice(0, WF.limit).map((w) => wordRow(w, true)).join('')}</div>
      ${list.length > WF.limit ? `<button class="btn block" data-a="more">더 보기 (${list.length - WF.limit}개 남음)</button>` : ''}`;
  }
  function vWords() {
    const chip = (k, v, l) => `<button class="chip ${WF[k] === v ? 'on' : ''}" data-a="wf" data-k="${k}" data-v="${v}">${l}</button>`;
    return `<div class="page">
      <header class="page-head"><div><p class="sub">전체 ${ALL.length}단어를 한곳에서</p><h1>단어장</h1></div></header>
      <label class="search">${ic('search')}<input id="wsearch" type="search" placeholder="영어 단어 또는 뜻 검색" value="${esc(WF.q)}" autocomplete="off" spellcheck="false"></label>
      <div class="chips">${chip('lv', 'all', '전체')}${LEVELS.map((l) => chip('lv', l.id, l.name)).join('')}
        <span class="chips-sep"></span>
        ${chip('st', 'all', '모든 상태')}${chip('st', 'new', '미학습')}${chip('st', 'learning', '학습 중')}${chip('st', 'done', '암기 완료')}${chip('st', 'star', '★ 즐겨찾기')}</div>
      <div id="wresult">${wordsListHtml()}</div>
    </div>`;
  }

  /* ───────────────────────── 화면: 통계 ───────────────────────── */
  function vStats() {
    let seen = 0, done = 0, r = 0, x = 0;
    ALL.forEach((w) => { const s = ws(w.id); if (s.n) seen++; if (s.b >= 4) done++; r += s.r; x += s.x; });
    const acc = r + x ? Math.round(r / (r + x) * 100) : 0;
    const total = Object.values(S.days).reduce((a, d) => a + (d.n || 0), 0);
    const tile = (label, val, unit, sub) => `<div class="card tile"><span class="label">${label}</span><strong>${val}<small>${unit}</small></strong><p>${sub}</p></div>`;
    return `<div class="page">
      <header class="page-head"><div><p class="sub">꾸준함이 실력이 됩니다</p><h1>통계</h1></div></header>
      <section class="grid4">
        ${tile('학습한 단어', seen, '개', `전체의 ${Math.round(seen / ALL.length * 100)}%`)}
        ${tile('암기 완료', done, '개', '기억 4단계 이상')}
        ${tile('정답률', acc, '%', `정답 ${r} · 오답 ${x}`)}
        ${tile('최장 연속 학습', bestStreak(), '일', `현재 ${streak()}일 · 누적 ${total.toLocaleString()}회`)}
      </section>
      <section class="section">
        <div class="section-head"><h3>최근 14일 학습량</h3><span class="sub">하루 목표 ${S.goal}회</span></div>
        <div class="card">${weekChart(14)}</div>
      </section>
      <section class="section">
        <div class="section-head"><h3>단계별 진행도</h3></div>
        <div class="card lvstats">${LEVELS.map((lv) => {
          const s = levelStat(lv);
          return `<div class="lvstat lv-${lv.key}"><div class="lvstat-head"><b>${lv.title}</b><span>${s.done} / ${s.total} 암기 · ${s.passed} / ${s.units} Day 통과</span></div>
            <div class="stack"><i class="s-done" style="flex:${s.done}"></i><i class="s-learning" style="flex:${s.learning}"></i><i class="s-new" style="flex:${s.fresh}"></i></div></div>`;
        }).join('')}
          <div class="legend"><span><i class="dot st-done"></i>암기 완료</span><span><i class="dot st-learning"></i>학습 중</span><span><i class="dot st-new"></i>미학습</span></div>
        </div>
      </section>
    </div>`;
  }

  /* ───────────────────────── 화면: 설정 ───────────────────────── */
  function vSettings() {
    const row = (t, d, c) => `<div class="set-row"><div><b>${t}</b>${d ? `<p>${d}</p>` : ''}</div>${c}</div>`;
    return `<div class="page narrow">
      <header class="page-head"><div><p class="sub">나에게 맞게 조정하세요</p><h1>설정</h1></div></header>
      <h4 class="set-title">학습</h4>
      <div class="card set">
        ${row('하루 목표', '카드·문제 풀이 횟수 기준', seg('goal', [[20, '20'], [30, '30'], [50, '50'], [100, '100']]))}
        ${row('시작 단계', '선택한 단계부터 순서대로 열려요', seg('start', LEVELS.map((l, i) => [i, l.name])))}
        ${row('자유 학습 모드', '모든 Day의 잠금을 해제합니다', toggle('free'))}
      </div>
      <h4 class="set-title">발음</h4>
      <div class="card set">
        ${TTS ? '' : '<p class="notice">이 브라우저는 음성 합성을 지원하지 않아 발음 기능이 꺼져 있어요.</p>'}
        ${row('발음', '', seg('accent', [['en-US', '미국식'], ['en-GB', '영국식']]))}
        ${row('속도', '', seg('rate', [[0.7, '느리게'], [0.9, '보통'], [1.1, '빠르게']]))}
        ${row('자동 재생', '새 단어가 나오면 발음을 들려줘요', toggle('autoSpeak'))}
      </div>
      <h4 class="set-title">화면</h4>
      <div class="card set">${row('테마', '', seg('theme', [['auto', '시스템'], ['light', '라이트'], ['dark', '다크']]))}</div>
      <h4 class="set-title">데이터</h4>
      <div class="card set">
        ${row('백업 내보내기', '학습 기록을 JSON 파일로 저장', '<button class="btn sm" data-a="export">내보내기</button>')}
        ${row('백업 가져오기', '저장해 둔 파일로 기록 복원', '<button class="btn sm" data-a="import">가져오기</button>')}
        ${row('학습 기록 초기화', '모든 진행 상황이 삭제됩니다', '<button class="btn sm danger-ghost" data-a="reset">초기화</button>')}
      </div>
      <p class="foot-note">Auto Word · 학습 기록은 이 브라우저에만 저장됩니다.</p>
    </div>`;
  }

  /* ───────────────────────── 단어 상세 · 온보딩 ───────────────────────── */
  function wordModal(id) {
    const w = WORDS[id]; if (!w) return;
    const s = ws(id), st = statusOf(id);
    const next = !s.n ? '—' : s.d <= today() ? '오늘' : `${s.d - today()}일 뒤`;
    openModal(`<div class="wm lv-${w.level.key}">
      <div class="wm-top"><span class="lvchip lv-${w.level.key}">${w.level.name} · Day ${pad(w.unit.idx + 1)}</span>
        <span class="wm-tools">${starBtn(id)}<button class="icon-btn" data-a="modal-close" aria-label="닫기">${ic('x')}</button></span></div>
      <div class="wm-head"><h2 class="headword">${esc(w.w)}</h2>${speakBtn(w.w, 'tonal')}</div>
      ${hasForms(w) ? formsHtml(w, true, 'left free') : ''}
      <p class="wm-ko">${posTag(w.pos)} ${esc(w.ko)}</p>
      <div class="wm-ex"><p>${exHtml(w)} ${speakBtn(w.ex, 'mini')}</p><span>${esc(w.exko)}</span></div>
      <div class="wm-stats">
        <div><span>상태</span><b><i class="dot st-${st}"></i>${STATUS[st]}</b></div>
        <div><span>기억 단계</span><b>${s.b} / 6</b></div>
        <div><span>정답 · 오답</span><b>${s.r} · ${s.x}</b></div>
        <div><span>다음 복습</span><b>${next}</b></div>
      </div></div>`);
  }

  const OB = { start: 0, goal: 30 };
  function onboarding() {
    openModal(`<div class="ob">
      <div class="logo big">${LOGO}</div>
      <h2>Auto Word에 오신 것을 환영해요</h2>
      <p class="sub">중학 → 고등 → 토익, 한 길로 이어지는 ${ALL.length}단어 코스입니다.<br>어디서부터 시작할까요?</p>
      <div class="ob-levels">${LEVELS.map((l, i) => `<button class="ob-lv lv-${l.key} ${OB.start === i ? 'on' : ''}" data-a="ob-start" data-v="${i}">
        <small>${l.step}</small><b>${l.name}</b><span>${l.desc}</span></button>`).join('')}</div>
      <p class="ob-label">하루 목표</p>
      <div class="seg wide">${[20, 30, 50].map((g) => `<button class="${OB.goal === g ? 'on' : ''}" data-a="ob-goal" data-v="${g}">${g}회${g === 30 ? ' · 추천' : ''}</button>`).join('')}</div>
      <button class="btn primary lg block" data-a="ob-done">시작하기</button>
    </div>`, 'wide locked');
  }

  /* ───────────────────────── 학습 세션 ───────────────────────── */
  let ses = null;

  function makeMcq(w, type, retry) {
    const pool = w.level.words.filter((x) => x !== w && x.ko !== w.ko && x.w !== w.w);
    const same = shuffle(pool.filter((x) => x.pos === w.pos));
    const rest = shuffle(pool.filter((x) => x.pos !== w.pos));
    const opts = shuffle([w, ...same.concat(rest).slice(0, 3)]);
    return { w, type, opts, picked: null, retry: !!retry };
  }
  function buildQueue(mode, words) {
    if (mode === 'cards') return words.map((w) => ({ w, type: 'card' }));
    const list = shuffle(words.slice());
    if (mode === 'spell') return list.map((w) => ({ w, type: 'spell', hint: 1, res: null, val: '' }));
    const types = TTS ? ['en2ko', 'ko2en', 'en2ko', 'listen', 'ko2en'] : ['en2ko', 'ko2en'];
    return list.map((w, i) => makeMcq(w, types[i % types.length]));
  }

  function startSession(o) {
    if (!o.words.length) return toast('학습할 단어가 없어요');
    ses = {
      mode: o.mode, title: o.title, unit: o.unit || null, lv: (o.unit ? o.unit.level.key : o.words[0].level.key),
      q: buildQueue(o.mode, o.words), i: 0, total: o.words.length, right: 0, wrongs: [], words: o.words,
      t0: Date.now(), timer: null, result: null,
    };
    $('#session').hidden = false;
    document.body.classList.add('in-session');
    sesRender(); sesSpeak();
  }
  function startUnit(uid, mode) {
    const u = UNITS[uid];
    if (!u) return;
    if (!unlocked(u)) return toast(`이전 Day 테스트를 ${PASS}점 이상으로 통과하면 열려요`);
    const m = MODES.find((x) => x.id === mode) || MODES[0];
    startSession({ mode: m.id, words: u.words, unit: u, title: `Day ${pad(u.idx + 1)} · ${m.name}` });
  }
  function closeSession() {
    if (ses) clearTimeout(ses.timer);
    ses = null;
    if (TTS) speechSynthesis.cancel();
    $('#session').hidden = true; $('#session').innerHTML = '';
    document.body.classList.remove('in-session');
    render();
  }
  function sesSpeak() {
    if (!ses || ses.result || !S.autoSpeak) return;
    const it = ses.q[ses.i];
    if (it.type === 'listen' || it.type === 'card' || it.type === 'en2ko') speak(it.w.w);
  }

  function sesRender() {
    const el = $('#session'), it = ses.q[ses.i];
    let body = '', foot = '';

    if (it.type === 'card') {
      const w = it.w;
      body = `<div class="fc-wrap"><div class="fc" id="fc" data-a="flip" role="button" tabindex="0" aria-label="카드 뒤집기">
        <div class="fc-face fc-front">${posTag(w.pos)}<h2 class="headword">${esc(w.w)}</h2>${formsHtml(w)}
          <span class="fc-tools">${speakBtn(w.w, 'tonal')}${starBtn(w.id)}</span>
          <p class="fc-hint">탭하거나 Space를 눌러 뜻 확인</p></div>
        <div class="fc-face fc-back">${posTag(w.pos)}<h3>${esc(w.ko)}</h3>
          <div class="fc-ex"><p>${exHtml(w)}</p><span>${esc(w.exko)}</span></div>
          <p class="fc-word">${esc(w.w)}</p></div>
      </div></div>`;
      foot = `<button class="btn big bad-soft" data-a="card-no">${ic('x')} 아직 몰라요<kbd>←</kbd></button>
        <button class="btn big ok-soft" data-a="card-yes">${ic('check')} 알아요<kbd>→</kbd></button>`;
    } else if (it.type === 'spell') {
      const w = it.w, done = it.res !== null;
      const hint = w.w.split('').map((c, i) => (c === ' ' ? '<i class="sp"></i>' : `<i class="${i < it.hint || done ? 'on' : ''}">${i < it.hint || done ? esc(c) : ''}</i>`)).join('');
      const masked = exHtml(w, !done);
      body = `<div class="q">
        <p class="q-label">뜻을 보고 영어 단어를 입력하세요</p>
        <h2 class="q-ko">${esc(w.ko)}</h2><div class="q-sub">${posTag(w.pos)}</div>
        ${masked ? `<p class="q-ex">${masked}</p>` : ''}
        <div class="letters">${hint}</div>
        <input id="spell-in" class="spell-in ${done ? (it.res === true ? 'ok' : 'bad') : ''}" type="text" inputmode="text" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false"
          placeholder="여기에 입력" value="${esc(it.val)}" ${done ? 'readonly' : ''}>
        ${done ? fbHtml(it, it.res === true, it.res === 'hint' ? '정답! 힌트를 써서 복습 목록에 남겨 둘게요' : null) : ''}
      </div>`;
      foot = done ? `<button class="btn big primary" data-a="next">${ses.i + 1 >= ses.q.length ? '결과 보기' : '다음'} ${ic('arrow')}<kbd>Enter</kbd></button>`
        : `<button class="btn big ghost" data-a="hint">${ic('bulb')} 힌트</button><button class="btn big primary" data-a="spell-ok">확인<kbd>Enter</kbd></button>`;
    } else {
      const w = it.w, done = it.picked !== null, koOpts = it.type !== 'ko2en';
      const head = it.type === 'en2ko' ? `<p class="q-label">알맞은 뜻을 고르세요</p><h2 class="headword">${esc(w.w)}</h2>${formsHtml(w)}<div class="q-sub">${posTag(w.pos)}${speakBtn(w.w)}</div>`
        : it.type === 'ko2en' ? `<p class="q-label">뜻에 맞는 단어를 고르세요</p><h2 class="q-ko">${esc(w.ko)}</h2><div class="q-sub">${posTag(w.pos)}</div>`
          : `<p class="q-label">잘 듣고 알맞은 뜻을 고르세요</p><button class="listen" data-a="speak" data-w="${esc(w.w)}" aria-label="다시 듣기">${ic('sound')}</button><div class="q-sub">${done ? `<b class="headword sm">${esc(w.w)}</b>` : '<span class="sub">눌러서 다시 듣기</span>'}</div>${formsHtml(w, done)}`;
      body = `<div class="q">${head}
        <div class="opts ${koOpts ? '' : 'en'}">${it.opts.map((o, i) => {
          const cls = !done ? '' : o === w ? 'correct' : i === it.picked ? 'wrong' : 'dim';
          return `<button class="opt ${cls}" data-a="pick" data-i="${i}" ${done ? 'disabled' : ''}><kbd>${i + 1}</kbd><span>${esc(koOpts ? o.ko : o.w)}</span>${cls === 'correct' ? ic('check') : cls === 'wrong' ? ic('x') : ''}</button>`;
        }).join('')}</div>
        ${done ? fbHtml(it, it.opts[it.picked] === w) : ''}
      </div>`;
      foot = done ? `<button class="btn big primary" data-a="next">${ses.i + 1 >= ses.q.length ? '결과 보기' : '다음'} ${ic('arrow')}<kbd>Enter</kbd></button>` : '';
    }

    el.innerHTML = `<div class="ses lv-${ses.lv}">
      <header class="ses-top">
        <button class="icon-btn" data-a="ses-exit" aria-label="학습 종료">${ic('x')}</button>
        <div class="ses-bar"><i style="width:${ses.i / ses.q.length * 100}%"></i></div>
        <span class="ses-count">${ses.i + 1} / ${ses.q.length}</span>
      </header>
      <p class="ses-title">${esc(ses.title)}${it.retry ? ' <span class="badge now">다시 도전</span>' : ''}</p>
      <div class="ses-body">${body}</div>
      <footer class="ses-foot ${foot ? '' : 'empty'}">${foot}</footer>
    </div>`;
    const input = $('#spell-in');
    if (input && it.res === null) { input.focus(); input.setSelectionRange(input.value.length, input.value.length); }
  }

  function fbHtml(it, ok, msg) {
    const w = it.w;
    return `<div class="fb ${ok ? 'ok' : 'bad'}">
      <div class="fb-head">${ic(ok ? 'check' : 'x')}<b>${msg || (ok ? '정답입니다' : '다시 확인해 보세요')}</b></div>
      <p class="fb-word"><b>${esc(w.w)}</b> ${esc(w.ko)}</p>
      ${(it.type === 'spell' || it.type === 'ko2en') && hasForms(w) ? formsHtml(w, true, 'left free') : ''}
      <p class="fb-ex">${exHtml(w)}<span>${esc(w.exko)}</span></p></div>`;
  }

  function record(it, ok) {
    if (it.retry) return;
    grade(it.w, ok);
    if (ok) ses.right++; else ses.wrongs.push(it.w);
    save();
  }
  function sesPick(i) {
    const it = ses.q[ses.i];
    if (!it.opts || it.picked !== null) return;
    it.picked = i;
    const ok = it.opts[i] === it.w;
    record(it, ok);
    if (!ok && ses.mode !== 'test' && !it.retry) ses.q.push(makeMcq(it.w, it.type === 'listen' ? 'en2ko' : it.type, true));
    sesRender();
    if (it.type === 'ko2en' && S.autoSpeak) speak(it.w.w);
    if (ok) ses.timer = setTimeout(sesNext, 1000);
  }
  function sesSpell() {
    const it = ses.q[ses.i], input = $('#spell-in');
    if (it.type !== 'spell' || it.res !== null) return;
    it.val = input.value;
    if (!norm(it.val)) { input.classList.remove('shake'); void input.offsetWidth; input.classList.add('shake'); return; }
    const right = norm(it.val) === norm(it.w.w);
    it.res = right ? (it.hint > 1 ? 'hint' : true) : false;
    record(it, it.res === true);
    if (it.res !== true && !it.retry) ses.q.push({ w: it.w, type: 'spell', hint: 1, res: null, val: '', retry: true });
    sesRender();
    if (S.autoSpeak) speak(it.w.w);
  }
  function sesHint() {
    const it = ses.q[ses.i];
    if (it.type !== 'spell' || it.res !== null) return;
    it.val = $('#spell-in').value;
    if (it.hint < it.w.w.length - 1) it.hint++;
    while (it.w.w[it.hint - 1] === ' ' && it.hint < it.w.w.length - 1) it.hint++;
    sesRender();
  }
  function sesCard(know) {
    const it = ses.q[ses.i];
    if (it.type !== 'card') return;
    if (!it.retry) { cardGrade(it.w, know); if (know) ses.right++; else ses.wrongs.push(it.w); save(); }
    if (!know) ses.q.push({ w: it.w, type: 'card', retry: true });
    sesNext();
  }
  function sesNext() {
    clearTimeout(ses.timer);
    const it = ses.q[ses.i];
    if (it.type === 'spell' && it.res === null) return;
    if (it.opts && it.picked === null) return;
    ses.i++;
    if (ses.i >= ses.q.length) return sesFinish();
    sesRender(); sesSpeak();
  }

  function sesFinish() {
    const pct = Math.round(ses.right / ses.total * 100);
    let passNow = false;
    if (ses.unit) {
      const u = usm(ses.unit.id);
      if (ses.mode === 'cards') u.c = 1;
      if (ses.mode === 'quiz') u.q = Math.max(u.q || 0, pct);
      if (ses.mode === 'spell') u.s = Math.max(u.s || 0, pct);
      if (ses.mode === 'test') { u.t = Math.max(u.t || 0, pct); if (pct >= PASS && !u.p) { u.p = 1; passNow = true; } }
    }
    save();
    ses.result = { pct, passNow };
    const sec = Math.round((Date.now() - ses.t0) / 1000), tm = sec >= 60 ? `${Math.floor(sec / 60)}분 ${sec % 60}초` : `${sec}초`;
    const isTest = ses.mode === 'test', pass = pct >= PASS;
    let title, sub;
    if (ses.mode === 'cards') { title = '카드를 모두 확인했어요'; sub = ses.wrongs.length ? `처음에 몰랐던 단어 ${ses.wrongs.length}개는 복습에 넣어 뒀어요.` : '모든 단어를 알고 있네요. 퀴즈로 확인해 볼까요?'; }
    else if (isTest) { title = pass ? '테스트 통과' : '통과 기준에 조금 못 미쳤습니다'; sub = pass ? (passNow ? '다음 Day가 열렸어요.' : '이미 통과한 Day입니다.') : `${PASS}점 이상이면 통과예요. 틀린 단어를 다시 보고 도전해 보세요.`; }
    else { title = pct === 100 ? '모두 맞혔습니다' : pct >= 80 ? '안정적인 점수입니다' : pct >= 50 ? '절반 이상 기억하고 있습니다' : '한 번 더 반복해 보세요'; sub = ses.wrongs.length ? `틀린 단어 ${ses.wrongs.length}개는 오늘 복습 목록에 들어가요.` : '틀린 단어 없이 끝냈어요.'; }

    // 다음 행동 제안
    let nextBtn = '';
    if (ses.unit) {
      const order = ['cards', 'quiz', 'spell', 'test'], k = order.indexOf(ses.mode), u = ses.unit;
      if (k < 3) nextBtn = `<button class="btn big primary" data-a="start" data-unit="${u.id}" data-mode="${order[k + 1]}">다음: ${MODES[k + 1].name} ${ic('arrow')}</button>`;
      else if (pass) {
        const nx = u.level.units[u.idx + 1] || (LEVELS[LEVELS.indexOf(u.level) + 1] || { units: [] }).units[0];
        if (nx) nextBtn = `<button class="btn big primary" data-a="goto" data-href="#/unit/${nx.id}">다음 Day로 ${ic('arrow')}</button>`;
      }
    }
    const tone = ses.mode === 'cards' || pct >= PASS ? 'ok' : pct >= 50 ? 'mid' : 'bad';
    $('#session').innerHTML = `<div class="ses lv-${ses.lv}">
      <header class="ses-top"><button class="icon-btn" data-a="ses-close" aria-label="닫기">${ic('x')}</button><div class="ses-bar"><i style="width:100%"></i></div><span class="ses-count">완료</span></header>
      <div class="ses-body"><div class="res">
        <div class="res-ring ${tone}">${ring(pct / 100, 148, 12)}<div><b>${pct}</b><span>${ses.mode === 'cards' ? '% 알아요' : '점'}</span></div></div>
        <h2>${title}</h2><p class="sub">${sub}</p>
        <div class="res-stats"><div><b>${ses.right}</b><span>${ses.mode === 'cards' ? '아는 단어' : '정답'}</span></div><div><b>${ses.wrongs.length}</b><span>${ses.mode === 'cards' ? '모르는 단어' : '오답'}</span></div><div><b>${tm}</b><span>소요 시간</span></div></div>
        ${ses.wrongs.length ? `<div class="res-wrong"><h4>다시 볼 단어</h4><div class="card wlist">${ses.wrongs.map((w) => wordRow(w)).join('')}</div></div>` : ''}
      </div></div>
      <footer class="ses-foot wrap">
        ${ses.wrongs.length ? `<button class="btn big ghost" data-a="retry-wrong">틀린 단어만 다시</button>` : `<button class="btn big ghost" data-a="retry-all">한 번 더</button>`}
        ${nextBtn || `<button class="btn big primary" data-a="ses-close">완료</button>`}
      </footer></div>`;
  }

  /* ───────────────────────── 라우터 · 렌더 ───────────────────────── */
  function route() {
    const p = location.hash.replace(/^#\/?/, '').split('/');
    return { name: p[0] || 'home', arg: p[1] ? decodeURIComponent(p[1]) : '' };
  }
  let lastRoute = '';
  function render() {
    const r = route(), views = { home: vHome, course: vCourse, unit: vUnit, review: vReview, words: vWords, stats: vStats, settings: vSettings };
    const view = $('#view'), active = r.name === 'unit' ? 'course' : (views[r.name] ? r.name : 'home');
    view.innerHTML = (views[r.name] || vHome)(r.arg);
    const key = r.name + '/' + r.arg;
    if (key !== lastRoute) { scrollTo(0, 0); view.classList.remove('enter'); void view.offsetWidth; view.classList.add('enter'); lastRoute = key; }

    const sk = streak(), day = S.days[today()] || { n: 0 }, due = dueWords().length;
    const link = (n) => `<a class="nav-item ${n.id === active ? 'on' : ''}" href="#/${n.id}" ${n.id === active ? 'aria-current="page"' : ''}>${ic(n.icon)}<span>${n.label}</span>${n.id === 'review' && due ? `<em>${due > 99 ? '99+' : due}</em>` : ''}</a>`;
    const hubIc = EH ? EH.ICON : '';
    $('#side').innerHTML = `<a class="logo" href="#/home">${LOGO}<span class="logo-text">Auto Word</span></a>
      <a class="hub-link" href="../">${hubIc}<span>English Hub</span></a>
      <nav class="nav" aria-label="주 메뉴">${NAV.map(link).join('')}</nav>
      <div class="side-card"><div class="side-streak"><span class="flame-mini ${sk ? 'on' : ''}">${ic('flame')}</span><b>${sk}일 연속</b></div>
        <div class="progress"><i style="width:${Math.min(100, day.n / S.goal * 100)}%"></i></div><span class="sub">오늘 ${day.n} / ${S.goal}회</span></div>`;
    $('#mtop').innerHTML = `<span class="mtop-left"><a class="icon-btn" href="../" aria-label="English Hub 홈">${hubIc}</a><a class="logo" href="#/home">${LOGO}<span class="logo-text">Auto Word</span></a></span>
      <span class="mtop-right"><span class="pill ${sk ? 'on' : ''}">${ic('flame')}${sk}</span><a class="icon-btn" href="#/settings" aria-label="설정">${ic('gear')}</a></span>`;
    $('#tabbar').innerHTML = NAV.slice(0, 5).map(link).join('');
    if (EH) {   // 통합 홈이 보여 줄 요약
      const nu = nextUnit(), done = ALL.filter((w) => statusOf(w.id) === 'done').length;
      EH.summary('word', { next: nu ? `${nu.level.name} · Day ${pad(nu.idx + 1)}  ${nu.title}` : (S.onboarded ? '모든 Day 를 마쳤어요' : ''), done, total: ALL.length });
    }
  }

  /* ───────────────────────── 이벤트 ───────────────────────── */
  const ACT = {
    speak: (el) => speak(el.dataset.w),
    star: (el) => {
      const st = wsm(el.dataset.id); st.s = st.s ? 0 : 1; save();
      document.querySelectorAll('.star').forEach((b) => { if (b.dataset.id === el.dataset.id) b.classList.toggle('on', !!st.s); });
      toast(st.s ? '즐겨찾기에 추가했어요' : '즐겨찾기에서 뺐어요');
    },
    word: (el) => wordModal(el.dataset.id),
    unit: (el) => { location.hash = `#/unit/${el.dataset.id}`; },
    goto: (el) => { closeSession(); location.hash = el.dataset.href; },
    start: (el) => { if (ses) { clearTimeout(ses.timer); ses = null; } startUnit(el.dataset.unit, el.dataset.mode); },
    'hide-ko': () => { hideKo = !hideKo; render(); },
    part: (el) => { PART_OPEN[el.dataset.k] = el.dataset.open !== '1'; render(); },
    'review-start': () => startSession({ mode: 'review', words: dueWords().slice(0, REVIEW_MAX), title: '오늘의 복습' }),
    'wrong-start': () => startSession({ mode: 'review', words: wrongWords().slice(0, REVIEW_MAX), title: '오답 집중 퀴즈' }),
    'star-start': () => startSession({ mode: 'cards', words: starWords(), title: '즐겨찾기 카드' }),
    wf: (el) => { WF[el.dataset.k] = el.dataset.v; WF.limit = 60; render(); },
    more: () => { WF.limit += 100; $('#wresult').innerHTML = wordsListHtml(); },
    set: (el) => {
      S[el.dataset.k] = JSON.parse(el.dataset.v); save(); if (EH && el.dataset.k === 'theme') EH.setMode(S.theme); applyTheme(); render();
      if (el.dataset.k === 'accent' || el.dataset.k === 'rate') speak('Hello, nice to meet you.');
    },
    export: () => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([JSON.stringify(S, null, 2)], { type: 'application/json' }));
      a.download = `autoword-backup-${new Date().toISOString().slice(0, 10)}.json`;
      a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
      toast('백업 파일을 저장했어요');
    },
    import: () => $('#import-file').click(),
    reset: () => confirmBox('학습 기록을 초기화할까요?', '모든 진행 상황과 통계가 삭제되며 되돌릴 수 없습니다.', '초기화', () => {
      try { localStorage.removeItem(KEY); } catch (e) { /* 무시 */ }
      S = defaults(); if (EH) S.theme = EH.mode(); applyTheme(); location.hash = '#/home'; render(); onboarding();
    }, true),
    'modal-close': () => { if ($('.modal-card.locked')) return; closeModal(); },
    'confirm-ok': () => { const cb = confirmCb; confirmCb = null; closeModal(); if (cb) cb(); },
    'ob-start': (el) => { OB.start = +el.dataset.v; onboarding(); },
    'ob-goal': (el) => { OB.goal = +el.dataset.v; onboarding(); },
    'ob-done': () => { S.start = OB.start; S.goal = OB.goal; S.onboarded = true; save(); closeModal(); render(); toast(`${LEVELS[S.start].name} 단계부터 시작합니다`); },
    /* 세션 */
    flip: () => { const f = $('#fc'); if (f) f.classList.toggle('is-flipped'); },
    'card-yes': () => sesCard(true),
    'card-no': () => sesCard(false),
    pick: (el) => sesPick(+el.dataset.i),
    next: () => sesNext(),
    hint: () => sesHint(),
    'spell-ok': () => sesSpell(),
    'ses-close': () => closeSession(),
    'ses-exit': () => {
      if (!ses || ses.result || ses.i === 0) return closeSession();
      confirmBox('학습을 그만할까요?', '지금까지 푼 문제의 기록은 저장됩니다.', '그만하기', closeSession);
    },
    'retry-wrong': () => { const o = { mode: ses.mode === 'test' ? 'quiz' : ses.mode, words: ses.wrongs.slice(), unit: null, title: '틀린 단어 다시 보기' }; startSession(o); },
    'retry-all': () => startSession({ mode: ses.mode, words: ses.words, unit: ses.unit, title: ses.title }),
  };

  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-a]');
    if (!el || el.disabled) return;
    const fn = ACT[el.dataset.a];
    if (fn) { if (el.tagName !== 'A') e.preventDefault(); fn(el, e); }
  });

  document.addEventListener('input', (e) => {
    if (e.target.id === 'wsearch') { WF.q = e.target.value; WF.limit = 60; $('#wresult').innerHTML = wordsListHtml(); }
  });

  $('#import-file').addEventListener('change', (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const rd = new FileReader();
    rd.onload = () => {
      try {
        const d = JSON.parse(rd.result);
        if (!d || typeof d !== 'object' || typeof d.words !== 'object' || typeof d.days !== 'object') throw new Error('format');
        S = Object.assign(defaults(), d); save(); applyTheme(); render(); toast('백업을 불러왔어요');
      } catch (err) { toast('올바른 백업 파일이 아니에요'); }
    };
    rd.readAsText(f); e.target.value = '';
  });

  document.addEventListener('keydown', (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const k = e.key, modalOpen = !$('#modal').hidden;
    if (modalOpen) { if (k === 'Escape') ACT['modal-close'](); return; }
    if (!ses) {
      if ((k === 'Enter' || k === ' ') && e.target.classList && e.target.classList.contains('wrow')) { e.preventDefault(); wordModal(e.target.dataset.id); }
      return;
    }
    if (k === 'Escape') { e.preventDefault(); return ACT['ses-exit'](); }
    if (ses.result) { return; }
    const it = ses.q[ses.i];
    if (it.type === 'card') {
      if (k === ' ' || k === 'Enter' || k === 'ArrowUp' || k === 'ArrowDown') { e.preventDefault(); ACT.flip(); }
      else if (k === 'ArrowRight' || k === '2') { e.preventDefault(); sesCard(true); }
      else if (k === 'ArrowLeft' || k === '1') { e.preventDefault(); sesCard(false); }
    } else if (it.type === 'spell') {
      if (k === 'Enter') { e.preventDefault(); if (it.res === null) sesSpell(); else sesNext(); }
    } else {
      if (it.picked === null && k >= '1' && k <= '4') { e.preventDefault(); sesPick(+k - 1); }
      else if (it.picked !== null && (k === 'Enter' || k === ' ')) { e.preventDefault(); sesNext(); }
    }
  });

  addEventListener('hashchange', () => { closeModal(); if (!ses) render(); });

  /* ───────────────────────── 시작 ───────────────────────── */
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';   // 새로고침 시 이전 스크롤 위치로 튀지 않게
  applyTheme();
  render();
  if (!S.onboarded) onboarding();
  window.__autoword = { start: startUnit, state: () => S, count: ALL.length };   // 디버깅용
})();
