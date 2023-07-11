import React, { useState, useEffect } from "react";
import Heart from "../favoritos";
import { auth } from "../../firebase";
import RatingSystem from "../star/testefirebase";
import FirebaseDataComponent from "../../buscar";

const Card = ({ game, selectedGenre }) => {
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
        <div className="card-body text-light">
          <h4 className="text-center card-title">
            <strong>{game.title}</strong>
          </h4>
          <div className="d-flex justify-content-between">
            <RatingSystem postId={game.title}/>
            <Heart postId={game.title} />
           
          </div>
          <div className="genre rounded bg-light text-center mt-3">
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
