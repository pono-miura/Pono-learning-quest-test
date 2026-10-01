/* v28.6 理科3年：旧図解を画面上で確実に差し替える */
(function(){
 function currentScience3Title286(){
   if(typeof sci3284!=="undefined" && sci3284 && sci3284.t) return sci3284.t;
   const txt=(A&&A.innerText)||"";
   if(typeof SCI3_284!=="undefined"){
     for(const t of Object.keys(SCI3_284)) if(txt.includes(t)) return t;
   }
   return "";
 }
 function fixScienceVisual286(){
   if(!A || typeof scienceVisual285!=="function") return;
   const t=currentScience3Title286();
   if(!t || typeof SCI3_284==="undefined" || !SCI3_284[t]) return;
   const cards=[...A.querySelectorAll(".card")];
   if(!cards.length) return;
   // Only grade-3 science screens.
   const all=(A.innerText||"");
   if(!/理科|①まなぶ|②一緒に|③自分で/.test(all)) return;

   const target=cards.find(c=>/この単元で学ぶこと|①まなぶ/.test(c.innerText||"")) || cards[0];
   // Remove all old science visuals in the target card so legacy v24.1 cannot remain.
   target.querySelectorAll(".sciVisual241,.sciVisual285,.sciVisual286").forEach(x=>x.remove());

   const html=scienceVisual285(t);
   if(!html) return;
   const holder=document.createElement("div");
   holder.className="sciVisual286";
   holder.innerHTML=html;
   const h=target.querySelector("h2");
   if(h) h.insertAdjacentElement("afterend",holder);
   else target.prepend(holder);
 }
 function schedule286(){
   requestAnimationFrame(()=>requestAnimationFrame(fixScienceVisual286));
 }
 // Wrap v28.4/28.5 science navigation so every render is corrected after legacy code finishes.
 ["sci3Home284","sci3Learn284","sci3Together284"].forEach(n=>{
   try{
     const old=eval(n);
     if(typeof old==="function"){
       const wrapped=function(){const r=old.apply(this,arguments);schedule286();return r};
       eval(n+"=wrapped");
     }
   }catch(e){}
 });
 // One guarded observer catches browser-specific late rendering without creating duplicates.
 let lock=false;
 new MutationObserver(()=>{
   if(lock)return;
   const t=currentScience3Title286();
   if(!t)return;
   lock=true;
   requestAnimationFrame(()=>{fixScienceVisual286();lock=false});
 }).observe(A,{childList:true,subtree:true});
 schedule286();
})();