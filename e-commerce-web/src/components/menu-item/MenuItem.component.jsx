import React from "react";
// import "./menu.scss";
import "./MenuItem.styles.scss";
// import './MenuItem.styles.scss';

const MenuItem = ({ index, title, imageUrl, size }) => (
  <div className={`${size} menu-item`} key={index}>
    <div
      className="background-image"
      style={{
        backgroundImage: `url(${imageUrl})`
      }}
    ></div>
    <div className="content">
      <h3 className="title">{title}</h3>
      <span className="subtitle">SHOP NOW</span>
    </div>
  </div>
);

export default MenuItem;
