// pages/index.tsx
import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

// generate your data client using the Schema from your backend
const client = generateClient<Schema>();

export default function HomePage() {
  const [todos, setTodos] = useState<Schema["Todo"][]>([]);

  async function listTodos() {
    // fetch all todos
    const { data } = await client.models.Todo.list();
    setTodos(data);
  }

  useEffect(() => {
    const sub = client.models.Todo.observeQuery().subscribe(({ items }) =>
      setTodos([...items])
    );
    return () => sub.unsubscribe();
  }, []);

  return (
    <main>
      <h1>Hello, Amplify 👋</h1>
      <button
        onClick={async () => {
          const { errors, data: newTodo } = await client.models.Todo.create({
            content: window.prompt("title"),
            done: false,
          });
          console.log(errors, newTodo);
        }}
      >
        Create{" "}
      </button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.content}</li>
        ))}
      </ul>
    </main>
  );
}
