import React, { useState } from "react";

const SearchInput = ({ handleSearch }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (event) => {
    setSearchValue(event.target.value);
    handleSearch(event.target.value);
  };

  return (
    <div className="datatable-search">
      <input
        className="datatable-input"
        placeholder="Search..."
        type="search"
        title="Search within table"
        value={searchValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchInput;
