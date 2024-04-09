import useAccount from "@/api/useAccount";
import MainLayout from "@/components/layouts/MainLayout";
import { useRouter } from "next/router";
import { FC } from "react";

type AccountDetailPageProps = {};
const AccountDetailPage: FC<AccountDetailPageProps> = (props) => {
  const router = useRouter();
  const { id } = router.query;
  const { account, loadingAccount } = useAccount(
    Array.isArray(id) ? id[0] : id
  );

  return (
    <MainLayout
      title={account?.name}
      recordName={account?.name}
      sectionName="Accounts"
    >
      {loadingAccount && "Loading account..."}
      {JSON.stringify(account)}
    </MainLayout>
  );
};
export default AccountDetailPage;
