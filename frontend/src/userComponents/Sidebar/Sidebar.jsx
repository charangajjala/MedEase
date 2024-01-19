import "./Sidebar.scss";
import SidebarItem from "../SidebarItem/SidebarItem";
import profileLinks from "../../constants/profileLinks";

const Sidebar = () => (
  <div className="sidebar">
    {profileLinks.map((link, index) => (
      <SidebarItem
        key={index}
        name={link.name}
        icon={link.icon}
        href={link.href}
      />
    ))}
  </div>
);

export default Sidebar;
