import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import NoLogged from "./NoIniciado";
import "./ImageUpload.css";

const ImageUpload = () => {
  const { isLoggedIn, User_ID, actoken, rangoUsuario } =
    useContext(AuthContext);
  const [zoomLevel, setZoomLevel] = useState(1);
  const maxZoomLevel = 2; // Puedes ajustar el nivel máximo de zoom según tus necesidades

  const [selectedImage, setSelectedImage] = useState(null);
  const [probability, setProbability] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState("images/scan1.jpg");
  const [selectedPaciente, setSelectedPaciente] = useState("");
  const [nota, setNota] = useState("");
  const [pacientes, setPacientes] = useState([]);
  const [isImageExpanded, setIsImageExpanded] = useState(false);

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
  };

  const handlePacienteChange = (event) => {
    setSelectedPaciente(event.target.value);
  };

  const handleReporteClick = async () => {
    if (probability) {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/diagnostico/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${actoken}`,
          },
          body: JSON.stringify({
            nota,
            id_paciente: selectedPaciente,
            probabilidad_covid: probability,
            responsable_diagnostico_id: User_ID, // Agrega el ID del usuario aquí
          }),
        });

        if (response.ok) {
          console.log("Reporte guardado correctamente");
          // Restablecer los valores después de guardar el reporte
          setSelectedImage(null);
          setProbability(null);
          setPreviewImage("images/scan1.jpg");
          setSelectedPaciente("");
          setNota("");
        } else {
          console.log("Error:", response.status);
        }
      } catch (error) {
        console.log("Error:", error);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedImage || !selectedPaciente) {
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);
    formData.append("id_paciente", selectedPaciente);

    try {
      setLoading(true);

      const response = await fetch("http://127.0.0.1:8000/api/upload_image/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setProbability(data.probability);
      } else {
        console.log("Error:", response.status);
      }
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchPacientes = async () => {
      console.log(rangoUsuario);
      try {
        const response = await fetch(
          `http://localhost:8000/principal/paciente/`,
          {
            headers: {
              Authorization: `Token ${actoken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Error en la carga de pacientes");
        }
        const data = await response.json();
        setPacientes(data);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    if (isLoggedIn) {
      fetchPacientes();
    }
  }, [isLoggedIn, User_ID]);

  const handleExpandImage = () => {
    setIsImageExpanded(!isImageExpanded);
  };

  const handleZoomIn = () => {
    if (zoomLevel < maxZoomLevel) {
      setZoomLevel(zoomLevel + 1);
    }
  };
  
  const handleZoomOut = () => {
    if (zoomLevel > 1) {
      setZoomLevel(zoomLevel - 1);
    }
  };

  return (
    <>
      {isLoggedIn && rangoUsuario !== "Trabajador(a)_Social" ? (
        <div>
          <form onSubmit={handleSubmit}>
            <div className="health_section ">
              <div className="container">
                <h1 className="health_taital">
                  Selecciona la imagen a analizar
                </h1>
                <h4 className="health_text"> Sistema de detección de COVID-19 en imagenes radiológicas mediante IA</h4>
                <p className="health_text">
                  Aunque los tiempos sean difíciles, recuerda que dentro de ti
                  hay una fortaleza que puede superar cualquier adversidad.
                </p>
                <div>
                  <label htmlFor="pacienteSelect">Seleccionar paciente:</label>
                  <select
                    id="pacienteSelect"
                    name="paciente"
                    value={selectedPaciente}
                    onChange={handlePacienteChange}
                  >
                    <option value="">Seleccionar</option>
                    {pacientes.map((paciente) => (
                      <option key={paciente.id} value={paciente.id}>
                        {`${paciente.nombres} ${paciente.apellido_p} ${paciente.apellido_m}`}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="health_section layout_padding">
                  <div className="row">
                    <div className="col-sm-7">
                      <label
                        htmlFor="imageUpload"
                        className="image_upload_label"
                      >
                        <div
                          className="image_main"
                          style={{ width: "400px", height: "400px" }}
                        >
                          <div className="main">
                            <img
                              src={previewImage}
                              alt="Avatar"
                              className="image"
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </div>
                          <div className="middle">
                            <div className="text">
                              <img
                                src="images/upload.png"
                                style={{ width: "40px" }}
                                alt="Upload"
                              />
                            </div>
                          </div>
                        </div>
                      </label>
                      <input
                        type="file"
                        id="imageUpload"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleImageChange}
                      />
                    </div>

                    <div className="col-sm-5">
                      <div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: "10px",
                          }}
                        >
                          {loading ? (
                            <div>
                              <img src="images/loading.gif" alt="loading" />
                            </div>
                          ) : probability ? (
                            <div>
                              <h1 className="health_text">
                                Probabilidad de COVID-19:
                              </h1>
                              <h1 className="health_taital">{probability}%</h1>
                              {/* Mostrar el botón "Realizar Reporte" solo cuando hay una probabilidad */}
                              {probability && (
                                <>
                                  <button
                                    type="button"
                                    className="expand-button"
                                    onClick={handleExpandImage}
                                  >
                                    Expandir Imagen
                                  </button>
                                  <button
                                    type="button"
                                    className="button"
                                    onClick={handleReporteClick}
                                  >
                                    Realizar Reporte
                                  </button>
                                </>
                              )}
                              <div className="note-textbox">
                                <textarea
                                  value={nota}
                                  onChange={(e) => setNota(e.target.value)}
                                  placeholder="Agrega una nota..."
                                ></textarea>
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className="getquote_bt_1">
                        <button className="button" type="submit">
                          Analizar imagen{" "}
                          <span>
                            <img src="images/scan.png" alt="Right arrow" />
                          </span>
                        </button>
                      </div>
                      {/* Mostrar el cuadro de texto de la nota solo cuando se realiza el reporte
                      {probability && (
                        <div className="note-textbox">
                          <textarea
                            value={nota}
                            onChange={(e) => setNota(e.target.value)}
                            placeholder="Agrega una nota..."
                          ></textarea>
                        </div>
                      )} */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
          {isImageExpanded && (
            <div className="expanded-image-container">
              <div className="expanded-image-controls">
                <button
                  className="expand-button"
                  onClick={handleExpandImage}
                >
                  Cerrar
                </button>
                <div className="zoom-controls">
                  <button className="zoom-button" onClick={handleZoomIn}>+</button>
                  <button className="zoom-button" onClick={handleZoomOut}>-</button>
                </div>
              </div>
              <img
                src={previewImage}
                alt="Expanded Image"
                className="expanded-image"
                style={{ transform: `scale(${zoomLevel})` }}
              />
            </div>
          )}
        </div>
      ) : (
        <div>
          <NoLogged />
        </div>
      )}
    </>
  );
};

export default ImageUpload;
