/* v32.6 学校共有用月間レポート フリーズ修正 */
(function(){
  const APP=document.getElementById("app");
  if(!APP)return;

  function fixReport326(){
    const h1=APP.querySelector("h1");
    if(!h1 || !(h1.textContent||"").includes("学校共有用 月間レポート")) return;

    /* このレポート画面では1回だけ整形する。
       DOMを書き換えるたびにMutationObserverが再実行され続けるのを防ぐ。 */
    if(h1.dataset.v326fixed==="1") return;
    h1.dataset.v326fixed="1";

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

    const s1=sections.find(x=>(x.querySelector("h2")?.textContent||"").startsWith("1．"));
    if(s1){
      [...s1.querySelectorAll("p")].forEach(p=>{
        const txt=(p.textContent||"");
        if(txt.includes("記録時間：") && !txt.includes("教材内")){
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

    const s4=sections.find(x=>(x.querySelector("h2")?.textContent||"").startsWith("4．"));
    if(s4){
      const hh=s4.querySelector("h2");
      if(hh && hh.textContent!=="4．学習時に活用した方法"){
        hh.textContent="4．学習時に活用した方法";
      }
      [...s4.querySelectorAll("p")].forEach(p=>{
        if((p.textContent||"").trim()==="特別な補助記録はありません。"){
          p.textContent="読み上げ・ヒント等の利用記録はありません。";
        }
      });
    }

    const s5=sections.find(x=>(x.querySelector("h2")?.textContent||"").startsWith("5．"));
    if(s5){
      const hh=s5.querySelector("h2");
      if(hh && hh.textContent!=="5．Pono所見・学校共有コメント"){
        hh.textContent="5．Pono所見・学校共有コメント";
      }
      const ta=s5.querySelector("textarea");
      if(ta && !ta.dataset.v326fixed){
        ta.value=ta.value
          .replace(/記録上は約(\d+)分の学習を行いました。/g,"教材内の記録時間は約$1分でした。")
          .replace(/記録上は約(\d+)分/g,"教材内の記録時間は約$1分");
        ta.dataset.v326fixed="1";
      }
    }
  }

  let scheduled=false;
  const schedule=()=>{
    if(scheduled)return;
    scheduled=true;
    setTimeout(()=>{scheduled=false;fixReport326();},0);
  };

  const mo=new MutationObserver(schedule);
  mo.observe(APP,{childList:true,subtree:true});
  document.addEventListener("click",schedule,true);
  document.addEventListener("change",schedule,true);
  schedule();
})();