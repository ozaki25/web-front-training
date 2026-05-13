# 動的ルーティング — `[slug]` がパラメータになる仕組み

## 今日のゴール

- `[slug]` フォルダ名で動的な URL を扱えることを知る
- params からパラメータを受け取る方法を知る
- 動的ルートとデータ取得の組み合わせを知る

## すべてのページを手で作るわけにはいかない

ブログ記事のページを考えてみます。記事が 3 本なら、3 つのフォルダを作ればいいかもしれません。

```
app/blog/hello-world/page.tsx
app/blog/react-basics/page.tsx
app/blog/next-intro/page.tsx
```

しかし記事が 100 本、1000 本になったらどうでしょう。記事を追加するたびにファイルを作るのは現実的ではありません。

## `[slug]` — フォルダ名がパラメータになる

フォルダ名を `[ ]` で囲むと、**動的ルート**になります。

```
app/blog/[slug]/page.tsx
```

このフォルダ 1 つで、`/blog/hello-world`、`/blog/react-basics`、`/blog/next-intro` など、あらゆる URL にマッチします。

`slug` の部分に URL のパス（`hello-world` など）が入り、コンポーネントの中で受け取れます。

```tsx
// app/blog/[slug]/page.tsx
type Props = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  return (
    <article>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
    </article>
  );
}
```

`params.slug` に URL のパス部分が入ります。`/blog/hello-world` にアクセスすれば `slug` は `"hello-world"` です。この値を使ってデータベースから該当する記事を取得します。

## 複数のパラメータ

パラメータは複数持てます。

```
app/shop/[category]/[productId]/page.tsx
```

`/shop/electronics/123` にアクセスすると:
- `params.category` → `"electronics"`
- `params.productId` → `"123"`

## Catch-all ルート

`[...slug]` のように `...` を付けると、**複数のパスセグメント**にマッチします。

```
app/docs/[...slug]/page.tsx
```

| URL | params.slug |
|-----|-------------|
| `/docs/getting-started` | `["getting-started"]` |
| `/docs/api/auth` | `["api", "auth"]` |
| `/docs/api/auth/login` | `["api", "auth", "login"]` |

ドキュメントサイトのように、パスの深さが不定な場合に使います。

## 動的ルートとデータ取得

動的ルートの典型的なパターンは「URL のパラメータで記事を特定 → データを取得 → 表示」です。

```tsx
// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = await db.post.findUnique({
    where: { slug },
  });

  if (!post) {
    notFound();  // 記事が見つからなければ 404 ページを表示
  }

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </article>
  );
}
```

`notFound()` を呼ぶと、Next.js が `not-found.tsx`（なければデフォルトの 404 ページ）を表示します。

## まとめ

- `[slug]` フォルダ名で動的な URL を扱えます。URL のパス部分が `params.slug` として渡されます
- 1 つの `page.tsx` であらゆるパスにマッチするので、記事やユーザーごとにファイルを作る必要がありません
- `[...slug]` で複数パスセグメントに対応する catch-all ルートも作れます
- 動的ルート + データ取得 + `notFound()` が、記事ページの典型的なパターンです
