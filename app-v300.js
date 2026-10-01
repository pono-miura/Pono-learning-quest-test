/* v30.0 英語：ゆっくり聞く確実表示修正 */
(function(){
 function saySlow300(text){
   try{
     const sy=window.speechSynthesis;if(!sy||!window.SpeechSynthesisUtterance)return;
     sy.cancel();const u=new SpeechSynthesisUtterance(String(text||""));
     u.lang="en-US";u.rate=.50;u.pitch=1;u.volume=1;
     const vs=sy.getVoices?sy.getVoices():[];
     u.voice=vs.find(v=>/^en-US/i.test(v.lang))||vs.find(v=>/^en/i.test(v.lang))||null;
     sy.speak(u);
   }catch(e){}
 }
 function currentData300(){
   try{return (typeof eng292!=="undefined"&&eng292&&eng292.d)?eng292.d:null}catch(e){return null}
 }
 function install300(){
   const d=currentData300(); if(!d)return;
   const buttons=[...document.querySelectorAll("#app button")];
   buttons.forEach(b=>{
     if(b.classList.contains("slow300")||b.nextElementSibling?.classList?.contains("slow300"))return;
     const label=(b.textContent||"").trim();
     let target=null;
     if(label.includes("英語を聞く")||label.includes("質問を聞く")||label.includes("質問をもう一度聞く")) target=d[1];
     else if(label.includes("答えを聞く")||label==="🔊 もう一度聞く"||label.includes("最後にもう一度聞く")) target=d[2]||d[1];
     if(!target)return;
     const s=document.createElement("button");
     s.type="button";s.className="soft slow300";s.textContent="🐢 ゆっくり聞く";
     s.addEventListener("click",ev=>{ev.preventDefault();ev.stopImmediatePropagation();saySlow300(target)},true);
     b.insertAdjacentElement("afterend",s);
   });
 }
 document.addEventListener("click",()=>setTimeout(install300,30),true);
 const app=document.getElementById("app");
 if(app)new MutationObserver(()=>setTimeout(install300,30)).observe(app,{childList:true,subtree:true});
 setInterval(install300,500);
 setTimeout(install300,50);
})();