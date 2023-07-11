import React from "react";
import Listar from "./pages";
import './App.css';
import Login from "./pages/login";
import AppRoutes from "./Routes";
import WriteUserData from "./componentes/star/testefirebase";
import FirebaseDataComponent from "./buscar";


function App() {
    return (

        <div className="jogos">
            <AppRoutes/>
            
        </div>


    );
}
export default App;