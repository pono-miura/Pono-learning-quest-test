
/* v22.5 全教科共通の単元学習フロー。既存機能を保ち、教科書順ナビから各単元へ入れる。 */
const PONO_REFLECT_KEY="ponoUnitReflections";
let unitSession=null;

function unitCore(sub,title,g){
 const t=title;
 const K=(learn,together,qs)=>({learn,together,qs});
 if(sub==="理科"){
  if(/植物|花|発芽/.test(t))return K(["植物は、種類や成長の段階によって姿が変わります。","日光・水・温度など、育ちに関係する条件を比べて考えます。"],"同じ条件と変える条件を分けると、何が成長に関係したか考えやすくなります。",[["条件を比べる実験で大切なのは？",["変える条件を一つにする","全部変える","記録しない"],0],["成長のようすを確かめる方法は？",["観察して記録する","想像だけで決める","一度も見ない"],0],["植物の変化を比べる時に役立つのは？",["日付のある記録","関係ない絵","答えだけ"],0]]);
  if(/電気|電流/.test(t))return K(["電気には通り道があり、つながり方によって働きが変わります。","実験では回路や電流の向き・大きさに注目します。"],"電気の通り道を指でたどり、切れている所がないか見てみよう。",[["豆電球などが働くために大切なのは？",["回路がつながること","紙で包むこと","水に入れること"],0],["回路を調べる時は？",["つながりを見る","色だけ見る","重さだけ見る"],0],["実験結果はどうする？",["条件と結果を記録する","覚えない","毎回条件を全部変える"],0]]);
  if(/月|太陽|星/.test(t))return K(["太陽・月・星は、時間とともに見える位置や形が変わります。","方位や時刻をそろえて観察すると変化を比べられます。"],"同じ場所から時刻を変えて見ると、位置の変化を見つけやすくなります。",[["天体の位置を比べる時に記録したいのは？",["時刻と方位","好きな色","音の大きさ"],0],["観察を比べやすくするには？",["同じ場所を基準にする","毎回条件を全部変える","記録しない"],0],["太陽や月の学習で使うものは？",["観察記録","九九表だけ","国語辞典だけ"],0]]);
  if(/大地|地球|流れる水|雨水/.test(t))return K(["水や大地のようすは、流れ・地形・天気などと関係して変化します。","写真・地図・観察結果をつないで、変化の理由を考えます。"],"上流と下流、雨の前後など、二つの条件を比べてみよう。",[["変化を調べる時に役立つのは？",["写真や観察記録","想像だけ","一つの数字だけ"],0],["水は一般にどちらへ流れる？",["高い所から低い所","低い所から高い所だけ","止まったまま"],0],["資料を比べる目的は？",["変化や関係を見つける","ページ数を数える","色を決める"],0]]);
  if(/動物|こん虫|チョウ|生き物/.test(t))return K(["生き物には、体のつくりや成長のしかたに特徴があります。","似ているところと違うところを観察して整理します。"],"体の部分・食べ物・育ち方など、見る観点を一つ決めて比べよう。",[["生き物を比べる時に大切なのは？",["同じ観点で見る","名前だけ見る","記録しない"],0],["観察で残すとよいものは？",["気づいた特徴","関係ない数字","答えだけ"],0],["成長を知るには？",["時間をおいて観察する","一度だけ見る","見ない"],0]]);
  return K([`${t}では、観察・実験から分かったことを整理します。`,"「予想→確かめる→結果→分かったこと」の順に考えます。"],"何を変え、何を同じにするかを考えてから結果を見よう。",[["理科で予想を確かめるには？",["観察や実験をする","答えを先に決める","記録しない"],0],["結果の後に考えることは？",["結果から分かること","好き嫌いだけ","ページ番号"],0],["比べる時に大切なのは？",["条件をそろえる","全部変える","何も見ない"],0]]);
 }
 if(sub==="社会"){
  if(/地図|国土|県|まち|市/.test(t))return K(["地図では、方位・位置・土地の使われ方などを手がかりに地域を見ます。","地図・写真・統計を組み合わせると、地域の特色が見えてきます。"],"「どこにある？」「なぜそこに多い？」の二つを資料から考えよう。",[["地域の特色を調べる資料は？",["地図や写真","白紙だけ","想像だけ"],0],["地図で位置を見る時の手がかりは？",["方位","音量","味"],0],["資料を複数見るよさは？",["違う角度から確かめられる","必ず同じになる","考えなくてよい"],0]]);
  if(/安全|災害|健康/.test(t))return K(["くらしを守るために、地域・行政・さまざまな仕事の人が役割を分担しています。","起きる前の備えと、起きた時の対応を分けて考えます。"],"自分・地域・行政の役割を分けて整理してみよう。",[["災害への備えで大切なのは？",["事前に備える","起きてから初めて考えるだけ","何もしない"],0],["地域の仕組みを調べる方法は？",["資料や聞き取り","想像だけ","何も調べない"],0],["役割を考える時は？",["誰が何をするか整理する","全員同じと決める","名前だけ覚える"],0]]);
  if(/歴史|うつりかわり|受けつが/.test(t))return K(["昔の資料と今の資料を比べると、人々のくらしや社会の変化が分かります。","出来事を年代だけでなく、原因・変化・影響でつなぎます。"],"「前はどうだった→何が起きた→どう変わった」で並べよう。",[["昔と今を比べる資料は？",["古い写真や記録","未来だけ","白紙"],0],["出来事を理解する時に見るのは？",["原因と変化","年号だけ","文字数"],0],["資料から分かることは？",["根拠を示して考える","何でも自由に決める","見ない"],0]]);
  if(/政治|世界|日本/.test(t))return K(["社会の仕組みは、人々の生活や権利、国や地域のつながりと関係しています。","制度や出来事を「自分たちの生活とどうつながるか」で考えます。"],"制度の名前だけでなく、誰のためにどんな働きをするか見よう。",[["社会の仕組みを考える時に大切なのは？",["生活とのつながり","名前だけ","色だけ"],0],["資料を読む時は？",["根拠を確かめる","最初の一文だけ","数字を無視する"],0],["異なる立場を考えるよさは？",["多角的に考えられる","答えが必ず一つになる","資料が不要になる"],0]]);
  return K([`${t}では、地図・写真・統計・聞き取りなどの資料を使います。`,"「事実」と「そこから考えたこと」を分けて整理します。"],"資料のどこが手がかりになったか、一つ指さしてみよう。",[["社会で根拠になるものは？",["資料の情報","思いつきだけ","関係ない数字"],0],["資料を見た後は？",["分かったことを整理する","すぐ忘れる","見なかったことにする"],0],["調べたことを伝える時は？",["根拠も一緒に示す","結論だけ","何も言わない"],0]]);
 }
 if(sub==="外国語"){
  return K([`${t}では、英語を「聞く・まねする・意味をつかむ・使ってみる」の順で学びます。`,"一語ずつ完璧にするより、場面と意味を結びつけます。"],"まず音を聞き、分かる語を一つ見つけてから全体の意味を考えよう。",[["英語を聞く時、最初にするとよいのは？",["知っている語を探す","全部書き取るまで止める","聞かない"],0],["分からない語があったら？",["場面や前後から考える","すぐ全部あきらめる","必ず日本語を書き続ける"],0],["英語を使う練習で大切なのは？",["伝えてみる","間違いを恐れて話さない","速さだけ"],0]]);
 }
 return K([`${t}で大切な考え方を確認します。`,"分かったことを一つずつ使ってみます。"],"手がかりを一つ見つけて考えよう。",[["学んだことを確かめるには？",["使ってみる","見ない","忘れる"],0]]);
}

function startTextbookUnit(sub,g,title,term){
 const core=unitCore(sub,title,g);
 unitSession={sub,g,title,term,core,qi:0,ok:0,reads:0,start:Date.now()};
 unitLearn();
}
function unitLearn(){
 let u=unitSession;head(`① まなぶ｜${u.title}`,()=>textbookMap());
 A.append(e("div","card",`<div class="tiny">${u.sub}｜小学${u.g}年｜${u.term}</div><h2>この単元で学ぶこと</h2>${u.core.learn.map(x=>`<p>・${x}</p>`).join("")}`));
 A.append(btn("🔊 説明を聞く",()=>{u.reads++;speakJP(u.core.learn.join("。"))},"soft"));
 A.append(btn("➡️ ② 一緒にやってみる",unitTogether,"primary"));
 A.append(btn("🚀 ③ 自分でやる",unitQuestion,"soft"));
}
function unitTogether(){
 let u=unitSession;head(`② 一緒に｜${u.title}`,unitLearn);
 A.append(e("div","card lesson",`<h2>一緒に手がかりを見つけよう</h2><p>${u.core.together}</p><p class="tiny">答えを急がず「どこを見るか」を確認できたらOKです。</p>`));
 A.append(btn("🔊 一緒に聞く",()=>speakJP(u.core.together),"soft"));
 A.append(btn("③ 自分でやってみる",unitQuestion,"primary"));
}
function unitQuestion(){
 let u=unitSession,q=u.core.qs[u.qi];if(!q)return unitSummary();
 head(`③ 自分で｜${u.title}`,unitLearn);
 A.append(e("div","tiny",`${u.qi+1}/${u.core.qs.length}`));
 A.append(e("div","card",`<h2>${q[0]}</h2>`));
 A.append(btn("🔊 問題を聞く",()=>{u.reads++;speakJP(q[0])},"soft"));
 q[1].forEach((x,i)=>A.append(btn(x,()=>{if(i===q[2]){u.ok++;new Audio("correct.wav").play().catch(()=>{});u.qi++;unitQuestion()}else A.append(e("div","feedback warn","🌱 ①まなぶの手がかりをもう一度見ても大丈夫です。"))})));
 A.append(btn("🌱 説明に戻る",unitLearn,"soft"));
}
function unitSummary(){
 let u=unitSession;head(`まとめ｜${u.title}`,unitLearn);
 let rate=Math.round(u.ok/u.core.qs.length*100);
 A.append(e("div","card good",`<h2>まとめ問題まで取り組めました</h2><p>${u.core.qs.length}問中 ${u.ok}問</p><p class="tiny">点数だけでなく、どんな方法だと分かりやすかったかも残します。</p>`));
 A.append(btn("🌱 単元ふりかえり",unitReflection,"primary"));
}
function unitReflection(){
 let u=unitSession;head(`🌱 単元ふりかえり｜${u.title}`,unitSummary);
 A.append(e("div","card",`<h2>やってみて、どうだった？</h2><p class="tiny">評価ではありません。次に学びやすくするためのメモです。</p>`));
 const common=["😊 だいたい分かった","🤔 少し迷うところがあった","🆘 もう一度一緒にやってみたい"];
 const extra=u.sub==="理科"?["🖼️ 図や観察があると分かりやすい","💡 理科のことばが少し難しかった","✍️ 記録を書くのが大変だった"]:
 u.sub==="社会"?["🗺️ 地図や資料があると分かりやすい","💡 社会のことばが少し難しかった","🔎 資料の手がかりを見つけにくかった"]:
 ["🔊 聞くと分かりやすかった","🔤 文字で読むのが少し難しかった","🗣️ 話してみるのが難しかった"];
 [...common,...extra].forEach(x=>A.append(btn(x,()=>saveUnitReflection(x))));
}
function saveUnitReflection(choice){
 let u=unitSession,rows=[];try{rows=JSON.parse(localStorage.getItem(PONO_REFLECT_KEY)||"[]")}catch(e){}
 rows.push({studentId:profile.id,date:new Date().toISOString(),subject:u.sub,grade:u.g,unit:u.title,term:u.term,reflection:choice,correct:u.ok,total:u.core.qs.length,reads:u.reads});
 localStorage.setItem(PONO_REFLECT_KEY,JSON.stringify(rows));
 records.push({studentId:profile.id,date:new Date().toISOString(),subject:u.sub,grade:u.g,unit:u.title,content:"教科書順単元学習",correct:u.ok,total:u.core.qs.length,rate:Math.round(u.ok/u.core.qs.length*100),reads:u.reads,status:"学習済み",process:"①まなぶ→②一緒に→③自分で→まとめ→ふりかえり"});
 save();
 head("🌿 ふりかえり完了",child);
 A.append(e("div","card good",`<h2>今日の学びを残しました</h2><p>${choice}</p><p class="tiny">この記録は、次の学び方を考える材料になります。</p>`));
 A.append(btn("📚 教科書順の単元へ",textbookMap,"primary"));A.append(btn("🌿 今日はここまで",child,"soft"));
}

/* v22.3の単元マップを、実際の単元学習へ接続し直す */
textbookMap=function(){
 head("📚 河口湖・教科書順の単元",child);
 A.append(e("div","card",`<h2>学校の学習順から探す</h2><p>学年 → 学期ごろ → 単元の順に選べます。</p><p class="tiny">学校の進度は前後するため「学期ごろ」は目安です。</p>`));
 ["国語","算数","理科","社会","外国語"].forEach(sub=>{
  let d=e("details","card"),sm=document.createElement("summary");sm.innerHTML=`<b>${sub}</b> <span class="tiny">${TEXTBOOK_INFO[sub]}</span>`;d.append(sm);
  for(let g=1;g<=6;g++){let arr=TEXTBOOK_MAP[sub][g];if(!arr)continue;let gd=e("details","soft"),gs=document.createElement("summary");gs.innerHTML=`小学${g}年`;gd.append(gs);
   splitTerms(arr).forEach((part,ti)=>{if(!part.length)return;gd.append(e("h3","term-title",TERM_LABELS[ti]));
    part.forEach(name=>{let c=e("div","unit-pick",`<b>${name}</b><br><span class="tiny">${TERM_LABELS[ti]}</span>`);
     c.onclick=()=>{
      if(sub==="国語"){japaneseGrade=g;localStorage.setItem("ponoJapaneseGrade",g);japaneseStart()}
      else if(sub==="算数")mathUnitSelect(g);
      else startTextbookUnit(sub,g,name,TERM_LABELS[ti]);
     };gd.append(c)});
   });d.append(gd)
  }A.append(d)
 });
 A.append(e("div","card soft",`<b>🌱 Ponoの進め方</b><p class="tiny">単元 → ①まなぶ → ②一緒に → ③自分で → まとめ → 単元ふりかえり。国語・算数はこれまで作った詳しい教材を使い、理科・社会・外国語も単元から学習に入れるようになりました。</p>`));
};
