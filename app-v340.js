/* v34.0 市販問題集レベルの基準版
   6年理科「物の燃え方と空気」を
   基礎10問 → 標準5問 → 応用3問 に再設計。
   長い「説明文を選ぶ」問題は使わず、短答・資料読み取り・実験・理由説明を中心にする。
   解説は回答後にだけ表示する。 */
(function(){
  const TARGET340="物の燃え方と空気";
  const baseQs340=[
    {type:"input",q:"物が燃えるときに使われる気体の名前を書きましょう。",answer:"酸素",
      keys:[["酸素"]],explain:"物が燃えるときには酸素が使われます。空気中の酸素が少なくなると、燃え続けにくくなります。"},
    {type:"choice",q:"空気中にふくまれる酸素は、およそ何％ですか。",choices:["約21％","約50％","約78％"],ans:0,
      explain:"空気は、およそ窒素78％、酸素21％で、二酸化炭素はごくわずかです。"},
    {type:"choice",q:"物が燃えた後の空気では、酸素と二酸化炭素はどうなりますか。",choices:["酸素↓・二酸化炭素↑","酸素↑・二酸化炭素↓","どちらも変わらない"],ans:0,
      explain:"燃焼では酸素が使われ、二酸化炭素が増えます。"},
    {type:"choice",q:"同じろうそくを、Aはふたのないびん、Bはふたをしたびんに入れました。先に火が消えるのはどちらですか。",choices:["A","B","同時"],ans:1,
      explain:"Bは新しい空気が入りにくく、びんの中の酸素が減るため先に消えます。"},
    {type:"input",q:"ろうそくを燃やし続けるために必要なことを、「空気」または「酸素」という言葉を使って書きましょう。",answer:"新しい空気（酸素）が入るようにする。",
      keys:[["空気","酸素"]],explain:"燃え続けるには酸素が必要です。新しい空気が入り、酸素が供給されることが大切です。"},
    {type:"choice",q:"石灰水を使って二酸化炭素が増えたか調べるとき、二酸化炭素が多いと石灰水はどうなりますか。",choices:["白くにごる","青くなる","変化しない"],ans:0,
      explain:"二酸化炭素をふくむ気体を石灰水に通すと、石灰水は白くにごります。"},
    {type:"choice",q:"酸素を多くふくむびんの中に火のついた線香を入れると、どうなりますか。",choices:["燃え方が強くなる","すぐ必ず消える","氷になる"],ans:0,
      explain:"酸素には物を燃やすはたらきがあるため、酸素が多いと燃え方が強くなります。"},
    {type:"choice",q:"燃える前と後の空気を比べる実験で、そろえた方がよいものはどれですか。",choices:["ろうそくの大きさ","燃やす前後の空気","調べる結果"],ans:0,
      explain:"比べる実験では、調べたい条件以外をそろえます。ろうそくの大きさなどをそろえると、公平に比べられます。"},
    {type:"choice",context:"<table class='wb340table'><tr><th></th><th>燃える前</th><th>燃えた後</th></tr><tr><td>酸素</td><td>21%</td><td>17%</td></tr><tr><td>二酸化炭素</td><td>0.04%</td><td>4%</td></tr></table>",
      q:"この結果から分かることはどれですか。",choices:["酸素が減り、二酸化炭素が増えた","酸素が増えた","気体は何も変化しなかった"],ans:0,
      explain:"数値を比べると、酸素は21％→17％に減り、二酸化炭素は0.04％→4％に増えています。"},
    {type:"input",q:"密閉したびんの中で、ろうそくの火がしばらくすると消える理由を書きましょう。",answer:"びんの中の酸素が使われて少なくなり、燃え続けられなくなるから。",
      keys:[["酸素"],["減","少","なく"]],explain:"密閉すると新しい空気が入りません。燃焼で酸素が使われて少なくなるため、やがて火が消えます。"}
  ];

  const standardQs340=[
    {type:"choice",context:"<table class='wb340table'><tr><th>びん</th><th>下のすき間</th><th>上のすき間</th><th>結果</th></tr><tr><td>A</td><td>なし</td><td>なし</td><td>すぐ消えた</td></tr><tr><td>B</td><td>あり</td><td>あり</td><td>長く燃えた</td></tr></table>",
      q:"Bのろうそくが長く燃えた主な理由はどれですか。",choices:["空気が入れかわったから","びんが軽くなったから","ろうそくが冷えたから"],ans:0,
      explain:"下から新しい空気が入り、上から温められた空気が出ることで空気が入れかわり、酸素が供給されます。"},
    {type:"choice",q:"「酸素が物を燃やすはたらきをもつ」ことを確かめたいとき、最もよい比べ方はどれですか。",choices:["酸素の多い気体とふつうの空気で燃え方を比べる","大きさの違うろうそくを比べる","別の日に別の場所で燃やす"],ans:0,
      explain:"調べたいのは酸素の量の影響です。酸素の量以外の条件をできるだけそろえて比べます。"},
    {type:"choice",context:"<table class='wb340table'><tr><th></th><th>酸素</th><th>二酸化炭素</th></tr><tr><td>空気A</td><td>21%</td><td>0.04%</td></tr><tr><td>空気B</td><td>16%</td><td>5%</td></tr></table>",
      q:"燃えた後の空気と考えられるのはどちらですか。",choices:["空気A","空気B","どちらとも言えない"],ans:1,
      explain:"燃えた後は酸素が減り、二酸化炭素が増えます。その特徴に合うのは空気Bです。"},
    {type:"input",q:"びんの下と上の両方にすき間を作ると、ろうそくが燃え続けやすくなる理由を書きましょう。",answer:"下から新しい空気が入り、上から空気が出て、酸素をふくむ空気が入れかわるから。",
      keys:[["空気","酸素"],["入","入れかわ","供給"]],explain:"空気の通り道ができると、新しい空気が入りやすくなります。その結果、燃焼に必要な酸素が供給されます。"},
    {type:"choice",q:"実験でAだけ大きいろうそく、Bだけ小さいろうそくを使いました。この実験の問題点は何ですか。",choices:["ろうそくの大きさがそろっていない","びんを使っている","火を観察している"],ans:0,
      explain:"燃え方を公平に比べるには、調べたい条件以外をそろえます。ろうそくの大きさが違うと、結果に影響する可能性があります。"}
  ];

  const challengeQs340=[
    {type:"choice",context:"<table class='wb340table'><tr><th>条件</th><th>燃えた時間</th></tr><tr><td>ふたを閉じる</td><td>24秒</td></tr><tr><td>下だけ少し開ける</td><td>38秒</td></tr><tr><td>下と上を開ける</td><td>85秒</td></tr></table>",
      q:"この結果から、もっとも言いやすいことはどれですか。",choices:["空気が通りやすいほど燃え続けやすい","ふたが重いほど長く燃える","時間は空気と関係ない"],ans:0,
      explain:"下と上を開けた条件で最も長く燃えています。空気が入り、出ていく通り道があるほど酸素が供給されやすいと考えられます。"},
    {type:"input",q:"「酸素が多いほど燃え方が強くなるか」を調べる実験で、変える条件と、調べる結果をそれぞれ書きましょう。",answer:"変える条件：酸素の割合。調べる結果：燃え方の強さ（または燃える時間）。",
      keys:[["酸素"],["燃え","時間","強"]],explain:"変える条件は酸素の量・割合です。結果として火の大きさや燃える時間などを比べます。それ以外の条件はそろえます。"},
    {type:"choice",q:"火を使う場所で換気が大切な理由を、この単元の学習から考えるとどれですか。",choices:["新しい空気が入り、燃焼に必要な酸素を保ちやすいから","部屋の色が変わるから","火の重さが軽くなるから"],ans:0,
      explain:"燃焼では酸素が使われます。換気によって新しい空気が入り、空気が入れかわります。"}
  ];

  let state340=null;

  function esc340(s){return String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));}
  function normalize340(s){return String(s||"").replace(/[。、，,\s「」『』（）()・]/g,"");}
  function matches340(v,groups){
    const n=normalize340(v);
    return groups.every(group=>group.some(k=>n.includes(normalize340(k))));
  }
  function voice340(input,msg){
    const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
    if(!SR){msg.textContent="この端末では音声入力が使えません。文字入力で答えられます。";return}
    try{
      const r=new SR();r.lang="ja-JP";r.interimResults=false;msg.textContent="🎤 聞いています…";
      r.onresult=ev=>{input.value=ev.results[0][0].transcript;msg.textContent="音声を文字にしました。内容を確認して答え合わせを押してください。"};
      r.onerror=()=>msg.textContent="うまく聞き取れませんでした。もう一度試せます。";
      r.start();
    }catch(e){msg.textContent="マイクを開始できませんでした。";}
  }
  function shuffled340(q,i){
    const arr=q.choices.map((t,n)=>({t,ok:n===q.ans}));
    const pat=[[1,0,2],[2,1,0],[0,2,1],[1,2,0],[2,0,1],[0,1,2]][i%6];
    return pat.map(n=>arr[n]);
  }
  function levelName340(level){
    return level==="base"?"🌱 基礎":level==="standard"?"📘 標準":"🌟 応用";
  }
  function home340(g,term){
    const d=sciData333(g,TARGET340);
    sci333={g,t:TARGET340,term,d,p:0,testI:0,testOk:0,mist:[],qs:null,start:0,saved:false};
    head(`理科｜${TARGET340}`,()=>subjectGradeTerms("理科",g));
    A.append(e("div","card",`<div class="tiny">小学6年 理科｜問題集型</div><h2>${TARGET340}</h2>${sciVisual333(g,TARGET340)}
      <p><b>この単元で学ぶこと</b></p><p>${esc340(d.learn)}</p><p>${esc340(d.extra)}</p>
      <p class="tiny">説明を選ぶ問題ではなく、知識を思い出す・資料を読む・実験を考える・理由を書く問題で確認します。</p>`));
    A.append(btn("📘 ① 学ぶ",sciLearn333,"primary"));
    A.append(btn("🌱 基礎10問をはじめる",()=>start340("base"),"primary"));
    A.append(e("div","card soft",`<b>進み方</b><p>基礎10問 → <b>8問以上</b>で標準5問 → <b>4問以上</b>で応用3問へ。</p><p class="tiny">解説は答えたあとに表示します。</p>`));
    return true;
  }
  function start340(level){
    const qs=level==="base"?baseQs340:level==="standard"?standardQs340:challengeQs340;
    state340={level,qs,i:0,first:0,miss:new Set(),start:Date.now()};
    q340();
  }
  function q340(){
    const s=state340,q=s.qs[s.i];
    head(`${levelName340(s.level)} ${s.i+1} / ${s.qs.length}｜${TARGET340}`,
      ()=>home340(6,sci333&&sci333.term));
    A.append(e("div","card",`${q.context||""}<h2>${esc340(q.q)}</h2>`));
    if(q.type==="choice"){
      shuffled340(q,s.i).forEach(it=>A.append(btn(it.t,()=>answer340(it.ok,q),"soft")));
    }else{
      const box=e("div","card soft","<b>自分のことばで答えてみよう</b>");
      const ta=document.createElement("textarea");ta.rows=4;ta.placeholder="ここに答えを書けます";box.appendChild(ta);
      const msg=e("div","tiny","");box.appendChild(btn("🎤 音声で答える",()=>voice340(ta,msg),"soft"));box.appendChild(msg);
      box.appendChild(btn("答え合わせ",()=>answer340(matches340(ta.value,q.keys),q),"primary"));
      A.append(box);
    }
  }
  function answer340(ok,q){
    const s=state340;
    if(!ok){
      s.miss.add(s.i);
      head(`🌱 ここを確認｜${TARGET340}`,q340);
      A.append(e("div","card warn",`<h2>この問題の解説</h2><p><b>問題</b><br>${esc340(q.q)}</p>
        <p><b>答え</b><br>${esc340(q.answer||q.choices[q.ans])}</p><p>${esc340(q.explain)}</p>
        <p class="tiny">答えを見たあと、同じ問題をもう一度考えてみよう。</p>`));
      A.append(btn("同じ問題をもう一度",q340,"primary"));
      return;
    }
    if(!s.miss.has(s.i))s.first++;
    if(window.ponoCorrectSound)window.ponoCorrectSound();
    head(`○ 正解｜${TARGET340}`,q340);
    A.append(e("div","card good",`<h2>できました</h2><p><b>答え</b><br>${esc340(q.answer||q.choices[q.ans])}</p><p>${esc340(q.explain)}</p>`));
    s.i++;
    A.append(btn(s.i<s.qs.length?"次の問題へ":"結果を見る",s.i<s.qs.length?q340:done340,"primary"));
  }
  function done340(){
    const s=state340,total=s.qs.length;
    if(s.level==="base"){
      const pass=s.first>=8;
      head(`基礎結果｜${TARGET340}`,()=>home340(6,sci333&&sci333.term));
      A.append(e("div",`card ${pass?"good":"warn"}`,`<h2>${pass?"✨ 基礎クリア":"🌱 基礎をもう一度"}</h2><p>初回正解 <b>${s.first} / 10</b></p>
        <p>${pass?"知識・実験・資料読み取りの基礎を確認できました。標準問題へ進めます。":"8/10に届かなかったので、解説を見直して基礎から確認します。"}</p>`));
      if(pass)A.append(btn("📘 標準5問へ進む",()=>start340("standard"),"primary"));
      A.append(btn("🔁 基礎10問をもう一度",()=>start340("base"),"soft"));
      A.append(btn("📘 ① 学ぶを見直す",sciLearn333,"soft"));
      return;
    }
    if(s.level==="standard"){
      const pass=s.first>=4;
      head(`標準結果｜${TARGET340}`,()=>home340(6,sci333&&sci333.term));
      A.append(e("div",`card ${pass?"good":"warn"}`,`<h2>${pass?"✨ 標準クリア":"🌱 標準をもう一度"}</h2><p>初回正解 <b>${s.first} / 5</b></p>
        <p>${pass?"資料を読み、実験の条件や理由まで考えられました。応用へ進めます。":"4/5に届かなかったので、間違えた考え方を確認してもう一度取り組みます。"}</p>`));
      if(pass)A.append(btn("🌟 応用3問へ進む",()=>start340("challenge"),"primary"));
      A.append(btn("🔁 標準5問をもう一度",()=>start340("standard"),"soft"));
      return;
    }
    head(`応用完了｜${TARGET340}`,()=>home340(6,sci333&&sci333.term));
    A.append(e("div","card good",`<h2>🌟 応用までできました</h2><p>初回正解 <b>${s.first} / 3</b></p><p>知識を覚えるだけでなく、資料・実験・理由説明まで使って考えました。</p>`));
    try{
      records.push({studentId:profile.id,date:new Date().toISOString(),subject:"理科",grade:6,unit:TARGET340,
        content:"問題集型 基礎10→標準5→応用3",correct:s.first,total:3,rate:Math.round(s.first/3*100),
        seconds:Math.round((Date.now()-s.start)/1000),hints:s.miss.size,status:"応用まで取組",
        process:"基礎8/10→標準4/5→応用",questionStructure:"短答・資料・実験・理由説明"});
      save();
    }catch(e){}
    A.append(btn("🌱 基礎からもう一度",()=>start340("base"),"soft"));
    A.append(btn("理科6年へ戻る",()=>subjectGradeTerms("理科",6),"primary"));
  }

  const oldHome340=window.sciHome333||sciHome333;
  window.sciHome333=sciHome333=function(g,t,term){
    if(Number(g)===6&&String(t)===TARGET340)return home340(6,term);
    return oldHome340(g,t,term);
  };
  const oldPractice340=window.sciPractice333||sciPractice333;
  window.sciPractice333=sciPractice333=function(){
    try{if(sci333&&Number(sci333.g)===6&&sci333.t===TARGET340)return start340("base");}catch(e){}
    return oldPractice340();
  };
  const oldTest340=window.sciTestStart333||sciTestStart333;
  window.sciTestStart333=sciTestStart333=function(){
    try{if(sci333&&Number(sci333.g)===6&&sci333.t===TARGET340)return start340("base");}catch(e){}
    return oldTest340();
  };
})();