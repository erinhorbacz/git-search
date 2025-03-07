import React from "react";
import "../../styles.css";

const Checkbox = ({ id, label, checked, onChange }) => {
  return (
    <label className='checkbox-container'>
      <input
        type='checkbox'
        id={id}
        checked={checked}
        onChange={onChange}
        style={{
          width: "16px",
          height: "16px",
          accentColor: "#007bff",
          border: "1px solid #d1d5db",
          borderRadius: "4px",
        }}
      />
      <span className='checkbox-label'>{label}</span>
    </label>
  );
};

export default Checkbox;
