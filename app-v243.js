
/* v24.3 正解音を全教科で「短く・高め・やさしいピッ♪」に統一
   correct.wav を呼ぶ既存コードも、この音に差し替える。 */
let ponoAudioCtx243=null;
function ponoCorrectBeep243(){
 try{
  const AC=window.AudioContext||window.webkitAudioContext;
  if(!AC)return;
  const ctx=ponoAudioCtx243||(ponoAudioCtx243=new AC());
  if(ctx.state==="suspended")ctx.resume();
  const t=ctx.currentTime,o=ctx.createOscillator(),g=ctx.createGain();
  o.type="sine"; o.frequency.setValueAtTime(1180,t);
  o.frequency.exponentialRampToValueAtTime(1420,t+0.075);
  g.gain.setValueAtTime(0.0001,t);
  g.gain.exponentialRampToValueAtTime(0.105,t+0.012);
  g.gain.exponentialRampToValueAtTime(0.0001,t+0.12);
  o.connect(g);g.connect(ctx.destination);o.start(t);o.stop(t+0.125);
 }catch(e){}
}
/* 旧コードの new Audio("correct.wav").play() を壊さず統一 */
const PonoNativeAudio243=window.Audio;
window.Audio=function(src){
 if(typeof src==="string" && /(?:^|\/)correct\.wav(?:\?|$)/i.test(src)){
   return {play:()=>{ponoCorrectBeep243();return Promise.resolve();},pause:()=>{},currentTime:0};
 }
 return new PonoNativeAudio243(src);
};
window.Audio.prototype=PonoNativeAudio243.prototype;
/* 今後の追加問題はこの関数を直接利用できる */
window.ponoCorrectSound=ponoCorrectBeep243;
