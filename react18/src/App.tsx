import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomePage from "./pages/Home";
// import LoginPage from "@src/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/*<Route path="users/*" element={<LoginPage />} />*/}
      </Routes>
    </Router>
  );
}

export default App;
