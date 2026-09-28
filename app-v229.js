
/* v22.9 古い「基礎確認5問」への入口を整理。
   自由学習も今日のおすすめも、教科→学年→学期→単元へ統一する。 */

function normalizePlanSubject229(s){
 if(s==="外国語") return "外国語活動";
 return s;
}
function openPlannedSubject229(item){
 const s=normalizePlanSubject229(item&&item.s ? item.s : "");
 if(["国語","算数","理科","社会","外国語活動"].includes(s)){
   subjectTextbookEntry(s);
   return;
 }
 child();
}

/* v22.6 child の上書きをさらに完成形へ。
   旧 child() を呼ばないため、旧 start(s) に飛ぶ教科ボタンやおすすめを生成しない。 */
child=function(){
 head("🧒 今日の学習",home);

 let c=e("div","card",`<h2>${profile.name}</h2><p><b>在籍学年</b></p>`),
     sel=e("select");
 for(let g=1;g<=6;g++){let o=e("option","",`小学${g}年`);o.value=g;sel.append(o)}
 sel.value=profile.grade;
 sel.onchange=()=>{profile.grade=+sel.value;if(!profile.startGrade)profile.startGrade=profile.grade;localStorage.setItem(SK,JSON.stringify(profile));};
 c.append(sel);

 let lab=e("p","",`<b>🌱 学習を始める目安</b>`),sg=e("select");
 for(let g=1;g<=6;g++){let o=e("option","",`小学${g}年`);o.value=g;sg.append(o)}
 sg.value=profile.startGrade||profile.grade;
 sg.onchange=()=>{profile.startGrade=+sg.value;localStorage.setItem(SK,JSON.stringify(profile));};
 c.append(lab,sg,e("p","tiny","※ここは学力を表すものではありません。最初にどこから確認するかの目安で、あとからいつでも変更できます。"));
 A.append(c);

 let due=retentionDue();
 if(due){
   let rc=e("div","card good",`<h2>🔁 そろそろ定着確認</h2><p><b>${due.unit}</b></p><p>前に学んだ内容を、3問だけ確認してみよう。</p><p class="tiny">時間をあけて思い出せるかを見る確認です。できなくても大丈夫です。</p>`);
   rc.append(btn("3問だけやってみる",()=>startRetention(due),"primary"));A.append(rc);
 }

 let plan=JSON.parse(localStorage.getItem(PK)||"{}"),
     days=["日","月","火","水","木","金","土"],
     today=days[new Date().getDay()],tp=plan[today];

 if(tp&&tp.off){
   A.append(e("div","card soft","<h2>🌿 今日はお休み</h2><p>予定は入っていません。やりたい時は下から自由に学習できます。</p>"));
 }else if(tp){
   let items=Array.isArray(tp.items)?tp.items:(tp.s?[{s:tp.s,u:tp.u||"おすすめ単元"}]:[]);
   if(items.length){
     let pc=e("div","card good","<h2>🌟 今日のおすすめ</h2><p class='tiny'>予定は目安です。教科を開いたら、今取り組む学年・学期・単元を選べます。</p>");
     items.forEach((it,i)=>pc.append(btn(`▶ ${i+1}. ${it.s}｜${it.u||"おすすめ単元"}`,()=>openPlannedSubject229(it),"primary")));
     A.append(pc);
   }
 }

 A.append(e("div","card subject-guide",`<h2>教科を選ぶ</h2><p class="tiny">教科 → 学年 → 学期ごろ → 単元 の順に進みます。</p>`));
 let g=e("div","grid");
 ["国語","算数","理科","社会","外国語活動"].forEach(s=>g.append(btn(s,()=>subjectTextbookEntry(s))));
 A.append(g);
};

/* 古い start(s) が何かの古い保存状態から呼ばれても、基礎5問へ入れず新入口へ戻す。
   単元学習 v22.5 の startTextbookUnit は別関数なので影響しない。 */
start=function(s){
 const x=normalizePlanSubject229(s);
 if(["国語","算数","理科","社会","外国語活動"].includes(x)){subjectTextbookEntry(x);return}
 child();
};
