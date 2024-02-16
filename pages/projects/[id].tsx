import Layout from "@/components/layouts/Layout";
import { useRouter } from "next/router";
import { FC } from "react";

type ProjectDetailPageProps = {};
const ProjectDetailPage: FC<ProjectDetailPageProps> = (props) => {
  const router = useRouter();
  const { id } = router.query;
  return <Layout title="Project">WIP {id as string}</Layout>;
};
export default ProjectDetailPage;
