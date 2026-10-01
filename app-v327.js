/* v32.7 月間レポートを軽量な専用ページで開く */
(function(){
  const APP=document.getElementById("app");
  if(!APP)return;

  function bindReportButton327(){
    const h1=(APP.querySelector("h1")?.textContent||"").trim();
    if(!h1.includes("先生・Pono")) return;

    const b=[...APP.querySelectorAll("button")].find(x=>
      (x.textContent||"").includes("学校共有用 月間レポート")
    );
    if(!b || b.dataset.v327bound==="1") return;

    /* 旧処理の完全一致判定を避けるためラベルも少し変更し、
       重い動的レポートではなく専用ページへ直接移動する。 */
    b.textContent="📄 学校共有用 月間レポートを開く";
    b.dataset.v327bound="1";
    b.onclick=function(ev){
      if(ev){ev.preventDefault();ev.stopPropagation();}
      location.href="monthly-report.html?v=327";
    };
  }

  new MutationObserver(bindReportButton327).observe(APP,{childList:true,subtree:true});
  document.addEventListener("click",()=>setTimeout(bindReportButton327,0),true);
  bindReportButton327();
})();