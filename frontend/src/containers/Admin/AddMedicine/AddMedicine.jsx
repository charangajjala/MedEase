import useVisibilityToggle from "../../../hooks/useVisibilityToggle.jsx";

import {
  Sidebar,
  ToggleButton,
  Footer,
  Header,
  MedicineForm,
} from "../../../components/index.js";
import { Toaster } from "react-hot-toast";

import { links } from "../../../constants/links.js";

import "./AddMedicine.scss";
import logo from "../../../assets/logo.png";
import { useEffect } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate.jsx";
import endpoints from "../../../constants/endpoints.js";

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

  // Once the backend is done convert it to async for post request
  // Upon successful submit clear the form
  // else display error message

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    try {
      const fetchBuckets = async () => {
        const response = await axiosPrivate.get(endpoints.LIST_BUCKETS_URL);
        const data = response.data;
        console.log("The buckets are : ", data);
      };
      fetchBuckets();
    } catch (error) {
      console.log(error);
    }

    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="add-product-form">
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
            <MedicineForm button_name="Submit" />
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default AddMedicine;
