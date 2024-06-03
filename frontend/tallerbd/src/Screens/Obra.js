import './Crud.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';

function Crud() {
    const [tipo, setTipo] = useState("");
    const [direccion, setDireccion] = useState("");

    const [obrasList, setObrasList] = useState([]);

    const [editar, setEditar] = useState(false);
    const [idObra, setIdObra] = useState(null);

    useEffect(() => {
        getAll();
    }, []);

    const limpiarCampos = () => {
        setTipo("");
        setDireccion("");
        setEditar(false);
        setIdObra("");
    }

    const editarTrabajador = (val) => {
        setEditar(true);
        setIdObra(val.idObra);
        setDireccion(val.direccion);
        setTipo(val.tipo);
    };


    const add = () => {
        Axios.post("http://localhost:8080/obra/add", {
            idObra: idObra,
            tipo: tipo,
            direccion: direccion
        }).then(() => {
            Swal.fire({
                title: "Registro exitoso!",
                text: `La obra ${idObra} ha sido registrado con éxito`,
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
                        title: "Error al agregar obra",
                        text: "La obra ya existe en la base de datos."
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
                        title: "Error al agregar obra",
                        text: "Ocurrió un error al intentar agregar la obra. Por favor, inténtalo de nuevo más tarde."
                    });
                }
            }
        });
    };

    const updateTrabajador = () => {
        Axios.put(`http://localhost:8080/obra/updateObra/${idObra}`, {
            idObra: idObra,
            direccion: direccion,
            tipo: tipo
        }).then((response) => {
            Swal.fire({
                title: "Actualización exitosa!",
                text: `La obra ${idObra} ha sido actualizada con éxito`,
                icon: "success"
            });
            limpiarCampos();
            setEditar(false);
            getAll();
        }).catch((error) => {
            Swal.fire({
                icon: "error",
                title: `Hubo un error actualizando la obra ${idObra}`
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
                Axios.delete(`http://localhost:8080/obra/deleteObra/${id}`)
                    .then((response) => {
                        Swal.fire(
                            'Eliminado!',
                            'La obra ha sido eliminada.',
                            'success'
                        );
                        limpiarCampos();
                        getAll();
                    })
                    .catch((error) => {
                        Swal.fire({
                            icon: "warning",
                            title: "La obra sigue asignada a un trabajador"
                        });
                    });
            }
        });
    };

    const getAll = () => {
        Axios.get("http://localhost:8080/obra/getAll").then((response) => {
            setObrasList(response.data);
        }).catch((error) => {
            alert("Error obteniendo la lista de obras");
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
                        <span className="input-group-text" id="basic-addon1">ID Obra:</span>
                        <input type="text" value={idObra}
                               className="form-control" id="Nombre" placeholder="Ingrese el id de la obra O000"
                               aria-label="Nombre"
                               aria-describedby="basic-addon1" onChange={(event) => {
                            setIdObra(event.target.value);
                        }}/>

                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Direccion:</span>
                        <input type="text" value={direccion}
                               className="form-control" id="Nombre" placeholder="Ingrese la direccion de la obra"
                               aria-label="Direccion"
                               aria-describedby="basic-addon1" onChange={(event) => {
                            setDireccion(event.target.value);
                        }}/>

                    </div>


                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <label className="input-group-text" htmlFor="Oficio">
                                Tipo
                            </label>
                        </div>
                        <select className="custom-select form-control" id="Oficio" value={tipo} onChange={(event) => {
                            setTipo(event.target.value);
                        }}>
                            <option defaultValue>Selecciona...</option>
                            <option value="Publico">Publico</option>
                            <option value="Privado">Privado</option>
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
                    <th scope="col">Direccion</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Acciones</th>
                </tr>
                </thead>
                <tbody>
                {
                    obrasList.map((val, key) => (
                        <tr key={key}>
                            <th scope="row">{val.idObra}</th>
                            <td>{val.direccion}</td>
                            <td>{val.tipo}</td>

                            <td>
                                <div className="btn-group" role="group" aria-label="Basic example">
                                    <button type="button" className="btn btn-info" onClick={() => {
                                        editarTrabajador(val);
                                    }}>Editar</button>
                                    <button type="button" className="btn btn-danger" onClick={() =>{
                                        deleteTrabajador(val.idObra);
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
