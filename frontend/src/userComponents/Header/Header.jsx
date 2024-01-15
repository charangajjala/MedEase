import "./Header.scss";
import logo from "../../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
          <img src={logo} alt="logo" />
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
                    <a href="/login">Login</a>
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
