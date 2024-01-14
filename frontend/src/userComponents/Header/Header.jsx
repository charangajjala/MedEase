import "./Header.scss";
import logo from "../../assets/logo.png";

const Header = () => {
  return (
    <header>
      <div className="header-container">
        <div className="header-container__content__logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="header-container__content__profile">
          <span>Profile</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
