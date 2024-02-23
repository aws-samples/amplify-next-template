const userPools = {
  prod: {
    Id: "us-east-1_25KXwbG0H",
    ownerId: "1dadd52b-933b-47b1-9bce-6d4d01483e56",
  },
  dev: {
    Id: "us-east-1_vWLOtzn8z",
    ownerId: "64a8e4d8-c061-70b2-8452-7aa315ed9cfe",
  },
};
const tables = {
  Account: {
    prod: "Account-th6y75krqvgsndwxutb6jhqdwa-NONE",
    dev: "Account-uevvie4lgje2pegsontu5uvbwa-NONE",
  },
  AccountProjects: {
    prod: "AccountProjects-th6y75krqvgsndwxutb6jhqdwa-NONE",
    dev: "AccountProjects-uevvie4lgje2pegsontu5uvbwa-NONE",
  },
  Activity: {
    prod: "Activity-th6y75krqvgsndwxutb6jhqdwa-NONE",
    dev: "Activity-uevvie4lgje2pegsontu5uvbwa-NONE",
  },
  CurrentContext: {
    prod: "CurrentContext-th6y75krqvgsndwxutb6jhqdwa-NONE",
    dev: "CurrentContext-uevvie4lgje2pegsontu5uvbwa-NONE",
  },
  DayProjectTask: {
    prod: "DayProjectTask-th6y75krqvgsndwxutb6jhqdwa-NONE",
    dev: "DayProjectTask-uevvie4lgje2pegsontu5uvbwa-NONE",
  },
  Meeting: {
    prod: "Meeting-th6y75krqvgsndwxutb6jhqdwa-NONE",
    dev: "Meeting-uevvie4lgje2pegsontu5uvbwa-NONE",
  },
  MeetingDiscussedProject: {
    prod: "MeetingDiscussedProject-th6y75krqvgsndwxutb6jhqdwa-NONE",
    dev: "MeetingDiscussedProject-uevvie4lgje2pegsontu5uvbwa-NONE",
  },
  MeetingParticipant: {
    prod: "MeetingParticipant-th6y75krqvgsndwxutb6jhqdwa-NONE",
    dev: "MeetingParticipant-uevvie4lgje2pegsontu5uvbwa-NONE",
  },
  NonProjectTask: {
    prod: "NonProjectTask-th6y75krqvgsndwxutb6jhqdwa-NONE",
    dev: "NonProjectTask-uevvie4lgje2pegsontu5uvbwa-NONE",
  },
  Person: {
    prod: "Person-th6y75krqvgsndwxutb6jhqdwa-NONE",
    dev: "Person-uevvie4lgje2pegsontu5uvbwa-NONE",
  },
  PersonAccount: {
    prod: "PersonAccount-th6y75krqvgsndwxutb6jhqdwa-NONE",
    dev: "PersonAccount-uevvie4lgje2pegsontu5uvbwa-NONE",
  },
  ProjectActivity: {
    prod: "ProjectActivity-th6y75krqvgsndwxutb6jhqdwa-NONE",
    dev: "ProjectActivity-uevvie4lgje2pegsontu5uvbwa-NONE",
  },
  Projects: {
    prod: "Projects-th6y75krqvgsndwxutb6jhqdwa-NONE",
    dev: "Projects-uevvie4lgje2pegsontu5uvbwa-NONE",
  },
  SixWeekBatch: {
    prod: "SixWeekBatch-th6y75krqvgsndwxutb6jhqdwa-NONE",
    dev: "SixWeekBatch-uevvie4lgje2pegsontu5uvbwa-NONE",
  },
  SixWeekBatchProjects: {
    prod: "SixWeekBatchProjects-th6y75krqvgsndwxutb6jhqdwa-NONE",
    dev: "SixWeekBatchProjects-uevvie4lgje2pegsontu5uvbwa-NONE",
  },
  SixWeekCycle: {
    prod: "SixWeekCycle-th6y75krqvgsndwxutb6jhqdwa-NONE",
    dev: "SixWeekCycle-uevvie4lgje2pegsontu5uvbwa-NONE",
  },
  DayPlan: {
    prod: "DayPlan-th6y75krqvgsndwxutb6jhqdwa-NONE",
    dev: "DayPlan-uevvie4lgje2pegsontu5uvbwa-NONE",
  },
};
module.exports = { tables, userPools };
