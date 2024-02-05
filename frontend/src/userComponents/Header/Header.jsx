import "./Header.scss";
// import logo from "../../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const logo =
  "https://medeaseportal-bucket.s3.us-east-2.amazonaws.com/assets/logo.png";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    const authObject = auth ? JSON.parse(auth) : null;
    setIsLoggedIn(!!(authObject && authObject.accessToken));
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header>
      <div className="header-container">
        <div className="header-container__content__logo">
          <img
            src={logo}
            alt="logo"
            onClick={() => {
              navigate("/dashboard");
            }}
          />
        </div>
        <div className="header-container__content__profile">
          <button onClick={toggleDropdown}>
            <FontAwesomeIcon icon={faUser} />
          </button>
          {dropdownOpen && (
            <div className="header-container__content__dropdown">
              <ul>
                {isLoggedIn && (
                  <li>
                    <a href="/profile">Profile</a>
                  </li>
                )}
                {isLoggedIn ? (
                  <li>
                    <a href="/logout">Logout</a>
                  </li>
                ) : (
                  <li>
                    <a href="/">Login</a>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
