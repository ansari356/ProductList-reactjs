import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";

const Navbar = () => {
  const totalItems = useSelector((state) => state.cart.totalQuantity);

  const { lang, setLang } = useContext(LanguageContext);

  const handleChangeLanguage = (e) => {
    setLang(e.target.value);
  };

  

   return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <span className="navbar-brand">E-commerce App</span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-link" to="/">
              Home
            </Link>
         
            <Link className="nav-link" to="/login">
              Login
            </Link>
            <Link className="nav-link" to="/register">
              Register              
            </Link>

            <Link className="nav-link relative" to="/cart"  >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg> {totalItems}

          </Link>
            
             <select className="form-select w-auto" value={lang} onChange={handleChangeLanguage}>
        <option value="en">English</option>
        <option value="ar">العربية</option>
                </select>

          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;

