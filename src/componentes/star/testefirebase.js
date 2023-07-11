import { useState, useEffect } from 'react';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import './star.css';

function RatingSystem({ postId }) {
  const [rating, setRating] = useState(0);
  const [user, setUser] = useState(null);
  const [selectedStar, setSelectedStar] = useState(null);
  const [isTrembling, setIsTrembling] = useState(false);

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
      const ratingRef = ref(db, `/Classificacao/${user.uid}/${safePostId}`);
      const ratingListener = onValue(ratingRef, (snapshot) => {
        if (snapshot.exists()) {
          setRating(snapshot.val());
        }
      });

      return () => {
        // Limpe o listener quando o componente for desmontado
        ratingListener();
      };
    }
  }, [postId, user]);

  const handleStarClick = (starRating) => {
    if (user) {
      const db = getDatabase();
      // Remova caracteres inválidos do postId
      const safePostId = postId.replace(/[.\s]/g, '');
      const ratingRef = ref(db, `/Classificacao/${user.uid}/${safePostId}`);

      if (selectedStar === starRating) {
        set(ratingRef, 0);
        setRating(0);
        setSelectedStar(null);
      } else {
        set(ratingRef, starRating);
        setRating(starRating);
        setSelectedStar(starRating);
      }

      setIsTrembling(true);
      setTimeout(() => {
        setIsTrembling(false);
      }, 500);
    } else {
      window.location.href = '/login';
    }
  };

  return (
    <div>
      <div>
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            onClick={() => handleStarClick(star)}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className={`star-rating ${selectedStar === star ? 'star-selected' : ''} ${isTrembling && selectedStar === star ? 'star-trembling' : ''}`}
          >
            <path
              fill={star <= rating ? 'orange' : 'gray'}
              d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
            />
          </svg>
        ))}
      </div>
    </div>
  );
}

export default RatingSystem;
