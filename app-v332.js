/* v33.2 別端末へ引き継ぐ */
(function(){
  const APP=document.getElementById("app");
  if(!APP || typeof teacher!=="function") return;

  function ponoKeys332(){
    const keys=[];
    for(let i=0;i<localStorage.length;i++){
      const k=localStorage.key(i);
      if(k && /^pono/i.test(k))keys.push(k);
    }
    return keys.sort();
  }

  function safeJson332(raw,fallback){
    try{return JSON.parse(raw)}catch(e){return fallback}
  }

  function collect332(){
    const data={};
    ponoKeys332().forEach(k=>data[k]=localStorage.getItem(k));
    return {
      format:"PonoLearningBackup",
      version:1,
      appVersion:"v33.2",
      purpose:"device-transfer",
      exportedAt:new Date().toISOString(),
      activeStudent:(typeof profile!=="undefined" ? {
        id:profile.id||"",name:profile.name||"",grade:Number(profile.grade)||1
      } : null),
      data
    };
  }

  function stamp332(){
    const d=new Date(),p=n=>String(n).padStart(2,"0");
    return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())}_${p(d.getHours())}${p(d.getMinutes())}`;
  }

  function download332(obj,name){
    const blob=new Blob([JSON.stringify(obj,null,2)],{type:"application/json"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");
    a.href=url;a.download=name;
    document.body.appendChild(a);a.click();a.remove();
    setTimeout(()=>URL.revokeObjectURL(url),1200);
  }

  function info332(obj){
    const data=obj?.data||{};
    const students=safeJson332(data["ponoStudentDirectoryV328"]||"[]",[]);
    const records=safeJson332(data["ponoV9Records"]||"[]",[]);
    const reading=safeJson332(data["ponoJapaneseReading313"]||"[]",[]);
    return {
      students:Array.isArray(students)?students.length:0,
      records:(Array.isArray(records)?records.length:0)+(Array.isArray(reading)?reading.length:0),
      keys:Object.keys(data).length
    };
  }

  function transferPage332(){
    head("📱 別端末へ引き継ぐ",teacherHome332);

    A.append(e("div","card",`<h2>1．今の端末で引き継ぎファイルを作る</h2>
      <p>生徒情報・学習記録・ふりかえり等を、1つのファイルにまとめます。</p>
      <p class="tiny">このファイルを新しい端末へ移して使います。リアルタイム同期ではなく、端末変更時の安全な引き継ぎ用です。</p>`));

    A.append(btn("⬇️ 引き継ぎファイルを作る",()=>{
      const obj=collect332();
      download332(obj,`Pono_引き継ぎ_${stamp332()}.json`);
      const s=info332(obj);
      const msg=e("div","card good",`<b>引き継ぎファイルを作成しました。</b>
        <p><span class="pill">生徒 ${s.students}名</span>
        <span class="pill">学習記録 ${s.records}件</span></p>
        <p class="tiny">このJSONファイルを、新しい端末へ移してください。</p>`);
      A.insertBefore(msg,A.children[2]||null);
    },"primary"));

    A.append(e("div","card",`<h2>2．新しい端末でPono Learningを開く</h2>
      <p>新しい端末でPono Learning Questを開き、<b>先生・Pono → データ管理 → 別端末へ引き継ぐ</b>へ進みます。</p>`));

    const copyBtn=btn("🔗 Pono Learning QuestのURLをコピー",async()=>{
      const url="https://pono-miura.github.io/Pono-learning-quest-test/?v=332";
      try{
        await navigator.clipboard.writeText(url);
        alert("URLをコピーしました。");
      }catch(e){
        prompt("このURLをコピーしてください。",url);
      }
    },"soft");
    A.append(copyBtn);

    A.append(e("div","card",`<h2>3．新しい端末に引き継ぐ</h2>
      <p>新しい端末で、さきほどの引き継ぎファイルを選びます。</p>
      <p class="tiny">実行前に、新しい端末側の現在データも自動でバックアップします。</p>`));

    const inp=document.createElement("input");
    inp.type="file";
    inp.accept=".json,application/json";
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
          if(obj?.format!=="PonoLearningBackup"||!obj.data||typeof obj.data!=="object"){
            throw new Error("format");
          }
          pending=obj;
          const s=info332(obj);
          const d=obj.exportedAt?new Date(obj.exportedAt):null;
          const when=d&&!isNaN(d)?d.toLocaleString("ja-JP"):"日時不明";
          preview.style.display="";
          preview.innerHTML=`<h2>引き継ぐ内容を確認</h2>
            <p>保存日時：<b>${when}</b></p>
            <p><span class="pill">生徒 ${s.students}名</span>
            <span class="pill">学習記録 ${s.records}件</span>
            <span class="pill">保存項目 ${s.keys}種類</span></p>
            <p class="tiny">内容を確認してから実行してください。</p>`;

          preview.append(btn("📱 この端末に引き継ぐ",()=>{
            if(!pending)return;
            if(!confirm("この端末のPonoデータを、選んだ引き継ぎファイルの内容に置き換えます。\n現在のデータは先に自動バックアップします。\n続けてよいですか？"))return;

            const current=collect332();
            download332(current,`Pono_引き継ぎ前バックアップ_${stamp332()}.json`);

            ponoKeys332().forEach(k=>localStorage.removeItem(k));
            Object.entries(pending.data).forEach(([k,v])=>{
              if(/^pono/i.test(k)&&typeof v==="string")localStorage.setItem(k,v);
            });

            alert("引き継ぎが完了しました。画面を読み直します。");
            location.href="index.html?v=332";
          },"primary"));
        }catch(e){
          pending=null;
          preview.style.display="";
          preview.innerHTML="<h2>このファイルは使えませんでした</h2><p>Pono Learningで作成したバックアップ／引き継ぎファイルを選んでください。</p>";
        }
      };
      fr.readAsText(file,"utf-8");
    };

    A.append(e("div","card",`<h2>大切なポイント</h2>
      <p>引き継ぎファイルには生徒名や学習記録が含まれます。必要以上に共有せず、信頼できる方法で新しい端末へ移してください。</p>
      <p class="tiny">自動で複数端末を常時同期する機能は、今後ログイン・クラウド保存を導入する段階で追加できます。</p>`));
  }

  const baseTeacher332=teacher;

  function teacherHome332(){
    baseTeacher332();

    if(APP.querySelector(".transfer332"))return;

    const backupBtn=[...APP.querySelectorAll("button")].find(b=>
      (b.textContent||"").includes("記録のバックアップ・復元")
    );

    const b=btn("📱 別端末へ引き継ぐ",transferPage332,"primary");
    b.classList.add("transfer332");

    if(backupBtn){
      backupBtn.insertAdjacentElement("afterend",b);
    }else{
      const foot=[...APP.querySelectorAll("p.tiny")].slice(-1)[0];
      if(foot)APP.insertBefore(b,foot); else APP.append(b);
    }
  }

  teacher=teacherHome332;
  window.teacherHome323=teacherHome332;
  window.teacherHome330=teacherHome332;
  window.teacherHome332=teacherHome332;
  window.transferPage332=transferPage332;

  const title=(APP.querySelector("h1")?.textContent||"");
  if(title.includes("先生・Pono"))teacherHome332();
})();