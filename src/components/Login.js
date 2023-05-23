import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api_generate_token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        const token = responseData.token;

        // El inicio de sesión fue exitoso, el token está en la respuesta
        document.cookie = "token=" + token; // Guardar el token en una cookie llamada 'token'

        // Realiza alguna acción adicional, como redirigir al usuario a otra página
        console.log("Inicio de sesión exitoso");
      } else {
        // El inicio de sesión falló, puedes mostrar un mensaje de error al usuario.
        console.log("Inicio de sesión fallido");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <body>
      <div className="contact_section layout_padding">
        <div className="container">
          <h1 className="contact_taital">Que hacemos</h1>
          <div className="news_section_2">
            <div className="row">
              <div className="col-md-6">
                <div className="icon_main">
                  <div className="icon_7">
                    <img src="images/icon-7.png" alt="Icon 7" />
                  </div>
                  <h4 className="diabetes_text">Pruebas COVID-19 rápidas</h4>
                </div>
                <div className="icon_main">
                  <div className="icon_7">
                    <img src="images/icon-5.png" alt="Icon 5" />
                  </div>
                  <h4 className="diabetes_text">Atención personalizada</h4>
                </div>
                <div className="icon_main">
                  <div className="icon_7">
                    <img src="images/icon-6.png" alt="Icon 6" />
                  </div>
                  <h4 className="diabetes_text">
                    Detección de COVID-19 mediante IA
                  </h4>
                </div>
              </div>
              <div className="col-md-6">
                <div className="modal-containerli">
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>
                        <h1>Te damos la bienvenida</h1>
                      </Form.Label>
                      <Form.Control
                       type="text"
                       value={username}
                       onChange={(e) => setUsername(e.target.value)}
                       placeholder="Nombre de usuario"
                      />
                      <br />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Control
                        placeholder="Contraseña"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>
                    <br />
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                      {/* <Form.Check type="checkbox" label="Recuérdame" /> */}
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
};

export default Login;
