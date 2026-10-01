/* v32.4 学校共有用月間レポート 表現整理 */
(function(){
  const APP=document.getElementById("app");
  if(!APP)return;

  function fixReport324(){
    const h1=APP.querySelector("h1");
    if(!h1 || !(h1.textContent||"").includes("学校共有用 月間レポート")) return;

    const paper=APP.querySelector(".report323-paper");
    if(paper && !paper.querySelector(".report324-org")){
      const title=paper.querySelector(".report323-title");
      if(title){
        const p=document.createElement("p");
        p.className="report324-org";
        p.textContent="作成：フリースクールPono";
        title.appendChild(p);
      }
    }

    const sections=[...APP.querySelectorAll(".report323-section")];

    // 1. 学習の概要：時間の意味を明確化
    const s1=sections.find(x=>(x.querySelector("h2")?.textContent||"").startsWith("1．"));
    if(s1){
      [...s1.querySelectorAll("p")].forEach(p=>{
        if((p.textContent||"").includes("記録時間：") && !(p.textContent||"").includes("教材内")){
          p.innerHTML=p.innerHTML.replace("記録時間：","教材内記録時間：");
        }
      });
      if(!s1.querySelector(".report324-time-note")){
        const note=document.createElement("p");
        note.className="tiny report324-time-note";
        note.textContent="※教材内記録時間は、この教材を使った学習時間の記録です。Ponoでの滞在時間や出席時間を示すものではありません。";
        s1.appendChild(note);
      }
    }

    // 4. 「補助」という表現を避け、利用した方法を事実として表示
    const s4=sections.find(x=>(x.querySelector("h2")?.textContent||"").startsWith("4．"));
    if(s4){
      const hh=s4.querySelector("h2");
      if(hh) hh.textContent="4．学習時に活用した方法";
      [...s4.querySelectorAll("p")].forEach(p=>{
        if((p.textContent||"").trim()==="特別な補助記録はありません。"){
          p.textContent="読み上げ・ヒント等の利用記録はありません。";
        }
      });
    }

    // 5. 学校にそのまま共有しやすい見出しへ
    const s5=sections.find(x=>(x.querySelector("h2")?.textContent||"").startsWith("5．"));
    if(s5){
      const hh=s5.querySelector("h2");
      if(hh) hh.textContent="5．Pono所見・学校共有コメント";
      const ta=s5.querySelector("textarea");
      if(ta && !ta.dataset.v324fixed){
        ta.value=ta.value
          .replace(/記録上は約(\d+)分の学習を行いました。/g,"教材内の記録時間は約$1分でした。")
          .replace(/記録上は約(\d+)分/g,"教材内の記録時間は約$1分");
        ta.dataset.v324fixed="1";
      }
    }
  }

  const mo=new MutationObserver(()=>fixReport324());
  mo.observe(APP,{childList:true,subtree:true,characterData:true});
  document.addEventListener("click",()=>setTimeout(fixReport324,0),true);
  document.addEventListener("change",()=>setTimeout(fixReport324,0),true);
  fixReport324();
})();