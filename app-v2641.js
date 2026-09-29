/* v26.4.1 hotfix
   v26.4で算数の単元タップが反応しなくなった問題を修正。
   国語の学期別入口・分数表示はそのまま維持する。 */

const subjectTermUnitsV264 = subjectTermUnits;

subjectTermUnits = function(s,g,ti){
  if(s==="国語"){
    subjectTermUnitsV264(s,g,ti);
    return;
  }

  if(s==="算数"){
    const arr=(TEXTBOOK_MAP["算数"]&&TEXTBOOK_MAP["算数"][g])||[];
    const part=splitTerms(arr)[ti]||[], term=TERM_LABELS[ti];
    mathNav262={g,ti,title:null};

    head(`${term}｜小学${g}年 算数`,()=>subjectGradeTerms("算数",g));
    A.append(e("div","card",
      `<h2>${term}</h2>
       <p>上から順でも、学校で今学んでいる単元からでも大丈夫です。</p>
       <p class="tiny">単元を開くと、その単元の学習へ直接進みます。</p>`));

    part.forEach((name,n)=>{
      const c=e("div","unit-pick",
        `<span class="unit-order">${n+1}</span><span><b>${name}</b><br><span class="tiny">${term}</span></span>`);
      c.onclick=()=>{
        mathNav262={g,ti,title:name};
        mathTextbookOpen249(g,name);
      };
      A.append(c);
    });
    return;
  }

  subjectTermUnitsV264(s,g,ti);
};
