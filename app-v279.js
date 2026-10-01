/* v27.9 算数の視覚補助 */
function visual279(type){
const v={
"number":`<div class="v279"><div class="dots279">● ● ● ● ●<br>● ● ●</div><div class="line279"><span>0</span><span>5</span><span>10</span><span>15</span><span>20</span></div><p>数は「まとまり」と数直線で見ると分かりやすくなります。</p></div>`,
"add":`<div class="v279"><div class="dots279">● ● ● ＋ ● ● ＝ ● ● ● ● ●</div><p>「ふえる・あわせる」はたし算、「へる・のこり」はひき算。</p></div>`,
"mult":`<div class="v279"><div class="dots279">● ● ● ●<br>● ● ● ●<br>● ● ● ●</div><p>4こずつが3組。まとまりで見ると、かけ算の式につながります。</p></div>`,
"div":`<div class="v279 groups279"><span>●●●●</span><span>●●●●</span><span>●●●●</span><p>12こを3つの同じグループに分けると、1グループ4こ。</p></div>`,
"measure":`<div class="v279"><div class="ruler279">| | | | | | | | | | |</div><p>長さや重さは、単位と目盛りを先に確認します。</p></div>`,
"time":`<div class="v279"><div class="clock279"><b>12</b><span>9　●　3</span><b>6</b></div><p>「時こく」と「どれだけたった時間か」を分けて考えます。</p></div>`,
"shape":`<div class="v279 shape279">△　□　○　▱<p>辺・角・平行など、形の特徴に注目します。</p></div>`,
"fraction":`<div class="v279"><div class="bar279"><b></b><i></i><i></i><i></i></div><p>4等分した1つ分が ${fmtMath("1/4")}。分母と分子を図でも確認します。</p></div>`,
"graph":`<div class="v279"><div class="bars279"><i></i><i></i><i></i><i></i></div><p>グラフは「何を表すか」「1目盛りはいくつか」を確認します。</p></div>`,
"area":`<div class="v279"><div class="grid279"></div><p>面積は、同じ大きさの正方形がいくつ入るかで考えます。</p></div>`,
"volume":`<div class="v279 cube279">▦<p>体積は「底面積 × 高さ」。同じ厚さの層が何段あるかで考えます。</p></div>`,
"ratio":`<div class="v279"><div class="tape279"><span>2</span><b>3</b></div><p>比・割合は、2つの量の関係をテープ図や表で整理します。</p></div>`,
"circle":`<div class="v279"><div class="circle279">中心 ─ 半径</div><p>円の面積は「半径 × 半径 × 円周率」。</p></div>`};return v[type]||""}
function type279(id,t){let s=id+" "+t;if(/g1_num|かず/.test(s))return"number";if(/add|たし算|ひき算|筆算/.test(s))return"add";if(/mult|かけ算|九九/.test(s))return"mult";if(/div|わり算/.test(s))return"div";if(/length|weight|長さ|重さ/.test(s))return"measure";if(/time|時こく|時間/.test(s))return"time";if(/frac|分数/.test(s))return"fraction";if(/data|グラフ|平均|データ/.test(s))return"graph";if(/volume|体積|角柱|円柱/.test(s))return"volume";if(/円の面積/.test(s))return"circle";if(/area|面積/.test(s))return"area";if(/ratio|割合|比|比例|反比例/.test(s))return"ratio";if(/shape|図形|三角|四角|円と球|合同|多角|拡大|縮図|角/.test(s))return"shape";return""}
function inject279(){if(A.querySelector(".visual279"))return;let txt=A.innerText||"";if(!/① ?まなぶ|② ?一緒に/.test(txt))return;let id=(typeof adaptive!=="undefined"&&adaptive&&adaptive.node)||"",t=id&&MATHNODES[id]?MATHNODES[id].title:"";if(!t){t=[...A.querySelectorAll("h1,h2")].map(x=>x.textContent).join(" ")}if(/対称な図形/.test(t))return;let ty=type279(id,t);if(!ty)return;let c=[...A.querySelectorAll(".card.lesson,.card")].find(x=>/説明|考え方|一緒に/.test(x.innerText||""));if(!c)return;let d=document.createElement("div");d.className="visual279";d.innerHTML="<h3>👀 図で見てみよう</h3>"+visual279(ty);c.append(d)}
let lock279=false;new MutationObserver(()=>{if(lock279)return;lock279=true;requestAnimationFrame(()=>{inject279();lock279=false})}).observe(A,{childList:true,subtree:true});setTimeout(inject279,0);
