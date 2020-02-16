import React from "react";
import { withRouter } from "react-router-dom";
import "./MenuItem.styles.scss";

const MenuItem = ({ index, title, imageUrl, size, history, linkUrl, match }) => (
  <div className={`${size} menu-item`} key={index} onClick={() => history.push(`${match.url}${linkUrl}`)}>
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

export default withRouter(MenuItem);
