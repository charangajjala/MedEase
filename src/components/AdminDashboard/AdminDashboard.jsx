import "./AdminDashboard.scss";
import store from "../../assets/store.jpg";
import logo from "../../assets/logo.png";
import { useState, useRef, useEffect } from "react";
import { FaBars, FaTimes, FaUser, FaSignOutAlt } from "react-icons/fa";

const links = [
  "Dashboard",
  "Start Sell",
  "Order Report",
  "Product Report",
  "Add Company",
  "Company Report",
  "Add Category",
  "Logout",
];

const AdminDashboard = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const dropdownRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="admin-dashboard">
      <button onClick={toggleSidebar} className="admin-dashboard__toggle-btn">
        {isSidebarVisible ? <FaTimes /> : <FaBars />}
      </button>

      <aside
        className={`admin-dashboard__sidebar ${
          isSidebarVisible ? "" : "admin-dashboard__sidebar--hidden"
        }`}
      >
        <div className="admin-dashboard__logo">
          <img src={logo} alt="Medical Store" />
        </div>
        <nav className="admin-dashboard__nav">
          {links.map((link, index) => (
            <a href="/" key={index} className="admin-dashboard__nav-link">
              {link}
            </a>
          ))}
        </nav>
      </aside>
      <main className="admin-dashboard__main">
        <header className="admin-dashboard__header">
          <h1>Medical Store Management System Admin Dashboard</h1>
          <div className="admin-dashboard__user-info" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="admin-dashboard__user-info-button"
            >
              Admin <FaUser />
            </button>
            {isDropdownOpen && (
              <ul className="admin-dashboard__user-info__dropdown-menu">
                <li className="admin-dashboard__user-info__dropdown-menu-item">
                  <a href="/profile">Profile</a>
                </li>
                <li className="admin-dashboard__user-info__dropdown-menu-item">
                  <a href="/logout">
                    Logout <FaSignOutAlt />
                  </a>{" "}
                  {/* Example icon */}
                </li>
              </ul>
            )}
          </div>
        </header>

        <div className="admin-dashboard__content">
          <div className="admin-dashboard__content-right">
            {links.map((link, index) => (
              <a
                href="/"
                key={index}
                className="admin-dashboard__content-right__link"
              >
                {link}
              </a>
            ))}
          </div>
          <img src={store} alt="store" />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
