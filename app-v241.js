
/* v24.1 理科：理解を助けるPonoオリジナル図解
   教科書図版の複製ではなく、概念理解用の簡易SVG。 */
function sci241svg(kind){
 const base=(body)=>`<svg viewBox="0 0 600 260" role="img" class="sciSvg241" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;
 if(kind==="insect")return base(`<text x="300" y="30" text-anchor="middle" font-size="22">こん虫の体</text>
 <ellipse cx="190" cy="130" rx="48" ry="55" fill="none" stroke="currentColor" stroke-width="4"/><ellipse cx="300" cy="130" rx="65" ry="62" fill="none" stroke="currentColor" stroke-width="4"/><ellipse cx="440" cy="130" rx="75" ry="65" fill="none" stroke="currentColor" stroke-width="4"/>
 <text x="190" y="135" text-anchor="middle" font-size="20">頭</text><text x="300" y="135" text-anchor="middle" font-size="20">むね</text><text x="440" y="135" text-anchor="middle" font-size="20">はら</text>
 <g stroke="currentColor" stroke-width="4"><path d="M270 105l-65-50M270 130l-75 0M270 155l-65 50M330 105l65-50M330 130l75 0M330 155l65 50"/></g><text x="300" y="235" text-anchor="middle" font-size="18">あしは「むね」から6本</text>`);
 if(kind==="sun")return base(`<circle cx="90" cy="70" r="38" fill="none" stroke="currentColor" stroke-width="5"/><g stroke="currentColor" stroke-width="3"><path d="M90 15v-14M90 139v-14M35 70H15M165 70h-20"/></g>
 <line x1="130" y1="90" x2="360" y2="210" stroke="currentColor" stroke-width="4" stroke-dasharray="10 8"/><rect x="350" y="105" width="22" height="105" fill="none" stroke="currentColor" stroke-width="4"/><path d="M361 210l125 0" stroke="currentColor" stroke-width="18" opacity=".25"/>
 <text x="90" y="130" text-anchor="middle">太陽</text><text x="365" y="95" text-anchor="middle">ぼう</text><text x="480" y="242" text-anchor="middle">かげ</text>`);
 if(kind==="moon")return base(`<circle cx="90" cy="130" r="52" fill="none" stroke="currentColor" stroke-width="5"/><text x="90" y="137" text-anchor="middle" font-size="20">太陽</text><circle cx="300" cy="130" r="45" fill="none" stroke="currentColor" stroke-width="5"/><text x="300" y="137" text-anchor="middle" font-size="20">地球</text><circle cx="475" cy="75" r="28" fill="none" stroke="currentColor" stroke-width="5"/><text x="475" y="82" text-anchor="middle" font-size="16">月</text><path d="M145 110L245 125M345 115L440 85" stroke="currentColor" stroke-width="3" marker-end="url(#a)"/><defs><marker id="a" markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto"><path d="M0 0L6 3L0 6z" fill="currentColor"/></marker></defs><text x="300" y="220" text-anchor="middle">太陽の光が当たる側が明るく見える</text>`);
 if(kind==="lever")return base(`<polygon points="300,165 265,220 335,220" fill="none" stroke="currentColor" stroke-width="4"/><line x1="85" y1="165" x2="520" y2="125" stroke="currentColor" stroke-width="8"/><circle cx="110" cy="175" r="35" fill="none" stroke="currentColor" stroke-width="4"/><path d="M485 70v55" stroke="currentColor" stroke-width="5"/><path d="M475 85l10-15 10 15" fill="none" stroke="currentColor" stroke-width="4"/><text x="110" y="230" text-anchor="middle">おもり</text><text x="300" y="245" text-anchor="middle">支点</text><text x="485" y="55" text-anchor="middle">力</text>`);
 if(kind==="circuit")return base(`<rect x="80" y="105" width="90" height="45" rx="8" fill="none" stroke="currentColor" stroke-width="4"/><text x="125" y="134" text-anchor="middle">電池</text><circle cx="450" cy="128" r="42" fill="none" stroke="currentColor" stroke-width="4"/><text x="450" y="134" text-anchor="middle">豆電球</text><path d="M170 120H408M170 145H300V200H450V170" fill="none" stroke="currentColor" stroke-width="4"/><text x="300" y="240" text-anchor="middle">電気の通り道が1つにつながると流れる</text>`);
 if(kind==="plant")return base(`<path d="M300 220V75M300 115c-70-45-120-20-145 10 70 30 115 10 145-10M300 140c70-45 120-20 145 10-70 30-115 10-145-10" fill="none" stroke="currentColor" stroke-width="5"/><path d="M300 220c-35 10-55 25-70 38M300 220c35 10 55 25 70 38M300 220c0 18-8 28-15 38" stroke="currentColor" stroke-width="4"/><path d="M275 210V95" stroke="currentColor" stroke-width="5" stroke-dasharray="8 6"/><text x="210" y="70">葉</text><text x="330" y="170">くき</text><text x="380" y="245">根</text><text x="125" y="190">水 → 根 → くき → 葉</text>`);
 if(kind==="water")return base(`<path d="M45 70Q150 35 250 100T555 130" fill="none" stroke="currentColor" stroke-width="6"/><path d="M80 85Q180 75 275 125T535 150" fill="none" stroke="currentColor" stroke-width="3"/><text x="95" y="45">上流</text><text x="465" y="205">下流</text><path d="M145 155l65 25 65-25" fill="none" stroke="currentColor" stroke-width="4"/><text x="300" y="240" text-anchor="middle">流れる水は地面をけずり、運び、積もらせる</text>`);
 if(kind==="state")return base(`<rect x="45" y="85" width="120" height="100" rx="10" fill="none" stroke="currentColor" stroke-width="4"/><text x="105" y="140" text-anchor="middle">氷</text><rect x="240" y="85" width="120" height="100" rx="10" fill="none" stroke="currentColor" stroke-width="4"/><text x="300" y="140" text-anchor="middle">水</text><rect x="435" y="85" width="120" height="100" rx="10" fill="none" stroke="currentColor" stroke-width="4"/><text x="495" y="140" text-anchor="middle">水じょう気</text><path d="M170 115h60M365 115h60" stroke="currentColor" stroke-width="4"/><text x="200" y="100" text-anchor="middle">あたためる→</text><text x="400" y="100" text-anchor="middle">あたためる→</text><text x="300" y="225" text-anchor="middle">温度によって水のすがたが変わる</text>`);
 if(kind==="combustion")return base(`<path d="M300 55c-45 55-55 90-25 125 20 25 55 25 75 0 30-38 0-75-25-110-5 25-15 35-25 45 3-22 0-40 0-60z" fill="none" stroke="currentColor" stroke-width="5"/><text x="300" y="215" text-anchor="middle">ものが燃え続けるには空気が必要</text><path d="M80 130h120M520 130H400" stroke="currentColor" stroke-width="4" stroke-dasharray="10 7"/><text x="95" y="110">空気</text><text x="470" y="110">空気</text>`);
 if(kind==="strata")return base(`<path d="M70 65H530M70 105H530M70 150H530M70 200H530" stroke="currentColor" stroke-width="5"/><path d="M70 65Q180 90 300 65T530 65M70 150Q180 125 300 150T530 150" fill="none" stroke="currentColor" stroke-width="3"/><text x="300" y="35" text-anchor="middle">地層</text><text x="300" y="238" text-anchor="middle">れき・砂・どろなどが層になって重なる</text>`);
 return "";
}
function sciKind241(title){
 if(/こん虫|昆虫|チョウ/.test(title))return"insect";
 if(/太陽とかげ|太陽の光/.test(title))return"sun";
 if(/月|星/.test(title))return"moon";
 if(/てこ/.test(title))return"lever";
 if(/電気|電流|回路|電磁石/.test(title))return"circuit";
 if(/植物|発芽|花から実|生き物/.test(title))return"plant";
 if(/流れる水|雨水/.test(title))return"water";
 if(/水のすがた|体積と温度|あたたまり/.test(title))return"state";
 if(/燃え方/.test(title))return"combustion";
 if(/大地|地層/.test(title))return"strata";
 return"";
}
function scienceVisual241(title){
 const k=sciKind241(title); if(!k)return"";
 return `<div class="sciVisual241"><div class="tiny">👀 図で確かめる</div>${sci241svg(k)}<div class="tiny">Ponoオリジナル図解</div></div>`;
}
/* 既存の理科単元ホームと①まなぶに図を自然に追加 */
const oldHome241=textbookUnitHome;
textbookUnitHome=function(sub,g,title,term){
 if(sub!=="理科")return oldHome241(sub,g,title,term);
 const d=unitCore(sub,title,g),notes=unitSpecificNotes(sub,title,g);
 head(`${title}｜小学${g}年`,()=>subjectTermUnits(sub,g,term));
 A.append(e("div","card",`<div class="tiny">理科｜${term}</div><h2>この単元で学ぶこと</h2>${scienceVisual241(title)}
 ${(Array.isArray(d.learn)?d.learn:[d.learn]).map(x=>`<p>・${x}</p>`).join("")}${notes?`<div class="note">${notes}</div>`:""}`));
 A.append(btn("📖 ①まなぶ から始める",()=>unitLearn(sub,g,title,term),"primary"));
 A.append(btn("🚀 問題からやってみる",()=>unitQuestion(sub,g,title,term,0,0),"soft"));
};
const oldLearn241=unitLearn;
unitLearn=function(sub,g,title,term){
 if(sub!=="理科")return oldLearn241(sub,g,title,term);
 const d=unitCore(sub,title,g);
 head(`①まなぶ｜${title}`,()=>textbookUnitHome(sub,g,title,term));
 A.append(e("div","card",`<h2>📖 ①まなぶ</h2>${scienceVisual241(title)}${(Array.isArray(d.learn)?d.learn:[d.learn]).map(x=>`<p>${x}</p>`).join("")}<p class="tiny">図は考える手がかりです。図だけで決めず、観察・実験の結果とつなげよう。</p>`));
 A.append(btn("➡️ ② 一緒にやってみる",()=>unitTogether(sub,g,title,term),"primary"));
};
