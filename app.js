
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
 g1_num:{grade:1,title:"かずのしくみ",pre:null,qs:[
["8のつぎのかずは？",["7","9","10"],1],
["10は、5といくつ？",["3","5","6"],1],
["14と17では、どちらがおおきい？",["14","17","おなじ"],1],
["7は、3といくつに分けられる？",["2","4","5"],1],
["あめが6こあります。2こもらうと、ぜんぶでいくつ？",["4こ","8こ","10こ"],1],
["18より1小さいかずは？",["16","17","19"],1]
]},
 g1_add:{grade:1,title:"たし算・ひき算の意味",pre:"g1_num",qs:[
["3+2は？",["4","5","6"],1],
["7-3は？",["3","4","5"],1],
["5こに2こふえると？",["6こ","7こ","8こ"],1],
["9こから4ことると、のこりはいくつ？",["5こ","6こ","13こ"],0],
["赤い花が4本、白い花が3本あります。ぜんぶで？",["1本","7本","8本"],1],
["8-2とおなじ答えになるのは？",["3+3","4+3","5+2"],0]
]},
 g2_add:{grade:2,title:"たし算・ひき算の筆算",pre:"g1_add",qs:[
["23+14は？",["37","47","36"],0],
["52-21は？",["31","33","41"],0],
["46+27は？",["63","73","83"],1],
["68+25は？",["83","93","103"],1],
["90-46は？",["44","54","56"],0],
["えんぴつが38本あります。17本ふえると、ぜんぶで？",["45本","55本","65本"],1]
]},
 g2_mult:{grade:2,title:"かけ算・九九",pre:"g2_add",qs:[
["3×4は？",["7","12","14"],1],
["6×5は？",["25","30","35"],1],
["8×4は？",["24","32","36"],1],
["7×6は？",["36","42","48"],1],
["4こずつ入ったはこが5こあります。ぜんぶで？",["9こ","20こ","25こ"],1],
["3×6とおなじ答えになるのは？",["6×3","6+3","3+6"],0]
]},
 g3_mult:{grade:3,title:"かけ算の筆算",pre:"g2_mult",qs:[
["23×3は？",["66","69","79"],1],["14×4は？",["46","56","64"],1],
["32×3の計算で、まず3×2をすると？",["5","6","9"],1],
["21×4は？",["64","84","104"],1],
["1箱に24こ入ったおかしが3箱あります。全部で？",["27こ","62こ","72こ"],2],
["18×5を考えます。20×5から何をひくとよい？",["2","10","20"],1]
]},
 g3_div:{grade:3,title:"わり算の意味",pre:"g2_mult",qs:[
["12÷3は？",["3","4","6"],1],["20÷5は？",["4","5","10"],0],
["18こを3人に同じ数ずつ分けると1人分は？",["5こ","6こ","9こ"],1],
["24このクッキーを4こずつ分けると何組？",["4組","6組","8組"],1],
["7×4=28を使うと、28÷7は？",["3","4","7"],1],
["15÷4のあまりは？",["1","2","3"],2]
]},
 g4_divcalc:{grade:4,title:"わり算の筆算",pre:"g3_div",qs:[
["84÷4は？",["19","21","24"],1],["96÷3は？",["22","32","42"],1],
["125÷5は？",["15","25","35"],1],["72÷6は？",["11","12","13"],1],
["156このカードを6人に同じ数ずつ分けると1人何こ？",["24こ","26こ","36こ"],1],
["93÷4の商とあまりは？",["23あまり1","22あまり5","24あまり3"],0]
]},
 g4_frac:{grade:4,title:"分数の意味と大きさ",pre:null,qs:[
["1/2と1/4では大きいのは？",["1/2","1/4","同じ"],0],["2/4と同じ大きさは？",["1/2","1/3","2/3"],0],
["1を4等分した1つ分は？",["1/2","1/3","1/4"],2],["3/5は、1/5がいくつ分？",["2つ分","3つ分","5つ分"],1],
["1/3を2こ集めると？",["1/3","2/3","3/2"],1],
["5/4は1より？",["小さい","大きい","必ず同じ"],1]
]},
 g5_frac:{grade:5,title:"分数のたし算・ひき算",pre:"g4_frac",qs:[
["1/3+1/3は？",["1/6","2/3","2/6"],1],["3/5-1/5は？",["2/5","2/10","4/5"],0],
["1/2+1/4は？",["2/6","3/4","1/6"],1],["5/6-1/3は？",["1/2","4/3","4/6"],0],
["ジュースを1/4L飲み、さらに2/4L飲みました。全部で？",["2/4L","3/4L","3/8L"],1],
["2/3+1/6を計算する時、まず何をそろえる？",["分母","分子だけ","整数部分だけ"],0]
]},
 g5_decimal:{grade:5,title:"小数のかけ算・わり算",pre:"g4_divcalc",qs:[
["1.2×3は？",["3.6","4.2","0.36"],0],["4.8÷2は？",["2.4","2.8","24"],0],
["0.5×6は？",["0.3","3","30"],1],["7.2÷3は？",["2.4","3.4","24"],0],
["1本1.5mのリボンを4本使うと？",["5m","6m","7m"],1],
["3.6Lを4人で同じ量ずつ分けると1人分は？",["0.9L","1.1L","9L"],0]
]},
 g5_ratio:{grade:5,title:"割合",pre:"g5_decimal",qs:[
["20人のうち10人は、全体の何倍？",["0.5","2","10"],0],["100円の20%は？",["20円","50円","80円"],0],
["50人の40%は？",["10人","20人","40人"],1],["80の0.25倍は？",["20","25","32"],0],
["2000円の品物を10%引きで買う時、値引き額は？",["20円","200円","1800円"],1],
["くらべる量÷もとにする量で求めるのは？",["割合","面積","体積"],0]
]},
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
 g6_fracdiv:{grade:6,title:"分数のわり算",pre:"g6_fracmul",qs:[
["1/2÷1/4は？",["1/2","2","4"],1],["2/3÷4/5は、どんなかけ算に直す？",["2/3×5/4","2/3×4/5","3/2×5/4"],0],
["3/4÷1/2は？",["3/8","3/2","2/3"],1],["5/6÷5/3は？",["1/2","2","25/18"],0],
["3/4Lのジュースを1/8Lずつ分けると何杯？",["4杯","6杯","8杯"],1],
["分数でわる時、わる数はどうする？",["逆数にしてかける","そのままたす","分母だけ2倍"],0]
]},
 g6_ratio:{grade:6,title:"比",pre:"g5_ratio",qs:[
["2:3で、前が4なら後ろは？",["5","6","8"],1],["6:9を簡単にすると？",["2:3","3:4","6:3"],0],
["4:5で後ろが20なら前は？",["12","16","25"],1],["3:2と同じ比は？",["6:4","5:4","9:4"],0],
["赤と白を2:3で混ぜます。全部が10なら赤は？",["4","5","6"],0],
["比の値3:4は？",["3/4","4/3","7"],0]
]}
,
 g1_shape:{grade:1,title:"かたち",pre:null,qs:[
["まるい形に近いものは？",["ボール","本","はこ"],0],
["しかくい面があるものは？",["さいころ","ボール","たまご"],0],
["同じ形を見つける時に見るのは？",["形のようす","音","におい"],0],
["さんかくの形は、まっすぐなへんが何本？",["2本","3本","4本"],1],
["ころがりやすい形は？",["ボールのような形","本のような形","紙だけ"],0],
["しかくとさんかくをくらべる時に見るとよいのは？",["へんの数","色だけ","名前の長さ"],0]
]},
 g1_compare:{grade:1,title:"長さ・かさ・広さくらべ",pre:null,qs:[
["2本のえんぴつの長さをくらべる時は？",["はしをそろえる","色を見る","名前を見る"],0],
["水の多さをくらべる時に見るのは？",["かさ","音","色だけ"],0],
["広さをくらべる時に見るのは？",["どれだけ場所をしめるか","重さだけ","音"],0],
["ひもの長さをくらべる時、まっすぐにして何をそろえる？",["はし","色","太さだけ"],0],
["同じコップで水の多さをくらべるには？",["水の高さを見る","コップの名前を見る","音を聞く"],0],
["2まいの紙の広さをくらべる方法としてよいのは？",["重ねてみる","においをかぐ","文字を数える"],0]
]},
 g2_length:{grade:2,title:"長さ（cm・mm・m）",pre:"g1_compare",qs:[
["1cmは何mm？",["10mm","100mm","1mm"],0],
["1mは何cm？",["10cm","100cm","1000cm"],1],
["25mmは？",["2cm5mm","25cm","5cm2mm"],0],
["3cmは何mm？",["3mm","30mm","300mm"],1],
["1m20cmは何cm？",["120cm","102cm","20cm"],0],
["80cmのリボンに20cmつなげると？",["60cm","100cm","1000cm"],1]
]},
 g2_time:{grade:2,title:"時こくと時間",pre:null,qs:[
["3時から4時までは？",["30分","1時間","2時間"],1],
["1時間は何分？",["30分","60分","100分"],1],
["9時30分の30分後は？",["9時","10時","10時30分"],1],
["2時15分の45分後は？",["2時45分","3時","3時15分"],1],
["8時から8時40分までは？",["20分","40分","80分"],1],
["10時に始まり、1時間後に終わると何時？",["10時30分","11時","12時"],1]
]},
 g2_shape:{grade:2,title:"三角形と四角形",pre:"g1_shape",qs:[
["辺が3本の形は？",["三角形","四角形","円"],0],
["辺が4本の形は？",["三角形","四角形","円"],1],
["正方形の辺の長さは？",["4本とも同じ","全部ちがう","辺がない"],0],
["長方形の角は？",["4つとも直角","3つだけ直角","角がない"],0],
["三角形の角はいくつ？",["2つ","3つ","4つ"],1],
["四角形を見分ける手がかりは？",["辺が4本ある","丸い","辺が1本"],0]
]},
 g2_data:{grade:2,title:"表とグラフ",pre:null,qs:[
["人数をくらべる時に便利なのは？",["表やグラフ","物語だけ","色だけ"],0],
["一番多いものを探す時は？",["数をくらべる","名前だけ見る","順番だけ見る"],0],
["同じ種類ごとにまとめると？",["くらべやすい","分かりにくい","数えられない"],0],
["りんご5人、みかん8人。多いのは？",["りんご","みかん","同じ"],1],
["表を見る時、まず確かめたいのは？",["何を数えた表か","紙の色","文字の大きさだけ"],0],
["グラフの1目もりが2人なら、3目もりは？",["5人","6人","8人"],1]
]},
 g3_weight:{grade:3,title:"重さ（g・kg）",pre:"g2_length",qs:[
["1000gは？",["1kg","10kg","100kg"],0],["2kgは何g？",["200g","2000g","20000g"],1],
["500gと300gを合わせると？",["700g","800g","900g"],1],
["1kg200gは何g？",["1020g","1200g","2001g"],1],
["800gの荷物に400g加えると？",["1kg200g","1kg400g","1200kg"],0],
["はかりの1目もりが100gで、0から7目もりなら？",["70g","700g","7kg"],1]
]},
 g3_time:{grade:3,title:"時こくと時間の計算",pre:"g2_time",qs:[
["9時20分から10時までは？",["20分","40分","80分"],1],["1時間30分は何分？",["60分","90分","130分"],1],
["2時45分の30分後は？",["3時15分","3時30分","2時15分"],0],
["10時10分から11時25分までは？",["1時間5分","1時間15分","1時間25分"],1],
["午後1時から午後3時30分までは？",["2時間","2時間30分","3時間30分"],1],
["8時50分に出発し、35分かかると到着は？",["9時15分","9時25分","9時35分"],1]
]},
 g3_shape:{grade:3,title:"円と球・三角形",pre:"g2_shape",qs:[
["円の中心から円周までの長さは？",["半径","直径","辺"],0],["直径は半径の何倍？",["同じ","2倍","3倍"],1],
["半径3cmの円の直径は？",["3cm","6cm","9cm"],1],
["3つの辺の長さが同じ三角形は？",["正三角形","直角三角形","四角形"],0],
["2つの辺の長さが同じ三角形は？",["二等辺三角形","正方形","円"],0],
["球をどこから切っても、中心を通る切り口の形は？",["円","三角形","四角形"],0]
]},
 g3_data:{grade:3,title:"表と棒グラフ",pre:"g2_data",qs:[
["棒グラフは何をくらべるのに便利？",["数量","におい","音"],0],["1目もりが5人で4目もりなら？",["9人","20人","25人"],1],
["Aが15人、Bが25人。差は？",["10人","20人","40人"],0],
["表で合計を出す時は？",["それぞれの数をたす","一番多い数だけ見る","名前を数える"],0],
["棒グラフで一番長い棒は何を表す？",["数量が一番多い","数量が一番少ない","必ず0"],0],
["月曜12人、火曜18人、水曜15人。最も多い日は？",["月曜","火曜","水曜"],1]
]},
 g4_angle:{grade:4,title:"角の大きさ",pre:"g3_shape",qs:[
["直角は何度？",["45度","90度","180度"],1],["半回転の角は？",["90度","180度","360度"],1],
["1回転は？",["180度","270度","360度"],2],["60度と30度を合わせると？",["80度","90度","100度"],1],
["120度は直角より？",["小さい","大きい","同じ"],1],
["180度から45度をひくと？",["125度","135度","145度"],1]
]},
 g4_area:{grade:4,title:"面積",pre:"g2_length",qs:[
["たて3cm、よこ5cmの長方形の面積は？",["8平方cm","15平方cm","16平方cm"],1],
["一辺4cmの正方形の面積は？",["8平方cm","16平方cm","20平方cm"],1],
["長方形の面積の公式は？",["たて+よこ","たて×よこ","たて÷よこ"],1],
["たて6cm、よこ2cmなら？",["8平方cm","12平方cm","16平方cm"],1],
["面積24平方cm、たて4cmの長方形。よこは？",["5cm","6cm","8cm"],1],
["1平方mは何平方cm？",["100平方cm","1000平方cm","10000平方cm"],2]
]},
 g4_shape:{grade:4,title:"垂直・平行と四角形",pre:"g3_shape",qs:[
["2本の直線が直角に交わる関係は？",["平行","垂直","対角線"],1],
["どこまでのばしても交わらない2直線は？",["平行","垂直","半径"],0],
["向かい合う2組の辺が平行な四角形は？",["平行四辺形","三角形","円"],0],
["4つの辺の長さがすべて同じ四角形は？",["ひし形","台形","長方形だけ"],0],
["台形の特徴は？",["1組の向かい合う辺が平行","辺が3本","すべての角が必ず直角"],0],
["四角形の向かい合う頂点を結ぶ線は？",["半径","対角線","直径"],1]
]},
 g4_data:{grade:4,title:"折れ線グラフと表",pre:"g3_data",qs:[
["折れ線グラフは何の変化を見るのに便利？",["時間による数量の変化","形の名前","におい"],0],
["月曜10、火曜15なら増えた数は？",["5","10","25"],0],
["グラフが右上がりなら、数量はおおむね？",["増えている","減っている","必ず同じ"],0],
["20から12に変わった時、いくつ減った？",["8","12","32"],0],
["気温の1日の変化を表すのに向くのは？",["折れ線グラフ","絵だけ","文章だけ"],0],
["表の合計が50で、Aが18、Bが12なら残りは？",["20","30","40"],0]
]},
 g5_area:{grade:5,title:"三角形・四角形の面積",pre:"g4_area",qs:[
["底辺6cm、高さ4cmの三角形の面積は？",["10平方cm","12平方cm","24平方cm"],1],
["三角形の面積の公式は？",["底辺×高さ÷2","底辺×高さ","底辺+高さ"],0],
["底辺8cm、高さ5cmの平行四辺形の面積は？",["20平方cm","40平方cm","80平方cm"],1],
["平行四辺形の面積の公式は？",["底辺×高さ","底辺×高さ÷2","底辺+高さ"],0],
["面積18平方cm、高さ6cmの平行四辺形。底辺は？",["3cm","6cm","12cm"],0],
["同じ底辺と高さの三角形と平行四辺形。三角形の面積は平行四辺形の？",["半分","2倍","同じ"],0]
]},
 g5_volume:{grade:5,title:"体積",pre:"g4_area",qs:[
["たて2cm、よこ3cm、高さ4cmの直方体の体積は？",["9立方cm","24立方cm","48立方cm"],1],
["一辺3cmの立方体の体積は？",["9立方cm","18立方cm","27立方cm"],2],
["直方体の体積の公式は？",["たて×よこ×高さ","たて+よこ+高さ","たて×よこ"],0],
["1立方mは何立方cm？",["10000","100000","1000000"],2],
["底面が4cm×5cm、高さ3cmの直方体は？",["20立方cm","60立方cm","120立方cm"],1],
["体積60立方cm、底面積20平方cmなら高さは？",["2cm","3cm","4cm"],1]
]},
 g5_shape:{grade:5,title:"合同・多角形",pre:"g4_shape",qs:[
["形も大きさも同じ図形を？",["合同","平行","対称だけ"],0],["五角形の辺は何本？",["4本","5本","6本"],1],
["六角形の頂点は？",["5こ","6こ","8こ"],1],["合同な図形で対応する辺の長さは？",["同じ","必ず2倍","関係ない"],0],
["正六角形の6つの辺の長さは？",["すべて同じ","全部ちがう","3本だけ同じ"],0],
["合同な2つの三角形で対応する角の大きさは？",["同じ","必ず半分","分からない"],0]
]},
 g5_data:{grade:5,title:"平均と帯グラフ・円グラフ",pre:"g4_data",qs:[
["10,20,30の平均は？",["15","20","30"],1],["平均は、合計を何でわる？",["個数","最大値","最小値"],0],
["4人の合計が80なら平均は？",["20","40","76"],0],["円グラフ全体は何%？",["50%","100%","360%"],1],
["帯グラフは何を見るのに便利？",["割合の内訳","立体の体積","角度だけ"],0],
["全体200人の25%は？",["25人","50人","75人"],1]
]},
 g6_area:{grade:6,title:"円の面積",pre:"g5_area",qs:[
["半径2cmの円の面積は？（円周率3.14）",["6.28平方cm","12.56平方cm","25.12平方cm"],1],
["円の面積の公式は？",["半径×半径×3.14","直径×3.14","半径×2"],0],
["半径5cmなら？",["31.4平方cm","78.5平方cm","157平方cm"],1],
["直径8cmの円の半径は？",["2cm","4cm","8cm"],1],
["半径3cmの円の面積は？",["18.84平方cm","28.26平方cm","56.52平方cm"],1],
["円の半径が2倍になると面積は？",["2倍","4倍","8倍"],1]
]},
 g6_volume:{grade:6,title:"角柱・円柱の体積",pre:"g5_volume",qs:[
["底面積12平方cm、高さ5cmの角柱の体積は？",["17立方cm","60立方cm","120立方cm"],1],
["角柱の体積の公式は？",["底面積×高さ","底面積+高さ","底面積÷高さ"],0],
["底面積20平方cm、高さ4cmなら？",["24立方cm","80立方cm","100立方cm"],1],
["円柱の体積も何を使う？",["底面積×高さ","半径+高さ","直径だけ"],0],
["半径2cmの円を底面、高さ3cmの円柱。底面積は？",["6.28平方cm","12.56平方cm","25.12平方cm"],1],
["その円柱の体積は？",["12.56立方cm","37.68立方cm","75.36立方cm"],1]
]},
 g6_scale:{grade:6,title:"拡大図と縮図",pre:"g6_ratio",qs:[
["2倍の拡大図では、長さ3cmは？",["1.5cm","5cm","6cm"],2],["1/2の縮図では、8cmは？",["4cm","8cm","16cm"],0],
["拡大図で対応する角の大きさは？",["同じ","2倍","半分"],0],["3倍の拡大図で2cmは？",["5cm","6cm","9cm"],1],
["縮尺1:100で図の2cmは実際には？",["20cm","200cm","2000cm"],1],
["拡大・縮小で変わらないものは？",["対応する角の大きさ","辺の長さ","面積"],0]
]},
 g6_data:{grade:6,title:"データの調べ方",pre:"g5_data",qs:[
["2,4,6,8の平均は？",["4","5","6"],1],["データを小さい順に並べた時の中央の値は？",["平均値","中央値","最大値"],1],
["1,2,2,3,9で最も多く出る値は？",["1","2","9"],1],["データの最大値と最小値の差は？",["範囲","平均","割合"],0],
["10,12,12,14,17の中央値は？",["12","13","14"],0],
["平均だけでなく散らばりも見る理由は？",["データの特徴をより詳しく見るため","必ず答えを大きくするため","単位をなくすため"],0]
]}

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
function mathLessonDataBase(id,n){
 const special={
  g1_num:["数は、ものの数や順番を表します。10より大きい数も「10といくつ」と考えると分かりやすくなります。","14は「10と4」。17は「10と7」なので、17のほうが大きいです。"],
  g1_add:["たし算は「合わせる・増える」、ひき算は「残り・ちがい」を考える時に使います。","3こあって2こ増えると、3＋2＝5。7こから3ことると、7－3＝4です。"],
  g2_mult:["かけ算は「同じ数がいくつ分」をまとめて表します。","3こずつが4組なら、3×4＝12。「3かける4は12」と読みます。"],
  g3_div:["わり算は「同じ数ずつ分ける」「何人分・何組分か」を考える時に使います。","12こを3人で同じ数ずつ分けると、12÷3＝4。「12わる3は4」と読みます。"],
  g4_area:["面積は、どれくらいの広さかを数で表したものです。1cm²は、1辺が1cmの正方形1こ分の広さです。","長方形は、1cm²の正方形が「たてに何こ、よこに何こ」並ぶか考えます。だから「たて×よこ＝面積」です。"],
  g5_volume:["体積は、ものが空間をどれくらい占めるかを表します。1cm³は、1辺1cmの立方体1こ分です。","直方体は「たて×よこ×高さ＝体積」。2cm×3cm×4cmなら24cm³です。"],
  g5_frac:["分数では、下の数を分母、上の数を分子といいます。分母は何等分したか、分子はいくつ分かを表します。","1/2＋1/4では、まず分母をそろえて考えます。1/2＝2/4なので、2/4＋1/4＝3/4です。"],
  g5_ratio:["割合は「もとにする量に対して、くらべる量がどれくらいか」を表します。百分率では100%を全体と考えます。","100人の20%は、100×0.2＝20人です。「100の20パーセント」と読みます。"],
  g6_fracmul:["分数のかけ算は、分子どうし、分母どうしをかけて考えます。分子と分母に同じ数がある時は、同じ数でわって約分できます。","2/3×3/4を考えます。分子どうし、分母どうしをかけます。分子と分母に同じ3があるので、3で約分します。答えは1/2です。下の途中式で確かめてみよう。"],
  g6_fracdiv:["分数でわる時は、わる数の分子と分母を入れかえて、かけ算にして考えます。","1/2÷1/4は、1/2×4/1＝2です。"],
  g6_area:["円の面積は「半径×半径×円周率」で求めます。円周率は小学校では3.14を使うことがあります。","半径3cmなら、3×3×3.14。式を先に作ってから計算します。"]
 };
 if(special[id]) return special[id];
 let q=n.qs[0],ans=q[1][q[2]];
 return [`「${n.title}」では、ことば・単位・図や式の意味を確かめながら考えます。答えだけでなく「どうしてそうなるか」を一つずつ見ていきます。`,`たとえば「${q[0]}」は、問題で分かっていることと、求めることを確認します。答えは「${ans}」です。`]
}

function mathLessonData(node){
 const moreLessons={
  g1_compare:["長さ・かさ・広さは、くらべたいものを同じ基準で見ると分かりやすくなります。長さは端をそろえる、かさは同じ入れ物に入れる、広さは同じ大きさのますで考えます。","2本のえんぴつの長さをくらべるときは、はしをそろえてならべると、どちらが長いか分かります。"],
  g2_add:["たし算・ひき算の筆算は、位をそろえて書き、一の位から順に計算します。10になったら十の位へ1くり上げ、ひけないときは上の位から1くり下げます。","27+15では、一の位の7+5=12。2を書いて十の位へ1くり上げ、2+1+1=4なので42です。"],
  g2_time:["時こくは『何時何分』というその時点、時間は『どれだけの長さ』を表します。1時間は60分です。","9時から10時までは1時間です。9時30分から10時までは30分です。"],
  g2_shape:["三角形は3本の直線で囲まれた形、四角形は4本の直線で囲まれた形です。辺や頂点の数に注目して見分けます。","三角形には辺が3本、頂点が3こあります。四角形には辺が4本、頂点が4こあります。"],
  g2_data:["表は、集めた数を分かりやすく整理したものです。グラフにすると、どれが多いか少ないかを見つけやすくなります。","好きなくだものを人数で表にまとめ、その数だけグラフをのばすと、いちばん多いものが見つけやすくなります。"],
  g3_mult:["かけ算の筆算は、位をそろえて一の位から順にかけます。答えが10以上になったら、上の位へくり上げます。","23×3では、3×3=9、2×3=6なので69です。"],
  g3_time:["時間の計算では、1時間=60分を使います。時こくと時間を区別し、何分たったか、何時になるかを考えます。","9時40分から10時10分までは、9時40分から10時まで20分、さらに10分なので30分です。"],
  g3_shape:["円は、中心から同じ長さのところを結んだ形です。中心から円のまわりまでを半径、中心を通って円の端から端までを直径といいます。球にも中心や半径があります。","半径が3cmの円では、直径は半径の2倍なので6cmです。"],
  g3_data:["棒グラフは、数量の大きさを棒の長さで表したものです。目盛りがいくつを表すかを確認してから読み取ります。","1目盛りが2人なら、棒が5目盛りのところまであると10人を表します。"],
  g4_frac:["分数は、1を同じ大きさに分けたうちのいくつ分かを表します。分母は何等分したか、分子はいくつ分かを表します。","3/4は、1を4等分したうちの3つ分です。同じ分母なら、分子が大きいほうが大きな分数です。"],
  g4_shape:["2本の直線が直角に交わるとき垂直といい、どこまでのばしても交わらない2本の直線を平行といいます。四角形は辺の平行や長さ、角に注目して仲間分けできます。","長方形では向かい合う辺が平行で、4つの角はすべて直角です。"],
  g4_data:["折れ線グラフは、時間とともに変わる量などを点で表し、その点を線で結んだグラフです。線の上がり下がりから変化の様子を読み取ります。","気温の折れ線が前の時刻より上がっていれば気温が上がり、下がっていれば気温が下がったことを表します。"]
 };
 if(moreLessons[node]) return moreLessons[node];

 const fullLessons={
  g5_frac:["分母がちがう分数をたしたりひいたりするときは、まず分母を同じ数にそろえます。これを通分といいます。分母が同じになったら、分子をたしたりひいたりします。","1/2+1/4では、1/2を2/4と考えます。すると2/4+1/4=3/4です。"],
  g5_decimal:["小数のかけ算は、まず整数のように計算し、最後に小数点の位置を考えます。小数のわり算では、わる数が整数になるように小数点を同じだけ動かして考えます。","1.2×3は3.6です。4.8÷2は2.4です。"],
  g5_ratio:["割合は、もとにする量を1と見たとき、くらべる量がどれくらいにあたるかを表します。割合＝くらべる量÷もとにする量 で求めます。1は100%です。","20人のうち10人なら、10÷20=0.5です。0.5は50%です。"],
  g5_area:["三角形の面積は 底辺×高さ÷2、平行四辺形の面積は 底辺×高さ で求めます。高さは底辺に垂直な長さです。","底辺6cm、高さ4cmの三角形なら、6×4÷2=12平方cmです。"],
  g5_volume:["体積は立体がどれくらいの空間をしめるかを表します。直方体は たて×よこ×高さ、立方体は 一辺×一辺×一辺 で求めます。","たて2cm、よこ3cm、高さ4cmなら、2×3×4=24立方cmです。"],
  g5_shape:["形も大きさも同じ図形を合同といいます。合同な図形では、対応する辺の長さと対応する角の大きさがそれぞれ同じです。","合同な2つの三角形では、重ねたときにぴったり合う辺や角を、対応する辺・角として見つけます。"],
  g5_data:["平均は、いくつかの量を同じ大きさにならしたと考えた値です。合計÷個数で求めます。帯グラフや円グラフは全体に対する割合を見るのに便利です。","10、20、30の平均は、合計60を3でわって20です。円グラフ全体は100%です。"],
  g6_fracmul:["分数のかけ算は、分子どうし、分母どうしをかけます。途中で分子と分母を同じ数でわって簡単にできるときは、先に約分すると計算しやすくなります。","2/3×3/4では、分子は2×3、分母は3×4です。上と下の3を約分すると1/2になります。"],
  g6_fracdiv:["分数でわる計算は、わる数の分子と分母を入れかえた逆数を使います。わり算を、逆数をかける計算に直します。","1/2÷1/4は、1/2×4/1に直します。答えは2です。"],
  g6_ratio:["比は2つの量の割合を a:b の形で表したものです。両方の数を同じ数でかけたり、同じ数でわったりしても比は同じです。","6:9は両方を3でわると2:3になります。3:4の比の値は3/4です。"],
  g6_area:["円の面積は 半径×半径×円周率 で求めます。円周率を3.14として計算します。直径が分かっているときは、まず半分にして半径を求めます。","半径2cmなら、2×2×3.14=12.56平方cmです。"],
  g6_volume:["角柱や円柱の体積は 底面積×高さ で求めます。まず底面の面積を求め、それが高さの分だけ積み重なっていると考えます。","底面積12平方cm、高さ5cmなら、12×5=60立方cmです。"],
  g6_scale:["拡大図は形を同じ割合で大きくした図、縮図は同じ割合で小さくした図です。対応する角の大きさは変わらず、辺の長さは同じ割合で変わります。","2倍の拡大図では3cmの辺は6cmです。1/2の縮図では8cmの辺は4cmです。"],
  g6_data:["データを見るときは、平均値だけでなく中央値、最頻値、範囲なども使います。中央値は中央の値、最頻値は最も多く出る値、範囲は最大値と最小値の差です。","1、2、2、3、9では、中央値は2、最頻値も2、範囲は8です。"]
 };
 if(fullLessons[node]) return fullLessons[node];

 const rich={
  g1_add:{
   title:"たし算の意味",
   learn:"たし算は、ものが増えたり、2つの集まりを合わせたりするときに使います。『ぜんぶでいくつ』を考えます。",
   together:"りんごが2こあります。3こ増えました。2＋3と考えます。2から3つ進むと5なので、答えは5こです。"
  },
  g1_shape:{
   title:"かたち",
   learn:"まる・さんかく・しかくなど、形にはそれぞれ特徴があります。辺の数や、角の形に注目して見てみよう。",
   together:"三角の形は、まっすぐな辺が3本あります。辺を1本ずつ指でたどって確かめると分かりやすいです。"
  },
  g2_mult:{
   title:"かけ算・九九",
   learn:"同じ数ずつのまとまりがいくつかあるとき、かけ算で表せます。『1つ分の数 × いくつ分』で考えます。",
   together:"3こずつ入った袋が4つなら、3＋3＋3＋3です。これは3×4と表し、答えは12です。"
  },
  g2_length:{
   title:"長さ",
   learn:"長さは、センチメートルやミリメートルなどの単位を使って表します。1センチメートルは10ミリメートルです。",
   together:"3センチメートル5ミリメートルは、30ミリメートルと5ミリメートルを合わせて35ミリメートルです。"
  },
  g3_div:{
   title:"わり算の意味",
   learn:"わり算は、同じ数ずつ分けるときや、いくつ分になるかを考えるときに使います。",
   together:"12このあめを3人に同じ数ずつ分けます。12÷3と考え、1人分は4こです。"
  },
  g3_weight:{
   title:"重さ",
   learn:"重さはグラムやキログラムで表します。1000グラムは1キログラムです。はかりの目盛りも確認しよう。",
   together:"1キログラムと200グラムは、1000グラム＋200グラムなので1200グラムです。"
  },
  g4_divcalc:{
   title:"わり算の計算",
   learn:"大きな数のわり算も、何十・何百のまとまりを意識すると考えやすくなります。あまりがあるときは、わる数より小さくなります。",
   together:"84÷4を考えます。80÷4＝20、4÷4＝1なので、20＋1＝21です。"
  },
  g4_angle:{
   title:"角",
   learn:"角の大きさは度で表します。直角は90度です。角度は辺の長さではなく、2本の辺の開き方で決まります。",
   together:"直角が2つ分の開きは180度です。直角を基準にすると角の大きさを考えやすくなります。"
  },
  g4_area:{
   title:"面積",
   learn:"面積は、広さを数で表したものです。長方形の面積は『たて × よこ ＝ 面積』で求めます。",
   together:"たて3センチメートル、よこ5センチメートルなら、3×5＝15。面積は15平方センチメートルです。"
  },
  g5_frac:{
   title:"分数の意味と計算",
   learn:"分数では、下の数を分母、上の数を分子といいます。同じ大きさの分数や、約分・通分を使って計算を考えます。",
   together:"2/4は、分子と分母を同じ2でわると1/2になります。大きさは変わりません。"
  },
  g5_volume:{
   title:"体積",
   learn:"体積は、ものが占める空間の大きさです。直方体の体積は『たて × よこ × 高さ ＝ 体積』で求めます。",
   together:"たて2センチメートル、よこ3センチメートル、高さ4センチメートルなら、2×3×4＝24立方センチメートルです。"
  },
  g6_fracmul:{
   title:"分数のかけ算",
   learn:"分数のかけ算は、基本的に分子どうし、分母どうしをかけます。計算の途中で約分できるときは、先に整理すると計算しやすくなります。",
   together:"2/3×3/4を考えます。分子と分母に同じ3があるので約分できます。整理すると答えは1/2です。"
  },
  g6_area:{
   title:"円の面積",
   learn:"円の面積は『半径 × 半径 × 3.14 ＝ 円の面積』で求めます。半径は、円の中心から円周までの長さです。",
   together:"半径2センチメートルの円なら、2×2×3.14＝12.56。面積は12.56平方センチメートルです。"
  },
  g6_volume:{
   title:"角柱・円柱の体積",
   learn:"角柱や円柱の体積は『底面積 × 高さ ＝ 体積』で考えます。まず底面の面積を求めることがポイントです。",
   together:"底面積が12平方センチメートル、高さが5センチメートルなら、12×5＝60立方センチメートルです。"
  },
  g6_scale:{
   title:"比・拡大と縮小",
   learn:"比は、2つの数量の関係を表します。拡大・縮小では、対応する長さが同じ割合で変わることに注目します。",
   together:"2対3の比で、前の数が4になったなら2倍です。後ろの数も2倍にして6になります。"
  }
 };
 if(rich[node]){
   const x=rich[node];
   return [x.learn,x.together];
 }
 return mathLessonDataBase(node);
}

function mathSpeechText(text){
 let t=String(text);
 t=t.replaceAll("時刻","じこく").replaceAll("時こく","じこく");

 // 数字を日本語の読みへ。TTSが「2分」を「にふん」と読むのを避けるため、
 // 分数は「にぶんのいち」のようなひらがなへ先に変換する。
 const nums={
   "0":"れい","1":"いち","2":"に","3":"さん","4":"よん","5":"ご",
   "6":"ろく","7":"なな","8":"はち","9":"きゅう","10":"じゅう"
 };
 function nread(x){ return nums[String(x)] || String(x); }

 t=t.replace(/(\d+)\s*\/\s*(\d+)/g,(m,num,den)=>{
   return `${nread(den)}ぶんの${nread(num)}`;
 });

 // 万一 / が残った場合も「スラッシュ」と発音させない。
 t=t.replace(/\s*\/\s*/g," ぶんの ");

 return t
   .replaceAll("×"," かける ")
   .replaceAll("÷"," わる ")
   .replaceAll("＝"," イコール ")
   .replaceAll("="," イコール ")
   .replaceAll("cm²","へいほうセンチメートル")
   .replaceAll("cm³","りっぽうセンチメートル")
   .replaceAll("cm","センチメートル")
   .replaceAll("kg","キログラム")
   .replaceAll("g","グラム")
   .replaceAll("L","リットル");
}
function speakLesson(text){
 let u=new SpeechSynthesisUtterance(mathSpeechText(text));
 u.lang="ja-JP";u.rate=.86;speechSynthesis.cancel();speechSynthesis.speak(u)
}
function mathLearn(nodeId){
 let n=MATHNODES[nodeId];
 adaptive.node=nodeId;
 adaptive.learned=(adaptive.learned||0)+1;
 head(`① まなぶ｜${n.title}`,child);

 let lesson=mathLessonData(nodeId,n);
 let meaning=lesson[0], example=lesson[1];

 let formula="";
 if(nodeId==="g4_area") formula="<div class='formula-card'><b>長方形の面積</b><br>たて × よこ ＝ 面積<br><span class='tiny'>「たて かける よこ ＝ めんせき」</span></div>";
 if(nodeId==="g5_volume") formula="<div class='formula-card'><b>直方体の体積</b><br>たて × よこ × 高さ ＝ 体積<br><span class='tiny'>「たて かける よこ かける たかさ ＝ たいせき」</span></div>";
 if(nodeId==="g6_area") formula="<div class='formula-card'><b>円の面積</b><br>半径 × 半径 × 円周率<br><span class='tiny'>「はんけい かける はんけい かける えんしゅうりつ」</span></div>";

 let terms=["g5_frac","g6_fracmul","g6_fracdiv"].includes(nodeId)?fractionWords():"";
 let fractionCalc="";
 if(nodeId==="g6_fracmul") fractionCalc=`<div class="formula-card fraction-steps"><b>約分しながら考える例</b>
 <div class="math-step">${fmtMath("2/3")} × ${fmtMath("3/4")}</div>
 <div class="step-arrow">↓ 分子どうし・分母どうしをかける</div>
 <div class="math-step"><span class="frac"><span class="top">2 × <span class="cancel">3</span></span><span class="bottom"><span class="cancel">3</span> × 4</span></span></div>
 <div class="step-arrow">↓ 上と下の3を、同じ3でわって約分</div>
 <div class="math-step"><span class="frac"><span class="top">2 × 1</span><span class="bottom">1 × 4</span></span></div>
 <div class="step-arrow">↓</div><div class="math-step">${fmtMath("1/2")}</div></div>`;

 let intro=e("div","card",`<h2>自分に合う方法で確認しよう</h2><p class="tiny">読んでも、聞いても、両方使っても大丈夫です。</p>`);
 A.append(intro);

 let readArea=e("div","card lesson",`<h2>📖 説明</h2><p>${fmtMath(meaning)}</p>${formula}${terms}${fractionCalc}<h3>👀 具体例</h3><p>${fmtMath(example)}</p><p class="tiny">一度で覚えなくて大丈夫。必要な時にまた戻れます。</p>`);
 readArea.style.display="none";

 A.append(btn("📖 説明を読む",()=>{
   readArea.style.display=(readArea.style.display==="none")?"block":"none";
 },"primary"));
 A.append(btn("🔊 説明を聞く",()=>speakLesson(meaning+" "+example),"soft"));
 A.append(readArea);
 A.append(btn("➡️ ② 一緒にやってみる",()=>mathTogether(nodeId),"primary"));
 A.append(btn("もう分かった → ③ 自分でやる",()=>{adaptive.node=nodeId;mathQ();},"soft"));
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
function retentionDue(){
 const now=Date.now(), minAge=2*24*60*60*1000, maxAge=14*24*60*60*1000;
 let candidates=records.filter(r=>r.studentId===profile.id&&r.subject==="算数"&&r.unit&&r.rate>=90&&r.status!=="定着確認済み"&&now-new Date(r.date).getTime()>=minAge&&now-new Date(r.date).getTime()<=maxAge);
 return candidates.sort((a,b)=>new Date(a.date)-new Date(b.date))[0]||null
}
let retention=null;
function startRetention(r){
 let entry=Object.entries(MATHNODES).find(([id,n])=>n.title===r.unit);if(!entry)return mathStart();
 let [id,n]=entry, picks=n.qs.length>=3?[n.qs[0],n.qs[Math.floor(n.qs.length/2)],n.qs[n.qs.length-1]]:n.qs.slice();
 retention={sourceDate:r.date,node:id,unit:n.title,grade:n.grade,qs:picks,qi:0,ok:0,start:Date.now()};retentionQ()
}
function retentionQ(){
 let q=retention.qs[retention.qi];head(`🔁 定着確認｜${retention.unit}`,child);
 A.append(e("div","card good",`<h2>少し時間をあけて確認</h2><p>前に学んだことを、もう一度だけ確かめてみよう。</p><p class="tiny">全部覚えていなくても大丈夫です。今の状態を確認するための3問です。</p>`));
 A.append(e("div","tiny",`${retention.qi+1}/${retention.qs.length}`));A.append(e("div","card",`<h2>${fmtMath(q[0])}</h2>`));
 q[1].forEach((x,i)=>{let b=btn("",()=>retentionAns(i===q[2]));b.innerHTML=fmtMath(x);A.append(b)});
 A.append(btn("🌱 今はわからない",()=>retentionAns(false),"soft"))
}
function retentionAns(ok){
 if(ok){retention.ok++;new Audio("correct.wav").play().catch(()=>{})}
 retention.qi++;if(retention.qi<retention.qs.length){retentionQ();return}
 let rate=Math.round(retention.ok/retention.qs.length*100),sec=Math.round((Date.now()-retention.start)/1000),passed=rate>=67;
 if(passed){
   records.filter(r=>r.studentId===profile.id&&r.subject==="算数"&&r.unit===retention.unit&&r.date===retention.sourceDate).forEach(r=>r.status="定着確認済み")
 }
 records.push({studentId:profile.id,date:new Date().toISOString(),subject:"算数",grade:retention.grade,unit:retention.unit,content:"後日の定着確認",rate,correct:retention.ok,total:retention.qs.length,seconds:sec,hints:0,reads:0,unknown:0,next:passed?"次の学習へ":"もう一度確認",status:passed?"定着確認済み":"定着をもう一度確認",process:"時間をあけた再確認",retention:true,sourceDate:retention.sourceDate});save();
 head("🔁 定着確認の記録",child);A.append(e("div","card",`<h2>${passed?"✨ 定着を確認できました":"🌱 もう一度確認してみよう"}</h2><p>${retention.unit}　${retention.ok}/${retention.qs.length}</p><p>${passed?"時間をあけても思い出して取り組めました。":"今は思い出しにくいところがありました。説明を見直してから、また確認できます。"}</p></div>`));
 if(!passed)A.append(btn("📖 説明を見直す",()=>beginMathUnit(retention.node),"primary"));A.append(btn("🌿 今日の学習へ",child,"soft"))
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
let due=retentionDue();if(due){let rc=e("div","card good",`<h2>🔁 そろそろ定着確認</h2><p><b>${due.unit}</b></p><p>前に学んだ内容を、3問だけ確認してみよう。</p><p class="tiny">時間をあけて思い出せるかを見る確認です。できなくても大丈夫です。</p>`);rc.append(btn("3問だけやってみる",()=>startRetention(due),"primary"));A.append(rc)}
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
