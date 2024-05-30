import './Crud.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState} from 'react';
import Axios from 'axios';


function Crud() {
  const [usuario, setUsuario] = useState ("");
  const [nombre, setNombre] = useState ("");
  const [rfc, setRFC] = useState ("");
  const [password, setPassword] = useState ("");
  const [oficio, setOficio] = useState ("");

  const [editar, setEditar] = useState (false);


  const [trabajadoresList, setTrabajadores] = useState([]);

  const add = () => {
    Axios.post("http://localhost:8080/trabajador/add",{

      nombre:nombre,
      rfc:rfc,
      password:password,
      oficio:oficio

    }).then(()=>{
      getAll();
      alert("EmpleadoRegistrado");
    });
  }

  const getAll = () => {
    Axios.get("http://localhost:8080/trabajador/getAll").then((response)=>{
      setTrabajadores(response.data);

    });
  }

  getAll();

  const updateTrabajador = (val) =>{
    setUsuario(val.rfc);
    setRFC(val.rfc);
    setNombre(val.nombre);
  }


  return (
      <div className="container">
        <div className="Crud">
        </div>
        <div className="card text-center">
          <div className="card-header">
            GESTION DE TRABAJADORES
          </div>

          <div className="card-body">

            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Usuario:</span>
              <input type="text" value={usuario}

                     className="form-control" id="usuario" placeholder="Ingrese su usuario" aria-label="Username"
                     aria-describedby="basic-addon1" onChange={(event) => {
                setUsuario(event.target.value);
              }}/>
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text" id="nombre">Nombre:</span>
              <input type="text" value={nombre}

                     className="form-control" id="Nombre" placeholder="Ingrese su nombre" aria-label="Username"
                     aria-describedby="basic-addon1" onChange={(event) => {
                setNombre(event.target.value);
              }}/>
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">RFC:</span>
              <input type="text" value={rfc}

                     className="form-control" id="RFC" placeholder="Ingresa tu RFC" aria-label="Username"
                     aria-describedby="basic-addon1" onChange={(event) => {
                setRFC(event.target.value);
              }}/>
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Contraseña:</span>
              <input type="password"  value={password} className="form-control" id="Contraseña" placeholder="Constraseña"
                     onChange={(event) => {
                       setPassword(event.target.value);
                     }}/>
            </div>

            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="inputGroupSelect01">
                  Oficio
                </label>
              </div>
              <select className="custom-select form-control" id="Ofico" value={oficio} onChange={(event) => {
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
            <button className='btn btn-success' onClick={add}>Registrar</button>
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
              trabajadoresList.map((val, key) => {
                return <tr key={val.idTrabajador}>
                  <th scope="row">{val.idTrabajador}</th>
                  <td>{val.rfc}</td>
                  <td>{val.nombre}</td>
                  <td>{val.oficio}</td>
                  <td>{val.fecha_ingreso}</td>
                  <td>{val.sueldo_hr}</td>
                  <td>
                    <div className="btn-group" role="group" aria-label="Basic example">
                      <button type="button" onClick={()=>{
                        updateTrabajador(val);
                      }} className="btn btn-info">Editar</button>
                      <button type="button" className="btn btn-danger">Eliminar</button>
                    </div>
                  </td>
                </tr>
              })
            }

            </tbody>
          </table>
      </div>
);
}

export default Crud;
