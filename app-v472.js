/* Pono Learning Quest v472｜文に集中する表示
 * v471のコンパクト操作から、文字を中心とした表示に切り替える任意機能。
 * 既存の本文・教材・採点・学習履歴・学習者情報・設定保存を変更しない。
 */
(()=>{'use strict';
 if(window.ponoFocus472)return;
 let active=null, countObserver=null, buttonObservers=[], scheduled=false;
 const selector='dialog.v466-dialog[open]';
 const find=(d,s)=>d?.querySelector(s)||null;
 const elem=(tag,cls,label)=>{const n=document.createElement(tag);if(cls)n.className=cls.split(/\s+/).map(c=>'v472-'+c).join(' ');if(label!==undefined)n.textContent=label;return n;};
 const button=(cls,label,fn)=>{const n=elem('button','button '+cls,label);n.type='button';n.addEventListener('click',fn);return n;};
 function forward(d,sel){const n=find(d,sel);if(!n||n.disabled)return false;n.click();return true;}
 function stopAudio(){try{window.ponoVoice468?.stop();}catch(_){}try{window.ponoVoice467?.stop(false);}catch(_){}}
 function update(d){
   if(d!==active||!d.isConnected||!d.open)return;
   for(const [short,original] of [['.v472-prev','.v466-prev'],['.v472-next','.v466-next']]){
     const b=find(d,short), from=find(d,original);
     if(b&&from)b.disabled=from.disabled;
   }
   const focus=d.classList.contains('v472-focus');
   const toggle=find(d,'.v472-toggle');
   if(toggle){
     toggle.textContent=focus?'↩ いつもの操作を表示':'👀 文に集中して読む';
     toggle.setAttribute('aria-pressed',String(focus));
   }
   const info=find(d,'.v472-status');
   if(info){const s=focus?'文だけを見やすくしました。必要なボタンは下にあります。':'これまでの操作をすべて表示しています。';if(info.textContent!==s)info.textContent=s;}
 }
 function toggleFocus(d){
   if(d!==active)return;
   stopAudio();
   const focus=d.classList.toggle('v472-focus');
   if(focus){const details=find(d,'.v471-details');if(details)details.open=false;}
   update(d);
   d.scrollTop=0;
 }
 function disconnect(){
   countObserver?.disconnect();countObserver=null;
   buttonObservers.forEach(o=>o.disconnect());buttonObservers=[];
   if(active){active.classList.remove('v472-focus');active=null;}
 }
 function enhance(d){
   if(find(d,'.v472-switch')){active=d;update(d);return;}
   if(!find(d,'.v471-toolbar')||!find(d,'.v466-reading'))return;
   const reading=find(d,'.v466-reading');
   const sw=elem('div','switch');
   const t=button('toggle','👀 文に集中して読む',()=>toggleFocus(d));
   t.setAttribute('aria-pressed','false');
   sw.append(t);
   reading.insertAdjacentElement('beforebegin',sw);
   const bar=elem('section','simple');bar.setAttribute('aria-label','文に集中して読むときの操作');
   const row=elem('div','actions');
   row.append(
     button('listen','🔊 この文を聞く',()=>{
       if(!('speechSynthesis' in window)||!('SpeechSynthesisUtterance' in window)){
         const note=find(d,'.v472-audio-status');if(note)note.textContent='この端末では音声を使えない場合があります。';return;
       }
       forward(d,'.v467-listen');
     }),
     button('stop','■ 音を止める',()=>{stopAudio();const note=find(d,'.v472-audio-status');if(note)note.textContent='音を止めました。';}),
     button('prev','← 前の文',()=>forward(d,'.v466-prev')),
     button('next','次の文 →',()=>forward(d,'.v466-next')),
   );
   bar.append(row);
   bar.append(button('return','問題にもどる',()=>forward(d,'.v466-finish')));
   const audio=elem('p','audio-status','');audio.setAttribute('aria-live','polite');bar.append(audio);
   reading.insertAdjacentElement('afterend',bar);
   const info=elem('p','status','');info.setAttribute('aria-live','polite');sw.append(info);
   active=d;
   const count=find(d,'.v466-count');
   if(count){countObserver=new MutationObserver(()=>update(d));countObserver.observe(count,{childList:true,subtree:true,characterData:true});}
   for(const c of ['.v466-prev','.v466-next']){
     const el=find(d,c);if(!el)continue;
     const ob=new MutationObserver(()=>update(d));ob.observe(el,{attributes:true,attributeFilter:['disabled']});buttonObservers.push(ob);
   }
   d.addEventListener('close',()=>{if(active===d)disconnect();},{once:true});
   update(d);
 }
 function refresh(){const d=document.querySelector(selector);if(active&&active!==d)disconnect();if(d)enhance(d);}
 function schedule(){if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;refresh();});}
 new MutationObserver(schedule).observe(document.body,{childList:true,subtree:true});
 window.ponoFocus472={refresh};schedule();
})();