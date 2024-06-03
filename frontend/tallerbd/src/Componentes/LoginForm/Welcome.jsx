import React from 'react';
import { Link } from "react-router-dom";
import '../../diseño.css';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faClipboardList, faHardHat, faUserFriends } from '@fortawesome/free-solid-svg-icons';

function Welcome() {
    return (
        <div className='App'>
            <h2>Taller de Base de Datos</h2>
            <h1>Bienvenido</h1>
            <div className="button-container">
                <Link className="button" to={'/asignacion'}>
                    {/* <FontAwesomeIcon className="fa-icon" icon={faClipboardList} /> */}
                    Asignación
                </Link>
                <Link className="button" to={'/obras'}>
                    {/* <FontAwesomeIcon className="fa-icon" icon={faHardHat} /> */}
                    Obras
                </Link>
                <Link className="button" to={'/empleados'}>
                    {/* <FontAwesomeIcon className="fa-icon" icon={faUserFriends} /> */}
                    Trabajador
                </Link>
            </div>
        </div>
    );
}

export default Welcome;
