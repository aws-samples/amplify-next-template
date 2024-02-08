import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/amplify/data/resource";
const client = generateClient<Schema>();

export type ImportPeopleData = {
  notionId: number;
  name: string;
  howToSay: string;
  birtday: string;
  dateOfDeath: string;
  createdOn: string;
};

export const cleanUpPeople = async (data: number[]) => {
  const results = await Promise.all(
    data.map(async (notionId) => {
      const { data } = await client.models.Person.list({
        filter: { notionId: { eq: notionId } },
      });
      return { notionId, results: data };
    })
  );
  console.log(results);
};

export const createPerson = async ({ birtday, ...rest }: ImportPeopleData) => {
  const { data: exists } = await client.models.Person.list({
    filter: { notionId: { eq: rest.notionId } },
  });
  if (exists.length > 0) {
    console.log("Record exists already", rest.name, exists.length);
    return exists;
  } else {
    console.log("To be created", rest.name);
    const { data: newPerson, errors } = await client.models.Person.create({
      birthday: birtday,
      ...rest,
    });
    console.log("New record", newPerson, "Errors", errors);
    return newPerson;
  }
};
