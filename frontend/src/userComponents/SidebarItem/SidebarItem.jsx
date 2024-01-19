import "./SidebarItem.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import propTypes from "prop-types";

const SidebarItem = ({ name, icon, href }) => (
  <>
    <a href={href} className="sidebar-item">
      <FontAwesomeIcon icon={icon} className="sidebar-icon" />
      {name}
    </a>
    <hr />
  </>
);

SidebarItem.propTypes = {
  name: propTypes.string.isRequired,
  icon: propTypes.object.isRequired,
  href: propTypes.string.isRequired,
};

export default SidebarItem;
