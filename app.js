const A=document.querySelector("#app");
const student={id:"PONO001",name:"はるさん",grade:3};
const data={
 pre:{title:"九九・かけ算の確認",learn:"わり算では、九九を使います。たとえば 3×4＝12 が分かると、12÷3＝4 と考えられます。",q:[
 ["3×4 は？",["7","12","34"],1],["5×4 は？",["9","20","54"],1],["6×3 は？",["9","18","63"],1]]},
 basic:{title:"わり算の意味",learn:"12このあめを3人に同じ数ずつ分けると、1人4こです。これを 12÷3＝4 と表します。",q:[
 ["12このあめを3人に同じ数ずつ分けます。1人何こ？",["3こ","4こ","9こ"],1],
 ["15このいちごを5人に同じ数ずつ分けます。1人何こ？",["3こ","5こ","10こ"],0],
 ["18÷3 は？",["5","6","9"],1],
 ["20÷5 は？",["4","5","15"],0]]},
 word:{title:"わり算の文章題",learn:"文章題では「全部でいくつ」「何人に分ける」「1人分はいくつ」を見つけます。",q:[
 ["24本のえんぴつを6人に同じ数ずつ分けます。1人何本？",["4本","6本","18本"],0],
 ["21このボールを3人に同じ数ずつ分けます。1人何こ？",["6こ","7こ","18こ"],1],
 ["32枚のカードを4人に同じ数ずつ分けます。1人何枚？",["6枚","8枚","28枚"],1]]},
 mini:{title:"単元ミニテスト",q:[
 ["16÷4 は？",["3","4","12"],1],
 ["27÷3 は？",["8","9","24"],1],
 ["20このクッキーを4人に同じ数ずつ分けます。1人何こ？",["4こ","5こ","16こ"],1],
 ["35本の花を5人に同じ数ずつ分けます。1人何本？",["5本","7本","30本"],1],
 ["18このおはじきを、1人に3こずつ配ります。何人に配れますか？",["6人","9人","15人"],0]]},
 retention:{title:"定着チェック",q:[
 ["24÷6 は？",["3","4","18"],1],
 ["28このシールを4人に同じ数ずつ分けます。1人何枚？",["6枚","7枚","24枚"],1],
 ["30このあめを1人に5こずつ配ります。何人に配れますか？",["5人","6人","25人"],1]]}
};
let stage="diagnostic",i=0,correct=0,hints=0,reads=0,start=0,log=[];
const db=()=>JSON.parse(localStorage.getItem("ponoWariV3")||'{"records":[],"retentionDue":null}'),save=d=>localStorage.setItem("ponoWariV3",JSON.stringify(d)),shell=x=>A.innerHTML=`<div class="wrap">${x}</div>`;
function speak(t){if(!("speechSynthesis"in window))return alert("この端末では読み上げを利用できません。");speechSynthesis.cancel();let u=new SpeechSynthesisUtterance(t);u.lang="ja-JP";u.rate=.82;speechSynthesis.speak(u)}
function ping(){try{let c=new AudioContext(),o=c.createOscillator(),g=c.createGain();o.frequency.value=880;g.gain.value=.04;o.connect(g);g.connect(c.destination);o.start();o.stop(c.currentTime+.13)}catch(e){}}
function home(){let d=db();shell(`<div class="card"><h1>🌱 Pono Learning v3</h1><p>${student.name}｜在籍 小学${student.grade}年</p><div class="box"><b>3年算数「わり算」完全動作試作</b><br><span class="small">実際の解答から現在地を判断します。</span></div><button class="primary" onclick="beginDiagnostic()">今の理解を確認する</button>${d.retentionDue?`<button onclick="begin('retention')">🌱 定着チェックをする</button><p class="small">予定日：${d.retentionDue}</p>`:""}<button class="secondary" onclick="teacher()">先生画面・学校共有記録</button></div>`)}
function reset(s){stage=s;i=0;correct=0;hints=0;reads=0;start=Date.now();log=[]}
function beginDiagnostic(){reset("diagnostic");diagnostic()}
const diag=[
 ["九九を確認します。6×4 は？",["10","24","64"],1,"九九"],
 ["同じ数ずつ分けます。12こを3人に分けると1人何こ？",["3こ","4こ","9こ"],1,"意味"],
 ["18÷3 は？",["5","6","9"],1,"計算"],
 ["24本を6人に同じ数ずつ分けます。1人何本？",["4本","6本","18本"],0,"文章題"]
];
function diagnostic(){if(i>=diag.length)return diagnosticResult();let q=diag[i];renderQ("最初の理解度確認",q,diag.length,diagnostic)}
function renderQ(title,q,total,next){shell(`<div class="card"><span class="pill">${title}</span><p>${i+1}/${total}</p><div class="bar"><i style="width:${100*i/total}%"></i></div><h2>${q[0]}</h2><button onclick="reads++;speak(${JSON.stringify(q[0])})">🔊 問題をきく</button>${q[1].map((x,n)=>`<button class="choice" onclick="answer(${n},${q[2]},${q[3]?JSON.stringify(q[3]):'null'})">${x}</button>`).join("")}<button class="secondary" onclick="hints++;alert('式やまとまりを小さく分けて考えてみよう。')">💡 ヒント</button></div>`)}
function answer(n,a,tag){let ok=n===a;log.push({tag,ok});if(ok){correct++;ping();alert("できた！")}else alert("もう一度確認する場所が見つかりました。");i++;if(stage==="diagnostic")diagnostic();else lessonQ()}
function diagnosticResult(){let weak=log.filter(x=>!x.ok).map(x=>x.tag);let route=weak.includes("九九")?"pre":weak.includes("意味")||weak.includes("計算")?"basic":weak.includes("文章題")?"word":"mini";let labels={pre:"九九・かけ算から確認",basic:"わり算の意味から",word:"文章題から",mini:"ミニテストへ"};record("理解度確認",`${correct}/4`,labels[route]);shell(`<div class="card"><h2>🌱 今の学習位置</h2><p><b>${labels[route]}</b></p><p class="muted">間違いを点数だけで扱わず、どの内容を確認すると次につながるかを判断しました。</p><button onclick="begin('${route}')">ここから学ぶ</button></div>`)}
function begin(s){reset(s);if(s==="mini"||s==="retention")return lessonQ();let x=data[s];shell(`<div class="card"><span class="pill">${x.title}</span><h2>① まなぶ</h2><p>${x.learn}</p><button onclick="reads++;speak(${JSON.stringify(x.learn)})">🔊 説明をきく</button><button class="primary" onclick="lessonQ()">② 一緒に・自分でやる</button></div>`)}
function lessonQ(){let x=data[stage],arr=x.q;if(i>=arr.length)return stageResult();renderQ(x.title,arr[i],arr.length,lessonQ)}
function stageResult(){let total=data[stage].q.length,rate=correct/total,route;if(stage==="pre")route=rate>=.8?"basic":"pre";else if(stage==="basic")route=rate>=.8?"word":"pre";else if(stage==="word")route=rate>=.8?"mini":"basic";else if(stage==="mini")route=rate>=.8?"retention":"basic";else route=rate>=.8?"done":"basic";record(data[stage].title,`${correct}/${total}`,route);if(stage==="mini"&&rate>=.8){let d=db(),dt=new Date();dt.setDate(dt.getDate()+3);d.retentionDue=dt.toLocaleDateString("ja-JP");save(d)}if(stage==="retention"&&rate>=.8){let d=db();d.retentionDue=null;save(d)}
let label={pre:"九九・かけ算をもう一度",basic:"わり算の意味へ",word:"文章題へ",mini:"単元ミニテストへ",retention:"3日後の定着チェック",done:"定着確認済み"}[route];
shell(`<div class="card"><h2>🌱 ${data[stage].title} 結果</h2><p><b>${correct}/${total}</b></p><p>次：<b>${label}</b></p><p class="small">ヒント ${hints}回／読み上げ ${reads}回</p>${route==="retention"?'<button onclick="home()">今日はここまで</button>':route==="done"?'<button onclick="home()">完了</button>':`<button onclick="begin('${route}')">次へ</button>`}</div>`)}
function record(kind,result,next){let d=db();d.records.push({date:new Date().toLocaleString("ja-JP"),kind,result,next,hints,reads,minutes:Math.max(1,Math.round((Date.now()-start)/60000))});save(d)}
function teacher(){let d=db(),rows=d.records.slice().reverse().map(r=>`<tr><td>${r.date}</td><td>${r.kind}</td><td>${r.result}</td><td>${r.hints}</td><td>${r.reads}</td><td>${r.minutes}分</td><td>${r.next}</td></tr>`).join("");shell(`<div class="card"><h1>Pono 個別学習経過</h1><p>${student.name}｜在籍 小学${student.grade}年</p><p><b>学校の現在単元：</b> <span contenteditable="true">ここを入力</span></p><table border="1" cellpadding="5" width="100%"><tr><th>日時</th><th>内容</th><th>結果</th><th>ヒント</th><th>読上</th><th>時間</th><th>次</th></tr>${rows||'<tr><td colspan="7">記録なし</td></tr>'}</table><div class="box"><b>Pono所見・学校との共有事項</b><p contenteditable="true">ここをタップして入力できます。</p></div><p class="small">※正答数だけでなく、学び直した内容・支援利用・次の学習・後日の定着確認を共有します。</p><button onclick="window.print()">🖨️ 印刷 / PDF保存</button></div><button onclick="home()">もどる</button>`)}
home();