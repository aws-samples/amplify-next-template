import { type Schema } from "@/amplify/data/resource";
import Layout from "@/components/layouts/Layout";
import { generateClient } from "aws-amplify/data";
import { useRouter } from "next/router";
import { useState } from "react";

const client = generateClient<Schema>();

export default function CommitmentsPage() {
  // const [commitments, setCommitments] = useState<Schema["Commitments"][]>([]);
  const router = useRouter();

  // client.models.Commitments.list().then(({ data }) => {
  //   setCommitments(data);
  // });

  return (
    <Layout
      title="Commitments"
      addButton={{
        label: "New",
        onClick: () => router.push("/commitments/new"),
      }}
    >
      Items will come
      {/* <ListView listItems={} /> */}
      {/* <div>{JSON.stringify(commitments.map(({ context }) => context))}</div> */}
    </Layout>
  );
}
