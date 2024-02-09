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

const searchPerson = async (notionId: number) => {
  const { data, errors } = await client.models.Person.list({
    limit: 1000,
    filter: { notionId: { eq: notionId } },
    selectionSet: ["notionId", "id"],
  });
  if (errors) console.log("Errors", errors);
  if (data.length > 1) {
    console.log(
      "NotionId",
      notionId,
      "Count",
      data.length,
      "IDs",
      data.map(({ id }) => id)
    );
    const { data: deleted } = await client.models.Person.delete({
      id: data[1].id,
    });
    console.log("Deleted", deleted.id);
  }
};

export const cleanUpPeople = (data: number[]) => data.map(searchPerson);

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
