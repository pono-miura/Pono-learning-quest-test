/* v25.0 国語・算数 共通の学習終盤フロー
   既存の詳細教材・適応ルート・書字・書き順・分数・メモ機能は保持。 */
const PONO_MATH_REF250="ponoMathReflections";
let math250last=null;

const oldMathJudge250=mathJudge;
mathJudge=function(){
 const before=records.length;
 oldMathJudge250();
 /* mathJudgeが最終記録まで到達した時だけ、ふりかえり入口を追加 */
 if(records.length>before){
   const r=records[records.length-1];
   if(r&&r.subject==="算数"){
     math250last=r;
     A.append(btn("🌱 単元ふりかえり",mathReflection250,"primary"));
   }
 }
};
function mathReflection250(){
 const r=math250last;if(!r)return child();
 head(`🌱 単元ふりかえり｜${r.unit}`,child);
 A.append(e("div","card",`<h2>やってみて、どうだった？</h2><p class="tiny">点数の評価ではありません。次に学びやすくするためのメモです。</p>`));
 ["😊 だいたい分かった","🧮 式にすると分かりやすかった","🖼️ 図があると分かりやすかった","✏️ メモ・筆算があると分かりやすかった","🔊 読んでもらうと分かりやすかった","🌱 もう一度一緒にやりたい"].forEach(x=>A.append(btn(x,()=>mathReflectionSave250(x),"soft")));
}
function mathReflectionSave250(choice){
 const r=math250last;let rows=[];try{rows=JSON.parse(localStorage.getItem(PONO_MATH_REF250)||"[]")}catch(e){}
 rows.push({studentId:profile.id,date:new Date().toISOString(),grade:r.grade,unit:r.unit,reflection:choice,rate:r.rate,hints:r.hints||0});
 localStorage.setItem(PONO_MATH_REF250,JSON.stringify(rows));
 head("🌿 ふりかえり完了",child);
 A.append(e("div","card good",`<h2>今日の学びを残しました</h2><p>${choice}</p><p class="tiny">算数の「あとから確認」は、学習記録をもとに少し時間をあけて出せる仕組みをそのまま使います。</p>`));
 const due=typeof retentionDue==="function"?retentionDue():null;
 if(due)A.append(btn("🔁 あとから確認",()=>startRetention(due),"primary"));
 A.append(btn("🌿 今日はここまで",child,"soft"));
}

/* 国語：従来の「つまずきの確認」を、学習者向けの短い単元ふりかえりへ。
   教師側の詳細分析データは同じ ponoJapaneseDifficulty に保存。 */
japaneseDifficultyCheck=function(u){
 head(`🌱 単元ふりかえり｜${u.title}`,japaneseStart);
 A.append(e("div","card",`<h2>やってみて、どうだった？</h2><p class="tiny">評価ではありません。近いものを一つ選んで大丈夫です。</p>`));
 const items=["😊 だいたい分かった","🔊 聞くと分かりやすかった","💡 ことばの意味を確認すると分かりやすかった","🔎 文の手がかりをもう一度見たい","✍️ 書く・メモするところが少し大変だった","🌱 もう一度一緒にやりたい"];
 items.forEach(v=>A.append(btn(v,()=>{
   let d=[];try{d=JSON.parse(localStorage.getItem("ponoJapaneseDifficulty")||"[]")}catch(e){}
   d.push({studentId:profile.id,date:new Date().toISOString(),grade:u.grade||1,unit:u.title,unitId:u.id,item:v,kind:"unitReflection"});
   localStorage.setItem("ponoJapaneseDifficulty",JSON.stringify(d));
   head("🌿 ふりかえり完了",japaneseStart);
   A.append(e("div","card good",`<h2>今日の学びを残しました</h2><p>${v}</p><p class="tiny">読む負担と内容の理解は、これまで通り分けて記録します。</p>`));
   A.append(btn("🔁 あとから確認",()=>japaneseRetentionCheck(u),"primary"));
   A.append(btn("🌿 今日はここまで",child,"soft"));
 },"soft")));
};

/* 国語の終了画面の表示名も共通フローに合わせる */
const oldJapaneseFinish250=japaneseFinish;
japaneseFinish=function(){
 oldJapaneseFinish250();
 [...A.querySelectorAll("button")].forEach(b=>{
   if((b.textContent||"").includes("つまずきの確認"))b.textContent="🌱 単元ふりかえり";
 });
};
