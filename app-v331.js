/* v33.1 「生徒を選ぶ」重複表示を整理 */
(function(){
  const APP=document.getElementById("app");
  if(!APP)return;

  function dedupeStudentButton331(){
    const buttons=[...APP.querySelectorAll("button")].filter(b=>
      (b.textContent||"").trim()==="👥 生徒を選ぶ"
    );
    if(buttons.length<=1)return;

    const keep=buttons[0];
    buttons.slice(1).forEach(b=>b.remove());
    keep.classList.add("student-select331");
  }

  let scheduled=false;
  const schedule=()=>{
    if(scheduled)return;
    scheduled=true;
    setTimeout(()=>{
      scheduled=false;
      dedupeStudentButton331();
    },0);
  };

  new MutationObserver(schedule).observe(APP,{childList:true,subtree:true});
  document.addEventListener("click",schedule,true);
  schedule();
})();