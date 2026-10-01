/* v31.9 ホーム画面から新しい保護者/先生画面へ確実に接続
   v31.8 読込前に作られたボタンが旧関数を保持していたため、
   ホームの2ボタンだけ最終ルーティングを上書きする。 */
(function(){
  document.addEventListener("click", function(ev){
    const b=ev.target.closest && ev.target.closest("button");
    if(!b)return;
    const t=(b.textContent||"").trim();

    if(t==="🏠 保護者　自分の子の学び" || t==="🏠 保護者 自分の子の学び"){
      ev.preventDefault();
      ev.stopImmediatePropagation();
      parent();
      return;
    }
    if(t==="📝 先生・Pono　時間割・提出用" || t==="📝 先生・Pono 時間割・提出用"){
      ev.preventDefault();
      ev.stopImmediatePropagation();
      teacher();
      return;
    }
  }, true);
})();