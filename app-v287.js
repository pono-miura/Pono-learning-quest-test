/* v28.7 理科3年：単元一覧では単元別図を表示しない
   図は「単元を選んだ後」と「①まなぶ」から表示する。 */
(function(){
 function isScience3List287(){
   if(!A)return false;
   const txt=A.innerText||"";
   const hasUnits=typeof SCI3_284!=="undefined" &&
     Object.keys(SCI3_284).filter(t=>txt.includes(t)).length>=3;
   return hasUnits && /単元をえらぼう/.test(txt);
 }
 function cleanScience3List287(){
   if(!isScience3List287())return;
   // v28.6 wrapper / legacy science visual containers, including nested visuals.
   A.querySelectorAll(".sciVisual286,.sciVisual285,.sciVisual241").forEach(x=>{
     if(x.closest(".card") && /単元をえらぼう/.test((x.closest(".card").innerText||""))) x.remove();
   });
   // Remove any leftover explanatory text that belongs to a prematurely selected unit.
   const card=[...A.querySelectorAll(".card")].find(c=>/単元をえらぼう/.test(c.innerText||""));
   if(card){
     [...card.querySelectorAll("p")].forEach(p=>{
       const t=p.innerText||"";
       if(/今やりたいところから選べます/.test(t)) return;
       if(/生き物は、いる場所|この単元で学ぶこと|予想 → 観察/.test(t)) p.remove();
     });
   }
 }
 function after287(){requestAnimationFrame(()=>requestAnimationFrame(cleanScience3List287))}
 // The grade-unit-list route is produced by subjectGradeTerms.
 try{
   const oldSGT287=subjectGradeTerms;
   subjectGradeTerms=function(s,g){
     const r=oldSGT287.apply(this,arguments);
     if(s==="理科"&&g===3)after287();
     return r;
   };
 }catch(e){}
 // Catch late injection from the v28.6 observer, but only on the unit list.
 let lock287=false;
 new MutationObserver(()=>{
   if(lock287||!isScience3List287())return;
   lock287=true;
   requestAnimationFrame(()=>{cleanScience3List287();lock287=false});
 }).observe(A,{childList:true,subtree:true});
})();