/**
 * 글자 크기 선택 (기본 / 큰 글씨)
 *
 * - 화면 오른쪽에 고정된 버튼이 스크롤을 따라다닙니다.
 * - 선택한 크기는 브라우저에 저장되어 다시 열어도 유지됩니다.
 * - 이 파일 하나로 동작합니다. index.html 의 <head> 안에
 *   <script src="textsize.js"></script> 한 줄만 추가하면 됩니다.
 *
 * 큰 글씨 배율은 아래 LARGE_FONT_SIZE 로 조절하세요. (기본 16px)
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'invitationTextSize';
  var LARGE_FONT_SIZE = '20px';

  var root = document.documentElement;

  /* ─── 저장/불러오기 (저장소를 못 쓰는 환경에서도 에러 없이) ─── */
  function readSaved() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }
  function writeSaved(value) {
    try { localStorage.setItem(STORAGE_KEY, value); } catch (e) { /* 무시 */ }
  }

  /* ─── 스타일 주입 ─── */
  var css = [
    /* 큰 글씨 모드: rem 단위 글자가 모두 함께 커집니다 */
    'html.text-large { font-size: ' + LARGE_FONT_SIZE + '; }',

    /* 글자가 커져도 줄이 넘치지 않도록 자간/줄바꿈 보정 */
    'html.text-large .curtain__names { font-size: 1.5rem; letter-spacing: 2px; }',
    'html.text-large .hero__names { letter-spacing: 3px; }',
    'html.text-large .hero__date { letter-spacing: 1px; }',
    'html.text-large .section__title { letter-spacing: 2px; }',
    'html.text-large .greeting__parents { letter-spacing: 0; }',
    'html.text-large .greeting__parents .parent-row { flex-wrap: wrap; column-gap: 0.4rem; }',
    'html.text-large .footer__text { letter-spacing: 1px; }',

    /* 오른쪽 고정 버튼 (px 단위라 큰 글씨 모드에서도 크기가 변하지 않음) */
    '.textsize {',
    '  position: fixed;',
    '  right: calc(6px + env(safe-area-inset-right, 0px));',
    '  top: 50%;',
    '  transform: translateY(-50%);',
    '  z-index: 10001;',
    '  display: flex;',
    '  flex-direction: column;',
    '  gap: 4px;',
    '  padding: 4px;',
    '  border-radius: 12px;',
    '  background: rgba(18, 29, 58, 0.9);',
    '  border: 1px solid rgba(192, 200, 216, 0.3);',
    '  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35);',
    '  transition: opacity 0.3s ease;',
    '}',
    /* 스크롤하는 동안은 반투명하게 해서 뒤의 글자가 덜 가려지도록 */
    '.textsize.is-scrolling { opacity: 0.45; }',
    '.textsize__btn {',
    '  display: flex;',
    '  flex-direction: column;',
    '  align-items: center;',
    '  justify-content: center;',
    '  width: 44px;',
    '  height: 50px;',
    '  border-radius: 9px;',
    '  border: 1px solid transparent;',
    '  background: transparent;',
    '  color: #c0c8d8;',
    '  font-family: inherit;',
    '  line-height: 1.1;',
    '  cursor: pointer;',
    '  -webkit-tap-highlight-color: transparent;',
    '  transition: background 0.2s ease, color 0.2s ease;',
    '}',
    '.textsize__glyph { font-size: 16px; font-weight: 500; }',
    '.textsize__btn[data-size="large"] .textsize__glyph { font-size: 24px; }',
    '.textsize__label { font-size: 11px; margin-top: 3px; letter-spacing: 0; }',
    '.textsize__btn[aria-pressed="true"] {',
    '  background: #d4c5a0;',
    '  color: #0a1628;',
    '  font-weight: 700;',
    '}',
    '.textsize__btn:focus-visible { outline: 2px solid #e8dcc0; outline-offset: 2px; }',
    '@media print { .textsize { display: none !important; } }'
  ].join('\n');

  var styleEl = document.createElement('style');
  styleEl.setAttribute('data-textsize', '');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  /* ─── 저장된 크기를 화면이 그려지기 전에 바로 적용 (깜빡임 방지) ─── */
  var current = readSaved() === 'large' ? 'large' : 'normal';
  root.classList.toggle('text-large', current === 'large');

  /* ─── 버튼 생성 ─── */
  function buildControl() {
    var wrap = document.createElement('div');
    wrap.className = 'textsize';
    wrap.setAttribute('role', 'group');
    wrap.setAttribute('aria-label', '글자 크기 선택');

    var options = [
      { size: 'normal', label: '기본' },
      { size: 'large', label: '크게' }
    ];

    var buttons = options.map(function (opt) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'textsize__btn';
      btn.setAttribute('data-size', opt.size);
      btn.setAttribute('aria-label', opt.size === 'large' ? '큰 글씨로 보기' : '기본 글씨로 보기');
      btn.innerHTML =
        '<span class="textsize__glyph">가</span>' +
        '<span class="textsize__label">' + opt.label + '</span>';
      btn.addEventListener('click', function () { setSize(opt.size); });
      wrap.appendChild(btn);
      return btn;
    });

    function refresh() {
      buttons.forEach(function (btn) {
        btn.setAttribute('aria-pressed', String(btn.getAttribute('data-size') === current));
      });
    }

    function setSize(size) {
      if (size === current) return;

      // 글자 크기가 바뀌면 문서 길이가 달라지므로, 보던 위치(비율)를 유지
      var max = root.scrollHeight - window.innerHeight;
      var ratio = max > 0 ? window.scrollY / max : 0;

      current = size;
      root.classList.toggle('text-large', size === 'large');
      writeSaved(size);
      refresh();

      // 초대장 열기 화면(스크롤 잠김)에서는 위치 보정이 필요 없음
      if (!document.body.classList.contains('no-scroll')) {
        var newMax = root.scrollHeight - window.innerHeight;
        window.scrollTo({ top: ratio * Math.max(newMax, 0), left: 0, behavior: 'instant' });
      }
    }

    refresh();
    document.body.appendChild(wrap);

    // 스크롤 중에는 반투명, 멈추면 다시 선명하게
    var scrollTimer = null;
    window.addEventListener('scroll', function () {
      wrap.classList.add('is-scrolling');
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(function () { wrap.classList.remove('is-scrolling'); }, 1000);
    }, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildControl);
  } else {
    buildControl();
  }
})();