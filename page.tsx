import { fetchAuthSession } from "aws-amplify/auth";

// The layout calls configure, but fetchAuthSession ends up executing first
// Will throw "AuthUserPoolException: Auth UserPool not configured."
fetchAuthSession().then((session) => {
  console.log(session);
});

export default function HomePage() {
  return (
    <div className="box">
      ...
    </div>
  );
}
