import "./Footer.scss";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__content">
        &copy; {currentYear} Medical Store. All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
