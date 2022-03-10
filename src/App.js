import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import {Home, Auth, Account} from "./components";
import './App.css';


function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/myaccount/:name" element={<Account />} />
        </Routes>
    </Router>
  );
}

export default App;
