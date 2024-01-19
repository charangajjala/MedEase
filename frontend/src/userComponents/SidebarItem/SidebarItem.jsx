import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import propTypes from "prop-types";
import './SidebarItem.scss';

const SidebarItem = ({ name, icon, href }) => (
  <>
    <Link to={href} className="sidebar-item">
      <FontAwesomeIcon icon={icon} className="sidebar-icon" />
      <span className="sidebar-item-text">{name}</span>
    </Link>
    <hr />
  </>
);

SidebarItem.propTypes = {
  name: propTypes.string.isRequired,
  icon: propTypes.object.isRequired,
  href: propTypes.string.isRequired,
};

export default SidebarItem;
