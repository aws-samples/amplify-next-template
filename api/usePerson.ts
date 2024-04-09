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

const fetchPerson = (personId: string) => () =>
  client.models.Person.get({ id: personId }).then(({ data }) =>
    mapPerson(data)
  );

const usePerson = (personId?: string) => {
  const {
    data: person,
    error: errorPerson,
    isLoading: loadingPerson,
    mutate: mutatePerson,
  } = useSWR(`/api/person/${personId}`, fetchPerson(personId || ""));
  return {
    person,
    errorPerson,
    loadingPerson,
  };
};

export default usePerson;
