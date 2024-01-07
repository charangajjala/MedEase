import {
  faTachometerAlt,
  faShoppingCart,
  faClipboardList,
  faBoxOpen,
  faBuilding,
  faSitemap,
  faPlusCircle,
  faSignOutAlt,
  faCapsules,
} from '@fortawesome/free-solid-svg-icons';

export const links = {
  dashboard: { name: "Dashboard", href: "/dashboard", icon: faTachometerAlt },
  startSell: { name: "Start Sell", href: "/sells", icon: faShoppingCart },
  orderReport: { name: "Order Report", href: "/report", icon: faClipboardList },
  productReport: { name: "Product Report", href: "/dashboard", icon: faBoxOpen },
  addCompany: { name: "Add Company", href: "/dashboard", icon: faBuilding },
  companyReport: { name: "Company Report", href: "/companies", icon: faSitemap },
  addCategory: { name: "Add Category", href: "/category", icon: faPlusCircle },
  logout: { name: "Logout", href: "/logout", icon: faSignOutAlt },
  addMedicine: { name: "Add Medicine", href: "/medicine", icon: faCapsules },
};
