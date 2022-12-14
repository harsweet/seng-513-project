import './App.css';


import React from 'react';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Welcome from './components/Welcome';
import Chat from './components/Chat';
import { Routes, Route } from "react-router-dom"
import Random from './components/Random';



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Welcome/> } />
        <Route path="signup" element={ <SignUp/> } />
        <Route path="signin" element={ <SignIn/> } />
        <Route path="chatting" element={ <Chat/> } />
        <Route path="randomsearch" element={ <Random/> } />
      </Routes>
    </div>
  );
}

export default App;
