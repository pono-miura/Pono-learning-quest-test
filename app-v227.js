
/* v22.7 全教科の単元画面を統一。単元を選んだら、その単元名のまま学習へ入る。 */
function unitSpecificNotes(sub,title,g){
 const notes=[];
 if(sub==="理科"){
   if(/風|ゴム/.test(title))notes.push("力の大きさと物の動き方を比べよう。");
   if(/音/.test(title))notes.push("音が出ている物のふるえに注目しよう。");
   if(/重さ/.test(title))notes.push("形を変えた時も重さがどうなるか確かめよう。");
   if(/磁|じしゃく/.test(title))notes.push("つく物・つかない物、極どうしの関係を比べよう。");
   if(/空気|水/.test(title))notes.push("目に見えにくいものも、押した時の変化から考えよう。");
   if(/温度|あたたまり/.test(title))notes.push("温度と体積・状態・あたたまり方の関係を見よう。");
   if(/てこ/.test(title))notes.push("支点からの距離と力の大きさに注目しよう。");
   if(/水溶液|とけ/.test(title))notes.push("見た目だけでなく、実験結果を根拠に性質を考えよう。");
 }
 if(sub==="社会"){
   if(/はたらく人|食料|工業|産業/.test(title))notes.push("作る人・運ぶ人・売る人・使う人のつながりを見よう。");
   if(/情報/.test(title))notes.push("情報を集める・選ぶ・伝える・活用する流れを考えよう。");
   if(/政治/.test(title))notes.push("制度と自分たちの生活のつながりを見よう。");
   if(/世界/.test(title))notes.push("国どうしの違いだけでなく、つながりや協力にも注目しよう。");
 }
 if(sub==="外国語"){
   if(/birthday/i.test(title))notes.push("月や日にちを聞き取り、自分の誕生日を伝えてみよう。");
   if(/subjects/i.test(title))notes.push("好きな教科をたずねたり答えたりしてみよう。");
   if(/hero/i.test(title))notes.push("人物を表すことばを使って、自分のヒーローを紹介してみよう。");
   if(/time/i.test(title))notes.push("時刻や生活の表現を聞いて、自分の一日を伝えてみよう。");
   if(/dream|future/i.test(title))notes.push("将来したいことを、知っている表現を使って伝えてみよう。");
 }
 return notes;
}
const unitCoreV225=unitCore;
unitCore=function(sub,title,g){
 let c=unitCoreV225(sub,title,g),extra=unitSpecificNotes(sub,title,g);
 if(extra.length)c.learn=[...c.learn,...extra];
 return c;
};

/* 単元選択後に「単元ホーム」を置き、いきなり問題へ飛ばさない */
function textbookUnitHome(sub,g,title,term){
 const key=ponoSubjectKey(sub),core=unitCore(key,title,g);
 unitSession={sub:key,g,title,term,core,qi:0,ok:0,reads:0,start:Date.now()};
 head(`${title}｜小学${g}年`,()=>subjectTermUnits(sub,g,TERM_LABELS.indexOf(term)));
 A.append(e("div","card",`<div class="tiny">${sub}｜小学${g}年｜${term}</div><h2>${title}</h2>
 <p><b>この単元で学ぶこと</b></p>${core.learn.map(x=>`<p>・${x}</p>`).join("")}
 <p class="tiny">説明を先に見ても、問題から始めても大丈夫です。</p>`));
 A.append(btn("📖 ①まなぶ から始める",unitLearn,"primary"));
 A.append(btn("🚀 問題からやってみる",unitQuestion,"soft"));
}

/* v22.6の単元一覧を、単元ホームへ接続 */
subjectTermUnits=function(s,g,ti){
 let key=ponoSubjectKey(s),arr=TEXTBOOK_MAP[key][g],part=splitTerms(arr)[ti]||[],term=TERM_LABELS[ti];
 head(`${term}｜小学${g}年 ${s}`,()=>subjectGradeTerms(s,g));
 A.append(e("div","card",`<h2>${term}</h2><p>上から順に進めても、学校で今学んでいる単元から選んでも大丈夫です。</p>
 <p class="tiny">単元を開くと「この単元で学ぶこと」を最初に確認できます。</p>`));
 part.forEach((name,n)=>{
   let c=e("div","unit-pick",`<span class="unit-order">${n+1}</span><span><b>${name}</b><br><span class="tiny">${term}</span></span>`);
   c.onclick=()=>{
     if(s==="国語"){japaneseGrade=g;localStorage.setItem("ponoJapaneseGrade",g);japaneseStart()}
     else if(s==="算数")mathUnitSelect(g)
     else textbookUnitHome(s,g,name,term);
   };A.append(c);
 });
};

/* 先生画面で全教科ふりかえりを簡単に確認 */
function teacherAllSubjectReflections227(){
 let rows=[];try{rows=JSON.parse(localStorage.getItem(PONO_REFLECT_KEY)||"[]")}catch(e){}
 head("🌱 全教科・単元ふりかえり",teacher);
 if(!rows.length){A.append(e("div","card","まだ単元ふりかえりの記録はありません。"));return}
 const recent=rows.slice(-30).reverse();
 recent.forEach(r=>A.append(e("div","card soft",`<b>${r.subject}｜小学${r.grade}年｜${r.unit}</b>
 <p>${r.reflection}</p><p class="tiny">${new Date(r.date).toLocaleDateString("ja-JP")}　まとめ ${r.correct}/${r.total}　読み上げ ${r.reads||0}回</p>`)));
}
const teacherBefore227=teacher;
teacher=function(){
 teacherBefore227();
 A.append(e("div","card good",`<h2>🌱 全教科の学び方</h2><p>単元末のふりかえりを教科をまたいで確認できます。</p>`));
 A.append(btn("全教科・単元ふりかえりを見る",teacherAllSubjectReflections227,"soft"));
};
