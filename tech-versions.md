# 技術バージョンリファレンス

レッスン作成時に参照する、各技術の最新バージョンと API の記録。
**レッスン作成・修正のたびに、該当する技術の公式ドキュメントまたは Web 検索で最新情報を確認し、このファイルを更新すること。**

> 最終確認日: 2026-04-05

## フレームワーク・ライブラリ

| 技術 | バージョン | 主な変更点・注意事項 |
|------|-----------|---------------------|
| Next.js | 16 | App Router。`middleware.ts` → `proxy.ts`（export 関数名も `proxy`）。Node.js ランタイム（Edge ではない）。`cacheComponents: true` で "use cache" 有効化（`dynamicIO` は廃止）。`create-next-app` は `tailwind.config.ts` を生成しない |
| React | 19 | form actions, useActionState, useFormStatus, useOptimistic, use() API（useContext の代替）。forwardRef 非推奨（ref を通常の prop として渡せる） |
| React Compiler | 1.0 | React 19 に自動バンドルされない。`npm install -D babel-plugin-react-compiler`。Next.js では `next.config.ts` に `reactCompiler: true` を追加 |
| TypeScript | 5.x | satisfies 演算子、as const、const type parameters |
| Tailwind CSS | 4 | CSS ファースト設定。`@import "tailwindcss"`、`@theme` ブロック。`tailwind.config.js/ts` は不要。`@tailwindcss/postcss` を使用 |
| Vitest | 最新安定版 | Jest 互換 API。`vitest.config.ts` で設定 |
| Testing Library | 最新安定版 | `@testing-library/react`, `@testing-library/user-event` |
| Auth.js (NextAuth) | v5 beta | `npm install next-auth@beta`。正式安定版は未リリース。Better Auth チームへの移管が発表されている |

## Next.js の主要 API 変更（従来 → 現在）

| 従来 | 現在（Next.js 16） | 備考 |
|------|-------------------|------|
| `middleware.ts` / `export function middleware` | `proxy.ts` / `export function proxy` | Node.js ランタイムで動作 |
| `experimental.dynamicIO` | `cacheComponents: true` | experimental ではなくなった |
| `unstable_cache` | `"use cache"` ディレクティブ | ファイル/コンポーネント/関数レベルで適用可能 |
| `fetch` の `next.revalidate` | `cacheLife()` / `cacheTag()` | "use cache" と組み合わせて使用 |
| `useContext(Ctx)` | `use(Ctx)` も可 | React 19 の新 API。条件分岐内でも使える |
| `React.memo` / `useMemo` / `useCallback` | React Compiler で自動化 | 手動での使用は基本不要に |
| `forwardRef` | ref を通常の prop として受け取り | React 19 で非推奨 |

## 確認手順

レッスンで技術を扱う際は、以下の手順で最新情報を確認する:

1. **公式ドキュメントを確認**: Context7 MCP または Web 検索で公式ドキュメントの最新版を参照
2. **このファイルと照合**: 記載内容と矛盾がないか確認。矛盾があればこのファイルを更新
3. **コード例を検証**: API 名、インポートパス、設定方法が最新であることを確認
4. **他レッスンとの整合性**: 同じ技術を扱う他の Day と情報が一致しているか確認
