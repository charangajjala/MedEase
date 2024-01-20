import "./Navbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faBell,
  faShoppingCart,
  faLocation,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { useReducer } from "react";
import { useNavigate } from "react-router-dom";

const initialState = {
  category: "All Categories",
  searchContent: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_CATEGORY":
      return { ...state, category: action.payload };
    case "SET_SEARCH_CONTENT":
      return { ...state, searchContent: action.payload };
    default:
      throw new Error();
  }
}

const Navbar = ({ cartCount }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { category, searchContent } = state;
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    queryParams.append("categoryName", category);
    queryParams.append("keyword", searchContent);
    console.log(queryParams.toString());
    navigate(`/medicine?${queryParams.toString()}`);
  };

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
          value={category}
          onChange={(e) =>
            dispatch({ type: "SET_CATEGORY", payload: e.target.value })
          }
        >
          <option value="All Categories">All Categories</option>
        </select>
        <input
          type="text"
          placeholder="Search here..."
          value={searchContent}
          onChange={(e) =>
            dispatch({ type: "SET_SEARCH_CONTENT", payload: e.target.value })
          }
        />
        <button
          className="navbar-container__search-button"
          onClick={(e) => handleSearch(e)}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
      <div className="navbar-container__buttons">
        <button className="navbar-container__notification-button">
          <FontAwesomeIcon icon={faBell} />
        </button>
        <button
          className="navbar-container__cart-button"
          onClick={() => {
            navigate("/cart");
          }}
        >
          <FontAwesomeIcon icon={faShoppingCart} />
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </button>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  cartCount: PropTypes.number,
};

export default Navbar;
