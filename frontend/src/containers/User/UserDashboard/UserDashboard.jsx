import { useEffect, useState } from "react";
import {
  Header,
  Footer,
  Navbar,
  BannerSlider,
  ProductCard,
} from "../../../userComponents";
import "./UserDashboard.scss";

const UserDashboard = () => {
  const [isNavFixed, setIsNavFixed] = useState(false);

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    const navShouldFix = currentScrollPos > 50;
    setIsNavFixed(navShouldFix);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

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
          className={`user-dashboard__navbar ${
            isNavFixed
              ? "user-dashboard__navbar--fixed"
              : "user-dashboard__navbar--static"
          }`}
        >
          <Navbar />
        </div>
        <main className="user-dashboard__main">
          <div className="user-dashboard__content">
            <div className="user-dashboard__content__banner">
              <BannerSlider />
            </div>

            <div className="user-dashboard__content__products">
              <div className="user-dashboard__content__products__heading">
                <h2>Our Products</h2>
              </div>
              <div className="user-dashboard__content__product__cards">
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
              </div>
            </div>

            <div className="user-dashboard__content__products">
              <div className="user-dashboard__content__products__heading">
                <h2>Our Products</h2>
              </div>
              <div className="user-dashboard__content__product__cards">
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
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
