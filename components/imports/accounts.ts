import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/amplify/data/resource";
const client = generateClient<Schema>();

export type ImportAccountData = {
  notionId: number;
  name: string;
  controllerId?: number;
  description: string;
};

export const createAccount =
  (accounts: Schema["Account"][]) =>
  async ({ description, controllerId, ...rest }: ImportAccountData) => {
    const exists = accounts.find(({ notionId }) => notionId == rest.notionId);
    if (exists) {
      console.log("Record exists already", rest.name, exists.name);
      return exists;
    } else {
      if (!controllerId) {
        console.log("Just create the record", rest.name);
        const { data: newData, errors } = await client.models.Account.create({
          introduction: description,
          ...rest,
        });
        console.log("New record", newData, "Errors", errors);
        return newData;
      } else {
        const controller = accounts.find(
          ({ notionId }) => notionId === controllerId
        );
        if (controller) {
          console.log("To be Created", rest, controller);
          const { data: newData, errors } = await client.models.Account.create({
            controller,
            introduction: description,
            ...rest,
          });
          console.log("New record", newData, "Errors", errors);
          return newData;
        } else {
          console.log(
            "Controller does not exist yet",
            rest.name,
            controllerId,
            controller
          );
        }
      }
    }
  };
