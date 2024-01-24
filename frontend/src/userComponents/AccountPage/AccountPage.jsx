import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import "./AccountPage.scss";
import userEndpoints from "../../constants/userEndpoints";
import loading from "../../assets/loader.svg";

const AccountPage = () => {
  const [userProfile, setUserProfile] = useState({});
  const [isProfileLoading, setIsProfileLoading] = useState(false);

  // const userProfile = {
  //   name: "John Doe",
  //   email: "johndoe@example.com",
  //   joinDate: "January 1, 2022",
  // };

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    setIsProfileLoading(true);
    const fetchUserDetails = async () => {
      try {
        const response = await axiosPrivate.get(userEndpoints.GET_USER);
        const data = response.data;
        setUserProfile(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsProfileLoading(false);
      }
    };

    fetchUserDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isProfileLoading) {
    return (
      <div className="loading-page">
        <img src={loading} alt="" />
        <p>Loading Profile...</p>
      </div>
    );
  }

  return (
    <div className="account-page">
      <h1>My Account</h1>

      <section className="profile-info">
        <h2>Profile Information</h2>
        <p>
          <strong>Username:</strong> {userProfile.username}
        </p>
        <p>
          <strong>Email:</strong> {userProfile.email}
        </p>
        <p>
          <strong>Join Date:</strong> {"January 1, 2022"}
        </p>
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
