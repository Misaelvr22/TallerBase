import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import './diseño.css';
//import Welcome from './Welcome';
import Asignacion from "./Screens/Asignacion";
import Obra from "./Screens/Obra";
import Crud from "./Screens/Crud";
import Welcome from "./Componentes/LoginForm/Welcome";

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={ <Welcome /> } />
                    <Route path="/asignacion" element={ <Asignacion /> } />
                    <Route path="/obras" element={ <Obra /> } />
                    <Route path="/empleados" element={ <Crud /> } />
                </Routes>
            </div>
        </Router>
    );
}

export default App;