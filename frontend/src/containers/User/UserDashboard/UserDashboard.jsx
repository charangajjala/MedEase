import { useEffect, useState } from "react";
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
// import axiosInstance from "../../../api/axios";

// dummyData
import dummyData from "../../../constants/dummyData";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const UserDashboard = () => {
  const [isNavFixed, setIsNavFixed] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [showLoginBox, setShowLoginBox] = useState(false);

  const navbarRef = useRef(null);
  const axiosPrivate = useAxiosPrivate();

  const isAuthenticated = () => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    return auth && auth.accessToken;
  };

  const promptLogin = () => {
    setShowLoginBox(true);
  };

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const queryParams = new URLSearchParams();
  //       queryParams.append("categoryName", "All Categories");
  //       queryParams.append("keyword", "");
  //       const response = await axiosInstance.get(
  //         `${endpoints.GET_PRODUCTS_URL}?${queryParams.toString()}`,
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );
  //       const data = await response.data;
  //       console.log(data);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   fetchProducts();
  // }, []);

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

  const handleAddToCart = async (product) => {
    try {
      if (isAuthenticated()) {
        console.log("You have access to add", product);
        const response = await addToCart(product);
        console.log(response);
        setCartCount(cartCount + 1);
      } else {
        promptLogin();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addToCart = async (product) => {
    try {
      const response = await axiosPrivate.post(endpoints.ADD_TO_CART_URL, {
        userId: 4,
        medicineId: product.id,
        quantity: 1,
        costPerMonth: product.costPerMonth,
      });
      const data = await response.data;
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

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

            {/* <div className="user-dashboard__content__products">
              <div className="user-dashboard__content__products__heading">
                <h2>Our Products</h2>
              </div>
              <div className="user-dashboard__content__product__cards">
                <ProductCard
                  onAddToCart={handleAddToCart}
                  onClick={handleNavigation}
                />
                <ProductCard onAddToCart={handleAddToCart} />
                <ProductCard onAddToCart={handleAddToCart} />
                <ProductCard onAddToCart={handleAddToCart} />
                <ProductCard onAddToCart={handleAddToCart} />
              </div>
            </div> */}

            <div className="user-dashboard__content__products">
              <div className="user-dashboard__content__product__heading">
                <h2>Our Products</h2>
              </div>

              <div className="user-dashboard__content__product__cards">
                {dummyData.map((data) => (
                  <ProductCard
                    key={data.id}
                    onAddToCart={() => handleAddToCart(data)}
                    data={data}
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
