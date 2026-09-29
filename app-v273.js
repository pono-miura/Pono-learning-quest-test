/* v27.3 国語読解：③自分で 本文→問題→根拠→選択肢 を明確化
   漢字は変更しない。v27.2読解エンジンのみ上書き。 */
function jReadSelf273(g,title,i,msg=""){
 const d=jReadData272(title),q=d.qs[i];
 head(`③自分で｜${title}`,()=>jReadTogether272(g,title));

 /* 最初に本文を必ず表示 */
 A.append(e("div","card jreading273",
   `<div class="jsection273">📖 本文</div>
    <div class="jbody273">${d.text}</div>`));
 A.append(btn("🔊 本文を聞く",()=>speakJP(d.text),"soft"));

 /* 次に問題文を大きく表示 */
 A.append(e("div","jquestion273",
   `<div class="jqnum273">❓ 問題 ${i+1} / ${d.qs.length}</div>
    <div class="jqtext273">${q[0]}</div>`));

 /* 読解であることを明示 */
 A.append(e("div","jroot273",
   `<b>🔎 本文のどこを手がかりにする？</b>
    <p>答えを選ぶ前に、本文の言葉をもう一度見てみよう。</p>`));

 if(msg) A.append(e("div","jfeedback273",msg));

 A.append(e("div","jchoose273","<b>答えを選んでください</b>"));
 q[1].forEach((x,j)=>A.append(btn(x,()=>{
   if(j===q[2]){
     ponoCorrectPingPong244(); jr272.ok++;
     if(i+1<d.qs.length)jReadSelf273(g,title,i+1);
     else jReadSummary272(g,title);
   }else{
     jr272.hints++;
     jReadSelf273(g,title,i,`💡 ヒント：${q[3]}<br><span>本文に戻って、手がかりになる言葉を探してみよう。</span>`);
   }
 },"soft")));
 A.append(btn("🤝 一緒に戻る",()=>jReadTogether272(g,title),"ghost"));
}

/* v27.2から呼ばれる関数名も差し替える */
jReadSelf272=jReadSelf273;
