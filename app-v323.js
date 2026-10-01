/* v32.3 先生・Pono画面整理 + 学校共有用月間レポート */
(function(){
  const APP323=document.getElementById("app");

  function safe323(k){
    try{const x=JSON.parse(localStorage.getItem(k)||"[]");return Array.isArray(x)?x:[]}
    catch(e){return[]}
  }
  function dayKey323(v){
    const d=new Date(v); if(isNaN(d))return "unknown";
    return new Intl.DateTimeFormat("ja-JP",{timeZone:"Asia/Tokyo",year:"numeric",month:"2-digit",day:"2-digit"}).format(d);
  }
  function monthKey323(v){
    const d=new Date(v); if(isNaN(d))return "";
    const p=new Intl.DateTimeFormat("ja-JP",{timeZone:"Asia/Tokyo",year:"numeric",month:"2-digit"}).format(d).split("/");
    return `${p[0]}-${p[1]}`;
  }
  function jpDay323(v){
    const d=new Date(v); if(isNaN(d))return "日時なし";
    return d.toLocaleDateString("ja-JP",{timeZone:"Asia/Tokyo",month:"numeric",day:"numeric"});
  }
  function subject323(r){
    let s=r.subject||"学習";
    if(s==="外国語活動" && Number(r.grade)>=5)s="外国語";
    return s;
  }
  function unit323(r){
    for(const v of [r.unit,r.nodeTitle,r.title]){
      if(v && String(v).trim())return String(v).trim();
    }
    if(Array.isArray(r.adaptivePath)&&r.adaptivePath.length){
      const x=[...r.adaptivePath].reverse().find(a=>a&&a.title);
      if(x&&x.title)return String(x.title).trim();
    }
    if(r.content){
      const c=String(r.content).trim();
      if(c && !/^.+の問題\s*\d+問$/.test(c) && c.length<=36)return c;
    }
    return subject323(r)==="算数"?"基礎確認":"学習内容の確認";
  }
  function state323(r){
    const s=String(r.status||"");
    if(s.includes("自力")||s.includes("定着")||s.includes("10問完了")||s.includes("学習済み")||r.result==="ok"||r.ok===true)return "確認";
    if(s.includes("練習")||s.includes("基礎を確認")||Number(r.hints)>0||(r.rate!=null&&Number(r.rate)<80))return "練習";
    return "取組";
  }
  function raw323(){
    let a=safe323("ponoV9Records").filter(r=>!r.studentId||r.studentId===profile.id);
    const rd=safe323("ponoJapaneseReading313").filter(r=>!r.studentId||r.studentId===profile.id);
    rd.forEach(x=>{
      const dup=a.some(r=>r.date===x.date&&subject323(r)==="国語"&&unit323(r)===x.unit);
      if(!dup)a.push({
        studentId:x.studentId||profile.id,date:x.date,subject:"国語",grade:x.grade,
        unit:x.unit,total:x.total||10,correct:x.total||10,hints:x.hints||0,
        seconds:x.seconds||0,status:"10問完了",source:"reading313"
      });
    });
    return a.sort((a,b)=>new Date(a.date)-new Date(b.date));
  }
  function grouped323(rows){
    const map=new Map();
    rows.forEach(r=>{
      const key=[dayKey323(r.date),subject323(r),unit323(r),state323(r),r.correct??"",r.total??"",r.rate??""].join("|");
      if(!map.has(key))map.set(key,{...r,_count:1});
      else{
        const g=map.get(key);g._count++;
        g.seconds=Math.max(Number(g.seconds)||0,Number(r.seconds)||0);
        g.hints=Math.max(Number(g.hints)||0,Number(r.hints)||0);
        if(new Date(r.date)>new Date(g.date))g.date=r.date;
      }
    });
    return [...map.values()].sort((a,b)=>new Date(a.date)-new Date(b.date));
  }
  function rows323(){return grouped323(raw323())}
  function uniqueUnits323(rows){
    const m=new Map();rows.forEach(r=>m.set(subject323(r)+"|"+unit323(r),r));return [...m.values()];
  }
  function monthNow323(){
    const p=new Intl.DateTimeFormat("ja-JP",{timeZone:"Asia/Tokyo",year:"numeric",month:"2-digit"}).format(new Date()).split("/");
    return `${p[0]}-${p[1]}`;
  }
  function countSupports323(rows){
    return {
      reads:rows.reduce((a,r)=>a+(Number(r.reads)||0),0),
      hints:rows.reduce((a,r)=>a+(Number(r.hints)||0),0),
      explain:rows.reduce((a,r)=>a+(Number(r.explain)||Number(r.explanationViews)||0),0),
      together:rows.reduce((a,r)=>a+(Number(r.together)||Number(r.togetherViews)||0),0)
    };
  }

  function teacherHome323(){
    const rr=rows323(), units=uniqueUnits323(rr), days=new Set(rr.map(r=>dayKey323(r.date))).size;
    head("📝 先生・Pono",home);

    A.append(e("div","card teacher323-head",`
      <h2>${profile.name}｜在籍 小学${profile.grade}年</h2>
      <p>学習記録を、<b>日々の確認・学び方の見取り・学校共有</b>に分けて見られます。</p>
      <div class="teacher323-stats">
        <div><b>${days}</b><span>学習日</span></div>
        <div><b>${rr.length}</b><span>記録</span></div>
        <div><b>${units.length}</b><span>単元</span></div>
      </div>
    `));

    A.append(e("div","teacher323-label","学習状況・学校共有"));
    A.append(btn("📊 生徒の学習記録・進み具合",teacherProgress323,"primary"));
    A.append(btn("📄 学校共有用 月間レポート",()=>monthlyReport323(),"primary"));

    A.append(e("div","teacher323-label","学び方の見取り"));
    A.append(btn("🌱 全科目・単元ふりかえり",teacherAllSubjectReflections,"soft"));
    A.append(btn("🌱 国語・学び方の見取り",teacherJapaneseInsights,"soft"));

    A.append(e("div","teacher323-label","日々の運用"));
    A.append(btn("📅 今週の時間割を作る",plan,"soft"));
    A.append(btn("🗂️ 日々の詳細記録を見る",report,"soft"));

    A.append(e("p","tiny","※試作版では、この端末のブラウザに保存された記録を表示します。"));
  }

  function teacherProgress323(){
    const rr=rows323(), units=uniqueUnits323(rr);
    head("📊 生徒の学習記録・進み具合",teacherHome323);

    A.append(e("div","card",`<h2>${profile.name}</h2><p>在籍 小学${profile.grade}年</p>
      <p class="tiny">点数だけではなく、取り組んだ単元・練習中の内容・使った学び方を合わせて確認します。</p>`));

    if(!rr.length){
      A.append(e("div","card","まだ学習記録がありません。"));
      return;
    }

    const st={確認:0,練習:0,取組:0};units.forEach(r=>st[state323(r)]++);
    const sup=countSupports323(rr);
    const refl=safe323("ponoUnitReflections").filter(x=>x.studentId===profile.id);

    A.append(e("div","card",`<h2>現在の記録</h2>
      <span class="pill">✅ 確認できた ${st.確認}</span>
      <span class="pill">🌱 練習中 ${st.練習}</span>
      <span class="pill">📝 取り組み ${st.取組}</span>
      <p class="tiny">能力評価ではなく、保存された学習記録の現在地です。</p>`));

    A.append(e("div","card",`<h2>使った学び方</h2>
      <p>🔊 読み上げ：<b>${sup.reads}回</b>　💡 ヒント：<b>${sup.hints}回</b></p>
      <p>📘 説明の確認：<b>${sup.explain}回</b>　🤝 一緒に確認：<b>${sup.together}回</b></p>
      <p>🌱 本人の単元ふりかえり：<b>${refl.length}件</b></p>
      <p class="tiny">回数は「できる・できない」の判定ではなく、どんな提示が使いやすいかを見る材料です。</p>`));

    ["国語","算数","理科","社会","外国語活動","外国語"].forEach(sub=>{
      const u=units.filter(r=>subject323(r)===sub);if(!u.length)return;
      const ok=u.filter(r=>state323(r)==="確認").length;
      const practice=u.filter(r=>state323(r)==="練習").length;
      const latest=u.slice().sort((a,b)=>new Date(b.date)-new Date(a.date))[0];
      A.append(e("div","card",`<h2>${sub}</h2>
        <p><b>${u.length}単元</b>に取り組み記録があります。</p>
        <p><span class="pill">✅ ${ok}</span><span class="pill">🌱 ${practice}</span></p>
        <p class="tiny">最近：${jpDay323(latest.date)}　${unit323(latest)}</p>`));
    });

    const retry=units.filter(r=>state323(r)==="練習").sort((a,b)=>new Date(b.date)-new Date(a.date)).slice(0,6);
    A.append(e("div","card",`<h2>🌱 次に確認したい内容</h2>${
      retry.length?retry.map(r=>`<p><b>${subject323(r)}｜${unit323(r)}</b><br><span class="tiny">${jpDay323(r.date)}${Number(r.hints)>0?`　ヒント ${r.hints}回`:""}</span></p>`).join("")
      :"<p>現在の記録では、練習中と表示されている単元はありません。</p>"
    }</div>`));

    A.append(btn("📄 この記録から月間レポートを作る",()=>monthlyReport323(),"primary"));
  }

  function autoComment323(rows, yy, mm){
    const units=uniqueUnits323(rows);
    const subjects=[...new Set(rows.map(subject323))];
    const days=new Set(rows.map(r=>dayKey323(r.date))).size;
    const mins=Math.round(rows.reduce((a,r)=>a+(Number(r.seconds)||0),0)/60);
    const confirmed=units.filter(r=>state323(r)==="確認").length;
    const practice=units.filter(r=>state323(r)==="練習").length;
    const sup=countSupports323(rows);
    let text=`${yy}年${Number(mm)}月は、${subjects.join("・")||"各教科"}の学習に${days}日取り組み、記録上は約${mins}分の学習を行いました。`;
    text+=` ${units.length}単元に取り組み、そのうち${confirmed}単元でその時点の理解を確認できています。`;
    if(practice)text+=` ${practice}単元は、説明やヒント等を使いながら引き続き確認しています。`;
    const methods=[];
    if(sup.reads)methods.push("読み上げ");
    if(sup.explain)methods.push("説明");
    if(sup.together)methods.push("一緒に確認");
    if(sup.hints)methods.push("ヒント");
    if(methods.length)text+=` 必要に応じて${methods.join("・")}を選び、内容理解と取り組みやすさの両方を確認しています。`;
    text+=" 今後も、理解が残っているかを確かめながら次の学習につなげます。";
    return text;
  }

  function monthlyReport323(selected){
    const current=selected||monthNow323();
    const rr=rows323().filter(r=>monthKey323(r.date)===current);
    const [yy,mm]=current.split("-");
    head("📄 学校共有用 月間レポート",teacherHome323);

    const controls=e("div","report323-controls noPrint");
    const chooser=document.createElement("input");
    chooser.type="month";chooser.value=current;chooser.onchange=()=>monthlyReport323(chooser.value);
    controls.append(chooser);
    A.append(controls);

    A.append(e("div","report323-paper",`
      <div class="report323-title">
        <h2>Pono Learning　月間学習報告書</h2>
        <p>${yy}年${Number(mm)}月</p>
      </div>
      <div class="report323-meta">
        <div><span>氏名</span><b>${profile.name}</b></div>
        <div><span>在籍学年</span><b>小学${profile.grade}年</b></div>
      </div>
    `));

    if(!rr.length){
      A.append(e("div","card","この月の学習記録はまだありません。"));
      return;
    }

    const units=uniqueUnits323(rr);
    const subjects=[...new Set(rr.map(subject323))];
    const days=new Set(rr.map(r=>dayKey323(r.date))).size;
    const mins=Math.round(rr.reduce((a,r)=>a+(Number(r.seconds)||0),0)/60);
    const confirmed=units.filter(r=>state323(r)==="確認");
    const practice=units.filter(r=>state323(r)==="練習");
    const sup=countSupports323(rr);
    const reflections=safe323("ponoUnitReflections").filter(x=>x.studentId===profile.id&&monthKey323(x.date)===current);

    const summary=e("div","card report323-section");
    summary.innerHTML=`<h2>1．学習の概要</h2>
      <p>学習日数：<b>${days}日</b>　学習記録：<b>${rr.length}件</b>　記録時間：<b>約${mins}分</b></p>
      <p>教科：${subjects.join("・")||"―"}</p>
      <p>取り組んだ単元：<b>${units.length}単元</b></p>`;
    A.append(summary);

    const bySubject=subjects.map(sub=>{
      const x=units.filter(r=>subject323(r)===sub);
      return `<div class="report323-sub"><b>${sub}</b><br>${x.map(r=>unit323(r)).join("・")}</div>`;
    }).join("");
    A.append(e("div","card report323-section",`<h2>2．今月取り組んだ内容</h2>${bySubject}`));

    A.append(e("div","card report323-section",`<h2>3．学習の現在地</h2>
      <p><b>その時点の理解を確認できた単元</b><br>${confirmed.map(r=>`${subject323(r)}「${unit323(r)}」`).join("、")||"―"}</p>
      <p><b>引き続き確認している単元</b><br>${practice.map(r=>`${subject323(r)}「${unit323(r)}」`).join("、")||"―"}</p>
      <p class="tiny">※「確認できた」は学年全体の到達度ではなく、この教材内での学習記録です。</p>`));

    const methods=[];
    if(sup.reads)methods.push(`読み上げ ${sup.reads}回`);
    if(sup.explain)methods.push(`説明の確認 ${sup.explain}回`);
    if(sup.together)methods.push(`一緒に確認 ${sup.together}回`);
    if(sup.hints)methods.push(`ヒント ${sup.hints}回`);
    if(reflections.length)methods.push(`本人のふりかえり ${reflections.length}件`);
    A.append(e("div","card report323-section",`<h2>4．取り組みやすかった方法・確認した方法</h2>
      <p>${methods.join("・")||"特別な補助記録はありません。"}</p>
      <p class="tiny">学習方法の利用回数であり、能力評価ではありません。</p>`));

    const draft=autoComment323(rr,yy,mm);
    const note=e("div","card report323-section report323-comment");
    note.innerHTML=`<h2>5．Pono記入欄</h2><p class="tiny noPrint">学習記録から作った下書きです。実際の様子に合わせて編集できます。</p>`;
    const ta=document.createElement("textarea");ta.rows=8;ta.value=draft;note.append(ta);A.append(note);

    A.append(e("div","card report323-section",`<h2>6．次月に向けて</h2>
      <p>${practice.length?`「${practice.slice(0,4).map(r=>unit323(r)).join("」「")}」等を必要に応じて再確認し、理解が残っているかを確かめながら進めます。`:"現在の学習内容を定着確認しながら、次の単元へ進めます。"}</p>`));

    A.append(btn("🖨️ 印刷・PDFにする",()=>window.print(),"primary noPrint"));
    A.append(e("p","tiny noPrint","※学校との学習状況共有用です。出席扱いの申請・通所報告書とは別の資料です。"));
  }

  /* teacher を整理版へ置き換える。既存の各機能はそのまま呼び出す。 */
  teacher=teacherHome323;

  /* ホームに作成済みの古い teacher ボタンも整理版へ接続 */
  document.addEventListener("click",function(ev){
    const b=ev.target.closest&&ev.target.closest("button");if(!b)return;
    const t=(b.textContent||"").trim();
    if(t==="📝 先生・Pono　時間割・提出用"||t==="📝 先生・Pono 時間割・提出用"){
      ev.preventDefault();ev.stopImmediatePropagation();teacherHome323();return;
    }
    if(t==="📊 生徒の学習記録・進み具合"){
      ev.preventDefault();ev.stopImmediatePropagation();teacherProgress323();return;
    }
    if(t==="📄 月間学習報告書を作る"||t==="📄 学校共有用 月間レポート"){
      ev.preventDefault();ev.stopImmediatePropagation();monthlyReport323();return;
    }
  },true);

  window.teacherHome323=teacherHome323;
  window.teacherProgress323=teacherProgress323;
  window.monthlyReport323=monthlyReport323;
})();