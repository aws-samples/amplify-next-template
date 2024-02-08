import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rules below
specify that owners, authenticated via your Auth resource can "create",
"read", "update", and "delete" their own records. Public users,
authenticated via an API key, can only "read" records.
=========================================================================*/

const schema = a.schema({
  Context: a.enum(["family", "hobby", "work"]),
  Account: a
    .model({
      owner: a.string().authorization([a.allow.owner().to(["read", "delete"])]),
      notionId: a.integer().required(),
      name: a.string().required(),
      introduction: a.string(),
      subsidiaries: a.hasMany("Account"),
      projects: a.manyToMany("Projects", { relationName: "AccountProjects" }),
      controller: a.belongsTo("Account"),
    })
    .authorization([a.allow.owner()]),
  SixWeekCycle: a
    .model({
      owner: a.string().authorization([a.allow.owner().to(["read", "delete"])]),
      name: a.string(),
      startDate: a.date(),
      batches: a.hasMany("SixWeekBatch"),
    })
    .authorization([a.allow.owner()]),
  SixWeekBatch: a
    .model({
      owner: a.string().authorization([a.allow.owner().to(["read", "delete"])]),
      notionId: a.integer().required(),
      idea: a.string(),
      status: a.enum([
        "idea",
        "appetite",
        "inprogress",
        "declined",
        "aborted",
        "finished",
      ]),
      sixWeekCycle: a.belongsTo("SixWeekCycle"),
      context: a.ref("Context"),
      appetite: a.enum(["big", "small"]),
      hours: a.integer(),
      problem: a.string(),
      solution: a.string(),
      risks: a.string(),
      noGos: a.string(),
      projects: a.manyToMany("Projects", {
        relationName: "SixWeekBatchProjects",
      }),
      createdOn: a.datetime(),
    })
    .authorization([a.allow.owner()]),
  Projects: a
    .model({
      owner: a.string().authorization([a.allow.owner().to(["read", "delete"])]),
      notionId: a.integer().required(),
      project: a.string(),
      done: a.boolean(),
      doneOn: a.date(),
      dueOn: a.date(),
      onHoldTill: a.date(),
      createdOnDay: a.date(),
      myNextActions: a.string(),
      othersNextActions: a.string(),
      context: a.ref("Context"),
      accounts: a.manyToMany("Account", { relationName: "AccountProjects" }),
      batches: a.manyToMany("SixWeekBatch", {
        relationName: "SixWeekBatchProjects",
      }),
    })
    .authorization([a.allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
