/* v25.6 先生・保護者向け 漢字の学び方サマリー */
function k256rows(){
 try{return JSON.parse(localStorage.getItem("ponoKanjiLearning252")||"[]")}catch(e){return[]}
}
function k256studentRows(){
 const id=(profile&&profile.id)||"";
 return k256rows().filter(r=>!id||!r.studentId||r.studentId===id);
}
function k256summary(rows){
 const s={look:0,read:0,meaning:0,shape:0,write:0,hard:0,listen:0,review:0};
 rows.forEach(r=>{
   const v=String(r.value||"");
   if(r.mode==="listen")s.listen++;
   if(v.includes("見ると分かる"))s.look++;
   if(v.includes("読める"))s.read++;
   if(v.includes("意味が分かる"))s.meaning++;
   if(v.includes("形・パーツ"))s.shape++;
   if(v.includes("大きくなら書ける")||v.includes("書きやすかった")||v.includes("見ながらなら書けた"))s.write++;
   if(v.includes("書くのは大変")||v.includes("少しむずかしかった"))s.hard++;
   if(v.includes("もう一度見たい"))s.review++;
 });
 return s;
}
function k256recent(rows,n=8){
 const seen=new Set(),a=[];
 [...rows].reverse().forEach(r=>{if(r.kanji&&!seen.has(r.kanji)&&a.length<n){seen.add(r.kanji);a.push(r)}});
 return a;
}
function k256insight(s){
 let good=[],load=[],next=[];
 if(s.read)good.push("読めると感じている漢字があります");
 if(s.meaning)good.push("意味をつかめている漢字があります");
 if(s.look||s.shape)good.push("形を見分ける力が使えています");
 if(s.listen)good.push("音声を学習方法として使えています");
 if(s.hard)load.push("書字に負担を感じた記録があります");
 if(s.review)load.push("もう一度確認したい漢字があります");
 if(s.hard&&(s.read||s.meaning||s.look))next.push("書く量を増やすより、読める・意味が分かる力を保ちながら大きな枠で確認");
 if(s.listen)next.push("音声提示も選べる状態を継続");
 if(s.review)next.push("数日後に同じ漢字を短く再確認");
 if(!next.length)next.push("できている方法を続け、少しずつ文の中でも確認");
 return {good,load,next};
}
function kanjiTeacherSummary256(){
 const rows=k256studentRows(),s=k256summary(rows),i=k256insight(s);
 head("先生｜漢字の学び方",()=>teacher());
 A.append(e("div","card",`<h2>漢字は「読む・意味・書く」を分けて見ます</h2><p>書字だけが大変でも、漢字の理解全体が低いとは判断しません。</p></div>`));
 A.append(e("div","k256grid",
 `<div class="card"><b>👀 見る・形</b><strong>${s.look+s.shape}</strong><span>本人の確認記録</span></div>
  <div class="card"><b>🔊 読む・音声</b><strong>${s.read+s.listen}</strong><span>読む／音声利用</span></div>
  <div class="card"><b>💡 意味</b><strong>${s.meaning}</strong><span>意味が分かる</span></div>
  <div class="card"><b>✍️ 書字</b><strong>${s.write}</strong><span>書きやすさの記録</span></div>`));
 A.append(e("div","card",`<h3>今できていること</h3><p>${i.good.length?i.good.join("。")+"。":"まだ記録が少ないため、学習を続けながら確認します。"}</p><h3>負担になっている可能性</h3><p>${i.load.length?i.load.join("。")+"。":"現在の記録から大きな負担はまだ見えていません。"}</p><h3>次に試したい方法</h3><p>${i.next.join("。")}。</p><p class="tiny">※診断や能力判定ではなく、Pono内の学習記録から整理した学び方の目安です。</p></div>`));
 const recent=k256recent(rows);
 A.append(e("div","card",`<h3>最近確認した漢字</h3><div class="k256chars">${recent.length?recent.map(r=>`<span>${r.kanji}</span>`).join(""):"まだ記録がありません"}</div></div>`));
}
function kanjiParentSummary256(){
 const rows=k256studentRows(),s=k256summary(rows),i=k256insight(s);
 head("保護者｜漢字のようす",()=>parent());
 A.append(e("div","card",`<h2>できたところを分けて見ています</h2><p>「書けなかった」だけで判断せず、見る・読む・意味・書くをそれぞれ確認します。</p></div>`));
 A.append(e("div","card",`<h3>今見えていること</h3><p>${i.good.length?i.good.join("。")+"。":"まだ記録をためているところです。"}</p>${s.hard?`<p>✍️ 書くことに負担がある記録があります。大きな枠や音声など、その子が使いやすい方法を続けます。</p>`:""}<p class="tiny">家庭では「何個書けたか」だけでなく、「読めた」「意味が分かった」も成長として見られるようにします。</p></div>`));
 const recent=k256recent(rows);
 A.append(e("div","card",`<h3>最近取り組んだ漢字</h3><div class="k256chars">${recent.length?recent.map(r=>`<span>${r.kanji}</span>`).join(""):"まだ記録がありません"}</div></div>`));
}
/* 既存の先生・保護者画面に、邪魔にならない追加ボタンを差し込む */
function k256inject(label,fn){
 if(!A||document.getElementById("k256entry"))return;
 const d=e("div","card k256entry",`<h3>🌱 漢字の学び方</h3><p>読む・意味・書字の負担を分けて確認できます。</p>`);
 d.id="k256entry"; const b=btn(label,fn,"soft");d.append(b);A.append(d);
}
if(typeof teacher==="function"){
 const oldTeacher256=teacher;
 teacher=function(){oldTeacher256();setTimeout(()=>k256inject("漢字の学び方を見る",kanjiTeacherSummary256),0)}
}
if(typeof parent==="function"){
 const oldParent256=parent;
 parent=function(){oldParent256();setTimeout(()=>k256inject("漢字のようすを見る",kanjiParentSummary256),0)}
}
