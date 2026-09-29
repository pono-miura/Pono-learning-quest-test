/* v26.9 対称な図形：補完教材ルートに図解を正式追加 */
function symLine269(){
 return `<div class="sym269"><div class="symtitle269">線対称</div><svg viewBox="0 0 320 190" aria-label="線対称の図"><line x1="160" y1="18" x2="160" y2="172" class="axis269"/><polygon points="55,95 120,40 120,150" class="shape269"/><polygon points="265,95 200,40 200,150" class="shape269"/><circle cx="120" cy="40" r="5"/><circle cx="200" cy="40" r="5"/><text x="103" y="31">A</text><text x="204" y="31">A′</text><line x1="120" y1="40" x2="200" y2="40" class="guide269"/><text x="126" y="104">対称の軸</text></svg><p><b>折るとぴったり重なる</b></p><p class="tiny">AとA′は、対称の軸から同じ距離です。</p></div>`;
}
function symPoint269(){
 return `<div class="sym269"><div class="symtitle269">点対称</div><svg viewBox="0 0 320 190" aria-label="点対称の図"><polygon points="70,55 210,55 250,135 110,135" class="shape269"/><circle cx="160" cy="95" r="6" class="center269"/><text x="169" y="91">O</text><circle cx="70" cy="55" r="5"/><circle cx="250" cy="135" r="5"/><text x="54" y="47">A</text><text x="255" y="151">A′</text><line x1="70" y1="55" x2="250" y2="135" class="guide269"/></svg><p><b>180°回すとぴったり重なる</b></p><p class="tiny">AとA′を結ぶ線は、対称の中心Oを通ります。</p></div>`;
}
const bridgeLearnBefore269=mathBridgeLearn260;
mathBridgeLearn260=function(g,title){
 if(title!=="対称な図形"){bridgeLearnBefore269(g,title);return}
 const d=mb260data(title);head(`①まなぶ｜${title}`,()=>mathBridgeHome260(g,title));
 A.append(e("div","card",`<h2>線対称と点対称</h2><p>${d[0]}</p>${symLine269()}${symPoint269()}<div class="tip269"><b>見分け方</b><br>線対称 → 「折る」<br>点対称 → 「180°回す」</div>`));
 A.append(btn("🔊 説明を聞く",()=>speakJP("線対称は、折るとぴったり重なります。点対称は、180度回すとぴったり重なります。"),"soft"));
 A.append(btn("➡️ ② 一緒にやってみる",()=>mathBridgeTogether260(g,title),"primary"));
};
const bridgeTogetherBefore269=mathBridgeTogether260;
mathBridgeTogether260=function(g,title){
 if(title!=="対称な図形"){bridgeTogetherBefore269(g,title);return}
 head(`②一緒に｜${title}`,()=>mathBridgeLearn260(g,title));
 A.append(e("div","card",`<h2>どこを見る？</h2><p>まず、この図では<b>対称の軸</b>と<b>対応する点</b>を見つけよう。</p>${symLine269()}<div class="step269"><b>① 対称の軸を見る</b><br>中央の点線が折り目です。<br><br><b>② 対応する点を見る</b><br>AとA′は軸をはさんで反対側にあります。<br><br><b>③ 距離を見る</b><br>Aから軸までと、A′から軸までの距離は同じです。</div>`));
 A.append(btn("③ 自分でやる",()=>mathBridgeSelf260(g,title,0),"primary"));
};
const bridgeSelfBefore269=mathBridgeSelf260;
mathBridgeSelf260=function(g,title,i){
 if(title!=="対称な図形"){bridgeSelfBefore269(g,title,i);return}
 const qs=[
  ["線対称の図形は、どうすると重なる？",["180°回す","対称の軸で折る","大きくする"],1,"line"],
  ["線対称で、対応する2つの点と対称の軸の関係は？",["軸から同じ距離","片方だけ軸の上","距離は関係ない"],0,"line"],
  ["点対称の図形は、中心のまわりに何度回すと重なる？",["90°","180°","360°だけ"],1,"point"]
 ];
 head(`③自分で｜${title}`,()=>mathBridgeTogether260(g,title));
 const q=qs[i];A.append(e("div","card",`<h2>${i+1} / ${qs.length}</h2>${q[3]==="line"?symLine269():symPoint269()}<p><b>${q[0]}</b></p>`));
 q[1].forEach((x,j)=>A.append(btn(x,()=>{if(j===q[2]){ponoCorrectPingPong244();mb260.ok++;}if(i+1<qs.length)mathBridgeSelf260(g,title,i+1);else mathBridgeSummary260(g,title)},"soft")));
 A.append(btn("📖 説明に戻る",()=>mathBridgeLearn260(g,title),"ghost"));
};