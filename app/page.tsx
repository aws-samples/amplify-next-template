"use client";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

function App() {
  return (
    <>
      <h1>Hello, Amplify 👋</h1>
    </>
  );
}

export default withAuthenticator(App);
