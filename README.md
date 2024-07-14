# ランダムグラデーション生成マニュアル

このマニュアルでは、ランダムなグラデーションを生成し、それを操作・保存するための手順を説明します。HTMLとJavaScriptで構成されたこのプロジェクトは、インタラクティブなグラデーション生成と保存機能を提供します。

## 必要なファイル
1. `h.html` - HTMLファイル
2. `h.js` - JavaScriptファイル

## セットアップ

### 1. ファイルの配置
- 上記の2つのファイル (`h.html` と `h.js`) を同じディレクトリに配置します。

### 2. 必要なライブラリの読み込み
- `h.html` には以下の外部ライブラリが必要です。インターネット接続がある環境で開くことを確認してください。
  ```html
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.6.0/jszip.min.js"></script>
  ```

## 使用方法

### 1. ランダムグラデーション生成
- `グラデーション生成` ボタンをクリックすると、10個のランダムなグラデーションボックスが生成されます。

### 2. グラデーションの保存
- 各グラデーションボックスをクリックすると、そのグラデーションが保存されます。保存されたグラデーションはページ下部の「保存されたグラデーション」セクションに表示されます。

### 3. グラデーションの選択
- 保存されたグラデーションをクリックすると、選択状態になります。選択されたグラデーションは赤枠で表示されます。

### 4. グラデーションの操作
- `選択削除` ボタンをクリックすると、選択されたグラデーションが削除されます。
- `一括削除` ボタンをクリックすると、すべての保存されたグラデーションが削除されます。
- `選択をZIPとして保存` ボタンをクリックすると、選択されたグラデーションがZIPファイルとしてダウンロードされます。
- `スライドショー開始` ボタンをクリックすると、選択されたグラデーションのスライドショーが開始されます。
- `背景に設定` ボタンをクリックすると、選択されたグラデーションがページの背景に設定されます。
- `画像保存` ボタンをクリックすると、選択されたグラデーションが画像として保存されます。
- `テキスト付き保存` ボタンをクリックすると、選択されたグラデーションがテキスト付きで保存されます。

### 5. 入力からグラデーション生成
- テキストボックスにカラーコードを入力し、`入力からグラデーション生成` ボタンをクリックすると、指定した色でグラデーションが生成されます。

### 6. ポップアップ表示/非表示
- `ポップアップ表示/非表示` ボタンをクリックすると、選択されたグラデーションがポップアップとして表示されます。

### 7. 生成結果のリセット
- `生成結果をリセット` ボタンをクリックすると、現在表示されているすべてのグラデーションがリセットされます。

## 注意事項
- グラデーションのカラーコードは有効な16進数カラーコードを使用してください（例：`#FF5733`）。
- 保存したグラデーションはローカルストレージに保存されるため、ページをリロードしても保持されますが、ブラウザのキャッシュをクリアすると削除されます。

このマニュアルに従って、インタラクティブなグラデーション生成と操作を楽しんでください。
