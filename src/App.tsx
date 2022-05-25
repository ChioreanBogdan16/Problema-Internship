import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Question } from './domain/Question';
import { Test } from './domain/Test';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Test />
      </header>
    </div>
  );
}

export default App;
