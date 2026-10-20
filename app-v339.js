/* v33.9 基礎理解→クリアで応用 ＋ 問題ごとの解説
   対象：理科・社会・国語。算数のv33.8個別解説はそのまま維持。
   基礎8問を先に行い、初回正答7/8以上で応用へ進む。 */
(function(){
  const BASE_N339=8, BASE_PASS339=7;

  function esc339(s){
    return String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  }
  function pickOther339(arr,current,field,count=2){
    const xs=[];
    for(const x of arr){
      if(x===current)continue;
      const v=field(x);
      if(v && !xs.includes(v))xs.push(v);
      if(xs.length>=count)break;
    }
    return xs;
  }
  function shuffled339(q,i){
    const choices=q.choices||q[1], correctIndex=q.correct??q[2]??0;
    const correct=choices[correctIndex];
    const wrong=choices.filter((_,n)=>n!==correctIndex);
    const patterns=[[1,0,2],[2,1,0],[0,2,1],[1,2,0],[2,0,1],[0,1,2]];
    const p=patterns[i%patterns.length], out=[]; let wi=0;
    for(let pos=0;pos<3;pos++){
      if(pos===p.indexOf(0))out.push({text:correct,ok:true});
      else out.push({text:wrong[wi++]||wrong[0],ok:false});
    }
    return out;
  }
  function stageCard339(kind,i,total){
    const label=kind==="base"?"🌱 基礎理解":"🌟 応用";
    return `<div class="question-kind">${label}</div><div class="tiny">${i+1} / ${total}</div>`;
  }
  function explainCard339(title,q,ok){
    const text=q.explain||q[3]||"問題の内容と学んだポイントをつなげて確認します。";
    return e("div",`card ${ok?"good":"warn"} explain339`,
      `<h2>${ok?"○ ここがポイント":"🌱 この問題の解説"}</h2>
       <p><b>${esc339(q.question||q[0])}</b></p>
       <p>${esc339(text)}</p>
       ${q.answerText?`<p class="answer-box"><b>答え：${esc339(q.answerText)}</b></p>`:""}`);
  }

  /* ---------- 理科 ---------- */
  function sciAll339(s){
    const all=[];
    try{
      const grade=String(s.g);
      const map=(typeof SCI456_289!=="undefined"&&SCI456_289[grade])||{};
      Object.entries(map).forEach(([t,x])=>all.push({t,learn:x[0],predict:x[1],observe:x[2],result:x[3],think:x[4]}));
      if(Number(s.g)===3 && typeof SCI3_284!=="undefined"){
        Object.entries(SCI3_284).forEach(([t,d])=>all.push({t,learn:d.learn,predict:d.predict,observe:d.observe,result:d.result,think:d.think}));
      }
    }catch(e){}
    return all;
  }
  function sciNorm339(q,kind){
    const choices=q[1].slice(), ci=q[2], ans=choices[ci];
    return {question:q[0],choices,correct:ci,answerText:ans,explain:q[3],kind};
  }
  function sciBaseQs339(){
    const s=sci333,d=s.d, all=sciAll339(s), others=all.filter(x=>x.t!==s.t);
    const qs=(typeof sciPracticeQs333==="function"?sciPracticeQs333():[]).slice(0,3).map(q=>sciNorm339(q,"知識"));
    const dl=pickOther339(others,null,x=>x.learn,2);
    const dobs=pickOther339(others,null,x=>x.observe,2);
    const dres=pickOther339(others,null,x=>x.result,2);
    const dthink=pickOther339(others,null,x=>x.think,2);

    qs.push({question:"この単元の説明として正しいものは？",choices:[d.extra||d.learn,...dl],correct:0,
      answerText:d.extra||d.learn,explain:`「${s.t}」では、${d.extra||d.learn}`,kind:"知識"});
    qs.push({question:"この単元の観察・実験で行うこととして正しいものは？",choices:[d.observe,...dobs],correct:0,
      answerText:d.observe,explain:`調べたいことを確かめるため、この単元では「${d.observe}」とします。`,kind:"観察・実験"});
    qs.push({question:"観察・実験の結果として、この単元に合うものは？",choices:[d.result,...dres],correct:0,
      answerText:d.result,explain:`この単元で得られる結果は「${d.result}」です。結果を事実として確かめます。`,kind:"結果"});
    qs.push({question:"結果から考えられることとして最も合うものは？",choices:[d.think,...dthink],correct:0,
      answerText:d.think,explain:`結果をもとに考えると「${d.think}」と説明できます。`,kind:"考察"});

    if(d.terms && d.terms.length){
      const x=d.terms[0];
      qs.push({question:`「${x[0]}」の説明として正しいものは？`,
        choices:[x[1],d.terms[1]?.[1]||dl[0]||"別の内容",dthink[0]||"別の内容"],correct:0,
        answerText:x[1],explain:`${x[0]}は「${x[1]}」という意味です。`,kind:"ことば"});
    }else{
      qs.push({question:"この単元で最初に確かめたい問いとして合うものは？",
        choices:[d.predict,...pickOther339(others,null,x=>x.predict,2)],correct:0,
        answerText:d.predict,explain:`この単元では「${d.predict}」という問いから考え始めます。`,kind:"問い"});
    }
    return qs.slice(0,BASE_N339);
  }
  function sciApplyQs339(){
    const s=sci333,d=s.d, others=sciAll339(s).filter(x=>x.t!==s.t);
    return [
      {question:`観察・実験で「${d.result}」という結果になりました。最もよく説明できる考えは？`,
       choices:[d.think,...pickOther339(others,null,x=>x.think,2)],correct:0,answerText:d.think,
       explain:`結果「${d.result}」から、${d.think}`,kind:"結果→考察"},
      {question:"同じ考えをもう一度確かめるなら、最も適切な方法は？",
       choices:[d.observe,...pickOther339(others,null,x=>x.observe,2)],correct:0,answerText:d.observe,
       explain:`同じ問いを確かめるには、条件や方法をそろえて「${d.observe}」とすると比較しやすくなります。`,kind:"実験計画"},
      {question:`「${s.t}」の学びをまとめた説明として最も適切なのは？`,
       choices:[`${d.extra||d.learn} ${d.think}`,...pickOther339(others,null,x=>`${x.learn} ${x.think}`,2)],correct:0,
       answerText:`${d.extra||d.learn} ${d.think}`,explain:`知識だけでなく、結果と考察をつなげて「${d.think}」まで説明できると応用につながります。`,kind:"まとめ・活用"}
    ];
  }
  let sciStage339=null;
  function sciStartBase339(){
    sciStage339={kind:"base",qs:sciBaseQs339(),i:0,first:0,miss:new Set(),start:Date.now()};
    sciQ339();
  }
  function sciStartApply339(){
    sciStage339={kind:"apply",qs:sciApplyQs339(),i:0,first:0,miss:new Set(),start:Date.now()};
    sciQ339();
  }
  function sciQ339(){
    const st=sciStage339,q=st.qs[st.i],s=sci333;
    head(`${st.kind==="base"?"③ 基礎理解":"🌟 応用"}｜${s.t}`,st.kind==="base"?sciTogether333:sciStartBase339);
    A.append(e("div","",stageCard339(st.kind,st.i,st.qs.length)));
    A.append(e("div","card",`<h2>${esc339(q.question)}</h2><p class="tiny">${esc339(q.kind||"")}</p>`));
    shuffled339(q,st.i).forEach(it=>A.append(btn(it.text,()=>sciAns339(it.ok,q),"soft")));
    A.append(btn("📘 ① 学ぶを見直す",sciLearn333,"ghost"));
  }
  function sciAns339(ok,q){
    const st=sciStage339,s=sci333;
    if(!ok){
      st.miss.add(st.i);
      head(`解説｜${s.t}`,()=>sciQ339());
      A.append(explainCard339("",q,false));
      A.append(btn("同じ問題をもう一度",sciQ339,"primary"));
      return;
    }
    if(!st.miss.has(st.i))st.first++;
    if(window.ponoCorrectSound)window.ponoCorrectSound();
    head(`○ 確認｜${s.t}`,()=>sciQ339());
    A.append(explainCard339("",q,true));
    st.i++;
    if(st.i<st.qs.length)A.append(btn("次の問題へ",sciQ339,"primary"));
    else A.append(btn("結果を見る",sciStageDone339,"primary"));
  }
  function sciStageDone339(){
    const st=sciStage339,s=sci333;
    if(st.kind==="base"){
      const pass=st.first>=BASE_PASS339;
      head(`基礎確認｜${s.t}`,()=>sciHome333(s.g,s.t,s.term));
      A.append(e("div",`card ${pass?"good":"warn"}`,`<h2>${pass?"✨ 基礎クリア":"🌱 基礎をもう一度確認"}</h2>
        <p>初回でできた問題：<b>${st.first} / ${BASE_N339}</b></p>
        <p>${pass?"基本となる内容を確認できました。次は応用問題へ進めます。":"応用へ急がず、間違えたところを学び直してからもう一度確認します。"}</p>
        <p class="tiny">基礎クリアの目安：7 / 8</p>`));
      if(pass)A.append(btn("🌟 応用問題へ進む",sciStartApply339,"primary"));
      A.append(btn("🔁 基礎8問をもう一度",sciStartBase339,"soft"));
      A.append(btn("📘 ① 学ぶを見直す",sciLearn333,"soft"));
    }else{
      const total=st.qs.length;
      head(`応用できました｜${s.t}`,()=>sciHome333(s.g,s.t,s.term));
      A.append(e("div","card good",`<h2>🌟 応用まで取り組めました</h2><p>初回でできた問題：${st.first} / ${total}</p><p>${esc339(s.d.think)}</p>`));
      records.push({studentId:profile.id,date:new Date().toISOString(),subject:"理科",grade:s.g,unit:s.t,
        content:"基礎8問→応用3問",rate:Math.round(st.first/total*100),correct:st.first,total,
        seconds:Math.round((Date.now()-st.start)/1000),hints:st.miss.size,status:"応用まで取組",next:"定着確認",
        process:"基礎理解クリア後に応用",questionStructure:"基礎8問・応用3問・問題別解説"});save();
      A.append(btn("🔁 応用をもう一度",sciStartApply339,"soft"));
      A.append(btn("単元一覧へ",()=>subjectGradeTerms("理科",s.g),"primary"));
    }
  }
  if(typeof sciHome333==="function"){
    sciHome333=function(g,t,term){
      const d=sciData333(g,t);if(!d)return false;
      sci333={g,t,term,d,p:0,testI:0,testOk:0,mist:[],qs:null,start:0,saved:false};
      head(`理科｜${t}`,()=>subjectGradeTerms("理科",g));
      A.append(e("div","card",`<div class="tiny">理科｜小学${g}年</div><h2>${esc339(t)}</h2>${sciVisual333(g,t)}
        <p><b>この単元で学ぶこと</b></p><p>${esc339(d.learn)}</p><p>${esc339(d.extra)}</p>
        <p class="tiny">基礎8問で理解を確認し、7問以上を初回でできたら応用へ進みます。</p>`));
      A.append(btn("📘 ① 学ぶ",sciLearn333,"primary"));
      A.append(btn("🤝 ② 一緒に確認",sciTogether333,"soft"));
      A.append(btn("🌱 ③ 基礎理解（8問）",sciStartBase339,"primary"));
      return true;
    };
    sciPractice333=sciStartBase339;
    sciTestStart333=sciStartBase339;
  }

  /* ---------- 社会 ---------- */
  function socAll339(s){
    const all=[];
    try{
      const map=(typeof SOC36_290!=="undefined"&&SOC36_290[String(s.g)])||{};
      Object.entries(map).forEach(([t,x])=>all.push({t,learn:x[0],question:x[1],research:x[2],found:x[3],think:x[4]}));
    }catch(e){}
    return all;
  }
  function socBaseQs339(){
    const s=soc290,d=s.d,others=socAll339(s).filter(x=>x.t!==s.t);
    const other=field=>pickOther339(others,null,x=>x[field],2);
    return [
      {question:"この単元で学ぶ内容として最も合うものは？",choices:[d.learn,...other("learn")],correct:0,answerText:d.learn,
       explain:`「${s.t}」では、${d.learn}`,kind:"基礎知識"},
      {question:"この単元で中心になる問いは？",choices:[d.question,...other("question")],correct:0,answerText:d.question,
       explain:`この単元は「${d.question}」という問いを手がかりに調べます。`,kind:"問い"},
      {question:"その問いを調べる資料・方法として最も合うものは？",choices:[d.research,...other("research")],correct:0,answerText:d.research,
       explain:`この問いには「${d.research}」が適しています。資料は目的に合わせて選びます。`,kind:"資料"},
      {question:"資料から分かることとして、この単元に合うものは？",choices:[d.found,...other("found")],correct:0,answerText:d.found,
       explain:`資料から読み取る事実は「${d.found}」です。まず事実を確かめます。`,kind:"資料読み取り"},
      {question:"資料から分かったことをもとに考えると、最も合うのは？",choices:[d.think,...other("think")],correct:0,answerText:d.think,
       explain:`資料の事実をつなげると「${d.think}」と考えられます。`,kind:"考察"},
      {question:"社会の学習で、この単元を調べるとき大切なことは？",
       choices:[`「${d.question}」を、資料を使って確かめる`,"最初に思った答えだけで決める","資料を見ずに名前だけ覚える"],correct:0,
       answerText:`「${d.question}」を、資料を使って確かめる`,
       explain:`社会では問いをもち、${d.research} などの資料で確かめることが大切です。`,kind:"学び方"},
      {question:"「分かった事実」と「そこから考えたこと」の組み合わせとして正しいのは？",
       choices:[`${d.found} → ${d.think}`,`${other("found")[0]||"別単元の事実"} → ${d.think}`,`${d.found} → ${other("think")[0]||"別単元の考え"}`],correct:0,
       answerText:`${d.found} → ${d.think}`,explain:`「${d.found}」という事実から「${d.think}」とつなげて考えます。`,kind:"事実→考察"},
      {question:`「${s.t}」のまとめとして最も適切なのは？`,
       choices:[`${d.learn} ${d.think}`,...other("learn").map((x,i)=>`${x} ${other("think")[i]||""}`)],correct:0,
       answerText:`${d.learn} ${d.think}`,explain:`単元の内容と考察を合わせると「${d.learn} ${d.think}」とまとめられます。`,kind:"まとめ"}
    ];
  }
  function socApplyQs339(){
    const s=soc290,d=s.d,others=socAll339(s).filter(x=>x.t!==s.t),other=field=>pickOther339(others,null,x=>x[field],2);
    return [
      {question:`資料から「${d.found}」と分かりました。次に考える内容として最も適切なのは？`,
       choices:[d.think,...other("think")],correct:0,answerText:d.think,
       explain:`社会では資料の事実をそのまま終わらせず、理由やつながりを考えます。この資料からは「${d.think}」と考えられます。`,kind:"資料活用"},
      {question:"別の地域・時代・事例でも同じことが言えるか確かめたい。まず何をする？",
       choices:[d.research,"最初の資料だけで全部同じだと決める","資料を見ずに予想だけで結論にする"],correct:0,answerText:d.research,
       explain:`新しい事例でも、${d.research} のように根拠になる資料を調べ、比べて考えます。`,kind:"比較"},
      {question:`「${s.t}」を自分たちのくらしと結びつけて考えるとき、最も大切なのは？`,
       choices:[`資料の事実と「${d.think}」をつなげて考える`,"用語だけ暗記して終わる","一つの資料だけを絶対の答えにする"],correct:0,
       answerText:`資料の事実と「${d.think}」をつなげて考える`,
       explain:`応用では、資料から分かったことを自分たちの生活や別の事例へつなげます。${d.think}`,kind:"活用"}
    ];
  }
  let socStage339=null;
  function socStartBase339(){socStage339={kind:"base",qs:socBaseQs339(),i:0,first:0,miss:new Set(),start:Date.now()};socQ339();}
  function socStartApply339(){socStage339={kind:"apply",qs:socApplyQs339(),i:0,first:0,miss:new Set(),start:Date.now()};socQ339();}
  function socQ339(){
    const st=socStage339,q=st.qs[st.i],s=soc290;
    head(`${st.kind==="base"?"③ 基礎理解":"🌟 応用"}｜${s.t}`,st.kind==="base"?socTogether290:socStartBase339);
    A.append(e("div","",stageCard339(st.kind,st.i,st.qs.length)));
    A.append(e("div","card",`<h2>${esc339(q.question)}</h2><p class="tiny">${esc339(q.kind||"")}</p>`));
    shuffled339(q,st.i).forEach(it=>A.append(btn(it.text,()=>socAns339(it.ok,q),"soft")));
    A.append(btn("📘 ① 学ぶを見直す",socLearn290,"ghost"));
  }
  function socAns339(ok,q){
    const st=socStage339,s=soc290;
    if(!ok){
      st.miss.add(st.i);head(`解説｜${s.t}`,()=>socQ339());A.append(explainCard339("",q,false));A.append(btn("同じ問題をもう一度",socQ339,"primary"));return;
    }
    if(!st.miss.has(st.i))st.first++;
    if(window.ponoCorrectSound)window.ponoCorrectSound();
    head(`○ 確認｜${s.t}`,()=>socQ339());A.append(explainCard339("",q,true));st.i++;
    A.append(btn(st.i<st.qs.length?"次の問題へ":"結果を見る",st.i<st.qs.length?socQ339:socStageDone339,"primary"));
  }
  function socStageDone339(){
    const st=socStage339,s=soc290;
    if(st.kind==="base"){
      const pass=st.first>=BASE_PASS339;
      head(`基礎確認｜${s.t}`,()=>socHome290(s.g,s.t,s.term));
      A.append(e("div",`card ${pass?"good":"warn"}`,`<h2>${pass?"✨ 基礎クリア":"🌱 基礎をもう一度確認"}</h2>
        <p>初回でできた問題：<b>${st.first} / ${BASE_N339}</b></p>
        <p>${pass?"資料の読み方と単元の基本を確認できました。応用へ進めます。":"間違えた問題の解説を見直して、基礎からもう一度確認します。"}</p>
        <p class="tiny">基礎クリアの目安：7 / 8</p>`));
      if(pass)A.append(btn("🌟 応用問題へ進む",socStartApply339,"primary"));
      A.append(btn("🔁 基礎8問をもう一度",socStartBase339,"soft"));
      A.append(btn("📘 ① 学ぶを見直す",socLearn290,"soft"));
    }else{
      const total=st.qs.length;
      head(`応用できました｜${s.t}`,()=>socHome290(s.g,s.t,s.term));
      A.append(e("div","card good",`<h2>🌟 応用まで取り組めました</h2><p>初回でできた問題：${st.first} / ${total}</p><p>${esc339(s.d.think)}</p>`));
      records.push({studentId:profile.id,date:new Date().toISOString(),subject:"社会",grade:s.g,unit:s.t,
        content:"基礎8問→応用3問",rate:Math.round(st.first/total*100),correct:st.first,total,
        seconds:Math.round((Date.now()-st.start)/1000),hints:st.miss.size,status:"応用まで取組",next:"定着確認",
        process:"基礎理解クリア後に応用",questionStructure:"基礎8問・応用3問・問題別解説"});save();
      A.append(btn("🔁 応用をもう一度",socStartApply339,"soft"));
      A.append(btn("単元一覧へ",()=>subjectGradeTerms("社会",s.g),"primary"));
    }
  }
  if(typeof socHome290==="function"){
    socHome290=function(g,t,term){
      const d=socData290(g,t);if(!d)return false;
      soc290={g,t,term,d,i:0,ok:0,h:0,start:Date.now()};
      head(`社会｜${t}`,()=>subjectGradeTerms("社会",g));
      A.append(e("div","card",`<div class="tiny">社会｜小学${g}年</div><h2>${esc339(t)}</h2>${socVisual290(g,t)}
        <h3>この単元で学ぶこと</h3><p>${esc339(d.learn)}</p>
        <p class="tiny">基礎8問で資料の読み方と基本を確認し、7問以上を初回でできたら応用へ進みます。</p>`));
      A.append(btn("📘 ① 学ぶ",socLearn290,"primary"));
      A.append(btn("🤝 ② 一緒に確認",socTogether290,"soft"));
      A.append(btn("🌱 ③ 基礎理解（8問）",socStartBase339,"primary"));
      return true;
    };
    socSelf290=socStartBase339;
  }

  /* ---------- 国語・読解28単元（v31.3） ---------- */
  let jRead339=null;
  function startRead339(cfg){
    jRead339={baseFirst:0,miss:new Set(),applyFirst:0,applyMiss:new Set(),start:Date.now()};
    jr313={cfg,i:0,hints:0,start:Date.now()};
    question313(0);
  }
  function readStage339(i){return i<BASE_N339?"base":"apply";}
  function readAdvance339(i){
    if(i===BASE_N339-1){
      const pass=jRead339.baseFirst>=BASE_PASS339,cfg=jr313.cfg;
      head(`基礎確認｜${cfg.title}`,()=>home313(cfg));
      A.append(e("div",`card ${pass?"good":"warn"}`,`<h2>${pass?"✨ 基礎クリア":"🌱 基礎をもう一度確認"}</h2>
        <p>初回でできた問題：<b>${jRead339.baseFirst} / 8</b></p>
        <p>${pass?"文章の基本的な読み取りを確認できました。残り2問は応用です。":"本文のどこを見るか、問題ごとの解説を確認してもう一度取り組みます。"}</p>
        <p class="tiny">基礎クリアの目安：7 / 8</p>`));
      if(pass)A.append(btn("🌟 応用2問へ進む",()=>question313(8),"primary"));
      A.append(btn("🔁 基礎8問をもう一度",()=>startRead339(cfg),"soft"));
      return;
    }
    if(i<jr313.cfg.qs.length-1)question313(i+1);else doneRead339();
  }
  function readExplain339(q,choiceText,isText=false){
    return isText
      ? `${q.hint} 本文にある言葉を手がかりに、問いに必要な内容を入れて答えます。`
      : `答えは「${choiceText}」です。${q.hint}`;
  }
  if(typeof home313==="function"){
    home313=function(cfg){
      stopRead313();jr313={cfg,i:0,hints:0,start:Date.now()};
      jRead339={baseFirst:0,miss:new Set(),applyFirst:0,applyMiss:new Set(),start:Date.now()};
      head(`国語｜${cfg.title}`,()=>subjectGradeTerms("国語",cfg.grade));
      A.append(e("div","card",`<div class="tiny">小学${cfg.grade}年 国語</div><h2>${esc339(cfg.title)}</h2>
        <p><b>この単元で学ぶこと</b></p><p>${esc339(cfg.skill)}</p>
        <p class="tiny">基礎8問を先に確認し、7問以上を初回でできたら応用2問へ進みます。すべての問題に、その問題に合った解説が出ます。</p>`));
      A.append(btn("🌱 基礎8問をはじめる",()=>startRead339(cfg),"primary"));
    };
    question313=function(i){
      stopRead313();jr313.i=i;const cfg=jr313.cfg,q=cfg.qs[i],stage=readStage339(i);
      head(`${stage==="base"?"🌱 基礎理解":"🌟 応用"} ${stage==="base"?i+1:i-7} / ${stage==="base"?8:2}｜${cfg.title}`,
        i===0?()=>home313(cfg):()=>question313(i-1));
      A.append(e("div","",passageCard313()));renderPassage313();
      A.append(btn("🔊 追い読みする",followRead313,"soft"));A.append(btn("⏹ 読み上げを止める",stopRead313,"soft"));
      const box=e("div","card jr313q",`<div class="jr313kind">${stage==="base"?"基礎理解":"応用"}｜${q.type==="text"?"記述":"選択"}</div><h3>${esc339(q.q)}</h3>`);A.append(box);
      if(q.type==="choice"){
        const correct=q.choices[q.ans];
        choiceOrder313(q,i).forEach(item=>box.appendChild(btn(item.text,()=>{
          box.querySelectorAll(".jr313feedback,.jr313next").forEach(x=>x.remove());
          const missSet=stage==="base"?jRead339.miss:jRead339.applyMiss;
          if(item.ok){
            if(!missSet.has(i)){if(stage==="base")jRead339.baseFirst++;else jRead339.applyFirst++}
            box.appendChild(e("div","feedback good jr313feedback",`◎ ${esc339(readExplain339(q,correct,false))}`));
            const b=btn((i===7||i===cfg.qs.length-1)?"結果を見る":"次の問題へ",()=>readAdvance339(i),"primary");b.classList.add("jr313next");box.appendChild(b);
          }else{
            jr313.hints++;missSet.add(i);
            box.appendChild(e("div","feedback warn jr313feedback",`🌱 この問題の解説：${esc339(readExplain339(q,correct,false))}<br>本文に戻って、もう一度選んでみよう。`));
          }
        },"soft")));
      }else{
        box.appendChild(e("div","jr313answerway","<b>答え方を選べます</b><br>⌨️ 文字入力　または　🎤 音声入力"));
        const ta=document.createElement("textarea");ta.className="jr313textarea";ta.rows=4;ta.placeholder="ここに答えを入力できます";box.appendChild(ta);addVoice313(box,ta);
        box.appendChild(btn("答え合わせ",()=>{
          box.querySelectorAll(".jr313feedback,.jr313next").forEach(x=>x.remove());
          const v=norm313(ta.value),hits=q.keys.filter(k=>v.includes(norm313(k))).length,ok=v.length&&hits>=q.min;
          const missSet=stage==="base"?jRead339.miss:jRead339.applyMiss;
          if(ok){
            if(!missSet.has(i)){if(stage==="base")jRead339.baseFirst++;else jRead339.applyFirst++}
            box.appendChild(e("div","feedback good jr313feedback",`◎ ${esc339(readExplain339(q,"",true))}`));
            const b=btn((i===7||i===cfg.qs.length-1)?"結果を見る":"次の問題へ",()=>readAdvance339(i),"primary");b.classList.add("jr313next");box.appendChild(b);
          }else{
            jr313.hints++;missSet.add(i);box.appendChild(e("div","feedback warn jr313feedback",`🌱 この問題の解説：${esc339(readExplain339(q,"",true))}<br>必要な言葉を足して、もう一度答えてみよう。`));
          }
        },"primary"));
      }
    };
    doneRead339=function(){
      stopRead313();const cfg=jr313.cfg;
      try{
        const key="ponoJapaneseReading313",a=JSON.parse(localStorage.getItem(key)||"[]");
        a.push({studentId:profile.id,date:new Date().toISOString(),grade:cfg.grade,unit:cfg.title,total:10,
          correct:jRead339.baseFirst+jRead339.applyFirst,hints:jr313.hints,seconds:Math.round((Date.now()-jRead339.start)/1000),
          baseCorrect:jRead339.baseFirst,applicationCorrect:jRead339.applyFirst,status:"基礎クリア・応用取組"});
        localStorage.setItem(key,JSON.stringify(a));
      }catch(e){}
      head(`できました｜${cfg.title}`,()=>question313(9));
      A.append(e("div","card good",`<h2>🌟 応用までできました</h2><p>基礎：${jRead339.baseFirst}/8　応用：${jRead339.applyFirst}/2</p><p>${esc339(cfg.skill)}</p></div>`));
      A.append(btn("🔁 基礎からもう一度",()=>startRead339(cfg),"soft"));
      A.append(btn(`国語${cfg.grade}年へ戻る`,()=>subjectGradeTerms("国語",cfg.grade),"primary"));
    };
  }

  /* ---------- 国語・ことば/作文等26単元（v31.5） ---------- */
  let jLang339=null;
  function langStage339(i){return i<BASE_N339?"base":"apply";}
  function langStart339(cfg){
    s315={cfg,i:0,hints:0,start:Date.now()};
    jLang339={baseFirst:0,miss:new Set(),applyFirst:0,applyMiss:new Set(),start:Date.now()};
    q315(0);
  }
  function langAdvance339(i){
    const cfg=s315.cfg;
    if(i===BASE_N339-1){
      const pass=jLang339.baseFirst>=BASE_PASS339;
      head(`基礎確認｜${cfg.title}`,()=>home315(cfg));
      A.append(e("div",`card ${pass?"good":"warn"}`,`<h2>${pass?"✨ 基礎クリア":"🌱 基礎をもう一度確認"}</h2>
        <p>初回でできた問題：<b>${jLang339.baseFirst} / 8</b></p>
        <p>${pass?"基本となることば・考え方を確認できました。応用2問へ進めます。":"説明と問題ごとの解説を見直して、基礎8問をもう一度確認します。"}</p>
        <p class="tiny">基礎クリアの目安：7 / 8</p>`));
      if(pass)A.append(btn("🌟 応用2問へ進む",()=>q315(8),"primary"));
      A.append(btn("🔁 基礎8問をもう一度",()=>langStart339(cfg),"soft"));
      A.append(btn("📘 ① 学ぶを見直す",()=>learn315(cfg),"soft"));
      return;
    }
    if(i<cfg.qs.length-1)q315(i+1);else doneLang339();
  }
  function langExplain339(q,answer,isText){
    if(isText)return `${q.hint} 問いに必要なことばが入っているかを確認します。`;
    return `答えは「${answer}」です。${q.hint}`;
  }
  if(typeof home315==="function"){
    home315=function(cfg){
      s315={cfg,i:0,hints:0,start:Date.now()};
      jLang339={baseFirst:0,miss:new Set(),applyFirst:0,applyMiss:new Set(),start:Date.now()};
      head(`国語｜${cfg.title}`,()=>subjectGradeTerms("国語",cfg.grade));
      A.append(e("div","card",`<div class="tiny">小学${cfg.grade}年 国語</div><h2>${esc339(cfg.title)}</h2>
        <p><b>この単元で学ぶこと</b></p><p>${esc339(cfg.goal)}</p>
        <p class="tiny">説明→例題→基礎8問。7問以上を初回でできたら応用2問へ進みます。各問題に、その問題に合った解説が出ます。</p>`));
      A.append(btn("📘 ① 学ぶ",()=>learn315(cfg),"primary"));
      A.append(btn("🌱 基礎8問から始める",()=>langStart339(cfg),"soft"));
    };
    q315=function(i){
      const cfg=s315.cfg,q=cfg.qs[i],stage=langStage339(i);s315.i=i;
      head(`${stage==="base"?"🌱 基礎理解":"🌟 応用"} ${stage==="base"?i+1:i-7} / ${stage==="base"?8:2}｜${cfg.title}`,
        i===0?()=>example315(cfg):()=>q315(i-1));
      const box=e("div","card q315",`<div class="kind315">${stage==="base"?"基礎理解":"応用"}｜${q.type==="text"?"記述":"選択"}</div><h2>${esc339(q.q)}</h2>`);A.append(box);
      A.append(btn("🔊 問題を聞く",()=>speak315(q.q),"soft"));
      const missSet=stage==="base"?jLang339.miss:jLang339.applyMiss;
      if(q.type==="choice"){
        const correct=q.choices[q.ans];
        order315(q,i).forEach(it=>box.appendChild(btn(it.t,()=>{
          box.querySelectorAll(".fb315,.next315").forEach(x=>x.remove());
          if(it.ok){
            if(!missSet.has(i)){if(stage==="base")jLang339.baseFirst++;else jLang339.applyFirst++}
            box.appendChild(e("div","feedback good fb315",`◎ ${esc339(langExplain339(q,correct,false))}`));
            const b=btn((i===7||i===cfg.qs.length-1)?"結果を見る":"次の問題へ",()=>langAdvance339(i),"primary");b.classList.add("next315");box.appendChild(b);
          }else{
            s315.hints++;missSet.add(i);box.appendChild(e("div","feedback warn fb315",`🌱 この問題の解説：${esc339(langExplain339(q,correct,false))}<br>説明に戻っても大丈夫です。`));
          }
        },"soft")));
      }else{
        box.appendChild(e("div","answerway315","<b>答え方を選べます</b><br>⌨️ 文字入力　または　🎤 音声入力"));
        const ta=document.createElement("textarea");ta.className="ta315";ta.rows=4;ta.placeholder="ここに答えを入力できます";box.appendChild(ta);voice315(box,ta);
        box.appendChild(btn("答え合わせ",()=>{
          box.querySelectorAll(".fb315,.next315").forEach(x=>x.remove());
          const v=norm315(ta.value),hits=(q.keys||[]).filter(k=>!k||v.includes(norm315(k))).length,need=q.min??1;
          const ok=((q.keys||[]).length===0&&v.length)||(v.length&&hits>=need);
          if(ok){
            if(!missSet.has(i)){if(stage==="base")jLang339.baseFirst++;else jLang339.applyFirst++}
            box.appendChild(e("div","feedback good fb315",`◎ ${esc339(langExplain339(q,"",true))}`));
            const b=btn((i===7||i===cfg.qs.length-1)?"結果を見る":"次の問題へ",()=>langAdvance339(i),"primary");b.classList.add("next315");box.appendChild(b);
          }else{
            s315.hints++;missSet.add(i);box.appendChild(e("div","feedback warn fb315",`🌱 この問題の解説：${esc339(langExplain339(q,"",true))}<br>必要なことばを足して、もう一度やってみよう。`));
          }
        },"primary"));
      }
      A.append(btn("📘 説明に戻る",()=>learn315(cfg),"ghost"));
    };
    doneLang339=function(){
      const cfg=s315.cfg;
      head(`まとめ｜${cfg.title}`,()=>q315(9));
      A.append(e("div","card good",`<h2>🌟 応用までできました</h2><p>基礎：${jLang339.baseFirst}/8　応用：${jLang339.applyFirst}/2</p><p>${esc339(cfg.goal)}</p></div>`));
      records.push({studentId:profile.id,date:new Date().toISOString(),subject:"国語",grade:cfg.grade,unit:cfg.title,
        content:"基礎8問→応用2問",correct:jLang339.baseFirst+jLang339.applyFirst,total:10,
        rate:Math.round((jLang339.baseFirst+jLang339.applyFirst)/10*100),seconds:Math.round((Date.now()-jLang339.start)/1000),
        hints:s315.hints,status:"基礎クリア・応用取組",process:"基礎理解クリア後に応用",questionStructure:"基礎8問・応用2問・問題別解説"});save();
      A.append(btn("🔁 基礎からもう一度",()=>langStart339(cfg),"soft"));
      A.append(btn(`国語${cfg.grade}年へ戻る`,()=>subjectGradeTerms("国語",cfg.grade),"primary"));
    };
  }
})();

/* v33.9 親画面の進み具合表示を維持（旧index内のv32.0〜32.2機能を外部化） */
(function(){
  const APP339=document.getElementById("app");
  function safeArr339(k){
    try{const x=JSON.parse(localStorage.getItem(k)||"[]");return Array.isArray(x)?x:[]}
    catch(e){return[]}
  }
  function sub339(r){
    let s=r.subject||"学習";
    if(s==="外国語活動"&&Number(r.grade)>=5)s="外国語";
    return s;
  }
  function unit339(r){
    for(const v of [r.unit,r.nodeTitle,r.title])if(v&&String(v).trim())return String(v).trim();
    if(Array.isArray(r.adaptivePath)&&r.adaptivePath.length){
      const x=[...r.adaptivePath].reverse().find(a=>a&&a.title);if(x)return x.title;
    }
    return sub339(r)==="算数"?"基礎確認":"学習内容の確認";
  }
  function state339(r){
    const s=String(r.status||"");
    if(s.includes("応用")||s.includes("自力")||s.includes("定着")||s.includes("10問完了")||s.includes("基礎クリア")||r.result==="ok")return "確認";
    if(s.includes("練習")||s.includes("基礎を確認")||Number(r.hints)>0||(r.rate!=null&&Number(r.rate)<80))return "練習";
    return "取組";
  }
  function day339(v){
    const d=new Date(v);return isNaN(d)?"日時なし":d.toLocaleDateString("ja-JP",{month:"numeric",day:"numeric"});
  }
  function rows339(){
    let a=safeArr339("ponoV9Records").filter(r=>!r.studentId||r.studentId===profile.id);
    safeArr339("ponoJapaneseReading313").filter(r=>!r.studentId||r.studentId===profile.id).forEach(x=>{
      if(!a.some(r=>r.date===x.date&&sub339(r)==="国語"&&unit339(r)===x.unit)){
        a.push({studentId:x.studentId||profile.id,date:x.date,subject:"国語",grade:x.grade,unit:x.unit,total:x.total||10,
          correct:x.correct??x.total??10,hints:x.hints||0,seconds:x.seconds||0,status:x.status||"10問完了"});
      }
    });
    return a.sort((a,b)=>new Date(a.date)-new Date(b.date));
  }
  function parentDashboard339(){
    const rr=rows339();
    head("📊 学習の進み具合",parentHome339);
    A.append(e("div","card",`<h2>${profile.name}の学習記録</h2><p>在籍 小学${profile.grade}年</p>
      <p class="tiny">取り組んだ内容と、基礎確認・応用・練習中の記録を見ます。能力や学年全体の到達度を決める表示ではありません。</p>`));
    if(!rr.length){A.append(e("div","card","まだ学習記録はありません。"));return}
    const m=new Map();rr.forEach(r=>m.set(sub339(r)+"|"+unit339(r),r));const units=[...m.values()];
    const days=new Set(rr.map(r=>new Date(r.date).toDateString())).size;
    A.append(e("div","card",`<h2>全体</h2><p><span class="pill">学習日 ${days}日</span><span class="pill">記録 ${rr.length}件</span><span class="pill">単元 ${units.length}</span></p>`));
    ["国語","算数","理科","社会","外国語活動","外国語"].forEach(sub=>{
      const us=units.filter(r=>sub339(r)===sub);if(!us.length)return;
      const ok=us.filter(r=>state339(r)==="確認").length,pr=us.filter(r=>state339(r)==="練習").length;
      const latest=us.slice().sort((a,b)=>new Date(b.date)-new Date(a.date))[0];
      A.append(e("div","card",`<h2>${sub}</h2><p><b>${us.length}単元</b>に取り組み記録があります。</p>
        <p><span class="pill">✅ 確認 ${ok}</span><span class="pill">🌱 練習中 ${pr}</span></p>
        <p class="tiny">最近：${day339(latest.date)}　${unit339(latest)}</p>`));
    });
    const retry=units.filter(r=>state339(r)==="練習").slice(-5).reverse();
    A.append(e("div","card",`<h2>🌱 もう一度確認するとよさそうな単元</h2>${retry.length?retry.map(r=>`<p><b>${sub339(r)}｜${unit339(r)}</b></p>`).join(""):"<p>現在の記録ではありません。</p>"}`));
  }
  const baseParent339=typeof parent==="function"?parent:null;
  function parentHome339(){
    if(baseParent339)baseParent339();
    if(!APP339||APP339.querySelector(".progress-parent339"))return;
    const b=btn("📊 学習の進み具合を見る",parentDashboard339,"primary");
    b.classList.add("progress-parent339");
    const first=APP339.querySelector(".card");
    if(first)first.insertAdjacentElement("beforebegin",b);else APP339.append(b);
  }
  if(baseParent339){
    parent=parentHome339;
    window.parentHome339=parentHome339;
    document.addEventListener("click",ev=>{
      const b=ev.target.closest&&ev.target.closest("button");
      if(!b)return;
      if((b.textContent||"").includes("保護者")&&(b.textContent||"").includes("自分の子の学び")){
        ev.preventDefault();ev.stopImmediatePropagation();parentHome339();
      }
    },true);
  }
})();
