/* v35.3 6年社会：大単元ボタンを必ず小単元メニューへつなぐ */
(function(){
  const parents=['ともに生きる暮らしと政治','日本の歴史','世界の中の日本'];
  function clean(s){return String(s||'').replace(/^\s*\d+\s*[\.．、:]?\s*/,'').trim();}
  document.addEventListener('click',function(ev){
    const b=ev.target && ev.target.closest ? ev.target.closest('button') : null;
    if(!b) return;
    const title=clean(b.textContent);
    if(!parents.includes(title)) return;
    const body=(document.body && document.body.innerText)||'';
    if(!body.includes('社会｜小学6年') && !body.includes('社会 | 小学6年')) return;
    if(typeof textbookUnitHome!=='function') return;
    ev.preventDefault();
    ev.stopImmediatePropagation();
    textbookUnitHome('社会',6,title,null);
  },true);
})();
