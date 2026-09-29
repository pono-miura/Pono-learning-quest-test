/* v26.3 算数：補完教材に共通の「あとから確認（定着確認）」を追加
   v26.2までの詳細教材・問題・音声・メモ・適応学習・学期別入口は変更しない。
   補完教材のふりかえり後に、別の日にも使える定着確認を追加する。 */

const MATHRET263 = "ponoMathRetention";

function mathRetention263(g,title){
  const qs = mathBridgeQs260(title), q = qs[0];
  head(`🕰️ あとから確認｜${title}`,()=>mathBridgeHome260(g,title));

  A.append(e("div","card",
    `<h2>この単元、覚えているかな？</h2>
     <p class="tiny">できれば別の日に、ヒントを見ずに1問だけ確認してみよう。</p>
     <p><b>${q[0]}</b></p>`
  ));

  q[1].forEach((x,j)=>
    A.append(btn(x,()=>mathRetentionSave263(g,title,j===q[2]),"soft"))
  );

  A.append(btn("📖 もう一度まなぶ",()=>mathBridgeLearn260(g,title),"ghost"));
}

function mathRetentionSave263(g,title,ok){
  let rows=[];
  try{
    rows=JSON.parse(localStorage.getItem(MATHRET263)||"[]");
  }catch(e){}

  rows.push({
    studentId:profile.id,
    date:new Date().toISOString(),
    subject:"算数",
    grade:g,
    unit:title,
    retained:ok
  });

  localStorage.setItem(MATHRET263,JSON.stringify(rows));

  head("🌱 定着確認を記録しました",()=>mathBridgeHome260(g,title));

  A.append(e("div",ok ? "card good" : "card",
    `<h2>${ok ? "覚えていたね！" : "もう一度見れば大丈夫"}</h2>
     <p>「${title}」のあとから確認を記録しました。</p>
     <p class="tiny">正解・不正解だけでなく、後日思い出せたかを見るための記録です。</p>`
  ));

  A.append(btn("🏠 算数の単元へ戻る",()=>{
    const ti=(mathNav262.g===g&&mathNav262.title===title)?mathNav262.ti:0;
    subjectTermUnits("算数",g,ti);
  },"primary"));
}

/* v26.0のふりかえりを置き換え、
   記録後に「あとから確認」または「今日はここまで」を選べるようにする。 */
function mathBridgeReflect263(g,title){
  head(`🌱ふりかえり｜${title}`,()=>mathBridgeSummary260(g,title));

  [
    "😊 わかった",
    "🧮 式があると分かりやすい",
    "🖼️ 図があると分かりやすい",
    "✏️ メモすると分かりやすい",
    "🤝 一緒にもう一度やりたい"
  ].forEach(v=>A.append(btn(v,()=>{
    let a=[];
    try{
      a=JSON.parse(localStorage.getItem("ponoMathReflections")||"[]");
    }catch(e){}

    a.push({
      studentId:profile.id,
      date:new Date().toISOString(),
      subject:"算数",
      grade:g,
      unit:title,
      value:v,
      correct:mb260.ok,
      total:mb260.total
    });

    localStorage.setItem("ponoMathReflections",JSON.stringify(a));

    head("記録しました",()=>mathBridgeHome260(g,title));

    A.append(e("div","card good",
      `<h2>${title}</h2>
       <p>${v}</p>
       <p>今日の学びを記録しました。</p>`
    ));

    A.append(btn("🕰️ あとから確認",()=>mathRetention263(g,title),"primary"));

    A.append(btn("🌿 今日はここまで",()=>{
      const ti=(mathNav262.g===g&&mathNav262.title===title)?mathNav262.ti:0;
      subjectTermUnits("算数",g,ti);
    },"soft"));
  },"soft")));
}

mathBridgeReflect260 = mathBridgeReflect263;
