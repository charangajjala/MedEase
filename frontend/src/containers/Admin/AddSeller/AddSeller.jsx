import {
  Sidebar,
  ToggleButton,
  Footer,
  Header,
  FormInput,
} from "../../../components/index.js";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate.jsx";
import endpoints from "../../../constants/endpoints.js";
import useVisibilityToggle from "../../../hooks/useVisibilityToggle.jsx";
import "./AddSeller.scss";
import { useReducer } from "react";
import toast, { Toaster } from "react-hot-toast";

const logo =
  "https://medeaseportal-bucket.s3.us-east-2.amazonaws.com/assets/logo.png";

const initialState = {
  name: "",
  email: "",
  location: "",
  phone: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_LOCATION":
      return { ...state, location: action.payload };
    case "SET_PHONE":
      return { ...state, phone: action.payload };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
};

const AddSeller = () => {
  const axiosPrivate = useAxiosPrivate();
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    isSidebarVisible,
    toggleSidebar,
    isDropdownOpen,
    toggleDropdown,
    dropdownRef,
  } = useVisibilityToggle();

  const validateForm = () => {
    if (!state.name) {
      toast.error("Please enter seller name");
      return false;
    }
    if (!state.email) {
      toast.error("Please enter seller email");
      return false;
    }
    if (!state.location) {
      toast.error("Please enter seller location");
      return false;
    }
    if (!state.phone) {
      toast.error("Please enter seller phone");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await axiosPrivate.post(endpoints.ADD_SELLER_URL, state);
      toast.success("Seller added successfully");
      dispatch({ type: "RESET_FORM" });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="add-seller">
        <Toaster position="bottom-right" reverseOrder="false" />
        <ToggleButton
          toggleSidebar={toggleSidebar}
          isSidebarVisible={isSidebarVisible}
        />
        <Sidebar
          logo={logo}
          isSidebarVisible={isSidebarVisible}
          toggleSidebar={toggleSidebar}
        />

        <main className="add-seller__main">
          <div className="add-seller__main__header">
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
              heading={"Add Seller"}
            />
          </div>
          <div className="add-seller__content">
            <form className="add-seller__form">
              <FormInput
                label="Seller Name"
                name="name"
                id="name"
                type="text"
                value={state.name}
                onChange={(e) =>
                  dispatch({ type: "SET_NAME", payload: e.target.value })
                }
                placeholder="Enter Seller Name"
                required
              />
              <FormInput
                label="Email"
                name="email"
                id="email"
                value={state.email}
                onChange={(e) =>
                  dispatch({ type: "SET_EMAIL", payload: e.target.value })
                }
                type="email"
                placeholder="Enter Email"
                required
              />
              <FormInput
                label="Phone"
                name="phone"
                id="phone"
                value={state.phone}
                onChange={(e) =>
                  dispatch({ type: "SET_PHONE", payload: e.target.value })
                }
                type="text"
                placeholder="Enter Phone"
                required
              />
              <FormInput
                label="Address"
                name="address"
                id="address"
                value={state.location}
                onChange={(e) =>
                  dispatch({ type: "SET_LOCATION", payload: e.target.value })
                }
                type="text"
                placeholder="Enter Address"
                required
              />
              <div className="add-seller__buttons">
                <button className="add" onClick={handleSubmit}>
                  Submit
                </button>
                <button
                  className="reset"
                  onClick={() => dispatch({ type: "RESET_FORM" })}
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default AddSeller;
