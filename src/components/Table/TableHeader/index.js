import React from "react";

const TableHeader = ({ headers }) => {
  return (
    <thead>
      <tr>
        {headers.map((header, index) => (
          <th key={index} scope="col" style={{ width: header.width }}>
            {header.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
