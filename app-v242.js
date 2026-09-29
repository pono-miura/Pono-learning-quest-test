
/* v24.2 理科図解追加時に抜けた unitSession 初期化を復元 */
textbookUnitHome=function(sub,g,title,term){
 const key=ponoSubjectKey(sub),d=unitCore(key,title,g),notes=unitSpecificNotes(sub,title,g);
 unitSession={sub:key,g,title,term,core:d,qi:0,ok:0,reads:0,start:Date.now()};
 head(`${title}｜小学${g}年`,()=>{
   const ti=Math.max(0,TERM_LABELS.indexOf(term));
   subjectTermUnits(sub,g,ti);
 });
 A.append(e("div","card",`<div class="tiny">${sub}｜小学${g}年｜${term}</div><h2>この単元で学ぶこと</h2>
 ${sub==="理科"?scienceVisual241(title):""}
 ${(Array.isArray(d.learn)?d.learn:[d.learn]).map(x=>`<p>・${x}</p>`).join("")}
 ${notes?`<div class="note">${notes}</div>`:""}
 <p class="tiny">説明を先に見ても、問題から始めても大丈夫です。</p>`));
 A.append(btn("📖 ①まなぶ から始める",unitLearn,"primary"));
 A.append(btn("🚀 問題からやってみる",unitQuestion,"soft"));
};
/* ①まなぶも現在のunitSessionを使い、②一緒にへ確実につなぐ */
unitLearn=function(){
 const u=unitSession;
 if(!u||!u.core){child();return}
 head(`①まなぶ｜${u.title}`,()=>textbookUnitHome(u.sub,u.g,u.title,u.term));
 const d=u.core;
 A.append(e("div","card",`<h2>📖 ①まなぶ</h2>${u.sub==="理科"?scienceVisual241(u.title):""}
 ${(Array.isArray(d.learn)?d.learn:[d.learn]).map(x=>`<p>${x}</p>`).join("")}
 ${u.sub==="理科"?'<p class="tiny">図は考える手がかりです。図だけで決めず、観察・実験の結果とつなげよう。</p>':""}`));
 A.append(btn("➡️ ② 一緒にやってみる",unitTogether,"primary"));
};
