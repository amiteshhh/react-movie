import React from 'react';
import './App.css';

const envName = process.env.production ? 'production' : 'dev';

function App() {
  return (
    <div className="App">
      <h3>
        App is running in
        <code className="App-env-label">{envName}</code>
        environment.
      </h3>
      Hello react webpack!
    </div>
  );
}

export default App;
