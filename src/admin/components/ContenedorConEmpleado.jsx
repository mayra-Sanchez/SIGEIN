import "../hojaestilo/ConsultarInformacion.css";
import { useState } from "react";
import { useEffect } from "react";
import Axios from "axios";
import { actualizarEstadoEmployes } from "../../services/users";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { listAllEmployees } from "../../services/employees";

export function ConsultarConsultaEmpleado(props) {
  const [usuarios, setUsuarios] = useState([]);
  const [tablaUsuarios, setTablaUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [modalEditar, setModalEditar] = useState(false);

  const [datosSeleccionado, setDatosSeleccionado] = useState({
    id: "",
    phone_number: "",
    first_name: "",
    last_name: "",
    email: "",
    role: "",
  });

  const peticion = async () => {
    listAllEmployees()
      .then((response) => {
        setUsuarios(response);
        setTablaUsuarios(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    peticion();
  }, []);

  const handleChange = (e) => {
    setBusqueda(e.target.value);
    filtro(e.target.value);
  };

  const cambioUser = (e) => {
    const { name, value } = e.target;
    setDatosSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const filtro = (busqueda) => {
    var resultadosBusqueda = tablaUsuarios.filter((elemento) => {
      if (
        elemento.first_name
          .toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.phone_number
          .toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase())
      ) {
        return elemento;
      }
    });
    setUsuarios(resultadosBusqueda);
  };

  const handleStatus = (id) => {
    actualizarEstadoEmployes(id);
  };

  const actualizarEstadoMetodo = (usuario) => {
    var actualizacion;
    if (usuario.is_active === true) {
      actualizacion = false;
    } else if (usuario.is_active === false) {
      actualizacion = true;
    }

    const body = { is_active: actualizacion };
    console.log(usuario);
    actualizarEstadoEmployes(body, usuario.id).then((response) => {
      peticion();
    });
  };

  const seleccionarDatos = (usuario, caso) => {
    setDatosSeleccionado(usuario);
    caso === "Editar" && setModalEditar(true);
  };

  const editar = () => {
    let usuario_editar_id;
    var dataNueva = usuarios;
    dataNueva.map((usuario) => {
      if (usuario.id == datosSeleccionado.id) {
        usuario_editar_id = datosSeleccionado.id;
        usuario.phone_number = datosSeleccionado.phone_number;
        usuario.first_name = datosSeleccionado.first_name;
        usuario.last_name = datosSeleccionado.last_name;
        usuario.role = datosSeleccionado.role;
      }
    });
    setUsuarios(dataNueva);

    const usuario = usuarios.find((user) => user.id == usuario_editar_id);

    const datos = {
      first_name: usuario.first_name,
      last_name: usuario.last_name,
      phone_number: usuario.phone_number,
      role: usuario.role,
    };

    const handleClick = async () => {
      try {
        actualizarEstadoEmployes(datos, usuario.id).then((response) => console.log(response)).catch((error) => console.log(error))

      } catch (error) {
        console.error(error);
      }
    };

    console.log(usuario);
    console.log(usuario.id);
    console.log(dataNueva.id);
    console.log(datosSeleccionado.first_name);
    handleClick();

    setModalEditar(false);
  };

  return (
    <div class="mx-auto" className="contenedor-consulta">
      <p className="texto1_Consulta">{props.texto1_Consulta}</p>
      <div className="buscador">
        <div className="barra-busqueda">
          <input
            className="form-control inputBuscar"
            value={busqueda}
            placeholder="Búsqueda por Nombre o número de celular"
            onChange={handleChange}
          />
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover table-responsive-sm">
            <thead>
              <tr>
                <th>Celular</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios &&
                usuarios.map((usuario) => (
                  <tr key={usuario.id}>
                    <td>{usuario.phone_number}</td>
                    <td>{usuario.first_name}</td>
                    <td>{usuario.last_name}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.role}</td>
                    <td>{usuario.is_active ? "Activo" : "Inactivo"}</td>
                    <td>
                      {usuario.options}
                      <button
                        className="btn btn-outline-dark  mb-1"
                        onClick={() => seleccionarDatos(usuario, "Editar")}
                      >
                        {" "}
                        Modificar usuario{" "}
                      </button>
                      <br />
                      <button
                        className="btn btn-outline-dark  mb-1"
                        onClick={() => actualizarEstadoMetodo(usuario)}
                      >
                        {" "}
                        Cambiar estado{" "}
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <Modal isOpen={modalEditar}>
            <ModalHeader>
              <div>
                <h3> Modificar datos </h3>
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="form-group">
                <label>ID</label>
                <input
                  className="form-control"
                  readOnly
                  type="text"
                  name="id"
                  value={datosSeleccionado && datosSeleccionado.id}
                />
                <br />

                <label>Email</label>
                <input
                  className="form-control"
                  readOnly
                  type="text"
                  name="email"
                  value={datosSeleccionado && datosSeleccionado.email}
                  onChange={cambioUser}
                />
                <br />

                <label>Nombre</label>
                <input
                  className="form-control"
                  type="text"
                  name="first_name"
                  value={datosSeleccionado && datosSeleccionado.first_name}
                  onChange={cambioUser}
                />
                <br />

                <label>Apellido</label>
                <input
                  className="form-control"
                  type="text"
                  name="last_name"
                  value={datosSeleccionado && datosSeleccionado.last_name}
                  onChange={cambioUser}
                />
                <br />

                <label>Celular</label>
                <input
                  className="form-control"
                  type="text"
                  name="phone_number"
                  value={datosSeleccionado && datosSeleccionado.phone_number}
                  onChange={cambioUser}
                />
                <br />

                <label>Rol</label>
                <select
                  name="role"
                  class="form-control"
                  onChange={cambioUser}
                  required
                  value={datosSeleccionado && datosSeleccionado.role}
                >
                  <option value="admin">Administrador</option>
                  <option value="operator">Operador</option>
                  <option value="manager">Gerente</option>
                  <option value="client">Cliente</option>
                </select>
                <br />
              </div>
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-primary" onClick={() => editar()}>
                Actualizar
              </button>
              <button
                className="btn btn-danger"
                onClick={() => setModalEditar(false)}
              >
                Cancelar
              </button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    </div>
  );
}