import Layout from "@/components/layouts/Layout";
import { useState } from "react";
import { createMeetings } from "@/components/imports/meetings";

export default function NewCommitmentPage() {
  const [title, setTitle] = useState("New Commitment");
  const [importData, setImportData] = useState("[]");

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  const handleImportClick = () => {
    createMeetings(importData);
  };

  return (
    <Layout title={title} drawBackBtn onTitleChange={handleTitleChange}>
      <textarea
        value={importData}
        onChange={(event) => setImportData(event.target.value)}
      />
      <button onClick={handleImportClick}>Import Meeting Data</button>
    </Layout>
  );
}
