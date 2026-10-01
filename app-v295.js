/* v29.5 英語音声：ユーザー操作の同一イベント内で即時再生 */
(function(){
 function say295(text){
   const synth=window.speechSynthesis;
   if(!synth || !window.SpeechSynthesisUtterance){
     alert("音声読み上げに対応していません。"); return;
   }
   /* Android Chromeでは setTimeout を挟まず、タップイベント内で speak する */
   try{
     synth.cancel();
     const u=new SpeechSynthesisUtterance(String(text||""));
     u.lang="en-US"; u.rate=.78; u.pitch=1; u.volume=1;
     const vs=synth.getVoices ? synth.getVoices() : [];
     u.voice=vs.find(v=>/^en-US/i.test(v.lang))||vs.find(v=>/^en/i.test(v.lang))||null;
     synth.speak(u);
   }catch(err){
     console.error(err);
     alert("音声を開始できませんでした。端末の音量も確認してください。");
   }
 }
 window.speakEN=say295;
 try{speakEN=say295}catch(e){}

 /* 現在表示されている英語音声ボタンにも、タップ直結の処理を付ける */
 document.addEventListener("click",function(ev){
   const b=ev.target.closest && ev.target.closest("button");
   if(!b)return;
   const label=(b.innerText||"").trim();
   if(!eng292 || !eng292.d)return;
   if(label.includes("英語を聞く")||label.includes("質問を聞く")){
     ev.preventDefault();ev.stopImmediatePropagation();say295(eng292.d[1]);return;
   }
   if(label.includes("答えを聞く")){
     ev.preventDefault();ev.stopImmediatePropagation();say295(eng292.d[2]);return;
   }
   if(label.includes("会話を聞く")){
     ev.preventDefault();ev.stopImmediatePropagation();
     /* 1回目はタップ直後に必ず発音。2回目だけ後続再生 */
     const synth=window.speechSynthesis;
     synth.cancel();
     const q=new SpeechSynthesisUtterance(String(eng292.d[1]));q.lang="en-US";q.rate=.78;
     const a=new SpeechSynthesisUtterance(String(eng292.d[2]));a.lang="en-US";a.rate=.78;
     q.onend=()=>{try{synth.speak(a)}catch(e){}};
     synth.speak(q);return;
   }
 },true);
})();