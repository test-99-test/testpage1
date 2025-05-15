# TSC株式会社 ウェブサイト

## プロジェクト構成

```
/
├── index.html                 # トップページ
├── assets/                    # メディアファイル
│   ├── images/                # サイトの画像
│   │   ├── main-visual1.jpg
│   │   ├── main-visual2.jpg
│   │   ├── main-visual3.jpg
│   │   ├── main-visual4.jpg
│   │   └── main-video.gif
│   ├── fonts/                 # フォントファイル
│   │   ├── fa-brands-400.woff2
│   │   ├── fa-regular-400.woff2
│   │   ├── fa-v4compatibility.woff2
│   │   └── NotoSansJP-VariableFont_wght.woff2
│   └── icons/                 # アイコン素材
├── css/                       # スタイルシート
│   ├── style.css              # メインのCSSファイル
│   ├── night-sky.css          # 夜空の背景エフェクト用スタイル
│   └── reset.css              # リセットCSS
├── js/                        # JavaScript
│   └── main.js                # サイトの動作に関わるJS
├── pages/                     # 個別ページを格納
│   ├── about.html             # 会社情報ページ
│   ├── services.html          # 業務内容ページ
│   └── contact.html           # お問い合わせページ
├── .gitignore                 # Git管理対象外ファイル
├── LICENSE                    # ライセンスファイル
├── CNAME                      # カスタムドメイン設定
└── unused/                    # 未使用ファイル
    └── video.mp4
```

## 機能

- 夜空の背景：月、星、雨、雪のアニメーション表示
- 雨と雪の自動切り替え
- 風による雨や雪の動きの変化
- レスポンシブデザイン
- スライドショー
- スクロールアニメーション 