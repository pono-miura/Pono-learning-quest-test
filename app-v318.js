/* v31.8 学習記録・進み具合
   ・保護者 / 先生・Pono に進捗画面を追加
   ・国語読解10問の記録を既存の共通学習記録へ統合
   ・国語「学ぶ→例題→10問」の完了を今後共通記録へ保存
*/
(function(){
const V318_TITLES={
  "ことばと文のきほん":1,"ひらがな・カタカナ":1,"「は・を・へ」をつかう":1,
  "ことばをひろげる":1,"きいて・はなす":1,"むかしばなし・ことばのリズム":1,
  "文の組み立て":2,"主語と述語":2,"助詞をつかう":2,"ことばを広げる":2,
  "聞いて・質問して・伝える":2,"昔話・神話・伝承":2,
  "主語・述語・修飾語":3,"文と文のつながり":3,"考えを組み立てて書く":3,
  "聞く・質問する・伝える":3,"ことわざ・短歌・俳句":3,
  "考えを組み立てて書く__4":4,"聞く・話し合う・伝える":4,"短歌・俳句・ことばの文化":4,
  "構成を考えて書く":5,"聞く・話し合う・伝える__5":5,"古文・ことばの文化":5,
  "根拠を明確にして書く":6,"話し合いで考えを深める":6,"古文・漢文・ことばの文化":6
};
function safe318(k){
 try{const v=JSON.parse(localStorage.getItem(k)||"[]");return Array.isArray(v)?v:[]}catch(e){return[]}
}
function date318(v){
 const d=new Date(v);if(isNaN(d))return "日時なし";
 return d.toLocaleDateString("ja-JP",{timeZone:"Asia/Tokyo",month:"numeric",day:"numeric"});
}
function unit318(r){return r.unit||r.nodeTitle||r.title||"単元名の記録なし"}
function subject318(r){
 let s=r.subject||"学習";
 if(s==="外国語活動" && Number(r.grade)>=5)return "外国語";
 return s;
}
function syncReading318(){
 const src=safe318("ponoJapaneseReading313").filter(x=>!x.studentId||x.studentId===profile.id);
 let changed=false;
 src.forEach(x=>{
   const sk=`jr313|${x.studentId||profile.id}|${x.date}|${x.grade}|${x.unit}`;
   if(records.some(r=>r.sourceKey===sk))return;
   records.push({
     studentId:x.studentId||profile.id,date:x.date,subject:"国語",grade:x.grade,
     unit:x.unit,content:x.unit,total:x.total||10,correct:x.total||10,
     seconds:Number(x.seconds)||0,hints:Number(x.hints)||0,status:"10問完了",
     process:"読解10問",sourceKey:sk
   });changed=true;
 });
 if(changed)save();
}
syncReading318();

/* v31.5型の26単元は、10問完了画面に到達した時点で共通記録へ保存 */
let lastSave318="";
const oldHead318=head;
head=function(t,b){
 const m=String(t||"").match(/^まとめ｜(.+)$/);
 if(m){
   const title=m[1].trim();
   let grade=V318_TITLES[title];
   if(title==="考えを組み立てて書く"){
     const txt=(A.textContent||"");
     grade=/小学4年/.test(txt)?4:3;
   }
   if(title==="聞く・話し合う・伝える"){
     const txt=(A.textContent||"");
     grade=/小学5年/.test(txt)?5:4;
   }
   if(grade){
     const sig=`${profile.id}|${grade}|${title}`;
     const now=Date.now(), prev=Number(sessionStorage.getItem("pono318time")||0);
     if(lastSave318!==sig || now-prev>3000){
       records.push({
         studentId:profile.id,date:new Date().toISOString(),subject:"国語",grade,
         unit:title,content:title,total:10,correct:10,status:"10問完了",
         process:"学ぶ → 例題 → 10問",source:"v315"
       });
       save();lastSave318=sig;sessionStorage.setItem("pono318time",String(now));
     }
   }
 }
 return oldHead318(t,b);
};

function status318(r){
 const st=String(r.status||"");
 if(st.includes("定着")||st.includes("自力")||st.includes("10問完了")||r.result==="ok"||r.ok===true)return "確認";
 if(st.includes("練習")||Number(r.hints)>0||(r.rate!=null&&Number(r.rate)<80))return "練習";
 return "取組";
}
function all318(){
 return records.filter(r=>r.studentId===profile.id).slice().sort((a,b)=>new Date(a.date)-new Date(b.date));
}
function latestUnits318(rows){
 const map=new Map();
 rows.forEach(r=>map.set(`${subject318(r)}|${unit318(r)}`,r));
 return [...map.values()];
}
function progress318(back){
 syncReading318();
 const rows=all318(), units=latestUnits318(rows), now=new Date();
 head("📊 学習の進み具合",back);
 A.append(e("div","card",`<h2>${profile.name}の学習記録</h2><p>在籍 小学${profile.grade}年</p><p class="tiny">点数だけでなく、取り組んだ単元・練習中の内容・確認できた内容を分けて表示します。</p>`));

 if(!rows.length){
   A.append(e("div","card",`<h2>🌱 これから記録がたまります</h2><p>学習を終えると、ここに教科・単元・日付が自動で増えていきます。</p>`));
   return;
 }

 const days=new Set(rows.map(r=>date318(r.date))).size;
 const mins=Math.round(rows.reduce((a,r)=>a+(Number(r.seconds)||0),0)/60);
 const counts={確認:0,練習:0,取組:0};units.forEach(r=>counts[status318(r)]++);
 A.append(e("div","card summary318",`
   <h2>全体</h2>
   <div class="stats318">
    <div><b>${days}</b><span>学習日</span></div>
    <div><b>${rows.length}</b><span>学習記録</span></div>
    <div><b>${units.length}</b><span>取り組んだ単元</span></div>
   </div>
   ${mins?`<p class="tiny">記録されている学習時間：約${mins}分</p>`:""}
 `));
 A.append(e("div","card",`<h2>今の記録</h2>
   <span class="pill">✅ 確認できた ${counts.確認}</span>
   <span class="pill">🌱 練習中 ${counts.練習}</span>
   <span class="pill">📝 取り組み ${counts.取組}</span>
   <p class="tiny">「確認できた」は、その学習で確認できたという記録です。能力や学年全体の到達度を決める表示ではありません。</p>`));

 const order=["国語","算数","理科","社会","外国語活動","外国語"];
 order.forEach(sub=>{
   const ur=units.filter(r=>subject318(r)===sub);
   if(!ur.length)return;
   const sr=rows.filter(r=>subject318(r)===sub);
   const c={確認:0,練習:0,取組:0};ur.forEach(r=>c[status318(r)]++);
   const latest=ur.slice().sort((a,b)=>new Date(b.date)-new Date(a.date))[0];
   A.append(e("div","card subject318",`
     <h2>${sub}</h2>
     <p><b>${ur.length}単元</b>に取り組み記録があります。</p>
     <div class="track318"><span style="width:${Math.min(100,Math.max(8,c.確認/Math.max(1,ur.length)*100))}%"></span></div>
     <p><span class="pill">✅ ${c.確認}</span><span class="pill">🌱 ${c.練習}</span><span class="pill">📝 ${c.取組}</span></p>
     <p class="tiny">最近：${date318(latest.date)}　${unit318(latest)}</p>
   `));
 });

 const retry=units.filter(r=>status318(r)==="練習").slice().sort((a,b)=>new Date(b.date)-new Date(a.date)).slice(0,5);
 A.append(e("div","card",`<h2>🌱 もう一度確認するとよさそうな単元</h2>${
   retry.length?retry.map(r=>`<p><b>${subject318(r)}｜${unit318(r)}</b><br><span class="tiny">${date318(r.date)}　${Number(r.hints)>0?`ヒント ${r.hints}回`:"練習中"}</span></p>`).join("")
   :"<p>現在の記録では、繰り返し確認が必要と表示されている単元はありません。</p>"
 }</div>`));

 const recent=rows.slice().reverse().slice(0,8);
 A.append(e("div","card",`<h2>🗓️ 最近の学習</h2>${
   recent.map(r=>`<p><b>${date318(r.date)}　${subject318(r)}｜${unit318(r)}</b><br><span class="tiny">${r.status||status318(r)}${r.total?`　${r.correct!=null?`${r.correct}/${r.total}`:`${r.total}問`}`:""}</span></p>`).join("")
 }</div>`));
 A.append(e("p","tiny","※試作版は、この端末のブラウザに保存された学習記録を表示しています。"));
}

/* 保護者画面 */
const oldParent318=parent;
parent=function(){
 oldParent318();
 const b=btn("📊 学習の進み具合を見る",()=>progress318(parent),"primary");
 A.insertBefore(b,A.children[1]||null);
};

/* 先生・Pono画面 */
const oldTeacher318=teacher;
teacher=function(){
 oldTeacher318();
 const b=btn("📊 生徒の学習記録・進み具合",()=>progress318(teacher),"primary");
 A.insertBefore(b,A.children[1]||null);
};
})();