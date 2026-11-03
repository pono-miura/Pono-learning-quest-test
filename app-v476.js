/* Pono Learning Quest v476 — Role-based navigation (trial only).
 * Preserves all existing course content, family page, admin monthly report,
 * and independent attendance-submission workflow. No authorization is implemented.
 */
(()=>{'use strict';
  if(window.ponoRoles476)return;
  const ROOT=document.getElementById('app');
  if(!ROOT)return;
  let role='choose', panel=null, switcher=null, note=null;
  const allowed=['choose','child','family','staff'];
  function el(tag,cls,txt){const n=document.createElement(tag);if(cls)n.className='v476-'+cls;if(txt!==undefined)n.textContent=txt;return n;}
  function btn(text,fn,cls='button') {const n=el('button',cls,text);n.type='button';n.addEventListener('click',fn);return n;}
  function alertInPanel(text){if(note){note.textContent=text;note.hidden=false;}}
  function homeView(){
    try { if(typeof home==='function'){home();return true;} } catch(_){}
    alertInPanel('トップ画面への移動ができませんでした。ページを再読み込みしてください。');
    return false;
  }
  function closeSpeech(){
    try{window.ponoOptionalVoice473?.close();}catch(_){}
    try{window.ponoReadingGuide466?.close();}catch(_){}
    try{window.ponoVoice468?.stop();}catch(_){}
    try{window.speechSynthesis?.cancel();}catch(_){}
  }
  function setRole(next){
    if(!allowed.includes(next))return;
    role=next;
    for(const v of allowed)document.documentElement.classList.toggle('v476-role-'+v,v===next);
    const show=next==='choose'||next==='family'||next==='staff';
    panel.hidden=!show;
    switcher.hidden=next==='choose';
    if(show)draw();
  }
  function launchViaHome(text){
    closeSpeech();
    if(!homeView())return;
    const candidate=[...ROOT.querySelectorAll('button')].find(b=>b.textContent.includes(text));
    if(!candidate){alertInPanel('以前の画面を開けませんでした。旧ファイルの読み込みを確認してください。');return;}
    panel.hidden=true;
    candidate.click();
  }
  function launchFunction(name,display){
    const fn=window[name];
    if(typeof fn!=='function'){
      alertInPanel(display+'を開けませんでした。以前の機能の読み込みを確認してください。');return;
    }
    closeSpeech();
    panel.hidden=true;
    try{fn();}catch(_){panel.hidden=false;alertInPanel(display+'の表示中に問題が発生しました。学習記録は消さずに確認してください。');}
  }
  function chooseChild(){
    closeSpeech();
    if(!homeView())return;
    setRole('child');
    try{window.ponoLearningNav475?.open();}catch(_){}
  }
  function chooseRole(next){
    if(next==='child')return chooseChild();
    closeSpeech();
    if(!homeView())return;
    setRole(next);
  }
  function chooseAgain(){
    closeSpeech();
    if(!homeView())return;
    setRole('choose');
    try{window.scrollTo(0,0)}catch(_){}
  }
  function card(title,description,action,label){
    const c=el('section','card');
    c.append(el('h2','card-title',title),el('p','card-desc',description),btn(label,action,'card-action'));
    return c;
  }
  function draw(){
    const main=panel.querySelector('.v476-main');
    main.replaceChildren();
    const heading=el('header','header');
    heading.append(el('p','brand','🌱 Pono Learning Quest'));
    heading.append(el('h1','title',role==='choose'?'使う人をえらんでね':role==='family'?'🏠 保護者のページ':'📝 Pono 管理者のページ'));
    main.append(heading);
    note=el('p','notice','');note.setAttribute('role','status');note.hidden=true;
    if(role==='choose'){
      main.append(el('p','lead','はじめに、使う人を選びましょう。'));
      main.append(card('🧒 子どもの学習','在籍学年 → 教科 → 単元から、今日の学習を始めます。',()=>chooseRole('child'),'学習を始める'));
      main.append(card('🏠 保護者','自分の子どもの今週の学習状況や、学校共有用の画面を確認します。',()=>chooseRole('family'),'保護者ページを見る'));
      main.append(card('📝 Pono 管理者','時間割・学習記録・月間学習報告書・支援の管理を行います。',()=>chooseRole('staff'),'管理者ページを見る'));
      main.append(el('p','caution','【試験版】現在は本物のログイン認証がありません。管理者・保護者ページは安全にアクセス制限されていないため、子どもたちの実名や機微な情報を登録しないでください。'));
    }else if(role==='family'){
      main.append(el('p','lead','これまで作った保護者用画面をそのまま利用できます。'));
      main.append(card('📊 今週の学び','学習した日・時間、教科・単元、取り組みの様子を確認します。',()=>launchViaHome('保護者　自分の子の学び'),'今週の学習を見る'));
      main.append(el('p','caution','※ この試験版の保護者画面は「現在この端末で選択中の学習者」の記録を表示します。本人認証や、保護者ごとの閲覧制限はまだありません。'));
      main.append(btn('← 入口に戻る',chooseAgain,'back'));
    }else if(role==='staff'){
      main.append(el('p','lead','すでに作成したPonoの管理機能をまとめています。出席扱いの申請・通所報告書はこれまでどおり別に作成します。'));
      main.append(card('📄 月間学習報告書','日付・教科・単元・時間・状況をまとめ、学校共有コメントを編集して印刷／PDF保存。',()=>launchFunction('monthlyReport','月間学習報告書'),'月間報告書を作る'));
      main.append(card('🗂️ 詳細な学習記録','各学習の日時、内容、取り組み方などを確認。',()=>launchFunction('report','詳細な学習記録'),'詳細記録を見る'));
      main.append(card('📋 先生用の管理ホーム','学習目標、子どもへの受け渡し、振り返り、学校・保護者用資料、バックアップ。',()=>launchFunction('ponoTeacher461','先生用ホーム'),'管理ホームを開く'));
      main.append(card('📅 今週の時間割','子どもに提案する教科と単元を設定します。',()=>launchFunction('plan','週間時間割'),'時間割を設定する'));
      main.append(card('🧭 試用チェック','子どもの操作や困ったところを記録します。',()=>launchFunction('ponoPilot464','試用チェック'),'試用チェックを開く'));
      main.append(card('🗃️ 記録のバックアップ','この端末内の学習記録をファイルに保存します。',()=>launchFunction('ponoBackup456','バックアップ'),'バックアップを開く'));
      main.append(el('p','caution','【試験運用中】ここはパスワードで保護されていません。別の端末にある学習履歴を自動集約する機能も未完成です。実データの本格運用は、認証・権限分離・クラウド同期を整えてから行ってください。'));
      main.append(btn('← 入口に戻る',chooseAgain,'back'));
    }
    main.append(note);
  }
  function start(){
    panel=el('div','portal');panel.setAttribute('role','region');panel.setAttribute('aria-label','Pono Learning Quest 利用者の入口');
    const main=el('main','main');panel.append(main);document.body.append(panel);
    switcher=btn('⇄ 入口を選ぶ',chooseAgain,'switch');switcher.setAttribute('aria-label','子ども・保護者・管理者の入口を選び直す');document.body.append(switcher);
    setRole('choose');
  }
  window.ponoRoles476={open:chooseAgain,chooseChild,chooseFamily:()=>chooseRole('family'),chooseStaff:()=>chooseRole('staff'),role:()=>role};
  start();
})();
