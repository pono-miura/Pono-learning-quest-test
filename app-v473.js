/* Pono Learning Quest v473 (v472に直接追加)
 * 選択式の全文読み上げと「現在読んでいる文だけ」の黄色いハイライト。
 * 教材、解答、採点、学習履歴は一切変更しない。自動再生しない。
 */
(()=>{'use strict';
 if(window.ponoOptionalVoice473)return;
 const ROOT=document.getElementById('app');if(!ROOT)return;
 const TARGETS=[
  '.v454-overlay .v454-child .v454-prompt','.v453-child .v453-prompt-line',
  '.v463-page .v463-prompt','.v451-page .v451-prompt-text',
  '.v449-page .v449-question','.v449-page .v449-prompt',
  '.v445-page .v445-question','.v446-page .v446-question',
  '.v447-page .v447-question','.v448-page .v448-question',
  '.v440-page .v440-question','.v441-page .v441-prompt',
  '.v442-page .v442-prompt','.v443-page .v443-prompt',
  '.v444-page .v444-prompt','.v439-page .v439-card > p',
  '.v437-page .v437-prompt','.v436-shell .v436-word',
  '.v435-page .v435-word','.v434-page .v434-practice .v434-word'
 ];
 let launcher=null,dialog=null,sentences=[],position=0,playing=false,serial=0,scheduled=false;
 let waiting=null,currentVoice=null,sourceID=null;
 const RATES={normal:.90,slow:.68};
 function learner(){
   try{if(typeof profile!=='undefined'&&profile?.id!=null)return String(profile.id)}catch(_){}
   return '';
 }
 function visible(el){if(!el?.isConnected||el.hidden||el.closest('[hidden],[aria-hidden="true"]'))return false;
   const style=getComputedStyle(el);return style.display!=='none'&&style.visibility!=='hidden'&&el.getClientRects().length>0;
 }
 function question(){for(const sel of TARGETS)for(const el of document.querySelectorAll(sel)){
   if(visible(el)&&el.textContent.trim())return el;
 }return null;}
 function split(text){
   const clean=String(text||'').replace(/[\s\u00a0]+/g,' ').trim();
   if(!clean)return [];
   return (clean.match(/[^。！？!?]+[。！？!?]*/gu)||[clean]).map(s=>s.trim()).filter(Boolean);
 }
 function element(tag,cls,label){const n=document.createElement(tag);if(cls)n.className='v473-'+cls;if(label!==undefined)n.textContent=label;return n;}
 function button(cls,label,fn){const n=element('button',cls,label);n.type='button';n.addEventListener('click',fn);return n;}
 function message(text){const el=dialog?.querySelector('.v473-message');if(el)el.textContent=text;}
 function clearHighlight(){for(const el of dialog?.querySelectorAll('.v473-sentence[aria-current]')||[])el.removeAttribute('aria-current');}
 function highlight(i){clearHighlight();const n=dialog?.querySelector(`.v473-sentence[data-index="${i}"]`);if(n){n.setAttribute('aria-current','true');n.scrollIntoView?.({block:'nearest',behavior:'instant'});}}
 function stop(note){
   serial++;playing=false;currentVoice=null;
   if(waiting!==null){clearTimeout(waiting);waiting=null;}
   try{window.speechSynthesis?.cancel();}catch(_){}
   clearHighlight();
   const play=dialog?.querySelector('.v473-play');if(play)play.disabled=false;
   if(note)message(note);
 }
 function speechReady(){return typeof window.SpeechSynthesisUtterance==='function'&&!!window.speechSynthesis;}
 function readOne(id){
   if(!dialog?.isConnected||!dialog.open||!playing||id!==serial)return;
   if(position>=sentences.length){stop('最後まで読み終わりました。');return;}
   const text=sentences[position];
   try{
     const utter=new SpeechSynthesisUtterance(text);currentVoice=utter;
     utter.lang='ja-JP';utter.rate=RATES[dialog.dataset.speed]||RATES.normal;
     const voices=window.speechSynthesis.getVoices?.()||[];
     const jp=voices.find(v=>v.lang==='ja-JP')||voices.find(v=>v.lang?.toLowerCase().startsWith('ja'));
     if(jp)utter.voice=jp;
     utter.onstart=()=>{
       if(id!==serial||!playing||currentVoice!==utter)return;
       highlight(position);
       message(`${position+1} / ${sentences.length} 文目を読んでいます。`);
     };
     utter.onend=()=>{
       if(id!==serial||!playing||currentVoice!==utter)return;
       currentVoice=null;clearHighlight();position++;
       if(position>=sentences.length){stop('最後まで読み終わりました。');return;}
       message('次の文に進みます。');
       waiting=setTimeout(()=>{waiting=null;readOne(id);},350);
     };
     utter.onerror=ev=>{
       if(id!==serial||!playing||currentVoice!==utter)return;
       const reason=ev?.error==='canceled'||ev?.error==='interrupted'?'音声を止めました。':'音声を再生できませんでした。文章をそのまま読むこともできます。';
       stop(reason);
     };
     window.speechSynthesis.speak(utter);
   }catch(_){stop('この端末では音声を再生できません。文章をそのまま読むこともできます。');}
 }
 function start(at){
   if(!dialog?.open)return;
   stop();
   if(!speechReady()){message('この端末では音声を再生できません。文字はそのまま読めます。');return;}
   position=Number.isInteger(at)?at:0;playing=true;
   const play=dialog.querySelector('.v473-play');if(play)play.disabled=true;
   message('読み上げを準備しています。');readOne(serial);
 }
 function rate(){
   try{
     const id=sourceID;if(!id||id==='trial')return 'normal';
     const s=localStorage.getItem('pono473-rate:'+id)||localStorage.getItem('pono467-voice-speed:'+id);
     return s==='slow'?'slow':'normal';
   }catch(_){return 'normal';}
 }
 function changeSpeed(val){
   if(!dialog||!RATES[val])return;
   if(playing)stop('速さを変えました。もう一度「読み上げる」を押してください。');
   dialog.dataset.speed=val;
   for(const b of dialog.querySelectorAll('[data-rate]'))b.setAttribute('aria-pressed',String(b.dataset.rate===val));
   try{if(sourceID&&sourceID!=='trial')localStorage.setItem('pono473-rate:'+sourceID,val)}catch(_){}
 }
 function close(){stop();if(dialog){const d=dialog;dialog=null;try{if(d.open)d.close()}catch(_){}d.remove();}}
 function open(){
   const p=question();if(!p)return;
   const chunks=split(p.textContent);if(!chunks.length)return;
   close();sentences=chunks;sourceID=learner();position=0;
   const d=document.createElement('dialog');d.className='v473-dialog';d.setAttribute('aria-label','問題文を聞く');
   const inside=element('div','inside');
   const title=element('h2','title','🔊 問題文を聞く');inside.append(title);
   inside.append(element('p','help','読み上げを使わずに読んでも大丈夫。必要なときだけ聞いてね。'));
   const reading=element('p','reading');reading.setAttribute('aria-label','問題文');
   chunks.forEach((s,i)=>{
     const span=element('span','sentence',s);span.dataset.index=String(i);
     span.title='この文から聞く';
     span.addEventListener('click',()=>{if(dialog===d)start(i);});
     reading.append(span);
     if(i<chunks.length-1)reading.append(document.createTextNode(' '));
   });
   inside.append(reading);
   const speeds=element('div','speeds');speeds.setAttribute('role','group');speeds.setAttribute('aria-label','読み上げる速さ');
   speeds.append(element('span','speedlabel','速さ：'));
   for(const [value,label] of [['normal','♪ ふつう'],['slow','🐢 ゆっくり']]){
     const b=button('speed',label,()=>changeSpeed(value));b.dataset.rate=value;speeds.append(b);
   }
   inside.append(speeds);
   const actions=element('div','actions');
   actions.append(button('play','▶ 読み上げる',()=>start(0)),button('stop','■ 音を止める',()=>stop('音を止めました。')));
   inside.append(actions);
   const info=element('p','message','再生すると、今読んでいる文だけ黄色くなります。');info.setAttribute('role','status');info.setAttribute('aria-live','polite');inside.append(info);
   const back=button('close','問題にもどる',close);inside.append(back);
   const detail=element('details','more');const sum=element('summary','more-title','📖 1文ずつ読む方法も見る');detail.append(sum);
   detail.append(element('p','more-note','1文ずつ大きく表示したいときは、以前の読みガイドも使えます。'));
   detail.append(button('old','1文ずつ読む',()=>{close();window.ponoReadingGuide466?.open();}));inside.append(detail);
   d.append(inside);document.body.append(d);dialog=d;
   d.dataset.speed=rate();changeSpeed(d.dataset.speed);
   d.addEventListener('close',()=>{if(dialog===d){stop();dialog=null;}d.remove();},{once:true});
   try{d.showModal()}catch(_){d.setAttribute('open','');}
 }
 function refresh(){
   if(!launcher){launcher=button('launch','🔊 問題文を聞く',open);launcher.setAttribute('aria-label','必要なときだけ問題文を読み上げる');document.body.append(launcher);}
   const p=question();launcher.hidden=!p;
   if(dialog&&(learner()!==sourceID||!p))close();
 }
 function schedule(){if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;refresh();});}
 document.body.classList.add('v473-available');
 new MutationObserver(schedule).observe(ROOT,{childList:true,subtree:true});
 window.ponoOptionalVoice473={open,close,split,stop,refresh};
 schedule();
})();
