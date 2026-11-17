/* Pono Learning Quest v484 — 既存の小学6年教材への入口を復旧。
 * 既存教材・問題・採点・学習記録・保護者/管理者画面には触れません。
 */
(()=>{
  'use strict';
  if (window.ponoLegacy484) return;
  const root=document.getElementById('app');
  if(!root) return;
  const subjects={
    '国語':{key:'国語',name:'国語',desc:'これまでの文章読解・言葉・記述の単元と問題を開きます。'},
    '算数':{key:'算数',name:'算数',desc:'これまでの計算・図形・割合などの単元と問題を開きます。'},
    '理科':{key:'理科',name:'理科',desc:'これまでの物の燃え方・水溶液・生命・地球などの単元と問題を開きます。'},
    '社会':{key:'社会',name:'社会',desc:'以前の政治・日本の歴史・世界の中の日本の大単元と詳しい小単元を開きます。'},
    '英語':{key:'外国語',name:'英語',desc:'これまでの英語単元一覧と音声・問題を開きます。新しい単語練習は別のカードからも開けます。'}
  };
  const style=document.createElement('style');
  style.textContent=`
    .p484-course-restore{padding:17px;margin:17px 0;border:2px solid #548e84;border-radius:18px;background:#f0f9f5;color:#224a47}
    .p484-course-restore h2{font-size:20px;line-height:1.5;margin:0 0 10px}
    .p484-course-restore p{font-size:15px;line-height:1.7;margin:0 0 12px}
    .p484-course-restore button{display:block;width:100%;border:0;border-radius:13px;background:#186e81;color:#fff;font-size:18px;font-weight:bold;padding:18px 10px;min-height:58px;cursor:pointer}
    .p484-course-restore small{display:block;margin-top:10px;line-height:1.5;color:#426f67}
    html.p484-legacy-view{overflow:auto!important;height:auto!important}
    body.p484-legacy-view{overflow-x:hidden!important;overflow-y:auto!important;height:auto!important}
    body.p484-legacy-view .v480-hub{display:none!important}
    .p484-toolbar{position:sticky;top:0;z-index:2147483270;display:flex;align-items:center;justify-content:space-between;gap:10px;background:#fffdf8;border-bottom:2px solid #8bb7aa;padding:9px 12px;box-shadow:0 2px 6px #182d3315}
    .p484-toolbar button{border:1px solid #80a99f;border-radius:10px;background:#eaf5f0;color:#1e554a;padding:11px 14px;font-size:15px;font-weight:bold;min-height:48px;cursor:pointer}
    .p484-toolbar span{font-size:14px;line-height:1.5;color:#35545b}
    @media(max-width:420px){.p484-toolbar span{font-size:12px}.p484-toolbar button{font-size:14px}}
  `;
  document.head.appendChild(style);
  let oldOpen=false,lastSubject='',pending=false;
  const roleChild=()=>window.ponoRoles476?.role?.()==='child';
  const status=()=>window.ponoNav480?.status?.();
  function toolbar(){
    let bar=document.getElementById('p484-toolbar');
    if(bar)return;
    bar=document.createElement('div');bar.id='p484-toolbar';bar.className='p484-toolbar';
    const b=document.createElement('button');b.type='button';b.textContent='← 学年・教科に戻る';b.addEventListener('click',leave);
    const label=document.createElement('span');label.textContent=`小学6年 ${lastSubject}・以前の詳しい教材`;
    bar.append(b,label);document.body.insertBefore(bar,root);
  }
  function leave(){
    oldOpen=false;
    document.documentElement.classList.remove('p484-legacy-view');
    document.body.classList.remove('p484-legacy-view');
    document.getElementById('p484-toolbar')?.remove();
    try{window.speechSynthesis?.cancel?.()}catch(_){}
    window.ponoNav480?.open?.();
  }
  function enter(s){
    if(!roleChild()||!subjects[s])return;
    const key=subjects[s].key;
    if(typeof subjectGradeTerms!=='function'){
      window.alert('以前の教材一覧を読み込めませんでした。新しい教材は削除されていません。');return;
    }
    oldOpen=true;lastSubject=s;
    document.documentElement.classList.add('p484-legacy-view');
    document.body.classList.add('p484-legacy-view');
    try{
      if(window.ponoGrade6Updates481?.close && document.body.classList.contains('pono481-open'))window.ponoGrade6Updates481.close();
      subjectGradeTerms(key,6);
      toolbar();
      if(!root.querySelector('button, .unit-pick'))throw new Error('旧教材に進むボタンを確認できません');
      window.scrollTo?.(0,0);
    }catch(err){
      console.warn('v484 existing-course route',err);
      leave();
      window.alert('以前の教材画面を開けませんでした。教材は削除されていません。');
    }
  }
  function inject(){
    if(oldOpen||!roleChild())return;
    const st=status();
    if(st?.grade!==6||st?.view!=='units'||!subjects[st.subject])return;
    const target=document.querySelector('.v480-inner');
    if(!target||target.querySelector('.p484-course-restore'))return;
    const sub=subjects[st.subject],card=document.createElement('section');
    card.className='p484-course-restore';
    const h=document.createElement('h2');h.textContent=`📚 小学6年・${sub.name}の詳しい単元に進む`;
    const p=document.createElement('p');p.textContent=sub.desc;
    const b=document.createElement('button');b.type='button';b.textContent='単元一覧 → 学ぶ・練習・テスト';
    b.addEventListener('click',()=>enter(st.subject));
    const note=document.createElement('small');note.textContent='以前の教材をそのまま使用します。問題・採点・学習記録を作り直す操作ではありません。';
    card.append(h,p,b,note);
    const header=target.querySelector('header');
    if(header)header.insertAdjacentElement('afterend',card);else target.prepend(card);
  }
  function sync(){
    if(pending)return;
    pending=true;
    requestAnimationFrame(()=>{
      pending=false;
      if(oldOpen){
        if(!roleChild())leave();
        else{
          const title=root.querySelector('.top h1')?.textContent?.trim()||'';
          if(/^(?:🌱\s*)?Pono Learning Quest/.test(title))leave();
          else toolbar();
        }
      }else inject();
    });
  }
  const obs=new MutationObserver(sync);
  obs.observe(document.body,{childList:true,subtree:true});
  window.ponoLegacy484={enter,leave,version:484};
  sync();
})();
