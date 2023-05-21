import React, { useEffect, useState, setIsRegistering,isRegistering } from "react";
import { Button, Form } from "react-bootstrap";


const Inicioses = () => {
 return (
    // <div className="modal-containerli">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Correo Electronico</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            No compartiremos tu correo con nadie mas.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Recuérdame" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>

        <Button
          className="btn-space"
          variant="secondary"
          type="button"
          href="/registrar"
        >
          Registrar
        </Button>
      </Form>
      // </div>  
 );
}
export default Inicioses;