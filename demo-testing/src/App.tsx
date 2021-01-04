import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [count, setCount] = React.useState(0);

  return (
    <div data-test="component-app1" className="App">
      <h1 data-test="counter-display1">
        The counter is currently&nbsp;
        <span data-test="count1">{count}</span>
      </h1>
      <button
        data-test="increment-button1"
        onClick={() => setCount(count + 1)}
      >
        Increment counter
      </button>
    </div>
  );
}

export default App;
