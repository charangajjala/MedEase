import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { links } from '../../constants/links';
import './Sidebar.scss';

const Sidebar = ({ logo, isSidebarVisible }) => {
  return (
    <aside className={`admin-dashboard__sidebar ${isSidebarVisible ? '' : 'admin-dashboard__sidebar--hidden'}`}>
      <div className="admin-dashboard__logo">
        <img src={logo} alt="Medical Store" />
      </div>
      <nav className="admin-dashboard__nav">
        {Object.values(links).map((link, index) => (
          <a href={link.href} key={index} className="admin-dashboard__nav-link">
            <FontAwesomeIcon icon={link.icon} className="admin-dashboard__nav-icon" />
            <span className="admin-dashboard__nav-text">{link.name}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
};

Sidebar.propTypes = {
  logo: PropTypes.string.isRequired,
  isSidebarVisible: PropTypes.bool.isRequired,
};

export default Sidebar;
