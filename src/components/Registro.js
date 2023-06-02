import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { AuthContext } from "./AuthContext";
import NoLogged from "./NoIniciado";

function FormExample() {
  const { isLoggedIn, usernamec, User_ID } = useContext(AuthContext);
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    nss: "",
    nombres: "",
    apellido_p: "",
    apellido_m: "",
    edad: "",
    sexo: "",
    altura: "",
    peso: "",
    enfermedades: "",
    tipo_sangre: "",
    fecha_nacimiento: "",
    telefono: "",
    correo_e: "",
    diagnosticado: false,
  });
  const [registroExitoso, setRegistroExitoso] = useState(false);
  const [pacienteExistente, setPacienteExistente] = useState(false);
  const resetForm = () => {
    setFormData({
      nss: "",
      nombres: "",
      apellido_p: "",
      apellido_m: "",
      edad: "",
      sexo: "",
      altura: "",
      peso: "",
      enfermedades: "",
      tipo_sangre: "",
      fecha_nacimiento: "",
      telefono: "",
      correo_e: "",
      diagnosticado: false,
    });
    setValidated(false);
  };

  const registerPatient = async () => {
    const pacienteData = {
      usuario: User_ID,
      NSS: formData.NSS,
      nombres: formData.nombres,
      apellido_p: formData.apellido_p,
      apellido_m: formData.apellido_m,
      edad: parseInt(formData.edad),
      sexo: formData.sexo,
      altura: parseFloat(formData.altura),
      peso: parseFloat(formData.peso),
      enfermedades: formData.enfermedades,
      tipo_sangre: formData.tipo_sangre,
      fecha_nacimiento: formData.fecha_nacimiento,
      telefono: parseInt(formData.telefono),
      correo_e: formData.correo_e,
      diagnosticado: formData.diagnosticado,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/registro/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pacienteData),
      });

      if (response.ok) {
        // Registro exitoso, realizar acciones adicionales si es necesario
        const data = await response.json();
        setRegistroExitoso(true);
        setPacienteExistente(false);
        console.log("Registro Exitoso");
        resetForm()
      } else {
        // Error al registrar el paciente
        console.log("ESTE PACIENTE YA ESTA REGISTRADO EN EL SISTEMA!");
        setRegistroExitoso(false);
        setPacienteExistente(true);
      }
    } catch (error) {
      // Manejar el error si ocurriera
      console.error("Error de red:", error);
      console.log("id de usuario:  " + User_ID);
      console.log(pacienteData);
      setRegistroExitoso(false);
        setPacienteExistente(true);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      registerPatient();
    }
    setValidated(true);
  };

  const handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setFormData({ ...formData, [name]: value });
  };

  const styles = {
    mensajeRegistro: {
      display: registroExitoso ? "block" : "none",
      marginTop: "10px",
      backgroundColor: "green",
      padding: "10px",
      color: "white",
      fontWeight: "bold",
    },
    mensajeExistente: {
      display: pacienteExistente ? "block" : "none",
      marginTop: "10px",
      backgroundColor: "orange",
      padding: "10px",
      color: "white",
      fontWeight: "bold",
    },
  };

  return (
    <>
    
      {isLoggedIn ? (
        
        <div className="modal-containersu">
          
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <h4 className="health_text"> Sistema de detección de COVID-19 en imagenes radiológicas mediante IA</h4>
          <h1 className="contact_text">Registra un paciente</h1>
            <Row className="mb-3">
              <Form.Group
                as={Col}
                sm="12"
                md="4"
                controlId="validationCustom01"
              >
                <Form.Label>NSS</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="NSS"
                  placeholder="NSS"
                  value={formData.NSS}
                  onChange={handleChange}
                />
                <Form.Control.Feedback>¡Se ve bien!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} sm="12" md="4" controlId="validationCustom">
                <Form.Label>Nombres</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="nombres"
                  placeholder="Nombres"
                  value={formData.nombres}
                  onChange={handleChange}
                />
                <Form.Control.Feedback>¡Se ve bien!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                as={Col}
                sm="12"
                md="4"
                controlId="validationCustom02"
              >
                <Form.Label>Apellido Paterno</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="apellido_p"
                  placeholder="Apellido Paterno"
                  value={formData.apellido_p}
                  onChange={handleChange}
                />
                <Form.Control.Feedback>¡Se ve bien!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                as={Col}
                sm="12"
                md="4"
                controlId="validationCustom03"
              >
                <Form.Label>Apellido Materno</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="apellido_m"
                  placeholder="Apellido Materno"
                  value={formData.apellido_m}
                  onChange={handleChange}
                />
                <Form.Control.Feedback>¡Se ve bien!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group
                as={Col}
                sm="12"
                md="4"
                controlId="validationCustom04"
              >
                <Form.Label>Edad</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="edad"
                  placeholder="Edad"
                  value={formData.edad}
                  onChange={handleChange}
                />
                <Form.Control.Feedback>¡Se ve bien!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                as={Col}
                sm="12"
                md="4"
                controlId="validationCustom05"
              >
                <Form.Label>Sexo</Form.Label>
                <Form.Control
                  required
                  as="select"
                  name="sexo"
                  value={formData.sexo}
                  onChange={handleChange}
                >
                  <option value="">Selecciona</option>
                  <option value="M">M</option>
                  <option value="F">F</option>
                </Form.Control>
                <Form.Control.Feedback>¡Se ve bien!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                as={Col}
                sm="12"
                md="4"
                controlId="validationCustom06"
              >
                <Form.Label>Altura</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="altura"
                  placeholder="Altura"
                  value={formData.altura}
                  onChange={handleChange}
                />
                <Form.Control.Feedback>¡Se ve bien!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group
                as={Col}
                sm="12"
                md="4"
                controlId="validationCustom07"
              >
                <Form.Label>Peso</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="peso"
                  placeholder="Peso"
                  value={formData.peso}
                  onChange={handleChange}
                />
                <Form.Control.Feedback>¡Se ve bien!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                as={Col}
                sm="12"
                md="4"
                controlId="validationCustom08"
              >
                <Form.Label>Enfermedades</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="enfermedades"
                  placeholder="Enfermedades"
                  value={formData.enfermedades}
                  onChange={handleChange}
                />
                <Form.Control.Feedback>¡Se ve bien!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                as={Col}
                sm="12"
                md="4"
                controlId="validationCustom09"
              >
                <Form.Label>Tipo de Sangre</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="tipo_sangre"
                  placeholder="Tipo de Sangre"
                  value={formData.tipo_sangre}
                  onChange={handleChange}
                />
                <Form.Control.Feedback>¡Se ve bien!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group
                as={Col}
                sm="12"
                md="4"
                controlId="validationCustom10"
              >
                <Form.Label>Fecha de Nacimiento</Form.Label>
                <Form.Control
                  required
                  type="date" // Cambiar el tipo de campo a "date"
                  name="fecha_nacimiento"
                  placeholder="Fecha de Nacimiento"
                  value={formData.fecha_nacimiento}
                  onChange={handleChange}
                />
                <Form.Control.Feedback>¡Se ve bien!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                as={Col}
                sm="12"
                md="4"
                controlId="validationCustom11"
              >
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="telefono"
                  placeholder="Teléfono"
                  value={formData.telefono}
                  onChange={handleChange}
                />
                <Form.Control.Feedback>¡Se ve bien!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                as={Col}
                sm="12"
                md="4"
                controlId="validationCustom12"
              >
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control
                  required
                  type="email"
                  name="correo_e"
                  placeholder="Correo Electrónico"
                  value={formData.correo_e}
                  onChange={handleChange}
                />
                <Form.Control.Feedback>¡Se ve bien!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group
                as={Col}
                sm="12"
                md="4"
                controlId="validationCustom13"
              >
                <Form.Check
                  type="checkbox"
                  label="Diagnosticado"
                  name="diagnosticado"
                  checked={formData.diagnosticado}
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>
            <Button type="submit">Guardar</Button>
            <div style={styles.mensajeRegistro}>
            {registroExitoso ? "Registro Exitoso" : ""}
          </div>
          <div style={styles.mensajeExistente}>
            {pacienteExistente ? "Este paciente ya está registrado en el sistema" : ""}
          </div>
          </Form>
        </div>
      ) : (
        <div>
          <NoLogged />
        </div>
      )}
    </>
  );
}

export default FormExample;
