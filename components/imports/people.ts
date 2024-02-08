import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/amplify/data/resource";
const client = generateClient<Schema>();

export type ImportPeopleData = {
  notionId: number;
  name: string;
  howToSay: string;
  birthday: string;
  dateOfDeath: string;
  createdOn: string;
};

export const createPerson =
  (people: Schema["Person"][]) =>
  async ({ ...rest }: ImportPeopleData) => {
    const exists = people.find(({ notionId }) => notionId == rest.notionId);
    if (exists) {
      console.log("Record exists already", rest.name, exists.name);
      return exists;
    } else {
      console.log("To be created", rest.name);
      const { data: newPerson, errors } = await client.models.Person.create({
        ...rest,
      });
      console.log("New record", newPerson, "Errors", errors);
      return newPerson;
    }
  };
