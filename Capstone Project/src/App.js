// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes} from 'react-router-dom';
import { Route, Switch } from "react-router";
import Home from './components/Home';
import Authentication from './components/Authentication';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Voter from './components/Voter';

const App = () => {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Authentication/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/voter" element={<Voter/>} />
      </Routes>
    </Router>

  );
};

export default App;
