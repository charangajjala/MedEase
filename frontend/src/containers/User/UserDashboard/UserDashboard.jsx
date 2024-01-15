import { useEffect, useState } from "react";
import {
  Header,
  Footer,
  Navbar,
  BannerSlider,
  ProductCard,
} from "../../../userComponents";
import "./UserDashboard.scss";
import { useRef } from "react";

const UserDashboard = () => {
  const [isNavFixed, setIsNavFixed] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const navbarRef = useRef(null);

  const handleAddToCart = () => {
    setCartCount(cartCount + 1);
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
      <div className="user-dashboard">
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
                <ProductCard onAddToCart={() => handleAddToCart()}/>
                <ProductCard onAddToCart={() => handleAddToCart()}/>
                <ProductCard onAddToCart={() => handleAddToCart()}/>
                <ProductCard onAddToCart={() => handleAddToCart()}/>
                <ProductCard onAddToCart={() => handleAddToCart()}/>
              </div>
            </div>

            <div className="user-dashboard__content__products">
              <div className="user-dashboard__content__products__heading">
                <h2>Our Products</h2>
              </div>
              <div className="user-dashboard__content__product__cards">
                <ProductCard onAddToCart={() => handleAddToCart()}/>
                <ProductCard onAddToCart={() => handleAddToCart()}/>
                <ProductCard onAddToCart={() => handleAddToCart()}/>
                <ProductCard onAddToCart={() => handleAddToCart()}/>
                <ProductCard onAddToCart={() => handleAddToCart()}/>
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
