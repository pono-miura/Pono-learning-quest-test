/* v30.1 英語：ゆっくり聞くを画面本体へ直接配置 */
(function(){
 function speak301(text,slow){
   const sy=window.speechSynthesis;
   if(!sy||!window.SpeechSynthesisUtterance)return;
   try{
     sy.cancel();const u=new SpeechSynthesisUtterance(String(text||""));
     u.lang="en-US";u.rate=slow?.48:.78;u.pitch=1;u.volume=1;
     const vs=sy.getVoices?sy.getVoices():[];
     u.voice=vs.find(v=>/^en-US/i.test(v.lang))||vs.find(v=>/^en/i.test(v.lang))||null;
     sy.speak(u);
   }catch(e){}
 }
 function slowBtn301(text){
   return btn("🐢 ゆっくり聞く",()=>speak301(text,true),"soft");
 }
 /* 29.6の練習カードは残し、①②の主要音声ボタンの直下へ直接追加 */
 const learn301=engLearn292;
 engLearn292=function(){
   learn301();
   let d=eng292.d;
   const buttons=[...A.querySelectorAll("button")];
   const q=buttons.find(b=>(b.innerText||"").includes("質問を聞く"));
   const a=buttons.find(b=>(b.innerText||"").includes("答えを聞く"));
   if(q&&!q.nextElementSibling?.classList?.contains("slowDirect301")){
     const s=slowBtn301(d[1]);s.classList.add("slowDirect301");q.after(s);
   }
   if(a&&!a.nextElementSibling?.classList?.contains("slowDirect301")){
     const s=slowBtn301(d[2]);s.classList.add("slowDirect301");a.after(s);
   }
 };
 const together301=engTogether292;
 engTogether292=function(){
   together301();
   let d=eng292.d;
   const b=[...A.querySelectorAll("button")].find(x=>(x.innerText||"").includes("質問を聞いて答える"));
   if(b&&!b.nextElementSibling?.classList?.contains("slowDirect301")){
     const s=slowBtn301(d[1]);s.classList.add("slowDirect301");b.after(s);
   }
 };
})();