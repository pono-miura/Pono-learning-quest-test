
/* v23.6 日本の歴史：DOM直描画版。head/e/card依存を避ける */
function h236shell(title,back){
 A.innerHTML=`<div class="top"><button class="back" id="h236back">← 戻る</button><h1>${title}</h1></div><div id="h236body"></div>`;
 document.getElementById("h236back").onclick=back;
 return document.getElementById("h236body");
}
function historyHome236(g,term){
 const b=h236shell(`日本の歴史｜小学${g}年`,()=>subjectTermUnits("社会",g,TERM_LABELS.indexOf(term)));
 b.innerHTML=`<div class="card history-home236"><div class="tiny">社会｜小学${g}年｜${term}</div><h2>日本の歴史</h2>
 <p><b>この単元で学ぶこと</b></p>
 <p>・歴史上の人物や出来事を、時代の流れと人々のくらしの変化につなげて学びます。</p>
 <p>・「いつ・何をした・社会がどう変わった」を整理します。</p>
 <p class="tiny">説明を先に見ても、問題から始めても大丈夫です。</p></div>
 <button class="primary" id="h236learn">📖 ①まなぶ から始める</button>
 <button class="soft" id="h236quiz">🚀 問題からやってみる</button>`;
 document.getElementById("h236learn").onclick=()=>historyLearn236(g,term);
 document.getElementById("h236quiz").onclick=()=>historyQuiz236(0,0,g,term);
}
const HP236=[
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
function historyLearn236(g,term){
 const b=h236shell("① まなぶ｜日本の歴史",()=>historyHome236(g,term));
 b.innerHTML=`<div class="card"><h2>時代の流れをつかもう</h2><p>大きな流れを見てから、人物と出来事を結びつけます。</p>
 <div class="histline236"><span>飛鳥</span><i>→</i><span>奈良</span><i>→</i><span>平安</span><i>→</i><span>鎌倉</span><i>→</i><span>安土桃山</span><i>→</i><span>江戸</span><i>→</i><span>明治</span></div></div>
 <div class="card"><h2>👤 人物と時代</h2><p class="tiny">人物アイコンは肖像の再現ではなく、学習の手がかりです。</p>
 ${HP236.map(p=>`<div class="hperson236"><div class="hface236">👤</div><div><b>${p[0]}</b><div class="tiny">${p[1]}</div><p>${p[2]}</p></div></div>`).join("")}</div>
 <button class="soft" id="h236voice">🔊 説明を聞く</button>
 <button class="primary" id="h236together">➡️ ② 一緒にやってみる</button>
 <button class="soft" id="h236self">🚀 ③ 自分でやる</button>`;
 document.getElementById("h236voice").onclick=()=>speakJP("歴史上の人物を、時代と出来事につなげて覚えます。いつ、何をしたか、社会がどう変わったかを見ていきましょう。");
 document.getElementById("h236together").onclick=()=>historyTogether236(g,term);
 document.getElementById("h236self").onclick=()=>historyQuiz236(0,0,g,term);
}
function historyTogether236(g,term){
 const b=h236shell("② 一緒にやってみる｜日本の歴史",()=>historyLearn236(g,term));
 b.innerHTML=`<div class="card good"><h2>人物を「時代＋出来事」で見よう</h2>
 <p><b>例：徳川家康</b></p><p>① いつ？ → 江戸時代のはじめ</p><p>② 何をした？ → 江戸幕府を開いた</p>
 <p>③ どうつながる？ → 武士による政治が長く続く時代につながった</p>
 <p class="tiny">人物名だけでなく、時代と出来事をセットにして整理します。</p></div>
 <button class="primary" id="h236go">③ 自分でやってみる</button>`;
 document.getElementById("h236go").onclick=()=>historyQuiz236(0,0,g,term);
}
const HQ236=[
 ["江戸幕府を開いた人物は？",["徳川家康","紫式部","伊能忠敬"],0],
 ["『源氏物語』を書いたとされる人物は？",["紫式部","源頼朝","福沢諭吉"],0],
 ["日本地図作りのため各地を測量した人物は？",["伊能忠敬","聖武天皇","豊臣秀吉"],0],
 ["鎌倉時代、武士による政治の基礎を築いた人物は？",["源頼朝","聖徳太子","織田信長"],0],
 ["歴史を学ぶとき大切なのは？",["人物・出来事・時代をつなぐ","顔だけ覚える","名前の長さを比べる"],0]
];
function historyQuiz236(i,ok,g,term){
 if(i>=HQ236.length){historySummary236(ok,g,term);return}
 const q=HQ236[i],b=h236shell(`③ 自分でやる｜${i+1}/${HQ236.length}`,()=>historyHome236(g,term));
 b.innerHTML=`<div class="card"><h2>${q[0]}</h2></div><button class="soft" id="h236qvoice">🔊 問題を聞く</button>
 <div id="h236answers"></div><button class="soft" id="h236help">🌱 わからない・①まなぶを見る</button>`;
 document.getElementById("h236qvoice").onclick=()=>speakJP(q[0]);
 const ans=document.getElementById("h236answers");
 q[1].forEach((x,n)=>{let bt=document.createElement("button");bt.textContent=x;bt.onclick=()=>historyQuiz236(i+1,ok+(n===q[2]?1:0),g,term);ans.appendChild(bt)});
 document.getElementById("h236help").onclick=()=>historyLearn236(g,term);
}
function historySummary236(ok,g,term){
 const b=h236shell("まとめ｜日本の歴史",()=>historyHome236(g,term));
 b.innerHTML=`<div class="card good"><h2>🌱 まとめ</h2><p>5問中 ${ok}問</p>
 <p>点数だけでなく、人物と時代・出来事をつなげて考えられたかを大切にします。</p></div>
 <div class="card"><h2>単元ふりかえり</h2><p>今の感じに近いものを選んでください。</p></div><div id="h236refs"></div>`;
 ["よくわかった","少しわかった","もう一度①まなぶを見たい"].forEach(x=>{let bt=document.createElement("button");bt.className="soft";bt.textContent=x;bt.onclick=()=>historyFinish236(x,ok,g,term);document.getElementById("h236refs").appendChild(bt)});
}
function historyFinish236(ref,ok,g,term){
 let rows=[];try{rows=JSON.parse(localStorage.getItem("ponoUnitReflections")||"[]")}catch(_){}
 rows.push({studentId:profile.id,date:new Date().toISOString(),subject:"社会",grade:g,unit:"日本の歴史",term,reflection:ref,correct:ok,total:5});
 localStorage.setItem("ponoUnitReflections",JSON.stringify(rows));
 const b=h236shell("🌿 単元ふりかえり",()=>historyHome236(g,term));
 b.innerHTML=`<div class="card good"><h2>日本の歴史</h2><p>${ref}</p><p>今日の学びを記録しました。</p></div>
 <button class="primary" id="h236social">社会の単元へ戻る</button><button class="soft" id="h236child">今日の学習へ戻る</button>`;
 document.getElementById("h236social").onclick=()=>subjectTextbookEntry("社会");
 document.getElementById("h236child").onclick=child;
}
/* v23.5の日本の歴史入口をv23.6へ差し替える */
historyHome235=historyHome236;
