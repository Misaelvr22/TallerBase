import './Crud.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';

function Crud() {
    const [nombre, setNombre] = useState("");
    const [rfc, setRFC] = useState("");
    const [password, setPassword] = useState("");
    const [oficio, setOficio] = useState("");
    const [sueldo, setSueldo] = useState(0);
    const [fecha, setFecha] = useState("0000-00-00");

    const [trabajadoresList, setTrabajadoresList] = useState([]);

    const [editar, setEditar] = useState(false);
    const [idTrabajador, setIdTrabajador] = useState(null);

    useEffect(() => {
        getAll();
    }, []);

    const limpiarCampos = () => {
        setNombre("");
        setOficio("");
        setRFC("");
        setPassword("");
        setEditar(false);
        setIdTrabajador(null);
    }

    const editarTrabajador = (val) => {
        setEditar(true);
        setNombre(val.nombre);
        setOficio(val.oficio);
        setRFC(val.rfc);
        setPassword(val.password);
        setSueldo(0);
        setFecha("0000-00-00");
        setIdTrabajador(val.idTrabajador);
    };

    const add = () => {
        Axios.post("http://localhost:8080/trabajador/add", {
            nombre: nombre,
            rfc: rfc,
            password: password,
            oficio: oficio
        }).then(() => {
            Swal.fire({
                title: "Registro exitoso!",
                text: `El usuario ${nombre} ha sido registrado con éxito`,
                icon: "success"
            });
            limpiarCampos();
            getAll();
        }).catch((error)=>{
            if (error.response) {
                if (error.response.status === 409) {
                    // Manejar el error 409 (Conflicto)
                    Swal.fire({
                        icon: "error",
                        title: "Error al agregar el usuario",
                        text: "El usuario ya existe en la base de datos."
                    });
                } else if (error.response.status === 500) {
                    // Manejar el error 500 (Error interno del servidor)
                    Swal.fire({
                        icon: "error",
                        title: "Error del servidor",
                        text: "Ocurrió un error interno en el servidor. Por favor, inténtalo de nuevo más tarde."
                    });
                } else {
                    // Otros errores de respuesta
                    console.error("Error al agregar obra:", error.response.data);
                    Swal.fire({
                        icon: "error",
                        title: "Error al agregar el usuario",
                        text: "Ocurrió un error al intentar agregar el usuario. Por favor, inténtalo de nuevo más tarde."
                    });
                }
            }
        });
    };

    const updateTrabajador = () => {
        Axios.put(`http://localhost:8080/trabajador/updateTrabajador/${idTrabajador}`, {
            nombre: nombre,
            rfc: rfc,
            password: password,
            oficio: oficio
        }).then((response) => {
            Swal.fire({
                title: "Actualización exitosa!",
                text: `El usuario ${nombre} ha sido actualizado con éxito`,
                icon: "success"
            });
            limpiarCampos();
            setEditar(false);
            getAll();
        }).catch((error) => {
            Swal.fire({
                icon: "error",
                title: `Hubo un error actualizando el trabajador ${nombre}`
            });
        });
    };

    const deleteTrabajador = (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo!'
        }).then((result) => {
            if (result.isConfirmed) {
                Axios.delete(`http://localhost:8080/trabajador/deleteTrabajador/${id}`)
                    .then((response) => {
                        Swal.fire(
                            'Eliminado!',
                            'El trabajador ha sido eliminado.',
                            'success'
                        );
                        limpiarCampos();
                        getAll();
                    })
                    .catch((error) => {
                        Swal.fire({
                            icon: "warning",
                            title: "El trabajador sigue asignado a una obra"
                        });
                    });
            }
        });
    };

    const getAll = () => {
        Axios.get("http://localhost:8080/trabajador/getAll").then((response) => {
            setTrabajadoresList(response.data);
        }).catch((error) => {
            alert("Error obteniendo la lista de trabajadores");
        });
    };

    return (
        <div className="container">
            <div className="Crud"></div>
            <div className="card text-center">
                <div className="card-header">
                    GESTION DE EMPLEADOS
                </div>

                <div className="card-body">

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Nombre:</span>
                        <input type="text" value={nombre}
                               className="form-control" id="Nombre" placeholder="Ingrese su nombre" aria-label="Nombre"
                               aria-describedby="basic-addon1" onChange={(event) => {
                            setNombre(event.target.value);
                        }} required={true}/>
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">RFC:</span>
                        <input type="text" value={rfc}
                               className="form-control" id="RFC" placeholder="Ingresa tu RFC" aria-label="RFC"
                               aria-describedby="basic-addon1" onChange={(event) => {
                            setRFC(event.target.value);
                        }} />
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Contraseña:</span>
                        <input type="password" value={password} className="form-control" id="Password"
                               placeholder="Contraseña" onChange={(event) => {
                            setPassword(event.target.value);
                        }} />
                    </div>

                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <label className="input-group-text" htmlFor="Oficio">
                                Oficio
                            </label>
                        </div>
                        <select className="custom-select form-control" id="Oficio" value={oficio} onChange={(event) => {
                            setOficio(event.target.value);
                        }}>
                            <option defaultValue>Selecciona...</option>
                            <option value="Carpintero">Carpintero</option>
                            <option value="Herrero">Herrero</option>
                            <option value="Fontanero">Fontanero</option>
                        </select>
                    </div>
                </div>

                <div className="card-footer text-muted">
                    {
                        editar ?
                            <div>
                                <button className='btn btn-success' onClick={updateTrabajador}>Actualizar</button>
                                <button className='btn btn-danger' onClick={limpiarCampos}>Cancelar</button>
                            </div>
                            : <button className='btn btn-success' onClick={add}>Registrar</button>
                    }
                </div>
            </div>

            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">RFC</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Oficio</th>
                    <th scope="col">Fecha de Ingreso</th>
                    <th scope="col">Sueldo por hora</th>
                    <th scope="col">Acciones</th>
                </tr>
                </thead>
                <tbody>
                {
                    trabajadoresList.map((val, key) => (
                        <tr key={key}>
                            <th scope="row">{val.idTrabajador}</th>
                            <td>{val.rfc}</td>
                            <td>{val.nombre}</td>
                            <td>{val.oficio}</td>
                            <td>{val.fecha_ingreso}</td>
                            <td>{val.sueldo_hr}</td>
                            <td>
                                <div className="btn-group" role="group" aria-label="Basic example">
                                    <button type="button" className="btn btn-info" onClick={() => {
                                        editarTrabajador(val);
                                    }}>Editar</button>
                                    <button type="button" className="btn btn-danger" onClick={() =>{
                                        deleteTrabajador(val.idTrabajador);
                                    }}>Eliminar</button>
                                </div>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
}

export default Crud;
