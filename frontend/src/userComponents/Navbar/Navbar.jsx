import "./Navbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faBell,
  faShoppingCart,
  faLocation,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const Navbar = ({cartCount}) => {

  return (
    <nav className="navbar-container">
      <div className="navbar-container__location">
        <button className="navbar-container__location-button">
          <FontAwesomeIcon icon={faLocation} />
        </button>
        <div className="navbar-container__location-text">
          <span>19-4-3A/7, STV Nagar</span>
          <span>Venkat Reddy Colony Tirupati</span>
        </div>
      </div>
      <div className="navbar-container__search">
        <select
          id="categories"
          name="Categories"
          className="navbar-container__search__cat-search"
        >
          <option value="All Categories">All Categories</option>
        </select>
        <input type="text" placeholder="Search here..." />
        <button className="navbar-container__search-button">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
      <div className="navbar-container__buttons">
        <button className="navbar-container__notification-button">
          <FontAwesomeIcon icon={faBell} />
        </button>
        <button className="navbar-container__cart-button">
          <FontAwesomeIcon icon={faShoppingCart} />
          {cartCount > 0 && (
            <span className="cart-count">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  cartCount: PropTypes.number,
};

export default Navbar;
