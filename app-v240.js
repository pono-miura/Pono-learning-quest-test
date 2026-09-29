
/* v24.0 外国語：①まなぶ に「意味を見る」を追加
   最初から日本語を出さず、必要な時だけ確認できる。 */
const ENGMEAN240={
"Hello.":"こんにちは。／やあ。",
"Hi.":"やあ。／こんにちは。",
"Good morning.":"おはようございます。",
"Goodbye.":"さようなら。／またね。",
"How are you?":"元気ですか？",
"I'm fine.":"元気です。",
"Thank you.":"ありがとう。",
"Nice to meet you.":"はじめまして。",
"Hello! I'm Hana. Nice to meet you.":"こんにちは！私はハナです。はじめまして。",
"Yes.":"はい。",
"No.":"いいえ。",
"Please.":"お願いします。",
"Here you are.":"どうぞ。",
"You're welcome.":"どういたしまして。"
};
function cleanEng240(s){return String(s||"").trim()}
function wordMeaning240(x){
 const k=cleanEng240(x);
 if(ENGMEAN240[k])return ENGMEAN240[k];
 const low=k.toLowerCase().replace(/[.!?]/g,"");
 const dict={
  "hello":"こんにちは。／やあ。","hi":"やあ。／こんにちは。","good morning":"おはようございます。",
  "goodbye":"さようなら。／またね。","red":"赤","blue":"青","yellow":"黄色","green":"緑",
  "one":"1／ひとつ","two":"2／ふたつ","three":"3／みっつ","four":"4／よっつ","five":"5／いつつ",
  "monday":"月曜日","tuesday":"火曜日","wednesday":"水曜日","thursday":"木曜日","friday":"金曜日",
  "saturday":"土曜日","sunday":"日曜日","pen":"ペン","pencil":"えんぴつ","eraser":"消しゴム",
  "ruler":"定規","book":"本","school":"学校","park":"公園","library":"図書館","post office":"郵便局",
  "birthday":"誕生日","subject":"教科","english":"英語","math":"算数","science":"理科","music":"音楽",
  "time":"時刻／時間","dream":"夢","future":"未来","hero":"あこがれの人／ヒーロー",
  "summer vacation":"夏休み","memory":"思い出","animal":"動物","animals":"動物"
 };
 return dict[low]||"このことばの意味は、文や場面といっしょに確かめよう。";
}
function modelMeaning240(s){
 const k=cleanEng240(s);
 if(ENGMEAN240[k])return ENGMEAN240[k];
 /* 単元データの英文は、語を置き換えず「場面の意味」を短く表示。
    未登録文を誤訳しないため、学習者に断定的な自動翻訳はしない。 */
 const t=k.toLowerCase();
 if(t.includes("my name is")||t.includes("i'm "))return "自分の名前や自分のことを伝える表現です。";
 if(t.includes("i like"))return "自分の好きなものを伝える表現です。";
 if(t.includes("do you like"))return "相手の好きなものをたずねる表現です。";
 if(t.includes("what time"))return "時刻をたずねる表現です。";
 if(t.includes("what do you want"))return "ほしいものをたずねる表現です。";
 if(t.includes("where"))return "場所をたずねる表現です。";
 if(t.includes("when"))return "いつかをたずねる表現です。";
 if(t.includes("can "))return "できることについて伝えたり、たずねたりする表現です。";
 return "この英文がどんな場面で使われるかを、絵や音といっしょに確かめよう。";
}
function meaningToggle240(text,kind="word"){
 const wrap=document.createElement("span");wrap.className="meaningWrap240";
 const b=btn("💡 意味",()=> {
   let m=wrap.querySelector(".meaning240");
   if(!m){m=document.createElement("div");m.className="meaning240";m.textContent=kind==="model"?modelMeaning240(text):wordMeaning240(text);wrap.append(m);b.textContent="💡 意味をとじる";}
   else {m.remove();b.textContent="💡 意味";}
 },"meaningBtn240");
 wrap.append(b);return wrap;
}
function modelMeaningBlock240(text){
 const box=document.createElement("div");box.className="modelMeaningBlock240";
 const b=btn("💡 お手本の意味を見る",()=>{
  let m=box.querySelector(".modelMeaning240");
  if(!m){m=document.createElement("div");m.className="modelMeaning240";m.textContent=modelMeaning240(text);box.append(m);b.textContent="💡 意味をとじる";}
  else{m.remove();b.textContent="💡 お手本の意味を見る";}
 },"soft");
 box.append(b);return box;
}

/* v23.9を保ったまま、①まなぶの単語とお手本に意味確認を追加 */
englishLearn237=function(g,title,term){
 const d=ENG237[title],label=g<=4?"外国語活動":"外国語";
 head(`① まなぶ｜${title}`,()=>englishHome237(g,title,term));
 const card=e("div","card",`<div class="tiny">${label}｜小学${g}年</div><h2>👂 まず聞いてみよう</h2>${engScene237(d)}
 <h3>この単元のことば</h3><div class="words240"></div>
 <p class="tiny">文字を読むのが大変なときは、音を聞いて意味が分かれば学びになっています。</p>`);
 const wl=card.querySelector(".words240");
 d.words.forEach(x=>{
   const row=document.createElement("div");row.className="engword240";
   const w=document.createElement("b");w.textContent=x;
   const controls=document.createElement("div");controls.className="engControls240";
   const sp=btn("🔊",()=>{unitSession.reads++;speakEN238(x,false)},"miniSpeak240");
   controls.append(sp,meaningToggle240(x,"word"));row.append(w,controls);wl.append(row);
 });
 A.append(card);
 let aud=engAudioButtons238(d.model);
 [...aud.querySelectorAll("button")].forEach(b=>b.addEventListener("click",()=>unitSession.reads++));
 A.append(aud);
 A.append(modelMeaningBlock240(d.model));
 A.append(speakingPractice239(d.model,g,title));
 A.append(btn("➡️ ② 一緒にやってみる",()=>englishTogether237(g,title,term),"primary"));
};
