import PropTypes from "prop-types";

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
        {props.links.map((link, index) => (
          <a href="/" key={index} className="admin-dashboard__nav-link">
            {link}
          </a>
        ))}
      </nav>
    </aside>
  );
};

Sidebar.propTypes = {
  logo: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(PropTypes.string).isRequired,
  isSidebarVisible: PropTypes.bool.isRequired,
};

export default Sidebar;
