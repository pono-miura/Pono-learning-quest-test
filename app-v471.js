/* Pono Learning Quest v471 | 読みガイドのコンパクト表示
 * v466〜v470の実際のボタンを移動し、使いやすい短い操作に中継する。
 * 教材、採点、保存情報、読み上げの仕組みは変更しない。
 */
(()=>{'use strict';
 if(window.ponoCompact471)return;
 let active=null, watched=[], queued=false;
 const q=(d,s)=>d?.querySelector(s)||null;
 const create=(tag,cls,label)=>{const n=document.createElement(tag);if(cls)n.className=cls.split(/\s+/).filter(Boolean).map(v=>'v471-'+v).join(' ');if(label!==undefined)n.textContent=label;return n;};
 function button(cls,label,fn){const b=create('button','button '+cls,label);b.type='button';b.addEventListener('click',fn);return b;}
 function press(d,selector){const original=q(d,selector);if(original && !original.disabled){original.click();return true;}return false;}
 function position(d){const txt=q(d,'.v466-count')?.textContent||'';const m=txt.match(/(\d+)\s*\/\s*(\d+)/);return m?{at:Number(m[1]),total:Number(m[2])}:null;}
 function update(d){
   if(active!==d||!d.isConnected||!d.open)return;
   const p=position(d);const counter=q(d,'.v471-counter');
   if(counter && p){const t=`${p.at} / ${p.total} 文`;if(counter.textContent!==t)counter.textContent=t;}
   const original=q(d,'.v470-toggle');const mark=q(d,'.v471-mark');
   if(mark&&original){const yes=original.getAttribute('aria-pressed')==='true';const t=yes?'✓ チェック済み':'✓ 読んだ・聞いた';if(mark.textContent!==t)mark.textContent=t;mark.setAttribute('aria-pressed',String(yes));}
   const prev=q(d,'.v471-prev'),next=q(d,'.v471-next'),start=q(d,'.v471-play');
   if(prev)prev.disabled=!!q(d,'.v466-prev')?.disabled;
   if(next)next.disabled=!!q(d,'.v466-next')?.disabled;
   if(start)start.disabled=!!q(d,'.v468-play')?.disabled;
 }
 function disconnect(){for(const o of watched)o.disconnect();watched=[];active=null;}
 function enhance(d){
   if(q(d,'.v471-toolbar')){active=d;update(d);return;}
   const inside=q(d,'.v466-inside');
   const reading=q(d,'.v466-reading');
   if(!inside||!reading||!q(d,'.v467-panel')||!q(d,'.v468-panel')||!q(d,'.v469-panel')||!q(d,'.v470-panel'))return;
   const help=q(d,'.v466-help');if(help)help.textContent='大きな文字で、1文ずつ。必要な操作だけを表示しています。';
   const counter=create('p','counter','');counter.setAttribute('aria-live','off');
   reading.insertAdjacentElement('beforebegin',counter);
   const tool=create('section','toolbar');tool.setAttribute('aria-label','読みガイドの基本操作');
   tool.append(create('p','toolbar-title','よく使う操作'));
   const controls=create('div','controls');
   controls.append(
     button('listen','🔊 1文を聞く',()=>press(d,'.v467-listen')),
     button('play','▶ つづけて聞く',()=>press(d,'.v468-play')),
     button('stop','■ 音を止める',()=>{
       // v467をクリックすると、v468のイベント処理も連続読みを止める。
       if(!press(d,'.v467-stop'))press(d,'.v468-stop');
     }),
     button('mark','✓ 読んだ・聞いた',()=>press(d,'.v470-toggle')),
     button('prev','← 前の文',()=>press(d,'.v466-prev')),
     button('next','次の文 →',()=>press(d,'.v466-next')),
   );
   tool.append(controls);
   const returnBtn=button('return','問題にもどる',()=>press(d,'.v466-finish'));
   tool.append(returnBtn);
   reading.insertAdjacentElement('afterend',tool);
   const details=create('details','details');
   const summary=create('summary','summary','⚙️ くわしい設定・番号で移動');
   details.append(summary);
   details.append(create('p','details-intro','読み上げの速さ・番号を押して移動・チェックを全部外す操作はこちら。'));
   for(const selector of ['.v467-panel','.v468-panel','.v469-panel','.v470-panel','.v466-actions','.v466-note','.v466-finish']){
      
      const element=q(d,selector);
      if(!element)continue;
      // v466の「前・次」行は残したまま、詳細側で操作できるようにする。
      details.append(element);
   }
   const oldNext=q(d,'.v466-next');
   const oldRow=oldNext?.closest('.v466-actions');if(oldRow&&!details.contains(oldRow))details.append(oldRow);
   tool.insertAdjacentElement('afterend',details);
   details.addEventListener('toggle',()=>update(d));
   active=d;
   // 既存操作で進んだ場合も短いボタンの状態を同期する。
   const observe=(node,options)=>{if(!node)return;const ob=new MutationObserver(()=>update(d));ob.observe(node,options);watched.push(ob);};
   observe(q(d,'.v466-count'),{subtree:true,characterData:true,childList:true});
   observe(q(d,'.v470-toggle'),{attributes:true,attributeFilter:['aria-pressed']});
   for(const sel of ['.v466-prev','.v466-next','.v468-play'])observe(q(d,sel),{attributes:true,attributeFilter:['disabled']});
   d.addEventListener('close',()=>{if(active===d)disconnect();},{once:true});
   update(d);
 }
 function refresh(){const d=document.querySelector('dialog.v466-dialog[open]');if(active&&active!==d)disconnect();if(d)enhance(d);}
 function schedule(){if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;refresh();});}
 new MutationObserver(schedule).observe(document.body,{childList:true,subtree:true});
 window.ponoCompact471={refresh};schedule();
})();