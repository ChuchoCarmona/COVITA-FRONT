import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import NoLogged from "./NoIniciado";
import { Table } from "react-bootstrap";

export default function ConsultaPacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const { actoken, rangoUsuario } = useContext(AuthContext);

  const handleDeleteClick = async (pacienteId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/delete/${pacienteId}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${actoken}`,
          },
        }
      );

      if (response.ok) {
        setPacientes((prevPacientes) =>
          prevPacientes.filter((paciente) => paciente.id !== pacienteId)
        );
        console.log("Paciente eliminado correctamente");
      } else {
        console.log("Error:", response.status);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    const getPacientes = async (url) => {
      setLoading(true);

      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Token ${actoken}`,
        };

        const respuesta = await fetch(url, { headers });

        if (respuesta.status === 403) {
          throw new Error(
            "Acceso denegado, inicie sesión para tener acceso a los datos"
          );
        }

        if (!respuesta.ok) {
          throw new Error("Error en la petición");
        }

        const json = await respuesta.json();

        setPacientes(
          json.map((element) => ({
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
          }))
        );

        setIsInitialized(true);
      } catch (error) {
        setError(error.message);
      }

      setLoading(false);
    };

    if (actoken) {
      getPacientes("http://localhost:8000/principal/paciente/");
    } else {
      setIsInitialized(true);
    }
  }, [actoken]);

  if (!isInitialized) {
    return <div>No se pudo obtener los datos.</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  const openReportWindow = (idPaciente) => {
    window.open(`http://localhost:8000/reporte/${idPaciente}/`, "_blank");
  };
  return (
    <>
      {actoken? (
        <div>
          {loading ? (
            <div>Cargando...</div>
          ) : (
            <Table responsive>
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
                  <th>Eliminar</th>
                  <th>ReportePDF</th>
                </tr>
              </thead>
              <tbody>
                {pacientes.map((paciente) => (
                  <tr key={paciente.id}>
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
                    <td>
                      {paciente.diagnosticado ? (
                        <img src="images/true.png" alt="Imagen True" />
                      ) : (
                        <img src="images/false.png" alt="Imagen False" />
                      )}
                    </td>
                    <td>
                      <button onClick={() => handleDeleteClick(paciente.id)} className="reporte-button">
                        <img
                          src="images/eliminar.png"
                          alt="eliminar"
                          style={{ width: "40%" }}
                        />
                      </button>
                    </td>
                    <td>
                      {paciente.diagnosticado && rangoUsuario != "Trabajador(a)_Social" ?(
                        <button className="reporte-button" onClick={() => openReportWindow(paciente.id)}>
                          <img
                            src="images/pdf.png"
                            alt="reporte"
                            style={{ width: "35%" }}
                          />
                        </button>
                      ):(
                        <></>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      ) : (
        <NoLogged />
      )}
    </>
  );
}
