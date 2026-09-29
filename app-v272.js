/* v27.2 国語6年：漢字を変えず、読解系を共通エンジン化 */
const JREAD272={
 "文章の構成と展開をとらえる":{
  skill:"文章の組み立てを、段落の役割とつながりから読む",
  text:"町の図書館では、今年から「本の交換棚」を始めた。読み終えた本を持ってきた人は、棚にある別の本を一冊持ち帰ることができる。始めた理由は、本を捨てずに次の人へ渡し、本と出会う機会を増やすためだ。利用した人からは「自分では選ばない本に出会えた」という声も出ている。",
  focus:"最初に「何を始めたか」、次に「しくみ」、そのあとに「理由・結果」が書かれています。",
  qs:[
   ["この文章で最初に示されていることは？",["交換棚を始めたこと","本の値段","図書館の場所"],0,"最初の文に注目しよう。"],
   ["交換棚を始めた理由として最も合うものは？",["本を全部新しくするため","本を次の人へ渡し出会いを増やすため","図書館を広くするため"],1,"「始めた理由は」の後を読もう。"],
   ["文章の展開として最も近いものは？",["取り組み→しくみ→理由→利用者の声","結論→天気→会話","人物→事件→解決"],0,"段落ごとの役割を順に並べてみよう。"]
  ]
 },
 "要旨と筆者の主張をとらえる":{
  skill:"具体例にまどわされず、筆者が一番伝えたいことをつかむ",
  text:"便利な道具は、時間を短くしてくれる。しかし、便利だからという理由だけで何でも任せてしまうと、自分で考える機会が減ることもある。大切なのは、道具を使わないことではない。何のために使うのかを考え、自分で選んで使うことだ。",
  focus:"「大切なのは」の後には、筆者が特に伝えたい考えが置かれています。",
  qs:[
   ["筆者が一番伝えたいことは？",["便利な道具は使わない方がよい","目的を考えて自分で選んで道具を使う","道具は時間を長くする"],1,"「大切なのは」の後をもう一度見よう。"],
   ["「しかし」は何を示している？",["前と反対・別の見方へ進む","同じ内容を繰り返す","時間を表す"],0,"「しかし」の前後で内容がどう変わるか見よう。"],
   ["要旨として最も適切なのは？",["道具の便利さだけを説明している","道具を目的に合わせ主体的に使う大切さを述べている","道具の作り方を説明している"],1,"文章全体を一文でまとめよう。"]
  ]
 },
 "主張と根拠を吟味する":{
  skill:"主張だけでなく、その理由や根拠が十分かを考える",
  text:"学校の昼休みに外で遊ぶ時間を増やすとよい。体を動かすと気分転換になり、その後の活動に集中しやすくなるからだ。実際に、私のクラスでは外遊びをした日に「午後がすっきりした」と話す人が何人もいた。",
  focus:"「〜するとよい」が主張、「〜からだ」が理由、その後が具体的な根拠です。",
  qs:[
   ["書き手の主張は？",["昼休みの外遊び時間を増やすとよい","午後の授業をなくすとよい","全員同じ遊びをするとよい"],0,"「〜するとよい」と書かれた部分を探そう。"],
   ["主張を支える理由は？",["外は広いから","気分転換になり、その後集中しやすいから","昼休みが長いから"],1,"「〜からだ」の前を見よう。"],
   ["根拠をより確かにするには、何があるとよい？",["より多くの人や複数の日の記録","書き手の好きな色","校舎の高さ"],0,"一つのクラスの感想だけで十分か考えてみよう。"]
  ]
 }
};
let jr272=null;
function jReadData272(title){
 if(JREAD272[title])return JREAD272[title];
 if(/要旨|主張/.test(title))return JREAD272["要旨と筆者の主張をとらえる"];
 if(/構成|展開|段落/.test(title))return JREAD272["文章の構成と展開をとらえる"];
 if(/根拠|考え/.test(title))return JREAD272["主張と根拠を吟味する"];
 return null;
}
function jReadHome272(g,title){
 const d=jReadData272(title);jr272={g,title,d,ok:0,hints:0};
 head(`国語｜${title}`,()=>subjectGradeTerms("国語",g));
 A.append(e("div","card",`<div class="tiny">小学${g}年 国語</div><h2>${title}</h2><p><b>この単元で身につけること</b></p><p>${d.skill}</p><p class="tiny">文章を読む → 手がかりを見る → 一緒に考える → 自分で解く、の順に進みます。</p>`));
 A.append(btn("📖 ①まなぶ",()=>jReadLearn272(g,title),"primary"));
 A.append(btn("🚀 問題からやってみる",()=>jReadSelf272(g,title,0),"soft"));
}
function jPassage272(d){
 return `<div class="jpass272"><div class="jlabel272">文章</div><p>${d.text}</p></div>`;
}
function jReadLearn272(g,title){
 const d=jReadData272(title);head(`①まなぶ｜${title}`,()=>jReadHome272(g,title));
 A.append(e("div","card",`<h2>まず文章を読もう</h2>${jPassage272(d)}<div class="jpoint272"><b>🔎 今日の読み方</b><br>${d.focus}</div>`));
 A.append(btn("🔊 文章を聞く",()=>speakJP(d.text),"soft"));
 A.append(btn("➡️ ② 一緒にやってみる",()=>jReadTogether272(g,title),"primary"));
}
function jReadTogether272(g,title){
 const d=jReadData272(title);head(`②一緒に｜${title}`,()=>jReadLearn272(g,title));
 A.append(e("div","card",`<h2>手がかりを見つけよう</h2>${jPassage272(d)}<div class="jhint272"><b>💡 ここを見る</b><br>${d.focus}</div><p>答えだけを探すのではなく、<b>「どの言葉を根拠にしたか」</b>を確かめます。</p>`));
 A.append(btn("③ 自分でやってみる",()=>jReadSelf272(g,title,0),"primary"));
}
function jReadSelf272(g,title,i,msg=""){
 const d=jReadData272(title),q=d.qs[i];head(`③自分で｜${title}`,()=>jReadTogether272(g,title));
 A.append(e("div","jq272",`<div class="jqnum272">問題 ${i+1} / ${d.qs.length}</div><div class="jqtext272">${q[0]}</div></div>`));
 A.append(e("div","card",jPassage272(d)+(msg?`<div class="jfeedback272">${msg}</div>`:"")));
 q[1].forEach((x,j)=>A.append(btn(x,()=>{
   if(j===q[2]){ponoCorrectPingPong244();jr272.ok++; if(i+1<d.qs.length)jReadSelf272(g,title,i+1);else jReadSummary272(g,title)}
   else {jr272.hints++;jReadSelf272(g,title,i,`💡 ヒント：${q[3]}<br>もう一度選んでみよう。`)}
 },"soft")));
 A.append(btn("🤝 一緒に戻る",()=>jReadTogether272(g,title),"ghost"));
}
function jReadSummary272(g,title){
 const d=jReadData272(title);head(`まとめ｜${title}`,()=>jReadHome272(g,title));
 A.append(e("div","card good",`<h2>ここまでできました</h2><p>${d.skill}</p><p><b>${jr272.ok} / ${d.qs.length}</b> 問を自分で確認しました。</p><p class="tiny">間違えた問題は、答えではなく「見る場所」のヒントから再挑戦しています。</p>`));
 A.append(btn("🌱 単元ふりかえり",()=>jReadReflect272(g,title),"primary"));
 A.append(btn("🔁 もう一度問題",()=>{jr272.ok=0;jr272.hints=0;jReadSelf272(g,title,0)},"soft"));
}
function jReadReflect272(g,title){
 head(`🌱ふりかえり｜${title}`,()=>jReadSummary272(g,title));
 ["😊 読み方が分かった","🔎 手がかりを見つけられた","🔊 聞くと分かりやすかった","🤝 もう一度一緒にやりたい"].forEach(v=>A.append(btn(v,()=>{
   let a=[];try{a=JSON.parse(localStorage.getItem("ponoJapaneseDifficulty")||"[]")}catch(e){}
   a.push({studentId:profile.id,date:new Date().toISOString(),subject:"国語",grade:g,unit:title,item:v,kind:"unitReflection",correct:jr272.ok,total:jr272.d.qs.length,hints:jr272.hints});
   localStorage.setItem("ponoJapaneseDifficulty",JSON.stringify(a));
   head("記録しました",()=>jReadHome272(g,title));A.append(e("div","card good",`<h2>${v}</h2><p>今日の読み方を記録しました。</p>`));A.append(btn("🌿 単元へ戻る",()=>jReadHome272(g,title),"primary"));
 },"soft")));
}
/* 漢字は既存のまま。6年読解系だけ新エンジンへ接続 */
const jpOpenBefore272=japaneseTextbookOpen249;
japaneseTextbookOpen249=function(g,title){
 if(Number(g)===6 && !/漢字/.test(title) && jReadData272(title)){jReadHome272(6,title);return}
 jpOpenBefore272(g,title);
};