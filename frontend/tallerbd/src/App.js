import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './diseño.css';
import Welcome from './Welcome';

function Asignacion() {
  window.location.href = 'ruta-del-crud-asignacion'; // reemplaza con la ruta real de tu CRUD de Asignación
  return null;
}

function Obras() {
  window.location.href = 'ruta-del-crud-obras'; // reemplaza con la ruta real de tu CRUD de Obras
  return null;
}

function Empleados() {
  window.location.href = 'ruta-del-crud-empleados'; // reemplaza con la ruta real de tu CRUD de Empleados
  return null;
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={ <Welcome /> } />
          <Route path="/asignacion" element={ <Asignacion /> } />
          <Route path="/obras" element={ <Obras /> } />
          <Route path="/empleados" element={ <Empleados /> } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;