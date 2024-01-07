import SelectField from "../SelectField/SelectField.jsx";
import PropTypes from "prop-types";
import { productTypes } from "../../constants/productTypes.js";
import { useReducer } from "react";
import FormInput from "../FormInput/FormInput.jsx";
import { companyNames } from "../../constants/companyNames.js";
import "./MedicineForm.scss";

const initialState = {
  productType: "",
  productCode: "",
  productTitle: "",
  totalStock: "",
  companyName: "",
  costPerMonth: "",
  expiryDate: "",
  manufactureDate: "",
  description: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_PRODUCT_TYPE":
      return { ...state, productType: action.payload };
    case "SET_PRODUCT_CODE":
      return { ...state, productCode: action.payload };
    case "SET_PRODUCT_TITLE":
      return { ...state, productTitle: action.payload };
    case "SET_TOTAL_STOCK":
      return { ...state, totalStock: action.payload };
    case "SET_COMPANY_NAME":
      return { ...state, companyName: action.payload };
    case "SET_COST_PER_MONTH":
      return { ...state, costPerMonth: action.payload };
    case "SET_EXPIRY_DATE":
      return { ...state, expiryDate: action.payload };
    case "SET_MANUFACTURE_DATE":
      return { ...state, manufactureDate: action.payload };
    case "SET_DESCRIPTION":
      return { ...state, description: action.payload };
    default:
      return state;
  }
}

const MedicineForm = ({ onSubmit }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(state);
  };

  return (
    <form className="form">
      <SelectField
        label="Select Product Type"
        id="product-type"
        name="product-type"
        options={productTypes}
        value={state.productType}
        onChange={(e) =>
          dispatch({ type: "SET_PRODUCT_TYPE", payload: e.target.value })
        }
        required={true}
      />
      <FormInput
        label="Product Code"
        type="text"
        id="medicine-expiry"
        name="medicine-expiry"
        onChange={(e) =>
          dispatch({ type: "SET_PRODUCT_CODE", payload: e.target.value })
        }
        required={true}
      />
      <FormInput
        label="Product Title"
        type="text"
        id="product-title"
        name="product-title"
        onChange={(e) =>
          dispatch({ type: "SET_PRODUCT_TITLE", payload: e.target.value })
        }
        required={true}
      />
      <FormInput
        label="Total Stock"
        type="text"
        id="total-stock"
        name="total-stock"
        onChange={(e) =>
          dispatch({ type: "SET_TOTAL_STOCK", payload: e.target.value })
        }
        required={true}
      />
      <SelectField
        label="Select Company Name"
        id="company-name"
        name="company-name"
        options={companyNames}
        value={state.companyName}
        onChange={(e) =>
          dispatch({ type: "SET_COMPANY_NAME", payload: e.target.value })
        }
        required={true}
      />
      <FormInput
        label="Cost Per Month"
        type="text"
        id="cost-per-month"
        name="cost-per-month"
        onChange={(e) =>
          dispatch({ type: "SET_COST_PER_MONTH", payload: e.target.value })
        }
        required={true}
      />
      <FormInput
        label="Expiry Date"
        type="date"
        id="expiry-date"
        name="expiry-date"
        onChange={(e) =>
          dispatch({ type: "SET_EXPIRY_DATE", payload: e.target.value })
        }
        required={true}
      />
      <FormInput
        label="Manufacture Date"
        type="date"
        id="manufacture-date"
        name="manufacture-date"
        onChange={(e) =>
          dispatch({ type: "SET_MANUFACTURE_DATE", payload: e.target.value })
        }
        required={true}
      />
      <div className="grid-item full-width">
        <label htmlFor="medicine-description">Description</label>
        <textarea
          type="text"
          id="medicine-description"
          name="medicine-description"
          onChange={(e) =>
            dispatch({ type: "SET_DESCRIPTION", payload: e.target.value })
          }
          required
        />
      </div>
      <div className="form-button" onClick={handleSubmit}>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

MedicineForm.propTypes = {
  heading: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default MedicineForm;
