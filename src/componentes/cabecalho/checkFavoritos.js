import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


const CheckFavoritos = ({ isFilterButtonClicked, handleFilterButtonClick }) => {

  const [user, setUser] = useState(null);

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

  const handleCheckboxChange = () => {
    if (user) {
      handleFilterButtonClick();
    } else {
      window.location.href = '/login';
    }
  };

  return (
    <label>
      <input
        type="checkbox"
        checked={isFilterButtonClicked}
        onChange={handleCheckboxChange}
        
      />
      Favoritos
    </label>
  );
};

export default CheckFavoritos;
