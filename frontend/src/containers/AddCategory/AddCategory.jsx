import {
  Sidebar,
  ToggleButton,
  Footer,
  Header,
  FormInput,
  Textarea,
} from "../../components/index.js";
import useVisibilityToggle from "../../hooks/useVisibilityToggle";

import { links } from "../../constants/links.js";
import endpoints from "../../constants/endpoints.js";

import logo from "../../assets/logo.png";
import "./AddCategory.scss";
import { useReducer, useEffect, useRef } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.jsx";

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

const AddCategory = () => {
  const {
    isSidebarVisible,
    toggleSidebar,
    isDropdownOpen,
    toggleDropdown,
    dropdownRef,
  } = useVisibilityToggle();

  const [state, dispatch] = useReducer(reducer, initialState);
  const categoryNameRef = useRef();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    categoryNameRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.post(
        endpoints.ADD_CATEGORY_URL,
        state
      );
      if (response.status === 201) {
        dispatch({
          type: "RESET_FORM",
        });
        alert("Category added successfully");
      } else {
        alert("Something went wrong");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="add-category-form">
        <ToggleButton
          toggleSidebar={toggleSidebar}
          isSidebarVisible={isSidebarVisible}
        />

        <Sidebar
          logo={logo}
          links={links}
          isSidebarVisible={isSidebarVisible}
        />
        <main className="add-category-form__main">
          <div className="add-category-form__main__header">
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
              heading={"Add New Category"}
            />
          </div>

          <div className="add-category-form__content">
            <form className="add-category-form__inputs">
              <FormInput
                label="Category Name"
                type="text"
                name="categoryName"
                id="category-name"
                onChange={(e) =>
                  dispatch({
                    type: "SET_CATEGORY_NAME",
                    payload: e.target.value,
                  })
                }
                required={true}
                ref={categoryNameRef}
              />
              <Textarea
                label="Description"
                name="description"
                id="description"
                onChange={(e) =>
                  dispatch({
                    type: "SET_DESCRIPTION",
                    payload: e.target.value,
                  })
                }
                required={true}
              />
              <div className="add-category-form__buttons">
                <button
                  className="add-category-form__buttons__cancel"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
                <button
                  className="add-category-form__buttons__save"
                  onClick={() =>
                    dispatch({
                      type: "RESET_FORM",
                    })
                  }
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

export default AddCategory;
