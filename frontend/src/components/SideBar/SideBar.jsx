import PropTypes from "prop-types";
import "./Sidebar.scss";
import { links } from "../../constants/links.js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Sidebar = (props) => {
  return (
    <aside
      className={`admin-dashboard__sidebar ${
        props.isSidebarVisible ? "" : "admin-dashboard__sidebar--hidden"
      }`}
    >
      <div className="admin-dashboard__logo">
        <img src={props.logo} alt="Medical Store" />
      </div>
      <nav className="admin-dashboard__nav">
        {Object.values(links).map((link, index) => (
          <a href={link.href} key={index} className="admin-dashboard__nav-link">
            <FontAwesomeIcon
              icon={link.icon}
              className="admin-dashboard__nav-icon"
            />
            <span className="admin-dashboard__nav-text">{link.name}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
};

Sidebar.propTypes = {
  logo: PropTypes.string.isRequired,
  links: PropTypes.objectOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })
  ).isRequired,
  isSidebarVisible: PropTypes.bool.isRequired,
};

export default Sidebar;
