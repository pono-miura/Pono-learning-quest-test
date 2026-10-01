/* v30.8 国語3年「理由と具体例」10問 完成版 */
(function(){
  const UNIT305 = "理由と具体例";
  const PASSAGE305 =
    "わたしは、図書室を使うことにはよいところがあると思います。理由は、本を読むことで、知らなかったことを調べたり、考えを広げたりできるからです。"
    + "たとえば、わたしは校庭で見つけた虫の名前が分からなかったとき、図書室で虫の本を借りて調べました。すると、虫の名前だけでなく、食べ物やすむ場所も知ることができました。"
    + "また、友だちは町たんけんの前に地図の本を読み、公園や川の場所を確かめていました。"
    + "このように、図書室では、気になったことを自分で確かめ、新しいことを知ることができます。だから、図書室を上手に使うと、学びを広げることができると思います。";


  const PASSAGE_RUBY305 =
    "わたしは、<ruby>図書室<rt>としょしつ</rt></ruby>を<ruby>使<rt>つか</rt></ruby>うことにはよいところがあると<ruby>思<rt>おも</rt></ruby>います。"
    + "<ruby>理由<rt>りゆう</rt></ruby>は、<ruby>本<rt>ほん</rt></ruby>を<ruby>読<rt>よ</rt></ruby>むことで、<ruby>知<rt>し</rt></ruby>らなかったことを<ruby>調<rt>しら</rt></ruby>べたり、<ruby>考<rt>かんが</rt></ruby>えを<ruby>広<rt>ひろ</rt></ruby>げたりできるからです。"
    + "たとえば、わたしは<ruby>校庭<rt>こうてい</rt></ruby>で<ruby>見<rt>み</rt></ruby>つけた<ruby>虫<rt>むし</rt></ruby>の<ruby>名前<rt>なまえ</rt></ruby>が<ruby>分<rt>わ</rt></ruby>からなかったとき、<ruby>図書室<rt>としょしつ</rt></ruby>で<ruby>虫<rt>むし</rt></ruby>の<ruby>本<rt>ほん</rt></ruby>を<ruby>借<rt>か</rt></ruby>りて<ruby>調<rt>しら</rt></ruby>べました。"
    + "すると、<ruby>虫<rt>むし</rt></ruby>の<ruby>名前<rt>なまえ</rt></ruby>だけでなく、<ruby>食<rt>た</rt></ruby>べ<ruby>物<rt>もの</rt></ruby>やすむ<ruby>場所<rt>ばしょ</rt></ruby>も<ruby>知<rt>し</rt></ruby>ることができました。"
    + "また、<ruby>友<rt>とも</rt></ruby>だちは<ruby>町<rt>まち</rt></ruby>たんけんの<ruby>前<rt>まえ</rt></ruby>に<ruby>地図<rt>ちず</rt></ruby>の<ruby>本<rt>ほん</rt></ruby>を<ruby>読<rt>よ</rt></ruby>み、<ruby>公園<rt>こうえん</rt></ruby>や<ruby>川<rt>かわ</rt></ruby>の<ruby>場所<rt>ばしょ</rt></ruby>を<ruby>確<rt>たし</rt></ruby>かめていました。"
    + "このように、<ruby>図書室<rt>としょしつ</rt></ruby>では、<ruby>気<rt>き</rt></ruby>になったことを<ruby>自分<rt>じぶん</rt></ruby>で<ruby>確<rt>たし</rt></ruby>かめ、<ruby>新<rt>あたら</rt></ruby>しいことを<ruby>知<rt>し</rt></ruby>ることができます。"
    + "だから、<ruby>図書室<rt>としょしつ</rt></ruby>を<ruby>上手<rt>じょうず</rt></ruby>に<ruby>使<rt>つか</rt></ruby>うと、<ruby>学<rt>まな</rt></ruby>びを<ruby>広<rt>ひろ</rt></ruby>げることができると<ruby>思<rt>おも</rt></ruby>います。";

  const QS305 = [
    {type:"choice", q:"筆者がいちばん伝えたい考えはどれですか。", choices:[
      "校庭にはたくさんの虫がいる",
      "図書室を上手に使うと、学びを広げることができる",
      "町たんけんでは公園へ行く"
    ], ans:1, hint:"文章の最初と最後に書かれている考えを見てみよう。"},
    {type:"choice", q:"筆者がそのように考える理由として、いちばん合うものはどれですか。", choices:[
      "図書室には机があるから",
      "友だちと一緒に行けるから",
      "本を読むと、知らなかったことを調べたり、考えを広げたりできるから"
    ], ans:2, hint:"「理由は、」の後を読み直してみよう。"},
    {type:"text", q:"筆者は、虫の名前が分からなかったとき、図書室で何をしましたか。本文の言葉を使って答えましょう。",
      keys:["虫の本","借り","調べ"], min:2, hint:"「たとえば、わたしは…」から始まる文を見てみよう。"},
    {type:"choice", q:"「たとえば」という言葉は、どんなはたらきをしていますか。", choices:[
      "前に書かれた理由を、具体的な出来事で分かりやすくしている",
      "話題をまったく別のものに変えている",
      "文章を終わらせている"
    ], ans:0, hint:"「たとえば」の後には、実際の出来事が書かれています。"},
    {type:"choice", q:"この文章の組み立てとして、いちばん近いものはどれですか。", choices:[
      "具体例 → 題名 → 質問 → 理由",
      "考え → 理由 → 具体例 → まとめ",
      "まとめ → 具体例 → 理由 → 考え"
    ], ans:1, hint:"最初・真ん中・最後に何が書かれているか順に見よう。"},
    {type:"text", q:"友だちは町たんけんの前に、図書室で何をしていましたか。本文をもとに答えましょう。",
      keys:["地図","公園","川","確かめ"], min:2, hint:"「また、友だちは…」から始まる文を見てみよう。"},
    {type:"choice", q:"「また」という言葉は、ここではどんなはたらきをしていますか。", choices:[
      "反対の考えに変えている",
      "前の内容を取り消している",
      "もう一つの具体例を付け加えている"
    ], ans:2, hint:"虫の例のあとに、別の例が続いています。"},
    {type:"text", q:"虫の例と町たんけんの例があることで、「図書室で学びを広げられる」という理由が、どのように分かりやすくなっていますか。自分の言葉で答えましょう。",
      keys:["調べ","確かめ","知","具体"], min:1, hint:"二つの例に共通していることを考えてみよう。"},
    {type:"choice", q:"この文章の題名として、いちばん合うものはどれですか。", choices:[
      "図書室で学びを広げよう",
      "校庭の虫だけを調べよう",
      "町たんけんの地図"
    ], ans:0, hint:"文章全体でいちばん伝えたいことに合う題名を選ぼう。"},
    {type:"text", q:"この文章を読んで分かった「図書室のよさ」を、40字くらいを目安にまとめてみましょう。",
      keys:["調べ","知","考え","広げ","確かめ"], min:2, hint:"「調べる」「新しいことを知る」「学びを広げる」が手がかりです。"}
  ];

  function norm305(s){
    return String(s||"").replace(/[。、，,\s「」『』]/g,"");
  }
  function speak305(t){
    try{
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(t);
      u.lang = "ja-JP";
      u.rate = 0.82;
      speechSynthesis.speak(u);
    }catch(e){}
  }
  function passageHtml305(){
    return `<div class="jp305pass">
      <div class="jp305label">📖 本文</div>
      <p class="jp305plain">${PASSAGE305}</p>
      <p class="jp305ruby" hidden>${PASSAGE_RUBY305}</p>
    </div>`;
  }

  function showRubyAndSpeak305(){
    document.querySelectorAll(".jp305plain").forEach(x=>x.hidden=true);
    document.querySelectorAll(".jp305ruby").forEach(x=>x.hidden=false);
    speak305(PASSAGE305);
  }
  function top305(title, back){
    head(title, back);
  }
  function home305(){
    top305(`国語｜${UNIT305}`, ()=>subjectGradeTerms("国語",3));
    A.append(e("div","card",`
      <div class="tiny">小学3年 国語｜単元テスト型</div>
      <h2>${UNIT305}</h2>
      <p><b>学ぶこと</b></p>
      <p>文章の中の<b>理由</b>と<b>具体例</b>のつながりを読み取り、本文をもとに答えます。</p>
      <p class="tiny">文章はPonoオリジナルです。漢字クエストは変更していません。</p>
    `));
    A.append(btn("📝 10問の問題をはじめる", ()=>renderQ305(0), "primary"));
  }

  function addVoice305(box, ta){
    const msg = document.createElement("div");
    msg.className = "tiny jp305voice";
    box.appendChild(btn("🎤 音声で答える", ()=>{
      const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      if(!SR){
        msg.textContent = "このブラウザでは音声入力が使えません。文字入力で答えられます。";
        return;
      }
      try{
        const r = new SR();
        r.lang = "ja-JP";
        r.interimResults = false;
        msg.textContent = "🎤 聞いています…";
        r.onresult = ev=>{
          ta.value = ev.results[0][0].transcript;
          msg.textContent = "音声を文字にしました。内容を確認して「答え合わせ」を押してください。";
        };
        r.onerror = ()=>{ msg.textContent = "うまく聞き取れませんでした。もう一度試せます。"; };
        r.start();
      }catch(err){
        msg.textContent = "マイクを開始できませんでした。";
      }
    },"soft"));
    box.appendChild(msg);
  }

  function next305(i){
    if(i < QS305.length-1) renderQ305(i+1);
    else finish305();
  }

  function renderQ305(i){
    const q = QS305[i];
    top305(`問${i+1} / ${QS305.length}｜${UNIT305}`, i===0 ? home305 : ()=>renderQ305(i-1));

    A.append(e("div","jp305progress",`
      <div class="jp305bar"><span style="width:${((i+1)/QS305.length)*100}%"></span></div>
      <div class="tiny">${i+1} / ${QS305.length}</div>
    `));

    A.append(e("div","card",`
      <h2>文章を読んで答えましょう</h2>
      ${passageHtml305()}
    `));
    A.append(btn("🔊 本文を聞く（ルビ表示）", ()=>showRubyAndSpeak305(), "soft"));

    const kind = q.type==="text" ? "記述して答える" : "選択して答える";
    const box = e("div","card jp305q",`
      <div class="jp305kind">問${i+1}｜${kind}</div>
      <h3>${q.q}</h3>
    `);
    A.append(box);

    if(q.type==="choice"){
      // v30.8: 正解位置を表示時に強制分散。元データの並び順に依存しない。
      const correct = q.choices[q.ans];
      const wrongs = q.choices.filter((_, idx)=>idx!==q.ans);
      const posPattern = [1,2,0,2,1,0,2,1,0,2]; // 0=上、1=中央、2=下
      const targetPos = posPattern[i % posPattern.length];
      const shown = [];
      let w = 0;
      for(let p=0;p<q.choices.length;p++){
        if(p===targetPos) shown.push({text:correct, ok:true});
        else shown.push({text:wrongs[w++], ok:false});
      }

      shown.forEach(item=>{
        box.appendChild(btn(item.text, ()=>{
          const old = box.querySelector(".jp305feedback");
          if(old) old.remove();
          if(item.ok){
            const f=e("div","feedback good jp305feedback","◎ 正解です。本文の理由と具体例をつなげて読めています。");
            box.appendChild(f);
            const nb=btn(i===QS305.length-1 ? "結果を見る" : "次の問題へ", ()=>next305(i), "primary");
            box.appendChild(nb);
          }else{
            box.appendChild(e("div","feedback warn jp305feedback",`💡 ヒント：${q.hint}<br>本文をもう一度見て選び直してみよう。`));
          }
        },"soft"));
      });
    }else{
      const note=e("div","jp305answerway","<b>答え方を選べます</b><br>⌨️ 文字を入力　または　🎤 音声で答える");
      box.appendChild(note);
      const ta=document.createElement("textarea");
      ta.className="jp305textarea";
      ta.rows=4;
      ta.placeholder="ここに答えを入力できます";
      box.appendChild(ta);
      addVoice305(box, ta);
      box.appendChild(btn("答え合わせ", ()=>{
        const old = box.querySelector(".jp305feedback");
        if(old) old.remove();
        const v=norm305(ta.value);
        const hits=q.keys.filter(k=>v.includes(norm305(k))).length;
        if(v.length>0 && hits>=q.min){
          box.appendChild(e("div","feedback good jp305feedback","◎ 大切な内容が入っています。本文をもとに答えられました。"));
          box.appendChild(btn(i===QS305.length-1 ? "結果を見る" : "次の問題へ", ()=>next305(i), "primary"));
        }else{
          box.appendChild(e("div","feedback warn jp305feedback",`💡 ヒント：${q.hint}<br>必要な言葉を足して、もう一度答えてみよう。`));
        }
      },"primary"));
    }
  }

  function finish305(){
    top305(`できました｜${UNIT305}`, ()=>renderQ305(9));
    A.append(e("div","card good",`
      <h2>🎉 10問おわりました</h2>
      <p><b>理由 → 具体例 → まとめ</b>のつながりを読み取る練習ができました。</p>
      <p>記述問題は、<b>⌨️タイピング</b>と<b>🎤音声入力</b>のどちらでも答えられます。</p>
    `));
    A.append(btn("🔁 もう一度10問に挑戦", ()=>renderQ305(0), "soft"));
    A.append(btn("国語3年へ戻る", ()=>subjectGradeTerms("国語",3), "primary"));
  }

  const old305 = japaneseTextbookOpen249;
  japaneseTextbookOpen249 = function(g, title){
    if(Number(g)===3 && String(title)===UNIT305){
      home305();
      return;
    }
    return old305(g, title);
  };
})();