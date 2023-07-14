import { useState, useEffect } from 'react';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import './star.css';

function RatingSystem({ postId }) {
  const [rating, setRating] = useState(0);
  const [user, setUser] = useState(null);
  const [selectedStar, setSelectedStar] = useState(null);
  const [isTrembling, setIsTrembling] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    }, (error) => {
      setError(error.message);
    });
  }, []);

  useEffect(() => {
    const db = getDatabase();
    if (user) {

      const safePostId = postId.replace(/[.\s]/g, '');
      const ratingRef = ref(db, `/Classificacao/${user.uid}/${safePostId}`);
      const ratingListener = onValue(ratingRef, (snapshot) => {
        if (snapshot.exists()) {
          setRating(snapshot.val());
        }
      }, (error) => {
        setError(error.message);
      });

      return () => {

        ratingListener();
      };
    }
  }, [postId, user]);

  const handleStarClick = (starRating) => {
    if (user) {
      const db = getDatabase();

      const safePostId = postId.replace(/[.\s]/g, '');
      const ratingRef = ref(db, `/Classificacao/${user.uid}/${safePostId}`);

      if (selectedStar === starRating) {
        set(ratingRef, 0)
          .then(() => {
            setRating(0);
            setSelectedStar(null);
          })
          .catch((error) => {
            setError(error.message);
          });
      } else {
        set(ratingRef, starRating)
          .then(() => {
            setRating(starRating);
            setSelectedStar(starRating);
          })
          .catch((error) => {
            setError(error.message);
          });
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
      {error && <p>{error}</p>}
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
