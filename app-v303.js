/* v30.3 国語3年：単元テスト型 読解完成見本 */
(function(){
 const U="理由と具体例";
 const passage=`学校の花だんでは、夏の暑さで土がすぐにかわいてしまいます。そこで、三年生は水やりの方法を話し合いました。朝のすずしい時間に水をやると、水が土にしみこみやすくなります。また、土の上にかわいた草をしき、土から水がにげにくくしました。その結果、暑い日が続いても、花は元気に育ちました。みんなは、植物を育てるには、ようすをよく見て方法をくふうすることが大切だと気づきました。`;
 function sayJP302(t){try{speechSynthesis.cancel();let u=new SpeechSynthesisUtterance(t);u.lang="ja-JP";u.rate=.82;speechSynthesis.speak(u)}catch(e){}}
 function norm302(s){return String(s||"").replace(/[。、，,\s]/g,"")}
 function answerBox302(q,keys,hint,next){
   A.append(e("div","card testAnswer302",`<h3>${q}</h3><textarea class="jpAns302" rows="3" placeholder="ここに答えを入力できます"></textarea><div class="jpVoice302 tiny"></div>`));
   const box=A.lastElementChild,ta=box.querySelector("textarea"),vr=box.querySelector(".jpVoice302");
   box.append(btn("🎤 音声で答える",()=>{
     const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
     if(!SR){vr.textContent="このブラウザでは音声入力が使えません。文字入力で答えられます。";return}
     try{const r=new SR();r.lang="ja-JP";r.interimResults=false;vr.textContent="🎤 聞いています…";
       r.onresult=x=>{ta.value=x.results[0][0].transcript;vr.textContent="音声を文字にしました。内容を確認して答え合わせを押してください。"};
       r.onerror=()=>vr.textContent="うまく聞き取れませんでした。もう一度試せます。";r.start()
     }catch(e){vr.textContent="マイクを開始できませんでした。"}
   },"soft"));
   box.append(btn("答え合わせ",()=>{
     const v=norm302(ta.value),hit=keys.filter(k=>v.includes(norm302(k))).length;
     if(hit>=Math.min(2,keys.length)){box.append(e("div","feedback good","◎ 大切な内容が入っています。本文をもとに答えられました。"));box.append(btn("次の問題へ",next,"primary"))}
     else box.append(e("div","feedback warn",`💡 ヒント：${hint}<br>本文をもう一度見て、必要な言葉を足してみよう。`));
   },"primary"));
 }
 function home302(){
   head(`国語｜${U}`,()=>subjectGradeTerms("国語",3));
   A.append(e("div","card",`<div class="tiny">小学3年 国語｜読解・単元テスト型</div><h2>${U}</h2><p><b>学ぶ内容</b></p><p>文章の中の理由と具体的な工夫を結びつけて読み、本文をもとに自分の言葉で答えます。</p><p class="tiny">文章はPonoオリジナルです。</p>`));
   A.append(btn("📝 問題をはじめる",q1,"primary"));
 }
 function passage302(){return `<div class="jpass272 testPass302"><div class="jlabel272">📖 本文</div><p>${passage}</p></div>`}
 function q1(){
   head("国語 単元テスト｜理由と具体例",home302);
   A.append(e("div","card",`<h2>文章を読んで答えましょう</h2>${passage302()}`));
   A.append(btn("🔊 本文を聞く",()=>sayJP302(passage),"soft"));
   A.append(e("div","card"><h3>問1　花だんの土がすぐにかわいたのは、なぜですか。</h3><p>本文から答えを選びましょう。</p></div>"));
   ["夏の暑さが続いたから","朝に水をやったから","花が元気に育ったから"].forEach((x,i)=>A.append(btn(x,()=>i===0?q2():A.prepend(e("div","feedback warn","💡 本文の最初の文をもう一度見てみよう。")),"soft")));
 }
 function q2(){
   head("問2｜理由と結果",q1);A.append(e("div","card",passage302()));
   answerBox302("問2　三年生は、土から水がにげにくくなるように、どんなくふうをしましたか。",["土","草","し"],"「また、」から始まる文を見てみよう。",q3);
 }
 function q3(){
   head("問3｜理由と結果",q2);A.append(e("div","card",passage302()));
   answerBox302("問3　花が元気に育ったのはなぜですか。本文の内容をもとに答えましょう。",["水","草","くふう"],"水やりの時間と、土の上にした工夫の二つを確かめよう。",q4);
 }
 function q4(){
   head("問4｜理由と結果",q3);A.append(e("div","card",passage302()));
   answerBox302("問4　三年生のみんなは、植物を育てるために何が大切だと気づきましたか。",["ようす","見","くふう"],"文章の最後の文が手がかりです。",finish302);
 }
 function finish302(){
   head("できました｜理由と具体例",q4);
   A.append(e("div","card good",`<h2>🎉 単元テスト終了</h2><p>理由と具体例を結びつけ、本文をもとに答える練習ができました。</p><p>記述問題は、<b>⌨️文字入力</b>でも<b>🎤音声入力</b>でも答えられます。</p>`));
   A.append(btn("🔁 もう一度",q1,"soft"));A.append(btn("国語3年へ戻る",()=>subjectGradeTerms("国語",3),"primary"));
 }
 const old302=japaneseTextbookOpen249;
 japaneseTextbookOpen249=function(g,title){
   if(Number(g)===3&&title===U){home302();return}
   old302(g,title);
 };
})();