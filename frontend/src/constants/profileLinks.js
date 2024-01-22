import {
  faUser,
  faHistory,
  // faVial,
  faPrescriptionBottleAlt,
  // faBookMedical,
  faClipboardList,
  // faCalendarAlt,
  faGift,
  faWallet,
  // faCoins,
  faShoppingCart,
  faCommentDots,
} from '@fortawesome/free-solid-svg-icons';

const profileLinks = [
  { name: "My Account", icon: faUser, href: "/profile/" },
  { name: "Purchase History", icon: faHistory, href: "/profile/purchase-history" },
  // { name: "My Lab Orders", icon: faVial, href: "/profile/lab-orders" },
  { name: "My Addresses", icon: faPrescriptionBottleAlt, href: "/profile/addresses" },
  // { name: "My Appointments", icon: faCalendarAlt, href: "/appointments" },
  { name: "My Reviews", icon: faCommentDots, href: "/profile/reviews" },
  { name: "My Wallet", icon: faWallet, href: "/profile/wallet" },
  { name: "My Offers", icon: faGift, href: "/profile/offers" },
  // { name: "My Coins", icon: faCoins, href: "/profile/coins" },
  { name: "My Orders", icon: faShoppingCart, href: "/profile/orders" },
  // { name: "My Bookmarks", icon: faBookMedical, href: "/profile/bookmarks" },
  { name: "My Reports", icon: faClipboardList, href: "/profile/reports" },
];

export default profileLinks;
