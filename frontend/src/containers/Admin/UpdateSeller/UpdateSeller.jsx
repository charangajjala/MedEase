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
// import { useNavigate } from "react-router-dom";
import { useEffect, useReducer } from "react";
import "./UpdateSeller.scss";
import { useNavigate, useParams } from "react-router-dom";

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

const UpdateSeller = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    isSidebarVisible,
    toggleSidebar,
    isDropdownOpen,
    toggleDropdown,
    dropdownRef,
  } = useVisibilityToggle();
  const {id} = useParams();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSeller = async () => {
      const response = await axiosPrivate.get(endpoints.GET_ONE_SELLER_URL.replace("{id}", id));
      const data = await response.data;
      dispatch({ type: "SET_NAME", payload: data.name });
      dispatch({ type: "SET_EMAIL", payload: data.email });
      dispatch({ type: "SET_LOCATION", payload: data.location });
      dispatch({ type: "SET_PHONE", payload: data.phone });
    }

    fetchSeller();
    // eslint-disable-next-line
  },[])

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axiosPrivate.put(endpoints.UPDATE_SELLER_URL.replace("{id}", id), state);
      navigate("/admin/sellers");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="update-seller">
        <ToggleButton
          toggleSidebar={toggleSidebar}
          isSidebarVisible={isSidebarVisible}
        />
        <Sidebar
          logo={logo}
          isSidebarVisible={isSidebarVisible}
          toggleSidebar={toggleSidebar}
        />

        <main className="update-seller__main">
          <div className="update-seller__main__header">
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
              heading={"Update Seller"}
            />
          </div>
          <div className="update-seller__content">
            <form className="update-seller__form">
              <FormInput
                label="Seller Name"
                id="name"
                type="text"
                name="name"
                value={state.name}
                onChange={(e) =>
                  dispatch({ type: "SET_NAME", payload: e.target.value })
                }
                placeholder="Enter Seller Name"
                required
              />
              <FormInput
                label="Email"
                id="email"
                name="email"
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
                id="phone"
                name="phone"
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
                id="address"
                name="address"
                value={state.location}
                onChange={(e) =>
                  dispatch({ type: "SET_LOCATION", payload: e.target.value })
                }
                type="text"
                placeholder="Enter Address"
                required
              />
              <div className="update-seller__buttons">
                <button className="update" onClick={handleUpdate}>
                  Update
                </button>
                <button
                  className="reset"
                  onClick={() => {
                    navigate("/admin/sellers");
                  }}
                >
                  Back to Sellers
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

export default UpdateSeller;
