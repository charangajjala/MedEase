import "./App.scss";

import {
  Login,
  AdminDashboard,
  AddMedicine,
  SellsDashboard,
} from "./containers/index.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/medicine" element={<AddMedicine />} />
        <Route path="/sells" element={<SellsDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
