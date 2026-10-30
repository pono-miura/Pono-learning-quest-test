/* Pono Learning Quest v466 | 既存の表示設定を漢字の問題・復習にも適用し、問題文を1文ずつ読むガイド。
 * 元の学習画面、回答、採点、個別学習記録を変更しない。本文は保存しない。
 */
(()=>{'use strict';
if(window.ponoReadingGuide466)return;
const root=document.getElementById('app');if(!root)return;
const TARGETS=[
  '.v454-overlay .v454-child .v454-prompt',
  '.v453-child .v453-prompt-line',
  '.v463-page .v463-prompt',
  '.v451-page .v451-prompt-text',
  '.v449-page .v449-question',
  '.v449-page .v449-prompt',
  '.v445-page .v445-question','.v446-page .v446-question','.v447-page .v447-question','.v448-page .v448-question',
  '.v440-page .v440-question',
  '.v441-page .v441-prompt','.v442-page .v442-prompt','.v443-page .v443-prompt','.v444-page .v444-prompt',
  '.v439-page .v439-card > p',
  '.v437-page .v437-prompt',
  '.v436-shell .v436-word',
  '.v435-page .v435-word',
  '.v434-page .v434-practice .v434-word'
];
let floating=null,dialog=null,currentId=null,parts=[],step=0,queued=false;
function learner(){try{if(typeof profile!=='undefined'&&profile&&profile.id!==undefined&&profile.id!==null)return String(profile.id)}catch(_){ }return ''}
function visible(el){if(!el||!el.isConnected||el.hidden)return false;const s=getComputedStyle(el);return s.display!=='none'&&s.visibility!=='hidden'&&el.getClientRects().length>0&&!el.closest('[hidden],[aria-hidden="true"]')}
function prompt(){for(const q of TARGETS){const found=document.querySelectorAll(q);for(const el of found){if(visible(el)&&el.textContent.trim())return el}}return null}
function segments(s){let t=String(s||'').replace(/\s+/g,' ').trim().slice(0,420);if(!t)return [];let arr=t.match(/[^。！？!?]+[。！？!?]?/g)||[t];const out=[];for(const a of arr){const v=a.trim();if(!v)continue;if(v.length>62){const bits=v.split(/(?<=、)/);let buf='';for(const b of bits){if(buf.length+b.length>62&&buf){out.push(buf);buf=''}buf+=b}if(buf)out.push(buf)}else out.push(v)}return out.slice(0,12)}
function say(s){if(!('speechSynthesis' in window)||!('SpeechSynthesisUtterance' in window))return false;try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(s);u.lang='ja-JP';u.rate=.78;speechSynthesis.speak(u);return true}catch(_){return false}}
function node(tag,cls,txt){const e=document.createElement(tag);if(cls)e.className=cls.split(/\s+/).filter(Boolean).map(x=>'v466-'+x).join(' ');if(txt!==undefined)e.textContent=txt;return e}
function btn(label,fn,cls=''){const e=node('button','btn'+(cls?' '+cls:''),label);e.type='button';e.addEventListener('click',fn);return e}
function close(){if(dialog){try{if(dialog.open)dialog.close()}catch(_){ }dialog.remove();dialog=null}if('speechSynthesis'in window)try{speechSynthesis.cancel()}catch(_){}}
function render(){if(!dialog||!dialog.open)return;const count=dialog.querySelector('.v466-count');count.textContent=`${step+1} / ${parts.length}`;const text=dialog.querySelector('.v466-reading');text.textContent=parts[step];const prev=dialog.querySelector('.v466-prev');prev.disabled=step===0;const next=dialog.querySelector('.v466-next');next.disabled=step===parts.length-1;}
function open(){const p=prompt();if(!p)return;parts=segments(p.textContent);if(!parts.length)return;close();step=0;const d=document.createElement('dialog');d.className='v466-dialog';d.setAttribute('aria-label','問題文を一文ずつ読む');const wrap=node('div','inside');wrap.append(node('p','eyebrow','📖 問題文の読みガイド'),node('h2','heading','ひとつずつ、読んでみよう'),node('p','help','元の問題に戻って答えられるよ。正解や点数は変わりません。'));
const count=node('p','count');count.setAttribute('aria-live','polite');const text=node('p','reading');text.setAttribute('aria-live','polite');wrap.append(count,text);
const actions=node('div','actions');actions.append(btn('🔊 この文を聞く',()=>{if(!say(parts[step])){const n=d.querySelector('.v466-note');n.textContent='この環境では音声を再生できません。画面の文章を読んでください。'}},'speak'));
const row=node('div','actions');row.append(btn('← まえの文',()=>{if(step>0){step--;render()}},'prev'),btn('つぎの文 →',()=>{if(step<parts.length-1){step++;render()}},'next'));
wrap.append(actions,row,node('p','note',''),btn('問題にもどる',close,'finish'));
d.append(wrap);document.body.append(d);dialog=d;d.addEventListener('close',()=>{if(dialog===d){dialog=null;d.remove()}if('speechSynthesis'in window)try{speechSynthesis.cancel()}catch(_){}});
try{d.showModal()}catch(_){d.setAttribute('open','')}render();}
function refresh(){const who=learner();if(who!==currentId){currentId=who;close()}
if(!floating){floating=btn('📖 1文ずつ',open,'floating');floating.setAttribute('aria-label','問題文を一文ずつ大きく表示する');document.body.append(floating)}
const p=prompt();floating.hidden=!p;}
function schedule(){if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;refresh()})}
new MutationObserver(schedule).observe(root,{childList:true,subtree:true});new MutationObserver(schedule).observe(document.body,{childList:true});
window.ponoReadingGuide466={open,close,segments,refresh};schedule();
})();
