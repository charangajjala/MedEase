import useVisibilityToggle from "../../../hooks/useVisibilityToggle.jsx";

import {
  Sidebar,
  ToggleButton,
  Footer,
  Header,
  MedicineForm,
} from "../../../components/index.js";

import { links } from "../../../constants/links.js";
import { Toaster } from "react-hot-toast";

import "./UpdateMedicine.scss";
import logo from "../../../assets/logo.png";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate.jsx";
import endpoints from "../../../constants/endpoints.js";
import { useState } from "react";

const AddMedicine = () => {
  const {
    isSidebarVisible,
    toggleSidebar,
    isDropdownOpen,
    toggleDropdown,
    dropdownRef,
  } = useVisibilityToggle();

  const location = useLocation();
  const [productData, setProductData] = useState({});
  const { id } = location.state;
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosPrivate.get(
          endpoints.GET_ONE_MEDICINE_URL.replace("{id}", id)
        );
        if (response.status === 200) {
          setProductData(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const [selectedProduct, setSelectedProduct] = useState("");
  // const [seletedCompany, setSelectedCompany] = useState("");

  // Once the backend is done convert it to async for post request
  // Upon successful submit clear the form
  // else display error message
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="update-product-form">
        <Toaster position="bottom-right" reverseOrder={false} />
        <ToggleButton
          toggleSidebar={toggleSidebar}
          isSidebarVisible={isSidebarVisible}
        />

        <Sidebar
          logo={logo}
          links={links}
          isSidebarVisible={isSidebarVisible}
        />
        <main className="update-product-form__main">
          <div className="update-product-form__main__header">
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
              heading={`${productData.companyName} - ${productData.productTitle}`}
            />
          </div>

          <div className="update-product-form__content">
            <MedicineForm
              button_name="Update"
              onSubmit={handleSubmit}
              productData={productData}
            />
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default AddMedicine;
