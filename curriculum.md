# カリキュラム全体像

全約53日。平日のみ、約2.5ヶ月で完了する想定。
各 Day は15分程度で取り組める内容。

> このファイルは draft ブランチで管理する（main には入れない）。
> レッスン作成時に参照し、必要に応じて更新する。

---

## Phase 1: HTML/CSS の基礎（Day 1–10）

素の HTML/CSS を理解する。フレームワークが解決する問題の土台。

| Day | テーマ | 内容 |
|-----|--------|------|
| 1 | HTML の基本構造 | DOCTYPE、html/head/body、メタ情報、見出し・段落・リスト、セマンティック HTML |
| 2 | リンクと画像 | a タグ、img タグ、パス指定（相対・絶対）、alt 属性の重要性 |
| 3 | フォームとテーブル | input/select/textarea、label との紐付け、テーブルのマークアップ、アクセシビリティ |
| 4 | カスタムフォーム UI | フォーム部品のカスタマイズ、sr-only、:checked、div で作り直すアンチパターン、Headless UI / Radix UI |
| 5 | HTML だけで作れる UI | dialog 要素、details/summary、popover 属性、Baseline による対応状況確認 |
| 6 | CSS の基本と適用方法 | セレクタ、プロパティ、カスケードと詳細度、3つの適用方法（インライン・style タグ・外部ファイル） |
| 7 | CSS ボックスモデルとレイアウト | margin/padding/border、box-sizing、display プロパティ |
| 8 | Flexbox | 1次元レイアウト、主軸・交差軸、justify/align、実用パターン |
| 9 | CSS Grid | 2次元レイアウト、grid-template、fr 単位、Flexbox との使い分け |
| 10 | レスポンシブデザイン | メディアクエリ、モバイルファースト、ビューポート、CSS のグローバルスコープ問題の体感 |

## Phase 2: JavaScript の基礎（Day 11–18）

素の JavaScript と DOM 操作を理解する。React の宣言的 UI のありがたみの土台。

| Day | テーマ | 内容 |
|-----|--------|------|
| 11 | JavaScript の基本文法 | 変数（const/let）、データ型、演算子、条件分岐、ループ |
| 12 | 関数とスコープ | 関数宣言・式・アロー関数、スコープチェーン、クロージャ |
| 13 | オブジェクトと配列 | リテラル、プロパティアクセス、配列メソッド（map/filter/find/reduce）、スプレッド構文、分割代入 |
| 14 | DOM 操作 | querySelector、要素の取得・作成・追加・削除、イベントリスナー、DOM 操作の煩雑さを体感 |
| 15 | 非同期処理 | コールバック、Promise、async/await、fetch API |
| 16 | HTTP とネットワーク基礎 | HTTP メソッド、ステータスコード、リクエスト/レスポンスヘッダー、JSON、REST の基本概念 |
| 17 | ES Modules | import/export、モジュールスコープ、名前空間の分離、なぜモジュールが必要か |
| 18 | エラーハンドリングとデバッグ | try/catch、DevTools の使い方、console メソッド、ネットワークタブ |

## Phase 3: TypeScript（Day 19–22）

型による安全性と開発体験の向上を理解する。

| Day | テーマ | 内容 |
|-----|--------|------|
| 19 | TypeScript の基本 | 型注釈、プリミティブ型、配列・オブジェクトの型、型推論、なぜ型が必要か |
| 20 | 型の応用 | ユニオン型、リテラル型、型エイリアス、interface、Optional/Readonly |
| 21 | ジェネリクスとユーティリティ型 | ジェネリクスの基本、Partial/Required/Pick/Omit、Record、型パズルではなく実用に絞る |
| 22 | TypeScript 応用 | 型の絞り込み（narrowing）、discriminated union、satisfies 演算子、as const、型安全なイベントハンドリング |

## Phase 4: React の基礎（Day 23–32）

React が何を解決するか、どういう仕組みで動くかを理解する。React 19 ベース。

| Day | テーマ | 内容 |
|-----|--------|------|
| 23 | React の概要と JSX | React が解決する問題（DOM 操作の煩雑さ→宣言的 UI）、JSX の仕組み、コンポーネントの基本 |
| 24 | コンポーネントと props | 関数コンポーネント、props の受け渡し、children、型定義 |
| 25 | state とイベント処理 | useState、イベントハンドラー、再レンダリングの仕組み、state の不変性 |
| 26 | 条件分岐とリストレンダリング | 条件付きレンダリング、map によるリスト表示、key の役割と仕組み |
| 27 | useEffect とライフサイクル | 副作用の管理、依存配列、クリーンアップ、useEffect の適切な使い方 |
| 28 | フォームと Actions | React 19 の form actions、useActionState、useFormStatus、従来の制御コンポーネントとの比較 |
| 29 | useOptimistic と Transition | useOptimistic による楽観的 UI 更新、useTransition による優先度制御 |
| 30 | カスタム Hooks とコンポーネント設計 | ロジックの再利用、カスタム Hook の作り方、コンポーネント分割の考え方、合成パターン |
| 31 | Context と状態管理パターン | useContext、props drilling 問題、Context の適切な使い方、状態の設計 |
| 32 | React のレンダリング最適化 | React Compiler（自動最適化）、memo/useMemo/useCallback が不要になる背景、Profiler で確認 |

## Phase 5: Next.js の基礎（Day 33–43）

Next.js が React に何を加えるか、App Router の仕組みを理解する。Next.js 最新版ベース。

| Day | テーマ | 内容 |
|-----|--------|------|
| 33 | SPA・CSR・SSR — レンダリング戦略 | SPA の仕組み、CSR の弱点（初期表示・SEO）、SSR の仕組みとメリット、ハイドレーション、SSG の概要 |
| 34 | Next.js の概要とプロジェクト構成 | Next.js が解決する問題、App Router のディレクトリ構成、ファイルベースルーティング |
| 35 | Server Components と Client Components | RSC の仕組み、"use client" の意味、使い分けの判断基準、サーバーとクライアントの境界 |
| 36 | レイアウトとページ | layout.tsx / page.tsx / loading.tsx / error.tsx、ネストレイアウト、テンプレート |
| 37 | データ取得（Server Components） | Server Components での fetch、async コンポーネント、"use cache" ディレクティブ、キャッシュ戦略 |
| 38 | Route Handlers | route.ts による API エンドポイント作成、リクエスト/レスポンス処理、いつ使うか |
| 39 | Server Actions | "use server"、フォーム送信、データ変更、revalidation、セキュリティ考慮 |
| 40 | 動的ルーティングとミドルウェア | 動的セグメント、catch-all、proxy.ts（旧 middleware.ts）、リダイレクト・認証チェック |
| 41 | メタデータと SEO | Metadata API、OGP、構造化データ、generateMetadata |
| 42 | 画像・フォント最適化 | next/image の仕組み、next/font、Core Web Vitals との関係、パフォーマンス改善の実感 |
| 43 | Tailwind CSS | ユーティリティファーストの考え方、Tailwind CSS v4 の CSS ファーストな設定、レスポンシブ、ダークモード |

## Phase 6: 実践的なスキル（Day 44–53）

プロジェクトで必要な実践的スキルを身につける。

| Day | テーマ | 内容 |
|-----|--------|------|
| 44 | テスト基礎（Vitest） | なぜテストを書くか、Vitest のセットアップ、単体テスト、テストの書き方の基本 |
| 45 | コンポーネントテスト | Testing Library の考え方、React コンポーネントのテスト、ユーザー操作のシミュレーション |
| 46 | アクセシビリティ実践 | WCAG の概要、セマンティック HTML の総復習、aria 属性、キーボードナビゲーション、スクリーンリーダー体験 |
| 47 | アクセシビリティとテスト | axe によるアクセシビリティテスト、eslint-plugin-jsx-a11y、自動チェックでカバーできる範囲とできない範囲 |
| 48 | Web パフォーマンス基礎 | Core Web Vitals（LCP/CLS/INP）、Lighthouse の使い方、パフォーマンス測定と改善サイクル |
| 49 | Web パフォーマンス応用 | コード分割（dynamic import）、lazy loading、バンドルサイズ分析、SSR/SSG のパフォーマンス特性 |
| 50 | 認証の基礎 | 認証と認可の違い、Cookie/Session、JWT、OAuth の概念、Next.js での認証フロー（NextAuth.js/Auth.js） |
| 51 | Web セキュリティ | XSS、CSRF、CORS、Content Security Policy、Next.js が提供するセキュリティ機能 |
| 52 | コンポーネント設計パターン | Presentational/Container、Compound Components、Render Props vs Hooks、実プロジェクトでの設計判断 |
| 53 | アーキテクチャ総まとめ | ディレクトリ構成戦略、技術選定の考え方、ここまでの知識の全体像、次のステップ |

---

## 備考

- 各 Phase の日数・順序はレッスン作成時に調整可能
- ライブラリ・フレームワークは必ず執筆時点の最新安定版に基づいて書く
- React の機能と Next.js の機能は明確に分けて教える
- 素の技術で「不便さ」を体感した上で、フレームワークが解決する構造にする
