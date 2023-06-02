import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const RegistroUsuario = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    cedula: '',
    nombres: '',
    apellido_p: '',
    apellido_m: '',
    email: '',
    rango_usuario: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://127.0.0.1:8000/resgistrarUsuario/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log("Registro de usuario exitoso!");
        // Realizar acciones adicionales después del registro exitoso
      })
      .catch((error) => {
        console.error(error);
        // Manejar errores de registro
      });
  };

  return (
    <div className='modal-containersu'>
        
  <Form onSubmit={handleSubmit}>
    <Row className="mb-3">
      
    <h1 className="contact_text">Registra un usuario</h1>
      <Form.Group as={Col} controlId="username">
        <Form.Label>Nombre de usuario</Form.Label>
        <Form.Control
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group as={Col} controlId="password">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </Form.Group>
    </Row>

    <Row className="mb-3">
      <Form.Group as={Col} controlId="cedula">
        <Form.Label>Cédula</Form.Label>
        <Form.Control
          type="text"
          name="cedula"
          value={formData.cedula}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group as={Col} controlId="nombres">
        <Form.Label>Nombres</Form.Label>
        <Form.Control
          type="text"
          name="nombres"
          value={formData.nombres}
          onChange={handleChange}
          required
        />
      </Form.Group>
    </Row>

    <Row className="mb-3">
      <Form.Group as={Col} controlId="apellido_p">
        <Form.Label>Apellido Paterno</Form.Label>
        <Form.Control
          type="text"
          name="apellido_p"
          value={formData.apellido_p}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group as={Col} controlId="apellido_m">
        <Form.Label>Apellido Materno</Form.Label>
        <Form.Control
          type="text"
          name="apellido_m"
          value={formData.apellido_m}
          onChange={handleChange}
          required
        />
      </Form.Group>
    </Row>

    <Row className="mb-3">
      <Form.Group as={Col} controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group
                as={Col}
                className="mb-3"
                sm="12"
                md="4"
                controlId="validationCustom05"
              >
                <Form.Label>Tipo de usuario</Form.Label>
                <Form.Control
                  required
                  as="select"
                  name="rango_usuario"
                  value={formData.rango_usuario}
                  onChange={handleChange}
                >
                  <option value="">Selecciona</option>
                  <option value="Doctor(a)">Doctor(a)</option>
                  <option value="Enfermer(a)">Enfermer(a)</option>
                  <option value="Trabajador(a)_Social">Trabajador(a)_Social</option>
                </Form.Control>
                <Form.Control.Feedback>¡Se ve bien!</Form.Control.Feedback>
              </Form.Group>
    </Row>

    <Button variant="primary" type="submit">
      Registrar
    </Button>
  </Form>
</div>
  );
};

export default RegistroUsuario;
