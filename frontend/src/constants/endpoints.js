const Endpoints = {
  LOGIN: "/api/auth/login",
  REGISTER: "/api/auth/register",

  // Product Related URLs
  PRODUCT_REPORTS_URL: "/api/admin/medicine",
  UPDATE_PRODUCTS_URL: "/api/admin/medicine/medicine",

  // Admin Orders
  ADMIN_ORDERS_URL: "/api/admin/order",
  GET_ADMIN_ORDER_URL: "/api/admin/order/{id}",

  //Bucket Related URLs
  LIST_BUCKETS_URL: "/api/aws/listBuckets",

  // User Dashboard Products
  GET_PRODUCTS_URL: "/api/medicine",

  // Cart Links
  ADD_TO_CART_URL: "/api/cart",
  GET_CART_URL: "/api/cart",
  REMOVE_CART_ITEMS_URL: "/api/cart",

  // Cart Item links
  UPDATE_CART_ITEM_URL: "/api/cart/cartitem/{id}",

  // Company Related URLs
  COMPANY_REPORTS_URL: "/api/admin/company",
  ADD_COMPANY_URL: "/api/admin/company",
  UPDATE_COMPANY_URL: "/api/admin/company",

  // Category Related URLs
  ADD_CATEGORY_URL: "/api/admin/medicine_type",
  GET_ONE_CATEGORY_URL: "/api/admin/medicine_type/{id}",
  GET_CATERGORY_URL: "/api/admin/medicine_type",

  // Medicine Related URLs
  ADD_MEDICINE_URL: "/api/admin/medicine",
  GET_ONE_MEDICINE_URL: "/api/admin/medicine/{id}",
  MEDICINE_REPORTS_URL: "/api/admin/medicines",
  UPDATE_MEDICINE_URL: "/api/admin/medicines",

  // Order Related URLs
  ORDER_REPORTS_URL: "/api/admin/orders",

  // Login
  LOGIN_URL: "/api/auth/login",
  LOGOUT_URL: "/api/logout",

  // Refresh URL
  REFRESH_URL: "http://localhost:8080/api/auth/refresh",
};

export default Endpoints;
