import "./AddMedicine.scss";
import logo from "../../assets/logo.png";
import { useState, useRef } from "react";

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

const AddMedicine = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [seletedCompany, setSelectedCompany] = useState("");

  const dropdownRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelectProduct = (e) => {
    setSelectedProduct(e.target.value);
  };

  const handleSelectCompany = (e) => {
    setSelectedCompany(e.target.value);
  };

  // Once the backend is done convert it to async for post request
  // Upon successful submit clear the form
  // else display error message
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted");
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
                value={selectedProduct}
                onChange={handleSelectProduct}
                required={true}
              />
              <FormInput
                label="Product Code"
                type="text"
                id="medicine-expiry"
                name="medicine-expiry"
                required={true}
              />
              <FormInput
                label="Product Title"
                type="text"
                id="product-title"
                name="product-title"
                required={true}
              />
              <FormInput
                label="Total Stock"
                type="text"
                id="total-stock"
                name="total-stock"
                required={true}
              />
              <SelectField
                label="Select Company Name"
                id="company-name"
                name="company-name"
                options={companyNames}
                value={seletedCompany}
                onChange={handleSelectCompany}
                required={true}
              />
              <FormInput
                label="Cost Per Month"
                type="text"
                id="cost-per-month"
                name="cost-per-month"
                required={true}
              />
              <FormInput
                label="Expiry Date"
                type="date"
                id="expiry-date"
                name="expiry-date"
                required={true}
              />
              <FormInput
                label="Manufacture Date"
                type="date"
                id="manufacture-date"
                name="manufacture-date"
                required={true}
              />
              <div className="grid-item full-width">
                <label htmlFor="medicine-description">Description</label>
                <textarea
                  type="text"
                  id="medicine-description"
                  name="medicine-description"
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
