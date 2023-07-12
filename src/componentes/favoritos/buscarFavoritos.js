import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from 'firebase/auth';


const FirebaseDataComponent = ({ onFavoritosChange }) => {
  const db = getDatabase();
  const [user, setUser] = useState(null);
  const [favoritos, setFavoritos] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  useEffect(() => {
    if (user?.uid) {
      const starCountRef = ref(db, 'Favoritos/' + user.uid);
      onValue(starCountRef, (snapshot) => {
        const datalist = snapshot.val();
        setFavoritos(datalist);

     
        if (onFavoritosChange) {
          onFavoritosChange(datalist);
        }
      });
    }
  }, [db, user?.uid, onFavoritosChange]);

  return null; 
};

export default FirebaseDataComponent;
