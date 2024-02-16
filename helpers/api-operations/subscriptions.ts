import { type Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { SubNextFunctionParam, SubscriptionFilter } from "../types/api";
import {
  Project,
  ProjectTask,
  NonProjectTask,
  Participant,
  Meeting,
  DayPlan,
  Activity,
} from "../types/data";
import { Context } from "@/components/navigation-menu/AppContext";
import {
  otherTasksSelectionSet,
  projectTasksSelectionSet,
  personSelectionSet,
  projectsSelectionSet,
  meetingsSelectionSet,
  dayplanSelectionSet,
  activitiesSelectionSet,
} from "../selection-sets";

const client = generateClient<Schema>();

export const projectsSubscription: SubscriptionFilter<
  Schema["Projects"],
  Project
> = (nextFn, filter) => {
  const query = { filter, selectionSet: projectsSelectionSet };
  const execFn = client.models.Projects.observeQuery;
  // @ts-expect-error
  const sub = execFn(query).subscribe({ next: nextFn });
  return sub;
};

export const dayplansSubscription: SubscriptionFilter<
  Schema["DayPlan"],
  DayPlan
> = (nextFn, filter) => {
  const query = { filter, selectionSet: dayplanSelectionSet };
  const execFn = client.models.DayPlan.observeQuery;
  // @ts-expect-error
  const sub = execFn(query).subscribe({ next: nextFn });
  return sub;
};

export const meetingsSubscription: SubscriptionFilter<
  Schema["Meeting"],
  Meeting
> = (nextFn, filter) => {
  const query = { filter, selectionSet: meetingsSelectionSet };
  const execFn = client.models.Meeting.observeQuery;
  // @ts-expect-error
  const sub = execFn(query).subscribe({ next: nextFn });
  return sub;
};

export const peopleSubscription: SubscriptionFilter<
  Schema["Person"],
  Participant
> = (nextFn, filter) => {
  const query = { filter, selectionSet: personSelectionSet };
  // @ts-expect-error
  const sub = client.models.Person.observeQuery(query).subscribe({
    next: nextFn,
  });
  return sub;
};

export const projectActivitySubscription: SubscriptionFilter<
  Schema["ProjectActivity"],
  { activity: Activity }
> = (nextFn, filter) => {
  const query = { filter, selectionSet: activitiesSelectionSet };
  const observeActivity = client.models.ProjectActivity.observeQuery;
  // @ts-expect-error
  const sub = observeActivity(query).subscribe({ next: nextFn });
  return sub;
};

export const tasksSubscription = (
  dayPlanId: string,
  context: Context,
  setProjectTasks: (items: ProjectTask[]) => void,
  setNonProjectTasks: (items: NonProjectTask[]) => void
) => {
  const projectTasksQuery = {
    filter: { dayPlanProjectTasksId: { eq: dayPlanId } },
    selectionSet: projectTasksSelectionSet,
  };
  const observeDayProjectTask = client.models.DayProjectTask.observeQuery;
  // @ts-expect-error
  const subProjectTasks = observeDayProjectTask(projectTasksQuery).subscribe({
    next: ({ items, isSynced }: SubNextFunctionParam<ProjectTask>) => {
      setProjectTasks([...(items || [])]);
    },
  });

  const otherTasksQuery = {
    filter: { dayPlanTasksId: { eq: dayPlanId }, context: { eq: context } },
    selectionSet: otherTasksSelectionSet,
  };
  const observeOtherTask = client.models.NonProjectTask.observeQuery;
  // @ts-expect-error
  const subOtherTasks = observeOtherTask(otherTasksQuery).subscribe({
    next: ({ items, isSynced }: SubNextFunctionParam<NonProjectTask>) => {
      setNonProjectTasks([...(items || [])]);
    },
  });

  return {
    unsubscribe: () => {
      subProjectTasks.unsubscribe();
      subOtherTasks.unsubscribe();
    },
  };
};
