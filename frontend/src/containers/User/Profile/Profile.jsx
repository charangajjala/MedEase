import "./Profile.scss";
import { Navbar, Header, Footer } from "../../../userComponents";
import { Sidebar } from "../../../userComponents";

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
            <h1>Profile</h1>
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
