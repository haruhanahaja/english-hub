/* 문법의 숲 — 화면(UI) */
(function () {
  "use strict";

  const C = window.Core;
  const app = document.getElementById("app");

  /* ---------- 저장소 ---------- */
  function safeStorage() {
    try {
      localStorage.setItem("__gf_test", "1");
      localStorage.removeItem("__gf_test");
      return localStorage;
    } catch (e) {
      const mem = {};
      return { getItem: (k) => (k in mem ? mem[k] : null), setItem: (k, v) => { mem[k] = v; } };
    }
  }
  C.init(safeStorage());
  const st = () => C.state;

  /* ---------- 유틸 ---------- */
  const ESC = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ESC[c]);
  const fmt = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br>");
  const hl = (s) => esc(s).replace(/\{(.+?)\}/g, "<mark>$1</mark>");
  const plain = (s) => s.replace(/[{}()✕○]/g, "").replace(/\s+/g, " ").trim();
  const pct = (n) => Math.round(n * 100);
  const num = (n) => n.toLocaleString("ko-KR");

  /* English Hub: 테마는 통합 홈 · 세 파트가 같이 쓴다. 허브에 저장된 값이 있으면 그것을 따른다. */
  const EH = window.EH;
  function syncTheme() {
    if (!EH) return;
    if (EH.stored()) { if (st().settings.theme !== EH.mode()) { st().settings.theme = EH.mode(); C.save(); } }
    else EH.setMode(st().settings.theme);
  }
  function applyTheme() {
    const t = st().settings.theme;
    if (t === "auto") delete document.documentElement.dataset.theme;
    else document.documentElement.dataset.theme = t;
  }

  /* ---------- 소리 ---------- */
  let actx = null;
  function tone(freq, at, dur, type, vol) {
    const o = actx.createOscillator();
    const gain = actx.createGain();
    const t = actx.currentTime + at;
    o.type = type || "sine";
    o.frequency.value = freq;
    gain.gain.setValueAtTime(vol || 0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.connect(gain);
    gain.connect(actx.destination);
    o.start(t);
    o.stop(t + dur + 0.02);
  }
  function sfx(name) {
    if (!st().settings.sound) return;
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      if (actx.state === "suspended") actx.resume();
      if (name === "ok") { tone(660, 0, 0.12); tone(990, 0.1, 0.22); }
      else if (name === "no") { tone(220, 0, 0.18, "triangle", 0.14); tone(165, 0.13, 0.26, "triangle", 0.14); }
      else if (name === "done") { [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.12, 0.3)); }
      else if (name === "tap") { tone(520, 0, 0.04, "sine", 0.05); }
    } catch (e) { /* 오디오 미지원 */ }
  }

  let voice = null;
  function pickVoice() {
    if (!window.speechSynthesis) return;
    const vs = speechSynthesis.getVoices().filter((v) => /^en[-_]US/i.test(v.lang));
    voice = vs.find((v) => /Samantha|Google US English|Ava|Allison/i.test(v.name)) || vs[0] || null;
  }
  if (window.speechSynthesis) {
    pickVoice();
    speechSynthesis.onvoiceschanged = pickVoice;
  }
  function speak(text) {
    if (!window.speechSynthesis) { toast("이 브라우저는 음성 읽기를 지원하지 않아요"); return; }
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(plain(text));
    u.lang = "en-US";
    u.rate = 0.92;
    if (voice) u.voice = voice;
    speechSynthesis.speak(u);
  }

  /* ---------- 공통 조각 ---------- */
  const SPK = '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M4 9.5h3.2L12 5.6v12.8l-4.8-3.9H4a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1z"/><path d="M15 8.6a4.6 4.6 0 0 1 0 6.8M17.6 6a8.2 8.2 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>';
  const ICONS = {
    flame: '<path d="M12 3c.6 3.3 5 5.2 5 10a5 5 0 0 1-10 0c0-2 .9-3.6 2-4.6.3 1.5 1 2.3 1.9 2.7C10.5 8.3 10.8 5.2 12 3z"/>',
    xp: '<path d="M6.5 4.5h11l3.5 4.7L12 20 3 9.2z"/><path d="M3 9.2h18M9.5 4.5L8 9.2 12 20l4-10.8-1.5-4.7"/>',
    star: '<path d="M12 3.8l2.5 5.100 5.600.8-4 4 1 5.600-5.100-2.700-5 2.700.9-5.600-4-4 5.600-.8z"/>',
    lock: '<rect x="5.5" y="10.5" width="13" height="9.5" rx="2.5" fill="currentColor" stroke="none"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/>',
    check: '<path stroke-width="2.8" d="M5.5 12.5l4.3 4.3L18.5 7.6"/>',
    close: '<path stroke-width="2.4" d="M6.5 6.5l11 11M17.5 6.5l-11 11"/>',
    chev: '<path stroke-width="2.4" d="M9.5 6.5L15 12l-5.5 5.5"/>',
    search: '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>',
    bulb: '<path d="M9.5 18.5h5M10.5 21.5h3M12 3a6 6 0 0 0-3.7 10.7c.7.6 1.1 1.4 1.2 2.3h5c.1-.9.5-1.7 1.2-2.3A6 6 0 0 0 12 3z"/>',
    target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.3"/><circle cx="12" cy="12" r="1" fill="currentColor"/>',
    book: '<path d="M5 6.5a3 3 0 0 1 3-3h11v13H8a3 3 0 0 0-3 3z"/><path d="M5 19.5a3 3 0 0 0 3 3h11v-6"/>',
    pencil: '<path d="M4 20l1.2-4.4L16.6 4.2a2.2 2.2 0 0 1 3.2 3.2L8.4 18.8z"/><path d="M14.5 6.5l3 3"/>',
    bolt: '<path fill="currentColor" stroke-width="1.4" d="M13.2 2.8L5.5 13.4h5.2l-1 7.8 7.8-10.7h-5.3z"/>',
    spark: '<path fill="currentColor" stroke-width="1.4" d="M11 4.5l1.7 4.6 4.6 1.7-4.6 1.7L11 17.1l-1.7-4.6-4.6-1.7 4.6-1.7z"/><path d="M18.5 15.5v4M16.5 17.5h4"/>',
    sprout: '<path d="M12 21v-8.5"/><path d="M12 13.5c0-4-2.8-6.2-7.5-6.2 0 4.2 2.8 6.2 7.5 6.2z"/><path d="M12 11c0-3.8 2.6-6.5 7.5-6.5 0 4.6-2.8 6.5-7.5 6.5z"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    swap: '<path d="M4 8h14M14.5 4.5L18 8l-3.5 3.5M20 16H6M9.5 12.5L6 16l3.5 3.5"/>',
    link: '<path d="M10.2 13.8a4 4 0 0 0 5.6 0l3-3a4 4 0 0 0-5.6-5.6l-1.2 1.2"/><path d="M13.8 10.2a4 4 0 0 0-5.6 0l-3 3a4 4 0 0 0 5.6 5.6l1.2-1.2"/>',
    peak: '<path d="M2.5 19.5l6.2-10 3.4 5.4 2.4-3.6 7 8.2z"/><path d="M8.7 9.5V4.5l3.5 1.4-3.5 1.4"/>'
  };
  const ic = (name, size, cls) => '<svg class="ic' + (cls ? " " + cls : "") + '" viewBox="0 0 24 24" width="' + (size || 18) + '" height="' + (size || 18)
    + '" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICONS[name] + "</svg>";
  const chNo = (i) => String(i + 1).padStart(2, "0");
  const BADGE_IC = { first: "sprout", perfect: "check", combo10: "bolt", streak3: "flame", streak7: "flame", streak30: "flame", correct100: "target", xp1000: "xp", review: "book", stars: "star" };
  const badgeIc = (b, size) => ic(BADGE_IC[b.id] || "peak", size);
  const RING = 2 * Math.PI * 54;
  const ring = (p) => '<svg class="ring" viewBox="0 0 120 120" aria-hidden="true"><circle class="ring-bg" cx="60" cy="60" r="54"/><circle class="ring-fg" cx="60" cy="60" r="54" stroke-dasharray="'
    + RING.toFixed(1) + '" stroke-dashoffset="' + (RING * (1 - Math.max(0, Math.min(1, p)))).toFixed(1) + '"/></svg>';
  const ICONS_SPROUT = '<path d="M12 21v-8.5"/><path d="M12 13.5c0-4-2.8-6.2-7.5-6.2 0 4.2 2.8 6.2 7.5 6.2z"/><path d="M12 11c0-3.8 2.6-6.5 7.5-6.5 0 4.6-2.8 6.5-7.5 6.5z"/>';
  const LOGO = (size) => '<span class="logo" style="--s:' + size + 'px">' + ic("sprout", Math.round(size * 0.56)) + "</span>";
  const starsHTML = (n) => '<span class="stars" aria-label="별 ' + n + '개">' + [1, 2, 3].map((i) => '<i class="' + (i <= n ? "on" : "") + '">★</i>').join("") + "</span>";

  let toastTimer = null;
  function toast(msg) {
    let el = document.querySelector(".toast");
    if (!el) {
      el = document.createElement("div");
      el.className = "toast";
      el.setAttribute("role", "status");
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2200);
  }

  function modal(html) {
    closeModal();
    const m = document.createElement("div");
    m.className = "modal";
    m.innerHTML = '<div class="modal-card" role="dialog" aria-modal="true">' + html + "</div>";
    document.body.appendChild(m);
    const f = m.querySelector("input, .btn");
    if (f) f.focus();
  }
  function closeModal() {
    const m = document.querySelector(".modal");
    if (m) m.remove();
  }

  /* ---------- 라우팅 ---------- */
  let S = null;   // 진행 중인 학습 세션
  let R = null;   // 마지막 결과
  let U = { id: null, i: 0 };  // 개념 카드 위치
  let W = { goal: 120 };       // 온보딩 선택값
  let bookQuery = "";
  let lastKey = "";

  function parse() {
    const h = (location.hash || "#home").slice(1);
    const parts = h.split("/");
    return { name: parts[0] || "home", arg: parts[1] || "" };
  }
  function go(hash) {
    if (location.hash === "#" + hash) render();
    else location.hash = hash;
  }

  const NAV = [
    { id: "home", label: "학습", icon: '<path d="M3 11.2 12 3l9 8.2V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>' },
    { id: "review", label: "복습", icon: '<path d="M12 4a8 8 0 0 1 6.9 4H16v2h6V4h-2v2.3A10 10 0 0 0 2 12h2a8 8 0 0 1 8-8zm8 8a8 8 0 0 1-14.9 4H8v-2H2v6h2v-2.3A10 10 0 0 0 22 12z"/>' },
    { id: "book", label: "문법 사전", icon: '<path d="M6 2h12a2 2 0 0 1 2 2v18H7a3 3 0 0 1-3-3V4a2 2 0 0 1 2-2zm1 16a1 1 0 0 0 0 2h11v-2zm2-11v2h7V7z"/>' },
    { id: "me", label: "내 기록", icon: '<circle cx="12" cy="8" r="4.2"/><path d="M3.5 21a8.5 8.5 0 0 1 17 0z"/>' }
  ];

  function navHTML(active) {
    const due = C.dueCount();
    return '<nav class="nav" aria-label="주 메뉴"><div class="nav-brand">' + LOGO(32) + "<span>문법의 숲</span></div>"
      + '<a class="nav-hub" href="../">' + (EH ? EH.ICON : "") + "<span>English Hub</span></a>"
      + NAV.map((n) => '<a class="nav-item' + (n.id === active ? " on" : "") + '" href="#' + n.id + '"' + (n.id === active ? ' aria-current="page"' : "") + ">"
        + '<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">' + n.icon + "</svg><span>" + n.label + "</span>"
        + (n.id === "review" && due ? '<b class="dot">' + due + "</b>" : "") + "</a>").join("")
      + "</nav>";
  }

  function view(html, opts) {
    opts = opts || {};
    const r = parse();
    const key = r.name + "/" + r.arg;
    app.className = "app" + (opts.nav ? " with-nav" : "") + (opts.cls ? " " + opts.cls : "");
    app.innerHTML = (opts.nav ? navHTML(r.name) : "") + '<main class="main' + (key !== lastKey ? " enter" : "") + '">' + html + "</main>";
    if (key !== lastKey) window.scrollTo(0, 0);
    lastKey = key;
  }

  function render() {
    closeModal();
    syncTheme();
    applyTheme();
    if (EH) {   // 통합 홈이 보여 줄 요약
      const all = C.units(), nx = C.nextUnit(), dn = all.filter((e) => st().units[e.unit.id] && st().units[e.unit.id].done).length;
      EH.summary("grammar", { next: !st().profile.name ? "" : nx ? (nx.index + 1) + "단원 · " + nx.unit.title : "모든 단원을 마쳤어요", done: dn, total: all.length });
    }
    if (!st().profile.name) { lastKey = "welcome"; return renderWelcome(); }
    const r = parse();
    switch (r.name) {
      case "unit": return renderUnit(r.arg);
      case "play": return S ? renderPlay() : go("home");
      case "result": return R ? renderResult() : go("home");
      case "review": return renderReview();
      case "book": return renderBook();
      case "me": return renderMe();
      default: return renderHome();
    }
  }

  /* ---------- 온보딩 ---------- */
  const GOALS = [
    { v: 50, name: "가볍게", desc: "하루 5분" },
    { v: 120, name: "꾸준히", desc: "하루 한 단원" },
    { v: 250, name: "열심히", desc: "하루 두 단원" }
  ];
  const goalButtons = (cur, act) => '<div class="seg goal-seg">' + GOALS.map((g) =>
    '<button class="seg-btn' + (g.v === cur ? " on" : "") + '" data-act="' + act + '" data-v="' + g.v + '"><b>' + g.name + "</b><small>" + g.desc + '</small><small class="seg-xp">' + ic("xp", 13) + g.v + "</small></button>").join("") + "</div>";

  function renderWelcome() {
    const keep = document.getElementById("w-name");
    const name = keep ? keep.value : "";
    app.className = "app";
    app.innerHTML = '<main class="main welcome enter">' + LOGO(56)
      + '<p class="wordmark">문법의 숲</p><h1>영어 문법,<br>기초부터 다시 탄탄하게</h1>'
      + '<p class="lead">하루 10분. 짧은 개념 설명과 문제 풀이로<br>문법의 뼈대를 차근차근 세웁니다.</p>'
      + '<ul class="feats"><li><b>24</b>단원</li><li><b>240</b>문제</li><li><b>5</b>가지 문제 유형</li></ul>'
      + '<label class="field"><span>이름</span><input id="w-name" type="text" maxlength="12" placeholder="이름 또는 닉네임" autocomplete="off" value="' + esc(name) + '"></label>'
      + '<div class="field"><span>하루 목표</span>' + goalButtons(W.goal, "w-goal") + "</div>"
      + '<button class="btn big" data-act="w-start">시작하기</button>'
      + '<p class="fine">학습 기록은 이 기기의 브라우저에만 저장돼요.</p></main>';
  }

  /* ---------- 홈 ---------- */
  function greeting() {
    const h = new Date().getHours();
    return h < 5 ? "늦은 밤이네요" : h < 12 ? "좋은 아침이에요" : h < 18 ? "좋은 오후예요" : "좋은 저녁이에요";
  }

  function renderHome() {
    const s = st();
    const streak = C.streak();
    const tx = C.todayXp();
    const goal = s.profile.goal;
    const next = C.nextUnit();
    const due = C.dueCount();
    const done = tx >= goal;
    const sub = done ? "오늘 목표를 달성했어요. 수고하셨습니다."
      : streak > 0 ? streak + "일째 꾸준히 학습하고 있어요."
        : "오늘 10분, 한 단원부터 시작해 보세요.";

    let cta;
    if (next && C.isUnlocked(next.unit.id)) {
      cta = '<button class="btn accent big" data-act="unit" data-id="' + next.unit.id + '">' + (s.units[C.units()[0].unit.id] ? "이어서 학습" : "학습 시작") + " · " + esc(next.unit.title) + "</button>";
    } else {
      cta = '<button class="btn accent big" data-act="practice">랜덤 연습 10문제</button>';
    }
    if (due) cta += '<button class="btn light" data-act="review">복습 ' + due + "문제 풀기</button>";

    let html = '<header class="topbar"><div class="brand-row"><a class="hub-btn" href="../" aria-label="English Hub 홈">' + (EH ? EH.ICON : "") + '</a><h1 class="brand"><svg class="brand-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICONS_SPROUT + '</svg>문법의 숲</h1></div><div class="chips">'
      + '<span class="chip" title="연속 학습일">' + ic("flame", 17) + streak + '</span><span class="chip" title="누적 XP">' + ic("xp", 17) + num(s.xp) + "</span></div></header>"
      + '<section class="hero"><div class="hero-text"><p class="hello">' + greeting() + ", " + esc(s.profile.name) + "님</p><p class=\"hero-sub\">" + sub + "</p>"
      + '<p class="goal"><b>' + tx + "</b> / " + goal + " XP<span>오늘의 목표</span></p></div>"
      + '<div class="hero-ring">' + ring(tx / goal) + "<span><b>" + Math.min(100, pct(tx / goal)) + "</b>%</span></div>"
      + '<div class="hero-cta">' + cta + "</div></section>";

    const firstOpen = next ? next.unit.id : null;
    (window.CURRICULUM || []).forEach((ch, ci) => {
      const cleared = ch.units.filter((u) => s.units[u.id] && s.units[u.id].done).length;
      html += '<section class="chapter"><div class="ch-head"><span class="ch-emoji">' + chNo(ci) + "</span><div><h2>" + esc(ch.title)
        + '</h2><p>' + esc(ch.sub) + '</p></div><span class="ch-count"><span><b>' + cleared + "</b> / " + ch.units.length + '</span><i style="--p:' + pct(cleared / ch.units.length) + '%"></i></span></div><ol class="units">';
      ch.units.forEach((u) => {
        const rec = s.units[u.id];
        const open = C.isUnlocked(u.id);
        const state = rec && rec.done ? "done" : !open ? "locked" : u.id === firstOpen ? "current" : "open";
        const n = C.entry(u.id).index + 1;
        html += '<li><button class="unit ' + state + '" data-act="unit" data-id="' + u.id + '"' + (state === "locked" ? ' aria-disabled="true"' : "") + ">"
          + '<span class="node">' + (state === "done" ? ic("check", 20) : state === "locked" ? ic("lock", 18) : n) + "</span>"
          + '<span class="unit-text"><b>' + esc(u.title) + "</b><small>" + esc(u.sub) + "</small></span>"
          + '<span class="unit-side">' + (state === "done" ? starsHTML(rec.stars) : state === "current" ? '<em class="go">시작' + ic("chev", 14) + "</em>" : state === "open" ? ic("chev", 18) : "") + "</span></button></li>";
      });
      html += "</ol></section>";
    });
    view(html, { nav: true });
  }

  /* ---------- 개념 카드 ---------- */
  function cardHTML(c) {
    let h = "<h3>" + esc(c.h) + "</h3><p>" + fmt(c.b) + "</p>";
    if (c.rows) h += '<table class="mini"><tbody>' + c.rows.map((r) => "<tr><th>" + esc(r[0]) + "</th><td>" + esc(r[1]) + "</td></tr>").join("") + "</tbody></table>";
    if (c.ex) {
      h += '<ul class="ex">' + c.ex.map((e) => '<li><button class="spk" data-act="speak" data-t="' + esc(plain(e[0])) + '" aria-label="발음 듣기">' + SPK + '</button><div><div class="en">'
        + hl(e[0]) + '</div><div class="ko">' + esc(e[1]) + "</div></div></li>").join("") + "</ul>";
    }
    if (c.tip) h += '<div class="tip">' + ic("bulb", 18) + "<p>" + esc(c.tip) + "</p></div>";
    return h;
  }

  function renderUnit(id) {
    const e = C.entry(id);
    if (!e || !C.isUnlocked(id)) { toast("앞 단원을 먼저 완료해 주세요"); return go("home"); }
    if (U.id !== id) U = { id, i: 0 };
    const u = e.unit;
    const last = U.i === u.cards.length - 1;
    const html = '<header class="lesson-top"><a class="icon-btn" href="#home" aria-label="닫기">' + ic("close", 20) + '</a><div class="dots">'
      + u.cards.map((_, i) => '<i class="' + (i === U.i ? "on" : i < U.i ? "past" : "") + '"></i>').join("")
      + '</div><button class="link" data-act="start" data-id="' + id + '">바로 풀기</button></header>'
      + '<p class="eyebrow">' + esc(e.chapter.title) + " · " + esc(u.title) + "</p>"
      + '<article class="card concept" data-k="' + U.i + '">' + cardHTML(u.cards[U.i]) + "</article>"
      + '<footer class="lesson-foot">'
      + (U.i > 0 ? '<button class="btn light" data-act="card-prev">이전</button>' : "")
      + (last ? '<button class="btn accent grow" data-act="start" data-id="' + id + '">문제 풀기</button>'
        : '<button class="btn grow" data-act="card-next">다음</button>')
      + "</footer>";
    view(html, { cls: "focus" });
    const card = app.querySelector(".concept");
    if (card) card.classList.add("slide");
  }

  /* ---------- 학습 세션 ---------- */
  const KIND = {
    mcq: "빈칸에 알맞은 말을 고르세요",
    ox: "이 문장, 문법적으로 맞을까요?",
    fix: "틀린 단어 하나를 찾아 누르세요",
    type: "빈칸에 알맞은 말을 입력하세요",
    order: "우리말에 맞게 단어를 배열하세요"
  };
  const PRAISE = ["정답이에요", "정확해요", "잘하셨어요", "맞았어요"];

  function start(mode, unitId, all) {
    const queue = mode === "lesson" ? C.buildLesson(unitId) : mode === "review" ? C.buildReview(all) : C.buildPractice();
    if (!queue.length) { toast("풀 문제가 없어요"); return; }
    S = { mode, unitId: unitId || null, queue, i: 0, total: queue.length, seen: {}, correctFirst: 0, combo: 0, max: 0, xp: 0, cleared: 0, phase: "ans", ans: null, ok: false, gain: 0, fresh: true, praise: "" };
    resetAns();
    go("play");
  }
  function resetAns() {
    const t = S.queue[S.i].q.t;
    S.ans = t === "order" ? [] : t === "type" ? "" : null;
    S.phase = "ans";
    S.fresh = true;
  }
  function canCheck() {
    if (!S || S.phase !== "ans") return false;
    const t = S.queue[S.i].q.t;
    if (t === "order") return S.ans.length > 0;
    if (t === "type") return S.ans.trim().length > 0;
    return S.ans !== null;
  }

  function check() {
    if (!canCheck()) return;
    const it = S.queue[S.i];
    const ok = C.grade(it, S.ans);
    const first = !S.seen[it.qid];
    S.seen[it.qid] = true;
    C.record(it.qid, ok, first);
    S.gain = 0;
    if (ok) {
      S.combo++;
      S.max = Math.max(S.max, S.combo);
      if (first) S.correctFirst++;
      S.gain = (first ? 10 : 4) + (S.combo >= 5 ? 3 : S.combo >= 3 ? 1 : 0);
      S.xp += S.gain;
      S.cleared++;
      S.praise = S.combo >= 3 ? S.combo + "문제 연속 정답" : PRAISE[Math.floor(Math.random() * PRAISE.length)];
    } else {
      S.combo = 0;
      if (it.tries < 1) {
        const again = C.prepare(it.q, it.qid);
        again.tries = it.tries + 1;
        S.queue.push(again);
      } else {
        S.cleared++;
      }
    }
    S.ok = ok;
    S.phase = "fb";
    sfx(ok ? "ok" : "no");
    if (st().settings.autoSpeak) speak(C.sentence(it.q));
    renderPlay();
  }

  function next() {
    if (!S || S.phase !== "fb") return;
    if (S.i + 1 >= S.queue.length) {
      R = C.finish({ mode: S.mode, unitId: S.unitId, total: S.total, correctFirst: S.correctFirst, maxCombo: S.max, xp: S.xp });
      S = null;
      sfx("done");
      return go("result");
    }
    S.i++;
    resetAns();
    renderPlay();
  }

  function qBody(it, fb) {
    const q = it.q;
    const dis = fb ? " disabled" : "";
    const ko = q.ko && q.t !== "order" ? '<p class="q-ko">' + esc(q.ko) + "</p>" : "";
    if (q.t === "mcq") {
      const sent = esc(q.q).replace("___", fb ? '<span class="blank filled">' + esc(q.o[0]) + "</span>" : '<span class="blank"></span>');
      return '<p class="q-sent">' + sent + "</p>" + ko + '<div class="opts">' + it.opts.map((o, i) => {
        const cls = fb ? (o === q.o[0] ? " right" : S.ans === i ? " wrong" : " dim") : S.ans === i ? " sel" : "";
        return '<button class="opt' + cls + '" data-act="pick" data-i="' + i + '"' + dis + "><kbd>" + (i + 1) + "</kbd><span>" + esc(o) + "</span></button>";
      }).join("") + "</div>";
    }
    if (q.t === "ox") {
      const btn = (v, label, word, key) => {
        const cls = fb ? (q.a === v ? " right" : S.ans === v ? " wrong" : " dim") : S.ans === v ? " sel" : "";
        return '<button class="opt ox' + cls + '" data-act="pickox" data-v="' + (v ? 1 : 0) + '"' + dis + "><kbd>" + key + '</kbd><span class="ox-mark">' + label + "</span><span>" + word + "</span></button>";
      };
      return '<p class="q-sent">' + esc(q.q) + "</p>" + ko + '<div class="opts two">' + btn(true, "O", "맞아요", 1) + btn(false, "X", "틀려요", 2) + "</div>";
    }
    if (q.t === "fix") {
      const toks = it.tokens.map((t, i) => {
        if (fb && i === it.wrongIdx) {
          return '<span class="tok strike">' + esc(q.w) + "</span>" + (q.r ? '<span class="tok new">' + esc(t.replace(q.w, q.r)) + "</span>" : esc(t.replace(q.w, "")));
        }
        const cls = fb ? (S.ans === i ? " wrong" : "") : S.ans === i ? " sel" : "";
        return '<button class="tok' + cls + '" data-act="picktok" data-i="' + i + '"' + dis + ">" + esc(t) + "</button>";
      }).join(" ");
      return '<p class="q-sent toks">' + toks + "</p>" + ko;
    }
    if (q.t === "type") {
      const field = fb ? '<span class="blank filled">' + esc(q.a[0]) + "</span>"
        : '<input id="q-input" class="blank-input" type="text" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" aria-label="정답 입력" value="' + esc(S.ans) + '">';
      return '<p class="q-sent">' + esc(q.q).replace("___", field) + "</p>" + ko;
    }
    // order
    const chosen = S.ans.map((id) => it.tiles.find((t) => t.id === id));
    return '<p class="q-sent ko-big">' + esc(q.ko) + "</p>"
      + '<div class="answer-line' + (fb ? (S.ok ? " right" : " wrong") : "") + '">' + (chosen.length ? chosen.map((t) =>
        '<button class="tile" data-act="untile" data-id="' + t.id + '"' + dis + ">" + esc(t.w) + "</button>").join("") : '<span class="placeholder">아래 단어를 순서대로 눌러 주세요</span>') + "</div>"
      + '<div class="bank">' + it.tiles.map((t) => S.ans.indexOf(t.id) >= 0
        ? '<span class="tile ghost">' + esc(t.w) + "</span>"
        : '<button class="tile" data-act="tile" data-id="' + t.id + '"' + dis + ">" + esc(t.w) + "</button>").join("") + "</div>";
  }

  function renderPlay() {
    const it = S.queue[S.i];
    const q = it.q;
    const fb = S.phase === "fb";
    const info = C.question(it.qid);
    let foot;
    if (!fb) {
      foot = '<div class="play-foot"><button class="btn big" data-act="check"' + (canCheck() ? "" : " disabled") + ">확인</button></div>";
    } else {
      const sent = C.sentence(q);
      foot = '<div class="play-foot fb ' + (S.ok ? "ok" : "no") + '" role="status"><div class="fb-in">'
        + '<div class="fb-head">' + (S.ok ? "<span>" + ic("check", 18) + "</span> " + S.praise + " <em>" + ic("xp", 16) + "+" + S.gain + "</em>" : "<span>" + ic("close", 18) + "</span> 오답이에요. 해설을 확인해 보세요") + "</div>"
        + (S.ok ? "" : '<p class="fb-ans"><b>정답</b> ' + esc(C.answerText(q)) + "</p>")
        + '<p class="fb-ex">' + esc(q.ex) + "</p>"
        + '<div class="fb-sent"><button class="spk" data-act="speak" data-t="' + esc(sent) + '" aria-label="발음 듣기">' + SPK + '</button><div><div class="en">' + esc(sent) + '</div><div class="ko">' + esc(q.ko || "") + "</div></div></div>"
        + (!S.ok && it.tries < 1 ? '<p class="fb-note">이 문제는 마지막에 한 번 더 나와요.</p>' : "")
        + '<button class="btn big ' + (S.ok ? "" : "danger") + '" data-act="next">계속</button></div></div>';
    }
    const chip = it.tries > 0 ? '<span class="tag retry">다시 도전</span>' : S.mode !== "lesson" && info ? '<span class="tag">' + esc(info.unit.title) + "</span>" : "";
    const html = '<header class="play-top"><button class="icon-btn" data-act="quit" aria-label="그만하기">' + ic("close", 20) + "</button>"
      + '<div class="pbar" role="progressbar" aria-valuemin="0" aria-valuemax="' + S.total + '" aria-valuenow="' + S.cleared + '"><i style="width:' + pct(S.cleared / S.total) + '%"></i></div>'
      + '<span class="combo' + (S.combo >= 2 ? " on" : "") + '">' + ic("flame", 18) + S.combo + "</span></header>"
      + '<section class="q' + (S.fresh ? " slide" : "") + '"><div class="q-kind">' + KIND[q.t] + chip + "</div>" + qBody(it, fb) + "</section>" + foot;
    const wasFresh = S.fresh;
    S.fresh = false;
    view(html, { cls: "focus playing" });
    if (wasFresh) window.scrollTo(0, 0);
    const input = document.getElementById("q-input");
    if (input) {
      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);
    } else if (fb) {
      const b = app.querySelector('[data-act="next"]');
      if (b) b.focus({ preventScroll: true });
    }
  }

  /* ---------- 결과 ---------- */
  function renderResult() {
    const r = R;
    const title = r.mode === "lesson" ? "단원 완료" : r.mode === "review" ? "복습 완료" : "연습 완료";
    const msg = r.perfect ? "한 문제도 틀리지 않았어요." : r.acc >= 0.9 ? "거의 다 맞혔어요. 틀린 문제만 다시 확인해 보세요." : r.acc >= 0.7 ? "좋아요. 틀린 부분만 다듬으면 충분해요." : "괜찮아요. 개념 카드를 다시 읽고 한 번 더 풀어 보세요.";
    const wrong = r.total - r.correctFirst;
    let extra = "";
    if (r.leveledUp) extra += '<div class="banner lv">' + ic("spark", 18) + ' 레벨 업 <b>Lv.' + r.leveledUp.n + " " + esc(r.leveledUp.title) + "</b></div>";
    if (r.goalReached) extra += '<div class="banner">' + ic("target", 18) + ' 오늘의 목표 달성 <b>' + r.streak + "일 연속 학습</b></div>";
    r.newBadges.forEach((b) => { extra += '<div class="banner badge-new"><span>' + badgeIc(b, 22) + "</span><div><b>새 배지 · " + esc(b.name) + "</b><small>" + esc(b.desc) + "</small></div></div>"; });
    if (wrong) extra += '<p class="note">틀린 ' + wrong + "문제는 오답 노트에 담았어요. 내일 복습에 다시 나와요.</p>";

    let btns = "";
    if (r.mode === "lesson") {
      const e = C.entry(r.unitId);
      const nx = C.units()[e.index + 1];
      if (nx) btns += '<button class="btn accent big" data-act="unit" data-id="' + nx.unit.id + '">다음 단원 · ' + esc(nx.unit.title) + "</button>";
      else btns += '<button class="btn accent big" data-act="home">모든 단원 완료 · 홈으로</button>';
      btns += '<div class="row"><button class="btn light grow" data-act="start" data-id="' + r.unitId + '">다시 풀기</button><button class="btn light grow" data-act="home">홈으로</button></div>';
    } else {
      btns += '<button class="btn accent big" data-act="home">홈으로</button><button class="btn light" data-act="practice">랜덤 연습 한 번 더</button>';
    }

    const html = '<div class="result-in"><div class="score">' + ring(r.acc) + "<span><b>" + pct(r.acc) + "</b>%</span></div>"
      + "<h1>" + title + "</h1>" + (r.mode === "lesson" ? '<div class="big-stars">' + starsHTML(r.stars) + "</div>" : "")
      + '<p class="lead">' + msg + "</p>"
      + '<div class="stat-row"><div class="stat"><b>' + r.correctFirst + "<small> / " + r.total + '</small></b><span>정답</span></div><div class="stat hot"><b>+' + r.gained + '</b><span>XP</span></div><div class="stat"><b>' + r.maxCombo + "</b><span>최고 콤보</span></div></div>"
      + extra + '<div class="result-btns">' + btns + "</div></div>";
    view(html, { cls: "focus result" });
  }

  /* ---------- 복습 ---------- */
  function renderReview() {
    const list = C.srsList();
    const due = C.dueCount();
    const t = Object.keys(st().units).length;
    let html = '<header class="topbar"><h1 class="brand">복습</h1></header>'
      + '<section class="card review-main"><div><p class="eyebrow">오늘의 복습</p><p class="bignum">' + due + "<small>문제</small></p><p class=\"muted\">"
      + (due ? "틀렸던 문제를 잊기 직전에 다시 풀어 보세요." : list.length ? "오늘 복습할 문제는 없어요." : "아직 오답이 없어요.") + "</p></div>"
      + '<button class="btn big"' + (due ? "" : " disabled") + ' data-act="review">복습 시작</button></section>'
      + '<section class="card row-card"><div><b>랜덤 연습</b><p class="muted">' + (t ? "완료한 단원에서 10문제를 뽑아요." : "첫 단원에서 10문제를 뽑아요.") + '</p></div><button class="btn light" data-act="practice">연습하기</button></section>'
      + '<section><div class="sec-head"><h2>오답 노트 <small>' + list.length + '</small></h2>' + (list.length ? '<button class="link" data-act="review-all">전체 다시 풀기</button>' : "") + "</div>";
    if (!list.length) {
      html += '<p class="empty">틀린 문제가 여기에 모여요.<br>네 번 연속으로 맞히면 노트에서 빠져요.</p>';
    } else {
      html += '<ul class="notes">' + list.map((n) => {
        const info = C.question(n.qid);
        const sent = C.sentence(info.q);
        return '<li class="note-item"><button class="spk" data-act="speak" data-t="' + esc(sent) + '" aria-label="발음 듣기">' + SPK + '</button><div class="note-body"><div class="en">' + esc(sent)
          + '</div><div class="ko">' + esc(info.q.ko || "") + '</div><div class="note-meta"><span class="tag">' + esc(info.unit.title) + '</span><span class="boxes" title="복습 단계">'
          + C.INTERVALS.map((_, i) => '<i class="' + (i < n.box ? "on" : "") + '"></i>').join("") + "</span><span>" + dueLabel(n.due) + "</span></div></div></li>";
      }).join("") + "</ul>";
    }
    html += "</section>";
    view(html, { nav: true });
  }
  function dueLabel(due) {
    const d = due - C.today();
    return d <= 0 ? "오늘 복습" : d === 1 ? "내일 복습" : d + "일 뒤 복습";
  }

  /* ---------- 문법 사전 ---------- */
  function bookListHTML() {
    const qy = bookQuery.trim().toLowerCase();
    let html = "";
    let hits = 0;
    (window.CURRICULUM || []).forEach((ch, ci) => {
      const us = ch.units.filter((u) => !qy || JSON.stringify([u.title, u.sub, u.cards]).toLowerCase().indexOf(qy) >= 0);
      if (!us.length) return;
      hits += us.length;
      html += '<h2 class="book-ch"><span>' + chNo(ci) + "</span>" + esc(ch.title) + "</h2>" + us.map((u) =>
        '<details class="book-unit"' + (qy ? " open" : "") + "><summary><b>" + esc(u.title) + "</b><small>" + esc(u.sub) + "</small></summary>"
        + u.cards.map((c) => '<div class="book-card">' + cardHTML(c) + "</div>").join("")
        + '<button class="btn light" data-act="unit" data-id="' + u.id + '">이 단원 학습하기</button></details>').join("");
    });
    return hits ? html : '<p class="empty">"' + esc(bookQuery) + '"에 대한 내용을 찾지 못했어요.</p>';
  }
  function renderBook() {
    view('<header class="topbar"><h1 class="brand">문법 사전</h1></header>'
      + '<label class="search">' + ic("search", 20) + '<input id="book-q" type="search" placeholder="찾고 싶은 문법 검색 (예: 현재완료, since)" value="' + esc(bookQuery) + '" aria-label="문법 검색"></label>'
      + '<div id="book-list">' + bookListHTML() + "</div>", { nav: true });
  }

  /* ---------- 내 기록 ---------- */
  function renderMe() {
    const s = st();
    const lv = C.level();
    const wk = C.week();
    const max = Math.max(s.profile.goal, Math.max.apply(null, wk.map((d) => d.xp)));
    const doneN = C.units().filter((e) => s.units[e.unit.id] && s.units[e.unit.id].done).length;
    const acc = s.totals.answered ? pct(s.totals.correct / s.totals.answered) + "%" : "–";
    const sw = (k, label, desc) => '<label class="set-row"><div><b>' + label + "</b><small>" + desc + '</small></div><input type="checkbox" class="switch" data-act="toggle" data-k="' + k + '"' + (s.settings[k] ? " checked" : "") + "></label>";
    const themes = [["auto", "시스템"], ["light", "밝게"], ["dark", "어둡게"]];

    const html = '<header class="topbar"><h1 class="brand">내 기록</h1></header>'
      + '<section class="card profile"><span class="avatar">' + esc(Array.from(s.profile.name)[0] || "") + "</span>" + '<div class="grow"><div class="name-row"><b>' + esc(s.profile.name) + '</b><button class="link" data-act="rename">이름 변경</button></div>'
      + '<p class="lv">Lv.' + lv.n + " " + esc(lv.title) + '</p><div class="goal-bar"><i style="width:' + pct(lv.cur / lv.need) + '%"></i></div><small class="muted">다음 레벨까지 ' + ic("xp", 14) + (lv.need - lv.cur) + "</small></div></section>"
      + '<section class="grid">'
      + [["flame", C.streak() + "일", "연속 학습"], ["xp", num(s.xp), "누적 XP"], ["book", doneN + " / " + C.units().length, "완료 단원"], ["target", acc, "정답률"], ["pencil", num(s.totals.answered), "푼 문제"], ["bolt", s.totals.maxCombo, "최고 콤보"]]
        .map((x, i) => '<div class="tile-stat"><span class="ti t' + i + '">' + ic(x[0], 20) + "</span><b>" + x[1] + "</b><small>" + x[2] + "</small></div>").join("")
      + "</section>"
      + '<section class="card"><h2>이번 주 학습</h2><div class="week">' + wk.map((d) =>
        '<div class="day' + (d.today ? " today" : "") + '"><em>' + (d.xp || "") + '</em><div class="bar"><i class="' + (d.xp >= s.profile.goal ? "full" : "") + '" style="height:' + Math.max(d.xp ? 6 : 0, pct(d.xp / max)) + '%"></i></div><span>' + d.label + "</span></div>").join("") + "</div></section>"
      + '<section class="card"><h2>배지 <small>' + Object.keys(s.badges).length + " / " + C.badges().length + '</small></h2><div class="badges">' + C.badges().map((b) =>
        '<div class="badge' + (s.badges[b.id] ? " got" : "") + '" title="' + esc(b.desc) + '"><span>' + badgeIc(b, 22) + "</span><b>" + esc(b.name) + "</b><small>" + esc(b.desc) + "</small></div>").join("") + "</div></section>"
      + '<section class="card settings"><h2>설정</h2>'
      + '<div class="set-row col"><div><b>하루 목표</b></div>' + goalButtons(s.profile.goal, "goal") + "</div>"
      + '<div class="set-row col"><div><b>화면 테마</b></div><div class="seg">' + themes.map((t) => '<button class="seg-btn' + (s.settings.theme === t[0] ? " on" : "") + '" data-act="theme" data-v="' + t[0] + '">' + t[1] + "</button>").join("") + "</div></div>"
      + sw("sound", "효과음", "정답 · 오답 소리")
      + sw("autoSpeak", "문장 자동 읽기", "채점 후 정답 문장을 영어로 읽어 줘요")
      + sw("unlockAll", "모든 단원 열기", "순서와 상관없이 원하는 단원부터 학습")
      + '<div class="set-row"><div><b>학습 기록 백업</b><small>파일로 저장하거나 다른 기기에서 불러와요</small></div><div class="row"><button class="btn light sm" data-act="export">내보내기</button><button class="btn light sm" data-act="import">불러오기</button></div></div>'
      + '<div class="set-row"><div><b>기록 초기화</b><small>모든 학습 기록을 지워요</small></div><button class="btn light sm danger-text" data-act="reset">초기화</button></div>'
      + '<input type="file" id="import-file" accept="application/json,.json" hidden></section>'
      + '<p class="fine center">문법의 숲 v1.0 · 24단원 240문제</p>';
    view(html, { nav: true });
  }

  /* ---------- 이벤트 ---------- */
  const actions = {
    unit(el) {
      const id = el.dataset.id;
      if (!C.isUnlocked(id)) {
        el.classList.remove("shake");
        void el.offsetWidth;
        el.classList.add("shake");
        return toast("앞 단원을 먼저 완료해 주세요");
      }
      U = { id, i: 0 };
      go("unit/" + id);
    },
    start(el) { start("lesson", el.dataset.id); },
    review() { start("review", null, false); },
    "review-all"() { start("review", null, true); },
    practice() { start("practice"); },
    home() { go("home"); },
    "card-next"() { const u = C.entry(U.id).unit; if (U.i < u.cards.length - 1) { U.i++; sfx("tap"); renderUnit(U.id); window.scrollTo(0, 0); } },
    "card-prev"() { if (U.i > 0) { U.i--; renderUnit(U.id); window.scrollTo(0, 0); } },
    speak(el) { speak(el.dataset.t); },
    pick(el) { S.ans = +el.dataset.i; sfx("tap"); renderPlay(); },
    pickox(el) { S.ans = el.dataset.v === "1"; sfx("tap"); renderPlay(); },
    picktok(el) { S.ans = +el.dataset.i; sfx("tap"); renderPlay(); },
    tile(el) { S.ans.push(+el.dataset.id); sfx("tap"); renderPlay(); },
    untile(el) { S.ans = S.ans.filter((id) => id !== +el.dataset.id); renderPlay(); },
    check, next,
    quit() {
      modal("<h3>학습을 그만할까요?</h3><p>지금 나가면 이번 학습의 XP와 진행 상황이 저장되지 않아요.</p>"
        + '<div class="modal-btns"><button class="btn" data-act="modal-close">계속 학습하기</button><button class="btn light danger-text" data-act="quit-yes">그만하기</button></div>');
    },
    "quit-yes"() { S = null; closeModal(); go("home"); },
    "modal-close"() { closeModal(); },
    "w-goal"(el) { W.goal = +el.dataset.v; renderWelcome(); },
    "w-start"() {
      const name = (document.getElementById("w-name").value || "").trim() || "학습자";
      st().profile.name = name;
      st().profile.goal = W.goal;
      C.save();
      sfx("done");
      go("home");
    },
    goal(el) { st().profile.goal = +el.dataset.v; C.save(); renderMe(); },
    theme(el) { st().settings.theme = el.dataset.v; C.save(); if (EH) EH.setMode(el.dataset.v); applyTheme(); renderMe(); },
    toggle(el) { st().settings[el.dataset.k] = el.checked; C.save(); if (el.dataset.k === "sound" && el.checked) sfx("ok"); },
    rename() {
      modal('<h3>이름 변경</h3><input id="rename-input" type="text" maxlength="12" value="' + esc(st().profile.name) + '">'
        + '<div class="modal-btns"><button class="btn" data-act="rename-save">저장</button><button class="btn light" data-act="modal-close">취소</button></div>');
    },
    "rename-save"() {
      const v = document.getElementById("rename-input").value.trim();
      if (v) { st().profile.name = v; C.save(); }
      closeModal();
      renderMe();
    },
    export() {
      const blob = new Blob([C.exportData()], { type: "application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "grammar-forest-backup.json";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
      toast("백업 파일을 저장했어요");
    },
    import() { document.getElementById("import-file").click(); },
    reset() {
      modal("<h3>정말 초기화할까요?</h3><p>XP, 배지, 오답 노트 등 모든 학습 기록이 지워지며 되돌릴 수 없어요.</p>"
        + '<div class="modal-btns"><button class="btn light" data-act="modal-close">취소</button><button class="btn danger" data-act="reset-yes">모두 지우기</button></div>');
    },
    "reset-yes"() { C.reset(); closeModal(); location.hash = "home"; render(); }
  };

  document.addEventListener("click", (ev) => {
    const el = ev.target.closest("[data-act]");
    if (!el || el.disabled || el.type === "checkbox") {
      if (ev.target.classList && ev.target.classList.contains("modal")) closeModal();
      return;
    }
    const fn = actions[el.dataset.act];
    if (fn) { ev.preventDefault(); fn(el); }
  });

  document.addEventListener("change", (ev) => {
    const el = ev.target;
    if (el.dataset && el.dataset.act === "toggle") actions.toggle(el);
    if (el.id === "import-file" && el.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        try { C.importData(String(reader.result)); toast("학습 기록을 불러왔어요"); render(); }
        catch (e) { toast("올바른 백업 파일이 아니에요"); }
      };
      reader.readAsText(el.files[0]);
    }
  });

  document.addEventListener("input", (ev) => {
    const el = ev.target;
    if (el.id === "q-input" && S) {
      S.ans = el.value;
      const b = app.querySelector('[data-act="check"]');
      if (b) b.disabled = !canCheck();
    } else if (el.id === "book-q") {
      bookQuery = el.value;
      document.getElementById("book-list").innerHTML = bookListHTML();
    }
  });

  document.addEventListener("keydown", (ev) => {
    if (ev.metaKey || ev.ctrlKey || ev.altKey || ev.isComposing) return;
    const inField = /^(INPUT|TEXTAREA)$/.test(ev.target.tagName);
    if (document.querySelector(".modal")) {
      if (ev.key === "Escape") closeModal();
      if (ev.key === "Enter" && document.getElementById("rename-input")) actions["rename-save"]();
      return;
    }
    const r = parse();
    if (!st().profile.name) {
      if (ev.key === "Enter") actions["w-start"]();
      return;
    }
    if (r.name === "play" && S) {
      const it = S.queue[S.i];
      if (ev.key === "Enter") {
        ev.preventDefault();
        if (S.phase === "fb") next(); else check();
      } else if (ev.key === "Escape") {
        actions.quit();
      } else if (S.phase === "ans" && !inField) {
        const n = parseInt(ev.key, 10);
        if (it.q.t === "mcq" && n >= 1 && n <= it.opts.length) { S.ans = n - 1; sfx("tap"); renderPlay(); }
        else if (it.q.t === "ox" && (n === 1 || n === 2)) { S.ans = n === 1; sfx("tap"); renderPlay(); }
        else if (it.q.t === "order" && ev.key === "Backspace" && S.ans.length) { S.ans.pop(); renderPlay(); }
      }
    } else if (r.name === "unit" && !inField) {
      if (ev.key === "ArrowRight" || ev.key === "Enter") {
        ev.preventDefault();
        const u = C.entry(U.id);
        if (u && U.i === u.unit.cards.length - 1) { if (ev.key === "Enter") start("lesson", U.id); }
        else actions["card-next"]();
      } else if (ev.key === "ArrowLeft") {
        actions["card-prev"]();
      }
    }
  });

  window.addEventListener("hashchange", render);
  window.addEventListener("beforeunload", (ev) => { if (S) { ev.preventDefault(); ev.returnValue = ""; } });
  render();
})();
