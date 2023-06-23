import React from "react";
import './card.css'
const Card = ({ game, selectedGenre }) => {
  if (selectedGenre === "" || game.genre.toLowerCase() === selectedGenre.toLowerCase()) {
    return (
      <div className="card h-100 w-100 justify-content-center cor">
        <img className="card-img-top tamanhoImg" src={game.thumbnail} alt={game.title} />
        <div className="card-body text-light">
          <h4 className="text-center card-title">
            <strong>{game.title}</strong>
          </h4>
          <div className="genre rounded bg-light text-center">
            <p className="text-dark card-text text-uppercase">{game.genre}</p>
          </div>
          <p className="description card-text text-secondary">{game.short_description}</p>
          
        </div>
      </div>
    );
  }

  return null;
};

export default Card;
