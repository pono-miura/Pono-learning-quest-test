/* v29.8 英語3〜6年：共通学習フロー完成版 */
(function(){
  /* 29.7で確認済みの発音・マイク練習を、ENG36_292の全単元でそのまま利用。
     ③に「自分で答える→聞く→発音」、まとめ・ふりかえりまで共通化する。 */
  function say298(t){
    try{
      const sy=window.speechSynthesis;if(!sy||!window.SpeechSynthesisUtterance)return;
      sy.cancel();const u=new SpeechSynthesisUtterance(String(t||""));
      u.lang="en-US";u.rate=.78;u.pitch=1;u.volume=1;
      const vs=sy.getVoices?sy.getVoices():[];
      u.voice=vs.find(v=>/^en-US/i.test(v.lang))||vs.find(v=>/^en/i.test(v.lang))||null;
      sy.speak(u);
    }catch(e){}
  }
  window.speakEN=say298;try{speakEN=say298}catch(e){}

  function mic298(target,box){
    const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
    if(!SR){box.innerHTML='<div class="feedback warn">このブラウザではマイク確認が使えません。聞いた英語をまねして言ってみよう。</div>';return}
    try{
      speechSynthesis&&speechSynthesis.cancel();
      const r=new SR();r.lang="en-US";r.interimResults=false;r.maxAlternatives=3;
      box.innerHTML='<div class="feedback">🎤 聞いています…</div>';
      r.onresult=e=>{
        const heard=e.results[0][0].transcript||"";
        box.innerHTML=`<div class="feedback good">😊 聞き取れた英語：<b>${heard}</b><br><span class="tiny">伝わりました。もう一度練習してもOKです。</span></div>`;
      };
      r.onerror=e=>box.innerHTML=`<div class="feedback warn">${e.error==="not-allowed"?"マイクの使用を許可すると発音を確認できます。":"うまく聞き取れませんでした。もう一度試してみよう。"}</div>`;
      r.start();
    }catch(e){box.innerHTML='<div class="feedback warn">マイクを開始できませんでした。</div>'}
  }

  /* ③を全学年・全単元で「選ぶ＋発音」へ */
  engSelf292=function(){
    let s=eng292,d=s.d;head(`③自分で｜${s.t}`,engTogether292);
    A.append(e("div","card",`<h2>💬 ③ 自分でやってみよう</h2>
      <p>この質問に合う答えはどれ？</p><p class="engPhrase292">${d[1]}</p>`));
    const wrong1=s.g<=4?"Hello!":"Thank you.";
    const wrong2=s.g<=4?"Good morning.":"Good night.";
    const opts=[d[2],wrong1,wrong2],order=[1,0,2];
    order.forEach(n=>A.append(btn(opts[n],()=>{
      if(n===0){
        s.ok=1;if(window.ponoCorrectSound)window.ponoCorrectSound();
        const c=e("div","card engSpeak298",`<h3>🎉 正解！ 声に出してみよう</h3>
          <p class="engPhrase292">${d[2]}</p>
          <button class="soft listen298">🔊 答えを聞く</button>
          <button class="primary mic298">🎤 自分で発音してみる</button>
          <div class="result298"></div>`);
        A.append(c);
        c.querySelector(".listen298").onclick=()=>say298(d[2]);
        c.querySelector(".mic298").onclick=()=>mic298(d[2],c.querySelector(".result298"));
        A.append(btn("➡️ まとめ問題へ",engSummary292,"primary"));
      }else{
        A.prepend(e("div","feedback warn","🌱 質問をもう一度聞いて、答えの例を思い出してみよう。"));
      }
    },"soft")));
    A.append(btn("🔊 質問をもう一度聞く",()=>say298(d[1]),"ghost"));
  };

  /* まとめ問題：聞く・意味・使うを1問ずつ確認 */
  engSummary292=function(){
    let s=eng292,d=s.d;head(`まとめ｜${s.t}`,engSelf292);
    A.append(e("div","card",`<h2>⭐ まとめ問題</h2>
      <p>質問を聞いて、合う答えを選ぼう。</p>
      <p class="engPhrase292">${d[1]}</p>`));
    A.append(btn("🔊 質問を聞く",()=>say298(d[1]),"soft"));
    const choices=[d[2],"Thank you.","See you."];
    [2,0,1].forEach(n=>A.append(btn(choices[n],()=>{
      if(n===0){
        if(window.ponoCorrectSound)window.ponoCorrectSound();
        A.append(e("div","feedback good","🎉 できました！ 聞く・意味を考える・答える、までできています。"));
        A.append(btn("➡️ 単元ふりかえりへ",engReflect292,"primary"));
      }else A.prepend(e("div","feedback warn","🌱 もう一度質問を聞いてみよう。"));
    },"soft")));
  };

  engReflect292=function(){
    let s=eng292,d=s.d;head(`ふりかえり｜${s.t}`,engSummary292);
    A.append(e("div","card",`<h2>🌱 単元ふりかえり</h2>
      <p><b>${d[0]}</b></p>
      <p>今日できたことを選ぼう。</p>`));
    ["👂 英語を聞けた","🗣️ まねして発音できた","💬 自分で答えられた","😊 英語で伝えてみた"].forEach(x=>
      A.append(btn(x,()=>A.prepend(e("div","feedback good","✨ できたことが一つ増えました。")),"soft"))
    );
    A.append(btn("🔊 最後にもう一度聞く",()=>say298(d[1]),"ghost"));
    A.append(btn("✅ この単元をおわる",()=>subjectGradeTerms("外国語",s.g),"primary"));
  };

  /* 入口の流れ表示は押すボタンに見えない案内へ */
  const oldHome298=engHome292;
  engHome292=function(g,t){
    oldHome298(g,t);
    const f=A.querySelector(".engFlow292");
    if(f){f.classList.add("flowGuide298");f.setAttribute("aria-label","学習の流れ");}
  };
})();