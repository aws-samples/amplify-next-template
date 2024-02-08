import { type Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import Layout from "@/components/layouts/Layout";
import { useState } from "react";
import { flow, map } from "lodash/fp";
// import {
//   ImportAccountData,
//   createAccount,
// } from "@/components/imports/accounts";
import { createSixWeekCycle } from "@/components/imports/six-week-cycle";

const client = generateClient<Schema>();

type ImportProjectDataType = {
  notionId: number;
  project: string;
  customerIds?: number[];
  commitmentIds?: number[];
  done?: boolean;
  doneOn?: string;
  dueOn?: string;
  onHoldTill?: string;
  createdAt: string;
  myNextActions?: string;
  nextActionsOfOthers?: string;
  context: string;
};

type MapFunction<T, R> = (record: T) => R;

const showData = <T, R>(mapFn: MapFunction<T, R>, data: T[]) =>
  flow(map(mapFn), JSON.stringify)(data);

export default function NewCommitmentPage() {
  const [title, setTitle] = useState("New Commitment");
  const [sixWeekCycle, setSixWeekCycle] = useState<Schema["SixWeekCycle"][]>(
    []
  );
  const [sixWeekBatch, setSixWeekBatch] = useState<Schema["SixWeekBatch"][]>(
    []
  );
  const [accounts, setAccounts] = useState<Schema["Account"][]>([]);
  // const [projects, setProjects] = useState<Schema["Projects"][]>([]);
  const [importData, setImportData] = useState("[]");
  const [logData, setLogData] = useState<string[]>([]);

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  client.models.Account.list().then(({ data }) => setAccounts(data));
  client.models.SixWeekCycle.list().then(({ data }) => setSixWeekCycle(data));
  client.models.SixWeekBatch.list().then(({ data }) => setSixWeekBatch(data));
  // client.models.Projects.list().then(({ data }) => setProjects(data));

  const handleImportClick = () => {
    // const newData = JSON.parse(importData) as ImportAccountData[];
    setLogData([]);
    createSixWeekCycle(logData, setLogData);
  };

  return (
    <Layout title={title} drawBackBtn onTitleChange={handleTitleChange}>
      <textarea
        value={importData}
        onChange={(event) => setImportData(event.target.value)}
      />
      <button onClick={handleImportClick}>Import Data</button>
      <div>
        <strong>Accounts</strong>
        {showData<Schema["Account"], any>(({ name }) => name, accounts)}
        <strong># of records</strong>
        {accounts.length}
      </div>
      <div>
        <strong>Six Week Cycles</strong>
        {showData<Schema["SixWeekCycle"], any>(
          ({ name }) => name,
          sixWeekCycle
        )}
        <strong># of records</strong>
        {sixWeekCycle.length}
      </div>
      <div>
        <strong>Six Week Batches</strong>
        {showData<Schema["SixWeekBatch"], any>(
          ({ idea }) => idea,
          sixWeekBatch
        )}
        <strong># of records</strong>
        {sixWeekBatch.length}
      </div>
      {/* <div>
        <strong>Projects</strong>
        {showData<Schema["Projects"], any>(({ project }) => project, projects)}
        <strong># of records</strong>
        {projects.length}
      </div> */}
      <div>
        <strong>Log Data:</strong>
      </div>
      <div>
        {logData.map((line, idx) => (
          <div key={idx}>{line}</div>
        ))}
      </div>
    </Layout>
  );
}
