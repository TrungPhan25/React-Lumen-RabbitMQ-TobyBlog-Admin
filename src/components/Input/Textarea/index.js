import React, { useState } from "react";

function TextareaInput({
  label,
  value,
  onChange,
  placeholder,
  isRequired = false,
}) {
  const [inputValue, setInputValue] = useState(value || "");

  const handleChange = (ev) => {
    setInputValue(ev.target.value);
    onChange(ev.target.value);
  };
  return (
    <div className="row mb-3">
      <label htmlFor="inputText" className="col-sm-2 col-form-label">
        {label}
      </label>
      <div className="col-sm-10">
        <div className="form-floating">
          <textarea
            className="form-control"
            placeholder="Summary"
            id="floatingTextarea"
            style={{ height: "100px" }}
            value={inputValue}
            onChange={handleChange}
          ></textarea>
          <label htmlFor="floatingTextarea">{placeholder}</label>
        </div>
      </div>
    </div>
  );
}

export default TextareaInput;
