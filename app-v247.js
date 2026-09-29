/* v24.7 社会・理科：正解位置の偏りを解消
   問題文から安定した位置(1/2/3番目)を決め、選択肢と正解indexを同時に並べ替える。
   同じ問題は再表示しても同じ位置なので、学習画面が不用意に動かない。 */
function ponoHash247(s){
  let h=2166136261;
  for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}
  return h>>>0;
}
function ponoMoveAnswer247(q, pos){
  if(!Array.isArray(q)||!Array.isArray(q[1])||q[1].length<2)return q;
  const opts=q[1].slice(), correct=opts[q[2]], rest=opts.filter((_,i)=>i!==q[2]);
  pos=Math.max(0,Math.min(pos,opts.length-1));
  const arranged=rest.slice(); arranged.splice(pos,0,correct);
  return [q[0],arranged,pos];
}
function ponoBalanceSet247(qs, seed){
  if(!Array.isArray(qs))return qs;
  const start=ponoHash247(seed)%3;
  return qs.map((q,i)=>ponoMoveAnswer247(q,(start+i)%Math.min(3,q[1].length)));
}
const core247=unitCore;
unitCore=function(sub,title,g){
  const c=core247(sub,title,g);
  if((sub==="社会"||sub==="理科") && c && Array.isArray(c.qs)){
    c.qs=ponoBalanceSet247(c.qs,sub+"|"+g+"|"+title);
  }
  return c;
};
