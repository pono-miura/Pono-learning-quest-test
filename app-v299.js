/* v29.9 英語：通常＋ゆっくり音声を全練習画面に追加 */
(function(){
 function say299(text,slow){
   try{
     const sy=window.speechSynthesis;if(!sy||!window.SpeechSynthesisUtterance)return;
     sy.cancel();const u=new SpeechSynthesisUtterance(String(text||""));
     u.lang="en-US";u.rate=slow?.52:.78;u.pitch=1;u.volume=1;
     const vs=sy.getVoices?sy.getVoices():[];
     u.voice=vs.find(v=>/^en-US/i.test(v.lang))||vs.find(v=>/^en/i.test(v.lang))||null;
     sy.speak(u);
   }catch(e){}
 }
 function addSlow299(){
   if(!window.eng292||!eng292.d)return;
   const d=eng292.d;
   [...A.querySelectorAll("button")].forEach(b=>{
     const label=(b.innerText||"").trim();
     if(b.dataset.slow299)return;
     let target=null;
     if(label.includes("質問を聞く")||label.includes("英語を聞く")||label.includes("もう一度聞く")) target=d[1];
     else if(label.includes("答えを聞く")) target=d[2];
     if(!target)return;
     b.dataset.slow299="1";
     const slow=document.createElement("button");
     slow.type="button";slow.className="soft slow299";slow.textContent="🐢 ゆっくり聞く";
     slow.onclick=(ev)=>{ev.preventDefault();ev.stopPropagation();say299(target,true)};
     b.insertAdjacentElement("afterend",slow);
   });
 }
 const mo=new MutationObserver(()=>setTimeout(addSlow299,0));
 mo.observe(document.getElementById("app"),{childList:true,subtree:true});
 setTimeout(addSlow299,100);
})();