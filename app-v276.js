/* v27.6 学期分類を廃止：教科→学年→単元
   既存の単元データ・問題・漢字・読解・算数詳細はそのまま利用する。 */
function allUnits276(subject,g){
 const seen=new Set(), list=[];
 function add(x){
   const name=typeof x==="string"?x:(x&&(x.title||x.name||x.unit));
   if(name && !seen.has(name)){seen.add(name);list.push(name)}
 }
 /* 現行の学期別単元取得を3学期分まとめる */
 for(let ti=0;ti<3;ti++){
   try{
     let before=list.length;
     /* 国語・算数の既存配列を優先 */
     if(subject==="国語"){
       const a=(typeof jUnits259==="function"?jUnits259(g):[])||[];
       a.forEach(add);
     }
     /* subjectTermUnits が使っている単元データをDOMに出さず拾える既知関数 */
     if(typeof termUnits249==="function" && subject!=="国語" && subject!=="算数"){
       /* 下のfallbackで既存画面を利用するため、ここでは直接呼ばない */
     }
   }catch(e){}
 }
 /* 学期ボタンを一時DOMに描画して単元名を安全に回収する */
 if(!list.length){
   const oldA=window.A, tmp=document.createElement("div");
   try{
     window.A=tmp;
     for(let ti=0;ti<3;ti++){
       if(typeof subjectTermUnits==="function") subjectTermUnits(subject,g,ti);
     }
     [...tmp.querySelectorAll("button")].forEach(b=>{
       let t=(b.textContent||"").trim();
       if(t && !/戻る|ホーム|学期|ごろ/.test(t)) add(t);
     });
   }catch(e){}
   window.A=oldA;
 }
 return list;
}

function openUnit276(subject,g,name){
 if(subject==="国語"){japaneseTextbookOpen249(g,name);return}
 if(subject==="算数"){mathTextbookOpen249(g,name);return}
 /* 理社英は、どの学期に属するか既存画面から探して同じクリックを実行 */
 for(let ti=0;ti<3;ti++){
   const oldA=window.A,tmp=document.createElement("div");
   try{
     window.A=tmp;
     subjectTermUnits(subject,g,ti);
     const b=[...tmp.querySelectorAll("button")].find(x=>(x.textContent||"").trim()===name);
     window.A=oldA;
     if(b){b.click();return}
   }catch(e){window.A=oldA}
 }
}

function subjectUnits276(subject,g){
 head(`${subject}｜小学${g}年`,()=>subjectGrades(subject));
 const units=allUnits276(subject,g);
 A.append(e("div","card",`<div class="tiny">小学${g}年 ${subject}</div><h2>単元をえらぼう</h2><p>学期に関係なく、今やりたいところから選べます。</p>`));
 if(units.length){
   units.forEach((name,i)=>A.append(btn(`${i+1}. ${name}`,()=>openUnit276(subject,g,name),"soft")));
 }else{
   /* データ取得できない場合だけ従来入口を残す */
   A.append(e("div","card","単元を読み込んでいます。"));
   A.append(btn("単元を開く",()=>subjectGradeTerms(subject,g),"primary"));
 }
}

/* 学年選択から先を「学期」ではなく直接単元一覧へ。
   既存関数が再定義されても最後に読み込むv27.6が優先される。 */
const sgBefore276=window.subjectGradeTerms;
window.subjectGradeTerms=function(subject,g){subjectUnits276(subject,Number(g))};

/* subjectGrades内の既存ボタンが subjectGradeTerms を呼ぶため、そのまま新画面へ接続 */
