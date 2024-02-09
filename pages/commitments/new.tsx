import Layout from "@/components/layouts/Layout";
import { useState } from "react";
import { createDayPlans } from "@/components/imports/dayplans";

export default function NewCommitmentPage() {
  const [title, setTitle] = useState("New Commitment");
  const [importDayPlans, setImportDayPlans] = useState("[]");
  const [importNonProjectTasks, setImportNonProjectTasks] = useState("[]");
  const [importProjectTasks, setImportProjectTasks] = useState("[]");

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  const handleImportClick = () => {
    createDayPlans(importDayPlans, importNonProjectTasks, importProjectTasks);
  };

  return (
    <Layout title={title} drawBackBtn onTitleChange={handleTitleChange}>
      <div>
        <strong>Day Plans</strong>
      </div>
      <textarea
        value={importDayPlans}
        onChange={(event) => setImportDayPlans(event.target.value)}
      />
      <div>
        <strong>Non Project Tasks</strong>
      </div>
      <textarea
        value={importNonProjectTasks}
        onChange={(event) => setImportNonProjectTasks(event.target.value)}
      />
      <div>
        <strong>Project Tasks</strong>
      </div>
      <textarea
        value={importProjectTasks}
        onChange={(event) => setImportProjectTasks(event.target.value)}
      />
      <button onClick={handleImportClick}>Import Day Plan Data</button>
    </Layout>
  );
}
