import {
  faUser,
  faHistory,
  // faVial,
  faPrescriptionBottleAlt,
  // faBookMedical,
  faClipboardList,
  faCalendarAlt,
  faGift,
  faWallet,
  // faCoins,
  faShoppingCart,
  faCommentDots,
} from '@fortawesome/free-solid-svg-icons';

const profileLinks = [
  { name: "My Account", icon: faUser, href: "/my-account" },
  { name: "Purchase History", icon: faHistory, href: "/purchase-history" },
  // { name: "My Lab Orders", icon: faVial, href: "/lab-orders" },
  { name: "My Prescriptions", icon: faPrescriptionBottleAlt, href: "/prescriptions" },
  { name: "My Appointments", icon: faCalendarAlt, href: "/appointments" },
  { name: "My Reviews", icon: faCommentDots, href: "/reviews" },
  { name: "My Wallet", icon: faWallet, href: "/wallet" },
  { name: "My Offers", icon: faGift, href: "/offers" },
  // { name: "My Coins", icon: faCoins, href: "/coins" },
  { name: "My Orders", icon: faShoppingCart, href: "/orders" },
  // { name: "My Bookmarks", icon: faBookMedical, href: "/bookmarks" },
  { name: "My Reports", icon: faClipboardList, href: "/reports" },
];

export default profileLinks;
