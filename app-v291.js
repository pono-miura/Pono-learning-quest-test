/* v29.1 社会：単元クリックを社会教材へ直接接続
   v29.0 が旧 textbookUnitHome 経由になる環境を避ける。 */
(function(){
 const oldSGT291=subjectGradeTerms;
 subjectGradeTerms=function(s,g){
   if(s!=="社会" || g<3 || g>6 || typeof SOC36_290==="undefined"){
     return oldSGT291.apply(this,arguments);
   }
   const arr=(TEXTBOOK_MAP["社会"]&&TEXTBOOK_MAP["社会"][g])||[];
   head(`社会｜小学${g}年`,()=>subjectTextbookEntry("社会"));
   A.append(e("div","card",`<div class="tiny">小学${g}年 社会</div><h2>単元をえらぼう</h2><p>今やりたいところから選べます。</p>`));
   arr.forEach((name,n)=>{
     const c=e("div","unit-pick",`<span class="unit-order">${n+1}</span><span><b>${name}</b></span>`);
     c.onclick=()=>{
       const parts=splitTerms(arr);
       let ti=parts.findIndex(p=>p.includes(name)); if(ti<0)ti=0;
       /* textbookUnitHomeを通さず、v29.0社会教材へ直接入る */
       if(typeof socHome290==="function" && socData290(g,name)){
         socHome290(g,name,TERM_LABELS[ti]);
       }else{
         oldTUH290("社会",g,name,TERM_LABELS[ti]);
       }
     };
     A.append(c);
   });
 };
})();