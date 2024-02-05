import "./SearchResults.scss";
import { Header, Navbar, Footer, SearchResult } from "../../../userComponents";
import { useReducer, useMemo, useState } from "react";
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
    // case "SET_PRICE":
    //   return { ...state, price: action.payload };
    case "SET_CATEGORY":
      return { ...state, selectedCategory: action.payload };
    case "TOGGLE_IN_STOCK":
      return { ...state, inStockOnly: !state.inStockOnly };
    case "CLEAR_ALL":
      return initialState;
    default:
      return state;
  }
};

const SearchResults = () => {
  const [filterState, dispatch] = useReducer(filterReducer, initialState);
  const location = useLocation();
  const products = location.state.data;
  const [productsFiltered, setFilteredProducts] = useState(products);
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
        return filterState.selectedCategory
          ? product.productType === filterState.selectedCategory
          : true;
      }),
    [products, filterState]
  );

  const handleApplyFilters = () => {
    setFilteredProducts(filteredProducts);
  };

  const handleClearFilters = () => {
    dispatch({
      type: "CLEAR_ALL",
    });
    setFilteredProducts(products);
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
            <h3>
              Filters <hr />
            </h3>

            {/* <div className="filter-category">
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
            </div> */}

            <div className="filter-category">
              <SelectField
                label="Category"
                name="category"
                id="category"
                options={categoryOptions}
                value={filterState.selectedCategory}
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
                  id="inStock"
                  value={filterState.inStockOnly}
                  onClick={() => {
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
              <button type="button" onClick={handleClearFilters}>
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
              {productsFiltered.length > 0 ? (
                productsFiltered.map((product) => (
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
