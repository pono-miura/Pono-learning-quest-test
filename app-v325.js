/* v32.5 月間レポートボタン 直接ルート修正 */
(function(){
  const APP325=document.getElementById("app");
  if(!APP325)return;

  function bind325(){
    const h1=(APP325.querySelector("h1")?.textContent||"").trim();
    if(!h1.includes("先生・Pono"))return;

    const buttons=[...APP325.querySelectorAll("button")];
    const b=buttons.find(x=>(x.textContent||"").trim()==="📄 学校共有用 月間レポート");
    if(!b || b.dataset.v325bound)return;

    /* 旧キャプチャ処理の完全一致を避けるため、見た目には分からない
       ゼロ幅文字を末尾に追加。元のonclick（月間レポート表示）はそのまま使う。 */
    b.textContent="📄 学校共有用 月間レポート\u200B";
    b.dataset.v325bound="1";
    b.style.pointerEvents="auto";
    b.style.position="relative";
    b.style.zIndex="2";
  }

  new MutationObserver(bind325).observe(APP325,{childList:true,subtree:true});
  document.addEventListener("click",()=>setTimeout(bind325,0),true);
  bind325();
})();