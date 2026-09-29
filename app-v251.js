/* v25.1 漢字クエスト：現行学年別漢字配当 1026字を登録
   学期表示は「目安」。教科書の実際の初出順を固定表示とはしない。 */
const KANJI_GRADE251={
1:"一右雨円王音下火花貝学気九休玉金空月犬見五口校左三山子四糸字耳七車手十出女小上森人水正生青夕石赤千川先早草足村大男竹中虫町天田土二日入年白八百文木本名目立力林六",
2:"引羽雲園遠何科夏家歌画回会海絵外角楽活間丸岩顔汽記帰弓牛魚京強教近兄形計元言原戸古午後語工公広交光考行高黄合谷国黒今才細作算止市矢姉思紙寺自時室社弱首秋週春書少場色食心新親図数西声星晴切雪船線前組走多太体台地池知茶昼長鳥朝直通弟店点電刀冬当東答頭同道読内南肉馬売買麦半番父風分聞米歩母方北毎妹万明鳴毛門夜野友用曜来里理話",
3:"悪安暗医委意育員院飲運泳駅央横屋温化荷界開階寒感漢館岸起期客究急級宮球去橋業曲局銀区苦具君係軽血決研県庫湖向幸港号根祭皿仕死使始指歯詩次事持式実写者主守取酒受州拾終習集住重宿所暑助昭消商章勝乗植申身神真深進世整昔全相送想息速族他打対待代第題炭短談着注柱丁帳調追定庭笛鉄転都度投豆島湯登等動童農波配倍箱畑発反坂板皮悲美鼻筆氷表秒病品負部服福物平返勉放味命面問役薬由油有遊予羊洋葉陽様落流旅両緑礼列練路和",
4:"愛案以衣位印英栄塩億加果貨課芽改械害街各覚完官管関観願希季旗器機議求泣給挙漁共協鏡競極訓軍郡径景芸欠結建健験固功好候康差菜最材昨札刷察参産散残氏司試児治辞失借種周祝順初松笑唱焼照臣信成省清静席積折節説浅戦選然争倉巣束側続卒孫帯隊達単置仲兆低底的典伝徒努灯働特熱念敗梅博飯飛必票標不夫付府副兵別辺変便包法望牧末満未民無約勇要養浴利陸良料量輪類令冷例連老労録茨媛岡潟岐熊香佐埼崎滋鹿縄井沖栃奈梨阪阜賀群徳富城",
5:"圧移因永営衛易益液演応往桜可仮価河過快解格確額刊幹慣眼基寄規技義逆久旧居許境均禁句経潔件険検限現減故個護効厚耕鉱構興講混査再災妻採際在財罪雑酸賛支志枝師資飼示似識質舎謝授修述術準序招証条状常情織職制性政勢精製税責績接設絶祖素総造像増則測属率損貸態団断築張提程適統銅導独任燃能破犯判版比肥非備評貧布婦武復複仏編弁保墓報豊防貿暴務夢迷綿輸余容略留領囲紀喜救型航告殺士史象賞貯停堂得毒費粉脈歴",
6:"異遺域宇映延沿我灰拡革閣割株干巻看簡危机揮貴疑吸供胸郷勤筋系敬警劇激穴絹権憲源厳己呼誤后孝皇紅降鋼刻穀骨困砂座済裁策冊蚕至私姿視詞誌磁射捨尺若樹収宗就衆従縦縮熟純処署諸除将傷障蒸針仁垂推寸盛聖誠宣専泉洗染善奏窓創装層操蔵臓存尊宅担探誕段暖値宙忠著庁頂潮賃痛展討党糖届難乳認納脳派拝背肺俳班晩否批秘腹奮並陛閉片補暮宝訪亡忘棒枚幕密盟模訳郵優幼欲翌乱卵覧裏律臨朗論胃腸恩券承舌銭退敵俵預"
};
const KANJI_COUNT251={1:80,2:160,3:200,4:202,5:193,6:191};
function kanjiTerms251(g){
 const a=[...KANJI_GRADE251[g]], n=a.length, p=Math.ceil(n/3), q=Math.ceil((n-p)/2);
 return [a.slice(0,p),a.slice(p,p+q),a.slice(p+q)];
}
function kanjiGrade251(g){
 head(`🌱 漢字クエスト｜小学${g}年`,japaneseStart);
 const ts=kanjiTerms251(g), labs=["🌸 1学期ごろ","🍁 2学期ごろ","❄️ 3学期ごろ"];
 A.append(e("div","card",`<h2>小学${g}年の漢字　${KANJI_COUNT251[g]}字</h2><p>学期ごとに少しずつ確認できます。</p><p class="tiny">学期分けはPonoで使いやすくした目安です。学校・教科書の進み方に合わせて、どこからでも選べます。</p>`));
 ts.forEach((x,i)=>A.append(btn(`${labs[i]}　${x.length}字`,()=>kanjiTerm251(g,i),"primary")));
}
function kanjiTerm251(g,t){
 const arr=kanjiTerms251(g)[t], labs=["🌸 1学期ごろ","🍁 2学期ごろ","❄️ 3学期ごろ"];
 head(`${labs[t]}｜小学${g}年`,()=>kanjiGrade251(g));
 A.append(e("div","card",`<h2>${arr.length}字</h2><p class="tiny">👀見る・🔊読む・💡意味・🧩形・✍️書くを、同時に全部できなくても大丈夫です。</p>`));
 const grid=e("div","kanji-grid251");arr.forEach(k=>{let b=btn(k,()=>kanjiSimple251(g,k,t),"kanji-btn251");grid.append(b)});A.append(grid);
}
function kanjiSimple251(g,k,t){
 head(`漢字「${k}」｜小学${g}年`,()=>kanjiTerm251(g,t));
 A.append(e("div","card kanji-card",`<div class="kanji-big">${k}</div><p>一度に全部覚えなくて大丈夫です。</p><p class="tiny">読む・意味が分かる・形が分かる・書く、を分けて確認します。</p>`));
 A.append(btn("🔊 漢字を聞く",()=>speakJP(k),"soft"));
 /* 既存の詳しい辞書データがある字は、その画面へ接続 */
 let list=(window.JKANJI_BY_GRADE&&JKANJI_BY_GRADE[g])||[], ix=list.findIndex(x=>x.k===k);
 if(ix>=0 && typeof kanjiDetailByGrade==="function")A.append(btn("💡 読み・意味・パーツを見る",()=>kanjiDetailByGrade(g,ix),"primary"));
 if(typeof showStrokeOrder216==="function")A.append(btn("▶️ 実際の書き順を見る",()=>showStrokeOrder216(k,()=>kanjiSimple251(g,k,t)),"soft"));
 if(typeof kanjiWritingStages==="function")A.append(btn("✍️ 大きな枠で書く",()=>kanjiWritingStages(g,k),"primary"));
 A.append(e("div","card",`<p class="tiny">この字の詳しい読み・意味・例文データは、Ponoの辞書データを順次つないでいきます。書き順は既存のKanjiVG機能を利用します。</p>`));
}
/* 漢字クエストの学年入口を完全版へ */
japaneseKanjiTermMenu=function(g,term){kanjiTerm251(g,Math.max(0,Math.min(2,Number(term)||0)))};
