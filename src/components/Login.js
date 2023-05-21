import React from "react";
import { Button, Form } from "react-bootstrap";

function BasicExample() {
  
  
  return (
    <body>
    <div className="contact_section layout_padding">
  <div className="container">
    <h1 className="contact_taital">Que hacemos</h1>
    <div className="news_section_2">
      <div className="row">
        <div className="col-md-6">
          <div className="icon_main">
            <div className="icon_7"><img src="images/icon-7.png" alt="Icon 7" /></div>
            <h4 className="diabetes_text">Pruebas COVID-19 rápidas</h4>
          </div>
          <div className="icon_main">
            <div className="icon_7"><img src="images/icon-5.png" alt="Icon 5" /></div>
            <h4 className="diabetes_text">Atención personalizada</h4>
          </div>
          <div className="icon_main">
            <div className="icon_7"><img src="images/icon-6.png" alt="Icon 6" /></div>
            <h4 className="diabetes_text">Detección de COVID-19 mediante IA</h4>
          </div>
        </div>
        <div className="col-md-6">
        <div className="modal-containerli">
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
     </div>
        </div> 
       </div>
    </div>
  </div>
</div>

    
    </body>
  );
}

export default BasicExample;
