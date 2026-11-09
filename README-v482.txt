Pono Learning Quest v482 — 小学6年 英語のスクロール修正

問題: v481 の「This is me!」などの詳細画面で、スマートフォンから下へスクロールできない。
原因: v480 メニューのスクロール固定設定が詳細画面にも残っていた。

GitHub (pono-miura/Pono-learning-quest-test) のトップ階層に下記2ファイルを登録してください。
1. index.html を上書き
2. style-v482.css を新規追加

削除・変更しない: app-v481.js、他の旧教材、学習記録など。

公開後に https://pono-miura.github.io/Pono-learning-quest-test/?v=482 を開き、
子どもの学習 → 小学6年 → 英語 → 詳しい教材 → 単語の学習
で、music の下の art / science / soccer までスワイプで進めるか確認。

今回変更するのは画面のスクロール用CSSだけです。問題・採点・保存処理は変更しません。
