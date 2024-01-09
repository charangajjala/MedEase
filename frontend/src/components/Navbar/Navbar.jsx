import PropTypes from "prop-types";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import "./Navbar.scss";

const Navbar = (props) => {
  return (
    <nav className="navbar">
      <div className="navbar__brand">
        <h1>MSMS</h1>
      </div>

      {/* <div className="navbar__menu">
        {props.dropdownMenu.map((item, index) => (
          <a href={item.link} key={index} className="navbar__menu-item">
            {item.name}
          </a>
        ))}
      </div> */}

      <div className="navbar__user-info">
        <button onClick={props.toggleDropdown} className="navbar__user-info-button">
          {props.userName} <FaUser />
        </button>
        {props.isDropdownOpen && (
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
