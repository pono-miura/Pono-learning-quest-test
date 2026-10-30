/* Pono Learning Quest v467
 * v466「📖 1文ずつ」に、音声速度の切り替え・読み上げ停止を追加。
 * 元の教材・採点・履歴・v465表示設定には手を加えない。
 * 速度設定のみ選択中の学習者IDに保存する（文章や音声の保存はしない）。
 */
(()=>{
  'use strict';
  if (window.ponoVoice467) return;
  const RATE = {slow:0.65, normal:0.86};
  const KEY = 'pono467-voice-speed:';
  let active = null;
  let utterance = null;
  let generation = 0;

  function learner() {
    try {
      if (typeof profile !== 'undefined' && profile && profile.id != null) {
        const id = String(profile.id).trim();
        if (id && id !== 'trial') return id;
      }
    } catch (_) {}
    return null;
  }
  function readPref() {
    const id = learner();
    if (!id) return 'slow';
    try { return localStorage.getItem(KEY+id) === 'normal' ? 'normal' : 'slow'; }
    catch (_) { return 'slow'; }
  }
  function savePref(speed) {
    const id = learner();
    if (!id) return;
    try { localStorage.setItem(KEY+id, speed); } catch (_) {}
  }
  function e(tag, cls, value) {
    const element=document.createElement(tag);
    if(cls) element.className='v467-'+cls;
    if(value!==undefined) element.textContent=value;
    return element;
  }
  function button(label, click, cls) {
    const b=e('button',cls||'button',label);
    b.type='button';
    b.addEventListener('click',click);
    return b;
  }
  function status(message) {
    const el=active?.querySelector('.v467-status');
    if(el) el.textContent=message;
  }
  function stop(notify) {
    generation++;
    utterance=null;
    try { if('speechSynthesis' in window) window.speechSynthesis.cancel(); } catch (_) {}
    if(notify) status('音声を止めました。');
  }
  function currentText() {
    return (active?.querySelector('.v466-reading')?.textContent || '').trim();
  }
  function speak() {
    if(!active || !active.isConnected || !active.open) return;
    const message=currentText();
    if(!message) { status('読む文章がありません。'); return; }
    if(!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) {
      status('この端末では音声を再生できません。画面の文を読んでください。');
      return;
    }
    stop(false);
    const serial=generation;
    try {
      const u=new SpeechSynthesisUtterance(message);
      utterance=u;
      u.lang='ja-JP';
      u.rate=RATE[active.dataset.v467Speed] || RATE.slow;
      u.pitch=1;
      const voices=window.speechSynthesis.getVoices?.() || [];
      const jaVoice=voices.find(v=>v.lang==='ja-JP') || voices.find(v=>v.lang?.toLowerCase().startsWith('ja'));
      if(jaVoice) u.voice=jaVoice;
      u.onstart=()=>{if(generation===serial) status('この文を読んでいます。');};
      u.onend=()=>{if(generation===serial){utterance=null;status('読み終わりました。もう一度聞くこともできます。');}};
      u.onerror=(ev)=>{
        if(generation!==serial) return;
        utterance=null;
        status(ev.error==='canceled' || ev.error==='interrupted' ? '音声を止めました。' : '音声を再生できませんでした。画面の文を読んでください。');
      };
      window.speechSynthesis.speak(u);
      status('音声を再生しています。');
    } catch (_) {
      utterance=null;
      status('音声を再生できませんでした。画面の文を読んでください。');
    }
  }
  function updateSpeedUI(dialog) {
    for(const button of dialog.querySelectorAll('[data-v467-speed]')) {
      const selected=button.dataset.v467Speed===dialog.dataset.v467Speed;
      button.setAttribute('aria-pressed',String(selected));
    }
  }
  function chooseSpeed(speed) {
    if(!active || !RATE[speed]) return;
    stop(false);
    active.dataset.v467Speed=speed;
    savePref(speed);
    updateSpeedUI(active);
    status(speed==='slow'?'「ゆっくり」を選びました。音声を聞くボタンを押してね。':'「ふつう」を選びました。音声を聞くボタンを押してね。');
  }
  function enhance(dialog) {
    if(dialog.querySelector('.v467-panel')) return;
    active=dialog;
    dialog.dataset.v467Speed=readPref();
    const original=dialog.querySelector('.v466-speak');
    if(original) {
      original.hidden=true;
      // 従来の音声ボタンは隠すだけにし、元のプログラムを変更しない。
      const originalRow=original.closest('.v466-actions');
      if(originalRow && originalRow.children.length===1) originalRow.hidden=true;
    }
    const panel=e('section','panel');
    panel.setAttribute('aria-label','音声を聞く速さ');
    panel.append(e('h3','title','🔊 聞きやすい速さを選ぼう'));
    const speeds=e('div','speeds');
    const slow=button('🐢 ゆっくり',()=>chooseSpeed('slow'),'speed');
    const normal=button('♪ ふつう',()=>chooseSpeed('normal'),'speed');
    slow.dataset.v467Speed='slow';
    normal.dataset.v467Speed='normal';
    speeds.append(slow,normal);
    panel.append(speeds);
    const actions=e('div','actions');
    actions.append(button('🔊 この文を聞く',speak,'listen'),button('■ 音を止める',()=>stop(true),'stop'));
    panel.append(actions);
    const note=e('p','status','聞くときは「この文を聞く」を押してね。');
    note.setAttribute('role','status');
    note.setAttribute('aria-live','polite');
    panel.append(note);
    const target=dialog.querySelector('.v466-count') || dialog.querySelector('.v466-actions');
    if(target) target.insertAdjacentElement('beforebegin',panel);
    else dialog.querySelector('.v466-inside')?.append(panel);
    updateSpeedUI(dialog);

    // 文を移動したら前の音声を止める。次の文を勝手に読まない。
    dialog.addEventListener('click',ev=>{
      if(ev.target.closest('.v466-prev, .v466-next')) {
        stop(false);
        status('文を変えました。聞きたいときは音声ボタンを押してね。');
      }
    },true);
    dialog.addEventListener('close',()=>{
      if(active===dialog){stop(false);active=null;}
    },{once:true});
  }
  function refresh() {
    const dialog=document.querySelector('dialog.v466-dialog[open]');
    if(active && (!active.isConnected || active!==dialog)) {
      stop(false);
      active=null;
    }
    if(dialog) enhance(dialog);
  }
  let scheduled=false;
  function schedule() {
    if(scheduled) return;
    scheduled=true;
    requestAnimationFrame(()=>{scheduled=false;refresh();});
  }
  new MutationObserver(schedule).observe(document.body,{childList:true,subtree:true});
  window.ponoVoice467={refresh,stop};
  schedule();
})();
