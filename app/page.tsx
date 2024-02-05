// app/page.tsx

import { revalidatePath } from "next/cache";

import { AuthGetCurrentUserServer, cookiesClient } from "@/utils/amplify-utils";

import Logout from "@/components/Logout";

async function App() {
  const user = await AuthGetCurrentUserServer();
  const { data: gods } = await cookiesClient.models.God.list();
  async function addGod(data: FormData) {
    "use server";
    const name = data.get("name") as string;
    const title = data.get("title") as string;
    const imageUrl = data.get("imageUrl") as string;
    console.log(`data: ${JSON.stringify(gods)}`)
    const result = await cookiesClient.models.God.create({
      godId: Array.isArray(gods) ? gods.length : 0,
      name: name,
      title: title,
      imageUrl: imageUrl
    });
    console.log(JSON.stringify(result))
    revalidatePath("/");
  }

  return (
    <>
      <h1>Hello, Amplify 👋</h1>
      {user && <Logout />}
      <form action={addGod}>
        <input type="text" name="name" />
        <input type="text" name="title" />
        <input type="text" name="imageUrl" />
        <button type="submit">Add God</button>
      </form>

      <ul>
        {(gods && gods.length > 0) && gods.map((god) => <li key={god.godId}>{god.name}</li>)}
      </ul>
    </>
  );
}

export default App;