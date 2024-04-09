import { type Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import useSWR from "swr";

const client = generateClient<Schema>();

const fetchAccount = (accountId: string) => async () =>
  client.models.Account.get({ id: accountId }).then(
    ({ data: { id, name } }) => ({ id, name })
  );

const useAccount = (accountId?: string) => {
  const {
    data: account,
    error: errorAccount,
    isLoading: loadingAccount,
  } = useSWR(`/api/account/${accountId}`, fetchAccount(accountId || ""));

  return { account, errorAccount, loadingAccount };
};

export default useAccount;
