/* v33.8 算数：問題の重複感を減らし、各問題に合った解き方を表示 */
(function(){
  const ratio338 = [
    ["18:24を最も簡単な比にすると？",["2:3","3:4","4:5"],1,
      "18と24を同じ数でわります。どちらも6でわると、18÷6=3、24÷6=4。だから 3:4 です。"],
    ["3:4の比の値は？",["3/4","4/3","7"],0,
      "比の値は「前の数÷後ろの数」で求めます。3:4 なら 3÷4=3/4（0.75）です。"],
    ["12:18と等しい比はどれ？",["2:3","3:4","4:5"],0,
      "12と18を同じ数でわります。どちらも6でわると 12÷6=2、18÷6=3。だから 2:3 です。"],
    ["赤:白=5:3で、全部で64個あります。赤は何個？",["24個","40個","48個"],1,
      "5:3なので、全部は5+3=8こ分です。64÷8=8で、1こ分は8個。赤は5こ分なので 8×5=40個です。"],
    ["A:B=4:7、Aが36ならBは？",["49","56","63"],2,
      "Aの4こ分が36なので、1こ分は36÷4=9です。Bは7こ分だから 9×7=63。答えは63です。"],
    ["濃縮液:水=2:5で、全部で1.4L作ります。水は何L？",["0.4L","1.0L","1.2L"],1,
      "2:5なので全部は7こ分。1.4÷7=0.2Lが1こ分です。水は5こ分なので 0.2×5=1.0Lです。"]
  ];

  try{
    if(typeof MATHNODES!=="undefined" && MATHNODES.g6_ratio){
      MATHNODES.g6_ratio.qs=ratio338;
    }
  }catch(e){}

  const method338={
    g1_num:"数の順番や「10といくつ」に分けて考えます。",
    g1_add:"増える・合わせるならたし算、残り・ちがいならひき算を使います。",
    g1_shape:"辺や角の数、丸みなど、形の特徴を一つずつ見ます。",
    g1_compare:"同じ基準にそろえて、長さ・かさ・広さを比べます。",
    g2_add:"位をそろえ、一の位から筆算します。くり上がり・くり下がりを確認します。",
    g2_mult:"「1つ分の数×いくつ分」で考えます。",
    g2_length:"cm・mm・mの関係を確認して、同じ単位にそろえます。",
    g2_time:"1時間=60分を使い、時こくと時間を分けて考えます。",
    g2_shape:"辺・頂点・直角などの特徴に注目します。",
    g2_data:"表やグラフの目盛りを確認し、必要な数を読み取ります。",
    g3_mult:"位ごとにかけ、必要ならくり上げます。文章題では「1つ分×いくつ分」を式にします。",
    g3_div:"「同じ数ずつ分ける」か「いくつ分あるか」を考え、わり算を使います。",
    g3_weight:"kgとgを必要に応じて同じ単位にそろえて計算します。",
    g3_time:"1時間=60分を使い、時こくをまたぐときは区切って考えます。",
    g3_shape:"半径・直径や三角形の辺の特徴を使います。",
    g3_data:"1目盛りがいくつかを最初に確認してから読み取ります。",
    g4_divcalc:"大きい数のわり算は、商を立てて、かける→ひく→おろすの順で考えます。",
    g4_frac:"分母は何等分か、分子はいくつ分かを表します。大きさをそろえて比べます。",
    g4_angle:"1回転=360度、半回転=180度、直角=90度を使って考えます。",
    g4_area:"長方形はたて×よこ、正方形は一辺×一辺で面積を求めます。",
    g4_shape:"平行・垂直、辺の長さ、角の大きさなど四角形の特徴を使います。",
    g4_data:"折れ線の上がり下がりと目盛りを読み、変化の大きさを求めます。",
    g5_frac:"分母が違うときは通分し、分母をそろえてから分子を計算します。",
    g5_decimal:"小数点の位置に注意し、整数の計算とのつながりを使います。",
    g5_ratio:"割合=くらべる量÷もとにする量。百分率は小数に直して考えます。",
    g5_area:"三角形は底辺×高さ÷2、平行四辺形は底辺×高さを使います。",
    g5_volume:"底面の広さが高さの分だけ積み重なると考えます。",
    g5_shape:"合同なら、対応する辺の長さと角の大きさは同じです。",
    g5_data:"平均は合計÷個数。割合のグラフは全体を100%として読みます。",
    g6_fracmul:"分子どうし・分母どうしをかけ、できるところは先に約分します。",
    g6_fracdiv:"わる数を逆数にして、かけ算に直します。",
    g6_ratio:"比の両方に同じ数をかけたりわったりして、対応する量を考えます。",
    g6_area:"円の面積=半径×半径×3.14。直径なら先に半径を求めます。",
    g6_volume:"柱体の体積=底面積×高さ。円柱では先に円の底面積を求めます。",
    g6_scale:"縮尺・拡大率を、対応する長さの比として考えます。",
    g6_data:"平均だけでなく、中央値・最頻値・範囲も使ってデータの特徴を見ます。"
  };

  function esc338(s){
    return String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  }

  function explain338(q){
    if(q && q[3]) return q[3];
    const id=adaptive&&adaptive.node;
    const ans=q&&q[1]?q[1][q[2]]:"";
    const method=method338[id]||"分かっている数と、何を求める問題かを確認して、使う式を考えます。";
    return `${method} この問題の答えは「${ans}」です。`;
  }

  function explanationBox338(q,wrong=false){
    let old=A.querySelector(".math-explain338");
    if(old)old.remove();
    let n=MATHNODES[adaptive.node];
    let d=e("div",`card ${wrong?"warn":"soft"} math-explain338`,
      `<h2>${wrong?"🌱 ここを確認":"💡 この問題の解き方"}</h2>
       <p><b>問題</b><br>${fmtMath(q[0])}</p>
       <p>${fmtMath(explain338(q))}</p>
       <p class="answer-box"><b>答え：${fmtMath(q[1][q[2]])}</b></p>
       ${wrong?'<p class="tiny">同じ問題を、解き方を見ながらもう一度選んで大丈夫です。</p>':""}`);
    const card=[...A.querySelectorAll(".card")][0];
    if(card)card.insertAdjacentElement("afterend",d); else A.prepend(d);
    return d;
  }

  window.mathQuestionType = mathQuestionType = function(i,total){
    if(total===6){
      return ["🌱 基礎確認","✏️ 基本確認","📘 標準","💬 文章・活用","🌟 応用","📝 単元テスト"][i]||"📝 確認";
    }
    const labels=["🔎 理解確認","✏️ 基本","💬 文章・場面","🌟 応用"];
    let pos=total<=1?0:i/(total-1);
    return pos<.25?labels[0]:pos<.55?labels[1]:pos<.8?labels[2]:labels[3];
  };

  window.mathQ = mathQ = function(){
    let n=MATHNODES[adaptive.node],q=n.qs[adaptive.qi];
    head(`③ 自分で｜${n.title}`,child);
    adaptive.errorKinds=adaptive.errorKinds||{"問題文・場面の確認":0,"計算・考え方の確認":0};

    A.append(e("div","tiny",`在籍 小学${profile.grade}年｜学習開始の目安 小学${profile.startGrade||profile.grade}年`));
    A.append(e("div","question-kind",mathQuestionType(adaptive.qi,n.qs.length)));
    A.append(e("div","card",`<h2>${fmtMath(q[0])}</h2>`));
    A.append(btn("✏️ メモする",()=>mathScratchpad(),"soft"));

    q[1].forEach((x,i)=>{
      let b=btn("",()=>mathAns(i===q[2],q));
      b.innerHTML=fmtMath(x);
      A.append(b);
    });

    A.append(btn("💡 この問題の解き方を見る",()=>{
      adaptive.learned=(adaptive.learned||0)+1;
      explanationBox338(q,false);
    },"soft"));

    A.append(btn("🌱 わからない・解き方を見る",()=>{
      adaptive.h++;
      explanationBox338(q,true);
    },"soft"));

    A.append(btn("📖 単元の説明を見る",()=>mathLearn(adaptive.node),"soft"));
  };

  window.mathAns = mathAns = function(ok,q){
    let n=MATHNODES[adaptive.node];

    if(ok){
      adaptive.ok++;
      new Audio("correct.wav").play().catch(()=>{});
      adaptive.qi++;

      head(`○ できました｜${n.title}`,child);
      A.append(e("div","card good",
        `<h2>できました 🌱</h2>
         <p><b>${fmtMath(q[0])}</b></p>
         <p>${fmtMath(explain338(q))}</p>
         <p class="answer-box"><b>答え：${fmtMath(q[1][q[2]])}</b></p>`));

      if(adaptive.qi<n.qs.length){
        A.append(btn("次の問題へ",mathQ,"primary"));
      }else{
        A.append(btn("結果を見る",mathJudge,"primary"));
      }
      return;
    }

    adaptive.h++;
    let eh=mathErrorHint(n,q);
    adaptive.errorKinds[eh.kind]=(adaptive.errorKinds[eh.kind]||0)+1;
    explanationBox338(q,true);
  };
})();