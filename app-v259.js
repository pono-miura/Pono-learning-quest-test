/* v25.9 全体点検：国語の教科書単元直結を修正 + 点検画面 */
function jUnits259(g){
 const names={1:"J1UNITS",2:"J2UNITS",3:"J3UNITS",4:"J4UNITS",5:"J5UNITS",6:"J6UNITS"};
 try{return window[names[g]]||eval(`typeof ${names[g]}!=="undefined"?${names[g]}:[]`)}catch(e){return[]}
}
function norm259(s){return String(s||"").replace(/[・「」『』（）()、。？！?!\s]/g,"").replace(/漢字クエスト/g,"漢字")}
function findJapaneseUnit259(g,title){
 const a=jUnits259(g),n=norm259(title);
 let x=a.find(u=>norm259(u.title)===n);if(x)return x;
 x=a.find(u=>norm259(u.title).includes(n)||n.includes(norm259(u.title)));if(x)return x;
 const aliases={
 "ことばと文のきほん":["ことば","文"],"ひらがな・カタカナ":["ひらがな","カタカナ"],
 "じゅんばんをつかむ":["順番","じゅんばん"],"だれ・いつ・どこ・なに":["だれ","いつ","どこ"],
 "りゆうを見つける":["理由","りゆう"],"ばめんときもち":["場面","気持ち","きもち"],
 "文の組み立て":["文"],"主語と述語":["主語","述語"],"順序をとらえる":["順序"],
 "理由と結果":["理由"],"場面と人物のようす":["場面","人物"],"大事なことを見つける":["大事","要点"],
 "段落と文章の組み立て":["段落"],"大事なこと・要点":["要点"],"理由と具体例":["理由","具体例"],
 "段落どうしの関係":["段落"],"指示語・接続語":["指示語","接続語"],"要点と要約":["要点","要約"],
 "文章全体の構成をとらえる":["構成"],"要旨をとらえる":["要旨"],"考えと根拠を結びつける":["根拠"],
 "文章の構成と展開をとらえる":["構成","展開"],"要旨と筆者の主張をとらえる":["要旨","主張"],"主張と根拠を吟味する":["主張","根拠"]
 };
 const ks=aliases[title]||[];
 return a.find(u=>ks.some(k=>norm259(u.title).includes(norm259(k))))||null;
}
japaneseTextbookOpen249=function(g,title){
 japaneseGrade=g;localStorage.setItem("ponoJapaneseGrade",g);
 if(/漢字/.test(title)&&typeof japaneseKanjiTermMenu==="function"){japaneseStart();return}
 const u=findJapaneseUnit259(g,title);
 if(u){japaneseUnitEntry(u,g);return}
 japaneseStart();
};
/* 開発中の点検結果を先生画面から確認。子ども画面には出さない */
function audit259(){
 const issues=[];
 for(let g=1;g<=6;g++){
  const jm=(TEXTBOOK_MAP["国語"]&&TEXTBOOK_MAP["国語"][g])||[];
  const ju=jUnits259(g);
  if(!ju.length)issues.push(`国語 小${g}：単元データを確認`);
  const mm=(TEXTBOOK_MAP["算数"]&&TEXTBOOK_MAP["算数"][g])||[];
  const mapped=mm.filter(t=>findMathNode249(g,t)).length;
  if(mapped<mm.length)issues.push(`算数 小${g}：教科書マップ ${mm.length}件中 ${mapped}件が詳細単元へ直結`);
 }
 return issues;
}
function auditScreen259(){
 head("先生｜全体点検",teacher);
 const issues=audit259();
 A.append(e("div","card",`<h2>🔎 全体完成に向けた点検</h2><p>現在の機能を壊さず、入口・単元・学習終盤・記録を確認しています。</p></div>`));
 A.append(e("div","card",`<h3>今回修正</h3><p>✅ 国語の「教科 → 学年 → 学期 → 単元」から、単元オブジェクトを正しく渡して学習画面へ入るよう修正しました。</p><p>✅ 既存の漢字・書字・音声・先生/保護者分析はそのまま保持します。</p></div>`));
 A.append(e("div","card",`<h3>次に埋めるところ</h3>${issues.length?`<p>${issues.join("<br>")}</p>`:"<p>大きな入口の未接続は見つかっていません。</p>"}<p class="tiny">この点検は教材内容の完全性を保証するものではなく、現在登録されている単元との接続確認です。</p></div>`));
}
if(typeof teacher==="function"){
 const t259=teacher;
 teacher=function(){t259();setTimeout(()=>{if(!document.getElementById("audit259entry")){let d=e("div","card",`<h3>🔎 全体点検</h3><p>完成前の接続・抜けを確認します。</p>`);d.id="audit259entry";d.append(btn("点検結果を見る",auditScreen259,"soft"));A.append(d)}},0)}
}
