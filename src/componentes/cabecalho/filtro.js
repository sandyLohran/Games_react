import React from "react";
import "./filtro.css";
const Filtro = ({ filterValue, handleFilterChange }) => {
  return (
    <div >

    <input
      className="pesquisar"
      type="text"
      placeholder="Filtrar por título"
      value={filterValue}
      onChange={handleFilterChange}
      />
      </div>
  );
};

export default Filtro;
