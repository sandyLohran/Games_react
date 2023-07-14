import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';


const BuscarOrdStar = ({ onFavoritosChange }) => {
    const db = getDatabase();
    const [favoritos, setFavoritos] = useState(null);


    useEffect(() => {
        const starCountRef = ref(db, 'Classificacao/');
        onValue(starCountRef, (snapshot) => {
            const datalist = snapshot.val();
            setFavoritos(datalist);
            if (onFavoritosChange) {
                onFavoritosChange(datalist);
            }
        });
    }, [db, onFavoritosChange]);
    return null;
};
export default BuscarOrdStar;
