/* Pono Learning Quest v36.7 — 小学6年社会 日本の歴史総復習 */
(function(){
'use strict';
const HISTORY367 = {"timeline":[["縄文〜弥生・古墳","狩りや採集 → 米づくり → 国のまとまり","米づくりが広がると、人々の協力や争い、首長の力が強まりました。卑弥呼や大和朝廷についても学びます。","暮らしと政治の始まり"],["飛鳥時代","聖徳太子・遣隋使・大化の改新","中国や朝鮮半島から学び、天皇を中心とした国の仕組みを整えようとしました。","大陸から学ぶ"],["奈良時代","平城京・大仏・天平文化","律令にもとづく政治が進み、聖武天皇は仏教の力で国を守ろうとしました。","政治と仏教"],["平安時代","貴族の政治・国風文化・武士の成長","平安京で貴族の文化が栄え、地方では武士が力をつけていきました。","文化から武士へ"],["鎌倉時代","源頼朝・御恩と奉公・元寇","武士が政治を担い、将軍と御家人は土地と軍役で結びつきました。","武士の政治"],["室町時代","足利氏・金閣・銀閣・応仁の乱","将軍や守護大名が政治を進め、文化が発展しました。応仁の乱の後、各地で戦国大名が力をつけました。","文化と戦国への変化"],["安土桃山時代","織田信長・豊臣秀吉・全国統一","信長が新しい政治や商業政策を進め、秀吉は太閤検地や刀狩を行って全国統一を進めました。","全国をまとめる"],["江戸時代","徳川家康・参勤交代・街道・町人文化","幕府と藩が治め、交通や商業が発達。寺子屋、歌舞伎、浮世絵、蘭学なども広がりました。","長い平和と社会の発達"],["幕末","ペリー来航・開国・大政奉還","外国との関係を大きく変え、幕府の政治が終わって新しい政府へ移りました。","開国から新政府へ"],["明治時代","廃藩置県・学制・自由民権運動・憲法","中央政府の仕組みや学校、税、軍隊を整え、国会が開かれるようになりました。","国の仕組みをつくる"],["大正〜昭和前期","政治参加の広がり・戦争への道","男子普通選挙が実現した一方、国内外の対立が深まり、中国などで戦争が拡大しました。","政治と戦争"],["昭和・戦時下","日中戦争・太平洋戦争・人々の暮らし","配給や学童疎開が行われ、戦争で日本国内とアジアの多くの人々が被害を受けました。","戦争と命"],["戦後〜現在","日本国憲法・復興・高度経済成長・環境","平和を大切にする国づくりと復興が進みました。経済の発展とともに公害などの課題も生まれました。","平和と暮らしを考える"]],"practice":[{"era":"国づくりへの歩み","cat":"資料の読み取り","type":"choice","q":"【資料】水田が広がり、米をたくわえる倉庫がある集落。暮らしを大きく変えたものは？","a":"米づくり","w":["参勤交代","工場での機械生産"],"ex":"弥生時代の米づくりの広がりで、人々の協力や村のまとまりが重要になりました。"},{"era":"大陸に学んだ国づくり","cat":"国づくり","type":"choice","q":"聖徳太子が遣隋使を送った主な目的は？","a":"隋の政治制度や文化を学ぶため","w":["全国の大名を統制するため","外国との関係を完全に断つため"],"ex":"遣隋使は大陸の制度や文化を学び、国づくりに生かすために送られました。"},{"era":"武士の政治が始まる","cat":"関係の理解","type":"choice","q":"鎌倉幕府で、将軍が御家人に土地を与えたり支配を認めたりすることは？","a":"御恩","w":["奉公","参勤交代"],"ex":"将軍の御恩に対し、御家人は戦いなどの奉公をしました。"},{"era":"室町文化と力をつける人々","cat":"文化の比較","type":"choice","q":"室町時代、銀閣や書院造などと特に関係が深い文化は？","a":"東山文化","w":["天平文化","元禄文化"],"ex":"足利義政のころの東山文化は、今の日本文化に通じるものが多くあります。"},{"era":"全国統一への動き","cat":"人物","type":"choice","q":"太閤検地によって土地の耕作者や石高などを調べた人物は？","a":"豊臣秀吉","w":["徳川家康","源頼朝"],"ex":"豊臣秀吉は検地や刀狩などを進め、全国統一を進めました。"},{"era":"幕府の政治と人々の暮らし","cat":"政治・暮らし","type":"choice","q":"江戸時代の「参勤交代」が幕府の政治に役立ったのはなぜ？","a":"大名を統制することにつながったから","w":["貴族が朝廷からいなくなったから","すべての農民が江戸へ移り住んだから"],"ex":"大名の江戸への往復や屋敷の維持は大きな負担になり、幕府の統制にもつながりました。"},{"era":"新しい文化と学問","cat":"文化・学問","type":"choice","q":"「解体新書」に関わった杉田玄白が学んだ、西洋の医学などの学問は？","a":"蘭学","w":["国学","朱子学"],"ex":"蘭学ではオランダ語を通して西洋の医学や科学を学びました。"},{"era":"明治の新しい国づくり","cat":"順序の理解","type":"choice","q":"古い順に正しく並んでいるのは？","a":"ペリー来航 → 大政奉還 → 廃藩置県","w":["廃藩置県 → ペリー来航 → 大政奉還","大政奉還 → 廃藩置県 → ペリー来航"],"ex":"1853年ペリー来航、1867年大政奉還、1871年廃藩置県の順です。"},{"era":"近代国家を目ざして","cat":"政治参加","type":"choice","q":"板垣退助らが国会の開設を求めた運動を何という？","a":"自由民権運動","w":["尊王攘夷運動","大政奉還"],"ex":"自由民権運動は国民の意見を政治に反映させることを求めました。"},{"era":"戦争と人々の暮らし","cat":"暮らしと戦争","type":"choice","q":"戦争中、子どもたちが空襲の危険を避けるため都市から地方へ移ることは？","a":"学童疎開","w":["参勤交代","集団就職"],"ex":"学童疎開では子どもたちが家族と離れて生活することもありました。"},{"era":"平和で豊かな暮らしを目ざして","cat":"社会の変化","type":"choice","q":"高度経済成長が進むなかで、工場の排水や排煙などが原因となった社会問題は？","a":"公害","w":["元寇","大化の改新"],"ex":"工業の発展に伴い水や空気の汚染などの公害が深刻になりました。"}],"test":[{"era":"国づくりへの歩み","cat":"暮らしの変化","type":"choice","q":"弥生時代に水田での米づくりが広がったことで、むらでは何が起こった？","a":"水や土地を共同で管理する必要が増えた","w":["人々が全く協力しなくなった","全国に幕府が置かれた"],"ex":"米づくりには水田や水路の管理など、人々の協力が必要でした。"},{"era":"大陸に学んだ国づくり","cat":"人物と交流","type":"choice","q":"聖徳太子の時代、隋に派遣された使いの一人は？","a":"小野妹子","w":["杉田玄白","福沢諭吉"],"ex":"小野妹子は遣隋使として派遣され、大陸の文化や制度を学びました。"},{"era":"大陸に学んだ国づくり","cat":"改革","type":"choice","q":"645年、中大兄皇子と中臣鎌足らが進めた政治改革は？","a":"大化の改新","w":["建武の新政","明治維新"],"ex":"大化の改新は天皇中心の国づくりを進めるきっかけとなりました。"},{"era":"武士の政治が始まる","cat":"人物","type":"choice","q":"鎌倉を政治の拠点として武士による政治を進めた人物は？","a":"源頼朝","w":["足利尊氏","徳川家康"],"ex":"源頼朝は鎌倉を政治の中心とし、1192年に征夷大将軍になりました。"},{"era":"武士の政治が始まる","cat":"出来事と影響","type":"choice","q":"元寇後、鎌倉幕府が弱まった一因は？","a":"御家人に十分な恩賞を与えにくかった","w":["広い新しい領地を獲得した","御家人が全員幕府から離れた"],"ex":"元寇は日本を守る戦いで、新しい土地を得にくかったため、恩賞不足が不満につながりました。"},{"era":"室町文化と力をつける人々","cat":"人物と文化","type":"choice","q":"金閣に代表される北山文化と深い関係がある将軍は？","a":"足利義満","w":["足利義政","足利尊氏"],"ex":"足利義満のころ、北山文化が栄えました。"},{"era":"室町文化と力をつける人々","cat":"出来事と影響","type":"choice","q":"1467年に始まり、戦国の世へつながるきっかけとなった争いは？","a":"応仁の乱","w":["壬申の乱","承久の乱"],"ex":"応仁の乱で京都を中心に戦いが長引き、室町幕府の力が弱まっていきました。"},{"era":"全国統一への動き","cat":"政策","type":"choice","q":"織田信長が城下町などの商業を活発にするために進めた政策は？","a":"楽市・楽座","w":["参勤交代","地租改正"],"ex":"楽市・楽座は商売に関する特権や規制を見直し、商業を活発にする政策でした。"},{"era":"全国統一への動き","cat":"政策","type":"input","q":"豊臣秀吉が農民などから武器を取り上げようとした政策は？","a":"刀狩","w":["太閤検地","武家諸法度"],"ex":"刀狩は農民などから武器を取り上げ、武士と農民の身分の区別を進める政策でした。"},{"era":"幕府の政治と人々の暮らし","cat":"人物・年代","type":"choice","q":"1603年、江戸幕府を開いた人物は？","a":"徳川家康","w":["徳川家光","徳川慶喜"],"ex":"徳川家康は1603年に江戸幕府を開きました。"},{"era":"幕府の政治と人々の暮らし","cat":"対外関係","type":"choice","q":"江戸時代、外国や周辺地域との交流について正しいものは？","a":"長崎や対馬など複数の窓口で交流が続いた","w":["外国との交流は完全になくなった","全国すべての港で自由に貿易した"],"ex":"対外関係は制限されましたが、長崎・対馬・薩摩・松前などを通して交流が続きました。"},{"era":"新しい文化と学問","cat":"学問","type":"choice","q":"オランダ語を通して西洋の医学や科学を学ぶ学問は？","a":"蘭学","w":["国学","和歌"],"ex":"江戸時代、蘭学によって西洋の医学や科学の知識が取り入れられました。"},{"era":"明治の新しい国づくり","cat":"政治の変化","type":"choice","q":"1867年、徳川慶喜が政権を朝廷に返した出来事は？","a":"大政奉還","w":["廃藩置県","地租改正"],"ex":"大政奉還によって、幕府の政治は終わりへ向かいました。"},{"era":"明治の新しい国づくり","cat":"改革","type":"choice","q":"1871年、藩をなくして府や県を置いた改革は？","a":"廃藩置県","w":["版籍奉還","地租改正"],"ex":"廃藩置県によって中央政府が全国を治める仕組みが強まりました。"},{"era":"近代国家を目ざして","cat":"政治参加","type":"choice","q":"板垣退助らが国会の開設や国民の政治参加を求めた運動は？","a":"自由民権運動","w":["大政奉還","尊王攘夷運動"],"ex":"自由民権運動は、国会を開き政治に人々の意見を反映させることを求めました。"},{"era":"近代国家を目ざして","cat":"憲法","type":"choice","q":"1889年に発布され、天皇に主権があるとされた憲法は？","a":"大日本帝国憲法","w":["日本国憲法","十七条の憲法"],"ex":"大日本帝国憲法は1889年に発布され、現在の日本国憲法とは主権の考え方が違いました。"},{"era":"戦争と人々の暮らし","cat":"戦争の流れ","type":"choice","q":"1937年、日本と中国の間で始まった戦争は？","a":"日中戦争","w":["日清戦争","日露戦争"],"ex":"日中戦争は1937年から長引き、中国の多くの人々にも被害をもたらしました。"},{"era":"戦争と人々の暮らし","cat":"子どもの暮らし","type":"choice","q":"戦争中、子どもが空襲を避けて都市から地方へ移ることは？","a":"学童疎開","w":["参勤交代","勤労動員"],"ex":"学童疎開では、都市部の子どもたちが空襲を避けて地方で生活しました。"},{"era":"平和で豊かな暮らしを目ざして","cat":"日本国憲法","type":"input","q":"日本国憲法の三つの基本原則のうち、政治の最終的な決定権が国民にあることを示す原則は？","a":"国民主権","w":["天皇主権","中央集権"],"ex":"日本国憲法の三原則は国民主権・基本的人権の尊重・平和主義です。"},{"era":"平和で豊かな暮らしを目ざして","cat":"経済と暮らし","type":"choice","q":"高度経済成長のころの変化として適切なのは？","a":"工業や家電製品が発達する一方、公害も問題になった","w":["工業は衰え、交通機関は減った","公害はまったく起こらなかった"],"ex":"戦後の高度経済成長で生活は大きく変化しましたが、公害などの課題も生まれました。"}]};
const ERA367 = HISTORY367.timeline;
const PRACTICE367 = HISTORY367.practice;
const TEST367 = HISTORY367.test;
let run367 = null;
function escape367(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function norm367(s){return String(s||'').normalize('NFKC').replace(/[、。，,.\s「」『』（）()・:：!?！？]/g,'').trim();}
function correct367(v,q){return norm367(v)===norm367(q.a);}
function ordered367(q,i){const opts=[q.a,...q.w].map((txt,j)=>({txt,ok:j===0}));const indexes=[[1,0,2],[2,1,0],[0,2,1],[1,2,0],[2,0,1],[0,1,2]];return indexes[(i+2)%6].map(j=>opts[j]);}
function heading367(text,back){head(text,back||openHome367);}
function speak367(s){try{speakJP(s);}catch(e){ /* 音声非対応時も学習を続けられる */ }}
function openHome367(){heading367('社会｜日本の歴史 全体の復習',()=>subjectGradeTerms('社会',6));
 A.append(e('div','card hist367intro','<div class="tiny">小学6年 社会 ／ 日本の歴史</div><h2>歴史の流れをつかもう</h2><p>時代を順にたどって、<b>何が変わったのか・なぜ変わったのか</b>を考えます。まず年表を見て、練習問題で確かめましょう。</p>'));
 A.append(btn('📖 時代の流れを復習する',openTimeline367,'primary'));
 A.append(btn('🌱 つながり練習11問',()=>startPractice367(PRACTICE367,'全時代の練習'),'soft'));
 A.append(btn('📝 歴史全体まとめテスト20問',startTest367,'soft'));
 A.append(e('div','card hist367tip','<b>学習のポイント</b><p>年号だけでなく、「出来事 → 理由 → その後の変化」の順で説明できると学校のテストでも役立ちます。読み上げ、選択式、音声入力も使えます。</p>'));
}
function openTimeline367(){heading367('📖 13段階でたどる日本の歴史',openHome367);
 A.append(e('div','card hist367intro','<h2>日本の歴史を一続きに</h2><p>はじめは「くらしの変化」、次に「政治の中心」、そして「外国との関係」「戦争と平和」の順に考えてみよう。</p>'));
 const box=e('div','hist367timeline','');ERA367.forEach((x,i)=>{
  const d=e('article','hist367period',`<div class="hist367label">${i+1} / ${ERA367.length}｜${escape367(x[3])}</div><strong>${escape367(x[0])}</strong><span class="hist367key">${escape367(x[1])}</span><small>${escape367(x[2])}</small>`);
  box.appendChild(d);
 });A.append(box);
 A.append(e('div','card hist367intro',`<h2>🔍 つながりを確かめよう</h2>
 <div class="hist367flow"><span>むらと国の成立</span><b>→</b><span>貴族・武士の政治</span><b>→</b><span>全国統一・幕府</span><b>→</b><span>近代国家</span><b>→</b><span>戦争と平和</span></div>
 <p><b>政治：</b>国をまとめる人や仕組みがどう変わったか。</p><p><b>暮らし：</b>米づくり・商業・工業・教育で何が変わったか。</p><p><b>外国との関係：</b>大陸の文化・開国・戦争・国際協力がどうつながるか。</p>`));
 A.append(btn('🔊 年表の説明を聞く',()=>speak367(ERA367.map(x=>x[0]+'。'+x[1]+'。'+x[2]).join('。')),'soft'));
 A.append(btn('🌱 つながり練習11問へ',()=>startPractice367(PRACTICE367,'全時代の練習'),'primary'));
 A.append(btn('📝 まとめテスト20問へ',startTest367,'soft'));
}
function startPractice367(qs,title){run367={mode:'practice',title,qs:qs.map(x=>({...x})),i:0,first:0,miss:new Set()};showPractice367();}
function showPractice367(){const s=run367,q=s.qs[s.i];if(!q)return practiceDone367();heading367(`🌱 ${s.title} ${s.i+1} / ${s.qs.length}`,openHome367);
 A.append(e('div','card',`<div class="hist367label">${escape367(q.era)} ／ ${escape367(q.cat)}</div><h2 class="hist367focus">${escape367(q.q)}</h2>`));
 A.append(btn('🔊 問題を聞く',()=>speak367(q.q),'soft'));
 ordered367(q,s.i).forEach(opt=>A.append(btn(opt.txt,()=>answerPractice367(q,opt.ok),'soft')));
}
function answerPractice367(q,ok){const s=run367;if(!ok){s.miss.add(s.i);heading367('🌱 解説を読んでみよう',showPractice367);A.append(e('div','card warn',`<h2>答えを確認しよう</h2><p><b>答え：</b>${escape367(q.a)}</p><p>${escape367(q.ex)}</p>`));A.append(btn('同じ問題をもう一度',showPractice367,'primary'));return;}
 if(!s.miss.has(s.i))s.first++;if(window.ponoCorrectSound)window.ponoCorrectSound();heading367('○ できました',showPractice367);
 A.append(e('div','card good',`<h2>できました</h2><p><b>答え：</b>${escape367(q.a)}</p><p>${escape367(q.ex)}</p>`));s.i++;
 A.append(btn(s.i<s.qs.length?'次の問題へ':'結果を見る',s.i<s.qs.length?showPractice367:practiceDone367,'primary'));
}
function practiceDone367(){const s=run367;heading367('🌱 歴史の練習 結果',openHome367);
 A.append(e('div','card',`<h2>初回正解 ${s.first} / ${s.qs.length}</h2><p>わからなかった問題も、解説を読んで取り組めたことが大切です。</p>`));
 A.append(btn('📖 年表でもう一度確認',openTimeline367,'soft'));
 A.append(btn('📝 まとめテスト20問へ',startTest367,'primary'));
 A.append(btn('🌱 11問をもう一度',()=>startPractice367(PRACTICE367,'全時代の練習'),'soft'));
}
function startTest367(){run367={mode:'test',title:'歴史全体まとめテスト',qs:TEST367.map(x=>({...x})),i:0,answers:[]};showTest367();}
function voice367(ta,msg){const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR){msg.textContent='この端末では音声入力を利用できません。文字入力で回答できます。';return;}
 try{const r=new SR();r.lang='ja-JP';r.onresult=ev=>{ta.value=ev.results[0][0].transcript;msg.textContent='声を文字にしました。確認してから次へ進みましょう。';};r.onerror=()=>{msg.textContent='うまく聞き取れませんでした。';};r.start();}catch(e){msg.textContent='マイクを開始できませんでした。';}}
function showTest367(){const s=run367,q=s.qs[s.i];if(!q)return result367();heading367(`📝 日本の歴史 ${s.i+1} / ${s.qs.length}`,openHome367);
 A.append(e('div','card',`<div class="hist367label">${escape367(q.era)} ／ ${escape367(q.cat)} ／ 5点</div><h2 class="hist367focus">${escape367(q.q)}</h2>`));
 A.append(btn('🔊 問題を聞く',()=>speak367(q.q),'soft'));
 if(q.type==='input'){
  const box=e('div','card soft','<p><b>言葉で答えましょう（音声入力も使えます）</b></p>');const ta=document.createElement('textarea');ta.rows=2;ta.setAttribute('aria-label','問題の答え');box.appendChild(ta);
  const msg=e('div','tiny','');box.appendChild(btn('🎤 音声で答える',()=>voice367(ta,msg),'soft'));box.appendChild(msg);
  box.appendChild(btn('この答えで次へ',()=>{const val=ta.value.trim();if(!val){msg.textContent='答えを入力してください。';return;}record367(q,correct367(val,q),val);},'primary'));A.append(box);
 } else ordered367(q,s.i).forEach(opt=>A.append(btn(opt.txt,()=>record367(q,opt.ok,opt.txt),'soft')));
 A.append(e('p','tiny','※テスト中は答えや解説を表示しません。結果画面で確認できます。'));
}
function record367(q,ok,user){const s=run367;s.answers.push({q,ok,user});s.i++;s.i<s.qs.length?showTest367():result367();}
function result367(){const s=run367,correct=s.answers.filter(x=>x.ok).length,score=correct*5;
 heading367('📝 歴史全体まとめテスト｜結果',openHome367);
 A.append(e('div',`card ${score>=70?'good':'warn'}`,`<h2>${score}点 / 100点</h2><p>${correct} / 20問 正解</p><p>間違えた時代をもう一度練習することで、歴史のつながりが見えてきます。</p><p class="tiny">記述は語句一致の自動採点です。音声入力の誤変換や別の正しい表記は先生が確認してください。</p>`));
 const eras=[];s.qs.forEach(q=>{if(!eras.includes(q.era))eras.push(q.era);});
 const grid=e('div','hist367stats','');eras.forEach(era=>{
  const items=s.answers.filter(x=>x.q.era===era);const n=items.filter(x=>x.ok).length;
  grid.appendChild(e('article','',`<strong>${escape367(era)}</strong><small>正解 ${n} / ${items.length}</small>`));
 });A.append(grid);
 A.append(btn('📖 全20問の答えと解説',review367,'primary'));
 const misses=s.answers.filter(x=>!x.ok).map(x=>({...x.q,type:'choice'}));if(misses.length){A.append(btn(`🌱 間違えた${misses.length}問を復習`,()=>startPractice367(misses,'間違えた問題の復習'),'soft'));}
 A.append(btn('📖 歴史の流れに戻る',openTimeline367,'soft'));
 try{records.push({studentId:profile.id,date:new Date().toISOString(),subject:'社会',grade:6,unit:'日本の歴史',content:'歴史全体まとめテスト20問',correct,total:20,rate:score,score,status:`歴史総まとめ ${score}点`});save();}catch(e){}
}
function review367(){const s=run367;heading367('📖 歴史全体の答えと解説',()=>resultView367());
 s.answers.forEach((a,i)=>A.append(e('div',`card ${a.ok?'good':'warn'}`,`<div class="hist367label">問${i+1} ／ ${escape367(a.q.era)} ／ ${a.ok?'○':'×'}</div><h3>${escape367(a.q.q)}</h3><p><b>あなたの答え：</b>${escape367(a.user)}</p><p><b>答え：</b>${escape367(a.q.a)}</p><p>${escape367(a.q.ex)}</p>`)));
 A.append(btn('📖 年表へ戻る',openTimeline367,'soft'));
}
function resultView367(){// 解説から戻る際は結果を再表示するが、成績を重複保存しない
 const s=run367,correct=s.answers.filter(x=>x.ok).length,score=correct*5;
 heading367('📝 歴史全体まとめテスト｜結果',openHome367);
 A.append(e('div',`card ${score>=70?'good':'warn'}`,`<h2>${score}点 / 100点</h2><p>${correct} / 20問 正解</p>`));
 A.append(btn('📖 全20問の答えと解説',review367,'primary'));
 const misses=s.answers.filter(x=>!x.ok).map(x=>({...x.q,type:'choice'}));if(misses.length)A.append(btn(`🌱 間違えた${misses.length}問を復習`,()=>startPractice367(misses,'間違えた問題の復習'),'soft'));
}
function ensureHistoryEntry367(){const root=document.getElementById('app');if(!root||root.querySelector('#history367entry'))return;
 const labels=Array.from(root.querySelectorAll('button'));const old=labels.find(b=>(b.textContent||'').trim()==='日本の歴史 まとめテスト20問');
 if(!old)return;
 const prior=old.previousElementSibling;if(!prior||!(prior.textContent||'').includes('大単元まとめテスト'))return;
 const panel=e('div','card hist367panel','<h3>📖 日本の歴史・全体の復習</h3><p>11の小単元が終わったら、年表で「時代の流れ」を振り返り、学校のテストに備えましょう。</p>');panel.id='history367entry';
 panel.appendChild(btn('📖 時代の流れを復習する',openTimeline367,'primary'));
 panel.appendChild(btn('🌱 つながり練習11問',()=>startPractice367(PRACTICE367,'全時代の練習'),'soft'));
 if(prior.parentNode)prior.parentNode.insertBefore(panel,prior);
 old.replaceWith(btn('📝 歴史全体まとめテスト20問',startTest367,'primary'));
}
if(typeof MutationObserver!=='undefined'){
 const root=document.getElementById('app');if(root){const observer=new MutationObserver(ensureHistoryEntry367);observer.observe(root,{childList:true});ensureHistoryEntry367();}
}
document.addEventListener('click',function(ev){const b=ev.target&&ev.target.closest?ev.target.closest('button'):null;if(!b)return;
 const text=(b.textContent||'').trim();if(text!=='日本の歴史 まとめテスト20問')return;
 const page=(document.getElementById('app')?.textContent||'');if(!page.includes('日本の歴史'))return;
 ev.preventDefault();ev.stopImmediatePropagation();startTest367();
},true);
})();
