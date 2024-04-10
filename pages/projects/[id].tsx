import useProject from "@/api/useProject";
import useProjectAccounts from "@/api/useProjectAccounts";
import useProjectActivities from "@/api/useProjectActivities";
import ActivityComponent from "@/components/activities/activity";
import MainLayout from "@/components/layouts/MainLayout";
import AccountName from "@/components/ui-elements/tokens/account-name";
import { useRouter } from "next/router";
import { useState } from "react";

const ProjectDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const projectId = Array.isArray(id) ? id[0] : id;
  const { project, loadingProject } = useProject(projectId);
  const { projectActivities, createProjectActivity } =
    useProjectActivities(projectId);
  const { projectAccountIds } = useProjectAccounts(projectId);
  const [newActivityId, setNewActivityId] = useState(crypto.randomUUID());

  const saveNewActivity = async (notes?: string) => {
    const data = await createProjectActivity(newActivityId, notes);
    setNewActivityId(crypto.randomUUID());
    return data;
  };

  return (
    <MainLayout
      title={project?.project}
      recordName={project?.project}
      sectionName="Projects"
    >
      {loadingProject && "Loading project..."}
      {project?.dueOn && (
        <div>Due On: {project.dueOn.toLocaleDateString()}</div>
      )}
      {project?.doneOn && (
        <div>Done On: {project.doneOn.toLocaleDateString()}</div>
      )}
      {(projectAccountIds?.length || 0) > 0 && "Accounts: "}
      {projectAccountIds?.map(
        ({ accountId }) =>
          accountId && <AccountName key={accountId} accountId={accountId} />
      )}
      {[
        { id: newActivityId },
        ...(projectActivities?.filter((pa) => pa.id !== newActivityId) || []),
      ].map((activity) => (
        <ActivityComponent
          key={activity.id}
          activityId={activity.id}
          showDates
          showMeeting
          createActivity={
            activity.id === newActivityId ? saveNewActivity : undefined
          }
        />
      ))}
    </MainLayout>
  );
};
export default ProjectDetailPage;
