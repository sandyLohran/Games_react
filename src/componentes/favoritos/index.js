import { useState, useEffect } from 'react';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import './favoritos.css'

function FavoriteSystem({ postId }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [user, setUser] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

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
    const db = getDatabase();
    if (user) {
      // Remova caracteres inválidos do postId
      const safePostId = postId.replace(/[.\s]/g, '');
      const favoriteRef = ref(db, `/Favoritos/${user.uid}/${safePostId}`);
      const favoriteListener = onValue(favoriteRef, (snapshot) => {
        setIsFavorite(snapshot.exists());
      });

      return () => {
        // Limpe o listener quando o componente for desmontado
        favoriteListener();
      };
    }
  }, [postId, user]);

  const handleFavoriteClick = () => {
    if (user) {
      const db = getDatabase();
      // Remova caracteres inválidos do postId
      const safePostId = postId.replace(/[.\s]/g, '');
      const favoriteRef = ref(db, `/Favoritos/${user.uid}/${safePostId}`);

      if (isFavorite) {
        set(favoriteRef, null);
        setIsFavorite(false);
      } else {
        set(favoriteRef, true);
        setIsFavorite(true);
      }

      setIsAnimating(true);
      setTimeout(() => {
        setIsAnimating(false);
      }, 1000);
    } else {
      window.location.href = '/login';
    }
  };

  return (
  
    <div>
      
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="1em"
        viewBox="0 0 512 512"
        onClick={handleFavoriteClick}
        className={isAnimating ? 'star animating' : 'star'}
      >
        <path
          fill={isFavorite ? 'red' : 'gray'}
          d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
        />
      </svg>
    </div>
      
        
  );
}

export default FavoriteSystem;
