import PropTypes from "prop-types";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import "./Navbar.scss";

const Navbar = ({ userName, isDropdownOpen, toggleDropdown, dropdownMenu }) => {
  return (
    <nav className="navbar">
      <div className="navbar__brand">
        <a href="/" className="navbar__logo">Logo</a>
      </div>
      <div className="navbar__menu">
        {dropdownMenu.map((item, index) => (
          <a href={item.link} key={index} className="navbar__menu-item">
            {item.name}
          </a>
        ))}
      </div>
      <div className="navbar__user-info">
        <button onClick={toggleDropdown} className="navbar__user-info-button">
          {userName} <FaUser />
        </button>
        {isDropdownOpen && (
          <ul className="navbar__user-info__dropdown-menu">
            <li className="navbar__user-info__dropdown-menu-item">
              <a href="/profile">Profile</a>
            </li>
            <li className="navbar__user-info__dropdown-menu-item">
              <a href="/logout">
                Logout <FaSignOutAlt />
              </a>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  userName: PropTypes.string.isRequired,
  isDropdownOpen: PropTypes.bool.isRequired,
  toggleDropdown: PropTypes.func.isRequired,
  dropdownMenu: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Navbar;
