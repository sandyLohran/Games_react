import React, { useEffect, useState, useCallback } from 'react'
import Card from 'react-bootstrap/Card';
import StarAll from '../StarALL';

const CardStar = ({ fav, gamesBase }) => {

    
    const [sortedGames, setSortedGames] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);


    const getAverageRating = useCallback((gameTitle) => {
        gameTitle = gameTitle.replace(/\s/g, '');
        let totalRating = 0;
        let count = 0;
        for (const userRatings of Object.values(fav)) {
            if (gameTitle in userRatings) {
                totalRating += userRatings[gameTitle];
                count++;
            }
        }

        return count > 0 ? totalRating / count : 0;
    }, [fav]);


    useEffect(() => {
        const sortedGames = gamesBase.slice().sort((a, b) => {
            const aRating = getAverageRating(a.title);
            const bRating = getAverageRating(b.title);

            if (aRating === 0 && bRating === 0) return 0;
            if (aRating === 0) return 1;
            if (bRating === 0) return -1;


            return bRating - aRating;
        });
        /* console.log(gamesBase)  */
        setSortedGames(sortedGames);
    }, [gamesBase, fav, getAverageRating]);


    useEffect(() => {
        // ...
        setIsUpdated(true);
      }, [gamesBase, fav]);

    
    const firstThreeObjects = sortedGames.slice(0, 5);
    return (
        <>
            {isUpdated && (
            <section className='container'>
                <h3 className='text-center m-4 text-light'><strong>TOP 5 CLASSIFICADOS</strong></h3>
                <div className='container row mx-auto g-4  justify-content-center'>

                    {firstThreeObjects.map((item, index) => (
                        <div key={index} className='col-6 col-md-4 col-xxl-2'>

                            <Card>
                                <Card.Img variant="top" src={item.thumbnail} />
                                <Card.Body className="card-header bg-black">
                                    <Card.Title className="text-center text-light"><StarAll averageRating={getAverageRating(item.title)} /></Card.Title>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
            </section>
             )}
        </>
    );
};

export default CardStar
