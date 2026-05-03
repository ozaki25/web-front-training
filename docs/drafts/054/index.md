# CSS の適用範囲 — グローバルスコープと解決手段の歴史

## 今日のゴール

- CSS はファイルを分けてもスタイルが分離されないことを知る
- この性質を「グローバルスコープ」と呼ぶことを知る
- グローバルスコープに対して、どんな解決手段が生まれてきたかを知る

## CSS の読み方

この先のコードを読むために、CSS の書き方を押さえておきましょう。

CSS は HTML の見た目を指定する言語で、次のような形で書きます。

```css
セレクタ {
  プロパティ: 値;
}
```

```css
.title {
  font-size: 20px;
  color: navy;
}
```

| 用語 | 役割 | 上の例 |
|------|------|--------|
| セレクタ | どの要素にスタイルを当てるか | `.title`（HTML の `class="title"` が付いた要素） |
| プロパティ | 何を変えるか | `font-size`、`color` |
| 値 | どう変えるか | `20px`、`navy` |

CSS ファイルは HTML から `<link>` タグで読み込みます。

```html
<link rel="stylesheet" href="style.css" />
```

## 同じセレクタを 2 回書いたらどうなるか

1 つの CSS ファイルの中で、同じ `.title` を 2 回書いた場合を見てみましょう。

```css
/* style.css */
.title {
  color: navy;
}

.title {
  color: red;
}
```

ブラウザは CSS を上から順に読みます。同じ対象に同じプロパティが 2 回指定されていたら、**後に書かれた方で上書き**します。この場合、`.title` の文字色は赤になります。

## ファイルを分けたらどうなるか

ここが一番大事なところです。

カード用の CSS とヘッダー用の CSS を別ファイルに分けて、それぞれで `.title` を定義してみます。

```css
/* card.css */
.title {
  font-size: 20px;
  color: navy;
}
```

```css
/* header.css */
.title {
  font-size: 14px;
  color: gray;
}
```

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CSS の衝突</title>
    <link rel="stylesheet" href="card.css" />
    <link rel="stylesheet" href="header.css" />
  </head>
  <body>
    <header>
      <h1 class="title">サイトのタイトル</h1>
    </header>
    <article>
      <h2 class="title">カードのタイトル</h2>
    </article>
  </body>
</html>
```

`card.css` の `.title` はカード用、`header.css` の `.title` はヘッダー用のつもりで書きました。ファイルが分かれているのだから、それぞれ独立して効いてほしいところです。

しかし実際にはそうなりません。ブラウザは `<link>` で読み込んだ CSS を**読み込んだ順に 1 枚の CSS として並べるだけ**です。ファイルが別でも、さっきの「1 つのファイルに 2 回書いた」場合と動きは同じです。

後から読み込まれた `header.css` の `.title` が勝ち、カードの見出しにも `font-size: 14px; color: gray` が適用されます。

## これが「グローバルスコープ」

この「どのファイルに書いても、ページ全体に届く」という CSS の性質を**グローバルスコープ**と呼びます。

「スコープ」はスタイルが届く範囲のことです。CSS のスコープは既定で「ページ全体」になっています。`card.css` に書いても `header.css` に書いても、ページ内のすべての `.title` に届きます。

```mermaid
flowchart LR
  A["card.css\n.title { color: navy }"] --> P["ブラウザ\n（1 枚の CSS として扱う）"]
  B["header.css\n.title { color: gray }"] --> P
  P --> X["すべての .title が gray になる"]
```

JavaScript では、あるファイルで宣言した変数は `import` しない限り他のファイルからは見えません。ファイルごとに壁があります。CSS にはその壁がありません。すべてのルールが 1 つの空間に混ざります。

## グローバルスコープのつらさ

ファイルが数個しかないうちは問題になりません。しかしファイルと人が増えると、グローバルスコープはいくつものつらさを生みます。

**衝突**: 自分が書いた `.title` のスタイルが、別のファイルに書かれた `.title` に上書きされます。どのファイルが原因かも分かりにくいです。

**命名疲れ**: 衝突を避けるために、被らない名前を毎回考える必要があります。`.title` がダメなら `.card-title`、それも危ないなら `.card-component-title`。名前がどんどん長くなっていきます。

**削除できない**: あるスタイルを消したくても、他のページで使われているかもしれません。影響範囲が分からないので放置されます。使われていないスタイルが積もっていきます。

**規模で破綻**: ファイルが 10 個なら注意すれば済みますが、100 個、1000 個になると人間には追いきれません。チームの人数が増えるほど、同じ名前を使ってしまう確率は上がります。

CSS が「壊れやすい」と言われる根本の原因がこのグローバルスコープです。ここからは、この問題に対してどんな解決手段が生まれてきたかを見ていきましょう。

## 解決手段の歴史

### 命名規約で乗り切る — BEM

最初に広まった解決策は「名前が被らないよう、ルールを決めて守る」というものです。**BEM**（Block Element Modifier）はその代表的な命名規約で、クラス名を次のように付けます。

- **Block**: かたまりの名前（例: `card`）
- **Element**: かたまりの中の部品。`__` で繋ぐ（例: `card__title`）
- **Modifier**: バリエーション。`--` で繋ぐ（例: `card__title--large`）

```css
.card {
  padding: 16px;
  border-radius: 8px;
}
.card__title {
  font-size: 18px;
  font-weight: bold;
}
.card__title--large {
  font-size: 24px;
}
```

`.title` ではなく `.card__title` と書くことで、他の `.title` との衝突を避けます。ビルドツールなしで使えるのが利点です。

ただし**ルールを破っても何も止めてくれません**。誰かが `.title` と書いてしまえば衝突は起きます。人間の注意力に頼る方法には限界があります。

### ビルドで名前を変える — CSS Modules

「人間がルールを守る」のではなく「機械に名前を変えてもらう」方法です。CSS Modules では、ビルド時にクラス名が自動でユニークな文字列に変換されます。

```css
/* Card.module.css */
.title {
  font-size: 20px;
  font-weight: bold;
}
```

```tsx
import styles from "./Card.module.css";

export function Card() {
  return <h2 className={styles.title}>レッスン</h2>;
}
```

ビルド後、`.title` は `style_title__a1b2c` のようなユニークな名前に変わります。別のファイルの `.title` は `style_title__x9y8z` に変わります。同じ `.title` と書いても、ハッシュが異なるので実際のクラス名は別物です。

```mermaid
flowchart LR
  A["Card.module.css\n.title"] -->|ビルド| A2["style_title__a1b2c"]
  B["Header.module.css\n.title"] -->|ビルド| B2["style_title__x9y8z"]
  A2 --> P["衝突しない"]
  B2 --> P
```

命名規約に頼らず、仕組みとして衝突を防げます。ただしビルドツールが必須になります。

### クラスを自分で作らない — Tailwind CSS

さらに違う角度からの解決策です。**クラスを自分で作らなければ、衝突は起きません**。

Tailwind CSS は `text-xl`（文字を大きく）、`font-bold`（太字）、`p-4`（内側の余白）のように、あらかじめ用意された小さなクラスを HTML に並べて使います。開発者が `.title` のようなクラスを新しく作る必要がありません。

```html
<h2 class="text-xl font-bold">レッスン</h2>
<p class="text-sm text-gray-600">CSS のスコープについて</p>
```

`.title` も `.card` も作っていないので、衝突のしようがありません。

### CSS 自身がスコープを持つ — @scope

ここまでの解決手段はどれも CSS の外側の工夫でした。CSS の言語仕様自体にスコープの仕組みがあれば、外部のツールや規約に頼る必要はありません。それが `@scope` です。

```css
@scope (.card) {
  .title {
    font-size: 20px;
    font-weight: bold;
  }
}
```

`.card` の中にある `.title` にだけスタイルが適用されます。`.card` の外の `.title` には届きません。

2026 年 4 月時点で Chrome・Safari・Edge・Firefox の主要ブラウザすべてが対応しており、実用できる段階にあります。

## Tailwind CSS の仕組み — ユーティリティファーストとは何か

歴史の中で Tailwind CSS を「クラスを自分で作らない」と紹介しました。ここではもう少し詳しく、Tailwind がどういう仕組みで動いているのかを見ていきます。

### 従来の CSS と Tailwind の書き比べ

従来の CSS では、まずクラス名を考えて、そのクラスにスタイルを定義します。

```css
/* card.css */
.card {
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: white;
}
.card-title {
  font-size: 1.25rem;
  font-weight: bold;
}
```

```html
<div class="card">
  <h2 class="card-title">タイトル</h2>
</div>
```

`.card` や `.card-title` というクラス名を自分で考え、CSS ファイルに定義しています。このクラス名がグローバルスコープに載るため、他のファイルと衝突する可能性があります。

Tailwind CSS では、同じ見た目をこう書きます。

```html
<div class="p-4 rounded-lg bg-white">
  <h2 class="text-xl font-bold">タイトル</h2>
</div>
```

`p-4`、`rounded-lg`、`bg-white` などは Tailwind があらかじめ用意しているクラスです。それぞれが 1 つの CSS プロパティに対応しています。

| クラス | 対応する CSS |
|--------|-------------|
| `p-4` | `padding: 1rem` |
| `rounded-lg` | `border-radius: 0.5rem` |
| `bg-white` | `background-color: white` |
| `text-xl` | `font-size: 1.25rem` |
| `font-bold` | `font-weight: bold` |

このように、1 クラス = 1 プロパティの小さなクラスを組み合わせてスタイルを作る考え方を**ユーティリティファースト**と呼びます。

### なぜグローバルスコープの問題が消えるのか

従来の CSS では「`.card-title` というクラスを作る → そのクラスにスタイルを定義する」という流れでした。クラスを作るたびに、グローバルスコープに新しい名前が追加されます。

Tailwind では、開発者がクラスを作りません。`text-xl` も `font-bold` も Tailwind が定義済みのクラスです。開発者はそれを選んで並べるだけなので、名前の衝突が起きる余地がありません。

### 使ったクラスだけが出力される

Tailwind は何千ものユーティリティクラスを持っていますが、すべてが CSS ファイルに含まれるわけではありません。ビルド時に HTML をスキャンし、**実際に使われているクラスだけを最終的な CSS に出力**します。

```mermaid
flowchart LR
  A["HTML ファイル群\nclass='p-4 text-xl ...'"] --> B["Tailwind のビルド\n（使用クラスをスキャン）"]
  B --> C["出力 CSS\n（使ったクラスだけ）"]
```

グローバルスコープの痛点のひとつに「削除できない（使われているか分からない）」がありました。Tailwind ではビルドのたびに使用中のクラスだけが出力されるため、不要な CSS が積もっていく問題も起きません。

## 現在地

グローバルスコープという CSS の根っこの問題に、Web の世界は長い時間をかけて向き合ってきました。

- 最初は**人間がルールを守る**（BEM）
- 次に**機械に名前を変えてもらう**（CSS Modules）
- そして**そもそもクラスを作らない**発想に行き着き（Tailwind CSS）
- さらに**言語仕様そのもの**にスコープが組み込まれつつある（@scope）

AI が書いてくれた Next.js のコードに `className="text-xl font-bold"` と並んでいるのを見かけることがあります。あれは単なる流行ではなく、**40 年近くにわたるグローバルスコープとの格闘の末に行き着いた答え**です。

自分で CSS を書く機会はこれから減っていくかもしれません。それでも、この根っこの問題を知っているかどうかで、コードを読んだときの理解の深さが変わります。

## まとめ

- CSS はファイルを分けてもスタイルが分離されません。すべてのルールがページ全体に届きます。これが**グローバルスコープ**です
- グローバルスコープは衝突・命名疲れ・削除できない・規模での破綻を生みます
- 解決手段は世代を重ねて生まれてきました
  - **BEM**: 命名規約で被らないようにする
  - **CSS Modules**: ビルド時に名前を自動で変える
  - **Tailwind CSS**: クラスを自分で作らない
  - **@scope**: CSS の仕様でスコープを制限する
