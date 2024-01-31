import {
  faTachometerAlt,
  // faShoppingCart,
  faClipboardList,
  faBoxOpen,
  faBuilding,
  faSitemap,
  faPlusCircle,
  faSignOutAlt,
  faCapsules,
  faBarsProgress,
  faCartFlatbedSuitcase,
  // faBoxes,
} from '@fortawesome/free-solid-svg-icons';

export const links = {
  dashboard: { name: "Dashboard", href: "/admin/dashboard", icon: faTachometerAlt },
  // startSell: { name: "Start Sell", href: "/admin/sells", icon: faShoppingCart },
  orderReport: { name: "Order Report", href: "/admin/report", icon: faClipboardList },
  productReport: { name: "Product Report", href: "/admin/products", icon: faBoxOpen },
  addMedicine: { name: "Add Product", href: "/admin/medicine", icon: faCapsules },
  companyReport: { name: "Company Report", href: "/admin/companies", icon: faSitemap },
  addCompany: { name: "Add Company", href: "/admin/companyAdd", icon: faBuilding },
  addCategory: { name: "Add Category", href: "/admin/category", icon: faPlusCircle },
  categoryReport: { name: "Category Report", href: "/admin/categories", icon: faBarsProgress },
  addSeller: { name: "Add Seller", href: "/admin/seller", icon: faCartFlatbedSuitcase },
  // sellerReport: { name: "Seller Report", href: "/admin/sellers", icon: faBoxes },
  logout: { name: "Logout", href: "/logout", icon: faSignOutAlt },
};
