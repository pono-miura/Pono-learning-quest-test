
/* v23.7 外国語活動3・4年＋外国語5・6年
   Ponoオリジナル例文・問題。音声中心→高学年で読む/書くへ段階接続。 */
TEXTBOOK_MAP["外国語"][3]=[
 "Hello! あいさつをして友だちになろう","How are you? ごきげんいかが？","How many? 数えてあそぼう",
 "I like blue. すきなものをつたえよう","What do you like? 何がすき？","ALPHABET アルファベットとなかよし",
 "This is for you. カードをおくろう","What's this? これなあに？","Who are you? きみはだれ？"
];
TEXTBOOK_MAP["外国語"][4]=[
 "Hello, world! 世界のいろいろなことばであいさつ","Let's play cards. すきな遊びをつたえよう",
 "I like Mondays. すきな曜日は何かな？","What time is it? 今、何時？","Do you have a pen? おすすめの文房具セット",
 "Alphabet アルファベットで文字遊び","What do you want? ほしいものは何かな？",
 "This is my favorite place. お気に入りの場所をしょうかい","This is my day. ぼく・わたしの一日"
];

const ENG237={
"Hello! あいさつをして友だちになろう":{goal:"英語のあいさつを聞いて、まねして言ってみよう。",scene:"👋 🙂 ↔ 🙂",words:["Hello.","Hi.","Good morning.","Goodbye."],model:"Hello! I'm Hana. Nice to meet you.",q:["「こんにちは」に近いあいさつは？",["Hello!","Goodbye.","Thank you."],0]},
"How are you? ごきげんいかが？":{goal:"気分をたずねたり、今の気分を伝えたりしよう。",scene:"🙂 How are you?　😊 I'm happy.",words:["How are you?","I'm happy.","I'm fine.","I'm sleepy."],model:"How are you? — I'm fine.",q:["気分をたずねるのは？",["How are you?","How many?","What's this?"],0]},
"How many? 数えてあそぼう":{goal:"1から20くらいまでの数を聞いたり、数えたりしよう。",scene:"🍎🍎🍎　→ three",words:["one","two","three","ten","How many?"],model:"How many apples? — Three.",q:["🍎が3こ。英語では？",["three","five","ten"],0]},
"I like blue. すきなものをつたえよう":{goal:"色やスポーツなど、好きなものを伝えよう。",scene:"💙 → I like blue.",words:["I like ...","blue","red","soccer"],model:"I like blue. I like soccer.",q:["「青が好き」は？",["I like blue.","I am blue.","Blue time."],0]},
"What do you like? 何がすき？":{goal:"相手の好きなものをたずね、答えを聞こう。",scene:"🙂 What do you like?　🍓 I like strawberries.",words:["What do you like?","I like ...","food","sport"],model:"What do you like? — I like soccer.",q:["好きなものをたずねるのは？",["What do you like?","What time is it?","Who are you?"],0]},
"ALPHABET アルファベットとなかよし":{goal:"アルファベットの大文字の形や名前に親しもう。",scene:"A B C　🔊",words:["A","B","C","D","E"],model:"A, B, C.",q:["Aの次は？",["B","D","Z"],0]},
"This is for you. カードをおくろう":{goal:"形や色を表すことばを使ってカードを作り、渡そう。",scene:"💌 → This is for you.",words:["This is for you.","Thank you.","circle","star"],model:"This is for you. — Thank you!",q:["カードを渡すときに使えるのは？",["This is for you.","How many?","Good night."],0]},
"What's this? これなあに？":{goal:"身近なものを見て「これは何？」とたずねよう。",scene:"🎁 ? → What's this?",words:["What's this?","It's a ...","hint"],model:"What's this? — It's a book.",q:["「これは何？」は？",["What's this?","Who are you?","How are you?"],0]},
"Who are you? きみはだれ？":{goal:"物語の登場人物になったつもりで、だれかをたずねたり答えたりしよう。",scene:"🎭 Who are you?　→ I'm ...",words:["Who are you?","I'm ...","Are you ...?"],model:"Who are you? — I'm a rabbit.",q:["「あなたはだれ？」は？",["Who are you?","What time?","How many?"],0]},

"Hello, world! 世界のいろいろなことばであいさつ":{goal:"世界にはいろいろなあいさつがあることに気づき、英語でもあいさつしよう。",scene:"🌏 👋 Hello!",words:["Hello.","Good morning.","Nice to meet you."],model:"Hello! Nice to meet you.",q:["初めて会った人への表現として使えるのは？",["Nice to meet you.","What time is it?","I want a pen."],0]},
"Let's play cards. すきな遊びをつたえよう":{goal:"好きな遊びをたずねたり、いっしょにしようと誘ったりしよう。",scene:"🃏 🎲 → Let's play!",words:["Let's play ...","Do you like ...?","Yes, I do."],model:"Let's play cards.",q:["「カードで遊ぼう」は？",["Let's play cards.","I have cards.","What cards?"],0]},
"I like Mondays. すきな曜日は何かな？":{goal:"曜日を聞いて、好きな曜日と理由を伝えよう。",scene:"📅 Monday → I like Mondays.",words:["Monday","Tuesday","I like ...","Why?"],model:"I like Mondays. I play soccer.",q:["「月曜日が好き」は？",["I like Mondays.","I am Monday.","Monday time."],0]},
"What time is it? 今、何時？":{goal:"時刻をたずねたり、答えたりしよう。",scene:"🕒 → It's three.",words:["What time is it?","It's three.","a.m.","p.m."],model:"What time is it? — It's seven.",q:["時刻をたずねるのは？",["What time is it?","What do you want?","Where is it?"],0]},
"Do you have a pen? おすすめの文房具セット":{goal:"持っている文房具をたずねたり答えたりしよう。",scene:"✏️ 📏 🎒",words:["Do you have ...?","Yes, I do.","No, I don't.","pen"],model:"Do you have a pen? — Yes, I do.",q:["ペンを持っているかたずねるのは？",["Do you have a pen?","I like a pen.","Where is a pen?"],0]},
"Alphabet アルファベットで文字遊び":{goal:"身の回りのアルファベットを見つけ、大文字と小文字に親しもう。",scene:"A a　B b　C c",words:["A / a","B / b","C / c","letter"],model:"A and a.",q:["Bに対応する小文字は？",["b","d","p"],0]},
"What do you want? ほしいものは何かな？":{goal:"ほしいものをたずねたり、伝えたりしよう。",scene:"🛍️ What do you want? → 🍎",words:["What do you want?","I want ...","please"],model:"What do you want? — I want an apple.",q:["「りんごがほしい」は？",["I want an apple.","I like Monday.","I am an apple."],0]},
"This is my favorite place. お気に入りの場所をしょうかい":{goal:"学校や地域のお気に入りの場所を紹介しよう。",scene:"🏫 → My favorite place is ...",words:["My favorite place is ...","school","library","park"],model:"My favorite place is the library.",q:["お気に入りの場所を紹介する表現は？",["My favorite place is ...","What time is it?","How many?"],0]},
"This is my day. ぼく・わたしの一日":{goal:"一日の生活を、時刻と動作を結びつけて伝えよう。",scene:"🌅→🏫→🌙",words:["I get up.","I go to school.","I go to bed."],model:"I get up at seven.",q:["「7時に起きます」に近いのは？",["I get up at seven.","I like seven.","Seven school."],0]}
};

/* 5・6年は既存の教科書単元名を生かし、Ponoオリジナル内容を補う */
Object.assign(ENG237,{
"Hello, friends!":{goal:"名前や好きなものを聞いたり伝えたりして、相手のことを知ろう。",scene:"👋 My name is ...　❤️ I like ...",words:["My name is ...","How do you spell ...?","I like ..."],model:"My name is Sora. I like music.",q:["名前のつづりをたずねる表現は？",["How do you spell your name?","What time is it?","Where is it?"],0]},
"When is your birthday?":{goal:"誕生日やほしいものについて聞いたり伝えたりしよう。",scene:"🎂 📅",words:["When is your birthday?","My birthday is ...","I want ..."],model:"My birthday is May 10th.",q:["誕生日をたずねるのは？",["When is your birthday?","What subject?","Who is your hero?"],0]},
"What subjects do you like?":{goal:"好きな教科や将来につながる時間割について伝え合おう。",scene:"📚 math / science / art / PE",words:["What subject do you like?","I like ...","I want to study ..."],model:"I like science.",q:["好きな教科をたずねるのは？",["What subject do you like?","What time is it?","How old?"],0]},
"He can bake bread well.":{goal:"できることを聞いたり、身近な人を紹介したりしよう。",scene:"👨‍🍳 → He can cook.",words:["He can ...","She can ...","Can you ...?"],model:"She can play the piano.",q:["「彼は料理ができます」は？",["He can cook.","He is cook.","He likes can."],0]},
"Where is the post office?":{goal:"場所をたずね、位置や道順を伝えよう。",scene:"🏫 ➡️ 🏣",words:["Where is ...?","Go straight.","Turn right.","Turn left."],model:"Where is the post office? — Go straight.",q:["場所をたずねるのは？",["Where is the post office?","When is it?","Who is it?"],0]},
"What would you like?":{goal:"食べ物や飲み物をていねいに注文しよう。",scene:"🍽️ What would you like?",words:["What would you like?","I'd like ...","please"],model:"I'd like curry, please.",q:["ていねいに注文する表現は？",["I'd like ..., please.","I am curry.","Where curry?"],0]},
"Welcome to Japan!":{goal:"日本の行事・食べ物・場所などを英語で紹介しよう。",scene:"🗾 🌸 🍣",words:["Welcome to Japan.","You can see ...","You can enjoy ..."],model:"You can see cherry blossoms.",q:["「桜を見ることができます」は？",["You can see cherry blossoms.","I am cherry blossoms.","Where cherry?"],0]},
"Who is your hero?":{goal:"あこがれの人について、できることやよいところを紹介しよう。",scene:"⭐ 👤",words:["Who is your hero?","My hero is ...","He/She can ..."],model:"My hero is my sister. She can sing well.",q:["ヒーローをたずねるのは？",["Who is your hero?","Where is your hero?","What time hero?"],0]},
"This is me!":{goal:"自分の好きなこと・得意なことを紹介しよう。",scene:"🙂 → like / can / favorite",words:["I'm ...","I like ...","I can ..."],model:"I'm Aoi. I like art. I can swim.",q:["できることを伝えるのは？",["I can swim.","I swim can.","I am swim."],0]},
"Welcome to Japan.":{goal:"日本の文化や行事を、相手に分かるように紹介しよう。",scene:"🗾 🎎 🍵",words:["In Japan, ...","You can ...","It's ..."],model:"In Japan, you can enjoy festivals.",q:["日本でできることを紹介する表現は？",["You can ...","How many ...?","Who are you?"],0]},
"What time do you get up?":{goal:"一日の生活時刻をたずねたり伝えたりしよう。",scene:"⏰ 🌅",words:["What time do you get up?","I get up at ...","usually"],model:"I get up at seven.",q:["起きる時刻をたずねるのは？",["What time do you get up?","Where do you get up?","Who get up?"],0]},
"My Summer Vacation":{goal:"夏休みにしたことや感想を伝えよう。",scene:"☀️ 🏖️ 📷",words:["I went to ...","I saw ...","It was fun."],model:"I went to the sea. It was fun.",q:["「海へ行きました」に近いのは？",["I went to the sea.","I go sea yesterday.","I am sea."],0]},
"We live together.":{goal:"世界や身近な生活について考え、できることを伝えよう。",scene:"🌏 🤝",words:["We can ...","We need ...","Let's ..."],model:"We can help each other.",q:["「私たちは助け合えます」は？",["We can help each other.","We are help.","Help time."],0]},
"Save the animals.":{goal:"動物のくらしや環境について知り、自分の考えを伝えよう。",scene:"🐢 🌊 🌳",words:["animal","habitat","We can ...","Let's ..."],model:"Let's protect animals.",q:["動物を守ろうと呼びかけるのは？",["Let's protect animals.","Animals time.","Where animals?"],0]},
"My Best Memory":{goal:"小学校生活の思い出を、出来事と気持ちをつなげて伝えよう。",scene:"🏫 📸 ⭐",words:["My best memory is ...","I enjoyed ...","It was ..."],model:"My best memory is the school trip.",q:["一番の思い出を伝える表現は？",["My best memory is ...","How many memory?","Memory time."],0]},
"My Future, My Dream":{goal:"将来したいことや夢を伝え、友だちの話も聞こう。",scene:"🌱 → 🌟",words:["I want to be ...","I want to ...","My dream is ..."],model:"I want to be a designer.",q:["将来なりたいものを伝えるのは？",["I want to be ...","I am want ...","Where be ...?"],0]}
});

function engScene237(d){
 return `<div class="engscene237"><div>${d.scene}</div><div class="engmodel237">${d.model}</div></div>`;
}
function englishHome237(g,title,term){
 const d=ENG237[title]||{goal:"英語を聞いて、意味を考え、使ってみよう。",scene:"👂 → 💬",words:["Listen.","Speak."],model:"Let's try!",q:["英語を学ぶとき大切なのは？",["聞いて使ってみる","一度で完璧にする","書くだけにする"],0]};
 const label=g<=4?"外国語活動":"外国語";
 unitSession={sub:"外国語",g,title,term,core:{learn:[d.goal],together:"場面を見ながら、聞こえた英語の意味を考えよう。",qs:[]},qi:0,ok:0,reads:0,start:Date.now()};
 head(`${title}｜小学${g}年`,()=>subjectTermUnits("外国語活動",g,TERM_LABELS.indexOf(term)));
 A.append(e("div","card",`<div class="tiny">${label}｜小学${g}年｜${term}</div><h2>${title}</h2><p><b>この単元で学ぶこと</b></p><p>・${d.goal}</p>${engScene237(d)}
 <p class="tiny">${g<=4?"まずは聞く・まねする・伝えることを大切にします。書けなくても大丈夫です。":"聞く・話すに加えて、読む・書くにも少しずつつなげます。"}</p>`));
 A.append(btn("📖 ①まなぶ から始める",()=>englishLearn237(g,title,term),"primary"));
 A.append(btn("🚀 問題からやってみる",()=>englishQuestion237(g,title,term),"soft"));
}
function englishLearn237(g,title,term){
 const d=ENG237[title],label=g<=4?"外国語活動":"外国語";
 head(`① まなぶ｜${title}`,()=>englishHome237(g,title,term));
 A.append(e("div","card",`<div class="tiny">${label}｜小学${g}年</div><h2>👂 まず聞いてみよう</h2>${engScene237(d)}
 <h3>この単元のことば</h3>${d.words.map(x=>`<div class="engword237"><b>${x}</b><button class="miniSpeak237">🔊</button></div>`).join("")}
 <p class="tiny">文字を読むのが大変なときは、音を聞いて意味が分かれば学びになっています。</p>`));
 [...A.querySelectorAll(".engword237")].forEach((row,i)=>row.querySelector("button").onclick=()=>{unitSession.reads++;speakJP(d.words[i])});
 A.append(btn("🔊 お手本を聞く",()=>{unitSession.reads++;speakJP(d.model)},"soft"));
 A.append(btn("➡️ ② 一緒にやってみる",()=>englishTogether237(g,title,term),"primary"));
}
function englishTogether237(g,title,term){
 const d=ENG237[title];
 head(`② 一緒に｜${title}`,()=>englishLearn237(g,title,term));
 A.append(e("div","card good",`<h2>場面から考えよう</h2>${engScene237(d)}
 <p>① 絵や場面を見る</p><p>② 音を聞く</p><p>③ まねして言ってみる</p>
 <p class="tiny">全部言えなくても、聞いて分かった・一部を言えた、も大切な記録です。</p>`));
 A.append(btn("🔊 もう一度聞く",()=>{unitSession.reads++;speakJP(d.model)},"soft"));
 A.append(btn("🚀 ③ 自分でやる",()=>englishQuestion237(g,title,term),"primary"));
}
function englishQuestion237(g,title,term){
 const d=ENG237[title],q=d.q;
 head(`③ 自分でやる｜${title}`,()=>englishHome237(g,title,term));
 A.append(e("div","card",`<h2>${q[0]}</h2>${engScene237(d)}`));
 A.append(btn("🔊 問題を聞く",()=>{unitSession.reads++;speakJP(q[0])},"soft"));
 q[1].forEach((x,n)=>A.append(btn(x,()=>englishSummary237(g,title,term,n===q[2]?1:0))));
 A.append(btn("🌱 わからない・①まなぶを見る",()=>englishLearn237(g,title,term),"soft"));
}
function englishSummary237(g,title,term,ok){
 const d=ENG237[title];
 head(`まとめ｜${title}`,()=>englishHome237(g,title,term));
 A.append(e("div","card good",`<h2>🌱 まとめ</h2><p>${ok?"できたね。":"①まなぶに戻って、もう一度聞いてみても大丈夫です。"}</p>
 <p><b>最後に、お手本を聞いて自分でも言ってみよう。</b></p>${engScene237(d)}`));
 A.append(btn("🔊 お手本を聞く",()=>{unitSession.reads++;speakJP(d.model)},"soft"));
 A.append(e("div","card",`<h2>単元ふりかえり</h2><p>今の感じに近いものを選んでください。</p>`));
 ["聞いてわかった","まねして言えた","もう一度聞きたい"].forEach(x=>A.append(btn(x,()=>englishFinish237(g,title,term,ok,x),"soft")));
}
function englishFinish237(g,title,term,ok,ref){
 let rows=[];try{rows=JSON.parse(localStorage.getItem("ponoUnitReflections")||"[]")}catch(_){}
 rows.push({studentId:profile.id,date:new Date().toISOString(),subject:g<=4?"外国語活動":"外国語",grade:g,unit:title,term,reflection:ref,correct:ok,total:1,reads:unitSession.reads||0});
 localStorage.setItem("ponoUnitReflections",JSON.stringify(rows));
 head("🌿 単元ふりかえり",()=>englishHome237(g,title,term));
 A.append(e("div","card good",`<h2>${title}</h2><p>${ref}</p><p>今日の学びを記録しました。</p>`));
 A.append(btn("外国語の単元へ戻る",()=>subjectTextbookEntry("外国語活動"),"primary"));
}

/* 外国語活動/外国語の単元だけ専用教材へ接続。他教科は既存ルートを維持 */
const subjectTermUnitsBefore237=subjectTermUnits;
subjectTermUnits=function(s,g,ti){
 if(s!=="外国語活動"){subjectTermUnitsBefore237(s,g,ti);return}
 let arr=TEXTBOOK_MAP["外国語"][g]||[],part=splitTerms(arr)[ti]||[],term=TERM_LABELS[ti],label=g<=4?"外国語活動":"外国語";
 head(`${term}｜小学${g}年 ${label}`,()=>subjectGradeTerms(s,g));
 A.append(e("div","card",`<h2>${term}</h2><p>学校の進み方に合わせて、今学んでいる単元から選べます。</p><p class="tiny">教科書・教材の流れを参考にした目安です。</p>`));
 part.forEach((name,n)=>{let c=e("div","unit-pick",`<span class="unit-order">${n+1}</span><span><b>${name}</b><br><span class="tiny">${term}</span></span>`);c.onclick=()=>englishHome237(g,name,term);A.append(c)});
};
