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

  const add = () => {
    Axios.post("http://localhost:8080/trabajador/add",{

      nombre:nombre,
      rfc:rfc,
      password:password,
      oficio:oficio

    }).then(()=>{
      alert("EmpleadoRegistrado");
    });
  }

   /*const [formData, setFormData] = useState({
    nombre: '',
    rfc: '',
    password: '',
    oficio: '',
  });

  const handleChange = (e) => {
    
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    //if(name==="nombre")
      if (/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/.test(value)) {
        console.log("Invalido: " + value)
      } else {
        console.log("validos:" + value)
      }
    
  };*/

  return (
    <div class="container">
    <div className="Crud">
    </div>
    <div class="card text-center">
      <div class="card-header">
        GESTION DE EMPLEADOS 
        </div>

        <div className="card-body">

        <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Usuario:</span>
            <input type="text" 
            
            className="form-control" id="Nombre" placeholder="Ingrese su usuario" aria-label="Username" aria-describedby="basic-addon1"  onChange={(event)=>{setUsuario(event.target.value);}}/>
        </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nombre:</span>
            <input type="text" 
            
            className="form-control" id="Nombre" placeholder="Ingrese su nombre" aria-label="Username" aria-describedby="basic-addon1"  onChange={(event)=>{setNombre(event.target.value);}}/>
        </div>

        <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">RFC:</span>
            <input type="text" 
            
            className="form-control" id="RFC" placeholder="Ingresa tu RFC" aria-label="Username" aria-describedby="basic-addon1" onChange={(event)=>{setRFC(event.target.value);}}/>
        </div>

        <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Contraseña:</span>
            <input type="password" class="form-control" id="Contraseña" placeholder="Constraseña" onChange={(event)=>{setPassword(event.target.value);}}/>
        </div>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <label className="input-group-text" htmlFor="inputGroupSelect01">
              Oficio
            </label>
          </div>
          <select className="custom-select form-control" id="Ofico"  onChange={(event)=>{setOficio(event.target.value);}}>
            <option defaultValue>Selecciona...</option>
            <option value="carpintero">Carpintero</option>
            <option value="herrero">Herrero</option>
            <option value="fontanero">Fontanero</option>
          </select>
        </div>


        
        </div>

          <div class="card-footer text-muted">
            <button className='btn btn-success' onClick={add}>Registrar</button>
          </div>

     </div>
     <table class="table table-striped">
     <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">RFC</th>
        <th scope="col">Nombre</th>        
        <th scope="col">Oficio</th>
        <th scope="col">Fecha de Ingreso</th>
        <th scope="col">Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">1</th>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
        <td>@mdo</td>
        <td>
        <div class="btn-group" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-info">Editar</button>
          <button type="button" class="btn btn-danger">Eliminar</button>
        </div>
        </td>     
      </tr>
      <tr>
        <th scope="row">2</th>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
        <td>@mdo</td>
        <td>
        <div class="btn-group" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-info">Editar</button>
          <button type="button" class="btn btn-danger">Eliminar</button>
        </div>
        </td> 
      </tr>
     </tbody>
     </table>
   </div>
  );
}

export default Crud;
