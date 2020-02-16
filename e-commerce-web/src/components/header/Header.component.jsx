import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import './Header.styles.scss';

const Header = props => (
  <div className="header">
    <Link className="logo-container" exact to="/">
      <Logo className="logo" />
    </Link>
    <div className="options">
      <Link className="option" to="/shop">SHOP</Link>
      <Link className="option" to="/contact">CONTACT</Link>
    </div>
  </div>
);

export default Header;