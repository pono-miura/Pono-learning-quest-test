/* Pono Learning Quest v468
 * v466/v467 の「📖 1文ずつ」に、本人が選んだときだけ動く連続読み上げを追加。
 * 一文ごとに間を置いて次へ進む。元の問題・採点・記録・表示設定を変更しない。
 */
(()=>{
  'use strict';
  if(window.ponoVoice468)return;
  const GAP_MS=1250;
  const RATE={slow:.65,normal:.86};
  let dialog=null,playing=false,token=0,pending=null,utterance=null,advancing=false,queued=false;

  function el(tag,cls,content){
    const n=document.createElement(tag);
    if(cls)n.className='v468-'+cls;
    if(content!==undefined)n.textContent=content;
    return n;
  }
  function button(label,action,cls){
    const n=el('button',cls,label);n.type='button';n.addEventListener('click',action);return n;
  }
  function status(message){
    const n=dialog?.querySelector('.v468-status');if(n)n.textContent=message;
  }
  function state(){
    if(!dialog)return;
    const start=dialog.querySelector('.v468-play'),stopBtn=dialog.querySelector('.v468-stop');
    if(start){start.disabled=playing;start.setAttribute('aria-disabled',String(playing));}
    if(stopBtn)stopBtn.disabled=!playing;
  }
  function clear(waitText){
    const hadAudio=playing||!!utterance;
    token++;
    playing=false;
    if(pending!==null){clearTimeout(pending);pending=null;}
    utterance=null;
    if(hadAudio)try{window.speechSynthesis?.cancel();}catch(_){}
    state();
    if(waitText)status(waitText);
  }
  function completed(){
    playing=false;utterance=null;pending=null;
    state();
    status('最後の文まで読み終わりました。もう一度聞くこともできます。');
  }
  function nextSentence(serial){
    if(!playing||serial!==token||!dialog?.isConnected||!dialog.open)return;
    const next=dialog.querySelector('.v466-next');
    if(!next||next.disabled){completed();return;}
    status('ひと休みして、次の文へ進みます。');
    pending=setTimeout(()=>{
      pending=null;
      if(!playing||serial!==token||!dialog?.isConnected||!dialog.open)return;
      advancing=true;
      try{next.click();}finally{advancing=false;}
      // v466が表示する現在の文を、そのまま読み上げる。
      readSentence(serial);
    },GAP_MS);
  }
  function readSentence(serial){
    if(!playing||serial!==token||!dialog?.isConnected||!dialog.open)return;
    const sentence=(dialog.querySelector('.v466-reading')?.textContent||'').trim();
    if(!sentence){clear('読む文が見つかりません。');return;}
    const synth=window.speechSynthesis;
    if(!synth||typeof window.SpeechSynthesisUtterance!=='function'){
      clear('この端末では連続読み上げが利用できません。画面の文を読んでください。');return;
    }
    try{
      const u=new SpeechSynthesisUtterance(sentence);
      utterance=u;
      u.lang='ja-JP';u.rate=RATE[dialog.dataset.v467Speed]||RATE.slow;u.pitch=1;
      const voices=synth.getVoices?.()||[];
      const jp=voices.find(v=>v.lang==='ja-JP')||voices.find(v=>v.lang?.toLowerCase().startsWith('ja'));
      if(jp)u.voice=jp;
      u.onstart=()=>{
        if(playing&&serial===token)status('📖 '+(dialog.querySelector('.v466-count')?.textContent||'')+'　この文を読んでいます。');
      };
      u.onend=()=>{
        if(!playing||serial!==token)return;
        utterance=null;
        nextSentence(serial);
      };
      u.onerror=ev=>{
        if(!playing||serial!==token)return;
        clear(ev.error==='canceled'||ev.error==='interrupted'
          ?'読み上げが中断されました。'
          :'音声を再生できませんでした。画面の文を読んでください。');
      };
      synth.speak(u);
      status('📖 '+(dialog.querySelector('.v466-count')?.textContent||'')+'　読み上げを始めます。');
    }catch(_){clear('音声を再生できませんでした。画面の文を読んでください。');}
  }
  function start(){
    if(!dialog||!dialog.open||playing)return;
    if(!window.speechSynthesis||typeof window.SpeechSynthesisUtterance!=='function'){
      status('この端末では連続読み上げが利用できません。');return;
    }
    try{window.ponoVoice467?.stop(false);}catch(_){}
    try{window.speechSynthesis.cancel();}catch(_){}
    token++;
    playing=true;
    state();
    readSentence(token);
  }
  function enhance(d){
    if(d.querySelector('.v468-panel'))return;
    dialog=d;
    const panel=el('section','panel');panel.setAttribute('aria-label','文章をつづけて聞く');
    panel.append(el('h3','heading','📖 つづけて聞く'));
    panel.append(el('p','explain','いまの文から、最後まで1文ずつ読みます。次の文までは少し間をあけます。'));
    const actions=el('div','actions');
    actions.append(button('▶ この文からつづけて聞く',start,'play'),button('■ 連続読みを止める',()=>clear('連続読みを止めました。'),'stop'));
    panel.append(actions);
    const note=el('p','status','自分で「つづけて聞く」を押したときだけ読み始めます。');
    note.setAttribute('role','status');note.setAttribute('aria-live','polite');
    panel.append(note);
    const voice=d.querySelector('.v467-panel');
    if(voice)voice.insertAdjacentElement('afterend',panel);
    else d.querySelector('.v466-count')?.insertAdjacentElement('beforebegin',panel);
    state();
    d.addEventListener('click',event=>{
      if(advancing||!playing)return;
      const target=event.target;
      if(!(target instanceof Element))return;
      if(target.closest('.v466-prev,.v466-next,.v466-finish,.v466-speak,.v467-speed,.v467-listen,.v467-stop')){
        clear('手動操作に切り替えました。必要ならもう一度つづけて聞けます。');
      }
    },true);
    d.addEventListener('cancel',()=>clear(),{once:true});
    d.addEventListener('close',()=>{if(dialog===d){clear();dialog=null;}},{once:true});
  }
  function refresh(){
    const current=document.querySelector('dialog.v466-dialog[open]');
    if(dialog&&(!dialog.isConnected||!dialog.open||dialog!==current)){
      clear();dialog=null;
    }
    if(current?.querySelector('.v467-panel'))enhance(current);
  }
  function schedule(){
    if(queued)return;queued=true;
    requestAnimationFrame(()=>{queued=false;refresh();});
  }
  new MutationObserver(schedule).observe(document.body,{childList:true,subtree:true});
  window.ponoVoice468={refresh,stop:clear};
  schedule();
})();
