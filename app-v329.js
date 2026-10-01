/* v32.9 先生・Pono画面に「生徒を選ぶ」を確実に表示 */
(function(){
  if(typeof window.teacherHome323!=="function" || typeof window.studentSelect328!=="function") return;

  const baseTeacher329=window.teacherHome323;

  function teacherHome329(){
    baseTeacher329();

    const app=document.getElementById("app");
    if(!app)return;

    if(app.querySelector(".student-select329"))return;

    const b=document.createElement("button");
    b.className="primary student-select329";
    b.textContent="👥 生徒を選ぶ";
    b.onclick=window.studentSelect328;

    const firstCard=app.querySelector(".card");
    if(firstCard){
      firstCard.insertAdjacentElement("afterend",b);
    }else{
      const top=app.querySelector(".top");
      if(top)top.insertAdjacentElement("afterend",b);
      else app.prepend(b);
    }
  }

  /* ホームから先生画面を開く時に使われる global teacher を確実に差し替える */
  teacher=teacherHome329;

  /* v32.8 の戻る/生徒切替後も、同じ整理済み先生画面へ戻す */
  window.teacherHome323=teacherHome329;

  /* すでに先生画面を開いている状態で読み込まれた場合にもその場で追加 */
  const app=document.getElementById("app");
  const title=(app?.querySelector("h1")?.textContent||"");
  if(title.includes("先生・Pono")){
    teacherHome329();
  }
})();