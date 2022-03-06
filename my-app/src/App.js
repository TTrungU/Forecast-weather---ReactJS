import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar"
import SearchForm from "./components/SearchForm"
import Forecast from "./components/Forecast"
import Home from "./pages/Home"
import About from "./pages/About"
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/About" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
