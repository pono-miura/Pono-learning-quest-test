/* v33.0 Ponoデータ バックアップ・復元 */
(function(){
  const APP=document.getElementById("app");
  if(!APP || typeof teacher!=="function") return;

  function ponoKeys330(){
    const keys=[];
    for(let i=0;i<localStorage.length;i++){
      const k=localStorage.key(i);
      if(k && /^pono/i.test(k)) keys.push(k);
    }
    return keys.sort();
  }

  function collect330(){
    const data={};
    ponoKeys330().forEach(k=>data[k]=localStorage.getItem(k));
    return {
      format:"PonoLearningBackup",
      version:1,
      appVersion:"v33.0",
      exportedAt:new Date().toISOString(),
      activeStudent:(typeof profile!=="undefined" ? {
        id:profile.id||"", name:profile.name||"", grade:Number(profile.grade)||1
      } : null),
      data
    };
  }

  function parseValue330(data,key,fallback){
    try{
      const raw=data && data[key];
      if(raw==null)return fallback;
      const v=JSON.parse(raw);
      return v;
    }catch(e){return fallback}
  }

  function statsFromBackup330(obj){
    const data=obj?.data||{};
    const students=parseValue330(data,"ponoStudentDirectoryV328",[]);
    const records=parseValue330(data,"ponoV9Records",[]);
    const reading=parseValue330(data,"ponoJapaneseReading313",[]);
    return {
      students:Array.isArray(students)?students.length:0,
      records:(Array.isArray(records)?records.length:0)+(Array.isArray(reading)?reading.length:0),
      keys:Object.keys(data).length
    };
  }

  function stamp330(){
    const d=new Date();
    const p=n=>String(n).padStart(2,"0");
    return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())}_${p(d.getHours())}${p(d.getMinutes())}`;
  }

  function downloadObj330(obj,filename){
    const blob=new Blob([JSON.stringify(obj,null,2)],{type:"application/json"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");
    a.href=url;a.download=filename;
    document.body.appendChild(a);a.click();a.remove();
    setTimeout(()=>URL.revokeObjectURL(url),1200);
  }

  function doBackup330(prefix="Pono_Learning_Backup"){
    const obj=collect330();
    downloadObj330(obj,`${prefix}_${stamp330()}.json`);
    return obj;
  }

  function backupPage330(){
    head("💾 記録のバックアップ・復元",teacherHome330);

    const live=collect330();
    const st=statsFromBackup330(live);

    A.append(e("div","card",`<h2>⬇️ バックアップを保存</h2>
      <p>Pono Learningの生徒情報・学習記録・ふりかえり等を、<b>1つのファイル</b>にまとめて保存します。</p>
      <p><span class="pill">生徒 ${st.students}名</span>
      <span class="pill">学習記録 ${st.records}件</span>
      <span class="pill">保存項目 ${st.keys}種類</span></p>
      <p class="tiny">端末変更やブラウザのデータ消去に備えて、定期的に保存しておくと安心です。</p>`));
    A.append(btn("⬇️ Ponoデータをバックアップ",()=>{
      doBackup330();
      const msg=e("div","card good",`<b>バックアップファイルを作成しました。</b><br><span class="tiny">端末の「ダウンロード」等に保存されます。</span>`);
      A.insertBefore(msg,A.children[2]||null);
    },"primary"));

    A.append(e("div","card",`<h2>↩️ バックアップから復元</h2>
      <p>以前保存したPonoのバックアップファイルを選ぶと、内容を確認してから復元できます。</p>
      <p class="tiny">復元を実行する前に、現在のデータも自動で「復元前バックアップ」として保存します。</p>`));

    const inp=document.createElement("input");
    inp.type="file";
    inp.accept=".json,application/json";
    inp.className="noPrint";
    A.append(inp);

    const preview=e("div","card");
    preview.style.display="none";
    A.append(preview);

    let pending=null;

    inp.onchange=()=>{
      const file=inp.files&&inp.files[0];
      if(!file)return;
      const fr=new FileReader();
      fr.onload=()=>{
        try{
          const obj=JSON.parse(String(fr.result||""));
          if(obj?.format!=="PonoLearningBackup" || !obj.data || typeof obj.data!=="object"){
            throw new Error("format");
          }
          pending=obj;
          const s=statsFromBackup330(obj);
          const d=obj.exportedAt?new Date(obj.exportedAt):null;
          const when=d&&!isNaN(d)?d.toLocaleString("ja-JP"):"日時不明";
          preview.style.display="";
          preview.innerHTML=`<h2>このバックアップを確認</h2>
            <p>保存日時：<b>${when}</b></p>
            <p><span class="pill">生徒 ${s.students}名</span>
            <span class="pill">学習記録 ${s.records}件</span>
            <span class="pill">保存項目 ${s.keys}種類</span></p>
            <p class="tiny">内容を確認してから「復元する」を押してください。</p>`;
          preview.append(btn("↩️ このバックアップを復元する",()=>{
            if(!pending)return;
            const ok=confirm("このバックアップの内容に戻します。\n現在のデータは先に自動バックアップします。\n復元してよいですか？");
            if(!ok)return;

            /* 念のため現在状態を先にダウンロード */
            doBackup330("Pono_復元前バックアップ");

            /* Pono関連だけを置き換える */
            ponoKeys330().forEach(k=>localStorage.removeItem(k));
            Object.entries(pending.data).forEach(([k,v])=>{
              if(/^pono/i.test(k) && typeof v==="string") localStorage.setItem(k,v);
            });

            alert("復元しました。画面を読み直します。");
            location.href="index.html?v=330";
          },"primary"));
        }catch(err){
          pending=null;
          preview.style.display="";
          preview.innerHTML="<h2>このファイルは読み込めませんでした</h2><p>Pono Learningで作成したバックアップファイルを選んでください。</p>";
        }
      };
      fr.readAsText(file,"utf-8");
    };

    A.append(e("div","card",`<h2>おすすめの使い方</h2>
      <p>大きな更新の前や、月末に1回程度バックアップを保存しておくと、端末を替える時にも引き継ぎやすくなります。</p>
      <p class="tiny">※試作版はブラウザ内保存のため、このバックアップ機能は端末内データを守るためのものです。</p>`));
  }

  const baseTeacher330=teacher;

  function teacherHome330(){
    baseTeacher330();

    if(APP.querySelector(".backup330"))return;

    const label=e("div","teacher323-label backup330-label","データ管理");
    const b=btn("💾 記録のバックアップ・復元",backupPage330,"primary");
    b.classList.add("backup330");

    const foot=[...APP.querySelectorAll("p.tiny")].slice(-1)[0];
    if(foot){
      APP.insertBefore(label,foot);
      APP.insertBefore(b,foot);
    }else{
      APP.append(label,b);
    }
  }

  teacher=teacherHome330;
  window.teacherHome323=teacherHome330;
  window.teacherHome330=teacherHome330;
  window.backupPage330=backupPage330;

  const title=(APP.querySelector("h1")?.textContent||"");
  if(title.includes("先生・Pono")) teacherHome330();
})();