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

# 手順

## Chrome Extension

- chrome://extensions/ に遷移する
- デベロッパーモード のトグルをONにする
- パッケージ化されていない拡張機能を読み込む を押下する
- npm run dev で .output/chrome-mv3-development が生成されているので、そちらをアップロードする（cmd + shift + . で隠しフォルダが表示されます）
- 読み込み完了後 chrome://extensions/ に拡張機能が追加されていることを確認する
- 拡張機能のアイコンを押下し popup が表示されることを確認する
- npm run devを実行中は変更内容が即時反映される

※ .output/chrome-mv3-production をアップロードした場合は npm run dev しなくても拡張機能が動きます

## Google Apps Script

https://script.google.com/ で任意のプロジェクトに以下のコードを貼り付ける


```ts
function doGet(e) {
  const spreadSheetId = ScriptProperties.getProperty('SPREAD_SHEET_ID');
  const sheetName = ScriptProperties.getProperty("SHEET_NAME")

  const spreadSheet = SpreadsheetApp.openById(spreadSheetId)
  const sheet = spreadSheet.getSheetByName(sheetName)

  const responseCount = sheet.getLastRow() - 1
  const output = JSON.stringify({status: "OK", responseCount })

  Logger.log(output)

  return ContentService.createTextOutput(output).setMimeType(ContentService.MimeType.JSON);
}
```

任意のプロジェクトのスクリプトプロパティにSPREAD_SHEET_IDとSHEET_NAMEを追加する

## TODO

- turborepoでモノレポにする
  - BEはclaspの想定
- テストを追加する
  - https://wxt.dev/guide/essentials/unit-testing.html
- biomeのformatterを修正する
- 不要かもわからないがbackground経由でも表示できるようにする

