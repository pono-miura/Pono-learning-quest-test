
const student={id:"PONO001",name:"はるさん",grade:3};
const subjects=[
{id:"japanese",icon:"📖",name:"国語",desc:"漢字・ことば・読解"},
{id:"math",icon:"➗",name:"算数",desc:"数・計算・文章題"},
{id:"science",icon:"🔬",name:"理科",desc:"自然を見て考える"},
{id:"social",icon:"🗾",name:"社会",desc:"まち・くらし・仕事"},
{id:"english",icon:"🌎",name:"外国語活動",desc:"聞く・話す・ことば"}
];
const BANK={"japanese": [["漢字・読み", "「深い」の読み方は？", ["ふかい", "あさい", "ながい"], 0, "「深い」は「ふかい」と読みます。"], ["漢字・意味", "「始める」と反対に近い言葉は？", ["続ける", "終える", "集める"], 1, "「始める」に対して「終える」が反対に近い言葉です。"], ["ことば", "「様子」といちばん近い意味は？", ["ものの状態", "ものの数", "ものの名前"], 0, "「様子」は、そのときの状態やありさまを表します。"], ["主語", "「小鳥が木の上で鳴いています。」だれ・何が鳴いていますか？", ["木", "小鳥", "上"], 1, "「小鳥が」が、動作をしているものです。"], ["順序", "「朝ごはんを食べてから、歯をみがきました。」先にしたことは？", ["歯をみがく", "朝ごはんを食べる", "ねる"], 1, "「〜てから」の前が先です。"], ["理由", "雨が強くなったので、傘をさしました。傘をさした理由は？", ["雨が強くなったから", "晴れたから", "風が止んだから"], 0, "「〜ので」の前に理由があります。"], ["気持ち", "大切に育てた花が咲きました。『やった！』と言いました。近い気持ちは？", ["うれしい", "かなしい", "こわい"], 0, "言葉や出来事から気持ちを考えます。"], ["指示語", "「赤いかさと青いかさがあります。わたしはそれを選びました。」『それ』が指すものを考えるとき、何を見る？", ["前の文", "文字の大きさ", "ページ番号"], 0, "指示語は、前後の文とのつながりを見て考えます。"], ["読解", "「公園には大きな木があります。夏には木かげで休む人がいます。」夏に人が休む場所は？", ["木かげ", "池の中", "道路"], 0, "文に書かれている情報を見つけます。"], ["要点", "「アリは食べ物を巣へ運びます。仲間と力を合わせることもあります。」中心に書かれていることは？", ["アリの行動", "空の色", "魚の泳ぎ方"], 0, "何について説明している文章かを考えます。"]], "math": [["かけ算", "6×4 は？", ["20", "24", "28"], 1, "6が4こ分で24です。"], ["わり算", "12÷3 は？", ["3", "4", "6"], 1, "12を3つに同じ数ずつ分けると4です。"], ["わり算", "18このあめを3人に同じ数ずつ分けます。1人分は？", ["5こ", "6こ", "9こ"], 1, "18÷3=6です。"], ["たし算", "368+125 は？", ["483", "493", "503"], 1, "くらいをそろえて計算します。"], ["ひき算", "500-236 は？", ["264", "274", "336"], 0, "500から236をひくと264です。"], ["数", "1000を3こ、100を4こ合わせた数は？", ["3040", "3400", "4300"], 1, "3000+400=3400です。"], ["長さ", "1km は何m？", ["100m", "1000m", "10000m"], 1, "1km=1000mです。"], ["時こく", "9時20分の40分後は？", ["9時50分", "10時00分", "10時20分"], 1, "20分から40分進むと10時ちょうどです。"], ["分数", "1こを4つに同じ大きさに分けた1つ分は？", ["4分の1", "3分の1", "2分の1"], 0, "4等分した1つ分は4分の1です。"], ["文章題", "24本のえんぴつを6人に同じ数ずつ分けます。1人何本？", ["3本", "4本", "6本"], 1, "24÷6=4です。"]], "science": [["植物", "植物のたねが育つとき、まず観察したいものは？", ["芽や葉の変化", "机の色", "時計の形"], 0, "育ち方を比べるには、芽や葉などの変化を見ます。"], ["こん虫", "こん虫の体は、おもにいくつの部分に分かれる？", ["2つ", "3つ", "5つ"], 1, "頭・むね・はらの3つです。"], ["こん虫", "こん虫のあしは、どこについている？", ["頭", "むね", "はら"], 1, "こん虫の6本のあしは、むねについています。"], ["太陽", "晴れた日にできるかげは、何と反対側にできる？", ["太陽", "地面", "風"], 0, "光がさえぎられ、太陽と反対側にかげができます。"], ["かげ", "時間がたつとかげの向きが変わるのは、何の見える位置が変わるから？", ["月", "太陽", "星"], 1, "太陽の見える位置の変化とかげを関係づけます。"], ["光", "鏡ではね返した日光を重ねると、明るさはどうなる？", ["明るくなる", "必ず暗くなる", "なくなる"], 0, "光を重ねると、より明るくなります。"], ["風", "風の強さを調べるとき、比べるとよいものは？", ["物の動き方", "名前の長さ", "紙の色"], 0, "風による物の動き方を比べます。"], ["音", "音が出ている物にそっとふれると、どう感じることがある？", ["ふるえている", "必ず冷たい", "動かない"], 0, "音が出るとき、物が振動していることがあります。"], ["じしゃく", "じしゃくにつきやすいものは？", ["鉄のクリップ", "木のえんぴつ", "紙"], 0, "鉄は磁石につく性質があります。"], ["電気", "かん電池と豆電球をつないで明かりをつけるには？", ["電気の通り道をつなげる", "片方だけつなぐ", "紙で包む"], 0, "電気が通る一続きの回路を作ります。"]], "social": [["まち", "自分たちのまちの様子を調べるとき役立つものは？", ["地図", "体温計", "楽譜"], 0, "地図は場所や広がりを調べるのに役立ちます。"], ["方位", "地図で上を北にしたとき、右はどの方位？", ["西", "東", "南"], 1, "北を上にすると右は東です。"], ["土地利用", "住宅が多く集まっている場所を調べるとき、何を見るとよい？", ["土地の使われ方", "空の色", "人の名前"], 0, "土地がどのように使われているかを見ます。"], ["店", "お店の人が品物を並べ方を工夫する理由として考えやすいのは？", ["買う人が選びやすくするため", "時計を止めるため", "道路を短くするため"], 0, "販売の工夫を、買う人との関係から考えます。"], ["買い物", "家の人が買い物する店を選ぶ理由を調べる方法は？", ["聞き取りをする", "空だけを見る", "じゃんけんする"], 0, "実際に聞くことで理由を調べられます。"], ["農業", "地域で作られる農作物を調べるとき大切なのは？", ["土地や気候との関係", "教室の席順", "鉛筆の本数"], 0, "生産と地域の環境との関わりを考えます。"], ["工場", "工場で働く人の工夫を調べるとき見るとよいものは？", ["仕事の手順や道具", "雲の形だけ", "靴の色だけ"], 0, "仕事の進め方や設備に工夫が表れます。"], ["消防", "火事からくらしを守るために働く人は？", ["消防士", "駅員", "図書館員"], 0, "消防は火災から地域を守る仕事です。"], ["警察", "交通事故を減らすための設備として近いものは？", ["信号機", "黒板", "冷蔵庫"], 0, "信号機などが安全な交通を支えています。"], ["地域", "昔から今へのまちの変化を調べる資料として役立つものは？", ["昔の写真や地図", "今日の給食だけ", "消しゴム"], 0, "時期の違う写真や地図を比べると変化が分かります。"]], "english": [["あいさつ", "朝のあいさつとして合うのは？", ["Good morning.", "Good night.", "Goodbye."], 0, "Good morning. は朝のあいさつです。"], ["気分", "How are you? と聞かれたときの答えとして合うのは？", ["I'm fine.", "Blue.", "Seven."], 0, "気分をたずねる表現への答えです。"], ["数", "英語で「3」は？", ["two", "three", "five"], 1, "3 は three です。"], ["色", "「赤」に合う英語は？", ["red", "blue", "green"], 0, "red は赤です。"], ["色", "「青」に合う英語は？", ["yellow", "blue", "pink"], 1, "blue は青です。"], ["好き", "「りんごが好きです」に近いのは？", ["I like apples.", "I'm ten.", "Good night."], 0, "I like ... で好きなものを伝えられます。"], ["たずねる", "好きなものをたずねる表現に近いのは？", ["What do you like?", "How old are you?", "Good morning."], 0, "What do you like? は好きなものをたずねる表現です。"], ["形", "「丸」に合う英語は？", ["circle", "triangle", "square"], 0, "circle は丸です。"], ["動物", "「ねこ」に合う英語は？", ["dog", "cat", "bird"], 1, "cat はねこです。"], ["やりとり", "友だちに名前をたずねる表現は？", ["What's your name?", "Thank you.", "See you."], 0, "What's your name? で名前をたずねられます。"]]};
const KEY="ponoV6Progress";
const PLANKEY="ponoV7WeeklyPlan";
const NOTEKEY="ponoV7TeacherNotes";
const demoStudents=[
 {id:"PONO001",name:"はるさん",grade:3},
 {id:"PONO002",name:"そらさん",grade:5}
];
const unitOptions={
 japanese:["漢字・ことば","短文読解","理由・気持ち","要点"],
 math:["かけ算の確認","わり算","たし算・ひき算","長さ・時こく","分数","文章題"],
 science:["植物","こん虫","太陽とかげ","光","風と音","じしゃく・電気"],
 social:["まちと地図","店と買い物","農業・工場","消防・警察","地域の変化"],
 english:["あいさつ","数・色","好きなもの","形・動物","かんたんなやりとり"]
};
function weekKey(d=new Date()){const x=new Date(d);x.setHours(0,0,0,0);const day=(x.getDay()+6)%7;x.setDate(x.getDate()-day);return x.toISOString().slice(0,10)}
function getPlans(){try{return JSON.parse(localStorage.getItem(PLANKEY)||"{}")}catch(e){return{}}}
function setPlans(x){localStorage.setItem(PLANKEY,JSON.stringify(x))}
function subjectName(id){return subjects.find(s=>s.id===id)?.name||id}

let state={subject:null,i:0,correct:0,hints:0,reads:0,start:null,answers:[]};
const app=document.getElementById("app");
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
function btn(label,fn,cls=""){const b=document.createElement("button");b.className="btn "+cls;b.textContent=label;b.onclick=fn;return b}
function speechText(t){return String(t).replace(/÷/g," わる ").replace(/×/g," かける ").replace(/＝|=/g," は ").replace(/\+/g," たす ").replace(/−|-/g," ひく ").replace(/。/g,"。 ").replace(/？/g,"？ ")}
function chooseJaVoice(){const v=speechSynthesis.getVoices();return v.find(x=>x.lang==="ja-JP"&&/Google|Kyoko|O-ren|Japanese/i.test(x.name))||v.find(x=>x.lang==="ja-JP")||v.find(x=>x.lang&&x.lang.toLowerCase().startsWith("ja"))}
function speak(t,lang="ja-JP"){if(!("speechSynthesis" in window))return; speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(lang==="ja-JP"?speechText(t):t);u.lang=lang;u.rate=lang==="ja-JP"?.86:.78;u.pitch=1;const v=lang==="ja-JP"?chooseJaVoice():speechSynthesis.getVoices().find(x=>x.lang&&x.lang.toLowerCase().startsWith("en"));if(v)u.voice=v;setTimeout(()=>speechSynthesis.speak(u),60)}
function ping(){const a=new Audio("correct.wav");a.volume=.7;a.play().catch(()=>{})}
function records(){try{return JSON.parse(localStorage.getItem(KEY)||"[]")}catch(e){return[]}}
function save(r){const x=records();x.unshift(r);localStorage.setItem(KEY,JSON.stringify(x.slice(0,100)))}
function shell(title,sub=""){app.innerHTML=`<header><h1>🌱 ${title}</h1>${sub?`<p>${esc(sub)}</p>`:""}</header><section id="view"></section>`;return document.getElementById("view")}
function home(){const v=shell("Pono Learning Quest","自分に合うところから、少しずつ学べます。");v.append(btn("🧒 子ども　今日の学習・5分野","", "role"));v.lastChild.onclick=studentHome;v.append(btn("🏠 保護者　今の学習・できたこと","", "role"));v.lastChild.onclick=parentHome;v.append(btn("📝 先生・Pono　学習経過・学校共有","", "role"));v.lastChild.onclick=teacherHome}
function studentHome(){
 const v=shell("まなぶ",`${student.name}｜在籍 小学${student.grade}年`);
 const plans=getPlans(), wk=weekKey(), mine=(plans[wk]||{})[student.id]||{};
 const names=["月","火","水","木","金"]; const di=(new Date().getDay()+6)%7;
 const today=di<5?(mine[di]||[]):[];
 const q=document.createElement("div");q.className="card today";
 q.innerHTML=`<h2>🌟 今日のクエスト</h2>${today.length?today.map(x=>`<p><b>${esc(subjectName(x.subject))}</b>｜${esc(x.unit)}</p>`).join(""):"<p>今日は自由に選んで学べます。</p>"}<small>予定は「おすすめ」です。別の学習を選んでも大丈夫。</small>`;
 v.append(q);
 today.forEach(x=>{const b=btn(`▶ ${subjectName(x.subject)}をはじめる`,()=>startSubject(x.subject),"subject");v.append(b)});
 const h=document.createElement("h2");h.textContent="5分野から選ぶ";v.append(h);
 subjects.forEach(s=>v.append(btn(`${s.icon} ${s.name}　${s.desc}`,()=>startSubject(s.id),"subject")));
 v.append(btn("← もどる",home,"sub"));
}
function startSubject(id){state={subject:id,i:0,correct:0,hints:0,reads:0,start:Date.now(),answers:[]};question()}
function question(){const s=subjects.find(x=>x.id===state.subject), qs=BANK[state.subject], q=qs[state.i];const v=shell(`${s.icon} ${s.name}`,`小学3年｜${state.i+1} / ${qs.length}｜${q[0]}`);
 const card=document.createElement("div");card.className="card";card.innerHTML=`<div class="step">③ 自分でやる</div><h2>${esc(q[1])}</h2>`;v.append(card);
 const listen=btn("🔊 問題をきく",()=>{state.reads++;speak(q[1],state.subject==="english"&&/^[A-Za-z]/.test(q[1])?"en-US":"ja-JP")},"listen");v.append(listen);
 q[2].forEach((c,n)=>v.append(btn(c,()=>answer(n,q[3],q[4]),"choice")));
 v.append(btn("💡 ヒント・説明を見る",()=>{state.hints++;showHint(q[4])},"hint"));
 v.append(btn("🌱 わからない・説明を見る",()=>{state.hints++;showHint(q[4])},"sub"));
}
function showHint(t){let box=document.getElementById("hintbox");if(!box){box=document.createElement("div");box.id="hintbox";box.className="hintbox";document.getElementById("view").append(box)}box.innerHTML=`<b>一緒に確認しよう</b><p>${esc(t)}</p>`}
function answer(n,a,explain){const ok=n===a;state.answers.push(ok);if(ok)ping();document.querySelectorAll(".choice").forEach(b=>b.disabled=true);const f=document.createElement("div");f.className="feedback "+(ok?"good":"retry");f.textContent=ok?"✨ できた！":"🌱 一緒に確認して次へ";document.getElementById("view").append(f);if(ok)state.correct++;setTimeout(()=>{state.i++;state.i<BANK[state.subject].length?question():finish()},ok?800:1050)}
function finish(){const s=subjects.find(x=>x.id===state.subject),sec=Math.max(1,Math.round((Date.now()-state.start)/1000));save({date:new Date().toLocaleDateString("ja-JP"),subject:s.name,result:`${state.correct}/10`,hints:state.hints,reads:state.reads,seconds:sec});const v=shell("できたこと",`${s.icon} ${s.name}`);v.innerHTML=`<div class="card"><h2>${state.correct} / 10</h2><p>ヒント・説明：${state.hints}回</p><p>読み上げ：${state.reads}回</p><p>学習時間：約${Math.ceil(sec/60)}分</p><p>点数だけでなく、どんな方法なら学びやすいかも大切な記録です。</p></div>`;v.append(btn("5分野にもどる",studentHome));}
function parentHome(){const rs=records(),v=shell("保護者",`${student.name}｜小学${student.grade}年`);v.innerHTML=`<div class="card"><h2>できたこと</h2>${rs.length?`<p>最新：${esc(rs[0].date)}　${esc(rs[0].subject)}　${esc(rs[0].result)}</p><p>ヒント ${rs[0].hints}回／読み上げ ${rs[0].reads}回</p>`:"<p>まだ学習記録はありません。</p>"}<p>正答だけでなく、説明・読み上げなど「学びやすかった方法」も見ていきます。</p></div>`;v.append(btn("← もどる",home,"sub"))}
function teacherHome(){
 const v=shell("先生・Pono","予定づくり → 学習 → 現在地 → 個別共有");
 const top=document.createElement("div");top.className="card";
 top.innerHTML="<h2>今週の操作</h2><p>ゼロから入力せず、コピー・おすすめ・必要な所だけ変更できます。</p>";
 top.append(btn("📅 今週の時間割を作る",weeklyPlanner,"role"));
 top.append(btn("👥 生徒一覧・達成状況",studentList,"role"));
 v.append(top);v.append(btn("← もどる",home,"sub"));
}
function weeklyPlanner(){
 const wk=weekKey(),plans=getPlans();plans[wk]=plans[wk]||{};
 const v=shell("今週の時間割",`${wk} からの1週間`);
 const controls=document.createElement("div");controls.className="card";
 controls.innerHTML=`<label>生徒</label><select id="planstudent">${demoStudents.map(s=>`<option value="${s.id}">${s.name}｜小${s.grade}</option>`).join("")}</select>`;
 controls.append(btn("✨ おすすめを自動作成",()=>autoPlan(),"role"));
 controls.append(btn("📋 先週をコピー",()=>copyPrevious(),"role"));
 v.append(controls);
 const grid=document.createElement("div");grid.id="planGrid";v.append(grid);
 document.getElementById("planstudent").onchange=renderPlanGrid;renderPlanGrid();
 v.append(btn("✓ この内容で保存",()=>{saveGrid();feedbackSimple("保存しました。子どもの「今日のクエスト」に反映されます。")},"role"));
 v.append(btn("← 先生画面",teacherHome,"sub"));
}
function renderPlanGrid(){
 const sid=document.getElementById("planstudent").value,wk=weekKey(),plans=getPlans();const arr=(plans[wk]||{})[sid]||[[],[],[],[],[]];
 const g=document.getElementById("planGrid");g.innerHTML="";
 ["月","火","水","木","金"].forEach((d,i)=>{
  const cur=(arr[i]&&arr[i][0])||{subject:"japanese",unit:"漢字・ことば"};
  const c=document.createElement("div");c.className="card daycard";c.dataset.day=i;
  c.innerHTML=`<h3>${d}曜日</h3><label>分野</label><select class="psub">${subjects.map(s=>`<option value="${s.id}" ${s.id===cur.subject?"selected":""}>${s.name}</option>`).join("")}</select><label>単元</label><select class="punit"></select>`;
  g.append(c);const ss=c.querySelector(".psub"),uu=c.querySelector(".punit");
  const fill=()=>{uu.innerHTML=unitOptions[ss.value].map(x=>`<option ${x===cur.unit?"selected":""}>${x}</option>`).join("")};ss.onchange=()=>{cur.unit="";fill()};fill();
 });
}
function saveGrid(){
 const sid=document.getElementById("planstudent").value,wk=weekKey(),plans=getPlans();plans[wk]=plans[wk]||{};
 plans[wk][sid]=[...document.querySelectorAll(".daycard")].map(c=>[{subject:c.querySelector(".psub").value,unit:c.querySelector(".punit").value}]);setPlans(plans);
}
function autoPlan(){
 const sid=document.getElementById("planstudent").value,wk=weekKey(),plans=getPlans();plans[wk]=plans[wk]||{};
 const seq=[["japanese","短文読解"],["math","わり算"],["science","植物"],["social","まちと地図"],["english","あいさつ"]];
 plans[wk][sid]=seq.map(x=>[{subject:x[0],unit:x[1]}]);setPlans(plans);renderPlanGrid();
}
function copyPrevious(){
 const sid=document.getElementById("planstudent").value,wk=weekKey(),prev=new Date(wk);prev.setDate(prev.getDate()-7);const pk=weekKey(prev),plans=getPlans();
 if(plans[pk]?.[sid]){plans[wk]=plans[wk]||{};plans[wk][sid]=JSON.parse(JSON.stringify(plans[pk][sid]));setPlans(plans);renderPlanGrid()}
 else feedbackSimple("先週の予定はまだありません。");
}
function feedbackSimple(t){let f=document.getElementById("simplefb");if(!f){f=document.createElement("div");f.id="simplefb";f.className="feedback good";document.getElementById("view").prepend(f)}f.textContent=t;setTimeout(()=>f.remove(),1800)}
function statusFor(s){
 const rs=records().filter(r=>s.id===student.id); if(!rs.length)return "未実施";
 const latest=rs[0];const n=Number(String(latest.result).split("/")[0]||0);
 if(n>=9&&latest.hints===0)return "定着確認へ";
 if(n>=7)return "自力で確認";
 return "取り組み中";
}
function studentList(){
 const v=shell("生徒一覧・達成状況","予定どおりかではなく、今どこにいるかを確認します。");
 demoStudents.forEach(s=>{const c=document.createElement("div");c.className="card studentrow";c.innerHTML=`<h3>${esc(s.name)} <small>小${s.grade}</small></h3><p>現在地：<b>${statusFor(s)}</b></p>`;c.append(btn("個別記録・印刷",()=>individualReport(s),"sub"));v.append(c)});
 v.append(btn("← 先生画面",teacherHome,"sub"));
}
function individualReport(s){
 const rs=s.id===student.id?records():[],v=shell("個別学習レポート",`${s.name}｜小学${s.grade}年`);
 const c=document.createElement("div");c.className="card report";
 c.innerHTML=`<h2>${esc(s.name)} 学習経過</h2><p>現在地：${statusFor(s)}</p><table><tr><th>日付</th><th>分野</th><th>確認</th><th>説明</th><th>読み</th></tr>${rs.slice(0,15).map(r=>`<tr><td>${esc(r.date)}</td><td>${esc(r.subject)}</td><td>${esc(r.result)}</td><td>${r.hints}</td><td>${r.reads}</td></tr>`).join("")||"<tr><td colspan=5>まだ記録はありません</td></tr>"}</table><label>学校で今取り組んでいる単元</label><input id="schoolunit" placeholder="例：わり算"><label>Ponoからの共有・次の学習</label><textarea id="note" rows="6" placeholder="学びやすかった方法や次の見通しを記入"></textarea>`;
 v.append(c);v.append(btn("🖨️ この生徒だけ印刷 / PDF",()=>window.print(),"role"));v.append(btn("← 生徒一覧",studentList,"sub"));
}
home();
