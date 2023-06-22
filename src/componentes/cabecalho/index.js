import React from "react";
import Filtro from "./filtro";
import "./cabecalho.css";

const cabecalho = ({ filterValue, handleFilterChange }) => {
  return (
    <header className="cabecalho">
        <div className="cabecalho__conteudo">

      <h1 className="text-light">
        <strong>Games</strong>
      </h1>
      <Filtro
        filterValue={filterValue}
        handleFilterChange={handleFilterChange}
        />
        </div>
    </header>
  );
};

export default cabecalho;