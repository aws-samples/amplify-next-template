import { type Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import useSWR from "swr";
const client = generateClient<Schema>();

export type Person = {
  id: string;
  name: string;
};

export const mapPerson = ({ id, name }: Schema["Person"]): Person => ({
  id,
  name,
});

const fetchPerson = (personId?: string) => async () => {
  if (!personId) return;
  const { data, errors } = await client.models.Person.get({ id: personId });
  if (errors) throw errors;
  return mapPerson(data);
};

const usePerson = (personId?: string) => {
  const {
    data: person,
    error: errorPerson,
    isLoading: loadingPerson,
  } = useSWR(`/api/person/${personId}`, fetchPerson(personId));
  return {
    person,
    errorPerson,
    loadingPerson,
  };
};

export default usePerson;
