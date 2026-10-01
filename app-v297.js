/* v29.7 英語練習UIを現在の画面へ確実に追加 */
(function(){
 function say297(text){
   try{
     const sy=window.speechSynthesis;if(!sy||!window.SpeechSynthesisUtterance)return;
     sy.cancel();const u=new SpeechSynthesisUtterance(String(text||""));
     u.lang="en-US";u.rate=.78;u.pitch=1;u.volume=1;
     const vs=sy.getVoices?sy.getVoices():[];
     u.voice=vs.find(v=>/^en-US/i.test(v.lang))||vs.find(v=>/^en/i.test(v.lang))||null;
     sy.speak(u);
   }catch(e){}
 }
 function clean(s){return String(s||"").replace(/\s+/g," ").trim()}
 function addPractice297(){
   if(!window.eng292||!eng292.d)return;
   const text=A.innerText||"";
   if(!/①|②/.test(text))return;
   const d=eng292.d;
   /* ①まなぶ：質問と答えの発音練習 */
   if(text.includes("① きいて") && !A.querySelector(".ponoPron297")){
     const box=document.createElement("div");box.className="card ponoPron297";
     box.innerHTML=`<h2>🗣️ 自分でも発音してみよう</h2>
       <p class="tiny">① 英語を聞く　→　② まねして言う　→　③ マイクで確認</p>
       <p class="engPhrase292">${d[1]}</p>
       <button type="button" class="soft p297listen">🔊 聞く</button>
       <button type="button" class="primary p297mic">🎤 自分で発音してみる</button>
       <div class="p297result"></div>
       <details class="p297meaning"><summary>💡 意味を確認する</summary><p>「${d[1]}」を使う場面や意味を確認してから、もう一度声に出してみよう。</p></details>`;
     const next=[...A.querySelectorAll("button")].find(b=>(b.innerText||"").includes("② 一緒"));
     if(next)A.insertBefore(box,next);else A.append(box);
     wire(box,d[1]);
   }
   /* ②：答える側として会話発音 */
   if(text.includes("② 一緒") && !A.querySelector(".ponoConv297")){
     const box=document.createElement("div");box.className="card ponoConv297";
     box.innerHTML=`<h2>💬 会話として発音してみよう</h2>
       <p>まず質問を聞いて、答えを声に出してみよう。</p>
       <p class="engPhrase292">${d[1]}</p>
       <button type="button" class="soft p297question">🔊 質問を聞く</button>
       <p class="engPhrase292">${d[2]}</p>
       <button type="button" class="primary p297mic">🎤 答えを発音してみる</button>
       <div class="p297result"></div>
       <details class="p297meaning"><summary>💡 意味を確認する</summary><p>質問を聞いて「${d[2]}」と答える会話です。</p></details>`;
     const next=[...A.querySelectorAll("button")].find(b=>(b.innerText||"").includes("③ 自分"));
     if(next)A.insertBefore(box,next);else A.append(box);
     box.querySelector(".p297question").onclick=()=>say297(d[1]);
     wire(box,d[2]);
   }
 }
 function wire(box,target){
   const l=box.querySelector(".p297listen");if(l)l.onclick=()=>say297(target);
   const m=box.querySelector(".p297mic"),r=box.querySelector(".p297result");if(!m)return;
   m.onclick=function(){
     const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
     if(!SR){r.innerHTML='<div class="feedback warn">このブラウザではマイク確認が使えません。聞いた英語をまねして発音してみよう。</div>';return}
     try{
       window.speechSynthesis&&window.speechSynthesis.cancel();
       const rec=new SR();rec.lang="en-US";rec.interimResults=false;rec.maxAlternatives=3;
       r.innerHTML='<div class="feedback">🎤 聞いています…</div>';
       rec.onresult=e=>{
         const heard=clean(e.results[0][0].transcript);
         r.innerHTML=`<div class="feedback good">😊 聞き取れた英語：<b>${heard}</b><br><span class="tiny">伝わりました。もう一度練習してもOKです。</span></div>`;
       };
       rec.onerror=e=>{r.innerHTML=`<div class="feedback warn">${e.error==="not-allowed"?"マイクの使用を許可すると発音を確認できます。":"うまく聞き取れませんでした。もう一度試してみよう。"}</div>`};
       rec.start();
     }catch(e){r.innerHTML='<div class="feedback warn">マイクを開始できませんでした。</div>'}
   };
 }
 const mo=new MutationObserver(()=>setTimeout(addPractice297,0));
 mo.observe(document.getElementById("app"),{childList:true,subtree:true});
 setTimeout(addPractice297,100);
})();