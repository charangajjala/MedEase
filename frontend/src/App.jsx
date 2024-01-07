import "./App.scss";

import {
  Login,
  AdminDashboard,
  AddMedicine,
  SellsDashboard,
  OrderReport,
  CompanyReport,
  AddCategory,
  Logout
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
        <Route path="/report" element={<OrderReport />} />
        <Route path="/companies" element={<CompanyReport />} />
        <Route path="/category" element={<AddCategory />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}

export default App;
