/* v27.1 対称な図形：③自分で「問題文 → 図 → 選択肢」に整理 */
function symLine271(){
 return `<div class="sym271"><div class="symtitle271">線対称</div><svg viewBox="0 0 320 175"><line x1="160" y1="15" x2="160" y2="160" class="axis271"/><polygon points="65,88 120,42 120,138" class="shape271"/><polygon points="255,88 200,42 200,138" class="shape271"/><circle cx="120" cy="42" r="5"/><circle cx="200" cy="42" r="5"/><text x="104" y="33">A</text><text x="204" y="33">A′</text><line x1="120" y1="42" x2="200" y2="42" class="guide271"/><text x="128" y="102">対称の軸</text></svg><p class="tiny">AとA′は、対称の軸から同じ距離です。</p></div>`;
}
function symPoint271(){
 return `<div class="sym271"><div class="symtitle271">点対称</div><svg viewBox="0 0 320 175"><polygon points="75,50 205,50 245,125 115,125" class="shape271"/><circle cx="160" cy="88" r="6" class="center271"/><text x="170" y="85">O</text><circle cx="75" cy="50" r="5"/><circle cx="245" cy="125" r="5"/><text x="59" y="42">A</text><text x="250" y="141">A′</text><line x1="75" y1="50" x2="245" y2="125" class="guide271"/></svg><p class="tiny">対応する点を結ぶ線は、対称の中心Oを通ります。</p></div>`;
}
const selfBefore271=mathBridgeSelf260;
mathBridgeSelf260=function(g,title,i){
 if(title!=="対称な図形"){selfBefore271(g,title,i);return}
 const qs=[
  ["線対称の図形は、どうするとぴったり重なりますか？",["180°回す","対称の軸で折る","大きくする"],1,"line"],
  ["線対称では、対応する点AとA′は、対称の軸からどのような位置にありますか？",["同じ距離","片方だけ軸の上","距離は関係ない"],0,"line"],
  ["点対称の図形は、対称の中心のまわりに何度回すとぴったり重なりますか？",["90°","180°","360°だけ"],1,"point"]
 ];
 const q=qs[i];
 head(`③自分で｜${title}`,()=>mathBridgeTogether260(g,title));
 A.append(e("div","question271",`<div class="qnum271">問題 ${i+1} / ${qs.length}</div><div class="qtext271">${q[0]}</div></div>`));
 A.append(e("div","visualwrap271",q[3]==="line"?symLine271():symPoint271()));
 A.append(e("div","choose271","<b>答えを選んでください</b>"));
 q[1].forEach((x,j)=>A.append(btn(x,()=>{
   if(j===q[2]){ponoCorrectPingPong244();mb260.ok++;}
   if(i+1<qs.length)mathBridgeSelf260(g,title,i+1);else mathBridgeSummary260(g,title);
 },"soft")));
 A.append(btn("📖 説明に戻る",()=>mathBridgeLearn260(g,title),"ghost"));
};