/* Pono Learning Quest v36.8 — 教材を変更しない表示補助 */
(function () {
  'use strict';
  const root = document.getElementById('app');
  if (!root || typeof MutationObserver === 'undefined') return;

  // 既存の文章を一文字も変更せず、「。」などの区切りで改行する。
  function sentences(text) {
    const parts = String(text).match(/[^。！？]+[。！？]*/g);
    return parts && parts.length ? parts : [text];
  }

  function formatLessons() {
    const blocks = root.querySelectorAll('.card.lesson .soc352learn');
    blocks.forEach(function (block) {
      if (block.dataset.pono368Ready === '1') return;
      const prose = block.querySelector(':scope > span');
      if (!prose || prose.children.length) return;
      const original = prose.textContent;
      const lines = sentences(original);
      // 1文しかないときは文字を触らず、CSSによる表示だけにする。
      if (lines.length > 1) {
        const fragment = document.createDocumentFragment();
        lines.forEach(function (line) {
          if (!line) return;
          const paragraph = document.createElement('span');
          paragraph.className = 'pono368sentence';
          paragraph.textContent = line;
          fragment.appendChild(paragraph);
        });
        // 説明を削除・変更していないことを保証する。
        if (fragment.textContent === original) prose.replaceChildren(fragment);
      }
      block.dataset.pono368Ready = '1';
    });
  }

  let pending = false;
  function queueFormat() {
    if (pending) return;
    pending = true;
    requestAnimationFrame(function () {
      pending = false;
      formatLessons();
    });
  }
  const watcher = new MutationObserver(queueFormat);
  watcher.observe(root, {childList:true, subtree:true});
  queueFormat();
})();
