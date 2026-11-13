/* English Hub 공용 조각 — 통합 홈과 세 파트(단어 · 듣기 · 문법)가 함께 쓴다.
   - 테마: 네 화면이 같은 테마(시스템/라이트/다크)를 쓰도록 한 곳에 저장한다.
   - 요약: 각 파트가 "다음 학습 · 전체 진도"를 남겨 두면 통합 홈이 읽어서 보여 준다.
   - 오프라인: 서비스워커 등록. */
(function () {
  'use strict';
  var THEME_KEY = 'englishhub.theme', SUM_KEY = 'englishhub.sum.';
  var MODES = ['auto', 'light', 'dark'];
  var mq = window.matchMedia ? matchMedia('(prefers-color-scheme: dark)') : null;
  var get = function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } };
  var set = function (k, v) { try { localStorage.setItem(k, v); } catch (e) { /* 저장 불가 환경 */ } };

  var EH = {
    MODES: MODES,
    /** 저장된 테마 모드. 아직 정한 적이 없으면 null. */
    stored: function () { var m = get(THEME_KEY); return MODES.indexOf(m) >= 0 ? m : null; },
    mode: function () { return EH.stored() || 'auto'; },
    dark: function () { var m = EH.mode(); return m === 'auto' ? !!(mq && mq.matches) : m === 'dark'; },
    setMode: function (m) { if (MODES.indexOf(m) >= 0 && m !== get(THEME_KEY)) set(THEME_KEY, m); },
    /** <html data-theme="light|dark"> 를 맞춘다(자체 테마 처리가 없는 화면용). */
    apply: function () {
      var dark = EH.dark();
      document.documentElement.dataset.theme = dark ? 'dark' : 'light';
      var meta = document.querySelector('meta[name=theme-color]:not([media])');
      if (meta) meta.content = dark ? '#0C111B' : '#F6F8FB';
    },
    onSystemChange: function (fn) { if (mq && mq.addEventListener) mq.addEventListener('change', fn); },
    /** 파트가 통합 홈에 보여 줄 요약을 남긴다: { next, done, total } */
    summary: function (part, data) { set(SUM_KEY + part, JSON.stringify(data)); },
    readSummary: function (part) { try { return JSON.parse(get(SUM_KEY + part)) || {}; } catch (e) { return {}; } },
    /** 통합 홈으로 가는 링크에 쓰는 아이콘(네모 넷). */
    ICON: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"/></svg>',
  };
  window.EH = EH;

  /* 오프라인 지원 (https 또는 localhost 에서만). 서비스워커는 사이트 맨 위 폴더에 하나만 있다. */
  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    var root = (document.currentScript && document.currentScript.dataset.root) || './';
    addEventListener('load', function () { navigator.serviceWorker.register(root + 'sw.js', { scope: root }).catch(function () {}); });
  }
})();
