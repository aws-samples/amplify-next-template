import { type Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import Layout from "@/components/layouts/Layout";
import { useState } from "react";
import { flow, map } from "lodash/fp";

const client = generateClient<Schema>();

type ImportDataType = {
  notionId: number;
  name: string;
  controllerId: number;
  description: string;
};

type MapFunction<T, R> = (record: T) => R;

const showData = <T, R>(mapFn: MapFunction<T, R>, data: T[]) =>
  flow(map(mapFn), JSON.stringify)(data);

export default function NewCommitmentPage() {
  const [title, setTitle] = useState("New Commitment");
  const [customers, setCustomers] = useState<Schema["Customers"][]>([]);
  const [importData, setImportData] = useState("[]");

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  client.models.Customers.list().then(({ data }) => setCustomers(data));

  const createRecord = async ({
    description,
    controllerId,
    ...rest
  }: ImportDataType) => {
    const exists = customers.find(({ notionId }) => notionId == rest.notionId);
    if (exists) {
      console.log("Customer exists already", rest.name, exists.name);
      return exists;
    } else {
      if (!controllerId) {
        const { data: newRecord, errors } =
          await client.models.Customers.create({
            introduction: description,
            ...rest,
          });
        console.log("New record", newRecord, "Errors", errors);
        return newRecord;
      } else {
        const controller = customers.find(
          ({ notionId }) => notionId == controllerId
        );
        if (!controller) {
          console.log("Controller is not created yet", controllerId, rest.name);
        } else {
          const { data: newRecord, errors } =
            await client.models.Customers.create({
              introduction: description,
              controller,
              ...rest,
            });
          console.log("New record", newRecord, "Errors", errors);
          return newRecord;
        }
      }
    }
  };

  const handleImportClick = () => {
    const newData = JSON.parse(importData) as ImportDataType[];
    console.log(
      "DATA TO BE CREATED:",
      newData,
      "# of Records:",
      newData.length
    );
    console.log("Results", newData.map(createRecord));
  };

  return (
    <Layout title={title} drawBackBtn onTitleChange={handleTitleChange}>
      <textarea
        value={importData}
        onChange={(event) => setImportData(event.target.value)}
      />
      <button onClick={handleImportClick}>Import Data</button>
      <div>
        <strong>Customers</strong>
        {showData<Schema["Customers"], any>(
          ({ name }) => ({
            name,
          }),
          customers
        )}
      </div>
      <div>
        <strong># of records</strong>
        {customers.length}
      </div>
    </Layout>
  );
}
