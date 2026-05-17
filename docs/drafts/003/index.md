# 関数の書き方 — function とアロー関数

## 今日のゴール

- JavaScript の関数には複数の書き方があることを知る
- `function` 宣言とアロー関数の違いを知る
- 場面による使い分けを知る

## 関数の書き方は 1 つではない

JavaScript で関数を書く方法は複数あります。AI が生成したコードを見ると、場所によって書き方が違うことに気づくかもしれません。

```javascript
// function 宣言
function greet(name) {
  return "こんにちは、" + name + "さん";
}

// 関数式
const greet = function(name) {
  return "こんにちは、" + name + "さん";
};

// アロー関数
const greet = (name) => {
  return "こんにちは、" + name + "さん";
};

// アロー関数（省略形）
const greet = (name) => "こんにちは、" + name + "さん";
```

どれも「`name` を受け取って挨拶文を返す関数」です。やっていることは同じなのに、なぜ複数の書き方があるのでしょうか。

## function 宣言 — もっとも古くからある書き方

`function` キーワードで始まる書き方は、JavaScript の最初からある構文です。

```javascript
function add(a, b) {
  return a + b;
}
```

function 宣言には<strong>巻き上げ（hoisting）</strong>という特徴があります。コードの中でどこに書いても、そのスコープの先頭に「宣言だけ先に処理される」ように振る舞います。

```javascript
// 宣言より前で呼び出せる
console.log(add(1, 2));  // 3

function add(a, b) {
  return a + b;
}
```

これにより、ファイルの先頭にメインの処理を書き、ヘルパー関数を下に並べるという読みやすい構成が可能です。

## アロー関数 — ES2015 で登場した書き方

アロー関数は 2015 年に ECMAScript に追加された構文です。`=>` という矢印のような記号を使います。

```javascript
const add = (a, b) => {
  return a + b;
};
```

本体が 1 つの式だけなら、中括弧と `return` を省略できます。

```javascript
const add = (a, b) => a + b;
```

引数が 1 つなら括弧も省略できます。

```javascript
const double = n => n * 2;
```

配列の操作で特に簡潔に書けます。

```javascript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);        // [2, 4, 6, 8, 10]
const evens = numbers.filter(n => n % 2 === 0);  // [2, 4]
```

## 見た目以外の違い — `this` の束縛

function 宣言とアロー関数には、見た目だけでない重要な違いがあります。`this` の扱いです。

JavaScript の `this` は、関数の呼び出し方によって指すものが変わります。

```javascript
const user = {
  name: "田中",
  greet: function() {
    console.log("こんにちは、" + this.name);
  }
};

user.greet();  // "こんにちは、田中" — this は user を指す
```

しかし、関数を別の変数に入れたり、コールバックとして渡したりすると、`this` が変わってしまいます。

```javascript
const greetFn = user.greet;
greetFn();  // "こんにちは、undefined" — this が user ではなくなる
```

アロー関数はこの問題を起こしません。アロー関数の `this` は、定義された場所の外側のスコープから引き継ぎ、呼び出し方によって変わりません。

```javascript
const user = {
  name: "田中",
  greetLater: function() {
    // アロー関数は外側（greetLater）の this を引き継ぐ
    setTimeout(() => {
      console.log("こんにちは、" + this.name);
    }, 1000);
  }
};

user.greetLater();  // 1秒後に "こんにちは、田中"
```

`setTimeout` に `function` を渡した場合、`this` が変わってしまいます。アロー関数なら外側の `this` をそのまま使えます。

::: details this の問題と React の歴史
かつて React はクラスコンポーネントで書かれていました。クラスの中でイベントハンドラを書くとき、`this` の束縛が大きな悩みの種でした。

```javascript
// クラスコンポーネント（昔の書き方）
class Counter extends React.Component {
  constructor() {
    super();
    this.state = { count: 0 };
    // これを忘れるとバグになる
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({ count: this.state.count + 1 });
  }
}
```

現在の React は関数コンポーネントと Hooks が主流で、`this` を使う場面はほぼありません。アロー関数でも `function` 宣言でも、コンポーネント内では `this` の問題は起きません。
:::

## 使い分け

どちらを使うかはチームやプロジェクトの方針によって異なりますが、よく見られるパターンがあります。

| 場面 | よく使われる書き方 | 理由 |
|------|------------------|------|
| React コンポーネントの定義 | `function` 宣言 | Next.js / React の公式サンプルがこの書き方 |
| 配列のコールバック（map, filter 等） | アロー関数 | 簡潔に書ける |
| イベントハンドラ（JSX 内） | アロー関数 | 簡潔で `this` の問題がない |
| ユーティリティ関数 | どちらでも | チームで統一されていれば OK |

```typescript
// React コンポーネント — function 宣言
export default function UserList({ users }) {
  // コールバック — アロー関数
  const activeUsers = users.filter(user => user.isActive);

  return (
    <ul>
      {activeUsers.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

::: tip どちらが正しいかより、一貫性が大事
`function` 宣言とアロー関数のどちらが絶対的に正しいということはありません。プロジェクト内で統一されていることの方が重要です。ESLint などのツールで自動的に統一することもできます。
:::

## まとめ

- JavaScript の関数には `function` 宣言、関数式、アロー関数など複数の書き方があります
- `function` 宣言は巻き上げ（hoisting）があり、宣言前に呼び出せます
- アロー関数は `=>` を使う簡潔な書き方で、ES2015 から使えます。`this` を外側のスコープから引き継ぐのが `function` との最大の違いです
- React コンポーネントの定義には `function` 宣言、コールバックにはアロー関数がよく使われます
- どちらを使うかはチームの方針次第。一貫性が大事です
