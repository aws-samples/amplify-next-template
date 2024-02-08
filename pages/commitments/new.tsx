import { type Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import Layout from "@/components/layouts/Layout";
import { useState } from "react";
import { flow, map } from "lodash/fp";
import {
  ImportProjectData,
  createProject,
} from "@/components/imports/projects";

const client = generateClient<Schema>();

type MapFunction<T, R> = (record: T) => R;

const showData = <T, R>(mapFn: MapFunction<T, R>, data: T[]) =>
  flow(map(mapFn), JSON.stringify)(data);

export default function NewCommitmentPage() {
  const [title, setTitle] = useState("New Commitment");
  const [sixWeekCycle, setSixWeekCycle] = useState<Schema["SixWeekCycle"][]>(
    []
  );
  const [sixWeekBatches, setSixWeekBatches] = useState<
    Schema["SixWeekBatch"][]
  >([]);
  const [accounts, setAccounts] = useState<Schema["Account"][]>([]);
  const [projects, setProjects] = useState<Schema["Projects"][]>([]);
  const [importData, setImportData] = useState("[]");

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  client.models.Account.list().then(({ data }) => setAccounts(data));
  client.models.SixWeekCycle.list().then(({ data }) => setSixWeekCycle(data));
  client.models.SixWeekBatch.list().then(({ data }) => setSixWeekBatches(data));
  client.models.Projects.list().then(({ data }) => setProjects(data));

  const handleImportClick = () => {
    console.log("PROJECTS CREATION STARTED...");
    const newData = JSON.parse(importData) as ImportProjectData[];
    newData.map(createProject(projects, accounts, sixWeekBatches));
  };

  return (
    <Layout title={title} drawBackBtn onTitleChange={handleTitleChange}>
      <textarea
        value={importData}
        onChange={(event) => setImportData(event.target.value)}
      />
      <button onClick={handleImportClick}>Import Project Data</button>
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
          sixWeekBatches
        )}
        <strong># of records</strong>
        {sixWeekBatches.length}
      </div>
      <div>
        <strong>Projects</strong>
        {showData<Schema["Projects"], any>(({ project }) => project, projects)}
        <strong># of records</strong>
        {projects.length}
      </div>
    </Layout>
  );
}
