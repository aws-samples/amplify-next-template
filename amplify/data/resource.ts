import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Context: a.enum(["family", "hobby", "work"]),
  CurrentContext: a
    .model({
      owner: a.string().authorization([a.allow.owner().to(["read", "delete"])]),
      context: a.ref("Context").required(),
    })
    .authorization([a.allow.owner()]),
  DayPlan: a
    .model({
      owner: a.string().authorization([a.allow.owner().to(["read", "delete"])]),
      day: a.date().required(),
      dayGoal: a.string().required(),
      context: a.ref("Context"),
      done: a.boolean(),
      tasks: a.hasMany("NonProjectTask"),
      projectTasks: a.hasMany("DayProjectTask"),
      todos: a.hasMany("DayPlanTodo"),
    })
    .authorization([a.allow.owner()]),
  DayPlanTodo: a
    .model({
      owner: a.string().authorization([a.allow.owner().to(["read", "delete"])]),
      todo: a.string().required(),
      done: a.boolean(),
      doneOn: a.date(),
      dayPlan: a.belongsTo("DayPlan"),
      project: a.belongsTo("Projects"),
      context: a.ref("Context").required(),
    })
    .authorization([a.allow.owner()]),
  DayProjectTask: a
    .model({
      owner: a.string().authorization([a.allow.owner().to(["read", "delete"])]),
      task: a.string().required(),
      done: a.boolean(),
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
      context: a.ref("Context"),
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
      context: a.ref("Context"),
      topic: a.string().required(),
      meetingOn: a.datetime(),
      participants: a.manyToMany("Person", {
        relationName: "MeetingParticipant",
      }),
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
      myNextActions: a.string(),
      othersNextActions: a.string(),
      context: a.ref("Context").required(),
      accounts: a.manyToMany("Account", { relationName: "AccountProjects" }),
      batches: a.manyToMany("SixWeekBatch", {
        relationName: "SixWeekBatchProjects",
      }),
      activities: a.manyToMany("Activity", { relationName: "ProjectActivity" }),
      dayTasks: a.hasMany("DayProjectTask"),
      todos: a.hasMany("DayPlanTodo"),
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
