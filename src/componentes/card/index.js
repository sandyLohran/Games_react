import React, { useState, useEffect } from "react";
import Heart from "../favoritos";
import { auth } from "../../services/firebase";
import RatingSystem from "../star/testefirebase";
import StarAll from "../StarALL";
import Button from 'react-bootstrap/Button';
import './card.css'

const Card = ({ game, selectedGenre, averageRating }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);



  if (selectedGenre === "" || game.genre.toLowerCase() === selectedGenre.toLowerCase()) {

    return (

      <div className="card h-100 w-100 justify-content-center cor">
        <img className="card-img-top tamanhoImg" src={game.thumbnail} alt={game.title} />
        <div className="card-body text-light pt-3 pb-2">
          <h4 className="text-center mb-1 card-title">
            <strong>{game.title}</strong>
          </h4>
          <div className="">
            <StarAll averageRating={averageRating} />
          </div>
          <div className="genre rounded  text-center fundoGenre">
            <p className="card-text text-uppercase corGenre"><strong>{game.genre}</strong></p>
          </div>
          <div className="d-flex justify-content-between mb-2 mt-2">


            <RatingSystem postId={game.title} />
            <Heart postId={game.title} />

          </div>
          <div className="d-flex justify-content-between mb-2 mt-2">
            <span className='mx-1 '>Avalie esse jogo</span>
            <span className='mx-1 '>Favoritar</span>
          </div>
          <p className="description card-text text-secondary">{game.short_description}</p>
        </div>
        <Button href={game.game_url} className="mb-3 mx-3 btnURL" variant="primary">Jogar</Button>
      </div>
    );
  }

  return null;
};

export default Card;
