/* v27.5 国語 ことば・文法・表現 共通練習（1〜6年）
   漢字とv27.4読解は変更しない。 */
const JLANG275={
1:[
 ["ことばと文のきほん","ことばをつないで、意味の分かる文を作ろう。",
  [["「わたしは」「ほんを」「よみます」を正しい順にすると？",["わたしは ほんを よみます","ほんを よみます わたしは","よみます わたしは ほんを"],0,"「だれが→なにを→どうする」の順で考えよう。"],
   ["文のおわりにつけるものは？",["。","、だけ","「"],0,"文が終わったしるしを考えよう。"]]],
 ["ひらがな・カタカナ","ことばに合う文字の使い方を確かめよう。",
  [["「テレビ」を書く文字は？",["カタカナ","ひらがなだけ","数字"],0,"外国から来たことばによく使う文字だよ。"],
   ["「りんご」はどれ？",["ひらがなのことば","数字","記号"],0,"文字の形を見よう。"]]]
],
2:[
 ["文の組み立て","「だれが・何を・どうする」を意識して文を読もう。",
  [["「ねこが ボールを おいかける」で、動きを表すことばは？",["ねこが","ボールを","おいかける"],2,"何をしているかを探そう。"],
   ["「妹が 絵を かく」で、「だれが」にあたるのは？",["妹が","絵を","かく"],0,"動きをする人を探そう。"]]],
 ["主語と述語","文の「だれ・なに」と「どうする・どんなだ」を結びつけよう。",
  [["「鳥が 飛ぶ」の主語は？",["鳥が","飛ぶ","空"],0,"「だれが・なにが」にあたる部分だよ。"],
   ["「花が きれいだ」の述語は？",["花が","きれいだ","が"],1,"主語が「どうだ」と説明する部分を探そう。"]]]
],
3:[
 ["主語と述語","長めの文でも主語と述語のつながりを見つけよう。",
  [["「公園で弟が元気に走った」の主語は？",["公園で","弟が","元気に"],1,"「だれが」にあたる言葉を探そう。"],
   ["同じ文の述語は？",["公園で","元気に","走った"],2,"弟が「どうした」のかを探そう。"]]],
 ["修飾する言葉","どの言葉を詳しくしているのか考えよう。",
  [["「赤い 花が さいた」で「赤い」が詳しくしているのは？",["花","さいた","が"],0,"何が赤いのか考えよう。"],
   ["「ゆっくり 歩く」で「ゆっくり」が詳しくしているのは？",["歩く","人","道"],0,"どのようにするのかを表しているよ。"]]]
],
4:[
 ["つなぎ言葉","文と文の関係に合う接続語を選ぼう。",
  [["「雨が降っている。＿＿、かさを持っていく。」に合うのは？",["だから","しかし","たとえば"],0,"前のことが理由になって次の行動につながるよ。"],
   ["「運動は好きだ。＿＿、今日は体を休める。」に合うのは？",["そして","しかし","つまり"],1,"前と反対・違う方向の内容になる言葉を探そう。"]]],
 ["言葉を選んで伝える","相手や場面に合わせた伝え方を考えよう。",
  [["先生に物を借りたいとき、より適切なのは？",["それ貸して","貸していただけますか","早く貸して"],1,"相手に配慮した言い方を考えよう。"],
   ["友達の意見と違うとき、対話を続けやすい言い方は？",["絶対ちがう","そういう考えもあるね。私はこう思うよ","もう話さない"],1,"相手を否定せず自分の考えも伝えよう。"]]]
],
5:[
 ["敬語の基本","相手や場面に応じた言葉の使い方を確かめよう。",
  [["先生に「見る」を丁寧に伝えるなら？",["見るよ","ご覧になります","見ろ"],1,"相手の動作を敬って表す言い方を考えよう。"],
   ["自分が先生のところへ「行く」をへりくだって言うなら？",["参ります","行くぞ","お行きになる"],0,"自分の動作を低くして相手への敬意を表す言葉だよ。"]]],
 ["事実と意見","書かれている内容が事実か意見かを分けよう。",
  [["「図書館は午前9時に開館する」は？",["事実として確かめられる内容","好みだけを表す意見","命令"],0,"資料などで確かめられるか考えよう。"],
   ["「この本がいちばん面白い」は？",["必ず事実","書き手の意見","時刻"],1,"人によって考えが変わるか考えよう。"]]]
],
6:[
 ["文の成分と関係","主語・述語・修飾語の関係を整理しよう。",
  [["「大きな犬が庭を元気に走る」の述語は？",["大きな","犬が","走る"],2,"主語の動作を表す部分を探そう。"],
   ["同じ文で「大きな」が修飾する言葉は？",["犬","庭","走る"],0,"何が大きいのか考えよう。"]]],
 ["意見と根拠","自分の考えを、理由や事実と結びつけて伝えよう。",
  [["「校庭に日陰を増やした方がよい」という意見の根拠として適切なのは？",["夏は日差しが強く、休める場所が少ないという調査結果","なんとなくそう思う","昨日テレビを見た"],0,"意見と直接つながる事実を選ぼう。"],
   ["説得力を高めるために大切なのは？",["根拠を示す","同じ意見だけ繰り返す","理由を書かない"],0,"「なぜそう考えるのか」が伝わるようにしよう。"]]]
]};

function jLangFind275(g,title){
 const rows=JLANG275[Number(g)]||[], n=String(title||"").replace(/\s/g,"");
 let r=rows.find(x=>n.includes(x[0].replace(/\s/g,""))||x[0].replace(/\s/g,"").includes(n));
 if(r)return r;
 /* 既存単元名のゆれに対応 */
 const keys=[
  [/ことば|文のきほん|ひらがな|カタカナ/,1],
  [/文の組み立て|主語|述語/,2],
  [/主語|述語|修飾/,3],
  [/接続|つなぎ|言葉を選|伝え/,4],
  [/敬語|事実|意見/,5],
  [/文の成分|意見|根拠/,6]
 ];
 const k=keys.find(x=>x[1]===Number(g)&&x[0].test(title));
 return k?rows[0]:null;
}
let jl275={};
function jLangHome275(g,title,row){
 jl275={g,title,row,ok:0,hints:0};
 head(`国語｜${title}`,()=>subjectGradeTerms("国語",g));
 A.append(e("div","card",`<div class="tiny">小学${g}年 国語</div><h2>${title}</h2><p>${row[1]}</p><div class="jpoint272"><b>🌱 ポイント</b><br>答えを覚えるのではなく、言葉の役割や伝わり方を考えます。</div>`));
 A.append(btn("📘 ①まなぶ",()=>jLangLearn275(g,title,row),"primary"));
 A.append(btn("🚀 問題からやってみる",()=>jLangSelf275(g,title,row,0),"soft"));
}
function jLangLearn275(g,title,row){
 head(`①まなぶ｜${title}`,()=>jLangHome275(g,title,row));
 A.append(e("div","card",`<h2>ことばの働きを見てみよう</h2><p>${row[1]}</p><div class="jhint272"><b>💡 考え方</b><br>「どの言葉とどの言葉がつながっているかな？」「相手にはどう伝わるかな？」と考えてみよう。</div>`));
 A.append(btn("🔊 説明を聞く",()=>speakJP(row[1]),"soft"));
 A.append(btn("➡️ ② 一緒にやってみる",()=>jLangTogether275(g,title,row),"primary"));
}
function jLangTogether275(g,title,row){
 const q=row[2][0]; head(`②一緒に｜${title}`,()=>jLangLearn275(g,title,row));
 A.append(e("div","card",`<h2>一緒に考えよう</h2><div class="jquestion273"><div class="jqtext273">${q[0]}</div></div><div class="jroot273"><b>🔎 見るところ</b><p>${q[3]}</p></div>`));
 A.append(btn("③ 自分でやってみる",()=>jLangSelf275(g,title,row,0),"primary"));
}
function jLangSelf275(g,title,row,i,msg=""){
 const q=row[2][i]; head(`③自分で｜${title}`,()=>jLangTogether275(g,title,row));
 A.append(e("div","jquestion273",`<div class="jqnum273">❓ 問題 ${i+1} / ${row[2].length}</div><div class="jqtext273">${q[0]}</div>`));
 if(msg)A.append(e("div","jfeedback273",msg));
 q[1].forEach((x,j)=>A.append(btn(x,()=>{
   if(j===q[2]){ponoCorrectPingPong244();jl275.ok++; if(i+1<row[2].length)jLangSelf275(g,title,row,i+1); else jLangDone275(g,title,row)}
   else{jl275.hints++;jLangSelf275(g,title,row,i,`💡 ヒント：${q[3]}`)}
 },"soft")));
 A.append(btn("🤝 一緒に戻る",()=>jLangTogether275(g,title,row),"ghost"));
}
function jLangDone275(g,title,row){
 head(`まとめ｜${title}`,()=>jLangHome275(g,title,row));
 A.append(e("div","card good",`<h2>できました！</h2><p>${row[1]}</p><p><b>${jl275.ok} / ${row[2].length}</b> 問を確認しました。</p>`));
 A.append(btn("🌱 単元ふりかえり",()=>jLangReflect275(g,title,row),"primary"));
 A.append(btn("🔁 もう一度",()=>{jl275.ok=0;jl275.hints=0;jLangSelf275(g,title,row,0)},"soft"));
}
function jLangReflect275(g,title,row){
 head(`🌱ふりかえり｜${title}`,()=>jLangDone275(g,title,row));
 ["😊 分かった","💡 考え方が分かった","🤝 もう一度一緒にやりたい"].forEach(v=>A.append(btn(v,()=>{
  let a=[];try{a=JSON.parse(localStorage.getItem("ponoJapaneseDifficulty")||"[]")}catch(e){}
  a.push({studentId:profile.id,date:new Date().toISOString(),subject:"国語",grade:g,unit:title,item:v,kind:"languageReflection",correct:jl275.ok,total:row[2].length,hints:jl275.hints});
  localStorage.setItem("ponoJapaneseDifficulty",JSON.stringify(a));
  head("記録しました",()=>jLangHome275(g,title,row));A.append(e("div","card good",`<h2>${v}</h2><p>今日の学びを記録しました。</p>`));
 },"soft")));
}

/* 最後に接続。漢字→既存、v27.4読解→既存、該当する言葉・文法のみv27.5 */
const jpOpenBefore275=japaneseTextbookOpen249;
japaneseTextbookOpen249=function(g,title){
 if(/漢字/.test(title)){jpOpenBefore275(g,title);return}
 const r=jLangFind275(g,title);
 if(r){jLangHome275(Number(g),title,r);return}
 jpOpenBefore275(g,title);
};
