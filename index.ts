import { Amplify } from 'aws-amplify';
import ComponentX from 'module-fetch-auth';

// fetchAuthSession() in ComponentX executed on import

Amplify.configure();

export default function App() {
  return (
    <div>
        <ComponentX />
    </div>
  );
}
