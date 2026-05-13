# 配列操作 — `.map()` で for ループを書かなくなった理由

## 今日のゴール

- 配列の基本操作（map, filter, find）を知る
- for ループを書かなくても配列を操作できることを知る
- スプレッド構文と分割代入の読み方を知る

## for ループで書くと長い

「配列の中の数値をすべて 2 倍にしたい」。for ループで書くとこうなります。

```javascript
const numbers = [1, 2, 3, 4, 5];
const doubled = [];

for (let i = 0; i < numbers.length; i++) {
  doubled.push(numbers[i] * 2);
}

console.log(doubled);  // [2, 4, 6, 8, 10]
```

動きますが、やりたいこと（2 倍にする）に対してコードが長いです。「ループ変数 `i` を 0 で初期化して、配列の長さまで回して、1 つずつ push して...」という手順を全部書いています。

## `.map()` なら 1 行で書ける

同じことを `.map()` で書きます。

```javascript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((n) => n * 2);

console.log(doubled);  // [2, 4, 6, 8, 10]
```

`.map()` は「配列のすべての要素に関数を適用して、新しい配列を返す」メソッドです。`(n) => n * 2` がアロー関数で、「各要素 `n` を `n * 2` に変換する」と読めます。

for ループが「**どう繰り返すか**」を書くのに対して、`.map()` は「**各要素をどう変換するか**」だけを書きます。

## `.filter()` と `.find()`

配列には `.map()` 以外にもよく使うメソッドがあります。

### `.filter()` — 条件に合うものだけ残す

```javascript
const numbers = [1, 2, 3, 4, 5];
const even = numbers.filter((n) => n % 2 === 0);

console.log(even);  // [2, 4]
```

各要素に対して関数が `true` を返したものだけが新しい配列に含まれます。

### `.find()` — 条件に合う最初の 1 つを見つける

```javascript
const users = [
  { name: "田中", age: 25 },
  { name: "佐藤", age: 30 },
  { name: "鈴木", age: 28 },
];

const target = users.find((user) => user.name === "佐藤");
console.log(target);  // { name: "佐藤", age: 30 }
```

条件に合う最初の要素を 1 つだけ返します。配列ではなく単一の値が返ります。

### 組み合わせて使う

これらのメソッドはチェーンできます。

```javascript
const users = [
  { name: "田中", age: 25, active: true },
  { name: "佐藤", age: 30, active: false },
  { name: "鈴木", age: 28, active: true },
];

const activeNames = users
  .filter((user) => user.active)
  .map((user) => user.name);

console.log(activeNames);  // ["田中", "鈴木"]
```

「active なユーザーだけ残す → 名前だけ取り出す」を上から順に読めます。for ループで同じことを書くと、ネストが深くなりがちです。

## React で `.map()` が多い理由

React でリストを表示するとき、`.map()` がほぼ必ず登場します。

```tsx
function UserList({ users }: { users: { name: string }[] }) {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.name}>{user.name}</li>
      ))}
    </ul>
  );
}
```

React は「データを渡すと UI が作られる」仕組みです。配列データから UI 要素の配列を作る `.map()` は、React の考え方にそのまま合致します。

## スプレッド構文 — `...` の読み方

Next.js のコードでは `...` という記号がよく出てきます。

```javascript
const a = [1, 2, 3];
const b = [...a, 4, 5];
console.log(b);  // [1, 2, 3, 4, 5]
```

`...a` は「配列 `a` の中身を展開する」という意味です。配列のコピーや結合に使います。

オブジェクトでも同じように使えます。

```javascript
const user = { name: "田中", age: 25 };
const updated = { ...user, age: 26 };
console.log(updated);  // { name: "田中", age: 26 }
```

`{ ...user, age: 26 }` は「`user` のすべてのプロパティをコピーして、`age` だけ上書きする」という意味です。元の `user` は変更されません。

React で状態を更新するとき、この書き方が頻繁に登場します。

## 分割代入 — `{ }` と `[ ]` で取り出す

変数にオブジェクトや配列の中身を取り出す省略記法です。

```javascript
// オブジェクトの分割代入
const user = { name: "田中", age: 25 };
const { name, age } = user;
console.log(name);  // "田中"

// 配列の分割代入
const [first, second] = [10, 20];
console.log(first);   // 10
```

React のコンポーネントで props を受け取るとき、この書き方が使われます。

```tsx
// { title, count } が分割代入
function Card({ title, count }: { title: string; count: number }) {
  return <div>{title}: {count}</div>;
}
```

## まとめ

- `.map()` は配列の全要素を変換します。for ループより「何をするか」が明確です
- `.filter()` は条件に合う要素だけ残し、`.find()` は最初の 1 つを見つけます
- `...`（スプレッド構文）は配列やオブジェクトの中身を展開します。コピーや上書きに使います
- `{ name } = user` のような分割代入で、オブジェクトから必要な値だけ取り出せます
- これらは React のコードで頻繁に登場します。読めるようになると、AI が書いたコードの意味が格段にわかりやすくなります
