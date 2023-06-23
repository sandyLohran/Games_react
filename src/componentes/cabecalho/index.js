import React from "react";
import Filtro from "./filtro";
import "./cabecalho.css";



const Cabecalho = ({ filterValue, handleFilterChange, selectedGenre, handleGenreChange, genres }) => {
  return (
    <header className="container">
      <nav className="navbar navbar-light ">  
      
        <h1 className="titleHeader  ">
          <strong>Games</strong>
        </h1>
       
        <Filtro
  filterValue={filterValue}
  handleFilterChange={handleFilterChange}
  genres={genres}
  selectedGenre={selectedGenre}
  handleGenreChange={handleGenreChange}
/>
      
      </nav>
    </header>
  );
};

export default Cabecalho;
