
/* v23.0 理科・社会・外国語にも「あとから確認」を接続。
   単元ふりかえり→後日定着確認→先生側見取りまで共通化。 */
const PONO_ALL_RETENTION="ponoAllSubjectRetention";

function saveUnitReflection(choice){
 let u=unitSession,rows=[];try{rows=JSON.parse(localStorage.getItem(PONO_REFLECT_KEY)||"[]")}catch(e){}
 const now=new Date().toISOString();
 rows.push({studentId:profile.id,date:now,subject:u.sub,grade:u.g,unit:u.title,term:u.term,reflection:choice,correct:u.ok,total:u.core.qs.length,reads:u.reads});
 localStorage.setItem(PONO_REFLECT_KEY,JSON.stringify(rows));
 records.push({studentId:profile.id,date:now,subject:u.sub,grade:u.g,unit:u.title,content:"教科書順単元学習",correct:u.ok,total:u.core.qs.length,rate:Math.round(u.ok/u.core.qs.length*100),reads:u.reads,status:"学習済み",process:"①まなぶ→②一緒に→③自分で→まとめ→ふりかえり"});
 save();

 head("🌿 ふりかえり完了",child);
 A.append(e("div","card good",`<h2>今日の学びを残しました</h2><p>${choice}</p>
 <p class="tiny">この記録は、次の学び方を考える材料になります。</p>`));
 let box=e("div","card retention-next",`<h2>🔁 あとから確認</h2>
 <p>この単元は、時間をあけてもう一度確認できます。</p>
 <p class="tiny">今すぐ試すこともできますが、「定着確認済み」は後日確認できた時の記録として使うのがおすすめです。</p>`);
 box.append(btn("あとから確認を開く",()=>allSubjectRetention(u),"soft"));
 A.append(box);
 A.append(btn("📚 教科書順の単元へ",()=>subjectTextbookEntry(u.sub==="外国語"?"外国語活動":u.sub),"primary"));
 A.append(btn("🌿 今日はここまで",child,"soft"));
}

function allSubjectRetention(u){
 const q=(u.core.qs&&u.core.qs.length)?u.core.qs[Math.min(1,u.core.qs.length-1)]:null;
 head(`🔁 あとから確認｜${u.title}`,child);
 if(!q){A.append(e("div","card","確認問題を準備しています。"));return}
 A.append(e("div","card good",`<h2>${u.title}</h2><p>前に学んだことを、1問だけ思い出してみよう。</p>
 <p class="tiny">できなくても大丈夫です。必要なら①まなぶへ戻れます。</p>`));
 A.append(e("div","card",`<h2>${q[0]}</h2>`));
 A.append(btn("🔊 問題を聞く",()=>speakJP(q[0]),"soft"));
 q[1].forEach((x,i)=>A.append(btn(x,()=>finishAllRetention(u,i===q[2]))));
}
function finishAllRetention(u,ok){
 let rows=[];try{rows=JSON.parse(localStorage.getItem(PONO_ALL_RETENTION)||"[]")}catch(e){}
 rows.push({studentId:profile.id,date:new Date().toISOString(),subject:u.sub,grade:u.g,unit:u.title,term:u.term,retained:ok});
 localStorage.setItem(PONO_ALL_RETENTION,JSON.stringify(rows));
 head("🔁 あとから確認",child);
 if(ok){
   try{new Audio("correct.wav").play()}catch(e){}
   A.append(e("div","card good","<h2>🌱 思い出せました</h2><p>後日に確認した場合は、定着の見取りに使えます。</p>"));
 }else{
   A.append(e("div","card soft","<h2>まだ練習中で大丈夫です</h2><p>もう一度「①まなぶ」で確認してから、またやってみよう。</p>"));
   A.append(btn("📖 ①まなぶへ戻る",()=>{unitSession=u;unitLearn()},"primary"));
 }
 A.append(btn("今日の学習へ戻る",child,"soft"));
}

function teacherAllSubjectProgress230(){
 let refs=[],rets=[];
 try{refs=JSON.parse(localStorage.getItem(PONO_REFLECT_KEY)||"[]")}catch(e){}
 try{rets=JSON.parse(localStorage.getItem(PONO_ALL_RETENTION)||"[]")}catch(e){}
 head("📊 全教科・単元の見取り",teacher);
 const subs=["国語","算数","理科","社会","外国語"];
 subs.forEach(s=>{
   let rr=refs.filter(x=>x.subject===s), rt=rets.filter(x=>x.subject===s);
   let good=rt.filter(x=>x.retained).length, retry=rt.filter(x=>!x.retained).length;
   let b=e("div","card",`<h2>${s}</h2><p>単元ふりかえり：${rr.length}件</p>
   <p>あとから確認：🌱確認 ${good}件 ／ 練習中 ${retry}件</p>`);
   let last=rr.slice(-3).reverse();
   if(last.length)b.innerHTML+=last.map(x=>`<div class="mini-record"><b>${x.unit}</b><br><span class="tiny">${x.reflection}</span></div>`).join("");
   A.append(b);
 });
 A.append(e("div","card soft",`<b>見取りの考え方</b><p class="tiny">正答数だけで判断せず、読み上げ・説明への戻り・本人のふりかえり・後日の確認を合わせて見ます。</p>`));
}

const teacherBefore230=teacher;
teacher=function(){
 teacherBefore230();
 A.append(e("div","card good",`<h2>📊 全教科・単元の見取り</h2><p>ふりかえりと、あとから確認を教科別にまとめます。</p>`));
 A.append(btn("全教科の見取りを開く",teacherAllSubjectProgress230,"primary"));
};
