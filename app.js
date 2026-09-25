
const A=document.getElementById("app");
const RK="ponoV8Records", PK="ponoV8Plans";
const student={id:"PONO001",name:"はるさん",grade:3};
const students=[student,{id:"PONO002",name:"そらさん",grade:5}];
const subjects=["国語","算数","理科","社会","外国語活動"];
let records=JSON.parse(localStorage.getItem(RK)||"[]"), currentSubject="", qIndex=0, session={correct:0,hints:0,reads:0,unknown:0,start:0,level:"確認"};
const banks={
"国語":[
["「森」の読みは？",["もり","うみ","そら"],0,"漢字の読みを確認しました。"],
["「うれしい」に近い気持ちは？",["かなしい","よろこぶ","おこる"],1,"ことばの意味を確認しました。"],
["『雨が降ったので、傘をさした。』傘をさした理由は？",["雨が降ったから","暑いから","風がないから"],0,"文の中から理由を見つけます。"],
["『朝ごはんを食べてから学校へ行った。』先にしたことは？",["学校へ行く","朝ごはんを食べる","帰る"],1,"出来事の順序を読み取ります。"],
["『ゆうたさんはプレゼントをもらい、にっこりしました。』気持ちは？",["うれしい","こわい","かなしい"],0,"行動から気持ちを考えます。"],
["『犬は走りました。それは公園まで続きました。』「それ」が指すものとして近いのは？",["犬","走ること","公園"],1,"指示語を前の文と結びつけます。"],
["文章の大事なところを短くまとめたものは？",["題名","要旨","文字"],1,"文章の中心を捉える練習です。"],
["『花に水をやると、元気になった。』何が元気になった？",["水","花","人"],1,"主語と内容を確認します。"],
["『本を読み終えて、感想を書いた。』後にしたことは？",["本を読む","感想を書く","本を買う"],1,"順序を確認します。"],
["分からない言葉が出た時の方法としてよいものは？",["前後の文も読む","すぐ終わる","飛ばして答える"],0,"文脈から考える方法を確認します。"]],
"算数":[
["6×4は？",["20","24","28"],1,"九九はわり算の土台になります。"],
["12÷3は？",["3","4","6"],1,"同じ数ずつ分ける考え方です。"],
["15個を5人で同じ数ずつ分けると1人何個？",["2個","3個","5個"],1,"わり算を場面と結びつけます。"],
["36÷6は？",["5","6","7"],1,"九九を使って商を求めます。"],
["25+17は？",["32","42","52"],1,"たし算を確認します。"],
["52-28は？",["24","34","44"],0,"ひき算を確認します。"],
["300+40+5で表す数は？",["345","354","435"],0,"位のしくみを確認します。"],
["1mは何cm？",["10cm","100cm","1000cm"],1,"長さの単位を確認します。"],
["1時間は何分？",["30分","60分","100分"],1,"時間の単位を確認します。"],
["1/2と同じ意味に近いものは？",["2つに同じように分けた1つ分","3つに分けた1つ分","全部"],0,"分数の意味を確認します。"]],
"理科":[
["植物が育つために大切なものは？",["光や水","石だけ","音だけ"],0,"植物の育ちを観察します。"],
["昆虫のあしは何本？",["4本","6本","8本"],1,"昆虫の体のつくりを確認します。"],
["太陽が動いて見えると、かげは？",["位置が変わる","消えない","同じ場所だけ"],0,"太陽とかげの関係です。"],
["鏡ではね返った光は？",["進む向きが変わる","なくなる","重くなる"],0,"光の性質を確認します。"],
["風が強くなると風車は一般に？",["回りやすくなる","止まる","小さくなる"],0,"風の力を比べます。"],
["音が出ている物に触れると感じることがあるのは？",["ふるえ","冷たさだけ","重さ"],0,"音と振動を結びつけます。"],
["磁石につきやすいものは？",["鉄","紙","木"],0,"磁石の性質を確認します。"],
["豆電球を光らせるのに必要なのは？",["回路がつながること","紙だけ","水だけ"],0,"電気の通り道を確認します。"],
["植物の根の主な役割の一つは？",["水を吸う","音を出す","光る"],0,"植物の体の働きを確認します。"],
["チョウの育ち方で、たまごの次は？",["幼虫","成虫","さなぎ"],0,"昆虫の育ちを順序で確認します。"]],
"社会":[
["地図で方位を知るために使うものは？",["方位記号","温度計","時計だけ"],0,"地図の基本を確認します。"],
["一般的な地図で上を北とすると右は？",["東","西","南"],0,"方位を確認します。"],
["地域の土地の使われ方を調べる方法は？",["地図や現地観察","想像だけ","何も見ない"],0,"地域調査の方法です。"],
["店で働く人の工夫を知るには？",["見学や聞き取り","寝る","数えない"],0,"仕事の工夫を調べます。"],
["買い物で品物を選ぶ時に見るものの例は？",["値段や産地","空の色だけ","靴の数"],0,"消費生活と結びつけます。"],
["農家の仕事を知る資料として役立つのは？",["写真や聞き取り","音楽だけ","ゲームだけ"],0,"生産の仕事を調べます。"],
["工場では何を考えて製品を作る？",["品質や安全、効率","天気だけ","名前だけ"],0,"生産の工夫を考えます。"],
["火事の時に活動する機関は？",["消防","図書館","郵便局"],0,"地域の安全を守る仕組みです。"],
["事件や事故から地域を守る活動に関わるのは？",["警察","水族館","美術館"],0,"地域の安全を確認します。"],
["昔と今の地域を比べる時に役立つものは？",["古い写真や地図","未来の想像だけ","白紙"],0,"地域の変化を資料から読み取ります。"]],
"外国語活動":[
["Hello. に近いあいさつは？",["こんにちは","さようなら","ありがとうだけ"],0,"基本のあいさつです。"],
["How are you? に答える例は？",["I'm fine.","Good night.","Red."],0,"気分を伝える表現です。"],
["three はいくつ？",["2","3","4"],1,"数の表現です。"],
["red は何色？",["赤","青","緑"],0,"色の表現です。"],
["I like apples. の意味に近いのは？",["りんごが好きです","りんごを見ません","りんごは青です"],0,"好きなものを伝えます。"],
["好きなものをたずねる表現は？",["What do you like?","How old are you?","Good morning."],0,"好みをたずねます。"],
["circle はどの形？",["丸","三角","四角"],0,"形の表現です。"],
["dog は？",["犬","猫","鳥"],0,"動物の表現です。"],
["My name is Ken. は？",["私の名前はケンです","私は3歳です","犬が好きです"],0,"名前を伝える表現です。"],
["Good morning. を使う場面は？",["朝のあいさつ","夜の別れ","数を聞く"],0,"場面に合うあいさつです。"]]
};
function save(){localStorage.setItem(RK,JSON.stringify(records))}
function el(tag,cls,html){let x=document.createElement(tag);if(cls)x.className=cls;if(html!==undefined)x.innerHTML=html;return x}
function button(t,fn,cls=""){let b=el("button",cls,t);b.onclick=fn;return b}
function header(title,back){A.innerHTML="";let d=el("div","top");if(back)d.append(button("← 戻る",back,"back"));d.append(el("h1","",title));A.append(d)}
function home(){header("🌱 Pono Learning Quest");A.append(el("p","sub","学年だけで決めず、その子の今に合うところから学びます。"));A.append(button("🧒 子ども　今日の学習",studentHome,"primary"));A.append(button("🏠 保護者　学びのようす",parentHome));A.append(button("📝 先生・Pono　時間割・提出用",teacherHome))}
function studentHome(){header("🧒 今日の学習",home);A.append(el("div","card",`<b>${student.name}</b>｜在籍 小学${student.grade}年<br><span class="tiny">必要なところに戻っても大丈夫。できたところから次へつなげます。</span>`));let g=el("div","grid");subjects.forEach(s=>g.append(button(s,()=>startSubject(s))));A.append(g)}
function startSubject(s){currentSubject=s;qIndex=0;session={correct:0,hints:0,reads:0,unknown:0,start:Date.now(),level:initialLevel(s)};question()}
function initialLevel(s){let rr=records.filter(r=>r.studentId===student.id&&r.subject===s).slice(-3);if(rr.length>=2&&rr.every(r=>r.rate>=80&&r.hints<=1))return"標準";return"確認"}
function speak(t,lang="ja-JP"){session.reads++;let u=new SpeechSynthesisUtterance(t.replaceAll("÷","わる").replaceAll("×","かける").replaceAll("=","は"));u.lang=lang;u.rate=.86;speechSynthesis.cancel();speechSynthesis.speak(u)}
function question(){header(`${currentSubject}｜${session.level}`,studentHome);let qs=banks[currentSubject], q=qs[qIndex];if(!q)return finish();A.append(el("div","tiny",`${qIndex+1} / ${qs.length}`));A.append(el("div","card",`<h2>${q[0]}</h2>`));A.append(button("🔊 問題をきく",()=>speak(q[0],currentSubject==="外国語活動"?"ja-JP":"ja-JP"),"soft"));q[1].forEach((c,i)=>A.append(button(c,()=>answer(i===q[2],q[3]))));A.append(button("💡 ヒント・説明を見る",()=>{session.hints++;showHelp(q[3])},"soft"));A.append(button("🌱 わからない・説明を見る",()=>{session.unknown++;session.hints++;showHelp(q[3])},"soft"))}
function showHelp(t){let old=document.querySelector(".feedback");if(old)old.remove();let d=el("div","feedback",`<b>一緒に確認</b><br>${t}<br><span class="tiny">説明を見てから、もう一度選んで大丈夫です。</span>`);A.append(d)}
function answer(ok,exp){if(ok){session.correct++;let a=new Audio("correct.wav");a.play().catch(()=>{});let d=el("div","feedback","✨ できた！");A.append(d);setTimeout(()=>{qIndex++;question()},700)}else{session.hints++;let d=el("div","feedback warn",`🌱 もう一度確認してみよう<br><span class="tiny">${exp}</span>`);A.append(d)}}
function finish(){let total=banks[currentSubject].length, rate=Math.round(session.correct/total*100), sec=Math.round((Date.now()-session.start)/1000);let level=rate>=90&&session.hints<=2?"次は少し発展":rate>=70?"今の内容を定着":"必要な基礎を確認";records.push({studentId:student.id,date:new Date().toISOString(),subject:currentSubject,unit:unitName(currentSubject),grade:student.grade,rate,hints:session.hints,reads:session.reads,unknown:session.unknown,seconds:sec,level:session.level,next:level});save();header("✨ 今日の学習",studentHome);A.append(el("div","card",`<h2>取り組めました</h2><p>${currentSubject}：${total}問</p><p>自分で確認できた問題 ${session.correct}問</p><p>学習時間 約${Math.max(1,Math.round(sec/60))}分</p><p><b>次：</b>${level}</p><span class="tiny">説明や読み上げを使うことも、その子に合った学び方として記録します。</span>`))}
function unitName(s){return {"国語":"ことば・読解","算数":"基礎計算・わり算","理科":"身近な自然と科学","社会":"まちとくらし","外国語活動":"ことばに親しむ"}[s]}
function parentHome(){header("🏠 学びのようす",home);let rr=records.filter(r=>r.studentId===student.id);let recent=rr.slice(-7);let mins=Math.round(recent.reduce((a,r)=>a+r.seconds,0)/60);A.append(el("div","card",`<h2>${student.name}の今週のようす</h2><span class="pill">${recent.length}回取り組み</span><span class="pill">約${mins}分</span><p>${parentSummary(recent)}</p>`));A.append(el("div","card",`<h2>🌱 学び方の変化</h2>${growthText(recent)}<p class="tiny">点数だけでなく、説明・読み上げ・再挑戦なども学びの過程として見ています。</p>`));A.append(el("div","card",`<h2>次のおすすめ</h2><p>${recent.length?recent[recent.length-1].next:"まずは興味のある教科から始めてみます。"}</p>`))}
function parentSummary(r){if(!r.length)return"まだ記録はありません。取り組み始めた時から、小さな変化も残していきます。";let last=r[r.length-1];if(last.hints>0)return`${last.subject}では、必要な説明を確認しながら取り組めました。「分からない時に確認して、もう一度やる」ことも大切な学びです。`;return`${last.subject}に取り組み、自分で確認できる問題が増えています。`}
function growthText(r){if(!r.length)return"<p>学習を始めると、ここに「説明から→ヒントで→自力で→定着」の変化が表示されます。</p>";let l=r[r.length-1];let stage=l.rate>=90&&l.hints<=2?"自力でできた → 定着確認へ":l.hints>0?"説明を確認 → 再挑戦中":"自力で取り組み中";return `<p><b>${l.subject}</b>：${stage}</p><p>在籍学年に固定せず、必要な内容を確認して次につなげます。</p>`}
function teacherHome(){header("📝 先生・Pono",home);A.append(button("📅 今週の時間割を作る",planner,"primary"));A.append(button("👥 生徒一覧・達成状況",studentList));A.append(button("📄 学校提出用を自動作成",reportBuilder));A.append(el("p","tiny","※この試作版の記録は、このブラウザ内だけに保存されます。実名などの個人情報は入力しないでください。"))}
function planner(){header("📅 今週の時間割",teacherHome);let plan=JSON.parse(localStorage.getItem(PK)||"{}");A.append(el("div","card","<b>先生の入力は最小限</b><br><span class='tiny'>おすすめを作成し、必要なところだけ変更できます。</span>"));["月","火","水","木","金"].forEach((d,i)=>{let box=el("div","card");box.append(el("b","",d+"曜日"));let s=el("select");subjects.forEach(x=>{let o=el("option","",x);s.append(o)});s.value=(plan[d]||{}).subject||subjects[i];let inp=el("input");inp.value=(plan[d]||{}).unit||unitName(s.value);s.onchange=()=>inp.value=unitName(s.value);box.append(s,inp);box.dataset.day=d;A.append(box)});A.append(button("✓ この内容で保存",()=>{let p={};document.querySelectorAll("[data-day]").forEach(b=>{p[b.dataset.day]={subject:b.querySelector("select").value,unit:b.querySelector("input").value}});localStorage.setItem(PK,JSON.stringify(p));alert("保存しました")},"primary"))}
function studentList(){header("👥 生徒一覧・達成状況",teacherHome);students.forEach(s=>{let rr=s.id===student.id?records.filter(r=>r.studentId===s.id):[];let status=!rr.length?"未確認":rr.at(-1).rate>=90&&rr.at(-1).hints<=2?"自力でできた":rr.at(-1).hints>0?"練習中":"取り組み中";A.append(el("div","card",`<b>${s.name}</b>｜在籍 小学${s.grade}年<br><span class="pill">${status}</span><p class="tiny">${rr.length?rr.at(-1).subject+"："+rr.at(-1).next:"学習記録はまだありません"}</p>`))})}
function reportBuilder(){header("📄 学校提出用",teacherHome);let rr=records.filter(r=>r.studentId===student.id);let latest=rr.slice(-20);A.append(el("div","card",`<b>${student.name}</b>｜在籍 小学${student.grade}年<br><span class="tiny">学習記録から下書きを自動作成します。</span>`));let period=el("select");["直近1週間","直近1か月","全期間"].forEach(x=>period.append(el("option","",x)));A.append(period);A.append(button("✨ 提出用の下書きを自動作成",()=>renderReport(latest),"primary"));A.append(el("p","tiny","必要なら作成後に一言だけ修正できます。"))}
function renderReport(rr){document.querySelectorAll(".generated").forEach(x=>x.remove());let d=el("div","card generated");let total=rr.length, mins=Math.round(rr.reduce((a,r)=>a+r.seconds,0)/60), subs=[...new Set(rr.map(r=>r.subject))].join("・")||"―";let back=rr.some(r=>r.next==="必要な基礎を確認");let txt=total?`本人の理解状況に合わせて${subs}に取り組んだ。${back?"必要に応じて既習内容を確認し、基礎事項を整理しながら学習を進めている。":"現在の理解を確認しながら、自力で取り組める範囲を広げている。"} 説明や読み上げ等も必要に応じて活用し、分からない時に確認して再挑戦する過程もみられた。`:"期間内の学習記録はまだありません。";d.innerHTML=`<h2>学習経過・学校共有用</h2><p><b>在籍：</b>小学${student.grade}年　<b>取組：</b>${total}回／約${mins}分</p><p><b>教科：</b>${subs}</p><p><b>学習の経過</b></p>`;let ta=el("textarea");ta.value=txt;d.append(ta);let sel=el("select");["継続して取り組む","既習内容を確認しながら進める","理解が安定してきている","読み上げ等を活用すると理解しやすい"].forEach(x=>sel.append(el("option","",x)));d.append(el("p","","<b>次の学習・共有事項</b>"),sel);d.append(button("🖨️ この生徒だけ印刷 / PDF",()=>window.print(),"primary noPrint"));A.append(d)}
home();
