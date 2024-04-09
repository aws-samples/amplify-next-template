import { type Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { handleApiErrors } from "./globals";
import { Context } from "@/contexts/ContextContext";
import useSWR from "swr";
import { sortByDate } from "@/helpers/functional";
const client = generateClient<Schema>();

export type DayPlan = {
  id: string;
  day: string;
  dayGoal: string;
  done?: boolean;
};

const mapDayPlan = ({
  id,
  day,
  dayGoal,
  done,
}: Schema["DayPlan"]): DayPlan => ({
  id,
  day,
  dayGoal,
  done: !!done,
});

const fetchDayPlans = (context?: Context) => () =>
  client.models.DayPlan.list({
    filter: { done: { ne: "true" }, context: { eq: context } },
  }).then(({ data }) =>
    data.map(mapDayPlan).sort((a, b) => sortByDate(true)([a.day, b.day]))
  );

const useDayPlans = (context?: Context) => {
  const {
    data: dayPlans,
    error: errorDayPlans,
    isLoading: loadingDayPlans,
    mutate,
  } = useSWR(`/api/dayplans/${context}`, fetchDayPlans(context));

  const createDayPlan = async (
    day: string,
    dayGoal: string,
    context?: Context
  ) => {
    if (!context) return;
    const newDayPlan: DayPlan = {
      id: crypto.randomUUID(),
      day,
      dayGoal,
      done: false,
    };
    const updatedDayPlans = [newDayPlan, ...(dayPlans || [])];
    mutate(updatedDayPlans, false);
    const { errors } = await client.models.DayPlan.create({
      ...newDayPlan,
      context,
    });
    if (errors) handleApiErrors(errors, "Error creating day plan");
    mutate(updatedDayPlans);
  };

  const completeDayPlan = async (dayPlanId: string) => {
    const updatedDayPlans = dayPlans?.filter(({ id }) => id !== dayPlanId);
    mutate(updatedDayPlans, false);
    const { errors } = await client.models.DayPlan.update({
      id: dayPlanId,
      done: true,
    });
    if (errors) handleApiErrors(errors, "Error completing day plan");
    mutate(updatedDayPlans);
  };

  return {
    dayPlans,
    errorDayPlans,
    loadingDayPlans,
    createDayPlan,
    completeDayPlan,
  };
};

export default useDayPlans;
