/* v31.6 表示名をシンプルに統一
   教材内容は変更せず、「参考書のように学ぶ」→「学ぶ」へ。 */
(function(){
 function relabel316(root=document){
   root.querySelectorAll("button").forEach(b=>{
     const t=(b.textContent||"").trim();
     if(t.includes("① 参考書のように学ぶ")) b.textContent="📘 ① 学ぶ";
   });
   root.querySelectorAll(".tiny").forEach(el=>{
     const t=(el.textContent||"").trim();
     if(/小学\d年 国語｜参考書＋問題集型/.test(t)){
       el.textContent=t.replace("｜参考書＋問題集型","");
     }
   });
 }
 relabel316();
 new MutationObserver(()=>relabel316()).observe(document.body,{childList:true,subtree:true});
})();