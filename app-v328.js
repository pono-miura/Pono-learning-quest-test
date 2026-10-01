/* v32.8 生徒を選ぶ・生徒別記録 */
(function(){
  const APP=document.getElementById("app");
  if(!APP)return;
  const DIRKEY="ponoStudentDirectoryV328";
  const STUDENTKEY="ponoV9Student";

  function safe(k,fallback){
    try{
      const x=JSON.parse(localStorage.getItem(k)||JSON.stringify(fallback));
      return x;
    }catch(e){return fallback}
  }
  function normalizeStudent(s){
    return {
      id:String(s?.id||"").trim(),
      name:String(s?.name||"").trim()||"名前未設定",
      grade:Math.min(6,Math.max(1,Number(s?.grade)||1))
    };
  }
  function loadDir(){
    let list=safe(DIRKEY,[]);
    if(!Array.isArray(list))list=[];

    const current=normalizeStudent(profile);
    const defaults=[
      current,
      {id:"PONO001",name:"はるさん",grade:3},
      {id:"PONO002",name:"そらさん",grade:5}
    ];

    defaults.forEach(s=>{
      if(!s.id)return;
      const i=list.findIndex(x=>x.id===s.id);
      if(i<0)list.push(s);
      else if(s.id===current.id)list[i]=current;
    });

    const known=new Set(list.map(x=>x.id));
    const allRecords=(typeof records!=="undefined"&&Array.isArray(records))?records:[];
    allRecords.forEach(r=>{
      const id=String(r.studentId||"").trim();
      if(!id||known.has(id))return;
      const g=Number(r.grade)||3;
      list.push({id,name:`生徒 ${id}`,grade:Math.min(6,Math.max(1,g))});
      known.add(id);
    });

    list=list.map(normalizeStudent).filter(x=>x.id);
    const uniq=[];
    const seen=new Set();
    list.forEach(x=>{if(!seen.has(x.id)){seen.add(x.id);uniq.push(x)}});
    localStorage.setItem(DIRKEY,JSON.stringify(uniq));
    return uniq;
  }
  function saveDir(list){
    localStorage.setItem(DIRKEY,JSON.stringify(list.map(normalizeStudent).filter(x=>x.id)));
  }
  function dayKey(v){
    const d=new Date(v);if(isNaN(d))return"";
    return new Intl.DateTimeFormat("ja-JP",{timeZone:"Asia/Tokyo",year:"numeric",month:"2-digit",day:"2-digit"}).format(d);
  }
  function unitName(r){
    return r.unit||r.nodeTitle||r.title||r.content||"学習記録";
  }
  function stats(id){
    let rr=(typeof records!=="undefined"&&Array.isArray(records))
      ?records.filter(r=>r.studentId===id):[];
    const rd=safe("ponoJapaneseReading313",[]).filter(r=>r.studentId===id);
    rd.forEach(x=>{
      if(!rr.some(r=>r.date===x.date&&unitName(r)===x.unit)){
        rr.push({date:x.date,subject:"国語",unit:x.unit});
      }
    });
    const days=new Set(rr.map(r=>dayKey(r.date)).filter(Boolean)).size;
    const um=new Set(rr.map(r=>(r.subject||"学習")+"|"+unitName(r)));
    return {records:rr.length,days,units:um.size};
  }
  function chooseStudent(s){
    const n=normalizeStudent(s);
    profile={id:n.id,name:n.name,grade:n.grade};
    localStorage.setItem(STUDENTKEY,JSON.stringify(profile));
    const list=loadDir();
    const i=list.findIndex(x=>x.id===n.id);
    if(i>=0){list[i]=n;saveDir(list)}
    if(typeof window.teacherHome323==="function")window.teacherHome323();
    else if(typeof teacher==="function")teacher();
  }
  function nextId(list){
    let max=0;
    list.forEach(s=>{
      const m=String(s.id||"").match(/^PONO(\d+)$/i);
      if(m)max=Math.max(max,Number(m[1]));
    });
    return "PONO"+String(max+1).padStart(3,"0");
  }

  function addStudent328(){
    const list=loadDir();
    head("➕ 生徒を追加",studentSelect328);
    A.append(e("div","card",`<h2>新しい生徒</h2>
      <p class="tiny">名前と在籍学年を登録します。学習記録は生徒IDごとに分けて保存されます。</p>`));

    const name=document.createElement("input");
    name.placeholder="名前（例：あおいさん）";

    const grade=document.createElement("select");
    for(let g=1;g<=6;g++){
      const o=document.createElement("option");
      o.value=g;o.textContent=`小学${g}年`;
      grade.appendChild(o);
    }

    const id=document.createElement("input");
    id.value=nextId(list);
    id.readOnly=true;

    const c=e("div","card");
    c.append(
      e("p","tiny","生徒ID"),
      id,
      e("p","tiny","名前"),
      name,
      e("p","tiny","在籍学年"),
      grade
    );
    A.append(c);

    A.append(btn("✓ 登録する",()=>{
      const nm=name.value.trim();
      if(!nm){name.focus();return}
      const s={id:id.value,name:nm,grade:Number(grade.value)};
      const latest=loadDir();
      latest.push(s);saveDir(latest);
      chooseStudent(s);
    },"primary"));
  }

  function studentSelect328(){
    const list=loadDir();
    head("👥 生徒を選ぶ",()=>typeof window.teacherHome323==="function"?window.teacherHome323():teacher());

    A.append(e("div","card",`<h2>生徒別の学習記録</h2>
      <p>見る生徒を選ぶと、その子の学習記録・進み具合・月間レポートに切り替わります。</p>
      <p class="tiny">記録は生徒IDごとに分けているため、別の生徒の記録とは混ざりません。</p>`));

    list.forEach(s=>{
      const st=stats(s.id);
      const current=s.id===profile.id;
      const c=e("div","card");
      c.innerHTML=`<h2>${current?"✅ ":""}${s.name}</h2>
        <p><b>在籍 小学${s.grade}年</b>　<span class="pill">${s.id}</span></p>
        <p><span class="pill">学習日 ${st.days}日</span>
        <span class="pill">記録 ${st.records}件</span>
        <span class="pill">単元 ${st.units}</span></p>`;
      const b=btn(current?"現在選択中":"この生徒を選ぶ",()=>chooseStudent(s),current?"soft":"primary");
      if(current)b.disabled=true;
      c.append(b);
      A.append(c);
    });

    A.append(btn("➕ 生徒を追加",addStudent328,"primary"));
    A.append(e("p","tiny","※試作版では、この端末のブラウザ内に生徒情報と学習記録を保存しています。"));
  }

  function inject328(){
    const h1=(APP.querySelector("h1")?.textContent||"").trim();
    if(!h1.includes("先生・Pono"))return;
    if(APP.querySelector(".student-select328"))return;

    const b=btn("👥 生徒を選ぶ",studentSelect328,"primary");
    b.classList.add("student-select328");
    const firstCard=APP.querySelector(".card");
    if(firstCard && firstCard.nextSibling) APP.insertBefore(b,firstCard.nextSibling);
    else if(firstCard) APP.appendChild(b);
    else APP.insertBefore(b,APP.children[1]||null);
  }

  new MutationObserver(inject328).observe(APP,{childList:true,subtree:true});
  document.addEventListener("click",()=>setTimeout(inject328,0),true);
  inject328();

  window.studentSelect328=studentSelect328;
})();