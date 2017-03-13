import React from 'react';

import Layout from '../Layout/Layout';
import Configuration from '../Configuration/Configuration';

// If you use React Router, make this component
// render <Router> with your routes. Currently,
// only synchronous routes are hot reloaded, and
// you will see a warning from <Router> on every reload.
// You can ignore this warning. For details, see:
// https://github.com/reactjs/react-router/issues/2182

function App() {
  return (
    <Layout>
      <Configuration />
    </Layout>
  );
}

export default App;
