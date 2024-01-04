import PropTypes from "prop-types";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import "./Header.scss";

const Header = (props) => {
  return (
    <header className="admin-dashboard__header">
      <h1>{props.heading}</h1>
      <div className="admin-dashboard__user-info" ref={props.dropdownRef}>
        <button
          onClick={props.toggleDropdown}
          className="admin-dashboard__user-info-button"
        >
          {props.userName} <FaUser />
        </button>
        {props.isDropdownOpen && (
          <ul className="admin-dashboard__user-info__dropdown-menu">
            <li className="admin-dashboard__user-info__dropdown-menu-item">
              <a href="/profile">Profile</a>
            </li>
            <li className="admin-dashboard__user-info__dropdown-menu-item">
              <a href="/logout">
                Logout <FaSignOutAlt />
              </a>
            </li>
          </ul>
        )}
      </div>
    </header>
  );
};

Header.propTypes = {
  dropdownRef: PropTypes.object.isRequired,
  toggleDropdown: PropTypes.func.isRequired,
  isDropdownOpen: PropTypes.bool.isRequired,
  userName: PropTypes.string.isRequired,
  dropdownMenu: PropTypes.arrayOf(PropTypes.string).isRequired,
  heading: PropTypes.string.isRequired,
};

export default Header;
