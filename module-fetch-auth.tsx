import { fetchAuthSession } from 'aws-amplify/auth';

fetchAuthSession(); // Will throw "AuthUserPoolException: Auth UserPool not configured."

export default function ComponentX() {
  return (
    <div className="box">
      ...
    </div>
  );
}
