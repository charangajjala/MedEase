import {
  Sidebar,
  ToggleButton,
  Footer,
  Header,
  ReportTable,
} from "../../components/index.js";
import useVisibilityToggle from "../../hooks/useVisibilityToggle";

import { links } from "../../constants/links.js";
import companies from "../../constants/companies.js";
import logo from "../../assets/logo.png";
import "./CompanyReport.scss";
import { useNavigate } from "react-router";

const columnHeaders = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "description", label: "Description" },
];

const CompanyReport = () => {
  const {
    isSidebarVisible,
    toggleSidebar,
    isDropdownOpen,
    toggleDropdown,
    dropdownRef,
  } = useVisibilityToggle();

  const navigate = useNavigate();
  const handleEdit = (company) => {
    navigate("/companyUpdate", { state: { company } });
  };

  const handleDelete = () => {
    console.log("Delete");
  }


  return (
    <>
      <div className="company-report">
        <ToggleButton
          toggleSidebar={toggleSidebar}
          isSidebarVisible={isSidebarVisible}
        />

        <Sidebar
          logo={logo}
          links={links}
          isSidebarVisible={isSidebarVisible}
        />

        <main className="company-report__main">
          <div className="company-report__main__header">
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
              heading={"All Companies Report"}
            />
          </div>
          <div className="company-report__content">
            <ReportTable
              data={companies}
              columnHeaders={columnHeaders}
              renderRowActions={(company) => (
                <>
                  <button
                    className="action-button edit"
                    onClick={() => handleEdit(company)}
                  >
                    Edit
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

export default CompanyReport;
