import SelectField from "../SelectField/SelectField.jsx";
import Textarea from "../Textarea/Textarea.jsx";
import PropTypes from "prop-types";
import { useEffect, useReducer } from "react";
import FormInput from "../FormInput/FormInput.jsx";
// import { companyNames } from "../../constants/companyNames.js";
import "./MedicineForm.scss";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.jsx";
import endpoints from "../../constants/endpoints.js";
import { useState } from "react";
import axios from "axios";

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

const MedicineForm = ({ button_name }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [productTypes, setProductTypes] = useState([]);
  const [companyNames, setCompanyNames] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchProductTypes = async () => {
      try {
        const response = await axiosPrivate.get(endpoints.GET_CATERGORY_URL, {
          signal,
        });
        const formatProductTypes = response.data.map((item) => ({
          value: item.id.toString(),
          label: item.categoryName,
        }));
        if (response.status === 200) {
          setProductTypes(formatProductTypes);
        }
      } catch (error) {
        if (error.name == "CanceledError") {
          console.log("Request cancelled");
        }
      }
    };

    const fetchCompanies = async () => {
      try {
        const response = await axiosPrivate.get(endpoints.COMPANY_REPORTS_URL, {
          signal,
        });
        const formatCompanies = response.data.map((item) => ({
          value: item.id.toString(),
          label: item.companyName,
        }));
        if (response.status === 200) {
          setCompanyNames(formatCompanies);
        }
      } catch (error) {
        if (error.name == "CanceledError") {
          console.log("Request cancelled");
        }
      }
    };

    fetchCompanies();
    fetchProductTypes();

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (button_name === "Submit") {
      console.log("Add");
    } else {
      console.log("Update");
    }
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
      <div className="full-width">
        <Textarea
          label="Description"
          id="medicine-description"
          name="medicine-description"
          onChange={(e) =>
            dispatch({ type: "SET_DESCRIPTION", payload: e.target.value })
          }
          required={true}
        />
      </div>
      <div className="form-button" onClick={handleFormSubmit}>
        <button type="submit">{button_name}</button>
      </div>
    </form>
  );
};

MedicineForm.propTypes = {
  button_name: PropTypes.string.isRequired,
};

export default MedicineForm;
