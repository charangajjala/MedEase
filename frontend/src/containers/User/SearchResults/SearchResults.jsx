import "./SearchResults.scss";
import { Header, Navbar, Footer, SearchResult } from "../../../userComponents";
import { useState } from 'react';
import { SelectField } from "../../../components";

const SearchResults = () => {
  const [price, setPrice] = useState(0);

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  return (
    <>
      <div className="search-results">
        <div className="search-results__header">
          <Header />
        </div>
        <div className="search-results__navbar">
          <Navbar />
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
                value={price}
                onChange={handlePriceChange}
              />
              <div className="price-range__values">
                <span>${price}</span>
                <span>$1000</span>
              </div>
            </div>

            <div className="filter-category">
              <SelectField
                label="Category"
                name="category"
                id="category"
                options={[
                  { value: "category1", label: "Category 1" },
                  { value: "category2", label: "Category 2" },
                  { value: "category3", label: "Category 3" },
                ]}
              />
            </div>

            <div className="filter-category">
              <label>
                <input type="checkbox" name="inStock" />
                In Stock Only
              </label>
            </div>

            <div className="filter-actions">
              <button type="button">Apply Filters</button>
              <button type="button">Clear All</button>
            </div>
          </div>

          {/* Search Results */}
          <div className="search-results__grid-item-2">
            <div className="search-result__header">
              <h2>Search Results</h2>
              <hr />
            </div>
            <div className="search-result__content">
              <SearchResult />
              <SearchResult />
              <SearchResult />
              <SearchResult />
              <SearchResult />
              <SearchResult />
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
