/* Pono Learning Quest v38.6 — 選択中の学習者の記録を安全にバックアップ・追加復元 */
(function(){
  'use strict';
  const app=document.getElementById('app');
  if(!app)return;
  const FORMAT='pono-learning-quest-student-records';
  const KEY='ponoV9Records';
  const LIMIT=8*1024*1024;
  const escapeHtml=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function make(tag,cls,html){const n=document.createElement(tag);if(cls)n.className=cls;if(html!==undefined)n.innerHTML=html;return n;}
  function button(label,fn,cls='soft'){const n=document.createElement('button');n.type='button';n.className=cls;n.textContent=label;n.addEventListener('click',fn);return n;}
  function student(){try{return typeof profile!=='undefined'&&profile&&profile.id!==undefined?profile:null;}catch(e){return null;}}
  function allRecords(){try{if(typeof records!=='undefined'&&Array.isArray(records))return records;}catch(e){}
    try{const v=JSON.parse(localStorage.getItem(KEY)||'[]');return Array.isArray(v)?v:[];}catch(e){return [];}}
  function mine(){const p=student();return !p?[]:allRecords().filter(r=>r&&String(r.studentId)===String(p.id));}
  function goBack(){if(typeof window.ponoGrade6Dashboard385==='function')window.ponoGrade6Dashboard385();else if(typeof child==='function')child();}
  function page(title){app.replaceChildren();const top=make('div','top');top.append(button('← 戻る',goBack,'back'),make('h1','pono386title',escapeHtml(title)));app.append(top);try{window.scrollTo(0,0);}catch(e){}}
  function alertBox(message,warning=false){const box=make('div','card pono386message'+(warning?' pono386warning':''));box.textContent=message;app.append(box);return box;}
  function nowJP(){try{return new Intl.DateTimeFormat('ja-JP',{year:'numeric',month:'2-digit',day:'2-digit',timeZone:'Asia/Tokyo'}).format(new Date()).replaceAll('/','-');}catch(e){return new Date().toISOString().slice(0,10);}}
  function download(){
    const p=student();if(!p){alertBox('学習者を選択してから保存してください。',true);return;}
    const data={format:FORMAT,version:1,exportedAt:new Date().toISOString(),student:{id:String(p.id),name:String(p.name||''),grade:Number(p.grade)||6},records:mine()};
    const json=JSON.stringify(data,null,2);
    try{
      const blob=new Blob([json],{type:'application/json;charset=utf-8'});
      const url=URL.createObjectURL(blob);
      const a=document.createElement('a');a.href=url;
      const safeId=String(p.id).replace(/[^a-zA-Z0-9_-]/g,'_').slice(0,32)||'student';
      a.download=`Pono_${safeId}_${nowJP()}.json`;
      document.body.append(a);a.click();a.remove();
      setTimeout(()=>URL.revokeObjectURL(url),60000);
      alertBox(`${data.records.length}件の記録を保存するファイルを作成しました。「ダウンロード」フォルダを確認してください。個人情報を含むため、大切に保管してください。`);
    }catch(e){alertBox('ファイルを作成できませんでした。端末の保存設定を確認してください。',true);}
  }
  function validRecord(r,id){return r&&typeof r==='object'&&!Array.isArray(r)&&String(r.studentId)===id&&typeof r.subject==='string'&&r.subject.length>0&&r.subject.length<80&&typeof r.date==='string'&&r.date.length<90&&Number.isFinite(Date.parse(r.date));}
  function fingerprint(r){return JSON.stringify(r);}
  function showPreview(file,parsed){
    const p=student();if(!p){alertBox('学習者を選択してから読み込んでください。',true);return;}
    if(!parsed||parsed.format!==FORMAT||parsed.version!==1||!parsed.student||!Array.isArray(parsed.records)||typeof parsed.student.id!=='string'){
      alertBox('このファイルはPono Learning Questの記録バックアップではありません。',true);return;
    }
    if(String(parsed.student.id)!==String(p.id)){
      alertBox(`別の学習者の記録です（ファイル内のID：${String(parsed.student.id).slice(0,40)}）。混ざらないよう、取り込みを中止しました。`,true);return;
    }
    if(parsed.records.length>30000||parsed.records.some(r=>!validRecord(r,String(p.id)))){
      alertBox('学習記録の形式が正しくないため、取り込みを中止しました。現在の記録は変更していません。',true);return;
    }
    const existing=allRecords();
    const seen=new Set(existing.map(fingerprint));
    const additions=[];
    parsed.records.forEach(r=>{const k=fingerprint(r);if(!seen.has(k)){seen.add(k);additions.push(r);}});
    const card=make('div','card pono386preview');
    card.append(make('h2','','取り込む前に確認しましょう'));
    card.append(make('p','',`ファイル：<b>${escapeHtml(file.name)}</b>`));
    card.append(make('p','',`対象：<b>${escapeHtml(String(p.name||'学習者'))}</b>（ID：${escapeHtml(String(p.id))}）`));
    card.append(make('p','',`ファイルの記録：<b>${parsed.records.length}件</b>　新しく追加される記録：<b>${additions.length}件</b>`));
    card.append(make('p','pono386small','既存の記録は削除しません。内容がまったく同じ記録は二重に取り込みません。'));
    app.append(card);
    if(!additions.length){card.append(make('p','pono386good','このファイルの記録はすでに保存されています。追加は必要ありません。'));return;}
    card.append(button(`${additions.length}件の記録を追加する`,()=>{
      try{
        // ボタンを押した時点の最新記録で再照合して二重追加を防ぐ。
        const live=allRecords(),keys=new Set(live.map(fingerprint));
        const toAdd=additions.filter(r=>{const k=fingerprint(r);if(keys.has(k))return false;keys.add(k);return true;});
        const merged=live.concat(toAdd);
        localStorage.setItem(KEY,JSON.stringify(merged)); // 保存が失敗したらメモリも変えない。
        try{if(typeof records!=='undefined'&&Array.isArray(records))records.splice(0,records.length,...merged);}catch(e){}
        page('復元が完了しました');
        app.append(make('div','card pono386success',`<h2>🌱 記録を追加しました</h2><p><b>${toAdd.length}件</b>の記録を、現在の学習者に追加しました。</p><p>元からあった記録は残っています。5教科のまとめ画面に戻ると、結果を確認できます。</p>`));
        app.append(button('5教科のまとめへ戻る',goBack,'primary'));
      }catch(e){alertBox('端末の保存容量などの理由で、記録を保存できませんでした。既存の記録は変更していません。',true);}
    },'primary pono386apply'));
    card.append(button('取り込みをやめる',()=>screen(),'soft'));
  }
  async function readFile(file){
    if(!file)return;
    page('バックアップを確認する');
    if(file.size>LIMIT){alertBox('このファイルは大きすぎるため読み込めません（上限8MB）。',true);app.append(button('戻る',screen));return;}
    try{const parsed=JSON.parse(await file.text());showPreview(file,parsed);}catch(e){alertBox('ファイルを読み取れませんでした。Ponoから保存したJSONファイルを選んでください。',true);}
    app.append(button('保存・復元の画面に戻る',screen,'soft'));
  }
  function screen(){
    page('学習記録の保存・復元');
    const p=student();
    app.append(make('div','card pono386intro',`<p class="tiny">Pono Learning Quest・手動バックアップ</p><h2>大切な学習記録を手元に残そう</h2><p>選択中の学習者の記録をファイルに保存できます。復元時は、今ある記録を消さずに追加します。</p><p><b>学習者：</b>${escapeHtml(p?.name||'未設定')}　<b>記録：</b>${mine().length}件</p>`));
    const saveCard=make('div','card pono386block','<h3>① この端末の記録を保存</h3><p>保存先はスマートフォンの「ダウンロード」などです。保存したファイルには学習者名や回答結果が含まれます。</p>');
    saveCard.append(button('📥 記録をバックアップする',download,'primary'));app.append(saveCard);
    const loadCard=make('div','card pono386block','<h3>② 保存したファイルを読み込む</h3><p>先にこの端末で正しい学習者を選んでください。追加する記録件数を表示した後、確認して取り込めます。</p>');
    const input=document.createElement('input');input.type='file';input.accept='.json,application/json';input.className='pono386file';input.setAttribute('aria-label','Ponoバックアップファイルを選択');input.addEventListener('change',async()=>{const f=input.files?.[0];input.value='';await readFile(f);});
    loadCard.append(button('📂 バックアップファイルを選ぶ',()=>input.click()));loadCard.append(input);app.append(loadCard);
    app.append(make('div','card pono386note','<h3>🔒 記録の保管について</h3><p>この操作は端末内のデータを手動で保存・復元するものです。学校と家庭の自動同期ではありません。</p><p>バックアップは暗号化されていません。子どもの名前や学習履歴が含まれるため、公開したり他人に送ったりせず、安全な場所に保管してください。</p><p class="tiny">このバックアップの対象は選択中の学習者の主要な学習記録です。漢字クエスト等で別に保存される一部の補助記録・設定は含みません。</p>'));
    app.append(button('5教科の画面に戻る',goBack,'soft'));
  }
  function ensureEntry(){
    const h=app.querySelector('.top h1');if(!h||!(h.textContent||'').includes('小学6年｜5教科のまとめ'))return;
    if(app.querySelector('[data-pono386-entry]'))return;
    const anchor=app.querySelector('.pono385note')||app.querySelector('.pono385hero');if(!anchor)return;
    const c=make('div','card pono386entry','<h3>💾 学習記録のバックアップ</h3><p>この端末の学習記録をファイルに保存し、必要なときに追加して復元できます。</p>');
    c.dataset.pono386Entry='1';c.append(button('記録の保存・復元を開く',screen,'primary'));
    anchor.insertAdjacentElement('beforebegin',c);
  }
  let pending=false;
  new MutationObserver(()=>{if(pending)return;pending=true;requestAnimationFrame(()=>{pending=false;ensureEntry();});}).observe(app,{subtree:true,childList:true});
  ensureEntry();
  window.ponoRecordsBackup386=screen;
})();
