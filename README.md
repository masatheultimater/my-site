# [Next.js](https://nextjs.org/) 製のサイト

- 自己紹介
- 職務経歴
- スキル
- 実績
- ブログ
  などを載せる予定

## 起動

Dev サーバー

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

---

## 開発

### ESlint

Next.js は自動で初期インストール済

- 実行

```bash
npm run lint
# or
yarn lint
```

- ESlint で実行するディレクトリを指定  
  `src` ディレクトリに設定ファイル以外をまとめて`package.json`で指定

```bash
# package.json
"script": {
 // 変更前
 "lint": "next lint"
 // ↓↓
 // 変更後
 "lint": "next lint --dir src",
}
```

ルール

```bash
# .eslintrc.json{
  "extends": [
    "next/core-web-vitals",
  ],
// ルールを追加↓
  "rules": {
    "no-console": 1
  }
}
```

[ESlint ルール](https://eslint.org/docs/latest/use/configure/rules#rules)

### Prettier

```bash
# インストール
npm install -D prettier eslint-config-prettier
# or
yarn add -D prettier eslint-config-prettier

# 起動
npm run format
# or
yarn format
```

フォーマットルール

```bash
# .prettierrciファイルを作成して以下記載
{
  "semi": true,
  "tabWidth": 2,
  "printWidth": 80,
  "trailingComma": "all",
  "singleQuote": trueP
  "jsxSingleQuote": true,
  "bracketSpacing": true
}
```

[Prettier のルール](https://prettier.io/docs/en/options.html)

### テスト

Jest を入れる

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
