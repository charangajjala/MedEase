import {
  Sidebar,
  ToggleButton,
  Footer,
  Header,
  FormInput,
} from "../../../components/index.js";
import useVisibilityToggle from "../../../hooks/useVisibilityToggle.jsx";

import { links } from "../../../constants/links.js";

import logo from "../../../assets/logo.png";
import "./SellsDashboard.scss";
import { useNavigate } from "react-router-dom";
import { useRef, useEffect, useReducer } from "react";

const initialState = {
  customerName: "",
  customerMobile: "",
};

function reducers(state, action) {
  switch (action.type) {
    case "SET_CUSTOMER_NAME":
      return { ...state, customerName: action.payload };
    case "SET_CUSTOMER_MOBILE":
      return { ...state, customerMobile: action.payload };
    default:
      return state;
  }
}

const SellsDashboard = () => {
  const {
    isSidebarVisible,
    toggleSidebar,
    isDropdownOpen,
    toggleDropdown,
    dropdownRef,
  } = useVisibilityToggle();

  const [state, dispatch] = useReducer(reducers, initialState);
  const navigate = useNavigate();
  const customerNameRef = useRef();

  useEffect(() => {
    customerNameRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/admin/sellsExt", { state });
  };

  return (
    <>
      <div className="sells-form">
        <ToggleButton
          toggleSidebar={toggleSidebar}
          isSidebarVisible={isSidebarVisible}
        />

        <Sidebar
          logo={logo}
          links={links}
          isSidebarVisible={isSidebarVisible}
        />
        <main className="sells-form__main">
          <div className="sells-form__main__header">
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
              heading={"Sell"}
            />
          </div>

          <div className="sells-form__content">
            <h2>Sells Dashboard</h2>
            <hr />
            <form onSubmit={handleSubmit}>
              <div className="sells-form__content__inputs">
                <FormInput
                  label="Customer Name"
                  type="text"
                  id="customer-name"
                  name="customerName"
                  autoComplete="off"
                  onChange={(e) =>
                    dispatch({
                      type: "SET_CUSTOMER_NAME",
                      payload: e.target.value,
                    })
                  }
                  ref={customerNameRef}
                  required={true}
                />
                <FormInput
                  label="Customer Mobile"
                  type="text"
                  id="customer-mobile"
                  name="customerMobile"
                  autoComplete="off"
                  onChange={(e) =>
                    dispatch({
                      type: "SET_CUSTOMER_MOBILE",
                      payload: e.target.value,
                    })
                  }
                  required={true}
                />
                <button type="submit">Submit</button>
              </div>
              <div className="sells-form__content__button"></div>
            </form>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default SellsDashboard;
