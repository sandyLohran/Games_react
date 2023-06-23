import React from "react";
import "./filtro.css";

const Filtro = ({ filterValue, handleFilterChange, selectedGenre, handleGenreChange, genres }) => {
    console.log("Filter Title",filterValue);
    console.log("Genre Select:",selectedGenre);
    return (
      <div className="s ">
        <input
          className="pesquisar "
          type="text"
          placeholder="Filtrar por título"
          value={filterValue}
          onChange={handleFilterChange}
        />
<select className="filtro" value={selectedGenre} onChange={handleGenreChange}>
  <option value="">Todos os gêneros</option>
  
  {genres.map((genre) => (
    
    <option value={genre} key={genre}>
      {genre}
    </option>
  ))}
</select>

      </div>
      
    );
    
  };

export default Filtro;
