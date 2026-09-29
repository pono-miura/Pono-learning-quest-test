
/* v24.4 正解音：高めで明るい「ピン・ポン♪」
   v24.3の短いピッ音を上書き。 */
let ponoAudioCtx244=null;
function ponoCorrectPingPong244(){
 try{
  const AC=window.AudioContext||window.webkitAudioContext;
  if(!AC)return;
  const ctx=ponoAudioCtx244||(ponoAudioCtx244=new AC());
  if(ctx.state==="suspended")ctx.resume();
  const t=ctx.currentTime;

  function bell(freq,start,dur,vol){
    const o=ctx.createOscillator(),g=ctx.createGain();
    o.type="sine";
    o.frequency.setValueAtTime(freq,start);
    g.gain.setValueAtTime(0.0001,start);
    g.gain.exponentialRampToValueAtTime(vol,start+0.012);
    g.gain.exponentialRampToValueAtTime(0.0001,start+dur);
    o.connect(g);g.connect(ctx.destination);
    o.start(start);o.stop(start+dur+0.01);
  }

  // 「ピン」→少し高い「ポン」。短く、正解だと分かりやすい2音。
  bell(1320,t,0.18,0.12);
  bell(1660,t+0.16,0.22,0.11);
 }catch(e){}
}

/* v24.3経由・旧correct.wav経由のどちらも同じ音へ */
window.ponoCorrectBeep243=ponoCorrectPingPong244;
window.ponoCorrectSound=ponoCorrectPingPong244;

const PonoAudioBefore244=window.Audio;
window.Audio=function(src){
 if(typeof src==="string" && /(?:^|\/)correct\.wav(?:\?|$)/i.test(src)){
   return {play:()=>{ponoCorrectPingPong244();return Promise.resolve();},pause:()=>{},currentTime:0};
 }
 return new PonoAudioBefore244(src);
};
window.Audio.prototype=PonoAudioBefore244.prototype;
