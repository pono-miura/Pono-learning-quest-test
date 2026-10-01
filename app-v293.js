/* v29.3 英語：旧教材への接続を止め、新教材へ直接接続 */
(function(){
  /* v29.2 の英語一覧を、最後にもう一度正式ルートとして固定 */
  const before293=subjectGradeTerms;
  subjectGradeTerms=function(s,g){
    if((s==="外国語"||s==="外国語活動") && g>=3 && g<=6 && typeof ENG36_292!=="undefined"){
      const arr=Object.keys(ENG36_292[g]||{});
      head(`${g<=4?"外国語活動":"外国語"}｜小学${g}年`,()=>subjectTextbookEntry("外国語"));
      A.append(e("div","card",`<div class="tiny">小学${g}年 ${g<=4?"外国語活動":"外国語"}</div><h2>単元をえらぼう</h2><p>今やりたいところから選べます。</p>`));
      arr.forEach((name,n)=>{
        const c=e("div","unit-pick",`<span class="unit-order">${n+1}</span><span><b>${name}</b></span>`);
        c.onclick=function(ev){
          if(ev){ev.preventDefault();ev.stopPropagation()}
          engHome292(g,name);
          return false;
        };
        A.append(c);
      });
      return;
    }
    return before293.apply(this,arguments);
  };

  /* 旧 textbookUnitHome が呼ばれても、英語名が一致すれば v29.2 へ救済 */
  const beforeHome293=textbookUnitHome;
  textbookUnitHome=function(sub,g,title,term){
    if((sub==="外国語"||sub==="外国語活動") && typeof engData292==="function" && engData292(Number(g),title)){
      engHome292(Number(g),title); return;
    }
    return beforeHome293.apply(this,arguments);
  };

  /* 学年入口も3〜6年の正式表示に固定 */
  const beforeEntry293=subjectTextbookEntry;
  subjectTextbookEntry=function(s){
    if(s==="外国語"||s==="外国語活動"){
      head("英語｜学年を選ぶ",child);
      A.append(e("div","card",`<h2>英語</h2><p>聞くこと・話すことを中心に、少しずつ英語に親しみます。</p>`));
      [3,4,5,6].forEach(g=>A.append(btn(`小学${g}年　${g<=4?"外国語活動":"外国語"}`,()=>subjectGradeTerms("外国語",g),"soft")));
      return;
    }
    return beforeEntry293.apply(this,arguments);
  };
})();