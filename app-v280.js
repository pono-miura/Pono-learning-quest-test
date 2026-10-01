/* v28.0 算数：説明と図を一致させる（v27.9の共通図を置換） */
function dots280(n,cls=""){
 let s=""; for(let i=1;i<=n;i++){s+=`<i class="${cls}"></i>`; if(i===10&&n>10)s+=`<span class="break280"></span>`} return s;
}
function numberCompare280(){
 return `<div class="mathvis280">
 <div class="compare280"><div><b>14</b><div class="ten280">${dots280(14,"a280")}</div><small>10 と 4</small></div>
 <div><b>17</b><div class="ten280">${dots280(17,"b280")}</div><small>10 と 7</small></div></div>
 <p class="center280"><b>17のほうが、14より3大きい</b></p>
 <div class="numline280"><span style="left:0">10</span><span class="mark280 m14280">14</span><span class="mark280 m17280">17</span><span style="right:0">20</span></div>
 <p class="tiny">10のまとまりは同じ。残りの4と7をくらべると、7のほうが3大きいね。</p></div>`;
}
function visualByTitle280(id,title){
 let s=id+" "+title;
 if(/g1_num|かずのしくみ/.test(s))return numberCompare280();
 if(/たし算|ひき算/.test(s))return `<div class="mathvis280"><div class="story280">${dots280(3)}<b> ＋ </b>${dots280(2)}<b> ＝ 5</b></div><p>3こあって、2こふえる → ぜんぶで5こ。</p></div>`;
 if(/かけ算|九九/.test(s))return `<div class="mathvis280"><div class="array280">${dots280(4)}<br>${dots280(4)}<br>${dots280(4)}</div><p><b>4こずつ × 3組 ＝ 12こ</b></p></div>`;
 if(/わり算/.test(s))return `<div class="mathvis280"><p><b>12こを3人に同じ数ずつ</b></p><div class="divide280"><span>${dots280(4)}</span><span>${dots280(4)}</span><span>${dots280(4)}</span></div><p>1人分は <b>4こ</b> → 12 ÷ 3 ＝ 4</p></div>`;
 if(/分数/.test(s))return `<div class="mathvis280"><div class="fracbar280"><b></b><i></i><i></i><i></i></div><p>1を4等分した1つ分が ${fmtMath("1/4")}。</p><p class="tiny">分母＝何等分したか　分子＝そのうちいくつ分か</p></div>`;
 if(/割合|比/.test(s))return `<div class="mathvis280"><p>もとにする量を <b>100%</b> として考えます。</p><div class="percent280"><b style="width:40%">40%</b><i>残り60%</i></div><p>50人の40% → 50 × 0.4 ＝ <b>20人</b></p></div>`;
 if(/平均/.test(s))return `<div class="mathvis280"><div class="avg280"><span>10</span><span>20</span><span>30</span><b>→ 平らにならす → 20・20・20</b></div><p>(10＋20＋30) ÷ 3 ＝ <b>20</b></p></div>`;
 if(/円の面積/.test(s))return `<div class="mathvis280"><div class="circle280"><i></i><span>半径 r</span></div><p>半径 × 半径 × 円周率</p></div>`;
 if(/面積/.test(s))return `<div class="mathvis280"><div class="rect280"><span>たて 3cm</span><b>よこ 5cm</b></div><p>3 × 5 ＝ <b>15cm²</b></p></div>`;
 if(/体積|角柱|円柱/.test(s))return `<div class="mathvis280"><div class="layers280">▦<br>▦<br>▦</div><p>底面積 × 高さ ＝ 1段分 × 段の数</p></div>`;
 return "";
}
function replaceVisual280(){
 let old=A.querySelector(".visual279"); if(!old)return;
 let id=(typeof adaptive!=="undefined"&&adaptive&&adaptive.node)||"";
 let title=id&&MATHNODES[id]?MATHNODES[id].title:[...A.querySelectorAll("h1,h2")].map(x=>x.textContent).join(" ");
 let html=visualByTitle280(id,title); if(!html)return; old.className="visual280"; old.innerHTML=`<h3>👀 図で確かめよう</h3>${html}`;
}
let lock280=false;
new MutationObserver(()=>{if(lock280)return;lock280=true;requestAnimationFrame(()=>{replaceVisual280();lock280=false})}).observe(A,{childList:true,subtree:true});
setTimeout(replaceVisual280,0);
