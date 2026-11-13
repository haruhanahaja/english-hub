/* 문법의 숲 — 학습 엔진 (저장, 채점, 복습 스케줄, 보상). UI와 독립적으로 동작합니다. */
(function (g) {
  "use strict";

  const KEY = "grammar-forest-v1";
  const INTERVALS = [1, 3, 7, 14]; // 복습 간격(일). 마지막 단계를 통과하면 오답 노트에서 졸업
  const LEVEL_TITLES = ["입문", "기초", "초급", "초중급", "중급", "중상급", "상급", "고급", "심화", "마스터"];
  const TYPE_WEIGHT = { mcq: 0, ox: 0, fix: 1, type: 1, order: 2 };

  let storage = null;
  let state = null;

  function fresh() {
    return {
      v: 1,
      profile: { name: "", goal: 120 },
      xp: 0,
      units: {},   // id -> { done, stars, best, plays }
      srs: {},     // qid -> { box, due, miss }
      days: {},    // dayNum -> xp
      badges: {},  // id -> dayNum
      totals: { answered: 0, correct: 0, sessions: 0, perfect: 0, maxCombo: 0, mastered: 0 },
      settings: { sound: true, autoSpeak: false, theme: "auto", unlockAll: false }
    };
  }

  function merge(base, saved) {
    for (const k in saved) {
      if (saved[k] && typeof saved[k] === "object" && !Array.isArray(saved[k]) && base[k] && typeof base[k] === "object") {
        merge(base[k], saved[k]);
      } else {
        base[k] = saved[k];
      }
    }
    return base;
  }

  function init(store) {
    storage = store;
    state = fresh();
    try {
      const raw = storage && storage.getItem(KEY);
      if (raw) merge(state, JSON.parse(raw));
    } catch (e) { /* 손상된 데이터는 무시하고 새로 시작 */ }
    return state;
  }

  function save() {
    try { if (storage) storage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* 저장 불가 환경 */ }
  }

  function reset() { state = fresh(); save(); return state; }

  function exportData() { return JSON.stringify(state, null, 2); }

  function importData(text) {
    const data = JSON.parse(text);
    if (!data || typeof data !== "object" || data.v !== 1 || typeof data.xp !== "number") throw new Error("invalid");
    state = merge(fresh(), data);
    save();
    return state;
  }

  /* ---------- 날짜 ---------- */
  function dayNum(d) {
    d = d || new Date();
    return Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 864e5);
  }
  let clock = () => dayNum();
  const today = () => clock();

  /* ---------- 커리큘럼 ---------- */
  let flat = null;
  function units() {
    if (!flat) {
      flat = [];
      (g.CURRICULUM || []).forEach((ch) => ch.units.forEach((u) => flat.push({ unit: u, chapter: ch, index: flat.length })));
    }
    return flat;
  }
  const entry = (id) => units().find((e) => e.unit.id === id) || null;

  function isUnlocked(id) {
    const e = entry(id);
    if (!e) return false;
    if (state.settings.unlockAll || e.index === 0) return true;
    const prev = units()[e.index - 1].unit.id;
    return !!(state.units[prev] && state.units[prev].done);
  }

  function nextUnit() {
    const e = units().find((x) => !(state.units[x.unit.id] && state.units[x.unit.id].done));
    return e || null;
  }

  function question(qid) {
    const [uid, n] = qid.split("-");
    const e = entry(uid);
    const q = e && e.unit.qs[+n];
    return q ? { q, unit: e.unit, chapter: e.chapter } : null;
  }

  /* ---------- 문제 준비 · 채점 ---------- */
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  const norm = (s) => String(s).toLowerCase().replace(/[’‘`]/g, "'").replace(/[.,!?]/g, "").replace(/\s+/g, " ").trim();
  const bare = (tok) => tok.replace(/[.,!?]/g, "");

  function prepare(q, qid) {
    const item = { q, qid, tries: 0 };
    if (q.t === "mcq") {
      item.opts = shuffle(q.o);
    } else if (q.t === "fix") {
      item.tokens = q.q.split(" ");
      item.wrongIdx = item.tokens.findIndex((t) => bare(t) === q.w);
    } else if (q.t === "order") {
      const words = q.a.split(" ").concat(q.x || []);
      let tiles;
      let guard = 0;
      do {
        tiles = shuffle(words.map((w, i) => ({ id: i, w })));
      } while (guard++ < 5 && tiles.map((t) => t.w).join(" ").indexOf(q.a) === 0);
      item.tiles = tiles;
    }
    return item;
  }

  function grade(item, ans) {
    const q = item.q;
    switch (q.t) {
      case "mcq": return item.opts[ans] === q.o[0];
      case "ox": return ans === q.a;
      case "fix": return ans === item.wrongIdx;
      case "type": return q.a.map(norm).indexOf(norm(ans)) >= 0;
      case "order": {
        const said = norm(ans.map((id) => item.tiles.find((t) => t.id === id).w).join(" "));
        return [q.a].concat(q.alt || []).map(norm).indexOf(said) >= 0;
      }
    }
    return false;
  }

  /** 올바른 완성 문장 */
  function sentence(q) {
    switch (q.t) {
      case "mcq": return q.q.replace("___", q.o[0]);
      case "type": return q.q.replace("___", q.a[0]).replace(/\s*\([^)]*\)/g, "");
      case "ox": return q.a ? q.q : q.fix;
      case "fix": return q.q.split(" ").map((t) => (bare(t) === q.w ? t.replace(q.w, q.r) : t)).filter(Boolean).join(" ");
      case "order": return q.a + (q.end || ".");
    }
    return "";
  }

  /** 정답을 짧게 표시 */
  function answerText(q) {
    switch (q.t) {
      case "mcq": return q.o[0];
      case "type": return q.a[0];
      case "ox": return q.a ? "O (올바른 문장)" : "X → " + q.fix;
      case "fix": return q.r ? q.w + " → " + q.r : q.w + " → (삭제)";
      case "order": return q.a + (q.end || ".");
    }
    return "";
  }

  function makeQueue(pairs) {
    return pairs.map((p) => prepare(p.q, p.qid));
  }

  function buildLesson(unitId) {
    const u = entry(unitId).unit;
    const pairs = shuffle(u.qs.map((q, i) => ({ q, qid: unitId + "-" + i })));
    pairs.sort((a, b) => TYPE_WEIGHT[a.q.t] - TYPE_WEIGHT[b.q.t]); // 쉬운 유형부터
    return makeQueue(pairs);
  }

  function srsList() {
    return Object.keys(state.srs)
      .filter((qid) => question(qid))
      .map((qid) => Object.assign({ qid }, state.srs[qid]))
      .sort((a, b) => a.due - b.due);
  }
  const dueList = () => srsList().filter((s) => s.due <= today());
  const dueCount = () => dueList().length;

  function buildReview(all) {
    const list = (all ? srsList() : dueList()).slice(0, 12);
    return makeQueue(shuffle(list).map((s) => ({ q: question(s.qid).q, qid: s.qid })));
  }

  function buildPractice() {
    let pool = units().filter((e) => state.units[e.unit.id] && state.units[e.unit.id].done);
    if (!pool.length) pool = units().slice(0, 1);
    const pairs = [];
    pool.forEach((e) => e.unit.qs.forEach((q, i) => pairs.push({ q, qid: e.unit.id + "-" + i })));
    return makeQueue(shuffle(pairs).slice(0, 10));
  }

  /* ---------- 기록 ---------- */
  function record(qid, correct, first) {
    if (!first) return;
    state.totals.answered++;
    if (correct) state.totals.correct++;
    const s = state.srs[qid];
    if (!correct) {
      state.srs[qid] = { box: 0, due: today() + INTERVALS[0], miss: ((s && s.miss) || 0) + 1 };
    } else if (s && s.due <= today()) {
      s.box++;
      if (s.box >= INTERVALS.length) {
        delete state.srs[qid];
        state.totals.mastered++;
      } else {
        s.due = today() + INTERVALS[s.box];
      }
    }
    save();
  }

  function level(xp) {
    xp = xp == null ? state.xp : xp;
    let n = 1;
    while (50 * (n + 1) * n <= xp) n++;
    const base = 50 * n * (n - 1);
    const next = 50 * (n + 1) * n;
    return { n, title: LEVEL_TITLES[Math.min(n, LEVEL_TITLES.length) - 1], cur: xp - base, need: next - base };
  }

  function streak() {
    const t = today();
    let d = state.days[t] > 0 ? t : t - 1;
    let n = 0;
    while (state.days[d] > 0) { n++; d--; }
    return n;
  }

  const todayXp = () => state.days[today()] || 0;

  function week() {
    const t = today();
    const names = ["일", "월", "화", "수", "목", "금", "토"];
    const out = [];
    for (let i = 6; i >= 0; i--) {
      const d = t - i;
      out.push({ label: names[new Date(d * 864e5).getUTCDay()], xp: state.days[d] || 0, today: i === 0 });
    }
    return out;
  }

  function chapterDone(ch) {
    return ch.units.every((u) => state.units[u.id] && state.units[u.id].done);
  }

  let badgeDefs = null;
  function badges() {
    if (badgeDefs) return badgeDefs;
    const doneCount = () => units().filter((e) => state.units[e.unit.id] && state.units[e.unit.id].done).length;
    badgeDefs = [
      { id: "first", icon: "👣", name: "첫 발자국", desc: "첫 단원 완료", test: () => doneCount() >= 1 },
      { id: "perfect", icon: "💯", name: "완벽주의자", desc: "한 번도 틀리지 않고 학습 완료", test: () => state.totals.perfect >= 1 },
      { id: "combo10", icon: "⚡", name: "콤보 장인", desc: "10문제 연속 정답", test: () => state.totals.maxCombo >= 10 },
      { id: "streak3", icon: "🔥", name: "작심삼일 돌파", desc: "3일 연속 학습", test: () => streak() >= 3 },
      { id: "streak7", icon: "📅", name: "일주일의 기적", desc: "7일 연속 학습", test: () => streak() >= 7 },
      { id: "streak30", icon: "🏆", name: "습관의 힘", desc: "30일 연속 학습", test: () => streak() >= 30 },
      { id: "correct100", icon: "🎯", name: "명사수", desc: "정답 100개 달성", test: () => state.totals.correct >= 100 },
      { id: "xp1000", icon: "🌰", name: "1,000 XP", desc: "누적 1,000 XP 달성", test: () => state.xp >= 1000 },
      { id: "review", icon: "🧹", name: "오답 정복자", desc: "오답 10개 완전 정복", test: () => state.totals.mastered >= 10 }
    ];
    (g.CURRICULUM || []).forEach((ch) => {
      badgeDefs.push({ id: "ch-" + ch.id, icon: ch.emoji, name: ch.title + " 완주", desc: "'" + ch.title + "' 챕터의 모든 단원 완료", test: () => chapterDone(ch) });
    });
    badgeDefs.push({ id: "stars", icon: "🌟", name: "별 수집가", desc: "모든 단원에서 별 3개", test: () => units().every((e) => state.units[e.unit.id] && state.units[e.unit.id].stars === 3) });
    return badgeDefs;
  }

  /** 세션 종료 처리. sess = { mode, unitId, total, correctFirst, maxCombo, xp } */
  function finish(sess) {
    const acc = sess.total ? sess.correctFirst / sess.total : 0;
    const perfect = sess.total > 0 && sess.correctFirst === sess.total;
    const bonus = (sess.mode === "lesson" ? 15 : 10) + (perfect ? 20 : 0);
    const gained = sess.xp + bonus;
    const levelBefore = level().n;
    const goalBefore = todayXp() >= state.profile.goal;

    state.xp += gained;
    state.days[today()] = todayXp() + gained;
    state.totals.sessions++;
    if (perfect) state.totals.perfect++;
    state.totals.maxCombo = Math.max(state.totals.maxCombo, sess.maxCombo);

    let stars = 0;
    let firstClear = false;
    if (sess.mode === "lesson") {
      stars = acc >= 0.9 ? 3 : acc >= 0.7 ? 2 : 1;
      const u = state.units[sess.unitId] || (state.units[sess.unitId] = { done: false, stars: 0, best: 0, plays: 0 });
      firstClear = !u.done;
      u.done = true;
      u.plays++;
      u.stars = Math.max(u.stars, stars);
      u.best = Math.max(u.best, acc);
    }

    const newBadges = [];
    badges().forEach((b) => {
      if (!state.badges[b.id] && b.test()) {
        state.badges[b.id] = today();
        newBadges.push(b);
      }
    });
    save();

    const lv = level();
    return {
      mode: sess.mode, unitId: sess.unitId, total: sess.total, correctFirst: sess.correctFirst,
      acc, perfect, gained, bonus, stars, firstClear, maxCombo: sess.maxCombo, newBadges,
      leveledUp: lv.n > levelBefore ? lv : null,
      goalReached: !goalBefore && todayXp() >= state.profile.goal,
      streak: streak()
    };
  }

  g.Core = {
    init, save, reset, exportData, importData,
    get state() { return state; },
    units, entry, isUnlocked, nextUnit, question,
    prepare, grade, sentence, answerText, norm,
    buildLesson, buildReview, buildPractice,
    srsList, dueCount, record, finish,
    level, streak, todayXp, today, week, badges, chapterDone,
    INTERVALS,
    _setClock(fn) { clock = fn; }
  };
})(typeof window !== "undefined" ? window : globalThis);
