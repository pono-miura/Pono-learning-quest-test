/* Pono Learning Quest v39.4 — 小学1年 国語・算数 総復習。
   既存の単元教材・学習者ID・補助ログ・バックアップ形式は変更しません。 */
(function(){
'use strict';
const root=document.getElementById('app');if(!root)return;
const DATA={"math":{"name":"算数","icon":"🔢","units":["かずのしくみ","たし算・ひき算の意味","かたち","長さ・かさ・時こく","大きいかず"],"questions":[{"unit":"かずのしくみ","q":"● ● ● ● ● ● は、なんこ？","choices":["6こ","5こ","7こ"],"correct":0,"ex":"1つずつ指さして6こです。","source":null},{"unit":"かずのしくみ","q":"9の まえの かずは？","choices":["10","8","7"],"correct":1,"ex":"9より1小さい数は8です。","source":null},{"unit":"かずのしくみ","q":"7と3を あわせると？","choices":["9","11","10"],"correct":2,"ex":"7＋3＝10です。","source":null},{"unit":"かずのしくみ","q":"14は、10と いくつ？","choices":["4","3","5"],"correct":0,"ex":"14は10のまとまり1つと4こです。","source":null},{"unit":"たし算・ひき算の意味","q":"2＋5は？","choices":["6","7","8"],"correct":1,"ex":"2から5つ数えて7です。","source":null},{"unit":"たし算・ひき算の意味","q":"10−6は？","choices":["3","5","4"],"correct":2,"ex":"10は6と4に分けられます。","source":null},{"unit":"たし算・ひき算の意味","q":"5こに5こを あわせると？","choices":["10こ","9こ","11こ"],"correct":0,"ex":"5＋5＝10こです。","source":null},{"unit":"たし算・ひき算の意味","q":"7−0は？","choices":["0","7","6"],"correct":1,"ex":"0こ取っても7このままです。","source":null},{"unit":"かたち","q":"かどが ない かたちは？","choices":["さんかく","しかく","まる"],"correct":2,"ex":"まるにはかどがありません。","source":null},{"unit":"かたち","q":"さんかくの へんは なんぼん？","choices":["3ぼん","4ほん","2ほん"],"correct":0,"ex":"さんかくは3本のまっすぐな辺があります。","source":null},{"unit":"かたち","q":"しかくの へんは なんぼん？","choices":["3ぼん","4ほん","5ほん"],"correct":1,"ex":"しかくは4本の辺にかこまれています。","source":null},{"unit":"かたち","q":"ボールの ような かたちは、どれ？","choices":["はこ","しかく","きゅう（球）"],"correct":2,"ex":"球はボールのように丸い立体です。","source":null},{"unit":"長さ・かさ・時こく","q":"同じつみ木で、5こ分と3こ分。長いのは？","choices":["5こ分","3こ分","おなじ"],"correct":0,"ex":"同じ大きさなら5こ分の方が長いです。","source":null},{"unit":"長さ・かさ・時こく","q":"長いはりが12、短いはりが8。なんじ？","choices":["12じ","8じ","4じ"],"correct":1,"ex":"短いはりが8なら8時です。","source":null},{"unit":"長さ・かさ・時こく","q":"長いはりが6、短いはりが2と3のあいだ。なんじ？","choices":["3じはん","2じ","2じはん"],"correct":2,"ex":"長いはりが6、短いはりが2と3の間は2時半です。","source":null},{"unit":"長さ・かさ・時こく","q":"おなじ ものさし3つ分と4つ分。長いのは？","choices":["4つ分","3つ分","おなじ"],"correct":0,"ex":"同じものさしなら4つ分が長いです。","source":null},{"unit":"大きいかず","q":"20の つぎに 10ふえると？","choices":["21","30","40"],"correct":1,"ex":"20＋10＝30です。","source":null},{"unit":"大きいかず","q":"63は、10が 6つと あと いくつ？","choices":["6","9","3"],"correct":2,"ex":"63＝60＋3です。","source":null},{"unit":"大きいかず","q":"45と49。大きい数は？","choices":["49","45","おなじ"],"correct":0,"ex":"十の位は同じ4。1の位が9の49が大きいです。","source":null},{"unit":"大きいかず","q":"90は10が いくつ？","choices":["10こ","9つ","8つ"],"correct":1,"ex":"10を9こ集めると90です。","source":null}],"practice":[{"unit":"かずのしくみ","q":"● ● ● は、なんこ？","choices":["2こ","3こ","4こ"],"correct":1,"ex":"1つずつ数えると3こです。","source":null},{"unit":"かずのしくみ","q":"5の つぎの かずは？","choices":["4","7","6"],"correct":2,"ex":"5の次は6です。","source":null},{"unit":"たし算・ひき算の意味","q":"あめが3こ。2こ ふえました。ぜんぶで？","choices":["5こ","1こ","6こ"],"correct":0,"ex":"3＋2＝5こです。","source":null},{"unit":"たし算・ひき算の意味","q":"5−2は？","choices":["2","3","4"],"correct":1,"ex":"5から2をひくと3です。","source":null},{"unit":"かたち","q":"かどが3つ あるのは？","choices":["まる","しかく","さんかく"],"correct":2,"ex":"さんかくにはかどが3つあります。","source":null},{"unit":"かたち","q":"○の かたちは？","choices":["まる","しかく","さんかく"],"correct":0,"ex":"○はまるの形です。","source":null},{"unit":"長さ・かさ・時こく","q":"長さを くらべるときは、なにを そろえる？","choices":["いろ","はし","おもさ"],"correct":1,"ex":"はしをそろえると長さを正しくくらべられます。","source":null},{"unit":"長さ・かさ・時こく","q":"同じコップ3ばいと2はい。水が 多いのは？","choices":["2はい","おなじ","3ばい"],"correct":2,"ex":"同じコップなら3ばい分の方が多いです。","source":null},{"unit":"大きいかず","q":"10が 3つで いくつ？","choices":["30","13","300"],"correct":0,"ex":"10＋10＋10＝30です。","source":null},{"unit":"大きいかず","q":"40の つぎに 10ふえると？","choices":["41","50","60"],"correct":1,"ex":"40＋10＝50です。","source":null}],"intro":"かず・たし算とひき算・かたち・長さとかさと時計・大きいかずをふくしゅうします。"},"japanese":{"name":"国語","icon":"📖","units":["ことばと文のきほん","ひらがな・カタカナ","「は・を・へ」をつかう","じゅんばんをつかむ","だれ・いつ・どこ・なに","りゆうを見つける","ばめんときもち","ことばをひろげる","きいて・はなす","むかしばなし・ことばのリズム"],"questions":[{"unit":"ことばと文のきほん","q":"「さかなが およぐ。」の「だれが・なにが」は？","choices":["およぐ","さかなが","が"],"correct":1,"ex":"およぐのは さかな です。","source":null},{"unit":"ことばと文のきほん","q":"「みきさんが うたう。」で、している ことは？","choices":["みきさん","が","うたう"],"correct":2,"ex":"みきさんが どうする？ → うたう。","source":null},{"unit":"ひらがな・カタカナ","q":"「す」を カタカナに すると？","choices":["ス","ヌ","シ"],"correct":0,"ex":"す → ス です。","source":null},{"unit":"ひらがな・カタカナ","q":"「たぬき」の はじめの もじは？","choices":["な","た","き"],"correct":1,"ex":"「た・ぬ・き」の じゅんです。","source":null},{"unit":"「は・を・へ」をつかう","q":"「おとうと（　） あそぶ。」に はいる もじは？","choices":["を","へ","は"],"correct":2,"ex":"おとうとの はなしを しています。","source":null},{"unit":"「は・を・へ」をつかう","q":"「おみせ（　） あるく。」に はいる もじは？","choices":["へ","を","は"],"correct":0,"ex":"どこへ あるく？ → おみせへ。","source":null},{"unit":"じゅんばんをつかむ","q":"みおさんが はじめに した ことは？","choices":["いちごを あらった","てを あらった","みんなで たべた"],"correct":1,"ex":"はじめに、てを あらいました。","source":"みおさんは おやつを つくります。はじめに、てを あらいました。つぎに、いちごを あらいました。それから、おさらに いちごを のせました。さいごに、みんなで たべました。"},{"unit":"じゅんばんをつかむ","q":"みおさんが つぎに した ことは？","choices":["おさらに のせた","みんなで たべた","いちごを あらった"],"correct":2,"ex":"つぎに、いちごを あらいました。","source":"みおさんは おやつを つくります。はじめに、てを あらいました。つぎに、いちごを あらいました。それから、おさらに いちごを のせました。さいごに、みんなで たべました。"},{"unit":"だれ・いつ・どこ・なに","q":"こうたさんが ほんを よんだのは いつ？","choices":["あさ","ひる","ゆうがた"],"correct":0,"ex":"きょうの あさ です。","source":"きょうの あさ、こうたさんは としょしつで ほんを よみました。そこへ ゆいさんが きました。ふたりは いっしょに えほんを みました。"},{"unit":"だれ・いつ・どこ・なに","q":"こうたさんが いた ばしょは？","choices":["こうえん","としょしつ","にわ"],"correct":1,"ex":"としょしつで ほんを よみました。","source":"きょうの あさ、こうたさんは としょしつで ほんを よみました。そこへ ゆいさんが きました。ふたりは いっしょに えほんを みました。"},{"unit":"りゆうを見つける","q":"なおさんが はやく ねたのは なぜ？","choices":["あめが ふっているから","ほんを かりたいから","あした えんそくが あるから"],"correct":2,"ex":"あしたの えんそくに そなえるためです。","source":"なおさんは はやく ねました。あしたは たのしみに している えんそくが あるので、げんきに あるきたいと おもったからです。"},{"unit":"りゆうを見つける","q":"なおさんが たのしみに している ことは？","choices":["えんそく","おまつり","うんどうかい"],"correct":0,"ex":"たのしみに している えんそくが あると あります。","source":"なおさんは はやく ねました。あしたは たのしみに している えんそくが あるので、げんきに あるきたいと おもったからです。"},{"unit":"ばめんときもち","q":"たけるさんが はなす まえの ようすは？","choices":["すやすや ねた","むねが どきどき した","にっこり した"],"correct":1,"ex":"はなす まえに むねが どきどき しました。","source":"たけるさんは はじめて おおぜいの まえで はなします。むねが どきどき していました。でも、はなし おわると ともだちが はくしゅを してくれて、ほっと しました。"},{"unit":"ばめんときもち","q":"たけるさんが はなすのは、どんな ばしょ？","choices":["いえで ひとり","としょしつで ふたり","おおぜいの まえ"],"correct":2,"ex":"おおぜいの まえで はじめて はなします。","source":"たけるさんは はじめて おおぜいの まえで はなします。むねが どきどき していました。でも、はなし おわると ともだちが はくしゅを してくれて、ほっと しました。"},{"unit":"ことばをひろげる","q":"「きゃべつ」と おなじ やさいの なかまは？","choices":["にんじん","いぬ","ぼうし"],"correct":0,"ex":"きゃべつも にんじんも やさいです。","source":null},{"unit":"ことばをひろげる","q":"「ねこ」と おなじ どうぶつの なかまは？","choices":["つくえ","いぬ","てぶくろ"],"correct":1,"ex":"ねこも いぬも どうぶつです。","source":null},{"unit":"きいて・はなす","q":"えほんを よむのは いつ？","choices":["あした","らいしゅう","きょう"],"correct":2,"ex":"「きょうの ごご3じ」と あります。","source":"ゆうびんやさんから おしらせです。きょうの ごご3じに、こうみんかんで えほんを よみます。いりぐちは みぎがわです。"},{"unit":"きいて・はなす","q":"えほんを よむ じかんは？","choices":["ごご3じ","あさ9じ","よる8じ"],"correct":0,"ex":"「ごご3じ」です。","source":"ゆうびんやさんから おしらせです。きょうの ごご3じに、こうみんかんで えほんを よみます。いりぐちは みぎがわです。"},{"unit":"むかしばなし・ことばのリズム","q":"ちいさな いえが あった ばしょは？","choices":["うみの なか","やまの ふもと","まちの えき"],"correct":1,"ex":"やまの ふもとに ありました。","source":"むかし、やまの ふもとに ちいさな いえが ありました。こどもは まいあさ、いえの まえを はきました。あるひ、ほうきを なくしました。おばあさんと いっしょに さがすと、うらの こやに ありました。こどもは「ありがとう」と いいました。"},{"unit":"むかしばなし・ことばのリズム","q":"こどもが まいあさ していたのは？","choices":["はなを うえる","ごはんを つくる","いえの まえを はく"],"correct":2,"ex":"まいあさ、いえの まえを はいていました。","source":"むかし、やまの ふもとに ちいさな いえが ありました。こどもは まいあさ、いえの まえを はきました。あるひ、ほうきを なくしました。おばあさんと いっしょに さがすと、うらの こやに ありました。こどもは「ありがとう」と いいました。"}],"practice":[{"unit":"ことばと文のきほん","q":"「ねこが ねる。」で、ねるのは だれ？","choices":["うま","とり","ねこ"],"correct":2,"ex":"「ねこが」が ねる ものを あらわします。","source":null},{"unit":"ひらがな・カタカナ","q":"「あ」と おなじ おとの カタカナは？","choices":["ア","イ","ウ"],"correct":0,"ex":"ひらがなの「あ」と カタカナの「ア」は おなじ おとです。","source":null},{"unit":"「は・を・へ」をつかう","q":"「ぼく（　） はしる。」に はいる もじは？","choices":["を","は","へ"],"correct":1,"ex":"だれの はなし？ → ぼくは。","source":null},{"unit":"じゅんばんをつかむ","q":"いちばん はじめに した ことは？","choices":["ぼうしを かぶった","げんかんを でた","くつを はいた"],"correct":2,"ex":"「あさ、くつを はきました」が はじめです。","source":"りくさんは あさ、くつを はきました。つぎに、ぼうしを かぶりました。それから、かばんを もちました。さいごに、げんかんを でました。"},{"unit":"だれ・いつ・どこ・なに","q":"こうえんで あそんだのは だれ？","choices":["さきさん","ゆいさん","こうたさん"],"correct":0,"ex":"さきさんが あそびました。","source":"ひる、さきさんは こうえんで いぬと あそびました。さきさんは ぼーるを なげ、いぬが おいかけました。"},{"unit":"りゆうを見つける","q":"みずきさんが かさを もったのは なぜ？","choices":["ひざしが つよいから","あめが ふりそうだったから","かさが こわれたから"],"correct":1,"ex":"くろい くもが でて、あめが ふりそうだったからです。","source":"あさ、みずきさんは かさを もちました。そらに くろい くもが でていて、あめが ふりそうだったからです。"},{"unit":"ばめんときもち","q":"えを おとした あとの ゆうさんの ようすは？","choices":["おおきな こえで わらった","はしりまわった","しょんぼり した"],"correct":2,"ex":"えが やぶれて、しょんぼり しました。","source":"ゆうさんは たいせつな えを おとして しまいました。えの はしが やぶれ、ゆうさんは しょんぼり しました。すると、となりの りなさんが いっしょに なおそうと いってくれました。ゆうさんは にっこり しました。"},{"unit":"ことばをひろげる","q":"「おおきい」の はんたいの ことばは？","choices":["ちいさい","ながい","あかい"],"correct":0,"ex":"おおきい ↔ ちいさい。","source":null},{"unit":"きいて・はなす","q":"はなを うえるのは いつ？","choices":["きのう","あした","あさって"],"correct":1,"ex":"「あしたの あさ」と あります。","source":"みなさん、おはようございます。あしたの あさ、こうていで はなを うえます。じかんは 9じです。ぼうしを もって きてください。"},{"unit":"むかしばなし・ことばのリズム","q":"もりに すんで いたのは？","choices":["かめ","きつね","りす"],"correct":2,"ex":"もりに りすが すんで いました。","source":"むかし、ちいさな もりに りすが すんで いました。あるひ、りすは きのみを ひとつ ひろいました。おなかが すいて いる うさぎを みつけたので、きのみを はんぶんこ しました。ふたりは にっこり わらいました。"}],"intro":"ことば・文・じゅんばん・きもち・むかしばなしなどをふくしゅうします。かん字クエストはべつです。"}};
const mk=(tag,cls,content)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(content!==undefined)n.textContent=String(content);return n;};
const btn=(label,fn,cls='soft')=>{const n=mk('button',cls,label);n.type='button';n.addEventListener('click',fn);return n;};
let s=null;
function backToLearning(){if(typeof window.ponoAllGrades390==='function')window.ponoAllGrades390(1);else if(typeof child==='function')child();else if(typeof home==='function')home();}
function page(title,back=home394){root.replaceChildren();const bar=mk('div','top');bar.append(btn('← もどる',back,'back'),mk('h1','r394title',title));root.append(bar);try{window.scrollTo(0,0)}catch(e){}}
function headerInfo(text){root.append(mk('div','card r394intro',text));}
function goUnits(kind){const fn=kind==='math'?window.ponoGrade1Math391:window.ponoGrade1Japanese392;
 if(typeof fn==='function')fn();else if(typeof subjectGradeTerms==='function')subjectGradeTerms(kind==='math'?'算数':'国語',1);else home394();}
function home394(){
 s=null;page('小学1年｜国語と算数の そうふくしゅう',backToLearning);
 root.append(mk('div','card r394intro','📚 ならったことを たしかめよう。こたえを まちがえても だいじょうぶ。あとから せつめいを みられます。'));
 for(const kind of ['japanese','math']){
  const d=DATA[kind],c=mk('section','card r394subject');c.append(mk('h2','',d.icon+' '+d.name+'｜ぜんたいの まとめ'),mk('p','',d.intro));
  c.append(mk('p','r394small',`れんしゅう 10もん ／ まとめテスト 20もん ／ ${d.units.length}単元の けっかを かくにん`));
  c.append(btn('📖 たんげんを ふくしゅう',()=>reviewTopics(kind),'soft r394wide'));
  c.append(btn('🌱 れんしゅう 10もん',()=>begin(kind,'practice'),'soft r394wide'));
  c.append(btn('📝 まとめテスト 20もん',()=>begin(kind,'test'),'primary r394wide'));
  c.append(btn('📚 もとの たんげん きょうざいへ',()=>goUnits(kind),'soft r394wide'));
  root.append(c);
 }
 const note=mk('div','card r394note');note.append(mk('h3','','🌱 テストについて'));
 note.append(mk('p','','🔊 よみあげ・ゆっくりを つかっても げんてんしません。テスト中は せいかいを みせず、あとで ふくしゅうできます。'));
 note.append(mk('p','r394small','かん字の よむ・かく れんしゅうは、これまでの「かん字クエスト」を つかってください。学校の実際のテストとおなじ問題ではありません。'));
 root.append(note);
}
function reviewTopics(kind){const d=DATA[kind];page(d.icon+' '+d.name+'｜まなびの ふりかえり',home394);
 root.append(mk('div','card r394intro','ひとつずつの単元に もどって、せつめいとれんしゅうを かくにんできます。'));
 d.units.forEach((name,i)=>{const unit=mk('div','card r394topic');unit.append(mk('h3','',`${i+1}. ${name}`));unit.append(btn('📚 この教科の たんげん一覧へ',()=>goUnits(kind),'soft r394wide'));root.append(unit)});
 root.append(btn('📝 まとめテスト 20もん',()=>begin(kind,'test'),'primary r394wide'));
}
function begin(kind,mode){const d=DATA[kind];s={kind,mode,i:0,correct:0,answers:[],reads:0,started:Date.now(),saved:false,large:false};renderQuestion();}
function speak(text,slow=false,feedback=null){if(!window.speechSynthesis||!window.SpeechSynthesisUtterance){if(feedback)feedback.textContent='このたんまつでは、おとが つかえません。もじで すすめられます。';return;}
 try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='ja-JP';u.rate=slow?0.67:0.9;u.onerror=()=>{if(feedback)feedback.textContent='よみあげが つかえないときは、もじで すすめてね。';};speechSynthesis.speak(u);if(s)s.reads++;if(feedback)feedback.textContent=slow?'ゆっくり よんでいます。':'よんでいます。';}catch(e){if(feedback)feedback.textContent='このブラウザでは おとが つかえません。';}}
function renderQuestion(){if(!s)return home394();const d=DATA[s.kind],items=s.mode==='test'?d.questions:d.practice;
 if(s.i>=items.length)return finish();const q=items[s.i],n=s.i+1;
 page(`${d.icon} ${d.name}｜${s.mode==='test'?'まとめテスト':'れんしゅう'}`,home394);
 if(s.large)root.classList.add('r394large');else root.classList.remove('r394large');
 const c=mk('section','card r394question');c.append(mk('p','r394small',`${n} / ${items.length} もん｜${q.unit}`));
 const progress=mk('div','r394progress');progress.setAttribute('role','progressbar');progress.setAttribute('aria-label','とりくみ');progress.setAttribute('aria-valuenow',String(n));progress.setAttribute('aria-valuemin','0');progress.setAttribute('aria-valuemax',String(items.length));const bar=mk('span');bar.style.width=Math.round((n-1)/items.length*100)+'%';progress.append(bar);c.append(progress);
 if(q.source){const src=mk('div','r394source');src.append(mk('b','','📖 ぶんを よもう'),mk('p','',q.source));c.append(src)}
 c.append(mk('h2','',q.q));root.append(c);
 const msg=mk('p','r394small','おとが でなくても、もじを みて すすめられます。');const tools=mk('div','r394tools');tools.append(btn('🔊 よんで',()=>speak((q.source?q.source+'。':'')+q.q,false,msg)),btn('🐢 ゆっくり',()=>speak((q.source?q.source+'。':'')+q.q,true,msg)),btn(s.large?'A− もじを もどす':'A＋ もじを おおきく',()=>{s.large=!s.large;renderQuestion();}));root.append(tools,msg);
 const options=mk('section','r394options');q.choices.forEach((choice,i)=>options.append(btn(choice,()=>answer(i),'r394choice')));root.append(options);
 if(s.mode==='test')root.append(mk('p','r394small','テスト中は せいかいや ヒントを みせません。さいごに こたえを かくにんできます。'));
}
function answer(chosen){const d=DATA[s.kind],items=s.mode==='test'?d.questions:d.practice,q=items[s.i];if(s.answers.length!==s.i)return;
 const ok=chosen===q.correct;if(ok)s.correct++;s.answers.push(chosen);
 if(s.mode==='test'){s.i++;renderQuestion();return;}
 const options=root.querySelector('.r394options');if(options){options.querySelectorAll('button').forEach(b=>b.disabled=true)}
 const feedback=mk('div','card r394feedback');feedback.append(mk('h3','',ok?'🌱 あっているよ！':'🌱 いっしょに かくにんしよう'));
 feedback.append(mk('p','',`こたえ：${q.choices[q.correct]}`),mk('p','',q.ex));
 feedback.append(btn(s.i===items.length-1?'けっかへ':'つぎへ →',()=>{s.i++;renderQuestion()},'primary r394wide'));
 root.append(feedback);
}
function groupResult(d,items){return d.units.map(name=>{let total=0,correct=0;items.forEach((q,i)=>{if(q.unit===name){total++;if(s.answers[i]===q.correct)correct++;}});return {unit:name,total,correct};});}
function saveResult(d,items,groups){if(s.saved)return;s.saved=true;
 try{if(typeof records!=='undefined'&&Array.isArray(records)&&typeof profile!=='undefined'&&profile?.id&&typeof save==='function'){
 const rate=Math.round(s.correct/items.length*100);
 const item={studentId:profile.id,date:new Date().toISOString(),subject:d.name,grade:1,unit:`小学1年 ${d.name}全体 ${s.mode==='test'?'総まとめ':'練習10問'}`,content:s.mode==='test'?'総まとめ20問（単元横断）':'総復習の練習10問',correct:s.correct,total:items.length,rate,score:rate,reads:s.reads,hints:0,seconds:Math.round((Date.now()-s.started)/1000),status:`小1${d.name} ${rate}点`,unitResults:groups,learningSupport:s.reads?'読み上げ利用あり':'読み上げ利用なし'};
 records.push(item);try{save();}catch(e){records.pop();s.saved=false;throw e;}
 }else{s.saved=false;}
 }catch(e){s.saved=false;}
}
function finish(){const d=DATA[s.kind],items=s.mode==='test'?d.questions:d.practice,groups=groupResult(d,items),score=Math.round(s.correct/items.length*100);
 saveResult(d,items,groups);
 page(`🌱 ${d.name}｜けっか`,home394);
 const c=mk('section','card r394result');c.append(mk('h2','','さいごまで できたね！'),mk('p','r394score',`${score}てん`),mk('p','',`${s.correct} / ${items.length} もん せいかい`));
 c.append(mk('p','r394small',s.reads?`よみあげ ${s.reads}かい りよう（げんてんなし）`:'よみあげを つかわずに とりくみました。'));
 c.append(mk('p','r394small',s.saved?'このブラウザに けっかを きろくしました。':'きろくを ほぞんできなかった ばあいは、大人と いっしょに かくにんしてください。'));
 root.append(c);
 const g=mk('section','card r394result');g.append(mk('h2','','たんげんごとの けっか'));
 groups.forEach(x=>{const row=mk('div','r394unitrow');row.append(mk('span','',x.unit),mk('strong','',`${x.correct} / ${x.total}`));g.append(row)});root.append(g);
 const retry=groups.filter(x=>x.correct<x.total);const note=mk('section','card r394note');note.append(mk('h3','','📚 つぎの ふくしゅう'));
 note.append(mk('p','',retry.length?`この たんげんを もういちど みてみよう：${retry.map(x=>x.unit).join('・')}`:'どの単元も たしかめられました。べつの もんだいにも ちょうせんしてみよう。'));
 note.append(mk('p','r394small','1回の点数だけで、得意・不得意を決めません。'));root.append(note);
 root.append(btn('🔎 こたえと せつめいを みる',review,'primary r394wide'),btn('📖 もとの たんげんで まなぶ',()=>goUnits(s.kind),'soft r394wide'),btn('🔁 もういちど',()=>begin(s.kind,s.mode),'soft r394wide'),btn('📚 国語・算数の まとめへ',home394,'soft r394wide'));
}
function review(){if(!s)return home394();const d=DATA[s.kind],items=s.mode==='test'?d.questions:d.practice;
 page('🔎 こたえと せつめい',finish);
 items.forEach((q,i)=>{const ok=s.answers[i]===q.correct;const c=mk('section','card r394review');c.append(mk('h3','',`${i+1}. ${q.unit}　${ok?'○':'もういちど'}`));
 if(q.source)c.append(mk('p','r394sourceText','📖 '+q.source));c.append(mk('p','',q.q));c.append(mk('p','',`あなたの こたえ：${q.choices[s.answers[i]]||'未回答'}`));
 c.append(mk('p','',`せいかい：${q.choices[q.correct]}`),mk('p','r394small',q.ex));root.append(c)});
 root.append(btn('けっかへ もどる',finish,'primary r394wide'));
}
function inject(){const head=root.querySelector('.top h1');if(!head)return;const t=(head.textContent||'').trim();
 const grade1=/^(?:算数|国語)\s*[｜|]\s*小学1年$/.test(t)||/^📚 国語｜小学1年から確認/.test(t)||t==='算数｜小学1年 5つの単元'||t==='国語｜小学1年 ことばと よみとり'||t==='国語｜小学1年 のこり5単元';
 const map=t==='全学年の教材を確認'&&[...root.querySelectorAll('h2')].some(x=>x.textContent.includes('小学1年の単元メニュー'));
 const home=t==='🌱 Pono Learning Quest'||t==='🧒 今日の学習';
 if(!grade1&&!map&&!home)return;if(root.querySelector('[data-pono394-entry]'))return;
 const card=mk('section','card r394entry');card.dataset.pono394Entry='1';card.append(mk('h3','','📚 小学1年 国語・算数の そうふくしゅう'),mk('p','','国語10単元・算数5単元を まとめて たしかめられます。'));
 card.append(btn('📝 国語・算数の まとめを ひらく',home394,'primary r394wide'));
 const anchor=root.querySelector('.top');if(anchor)anchor.insertAdjacentElement('afterend',card);
}
let queued=false;new MutationObserver(()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;inject()})}).observe(root,{childList:true,subtree:true});inject();
window.ponoGrade1Review394=home394;
})();