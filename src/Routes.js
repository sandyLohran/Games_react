import React from 'react';
import { Route, Routes } from 'react-router-dom';


import Listar from './pages';
import Login from './pages/login';
import Cadastro from './pages/cadastrar';


const AppRoutes = () => {
  return (
   
      <Routes>
        
        <Route path="/" element= {<Listar/>} />
        <Route path="/login" element= {<Login/>} />
        <Route path="/cadastrar" element= {<Cadastro/>} />
      </Routes>
    
  );
};

export default AppRoutes;
