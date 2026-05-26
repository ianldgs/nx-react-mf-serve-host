import * as React from 'react';
import { Link, Route, Routes } from 'react-router-dom';

const RemoteA = React.lazy(() => import('remoteA/Module'));
const RemoteB = React.lazy(() => import('remoteB/Module'));

export function App() {
  return (
    <React.Suspense fallback={null}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/remote-a">RemoteA</Link>
        </li>
        <li>
          <Link to="/remote-b">RemoteB</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/remote-a" element={<RemoteA />} />
        <Route path="/remote-b" element={<RemoteB />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
