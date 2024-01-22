import "./SearchResult.scss";
import moov from "../../assets/moov.jpg";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const SearchResult = ({ product }) => {
  const currentDate = new Date();
  const expiryDate = new Date(product.expiryDate);
  const timeDiff = expiryDate.getTime() - currentDate.getTime();
  const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
  console.log(product.productTitle,expiryDate,timeDiff,daysLeft)
  const navigate = useNavigate();

  let expiryClass = '';
  let expiryText = 'Expired';

  if (daysLeft > 0) {
    if (daysLeft > 365) {
      expiryText = 'Expires in more than a year';
      expiryClass = 'expires-long';
    } else if (daysLeft <= 7) {
      expiryText = `Expires in ${daysLeft} days`;
      expiryClass = 'expires-soon';
    } else if (daysLeft <= 30) {
      expiryText = `Expires in ${daysLeft} days`;
      expiryClass = 'expires-medium'; 
    } else {
      expiryText = `Expires in ${daysLeft} days`;
      expiryClass = 'expires-long';
    }
  } else {
    expiryClass = 'expired';
  }


  const handleNavigate = () => {
    navigate("/product", { state: { data:product } });
  };

  return (
    <div className="results" onClick={handleNavigate}>
      <div className="results__image">
        <img src={moov} alt={product.productTitle} />
      </div>
      <div className="results__info">
        <div className="results__info-details">
          <div className="results__info-name">
            <h2>{product.productTitle}</h2>
          </div>
          <div className="results__info-type">
            <p>Type: {product.productType}</p>
          </div>
          <div className="results__info-company">
            <p>Company: {product.companyName}</p>
          </div>
          <div className={`results__info-expiry ${expiryClass}`}>
            <p>{expiryText}</p>
          </div>
          <div className="results__info-code">
            <p>Product Code: {product.productCode}</p>
          </div>
          <div className="results__info-description">
            <p>{product.description}</p>
          </div>
        </div>
        <div className="results__info-buy">
          <div className="results__info-price">
            <h3>${product.costPerMonth}</h3>
          </div>
          <div
            className={`results__info-stock ${
              product.totalStock > 0 ? "in-stock" : "out-of-stock"
            }`}
          >
            <p>{product.totalStock > 0 ? "In Stock" : "Out of Stock"}</p>
          </div>
          <div className="results__info-actions">
            <button>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

SearchResult.propTypes = {
  product: PropTypes.object,
};

export default SearchResult;
