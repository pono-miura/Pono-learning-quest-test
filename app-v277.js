/* v27.7 学期画面を確実に削除
   原因：学年ボタンは lexical binding の subjectGradeTerms を参照するため
   window.subjectGradeTerms の上書きでは効かなかった。
   今回は subjectGradeTerms 自体を再代入し、TEXTBOOK_MAP の全単元を直接表示する。 */

subjectGradeTerms=function(s,g){
 const key=ponoSubjectKey(s);
 const arr=(TEXTBOOK_MAP[key]&&TEXTBOOK_MAP[key][g])||[];
 head(`${s}｜小学${g}年`,()=>subjectTextbookEntry(s));
 if(!arr.length){
   A.append(e("div","card","この学年の単元を準備しています。"));
   return;
 }
 A.append(e("div","card",`<div class="tiny">小学${g}年 ${s}</div><h2>単元をえらぼう</h2><p>今やりたいところから選べます。</p>`));
 arr.forEach((name,n)=>{
   const c=e("div","unit-pick",`<span class="unit-order">${n+1}</span><span><b>${name}</b></span>`);
   c.onclick=()=>{
     if(s==="国語") japaneseTextbookOpen249(g,name);
     else if(s==="算数") mathTextbookOpen249(g,name);
     else{
       /* 理科・社会・外国語は既存教材に必要なtermだけ内部で求める。
          画面上では学期分類を表示しない。 */
       const parts=splitTerms(arr);
       let ti=parts.findIndex(p=>p.includes(name));
       if(ti<0)ti=0;
       textbookUnitHome(s,g,name,TERM_LABELS[ti]);
     }
   };
   A.append(c);
 });
};

/* 単元ホームから戻った時も学期画面へ戻さない */
if(typeof textbookUnitHome==="function"){
 const oldHome277=textbookUnitHome;
 textbookUnitHome=function(sub,g,title,term){
   const key=ponoSubjectKey(sub),core=unitCore(key,title,g);
   unitSession={sub:key,g,title,term,core,qi:0,ok:0,reads:0,start:Date.now()};
   head(`${title}｜小学${g}年`,()=>subjectGradeTerms(sub,g));
   A.append(e("div","card",`<div class="tiny">${sub}｜小学${g}年</div><h2>${title}</h2>
   <p><b>この単元で学ぶこと</b></p>${core.learn.map(x=>`<p>・${x}</p>`).join("")}
   <p class="tiny">説明を先に見ても、問題から始めても大丈夫です。</p>`));
   A.append(btn("📖 ①まなぶ から始める",unitLearn,"primary"));
   A.append(btn("🚀 問題からやってみる",unitQuestion,"soft"));
 };
}

/* 算数補完教材の戻る先も学年の単元一覧へ */
if(typeof mathBridgeHome260==="function"){
 mathBridgeHome260=function(g,title){
   mb260={g,title,ok:0,total:3,start:Date.now()};
   const d=mb260data(title);
   head(`算数｜${title}`,()=>subjectGradeTerms("算数",g));
   A.append(e("div","card",`<h2>この単元で学ぶこと</h2><p>${d[0]}</p><p class="tiny">説明からでも、問題からでも始められます。</p>`));
   A.append(btn("📖 ①まなぶ",()=>mathBridgeLearn260(g,title),"primary"));
   A.append(btn("🚀 問題からやってみる",()=>mathBridgeSelf260(g,title,0),"soft"));
 };
}
