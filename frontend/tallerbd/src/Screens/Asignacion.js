import './Crud.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';

function Crud() {
    const [tipo, setTipo] = useState("");
    const [direccion, setDireccion] = useState("");

    const [idTrabajador, setIdTrabajador] = useState(null);
    const [idObra, setIdObra] = useState(null);
    const [dias, setDias] = useState("");

    const [asignacionList, setAsignacionList] = useState([]);
    const [obrasList, setObrasList] = useState([]);
    const [trabajadoresList, setTrabajadoresList] = useState([]);

    const [editar, setEditar] = useState(false);

    useEffect(() => {
        getAll();
        getAllObras();
        getAllTrabajadores();
    }, []);

    const limpiarCampos = () => {
        setDias("");
        setEditar(false);
        setIdObra(null);
        setIdTrabajador(null);
    }

    const editarTrabajador = (val) => {
        setEditar(true);
        setIdObra(val.idAsignacion.idObra);
        setIdTrabajador(val.idAsignacion.idTrabajador);
        setDias(val.dias);
    };

    const add = () => {
        Axios.post("http://localhost:8080/asignacion/add", {
            idAsignacion: {
                idTrabajador: idTrabajador,
                idObra: idObra
            },
            dias: dias
        }).then(() => {
            Swal.fire({
                title: "Registro exitoso!",
                text: `La asignacion ${idObra}${idTrabajador} ha sido registrado con éxito`,
                icon: "success"
            });
            limpiarCampos();
            getAll();
        }).catch((error) => {
            handleError(error, "Error al agregar obra");
        });
    };

    const updateAsignacion = () => {
        Axios.put(`http://localhost:8080/asignacion/update/${idTrabajador}/${idObra}`, {
            idObra: idObra,
            idTrabajador: idTrabajador,
            dias: dias
        }).then((response) => {
            Swal.fire({
                title: "Actualización exitosa!",
                text: `La asignacion ${idObra}-${idTrabajador} ha sido actualizada con éxito`,
                icon: "success"
            });
            limpiarCampos();
            setEditar(false);
            getAll();
        }).catch((error) => {
            handleError(error, `Hubo un error actualizando la obra ${idObra}`);
        });
    };

    const deleteTrabajador = (idObra, idTrabajador) => {
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
                Axios.delete(`http://localhost:8080/asignacion/delete/${idTrabajador}/${idObra}`)
                    .then((response) => {
                        Swal.fire(
                            'Eliminado!',
                            'La asignacion ha sido eliminada.',
                            'success'
                        );
                        limpiarCampos();
                        getAll();
                    })
                    .catch((error) => {
                        handleError(error, "La asginacion no ha podido ser eliminada");
                    });
            }
        });
    };

    const getAll = () => {
        Axios.get("http://localhost:8080/asignacion/getAll").then((response) => {
            setAsignacionList(response.data);
        }).catch((error) => {
            alert("Error obteniendo la lista de asignaciones");
        });
    };

    const getAllObras = () => {
        Axios.get("http://localhost:8080/obra/getAll").then((response) => {
            setObrasList(response.data);
        }).catch((error) => {
            alert("Error obteniendo la lista de obras");
        });
    };

    const getAllTrabajadores = () => {
        Axios.get("http://localhost:8080/trabajador/getAll").then((response) => {
            setTrabajadoresList(response.data);
        }).catch((error) => {
            alert("Error obteniendo la lista de trabajadores");
        });
    };

    const handleError = (error, title) => {
        if (error.response) {
            const errorMessage = error.response.status === 409
                ? "La obra ya existe en la base de datos."
                : error.response.status === 500
                    ? "Ocurrió un error interno en el servidor. Por favor, inténtalo de nuevo más tarde."
                    : "Ocurrió un error al intentar agregar la obra. Por favor, inténtalo de nuevo más tarde.";
            Swal.fire({
                icon: "error",
                title,
                text: errorMessage
            });
        }
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
                        <div className="input-group-prepend">
                            <label className="input-group-text" htmlFor="idTrabajador">
                                Trabajador
                            </label>
                        </div>
                        <select className="custom-select form-control" id="idTrabajador" value={idTrabajador || ""}
                                onChange={(event) => {
                                    setIdTrabajador(event.target.value);
                                }}>
                            <option value="" disabled>Selecciona...</option>
                            {trabajadoresList.map((val, key) => (
                                <option key={key} value={val.idTrabajador}>{val.nombre}</option>
                            ))}
                        </select>
                    </div>

                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <label className="input-group-text" htmlFor="idObra">
                                Obra
                            </label>
                        </div>
                        <select className="custom-select form-control" id="idObra" value={idObra || ""}
                                onChange={(event) => {
                                    setIdObra(event.target.value);
                                }}>
                            <option value="" disabled>Selecciona...</option>
                            {obrasList.map((val, key) => (
                                <option key={key} value={val.idObra}>{val.idObra}</option>
                            ))}
                        </select>
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Dias:</span>
                        <input type="number" value={dias}
                               className="form-control" id="Dias" placeholder="Ingrese el numero de dias" required
                               aria-describedby="basic-addon1" onChange={(event) => {
                            setDias(event.target.value);

                        }}/>

                    </div>
                </div>

                <div className="card-footer text-muted">
                    {
                        editar ?
                            <div>
                                <button className='btn btn-success' onClick={updateAsignacion}>Actualizar</button>
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
                    <th scope="col">Dias</th>
                    <th scope="col">Trabajador</th>
                    <th scope="col">Direccion</th>
                </tr>
                </thead>
                <tbody>
                {
                    asignacionList.map((val, key) => (
                        <tr key={key}>
                            <th scope="row">{val.idAsignacion.idObra} {val.idAsignacion.idTrabajador}</th>
                            <td>{val.dias}</td>
                            <td>{val.trabajador.nombre}</td>
                            <td>{val.obra.direccion}</td>

                            <td>
                                <div className="btn-group" role="group" aria-label="Basic example">
                                    <button type="button" className="btn btn-info" onClick={() => {
                                        editarTrabajador(val);
                                    }}>Editar
                                    </button>
                                    <button type="button" className="btn btn-danger" onClick={() => {
                                        deleteTrabajador(val.idAsignacion.idObra, val.idAsignacion.idTrabajador);
                                    }}>Eliminar
                                    </button>
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
