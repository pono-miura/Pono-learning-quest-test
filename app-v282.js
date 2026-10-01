/* v28.2 算数：図解の重複表示を防止
   v27.9〜v28.1の図解処理は残しつつ、同一学習画面では最終版を1つだけ表示する。 */
function dedupeMathVisual282(){
  const boxes=[...A.querySelectorAll(".visual281,.visual280,.visual279")];
  if(boxes.length<=1)return;

  /* v28.1 > v28.0 > v27.9 の順で最終版を優先 */
  let keep=A.querySelector(".visual281") || A.querySelector(".visual280") || A.querySelector(".visual279");
  boxes.forEach(x=>{ if(x!==keep) x.remove(); });
}
let lock282=false;
new MutationObserver(()=>{
  if(lock282)return;
  lock282=true;
  requestAnimationFrame(()=>{
    dedupeMathVisual282();
    lock282=false;
  });
}).observe(A,{childList:true,subtree:true});
setTimeout(dedupeMathVisual282,0);
