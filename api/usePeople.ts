import { type Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { handleApiErrors } from "./globals";
import useSWR from "swr";
import { Person, mapPerson } from "./usePerson";
const client = generateClient<Schema>();

const fetchPeople = async () => {
  const { data, errors } = await client.models.Person.list({ limit: 800 });
  if (errors) throw errors;
  return data.map(mapPerson);
};

const usePeople = () => {
  const {
    data: people,
    error: errorPeople,
    isLoading: loadingPeople,
    mutate: mutatePeople,
  } = useSWR("/api/people", fetchPeople);

  const createPerson = async (name: string) => {
    const newPerson: Person = {
      id: crypto.randomUUID(),
      name,
    };
    const updated = [...(people || []), newPerson];
    mutatePeople(updated, false);

    const { data, errors } = await client.models.Person.create(newPerson);
    if (errors) handleApiErrors(errors, "Error creating person");
    mutatePeople(updated);
    return data.id;
  };

  return { people, errorPeople, loadingPeople, createPerson };
};

export default usePeople;
