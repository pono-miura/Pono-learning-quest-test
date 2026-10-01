/* v29.2 外国語活動3・4年＋外国語5・6年 */
const ENG36_292={"3": {"Hello!": ["あいさつをしよう", "Hello! / Hi!", "Hello!", "こんにちは！という気持ちで声に出してみよう。"], "How are you?": ["気分をたずねよう", "How are you?", "I'm good.", "相手の顔を見ながら、短いやり取りを楽しもう。"], "How many?": ["1〜20くらいまでの数に親しもう", "How many?", "Three.", "物を指さしながら数えると分かりやすいよ。"], "I like blue.": ["好きな色や物を伝えよう", "What color do you like?", "I like blue.", "I like ～ で好きなものを伝えられるよ。"], "What do you like?": ["好きなものをたずねよう", "What do you like?", "I like soccer.", "What do you like? と聞いてみよう。"], "ALPHABET": ["アルファベットの大文字に親しもう", "What letter is this?", "It's A.", "形と音を結びつけながら見つけよう。"]}, "4": {"Hello, world!": ["世界のいろいろなあいさつに親しもう", "Hello! How are you?", "I'm fine.", "言葉が違っても、相手に伝えようとすることが大切。"], "Let's play cards.": ["天気や遊びの言い方に親しもう", "How's the weather?", "It's sunny.", "天気を見ながら英語で言ってみよう。"], "I like Mondays.": ["曜日と好きな曜日を伝えよう", "What day do you like?", "I like Monday.", "曜日を生活と結びつけて覚えよう。"], "What time is it?": ["時刻をたずねたり答えたりしよう", "What time is it?", "It's seven.", "時計を見ながら声に出すと分かりやすいよ。"], "Do you have a pen?": ["持っている物をたずねよう", "Do you have a pen?", "Yes, I do.", "Do you have ～? でたずねられるよ。"], "Alphabet": ["アルファベットの小文字にも親しもう", "What letter is this?", "It's b.", "大文字と小文字をペアで見てみよう。"]}, "5": {"Hello, friends!": ["名前や好きなものを伝えて自己紹介しよう", "What's your name?", "I'm Hana.", "短い文を組み合わせて自分のことを伝えよう。"], "When is your birthday?": ["誕生日や月・日にちをたずねよう", "When is your birthday?", "My birthday is May 10th.", "月の言い方と日にちを組み合わせよう。"], "What subjects do you like?": ["好きな教科をたずねたり答えたりしよう", "What subjects do you like?", "I like science.", "I like ～ で好きな教科を伝えよう。"], "He can bake bread well.": ["できることや人を紹介しよう", "What can he do?", "He can bake bread.", "can + 動作で「できる」を表せるよ。"], "Where is the post office?": ["場所をたずね、道案内を聞こう", "Where is the post office?", "Go straight.", "地図を見ながら方向の表現を使おう。"], "What would you like?": ["食べたい物や注文を伝えよう", "What would you like?", "I'd like curry.", "I'd like ～ で希望を伝えられるよ。"], "Welcome to Japan!": ["日本の場所や文化を紹介しよう", "Where do you want to go?", "I want to go to Kyoto.", "場所と理由を短く伝えてみよう。"], "Who is your hero?": ["あこがれの人を紹介しよう", "Who is your hero?", "My hero is my mother.", "その人のよさも一言加えてみよう。"]}, "6": {"This is me!": ["自分の好きなことや得意なことを紹介しよう", "What do you like?", "I like music.", "自分について複数の文をつないでみよう。"], "Welcome to Japan.": ["日本の行事や文化を紹介しよう", "What do you like about Japan?", "I like Japanese food.", "相手に分かる言葉を選んで紹介しよう。"], "What time do you get up?": ["一日の生活時刻を伝えよう", "What time do you get up?", "I get up at seven.", "at + 時刻で生活の時間を伝えよう。"], "My Summer Vacation": ["夏休みの思い出を伝えよう", "What did you do?", "I went to the sea.", "過去の出来事を短い文で伝えてみよう。"], "We live together.": ["世界の暮らしやつながりについて伝えよう", "Where do you want to go?", "I want to go to Australia.", "世界の国や暮らしに目を向けよう。"], "Save the animals.": ["生き物や環境について考えを伝えよう", "Where do they live?", "They live in the forest.", "生き物の情報を英語で伝えてみよう。"], "My Best Memory": ["小学校生活の思い出を伝えよう", "What is your best memory?", "My best memory is our school trip.", "思い出と気持ちを組み合わせて伝えよう。"], "My Future, My Dream": ["将来の夢やなりたいものを伝えよう", "What do you want to be?", "I want to be a chef.", "I want to be ～ で夢を伝えよう。"]}}; let eng292=null;
function engData292(g,t){return ENG36_292[g]&&ENG36_292[g][t]}
function engHome292(g,t){
 let d=engData292(g,t);if(!d)return false;eng292={g,t,d,i:0,ok:0,start:Date.now()};
 head(`${g<=4?"外国語活動":"外国語"}｜${t}`,()=>subjectGradeTerms("外国語",g));
 A.append(e("div","card",`<div class="tiny">${g<=4?"外国語活動":"外国語"}｜小学${g}年</div><h2>${t}</h2><div class="engFlow292"><span>👂 きく</span><b>→</b><span>🗣️ まねする</span><b>→</b><span>💬 つかう</span><b>→</b><span>😊 伝わる</span></div><h3>この単元でやってみること</h3><p>${d[0]}</p><p class="engPhrase292">${d[1]}</p>`));
 A.append(btn("🔊 英語を聞く",()=>speakEN(d[1]),"soft"));A.append(btn("📖 ①まなぶ",engLearn292,"primary"));
}
function engLearn292(){
 let s=eng292,d=s.d;head(`①まなぶ｜${s.t}`,()=>engHome292(s.g,s.t));
 A.append(e("div","card lesson",`<h2>👂 ① きいて・まねしよう</h2><p class="engPhrase292">${d[1]}</p><p><b>こたえ方の例</b></p><p class="engPhrase292">${d[2]}</p><p>${d[3]}</p>`));
 A.append(btn("🔊 質問を聞く",()=>speakEN(d[1]),"soft"));A.append(btn("🔊 答えを聞く",()=>speakEN(d[2]),"soft"));A.append(btn("➡️ ② 一緒にやってみる",engTogether292,"primary"));
}
function engTogether292(){
 let s=eng292,d=s.d;head(`②一緒に｜${s.t}`,engLearn292);
 A.append(e("div","card lesson",`<h2>🤝 ② 一緒に言ってみよう</h2><p>① 質問を聞く</p><p class="engPhrase292">${d[1]}</p><p>② まねして答える</p><p class="engPhrase292">${d[2]}</p><p class="tiny">全部言えなくても大丈夫。聞く→まねする→自分の言葉に変える、で進めます。</p>`));
 A.append(btn("🔊 会話を聞く",()=>{speakEN(d[1]);setTimeout(()=>speakEN(d[2]),1800)},"soft"));A.append(btn("➡️ ③ 自分でやってみる",engSelf292,"primary"));
}
function engSelf292(){
 let s=eng292,d=s.d;head(`③自分で｜${s.t}`,engTogether292);
 A.append(e("div","card",`<h2>💬 ③ 自分で選んでみよう</h2><p>この質問に合う答えはどれ？</p><p class="engPhrase292">${d[1]}</p>`));
 let opts=[d[2],"Thank you.","Good night."],order=[1,0,2];
 order.forEach(n=>A.append(btn(opts[n],()=>{if(n===0){s.ok=1;if(window.ponoCorrectSound)window.ponoCorrectSound();engSummary292()}else A.prepend(e("div","feedback warn","🌱 質問をもう一度聞いて、答えの例を思い出してみよう。"))},"soft")));
 A.append(btn("🔊 もう一度聞く",()=>speakEN(d[1]),"ghost"));
}
function engSummary292(){
 let s=eng292;records.push({studentId:profile.id,date:new Date().toISOString(),subject:s.g<=4?"外国語活動":"外国語",grade:s.g,unit:s.t,rate:100,correct:1,total:1,seconds:Math.round((Date.now()-s.start)/1000),status:"学習済み"});save();
 head(`まとめ｜${s.t}`,()=>engHome292(s.g,s.t));A.append(e("div","card good",`<h2>できた！ 🎉</h2><p>聞いて、意味を考えて、英語を選べました。</p><p class="engPhrase292">${s.d[1]}</p><p class="engPhrase292">${s.d[2]}</p>`));A.append(btn("🌱 ふりかえり",engReflect292,"primary"));
}
function engReflect292(){
 let s=eng292;head(`ふりかえり｜${s.t}`,engSummary292);["😊 英語を聞けた","🗣️ まねして言えた","💬 自分でも使えそう","🔊 もう一度聞きたい"].forEach(v=>A.append(btn(v,()=>subjectGradeTerms("外国語",s.g),"soft")));
}
/* 外国語の正式入口：小3・4=外国語活動、小5・6=外国語 */
const oldEntry292=subjectTextbookEntry;
subjectTextbookEntry=function(s){
 if(s!=="外国語"&&s!=="外国語活動")return oldEntry292.apply(this,arguments);
 head("英語｜学年を選ぶ",child);A.append(e("div","card",`<h2>英語</h2><p>聞くこと・話すことを中心に、少しずつ英語に親しみます。</p>`));
 [3,4,5,6].forEach(g=>A.append(btn(`小学${g}年　${g<=4?"外国語活動":"外国語"}`,()=>subjectGradeTerms("外国語",g),"soft")));
};
const oldSGT292=subjectGradeTerms;
subjectGradeTerms=function(s,g){
 if(s!=="外国語"&&s!=="外国語活動")return oldSGT292.apply(this,arguments);
 let arr=Object.keys(ENG36_292[g]||{});
 head(`${g<=4?"外国語活動":"外国語"}｜小学${g}年`,()=>subjectTextbookEntry("外国語"));
 if(!arr.length){A.append(e("div","card","この学年の単元を準備しています。"));return}
 A.append(e("div","card",`<div class="tiny">小学${g}年 ${g<=4?"外国語活動":"外国語"}</div><h2>単元をえらぼう</h2><p>今やりたいところから選べます。</p>`));
 arr.forEach((name,n)=>{let c=e("div","unit-pick",`<span class="unit-order">${n+1}</span><span><b>${name}</b></span>`);c.onclick=()=>engHome292(g,name);A.append(c)});
};
