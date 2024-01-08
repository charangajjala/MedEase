import "./App.scss";

import {
  Login,
  AdminDashboard,
  AddMedicine,
  SellsDashboard,
  OrderReports,
  OrderReport,
  CompanyReport,
  AddCategory,
  Logout,
  SellsDashboardExt,
  AddCompany,
  UpdateCompany,
  ProductReports,
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
        <Route path="/sellsExt" element={<SellsDashboardExt />} />
        <Route path="/report" element={<OrderReports />} />
        <Route path="/reportExt" element={<OrderReport />} />
        <Route path="/products" element={<ProductReports />} />
        <Route path="/companies" element={<CompanyReport />} />
        <Route path="/companyAdd" element={<AddCompany />} />
        <Route path="/companyUpdate" element={<UpdateCompany />} />
        <Route path="/category" element={<AddCategory />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}

export default App;
