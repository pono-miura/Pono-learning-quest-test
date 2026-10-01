/* v29.6 英語：聞く＋自分で発音＋意味確認＋会話練習を統合 */
(function(){
 function say296(text){
   try{
     const sy=window.speechSynthesis;
     if(!sy||!window.SpeechSynthesisUtterance){alert("音声読み上げに対応していません。");return}
     sy.cancel();
     const u=new SpeechSynthesisUtterance(String(text||""));
     u.lang="en-US";u.rate=.78;u.pitch=1;u.volume=1;
     const vs=sy.getVoices?sy.getVoices():[];
     u.voice=vs.find(v=>/^en-US/i.test(v.lang))||vs.find(v=>/^en/i.test(v.lang))||null;
     sy.speak(u);
   }catch(e){console.error(e)}
 }
 window.speakEN=say296; try{speakEN=say296}catch(e){}

 function norm296(s){return String(s||"").toLowerCase().replace(/[.,!?']/g,"").replace(/\s+/g," ").trim()}
 function meaning296(s){
   const m={
    "What's your name?":"名前をたずねる言い方です。",
    "I'm Hana.":"「私はハナです」という答え方です。",
    "When is your birthday?":"誕生日をたずねる言い方です。",
    "My birthday is May 10th.":"「私の誕生日は5月10日です」という言い方です。",
    "What subjects do you like?":"好きな教科をたずねる言い方です。",
    "I like science.":"「私は理科が好きです」という言い方です。",
    "What time do you get up?":"起きる時刻をたずねる言い方です。",
    "I get up at seven.":"「私は7時に起きます」という言い方です。"
   }; return m[s]||"英語を聞いて、意味と場面を結びつけてみよう。";
 }
 function practiceBox296(text){
   return `<div class="pron296"><h3>🗣️ 自分でも発音してみよう</h3>
   <p class="engPhrase292">${text}</p>
   <p class="tiny">まず聞く → まねして言う → マイクで確かめる、の順で大丈夫です。</p>
   <button class="soft pronListen296" type="button">🔊 もう一度聞く</button>
   <button class="primary pronMic296" type="button">🎤 発音してみる</button>
   <div class="pronResult296"></div></div>`;
 }
 function wire296(root,text){
   const l=root.querySelector(".pronListen296"),m=root.querySelector(".pronMic296"),r=root.querySelector(".pronResult296");
   if(l)l.onclick=()=>say296(text);
   if(!m)return;
   m.onclick=()=>{
     const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
     if(!SR){r.innerHTML='<div class="feedback warn">このブラウザではマイク判定が使えません。音声を聞いて、まねして発音してみよう。</div>';return}
     try{
       window.speechSynthesis&&window.speechSynthesis.cancel();
       const rec=new SR();rec.lang="en-US";rec.interimResults=false;rec.maxAlternatives=3;
       r.innerHTML='<div class="feedback">🎤 聞いています… 英語で言ってみよう</div>';
       rec.onresult=(ev)=>{
         const heard=ev.results[0][0].transcript||"";
         const target=norm296(text),h=norm296(heard);
         const tw=target.split(" "), hw=h.split(" ");
         const hit=tw.filter(w=>hw.includes(w)).length, score=Math.round(hit/Math.max(1,tw.length)*100);
         if(score>=70) r.innerHTML=`<div class="feedback good">🎉 伝わっています！<br><b>聞き取れた英語：</b> ${heard}<br><span class="tiny">もう一度言ってもOKです。</span></div>`;
         else r.innerHTML=`<div class="feedback warn">🌱 聞き取れた英語：<b>${heard||"—"}</b><br>もう一度「🔊聞く」→「🎤発音」で試してみよう。発音は点数より、伝えようとすることを大切にします。</div>`;
       };
       rec.onerror=(ev)=>{
         const msg=ev.error==="not-allowed"?"マイクの使用を許可すると発音練習ができます。":"うまく聞き取れませんでした。もう一度試してみよう。";
         r.innerHTML=`<div class="feedback warn">${msg}</div>`;
       };
       rec.start();
     }catch(e){r.innerHTML='<div class="feedback warn">マイクを開始できませんでした。もう一度押してみてください。</div>'}
   };
 }
 function addPractice296(text,answer){
   const wrap=e("div","card practice296",practiceBox296(text)+`<details class="meaning296"><summary>💡 意味を確認する</summary><p>${meaning296(text)}</p></details>`);
   A.append(wrap);wire296(wrap,text);
   if(answer){
     const w2=e("div","card practice296",`<h3>💬 答えも言ってみよう</h3>`+practiceBox296(answer)+`<details class="meaning296"><summary>💡 意味を確認する</summary><p>${meaning296(answer)}</p></details>`);
     A.append(w2);wire296(w2,answer);
   }
 }

 /* v29.5の「聞ける」は維持し、学習画面に発音練習を戻す */
 engHome292=function(g,t){
   let d=engData292(g,t);if(!d)return false;eng292={g,t,d,i:0,ok:0,start:Date.now()};
   head(`${g<=4?"外国語活動":"外国語"}｜${t}`,()=>subjectGradeTerms("外国語",g));
   A.append(e("div","card",`<div class="tiny">${g<=4?"外国語活動":"外国語"}｜小学${g}年</div><h2>${t}</h2><div class="engFlow292"><span>👂 きく</span><b>→</b><span>🗣️ 発音する</span><b>→</b><span>💬 つかう</span><b>→</b><span>😊 伝わる</span></div><h3>この単元でやってみること</h3><p>${d[0]}</p><p class="engPhrase292">${d[1]}</p>`));
   A.append(btn("🔊 英語を聞く",()=>say296(d[1]),"soft"));
   A.append(btn("📖 ①まなぶ",engLearn292,"primary"));
 };
 engLearn292=function(){
   let s=eng292,d=s.d;head(`①まなぶ｜${s.t}`,()=>engHome292(s.g,s.t));
   A.append(e("div","card lesson",`<h2>👂 ① きいて・まねしよう</h2><p class="engPhrase292">${d[1]}</p><p><b>こたえ方の例</b></p><p class="engPhrase292">${d[2]}</p><p>${d[3]}</p>`));
   A.append(btn("🔊 質問を聞く",()=>say296(d[1]),"soft"));
   A.append(btn("🔊 答えを聞く",()=>say296(d[2]),"soft"));
   addPractice296(d[1],d[2]);
   A.append(btn("➡️ ② 一緒にやってみる",engTogether292,"primary"));
 };
 engTogether292=function(){
   let s=eng292,d=s.d;head(`②一緒に｜${s.t}`,engLearn292);
   A.append(e("div","card lesson",`<h2>🤝 ② 一緒に会話してみよう</h2><p>① 質問を聞く</p><p class="engPhrase292">${d[1]}</p><p>② 自分で答える</p><p class="engPhrase292">${d[2]}</p><p class="tiny">全部言えなくても大丈夫。聞く→まねする→自分で言う、で進めます。</p>`));
   A.append(btn("🔊 質問を聞いて答える",()=>say296(d[1]),"soft"));
   addPractice296(d[2],null);
   A.append(btn("➡️ ③ 自分でやってみる",engSelf292,"primary"));
 };
})();