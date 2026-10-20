/* v34.1 単元メニュー＋一般公立小学校レベルの単元テスト
   6年理科「物の燃え方と空気」完成見本
   練習問題（v34.0）か、単元テストだけかを選べる。
   テストは20問・100点、解説は採点後に表示。 */
(function(){
  const UNIT341="物の燃え方と空気";

  const TEST341=[
    {cat:"知識",type:"input",q:"物が燃えるときに使われる気体の名前を書きましょう。",
      answer:"酸素",groups:[["酸素"]],
      explain:"物が燃えるときには酸素が使われます。"},
    {cat:"知識",type:"choice",q:"空気中にふくまれる酸素は、およそ何％ですか。",
      choices:["約21％","約50％","約78％"],ans:0,
      explain:"空気中の酸素は約21％です。"},
    {cat:"知識",type:"choice",q:"空気中に最も多くふくまれる気体はどれですか。",
      choices:["酸素","窒素","二酸化炭素"],ans:1,
      explain:"空気の約78％は窒素で、最も多い気体です。"},
    {cat:"知識",type:"choice",q:"二酸化炭素は、空気中にどのくらいふくまれていますか。",
      choices:["酸素より多い","ごくわずか","約半分"],ans:1,
      explain:"二酸化炭素は空気中にごくわずかしかふくまれていません。"},
    {cat:"知識",type:"choice",q:"物が燃えた後の空気では、酸素はどうなりますか。",
      choices:["増える","減る","変わらない"],ans:1,
      explain:"燃焼で酸素が使われるため、燃えた後は酸素が減ります。"},
    {cat:"知識",type:"choice",q:"物が燃えた後の空気では、二酸化炭素はどうなりますか。",
      choices:["増える","減る","なくなる"],ans:0,
      explain:"燃焼によって二酸化炭素が増えます。"},
    {cat:"知識",type:"choice",q:"二酸化炭素があるか調べるときに使えるものはどれですか。",
      choices:["石灰水","食塩水","砂糖水"],ans:0,
      explain:"二酸化炭素をふくむ気体を石灰水に通すと、白くにごります。"},
    {cat:"知識",type:"choice",q:"酸素を多くふくむびんに火のついた線香を入れると、どうなりますか。",
      choices:["燃え方が強くなる","すぐ必ず消える","変化しない"],ans:0,
      explain:"酸素には物を燃やすはたらきがあるため、燃え方が強くなります。"},
    {cat:"実験・観察",type:"choice",q:"火のついたろうそくにびんをかぶせると、しばらくして火が消えました。主な理由はどれですか。",
      choices:["びんの中の酸素が少なくなったから","ろうそくが重くなったから","二酸化炭素が全部なくなったから"],ans:0,
      explain:"新しい空気が入らないと、燃焼で酸素が使われて少なくなり、火が消えます。"},
    {cat:"実験・観察",type:"choice",q:"ろうそくを燃やし続けるために、最も大切なことはどれですか。",
      choices:["新しい空気が入るようにする","びんを完全に密閉する","酸素をなくす"],ans:0,
      explain:"燃え続けるには、新しい空気が入り酸素が供給される必要があります。"},
    {cat:"実験・観察",type:"choice",
      context:"<table class='test341table'><tr><th></th><th>燃える前</th><th>燃えた後</th></tr><tr><td>酸素</td><td>21%</td><td>17%</td></tr><tr><td>二酸化炭素</td><td>0.04%</td><td>4%</td></tr></table>",
      q:"表から分かることとして正しいものはどれですか。",
      choices:["酸素が減り、二酸化炭素が増えた","酸素も二酸化炭素も減った","どちらも変化しなかった"],ans:0,
      explain:"酸素は21％から17％へ減り、二酸化炭素は0.04％から4％へ増えています。"},
    {cat:"実験・観察",type:"choice",
      context:"<table class='test341table'><tr><th>びん</th><th>下のすき間</th><th>上のすき間</th><th>結果</th></tr><tr><td>A</td><td>なし</td><td>なし</td><td>すぐ消えた</td></tr><tr><td>B</td><td>あり</td><td>あり</td><td>長く燃えた</td></tr></table>",
      q:"Bのろうそくが長く燃えた理由として最もよいものはどれですか。",
      choices:["空気が入れかわったから","びんが軽くなったから","ろうそくの色が変わったから"],ans:0,
      explain:"下から新しい空気が入り、上から空気が出ることで空気が入れかわり、酸素が供給されます。"},
    {cat:"実験・観察",type:"choice",q:"燃える前と後の空気を比べる実験で、そろえた方がよい条件はどれですか。",
      choices:["ろうそくの大きさ","燃やした後の結果","酸素の変化そのもの"],ans:0,
      explain:"公平に比べるには、調べたい条件以外をそろえます。ろうそくの大きさなどをそろえます。"},
    {cat:"実験・観察",type:"choice",q:"「酸素の量が燃え方に関係するか」を調べる実験で、変える条件はどれですか。",
      choices:["酸素の割合","ろうそくの種類と大きさ","観察する人"],ans:0,
      explain:"調べたい条件は酸素の量・割合です。それ以外の条件はそろえます。"},
    {cat:"実験・観察",type:"choice",
      context:"<table class='test341table'><tr><th>気体</th><th>酸素</th><th>二酸化炭素</th></tr><tr><td>A</td><td>21%</td><td>0.04%</td></tr><tr><td>B</td><td>16%</td><td>5%</td></tr></table>",
      q:"燃えた後の空気と考えられるのはどちらですか。",
      choices:["A","B","どちらとも同じ"],ans:1,
      explain:"燃えた後は酸素が減り、二酸化炭素が増えるのでBです。"},
    {cat:"思考・記述",type:"input",q:"びんの中でろうそくの火が消えた理由を、「酸素」という言葉を使って書きましょう。",
      answer:"びんの中の酸素が使われて少なくなったから。",
      groups:[["酸素"],["減","少","なく"]],
      explain:"燃焼で酸素が使われ、燃え続けるために必要な酸素が少なくなるためです。"},
    {cat:"思考・記述",type:"input",q:"びんの下と上にすき間を作ると、ろうそくが燃え続けやすくなる理由を書きましょう。",
      answer:"新しい空気が入り、酸素が供給されるから。",
      groups:[["空気","酸素"],["入","供給","入れかわ"]],
      explain:"空気の通り道ができることで、新しい空気が入り、燃焼に必要な酸素が供給されます。"},
    {cat:"思考・記述",type:"choice",
      context:"<table class='test341table'><tr><th>条件</th><th>燃えた時間</th></tr><tr><td>ふたを閉じる</td><td>24秒</td></tr><tr><td>下だけ開ける</td><td>38秒</td></tr><tr><td>下と上を開ける</td><td>85秒</td></tr></table>",
      q:"この結果から最もよく言えることはどれですか。",
      choices:["空気が通りやすいほど燃え続けやすい","ふたが重いほど長く燃える","燃える時間と空気は関係ない"],ans:0,
      explain:"下と上を開けたときに最も長く燃えているため、空気が入れかわりやすいほど燃え続けやすいと考えられます。"},
    {cat:"思考・記述",type:"choice",q:"実験でAだけ大きいろうそく、Bだけ小さいろうそくを使いました。この実験の問題点はどれですか。",
      choices:["ろうそくの大きさがそろっていない","びんを使っている","火を観察している"],ans:0,
      explain:"調べたい条件以外が違うと、公平な比較ができません。"},
    {cat:"思考・記述",type:"input",q:"火を使う場所で換気が大切な理由を、この単元で学んだことと結びつけて書きましょう。",
      answer:"新しい空気が入り、酸素をふくむ空気が入れかわるから。",
      groups:[["空気","酸素"],["入","入れかわ","供給","換気"]],
      explain:"燃焼では酸素が使われるため、換気によって新しい空気を入れ、空気を入れかえることが大切です。"}
  ];

  let st341=null;
  function esc341(s){return String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));}
  function norm341(s){return String(s||"").replace(/[。、，,\s「」『』（）()・]/g,"");}
  function inputOK341(v,groups){
    const n=norm341(v);
    return groups.every(group=>group.some(k=>n.includes(norm341(k))));
  }
  function choiceOrder341(q,i){
    const arr=q.choices.map((t,n)=>({t,ok:n===q.ans,idx:n}));
    const pats=[[1,0,2],[2,1,0],[0,2,1],[1,2,0],[2,0,1],[0,1,2]];
    return pats[i%pats.length].map(n=>arr[n]);
  }
  function voice341(ta,msg){
    const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
    if(!SR){msg.textContent="この端末では音声入力が使えません。文字入力で答えられます。";return}
    try{
      const r=new SR();r.lang="ja-JP";r.interimResults=false;msg.textContent="🎤 聞いています…";
      r.onresult=ev=>{ta.value=ev.results[0][0].transcript;msg.textContent="音声を文字にしました。内容を確認してください。"};
      r.onerror=()=>msg.textContent="うまく聞き取れませんでした。もう一度試せます。";
      r.start();
    }catch(e){msg.textContent="マイクを開始できませんでした。";}
  }

  const oldHome341=window.sciHome333||sciHome333;

  function menu341(g,term){
    const d=sciData333(g,UNIT341);
    sci333={g,t:UNIT341,term,d,p:0,testI:0,testOk:0,mist:[],qs:null,start:0,saved:false};
    head(`理科｜${UNIT341}`,()=>subjectGradeTerms("理科",g));
    A.append(e("div","card",`<div class="tiny">小学6年 理科</div><h2>${UNIT341}</h2>
      <p><b>どちらから始める？</b></p>
      <p>学習の目的に合わせて、練習問題からでも、単元テストだけでも始められます。</p>`));

    const practice=e("div","card soft",`<h2>📘 単元の練習問題</h2>
      <p>基礎10問 → 標準5問 → 応用3問</p>
      <p class="tiny">答えたあとに、その問題に合った解説を確認できます。</p>`);
    practice.append(btn("練習問題をやる",()=>oldHome341(6,UNIT341,term),"primary"));
    A.append(practice);

    const test=e("div","card",`<h2>📝 単元テスト</h2>
      <p><b>20問・100点</b>｜一般的な公立小学校の単元確認を意識した標準レベル</p>
      <p>知識・実験・資料読み取り・理由説明を組み合わせています。</p>
      <p class="tiny">テスト中は正解や解説を表示しません。20問が終わってから採点し、答えと解説を確認します。</p>`);
    test.append(btn("単元テストだけやる",startTest341,"primary"));
    A.append(test);

    A.append(btn("📖 先に「学ぶ」を見る",sciLearn333,"soft"));
    return true;
  }

  function startTest341(){
    st341={i:0,answers:[],start:Date.now()};
    testQ341();
  }

  function testQ341(){
    const q=TEST341[st341.i];
    head(`📝 単元テスト ${st341.i+1} / ${TEST341.length}｜${UNIT341}`,()=>menu341(6,sci333&&sci333.term));
    A.append(e("div","test341top",`<span class="pill">${esc341(q.cat)}</span><span class="pill">5点</span>`));
    A.append(e("div","card test341q",`${q.context||""}<h2>${esc341(q.q)}</h2>`));

    if(q.type==="choice"){
      choiceOrder341(q,st341.i).forEach(it=>{
        A.append(btn(it.t,()=>record341(it.ok,it.t,q),"soft"));
      });
    }else{
      const box=e("div","card soft","<b>答えを書きましょう</b>");
      const ta=document.createElement("textarea");ta.rows=4;ta.placeholder="ここに答えを書けます";box.appendChild(ta);
      const msg=e("div","tiny","");box.appendChild(btn("🎤 音声で答える",()=>voice341(ta,msg),"soft"));box.appendChild(msg);
      box.appendChild(btn("この答えで次へ",()=>{
        const v=ta.value.trim();
        if(!v){msg.textContent="答えを入力してから次へ進んでください。";return}
        record341(inputOK341(v,q.groups),v,q);
      },"primary"));
      A.append(box);
    }
    A.append(e("p","tiny","※テスト中は正解・ヒント・解説を表示しません。"));
  }

  function record341(ok,user,q){
    st341.answers.push({ok,user,q});
    st341.i++;
    if(st341.i<TEST341.length)testQ341();
    else result341();
  }

  function result341(){
    const correct=st341.answers.filter(a=>a.ok).length;
    const score=correct*5;
    const secs=Math.round((Date.now()-st341.start)/1000);
    const cats=["知識","実験・観察","思考・記述"];
    head(`採点結果｜${UNIT341}`,()=>menu341(6,sci333&&sci333.term));
    const msg=score>=90?"よく理解できています。":score>=70?"基本的な内容は確認できています。":score>=50?"もう一度、間違えたところを練習すると理解が深まります。":"「学ぶ」と練習問題から確認するのがおすすめです。";
    A.append(e("div",`card ${score>=70?"good":"warn"} test341score`,`
      <h2>${score}点 / 100点</h2><p>${correct} / 20問 正解</p><p>${msg}</p>
      <p class="tiny">※記述問題は、必要なキーワードが入っているかを使った自動採点の目安です。</p>`));

    cats.forEach(cat=>{
      const arr=st341.answers.filter(a=>a.q.cat===cat);
      const ok=arr.filter(a=>a.ok).length;
      A.append(e("div","card soft",`<b>${cat}</b><p>${ok} / ${arr.length}問</p>`));
    });

    A.append(btn("📖 答えと解説を見る",review341,"primary"));
    A.append(btn("🔁 単元テストをもう一度",startTest341,"soft"));
    A.append(btn("📘 練習問題をやる",()=>oldHome341(6,UNIT341,sci333&&sci333.term),"soft"));

    try{
      records.push({studentId:profile.id,date:new Date().toISOString(),subject:"理科",grade:6,unit:UNIT341,
        content:"単元テスト20問・100点",correct,total:20,rate:score,score,
        seconds:secs,hints:0,status:`単元テスト ${score}点`,next:score>=80?"定着確認":"練習問題",
        questionStructure:"知識・実験観察・資料読み取り・思考記述"});
      save();
    }catch(e){}
  }

  function review341(){
    head(`答えと解説｜${UNIT341}`,result341);
    st341.answers.forEach((a,i)=>{
      const q=a.q;
      const correct=q.type==="choice"?q.choices[q.ans]:q.answer;
      A.append(e("div",`card ${a.ok?"good":"warn"}`,`
        <div class="tiny">問${i+1}｜${esc341(q.cat)}｜${a.ok?"○":"×"}</div>
        <h3>${esc341(q.q)}</h3>
        <p><b>あなたの答え：</b>${esc341(a.user)}</p>
        <p><b>答え：</b>${esc341(correct)}</p>
        <p>${esc341(q.explain)}</p>`));
    });
    A.append(btn("結果へ戻る",result341,"primary"));
  }

  window.sciHome333=sciHome333=function(g,t,term){
    if(Number(g)===6&&String(t)===UNIT341)return menu341(6,term);
    return oldHome341(g,t,term);
  };
})();