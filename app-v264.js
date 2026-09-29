/* v26.4 国語の学期別入口を正式導線に統一 + 分数表示を教科書型に固定
   v26.3までの学習・記録・音声・適応学習は保持する。 */

/* 国語：通常入口を 算数と同じ「学年 → 学期ごろ → 単元」に統一 */
function japaneseEntry264(){
  subjectTextbookEntry("国語");
}

/* 子ども画面で国語ボタンが旧 japaneseStart() を呼んでも正式入口へ送る。
   単元内部から japaneseStart() に戻る場合も、学期別入口へ戻す。 */
const japaneseStartBefore264 = japaneseStart;
japaneseStart = function(){
  subjectTextbookEntry("国語");
};

/* 今日のおすすめ等、旧導線から国語が呼ばれた場合にも学期別入口を使う */
const childBefore264 = child;
child = function(){
  childBefore264();
  [...A.querySelectorAll("button")].forEach(b=>{
    const t=(b.textContent||"").trim();
    if(t==="国語") b.onclick=()=>subjectTextbookEntry("国語");
  });
  [...A.querySelectorAll(".subject-guide .tiny")].forEach(x=>{
    x.textContent="教科 → 学年 → 学期ごろ → 単元 の順に進みます。国語・算数も同じです。";
  });
};

/* 国語の単元を開く時の戻り先を、その学年の学期別入口へ寄せるための履歴 */
let japaneseNav264={g:null,ti:null,title:null};
const subjectTermUnitsBefore264=subjectTermUnits;
subjectTermUnits=function(s,g,ti){
  if(s!=="国語"){subjectTermUnitsBefore264(s,g,ti);return}
  const arr=(TEXTBOOK_MAP["国語"]&&TEXTBOOK_MAP["国語"][g])||[];
  const part=splitTerms(arr)[ti]||[], term=TERM_LABELS[ti];
  japaneseNav264={g,ti,title:null};
  head(`${term}｜小学${g}年 国語`,()=>subjectGradeTerms("国語",g));
  A.append(e("div","card",
    `<h2>${term}</h2>
     <p>上から順でも、学校で今学んでいる単元からでも大丈夫です。</p>
     <p class="tiny">漢字・読む・ことば・書くを、その時期の学習にそって確認できます。</p>`));
  part.forEach((name,n)=>{
    const c=e("div","unit-pick",
      `<span class="unit-order">${n+1}</span><span><b>${name}</b><br><span class="tiny">${term}</span></span>`);
    c.onclick=()=>{
      japaneseNav264={g,ti,title:name};
      japaneseTextbookOpen249(g,name);
    };
    A.append(c);
  });
};

/* 分数：どの画面でも 1/2 型の文字列を「分子／横線／分母」に統一。
   既存の .frac を再利用し、二重変換はしない。 */
function formatFractions264(root){
  root=root||A;
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
  const nodes=[];
  while(walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(n=>{
    if(!/\d+\s*\/\s*\d+/.test(n.nodeValue||""))return;
    const p=n.parentElement;
    if(!p || p.closest(".frac,.scratchpad,script,style"))return;
    const frag=document.createDocumentFragment();
    const parts=n.nodeValue.split(/(\d+\s*\/\s*\d+)/g);
    parts.forEach(part=>{
      const m=part.match(/^(\d+)\s*\/\s*(\d+)$/);
      if(!m){frag.append(document.createTextNode(part));return}
      const f=document.createElement("span"); f.className="frac frac264";
      const top=document.createElement("span"); top.textContent=m[1];
      const bottom=document.createElement("span"); bottom.textContent=m[2];
      f.append(top,bottom); frag.append(f);
    });
    n.replaceWith(frag);
  });
}
const observer264=new MutationObserver(()=>formatFractions264(A));
observer264.observe(A,{childList:true,subtree:true});
formatFractions264(A);
