import { Route, Routes } from "react-router-dom";
import WithAuth from "./utils/WithAuth.jsx";
import { CartProvider } from "./context/CartContext";
import {
  UserDashboard,
  ProductDetails,
  SearchResults,
  Cart,
  Profile,
  Checkout,
  OrderSuccess,
  ForgotPassword,
} from "./containers";
import { NotFoundPage } from "./pages/index.js";

const CartWithAuth = WithAuth(Cart);
const ProfileWithAuth = WithAuth(Profile);
const CheckoutWithAuth = WithAuth(Checkout);
const OrderSuccessWithAuth = WithAuth(OrderSuccess);

const UserRoutes = () => {
  return (
    <CartProvider>
      <Routes>
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/cart" element={<CartWithAuth />} />
        <Route path="/checkout" element={<CheckoutWithAuth />} />
        <Route path="/success" element={<OrderSuccessWithAuth />} />
        <Route path="/profile/*" element={<ProfileWithAuth />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </CartProvider>
  );
};

export default UserRoutes;
