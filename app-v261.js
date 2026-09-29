/* v26.1 算数入口一本化：旧「小学○年の算数（○単元）」一覧を子どもの通常導線から外す */
function mathEntry261(){
 subjectTextbookEntry("算数");
}
/* 保存済み予定や旧ボタンから mathUnitSelect が呼ばれても、通常は学期別入口へ */
const mathUnitSelectLegacy261=mathUnitSelect;
mathUnitSelect=function(g){
 if(g){
   subjectGradeTerms("算数",Number(g));
 }else{
   subjectTextbookEntry("算数");
 }
};
/* v24.9/v26.0から詳細MATHNODESへ入る場合は mathLearn を直接呼ぶので影響なし */
function subjectTextbookEntry261(s){
 let key=ponoSubjectKey(s);
 head(`${s}｜学年を選ぶ`,child);
 A.append(e("div","card",`<h2>${s}</h2><p>学年を選ぶと、学校の教科書の流れにそって単元が並びます。</p>
 <p class="tiny">今の学年とは別に、学習を始めたい学年から選んで大丈夫です。</p>`));
 ponoSubjectGrades(s).forEach(g=>{
   let label=(s==="外国語活動"&&g>=5)?"外国語":s;
   A.append(btn(`小学${g}年　${label}`,()=>subjectGradeTerms(s,g),"soft"));
 });
}
subjectTextbookEntry=subjectTextbookEntry261;
/* 点検画面にも現在の正式導線を明記 */
const auditScreenBefore261=auditScreen259;
auditScreen259=function(){
 auditScreenBefore261();
 A.append(e("div","card good",`<h3>✅ 算数の正式な入口</h3><p><b>算数 → 学年 → 🌸1学期ごろ／🍁2学期ごろ／❄️3学期ごろ → 単元</b></p><p class="tiny">旧「小学○年の算数（○単元）」一覧は通常の子ども導線から外しました。</p>`));
};
