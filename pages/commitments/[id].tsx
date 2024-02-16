import Layout from "@/components/layouts/Layout";
import { useRouter } from "next/router";
import { FC } from "react";

type CommitmentDetailPageProps = {};
const CommitmentDetailPage: FC<CommitmentDetailPageProps> = (props) => {
  const router = useRouter();
  const { id } = router.query;
  return <Layout title="Commitment">WIP {id as string}</Layout>;
};
export default CommitmentDetailPage;
