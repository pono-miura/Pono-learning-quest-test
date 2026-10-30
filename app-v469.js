/* Pono Learning Quest v469 | 文の道しるべ：今何文目かを表示し、番号から読み直せる。
 * 「📖 1文ずつ」内の表示・移動だけを拡張。元の問題・採点・履歴・音声設定は変更しない。
 */
(()=>{'use strict';
 if(window.ponoGuide469)return;
 let active=null,observer=null,scheduled=false;
 const sel='dialog.v466-dialog[open]';
 function e(tag,cls,txt){const n=document.createElement(tag);if(cls)n.className='v469-'+cls;if(txt!==undefined)n.textContent=txt;return n;}
 function position(d){
   const t=d?.querySelector('.v466-count')?.textContent||'';
   const m=t.match(/(\d+)\s*\/\s*(\d+)/);
   if(!m)return null;
   const at=Number(m[1]),total=Number(m[2]);
   return at>=1&&total>=1&&at<=total&&total<=100?{at,total}:null;
 }
 function sync(d){
   if(!d?.isConnected||!d.open)return;
   const p=position(d);if(!p)return;
   const panel=d.querySelector('.v469-panel');if(!panel)return;
   const note=panel.querySelector('.v469-note'),bar=panel.querySelector('.v469-progress'),fill=panel.querySelector('.v469-fill'),nav=panel.querySelector('.v469-numbers');
   if(note&&note.dataset.value!==`${p.at}/${p.total}`){note.textContent=`ぜんぶで ${p.total} 文。いまは ${p.at} 文目だよ。`;note.dataset.value=`${p.at}/${p.total}`;}
   if(bar){bar.setAttribute('aria-valuenow',String(p.at));bar.setAttribute('aria-valuemax',String(p.total));bar.setAttribute('aria-valuetext',`${p.total}文中${p.at}文目`);}
   if(fill)fill.style.width=(100*p.at/p.total)+'%';
   if(nav && Number(nav.dataset.total)!==p.total){
     nav.replaceChildren();nav.dataset.total=String(p.total);
     for(let i=1;i<=p.total;i++){
       const b=e('button','number',String(i));b.type='button';b.dataset.step=String(i);
       b.setAttribute('aria-label',`${i}文目に移動`);
       b.addEventListener('click',()=>jump(d,i));nav.append(b);
     }
   }
   if(nav)for(const b of nav.querySelectorAll('.v469-number')){
     const selected=Number(b.dataset.step)===p.at;
     if(selected)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current');
   }
 }
 function jump(d,target){
   const p=position(d);if(!p||target===p.at||target<1||target>p.total)return;
   // 読み上げ中の文を止めてから、既存の「まえ／つぎ」ボタンで移動する。
   try{window.ponoVoice468?.stop();}catch(_){}
   try{window.ponoVoice467?.stop(false);}catch(_){}
   const cls=target>p.at?'.v466-next':'.v466-prev';
   for(let j=0;j<Math.abs(target-p.at)&&j<100;j++){
     const b=d.querySelector(cls);if(!b||b.disabled)break;b.click();
   }
   sync(d);
   const reading=d.querySelector('.v466-reading');
   if(reading){try{reading.scrollIntoView({block:'nearest',behavior:'instant'});}catch(_){}}
 }
 function enhance(d){
   if(d.querySelector('.v469-panel')){active=d;return;}
   const count=d.querySelector('.v466-count');if(!count)return;
   const panel=e('section','panel');panel.setAttribute('aria-label','文の道しるべ');
   panel.append(e('h3','heading','🧭 いま、どこを読んでいるかな？'));
   const note=e('p','note','');note.setAttribute('aria-live','polite');panel.append(note);
   const bar=e('div','progress');bar.setAttribute('role','progressbar');bar.setAttribute('aria-label','文の進みぐあい');bar.setAttribute('aria-valuemin','1');
   bar.append(e('div','fill'));panel.append(bar);
   const help=e('p','help','読みたい文の番号を押すと、その文にもどれるよ。');panel.append(help);
   const numbers=e('div','numbers');numbers.setAttribute('role','group');numbers.setAttribute('aria-label','読みたい文に移動');panel.append(numbers);
   count.insertAdjacentElement('afterend',panel);active=d;
   if(observer)observer.disconnect();
   observer=new MutationObserver(()=>sync(d));observer.observe(count,{childList:true,characterData:true,subtree:true});
   d.addEventListener('close',()=>{if(active===d){observer?.disconnect();observer=null;active=null;}},{once:true});
   sync(d);
 }
 function refresh(){
   const d=document.querySelector(sel);
   if(active&&active!==d){observer?.disconnect();observer=null;active=null;}
   if(d)enhance(d);
 }
 function schedule(){if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;refresh();});}
 new MutationObserver(schedule).observe(document.body,{childList:true,subtree:true});
 window.ponoGuide469={refresh};schedule();
})();
