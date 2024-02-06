import Layout from "@/components/layouts/Layout";
import { useRouter } from "next/router";

export type Commitment = {
  id: number;
  title: string;
};

export default function MeetingsPage() {
  const router = useRouter();

  return (
    <Layout
      title="Commitments"
      addButton={{
        label: "New",
        onClick: () => router.push("/commitments/new"),
      }}
    >
      Items come here
    </Layout>
  );
}
