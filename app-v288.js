/* v28.8 理科3年：単元一覧への図解誤挿入を根本停止 */
(function(){
 function sci3UnitCount288(){
   if(!A || typeof SCI3_284==="undefined") return 0;
   const txt=A.innerText||"";
   return Object.keys(SCI3_284).filter(t=>txt.includes(t)).length;
 }
 function isScience3UnitList288(){
   const txt=(A&&A.innerText)||"";
   return /単元をえらぼう/.test(txt) && sci3UnitCount288()>=2;
 }
 function purgeListVisual288(){
   if(!isScience3UnitList288()) return;
   // Remove every science visual from the chooser card only.
   const chooser=[...A.querySelectorAll(".card")].find(c=>/単元をえらぼう/.test(c.innerText||""));
   if(chooser) chooser.querySelectorAll(".sciVisual241,.sciVisual285,.sciVisual286").forEach(x=>x.remove());
 }
 // Override the v28.6 fixer itself: never inject on the unit chooser.
 try{
   const oldFix288=fixScienceVisual286;
   fixScienceVisual286=function(){
     if(isScience3UnitList288()){ purgeListVisual288(); return; }
     return oldFix288.apply(this,arguments);
   };
 }catch(e){}
 // Also guard the list route after render.
 try{
   const oldSGT288=subjectGradeTerms;
   subjectGradeTerms=function(s,g){
     const r=oldSGT288.apply(this,arguments);
     if(s==="理科"&&g===3){
       requestAnimationFrame(()=>requestAnimationFrame(purgeListVisual288));
     }
     return r;
   };
 }catch(e){}
})();