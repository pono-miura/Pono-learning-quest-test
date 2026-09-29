/* v24.8 外国語：複数問題＋まとめ＋ふりかえり＋あとから確認
   v23.8 natural English TTS / v23.9 speaking / v24.0 meanings are preserved. */
const ENGRET248="ponoEnglishRetention";
function engChoices248(d){
 const base=d&&d.q ? [d.q] : [];
 const model=(d&&d.model)||"Hello!";
 const words=(d&&Array.isArray(d.words)?d.words:[]).filter(Boolean);
 const w0=words[0]||"Hello", w1=words[1]||"Goodbye";
 base.push(["お手本を聞いて、同じように言ってみよう。どれを聞く？",[model,w0,w1],0]);
 base.push(["この単元で使うことばを一つ選ぼう。",[w0,w1,model],0]);
 base.push(["英語を聞くとき、分からないところがあったらどうする？",["もう一度聞いたり、ゆっくり聞いたりする","すぐにやめる","全部日本語だと決める"],0]);
 base.push(["相手に伝えるとき大切なのは？",["完璧さだけでなく、伝えようとすること","一度も声に出さないこと","間違えないまで何もしないこと"],0]);
 return base.slice(0,5);
}
function engMove248(q,pos){
 if(!q||!Array.isArray(q[1]))return q;
 const a=q[1].slice(),ans=a[q[2]],rest=a.filter((_,i)=>i!==q[2]);pos%=a.length;rest.splice(pos,0,ans);
 return [q[0],rest,pos];
}
function englishQuestion248(g,title,term){
 const d=ENG237[title]||{}, qs=engChoices248(d).map((q,i)=>engMove248(q,i%3));
 let i=0,ok=0,reads=0;
 function show(){
  if(i>=qs.length)return finish();
  const q=qs[i]; head(`③ 自分で｜${title}`,()=>englishLearn237(g,title,term));
  A.append(e("div","tiny",`${i+1}/${qs.length}`));
  A.append(e("div","card",`<h2>${q[0]}</h2>`));
  A.append(btn("🔊 問題を聞く",()=>{reads++;speakJP(q[0])},"soft"));
  q[1].forEach((x,n)=>{
   let b=btn(x,()=>{
    if(n===q[2]){
     ok++; if(window.ponoCorrectSound)window.ponoCorrectSound();
     else if(window.ponoCorrectBeep243)window.ponoCorrectBeep243();
     i++;show();
    }else A.append(e("div","feedback warn","🌱 もう一度聞いたり、💡意味を見たりして大丈夫です。"));
   });
   A.append(b);
   if(/[A-Za-z]/.test(x))A.append(btn("🔊 "+x,()=>speakEN238(x,false),"soft"));
  });
  A.append(btn("📖 ①まなぶに戻る",()=>englishLearn237(g,title,term),"soft"));
 }
 function finish(){
  window.eng248session={g,title,term,ok,total:qs.length,reads,date:new Date().toISOString()};
  head(`まとめ｜${title}`,()=>englishLearn237(g,title,term));
  A.append(e("div","card good",`<h2>まとめまでできました 🌱</h2><p>${qs.length}問中 ${ok}問</p><p class="tiny">点数だけでなく、聞く・意味を見る・声に出すなど、自分に合う方法も大切です。</p>`));
  A.append(btn("🌱 単元ふりかえり",englishReflection248,"primary"));
 }
 show();
}
function englishReflection248(){
 const s=window.eng248session;if(!s)return child();
 head(`🌱 単元ふりかえり｜${s.title}`,child);
 A.append(e("div","card",`<h2>やってみて、どうだった？</h2><p class="tiny">評価ではなく、次に学びやすくするためのメモです。</p>`));
 ["😊 聞いてだいたい分かった","🗣️ まねして言えた","💡 意味を見ると分かりやすかった","🐢 ゆっくり聞くと分かりやすかった","🌱 もう一度やってみたい"].forEach(x=>A.append(btn(x,()=>englishSave248(x))));
}
function englishSave248(choice){
 const s=window.eng248session;let rows=[];try{rows=JSON.parse(localStorage.getItem("ponoUnitReflections")||"[]")}catch(e){}
 rows.push({studentId:profile.id,date:new Date().toISOString(),subject:s.g<=4?"外国語活動":"外国語",grade:s.g,unit:s.title,term:s.term,reflection:choice,correct:s.ok,total:s.total,reads:s.reads});
 localStorage.setItem("ponoUnitReflections",JSON.stringify(rows));
 head("🌿 ふりかえり完了",child);
 A.append(e("div","card good",`<h2>今日の学びを残しました</h2><p>${choice}</p>`));
 A.append(btn("🕰️ あとから確認",()=>englishRetention248(s),"primary"));
 A.append(btn("🌿 今日はここまで",child,"soft"));
}
function englishRetention248(s){
 const d=ENG237[s.title]||{}, words=(d.words||[]).filter(Boolean), target=words[0]||((d.model||"Hello").split(/[.!?]/)[0]);
 head(`🕰️ あとから確認｜${s.title}`,child);
 A.append(e("div","card",`<h2>このことば、覚えているかな？</h2><p class="tiny">本当の「定着確認」は、できれば別の日にやってみよう。</p><h2>${target}</h2>`));
 A.append(btn("🔊 聞いて確認",()=>speakEN238(target,false),"soft"));
 A.append(btn("😊 覚えていた",()=>englishRetentionSave248(s,target,true),"primary"));
 A.append(btn("🌱 もう一度見れば分かる",()=>englishRetentionSave248(s,target,false),"soft"));
}
function englishRetentionSave248(s,target,ok){
 let rows=[];try{rows=JSON.parse(localStorage.getItem(ENGRET248)||"[]")}catch(e){}
 rows.push({studentId:profile.id,date:new Date().toISOString(),subject:s.g<=4?"外国語活動":"外国語",grade:s.g,unit:s.title,target,retained:ok});
 localStorage.setItem(ENGRET248,JSON.stringify(rows));
 head("🌱 確認できました",child);
 A.append(e("div","card good",`<h2>${ok?"覚えていたね！":"もう一度見れば大丈夫"}</h2><p class="tiny">あとから確認した記録を残しました。</p>`));
 A.append(btn("🏠 学習トップへ",child,"primary"));
}
/* Existing English route calls englishQuestion237. Redirect only the self-practice step. */
englishQuestion237=englishQuestion248;
