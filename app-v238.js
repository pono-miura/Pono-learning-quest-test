
/* v23.8 外国語音声を日本語TTSから完全分離 */
let ponoEnglishVoices238=[];
function loadEnglishVoices238(){
 const vs=window.speechSynthesis?window.speechSynthesis.getVoices():[];
 ponoEnglishVoices238=vs.filter(v=>/^en([-_]|$)/i.test(v.lang||""));
}
if(window.speechSynthesis){
 loadEnglishVoices238();
 window.speechSynthesis.addEventListener("voiceschanged",loadEnglishVoices238);
}
function chooseEnglishVoice238(){
 loadEnglishVoices238();
 const preferred=["en-US","en-GB","en-AU","en"];
 for(const lang of preferred){
   const v=ponoEnglishVoices238.find(x=>(x.lang||"").toLowerCase()===lang.toLowerCase());
   if(v)return v;
 }
 return ponoEnglishVoices238[0]||null;
}
function speakEN238(text,slow=false){
 if(!("speechSynthesis" in window))return;
 window.speechSynthesis.cancel();
 const u=new SpeechSynthesisUtterance(String(text||""));
 u.lang="en-US";
 const v=chooseEnglishVoice238(); if(v)u.voice=v;
 u.rate=slow?0.72:0.92;
 u.pitch=1.0;
 u.volume=1.0;
 window.speechSynthesis.speak(u);
}
function engAudioButtons238(text){
 const d=document.createElement("div");d.className="engAudio238";
 const normal=btn("🔊 お手本を聞く",()=>speakEN238(text,false),"soft");
 const slow=btn("🐢 ゆっくり聞く",()=>speakEN238(text,true),"soft");
 d.append(normal,slow);return d;
}

/* v23.7外国語画面を英語専用音声で上書き */
englishLearn237=function(g,title,term){
 const d=ENG237[title],label=g<=4?"外国語活動":"外国語";
 head(`① まなぶ｜${title}`,()=>englishHome237(g,title,term));
 A.append(e("div","card",`<div class="tiny">${label}｜小学${g}年</div><h2>👂 まず聞いてみよう</h2>${engScene237(d)}
 <h3>この単元のことば</h3>${d.words.map(x=>`<div class="engword237"><b>${x}</b><button class="miniSpeak237">🔊</button></div>`).join("")}
 <p class="tiny">文字を読むのが大変なときは、音を聞いて意味が分かれば学びになっています。</p>`));
 [...A.querySelectorAll(".engword237")].forEach((row,i)=>row.querySelector("button").onclick=()=>{unitSession.reads++;speakEN238(d.words[i],false)});
 let aud=engAudioButtons238(d.model);
 [...aud.querySelectorAll("button")].forEach(b=>b.addEventListener("click",()=>unitSession.reads++));
 A.append(aud);
 A.append(btn("➡️ ② 一緒にやってみる",()=>englishTogether237(g,title,term),"primary"));
};
englishTogether237=function(g,title,term){
 const d=ENG237[title];
 head(`② 一緒に｜${title}`,()=>englishLearn237(g,title,term));
 A.append(e("div","card good",`<h2>場面から考えよう</h2>${engScene237(d)}
 <p>① 絵や場面を見る</p><p>② 音を聞く</p><p>③ まねして言ってみる</p>
 <p class="tiny">全部言えなくても、聞いて分かった・一部を言えた、も大切な記録です。</p>`));
 let aud=engAudioButtons238(d.model);
 [...aud.querySelectorAll("button")].forEach(b=>b.addEventListener("click",()=>unitSession.reads++));
 A.append(aud);
 A.append(btn("🚀 ③ 自分でやる",()=>englishQuestion237(g,title,term),"primary"));
};
englishQuestion237=function(g,title,term){
 const d=ENG237[title],q=d.q;
 head(`③ 自分でやる｜${title}`,()=>englishHome237(g,title,term));
 A.append(e("div","card",`<h2>${q[0]}</h2>${engScene237(d)}`));
 /* 問題文は日本語なので日本語音声、英語選択肢は各選択肢に英語再生を付ける */
 A.append(btn("🔊 問題を聞く",()=>{unitSession.reads++;speakJP(q[0])},"soft"));
 q[1].forEach((x,n)=>{
   let row=e("div","engChoice238");
   row.append(btn(x,()=>englishSummary237(g,title,term,n===q[2]?1:0)));
   if(/[A-Za-z]/.test(x)) row.append(btn("🔊",()=>{unitSession.reads++;speakEN238(x,false)},"engTiny238"));
   A.append(row);
 });
 A.append(btn("🌱 わからない・①まなぶを見る",()=>englishLearn237(g,title,term),"soft"));
};
englishSummary237=function(g,title,term,ok){
 const d=ENG237[title];
 head(`まとめ｜${title}`,()=>englishHome237(g,title,term));
 A.append(e("div","card good",`<h2>🌱 まとめ</h2><p>${ok?"できたね。":"①まなぶに戻って、もう一度聞いてみても大丈夫です。"}</p>
 <p><b>最後に、お手本を聞いて自分でも言ってみよう。</b></p>${engScene237(d)}`));
 let aud=engAudioButtons238(d.model);
 [...aud.querySelectorAll("button")].forEach(b=>b.addEventListener("click",()=>unitSession.reads++));
 A.append(aud);
 A.append(e("div","card",`<h2>単元ふりかえり</h2><p>今の感じに近いものを選んでください。</p>`));
 ["聞いてわかった","まねして言えた","もう一度聞きたい"].forEach(x=>A.append(btn(x,()=>englishFinish237(g,title,term,ok,x),"soft")));
};
