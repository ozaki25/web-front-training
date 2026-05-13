# テストの考え方 — AI が書いたコードが正しいかを検証する

## 今日のゴール

- テストが「仕様を書くこと」であると知る
- Vitest で関数のテストを書く方法を知る
- Testing Library でコンポーネントのテストを書く方法を知る

## AI が書いたコードは正しいか

AI にコードを書いてもらったとき、それが正しく動いているかをどう確認しますか。

ブラウザで動かして確かめる方法もありますが、機能が増えてくると手動で全部確認するのは現実的ではありません。1 箇所直したつもりが別の場所を壊していた、ということも起きます。

**テスト**は、コードの動作を**自動で検証**する仕組みです。一度書けば、コードを変更するたびに自動で実行して問題がないか確認できます。

## テストは「仕様書」

テストコードは「このコードはこう動くべき」という**仕様**を書いたものです。

```typescript
import { describe, it, expect } from "vitest";
import { add } from "./math";

describe("add", () => {
  it("2つの数値を足す", () => {
    expect(add(1, 2)).toBe(3);
  });

  it("負の数も扱える", () => {
    expect(add(-1, 1)).toBe(0);
  });
});
```

- `describe("add", ...)` — 「add 関数のテスト」というグループ
- `it("2つの数値を足す", ...)` — 「2 つの数値を足す」という仕様
- `expect(add(1, 2)).toBe(3)` — 「add(1, 2) の結果は 3 であるべき」

テストを読むだけで、`add` 関数がどう動くべきかがわかります。

## Vitest — テストランナー

Vitest は JavaScript / TypeScript のテストランナーです。テストファイルを実行して、結果を報告します。

```
$ npx vitest

 ✓ math.test.ts
   ✓ add > 2つの数値を足す
   ✓ add > 負の数も扱える

 Test Files  1 passed
 Tests  2 passed
```

テストファイルは `*.test.ts` または `*.spec.ts` という名前にします。

### AAA パターン

テストの書き方には定番のパターンがあります。

```typescript
it("税込価格を計算する", () => {
  // Arrange（準備）
  const price = 1000;
  const taxRate = 0.1;

  // Act（実行）
  const result = calculateTax(price, taxRate);

  // Assert（検証）
  expect(result).toBe(1100);
});
```

1. **Arrange**: テストに必要なデータを準備する
2. **Act**: テスト対象の関数を実行する
3. **Assert**: 結果を検証する

## コンポーネントのテスト

UI コンポーネントのテストには **Testing Library** を使います。特徴は「ユーザーの視点でテストする」ことです。

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Counter from "./Counter";

describe("Counter", () => {
  it("ボタンを押すとカウントが増える", async () => {
    render(<Counter />);

    const button = screen.getByRole("button", { name: "+1" });
    expect(screen.getByText("0")).toBeDefined();

    await userEvent.click(button);

    expect(screen.getByText("1")).toBeDefined();
  });
});
```

- `render(<Counter />)` — コンポーネントを仮想的にレンダリング
- `screen.getByRole("button")` — ユーザーが見つける方法で要素を取得
- `userEvent.click(button)` — ユーザーのクリック操作をシミュレーション

内部の state や DOM 操作をテストするのではなく、「ユーザーが画面上で何を見て、何を操作するか」をテストします。

### なぜ getByRole なのか

`getByRole` はアクセシビリティの観点から要素を探します。「ボタン」というロールを持つ要素を探すのは、スクリーンリーダーが要素を認識する方法と同じです。

テストを `getByRole` で書く習慣がつくと、アクセシビリティを意識した HTML を自然に書くようになります。

## まとめ

- テストは「コードがこう動くべき」という仕様を自動で検証する仕組みです
- `describe` でグループ化し、`it` で個別の仕様を書き、`expect` で結果を検証します
- AAA パターン（Arrange → Act → Assert）がテストの基本構造です
- コンポーネントのテストは Testing Library で、ユーザーの視点から書きます
- `getByRole` を使うと、アクセシビリティを意識したテストになります
