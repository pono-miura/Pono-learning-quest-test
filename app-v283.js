/* v28.3 算数図解 安定化版
   旧 v27.9/v28.0/v28.1 の図解DOMはCSSで非表示。
   v28.3だけが、1画面につき1個の図解を描画する。
   MutationObserverは使わず、既存の画面描画関数の最後に1回だけ差し込む。 */

function frame283(n){
 let x="";
 for(let i=0;i<10;i++) x+=`<i class="${i<n?"on283":""}"></i>`;
 return `<span class="frame283">${x}</span>`;
}
function visual283(id,title){
 const s=(id||"")+" "+(title||"");
 if(/g1_num|かずのしくみ/.test(s))
   return `<div class="cmp283"><div><b>14</b>${frame283(10)}${frame283(4)}<small>10のまとまり ＋ 4</small></div><div><b>17</b>${frame283(10)}${frame283(7)}<small>10のまとまり ＋ 7</small></div></div><p><b>同じ10をのぞいて、4と7をくらべる → 17のほうが3大きい</b></p><div class="nl283"><span>10</span><i style="left:40%">14</i><i style="left:70%">17</i><span>20</span></div>`;
 if(/g2_mult|かけ算・九九/.test(s))
   return `<h4>4こずつが3組</h4><div class="groups283"><span>● ● ● ●</span><span>● ● ● ●</span><span>● ● ● ●</span></div><p>4＋4＋4＝12　→　<b>4×3＝12</b></p>`;
 if(/g3_div|わり算/.test(s))
   return `<h4>12こを3人に同じ数ずつ</h4><div class="groups283"><span>●●●●</span><span>●●●●</span><span>●●●●</span></div><p>1人分は4こ → <b>12÷3＝4</b></p>`;
 if(/g4_frac|分数/.test(s))
   return `<h4>${fmtMath("1/2")} と ${fmtMath("1/4")}</h4><div class="frac283"><span><b></b><i></i></span><span class="four283"><b></b><i></i><i></i><i></i></span></div><p>同じ1なら、分ける数が多いほど1つ分は小さい。<br><b>${fmtMath("1/2")} ＞ ${fmtMath("1/4")}</b></p>`;
 if(/g4_area|面積/.test(s) && !/円/.test(s))
   return `<h4>たて3cm × よこ5cm</h4><div class="area283">${"<i></i>".repeat(15)}</div><p>1cm²が15こ → <b>3×5＝15cm²</b></p>`;
 if(/g5_data|平均/.test(s))
   return `<h4>10・20・30を平らにならす</h4><div class="avg283"><span style="height:40px">10</span><span style="height:75px">20</span><span style="height:110px">30</span><b>→</b><span style="height:75px">20</span><span style="height:75px">20</span><span style="height:75px">20</span></div><p>(10＋20＋30)÷3＝<b>20</b></p>`;
 if(/g5_ratio|割合|比/.test(s))
   return `<h4>50人の40%は？</h4><div class="pct283"><b>20人<br>40%</b><i>30人<br>60%</i></div><p>50×0.4＝<b>20人</b></p>`;
 if(/g6_area|円の面積/.test(s))
   return `<div class="circle283"><b>中心</b><i></i><span>半径</span></div><p><b>半径 × 半径 × 3.14</b></p><p class="tiny">直径が分かっているときは、まず半分にして半径を求めます。</p>`;
 if(/g6_data|データの調べ方/.test(s))
   return `<h4>2・4・6・8</h4><div class="data283"><span>2</span><span>4</span><span>6</span><span>8</span></div><p>平均：(2＋4＋6＋8)÷4＝<b>5</b><br>中央値も <b>5</b></p>`;
 return "";
}
function addVisual283(){
 if(A.querySelector(".visual283")) return;
 const txt=A.innerText||"";
 if(!/① ?まなぶ|② ?一緒に/.test(txt)) return;
 let id=(typeof adaptive!=="undefined"&&adaptive&&adaptive.node)||"";
 let title=id&&MATHNODES[id]?MATHNODES[id].title:[...A.querySelectorAll("h1,h2")].map(x=>x.textContent).join(" ");
 if(/対称な図形/.test(title)) return; // 既存の専用図を優先
 const html=visual283(id,title); if(!html) return;
 const card=[...A.querySelectorAll(".card.lesson,.card")].find(x=>/説明|具体例|考え方|一緒に/.test(x.innerText||""));
 if(!card) return;
 const d=document.createElement("div"); d.className="visual283";
 d.innerHTML=`<h3>👀 図で確かめよう</h3><div class="mv283">${html}</div>`;
 card.append(d);
}

/* 既存の主要な算数画面関数を包み、描画完了後に1回だけ追加 */
["mathLearn","mathTogether","mathBridgeLearn278","mathBridgeTogether278"].forEach(name=>{
 try{
   const old=eval(name);
   if(typeof old==="function"){
     const wrapped=function(){ const r=old.apply(this,arguments); addVisual283(); return r; };
     eval(name+"=wrapped");
   }
 }catch(e){}
});
