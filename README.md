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
- npm run dev で .output/chrome-mv3-development が生成されているので、そちらをアップロードする（cmd + shift + . で隠しフォルダが表示されます）
- 読み込み完了後 chrome://extensions/ に拡張機能が追加されていることを確認する
- 拡張機能のアイコンを押下し popup が表示されることを確認する
- npm run devを実行中は変更内容が即時反映される

## TODO

- turborepoでモノレポにする
  - BEはclaspの想定
- テストを追加する
  - https://wxt.dev/guide/essentials/unit-testing.html
- biomeのformatterを修正する
- 不要かもわからないがbackground経由でも表示できるようにする

## フローチャート

```mermaid
graph TD
    subgraph 回答フロー
        A[回答者] -- アンケートに回答 --> B(Google Form);
        B -- 自動集約 --> C[<img src='[https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg/826px-Microsoft_Office_Excel_%282019%E2%80%93present%29.svg.png](https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg/826px-Microsoft_Office_Excel_%282019%E2%80%93present%29.svg.png)' width='20' /> Google Spreadsheet];
    end

    subgraph 表示フロー
        D[閲覧者] -- アイコンクリック --> E{<img src='[https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Google_Chrome_icon_%28February_2022%29.svg/2048px-Google_Chrome_icon_%28February_2022%29.svg.png](https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Google_Chrome_icon_%28February_2022%29.svg/2048px-Google_Chrome_icon_%28February_2022%29.svg.png)' width='20' /> Chrome Extension};
        E -- ポップアップ表示 --> F[popup.html];
        F -- 10秒ごとに実行 --> G[APIリクエスト];
        G -- 回答数を要求 --> H{<img src='[https://developers.google.com/apps-script/images/logo.png](https://developers.google.com/apps-script/images/logo.png)' width='20' /> Google Apps Script (GAS)};
        H -- レスポンス（JSON形式） --> I[データ受信];
        I -- 受け取ったデータを --> J[popup.htmlの表示を更新];
    end

    subgraph バックエンド処理
        C -- データを参照 --> H;
        H -- スプレッドシートの<br>回答数をカウント --> H;
    end

    style C fill:#D5E8D4,stroke:#82B366
    style H fill:#DAE8FC,stroke:#6C8EBF
    style F fill:#F8CECC,stroke:#B85450
```