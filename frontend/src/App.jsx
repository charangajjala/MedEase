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
  UpdateMedicine,
} from "./containers/index.js";
import WithAuth from "./utils/WithAuth.jsx";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const AdminDashboardWithAuth = WithAuth(AdminDashboard);
const AddMedicineWithAuth = WithAuth(AddMedicine);
const UpdateMedicineWithAuth = WithAuth(UpdateMedicine);
const StartSellWithAuth = WithAuth(SellsDashboard);
const SellsDashboardExtWithAuth = WithAuth(SellsDashboardExt);
const OrderReportsWithAuth = WithAuth(OrderReports);
const OrderReportWithAuth = WithAuth(OrderReport);
const ProductReportsWithAuth = WithAuth(ProductReports);
const CompanyReportWithAuth = WithAuth(CompanyReport);
const AddCompanyWithAuth = WithAuth(AddCompany);
const UpdateCompanyWithAuth = WithAuth(UpdateCompany);
const AddCategoryWithAuth = WithAuth(AddCategory);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<AdminDashboardWithAuth />} />
        <Route path="/medicine" element={<AddMedicineWithAuth />} />
        <Route path="/medicineUpdate" element={<UpdateMedicineWithAuth />} />
        <Route path="/sells" element={<StartSellWithAuth />} />
        <Route path="/sellsExt" element={<SellsDashboardExtWithAuth />} />
        <Route path="/report" element={<OrderReportsWithAuth />} />
        <Route path="/reportExt" element={<OrderReportWithAuth />} />
        <Route path="/products" element={<ProductReportsWithAuth />} />
        <Route path="/companies" element={<CompanyReportWithAuth />} />
        <Route path="/companyAdd" element={<AddCompanyWithAuth />} />
        <Route path="/companyUpdate" element={<UpdateCompanyWithAuth />} />
        <Route path="/category" element={<AddCategoryWithAuth />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}

export default App;
