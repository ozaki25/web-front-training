import { defineConfig } from "vitepress";
import { withMermaid } from "vitepress-plugin-mermaid";
import { withPwa } from "@vite-pwa/vitepress";
import { transformerTwoslash } from "@shikijs/vitepress-twoslash";
import { tabsMarkdownPlugin } from "vitepress-plugin-tabs";

export default withPwa(
  withMermaid(
    defineConfig({
      title: "Web Front-end Training",
      description: "Web フロントエンド研修コンテンツ",
      lang: "ja",
      head: [
        ["meta", { name: "theme-color", content: "#064e3b" }],
      ],
      markdown: {
        codeTransformers: [transformerTwoslash()],
        config(md) {
          md.use(tabsMarkdownPlugin);
        },
      },
      vue: {
        template: {
          compilerOptions: {
            isCustomElement: (tag) => tag === "selectedcontent",
          },
        },
      },
      themeConfig: {
        nav: [{ text: "ホーム", link: "/" }],
        sidebar: [
          {
            text: "ガイド",
            items: [{ text: "はじめに", link: "/introduction/" }],
          },
          {
            text: "公開済み",
            items: [
              { text: "Day 1: Web の仕組み", link: "/lessons/day01/" },
              { text: "Day 2: セマンティック HTML", link: "/lessons/day02/" },
              { text: "Day 3: フォーム", link: "/lessons/day03/" },
              { text: "Day 4: カスタムフォーム UI", link: "/lessons/day04/" },
              { text: "Day 5: 専用の HTML 要素で作れる UI", link: "/lessons/day05/" },
              { text: "Day 6: img タグの書き方", link: "/lessons/day06/" },
              { text: "Day 7: CSS の適用範囲", link: "/lessons/day07/" },
              { text: "Day 8: PWA と Web API", link: "/lessons/day08/" },
              { text: "Day 9: CSS の余白設計", link: "/lessons/day09/" },
              { text: "Day 10: CSS のレイアウト", link: "/lessons/day10/" },
              { text: "Day 11: レスポンシブデザイン", link: "/lessons/day11/" },
              { text: "Day 12: CSS アニメーション", link: "/lessons/day12/" },
            ],
          },
          {
            text: "候補",
            collapsed: true,
            items: [
              { text: "JavaScript の役割", link: "/drafts/007/" },
              { text: "DOM 操作", link: "/drafts/010/" },
              { text: "データを取りに行く", link: "/drafts/011/" },
              { text: "HTTP", link: "/drafts/012/" },
              { text: "モジュール", link: "/drafts/013/" },
              { text: "型とは何か", link: "/drafts/015/" },
              { text: "ジェネリクスと型の絞り込み", link: "/drafts/017/" },
              { text: "React が解決した問題", link: "/drafts/019/" },
              { text: "useEffect", link: "/drafts/023/" },
              { text: "フォームと Server Actions", link: "/drafts/024/" },
              { text: "カスタム Hooks", link: "/drafts/026/" },
              { text: "Context", link: "/drafts/027/" },
              { text: "SPA・CSR・SSR", link: "/drafts/029/" },
              { text: "Server / Client Components", link: "/drafts/031/" },
              { text: "データ取得", link: "/drafts/033/" },
              { text: "Route Handlers と Server Actions", link: "/drafts/034/" },
              { text: "Tailwind CSS", link: "/drafts/039/" },
              { text: "Web パフォーマンス", link: "/drafts/044/" },
              { text: "認証とセキュリティ", link: "/drafts/046/" },
              { text: "ダークモードの仕組み", link: "/drafts/066/" },
              { text: "JavaScript の実行環境", link: "/drafts/069/" },
            ],
          },
        ],
        outline: {
          label: "目次",
        },
        docFooter: {
          prev: "前のレッスン",
          next: "次のレッスン",
        },
        search: {
          provider: "local",
          options: {
            translations: {
              button: { buttonText: "検索" },
              modal: {
                noResultsText: "見つかりませんでした",
                resetButtonTitle: "リセット",
              },
            },
          },
        },
      },
      pwa: {
        registerType: "autoUpdate",
        manifest: {
          name: "Web Front-end Training",
          short_name: "WFT",
          description: "Web フロントエンド研修コンテンツ",
          theme_color: "#064e3b",
          background_color: "#ffffff",
          lang: "ja",
          display: "standalone",
          start_url: "/",
          icons: [
            { src: "pwa-64x64.png", sizes: "64x64", type: "image/png" },
            { src: "pwa-192x192.png", sizes: "192x192", type: "image/png" },
            { src: "pwa-512x512.png", sizes: "512x512", type: "image/png" },
            {
              src: "maskable-icon-512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "maskable",
            },
          ],
        },
        workbox: {
          maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
          globPatterns: ["**/*.{js,css,html,woff2,png,svg,ico,webp,json}"],
        },
      },
    }),
  ),
);
