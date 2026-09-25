const A=document.querySelector("#app");
const student={id:"PONO001",name:"はるさん",grade:3};
const subjects=[
 {id:"japanese",icon:"📖",name:"国語",desc:"漢字・ことば・読解"},
 {id:"math",icon:"➗",name:"算数",desc:"数・計算・図形・文章題"},
 {id:"science",icon:"🔬",name:"理科",desc:"自然・植物・こん虫・光"},
 {id:"social",icon:"🗾",name:"社会",desc:"地域・地図・くらし"},
 {id:"english",icon:"🌎",name:"英語",desc:"ことば・聞く・選ぶ"}
];
const math={
 pre:{title:"九九・かけ算の確認",learn:"わり算では、九九を使います。たとえば 3×4＝12 が分かると、12÷3＝4 と考えられます。",q:[
 ["3×4 は？",["7","12","34"],1],["5×4 は？",["9","20","54"],1],["6×3 は？",["9","18","63"],1]]},
 basic:{title:"わり算の意味",learn:"12このあめを3人に同じ数ずつ分けると、1人4こです。これを 12÷3＝4 と表します。",q:[
 ["12このあめを3人に同じ数ずつ分けます。1人何こ？",["3こ","4こ","9こ"],1],
 ["15このいちごを5人に同じ数ずつ分けます。1人何こ？",["3こ","5こ","10こ"],0],
 ["18÷3 は？",["5","6","9"],1],["20÷5 は？",["4","5","15"],0]]},
 word:{title:"わり算の文章題",learn:"文章題では、全部でいくつ、何人に分ける、1人分はいくつ、を見つけます。",q:[
 ["24本のえんぴつを6人に同じ数ずつ分けます。1人何本？",["4本","6本","18本"],0],
 ["21このボールを3人に同じ数ずつ分けます。1人何こ？",["6こ","7こ","18こ"],1],
 ["32枚のカードを4人に同じ数ずつ分けます。1人何枚？",["6枚","8枚","28枚"],1]]},
 mini:{title:"単元ミニテスト",q:[
 ["16÷4 は？",["3","4","12"],1],["27÷3 は？",["8","9","24"],1],
 ["20このクッキーを4人に同じ数ずつ分けます。1人何こ？",["4こ","5こ","16こ"],1],
 ["35本の花を5人に同じ数ずつ分けます。1人何本？",["5本","7本","30本"],1],
 ["18このおはじきを、1人に3こずつ配ります。何人に配れますか？",["6人","9人","15人"],0]]}
};
const diag=[
 ["九九を確認します。6×4 は？",["10","24","64"],1,"九九"],
 ["同じ数ずつ分けます。12こを3人に分けると1人何こ？",["3こ","4こ","9こ"],1,"意味"],
 ["18÷3 は？",["5","6","9"],1,"計算"],
 ["24本を6人に同じ数ずつ分けます。1人何本？",["4本","6本","18本"],0,"文章題"]
];
let stage="diagnostic",i=0,correct=0,hints=0,reads=0,start=0,log=[];
const shell=x=>A.innerHTML=`<div class="wrap">${x}</div>`;
const progressKey="ponoV5Progress";
function getProgress(){return JSON.parse(localStorage.getItem(progressKey)||'{"records":[]}')}
function addRecord(kind,result,next){const d=getProgress();d.records.push({date:new Date().toLocaleString("ja-JP"),kind,result,next,hints,reads});localStorage.setItem(progressKey,JSON.stringify(d))}
function roleHome(){
 shell(`<div class="card hero"><h1>🌱 Pono Learning Quest</h1><p>使う画面を選んでください</p></div>
 <button id="child" class="role"><b>🧒 子ども</b><small>今日の学習・5教科・続きから</small></button>
 <button id="parent" class="role"><b>🏠 保護者</b><small>今の学習・できたこと・次の学習</small></button>
 <button id="teacher" class="role"><b>📝 先生・Pono</b><small>学習経過・学校共有・印刷/PDF</small></button>`);
 document.querySelector("#child").onclick=home;document.querySelector("#parent").onclick=parentHome;document.querySelector("#teacher").onclick=teacherHome
}
function parentHome(){
 const d=getProgress(),r=d.records[d.records.length-1];
 shell(`<div class="card"><h1>🏠 保護者画面</h1><p><b>${student.name}</b>｜小学${student.grade}年</p>
 <div class="box"><b>今取り組んでいること</b><p>算数「わり算」</p></div>
 <div class="box"><b>最近のできたこと</b><p>${r?r.kind+"： "+r.result:"これから学習記録が表示されます。"}</p></div>
 <div class="box"><b>次に取り組むこと</b><p>${r?r.next:"最初の理解度確認から始めます。"}</p></div>
 <p class="muted">点数だけでなく、どんな方法で学べたかも大切にして表示していきます。</p><button id="back">入口へもどる</button></div>`);
 document.querySelector("#back").onclick=roleHome
}
function teacherHome(){
 const d=getProgress(),rows=d.records.slice().reverse().map(r=>`<tr><td>${r.date}</td><td>${r.kind}</td><td>${r.result}</td><td>${r.hints}</td><td>${r.reads}</td><td>${r.next}</td></tr>`).join("");
 shell(`<div class="card"><h1>📝 先生・Pono画面</h1><p>${student.name}｜在籍 小学${student.grade}年</p>
 <div class="box"><b>学校の現在単元</b><p contenteditable="true">ここをタップして入力</p></div>
 <div class="table-wrap"><table><tr><th>日時</th><th>内容</th><th>結果</th><th>ヒント</th><th>読上</th><th>次</th></tr>${rows||'<tr><td colspan="6">これから学習記録が表示されます。</td></tr>'}</table></div>
 <div class="box"><b>Pono所見・学校との共有事項</b><p contenteditable="true">ここをタップして入力できます。</p></div>
 <button id="print">🖨️ 印刷 / PDF保存</button><button id="back">入口へもどる</button></div>`);
 document.querySelector("#print").onclick=()=>window.print();document.querySelector("#back").onclick=roleHome
}
function speechText(t){return String(t).replace(/÷/g," わる ").replace(/×/g," かける ").replace(/＝|=/g," は ").replace(/\+/g," たす ").replace(/−|-/g," ひく ")}
function speak(t){
 if(!("speechSynthesis" in window)){alert("この端末では読み上げを利用できません。");return}
 speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(speechText(t));u.lang="ja-JP";u.rate=.9;u.pitch=1.02;
 const ja=speechSynthesis.getVoices().find(v=>v.lang&&v.lang.toLowerCase().startsWith("ja"));if(ja)u.voice=ja;speechSynthesis.speak(u)
}
function ping(){const a=new Audio("correct.wav");a.volume=.8;a.play().catch(()=>{})}
function home(){
 shell(`<div class="card hero"><h1>🌱 Pono Learning Quest</h1><p>${student.name}｜在籍 小学${student.grade}年</p><p class="muted">自分に合うところから、少しずつ学べます。</p></div>
 <h2>今日の学習を選ぶ</h2><div class="subject-grid">${subjects.map(s=>`<button class="subject" data-id="${s.id}"><b>${s.icon} ${s.name}</b><small>${s.desc}</small></button>`).join("")}</div>
 <div class="card"><b>今回の確認版</b><p>算数「わり算」は実際に学習できます。ほかの4教科は入口画面を確認できます。</p></div>`);
 document.querySelectorAll(".subject").forEach(b=>b.addEventListener("click",()=>openSubject(b.dataset.id)));
}
function openSubject(id){
 const s=subjects.find(x=>x.id===id);
 if(id!=="math"){shell(`<div class="card"><h1>${s.icon} ${s.name}</h1><div class="box"><b>3年生 ${s.name}クエスト</b><p>${s.desc}</p></div><p>この教科は次の段階で、単元と問題を入れていきます。</p><button id="back">5教科へもどる</button></div>`);document.querySelector("#back").onclick=home;return}
 shell(`<div class="card"><h1>➗ 3年生 算数</h1><div class="box"><b>わり算</b><p>最初に今の理解を確認して、ちょうどよいところから始めます。</p></div><button id="go" class="primary">今の理解を確認する</button><button id="back" class="secondary">5教科へもどる</button></div>`);
 document.querySelector("#go").onclick=beginDiagnostic;document.querySelector("#back").onclick=home;
}
function reset(s){stage=s;i=0;correct=0;hints=0;reads=0;start=Date.now();log=[]}
function beginDiagnostic(){reset("diagnostic");diagnostic()}
function diagnostic(){if(i>=diag.length)return diagnosticResult();renderQ("最初の理解度確認",diag[i],diag.length)}
function renderQ(title,q,total){
 shell(`<div class="card"><span class="pill">${title}</span><p>${i+1}/${total}</p><div class="bar"><i style="width:${100*i/total}%"></i></div><h2 id="qt"></h2><button id="speak">🔊 問題をきく</button><div id="choices"></div><button id="hint" class="secondary">💡 ヒント</button></div>`);
 document.querySelector("#qt").textContent=q[0];
 q[1].forEach((x,n)=>{const b=document.createElement("button");b.className="choice";b.textContent=x;b.onclick=()=>answer(n,q[2],q[3]||null);document.querySelector("#choices").appendChild(b)});
 document.querySelector("#speak").onclick=()=>{reads++;speak(q[0])};document.querySelector("#hint").onclick=()=>{hints++;alert("式やまとまりを小さく分けて考えてみよう。")}
}
function feedback(message,kind,next,delay){
 const old=document.querySelector(".feedback");if(old)old.remove();
 const box=document.createElement("div");box.className="feedback "+kind;box.textContent=message;
 document.querySelector(".card").appendChild(box);
 document.querySelectorAll("button").forEach(b=>b.disabled=true);
 setTimeout(next,delay);
}
function answer(n,a,tag){
 const ok=n===a;log.push({tag,ok});
 if(ok){
  correct++;
  ping();
  feedback("✨ できた！","good",()=>{i++;stage==="diagnostic"?diagnostic():lessonQ()},950);
 }else{
  feedback("🌱 もう一度確認してみよう","retry",()=>{i++;stage==="diagnostic"?diagnostic():lessonQ()},1100);
 }
}
function diagnosticResult(){
 const weak=log.filter(x=>!x.ok).map(x=>x.tag),route=weak.includes("九九")?"pre":weak.includes("意味")||weak.includes("計算")?"basic":weak.includes("文章題")?"word":"mini";
 const labels={pre:"九九・かけ算から確認",basic:"わり算の意味から",word:"文章題から",mini:"ミニテストへ"};
 addRecord("理解度確認",`${correct}/${diag.length}`,labels[route]);
 shell(`<div class="card"><h2>🌱 今の学習位置</h2><p><b>${labels[route]}</b></p><p class="muted">どの内容を確認すると次につながるかを見ています。</p><button id="next">ここから学ぶ</button></div>`);document.querySelector("#next").onclick=()=>begin(route)
}
function begin(s){reset(s);if(s==="mini")return lessonQ();const x=math[s];shell(`<div class="card"><span class="pill">${x.title}</span><h2>① まなぶ</h2><p>${x.learn}</p><button id="ls">🔊 説明をきく</button><button id="go" class="primary">② 一緒に・自分でやる</button></div>`);document.querySelector("#ls").onclick=()=>{reads++;speak(x.learn)};document.querySelector("#go").onclick=lessonQ}
function lessonQ(){const x=math[stage],arr=x.q;if(i>=arr.length)return result();renderQ(x.title,arr[i],arr.length)}
function result(){const total=math[stage].q.length,rate=correct/total;let route=stage==="pre"?(rate>=.8?"basic":"pre"):stage==="basic"?(rate>=.8?"word":"pre"):stage==="word"?(rate>=.8?"mini":"basic"):"done";const label={pre:"九九・かけ算をもう一度",basic:"わり算の意味へ",word:"文章題へ",mini:"単元ミニテストへ",done:"今回の学習完了"}[route];addRecord(math[stage].title,`${correct}/${total}`,label);shell(`<div class="card"><h2>🌱 ${math[stage].title} 結果</h2><p><b>${correct}/${total}</b></p><p>次：<b>${label}</b></p><p class="small">ヒント ${hints}回／読み上げ ${reads}回</p><button id="next">${route==="done"?"5教科へもどる":"次へ"}</button></div>`);document.querySelector("#next").onclick=()=>route==="done"?home():begin(route)}
roleHome();
