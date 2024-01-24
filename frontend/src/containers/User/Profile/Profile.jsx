import "./Profile.scss";
import {
  Navbar,
  Header,
  Footer,
  AccountPage,
  AddressPage,
  AddressForm,
  OrderPage,
  OrderDetail,
} from "../../../userComponents";
import { Sidebar } from "../../../userComponents";
import { Routes, Route, useLocation } from "react-router-dom";
import { NotFoundPageInd } from "../../../pages";
import useCart from "../../../context/CartContext";

const Profile = () => {
  const location = useLocation();
  const { cartCount } = useCart();

  return (
    <>
      <div className="profile-page">
        <div className="profile-page__header">
          <Header />
        </div>
        <div className="profile-page__navbar">
          <Navbar cartCount={cartCount} />
        </div>
      </div>

      <main className="profile-page__main">
        <div className="profile-page__grid">
          <div className="profile-page__links">
            <div className="profile-page__sidebar">
              <Sidebar />
            </div>
            <div className="extra">
              {/* Add Additional Stuff if necessary */}
            </div>
          </div>

          <div className="profile-page__content" key={location.pathname}>
            <Routes>
              <Route path="/" element={<AccountPage />} />
              <Route path="/purchase-history" element={<AccountPage />} />
              <Route path="/addresses" element={<AddressPage />} />
              <Route path="/address-form" element={<AddressForm />} />
              <Route path="/reviews" element={<AccountPage />} />
              <Route path="/wallet" element={<AccountPage />} />
              <Route path="/offers" element={<AccountPage />} />
              <Route path="/orders" element={<OrderPage />} />
              <Route path="/reports" element={<AccountPage />} />
              <Route path="/orderDetails" element={<OrderDetail />} />
              <Route path="*" element={<NotFoundPageInd />} />
            </Routes>
          </div>
        </div>
      </main>

      <div className="profile-page__footer">
        <Footer />
      </div>
    </>
  );
};

export default Profile;
