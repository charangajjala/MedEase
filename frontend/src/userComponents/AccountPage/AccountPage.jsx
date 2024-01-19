import './AccountPage.scss';

const AccountPage = () => {
  const userProfile = {
    name: "John Doe",
    email: "johndoe@example.com",
    joinDate: "January 1, 2022",
  };

  return (
    <div className="account-page">
      <h1>My Account</h1>
      
      <section className="profile-info">
        <h2>Profile Information</h2>
        <p><strong>Name:</strong> {userProfile.name}</p>
        <p><strong>Email:</strong> {userProfile.email}</p>
        <p><strong>Join Date:</strong> {userProfile.joinDate}</p>
      </section>

      <section className="account-settings">
        <h2>Account Settings</h2>
        <p>Settings can be changed</p>
      </section>

      <div className="account-page__buttons">
        <button>Change Password</button>
        <button>Delete Account</button>
      </div>

    </div>
  );
};

export default AccountPage;
