
/* v22.6 子どもの入口を一本化：教科 → 学年 → 学期ごろ → 単元 */
function ponoSubjectKey(s){return s==="外国語活動"?"外国語":s}
function ponoSubjectGrades(s){
 if(s==="理科"||s==="社会")return [3,4,5,6];
 if(s==="外国語活動")return [3,4,5,6];
 return [1,2,3,4,5,6];
}
function subjectTextbookEntry(s){
 let key=ponoSubjectKey(s);
 head(`${s}｜学年を選ぶ`,child);
 A.append(e("div","card",`<h2>${s}</h2><p>学年を選ぶと、学校の教科書の流れにそって単元が並びます。</p>
 <p class="tiny">今の学年とは別に、学習を始めたい学年から選んで大丈夫です。</p>`));
 ponoSubjectGrades(s).forEach(g=>{
   let label=(s==="外国語活動"&&g>=5)?"外国語":s;
   A.append(btn(`小学${g}年　${label}`,()=>subjectGradeTerms(s,g),"soft"));
 });
}
function subjectGradeTerms(s,g){
 let key=ponoSubjectKey(s),arr=TEXTBOOK_MAP[key]&&TEXTBOOK_MAP[key][g];
 head(`${s}｜小学${g}年`,()=>subjectTextbookEntry(s));
 if(!arr||!arr.length){A.append(e("div","card","この学年の単元を準備しています。"));return}
 A.append(e("div","card",`<h2>どの時期から始める？</h2><p class="tiny">学校の進み方によって前後するため「学期ごろ」の目安です。</p>`));
 splitTerms(arr).forEach((part,ti)=>{
   if(!part.length)return;
   let c=e("div","term-pick",`<b>${TERM_LABELS[ti]}</b><br><span class="tiny">${part.length}単元</span>`);
   c.onclick=()=>subjectTermUnits(s,g,ti);A.append(c);
 });
}
function subjectTermUnits(s,g,ti){
 let key=ponoSubjectKey(s),arr=TEXTBOOK_MAP[key][g],part=splitTerms(arr)[ti]||[];
 head(`${TERM_LABELS[ti]}｜小学${g}年 ${s}`,()=>subjectGradeTerms(s,g));
 A.append(e("div","card",`<h2>${TERM_LABELS[ti]}</h2><p>上から順に進めても、今学んでいる単元から選んでも大丈夫です。</p>`));
 part.forEach(name=>{
   let c=e("div","unit-pick",`<b>${name}</b><br><span class="tiny">${TERM_LABELS[ti]}</span>`);
   c.onclick=()=>{
     if(s==="国語"){japaneseGrade=g;localStorage.setItem("ponoJapaneseGrade",g);japaneseStart()}
     else if(s==="算数")mathUnitSelect(g)
     else startTextbookUnit(key,g,name,TERM_LABELS[ti]);
   };A.append(c);
 });
}
const ponoChildBefore226=child;
child=function(){
 /* v22.2の子ども画面を描画してから、旧教科ボタンと追加の教科書カードを一本化して置換 */
 ponoChildBefore226();
 const all=[...A.querySelectorAll("button,.card,.unit-pick")];
 /* v22.3で追加された下部カードを非表示 */
 all.forEach(el=>{if((el.textContent||"").includes("学校の教科書順から選ぶ"))el.style.display="none"});
 /* 既存の教科ボタンは見た目を保ち、クリック先だけ統一 */
 const subjects=["国語","算数","理科","社会","外国語活動"];
 [...A.querySelectorAll("button")].forEach(b=>{
   let t=(b.textContent||"").trim();
   if(subjects.includes(t)) b.onclick=()=>subjectTextbookEntry(t);
 });
 /* div型の教科カードにも対応 */
 [...A.querySelectorAll(".unit-pick,.subject,.card")].forEach(el=>{
   let t=(el.textContent||"").trim();
   if(subjects.includes(t)){el.onclick=()=>subjectTextbookEntry(t);el.classList.add("subject-one-entry")}
 });
};
