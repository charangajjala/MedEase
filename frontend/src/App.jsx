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
  Register,
  UserDashboard,
  Cart,
  ProductDetails,
  Profile,
  SearchResults,
} from "./containers/index.js";
import WithAuth from "./utils/WithAuth.jsx";
import { Invoice } from "./components/index.js";

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
const InvoiceWithAuth = WithAuth(Invoice);
const CartWithAuth = WithAuth(Cart);
const ProfileWithAuth = WithAuth(Profile);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/product" element={<ProductDetails />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/cart" element={<CartWithAuth />} />
        <Route path="/admin/dashboard" element={<AdminDashboardWithAuth />} />
        <Route path="/admin/medicine" element={<AddMedicineWithAuth />} />
        <Route
          path="/admin/medicineUpdate"
          element={<UpdateMedicineWithAuth />}
        />
        <Route path="/admin/sells" element={<StartSellWithAuth />} />
        <Route path="/admin/sellsExt" element={<SellsDashboardExtWithAuth />} />
        <Route path="/admin/report" element={<OrderReportsWithAuth />} />
        <Route path="/admin/reportExt" element={<OrderReportWithAuth />} />
        <Route path="/admin/products" element={<ProductReportsWithAuth />} />
        <Route path="/admin/companies" element={<CompanyReportWithAuth />} />
        <Route path="/admin/companyAdd" element={<AddCompanyWithAuth />} />
        <Route
          path="/admin/companyUpdate"
          element={<UpdateCompanyWithAuth />}
        />
        <Route path="/admin/category" element={<AddCategoryWithAuth />} />
        <Route path="/admin/invoice" element={<InvoiceWithAuth />} />

        {/* Profile components */}
        <Route path="/profile/*" element={<ProfileWithAuth />} />
      </Routes>
    </Router>
  );
}

export default App;
