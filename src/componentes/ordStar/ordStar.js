import React, { useCallback, useState, useEffect } from 'react';
import BuscarOrdStar from './BuscarOrdStar';
import './ordstar.css'
import Card from '../card';

import MyCarousel from '../myCarousel';
import CardStar from '../cardStar';

const OderStar = ({ filter, selectedGenre, gamesBase }) => {
    const [favoritos, setFavoritos] = useState([]);
    const [isReversed, setIsReversed] = useState(false);
    const [sortedGames, setSortedGames] = useState([]);

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
            <div className='mt-2 container'>
                <button className='buttonOrder' onClick={handleButtonClick}>
                    <strong>Ordenar</strong>
                    {isReversed ? ' ▼' : ' ▲'}
                </button>

                <div className=" d-flex justify-content-center">
                    <div className="row justify-content-around">
                        {sortedGames.map((game) => (
                            <div className="card-deck col-md-4 py-2" key={game.id}>

                                <Card game={game} selectedGenre={selectedGenre} averageRating={getAverageRating(game.title)} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default OderStar;
