/* v25.2 漢字クエスト：1026字すべてに学習画面を付与
   読み・意味はブラウザ辞書で推測せず、未登録字は「確認して追加」扱い。
   形・書き順・大きな書字・自己評価・記録は全字で利用可能。 */
const KANJI_LEARN252="ponoKanjiLearning252";
function kKnown252(g,k){
 const a=(window.JKANJI_BY_GRADE&&JKANJI_BY_GRADE[g])||[];
 return a.find(x=>x.k===k)||null;
}
function kRows252(){try{return JSON.parse(localStorage.getItem(KANJI_LEARN252)||"[]")}catch(e){return[]}}
function kSave252(g,k,mode,value){
 let a=kRows252();a.push({studentId:profile.id,date:new Date().toISOString(),grade:g,kanji:k,mode,value});
 localStorage.setItem(KANJI_LEARN252,JSON.stringify(a));
}
function kanjiSimple251(g,k,t){
 const x=kKnown252(g,k);
 head(`漢字「${k}」｜小学${g}年`,()=>kanjiTerm251(g,t));
 A.append(e("div","card kanji-card",`<div class="kanji-big">${k}</div>
 <p><b>👀 まず形を見てみよう</b></p>
 <p class="tiny">「読む」「意味」「形」「書く」は別々に確認できます。書くことが大変でも、分かっている力は別に残します。</p>`));
 if(x){
   A.append(e("div","card",`<p><b>🔊 読み：</b>${x.read}</p><p><b>💡 意味：</b>${x.meaning}</p><p><b>🧩 パーツ：</b>${x.parts||"形を見てみよう"}</p><p><b>🌱 覚え方：</b>${x.story||"自分に合う覚え方を選ぼう"}</p><p><b>📝 文：</b>${x.sentence||""}</p>`));
   A.append(btn("🔊 読みと意味を聞く",()=>{speakJP(`${k}。${x.read}。${x.meaning}`);kSave252(g,k,"listen","read-meaning")},"soft"));
 }else{
   A.append(e("div","card",`<p><b>🔊 読み・💡意味</b></p><p>この字の詳しい辞書データは、確認しながら追加していきます。</p><p class="tiny">誤った読みや意味を自動で出さないため、未確認の内容は表示しません。</p>`));
   A.append(btn("🔊 漢字の形を音声で確認",()=>{speakJP(k);kSave252(g,k,"listen","character")},"soft"));
 }
 A.append(btn("▶️ 実際の書き順を見る",()=>kStroke252(g,k,t),"primary"));
 A.append(btn("✍️ 大きな枠で書いてみる",()=>kWrite252(g,k,t),"primary"));
 A.append(btn("🌱 この字の確認を記録",()=>kReflect252(g,k,t),"soft"));
}
function kStroke252(g,k,t){
 head(`▶️ 書き順｜${k}`,()=>kanjiSimple251(g,k,t));
 const hex=k.codePointAt(0).toString(16).padStart(5,"0");
 A.append(e("div","card",`<h2>${k} の書き順</h2><p class="tiny">線の流れを見てから、大きく書いてみよう。</p><div class="stroke252"><img src="https://raw.githubusercontent.com/KanjiVG/kanjivg/master/kanji/${hex}.svg" alt="${k}の書き順"></div><p class="tiny">KanjiVGを利用。インターネット接続が必要です。</p>`));
 A.append(btn("✍️ 大きな枠で書く",()=>kWrite252(g,k,t),"primary"));
}
function kWrite252(g,k,t){
 head(`✍️ 大きく書く｜${k}`,()=>kanjiSimple251(g,k,t));
 A.append(e("div","card",`<h2>小さく書かなくて大丈夫</h2><p>①なぞる → ②見ながら → ③見ないで、から選べます。</p><div class="kw252modes"><button id="kt252">① なぞる</button><button id="ks252">② 見ながら</button><button id="kh252">③ 見ないで</button></div><div class="kw252wrap"><div id="kg252">${k}</div><canvas id="kc252"></canvas></div></div>`));
 const cv=document.getElementById("kc252"),ctx=cv.getContext("2d"),wrap=cv.parentElement,guide=document.getElementById("kg252");
 function size(){let r=wrap.getBoundingClientRect(),d=devicePixelRatio||1;cv.width=r.width*d;cv.height=r.width*d;cv.style.height=r.width+"px";ctx.setTransform(d,0,0,d,0,0);ctx.lineWidth=10;ctx.lineCap="round";ctx.lineJoin="round"}
 size();let down=false;
 function pos(ev){let r=cv.getBoundingClientRect();return [ev.clientX-r.left,ev.clientY-r.top]}
 cv.onpointerdown=ev=>{down=true;let [a,b]=pos(ev);ctx.beginPath();ctx.moveTo(a,b);cv.setPointerCapture(ev.pointerId)};
 cv.onpointermove=ev=>{if(!down)return;let [a,b]=pos(ev);ctx.lineTo(a,b);ctx.stroke()};
 cv.onpointerup=cv.onpointercancel=()=>down=false;
 document.getElementById("kt252").onclick=()=>guide.style.opacity=".14";
 document.getElementById("ks252").onclick=()=>guide.style.opacity="1";
 document.getElementById("kh252").onclick=()=>guide.style.opacity="0";
 A.append(btn("🧽 けす",()=>ctx.clearRect(0,0,cv.width,cv.height),"soft"));
 A.append(btn("🌱 書いてみた",()=>kWritingReflect252(g,k,t),"primary"));
}
function kWritingReflect252(g,k,t){
 head(`🌱 書いてみて｜${k}`,()=>kanjiSimple251(g,k,t));
 ["😊 大きい枠だと書きやすかった","🙂 見ながらなら書けた","🌱 少しむずかしかった","✋ 書くのは大変だった"].forEach(v=>A.append(btn(v,()=>{kSave252(g,k,"writing",v);kanjiSimple251(g,k,t)},"soft")));
}
function kReflect252(g,k,t){
 head(`🌱 漢字の確認｜${k}`,()=>kanjiSimple251(g,k,t));
 A.append(e("div","card",`<h2>今日はどこまで分かった？</h2><p class="tiny">全部できなくても大丈夫です。</p>`));
 ["👀 見ると分かる","🔊 読める","💡 意味が分かる","🧩 形・パーツが分かる","✍️ 大きくなら書ける","🌱 もう一度見たい"].forEach(v=>A.append(btn(v,()=>{kSave252(g,k,"reflection",v);head("記録しました",()=>kanjiTerm251(g,t));A.append(e("div","card good",`<h2>${k}</h2><p>${v}</p><p>できたところを一つずつ残しました。</p>`));A.append(btn("次の漢字へ",()=>kanjiTerm251(g,t),"primary"))},"soft")));
}
