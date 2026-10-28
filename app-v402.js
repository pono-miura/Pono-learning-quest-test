/* Pono Learning Quest v40.2 — 小学3年・算数10単元の総復習。
   学習者IDや既存記録は変更せず、新たな結果だけを追加します。 */
(function(){
'use strict';
const root=document.getElementById('app');if(!root)return;
const DATA={"units":["かけ算","時こくと時間","わり算","たし算とひき算の筆算","長いものの長さ","表とぼうグラフ","あまりのあるわり算","大きい数","かけ算の筆算","分数"],"questions":[{"unit":"かけ算","q":"3×8を 3×5と3×3に分けると？","choices":["15＋9","15＋3","8＋5＋3"],"correct":0,"ex":"3×5＝15、3×3＝9なので24です。"},{"unit":"かけ算","q":"1箱に9本ずつの鉛筆が6箱。全部で何本？","choices":["15本","54本","56本"],"correct":1,"ex":"9×6＝54本です。"},{"unit":"時こくと時間","q":"11時45分から12時05分は何分間？","choices":["40分間","30分間","20分間"],"correct":2,"ex":"12時まで15分、そのあと5分です。"},{"unit":"時こくと時間","q":"10時30分の45分後は？","choices":["11時15分","10時75分","11時45分"],"correct":0,"ex":"10時30分から11時は30分、残り15分です。"},{"unit":"わり算","q":"28このおはじきを4人で同じ数ずつ分けると、1人何こ？","choices":["24こ","7こ","8こ"],"correct":1,"ex":"28÷4＝7です。"},{"unit":"わり算","q":"36÷4を確かめるかけ算は？","choices":["4×8＝32","36×4＝144","4×9＝36"],"correct":2,"ex":"商9×4＝36です。"},{"unit":"たし算とひき算の筆算","q":"487＋235＝？","choices":["722","712","732"],"correct":0,"ex":"7＋5でくり上がり、8＋3＋1＝12で百へくり上がります。"},{"unit":"たし算とひき算の筆算","q":"700－456＝？","choices":["254","244","344"],"correct":1,"ex":"700−400＝300、そこから56を引いて244です。"},{"unit":"長いものの長さ","q":"2km300mは何m？","choices":["2030m","500m","2300m"],"correct":2,"ex":"2000m＋300m＝2300mです。"},{"unit":"長いものの長さ","q":"1km500mから800m引くと？","choices":["700m","2km300m","1300m"],"correct":0,"ex":"1500−800＝700mです。"},{"unit":"表とぼうグラフ","q":"1目もりが5人。ぼうが4目もりなら？","choices":["15人","20人","9人"],"correct":1,"ex":"5×4＝20人です。"},{"unit":"表とぼうグラフ","q":"表：犬8人・ねこ9人・鳥3人。ぜんぶで何人？","choices":["17人","14人","20人"],"correct":2,"ex":"8＋9＋3＝20人です。"},{"unit":"あまりのあるわり算","q":"14人が5人ずつ乗れる車で出発。必要な車は？","choices":["3台","4台","2台"],"correct":0,"ex":"14÷5＝2 あまり4。残り4人にも1台必要です。"},{"unit":"あまりのあるわり算","q":"「16÷5＝2 あまり6」のどこがおかしい？","choices":["16という数","あまり6は5より大きい","商が2であること"],"correct":1,"ex":"あまりはわる数より小さくします。正しくは3 あまり1です。"},{"unit":"大きい数","q":"「6万と700」を数字で書くと？","choices":["67000","6007","60700"],"correct":2,"ex":"60000＋700＝60700です。"},{"unit":"大きい数","q":"次のうち大きい数は？","choices":["81000","80000","79000"],"correct":0,"ex":"81000は8万1千です。"},{"unit":"かけ算の筆算","q":"27×3＝？","choices":["71","81","84"],"correct":1,"ex":"7×3＝21、十の位へ2をくり上げます。"},{"unit":"かけ算の筆算","q":"132×3＝？","choices":["366","399","396"],"correct":2,"ex":"100×3＋30×3＋2×3＝396です。"},{"unit":"分数","q":"1/4＋2/4＝？","choices":["3/4","2/4","3/8"],"correct":0,"ex":"同じ4等分なので、分子1＋2＝3です。"},{"unit":"分数","q":"2/3と1/3。大きいのは？","choices":["1/3","2/3","同じ"],"correct":1,"ex":"3等分のうち2つ分が大きいです。"}],"practice":[{"unit":"かけ算","q":"3こずつの あめが4ふくろ。ぜんぶで なんこ？","choices":["9こ","12こ","7こ"],"correct":1,"ex":"3×4＝12です。同じ数が4つ分あります。"},{"unit":"時こくと時間","q":"1時間30分は 何分？","choices":["70分","130分","90分"],"correct":2,"ex":"60＋30＝90分です。"},{"unit":"わり算","q":"12このあめを3人で同じ数ずつ分けると1人何こ？","choices":["4こ","3こ","9こ"],"correct":0,"ex":"12÷3＝4です。"},{"unit":"たし算とひき算の筆算","q":"123＋245＝？","choices":["378","368","358"],"correct":1,"ex":"一・十・百の位をそれぞれ足します。"},{"unit":"長いものの長さ","q":"1km200mは何m？","choices":["1020m","200m","1200m"],"correct":2,"ex":"1000＋200＝1200mです。"},{"unit":"表とぼうグラフ","q":"6人・4人・8人の合計は？","choices":["18人","16人","14人"],"correct":0,"ex":"6＋4＋8＝18人です。"},{"unit":"あまりのあるわり算","q":"20÷6は？","choices":["4 あまり2","3 あまり2","3 あまり1"],"correct":1,"ex":"6×3＋2＝20です。"},{"unit":"大きい数","q":"45000は何万何千？","choices":["4万50","45万","4万5千"],"correct":2,"ex":"40000＋5000です。"},{"unit":"かけ算の筆算","q":"23×3＝？","choices":["69","63","96"],"correct":0,"ex":"20×3＋3×3＝60＋9＝69です。"},{"unit":"分数","q":"1/6と4/6。大きいのは？","choices":["同じ","4/6","1/6"],"correct":1,"ex":"6等分のうち4つ分のほうが大きいです。"}]};
let session=null;
const el=(tag,cls,txt)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(txt!==undefined)e.textContent=txt;return e;};
const btn=(label,handler,cls='soft')=>{const b=el('button',cls,label);b.type='button';b.addEventListener('click',handler);return b;};
function navigateHome(){
 if(typeof window.ponoAllGrades390==='function')window.ponoAllGrades390(3);
 else if(typeof subjectGradeTerms==='function')subjectGradeTerms('算数',3);
 else if(typeof child==='function')child();
}
function page(title,back=home){try{window.speechSynthesis?.cancel()}catch(_){}root.replaceChildren();
 const hd=el('div','top');hd.append(btn('← もどる',back,'back'),el('h1','m402title',title));root.append(hd);try{window.scrollTo(0,0)}catch(_){}
}
function voice(text){
 const box=el('div','m402voice'),note=el('p','m402hint','');
 function read(slow){
  try{if(!window.speechSynthesis||!window.SpeechSynthesisUtterance)throw Error('unsupported');
   window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='ja-JP';u.rate=slow?0.72:0.94;
   window.speechSynthesis.speak(u);note.textContent='読み上げを開始しました。';if(session)session.reads++;
  }catch(_){note.textContent='この端末では音声が使えません。画面の文字で進められます。';}
 }
 box.append(btn('🔊 よみあげ',()=>read(false)),btn('🐢 ゆっくり',()=>read(true)),note);return box;
}
function home(){page('算数｜小学3年 10単元の そうふくしゅう',navigateHome);
 const intro=el('section','card m402intro');intro.append(el('h2','','できるところから たしかめよう'),el('p','','小学3年生の算数10単元をまとめて復習します。わからない問題があっても大丈夫。学習した単元へ戻れます。'),el('p','m402note','読み上げを使っても減点しません。Ponoのオリジナル問題です。学校の特定のテストと同じではありません。'));root.append(intro);
 const card=el('section','card m402start');card.append(el('h2','','🌱 練習10問'),el('p','','1単元から1問ずつ。答えたあと、その場で説明を確認できます。'),btn('練習10問をはじめる',()=>begin('practice'),'soft m402wide'));
 const test=el('section','card m402start');test.append(el('h2','','📝 まとめテスト20問'),el('p','','1単元から2問ずつ。100点満点。テスト中は正解やヒントを表示しません。'),btn('まとめテスト20問へ',()=>begin('test'),'primary m402wide'));
 root.append(card,test);
 const details=el('section','card m402units');details.append(el('h2','','📚 10単元を もういちど まなぶ'),el('p','m402note','前半5単元・後半5単元の詳しい説明や問題に戻れます。'));
 DATA.units.forEach((unit,i)=>details.append(btn(`${i+1}. ${unit} の学習へ`,()=>jump(unit),'soft m402wide')));root.append(details);
}
function jump(unit){const i=DATA.units.indexOf(unit);const name=i<5?'ponoGrade3Math400':'ponoGrade3Math401';
 if(typeof window[name]==='function'){
  window[name]();
  const selectors=i<5?'.m400unit':'.m401unit';
  const card=[...root.querySelectorAll(selectors)].find(n=>(n.querySelector('h2')?.textContent||'').includes(unit));
  if(card){const learning=[...card.querySelectorAll('button')].find(n=>/まなぶ/.test(n.textContent));
   if(learning){learning.click();return;}}
  return;
 }
 if(typeof subjectGradeTerms==='function')subjectGradeTerms('算数',3);else home();
}
function begin(mode){session={mode,qs:mode==='test'?DATA.questions:DATA.practice,index:0,picks:[],reads:0,started:Date.now(),saved:false};question();}
function question(){const s=session;if(!s)return home();if(s.index>=s.qs.length)return result();
 const q=s.qs[s.index];page(s.mode==='test'?'📝 算数のまとめテスト':'🌱 算数の練習',()=>home());
 root.append(el('p','m402count',`${s.index+1} / ${s.qs.length} もん　｜　${q.unit}`));
 const bar=el('div','m402bar'),fill=el('div','m402fill');fill.style.width=(100*s.index/s.qs.length)+'%';bar.append(fill);root.append(bar);
 const card=el('section','card m402question');card.append(el('h2','',q.q));root.append(card,voice(q.q));
 q.choices.forEach((txt,i)=>root.append(btn(txt,()=>pick(i),'soft m402choice')));
 root.append(el('p','m402note',s.mode==='test'?'テスト中は答えと解説は表示されません。あとでまとめて確認できます。':'えらんだあと、答えと考え方を確認できます。'));
}
function pick(choice){const s=session;if(!s||s.picks.length!==s.index)return;
 const q=s.qs[s.index];s.picks.push(choice);root.querySelectorAll('button.m402choice').forEach(b=>b.disabled=true);
 if(s.mode==='test'){s.index++;question();return;}
 const ok=choice===q.correct,feedback=el('section','card m402feedback');feedback.append(el('h3','',ok?'😊 せいかい！':'🌱 考え方をたしかめよう'),el('p','',`こたえ：${q.choices[q.correct]}`),el('p','',q.ex));root.append(feedback);
 root.append(btn(s.index+1===s.qs.length?'結果を見る':'つぎの問題へ →',()=>{s.index++;question();},'primary m402wide'));
}
function gradeReport(s){const out=DATA.units.map(unit=>({unit,correct:0,total:0}));
 s.qs.forEach((q,i)=>{const r=out.find(x=>x.unit===q.unit);if(r){r.total++;if(s.picks[i]===q.correct)r.correct++;}});return out;
}
function saveResult(s,score,correct){if(s.saved)return;s.saved=true;
 try{
  if(typeof records==='undefined'||!Array.isArray(records)||typeof profile==='undefined'||!profile?.id||typeof save!=='function')throw Error('学習記録の保存機能が見つかりません');
  const unitResults=gradeReport(s);
  records.push({studentId:profile.id,date:new Date().toISOString(),subject:'算数',grade:3,unit:'小学3年 算数全体のまとめ',unitId:'math3_review402',content:s.mode==='test'?'総まとめ20問':'総復習練習10問',correct,total:s.qs.length,score,rate:score,reads:s.reads,seconds:Math.round((Date.now()-s.started)/1000),status:s.mode==='test'?'総まとめ確認':'総まとめ練習',unitResults,supportNote:'読み上げ利用でも減点なし'});
  save();
 }catch(e){root.append(el('p','m402warning','この端末に学習記録を保存できませんでした。大人に伝えてください。'));}
}
function result(){const s=session;if(!s)return home();const correct=s.qs.reduce((n,q,i)=>n+(s.picks[i]===q.correct?1:0),0),score=Math.round(correct/s.qs.length*100);
 page('📊 算数の結果',home);const card=el('section','card m402result');card.append(el('p','m402note',s.mode==='test'?'20問・100点満点':'10問の練習'),el('h2','',`${score}てん`),el('p','',`${correct} / ${s.qs.length} もん せいかい`),el('p','m402note','点数だけで学力は決まりません。わからなかったところは、説明を読んだり聞いたりして確認できます。'));root.append(card);
 const breakdown=el('section','card m402breakdown');breakdown.append(el('h2','','単元ごとの結果'),el('p','m402note',s.mode==='test'?'各単元2問ずつの確認です。2問だけで得意・苦手は判断しません。':'各単元1問ずつの確認です。'));
 for(const r of gradeReport(s)){const row=el('div','m402unitrow');row.append(el('strong','',r.unit),el('span','m402unitcount',`${r.correct} / ${r.total}問`));breakdown.append(row);
  if(r.correct<r.total)breakdown.append(btn(`📖 ${r.unit} を復習する`,()=>jump(r.unit),'soft m402wide'));
 }root.append(breakdown);
 root.append(btn('🔎 こたえ・解説を見る',review,'primary m402wide'),btn('🔁 もういちどチャレンジ',()=>begin(s.mode),'soft m402wide'),btn('10単元の一覧に戻る',home,'soft m402wide'));
 saveResult(s,score,correct);
}
function review(){const s=session;if(!s)return home();page('🔎 こたえと説明',result);
 for(let i=0;i<s.qs.length;i++){
  const q=s.qs[i],ok=s.picks[i]===q.correct;
  const card=el('section','card m402review');card.append(el('p','m402note',`${i+1}問め｜${q.unit}｜${ok?'○ せいかい':'△ もう一度確認'}`),el('h3','',q.q),el('p','',`あなたの答え：${q.choices[s.picks[i]]??'（未回答）'}`),el('p','',`こたえ：${q.choices[q.correct]}`),el('p','',q.ex));
  if(!ok)card.append(btn('📖 この単元を学ぶ',()=>jump(q.unit),'soft m402wide'));
  root.append(card);
 }
 root.append(btn('結果へ戻る',result,'primary m402wide'));
}
function inject(){const h=root.querySelector('.top h1');if(!h)return;
 const title=(h.textContent||'').trim();
 const target=title==='全学年の教材を確認'||(/算数[｜|]小学3年/.test(title)&&!title.includes('10単元の そうふくしゅう'))||title==='🧒 今日の学習'||title==='🌱 Pono Learning Quest';
 if(!target||root.querySelector('[data-pono402-entry]'))return;
 const c=el('section','card m402entry');c.dataset.pono402Entry='1';c.append(el('h3','','🧮 小学3年 算数｜10単元の総復習'),el('p','','練習10問・まとめテスト20問・単元別の復習をひらけます。'),btn('小学3年 算数の総復習をひらく',home,'primary m402wide'));
 const top=root.querySelector('.top');if(top)top.insertAdjacentElement('afterend',c);
}
let queued=false;new MutationObserver(()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;inject();});}).observe(root,{subtree:true,childList:true});inject();window.ponoGrade3MathReview402=home;
})();