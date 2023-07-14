import React, { useCallback, useState, useEffect } from 'react';
import BuscarOrdStar from './BuscarOrdStar';
import './ordstar.css'
import Card from '../card';
import CardStar from '../cardStar';

const OderStar = ({ filter, selectedGenre, gamesBase }) => {
    const [favoritos, setFavoritos] = useState([]);
    const [isReversed, setIsReversed] = useState(null);
    const [sortedGames, setSortedGames] = useState([]);
    const [numCards, setNumCards] = useState(9);

    const handleFavoritosChange = useCallback((favoritos) => {
        setFavoritos(favoritos);
    }, []);

    function getAverageRating(gameTitle) {
        gameTitle = gameTitle.replace(/\s/g, '');
        let totalRating = 0;
        let count = 0;
        for (const userRatings of Object.values(favoritos)) {
            if (gameTitle in userRatings) {
                totalRating += userRatings[gameTitle];
                count++;
            }
        }

        return count > 0 ? totalRating / count : 0;
    }

    useEffect(() => {
        setSortedGames(filter);
    }, [filter, favoritos]);

    function handleButtonClick() {
        setIsReversed(!isReversed);
        const sortedGames = filter.slice().sort((a, b) => {
            const aRating = getAverageRating(a.title);
            const bRating = getAverageRating(b.title);

            if (aRating === 0 && bRating === 0) return 0;
            if (aRating === 0) return 1;
            if (bRating === 0) return -1;

            return isReversed ? aRating - bRating : bRating - aRating;
        });

        setSortedGames(sortedGames);
    }

    return (
        <>
            <BuscarOrdStar onFavoritosChange={handleFavoritosChange} />
            <CardStar fav={favoritos} gamesBase={gamesBase} />

            <section className='mt-2 container '>
                <button className='buttonOrder ordenar' onClick={handleButtonClick}>
                    <svg


                        width="24"
                        height="24"
                        viewBox="0 0 24 24"

                    >
                        <path
                            fill= {isReversed === null ? 'white' : isReversed ? 'orange' : 'gray'} 
                            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                        />
                    </svg>
                    <strong>Ordenar</strong>
                    {isReversed === null ? '' : isReversed ? '▲' : '▼'}
                </button>

                <div className=" d-flex justify-content-center">
                    <div className="row justify-content-around">
                        {sortedGames.slice(0, numCards).map((game) => (
                            <div className="card-deck col-md-4 py-2" key={game.id}>
                                <Card game={game} selectedGenre={selectedGenre} averageRating={getAverageRating(game.title)} />
                            </div>
                        ))}
                    </div>
                </div>

                <button className='mostrarMais_btn mt-1' onClick={() => setNumCards(numCards + 9)}>ver mais</button>

            </section>
        </>
    );
};

export default OderStar;
