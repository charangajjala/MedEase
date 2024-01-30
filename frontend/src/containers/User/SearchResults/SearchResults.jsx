import "./SearchResults.scss";
import { Header, Navbar, Footer, SearchResult } from "../../../userComponents";
import { useReducer, useMemo } from "react";
import { SelectField } from "../../../components";
import { useLocation } from "react-router-dom";
import useCart from "../../../context/CartContext";
import { Toaster } from "react-hot-toast";

const nodata =
  "https://medeaseportal-bucket.s3.us-east-2.amazonaws.com/assets/nodata.jpg";

const initialState = {
  price: 0,
  selectedCategory: "",
  inStockOnly: false,
};

const filterReducer = (state, action) => {
  switch (action.type) {
    case "SET_PRICE":
      return { ...state, price: action.payload };
    case "SET_CATEGORY":
      return { ...state, selectedCategory: action.payload };
    case "TOGGLE_IN_STOCK":
      return { ...state, inStockOnly: !state.inStockOnly };
    case "CLEAR_FILTERS":
      return initialState;
    default:
      return state;
  }
};

const SearchResults = () => {
  const [filterState, dispatch] = useReducer(filterReducer, initialState);
  const location = useLocation();
  const products = location.state.data;
  const { cartCount } = useCart();

  const categoryOptions = Array.from(
    new Set(products.map((product) => product.productType))
  ).map((productType) => ({
    value: productType,
    label: productType,
  }));

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        return (
          (filterState.selectedCategory
            ? product.productType === filterState.selectedCategory
            : true) &&
          (filterState.inStockOnly ? product.totalStock > 0 : true) &&
          product.costPerMonth <= filterState.price
        );
      }),
    [products, filterState]
  );

  const handleApplyFilters = () => {
    console.log("Filtered products:", filteredProducts);
  };

  return (
    <>
      <div className="search-results">
        <Toaster position="bottom-right" reverseOrder={false} />
        <div className="search-results__header">
          <Header />
        </div>
        <div className="search-results__navbar">
          <Navbar cartCount={cartCount} />
        </div>
      </div>

      <main className="search-results__main">
        <div className="search-results__grid">
          {/* Filters */}
          <div className="search-results__grid-item-1">
            <h3>Filters</h3>

            <div className="filter-category">
              <label htmlFor="priceRange">Price Range</label>
              <input
                type="range"
                id="priceRange"
                name="priceRange"
                min="0"
                max="1000"
                value={filterState.price}
                onChange={(e) => {
                  dispatch({
                    type: "SET_PRICE",
                    payload: e.target.value,
                  });
                }}
              />
              <div className="price-range__values">
                <span>${filterState.price}</span>
                <span>$1000</span>
              </div>
            </div>

            <div className="filter-category">
              <SelectField
                label="Category"
                name="category"
                id="category"
                options={categoryOptions}
                onChange={(e) => {
                  dispatch({
                    type: "SET_CATEGORY",
                    payload: e.target.value,
                  });
                }}
              />
            </div>

            <div className="filter-category">
              <label>
                <input
                  type="checkbox"
                  name="inStock"
                  onChange={() => {
                    dispatch({
                      type: "TOGGLE_IN_STOCK",
                    });
                  }}
                />
                In Stock Only
              </label>
            </div>

            <div className="filter-actions">
              <button type="button" onClick={handleApplyFilters}>
                Apply Filters
              </button>
              <button
                type="button"
                onChange={() => {
                  dispatch({
                    type: "CLEAR_FILTERS",
                  });
                }}
              >
                Clear All
              </button>
            </div>
          </div>

          {/* Search Results */}
          <div className="search-results__grid-item-2">
            <div className="search-result__header">
              <h2>Search Results</h2>
              <hr />
            </div>
            <div className="search-result__content">
              {products.length > 0 ? (
                products.map((product) => (
                  <SearchResult key={product.id} product={product} />
                ))
              ) : (
                <>
                  <div className="no-data-container">
                    <div className="image">
                      <img src={nodata} alt="nodata" />
                    </div>

                    <div className="no-data__text">
                      <p>
                        We couldn&apos;t find any results matching your search.
                        Please try again.
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <div className="search-results__footer">
        <Footer />
      </div>
    </>
  );
};

export default SearchResults;
