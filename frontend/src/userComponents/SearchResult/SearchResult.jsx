import "./SearchResult.scss";
import moov from "../../assets/moov.jpg";

const SearchResult = () => {
  return (
    <div className="results">
      <div className="results__image">
        <img src={moov} alt="Table" />
      </div>
      <div className="results__info">
        <div className="results__info-name">
          <h2>Moov Spray</h2>
        </div>
        <div className="results__info-price">
          <h3>$100</h3>
        </div>
        <div className="results__info-description">
          <p>
            Pain reliever/fever reducer. For adults and children 12 years and over. it is a spray type
          </p>
        </div>
        <div className="results__info-actions">
          <button>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
