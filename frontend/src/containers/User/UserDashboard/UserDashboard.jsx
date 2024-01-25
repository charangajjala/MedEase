import { useContext, useEffect, useState } from "react";
import {
  Header,
  Footer,
  Navbar,
  BannerSlider,
  ProductCard,
  LoginBox,
} from "../../../userComponents";
import "./UserDashboard.scss";
import { useRef } from "react";
import endpoints from "../../../constants/endpoints";
import axiosInstance from "../../../api/axios";
import useCart from "../../../context/CartContext";

// dummyData
// import dummyData from "../../../constants/dummyData";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import AuthContext from "../../../context/AuthProvider";
import { Loading } from "../../../components";
import toast, { Toaster } from "react-hot-toast";

const UserDashboard = () => {
  const [isNavFixed, setIsNavFixed] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(0);
  // const [cartCount, setCartCount] = useState(0);
  const { cartCount, updateCartCount } = useCart();
  const [showLoginBox, setShowLoginBox] = useState(false);
  const [isProductsLoading, setIsProductsLoading] = useState(false);
  const [isCartLoading, setIsCartLoading] = useState(false);
  const [addingToCart, setAddingToCart] = useState({});
  const [products, setProducts] = useState([]);
  const { auth } = useContext(AuthContext);

  const navbarRef = useRef(null);
  const axiosPrivate = useAxiosPrivate();
  const notify = () => toast.success("Added to cart");

  // const isAuthenticated = () => {
  //   const auth = JSON.parse(localStorage.getItem("auth"));
  //   return auth && auth.accessToken;
  // };

  const fetchCartLength = async () => {
    if (auth?.accessToken !== null) {
      setIsCartLoading(true);
      try {
        const response = await axiosPrivate.get(endpoints.GET_CART_URL);
        const data = await response.data;
        const totalQuantity = data.reduce((acc, item) => {
          return acc + item.quantity;
        }, 0);
        updateCartCount(totalQuantity);
      } catch (err) {
        console.error(err);
      } finally {
        setIsCartLoading(false);
      }
    } else {
      updateCartCount(0);
    }
  };

  const fetchProducts = async () => {
    setIsProductsLoading(true);
    try {
      const queryParams = new URLSearchParams();
      queryParams.append("categoryName", "All Categories");
      queryParams.append("keyword", "");
      const response = await axiosInstance.get(
        `${endpoints.GET_PRODUCTS_URL}?${queryParams.toString()}`
      );
      const data = await response.data;
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsProductsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchProducts();
        await fetchCartLength();
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Login Functionality
  const promptLogin = () => {
    setShowLoginBox(true);
  };

  const handleLoginSucess = () => {
    setShowLoginBox(false);
    console.log("Login Success");
  };

  const toggleLoginModal = () => {
    setShowLoginBox(!showLoginBox);
  };

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    const navShouldFix = currentScrollPos > 50;
    setIsNavFixed(navShouldFix);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    setNavbarHeight(navbarRef.current.clientHeight);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //  Adding to cart functionality
  const handleAddToCart = async (product) => {
    setAddingToCart((prevState) => ({ ...prevState, [product.id]: true }));
    try {
      if (auth?.accessToken) {
        await addToCart(product);
        updateCartCount(cartCount + 1);
      } else {
        promptLogin();
      }
    } catch (err) {
      console.error("Error adding product to cart:", err);
    } finally {
      setAddingToCart((prevState) => ({ ...prevState, [product.id]: false }));
      notify();
    }
  };

  const addToCart = async (product) => {
    try {
      const response = await axiosPrivate.post(endpoints.ADD_TO_CART_URL, {
        medicineId: product.id,
        quantity: 1,
        costPerMonth: product.costPerMonth,
      });
      const data = await response.data;
      return data;
    } catch (err) {
      console.error("Error in addToCart:", err);
      throw err;
    }
  };

  if (isProductsLoading) {
    return <Loading message="Loading Products..." />;
  }

  if (isCartLoading) {
    return <Loading message="Updating Cart..." />;
  }

  return (
    <>
      {showLoginBox && (
        <div className="dashboard-blur">
          <LoginBox
            onClose={toggleLoginModal}
            onLogin={handleLoginSucess}
            show={showLoginBox}
          />
        </div>
      )}

      <div className={`user-dashboard ${showLoginBox ? "is-blurred" : ""}`}>
        <Toaster position="bottom-right" reverseOrder={false} />
        <div className="user-dahboard__header">
          <Header />
        </div>
        <div
          ref={navbarRef}
          className={`user-dashboard__navbar ${
            isNavFixed
              ? "user-dashboard__navbar--fixed"
              : "user-dashboard__navbar--static"
          }`}
        >
          <Navbar cartCount={cartCount} />
        </div>
        <main
          className="user-dashboard__main"
          style={{ paddingTop: isNavFixed ? `${navbarHeight}px` : "0" }}
        >
          <div className="user-dashboard__content">
            <div className="user-dashboard__content__banner">
              <BannerSlider />
            </div>

            <div className="user-dashboard__content__products">
              <div className="user-dashboard__content__product__heading">
                <h2>Our Products</h2>
              </div>

              <div className="user-dashboard__content__product__cards">
                {products.map((data) => (
                  <ProductCard
                    key={data.id}
                    onAddToCart={() => handleAddToCart(data)}
                    data={data}
                    addingToCart={addingToCart[data.id]}
                  />
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default UserDashboard;
