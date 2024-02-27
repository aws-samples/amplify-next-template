import Layout from "@/components/layouts/Layout";
import { useRouter } from "next/router";

export default function CommitmentsPage() {
  const router = useRouter();

  return (
    <Layout
      title="Commitments"
      sectionName="Commitments"
      addButton={{
        label: "New",
        onClick: () => router.push("/commitments/new"),
      }}
    >
      Items will come
    </Layout>
  );
}
