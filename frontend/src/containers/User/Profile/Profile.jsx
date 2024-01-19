import "./Profile.scss";
import { Navbar, Header, Footer, AccountPage } from "../../../userComponents";
import { Sidebar } from "../../../userComponents";
import { Routes, Route, useLocation } from "react-router-dom";
import { NotFoundPage } from "../../../pages";

const Profile = () => {
  const location = useLocation();

  return (
    <>
      <div className="profile-page">
        <div className="profile-page__header">
          <Header />
        </div>
        <div className="profile-page__navbar">
          <Navbar />
        </div>
      </div>

      <main className="profile-page__main">
        <div className="profile-page__grid">
          <div className="profile-page__links">
            <Sidebar />
          </div>

          <div className="profile-page__content" key={location.pathname}>
            <Routes>
              <Route path="/" element={<AccountPage />} />
              <Route path="/purchase-history" element={<AccountPage />} />
              <Route path="/prescriptions" element={<AccountPage />} />
              <Route path="/reviews" element={<AccountPage />} />
              <Route path="/wallet" element={<AccountPage />} />
              <Route path="/offers" element={<AccountPage />} />
              <Route path="/orders" element={<AccountPage />} />
              <Route path="/reports" element={<AccountPage />} />
              <Route path="*" element={<NotFoundPage />} />
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
