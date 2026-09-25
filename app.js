
const A=document.getElementById("app"),RK="ponoV9Records",PK="ponoV9Plans",SK="ponoV9Student";
let profile=JSON.parse(localStorage.getItem(SK)||'{"id":"PONO001","name":"はるさん","grade":3}');
let records=JSON.parse(localStorage.getItem(RK)||"[]"),subject="",qi=0,S={};
const subs=["国語","算数","理科","社会","外国語活動"];
const B={
"国語":[["文の中で「なぜ」に答える部分を探す時の手がかりは？",["理由を表す言葉","文字の大きさ","ページ番号"],0,"理由を表す言葉や前後の文を確認します。"],["「森」の読みは？",["もり","かわ","そら"],0,"漢字の読みを確認します。"],["『雨が降ったので傘をさした。』理由は？",["雨が降ったから","暑いから","夜だから"],0,"理由を文から見つけます。"],["『本を読んでから感想を書いた。』後にしたことは？",["読む","感想を書く","買う"],1,"順序を確認します。"],["『プレゼントをもらい、にっこりした。』気持ちは？",["うれしい","こわい","かなしい"],0,"行動から気持ちを考えます。"]],
"算数":[["6×4は？",["20","24","28"],1,"九九はわり算の土台です。"],["12÷3は？",["3","4","6"],1,"同じ数ずつ分けます。"],["15個を5人で同じ数ずつ分けると？",["2個","3個","5個"],1,"場面をわり算に結びつけます。"],["1mは何cm？",["10","100","1000"],1,"長さの単位を確認します。"],["1/2は？",["2つに等分した1つ分","3つに等分した1つ分","全部"],0,"分数の意味を確認します。"]],
"理科":[["昆虫のあしは？",["4本","6本","8本"],1,"昆虫の体を確認します。"],["植物の育ちに大切なのは？",["光や水","石だけ","音だけ"],0,"植物の育ちを確認します。"],["磁石につきやすいのは？",["鉄","紙","木"],0,"磁石の性質です。"],["音が出る物で感じることがあるのは？",["ふるえ","色だけ","重さだけ"],0,"音と振動を結びつけます。"],["豆電球が光るには？",["回路がつながる","紙を置く","水につける"],0,"電気の通り道です。"]],
"社会":[["地図で方位を知るものは？",["方位記号","温度計","ものさしだけ"],0,"地図の基本です。"],["上が北なら右は？",["東","西","南"],0,"方位を確認します。"],["店の工夫を知るには？",["見学や聞き取り","想像だけ","何も見ない"],0,"地域調査の方法です。"],["火事の時に活動するのは？",["消防","図書館","美術館"],0,"地域の安全を守る仕組みです。"],["昔と今を比べる資料は？",["古い写真や地図","白紙","未来だけ"],0,"地域の変化を調べます。"]],
"外国語活動":[["Hello. は？",["こんにちは","さようなら","おやすみ"],0,"基本のあいさつです。"],["three は？",["2","3","4"],1,"数の表現です。"],["red は？",["赤","青","緑"],0,"色の表現です。"],["dog は？",["犬","猫","鳥"],0,"動物の表現です。"],["My name is Ken. は？",["私の名前はケンです","3歳です","犬が好きです"],0,"名前を伝える表現です。"]]};

const MATHNODES={
 g1_add:{grade:1,title:"たし算の意味",pre:null,qs:[["3+2は？",["4","5","6"],1],["5+4は？",["8","9","10"],1],["7+2は？",["8","9","10"],1]]},
 g2_mult:{grade:2,title:"かけ算・九九",pre:"g1_add",qs:[["3×4は？",["7","12","14"],1],["6×5は？",["25","30","35"],1],["8×4は？",["24","32","36"],1]]},
 g3_div:{grade:3,title:"わり算の意味",pre:"g2_mult",qs:[["12÷3は？",["3","4","6"],1],["20÷5は？",["4","5","10"],0],["18個を3人で同じ数ずつ分けると？",["5個","6個","9個"],1]]},
 g4_divcalc:{grade:4,title:"わり算の計算",pre:"g3_div",qs:[["84÷4は？",["21","24","28"],0],["96÷3は？",["22","32","36"],1],["120÷6は？",["20","24","30"],0]]},
 g5_frac:{grade:5,title:"分数の意味と計算",pre:"g4_divcalc",qs:[["1/2+1/4は？",["2/6","3/4","1/6"],1],["3/5-1/5は？",["2/5","2/10","4/5"],0],["2÷3を分数で表すと？",["3/2","2/3","2/1"],1]]},
 g6_fracmul:{grade:6,title:"分数のかけ算",pre:"g5_frac",qs:[["1/2×3は？",["3/2","1/6","2/3"],0],["2/3×3/4は？",["1/2","5/7","6/7"],0],["3/5×10は？",["6","2","5"],0]]}
};
let adaptive=null;


function furiganaOn(){return localStorage.getItem("ponoFurigana")!=="off"}
function setFurigana(v){localStorage.setItem("ponoFurigana",v?"on":"off")}
function ruby(word,reading){return furiganaOn()?`<ruby>${word}<rt>${reading}</rt></ruby>`:word}
function accessibilityBox(){
 let c=e("div","access-box",`<b>読みやすさ</b><br><span class="tiny">自分に合う表示を選べます。</span>`),lab=e("label","",`<input type="checkbox" style="width:auto;margin-right:7px"> ふりがな`),ck=lab.querySelector("input");ck.checked=furiganaOn();ck.onchange=()=>{setFurigana(ck.checked);};c.append(lab);return c
}
function fractionWords(){
 return `<details class="word-help"><summary>📘 ことばの確認</summary>
 <div class="word-grid">
 <p><b>${ruby("分子","ぶんし")}</b>：分数の上の数。「いくつ分」かを表します。</p>
 <p><b>${ruby("分母","ぶんぼ")}</b>：分数の下の数。「いくつに同じ大きさで分けたか」を表します。</p>
 <p><b>${ruby("約分","やくぶん")}</b>：上と下を同じ数でわって、分数をかんたんな形にすること。</p>
 <p class="fraction-example">${fmtMath("2/4")} ＝ ${fmtMath("1/2")}</p>
 </div></details>`;
}

function fmtMath(t){
  t=String(t);
  return t.replace(/(\d+)\/(\d+)/g,'<span class="frac"><span>$1</span><span>$2</span></span>');
}
function mathEntry(nodeId){
  adaptive=adaptive||{origin:nodeId,node:nodeId,history:[],returnTo:null,qi:0,ok:0,h:0,start:Date.now(),learned:0,together:0};
  adaptive.node=nodeId;adaptive.qi=0;adaptive.ok=0;adaptive.h=0;
  let n=MATHNODES[nodeId];head(`算数｜${n.title}`,child);A.append(accessibilityBox());
  A.append(e("div","card",`<h2>どこから始める？</h2><p>説明を見てからでも、問題からでも大丈夫です。</p>`));
  A.append(btn("📖 説明からはじめる",()=>mathLearn(nodeId),"primary"));
  A.append(btn("🚀 問題からやってみる",mathQ,"soft"));
}
function mathLearn(nodeId){
 let n=MATHNODES[nodeId];adaptive.learned=(adaptive.learned||0)+1;head(`① まなぶ｜${n.title}`,child);
 let msg={
 g1_add:"たし算は、いくつかの数を合わせて全部でいくつになるかを考えます。",
 g2_mult:"かけ算は、同じ数がいくつ分あるかをまとめて考える方法です。",
 g3_div:"わり算は、同じ数ずつ分けたり、いくつ分あるかを考えたりするときに使います。",
 g4_divcalc:"大きな数のわり算も、九九や位ごとの考え方を使うと整理できます。",
 g5_frac:"分数は、1つのものを同じ大きさに分けたうちのいくつ分かを表します。分母は何等分か、分子はいくつ分かを表します。",
 g6_fracmul:"分数のかけ算は、分子どうし・分母どうしをかけて考えます。約分できるときは整理します。"
 }[nodeId];
 A.append(e("div","card lesson",`<h2>📖 ミニ授業</h2><p>${msg}</p>${["g5_frac","g6_fracmul"].includes(nodeId)?fractionWords():""}<p class="tiny">分からないところは、何度見直しても大丈夫です。</p>`));
 A.append(btn("② 一緒にやってみる",()=>mathTogether(nodeId),"primary"));
 A.append(btn("もう分かった → ③ 自分でやる",mathQ,"soft"));
}
function mathTogether(nodeId){
 adaptive.together=(adaptive.together||0)+1;let n=MATHNODES[nodeId],q=n.qs[0];head(`② 一緒に｜${n.title}`,child);
 A.append(e("div","card lesson",`<h2>${fmtMath(q[0])}</h2><p>まず、何を求める問題かを確認します。式の意味を見ながら、一緒に答えを確かめてみよう。</p><p><b>答え：</b> ${fmtMath(q[1][q[2]])}</p>`));
 A.append(btn("③ 自分でやってみる",mathQ,"primary"));
}

function mathStart(){let sg=profile.startGrade||profile.grade,id={1:"g1_add",2:"g2_mult",3:"g3_div",4:"g4_divcalc",5:"g5_frac",6:"g6_fracmul"}[sg];adaptive={origin:id,node:id,history:[],returnTo:null,qi:0,ok:0,h:0,start:Date.now(),learned:0,together:0};mathEntry(id)}
function mathQ(){let n=MATHNODES[adaptive.node],q=n.qs[adaptive.qi];head(`③ 自分で｜${n.title}`,child);A.append(e("div","tiny",`在籍 小学${profile.grade}年｜学習開始の目安 小学${profile.startGrade||profile.grade}年`));A.append(e("div","card",`<h2>${fmtMath(q[0])}</h2>`));q[1].forEach((x,i)=>{let b=btn("",()=>mathAns(i===q[2]));b.innerHTML=fmtMath(x);A.append(b)});A.append(btn("💡 説明を見る",()=>mathLearn(adaptive.node),"soft"));A.append(btn("🌱 わからない・説明を見る",()=>{adaptive.h++;mathLearn(adaptive.node)},"soft"))}
function mathAns(ok){if(ok){adaptive.ok++;new Audio("correct.wav").play().catch(()=>{});adaptive.qi++;if(adaptive.qi<MATHNODES[adaptive.node].qs.length){mathQ();return}mathJudge()}else{adaptive.h++;mathQ();A.prepend(e("div","feedback warn","🌱 もう一度考えてみよう。説明を見ても大丈夫です。"))}}
function mathJudge(){let n=MATHNODES[adaptive.node],rate=Math.round(adaptive.ok/n.qs.length*100);adaptive.history.push({node:adaptive.node,grade:n.grade,title:n.title,rate,hints:adaptive.h});if(rate<67&&n.pre){let from=adaptive.node;adaptive.returnTo=adaptive.returnTo||from;adaptive.node=n.pre;adaptive.qi=0;adaptive.ok=0;adaptive.h=0;head("🌱 必要なところを確認します",child);A.append(e("div","card",`<p><b>${n.title}</b>を進めるために、先に<b>${MATHNODES[n.pre].title}</b>を確認します。</p><p class="tiny">「学年が下がった」という表示ではなく、次につなげる確認として進めます。</p>`));A.append(btn("確認を始める",()=>mathEntry(adaptive.node),"primary"));return}
if(adaptive.returnTo&&adaptive.node!==adaptive.returnTo){let target=adaptive.returnTo;adaptive.node=target;adaptive.returnTo=null;adaptive.qi=0;adaptive.ok=0;adaptive.h=0;head("✨ 元の学習へ戻ります",child);A.append(e("div","card",`<p>必要な内容を確認できました。</p><p><b>${MATHNODES[target].title}</b>へ戻って、もう一度やってみます。</p>`));A.append(btn("元の学習へ戻る",()=>mathEntry(adaptive.node),"primary"));return}
let sec=Math.round((Date.now()-adaptive.start)/1000);records.push({studentId:profile.id,date:new Date().toISOString(),subject:"算数",grade:profile.grade,rate,seconds:sec,hints:adaptive.history.reduce((a,x)=>a+x.hints,0),reads:0,unknown:0,next:rate>=90?"少し発展へ":"定着を確認",process:"学年横断の確認ルート",explanationViews:adaptive.learned||0,togetherViews:adaptive.together||0,adaptivePath:adaptive.history});save();head("✨ 算数の学習経過",child);let path=adaptive.history.map(x=>`${x.title}（${x.rate}%）`).join(" → ");A.append(e("div","card",`<h2>取り組めました</h2><p><b>学習の道すじ</b><br>${path}</p><p>必要な内容を確認しながら、元の学習につなげました。</p><p class="tiny">この経過は保護者・先生の記録にも残ります。</p>`));A.append(btn("🌿 今日はここまで",child,"soft"))}

function e(t,c,h){let x=document.createElement(t);if(c)x.className=c;if(h!==undefined)x.innerHTML=h;return x}
function btn(t,f,c=""){let b=e("button",c,t);b.onclick=f;return b}
function head(t,b){A.innerHTML="";let d=e("div","top");if(b)d.append(btn("← 戻る",b,"back"));d.append(e("h1","",t));A.append(d)}
function save(){localStorage.setItem(RK,JSON.stringify(records))}
function home(){head("🌱 Pono Learning Quest");A.append(e("p","sub","在籍学年を目安にスタートし、理解に合わせて必要なところを確認します。"));A.append(btn("🧒 子ども　今日の学習",child,"primary"));A.append(btn("🏠 保護者　自分の子の学び",parent));A.append(btn("📝 先生・Pono　時間割・提出用",teacher))}
function child(){head("🧒 今日の学習",home);let c=e("div","card",`<h2>${profile.name}</h2><p><b>在籍学年</b></p>`),sel=e("select");for(let g=1;g<=6;g++){let o=e("option","",`小学${g}年`);o.value=g;sel.append(o)}sel.value=profile.grade;sel.onchange=()=>{profile.grade=+sel.value;if(!profile.startGrade)profile.startGrade=profile.grade;localStorage.setItem(SK,JSON.stringify(profile));};c.append(sel);let lab=e("p","",`<b>🌱 学習を始める目安</b>`),sg=e("select");for(let g=1;g<=6;g++){let o=e("option","",`小学${g}年`);o.value=g;sg.append(o)}sg.value=profile.startGrade||profile.grade;sg.onchange=()=>{profile.startGrade=+sg.value;localStorage.setItem(SK,JSON.stringify(profile));};c.append(lab,sg,e("p","tiny","※ここは学力を表すものではありません。最初にどこから確認するかの目安で、あとからいつでも変更できます。"));A.append(c);
let plan=JSON.parse(localStorage.getItem(PK)||"{}"), days=["日","月","火","水","木","金","土"], today=days[new Date().getDay()], tp=plan[today];
if(tp&&tp.off){A.append(e("div","card soft","<h2>🌿 今日はお休み</h2><p>予定は入っていません。やりたい時は下から自由に学習できます。</p>"))}
else if(tp){let items=Array.isArray(tp.items)?tp.items:(tp.s?[{s:tp.s,u:tp.u||"おすすめ単元"}]:[]);if(items.length){let pc=e("div","card good","<h2>🌟 今日のおすすめ</h2><p class='tiny'>予定は目安です。全部やらなくても、予定より進んでも大丈夫です。</p>");items.forEach((it,i)=>pc.append(btn(`▶ ${i+1}. ${it.s}｜${it.u||"おすすめ単元"}`,()=>it.s==="算数"?mathStart():start(it.s),"primary")));A.append(pc)}}
let g=e("div","grid");subs.forEach(s=>g.append(btn(s,()=>s==="算数"?mathStart():start(s))));A.append(g)}
function start(s){subject=s;qi=0;S={ok:0,h:0,r:0,u:0,start:Date.now(),startGrade:profile.grade,route:[]};question()}
function question(){head(`${subject}｜確認`,child);let q=B[subject][qi];if(!q)return finish();A.append(e("div","tiny",`${qi+1}/${B[subject].length}　開始目安：小学${S.startGrade}年`));A.append(e("div","card",`<h2>${q[0]}</h2>`));A.append(btn("🔊 問題をきく",()=>{S.r++;let u=new SpeechSynthesisUtterance(q[0].replaceAll("÷","わる").replaceAll("×","かける"));u.lang="ja-JP";u.rate=.86;speechSynthesis.cancel();speechSynthesis.speak(u)},"soft"));q[1].forEach((x,i)=>A.append(btn(x,()=>answer(i===q[2],q[3]))));A.append(btn("💡 ヒント・説明を見る",()=>help(q[3],false),"soft"));A.append(btn("🌱 わからない・説明を見る",()=>help(q[3],true),"soft"))}
function help(x,unk){S.h++;if(unk)S.u++;document.querySelectorAll(".feedback").forEach(x=>x.remove());A.append(e("div","feedback",`<b>一緒に確認</b><br>${x}<br><span class="tiny">確認してから、もう一度挑戦して大丈夫です。</span>`))}
function answer(ok,x){if(ok){S.ok++;new Audio("correct.wav").play().catch(()=>{});A.append(e("div","feedback","✨ できた！"));setTimeout(()=>{qi++;question()},650)}else{S.h++;A.append(e("div","feedback warn",`🌱 ここを確認してみよう<br><span class="tiny">${x}</span>`))}}
function finish(){let n=B[subject].length,rate=Math.round(S.ok/n*100),sec=Math.round((Date.now()-S.start)/1000);let next=rate>=90&&S.h<=1?"現在の学年を目安に少し発展":rate>=60?"今の内容をもう一度確認":"必要な既習内容を確認してから戻る";let process=S.h? "説明・確認を使って再挑戦":"自力で取り組み";let planned=(()=>{let p=JSON.parse(localStorage.getItem(PK)||"{}"),days=["日","月","火","水","木","金","土"],x=p[days[new Date().getDay()]];if(!x||x.off)return false;let a=Array.isArray(x.items)?x.items:(x.s?[{s:x.s}]:[]);return a.some(it=>it.s===subject)})();records.push({studentId:profile.id,date:new Date().toISOString(),subject,grade:profile.grade,rate,hints:S.h,reads:S.r,unknown:S.u,seconds:sec,next,process,planned:!!planned,progress:rate>=90?"予定より先へ進める状態":rate>=60?"予定内容を定着中":"基礎確認を優先"});save();head("✨ 学習記録",child);let c=e("div","card",`<h2>取り組めました</h2><p>${subject} ${n}問</p><p>${process}</p><p><b>次：</b>${next}</p><p class="tiny">予定は目安です。その日の理解に合わせて進む・確認するを選べます。</p>`);A.append(c);if(rate>=90){A.append(btn("🚀 もう少し進む",()=>start(subject),"primary"));A.append(btn("🌿 今日はここまで",child,"soft"))}else if(rate>=60){A.append(btn("🔁 もう一度やって定着する",()=>start(subject),"primary"));A.append(btn("🌿 今日はここまで",child,"soft"))}else{A.append(btn("🌱 基礎を確認してからもう一度",()=>start(subject),"primary"));A.append(btn("🌿 今日はここまで",child,"soft"))}}
function myRecords(){return records.filter(r=>r.studentId===profile.id)}
function parent(){head("🏠 自分の子の学び",home);let rr=myRecords().slice(-7),last=rr.at(-1),mins=Math.round(rr.reduce((a,r)=>a+r.seconds,0)/60),advanced=rr.filter(r=>r.progress==="予定より先へ進める状態").length,review=rr.filter(r=>r.progress==="基礎確認を優先").length;
A.append(e("div","card",`<h2>${profile.name}の今週</h2><span class="pill">${rr.length}回取り組み</span><span class="pill">約${mins}分</span><p>${!last?"まだ記録はありません。":last.hints?`${last.subject}では、必要な説明を確認しながら再挑戦できました。`:`${last.subject}に自分で取り組めました。`}</p>`));
let route=last&&last.adaptivePath?last.adaptivePath.map(x=>x.title).join(" → "):"";A.append(e("div","card",`<h2>🌱 どんなふうに学べている？</h2><p>${!last?"学習を始めると、ここに学び方の変化が表示されます。":route?`必要な内容を確認しながら学習しました：${route}`:`${last.process} → ${last.next}`}</p><p class="tiny">説明を見る・読み上げを使う・「わからない」と伝える・再挑戦することも、大切な学びの過程として記録します。</p>`));
let movement=!rr.length?"まだ学習記録はありません。":advanced?`おすすめの内容に加えて、さらに進める状態が ${advanced}回ありました。理解できた時は予定で止めず、次の学習へつなげます。`:review?`必要な内容を確認する学習が ${review}回ありました。前の内容に戻ることも、次へつなげるための学びとして記録しています。`:"今の内容を自分のペースで確認しながら進めています。";
A.append(e("div","card",`<h2>✨ 予定からの広がり</h2><p>${movement}</p><p class="tiny">予定どおりかどうかではなく、その日の理解に合わせて「進む・定着する・確認する」を見ています。</p>`));
A.append(e("div","card",`<h2>できるようになってきたこと</h2><p>${growth(rr)}</p>`));
A.append(e("div","card",`<h2>次のおすすめ</h2><p>${last?last.next:"興味のある教科から始めます。"}</p><p class="tiny">本番では、保護者ログインに紐づく自分のお子さんの情報だけを表示します。</p>`))}
function growth(rr){if(!rr.length)return"これからの小さな変化をここに残していきます。";let l=rr.at(-1);if(l.rate>=90&&l.hints<=1)return`${l.subject}では、自力で確認できる内容が増えています。次は定着を確かめながら少し先へ進みます。`;if(l.hints>0)return`${l.subject}では、説明を使いながらもう一度挑戦することができています。自力でできる範囲につなげていきます。`;return`${l.subject}に取り組み、自分のペースで学習を続けています。`}
function teacher(){head("📝 先生・Pono",home);A.append(btn("📅 今週の時間割を作る",plan,"primary"));A.append(btn("👥 生徒の現在地・達成状況",()=>{head("👥 生徒の現在地",teacher);let r=myRecords(),l=r.at(-1);A.append(e("div","card",`<b>${profile.name}</b>｜在籍 小学${profile.grade}年<br><span class="pill">${!l?"未確認":l.rate>=90&&l.hints<=1?"自力でできた":l.hints?"練習中":"取り組み中"}</span><p>${l?`${l.subject}：${l.process}<br>次：${l.next}`:"記録はまだありません。"}</p>`))}));A.append(btn("📄 学校提出用を自動作成",report));A.append(e("p","tiny","試作版はこの端末のブラウザ内保存です。本番では子ども・保護者・先生の認証と権限を分けます。"))}
function plan(){head("📅 今週の時間割",teacher);let saved=JSON.parse(localStorage.getItem(PK)||"{}"),days=["月","火","水","木","金"];
days.forEach((d,di)=>{let c=e("div","card");c.dataset.d=d;c.append(e("h2","",d+"曜日"));
let offLabel=e("label","",`<input type="checkbox" class="off" style="width:auto;margin-right:8px"> 🌿 お休みにする`);let off=offLabel.querySelector("input");off.checked=!!(saved[d]&&saved[d].off);c.append(offLabel);
let area=e("div","slots");c.append(area);
let old=saved[d], initial=old&&Array.isArray(old.items)?old.items:(old&&old.s?[{s:old.s,u:old.u||"おすすめ単元"}]:[{s:subs[di%subs.length],u:"おすすめ単元"}]);
function addSlot(v={s:"国語",u:"おすすめ単元"}){let row=e("div","soft");row.style.padding="10px";row.style.margin="8px 0";let ss=e("select");subs.forEach(x=>{let o=e("option","",x);o.value=x;ss.append(o)});ss.value=v.s||"国語";let u=e("input");u.placeholder="単元・内容";u.value=v.u||"";let del=btn("－ この予定を削除",()=>row.remove());row.append(ss,u,del);area.append(row)}
initial.forEach(addSlot);c.append(btn("＋ 科目を追加",()=>addSlot(),"soft"));off.onchange=()=>{area.style.opacity=off.checked?".35":"1";area.style.pointerEvents=off.checked?"none":"auto"};off.onchange();A.append(c)});
A.append(btn("✓ 今週の予定を保存",()=>{let p={};document.querySelectorAll("[data-d]").forEach(c=>{let d=c.dataset.d,off=c.querySelector(".off").checked;if(off){p[d]={off:true,items:[]};return}let items=[];c.querySelectorAll(".slots>div").forEach(r=>{let ss=r.querySelector("select"),u=r.querySelector("input");items.push({s:ss.value,u:u.value||"おすすめ単元"})});p[d]={off:false,items}});localStorage.setItem(PK,JSON.stringify(p));alert("今週の予定を保存しました")},"primary"))}
function report(){
 head("📄 学校共有用・学習報告",teacher);
 let rr=myRecords().slice().reverse();
 A.append(e("div","card",`<b>${profile.name}</b>｜在籍 小学${profile.grade}年<br><span class="tiny">実際の学習記録を、日時・単元ごとに確認できます。</span>`));
 if(!rr.length){A.append(e("div","card","まだ学習記録がありません。学習するとここに自動で記録されます。"));return}
 let total=Math.round(rr.reduce((a,r)=>a+(Number(r.seconds)||0),0)/60);
 let sum=e("div","card");
 sum.innerHTML=`<h2>学習のまとめ</h2><p><b>取組 ${rr.length}回／約${total}分</b></p><p class="tiny">単元ごとの詳しい記録は下に表示されます。</p>`;
 A.append(sum);
 rr.forEach((r,i)=>{
   let dt=r.date||"日時記録なし", mins=Math.max(1,Math.round((Number(r.seconds)||0)/60));
   let unit=r.unit||r.nodeTitle||r.title||r.next||"学習内容";
   let correct=(r.correct!=null?r.correct:(r.score!=null?r.score:"―"));
   let totalq=(r.total!=null?r.total:"―");
   let status=r.status||((r.result==="ok"||r.ok===true)?"自力でできた":"練習中");
   let supports=[];
   if(Number(r.explain)>0) supports.push(`説明 ${r.explain}回`);
   if(Number(r.together)>0) supports.push(`一緒に ${r.together}回`);
   if(Number(r.hints)>0) supports.push(`ヒント ${r.hints}回`);
   if(Number(r.reads)>0) supports.push(`読み上げ ${r.reads}回`);
   let c=e("div","card learning-detail");
   c.innerHTML=`<h3>${dt}</h3>
   <p><b>${r.subject||"学習"}｜${r.grade?`${r.grade}年相当｜`:""}${unit}</b></p>
   <p>学習時間：約${mins}分</p>
   <p>理解の記録：${totalq!=="―"?`${correct}/${totalq}`:(r.result==="ok"?"正答":"記録あり")}　／　現在：${status}</p>
   <p>学習方法：${supports.length?supports.join("・"):"自分で取り組み"}</p>
   ${r.next?`<p>次の学習：${r.next}</p>`:""}`;
   A.append(c);
 });
 let note=e("div","card generated");
 note.innerHTML="<h2>学校共有用コメント</h2><p class='tiny'>必要な場合だけ追記できます。</p>";
 let ta=e("textarea");
 let subjects=[...new Set(rr.map(r=>r.subject).filter(Boolean))].join("・")||"各教科";
 let independent=rr.filter(r=>r.result==="ok"||r.ok===true||r.status==="自力でできた").length;
 let support=rr.some(r=>Number(r.explain)>0||Number(r.together)>0||Number(r.hints)>0||Number(r.reads)>0);
 let review=rr.some(r=>String(r.next||"").includes("既習")||String(r.adaptivePath||"").includes("既習"));
 let units=[...new Set(rr.map(r=>r.unit||r.nodeTitle||r.title).filter(Boolean))].slice(0,4);
 let unitText=units.length?`主に「${units.join("」「")}」に取り組みました。`:"";
 let draft=`${subjects}の学習に取り組み、記録期間内に${rr.length}回、約${total}分の学習を行いました。${unitText}理解状況を確認しながら、${independent?`自力で取り組めた学習が${independent}回みられました。`:"現在の理解に合わせて学習を進めています。"}${support?"必要に応じて説明・ヒント・読み上げ等を活用し、確認しながら取り組んでいます。":""}${review?"必要な既習内容も確認し、現在の単元につなげています。":""}今後も定着を確認しながら次の学習へ進めます。`;
 ta.defaultValue=draft;
 ta.value=draft;
 ta.textContent=draft;
 ta.rows=8;
 ta.placeholder="";
 note.append(ta,e("p","tiny","※学習記録から自動作成した下書きです。文章をタップして自由に編集できます。"),btn("🖨️ この生徒だけ印刷 / PDF",()=>window.print(),"primary noPrint"));
 A.append(note);
}
home();
