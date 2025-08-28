# To-Do App – Next.js + TypeScript (App Router)

## Prerequisites

- Install [Node.js](https://nodejs.org/)
- Install [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

---

## 🛠️ Project Setup

### 🧪 Command Used

```bash
npx create-next-app@latest .
```

This project was created using the following setup:

```text
What is your project named?                [Current Directory]
Would you like to use TypeScript?         Yes
Which linter would you like to use?       ESLint
Would you like to use Tailwind CSS?       Yes
Would you like your code inside a src/?   No
Would you like to use App Router?         Yes
Would you like to use Turbopack?          No
Customize the import alias?               Yes
What import alias?                        @/*
```

---

# Backend API Documentation — `/api/todos`

backend logic for a simple To-Do app built using **Next.js (App Router)** and **TypeScript**.

This is a simple backend server with a single route file containing all the routes. It includes four APIs: getAll, addNew, update, and delete.

---

## Create File

```
app/api/todos/route.ts
```

### In Next.js (App Router):

* When you create a folder named `/api` inside the `/app` directory, it's used for **API routes**.
* Inside that, if you create another folder like `/todos` and add a `route.ts` file, it becomes an endpoint:
  **`/api/todos`**

---

### Example folder structure:

```
/app
  /api
    /todos
      route.ts
```

This gives you an API endpoint at:

👉 **`http://localhost:3000/api/todos`**

---

### 🧠 In `route.ts`, you define HTTP methods like this:

```ts
export async function GET() {
  return Response.json({ message: 'All todos' });
}

// OR

export async function POST() {
  return Response.json({ message: 'New todo added' });
}
```

---

## Data Model

```ts
import { NextResponse } from 'next/server';

type Todo = {
  id: number;
  task: string;
  completed: boolean;
};

let todos: Todo[] = [
  { id: 1, task: 'Learn Next.js', completed: false },
  { id: 2, task: 'Build a To-Do app', completed: false },
];
```

---

## API Endpoints

---

### 1. `GET /api/todos`

#### 📄 Description:

Retrieve the full list of todos.

#### 🧠 Code:

```ts
export async function GET() {
  return NextResponse.json(todos);
}
```
#### ✅ Response:

Returns an array of `Todo` objects.

#### 📦 Sample Response:

```json
[
  { "id": 1, "task": "Learn Next.js", "completed": false },
  { "id": 2, "task": "Build a To-Do app", "completed": false }
]
```

---

### 2. `POST /api/todos`

#### 📄 Description:

Create a new todo item.

#### 📥 Request Body:

```json
{
  "task": "New Task Name"
}
```


#### 🧠 Code:

```ts
export async function POST(req: Request) {
  const { task } = await req.json();
  const newTodo: Todo = {
    id: Date.now(),
    task,
    completed: false,
  };
  todos.push(newTodo);
  return NextResponse.json(newTodo);
}
```
#### ✅ Response:

Returns the newly created `Todo` object.

#### 📦 Sample Response:

```json
{
  "id": 1694123123,
  "task": "New Task Name",
  "completed": false
}
```

---

### 3. `PUT /api/todos`

#### 📄 Description:

Update an existing todo (text or completion status).

#### 📥 Request Body:

```json
{
  "id": 1,
  "task": "Updated Task",
  "completed": true
}
```


#### 🧠 Code:

```ts
export async function PUT(req: Request) {
  const { id, task, completed } = await req.json();
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, task, completed } : todo
  );
  return NextResponse.json({ message: 'Todo updated' });
}
```
#### ✅ Response:

```json
{ "message": "Todo updated" }
```

---

### 4. `DELETE /api/todos`

#### 📄 Description:

Delete a todo item by its `id`.

#### 📥 Request Body:

```json
{
  "id": 1
}
```


#### 🧠 Code:

```ts
export async function DELETE(req: Request) {
  const { id } = await req.json();
  todos = todos.filter((todo) => todo.id !== id);
  return NextResponse.json({ message: 'Todo deleted' });
}
```
#### ✅ Response:

```json
{ "message": "Todo deleted" }
```

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
