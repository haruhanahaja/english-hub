(() => {
'use strict';

/* ================= 데이터 ================= */
const ITEMS = {};
const LEVELS = COURSE.map(L => {
  const level = { ...L };
  level.units = L.units.map((u, ui) => {
    const unit = { id: `${L.id}-${ui + 1}`, title: u.title, dialog: !!u.dialog, level };
    unit.items = u.lines.trim().split('\n').map((line, i) => {
      const [en, ko, tip = ''] = line.split('|').map(s => s.trim());
      const it = { id: `${unit.id}:${i}`, en, ko, tip, who: unit.dialog ? i % 2 : -1, unit, level };
      ITEMS[it.id] = it;
      return it;
    });
    return unit;
  });
  level.items = level.units.flatMap(u => u.items);
  return level;
});
const UNITS = LEVELS.flatMap(L => L.units);
const ALL = Object.values(ITEMS);

/* ================= 저장 ================= */
const KEY = 'gwiteuim.v1';
const DAY = 864e5;
const S = Object.assign(
  { srs: {}, days: {}, level: 1, voice: '', hideText: true, hideKo: true, goal: 20, mode: 'listen' },
  (() => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; } })()
);
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch { /* 저장 불가 환경 */ } };
const fmt = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const today = () => fmt(new Date());

function streak() {
  const d = new Date();
  if (!S.days[fmt(d)]) d.setDate(d.getDate() - 1);
  let n = 0;
  while (S.days[fmt(d)]) { n++; d.setDate(d.getDate() - 1); }
  return n;
}

/* 간격 반복: 상자(b)가 올라갈수록 복습 간격이 길어집니다 */
const GAP = [0, 1, 3, 7, 14, 30];
function record(id, r) { // r: 0 안 들림, 1 일부, 2 다 들림
  const c = S.srs[id] || { b: 0 };
  if (r === 2) c.b = Math.min(5, Math.max(2, c.b + 1));
  else if (r === 1) c.b = Math.max(1, c.b - 1);
  else c.b = 1;
  const midnight = new Date().setHours(0, 0, 0, 0);
  c.d = r === 2 ? midnight + GAP[c.b] * DAY : r === 1 ? midnight + DAY : Date.now();
  S.srs[id] = c;
  S.days[today()] = (S.days[today()] || 0) + 1;
  save();
}
const known = it => (S.srs[it.id]?.b || 0) >= 2;
const pct = items => items.filter(known).length / items.length;
const dueItems = () => ALL.filter(it => S.srs[it.id] && S.srs[it.id].d <= Date.now())
  .sort((a, b) => S.srs[a.id].d - S.srs[b.id].d);

/* ================= 음성 ================= */
const synth = window.speechSynthesis;
let voices = [], token = 0, timer = 0, curUtter = null;
const NOVELTY = /Albert|Bad News|Bahh|Bells|Boing|Bubbles|Cellos|Good News|Jester|Organ|Superstar|Trinoids|Whisper|Wobble|Zarvox|Fred|Junior|Kathy|Ralph|Eddy|Flo|Grandma|Grandpa|Reed|Rocko|Sandy|Shelley/i;
function score(v) {
  let s = 0;
  if (/en[-_]US/i.test(v.lang)) s += 10;
  if (/premium|enhanced|natural|neural|siri/i.test(v.name)) s += 8;
  if (/Samantha|Ava|Allison|Evan|Zoe|Google US|Aria|Jenny|Guy/i.test(v.name)) s += 5;
  if (NOVELTY.test(v.name)) s -= 30;
  return s;
}
function loadVoices() {
  if (!synth) return;
  voices = synth.getVoices().filter(v => /^en[-_]/i.test(v.lang)).sort((a, b) => score(b) - score(a));
}
function voiceFor(who) {
  const main = voices.find(v => v.name === S.voice) || voices[0];
  if (who !== 1 || !main) return { v: main, p: 1 };
  const other = voices.find(v => v.name !== main.name && score(v) >= 0);
  return other ? { v: other, p: 1 } : { v: main, p: 0.78 };
}
const setSpeaking = on => document.body.classList.toggle('speaking', on);
let watch = 0, plainVoice = false; // plainVoice: 지정한 목소리가 소리를 못 내면 브라우저 기본 영어 음성으로 전환
const isBusy = () => !!synth && (synth.speaking || synth.pending);
function silence(u) { if (u) u.onstart = u.onend = u.onerror = u.onboundary = null; }
function stop() {
  token++;
  clearTimeout(timer); clearTimeout(watch);
  silence(curUtter);
  // 재생 중이 아닐 때 cancel()을 부르면 Safari가 바로 다음 speak()까지 삼켜 버립니다
  if (isBusy()) synth.cancel();
  setSpeaking(false);
}
function soundHelp(show) {
  let el = document.getElementById('soundhelp');
  if (!show) { if (el) el.remove(); return; }
  if (el) return;
  el = document.createElement('div');
  el.id = 'soundhelp';
  el.innerHTML = `<b>소리가 재생되지 않았습니다.</b> Mac 음량을 확인하고, 홈 화면 맨 아래 「설정 → 목소리」에서 다른 목소리를 골라 보세요. 그래도 안 되면 이 주소를 Chrome에서 열어 주세요. <button data-a="closeHelp">닫기</button>`;
  document.body.appendChild(el);
}
function speak(text, { rate = 1, who = -1, times = 1, onend } = {}) {
  const wasBusy = isBusy();
  stop();
  if (!synth) return;
  const my = token;
  let n = 0;
  const go = () => {
    if (my !== token) return;
    const u = new SpeechSynthesisUtterance(text);
    const { v, p } = voiceFor(who);
    const plain = plainVoice || !v;
    if (plain) u.lang = 'en-US'; else { u.voice = v; u.lang = v.lang; }
    u.rate = rate; u.pitch = p; u.volume = 1;
    let started = false;
    const ok = () => { if (!started) { started = true; clearTimeout(watch); soundHelp(false); } };
    const failed = () => { // 소리가 시작되지 못함 → 기본 음성으로 한 번 더, 그래도 안 되면 안내
      clearTimeout(watch);
      silence(u);
      if (isBusy()) synth.cancel();
      if (!plain) { plainVoice = true; timer = setTimeout(go, 300); }
      else { setSpeaking(false); soundHelp(true); }
    };
    u.onstart = u.onboundary = () => { if (my === token) ok(); };
    u.onend = () => {
      if (my !== token) return;
      ok();
      if (++n < times) timer = setTimeout(go, 700);
      else { setSpeaking(false); if (onend) onend(); }
    };
    u.onerror = e => {
      if (my !== token) return;
      if (started || e.error === 'interrupted' || e.error === 'canceled') { clearTimeout(watch); setSpeaking(false); }
      else failed();
    };
    curUtter = u; // 재생 중 가비지 컬렉션 방지
    if (synth.paused) synth.resume();
    synth.speak(u);
    clearTimeout(watch);
    watch = setTimeout(() => { if (my === token && !started) failed(); }, 3000);
  };
  setSpeaking(true);
  // 클릭 직후에는 지연 없이 재생해야 브라우저가 소리를 막지 않습니다. 다른 소리를 끊은 직후에만 잠깐 기다립니다.
  if (wasBusy) timer = setTimeout(go, 300); else go();
}

/* ================= 유틸 ================= */
const app = document.getElementById('app');
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const norm = s => s.toLowerCase().replace(/[’‘]/g, "'").replace(/[^a-z0-9' ]/g, ' ').split(/\s+/).filter(Boolean);
function ring(p, size = 40, sw = 4) {
  const r = (size - sw) / 2, c = 2 * Math.PI * r, h = size / 2;
  return `<svg class="ring" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" aria-hidden="true">
    <circle cx="${h}" cy="${h}" r="${r}" fill="none" stroke="var(--line)" stroke-width="${sw}"/>
    <circle cx="${h}" cy="${h}" r="${r}" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round"
      stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - Math.min(1, p))}" transform="rotate(-90 ${h} ${h})"/></svg>`;
}
function shuffle(a) {
  a = [...a];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
/* 정답 단어 중 사용자가 맞힌 위치 (최장 공통 부분열) */
function lcsHits(target, typed) {
  const m = target.length, n = typed.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = m - 1; i >= 0; i--) for (let j = n - 1; j >= 0; j--)
    dp[i][j] = target[i] === typed[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const hits = new Set();
  for (let i = 0, j = 0; i < m && j < n;) {
    if (target[i] === typed[j]) { hits.add(i); i++; j++; }
    else if (dp[i + 1][j] >= dp[i][j + 1]) i++; else j++;
  }
  return hits;
}

/* ================= 홈 ================= */
let view = 'home', ses = null;

function nextUnit() {
  const L = LEVELS.find(l => l.id === S.level) || LEVELS[0];
  return L.units.find(u => pct(u.items) < 1) || UNITS.find(u => u.level.id > L.id && pct(u.items) < 1) || L.units[0];
}

/* 아래 메뉴: 홈 · 복습 · 내 기록 (단어 · 문법 파트와 같은 자리 · 같은 이름) */
let tab = 'home';
const TABS = [
  { id: 'home', label: '홈', icon: 'M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z' },
  { id: 'review', label: '복습', icon: 'M20 11a8 8 0 1 0-2.3 5.7M20 4v7h-7' },
  { id: 'me', label: '내 기록', icon: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4.5 20.500a7.500 7.500 0 0 1 15 0' },
];
function tabbar(due) {
  return `<nav class="tabbar" aria-label="주 메뉴">${TABS.map(t => `<button class="tab ${t.id === tab ? 'on' : ''}" data-a="tab" data-id="${t.id}" ${t.id === tab ? 'aria-current="page"' : ''}>
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${t.icon}"/></svg>
    <span>${t.label}</span>${t.id === 'review' && due ? `<em>${due > 99 ? '99+' : due}</em>` : ''}</button>`).join('')}</nav>`;
}
function topbar(st) {
  return `
  <header class="top">
    <div class="brand-row"><a class="hub-btn" href="../" aria-label="English Hub 홈">${window.EH ? EH.ICON : ''}</a><div class="brand">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M4 10v4M8 6v12M12 3v18M16 7v10M20 10v4"/></svg>
      귀트임
    </div></div>
    <span class="streak">${st ? `🔥 ${st}일 연속` : '오늘 첫 학습을 시작해요'}</span>
  </header>`;
}

function renderHome() {
  const due = dueItems(), st = streak();
  app.innerHTML = topbar(st) + (tab === 'review' ? pageReview(due) : tab === 'me' ? pageMe(due, st) : pageHome(due)) + tabbar(due.length);
}

function pageHome(due) {
  const knownN = ALL.filter(known).length, td = S.days[today()] || 0, nu = nextUnit();
  const started = Object.keys(S.srs).length > 0;
  return `
  <section class="hero">
    <h1>자막 없이 영화를 보는 날까지,<br><em>하루 ${S.goal}문장</em>씩 귀를 엽니다.</h1>
    <p>지문을 가린 채 먼저 듣고, 확인하고, 잊을 때쯤 다시 듣습니다. 6단계 ${ALL.length}문장이 짧은 인사말에서 영화 장면까지 이어집니다.</p>
    <div class="hero-cta">
      <button class="btn" data-a="unit" data-id="${nu.id}">▶ ${started ? '이어서 학습' : '학습 시작'} · ${esc(nu.title)}</button>
      ${due.length ? `<button class="btn line" data-a="review">복습 ${due.length}문장</button>` : ''}
    </div>
    ${!synth ? `<p class="notice">이 브라우저는 음성 재생을 지원하지 않습니다. Chrome, Safari, Edge 최신 버전에서 열어 주세요.</p>` : ''}
  </section>


  <section class="stats">
    <div class="stat">${ring(td / S.goal)}<div><b>${td} / ${S.goal}</b><small>오늘 들은 문장</small></div></div>
    <div class="stat">${ring(knownN / ALL.length)}<div><b>${knownN} / ${ALL.length}</b><small>귀에 익은 문장</small></div></div>
    <div class="stat">${ring(due.length ? 1 : 0)}<div><b>${due.length}</b><small>복습할 문장</small></div></div>
  </section>


  <h2 class="eyebrow">레벨 선택 — 처음이라면 1단계부터</h2>
  ${LEVELS.map(L => {
    const p = pct(L.items), open = S.level === L.id;
    return `<section class="lv" style="--c:var(--l${L.id})">
      <button class="lv-head" data-a="level" data-id="${L.id}" aria-expanded="${open}">
        <span class="lv-no">${L.id}</span>
        <span class="lv-main"><b>${esc(L.name)}</b><small>${esc(L.desc)} · 기본 속도 ${L.rate}×</small></span>
        <span class="lv-pct">${Math.round(p * 100)}%</span>
      </button>
      <div class="bar"><i style="width:${p * 100}%"></i></div>
      ${open ? `<div class="lv-body">
        <p class="lv-who"><b>이런 분께</b> ${esc(L.who)}<br><b>목표</b> ${esc(L.goal)}</p>
        <div class="units">${L.units.map(u => {
          const k = u.items.filter(known).length;
          return `<button class="unit" data-a="unit" data-id="${u.id}">${ring(k / u.items.length, 30, 3.5)}
            <span>${esc(u.title)}<small>${k} / ${u.items.length} 문장</small></span></button>`;
        }).join('')}</div>
      </div>` : ''}
    </section>`;
  }).join('')}


  <h2 class="eyebrow">이렇게 학습하세요</h2>
  <div class="method">
    <div><b>가리고 듣기</b>지문 없이 2~3번 듣고 들린 만큼만 머릿속에 적습니다.</div>
    <div><b>맞춰 보기</b>단어 순서 맞추기나 받아쓰기로 정말 들었는지 확인합니다.</div>
    <div><b>지문 확인</b>안 들린 부분과 듣기 팁을 보고, 왜 안 들렸는지 이해합니다.</div>
    <div><b>따라 말하기</b>지문을 보며 소리와 동시에 따라 말합니다. 입이 되면 귀도 열립니다.</div>
  </div>`;
}

function pageReview(due) {
  const soon = ALL.filter(it => S.srs[it.id] && S.srs[it.id].d > Date.now() && S.srs[it.id].d <= Date.now() + DAY).length;
  return `
  <section class="hero">
    <h1>복습</h1>
    <p>들은 문장은 1일 · 3일 · 7일 · 14일 · 30일 뒤에 다시 나옵니다. 잊을 때쯤 다시 들어야 귀에 남습니다.</p>
  </section>
  <section class="review-card">
    <b class="bignum">${due.length}</b><small>지금 복습할 문장</small>
    ${due.length ? `<button class="btn" data-a="review">▶ 복습 시작 · ${Math.min(20, due.length)}문장</button>`
      : `<p class="empty">${Object.keys(S.srs).length ? '지금은 복습할 문장이 없어요.' : '아직 들은 문장이 없어요. 홈에서 첫 학습을 시작해 보세요.'}</p>`}
    ${soon ? `<small>내일까지 ${soon}문장이 더 돌아와요</small>` : ''}
  </section>
  ${due.length ? `<h2 class="eyebrow">기다리는 문장</h2>
  <div class="due-list">${due.slice(0, 20).map(it => `<div><span class="lv-dot" style="background:var(--l${it.level.id})"></span><span>${esc(it.ko)}<small>레벨 ${it.level.id} · ${esc(it.unit.title)}</small></span></div>`).join('')}
    ${due.length > 20 ? `<p class="more">외 ${due.length - 20}문장</p>` : ''}</div>` : ''}`;
}

function pageMe(due, st) {
  const knownN = ALL.filter(known).length, td = S.days[today()] || 0;
  const total = Object.values(S.days).reduce((a, n) => a + n, 0), daysN = Object.keys(S.days).length;
  const week = [...Array(7)].map((_, i) => { const d = new Date(); d.setDate(d.getDate() - (6 - i)); return { n: S.days[fmt(d)] || 0, wd: '일월화수목금토'[d.getDay()], today: i === 6 }; });
  const top = Math.max(S.goal, ...week.map(d => d.n));
  return `
  <section class="hero">
    <h1>내 기록</h1>
    <p>${st ? `${st}일째 이어 듣고 있어요.` : '오늘 첫 학습을 시작해 보세요.'} 지금까지 ${daysN}일 동안 ${total.toLocaleString('ko-KR')}번 들었습니다.</p>
  </section>

  <section class="stats">
    <div class="stat">${ring(td / S.goal)}<div><b>${td} / ${S.goal}</b><small>오늘 들은 문장</small></div></div>
    <div class="stat">${ring(knownN / ALL.length)}<div><b>${knownN} / ${ALL.length}</b><small>귀에 익은 문장</small></div></div>
    <div class="stat">${ring(due.length ? 1 : 0)}<div><b>${due.length}</b><small>복습할 문장</small></div></div>
  </section>


  <h2 class="eyebrow">이번 주</h2>
  <div class="week">${week.map(d => `<div class="${d.n >= S.goal ? 'hit' : ''} ${d.today ? 'today' : ''}"><i style="height:${Math.max(d.n ? 6 : 0, d.n / top * 100)}%"></i><b>${d.n || ''}</b><span>${d.wd}</span></div>`).join('')}</div>

  <h2 class="eyebrow">레벨별 진도</h2>
  <div class="lv-prog">${LEVELS.map(L => { const k = L.items.filter(known).length; return `<div style="--c:var(--l${L.id})"><span><b>레벨 ${L.id}</b> ${esc(L.name)}</span><small>${k} / ${L.items.length}</small><div class="bar"><i style="width:${k / L.items.length * 100}%"></i></div></div>`; }).join('')}</div>

  <h2 class="eyebrow">설정</h2>
  <div class="settings">
    <label>목소리
      <select data-c="voice">${voices.length
        ? voices.filter(v => !NOVELTY.test(v.name)).map(v => `<option value="${esc(v.name)}" ${v.name === (S.voice || voices[0].name) ? 'selected' : ''}>${esc(v.name)} (${esc(v.lang)})</option>`).join('')
        : '<option>영어 음성을 찾는 중…</option>'}</select>
    </label>
    <label>하루 목표
      <select data-c="goal">${[10, 20, 30, 50].map(n => `<option value="${n}" ${n === S.goal ? 'selected' : ''}>${n}문장</option>`).join('')}</select>
    </label>
  </div>
  <p class="foot-note">귀트임 · 학습 기록은 이 기기에만 저장됩니다.</p>`;
}

/* ================= 학습 세션 ================= */
function startSession(items, { unit = null, label = '' } = {}) {
  if (!items.length) return;
  ses = { items: [...items], unit, label, pos: 0, rate: null, auto: false, res: [0, 0, 0], requeued: new Set() };
  resetCard();
  view = 'session';
  render();
  window.scrollTo(0, 0);
  play();
}
function resetCard() {
  Object.assign(ses, { shown: false, koShown: false, checked: null, typed: '', chips: null, built: [] });
}
const cur = () => ses.items[ses.pos];
const rateOf = it => ses.rate ?? it.level.rate;

function play(times = 1) {
  const it = cur();
  if (!it) return;
  speak(it.en, {
    rate: rateOf(it), who: it.who, times,
    onend: () => {
      if (!ses || !ses.auto) return;
      timer = setTimeout(() => {
        if (ses.pos < ses.items.length - 1) { ses.pos++; resetCard(); render(); play(); }
        else { ses.auto = false; render(); }
      }, 900);
    },
  });
}
function goto(pos) {
  stop();
  ses.pos = pos;
  resetCard();
  render();
  if (cur()) play();
}
function reveal() { ses.shown = true; render(); }

function makeChips(it) {
  const words = it.en.split(/\s+/);
  const chips = words.map((w, i) => {
    let t = w.replace(/[.,!?]+$/g, '');
    if (i === 0 && !/^I\b/.test(t)) t = t[0].toLowerCase() + t.slice(1);
    return { t, n: norm(w).join(' ') };
  });
  let order = shuffle(chips.map((_, i) => i));
  if (chips.length > 1 && order.every((v, i) => v === i)) order.reverse();
  return order.map(i => chips[i]);
}
function checkOrder(it) {
  const ok = ses.built.map(i => ses.chips[i].n).join(' ') === norm(it.en).join(' ');
  ses.checked = { ok, sug: ok ? 2 : 0 };
  ses.shown = true;
}
function checkDict(it) {
  const target = norm(it.en), hits = lcsHits(target, norm(ses.typed));
  const acc = hits.size / target.length;
  ses.checked = { ok: acc === 1, hits, acc, sug: acc >= 0.9 ? 2 : acc >= 0.5 ? 1 : 0 };
  ses.shown = true;
}

function textHTML(it, shown) {
  const words = it.en.split(/\s+/);
  if (!shown) {
    return `<button class="text masked" data-a="reveal" aria-label="지문 보기">
      ${words.map(w => `<span class="mask" style="width:${Math.max(1.1, w.length * 0.58).toFixed(2)}em"></span>`).join('')}
      <span class="hint">단어 ${words.length}개 · 눌러서 지문 보기</span></button>`;
  }
  const hits = ses.checked?.hits;
  let k = 0;
  return `<div class="text">${words.map(w => {
    const n = norm(w).length;
    let cls = '';
    if (hits) { let all = true; for (let j = k; j < k + n; j++) if (!hits.has(j)) all = false; cls = all ? ' hit' : ' miss'; }
    k += n;
    return `<span class="w${cls}" data-a="word" data-w="${esc(w)}">${esc(w)}</span>`;
  }).join(' ')}<span class="hint">단어를 누르면 그 단어만 들려줍니다</span></div>`;
}

function workHTML(it) {
  if (S.mode === 'order') {
    if (!ses.chips) ses.chips = makeChips(it);
    if (ses.checked) return `<p class="verdict ${ses.checked.ok ? 'ok' : 'no'}">${ses.checked.ok ? '정확해요! 순서까지 들렸습니다.' : '순서가 달라요. 지문을 보며 다시 들어 보세요.'}</p>`;
    return `<div class="work">
      <div class="slots">${ses.built.map((ci, bi) => `<button class="tok" data-a="unpick" data-i="${bi}">${esc(ses.chips[ci].t)}</button>`).join('')}</div>
      <div class="pool">${ses.chips.map((c, i) => `<button class="tok ${ses.built.includes(i) ? 'used' : ''}" data-a="pick" data-i="${i}">${esc(c.t)}</button>`).join('')}</div>
    </div>`;
  }
  if (S.mode === 'dict') {
    if (ses.checked) {
      const p = Math.round(ses.checked.acc * 100);
      return `<p class="verdict ${p >= 90 ? 'ok' : 'no'}">정확도 ${p}% ${p === 100 ? '— 완벽해요!' : '— 빨간 단어가 놓친 소리입니다.'}</p>`;
    }
    return `<div class="work dict">
      <input id="dict" type="text" placeholder="들리는 대로 영어로 적어 보세요" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" value="${esc(ses.typed)}">
      <button class="btn" data-a="check">확인</button>
    </div>`;
  }
  return '';
}

const RATES = [0.6, 0.75, 0.85, 0.9, 1.0, 1.1, 1.2];
const MODES = [['listen', '듣기'], ['order', '단어 맞추기'], ['dict', '받아쓰기']];

function renderSession() {
  const it = cur();
  if (!it) return renderDone();
  const shown = ses.shown || (S.mode === 'listen' && !S.hideText);
  const koShown = ses.koShown || !S.hideKo;
  const r = rateOf(it), sug = ses.checked?.sug;
  app.innerHTML = `
  <header class="s-top">
    <button class="back" data-a="home" aria-label="홈으로">←</button>
    <div class="s-title"><small>${ses.label ? esc(ses.label) + ' · ' : ''}레벨 ${it.level.id} ${esc(it.level.name)}</small><b>${esc(it.unit.title)}</b></div>
    <span class="count">${ses.pos + 1} / ${ses.items.length}</span>
  </header>
  <div class="bar" style="--c:var(--l${it.level.id})"><i style="width:${ses.pos / ses.items.length * 100}%"></i></div>
  <nav class="modes">${MODES.map(([m, n]) => `<button class="${S.mode === m ? 'on' : ''}" data-a="mode" data-m="${m}">${n}</button>`).join('')}</nav>

  <main class="card">
    ${it.who >= 0 ? `<div class="who">${it.who ? 'B' : 'A'}의 대사</div><br>` : ''}
    <button class="play" data-a="play" aria-label="재생 / 정지">
      <svg class="i-play" width="34" height="34" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.2v13.6a1 1 0 0 0 1.5.86l11-6.8a1 1 0 0 0 0-1.72l-11-6.8A1 1 0 0 0 8 5.2z"/></svg>
      <svg class="i-stop" width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>
    </button>
    <div class="ctrl">
      ${RATES.map(x => `<button class="chip ${x === r ? 'on' : ''}" data-a="rate" data-r="${x}">${x.toFixed(2).replace(/0$/, '')}×</button>`).join('')}
      <span class="sep"></span>
      <button class="chip" data-a="loop">3번 반복</button>
      <button class="chip ${ses.auto ? 'on' : ''}" data-a="auto">연속 듣기</button>
    </div>
    ${textHTML(it, shown)}
    ${koShown ? `<div class="ko">${esc(it.ko)}</div>` : `<button class="ko masked" data-a="ko">해석 보기</button>`}
    ${shown && it.tip ? `<p class="tip"><b>듣기 팁</b>${esc(it.tip)}</p>` : ''}
    ${workHTML(it)}
  </main>

  <div class="rate">
    <button class="r0 ${sug === 0 ? 'sug' : ''}" data-a="grade" data-r="0">안 들려요<small>곧 다시 나옵니다</small></button>
    <button class="r1 ${sug === 1 ? 'sug' : ''}" data-a="grade" data-r="1">절반쯤 들려요<small>내일 복습</small></button>
    <button class="r2 ${sug === 2 ? 'sug' : ''}" data-a="grade" data-r="2">다 들려요<small>간격을 늘려 복습</small></button>
  </div>

  <footer class="s-foot">
    <button data-a="prev">← 이전 문장</button>
    <button class="switch ${S.hideText ? 'on' : ''}" data-a="hideText"><i></i>지문 가리기</button>
    <button class="switch ${S.hideKo ? 'on' : ''}" data-a="hideKo"><i></i>해석 가리기</button>
    <button data-a="skip">건너뛰기 →</button>
  </footer>
  <p class="keys"><kbd>Space</kbd> 재생 · <kbd>Enter</kbd> 지문 · <kbd>T</kbd> 해석 · <kbd>1</kbd><kbd>2</kbd><kbd>3</kbd> 평가 · <kbd>←</kbd><kbd>→</kbd> 이동</p>`;
  if (S.mode === 'dict' && !ses.checked) document.getElementById('dict')?.focus();
}

function renderDone() {
  stop();
  const [bad, mid, good] = ses.res;
  const i = ses.unit ? UNITS.indexOf(ses.unit) : -1, nu = i >= 0 ? UNITS[i + 1] : null;
  const due = dueItems().length;
  app.innerHTML = `
  <main class="card done">
    <h2>${good >= bad + mid ? '귀가 열리고 있어요' : '잘 버텼어요'}</h2>
    <p>${ses.unit ? esc(ses.unit.title) : '복습'} 완료 · 안 들린 문장은 복습 목록에 넣어 두었습니다.</p>
    <div class="tally">
      <div style="color:var(--good)"><b>${good}</b><small>다 들림</small></div>
      <div style="color:var(--mid)"><b>${mid}</b><small>절반쯤</small></div>
      <div style="color:var(--bad)"><b>${bad}</b><small>안 들림</small></div>
    </div>
    <div class="hero-cta">
      ${nu ? `<button class="btn" data-a="unit" data-id="${nu.id}">다음 · ${esc(nu.title)}</button>` : ''}
      ${due ? `<button class="btn ${nu ? 'line' : ''}" data-a="review">복습 ${due}문장</button>` : ''}
      ${ses.unit ? `<button class="btn line" data-a="unit" data-id="${ses.unit.id}">한 번 더</button>` : ''}
      <button class="btn line" data-a="home">홈으로</button>
    </div>
  </main>`;
}

function render() {
  view === 'home' ? renderHome() : renderSession();
  if (window.EH) {   // 통합 홈이 보여 줄 요약
    const u = nextUnit();
    EH.summary('hear', { next: `레벨 ${u.level.id} · ${u.title}`, done: ALL.filter(known).length, total: ALL.length });
  }
}

/* ================= 동작 ================= */
const ACT = {
  home() { stop(); ses = null; view = 'home'; render(); },
  tab(el) { tab = el.dataset.id; render(); window.scrollTo(0, 0); },
  level(el) { const id = +el.dataset.id; S.level = S.level === id ? 0 : id; save(); render(); },
  unit(el) { const u = UNITS.find(x => x.id === el.dataset.id); S.level = u.level.id; save(); startSession(u.items, { unit: u }); },
  review() { startSession(dueItems().slice(0, 20), { label: '복습' }); },
  play() { document.body.classList.contains('speaking') ? (ses.auto = false, stop(), render()) : play(); },
  loop() { play(3); },
  auto() { ses.auto = !ses.auto; render(); ses.auto ? play() : stop(); },
  rate(el) { ses.rate = +el.dataset.r; render(); play(); },
  mode(el) { S.mode = el.dataset.m; save(); resetCard(); render(); },
  reveal,
  closeHelp() { soundHelp(false); },
  ko() { ses.koShown = true; render(); },
  word(el) { speak(el.dataset.w.replace(/[.,!?]+$/, ''), { rate: 0.8, who: cur().who }); },
  pick(el) {
    ses.built.push(+el.dataset.i);
    if (ses.built.length === ses.chips.length) checkOrder(cur());
    render();
  },
  unpick(el) { ses.built.splice(+el.dataset.i, 1); render(); },
  check() { if (norm(ses.typed).length) { checkDict(cur()); render(); } },
  grade(el) {
    const r = +el.dataset.r, it = cur();
    record(it.id, r);
    ses.res[r]++;
    ses.auto = false;
    if (r === 0 && !ses.requeued.has(it.id)) { ses.requeued.add(it.id); ses.items.push(it); }
    goto(ses.pos + 1);
  },
  prev() { ses.auto = false; goto(Math.max(0, ses.pos - 1)); },
  skip() { ses.auto = false; goto(ses.pos + 1); },
  hideText() { S.hideText = !S.hideText; if (S.hideText) ses.shown = false; save(); render(); },
  hideKo() { S.hideKo = !S.hideKo; if (S.hideKo) ses.koShown = false; save(); render(); },
};

document.addEventListener('click', e => {
  const el = e.target.closest('[data-a]');
  if (!el) return;
  ACT[el.dataset.a](el);
  if (document.activeElement instanceof HTMLButtonElement) document.activeElement.blur();
});
document.addEventListener('input', e => { if (e.target.id === 'dict') ses.typed = e.target.value; });
document.addEventListener('change', e => {
  const c = e.target.dataset.c;
  if (c === 'voice') { S.voice = e.target.value; plainVoice = false; save(); speak("Hello! Let's get started.", { rate: 0.9 }); }
  if (c === 'goal') { S.goal = +e.target.value; save(); render(); }
});
document.addEventListener('keydown', e => {
  if (view !== 'session' || !ses || e.metaKey || e.ctrlKey || e.altKey) return;
  if (e.target.tagName === 'INPUT') { if (e.key === 'Enter') ACT.check(); return; }
  if (e.key === 'Escape') return ACT.home();
  if (!cur()) return;
  const map = {
    ' ': () => ACT.play(), Enter: reveal, t: () => ACT.ko(), T: () => ACT.ko(),
    ArrowLeft: () => ACT.prev(), ArrowRight: () => ACT.skip(),
    1: () => ACT.grade({ dataset: { r: 0 } }), 2: () => ACT.grade({ dataset: { r: 1 } }), 3: () => ACT.grade({ dataset: { r: 2 } }),
  };
  if (map[e.key]) { e.preventDefault(); map[e.key](); }
});

if (synth) {
  loadVoices();
  synth.addEventListener?.('voiceschanged', () => { loadVoices(); if (view === 'home') render(); });
}
window.addEventListener('pagehide', stop);
if (window.EH) { EH.apply(); EH.onSystemChange(EH.apply); }
render();
})();
