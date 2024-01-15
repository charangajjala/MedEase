import "./Header.scss";
import logo from "../../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
                <li>
                  <a href="/profile">Profile</a>
                </li>
                <li>
                  <a href="/logout">Logout</a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
