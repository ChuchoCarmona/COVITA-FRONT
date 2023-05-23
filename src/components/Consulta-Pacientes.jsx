import { useEffect, useState } from "react";
import Boton from "./boton";
import editar_eliminar from "./editar-eliminar";

export default function ConsultaPacientes() {
  const [pacientes, SetPacientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPaciente = async (url) => {
      setLoading(true);

      try {
        let respuesta = await fetch(url);
        console.log(respuesta.statusText);
        if (respuesta.status === 403) {
          throw new Error(
            "Acceso denegado, inicie sesión para tener acceso a los datos"
          );
        }
        if (!respuesta.ok) {
          throw new Error("Error en la petición");
        }
        const json = await respuesta.json();
        json.forEach((element) => {
          let paciente = {
            id: element.id,
            NSS: element.NSS,
            nombres: element.nombres,
            apellido_p: element.apellido_p,
            apellido_m: element.apellido_m,
            edad: element.edad,
            sexo: element.sexo,
            altura: element.altura,
            peso: element.peso,
            enfermedades: element.enfermedades,
            tipo_sangre: element.tipo_sangre,
            fecha_nacimiento: element.fecha_nacimiento,
            telefono: element.telefono,
            diagnosticado: element.diagnosticado,
            correo_e: element.correo_e,
          };

          SetPacientes((pacientes) => [...pacientes, paciente]);
          setSuccess(true);
        });
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };
    getPaciente("http://localhost:8000/principal/paciente/");
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!success) {
    return <div>No se pudo obtener los datos.</div>;
  }

  const handleRowClick = (id, data) => {
    editar_eliminar(id, data);
  };

  return (
    <>
      <div>
        <table>
          <thead>
            <tr>
              <th>NSS</th>
              <th>Nombre</th>
              <th>Apellido Paterno</th>
              <th>Apellido Materno</th>
              <th>Edad</th>
              <th>Sexo</th>
              <th>Altura</th>
              <th>Peso</th>
              <th>Padecimientos</th>
              <th>Tipo de Sangre</th>
              <th>Fecha de Nacimiento</th>
              <th>Telefono</th>
              <th>Correo E.</th>
              <th>Diagnosticado</th>
              <th>Accion</th>
            </tr>
          </thead>

          <tbody>
            {pacientes &&
              pacientes.map((paciente) => (
                <tr
                  key={paciente.id}
                  onClick={() =>
                    handleRowClick(paciente.id, pacientes[paciente.id - 1])
                  }
                >
                  <td>{paciente.NSS}</td>
                  <td>{paciente.nombres}</td>
                  <td>{paciente.apellido_p}</td>
                  <td>{paciente.apellido_m}</td>
                  <td>{paciente.edad}</td>
                  <td>{paciente.sexo}</td>
                  <td>{paciente.altura}</td>
                  <td>{paciente.peso}</td>
                  <td>{paciente.enfermedades}</td>
                  <td>{paciente.tipo_sangre}</td>
                  <td>{paciente.fecha_nacimiento}</td>
                  <td>{paciente.telefono}</td>
                  <td>{paciente.correo_e}</td>
                  <td>{"" + paciente.diagnosticado}</td>
                  <td>
                    <Boton etiqueta="Editar" />
                    <Boton etiqueta="Eliminar" />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
