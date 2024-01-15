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

const UserDashboard = () => {
  const [isNavFixed, setIsNavFixed] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [showLoginBox, setShowLoginBox] = useState(false);

  const navbarRef = useRef(null);
  const auth = JSON.parse(localStorage.getItem("auth"));

  const handleLoginSucess = () => {
    setShowLoginBox(false);
    console.log("Login Success");
  };

  const handleAddToCart = () => {
    try {
      console.log("Add to cart function");
      if (auth?.accessToken) {
        console.log("You have access");
        setCartCount(cartCount + 1);
      } else {
        console.log("Login to add to cart");
        setShowLoginBox(true);
      }
    } catch (err) {
      console.log(err);
    }
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

            <div className="user-dashboard__content__products">
              <div className="user-dashboard__content__products__heading">
                <h2>Our Products</h2>
              </div>
              <div className="user-dashboard__content__product__cards">
                <ProductCard onAddToCart={handleAddToCart} />
                <ProductCard onAddToCart={handleAddToCart} />
                <ProductCard onAddToCart={handleAddToCart} />
                <ProductCard onAddToCart={handleAddToCart} />
                <ProductCard onAddToCart={handleAddToCart} />
              </div>
            </div>

            <div className="user-dashboard__content__products">
              <div className="user-dashboard__content__products__heading">
                <h2>Our Products</h2>
              </div>
              <div className="user-dashboard__content__product__cards">
                <ProductCard onAddToCart={handleAddToCart} />
                <ProductCard onAddToCart={handleAddToCart} />
                <ProductCard onAddToCart={handleAddToCart} />
                <ProductCard onAddToCart={handleAddToCart} />
                <ProductCard onAddToCart={handleAddToCart} />
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
