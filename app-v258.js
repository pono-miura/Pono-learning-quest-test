/* v25.8 先生・保護者ダッシュボード仕上げ */
function p258date(v){try{return new Intl.DateTimeFormat("ja-JP",{timeZone:"Asia/Tokyo",month:"numeric",day:"numeric"}).format(new Date(v))}catch(e){return""}}
function p258recent(rows,days=30){
 const cut=Date.now()-days*86400000;
 return rows.filter(r=>{const d=Date.parse(r.date||r.startedAt||r.endedAt||"");return !isNaN(d)&&d>=cut});
}
function p258change(rows){
 const now=Date.now(),a=[],b=[];
 rows.forEach(r=>{let d=Date.parse(r.date||r.startedAt||r.endedAt||"");if(isNaN(d))return;let age=(now-d)/86400000;if(age<=14)a.push(r);else if(age<=28)b.push(r)});
 const A=p257analyze(a),B=p257analyze(b);
 const items=[["🚀 自分で",A.independent-B.independent],["🔁 定着",A.retention-B.retention],["🔊 音声",A.audio-B.audio],["🖼️ 図・メモ",A.visual-B.visual]];
 return items.filter(x=>x[1]>0).sort((x,y)=>y[1]-x[1]).slice(0,2).map(x=>x[0]+"を使った記録が増えています");
}
function p258dashboard(mode){
 const rows=p257mine(),recent=p258recent(rows),s=p257analyze(recent),n=p257notes(s),changes=p258change(rows),counts=p257subjectCounts(recent);
 head(mode==="parent"?"保護者｜今月の学び":"先生｜学習ダッシュボード",()=>mode==="parent"?parent():teacher());
 A.append(e("div","card p258hero",`<h2>🌱 最近の学びをまとめて見る</h2><p>点数だけでなく、できるようになったこと・使いやすい方法・負担・次の一歩を整理します。</p><span>直近30日</span></div>`));
 A.append(e("div","card",`<h3>✨ 最近の変化</h3><p>${changes.length?changes.join("。")+"。":"比較できる記録をためているところです。"}</p></div>`));
 A.append(e("div","card",`<h3>できるようになってきたこと</h3><p>${n.good.length?n.good.join("。")+"。":"学習記録を続けながら確認します。"}</p></div>`));
 A.append(e("div","card",`<h3>使いやすそうな方法</h3><p>${n.tools.length?n.tools.join("・"):"まだ記録をためているところです。"}</p>${s.writing?`<p>✍️ 書字に負担の記録があります。内容理解とは分けて見ています。</p>`:""}</div>`));
 A.append(e("div","card",`<h3>🌿 次の一歩</h3><p>${n.next.join("。")}。</p></div>`));
 A.append(e("div","card",`<h3>教科の取り組み</h3><div class="p258bars">${Object.entries(counts).map(([k,v])=>`<div><span>${k}</span><i style="width:${Math.min(100,v*10)}%"></i><b>${v}</b></div>`).join("")}</div><p class="tiny">数字は点数ではなく、この端末に残っている直近30日の関連記録件数です。</p></div>`));
 if(mode==="teacher"){
   A.append(btn("🏫 学校共有用のまとめを見る",()=>schoolShare258(rows),"primary"));
 }
}
function schoolShare258(rows){
 const r=p258recent(rows),s=p257analyze(r),n=p257notes(s),c=p257subjectCounts(r);
 head("学校共有用｜学習のようす",()=>p258dashboard("teacher"));
 A.append(e("div","card",`<h2>学習のようす</h2><p><b>期間：</b>直近30日</p><p><b>取り組んだ教科：</b>${Object.entries(c).filter(x=>x[1]).map(x=>x[0]).join("・")||"記録なし"}</p><h3>現在できていること</h3><p>${n.good.length?n.good.join("。")+"。":"記録蓄積中です。"}</p><h3>学習時に有効だった方法</h3><p>${n.tools.length?n.tools.join("・"):"記録蓄積中です。"}</p><h3>配慮している点</h3><p>${s.writing?"書字の負担と内容理解を分け、必要に応じて大きな書字枠や音声等を選べるようにしています。":"本人が使いやすい方法を選べるようにし、理解の過程を確認しています。"}</p><h3>次の学習</h3><p>${n.next.join("。")}。</p><p class="tiny">Pono内の学習記録をもとにした共有用要約です。出席認定の申請書類ではありません。</p></div>`));
 A.append(btn("🖨️ 印刷・PDF保存",()=>window.print(),"soft"));
}
function p258inject(label,fn,id){
 if(!A||document.getElementById(id))return;
 const d=e("div","card p258entry",`<h3>📊 最近の学び</h3><p>変化・できていること・負担・次の一歩をまとめます。</p>`);d.id=id;d.append(btn(label,fn,"primary"));A.append(d);
}
if(typeof teacher==="function"){const t258=teacher;teacher=function(){t258();setTimeout(()=>p258inject("学習ダッシュボードを見る",()=>p258dashboard("teacher"),"p258teacher"),0)}}
if(typeof parent==="function"){const p258=parent;parent=function(){p258();setTimeout(()=>p258inject("今月の学びを見る",()=>p258dashboard("parent"),"p258parent"),0)}}
