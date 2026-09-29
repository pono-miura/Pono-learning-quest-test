/* v26.2 算数：単元一覧から学習へ入った後も「戻る」を同じ学期へ統一 */
let mathNav262={g:null,ti:null,title:null};
const subjectTermUnitsBefore262=subjectTermUnits;
subjectTermUnits=function(s,g,ti){
 if(s!=="算数"){subjectTermUnitsBefore262(s,g,ti);return}
 const arr=(TEXTBOOK_MAP["算数"]&&TEXTBOOK_MAP["算数"][g])||[],part=splitTerms(arr)[ti]||[],term=TERM_LABELS[ti];
 mathNav262={g,ti,title:null};
 head(`${term}｜小学${g}年 算数`,()=>subjectGradeTerms("算数",g));
 A.append(e("div","card",`<h2>${term}</h2><p>上から順でも、学校で今学んでいる単元からでも大丈夫です。</p><p class="tiny">単元を開くと、その単元の学習へ直接進みます。</p>`));
 part.forEach((name,n)=>{
   let c=e("div","unit-pick",`<span class="unit-order">${n+1}</span><span><b>${name}</b><br><span class="tiny">${term}</span></span>`);
   c.onclick=()=>{mathNav262={g,ti,title:name};mathTextbookOpen249(g,name)};
   A.append(c);
 });
};
/* 補完教材の戻り先 */
const mathBridgeHomeBefore262=mathBridgeHome260;
mathBridgeHome260=function(g,title){
 mb260={g,title,ok:0,total:3,start:Date.now()};
 const d=mb260data(title),ti=(mathNav262.g===g&&mathNav262.title===title)?mathNav262.ti:0;
 head(`算数｜${title}`,()=>subjectTermUnits("算数",g,ti));
 A.append(e("div","card",`<div class="tiny">算数｜小学${g}年｜${TERM_LABELS[ti]}</div><h2>${title}</h2><p><b>この単元で学ぶこと</b></p><p>${d[0]}</p><p class="tiny">説明からでも、問題からでも始められます。</p>`));
 A.append(btn("📖 ①まなぶ",()=>mathBridgeLearn260(g,title),"primary"));
 A.append(btn("🚀 問題からやってみる",()=>mathBridgeSelf260(g,title,0),"soft"));
};
/* 既存の詳細MATHNODESへ入る場合も、ヘッダーの戻る先を学期一覧にする。
   mathLearn本体は変更せず、描画後の戻るボタンだけ差し替える。 */
const mathLearnBefore262=mathLearn;
mathLearn=function(nodeId){
 mathLearnBefore262(nodeId);
 const n=MATHNODES[nodeId];
 if(!n||mathNav262.g!==n.grade)return;
 const back=[...A.querySelectorAll("button")].find(b=>/戻|←|‹/.test((b.textContent||"").trim()));
 if(back)back.onclick=()=>subjectTermUnits("算数",mathNav262.g,mathNav262.ti);
};
/* 子ども画面の説明を明確化 */
const childBefore262=child;
child=function(){
 childBefore262();
 [...A.querySelectorAll(".subject-guide .tiny")].forEach(x=>x.textContent="教科 → 学年 → 学期ごろ → 単元 の順に進みます。算数も同じです。");
};
