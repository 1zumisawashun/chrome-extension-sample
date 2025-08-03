# chrome-extension-sample

2025年7月の振り返り会でCOM設計について相談したところ「会の中でのアンケート回答状況との連携ができたら良さそう」とF/BをもらったのでChrome Extensionで解決できないか実装してみる

## 技術スタック

- DB: Google SpreadSheet
- BE: Google Apps Script
- FE: Chrome Extension

## 環境構築

```bash
$ git clone git@github.com:1zumisawashun/chrome-extension-sample.git
$ cd chrome-extension-sample
$ code .
$ npm i 
$ npm run dev
```

## 秘匿情報

```bash
$ cp .env.local.sample .env.local
```

## 拡張機能

- chrome://extensions/ に遷移する
- デベロッパーモード のトグルをONにする
- パッケージ化されていない拡張機能を読み込む を押下する
- npm run dev で .output/chrome-mv3-dev が生成されているので、そちらをアップロードする（cmd + shift + . で隠しフォルダが表示されます）
- 読み込み完了後 chrome://extensions/ に拡張機能が追加されていることを確認する
- 拡張機能のアイコンを押下し popup が表示されることを確認する
- npm run devを実行中は変更内容が即時反映される

## TODO

- フローチャートを作成する
- turborepoでモノレポにする
  - BEはclaspの想定
- テストを追加する
  - https://wxt.dev/guide/essentials/unit-testing.html

