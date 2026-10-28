/* Pono Learning Quest v38.7 — 学習者別バックアップ（補助学習記録にも対応） */
(function(){
'use strict';
const root=document.getElementById('app');if(!root)return;
const FORMAT='pono-learning-quest-student-records', MAIN='ponoV9Records', LIMIT=16*1024*1024;
const EXTRA=[
 ['ponoKanjiLearning252','漢字クエスト・学び方'],
 ['ponoKanjiProgressV20','漢字の読み・意味など'],
 ['ponoJapaneseDifficulty','国語・ふりかえり'],
 ['ponoJapaneseRetention','国語・定着確認'],
 ['ponoJapaneseReading313','国語・読解'],
 ['ponoMathReflections','算数・ふりかえり'],
 ['ponoMathBridgeRetention278','算数・定着確認'],
 ['ponoUnitReflections','教科・ふりかえり'],
 ['ponoAllSubjectRetention','教科・定着確認'],
 ['ponoEnglishSpeaking','英語・発話練習']
];
const allowedKeys=new Set(EXTRA.map(x=>x[0]));
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const node=(tag,cls,html)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(html!==undefined)n.innerHTML=html;return n;};
const button=(label,fn,cls='soft')=>{const n=document.createElement('button');n.type='button';n.className=cls;n.textContent=label;n.addEventListener('click',fn);return n;};
const plain=x=>!!x&&typeof x==='object'&&!Array.isArray(x)&&Object.getPrototypeOf(x)===Object.prototype;
function student(){try{return typeof profile!=='undefined'&&profile&&profile.id!=null?profile:null}catch(e){return null}}
function studentId(){const p=student();return p?String(p.id):null}
function rows(key){try{const x=JSON.parse(localStorage.getItem(key)||'[]');if(!Array.isArray(x))throw Error('array');return x}catch(e){throw Error('記録の読み込みに失敗しました：'+key)}}
function tagged(key){const id=studentId();const all=rows(key);return {selected:all.filter(r=>plain(r)&&String(r.studentId)===id),excluded:all.filter(r=>plain(r)&&r.studentId==null).length};}
function back(){if(typeof window.ponoGrade6Dashboard385==='function')window.ponoGrade6Dashboard385();else if(typeof child==='function')child()}
function page(title){root.replaceChildren();const t=node('div','top');t.append(button('← 戻る',back,'back'),node('h1','pono387title',esc(title)));root.append(t);try{window.scrollTo(0,0)}catch(e){}}
function message(msg,warn){const d=node('div','card pono387msg'+(warn?' pono387warn':''));d.textContent=msg;root.append(d);return d;}
function dateJP(){return new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Tokyo',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date())}
function summary(){const list=[[MAIN,'主要な学習記録'],...EXTRA].map(([key,label])=>({key,label,...tagged(key)}));return {list,total:list.reduce((n,x)=>n+x.selected.length,0),ambiguous:list.reduce((n,x)=>n+x.excluded,0)};}
function download(){const p=student();if(!p)return message('学習者を選んでから保存してください。',true);
 let sum;try{sum=summary()}catch(e){return message(String(e.message||e),true)}
 const auxiliary={};sum.list.slice(1).forEach(x=>auxiliary[x.key]=x.selected);
 const obj={format:FORMAT,version:2,exportedAt:new Date().toISOString(),student:{id:String(p.id),name:String(p.name||''),grade:Number(p.grade)||6},records:sum.list[0].selected,auxiliary};
 const json=JSON.stringify(obj,null,2);
 if(new Blob([json]).size>LIMIT)return message('記録が16MBを超えるため保存できません。記録を確認してください。',true);
 try{const url=URL.createObjectURL(new Blob([json],{type:'application/json;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download=`Pono_Full_${String(p.id).replace(/[^a-zA-Z0-9_-]/g,'_').slice(0,32)||'student'}_${dateJP()}.json`;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),60000);message(`${sum.total}件（主要な記録${sum.list[0].selected.length}件・補助記録${sum.total-sum.list[0].selected.length}件）のバックアップを作成しました。端末のダウンロードを確認してください。`);}
 catch(e){message('バックアップの作成に失敗しました。端末の空き容量とダウンロード設定をご確認ください。',true)}
}
function entryValid(key,r,id){if(!plain(r)||!Object.prototype.hasOwnProperty.call(r,'studentId')||String(r.studentId)!==id)return false;
 if(key===MAIN)return typeof r.subject==='string'&&r.subject.length>0&&r.subject.length<100&&typeof r.date==='string'&&Number.isFinite(Date.parse(r.date));
 // Extra log shapes vary between years; keep ID-tagged objects only, and limit content size.
 return JSON.stringify(r).length<60000;
}
function checkBackup(obj){const p=student();if(!p)throw Error('先に学習者を選択してください。');
 if(!plain(obj)||obj.format!==FORMAT||![1,2].includes(obj.version)||!plain(obj.student)||typeof obj.student.id!=='string')throw Error('Ponoのバックアップファイルではありません。');
 const id=String(p.id);if(obj.student.id!==id)throw Error('別の学習者のバックアップです。混ざらないよう取り込みを中止しました。');
 if(!Array.isArray(obj.records))throw Error('主要な記録の形式が正しくありません。');
 const map={[MAIN]:obj.records};
 if(obj.version===2){if(!plain(obj.auxiliary))throw Error('補助記録の形式が正しくありません。');
  for(const [key,value] of Object.entries(obj.auxiliary)){if(!allowedKeys.has(key)||!Array.isArray(value))throw Error('認識できない補助記録が含まれています。');map[key]=value;}
 }
 let count=0;for(const [key,value] of Object.entries(map)){count+=value.length;if(value.length>30000||value.some(r=>!entryValid(key,r,id)))throw Error('学習者IDや記録の形式が正しくありません。既存データは変更していません。');}
 if(count>45000)throw Error('記録件数が多すぎるため、安全のため取り込みません。');return map;
}
function fingerprint(x){return JSON.stringify(x)}
function mergePreview(map){const updates=[],lines=[];let total=0;for(const [key,data] of Object.entries(map)){
  const before=rows(key),seen=new Set(before.map(fingerprint)),add=[];for(const x of data){const hash=fingerprint(x);if(!seen.has(hash)){seen.add(hash);add.push(x);}}
  updates.push({key,add});total+=add.length;const label=key===MAIN?'主要な学習記録':EXTRA.find(x=>x[0]===key)?.[1]||key;lines.push({label,has:data.length,add:add.length});
 }return {updates,lines,total};}
function apply(updates){const snapshot=new Map(),saved=[];
 try{for(const {key,add} of updates){if(!add.length)continue;const old=localStorage.getItem(key);snapshot.set(key,old);
  const before=rows(key),seen=new Set(before.map(fingerprint)),distinct=add.filter(x=>{const h=fingerprint(x);if(seen.has(h))return false;seen.add(h);return true});
  if(!distinct.length)continue;localStorage.setItem(key,JSON.stringify(before.concat(distinct)));saved.push(key);
 }
  if(saved.includes(MAIN)){try{const fresh=rows(MAIN);if(typeof records!=='undefined'&&Array.isArray(records))records.splice(0,records.length,...fresh)}catch(e){}}
  return {ok:true};
 }catch(e){let restored=true;for(const key of saved.reverse())try{const old=snapshot.get(key);if(old==null)localStorage.removeItem(key);else localStorage.setItem(key,old)}catch(err){restored=false}
  return {ok:false,restored};
 }}
async function readFile(file){if(!file)return;page('バックアップの内容を確認');
 if(file.size>LIMIT){message('ファイルが16MBを超えています。',true);root.append(button('戻る',open));return;}
 let map;try{map=checkBackup(JSON.parse(await file.text()))}catch(e){message(e.message||'読み込みに失敗しました。',true);root.append(button('戻る',open));return;}
 let preview;try{preview=mergePreview(map)}catch(e){message('端末内の記録を読み取れません。既存データは変更していません。',true);root.append(button('戻る',open));return;}
 const card=node('div','card pono387preview');card.append(node('h2','','取り込む前に確認しましょう'),node('p','',`<b>ファイル：</b>${esc(file.name)}`),node('p','',`<b>学習者ID：</b>${esc(studentId())}`),node('p','',`<b>新しく追加する記録：</b>${preview.total}件`));
 for(const line of preview.lines)if(line.has)card.append(node('p','pono387line',`${esc(line.label)}：${line.has}件中、追加${line.add}件`));
 card.append(node('p','pono387small','元の記録は削除せず、同じ内容は二重に追加しません。念のため、復元前にもこの端末のバックアップを保存してください。'));root.append(card);
 if(preview.total){card.append(button(`${preview.total}件の記録を追加する`,()=>{const result=apply(preview.updates);page(result.ok?'復元が完了しました':'復元を完了できませんでした');
  if(result.ok){message(`${preview.total}件以下の新しい記録を追加しました。同じデータは自動的に省いています。`);root.append(button('5教科のまとめに戻る',back,'primary'));}
  else message(result.restored?'端末の保存容量などの理由で取り込めませんでした。変更した項目は元に戻しました。':'保存中にエラーが発生しました。一部の項目を元に戻せなかった可能性があります。現在の記録を確認してください。',true);
 },'primary'));}
 else card.append(node('p','pono387good','すでに同じ記録が保存されています。追加は必要ありません。'));
 root.append(button('保存・復元へ戻る',open));
}
function open(){page('学習記録の保存・復元');let sum;try{sum=summary()}catch(e){return message('この端末の記録を読み取れませんでした。既存の記録は変更していません。',true)}
 const intro=node('div','card pono387intro',`<p class="tiny">Pono Learning Quest・学習者別バックアップ</p><h2>主要記録も、漢字・振り返りも</h2><p>選択中の学習者の記録だけをまとめて保存します。復元は既存の記録を残して追加します。</p><p><b>学習者：</b>${esc(student()?.name||'未設定')}　<b>対象：</b>${sum.total}件</p>`);root.append(intro);
 const c=node('div','card pono387section','<h3>① 記録を保存する</h3>');c.append(button('📥 まとめてバックアップする',download,'primary'));root.append(c);
 const breakdown=node('div','card pono387section','<h3>保存対象の内訳</h3>');for(const x of sum.list)if(x.selected.length)breakdown.append(node('p','pono387line',`${esc(x.label)}：${x.selected.length}件`));if(!sum.total)breakdown.append(node('p','','この端末には対象となる記録がまだありません。'));root.append(breakdown);
 const imp=node('div','card pono387section','<h3>② 保存した記録を復元する</h3><p>以前のv38.6で作ったファイルも読み込めます。先に同じ学習者IDを選択してください。</p>');const input=document.createElement('input');input.type='file';input.accept='.json,application/json';input.className='pono387file';input.setAttribute('aria-label','Ponoバックアップファイル');input.addEventListener('change',async()=>{const file=input.files?.[0];input.value='';await readFile(file)});imp.append(button('📂 バックアップファイルを選ぶ',()=>input.click()),input);root.append(imp);
 const note=node('div','card pono387note','<h3>🔒 保管の注意</h3><p>名前・学習履歴を含む暗号化されていないファイルです。公開したり他人に送ったりせず、安全な場所に保管してください。自動同期ではありません。</p><p>学習者IDが記録されていない古い漢字や発話記録は、別の子の記録と混ざるおそれがあるため自動的には含めません。設定や学習予定も対象外です。</p>');
 if(sum.ambiguous)note.append(node('p','pono387small',`学習者が特定できない古い補助記録：${sum.ambiguous}件（対象外）`));root.append(note,button('5教科の画面へ戻る',back));
}
// v38.7以降の漢字・発話ログは学習者IDを付け、混在を防ぐ。
try{if(typeof saveKanjiProgress==='function'){const original=saveKanjiProgress;saveKanjiProgress=function(...args){const key='ponoKanjiProgressV20',before=rows(key).length;const result=original.apply(this,args);try{const id=studentId(),current=rows(key);if(id!=null&&current.length>before){for(let i=before;i<current.length;i++)if(plain(current[i]))current[i].studentId=id;localStorage.setItem(key,JSON.stringify(current))}}catch(e){}return result;}}}catch(e){}
try{if(typeof saveSpeak239==='function'){const original=saveSpeak239;saveSpeak239=function(o){const id=studentId();return original.call(this,id!=null?{...o,studentId:id}:o)}}}catch(e){}
function inject(){const old=root.querySelector('[data-pono386-entry]');if(!old||old.dataset.pono387Entry)return;old.dataset.pono387Entry='1';old.replaceChildren(node('h3','','💾 学習記録をまとめてバックアップ'),node('p','','漢字・読解・振り返りも、学習者ごとに保存します。'));old.append(button('記録の保存・復元を開く',open,'primary'))}
let pending=false;new MutationObserver(()=>{if(pending)return;pending=true;requestAnimationFrame(()=>{pending=false;inject()})}).observe(root,{childList:true,subtree:true});inject();
window.ponoRecordsBackup387=open;
})();
