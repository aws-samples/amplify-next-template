import { type Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import useSWR from "swr";

const client = generateClient<Schema>();

type Account = {
  id: string;
  name: string;
};

const mapAccount: (account: Schema["Account"]) => Account = ({ id, name }) => ({
  id,
  name,
});

const fetchAccount = (accountId?: string) => async () => {
  if (!accountId) return;
  const { data, errors } = await client.models.Account.get({ id: accountId });
  if (errors) throw errors;
  return mapAccount(data);
};

const useAccount = (accountId?: string) => {
  const {
    data: account,
    error: errorAccount,
    isLoading: loadingAccount,
  } = useSWR(`/api/account/${accountId}`, fetchAccount(accountId));

  return { account, errorAccount, loadingAccount };
};

export default useAccount;
