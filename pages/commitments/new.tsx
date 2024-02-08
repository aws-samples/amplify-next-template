import { type Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import Layout from "@/components/layouts/Layout";
import { useState } from "react";
import { flow, map } from "lodash/fp";

const client = generateClient<Schema>();

type ImportDataType = {
  notionId: number;
  idea: string;
  context: "work" | "hobby" | "family";
  appetite: "small" | "big";
  hours?: number;
  problem: string;
  solution: string;
  risks: string;
  noGos: string;
  createdOn: string;
};

type MapFunction<T, R> = (record: T) => R;

const showData = <T, R>(mapFn: MapFunction<T, R>, data: T[]) =>
  flow(map(mapFn), JSON.stringify)(data);

export default function NewCommitmentPage() {
  const [title, setTitle] = useState("New Commitment");
  const [cycle, setCycle] = useState<Schema["Cycle"][]>([]);
  const [db, setDb] = useState<Schema["Commitments"][]>([]);
  const [importData, setImportData] = useState("[]");

  client.models.Cycle.list().then(({ data }) => setCycle(data));

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  client.models.Commitments.list().then(({ data }) => {
    setDb(data);
  });

  const createRecord = async ({ ...rest }: ImportDataType) => {
    const { data: newRecord, errors } = await client.models.Commitments.create({
      status: "inprogress",
      cycle: cycle[0],
      ...rest,
    });
    console.log("New record", newRecord, "Errors", errors);
    return newRecord;
  };

  const handleImportClick = () => {
    const newData = JSON.parse(importData) as ImportDataType[];
    console.log(
      "Data to be created:",
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
        <strong>Cycle</strong>
        {showData<Schema["Cycle"], { id: string }>(({ id }) => ({ id }), cycle)}
      </div>
      <div>
        <strong>Commitments</strong>
        {showData<Schema["Commitments"], any>(
          ({ idea, notionId }) => ({ idea, notionId }),
          db
        )}
      </div>
    </Layout>
  );
}
