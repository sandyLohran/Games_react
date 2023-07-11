import { auth } from "../../firebase";
import React, { useEffect, useState } from 'react';
import"./conta.css"

const Firebaseauth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {   
      setUser(user);
    });

    return () => unsubscribe(); // Limpa o listener ao desmontar o componente
  }, []);

  const handleSignOut = () => {
    auth.signOut()
      .then(() => {
        console.log("Usuário desconectado");
      })
      .catch((error) => {
        console.log("Erro ao desconectar usuário:", error);
      });
  };
  return (
    <div>
      {user ? (
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
          <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
          <span className="p-2">{user.email}</span>
          <button className="sair" onClick={handleSignOut}>Sair</button>
        </div>
      ) : (
        <h1>Nenhum usuário autenticado</h1>
      )}
    </div>
  );
};

export default Firebaseauth;
