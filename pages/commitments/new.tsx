import { type Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import Layout from "@/components/layouts/Layout";
import { useState } from "react";
import { flow } from "lodash/fp";
import {
  addDaysToDate,
  getCurrentDate,
  toISODateString,
} from "@/helpers/functional";

const client = generateClient<Schema>();

const get8WeeksAgo = flow(
  getCurrentDate,
  addDaysToDate(-8 * 7),
  toISODateString
);

export default function NewCommitmentPage() {
  const [title, setTitle] = useState("New Commitment");
  const [db, setDb] = useState<Schema["Cycle"][]>([]);

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  client.models.Cycle.list({
    filter: {
      startDate: {
        ge: get8WeeksAgo(),
      },
    },
  }).then(({ data }) => setDb(data));

  const createCycle = async () => {
    const { data, errors } = await client.models.Cycle.create({
      name: "Just a test",
      startDate: "2024-01-22",
    });
    console.log(data, errors);
  };

  return (
    <Layout title={title} drawBackBtn onTitleChange={handleTitleChange}>
      <button onClick={createCycle}>Create Cycle</button>
      <div>{get8WeeksAgo()}</div>
      <div>{JSON.stringify(db)}</div>

      {/* <CommitmentDetails title={title} /> */}
    </Layout>
  );
}
