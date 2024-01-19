import "./Profile.scss";
import { Navbar, Header, Footer, AccountPage } from "../../../userComponents";
import { Sidebar } from "../../../userComponents";
import { Routes, Route } from 'react-router-dom';

const Profile = () => {
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

          <div className="profile-page__content">
            <Routes>
              <Route path="/my-account" element={<AccountPage />} />
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
