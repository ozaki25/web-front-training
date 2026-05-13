# エラーメッセージの読み方 — 赤い文字は怖くない

## 今日のゴール

- エラーメッセージには読み方のパターンがあることを知る
- よく見る 3 種類のエラーの原因と対処を知る
- DevTools の Console タブでエラーを確認する方法を知る

## 赤い文字が出たら

コードを書いていると（あるいは AI に書いてもらったコードを動かすと）、ブラウザの画面やターミナルに赤い文字が出ることがあります。

初めて見ると驚きますが、エラーメッセージは**壊れたという報告ではなく、何が起きたかの説明**です。読み方がわかれば、原因を特定する最大の手がかりになります。

## エラーメッセージの構造

JavaScript のエラーメッセージは、ほとんどの場合この構造で書かれています。

```
エラーの種類: 何が起きたかの説明
    at 場所（ファイル名:行番号:列番号）
```

例:

```
TypeError: Cannot read properties of undefined (reading 'name')
    at UserCard (UserCard.tsx:12:25)
```

これを分解すると:

- **TypeError**: エラーの種類（型に関するエラー）
- **Cannot read properties of undefined**: `undefined` のプロパティを読もうとした
- **(reading 'name')**: 具体的には `name` を読もうとした
- **at UserCard (UserCard.tsx:12:25)**: `UserCard.tsx` の 12 行目 25 列目で発生

つまり「`UserCard.tsx` の 12 行目で、何かが `undefined` になっていて、その `.name` にアクセスしようとした」と読めます。

## よく見る 3 つのエラー

### 1. TypeError — 想定と違う型

最も多いエラーです。`undefined` や `null` に対してプロパティを読もうとしたり、関数でないものを関数として呼ぼうとしたときに出ます。

```javascript
// よくある原因: API からのデータが null
const user = null;
console.log(user.name);
// TypeError: Cannot read properties of null (reading 'name')
```

```javascript
// よくある原因: 関数をインポートし忘れ
greet("田中");
// TypeError: greet is not a function
```

**対処**: エラー箇所で「その変数に何が入っているか」を `console.log` で確認します。

### 2. ReferenceError — 存在しない変数

宣言されていない変数を使おうとしたときに出ます。

```javascript
console.log(messsage);
// ReferenceError: messsage is not defined
```

**対処**: 変数名のタイプミスか、宣言し忘れです。エラーメッセージの変数名をよく見ると、綴りが間違っていることが多いです。

### 3. SyntaxError — 書き方の間違い

コードの文法自体が間違っているときに出ます。括弧の閉じ忘れ、カンマの漏れなど。

```javascript
const user = {
  name: "田中"
  age: 25    // ← カンマが抜けている
};
// SyntaxError: Unexpected identifier 'age'
```

**対処**: エラーが示す行の周辺を見て、括弧やカンマの対応を確認します。

## Console タブで確認する

エラーメッセージはブラウザの DevTools の「Console」タブに表示されます。

1. ブラウザで右クリック → 「検証」
2. 「Console」タブを開く
3. 赤い文字のメッセージを確認

エラーメッセージの右側にあるファイル名と行番号をクリックすると、該当のソースコードにジャンプできます。

### console.log で状態を確認する

エラーの原因を特定するとき、`console.log` で変数の中身を出力するのが最も基本的な方法です。

```javascript
async function loadUser(id) {
  const response = await fetch(`/api/users/${id}`);
  const data = await response.json();
  console.log("data:", data);  // ← ここで中身を確認
  return data.user.name;       // ← ここでエラーが出るなら data の中身を見る
}
```

`console.log` は開発中いくらでも入れて構いません。問題を見つけたら消すだけです。

## エラーは「AI への指示」にもなる

エラーメッセージの読み方を知っていると、AI に修正を頼むときにも役立ちます。

**曖昧な指示**: 「動きません、直してください」
**具体的な指示**: 「UserCard.tsx の 12 行目で `TypeError: Cannot read properties of undefined (reading 'name')` が出ます。`user` が `undefined` になっているようです」

後者のほうが AI の修正精度は格段に上がります。エラーメッセージを読めること自体が、AI との協業の質を上げます。

## まとめ

- エラーメッセージは「エラーの種類 + 説明 + 発生場所」の構造で書かれています
- **TypeError** は型の不一致（`undefined` の `.name` にアクセスなど）、**ReferenceError** は未定義の変数、**SyntaxError** は文法の間違いです
- DevTools の Console タブでエラーを確認し、ファイル名と行番号で発生場所を特定します
- `console.log` で変数の中身を出力するのが最も基本的なデバッグ方法です
- エラーメッセージを読めると、AI への修正指示も具体的になります
