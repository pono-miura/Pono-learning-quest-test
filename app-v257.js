/* v25.7 全教科「その子の学び方」 */
function p257get(key){try{return JSON.parse(localStorage.getItem(key)||"[]")}catch(e){return[]}}
function p257txt(v){try{return JSON.stringify(v)}catch(e){return String(v||"")}}
function p257all(){
 const keys=["ponoUnitReflections","ponoMathReflections","ponoJapaneseDifficulty","ponoJapaneseRetention","ponoAllSubjectRetention","ponoEnglishRetention","ponoEnglishSpeaking","ponoKanjiLearning252"];
 let rows=[];keys.forEach(k=>p257get(k).forEach(r=>rows.push({...r,_key:k,_txt:p257txt(r)})));return rows;
}
function p257mine(){
 const id=(profile&&profile.id)||"";
 return p257all().filter(r=>!id||!r.studentId||r.studentId===id);
}
function p257analyze(rows){
 const s={audio:0,visual:0,explain:0,together:0,independent:0,writing:0,retention:0,speaking:0,review:0};
 rows.forEach(r=>{
   const t=r._txt;
   if(/音声|読み上げ|listen|聞いて/.test(t))s.audio++;
   if(/図|式|メモ|筆算|形|見ると分かる/.test(t))s.visual++;
   if(/説明|まなぶ|explain/.test(t))s.explain++;
   if(/一緒|together|ヒント/.test(t))s.together++;
   if(/自力|自分で|independent|できた/.test(t))s.independent++;
   if(/書くのは大変|書字|少しむずかしかった/.test(t))s.writing++;
   if(/定着確認済み|retention.*true|correct.*true/.test(t))s.retention++;
   if(/speaking|伝わった/.test(t))s.speaking++;
   if(/もう一度|復習|review/.test(t))s.review++;
 });
 return s;
}
function p257notes(s){
 let good=[],tools=[],next=[];
 if(s.independent)good.push("自分で進められた記録があります");
 if(s.retention)good.push("あとから確認できた学習があります");
 if(s.speaking)good.push("外国語を声に出して伝える経験があります");
 if(s.audio)tools.push("音声・読み上げ");
 if(s.visual)tools.push("図・形・メモ");
 if(s.explain)tools.push("説明から確認");
 if(s.together)tools.push("一緒に考える・ヒント");
 if(s.writing)next.push("書字量を増やすより、理解と書字負担を分けて確認");
 if(s.review)next.push("もう一度見たい内容を短く再確認");
 if(s.audio)next.push("音声を選べる状態を継続");
 if(s.visual)next.push("図やメモを使える状態を継続");
 if(!next.length)next.push("今使えている方法を続け、後日の定着を確認");
 return {good,tools,next};
}
function p257subjectCounts(rows){
 const names=["国語","算数","理科","社会","外国語"];
 let o={};names.forEach(n=>o[n]=0);
 rows.forEach(r=>{let t=r._txt;if(/国語|japanese|kanji|漢字/.test(t))o["国語"]++;if(/算数|math/.test(t))o["算数"]++;if(/理科|science/.test(t))o["理科"]++;if(/社会|social/.test(t))o["社会"]++;if(/外国語|english/.test(t))o["外国語"]++;});
 return o;
}
function learningProfile257(mode){
 const rows=p257mine(),s=p257analyze(rows),n=p257notes(s),c=p257subjectCounts(rows);
 head(mode==="parent"?"保護者｜その子の学び方":"先生｜その子の学び方",()=>mode==="parent"?parent():teacher());
 A.append(e("div","card",`<h2>🌱 点数だけでは見えない「学び方」</h2><p>どの方法なら理解しやすいか、どこに負担があるかを、教科をまたいで見ます。</p><p class="tiny">診断や能力判定ではなく、Pono内の学習記録から整理した目安です。</p></div>`));
 A.append(e("div","p257grid",
 `<div class="card"><b>🔊 音声</b><strong>${s.audio}</strong></div><div class="card"><b>🖼️ 図・メモ</b><strong>${s.visual}</strong></div><div class="card"><b>📖 説明</b><strong>${s.explain}</strong></div><div class="card"><b>🤝 一緒に</b><strong>${s.together}</strong></div><div class="card"><b>🚀 自分で</b><strong>${s.independent}</strong></div><div class="card"><b>🔁 定着</b><strong>${s.retention}</strong></div>`));
 if(mode==="parent"){
   A.append(e("div","card",`<h3>今見えていること</h3><p>${n.good.length?n.good.join("。")+"。":"学習を続けながら、その子に合う方法を見つけていきます。"}</p><h3>使いやすそうな方法</h3><p>${n.tools.length?n.tools.join("・"):"まだ記録をためているところです。"}</p>${s.writing?`<p>✍️ 書くことに負担の記録があります。書ける量だけでなく、読める・意味が分かる・考えられる力も分けて見ています。</p>`:""}`));
 }else{
   A.append(e("div","card",`<h3>今できていること</h3><p>${n.good.length?n.good.join("。")+"。":"記録蓄積中です。"}</p><h3>学習に使えている方法</h3><p>${n.tools.length?n.tools.join("・"):"記録蓄積中です。"}</p><h3>次に試したい方法</h3><p>${n.next.join("。")}。</p>${s.writing?`<p><b>書字：</b>負担の記録あり。内容理解と書字遂行を分けて確認します。</p>`:""}`));
 }
 A.append(e("div","card",`<h3>教科別の記録量</h3><div class="p257subjects">${Object.entries(c).map(([k,v])=>`<span><b>${k}</b><em>${v}</em></span>`).join("")}</div><p class="tiny">数字は点数ではなく、現在この端末に残っている関連記録の件数です。</p></div>`));
}
function p257inject(label,fn){
 if(!A||document.getElementById("p257entry"))return;
 const d=e("div","card p257entry",`<h3>🌱 その子の学び方</h3><p>国語・算数・理科・社会・外国語を横断して、使いやすい学習方法を見ます。</p>`);d.id="p257entry";d.append(btn(label,fn,"primary"));A.append(d);
}
if(typeof teacher==="function"){const t257=teacher;teacher=function(){t257();setTimeout(()=>p257inject("全教科の学び方を見る",()=>learningProfile257("teacher")),0)}}
if(typeof parent==="function"){const p257=parent;parent=function(){p257();setTimeout(()=>p257inject("その子の学び方を見る",()=>learningProfile257("parent")),0)}}
