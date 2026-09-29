Pono Learning Quest v23.6
原因調査:
- GitHub上のindex.htmlはv23.5を読み込んでいた。
- app-v234.jsはGitHubに存在しないのにindexから参照されていたため参照を削除。
- 日本の歴史画面は共通カード生成処理への依存を外し、DOMへ直接描画する方式に変更。
確認: 社会→小学6年→日本の歴史
