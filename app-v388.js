/* Pono Learning Quest v38.8 — 試用前の安全確認と表示・読み上げチェック。
   個人情報の認証・同期は行わず、既存の教材・学習記録は変更しません。 */
(function(){
  'use strict';
  const app=document.getElementById('app');
  if(!app)return;
  const make=(tag,cls,content)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(content!=null)e.textContent=content;return e;};
  const click=(label,action,cls='soft')=>{const b=make('button',cls,label);b.type='button';b.addEventListener('click',action);return b;};
  const getProfile=()=>{try{return typeof profile!=='undefined'&&profile&&typeof profile==='object'?profile:null}catch(e){return null}};
  function returnHome(){if(typeof home==='function')home();else if(typeof child==='function')child();}
  function screen(title,back=returnHome){
    app.replaceChildren();
    const top=make('div','top');
    top.append(click('← 戻る',back,'back'),make('h1','pono388title',title));
    app.append(top);
    try{window.scrollTo(0,0)}catch(e){}
  }
  function speak(text,slow,feedback){
    try{
      if(!window.speechSynthesis||!window.SpeechSynthesisUtterance){feedback.textContent='このブラウザでは読み上げに対応していません。';return;}
      window.speechSynthesis.cancel();
      const u=new SpeechSynthesisUtterance(text);u.lang='ja-JP';u.rate=slow?0.65:0.9;
      u.onerror=()=>{feedback.textContent='読み上げできませんでした。端末の音声設定をご確認ください。'};
      window.speechSynthesis.speak(u);
      feedback.textContent=slow?'ゆっくり読み上げを開始しました。':'読み上げを開始しました。';
    }catch(e){feedback.textContent='この端末では読み上げを利用できませんでした。';}
  }
  function open(){
    screen('使う前の確認｜Pono 試用版');
    const intro=make('section','card pono388intro');
    intro.append(make('h2','','子どもたちに試してもらう前に'),make('p','','まずは大人の見守りのもとで、仮名・テスト用データを使って操作を確認しましょう。'));
    app.append(intro);
    const p=getProfile(), id=p?.id==null?'未設定':String(p.id);
    const state=make('section','card pono388current');
    state.append(make('h3','','現在の保存方式'),make('p','',`この端末の学習者ID：${id}`));
    if(id==='PONO001')state.append(make('p','pono388alert','PONO001 は初期設定のIDです。複数の子で同じIDを使うと、記録が混ざるおそれがあります。'));
    state.append(make('p','','今の試作版は、このブラウザに記録を保存します。子ども・保護者・先生の画面に個別のログイン認証はありません。'));
    state.append(make('p','','複数の子どもが同じ端末を共有して本名や個別の学習履歴を扱うことは、まだおすすめできません。'));
    app.append(state);
    const audio=make('section','card pono388section');
    audio.append(make('h3','','① 表示と読み上げの確認'));
    audio.append(make('p','pono388sample','今日の学習は、自分に合う方法で進めて大丈夫。'));
    const feedback=make('p','pono388feedback','');
    const buttons=make('div','pono388audio');
    const phrase='今日の学習は、自分に合う方法で進めて大丈夫。';
    buttons.append(click('🔊 読み上げ',()=>speak(phrase,false,feedback)),click('🐢 ゆっくり',()=>speak(phrase,true,feedback)));
    audio.append(buttons,feedback);
    audio.append(make('p','pono388small','音声が使えなくても、文字や選択肢で学習できます。Androidでは端末の音声設定やブラウザによって動作が異なります。'));
    app.append(audio);
    const checks=make('section','card pono388section');
    checks.append(make('h3','','② 試用のチェック'));
    const labels=[
      '本名や診断名を入力せず、まず仮名・テストデータで確認する',
      '子どもごとに専用端末・ブラウザを使い、共用端末で実際の記録を扱わない',
      '記録は端末内保存と理解し、保存・復元の手順を大人が確認する'
    ];
    const inputs=[];
    const summary=make('p','pono388small','3項目を確認すると、試用画面に進めます。');
    const enter=click('🌱 試用を始める',()=>{if(typeof child==='function')child();else returnHome();},'primary');
    enter.disabled=true;
    for(const lab of labels){
      const row=make('label','pono388check');const input=document.createElement('input');input.type='checkbox';inputs.push(input);
      row.append(input,make('span','',lab));checks.append(row);
      input.addEventListener('change',()=>{const n=inputs.filter(x=>x.checked).length;enter.disabled=n!==inputs.length;summary.textContent=`確認 ${n} / ${inputs.length}項目`;});
    }
    checks.append(summary,enter);app.append(checks);
    const helpers=make('section','card pono388section');
    helpers.append(make('h3','','③ 学習記録の保存・復元'));
    helpers.append(make('p','','試用結果を残す場合は、学習者のIDを確認してからバックアップを保存してください。バックアップファイルには名前や学習履歴が含まれます。'));
    if(typeof window.ponoRecordsBackup387==='function')helpers.append(click('💾 バックアップ画面を開く',()=>window.ponoRecordsBackup387(),'soft'));
    if(typeof window.ponoGrade6Dashboard385==='function')helpers.append(click('📚 5教科の学習まとめを見る',()=>window.ponoGrade6Dashboard385(),'soft'));
    helpers.append(make('p','pono388small','この機能は試用の補助です。学校・家庭での自動同期や認証付きアカウントは、まだ実装されていません。'));
    app.append(helpers,click('最初の画面に戻る',returnHome,'soft pono388return'));
  }
  function inject(){
    const h=app.querySelector('.top h1');if(!h)return;
    const title=(h.textContent||'').trim();
    const onHome=title==='🌱 Pono Learning Quest';
    const onChild=title==='🧒 今日の学習';
    const onDashboard=title==='小学6年｜5教科のまとめ';
    if(!onHome&&!onChild&&!onDashboard)return;
    if(app.querySelector('[data-pono388-entry]'))return;
    const card=make('section','card pono388entry');card.dataset.pono388Entry='1';
    card.append(make('h3','','🛡️ 試用前のチェック'),make('p','','学習記録の安全な扱いと、読み上げの動作を確認できます。'));
    card.append(click('使う前の確認を開く',open,'soft'));
    const anchor=app.querySelector('.top');
    if(anchor)anchor.insertAdjacentElement('afterend',card);
  }
  let queued=false;
  new MutationObserver(()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;inject()});}).observe(app,{subtree:true,childList:true});
  inject();
  window.ponoTrialCheck388=open;
})();
