/* v24.9 国語・算数：教科→学年→学期→選んだ単元へ直接接続 */
function findMathNode249(g,title){
 const vals=Object.entries(MATHNODES).filter(([id,n])=>n.grade===g);
 let exact=vals.find(([id,n])=>n.title===title); if(exact)return exact[0];
 const aliases={
 "たし算・ひき算の意味":["たし算","ひき算"],"長さ・かさ・時こく":["長さ","時こく"],
 "大きいかず":["かず"],"たし算・ひき算の筆算":["たし算","ひき算"],
 "時こくと時間":["時こく","時間"],"水のかさ":["かさ"],"三角形と四角形":["三角形","四角形"],
 "かけ算・九九":["かけ算"],"わり算":["わり算"],"長いものの長さ":["長さ"],
 "表とぼうグラフ":["表","グラフ"],"あまりのあるわり算":["わり算"],"大きい数":["大きい数","かず"],
 "かけ算の筆算":["かけ算"],"分数":["分数"],"わり算の筆算":["わり算"],"角":["角"],
 "折れ線グラフ":["折れ線"],"面積":["面積"],"直方体と立方体":["直方体","立方体","体積"],
 "体積":["体積"],"小数のかけ算":["小数"],"小数のわり算":["小数"],"合同な図形":["合同"],
 "分数のたし算・ひき算":["分数"],"平均":["平均"],"割合":["割合"],
 "分数のかけ算":["分数のかけ算"],"分数のわり算":["分数のわり算"],"比":["比"],
 "円の面積":["円の面積"],"データの調べ方":["データ","グラフ","平均"]
 };
 const keys=aliases[title]||[title];
 let hit=vals.find(([id,n])=>keys.some(k=>n.title.includes(k)||k.includes(n.title)));
 return hit?hit[0]:null;
}
function mathTextbookOpen249(g,title){
 const id=findMathNode249(g,title);
 if(id && typeof mathLearn==="function"){mathLearn(id);return}
 mathUnitSelect(g);
}
function japaneseTextbookOpen249(g,title){
 japaneseGrade=g;localStorage.setItem("ponoJapaneseGrade",g);
 /* Unitized Japanese screens already know the textbook-map titles; prefer direct entry when available. */
 if(typeof japaneseUnitEntry==="function"){
   try{japaneseUnitEntry(title,g);return}catch(e){}
 }
 japaneseStart();
}
const termUnits249=subjectTermUnits;
subjectTermUnits=function(s,g,ti){
 if(s!=="国語"&&s!=="算数"){termUnits249(s,g,ti);return}
 let key=ponoSubjectKey(s),arr=TEXTBOOK_MAP[key]&&TEXTBOOK_MAP[key][g],part=splitTerms(arr||[])[ti]||[];
 head(`${TERM_LABELS[ti]}｜小学${g}年 ${s}`,()=>subjectGradeTerms(s,g));
 A.append(e("div","card",`<h2>${TERM_LABELS[ti]}</h2><p>上から順でも、今学んでいる単元からでも大丈夫です。</p><p class="tiny">選んだ単元の学習画面へ直接進みます。</p>`));
 part.forEach(name=>{
  let c=e("div","unit-pick",`<b>${name}</b><br><span class="tiny">${TERM_LABELS[ti]}</span>`);
  c.onclick=()=>s==="国語"?japaneseTextbookOpen249(g,name):mathTextbookOpen249(g,name);
  A.append(c);
 });
};
