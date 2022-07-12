import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomePage from "./pages/Home";
// import LoginPage from "@src/Login";
import ProductPage from "./pages/product";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route  path="/product/:idx" element={<ProductPage />}/>
        {/*<Route path="users/*" element={<LoginPage />} />*/}
      </Routes>
    </Router>
  );
}

export default App;
