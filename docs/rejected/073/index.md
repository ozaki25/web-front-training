# コンポーネントと props

## 今日のゴール

- props を使ってコンポーネントにデータを渡す方法を知る
- children の使い方を知る
- TypeScript で props の型を定義する方法を知る

## props とは

Day 23 でコンポーネントの基本を学びました。しかし、あのままでは毎回同じ内容しか表示できません。

```tsx
function Greeting() {
  return <h1>こんにちは、田中さん！</h1>;
}
```

これでは「田中さん」にしか挨拶できません。コンポーネントに外からデータを渡す仕組みが **props**（プロパティの略）です。

```tsx
function Greeting(props: { name: string }) {
  return <h1>こんにちは、{props.name}さん！</h1>;
}

// 使う側
<Greeting name="田中" />
<Greeting name="佐藤" />
<Greeting name="鈴木" />
```

HTML の属性のような形でデータを渡し、コンポーネント内で `props.プロパティ名` として受け取ります。

## props の型定義

Day 19〜20 で学んだ TypeScript の `interface` や `type` を使って、props の型を定義します。

```tsx
interface GreetingProps {
  name: string;
}

function Greeting(props: GreetingProps) {
  return <h1>こんにちは、{props.name}さん！</h1>;
}
```

プロパティが多い場合も同様です。

```tsx
interface UserCardProps {
  name: string;
  age: number;
  role: "admin" | "editor" | "viewer";
  email?: string; // 省略可能
}

function UserCard(props: UserCardProps) {
  return (
    <article>
      <h2>{props.name}</h2>
      <p>年齢: {props.age}歳</p>
      <p>権限: {props.role}</p>
      {props.email && <p>メール: {props.email}</p>}
    </article>
  );
}
```

Day 20 で学んだ Optional（`?`）やリテラル型のユニオンがここで活きています。

## 分割代入で props を受け取る

Day 13 で学んだ分割代入（destructuring）を使うと、`props.` を毎回書かなくて済みます。

```tsx
interface GreetingProps {
  name: string;
  greeting?: string;
}

// 分割代入 + デフォルト値
function Greeting({ name, greeting = "こんにちは" }: GreetingProps) {
  return (
    <h1>
      {greeting}、{name}さん！
    </h1>
  );
}

<Greeting name="田中" />                    // "こんにちは、田中さん！"
<Greeting name="佐藤" greeting="おはよう" /> // "おはよう、佐藤さん！"
```

この書き方が React のコードで最も一般的です。

## さまざまな型の props

props には文字列以外にも、さまざまな型の値を渡せます。

```tsx
interface ProductProps {
  name: string;       // 文字列
  price: number;      // 数値
  inStock: boolean;   // 真偽値
  tags: string[];     // 配列
  onBuy: () => void;  // 関数
}

function Product({ name, price, inStock, tags, onBuy }: ProductProps) {
  return (
    <article>
      <h2>{name}</h2>
      <p>{price.toLocaleString()}円</p>
      <ul>
        {tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      <button onClick={onBuy} disabled={!inStock}>
        {inStock ? "購入する" : "在庫切れ"}
      </button>
    </article>
  );
}
```

文字列以外の値を渡すときは `{}` で囲みます。

```tsx
<Product
  name="TypeScript 入門書"
  price={2800}
  inStock={true}
  tags={["技術書", "TypeScript"]}
  onBuy={() => console.log("購入しました")}
/>
```

> **ポイント**: `inStock={true}` は `inStock` と省略できます。属性名だけ書くと `true` が渡されます。ただし `false` は省略できないので `inStock={false}` と書く必要があります。

## children

コンポーネントの開始タグと終了タグの間に書いた内容は、特別な props である `children` として渡されます。

```tsx
interface ButtonProps {
  variant: "primary" | "secondary";
  children: React.ReactNode;
}

function Button({ variant, children }: ButtonProps) {
  const className = variant === "primary" ? "btn-primary" : "btn-secondary";
  return <button className={className}>{children}</button>;
}

// 使う側
<Button variant="primary">送信する</Button>
<Button variant="secondary">
  <span>アイコン</span> キャンセル
</Button>
```

`children` にはテキスト、JSX 要素、それらの組み合わせなど何でも渡せます。`React.ReactNode` は「React が描画できるもの」を表す型です。

`children` を使うことで、「外見のレイアウトはコンポーネントが決め、中身は使う側が決める」という柔軟な設計ができます。

```tsx
interface CardProps {
  title: string;
  children: React.ReactNode;
}

function Card({ title, children }: CardProps) {
  return (
    <section className="card">
      <h2 className="card-title">{title}</h2>
      <div className="card-body">{children}</div>
    </section>
  );
}

// 中身は使う側が自由に決められる
<Card title="お知らせ">
  <p>明日はメンテナンスのためサービスを停止します。</p>
</Card>

<Card title="プロフィール">
  <img src="/avatar.jpg" alt="田中太郎のアバター" />
  <p>田中太郎</p>
</Card>
```

## props は読み取り専用

React の重要なルールとして、**props は変更してはいけません**。

```tsx
function Greeting({ name }: { name: string }) {
  name = "無視して上書き"; // やってはいけない！
  return <h1>{name}</h1>;
}
```

これは React の**単方向データフロー**（one-way data flow）の原則です。データは親から子へ流れ、子は受け取ったデータを変更しません。これにより、データがどこからどう流れているかが追いやすくなります。

## コンポーネントの組み合わせ

複数のコンポーネントを組み合わせて画面を構築する例を見てみます。

```tsx
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
}

function TodoItem({ todo }: TodoItemProps) {
  return (
    <li>
      <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
        {todo.title}
      </span>
    </li>
  );
}

interface TodoListProps {
  todos: Todo[];
}

function TodoList({ todos }: TodoListProps) {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

function App() {
  const todos: Todo[] = [
    { id: 1, title: "React を学ぶ", completed: true },
    { id: 2, title: "TypeScript を学ぶ", completed: true },
    { id: 3, title: "Next.js を学ぶ", completed: false },
  ];

  return (
    <main>
      <h1>やることリスト</h1>
      <TodoList todos={todos} />
    </main>
  );
}
```

`App` → `TodoList` → `TodoItem` とデータが親から子へ流れています。各コンポーネントは自分の役割だけに集中し、小さく保たれています。

## まとめ

- props はコンポーネントに外からデータを渡す仕組み
- TypeScript の `interface` で props の型を定義し、安全にデータを受け渡す
- 分割代入とデフォルト値を使うのが一般的な書き方
- `children` でコンポーネントの中身を柔軟に差し替えられる
- props は読み取り専用。データは親から子への単方向に流れる
