/* v33.5 理科「学ぶ」図解追加
   まず6年「物の燃え方と空気」を、実験・気体・燃焼前後の3図で見える化。
   外部画像を使わずSVGで描画するので、GitHub Pagesだけで動作する。 */
(function(){
  function fig335(title,body,caption){
    return `<div class="sciFig335"><div class="sciFigTitle335">👀 ${title}</div>${body}<p class="sciFigCaption335">${caption}</p></div>`;
  }
  function svg335(body,label){
    return `<svg class="sciSvg335" viewBox="0 0 640 330" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;
  }

  function combustionFigures335(){
    const f1=svg335(`
      <rect x="38" y="242" width="564" height="20" rx="10" class="line335"/>
      <rect x="292" y="150" width="56" height="92" rx="10" class="wax335"/>
      <path d="M320 150 C289 121 303 83 320 57 C338 84 351 121 320 150Z" class="flame335"/>
      <path d="M192 47 Q320 4 448 47 L448 235 Q320 267 192 235 Z" class="jar335"/>
      <path d="M238 82 C257 61 276 58 292 72" class="arrow335"/>
      <path d="M401 74 C420 92 420 113 406 130" class="arrow335"/>
      <text x="320" y="302" text-anchor="middle" class="txt335">びんでおおうと、しばらくして火が消える</text>
    `,"ろうそくをびんでおおう実験");

    const f2=svg335(`
      <circle cx="210" cy="160" r="108" class="air335"/>
      <circle cx="168" cy="128" r="26" class="oxy335"/><text x="168" y="135" text-anchor="middle" class="smalltxt335">酸素</text>
      <circle cx="251" cy="202" r="22" class="co2335"/><text x="251" y="208" text-anchor="middle" class="smalltxt335">CO₂</text>
      <circle cx="254" cy="105" r="32" class="other335"/><text x="254" y="112" text-anchor="middle" class="smalltxt335">ほか</text>
      <circle cx="167" cy="205" r="33" class="other335"/><text x="167" y="212" text-anchor="middle" class="smalltxt335">ほか</text>
      <path d="M350 160 H455" class="arrow335"/>
      <rect x="460" y="110" width="132" height="100" rx="20" class="note335"/>
      <text x="526" y="143" text-anchor="middle" class="txt335">酸素</text>
      <text x="526" y="174" text-anchor="middle" class="smalltxt335">物を燃やす</text>
      <text x="526" y="198" text-anchor="middle" class="smalltxt335">はたらき</text>
    `,"空気の中の気体と酸素");

    const f3=svg335(`
      <rect x="35" y="52" width="250" height="218" rx="24" class="box335"/>
      <rect x="355" y="52" width="250" height="218" rx="24" class="box335"/>
      <text x="160" y="88" text-anchor="middle" class="txt335">燃える前</text>
      <text x="480" y="88" text-anchor="middle" class="txt335">燃えた後</text>
      <rect x="73" y="118" width="174" height="43" rx="14" class="oxy335"/>
      <text x="160" y="146" text-anchor="middle" class="smalltxt335">酸素　多い</text>
      <rect x="73" y="183" width="82" height="43" rx="14" class="co2335"/>
      <text x="114" y="211" text-anchor="middle" class="smalltxt335">CO₂ 少</text>
      <rect x="393" y="118" width="86" height="43" rx="14" class="oxy335"/>
      <text x="436" y="146" text-anchor="middle" class="smalltxt335">酸素 少</text>
      <rect x="393" y="183" width="174" height="43" rx="14" class="co2335"/>
      <text x="480" y="211" text-anchor="middle" class="smalltxt335">CO₂　多い</text>
      <path d="M291 160 H344" class="arrow335"/>
      <text x="320" y="303" text-anchor="middle" class="txt335">酸素がへり、二酸化炭素がふえる</text>
    `,"燃える前と燃えた後の空気の変化");

    return [
      fig335("図でたしかめる①　ろうそくをびんでおおうと？",f1,"新しい空気が入りにくくなると、火はしばらくして消えます。"),
      fig335("図でたしかめる②　空気の中には何がある？",f2,"空気の中の酸素には、物を燃やすはたらきがあります。"),
      fig335("図でたしかめる③　燃える前と後のちがい",f3,"物が燃えると、酸素がへって、二酸化炭素がふえます。")
    ].join("");
  }

  window.sciVisualPack335=function(g,t){
    if(Number(g)===6 && t==="物の燃え方と空気") return combustionFigures335();
    return "";
  };

  const oldLearn335 = window.sciLearn333 || sciLearn333;
  window.sciLearn333 = sciLearn333 = function(){
    oldLearn335();
    try{
      const s=window.sci333 || sci333;
      if(!s)return;
      const html=window.sciVisualPack335(s.g,s.t);
      if(!html)return;
      const cards=[...A.querySelectorAll(".card")];
      if(!cards.length)return;
      const holder=document.createElement("div");
      holder.className="sciVisualPack335";
      holder.innerHTML=`<div class="card lesson"><h2>🖼️ 図で見る</h2>${html}</div>`;
      const first=cards[0];
      first.insertAdjacentElement("afterend",holder);
    }catch(e){}
  };
})();