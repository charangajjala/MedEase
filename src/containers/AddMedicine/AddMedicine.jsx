import "./AddMedicine.scss";
import logo from "../../assets/logo.png";
import { useReducer } from "react";

import {
  Sidebar,
  ToggleButton,
  Footer,
  Header,
  FormInput,
  SelectField,
} from "../../components/index.js";

import { links } from "../../constants/links.js";
import { productTypes } from "../../constants/productTypes.js";
import { companyNames } from "../../constants/companyNames.js";
import useVisibilityToggle from "../../hooks/useVisibilityToggle.jsx";

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

function reducer (state, action) {
  switch(action.type) {
    case "SET_PRODUCT_TYPE":
      return {...state, productType: action.payload};
    case "SET_PRODUCT_CODE":
      return {...state, productCode: action.payload};
    case "SET_PRODUCT_TITLE":
      return {...state, productTitle: action.payload};
    case "SET_TOTAL_STOCK":
      return {...state, totalStock: action.payload};
    case "SET_COMPANY_NAME":
      return {...state, companyName: action.payload};
    case "SET_COST_PER_MONTH":
      return {...state, costPerMonth: action.payload};
    case "SET_EXPIRY_DATE":
      return {...state, expiryDate: action.payload};
    case "SET_MANUFACTURE_DATE":
      return {...state, manufactureDate: action.payload};
    case "SET_DESCRIPTION":
      return {...state, description: action.payload};
    default:
      return state;
  }
}

const AddMedicine = () => {
  const {
    isSidebarVisible,
    toggleSidebar,
    isDropdownOpen,
    toggleDropdown,
    dropdownRef,
  } = useVisibilityToggle();

  // const [selectedProduct, setSelectedProduct] = useState("");
  // const [seletedCompany, setSelectedCompany] = useState("");

  const [state, dispatch] = useReducer(reducer, initialState);

  // Once the backend is done convert it to async for post request
  // Upon successful submit clear the form
  // else display error message
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
  };

  return (
    <>
      <div className="add-product-form">
        <ToggleButton
          toggleSidebar={toggleSidebar}
          isSidebarVisible={isSidebarVisible}
        />

        <Sidebar
          logo={logo}
          links={links}
          isSidebarVisible={isSidebarVisible}
        />
        <main className="add-product-form__main">
          <div className="add-product-form__main__header">
            <Header
              dropdownRef={dropdownRef}
              toggleDropdown={toggleDropdown}
              isDropdownOpen={isDropdownOpen}
              userName={"Admin"}
              dropdownMenu={[
                {
                  name: "Profile",
                  link: "/profile",
                },
                {
                  name: "Logout",
                  link: "/logout",
                },
              ]}
              heading={"Add Medicine"}
            />
          </div>

          <div className="add-product-form__content">
            <form className="form">
              <SelectField
                label="Select Product Type"
                id="product-type"
                name="product-type"
                options={productTypes}
                value={state.productType}
                onChange={(e) => dispatch({type: "SET_PRODUCT_TYPE", payload: e.target.value})}
                required={true}
              />
              <FormInput
                label="Product Code"
                type="text"
                id="medicine-expiry"
                name="medicine-expiry"
                onChange={(e) => dispatch({type: "SET_PRODUCT_CODE", payload: e.target.value})}
                required={true}
              />
              <FormInput
                label="Product Title"
                type="text"
                id="product-title"
                name="product-title"
                onChange={(e) => dispatch({type: "SET_PRODUCT_TITLE", payload: e.target.value})}
                required={true}
              />
              <FormInput
                label="Total Stock"
                type="text"
                id="total-stock"
                name="total-stock"
                onChange={(e) => dispatch({type: "SET_TOTAL_STOCK", payload: e.target.value})}
                required={true}
              />
              <SelectField
                label="Select Company Name"
                id="company-name"
                name="company-name"
                options={companyNames}
                value={state.companyName}
                onChange={(e) => dispatch({type: "SET_COMPANY_NAME", payload: e.target.value})}
                required={true}
              />
              <FormInput
                label="Cost Per Month"
                type="text"
                id="cost-per-month"
                name="cost-per-month"
                onChange={(e) => dispatch({type: "SET_COST_PER_MONTH", payload: e.target.value})}
                required={true}
              />
              <FormInput
                label="Expiry Date"
                type="date"
                id="expiry-date"
                name="expiry-date"
                onChange={(e) => dispatch({type: "SET_EXPIRY_DATE", payload: e.target.value})}
                required={true}
              />
              <FormInput
                label="Manufacture Date"
                type="date"
                id="manufacture-date"
                name="manufacture-date"
                onChange={(e) => dispatch({type: "SET_MANUFACTURE_DATE", payload: e.target.value})}
                required={true}
              />
              <div className="grid-item full-width">
                <label htmlFor="medicine-description">Description</label>
                <textarea
                  type="text"
                  id="medicine-description"
                  name="medicine-description"
                  onChange={(e) => dispatch({type: "SET_DESCRIPTION", payload: e.target.value})}
                  required
                />
              </div>
              <div className="form-button" onClick={handleSubmit}>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default AddMedicine;
