/* v33.6 算数メモ：指・ペンの位置ずれ修正
   client座標をcanvas実ピクセルへ毎回変換し、端末倍率やAndroid表示倍率の影響を受けにくくする。 */
(function(){
  window.mathScratchpad = mathScratchpad = function(){
    let old=document.getElementById("mathScratchOverlay"); if(old) old.remove();

    let ov=document.createElement("div");
    ov.id="mathScratchOverlay";
    ov.className="scratch-overlay";
    ov.innerHTML=`<div class="scratch-sheet">
      <div class="scratch-head"><b>✏️ メモ・筆算</b><button id="scratchClose">閉じる</button></div>
      <p class="tiny">指やペンを置いた位置に、そのまま書けるメモです。</p>
      <div class="scratch-canvas-wrap"><canvas id="scratchCanvas"></canvas></div>
      <div class="scratch-actions"><button id="scratchClear">🧽 全部けす</button><button id="scratchDone">問題にもどる</button></div>
    </div>`;
    document.body.appendChild(ov);

    const cv=document.getElementById("scratchCanvas");
    const wrap=cv.parentElement;
    const ctx=cv.getContext("2d");

    // Androidで親要素がスクロールしないように固定
    cv.style.display="block";
    cv.style.width="100%";
    cv.style.height="100%";
    cv.style.touchAction="none";
    cv.style.userSelect="none";
    cv.style.webkitUserSelect="none";
    wrap.style.position="relative";
    wrap.style.touchAction="none";
    ov.style.overscrollBehavior="contain";

    function resize(){
      const w=Math.max(1,wrap.clientWidth);
      const h=Math.max(1,wrap.clientHeight);
      const d=Math.max(1,window.devicePixelRatio||1);

      cv.width=Math.round(w*d);
      cv.height=Math.round(h*d);
      cv.style.width=w+"px";
      cv.style.height=h+"px";

      ctx.setTransform(1,0,0,1,0,0);
      ctx.lineWidth=Math.max(4,5*d);
      ctx.lineCap="round";
      ctx.lineJoin="round";
      ctx.strokeStyle="#222";
      ctx.fillStyle="#222";
    }

    resize();

    let drawing=false;
    let pointerId=null;

    // 画面上の指位置 → canvas内部の実ピクセルへ正確に変換
    function point(ev){
      const r=cv.getBoundingClientRect();
      const sx=cv.width/r.width;
      const sy=cv.height/r.height;
      return {
        x:(ev.clientX-r.left)*sx,
        y:(ev.clientY-r.top)*sy
      };
    }

    function start(ev){
      ev.preventDefault();
      drawing=true;
      pointerId=ev.pointerId;
      try{cv.setPointerCapture(ev.pointerId)}catch(e){}
      const p=point(ev);

      // タップだけでも点が残る
      ctx.beginPath();
      ctx.arc(p.x,p.y,ctx.lineWidth/2,0,Math.PI*2);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(p.x,p.y);
    }

    function move(ev){
      if(!drawing || (pointerId!==null && ev.pointerId!==pointerId))return;
      ev.preventDefault();
      const p=point(ev);
      ctx.lineTo(p.x,p.y);
      ctx.stroke();
    }

    function end(ev){
      if(!drawing)return;
      if(ev)ev.preventDefault();
      drawing=false;
      try{
        if(pointerId!==null && cv.hasPointerCapture(pointerId))cv.releasePointerCapture(pointerId);
      }catch(e){}
      pointerId=null;
    }

    cv.addEventListener("pointerdown",start,{passive:false});
    cv.addEventListener("pointermove",move,{passive:false});
    cv.addEventListener("pointerup",end,{passive:false});
    cv.addEventListener("pointercancel",end,{passive:false});
    cv.addEventListener("lostpointercapture",()=>{drawing=false;pointerId=null});
    cv.addEventListener("contextmenu",e=>e.preventDefault());

    const close=()=>ov.remove();
    document.getElementById("scratchClose").onclick=close;
    document.getElementById("scratchDone").onclick=close;
    document.getElementById("scratchClear").onclick=()=>{
      ctx.clearRect(0,0,cv.width,cv.height);
    };
  };
})();