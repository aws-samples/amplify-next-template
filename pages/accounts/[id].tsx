import Layout from "@/components/layouts/Layout";
import { useRouter } from "next/router";
import { FC } from "react";

type AccountDetailPageProps = {};
const AccountDetailPage: FC<AccountDetailPageProps> = (props) => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <Layout title="Accounts" sectionName="Account" recordName={undefined}>
      WIP {id as string}
    </Layout>
  );
};
export default AccountDetailPage;
