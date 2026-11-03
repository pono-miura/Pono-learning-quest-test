/* Pono Learning Quest v477 — restore legacy grade/subject unit navigation.
 * v475 searches only top-level addon cards, while original curriculum is built dynamically
 * by subjectGradeTerms(subject, grade). This patch bridges both without changing records.
 * No change to pupil data, exercises, scoring, or teacher/family modules.
 */
(()=>{'use strict';
if(window.ponoLegacyUnits477)return;
const ROOT=document.getElementById('app');if(!ROOT)return;
const MAP={japanese:'国語',math:'算数',science:'理科',social:'社会',english:'外国語',life:'生活科'};
const NAMES={japanese:'国語',math:'算数',science:'理科',social:'社会',english:'英語',life:'生活科'};
let queued=false,selectedFromMenu=false;
function current(){try{return window.ponoLearningNav475?.status?.()||null}catch(_){return null}}
function E(tag,cls,t){const e=document.createElement(tag);if(cls)e.className='v477-'+cls;if(t!=null)e.textContent=String(t);return e}
function button(label,cb){const b=E('button','primary',label);b.type='button';b.addEventListener('click',cb);return b}
function warning(text){const hub=document.querySelector('.v475-hub');const host=hub?.querySelector('.v475-inner');if(!host)return;let p=host.querySelector('.v477-warning');if(!p){p=E('p','warning');host.append(p)}p.textContent=text}
function toChildMenu(){
  try{if(typeof window.ponoRoles476?.chooseChild==='function'){window.ponoRoles476.chooseChild();return}}catch(_){}
  try{if(typeof home==='function')home();window.ponoLearningNav475?.open?.()}catch(_){}
}
function openLegacy(grade,subject){
  const g=Number(grade),s=MAP[subject];
  if(!s||!Number.isInteger(g)||g<1||g>6)return false;
  if(typeof subjectGradeTerms!=='function'){
    warning('以前の学年別の単元一覧を開けませんでした。アプリの旧教材ファイルが正しく読み込まれているか確認してください。');return false;
  }
  try{
    window.ponoOptionalVoice473?.close?.();
    selectedFromMenu=true;
    subjectGradeTerms(s,g);
    // v475's observer automatically hides its grade picker when course content opens.
    schedule();
    return true;
  }catch(e){
    warning('単元一覧を開けませんでした。「以前の教材一覧を見る」も確認してください。');
    return false;
  }
}
// When v475 has no addon-card entries, skip its misleading empty-results page.
// This capture handler only intercepts the same grade/subject choice that v475 marks
// "対応教材を確認". All other controls retain their original handlers.
function captureMissing(ev){
  const el=ev.target;
  if(!(el instanceof Element))return;
  const b=el.closest('button.v475-subject');
  if(!b||!b.querySelector('.v475-grade-note'))return;
  const hub=document.querySelector('.v475-hub');
  if(!hub||hub.hidden)return;
  const st=current();if(!st||st.mode!=='subjects'||!st.grade)return;
  const s=Object.keys(NAMES).find(k=>b.textContent.includes(NAMES[k]));
  if(!s||typeof subjectGradeTerms!=='function')return;
  ev.preventDefault();ev.stopImmediatePropagation();
  openLegacy(st.grade,s);
}
document.addEventListener('click',captureMissing,true);
function enhance(){
  const hub=document.querySelector('.v475-hub');const st=current();
  if(hub&&!hub.hidden&&st&&st.mode==='lessons'&&!st.legacy&&st.grade&&MAP[st.subject]){
    const inner=hub.querySelector('.v475-inner');
    const anchor=inner?.querySelector('.v475-empty,.v475-lessons');
    if(inner&&anchor&&!inner.querySelector('.v477-legacy-card')){
      const card=E('section','legacy-card');
      card.append(E('h2','heading',`📚 小学${st.grade}年・${NAMES[st.subject]}の単元`));
      card.append(E('p','desc','以前作成した学年別の教材も、この入口から学べます。'));
      card.append(button('この学年の単元一覧を開く',()=>openLegacy(st.grade,st.subject)));
      anchor.insertAdjacentElement('beforebegin',card);
      const empty=inner.querySelector('.v475-empty');
      if(empty)empty.textContent='この画面に表示できる追加教材はありません。上の「単元一覧を開く」から、以前の教材を選べます。';
    }
  }
  const h=ROOT.querySelector('.top h1');
  if(selectedFromMenu&&h&&/^(?:国語|算数|理科|社会|外国語|外国語活動|生活科)\s*[｜|]\s*小学[1-6]年/.test((h.textContent||'').trim())){
    const top=h.closest('.top')||h;
    if(!ROOT.querySelector('.v477-back-course')){
      const wrap=E('div','back-course');
      wrap.append(button('← 学年・教科のメニューへ戻る',toChildMenu));
      top.insertAdjacentElement('afterend',wrap);
    }
  }
}
function schedule(){if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;enhance()})}
new MutationObserver(schedule).observe(document.body,{childList:true,subtree:true});
window.ponoLegacyUnits477={open:openLegacy,refresh:enhance};
schedule();
})();
