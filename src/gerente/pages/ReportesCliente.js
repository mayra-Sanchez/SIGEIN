import logo from "../Images/logo-2.png";
import React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useState, useEffect } from "react";
import "../hojaestilo/GerenteHome.css";

const ReportesClientes = () => {
  const [dataCliente, setDataCliente] = useState([]);
  const [tablaUsuarios, setTablaUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const peticionGet = async () => {
    await Axios.get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setDataCliente(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    peticionGet();
  }, []);

  const handleChange = (e) => {
    setBusqueda(e.target.value);
    filtro(e.target.value);
  };

  const filtro = (busqueda) => {
    var resultadosBusqueda = tablaUsuarios.filter((elemento) => {
      if (
        elemento.cedula
          .toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase())
      ) {
        return elemento;
      }
    });
    setDataCliente(resultadosBusqueda);
  };

  return (
    <div className="contenedor-inicialGerente">
      <div class="bg-light">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand">
            <img
              src={logo}
              width="50"
              height="30"
              class="d-inline-block align-top"
              alt="logo"
            />
            SIGEIN
          </a>
          <ul class="navbar-nav ml-auto">
            <Link to="/SignIn" className="btn btn-light btn-lg">
              Cerrar sesión
            </Link>
          </ul>
        </nav>
        <div className="barra-busqueda">
          <input
            className="form-control inputBuscar"
            value={busqueda}
            placeholder="Búsqueda por Nombre o celular"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="Tabla-rep-cliente">
        <table className="table table-striped table-hover table-responsive-sm">
          <thead class="thead-dark">
            <tr>
              <th>ID</th>
              <th>Cedula</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Esta al día</th>
              <th>Mas informacion</th>
            </tr>
          </thead>
          <tbody>
            {dataCliente.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.id_factura}</td>
                <td>{cliente.payment_institution}</td>
                <td>{cliente.is_deposit}</td>
                <td>{cliente.date}</td>
                <td>{cliente.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <br />
          <div className="boton-home">
            <Link
              to="Gerente/Generar-facturas-mensuales/ReporteOperador"
              className="btn btn-success btn-lg"
            >
              Volver
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportesClientes;
