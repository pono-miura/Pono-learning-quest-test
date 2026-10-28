/* Pono Learning Quest v38.9 — local learner profile for supervised trials.
   One pseudonymous learner per browser; this is NOT login/authentication or cloud sync.
   Never migrates, deletes, or overwrites learning records when the ID changes. */
(function(){
  'use strict';
  const root=document.getElementById('app');
  if(!root)return;
  const PROFILE_KEY='ponoV9Student', LEGACY='PONO001';
  const LOG_KEYS=[
    'ponoV9Records','ponoKanjiLearning252','ponoKanjiProgressV20',
    'ponoJapaneseDifficulty','ponoJapaneseRetention','ponoJapaneseReading313',
    'ponoMathReflections','ponoMathBridgeRetention278','ponoUnitReflections',
    'ponoAllSubjectRetention','ponoEnglishSpeaking'
  ];
  const ID_REGEX=/^PONO-[A-HJ-NP-Z2-9]{8}$/;
  const ALPHABET='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const el=(tag,cls,txt)=>{const x=document.createElement(tag);if(cls)x.className=cls;if(txt!==undefined)x.textContent=txt;return x;};
  const btn=(label,fn,cls='soft')=>{const b=el('button',cls,label);b.type='button';b.addEventListener('click',fn);return b;};
  const getProfile=()=>{try{return typeof profile!=='undefined'&&profile&&typeof profile==='object'?profile:null;}catch(_){return null;}};
  const idOf=()=>String(getProfile()?.id??'');
  const isFresh=()=>idOf()===LEGACY;
  function toHome(){if(typeof home==='function')home();else if(typeof child==='function')child();}
  function page(title,back=toHome){root.replaceChildren();const top=el('div','top');top.append(btn('← 戻る',back,'back'),el('h1','pono389title',title));root.append(top);try{window.scrollTo(0,0);}catch(_){}}
  function group(title,body){const c=el('section','card pono389section');c.append(el('h2','',title));if(body)c.append(el('p','',body));root.append(c);return c;}
  function alertBox(txt,bad=false){const b=el('p',bad?'pono389alert pono389bad':'pono389alert',txt);root.append(b);return b;}
  function currentLogs(){
    const out={total:0,selected:0,unattributed:0,others:0,invalid:false};
    const id=idOf();
    for(const key of LOG_KEYS){
      const raw=localStorage.getItem(key);
      if(raw===null)continue;
      try{
        const data=JSON.parse(raw);
        if(!Array.isArray(data)){out.invalid=true;continue;}
        out.total+=data.length;
        for(const row of data){
          if(!row||typeof row!=='object'||Array.isArray(row)){out.invalid=true;continue;}
          if(row.studentId==null||String(row.studentId)==='')out.unattributed++;
          else if(String(row.studentId)===id)out.selected++;
          else out.others++;
        }
      }catch(_){out.invalid=true;}
    }
    return out;
  }
  function createId(){
    if(!window.crypto||typeof window.crypto.getRandomValues!=='function')throw new Error('専用IDを作成できません。HTTPSのブラウザで開いてください。');
    const b=new Uint8Array(8);window.crypto.getRandomValues(b);
    return 'PONO-'+Array.from(b,x=>ALPHABET[x&31]).join('');
  }
  function inputRow(label,type,value,maxLength){
    const row=el('label','pono389field'),l=el('span','',label),inp=document.createElement('input');
    inp.type=type;inp.value=value||'';inp.maxLength=maxLength||48;inp.autocomplete='off';inp.spellcheck=false;
    row.append(l,inp);return {row,inp};
  }
  function selectGrade(g){
    const row=el('label','pono389field');row.append(el('span','','在籍学年'));
    const sel=document.createElement('select');for(let i=1;i<=6;i++){const o=el('option','',`小学${i}年`);o.value=String(i);sel.append(o);}sel.value=String(Math.max(1,Math.min(6,Number(g)||6)));row.append(sel);return {row,sel};
  }
  function persist({id,name,grade}){
    const p=getProfile();if(!p)throw new Error('学習者情報を読み込めません。');
    const before={...p};
    const next={...p,id,name,grade,startGrade:Number(p.startGrade)||grade};
    // Write first: a full-storage failure must not change the in-memory profile.
    localStorage.setItem(PROFILE_KEY,JSON.stringify(next));
    try{Object.assign(p,next);}catch(e){try{localStorage.setItem(PROFILE_KEY,JSON.stringify(before));}catch(_){}throw e;}
  }
  function status(){
    const p=getProfile(),logs=currentLogs();
    const card=group('このブラウザの学習者','この画面で登録した仮名とIDは、このブラウザ内だけに保存されます。');
    card.append(el('div','pono389id',String(p?.id||'未設定')));
    card.append(el('p','',`表示名：${String(p?.name||'未設定')} ／ 在籍：小学${Number(p?.grade)||'―'}年`));
    card.append(el('p','pono389muted',`この学習者の主要・補助ログ：${logs.selected}件`));
    if(logs.others)card.append(el('p','pono389warn',`別のIDの記録が${logs.others}件あります。同じブラウザを複数人で使わず、大人が確認してください。`));
    if(logs.unattributed)card.append(el('p','pono389warn',`学習者IDがない古い補助記録が${logs.unattributed}件あります。自動で現在の子の記録として扱いません。`));
    if(logs.invalid)card.append(el('p','pono389warn','一部の学習記録を読み取れません。IDを変更せず、記録を確認してください。'));
    return logs;
  }
  function saveScreen(title,msg){
    page(title);const c=group('設定を保存しました',msg);
    c.append(el('p','pono389id',idOf()));
    c.append(el('p','pono389muted','学習者IDは、機種変更やバックアップ復元の際に必要です。大人が安全な場所に控えてください。'));
    c.append(btn('💾 記録のバックアップへ',()=>{if(typeof window.ponoRecordsBackup387==='function')window.ponoRecordsBackup387();else open();},'soft'));
    c.append(btn('🌱 学習画面へ',()=>{if(typeof child==='function')child();else toHome();},'primary'));
  }
  function registration(logs){
    const c=group('① 試用学習者を登録する','本名・診断名ではなく、仮名を使用してください。IDは自動で発行できます。');
    const locked=logs.total>0||logs.invalid;
    if(locked){
      c.append(el('p','pono389warn','このブラウザには、すでに学習記録が存在します。記録の取り違え防止のため、ここでは新しいIDを発行・入力できません。'));
      c.append(el('p','','続けて同じ子が使う場合は、現在のIDを維持してバックアップしてください。別の子の試用は専用のブラウザ・端末で行ってください。'));
      c.append(btn('💾 先にバックアップを確認',()=>{if(typeof window.ponoRecordsBackup387==='function')window.ponoRecordsBackup387();else open();}));
      return;
    }
    const nm=inputRow('仮名（12文字以内）','text','',12);nm.inp.placeholder='例：そら';
    const grade=selectGrade(getProfile()?.grade||6);
    const modeTitle=el('p','pono389sub','IDの用意方法');
    const radios=el('div','pono389options');
    const mkOption=(label,value,checked)=>{const wrap=el('label','pono389option'),r=document.createElement('input');r.type='radio';r.name='pono389mode';r.value=value;r.checked=checked;wrap.append(r,el('span','',label));radios.append(wrap);return r;};
    const fresh=mkOption('この端末用に新しいIDを発行','fresh',true);
    const restore=mkOption('前の端末のIDを引き継ぐ','existing',false);
    const old=inputRow('以前の学習者ID','text','',16);old.inp.placeholder='例：PONO-ABCDEFG2';old.inp.autocapitalize='characters';old.inp.disabled=true;
    const help=el('p','pono389muted','前の端末のバックアップを使う場合は、先に同じIDを登録してから「記録の復元」を行います。IDだけではデータは移りません。');
    const error=el('p','pono389error','');error.setAttribute('role','alert');
    const ack=el('label','pono389agree'),check=document.createElement('input');check.type='checkbox';ack.append(check,el('span','','このブラウザを1人の試用学習者に使い、実名や診断名を登録しません。'));
    const submit=btn('この学習者を登録する',()=>{
      error.textContent='';
      const name=nm.inp.value.trim();
      if(!name||name.length>12){error.textContent='仮名を1〜12文字で入力してください。';return;}
      if(!check.checked){error.textContent='試用時の注意を確認してください。';return;}
      if(!isFresh()){error.textContent='すでに別の学習者IDが設定されています。';return;}
      const latest=currentLogs();if(latest.total||latest.invalid){error.textContent='記録が見つかったため、IDの変更を中止しました。';return;}
      let id;
      try{
        if(restore.checked){id=old.inp.value.trim().toUpperCase();if(!ID_REGEX.test(id))throw Error('以前のIDは「PONO-」に続く8文字の形式で入力してください。');}
        else id=createId();
        persist({id,name,grade:Number(grade.sel.value)});
      }catch(e){error.textContent=e.message||'保存できませんでした。';return;}
      saveScreen('学習者IDの登録完了','仮名と専用IDを保存しました。これからの学習記録は、このIDで記録されます。');
    },'primary');
    fresh.addEventListener('change',()=>{old.inp.disabled=true;old.inp.value='';});
    restore.addEventListener('change',()=>{old.inp.disabled=false;old.inp.focus();});
    c.append(nm.row,grade.row,modeTitle,radios,old.row,help,ack,error,submit);
  }
  function editing(){
    const p=getProfile();const c=group('① 仮名と学年を確認する','現在のIDはそのまま維持し、表示名と学年だけを変更できます。');
    const nm=inputRow('仮名（12文字以内）','text',String(p?.name||''),12);
    const grade=selectGrade(p?.grade||6);
    const error=el('p','pono389error','');error.setAttribute('role','alert');
    c.append(nm.row,grade.row,error,btn('仮名・学年を保存',()=>{
      error.textContent='';const name=nm.inp.value.trim();
      if(!name||name.length>12){error.textContent='仮名を1〜12文字で入力してください。';return;}
      if(!getProfile()||idOf()!==String(p.id)){error.textContent='学習者IDが変わったため、保存を中止しました。';return;}
      try{persist({id:String(p.id),name,grade:Number(grade.sel.value)})}catch(e){error.textContent=e.message||'保存できませんでした。';return;}
      saveScreen('仮名・学年の変更完了','学習者IDは変更せず、仮名と学年を更新しました。以前の学習記録はそのまま残ります。');
    },'primary'));
    const guard=group('② 学習者IDは変更できません','誤って別の子の記録と混ざらないよう、このブラウザで発行・登録したIDの切り替えはできません。');
    guard.append(el('p','pono389muted','別の子は専用のブラウザ・端末で登録してください。機種変更時は新しいブラウザで同じIDを入力し、そのIDのバックアップを復元します。'));
  }
  function open(){
    page('学習者IDと仮名の設定');
    const intro=group('Ponoの試用は1人ずつ','この画面は仮名とIDを管理するためのものです。ログイン認証やクラウド共有はまだありません。');
    intro.append(el('p','pono389muted','共用端末では別の子の履歴を見ることができるおそれがあります。個別の学習履歴は扱わず、まず大人の見守りで試してください。'));
    let logs;try{logs=status()}catch(e){alertBox('端末内の記録を確認できません。記録を削除・変更せずにご確認ください。',true);return;}
    if(isFresh())registration(logs);else editing();
    const b=group('③ 記録の保存・復元','バックアップファイルには学習履歴が入ります。公開・共有せず、大人が安全な場所に保存してください。');
    if(typeof window.ponoRecordsBackup387==='function')b.append(btn('💾 保存・復元画面へ',()=>window.ponoRecordsBackup387(),'soft'));
    b.append(el('p','pono389muted','学校・家庭での自動同期、パスワード認証、学習者のアクセス権限分離は未実装です。'));
    root.append(btn('最初の画面へ戻る',toHome,'soft pono389return'));
  }
  function inject(){
    const h=root.querySelector('.top h1');if(!h)return;
    const title=(h.textContent||'').trim();
    if(!['🌱 Pono Learning Quest','🧒 今日の学習','小学6年｜5教科のまとめ'].includes(title))return;
    if(root.querySelector('[data-pono389-entry]'))return;
    const card=el('section','card pono389entry');card.dataset.pono389Entry='1';
    card.append(el('h3','',isFresh()?'🪪 学習者IDの設定を確認':'🪪 この学習者のIDを確認'),el('p','',isFresh()?'初期IDのまま使わず、仮名と専用IDを確認してください。':'仮名・学年の確認や、機種変更に備えたIDの控えができます。'));
    card.append(btn('学習者ID・仮名を設定する',open,'primary'));
    const anchor=root.querySelector('.top');if(anchor)anchor.insertAdjacentElement('afterend',card);
  }
  let pending=false;
  new MutationObserver(()=>{if(pending)return;pending=true;requestAnimationFrame(()=>{pending=false;inject();});}).observe(root,{childList:true,subtree:true});
  inject();
  window.ponoLearnerManager389=open;
})();
