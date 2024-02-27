const environmentId = {
  // prod: "th6y75krqvgsndwxutb6jhqdwa",
  dev: "uevvie4lgje2pegsontu5uvbwa",
  branch: "bkftzggnsvglrdv7o4nnb3acsa",
  newDev: "7l2zmyqtdzbwxf2mrkhxpfaj6u",
};

const userPools = {
  prod: {
    Id: "us-east-1_25KXwbG0H",
    ownerId: "1dadd52b-933b-47b1-9bce-6d4d01483e56",
  },
  dev: {
    Id: "us-east-1_vWLOtzn8z",
    ownerId: "64a8e4d8-c061-70b2-8452-7aa315ed9cfe",
  },
  newDev: {
    Id: "us-east-1_MiqZpykWl",
    ownerId: "84d864b8-30a1-7024-98ac-709d2fde2fbb",
  },
};

const tableNames = {
  Account: "Account",
  AccountProjects: "AccountProjects",
  Activity: "Activity",
  CurrentContext: "CurrentContext",
  DayProjectTask: "DayProjectTask",
  Meeting: "Meeting",
  MeetingDiscussedProject: "MeetingDiscussedProject",
  MeetingParticipant: "MeetingParticipant",
  NonProjectTask: "NonProjectTask",
  Person: "Person",
  PersonAccount: "PersonAccount",
  ProjectActivity: "ProjectActivity",
  Projects: "Projects",
  SixWeekBatch: "SixWeekBatch",
  SixWeekBatchProjects: "SixWeekBatchProjects",
  SixWeekCycle: "SixWeekCycle",
  DayPlan: "DayPlan",
};

const getTable = (tableName, env) =>
  `${tableNames[tableName]}-${environmentId[env]}-NONE`;

module.exports = { getTable, userPools };
