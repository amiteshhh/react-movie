import React from 'react';
import './App.css';

const envName = process.env.production ? 'production' : 'dev';

function App() {
  return (
    <div className="App">
      <h3>
        App is running in 
        {/* experimenting inline style. Ideally we use class or define style object */}
        <code style={{background:"rgb(31, 30, 30)", padding: "0 5px", margin: "0 5px"}}>{envName}</code> 
        environment.
      </h3>
      Hello react webpack!
    </div>
  );
}

export default App;
