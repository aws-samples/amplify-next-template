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
  DayPlan: a
    .model({
      owner: a.string().authorization([a.allow.owner().to(["read", "delete"])]),
      notionId: a.integer(),
      day: a.date().required(),
      dayGoal: a.string().required(),
      done: a.boolean(),
      tasks: a.hasMany("NonProjectTask"),
      projectTasks: a.hasMany("DayProjectTask"),
    })
    .authorization([a.allow.owner()]),
  DayProjectTask: a
    .model({
      owner: a.string().authorization([a.allow.owner().to(["read", "delete"])]),
      task: a.string().required(),
      done: a.boolean(),
      timeInvested: a.integer(),
      dayPlan: a.belongsTo("DayPlan"),
      projects: a.belongsTo("Projects"),
    })
    .authorization([a.allow.owner()]),
  NonProjectTask: a
    .model({
      owner: a.string().authorization([a.allow.owner().to(["read", "delete"])]),
      notionId: a.integer(),
      dayPlan: a.belongsTo("DayPlan"),
      task: a.string().required(),
      context: a.ref("Context").required(),
      done: a.boolean(),
    })
    .authorization([a.allow.owner()]),
  Activity: a
    .model({
      owner: a.string().authorization([a.allow.owner().to(["read", "delete"])]),
      notionId: a.integer(),
      notes: a.string(),
      forProjects: a.manyToMany("Projects", {
        relationName: "ProjectActivity",
      }),
      forMeeting: a.belongsTo("Meeting"),
      finishedOn: a.datetime(),
    })
    .authorization([a.allow.owner()]),
  Meeting: a
    .model({
      owner: a.string().authorization([a.allow.owner().to(["read", "delete"])]),
      notionId: a.integer(),
      topic: a.string().required(),
      meetingOn: a.datetime(),
      participants: a.manyToMany("Person", {
        relationName: "MeetingParticipant",
      }),
      projectsDiscussed: a.manyToMany("Projects", {
        relationName: "MeetingDiscussedProject",
      }),
      newProjects: a.hasMany("Projects"),
      timeInvested: a.integer(),
      activities: a.hasMany("Activity"),
    })
    .authorization([a.allow.owner()]),
  Person: a
    .model({
      owner: a.string().authorization([a.allow.owner().to(["read", "delete"])]),
      notionId: a.integer(),
      name: a.string().required(),
      howToSay: a.string(),
      birthday: a.date(),
      dateOfDeath: a.date(),
      createdOn: a.date(),
      meetings: a.manyToMany("Meeting", { relationName: "MeetingParticipant" }),
      accountRoles: a.hasMany("PersonAccount"),
    })
    .authorization([a.allow.owner()]),
  PersonAccount: a
    .model({
      owner: a.string().authorization([a.allow.owner().to(["read", "delete"])]),
      role: a.string(),
      startDate: a.date(),
      endDate: a.date(),
      person: a.belongsTo("Person"),
      company: a.belongsTo("Account"),
    })
    .authorization([a.allow.owner()]),
  Account: a
    .model({
      owner: a.string().authorization([a.allow.owner().to(["read", "delete"])]),
      notionId: a.integer(),
      name: a.string().required(),
      introduction: a.string(),
      subsidiaries: a.hasMany("Account"),
      projects: a.manyToMany("Projects", { relationName: "AccountProjects" }),
      controller: a.belongsTo("Account"),
      employees: a.hasMany("PersonAccount"),
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
      notionId: a.integer(),
      idea: a.string().required(),
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
      notionId: a.integer(),
      project: a.string().required(),
      done: a.boolean(),
      doneOn: a.date(),
      dueOn: a.date(),
      onHoldTill: a.date(),
      createdOnDay: a.date(),
      myNextActions: a.string(),
      othersNextActions: a.string(),
      context: a.ref("Context").required(),
      accounts: a.manyToMany("Account", { relationName: "AccountProjects" }),
      batches: a.manyToMany("SixWeekBatch", {
        relationName: "SixWeekBatchProjects",
      }),
      discussedInMeetings: a.manyToMany("Meeting", {
        relationName: "MeetingDiscussedProject",
      }),
      createdAtMeeting: a.belongsTo("Meeting"),
      activities: a.manyToMany("Activity", { relationName: "ProjectActivity" }),
      dayTasks: a.hasMany("DayProjectTask"),
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
