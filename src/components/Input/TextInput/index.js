import React, { useState } from "react";

const TextInput = ({
  label,
  value,
  onChange,
  placeholder,
  isRequired = false,
}) => {
  const [inputValue, setInputValue] = useState(value || "");

  const handleChange = (ev) => {
    setInputValue(ev.target.value);
    onChange(ev.target.value);
  };

  return (
    <div className="row mb-3">
      <label htmlFor={label} className="col-sm-2 col-form-label">
        {label}
        {isRequired && <span className="text-danger ml-2"> *</span>}
      </label>
      <div className="col-sm-10">
        <input
          value={inputValue}
          onChange={handleChange}
          placeholder={placeholder}
          className="form-control"
        />
      </div>
    </div>
  );
};

export default TextInput;
