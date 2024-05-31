import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList, faHardHat, faUserFriends } from '@fortawesome/free-solid-svg-icons';

function Welcome() {
  return (
    <div className="welcome-container">
        <h2>Taller de Base de Datos</h2>
      <h1>Bienvenido</h1>
      <div className="button-container">
        <button onClick={() => window.location.href='/asignacion'}>
          <FontAwesomeIcon className="fa-icon" icon={faClipboardList} />
          Asignación
        </button>
        <button onClick={() => window.location.href='/obras'}>
          <FontAwesomeIcon className="fa-icon" icon={faHardHat} />
          Obras
        </button>
        <button onClick={() => window.location.href='/empleados'}>
          <FontAwesomeIcon className="fa-icon" icon={faUserFriends} />
          Empleados
        </button>
      </div>
    </div>
  );
}

export default Welcome;