import Layout from "@/components/layouts/Layout";
import { useState } from "react";

export default function NewCommitmentPage() {
  const [title, setTitle] = useState("New commitment");

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  return (
    <Layout
      title="New Commitment"
      drawBackBtn
      onTitleChange={handleTitleChange}
    >
      {title}
    </Layout>
  );
}
