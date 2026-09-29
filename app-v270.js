/* v27.0 対称な図形：表示中の実画面へ直接図解を追加（既存導線は変更しない） */
function symLine270(){
 return `<div class="sym270"><h3>線対称</h3><svg viewBox="0 0 320 190"><line x1="160" y1="18" x2="160" y2="172" class="axis270"/><polygon points="55,95 120,40 120,150" class="shape270"/><polygon points="265,95 200,40 200,150" class="shape270"/><circle cx="120" cy="40" r="5"/><circle cx="200" cy="40" r="5"/><text x="102" y="31">A</text><text x="204" y="31">A′</text><line x1="120" y1="40" x2="200" y2="40" class="guide270"/><text x="125" y="105">対称の軸</text></svg><p><b>折るとぴったり重なる</b></p><p class="tiny">AとA′は、対称の軸から同じ距離です。</p></div>`;
}
function symPoint270(){
 return `<div class="sym270"><h3>点対称</h3><svg viewBox="0 0 320 190"><polygon points="70,55 210,55 250,135 110,135" class="shape270"/><circle cx="160" cy="95" r="6" class="center270"/><text x="169" y="91">O</text><circle cx="70" cy="55" r="5"/><circle cx="250" cy="135" r="5"/><text x="54" y="47">A</text><text x="255" y="151">A′</text><line x1="70" y1="55" x2="250" y2="135" class="guide270"/></svg><p><b>180°回すとぴったり重なる</b></p><p class="tiny">対応する点を結ぶ線は、対称の中心Oを通ります。</p></div>`;
}
function injectSym270(){
 const all=(A.innerText||"");
 if(!all.includes("対称な図形") || A.querySelector(".visual270")) return;
 const title=[...A.querySelectorAll("h1,h2")].map(x=>x.textContent).join(" ");
 const cards=[...A.querySelectorAll(".card")];
 if(all.includes("①まなぶ") && !all.includes("②一緒に｜")){
   const c=cards.find(x=>/線対称|点対称/.test(x.innerText||""));
   if(c){const d=document.createElement("div");d.className="visual270";d.innerHTML=`<h2>👀 図で見てみよう</h2>${symLine270()}${symPoint270()}<div class="tip270"><b>見分け方</b><br>線対称 → 折る<br>点対称 → 180°回す</div>`;c.append(d)}
 } else if(all.includes("②一緒に")){
   const c=cards.find(x=>/どこを見る/.test(x.innerText||""));
   if(c){const d=document.createElement("div");d.className="visual270";d.innerHTML=`<h3>図で確認しよう</h3>${symLine270()}<div class="step270"><b>① 対称の軸</b>を見つける<br><b>② 対応する点</b> AとA′を見る<br><b>③ 軸までの距離</b>が同じか確かめる</div>`;c.append(d)}
 } else if(all.includes("③自分で")){
   const c=cards[0]; if(c){const d=document.createElement("div");d.className="visual270";d.innerHTML=symLine270();c.append(d)}
 }
}
let busy270=false;
new MutationObserver(()=>{if(busy270)return;busy270=true;requestAnimationFrame(()=>{injectSym270();busy270=false})}).observe(A,{childList:true,subtree:true});
setTimeout(injectSym270,0);
