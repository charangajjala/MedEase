import { useEffect } from "react";
import {
  Sidebar,
  ToggleButton,
  Footer,
  Header,
  ReportTable,
} from "../../../components/index.js";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate.jsx";
import endpoints from "../../../constants/endpoints.js";
import { useState } from "react";
import useVisibilityToggle from "../../../hooks/useVisibilityToggle.jsx";
import "./CategoryReport.scss";
import { useNavigate } from "react-router-dom";

const logo =
  "https://medeaseportal-bucket.s3.us-east-2.amazonaws.com/assets/logo.png";

const columnHeaders = [
  { key: "id", label: "ID" },
  { key: "categoryName", label: "Name" },
  { key: "description", label: "Description" },
];

const CategoryReport = () => {
  const [categories, setCategories] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const {
    isSidebarVisible,
    toggleSidebar,
    isDropdownOpen,
    toggleDropdown,
    dropdownRef,
  } = useVisibilityToggle();
  const navigate= useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosPrivate.get(endpoints.GET_CATERGORY_URL);
        const data = await response.data;
        setCategories(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleView = (category) => {
    navigate("/admin/categories/" + category.id);
  };

  const handleDelete = () => {
    console.log("Delete");
  };

  return (
    <>
      <div className="category-report">
        <ToggleButton
          toggleSidebar={toggleSidebar}
          isSidebarVisible={isSidebarVisible}
        />
        <Sidebar
          logo={logo}
          isSidebarVisible={isSidebarVisible}
          toggleSidebar={toggleSidebar}
        />

        <main className="category-report__main">
          <div className="category-report__main__header">
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
              heading={"All Categories Report"}
            />
          </div>
          <div className="category-report__content">
            <ReportTable
              data={categories}
              columnHeaders={columnHeaders}
              renderRowActions={(category) => (
                <>
                  <button
                    className="action-button edit"
                    onClick={() => handleView(category)}
                  >
                    View / Update
                  </button>
                  <button
                    className="action-button delete"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </>
              )}
            />
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default CategoryReport;
