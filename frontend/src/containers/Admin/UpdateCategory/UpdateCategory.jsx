import {
  Sidebar,
  ToggleButton,
  Footer,
  Header,
  FormInput,
  Textarea,
} from "../../../components/index.js";
import useVisibilityToggle from "../../../hooks/useVisibilityToggle.jsx";
import { useEffect, useReducer, useState } from "react";
import "./UpdateCategory.scss";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { links } from "../../../constants/links.js";
import endpoints from "../../../constants/endpoints.js";

const logo =
  "https://medeaseportal-bucket.s3.us-east-2.amazonaws.com/assets/logo.png";

const initialState = {
  categoryName: "",
  description: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_CATEGORY_NAME":
      return { ...state, categoryName: action.payload };
    case "SET_DESCRIPTION":
      return { ...state, description: action.payload };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
}

const UpdateCategory = () => {
  const axiosPrivate = useAxiosPrivate();
  const { id } = useParams();
  const [category, setCategory] = useState({});
  const {
    isSidebarVisible,
    toggleSidebar,
    isDropdownOpen,
    toggleDropdown,
    dropdownRef,
  } = useVisibilityToggle();
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axiosPrivate.get(
          endpoints.GET_ONE_CATEGORY_URL.replace("{id}", id)
        );
        const data = await response.data;
        setCategory(data);
        dispatch({ type: "SET_CATEGORY_NAME", payload: data.categoryName });
        dispatch({ type: "SET_DESCRIPTION", payload: data.description });
      } catch (err) {
        console.log(err);
      }
    };

    fetchCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosPrivate.put(
        endpoints.GET_ONE_CATEGORY_URL.replace("{id}", id),
        state
      );
      if (response.status === 200) {
        navigate("/admin/categories");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="update-category-form">
        <ToggleButton
          toggleSidebar={toggleSidebar}
          isSidebarVisible={isSidebarVisible}
        />

        <Sidebar
          logo={logo}
          links={links}
          isSidebarVisible={isSidebarVisible}
        />

        <main className="update-category-form__main">
          <div className="update-category-form__main__header">
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
              heading={"Update Category"}
            />
          </div>

          <div className="update-category-form__content">
            <form className="update-category-form__inputs">
              <FormInput
                label="Category Name"
                type="text"
                name="categoryName"
                id="category-name"
                autoComplete="off"
                value={state.categoryName}
                onChange={(e) =>
                  dispatch({
                    type: "SET_CATEGORY_NAME",
                    payload: e.target.value,
                  })
                }
                required={true}
              />
              <Textarea
                label="Description"
                name="description"
                id="description"
                value={state.description}
                onChange={(e) =>
                  dispatch({
                    type: "SET_DESCRIPTION",
                    payload: e.target.value,
                  })
                }
                required={true}
              />
              <div className="update-category-form__buttons">
                <button onClick={handleUpdate}>Update</button>
              </div>
            </form>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default UpdateCategory;
