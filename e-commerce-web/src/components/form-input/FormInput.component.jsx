import React from "react";
import "./FormInput.styles.scss";

const FormInput = ({ handleChange, label, ...otherProps }) => (
  <div className="group">
    <input className="form-input" onChange={handleChange} { ...otherProps }/>
    {
      Boolean(label) ? (<label className={`${Boolean(otherProps.value.length) ? 'shrink' : ''} form-input-label`}>{label}</label>) : null
    }
  </div>
);

export default FormInput;