import useAccount from "@/api/useAccount";
import { FC } from "react";
import styles from "./Tokens.module.css";

type AccountNameProps = {
  accountId: string;
  noLinks?: boolean;
};

const AccountName: FC<AccountNameProps> = ({ accountId, noLinks }) => {
  const { account, loadingAccount } = useAccount(accountId);
  return loadingAccount ? (
    "Loading account..."
  ) : noLinks ? (
    <span className={styles.accountName}>{account?.name}</span>
  ) : (
    <a href={`/accounts/${accountId}`} className={styles.accountName}>
      {account?.name}
    </a>
  );
};

export default AccountName;
