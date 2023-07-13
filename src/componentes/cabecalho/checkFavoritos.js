import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Form from 'react-bootstrap/Form';


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
    
      <Form.Check
  type="switch"
  checked={isFilterButtonClicked}
  onChange={handleCheckboxChange}
  label="Favoritos"
  className='mx-1'
/>

 
  );
};

export default CheckFavoritos;
