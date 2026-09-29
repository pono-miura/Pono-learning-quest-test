/* v26.8 6年算数「対称な図形」図解教材 */
function symmetryDiagram268(kind){
 if(kind==="line")return `<div class="sym268"><svg viewBox="0 0 320 190"><line x1="160" y1="18" x2="160" y2="172" class="axis268"/><polygon points="55,95 120,40 120,150" class="shape268"/><polygon points="265,95 200,40 200,150" class="shape268"/><circle cx="120" cy="40" r="5"/><circle cx="200" cy="40" r="5"/><text x="105" y="31">A</text><text x="204" y="31">A'</text><line x1="120" y1="40" x2="200" y2="40" class="guide268"/><text x="137" y="105">対称の軸</text></svg><p class="tiny">対応する点は、対称の軸から同じ距離にあります。</p></div>`;
 return `<div class="sym268"><svg viewBox="0 0 320 190"><polygon points="70,55 210,55 250,135 110,135" class="shape268"/><circle cx="160" cy="95" r="6" class="center268"/><text x="169" y="91">O</text><circle cx="70" cy="55" r="5"/><circle cx="250" cy="135" r="5"/><text x="55" y="47">A</text><text x="255" y="151">A'</text><line x1="70" y1="55" x2="250" y2="135" class="guide268"/></svg><p class="tiny">180°回すと重なります。対応する点を結ぶ線は中心Oを通ります。</p></div>`;
}
const mathLessonDataBefore268=mathLessonData;
mathLessonData=function(id,n){
 if(id==="g6_symmetry")return ["線対称は、1本の直線を折り目にして折ると両側がぴったり重なる図形です。点対称は、1つの点を中心に180°回すと重なる図形です。","線対称では、対応する点は対称の軸から同じ距離にあります。点対称では、対応する点を結ぶ線が対称の中心を通り、中心からの距離も同じです。"];
 return mathLessonDataBefore268(id,n);
};
const mathLearnBefore268=mathLearn;
mathLearn=function(nodeId){
 mathLearnBefore268(nodeId);
 if(nodeId!=="g6_symmetry")return;
 const c=[...A.querySelectorAll(".card.lesson")][0];
 if(c&&!c.querySelector(".symmetry-extra268")){
  const x=document.createElement("div");x.className="symmetry-extra268";
  x.innerHTML=`<h3>👀 図で見てみよう</h3>${symmetryDiagram268("line")}<h3>点対称とのちがい</h3>${symmetryDiagram268("point")}<div class="tip268"><b>覚えるポイント</b><br>線対称 → 折ると重なる<br>点対称 → 180°回すと重なる</div>`;c.append(x);
 }
};
const mathTogetherBefore268=mathTogether;
mathTogether=function(nodeId){
 mathTogetherBefore268(nodeId);
 if(nodeId==="g6_symmetry"){const c=A.querySelector(".card.lesson");if(c){const x=document.createElement("div");x.innerHTML=`<h3>図でも確認</h3>${symmetryDiagram268("line")}`;c.append(x)}}
};