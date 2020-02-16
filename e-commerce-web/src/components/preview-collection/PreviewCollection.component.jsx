import React from "react";
import CollectionItem from "../../components/collection-item/CollectionItem.component";
import "./PreviewCollection.styles.scss";

const PreviewCollection = ({ title, items }) => (
  <div className="collection-preview">
    <h2 className="title">{title.toUpperCase()}</h2>
    <div className="preview">
      {
        items.filter((item, index) => index < 4).map(({ id, ...otherProps }) => (
          <CollectionItem id={id} {...otherProps}/>
        ))
      }
    </div>
  </div>
);

export default PreviewCollection;