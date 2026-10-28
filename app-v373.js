/* Pono Learning Quest v37.3 — 算数の初回正解・再挑戦を区別し、選択肢の位置を分散 */
(function () {
  'use strict';
  // 既存の教材、選択肢の正誤、学習の進め方はそのまま使う。
  if (typeof mathQ !== 'function' || typeof mathAns !== 'function' ||
      typeof mathJudge !== 'function' || typeof self278 !== 'function' ||
      typeof summary278 !== 'function') return;
  const app373 = document.getElementById('app');
  if (!app373) return;

  function hash373(value) {
    let h = 0;
    for (const c of String(value)) h = (h * 31 + c.charCodeAt(0)) >>> 0;
    return h;
  }
  // 内容はシャッフルせず、正解ボタンの場所だけを固定した順番に並べ直す。
  // 既存ボタン自体を移動するので、回答イベントは失われない。
  function balance373(buttons, correctIndex, seed, tail) {
    if (!tail || buttons.length < 2 || correctIndex < 0 || correctIndex >= buttons.length) return;
    const correct = buttons[correctIndex];
    const rest = buttons.filter(b => b !== correct);
    const target = hash373(seed) % buttons.length;
    rest.splice(target, 0, correct);
    rest.forEach(b => app373.insertBefore(b, tail));
  }
  function gatherAfter373(anchor, count) {
    if (!anchor || !Number.isInteger(count) || count < 2 || count > 5) return null;
    const a=[]; let node=anchor.nextElementSibling;
    while (node && a.length < count && node.tagName === 'BUTTON' && node.parentElement === app373) {
      a.push(node);node=node.nextElementSibling;
    }
    return a.length === count ? {buttons:a,tail:node} : null;
  }
  function stage373() {
    if (!adaptive || !MATHNODES || !MATHNODES[adaptive.node]) return null;
    const code=`${adaptive.history.length}|${adaptive.node}`;
    const st=adaptive.__v373Stage;
    if (!st || st.code !== code) adaptive.__v373Stage={code,seen:{},firstCorrect:0};
    return adaptive.__v373Stage;
  }

  // 詳細教材: 最初の回答がどうだったかを、一問ごとに1回だけ記録する。
  const oldMathAns373=mathAns;
  mathAns=function(ok,q){
    const t=stage373();
    if(t && Number.isInteger(adaptive.qi) && !Object.prototype.hasOwnProperty.call(t.seen,adaptive.qi)){
      t.seen[adaptive.qi]=Boolean(ok);
      if(ok) t.firstCorrect++;
    }
    return oldMathAns373.apply(this,arguments);
  };
  const oldMathQ373=mathQ;
  mathQ=function(){
    const out=oldMathQ373.apply(this,arguments);
    try{
      if (!adaptive || !MATHNODES[adaptive.node]) return out;
      const q=MATHNODES[adaptive.node].qs[adaptive.qi];if(!q)return out;
      const memo=[...app373.children].find(x=>x.tagName==='BUTTON' && (x.textContent||'').includes('メモする'));
      const group=gatherAfter373(memo,q[1].length);
      if(group) balance373(group.buttons,q[2],`${adaptive.node}:${adaptive.qi}`,group.tail);
    }catch(e){/* 旧画面に影響を与えない */}
    return out;
  };
  const oldMathJudge373=mathJudge;
  mathJudge=function(){
    const t=stage373();
    const total=adaptive&&MATHNODES[adaptive.node]?MATHNODES[adaptive.node].qs.length:0;
    const initial=t?t.firstCorrect:null;
    if(t) adaptive.ok=initial; // 最後まで解けた回数ではなく、初回正解数を評価に使用。
    const before=records.length;
    const result=oldMathJudge373.apply(this,arguments);
    if(records.length>before && Number.isInteger(initial) && total){
      const last=records[records.length-1];
      if(last && last.subject==='算数'){
        last.firstCorrect=initial;
        last.completedWithRetries=total;
        last.retriedQuestions=total-initial;
        last.questionStructure=(last.questionStructure||'')+'／初回正解と再挑戦を区別';
        last.status=(Number(last.hints)>0 || total-initial>0) ? '説明・再挑戦を含め完了' : '初回ですべて正解';
        if(typeof save==='function') save();
        const box=app373.querySelector('.card');
        if(box){ const p=document.createElement('p');p.className='tiny v373score';
          p.textContent=`初回正解：${initial} / ${total}問。間違えた問題も、確認して最後まで取り組みました。`;
          box.append(p);
        }
      }
    }
    return result;
  };

  // 時間をあけた3問の定着確認でも、特定の番号が正解にならないようにする。
  if(typeof retentionQ==='function'){
    const originalRetentionQ373=retentionQ;
    retentionQ=function(){
      const result=originalRetentionQ373.apply(this,arguments);
      try{
        if(!retention||!retention.qs) return result;
        const q=retention.qs[retention.qi];if(!q)return result;
        const tail=[...app373.children].find(x=>x.tagName==='BUTTON' && (x.textContent||'').includes('今はわからない'));
        if(!tail)return result;
        const buttons=[];let current=tail.previousElementSibling;
        while(current&&buttons.length<q[1].length&&current.tagName==='BUTTON'){
          buttons.unshift(current);current=current.previousElementSibling;
        }
        if(buttons.length===q[1].length)balance373(buttons,q[2],`retain:${retention.node}:${retention.qi}`,tail);
      }catch(e){}
      return result;
    };
  }

  // 教科書単元の共通教材: 最初の選択を記録し、やり直し後の正解と区別する。
  const oldSelf278_373=self278;
  self278=function(g,t){
    const result=oldSelf278_373.apply(this,arguments);
    try{
      const state=mb278;if(!state||!state.qs)return result;
      const qi=state.i,q=state.qs[qi];if(!q)return result;
      if(!state.__v373First)state.__v373First={};
      const heading=[...app373.children].find(el=>el.classList&&el.classList.contains('card')&&(el.querySelector('h2')||{}).textContent===q[0]);
      if(!heading)return result;
      const group=gatherAfter373(heading,q[1].length);
      if(!group)return result;
      group.buttons.forEach((b,index)=>b.addEventListener('click',function(){
        if(!Object.prototype.hasOwnProperty.call(state.__v373First,qi)) state.__v373First[qi]=(index===q[2]);
      },true));
      balance373(group.buttons,q[2],`bridge:${g}:${t}:${qi}`,group.tail);
    }catch(e){}
    return result;
  };
  const oldSummary278_373=summary278;
  summary278=function(g,t){
    const state=mb278;
    let count=null, total=state&&state.qs?state.qs.length:0;
    if(state&&state.__v373First){count=Object.values(state.__v373First).filter(Boolean).length;state.ok=count;}
    const before=records.length;
    const result=oldSummary278_373.apply(this,arguments);
    if(records.length>before && count!==null){
      const last=records[records.length-1];
      if(last&&last.subject==='算数'){
        last.firstCorrect=count;last.completedWithRetries=total;last.retriedQuestions=total-count;
        last.status=count===total&&state.h===0?'初回ですべて正解':'説明・再挑戦を含め完了';
        if(typeof save==='function')save();
      }
      const box=app373.querySelector('.card');
      if(box){const p=document.createElement('p');p.className='tiny v373score';p.textContent=`初回正解：${count} / ${total}問。再挑戦して解けたことも大切な学習です。`;box.append(p);}
    }
    return result;
  };
})();
