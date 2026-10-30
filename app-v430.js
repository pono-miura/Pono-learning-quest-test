/* Pono Learning Quest v430 | 教材点検の最新版（2026-10-30）
 * 既存の学習履歴・解答・教材は変更しません。作成済みと検証済みを区別する案内です。
 */
(function(){'use strict';
const root=document.getElementById('app');if(!root)return;
const G=[
{g:1,items:[['国語','作成済み','読解・ことば・学年別補強・復習','v314/v315・v391〜394'],['算数','作成済み','単元別補強・総復習','v391〜394'],['生活科','作成済み','活動テーマ（知識テスト型ではない）','v395']]},
{g:2,items:[['国語','作成済み','読解・ことば・学年別補強・復習','v314/v315・v396〜399'],['算数','作成済み','単元別補強・総復習','v396〜399'],['生活科','作成済み','活動テーマ（知識テスト型ではない）','v395']]},
{g:3,items:[['国語','補強済み','読解・漢字・単元別練習・総復習','v400〜406・旧教材'],['算数','補強済み','学年別単元・総復習','v400〜402'],['理科','補強済み','11単元・復習','v407〜409'],['社会','補強済み','16小単元・256問','v417'],['外国語活動','補強済み','16小単元・256問','v420']]},
{g:4,items:[['国語','要点検','読解6単元・表現等3単元の旧教材あり。漢字・作文などの詳しさを確認','v314・v315・旧漢字'],['算数','補強済み','28小単元・448問（未補強の単元がないか再確認）','v423〜425'],['理科','補強済み','17基本単元と3総復習コース','v410〜413'],['社会','補強済み','20小単元・320問','v418'],['外国語活動','補強済み','18小単元・288問','v421']]},
{g:5,items:[['国語','要点検','読解5単元・表現等3単元の旧教材あり。漢字・作文などの詳しさを確認','v314・v315・旧漢字'],['算数','補強済み','40小単元・640問（総復習含む）','v426〜429'],['理科','補強済み','10基本単元と5総復習コース','v414〜416'],['社会','補強済み','20小単元・320問','v419'],['英語','補強済み','18小単元・288問','v422']]},
{g:6,items:[['国語','要精査','読解5単元・表現等3単元、ほか学年別教材の作成履歴あり','v314・v315・旧教材'],['算数','要精査','単元別・総復習の作成履歴あり','v37.7・旧教材'],['理科','要精査','単元別・総復習の作成履歴あり','v37.8・旧教材'],['社会','要精査','歴史・公民・国際分野の教材作成履歴あり','v35〜37・旧教材'],['英語','要精査','学習フローの作成履歴あり','v29.8・旧教材']]}
];
const MOD=[
['小学3年 社会','ponoSocial417Data',16],['小学4年 社会','ponoSocial418Data',20],['小学5年 社会','ponoSocial419Data',20],
['小学3年 外国語活動','ponoEnglish420Data',16],['小学4年 外国語活動','ponoEnglish421Data',18],['小学5年 英語','ponoEnglish422Data',18],
['小学4年 算数①','ponoMath423Data',8],['小学4年 算数②','ponoMath424Data',10],['小学4年 算数③','ponoMath425Data',10],
['小学5年 算数①','ponoMath426Data',10],['小学5年 算数②','ponoMath427Data',10],['小学5年 算数③','ponoMath428Data',10],['小学5年 算数④','ponoMath429Data',10]
];
const make=(t,c='',txt)=>{const x=document.createElement(t);x.className=c?c.trim().split(/\s+/).map(t=>'p430-'+t).join(' '):'';if(txt!==undefined)x.textContent=txt;return x};
function button(txt,fn,cls=''){const b=make('button','button '+cls,txt);b.type='button';b.addEventListener('click',fn);return b;}
function card(title){const x=make('section','card');x.append(make('h2','h2',title));return x;}
function close(){try{if(typeof home==='function'){home();return}if(typeof child==='function'){child();return}}catch(e){}window.location.reload();}
function display(g=4,tab='curriculum'){
 const page=make('div','page');root.replaceChildren(page);
 const head=make('div','head');head.append(button('← 戻る',close,'secondary'),make('h1','h1','教材の完成状況 v430'));page.append(head);
 const note=card('確認の範囲');note.append(make('p','','この一覧は、保存されていた教材ファイルと最新版の読み込み指定を照合したものです。教材が「作成済み」でも、全問の正確さ、教科書の全単元の網羅、公開サイトでの動作まで保証するものではありません。'));page.append(note);
 const tabs=make('div','switch');tabs.append(button('教科別の一覧',()=>display(g,'curriculum'),tab==='curriculum'?'active':''),button('ファイル確認',()=>display(g,'modules'),tab==='modules'?'active':''));page.append(tabs);
 if(tab==='modules'){
  const c=card('最近の追加教材の読み込み状態');c.append(make('p','minor','今のページで教材データが見つかるかの簡易確認です。「確認できません」は削除を意味しません。'));
  for(const [name,key,expected] of MOD){const d=window[key],count=Array.isArray(d?.units)?d.units.length:null;const row=make('div','line');row.append(make('span','',name),make('strong',count===expected?'good':'warn',count===expected?`読込済み ${count}/${expected}`:count===null?'確認できません':`件数要確認 ${count}/${expected}`));c.append(row)}
  page.append(c);
  const d=card('公開環境での確認');['① 既存の学習者を選んで開く','② 古い単元が一覧に残っているか確認','③ 新しい単元を1問解き、採点できるか確認','④ 学習記録を開いて保存結果を確認'].forEach(x=>d.append(make('p','item',x)));page.append(d);
 }else{
  const tabs2=make('div','grades');G.forEach(x=>tabs2.append(button('小'+x.g,()=>display(x.g),x.g===g?'active':'')));page.append(tabs2);
  const group=G.find(x=>x.g===g),c=card('小学'+g+'年生');
  group.items.forEach(([name,status,detail,source])=>{const row=make('div','subject');const bar=make('div','row');bar.append(make('strong','',name),make('span',status==='要点検'||status==='要精査'?'todo':'done',status));row.append(bar,make('p','',detail),make('p','source','確認元：'+source));c.append(row)});page.append(c);
  const p=card('次に補強・点検する内容');['優先① 小4・小5国語：漢字・言葉・作文の学習説明と問題を単元別に点検','優先② 小6の5教科：旧教材の単元・問題・記述採点を点検','優先③ 公開中のアプリで、全学年の教材と学習記録を実際に確認'].forEach(s=>p.append(make('p','item',s)));page.append(p);
 }
 page.append(button('最初の画面へ戻る',close,'secondary'));
 try{window.scrollTo(0,0)}catch(e){}
}
function inject(){if(root.querySelector('.p430-page'))return;
 const h=root.querySelector('.top h1');if(!h)return;
 if(!/Pono Learning Quest|今日の学習|全学年の教材を確認/.test(h.textContent||''))return;
 if(root.querySelector('.p430-entry'))return;
 const c=make('section','entry'),title=make('h3','', '📚 全学年の教材点検 v430');c.append(title,make('p','','小1〜小6の作成状況と今後の補強箇所を確認できます。'),button('教材の完成状況を開く',()=>display(4),'primary'));
 (h.closest('.top')||h).insertAdjacentElement('afterend',c);
 const olds=root.querySelectorAll('.v423-entry');olds.forEach(x=>{const t=x.querySelector('h3');if(t&&!/旧版/.test(t.textContent||''))t.textContent+='（旧版）'});
}
let queued=false;
new MutationObserver(()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;inject()})}).observe(root,{childList:true,subtree:true});inject();
window.ponoAudit430=display;
window.ponoAudit430Data={grades:G,modules:MOD};
})();
