import React, { useState } from "react";
import { Editor } from "primereact/editor";

function EditorInput({ id, label, value, onTextChange, isRequired = false }) {
  return (
    <div className="row mb-3">
      <label htmlFor={id} className="col-sm-2 col-form-label">
        {label}
        {isRequired && <span className="text-danger ml-2"> *</span>}
      </label>
      <div className="col-sm-10">
        <div className="form-floating">
          <Editor
            value={value}
            onTextChange={(e) => onTextChange(e.htmlValue)}
            style={{ height: "320px" }}
          />
        </div>
      </div>
    </div>
  );
}

export default EditorInput;
