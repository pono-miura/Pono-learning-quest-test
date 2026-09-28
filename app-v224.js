
/* v22.4 漢字：まず学期を選ぶ。既存の詳細・書き順・大きな書字はそのまま利用。 */
let ponoKanjiSelectedTerm=null;
function japaneseKanjiMenu(g){
 let data=JKANJI_BY_GRADE[g]||[];
 head(`🌱 漢字クエスト｜小学${g}年`,japaneseStart);
 A.append(e("div","card",`<h2>どの時期の漢字をやってみる？</h2>
 <p>学校の学習の流れに近いところから選べます。</p>
 <p class="tiny">🌱 「○学期ごろ」は目安です。学校の進み方によって前後します。書ける・書けないだけで理解を判断しません。</p>`));
 ["🌸 1学期ごろ","🍁 2学期ごろ","❄️ 3学期ごろ"].forEach(term=>{
   let count=data.filter(x=>kanjiTermGuess(g,x)===term).length;
   let c=e("div","term-pick",`<b>${term}</b><br><span class="tiny">現在 ${count}字の教材</span>`);
   c.onclick=()=>japaneseKanjiTermMenu(g,term);A.append(c);
 });
 A.append(e("div","card soft",`<b>この版について</b><p class="tiny">まず「学期ごろ」を選ぶ形に変更しました。現在登録済みの漢字教材を分けて表示します。学年配当漢字すべての収録は、光村図書の進行との照合をしながら追加していきます。</p>`));
}
function japaneseKanjiTermMenu(g,term){
 ponoKanjiSelectedTerm=term;
 let data=JKANJI_BY_GRADE[g]||[], rows=data.map((x,i)=>({x,i})).filter(o=>kanjiTermGuess(g,o.x)===term);
 head(`${term}｜小学${g}年 漢字`,()=>japaneseKanjiMenu(g));
 A.append(e("div","card",`<h2>${term}</h2><p>上から順に取り組んでも、やりたい漢字を選んでも大丈夫です。</p>
 <p class="tiny">👀見る　🔊読む　💡意味　🧩パーツ　▶️実際の書き順　✍️大きく書く　💬文で使う</p>`));
 rows.forEach(({x,i},n)=>{
   let c=e("div","kanji-row",`<span class="kanji-big">${x.k}</span><span><b>${x.read}</b><br><span class="tiny">${x.meaning}</span></span><span class="kanji-no">${n+1}</span>`);
   c.onclick=()=>japaneseKanjiDetail(g,i);A.append(c);
 });
 if(!rows.length)A.append(e("div","card soft","この時期の漢字教材を準備しています。"));
}
