
/* v23.5 日本の歴史：依存の少ない専用入口で確実に描画 */
function historyHome235(g,term){
 head(`日本の歴史｜小学${g}年`,()=>subjectTermUnits("社会",g,TERM_LABELS.indexOf(term)));
 A.append(e("div","card history-home235",`<div class="tiny">社会｜小学${g}年｜${term}</div>
 <h2>日本の歴史</h2>
 <p><b>この単元で学ぶこと</b></p>
 <p>・歴史上の人物や出来事を、時代の流れと人々のくらしの変化につなげて学びます。</p>
 <p>・人物名だけでなく「いつ・何をした・社会がどう変わった」を整理します。</p>
 <p class="tiny">説明を先に見ても、問題から始めても大丈夫です。</p>`));
 A.append(btn("📖 ①まなぶ から始める",()=>historyLearn235(g,term),"primary"));
 A.append(btn("🚀 問題からやってみる",()=>historyQuiz235(0,0,g,term),"soft"));
}
function historyLearn235(g,term){
 head("① まなぶ｜日本の歴史",()=>historyHome235(g,term));
 A.append(e("div","card",`<h2>時代の流れをつかもう</h2><p>まず、大きな流れを見てから人物を結びつけます。</p>
 <div class="histline235"><span>飛鳥</span><i>→</i><span>奈良</span><i>→</i><span>平安</span><i>→</i><span>鎌倉</span><i>→</i><span>安土桃山</span><i>→</i><span>江戸</span><i>→</i><span>明治</span></div>`));
 A.append(historyPeople235());
 A.append(btn("🔊 説明を聞く",()=>speakJP("歴史上の人物を、時代と出来事につなげて覚えます。人物の名前だけでなく、いつ、何をしたか、社会がどう変わったかを見ていきましょう。"),"soft"));
 A.append(btn("➡️ ② 一緒にやってみる",()=>historyTogether235(g,term),"primary"));
 A.append(btn("🚀 ③ 自分でやる",()=>historyQuiz235(0,0,g,term),"soft"));
}
function historyPeople235(){
 const ps=[
 ["聖徳太子","飛鳥時代","政治の仕組みを整え、大陸の文化を取り入れようとした"],
 ["聖武天皇","奈良時代","東大寺の大仏造立を進めた"],
 ["紫式部","平安時代","『源氏物語』を書いたとされる"],
 ["源頼朝","鎌倉時代","武士による政治の基礎を築いた"],
 ["織田信長","安土桃山時代","戦国時代の統一を進めた"],
 ["豊臣秀吉","安土桃山時代","全国統一を進めた"],
 ["徳川家康","江戸時代","江戸幕府を開いた"],
 ["伊能忠敬","江戸時代","各地を測量し日本地図作りに取り組んだ"],
 ["福沢諭吉","明治時代","西洋の学問を紹介し教育にも力を注いだ"]
 ];
 let d=e("div","card","<h2>👤 人物と時代</h2><p class='tiny'>人物アイコンは、肖像を再現するものではなく学習の手がかりです。</p>");
 ps.forEach(p=>d.append(e("div","hperson235",`<div class="hface235">👤</div><div><b>${p[0]}</b><div class="tiny">${p[1]}</div><p>${p[2]}</p></div>`)));
 return d;
}
function historyTogether235(g,term){
 head("② 一緒にやってみる｜日本の歴史",()=>historyLearn235(g,term));
 A.append(e("div","card good",`<h2>人物を「時代＋出来事」で見よう</h2>
 <p><b>例：徳川家康</b></p><p>① いつ？ → 江戸時代のはじめ</p><p>② 何をした？ → 江戸幕府を開いた</p>
 <p>③ どうつながる？ → 武士による政治が長く続く時代につながった</p>
 <p class="tiny">名前だけを覚えるより、時代と出来事をセットにすると整理しやすくなります。</p>`));
 A.append(btn("③ 自分でやってみる",()=>historyQuiz235(0,0,g,term),"primary"));
}
const HQ235=[
 ["江戸幕府を開いた人物は？",["徳川家康","紫式部","伊能忠敬"],0],
 ["『源氏物語』を書いたとされる人物は？",["紫式部","源頼朝","福沢諭吉"],0],
 ["日本地図作りのため各地を測量した人物は？",["伊能忠敬","聖武天皇","豊臣秀吉"],0],
 ["鎌倉時代、武士による政治の基礎を築いた人物は？",["源頼朝","聖徳太子","織田信長"],0],
 ["歴史を学ぶとき大切なのは？",["人物・出来事・時代をつなぐ","顔だけ覚える","名前の長さを比べる"],0]
];
function historyQuiz235(i,ok,g,term){
 if(i>=HQ235.length){historySummary235(ok,g,term);return}
 let q=HQ235[i];head(`③ 自分でやる｜${i+1}/${HQ235.length}`,()=>historyHome235(g,term));
 A.append(e("div","card",`<h2>${q[0]}</h2>`));
 A.append(btn("🔊 問題を聞く",()=>speakJP(q[0]),"soft"));
 q[1].forEach((x,n)=>A.append(btn(x,()=>historyQuiz235(i+1,ok+(n===q[2]?1:0),g,term))));
 A.append(btn("🌱 わからない・①まなぶを見る",()=>historyLearn235(g,term),"soft"));
}
function historySummary235(ok,g,term){
 head("まとめ｜日本の歴史",()=>historyHome235(g,term));
 A.append(e("div","card good",`<h2>🌱 まとめ</h2><p>5問中 ${ok}問</p>
 <p>点数だけでなく、人物と時代・出来事をつなげて考えられたかを大切にします。</p>`));
 let choices=["よくわかった","少しわかった","もう一度①まなぶを見たい"];
 choices.forEach(x=>A.append(btn(x,()=>historyFinish235(x,ok,g,term),"soft")));
}
function historyFinish235(ref,ok,g,term){
 let rows=[];try{rows=JSON.parse(localStorage.getItem("ponoUnitReflections")||"[]")}catch(e){}
 rows.push({studentId:profile.id,date:new Date().toISOString(),subject:"社会",grade:g,unit:"日本の歴史",term,reflection:ref,correct:ok,total:5,reads:0});
 localStorage.setItem("ponoUnitReflections",JSON.stringify(rows));
 head("🌿 単元ふりかえり",child);
 A.append(e("div","card good",`<h2>日本の歴史</h2><p>${ref}</p><p>今日の学びを記録しました。</p>`));
 A.append(btn("社会の単元へ戻る",()=>subjectTextbookEntry("社会"),"primary"));
 A.append(btn("今日の学習へ戻る",child,"soft"));
}
/* 単元一覧から日本の歴史だけ専用画面へ直結。他の単元は既存安定ルート。 */
const subjectTermUnitsBefore235=subjectTermUnits;
subjectTermUnits=function(s,g,ti){
 let key=ponoSubjectKey(s),arr=TEXTBOOK_MAP[key]&&TEXTBOOK_MAP[key][g],part=arr?splitTerms(arr)[ti]||[]:[];
 if(!(s==="社会"&&part.includes("日本の歴史"))){subjectTermUnitsBefore235(s,g,ti);return}
 let term=TERM_LABELS[ti];
 head(`${term}｜小学${g}年 ${s}`,()=>subjectGradeTerms(s,g));
 A.append(e("div","card",`<h2>${term}</h2><p>上から順に進めても、学校で今学んでいる単元から選んでも大丈夫です。</p>`));
 part.forEach((name,n)=>{
   let c=e("div","unit-pick",`<span class="unit-order">${n+1}</span><span><b>${name}</b><br><span class="tiny">${term}</span></span>`);
   c.onclick=()=>name==="日本の歴史"?historyHome235(g,term):textbookUnitHome(s,g,name,term);A.append(c);
 });
};
