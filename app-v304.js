/* v30.4 国語3年「理由と具体例」：問題番号・回答方法を明確化 */
(function(){
 function mark304(){
   if(!document.getElementById("app"))return;
   const h=(document.querySelector("#app .top h1")?.innerText||"");
   if(!h.includes("理由と具体例") && !h.includes("問"))return;

   const cards=[...document.querySelectorAll("#app .card")];
   cards.forEach(c=>{
     const tx=c.innerText||"";
     if(tx.includes("問1") && !c.querySelector(".kind304")){
       const x=document.createElement("div");x.className="kind304";x.textContent="問1｜選択して答える";
       c.prepend(x);
     }
     if(/問[234]/.test(tx) && c.querySelector("textarea") && !c.querySelector(".kind304")){
       const m=tx.match(/問([234])/);
       const x=document.createElement("div");x.className="kind304";
       x.textContent=`問${m?m[1]:""}｜記述して答える`;
       c.prepend(x);
       const note=document.createElement("div");note.className="answerWay304";
       note.innerHTML="<b>答え方を選べます</b><br>⌨️ 文字を入力　または　🎤 音声で答える";
       const ta=c.querySelector("textarea");ta.parentNode.insertBefore(note,ta);
     }
   });
 }
 const app=document.getElementById("app");
 if(app)new MutationObserver(()=>setTimeout(mark304,0)).observe(app,{childList:true,subtree:true});
 document.addEventListener("click",()=>setTimeout(mark304,20),true);
 setTimeout(mark304,100);
})();