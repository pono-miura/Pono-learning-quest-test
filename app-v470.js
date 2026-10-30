/* Pono Learning Quest v470 | 読んだ・聞いたチェック（任意）
 * v466の「📖 1文ずつ」に、本人が選んで印を付けるための補助を追加。
 * 学習内容・答え・採点・履歴は一切変更しない。端末にも保存しない。
 */
(()=>{'use strict';
 if(window.ponoCheck470) return;
 const SELECTOR='dialog.v466-dialog[open]';
 let active=null, observed=null, checked=new Set(), scheduled=false;
 function create(tag,cls,value){const e=document.createElement(tag);if(cls)e.className='v470-'+cls;if(value!==undefined)e.textContent=value;return e;}
 function position(dialog){
   const count=(dialog?.querySelector('.v466-count')?.textContent||'').trim();
   const m=count.match(/(\d+)\s*\/\s*(\d+)/);if(!m)return null;
   const at=Number(m[1]),total=Number(m[2]);
   return at>0&&total>0&&at<=total&&total<=100?{at,total}:null;
 }
 function sync(dialog){
   if(dialog!==active||!dialog?.isConnected||!dialog.open)return;
   const p=position(dialog);if(!p)return;
   const panel=dialog.querySelector('.v470-panel');if(!panel)return;
   const status=panel.querySelector('.v470-status');
   const toggle=panel.querySelector('.v470-toggle');
   const clear=panel.querySelector('.v470-clear');
   const marked=checked.has(p.at);
   if(toggle){
     toggle.textContent=marked?'↩ この文のチェックを外す':'✓ この文を確認した';
     toggle.setAttribute('aria-pressed',String(marked));
     toggle.setAttribute('aria-label',`${p.at}文目：${marked?'チェックを外す':'確認した印を付ける'}`);
   }
   if(status)status.textContent=`確認した文 ${checked.size} / ${p.total}（いま ${p.at} 文目）`;
   if(clear)clear.disabled=checked.size===0;
   // v469で使う番号に、読み終えた印だけを重ねる。番号移動の機能は変えない。
   for(const n of dialog.querySelectorAll('.v469-number[data-step]')){
     const index=Number(n.dataset.step);
     const has=checked.has(index);
     n.dataset.v470Checked=String(has);
     n.setAttribute('aria-label',`${index}文目${has?'（確認済み）':''}に移動`);
   }
 }
 function update(){sync(active);}
 function toggle(){const p=position(active);if(!p)return;
   if(checked.has(p.at))checked.delete(p.at);else checked.add(p.at);update();}
 function clearAll(){checked.clear();update();}
 function enhance(dialog){
   if(dialog.querySelector('.v470-panel')){active=dialog;return;}
   const anchor=dialog.querySelector('.v469-panel');const count=dialog.querySelector('.v466-count');
   if(!count)return;
   checked=new Set();active=dialog;
   const panel=create('section','panel');panel.setAttribute('aria-label','読んだ・聞いたチェック');
   panel.append(create('h3','heading','✅ 読んだ・聞いたチェック'));
   panel.append(create('p','help','文字を読んでも、音で聞いてもOK。確認した文に印をつけよう。印は自由に消せるよ。'));
   const actions=create('div','actions');
   const mark=create('button','toggle');mark.type='button';mark.addEventListener('click',toggle);
   const reset=create('button','clear','チェックを全部外す');reset.type='button';reset.addEventListener('click',clearAll);
   actions.append(mark,reset);panel.append(actions);
   const status=create('p','status','');status.setAttribute('role','status');status.setAttribute('aria-live','polite');panel.append(status);
   panel.append(create('p','footnote','これは自分のための目印です。点数や学習記録にはなりません。画面を閉じるとリセットされます。'));
   if(anchor)anchor.insertAdjacentElement('afterend',panel);
   else count.insertAdjacentElement('afterend',panel);
   observed?.disconnect();
   observed=new MutationObserver(()=>sync(dialog));
   observed.observe(count,{childList:true,characterData:true,subtree:true});
   // 初回・文の移動後はv469が番号を作るのを待って同期する。
   dialog.addEventListener('click',e=>{
     if(e.target instanceof Element && e.target.closest('.v466-prev,.v466-next,.v469-number'))
       queueMicrotask(()=>sync(dialog));
   });
   dialog.addEventListener('close',()=>{
     if(active===dialog){observed?.disconnect();observed=null;checked.clear();active=null;}
   },{once:true});
   sync(dialog);
 }
 function refresh(){
   const dialog=document.querySelector(SELECTOR);
   if(active&&active!==dialog){observed?.disconnect();observed=null;checked.clear();active=null;}
   if(dialog)enhance(dialog);
 }
 function schedule(){if(scheduled)return;scheduled=true;
   requestAnimationFrame(()=>{scheduled=false;refresh();});}
 new MutationObserver(schedule).observe(document.body,{childList:true,subtree:true});
 window.ponoCheck470={refresh};schedule();
})();
