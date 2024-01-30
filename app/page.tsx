// app/page.tsx

import { revalidatePath } from "next/cache";

import { AuthGetCurrentUserServer, cookiesClient } from "@/utils/amplify-utils";

import Logout from "@/components/Logout";

async function App() {
  const user = await AuthGetCurrentUserServer();
  const { data: todos } = await cookiesClient.models.Todo.list();

  async function addTodo(data: FormData) {
    "use server";
    const title = data.get("title") as string;
    await cookiesClient.models.Todo.create({
      content: title,
      isDone: false,
    });
    revalidatePath("/");
  }

  return (
    <>
      <h1>Hello, Amplify 👋</h1>
      {user && <Logout />}
      <form action={addTodo}>
        <input type="text" name="title" />
        <button type="submit">Add Todo</button>
      </form>

      <ul>
        {todos && todos.map((todo) => <li key={todo.id}>{todo.content}</li>)}
      </ul>
    </>
  );
}

export default App;