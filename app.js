
const A=document.getElementById("app"),RK="ponoV9Records",PK="ponoV9Plans",SK="ponoV9Student";
let profile=JSON.parse(localStorage.getItem(SK)||'{"id":"PONO001","name":"はるさん","grade":3}');
let records=JSON.parse(localStorage.getItem(RK)||"[]"),subject="",qi=0,S={};
const subs=["国語","算数","理科","社会","外国語活動"];
const B={
"国語":[["文の中で「なぜ」に答える部分を探す時の手がかりは？",["理由を表す言葉","文字の大きさ","ページ番号"],0,"理由を表す言葉や前後の文を確認します。"],["「森」の読みは？",["もり","かわ","そら"],0,"漢字の読みを確認します。"],["『雨が降ったので傘をさした。』理由は？",["雨が降ったから","暑いから","夜だから"],0,"理由を文から見つけます。"],["『本を読んでから感想を書いた。』後にしたことは？",["読む","感想を書く","買う"],1,"順序を確認します。"],["『プレゼントをもらい、にっこりした。』気持ちは？",["うれしい","こわい","かなしい"],0,"行動から気持ちを考えます。"]],
"算数":[["6×4は？",["20","24","28"],1,"九九はわり算の土台です。"],["12÷3は？",["3","4","6"],1,"同じ数ずつ分けます。"],["15個を5人で同じ数ずつ分けると？",["2個","3個","5個"],1,"場面をわり算に結びつけます。"],["1mは何cm？",["10","100","1000"],1,"長さの単位を確認します。"],["1/2は？",["2つに等分した1つ分","3つに等分した1つ分","全部"],0,"分数の意味を確認します。"]],
"理科":[["昆虫のあしは？",["4本","6本","8本"],1,"昆虫の体を確認します。"],["植物の育ちに大切なのは？",["光や水","石だけ","音だけ"],0,"植物の育ちを確認します。"],["磁石につきやすいのは？",["鉄","紙","木"],0,"磁石の性質です。"],["音が出る物で感じることがあるのは？",["ふるえ","色だけ","重さだけ"],0,"音と振動を結びつけます。"],["豆電球が光るには？",["回路がつながる","紙を置く","水につける"],0,"電気の通り道です。"]],
"社会":[["地図で方位を知るものは？",["方位記号","温度計","ものさしだけ"],0,"地図の基本です。"],["上が北なら右は？",["東","西","南"],0,"方位を確認します。"],["店の工夫を知るには？",["見学や聞き取り","想像だけ","何も見ない"],0,"地域調査の方法です。"],["火事の時に活動するのは？",["消防","図書館","美術館"],0,"地域の安全を守る仕組みです。"],["昔と今を比べる資料は？",["古い写真や地図","白紙","未来だけ"],0,"地域の変化を調べます。"]],
"外国語活動":[["Hello. は？",["こんにちは","さようなら","おやすみ"],0,"基本のあいさつです。"],["three は？",["2","3","4"],1,"数の表現です。"],["red は？",["赤","青","緑"],0,"色の表現です。"],["dog は？",["犬","猫","鳥"],0,"動物の表現です。"],["My name is Ken. は？",["私の名前はケンです","3歳です","犬が好きです"],0,"名前を伝える表現です。"]]};

const MATHNODES={
 g1_num:{grade:1,title:"かずのしくみ",pre:null,qs:[["8のつぎのかずは？",["7","9","10"],1],["10は、5といくつ？",["3","5","6"],1],["14と17では、どちらがおおきい？",["14","17","おなじ"],1]]},
 g1_add:{grade:1,title:"たし算・ひき算の意味",pre:"g1_num",qs:[["3+2は？",["4","5","6"],1],["7-3は？",["3","4","5"],1],["5こに2こふえると？",["6こ","7こ","8こ"],1]]},
 g2_add:{grade:2,title:"たし算・ひき算の筆算",pre:"g1_add",qs:[["23+14は？",["37","47","36"],0],["52-21は？",["31","33","41"],0],["46+27は？",["63","73","83"],1]]},
 g2_mult:{grade:2,title:"かけ算・九九",pre:"g2_add",qs:[["3×4は？",["7","12","14"],1],["6×5は？",["25","30","35"],1],["8×4は？",["24","32","36"],1]]},
 g3_mult:{grade:3,title:"かけ算の筆算",pre:"g2_mult",qs:[["23×3は？",["69","66","63"],0],["14×6は？",["74","84","94"],1],["32×4は？",["108","128","138"],1]]},
 g3_div:{grade:3,title:"わり算の意味",pre:"g3_mult",qs:[["12÷3は？",["3","4","6"],1],["20÷5は？",["4","5","10"],0],["18個を3人で同じ数ずつ分けると？",["5個","6個","9個"],1]]},
 g4_divcalc:{grade:4,title:"わり算の筆算",pre:"g3_div",qs:[["84÷4は？",["21","24","28"],0],["96÷3は？",["22","32","36"],1],["120÷6は？",["20","24","30"],0]]},
 g4_frac:{grade:4,title:"分数の意味と大きさ",pre:"g4_divcalc",qs:[["1/2と1/4では、どちらが大きい？",["1/2","1/4","同じ"],0],["4/4は？",["1","2","4"],0],["1/3を2こ集めた数は？",["1/6","2/3","3/2"],1]]},
 g5_frac:{grade:5,title:"分数のたし算・ひき算",pre:"g4_frac",qs:[["1/2+1/4は？",["2/6","3/4","1/6"],1],["3/5-1/5は？",["2/5","2/10","4/5"],0],["2÷3を分数で表すと？",["3/2","2/3","2/1"],1]]},
 g5_decimal:{grade:5,title:"小数のかけ算・わり算",pre:"g4_divcalc",qs:[["1.2×3は？",["3.6","4.2","0.36"],0],["4.8÷2は？",["2.4","24","3.4"],0],["0.5×6は？",["3","30","0.3"],0]]},
 g5_ratio:{grade:5,title:"割合",pre:"g5_decimal",qs:[["100人の20%は？",["20人","50人","80人"],0],["50の2倍は？",["25","100","52"],1],["80円の半分は？",["20円","40円","60円"],1]]},
 g6_fracmul:{grade:6,title:"分数のかけ算",pre:"g5_frac",qs:[
 ["2/3×3/4は？",["1/2","5/7","6/7"],0],
 ["3/5×10は？",["6","2","5"],0],
 ["2/3Lのジュースを、その3/4だけ飲みました。飲んだ量は？",["1/2L","5/7L","8/12L"],0],
 ["5/6×9/10は？",["3/4","14/16","45/16"],0],
 ["7/8×4/7は？",["1/2","11/15","28/8"],0],
 ["3/4mのリボンが2/3倍の長さになりました。何m？",["1/2m","5/7m","3/2m"],0],
 ["4/5×15/8は？",["3/2","19/13","60/13"],0],
 ["1より小さい正の分数をかけると、もとの正の数はどうなる？",["小さくなる","必ず大きくなる","必ず同じ"],0]
 ]},
 g6_fracdiv:{grade:6,title:"分数のわり算",pre:"g6_fracmul",qs:[["1/2÷1/4は？",["2","1/8","1"],0],["2/3÷2は？",["1/3","4/3","2/6"],0],["3/4÷1/2は？",["3/2","3/8","2/3"],0]]},
 g6_ratio:{grade:6,title:"比",pre:"g5_ratio",qs:[["2:3と同じ比は？",["4:6","4:5","6:8"],0],["6:9を簡単にすると？",["2:3","3:2","6:3"],0],["3:5で、前の数が6なら後ろは？",["8","10","12"],1]]}
,
 g1_shape:{grade:1,title:"かたち",pre:null,qs:[["まるい形に近いものは？",["ボール","本","はこ"],0],["しかくい面があるものは？",["さいころ","ボール","たまご"],0],["同じ形を見つける時に見るのは？",["形のようす","音","におい"],0]]},
 g1_compare:{grade:1,title:"長さ・かさ・広さくらべ",pre:null,qs:[["2本のえんぴつの長さをくらべる時は？",["はしをそろえる","色を見る","名前を見る"],0],["水の多さをくらべる時に見るのは？",["かさ","音","色だけ"],0],["広さをくらべる時に見るのは？",["どれだけ場所をしめるか","重さだけ","音"],0]]},
 g2_length:{grade:2,title:"長さ（cm・mm・m）",pre:"g1_compare",qs:[["1cmは何mm？",["10mm","100mm","1mm"],0],["1mは何cm？",["10cm","100cm","1000cm"],1],["25mmは？",["2cm5mm","25cm","5cm2mm"],0]]},
 g2_time:{grade:2,title:"時こくと時間",pre:null,qs:[["3時から4時までは？",["30分","1時間","2時間"],1],["1時間は何分？",["30分","60分","100分"],1],["9時30分の30分後は？",["9時","10時","10時30分"],1]]},
 g2_shape:{grade:2,title:"三角形と四角形",pre:"g1_shape",qs:[["辺が3本の形は？",["三角形","四角形","円"],0],["辺が4本の形は？",["三角形","四角形","円"],1],["正方形の辺の長さは？",["4本とも同じ","全部ちがう","辺がない"],0]]},
 g2_data:{grade:2,title:"表とグラフ",pre:null,qs:[["人数をくらべる時に便利なのは？",["表やグラフ","物語だけ","色だけ"],0],["一番多いものを探す時は？",["数をくらべる","名前だけ見る","順番だけ見る"],0],["同じ種類ごとにまとめると？",["くらべやすい","分かりにくい","数えられない"],0]]},
 g3_weight:{grade:3,title:"重さ（g・kg）",pre:"g2_length",qs:[["1kgは何g？",["100g","1000g","10g"],1],["500gを2こで？",["1kg","100g","2kg"],0],["重さをはかる道具は？",["はかり","ものさし","時計"],0]]},
 g3_time:{grade:3,title:"時こくと時間の計算",pre:"g2_time",qs:[["10時から11時30分までは？",["1時間","1時間30分","2時間"],1],["45分+30分は？",["1時間15分","75時間","45分"],0],["2時間は何分？",["60分","120分","200分"],1]]},
 g3_shape:{grade:3,title:"円と球・三角形",pre:"g2_shape",qs:[["円の中心から円周までの長さは？",["半径","直径","辺"],0],["直径は半径の？",["2倍","3倍","半分"],0],["二等辺三角形は？",["2つの辺の長さが等しい","辺が4本","角がない"],0]]},
 g3_data:{grade:3,title:"表と棒グラフ",pre:"g2_data",qs:[["棒の長さで数を表すグラフは？",["棒グラフ","円","地図"],0],["棒グラフでまず確認するものは？",["目盛り","紙の色","文字の形"],0],["資料を種類ごとにまとめるものは？",["表","作文","絵だけ"],0]]},
 g4_angle:{grade:4,title:"角の大きさ",pre:"g3_shape",qs:[["直角は何度？",["45度","90度","180度"],1],["半回転の角は？",["90度","180度","360度"],1],["角度をはかる道具は？",["分度器","定規だけ","はかり"],0]]},
 g4_area:{grade:4,title:"面積",pre:"g2_length",qs:[["長方形の面積は？",["たて×よこ","たて+よこ","たて÷よこ"],0],["1cm²は？",["1辺1cmの正方形の面積","1cmの長さ","1cmの重さ"],0],["たて3cm、よこ4cmの面積は？",["7cm²","12cm²","14cm²"],1]]},
 g4_shape:{grade:4,title:"垂直・平行と四角形",pre:"g3_shape",qs:[["2本の直線が直角に交わる関係は？",["垂直","平行","合同"],0],["どこまでのばしても交わらない2直線は？",["平行","垂直","対角線"],0],["向かい合う辺が平行な四角形は？",["平行四辺形","三角形","円"],0]]},
 g4_data:{grade:4,title:"折れ線グラフと表",pre:"g3_data",qs:[["変化のようすを見るのに適したグラフは？",["折れ線グラフ","絵だけ","地図"],0],["折れ線が上がる時は？",["値が増えている","必ず0","値が消える"],0],["二つのことを整理して見るには？",["二次元の表","文章だけ","色だけ"],0]]},
 g5_area:{grade:5,title:"三角形・四角形の面積",pre:"g4_area",qs:[["三角形の面積は？",["底辺×高さ÷2","底辺×高さ","底辺+高さ"],0],["平行四辺形の面積は？",["底辺×高さ","底辺×高さ÷2","4辺を足す"],0],["底辺6cm、高さ4cmの三角形は？",["12cm²","24cm²","10cm²"],0]]},
 g5_volume:{grade:5,title:"体積",pre:"g4_area",qs:[["直方体の体積は？",["たて×よこ×高さ","たて+よこ+高さ","たて×よこ"],0],["1cm³は？",["1辺1cmの立方体の体積","1cmの面積","1g"],0],["2×3×4cmの直方体の体積は？",["9cm³","24cm³","12cm³"],1]]},
 g5_shape:{grade:5,title:"合同・多角形",pre:"g4_shape",qs:[["形も大きさも同じ図形は？",["合同","平行","比例"],0],["五角形の辺は？",["4本","5本","6本"],1],["正多角形は？",["辺の長さと角の大きさがすべて等しい","辺が1本","角がない"],0]]},
 g5_data:{grade:5,title:"平均と帯グラフ・円グラフ",pre:"g4_data",qs:[["平均は？",["合計÷個数","合計×個数","最大だけ"],0],["全体に対する割合を見るのに便利なのは？",["帯グラフや円グラフ","ものさし","時計"],0],["10,20,30の平均は？",["10","20","30"],1]]},
 g6_area:{grade:6,title:"円の面積",pre:"g5_area",qs:[["円の面積は？",["半径×半径×円周率","直径×円周率","半径+半径"],0],["半径3cmなら式は？",["3×3×3.14","3×2","6×3.14"],0],["円の面積で使う長さは？",["半径","重さ","時間"],0]]},
 g6_volume:{grade:6,title:"角柱・円柱の体積",pre:"g5_volume",qs:[["柱体の体積の基本は？",["底面積×高さ","底面積+高さ","周りの長さ×高さ"],0],["底面積10cm²、高さ4cmなら？",["14cm³","40cm³","20cm³"],1],["円柱でも使う考えは？",["底面積×高さ","半径だけ","重さ×時間"],0]]},
 g6_scale:{grade:6,title:"拡大図と縮図",pre:"g5_shape",qs:[["形を同じ割合で大きくした図は？",["拡大図","棒グラフ","展開図"],0],["1/2の縮図で10cmは実際には？",["5cm","20cm","10cm"],1],["拡大図・縮図で対応する角は？",["等しい","必ず2倍","なくなる"],0]]},
 g6_data:{grade:6,title:"データの調べ方",pre:"g5_data",qs:[["データの中心の傾向を見る値の一つは？",["平均値","住所","色"],0],["データの散らばりを見る時は？",["値の分布を確認する","一つだけ見る","名前だけ見る"],0],["目的に合うグラフを選ぶ理由は？",["特徴を読み取りやすくする","色を増やすだけ","数字を消す"],0]]}

};
let adaptive=null;


function furiganaOn(){return localStorage.getItem("ponoFurigana")!=="off"}
function setFurigana(v){localStorage.setItem("ponoFurigana",v?"on":"off")}
function ruby(word,reading){return furiganaOn()?`<ruby>${word}<rt>${reading}</rt></ruby>`:word}
function accessibilityBox(){
 let c=e("div","access-box",`<b>読みやすさ</b><br><span class="tiny">自分に合う表示を選べます。</span>`),lab=e("label","",`<input type="checkbox" style="width:auto;margin-right:7px"> ふりがな`),ck=lab.querySelector("input");ck.checked=furiganaOn();ck.onchange=()=>{setFurigana(ck.checked);};c.append(lab);return c
}
function fractionWords(){
 return `<details class="word-help"><summary>📘 ことばの確認</summary>
 <div class="word-grid">
 <p><b>${ruby("分子","ぶんし")}</b>：分数の上の数。「いくつ分」かを表します。</p>
 <p><b>${ruby("分母","ぶんぼ")}</b>：分数の下の数。「いくつに同じ大きさで分けたか」を表します。</p>
 <p><b>${ruby("約分","やくぶん")}</b>：上と下を同じ数でわって、分数をかんたんな形にすること。</p>
 <p class="fraction-example">${fmtMath("2/4")} ＝ ${fmtMath("1/2")}</p>
 </div></details>`;
}

function fmtMath(t){
  t=String(t);
  return t.replace(/(\d+)\/(\d+)/g,'<span class="frac"><span>$1</span><span>$2</span></span>');
}
function mathEntry(nodeId){
  adaptive=adaptive||{origin:nodeId,node:nodeId,history:[],returnTo:null,qi:0,ok:0,h:0,start:Date.now(),learned:0,together:0};
  adaptive.node=nodeId;adaptive.qi=0;adaptive.ok=0;adaptive.h=0;
  let n=MATHNODES[nodeId];head(`算数｜${n.title}`,child);A.append(accessibilityBox());
  A.append(e("div","card",`<h2>どこから始める？</h2><p>説明を見てからでも、問題からでも大丈夫です。</p>`));
  A.append(btn("📖 説明からはじめる",()=>mathLearn(nodeId),"primary"));
  A.append(btn("🚀 問題からやってみる",mathQ,"soft"));
}
function mathLessonData(id,n){
 const special={
  g1_num:["数は、ものの数や順番を表します。10より大きい数も「10といくつ」と考えると分かりやすくなります。","14は「10と4」。17は「10と7」なので、17のほうが大きいです。"],
  g1_add:["たし算は「合わせる・増える」、ひき算は「残り・ちがい」を考える時に使います。","3こあって2こ増えると、3＋2＝5。7こから3ことると、7－3＝4です。"],
  g2_mult:["かけ算は「同じ数がいくつ分」をまとめて表します。","3こずつが4組なら、3×4＝12。「3かける4は12」と読みます。"],
  g3_div:["わり算は「同じ数ずつ分ける」「何人分・何組分か」を考える時に使います。","12こを3人で同じ数ずつ分けると、12÷3＝4。「12わる3は4」と読みます。"],
  g4_area:["面積は、どれくらいの広さかを数で表したものです。1cm²は、1辺が1cmの正方形1こ分の広さです。","長方形は、1cm²の正方形が「たてに何こ、よこに何こ」並ぶか考えます。だから「たて×よこ＝面積」です。"],
  g5_volume:["体積は、ものが空間をどれくらい占めるかを表します。1cm³は、1辺1cmの立方体1こ分です。","直方体は「たて×よこ×高さ＝体積」。2cm×3cm×4cmなら24cm³です。"],
  g5_frac:["分数では、下の数を分母、上の数を分子といいます。分母は何等分したか、分子はいくつ分かを表します。","1/2＋1/4では、まず分母をそろえて考えます。1/2＝2/4なので、2/4＋1/4＝3/4です。"],
  g5_ratio:["割合は「もとにする量に対して、くらべる量がどれくらいか」を表します。百分率では100%を全体と考えます。","100人の20%は、100×0.2＝20人です。「100の20パーセント」と読みます。"],
  g6_fracmul:["分数のかけ算は、基本的に分子どうし、分母どうしをかけます。計算の途中で約分できる時は整理できます。","2/3×3/4は、2×3 / 3×4。3を約分すると1/2になります。"],
  g6_fracdiv:["分数でわる時は、わる数の分子と分母を入れかえて、かけ算にして考えます。","1/2÷1/4は、1/2×4/1＝2です。"],
  g6_area:["円の面積は「半径×半径×円周率」で求めます。円周率は小学校では3.14を使うことがあります。","半径3cmなら、3×3×3.14。式を先に作ってから計算します。"]
 };
 if(special[id]) return special[id];
 let q=n.qs[0],ans=q[1][q[2]];
 return [`「${n.title}」では、ことば・単位・図や式の意味を確かめながら考えます。答えだけでなく「どうしてそうなるか」を一つずつ見ていきます。`,`たとえば「${q[0]}」は、問題で分かっていることと、求めることを確認します。答えは「${ans}」です。`]
}
function speakLesson(text){
 let u=new SpeechSynthesisUtterance(String(text).replaceAll("×","かける").replaceAll("÷","わる").replaceAll("cm²","平方センチメートル").replaceAll("cm³","立方センチメートル"));u.lang="ja-JP";u.rate=.86;speechSynthesis.cancel();speechSynthesis.speak(u)
}
function mathLearn(nodeId){
 let n=MATHNODES[nodeId];adaptive.learned=(adaptive.learned||0)+1;head(`① まなぶ｜${n.title}`,child);
 let [meaning,example]=mathLessonData(nodeId,n);
 let formula="";
 if(nodeId==="g4_area") formula="<div class='formula-card'><b>長方形の面積</b><br>たて × よこ ＝ 面積<br><span class='tiny'>「たて かける よこ ＝ めんせき」</span></div>";
 if(nodeId==="g5_volume") formula="<div class='formula-card'><b>直方体の体積</b><br>たて × よこ × 高さ ＝ 体積<br><span class='tiny'>「たて かける よこ かける たかさ ＝ たいせき」</span></div>";
 if(nodeId==="g6_area") formula="<div class='formula-card'><b>円の面積</b><br>半径 × 半径 × 円周率<br><span class='tiny'>「はんけい かける はんけい かける えんしゅうりつ」</span></div>";
 let terms=["g5_frac","g6_fracmul","g6_fracdiv"].includes(nodeId)?fractionWords():"";
 let c=e("div","card lesson",`<h2>📖 まず知っておこう</h2><p>${fmtMath(meaning)}</p>${formula}${terms}<h3>👀 具体例</h3><p>${fmtMath(example)}</p><p class="tiny">一度で覚えなくて大丈夫です。必要な時にここへ戻れます。</p>`);
 A.append(c);
 A.append(btn("🔊 説明をきく",()=>speakLesson(meaning+" "+example),"soft"));
 A.append(btn("② 一緒にやってみる",()=>mathTogether(nodeId),"primary"));
 A.append(btn("もう分かった → ③ 自分でやる",mathQ,"soft"));
}
function mathTogether(nodeId){
 adaptive.together=(adaptive.together||0)+1;let n=MATHNODES[nodeId],q=n.qs[0],ans=q[1][q[2]];head(`② 一緒に｜${n.title}`,child);
 let [,example]=mathLessonData(nodeId,n);
 A.append(e("div","card lesson",`<h2>一緒に考えてみよう</h2><p class="tiny">① 何を聞かれているか確認</p><p><b>${fmtMath(q[0])}</b></p><p class="tiny">② 使う考え方を確認</p><p>${fmtMath(example)}</p><p class="tiny">③ 答えを確認</p><p class="answer-box"><b>${fmtMath(ans)}</b></p><p>答えだけでなく、考え方を確認できたらOKです。</p>`));
 A.append(btn("🔊 一緒に読む",()=>speakLesson(q[0]+" "+example+" 答えは "+ans),"soft"));
 A.append(btn("③ 自分でやってみる",mathQ,"primary"));
 A.append(btn("← ①まなぶに戻る",()=>mathLearn(nodeId),"soft"));
}

function mathStart(){mathUnitSelect(profile.startGrade||profile.grade)}
function beginMathUnit(id){adaptive={origin:id,node:id,history:[],returnTo:null,qi:0,ok:0,h:0,start:Date.now(),learned:0,together:0};mathEntry(id)}
function mathUnitSelect(openGrade){
 head("🔢 算数｜単元をえらぶ",child);
 let intro=e("div","card",`<h2>どこからやってみる？</h2><p>今やりたい単元を自分で選べます。</p><p class="tiny">🌱 学年は目安です。前の学年を確認しても、先の学年に挑戦しても大丈夫です。つまずいた時は必要な内容に戻って、できたら元の単元へつなぎます。</p>`);
 A.append(intro);
 let by={};Object.entries(MATHNODES).forEach(([id,n])=>{(by[n.grade]??=[]).push([id,n])});
 for(let g=1;g<=6;g++){
   let d=e("details","card"); if(g===Number(openGrade))d.open=true;
   let sm=document.createElement("summary");sm.innerHTML=`<b>小学${g}年の算数</b> <span class="tiny">（${(by[g]||[]).length}単元）</span>`;d.append(sm);
   (by[g]||[]).forEach(([id,n])=>{
     let pre=n.pre&&MATHNODES[n.pre]?`<span class="tiny">前につながる学習：${MATHNODES[n.pre].title}</span>`:"<span class='tiny'>ここから始められます</span>";
     let c=e("div","unit-pick",`<b>${n.title}</b><br>${pre}`);c.onclick=()=>beginMathUnit(id);d.append(c)
   });A.append(d)
 }
 A.append(btn("← 今日の学習へ",child,"soft"));
}
function mathQuestionType(i,total){
 const labels=["🔎 理解確認","✏️ 基本","💬 文章・場面","🌟 少し応用"];
 if(total<=1)return labels[0];
 if(total===2)return labels[Math.min(i,1)];
 if(total===3)return [labels[0],labels[1],labels[2]][i]||labels[3];
 if(total===8)return labels[Math.min(3,Math.floor(i/2))];
 let pos=i/(total-1);
 return pos<.25?labels[0]:pos<.55?labels[1]:pos<.8?labels[2]:labels[3]
}
function mathErrorHint(node,q){
 let t=String(q[0]);
 if(/[こ個人本枚円cmkg時分]|どちら|同じ数ずつ|面積|体積|割合|グラフ/.test(t))
   return {kind:"問題文・場面の確認",msg:"何を聞かれているか、分かっている数と求めるものを一緒に確認してみよう。"};
 return {kind:"計算・考え方の確認",msg:"使う計算や考え方を一つ前から確認してみよう。"}
}
function mathQ(){
 let n=MATHNODES[adaptive.node],q=n.qs[adaptive.qi];head(`③ 自分で｜${n.title}`,child);
 adaptive.errorKinds=adaptive.errorKinds||{"問題文・場面の確認":0,"計算・考え方の確認":0};
 A.append(e("div","tiny",`在籍 小学${profile.grade}年｜学習開始の目安 小学${profile.startGrade||profile.grade}年`));
 A.append(e("div","question-kind",mathQuestionType(adaptive.qi,n.qs.length)));
 A.append(e("div","card",`<h2>${fmtMath(q[0])}</h2>`));
 q[1].forEach((x,i)=>{let b=btn("",()=>mathAns(i===q[2],q));b.innerHTML=fmtMath(x);A.append(b)});
 A.append(btn("💡 説明を見る",()=>mathLearn(adaptive.node),"soft"));
 A.append(btn("🌱 わからない・説明を見る",()=>{adaptive.h++;mathLearn(adaptive.node)},"soft"))
}
function mathAns(ok,q){
 if(ok){
   adaptive.ok++;new Audio("correct.wav").play().catch(()=>{});adaptive.qi++;
   if(adaptive.qi<MATHNODES[adaptive.node].qs.length){mathQ();return}mathJudge()
 }else{
   adaptive.h++;
   let eh=mathErrorHint(MATHNODES[adaptive.node],q);adaptive.errorKinds[eh.kind]=(adaptive.errorKinds[eh.kind]||0)+1;
   mathQ();A.prepend(e("div","feedback warn",`🌱 ${eh.msg}<br><span class="tiny">${eh.kind}</span>`))
 }
}
function mathJudge(){let n=MATHNODES[adaptive.node],rate=Math.round(adaptive.ok/n.qs.length*100);adaptive.history.push({node:adaptive.node,grade:n.grade,title:n.title,rate,hints:adaptive.h});if(rate<67&&n.pre){let from=adaptive.node;adaptive.returnTo=adaptive.returnTo||from;adaptive.node=n.pre;adaptive.qi=0;adaptive.ok=0;adaptive.h=0;head("🌱 必要なところを確認します",child);A.append(e("div","card",`<p><b>${n.title}</b>を進めるために、先に<b>${MATHNODES[n.pre].title}</b>を確認します。</p><p class="tiny">「学年が下がった」という表示ではなく、次につなげる確認として進めます。</p>`));A.append(btn("確認を始める",()=>mathEntry(adaptive.node),"primary"));return}
if(adaptive.returnTo&&adaptive.node!==adaptive.returnTo){let target=adaptive.returnTo;adaptive.node=target;adaptive.returnTo=null;adaptive.qi=0;adaptive.ok=0;adaptive.h=0;head("✨ 元の学習へ戻ります",child);A.append(e("div","card",`<p>必要な内容を確認できました。</p><p><b>${MATHNODES[target].title}</b>へ戻って、もう一度やってみます。</p>`));A.append(btn("元の学習へ戻る",()=>mathEntry(adaptive.node),"primary"));return}
let sec=Math.round((Date.now()-adaptive.start)/1000);let lastNode=adaptive.history.at(-1), nodeId=(lastNode&&lastNode.id)||adaptive.node||adaptive.origin, node=MATHNODES[nodeId]||MATHNODES[adaptive.origin];
let nextText=rate>=90?"少し発展へ":"定着を確認", status=rate>=90?"自力でできた":rate>=67?"練習中":"基礎を確認";
records.push({studentId:profile.id,date:new Date().toISOString(),subject:"算数",grade:node.grade,unit:node.title,content:node.title,rate,correct:lastNode&&lastNode.ok!=null?lastNode.ok:Math.round(rate*node.qs.length/100),total:node.qs.length,seconds:sec,hints:adaptive.history.reduce((a,x)=>a+x.hints,0),reads:0,unknown:0,next:nextText,status,process:"学年横断の確認ルート",explanationViews:adaptive.learned||0,togetherViews:adaptive.together||0,adaptivePath:adaptive.history,errorKinds:adaptive.errorKinds||{},questionStructure:"理解確認・基本・文章/場面"});save();head("✨ 算数の学習経過",child);let path=adaptive.history.map(x=>`${x.title}（${x.rate}%）`).join(" → ");A.append(e("div","card",`<h2>取り組めました</h2><p><b>学習の道すじ</b><br>${path}</p><p>必要な内容を確認しながら、元の学習につなげました。</p><p class="tiny">この経過は保護者・先生の記録にも残ります。</p>`));A.append(btn("🌿 今日はここまで",child,"soft"))}

function e(t,c,h){let x=document.createElement(t);if(c)x.className=c;if(h!==undefined)x.innerHTML=h;return x}
function btn(t,f,c=""){let b=e("button",c,t);b.onclick=f;return b}
function head(t,b){A.innerHTML="";let d=e("div","top");if(b)d.append(btn("← 戻る",b,"back"));d.append(e("h1","",t));A.append(d)}
function save(){localStorage.setItem(RK,JSON.stringify(records))}
function home(){head("🌱 Pono Learning Quest");A.append(e("p","sub","在籍学年を目安にスタートし、理解に合わせて必要なところを確認します。"));A.append(btn("🧒 子ども　今日の学習",child,"primary"));A.append(btn("🏠 保護者　自分の子の学び",parent));A.append(btn("📝 先生・Pono　時間割・提出用",teacher))}
function child(){head("🧒 今日の学習",home);let c=e("div","card",`<h2>${profile.name}</h2><p><b>在籍学年</b></p>`),sel=e("select");for(let g=1;g<=6;g++){let o=e("option","",`小学${g}年`);o.value=g;sel.append(o)}sel.value=profile.grade;sel.onchange=()=>{profile.grade=+sel.value;if(!profile.startGrade)profile.startGrade=profile.grade;localStorage.setItem(SK,JSON.stringify(profile));};c.append(sel);let lab=e("p","",`<b>🌱 学習を始める目安</b>`),sg=e("select");for(let g=1;g<=6;g++){let o=e("option","",`小学${g}年`);o.value=g;sg.append(o)}sg.value=profile.startGrade||profile.grade;sg.onchange=()=>{profile.startGrade=+sg.value;localStorage.setItem(SK,JSON.stringify(profile));};c.append(lab,sg,e("p","tiny","※ここは学力を表すものではありません。最初にどこから確認するかの目安で、あとからいつでも変更できます。"));A.append(c);
let plan=JSON.parse(localStorage.getItem(PK)||"{}"), days=["日","月","火","水","木","金","土"], today=days[new Date().getDay()], tp=plan[today];
if(tp&&tp.off){A.append(e("div","card soft","<h2>🌿 今日はお休み</h2><p>予定は入っていません。やりたい時は下から自由に学習できます。</p>"))}
else if(tp){let items=Array.isArray(tp.items)?tp.items:(tp.s?[{s:tp.s,u:tp.u||"おすすめ単元"}]:[]);if(items.length){let pc=e("div","card good","<h2>🌟 今日のおすすめ</h2><p class='tiny'>予定は目安です。全部やらなくても、予定より進んでも大丈夫です。</p>");items.forEach((it,i)=>pc.append(btn(`▶ ${i+1}. ${it.s}｜${it.u||"おすすめ単元"}`,()=>it.s==="算数"?mathStart():start(it.s),"primary")));A.append(pc)}}
let g=e("div","grid");subs.forEach(s=>g.append(btn(s,()=>s==="算数"?mathStart():start(s))));A.append(g)}
function start(s){subject=s;qi=0;S={ok:0,h:0,r:0,u:0,start:Date.now(),startGrade:profile.grade,route:[]};question()}
function question(){head(`${subject}｜確認`,child);let q=B[subject][qi];if(!q)return finish();A.append(e("div","tiny",`${qi+1}/${B[subject].length}　開始目安：小学${S.startGrade}年`));A.append(e("div","card",`<h2>${q[0]}</h2>`));A.append(btn("🔊 問題をきく",()=>{S.r++;let u=new SpeechSynthesisUtterance(q[0].replaceAll("÷","わる").replaceAll("×","かける"));u.lang="ja-JP";u.rate=.86;speechSynthesis.cancel();speechSynthesis.speak(u)},"soft"));q[1].forEach((x,i)=>A.append(btn(x,()=>answer(i===q[2],q[3]))));A.append(btn("💡 ヒント・説明を見る",()=>help(q[3],false),"soft"));A.append(btn("🌱 わからない・説明を見る",()=>help(q[3],true),"soft"))}
function help(x,unk){S.h++;if(unk)S.u++;document.querySelectorAll(".feedback").forEach(x=>x.remove());A.append(e("div","feedback",`<b>一緒に確認</b><br>${x}<br><span class="tiny">確認してから、もう一度挑戦して大丈夫です。</span>`))}
function answer(ok,x){if(ok){S.ok++;new Audio("correct.wav").play().catch(()=>{});A.append(e("div","feedback","✨ できた！"));setTimeout(()=>{qi++;question()},650)}else{S.h++;A.append(e("div","feedback warn",`🌱 ここを確認してみよう<br><span class="tiny">${x}</span>`))}}
function finish(){let n=B[subject].length,rate=Math.round(S.ok/n*100),sec=Math.round((Date.now()-S.start)/1000);let next=rate>=90&&S.h<=1?"現在の学年を目安に少し発展":rate>=60?"今の内容をもう一度確認":"必要な既習内容を確認してから戻る";let process=S.h? "説明・確認を使って再挑戦":"自力で取り組み";let planned=(()=>{let p=JSON.parse(localStorage.getItem(PK)||"{}"),days=["日","月","火","水","木","金","土"],x=p[days[new Date().getDay()]];if(!x||x.off)return false;let a=Array.isArray(x.items)?x.items:(x.s?[{s:x.s}]:[]);return a.some(it=>it.s===subject)})();records.push({studentId:profile.id,date:new Date().toISOString(),subject,grade:profile.grade,unit:`${subject} 基礎確認`,content:`${subject}の問題 ${n}問`,rate,correct:S.ok,total:n,hints:S.h,reads:S.r,unknown:S.u,seconds:sec,next,status:rate>=90?"自力でできた":rate>=60?"練習中":"基礎を確認",process,planned:!!planned,progress:rate>=90?"予定より先へ進める状態":rate>=60?"予定内容を定着中":"基礎確認を優先"});save();head("✨ 学習記録",child);let c=e("div","card",`<h2>取り組めました</h2><p>${subject} ${n}問</p><p>${process}</p><p><b>次：</b>${next}</p><p class="tiny">予定は目安です。その日の理解に合わせて進む・確認するを選べます。</p>`);A.append(c);if(rate>=90){A.append(btn("🚀 もう少し進む",()=>start(subject),"primary"));A.append(btn("🌿 今日はここまで",child,"soft"))}else if(rate>=60){A.append(btn("🔁 もう一度やって定着する",()=>start(subject),"primary"));A.append(btn("🌿 今日はここまで",child,"soft"))}else{A.append(btn("🌱 基礎を確認してからもう一度",()=>start(subject),"primary"));A.append(btn("🌿 今日はここまで",child,"soft"))}}
function myRecords(){return records.filter(r=>r.studentId===profile.id)}
function parent(){
 head("🏠 自分の子の学び",home);
 let all=myRecords(), now=new Date(), day=now.getDay(), diff=(day===0?6:day-1);
 let monday=new Date(now);monday.setHours(0,0,0,0);monday.setDate(now.getDate()-diff);
 let sunday=new Date(monday);sunday.setDate(monday.getDate()+6);sunday.setHours(23,59,59,999);
 let rr=all.filter(r=>{let d=new Date(r.date);return !isNaN(d)&&d>=monday&&d<=sunday});
 let last=rr.at(-1),mins=Math.round(rr.reduce((a,r)=>a+(Number(r.seconds)||0),0)/60);
 let dates=new Set(rr.map(r=>{let d=new Date(r.date);return isNaN(d)?"":d.toLocaleDateString("ja-JP",{timeZone:"Asia/Tokyo"})}).filter(Boolean));
 let subjects=[...new Set(rr.map(r=>r.subject).filter(Boolean))];
 let units=[...new Set(rr.map(r=>r.unit||r.nodeTitle||r.title).filter(Boolean))];
 let period=`${monday.getMonth()+1}/${monday.getDate()}〜${sunday.getMonth()+1}/${sunday.getDate()}`;
 A.append(e("div","card",`<h2>${profile.name}の今週</h2><p><b>${period}</b></p><span class="pill">学習 ${dates.size}日</span><span class="pill">${rr.length}回</span><span class="pill">約${mins}分</span><p>教科：${subjects.join("・")||"―"}</p>`));
 let show=btn("🏫 学校に見せる画面",()=>weeklyShare(rr,monday,sunday),"primary");A.append(show);
 let route=last&&last.adaptivePath?last.adaptivePath.map(x=>x.title).join(" → "):"";
 A.append(e("div","card",`<h2>🌱 どんなふうに学べている？</h2><p>${!last?"今週の学習記録はまだありません。":route?`必要な内容を確認しながら学習しました：${route}`:`${last.process||last.subject||"学習"} → ${last.next||"次の学習へ"}`}</p><p class="tiny">説明を見る・読み上げを使う・「わからない」と伝える・再挑戦することも、大切な学びの過程として記録します。</p>`));
 A.append(e("div","card",`<h2>今週取り組んだ内容</h2><p>${units.length?units.join("・"):"学習をすると単元がここに表示されます。"}</p>`));
 A.append(e("div","card",`<h2>できるようになってきたこと</h2><p>${growth(rr)}</p>`));
 A.append(e("div","card",`<h2>次のおすすめ</h2><p>${last&&last.next?last.next:"興味のある教科から始めます。"}</p><p class="tiny">本番では、保護者ログインに紐づく自分のお子さんの情報だけを表示します。</p>`));
}
function weeklyShare(rr,monday,sunday){
 head("🏫 今週の学び・学校共有",parent);
 let mins=Math.round(rr.reduce((a,r)=>a+(Number(r.seconds)||0),0)/60);
 let dates=new Set(rr.map(r=>{let d=new Date(r.date);return isNaN(d)?"":d.toLocaleDateString("ja-JP",{timeZone:"Asia/Tokyo"})}).filter(Boolean));
 let subjects=[...new Set(rr.map(r=>r.subject).filter(Boolean))];
 A.append(e("div","card school-share",`<h2>${profile.name}｜今週の学び</h2><p><b>${monday.getMonth()+1}月${monday.getDate()}日〜${sunday.getMonth()+1}月${sunday.getDate()}日</b></p><p>学習した日：<b>${dates.size}日</b>　学習時間：<b>約${mins}分</b></p><p>教科：${subjects.join("・")||"―"}</p><p class="tiny">保護者の方が学校で簡単に学習状況を見せるための画面です。</p>`));
 if(!rr.length){A.append(e("div","card","今週の学習記録はまだありません。"));return}
 rr.slice().reverse().forEach(r=>{
   let d=new Date(r.date),date=isNaN(d)?"日時記録なし":d.toLocaleString("ja-JP",{timeZone:"Asia/Tokyo",month:"numeric",day:"numeric",hour:"2-digit",minute:"2-digit",hour12:false});
   let unit=r.unit||r.nodeTitle||r.title||"単元名の記録なし";
   let mins2=Math.max(1,Math.round((Number(r.seconds)||0)/60));
   let status=r.status||((r.result==="ok"||r.ok===true)?"自力でできた":"練習中");
   A.append(e("div","card weekly-item",`<b>${date}　${r.subject||"学習"}｜${unit}</b><p>約${mins2}分　／　${status}</p>`));
 });
}
function growth(rr){if(!rr.length)return"これからの小さな変化をここに残していきます。";let l=rr.at(-1);if(l.rate>=90&&l.hints<=1)return`${l.subject}では、自力で確認できる内容が増えています。次は定着を確かめながら少し先へ進みます。`;if(l.hints>0)return`${l.subject}では、説明を使いながらもう一度挑戦することができています。自力でできる範囲につなげていきます。`;return`${l.subject}に取り組み、自分のペースで学習を続けています。`}
function teacher(){head("📝 先生・Pono",home);A.append(btn("📅 今週の時間割を作る",plan,"primary"));A.append(btn("👥 生徒の現在地・達成状況",()=>{head("👥 生徒の現在地",teacher);let r=myRecords(),l=r.at(-1);A.append(e("div","card",`<b>${profile.name}</b>｜在籍 小学${profile.grade}年<br><span class="pill">${!l?"未確認":l.rate>=90&&l.hints<=1?"自力でできた":l.hints?"練習中":"取り組み中"}</span><p>${l?`${l.subject}：${l.process}<br>次：${l.next}`:"記録はまだありません。"}</p>`))}));A.append(btn("📄 月間学習報告書を作る",monthlyReport,"primary"));A.append(btn("🗂️ 日々の詳細記録を見る",report));A.append(e("p","tiny","試作版はこの端末のブラウザ内保存です。本番では子ども・保護者・先生の認証と権限を分けます。"))}
function plan(){head("📅 今週の時間割",teacher);let saved=JSON.parse(localStorage.getItem(PK)||"{}"),days=["月","火","水","木","金"];
days.forEach((d,di)=>{let c=e("div","card");c.dataset.d=d;c.append(e("h2","",d+"曜日"));
let offLabel=e("label","",`<input type="checkbox" class="off" style="width:auto;margin-right:8px"> 🌿 お休みにする`);let off=offLabel.querySelector("input");off.checked=!!(saved[d]&&saved[d].off);c.append(offLabel);
let area=e("div","slots");c.append(area);
let old=saved[d], initial=old&&Array.isArray(old.items)?old.items:(old&&old.s?[{s:old.s,u:old.u||"おすすめ単元"}]:[{s:subs[di%subs.length],u:"おすすめ単元"}]);
function addSlot(v={s:"国語",u:"おすすめ単元"}){let row=e("div","soft");row.style.padding="10px";row.style.margin="8px 0";let ss=e("select");subs.forEach(x=>{let o=e("option","",x);o.value=x;ss.append(o)});ss.value=v.s||"国語";let u=e("input");u.placeholder="単元・内容";u.value=v.u||"";let del=btn("－ この予定を削除",()=>row.remove());row.append(ss,u,del);area.append(row)}
initial.forEach(addSlot);c.append(btn("＋ 科目を追加",()=>addSlot(),"soft"));off.onchange=()=>{area.style.opacity=off.checked?".35":"1";area.style.pointerEvents=off.checked?"none":"auto"};off.onchange();A.append(c)});
A.append(btn("✓ 今週の予定を保存",()=>{let p={};document.querySelectorAll("[data-d]").forEach(c=>{let d=c.dataset.d,off=c.querySelector(".off").checked;if(off){p[d]={off:true,items:[]};return}let items=[];c.querySelectorAll(".slots>div").forEach(r=>{let ss=r.querySelector("select"),u=r.querySelector("input");items.push({s:ss.value,u:u.value||"おすすめ単元"})});p[d]={off:false,items}});localStorage.setItem(PK,JSON.stringify(p));alert("今週の予定を保存しました")},"primary"))}

function monthKeyJST(v){
 let d=new Date(v); if(isNaN(d))return "";
 return new Intl.DateTimeFormat("ja-JP",{timeZone:"Asia/Tokyo",year:"numeric",month:"2-digit"}).format(d).replace("/","-");
}
function monthlyReport(selected){
 let all=myRecords(), now=new Date();
 let current=selected||new Intl.DateTimeFormat("ja-JP",{timeZone:"Asia/Tokyo",year:"numeric",month:"2-digit"}).format(now).replace("/","-");
 head("📄 月間学習報告書",teacher);
 let chooser=e("input");chooser.type="month";chooser.value=current;chooser.onchange=()=>monthlyReport(chooser.value);A.append(chooser);
 let rr=all.filter(r=>monthKeyJST(r.date)===current);
 let [yy,mm]=current.split("-"), secs=rr.reduce((a,r)=>a+(Number(r.seconds)||0),0), mins=Math.round(secs/60);
 let dates=new Set(rr.map(r=>{let d=new Date(r.date);return isNaN(d)?"":d.toLocaleDateString("ja-JP",{timeZone:"Asia/Tokyo"})}).filter(Boolean));
 let subjects=[...new Set(rr.map(r=>r.subject).filter(Boolean))];
 let units=[...new Set(rr.map(r=>r.unit||r.nodeTitle||r.title).filter(Boolean))];
 let completed=[...new Set(rr.filter(r=>r.status==="定着確認済み"||r.result==="ok"||r.ok===true).map(r=>r.unit||r.nodeTitle||r.title).filter(Boolean))];
 let practicing=[...new Set(rr.filter(r=>!(r.status==="定着確認済み"||r.result==="ok"||r.ok===true)).map(r=>r.unit||r.nodeTitle||r.title).filter(Boolean))];
 A.append(e("div","card monthly-head",`<h2>${yy}年${Number(mm)}月 学習報告書</h2><p><b>${profile.name}</b>　｜　在籍 小学${profile.grade}年</p><p>学習日数：<b>${dates.size}日</b>　取組記録：<b>${rr.length}回</b>　総学習時間：<b>約${mins}分</b></p><p>教科：${subjects.join("・")||"―"}</p>`));
 if(!rr.length){A.append(e("div","card","この月の学習記録はまだありません。"));return}
 A.append(e("div","card",`<h2>📚 今月の単元</h2><p><b>定着・終了を確認：</b>${completed.join("・")||"―"}</p><p><b>学習中：</b>${practicing.join("・")||"―"}</p><p class="tiny">過去の試作記録で単元名が保存されていないものは、この一覧には推測で追加しません。</p>`));
 let rows=rr.slice().sort((a,b)=>new Date(a.date)-new Date(b.date)).map(r=>{
   let d=new Date(r.date),date=isNaN(d)?"―":d.toLocaleDateString("ja-JP",{timeZone:"Asia/Tokyo",month:"numeric",day:"numeric"});
   let unit=r.unit||r.nodeTitle||r.title||"単元名の記録なし";
   let m=Math.max(1,Math.round((Number(r.seconds)||0)/60));
   let status=r.status||((r.result==="ok"||r.ok===true)?"自力でできた":"練習中");
   return `<tr><td>${date}</td><td>${r.subject||"学習"}</td><td>${unit}</td><td>${m}分</td><td>${status}</td></tr>`;
 }).join("");
 A.append(e("div","card tablewrap",`<h2>🗓️ 学習記録一覧</h2><table><thead><tr><th>日付</th><th>教科</th><th>単元</th><th>時間</th><th>状況</th></tr></thead><tbody>${rows}</tbody></table>`));
 let hints=rr.reduce((a,r)=>a+(Number(r.hints)||0),0), reads=rr.reduce((a,r)=>a+(Number(r.reads)||0),0), explains=rr.reduce((a,r)=>a+(Number(r.explain)||0),0);
 let draft=`${yy}年${Number(mm)}月は、${subjects.join("・")||"各教科"}の学習に${dates.size}日取り組み、合計約${mins}分の学習記録があります。`;
 if(units.length) draft+=` 主な学習単元は「${units.join("」「")}」です。`;
 draft+=` 理解状況を確認しながら、その時の理解に合わせて学習を進めています。`;
 if(hints||reads||explains) draft+=` 必要に応じて${[explains?"説明":"",hints?"ヒント":"",reads?"読み上げ":""].filter(Boolean).join("・")}を活用しました。`;
 draft+=` 今後も定着を確認しながら次の学習へつなげます。`;
 A.append(e("div","card",`<h2>✏️ 学校共有用コメント</h2><p class="tiny">学習記録から自動作成しています。Ponoで確認し、自由に編集できます。</p>`));
 let ta=e("textarea");ta.rows=8;ta.value=draft;ta.defaultValue=draft;A.append(ta);
 A.append(btn("🖨️ この月間報告書を印刷・PDF",()=>window.print(),"primary"));
 A.append(e("p","tiny","※これは学習状況を学校と共有するための報告書です。出席扱いの申請・報告書とは別です。"));
}
function jpDateTime(v){
 if(!v)return "日時記録なし";
 let d=new Date(v);
 if(isNaN(d.getTime()))return v;
 return new Intl.DateTimeFormat("ja-JP",{timeZone:"Asia/Tokyo",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit",hour12:false}).format(d);
}
function report(){
 head("📄 学校共有用・学習報告",teacher);
 let rr=myRecords().slice().reverse();
 A.append(e("div","card",`<b>${profile.name}</b>｜在籍 小学${profile.grade}年<br><span class="tiny">実際の学習記録を、日時・単元ごとに確認できます。</span>`));
 if(!rr.length){A.append(e("div","card","まだ学習記録がありません。学習するとここに自動で記録されます。"));return}
 let total=Math.round(rr.reduce((a,r)=>a+(Number(r.seconds)||0),0)/60);
 let sum=e("div","card");
 sum.innerHTML=`<h2>学習のまとめ</h2><p><b>取組 ${rr.length}回／約${total}分</b></p><p class="tiny">単元ごとの詳しい記録は下に表示されます。</p>`;
 A.append(sum);
 rr.forEach((r,i)=>{
   let dt=jpDateTime(r.date), mins=Math.max(1,Math.round((Number(r.seconds)||0)/60));
   let unit=r.unit||r.nodeTitle||r.title||"単元名の記録なし";
   let correct=(r.correct!=null?r.correct:(r.score!=null?r.score:"―"));
   let totalq=(r.total!=null?r.total:"―");
   let status=r.status||((r.result==="ok"||r.ok===true)?"自力でできた":"練習中");
   let supports=[];
   if(Number(r.explain)>0) supports.push(`説明 ${r.explain}回`);
   if(Number(r.together)>0) supports.push(`一緒に ${r.together}回`);
   if(Number(r.hints)>0) supports.push(`ヒント ${r.hints}回`);
   if(Number(r.reads)>0) supports.push(`読み上げ ${r.reads}回`);
   let c=e("div","card learning-detail");
   c.innerHTML=`<h3>${dt}</h3>
   <p><b>${r.subject||"学習"}｜${r.grade?`${r.grade}年相当｜`:""}${unit}</b></p>
   <p>学習時間：約${mins}分</p>
   <p>学習内容：${r.content||r.detail||unit}</p>
   <p>理解の記録：${totalq!=="―"?`${correct}/${totalq}`:(r.result==="ok"?"正答":"記録あり")}　／　現在：${status}</p>
   <p>学習方法：${supports.length?supports.join("・"):"自分で取り組み"}</p>
   ${r.next?`<p>次の学習：${r.next}</p>`:""}`;
   A.append(c);
 });
 let note=e("div","card generated");
 note.innerHTML="<h2>学校共有用コメント</h2><p class='tiny'>必要な場合だけ追記できます。</p>";
 let ta=e("textarea");
 let subjects=[...new Set(rr.map(r=>r.subject).filter(Boolean))].join("・")||"各教科";
 let independent=rr.filter(r=>r.result==="ok"||r.ok===true||r.status==="自力でできた").length;
 let support=rr.some(r=>Number(r.explain)>0||Number(r.together)>0||Number(r.hints)>0||Number(r.reads)>0);
 let review=rr.some(r=>String(r.next||"").includes("既習")||String(r.adaptivePath||"").includes("既習"));
 let units=[...new Set(rr.map(r=>r.unit||r.nodeTitle||r.title).filter(Boolean))].slice(0,4);
 let unitText=units.length?`主に「${units.join("」「")}」に取り組みました。`:"";
 let draft=`${subjects}の学習に取り組み、記録期間内に${rr.length}回、約${total}分の学習を行いました。${unitText}理解状況を確認しながら、${independent?`自力で取り組めた学習が${independent}回みられました。`:"現在の理解に合わせて学習を進めています。"}${support?"必要に応じて説明・ヒント・読み上げ等を活用し、確認しながら取り組んでいます。":""}${review?"必要な既習内容も確認し、現在の単元につなげています。":""}今後も定着を確認しながら次の学習へ進めます。`;
 ta.defaultValue=draft;
 ta.value=draft;
 ta.textContent=draft;
 ta.rows=8;
 ta.placeholder="";
 note.append(ta,e("p","tiny","※学習記録から自動作成した下書きです。文章をタップして自由に編集できます。"),btn("🖨️ この生徒だけ印刷 / PDF",()=>window.print(),"primary noPrint"));
 A.append(note);
}
home();
