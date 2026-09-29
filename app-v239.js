
/* v23.9 外国語：発話練習＋「伝わる」確認
   採点・発音点数・×判定は行わない。ブラウザ音声認識は練習の目安。 */
const PONO_SPEAK239="ponoEnglishSpeaking";
function norm239(s){
 return String(s||"").toLowerCase().replace(/[.,!?'"’\-]/g," ").replace(/\s+/g," ").trim();
}
function similarity239(a,b){
 a=norm239(a); b=norm239(b);
 if(!a||!b)return 0;
 if(a===b)return 1;
 const aa=a.split(" "), bb=b.split(" ");
 const hit=aa.filter(x=>bb.includes(x)).length;
 return hit/Math.max(aa.length,bb.length);
}
function saveSpeak239(o){
 let a=[];try{a=JSON.parse(localStorage.getItem(PONO_SPEAK239)||"[]")}catch(e){}
 a.push({...o,at:new Date().toISOString()});
 localStorage.setItem(PONO_SPEAK239,JSON.stringify(a.slice(-500)));
}
function speakingPractice239(target,g,title){
 const box=e("div","card speak239");
 box.innerHTML=`<h3>🎤 言ってみる</h3>
 <p class="tiny">お手本を聞いたあと、自分でも言ってみよう。点数はつけません。「相手に伝わるかな？」を確かめる練習です。</p>
 <div class="speakTarget239"><b>${target}</b></div>
 <div class="speakResult239"></div>`;
 const result=box.querySelector(".speakResult239");
 const Rec=window.SpeechRecognition||window.webkitSpeechRecognition;
 const b=btn("🎤 言ってみる",()=>{
   if(!Rec){
     result.innerHTML='<div class="note239">この端末・ブラウザでは音声認識を使えません。お手本を聞いて、まねして言う練習はそのままできます。</div>';
     return;
   }
   const r=new Rec(); r.lang="en-US"; r.interimResults=false; r.maxAlternatives=3;
   b.disabled=true; b.textContent="🎤 聞いています…";
   result.innerHTML='<div class="listen239">英語で話してみよう…</div>';
   r.onresult=ev=>{
     const alts=[...ev.results[0]].map(x=>x.transcript);
     const best=alts.map(x=>({t:x,s:similarity239(target,x)})).sort((x,y)=>y.s-x.s)[0];
     const conveyed=best && best.s>=0.55;
     saveSpeak239({grade:g,unit:title,target,heard:best?best.t:"",recognized:!!conveyed});
     result.innerHTML=conveyed
       ? `<div class="good239">🌱 伝わったよ！<br><span>「${best.t}」と聞こえました。</span></div>`
       : `<div class="try239">🌱 挑戦できたね。<br><span>${best&&best.t?`「${best.t}」と聞こえました。`:"うまく聞き取れませんでした。"}</span><br><span class="tiny">お手本をもう一度聞いても大丈夫です。</span></div>`;
     b.disabled=false;b.textContent="🎤 もう一度言ってみる";
   };
   r.onerror=ev=>{
     saveSpeak239({grade:g,unit:title,target,heard:"",recognized:false,error:ev.error});
     result.innerHTML='<div class="try239">音声をうまく聞き取れませんでした。マイクの許可を確認して、もう一度試してみてください。</div>';
     b.disabled=false;b.textContent="🎤 もう一度言ってみる";
   };
   r.onend=()=>{if(b.disabled){b.disabled=false;b.textContent="🎤 もう一度言ってみる"}};
   try{r.start()}catch(err){b.disabled=false;b.textContent="🎤 言ってみる";}
 },"primary");
 box.append(b);
 return box;
}

/* v23.8の学習画面に発話練習を追加 */
englishLearn237=function(g,title,term){
 const d=ENG237[title],label=g<=4?"外国語活動":"外国語";
 head(`① まなぶ｜${title}`,()=>englishHome237(g,title,term));
 A.append(e("div","card",`<div class="tiny">${label}｜小学${g}年</div><h2>👂 まず聞いてみよう</h2>${engScene237(d)}
 <h3>この単元のことば</h3>${d.words.map(x=>`<div class="engword237"><b>${x}</b><button class="miniSpeak237">🔊</button></div>`).join("")}
 <p class="tiny">文字を読むのが大変なときは、音を聞いて意味が分かれば学びになっています。</p>`));
 [...A.querySelectorAll(".engword237")].forEach((row,i)=>row.querySelector("button").onclick=()=>{unitSession.reads++;speakEN238(d.words[i],false)});
 let aud=engAudioButtons238(d.model);
 [...aud.querySelectorAll("button")].forEach(b=>b.addEventListener("click",()=>unitSession.reads++));
 A.append(aud);
 A.append(speakingPractice239(d.model,g,title));
 A.append(btn("➡️ ② 一緒にやってみる",()=>englishTogether237(g,title,term),"primary"));
};
englishTogether237=function(g,title,term){
 const d=ENG237[title];
 head(`② 一緒に｜${title}`,()=>englishLearn237(g,title,term));
 A.append(e("div","card good",`<h2>場面から考えよう</h2>${engScene237(d)}
 <p>① 絵や場面を見る</p><p>② 音を聞く</p><p>③ まねして言ってみる</p>
 <p class="tiny">全部言えなくても、聞いて分かった・一部を言えた、も大切な記録です。</p>`));
 let aud=engAudioButtons238(d.model);
 [...aud.querySelectorAll("button")].forEach(b=>b.addEventListener("click",()=>unitSession.reads++));
 A.append(aud);
 A.append(speakingPractice239(d.model,g,title));
 A.append(btn("🚀 ③ 自分でやる",()=>englishQuestion237(g,title,term),"primary"));
};
englishSummary237=function(g,title,term,ok){
 const d=ENG237[title];
 head(`まとめ｜${title}`,()=>englishHome237(g,title,term));
 A.append(e("div","card good",`<h2>🌱 まとめ</h2><p>${ok?"できたね。":"①まなぶに戻って、もう一度聞いてみても大丈夫です。"}</p>
 <p><b>最後に、お手本を聞いて自分でも言ってみよう。</b></p>${engScene237(d)}`));
 let aud=engAudioButtons238(d.model);
 [...aud.querySelectorAll("button")].forEach(b=>b.addEventListener("click",()=>unitSession.reads++));
 A.append(aud);
 A.append(speakingPractice239(d.model,g,title));
 A.append(e("div","card",`<h2>🌱 単元ふりかえり</h2><p>今の感じに近いものを選んでください。</p>`));
 ["聞いてわかった","まねして言えた","もう一度聞きたい"].forEach(x=>A.append(btn(x,()=>englishFinish237(g,title,term,ok,x),"soft")));
};
