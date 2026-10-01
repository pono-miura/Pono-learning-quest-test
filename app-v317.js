/* v31.7 「学ぶ」表示を生成時に確実に置換 */
(function(){
  const oldBtn317 = btn;
  btn = function(t,f,c=""){
    let label = String(t ?? "");
    if(label.includes("参考書のように学ぶ")){
      label = "📘 ① 学ぶ";
    }
    return oldBtn317(label,f,c);
  };
})();