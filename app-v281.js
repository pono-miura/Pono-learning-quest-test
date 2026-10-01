/* v28.1 算数：代表単元の図を学習内容と一致させる */
function tenframe281(n){
 let a="";for(let i=0;i<10;i++)a+=`<i class="${i<n?"on281":""}"></i>`;return `<span class="frame281">${a}</span>`;
}
function exact281(id,title){
 const s=id+" "+title;
 if(/g1_num|かずのしくみ/.test(s))return `<div class="mv281"><div class="cmp281"><div><b>14</b>${tenframe281(10)}${tenframe281(4)}<small>10のまとまり ＋ 4</small></div><div><b>17</b>${tenframe281(10)}${tenframe281(7)}<small>10のまとまり ＋ 7</small></div></div><p><b>同じ10をのぞいて、4と7をくらべる → 17のほうが3大きい</b></p><div class="nl281"><span>10</span><i style="left:40%">14</i><i style="left:70%">17</i><span>20</span></div></div>`;
 if(/g2_mult|かけ算・九九/.test(s))return `<div class="mv281"><h4>4こずつが3組</h4><div class="groups281"><span>● ● ● ●</span><span>● ● ● ●</span><span>● ● ● ●</span></div><p>4 ＋ 4 ＋ 4 ＝ 12<br><b>4 × 3 ＝ 12</b></p></div>`;
 if(/g3_div|わり算の意味/.test(s))return `<div class="mv281"><h4>12こを3人に同じ数ずつ</h4><div class="groups281"><span>●●●●</span><span>●●●●</span><span>●●●●</span></div><p>1人分は4こ → <b>12 ÷ 3 ＝ 4</b></p></div>`;
 if(/g4_frac|分数の意味と大きさ/.test(s))return `<div class="mv281"><h4>${fmtMath("1/2")} と ${fmtMath("1/4")} をくらべよう</h4><div class="fracCmp281"><div><b>1/2</b><span><i></i><em></em></span></div><div><b>1/4</b><span class="four281"><i></i><em></em><em></em><em></em></span></div></div><p>同じ「1」なら、分ける数が多いほど1つ分は小さい。<br><b>${fmtMath("1/2")} ＞ ${fmtMath("1/4")}</b></p></div>`;
 if(/g4_area|^面積$/.test(title))return `<div class="mv281"><h4>たて3cm × よこ5cm</h4><div class="area281">${"<i></i>".repeat(15)}</div><p>1cm²が15こ → <b>3 × 5 ＝ 15cm²</b></p></div>`;
 if(/g5_data|平均と帯グラフ/.test(s))return `<div class="mv281"><h4>10・20・30を平らにならす</h4><div class="avg281"><span style="height:45px">10</span><span style="height:85px">20</span><span style="height:125px">30</span><b>→</b><span style="height:85px">20</span><span style="height:85px">20</span><span style="height:85px">20</span></div><p>(10＋20＋30) ÷ 3 ＝ <b>20</b></p></div>`;
 if(/g5_ratio|割合/.test(s))return `<div class="mv281"><h4>50人の40%は？</h4><div class="pct281"><b>20人<br>40%</b><i>30人<br>60%</i></div><p>50 × 0.4 ＝ <b>20人</b></p></div>`;
 if(/g6_area|円の面積/.test(s))return `<div class="mv281"><div class="circle281"><b>中心</b><i></i><span>半径</span></div><p><b>半径 × 半径 × 3.14</b></p><p class="tiny">直径が分かっているときは、まず半分にして半径を求めます。</p></div>`;
 if(/g6_data|データの調べ方/.test(s))return `<div class="mv281"><h4>2・4・6・8</h4><div class="data281"><span>2</span><span>4</span><span>6</span><span>8</span></div><p>平均：(2＋4＋6＋8) ÷ 4 ＝ <b>5</b><br>中央の2つは4と6 → 中央値も <b>5</b></p></div>`;
 return "";
}
function upgrade281(){
 let box=A.querySelector(".visual280,.visual279");if(!box||box.dataset.v281)return;
 let id=(typeof adaptive!=="undefined"&&adaptive&&adaptive.node)||"";
 let title=id&&MATHNODES[id]?MATHNODES[id].title:[...A.querySelectorAll("h1,h2")].map(x=>x.textContent).join(" ");
 let h=exact281(id,title);if(!h)return;box.dataset.v281="1";box.className="visual281";box.innerHTML="<h3>👀 図で確かめよう</h3>"+h;
}
let busy281=false;new MutationObserver(()=>{if(busy281)return;busy281=true;requestAnimationFrame(()=>{upgrade281();busy281=false})}).observe(A,{childList:true,subtree:true});setTimeout(upgrade281,0);
