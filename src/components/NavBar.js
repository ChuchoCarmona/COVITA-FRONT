import React, { useEffect, useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "popper.js/dist/umd/popper";
import "bootstrap/dist/js/bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContext } from "./AuthContext";


const MyComponent = () => {
  const { Logout, User_ID } = useContext(AuthContext);
  // Función para obtener el valor de una cookie por su nombre
  const getCookie = (name) => {
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].split("=");
      const cookieName = cookie[0];
      const cookieValue = cookie[1];
      if (cookieName === name) {
        return cookieValue;
      }
    }
    return "";
  };

  // Función para obtener el nombre de usuario desde un token de autenticación
  const getUsernameFromToken = async (token) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/get_username/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`, // Pasar el token en el encabezado de autorización
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        const username = "Hola "+ responseData.username;

        // Hacer algo con el nombre de usuario
        console.log("Nombre de usuario:", username);
        setUsername(username);
      } else {
        // Manejar el caso de error en la solicitud
        console.log("Error al obtener el nombre de usuario");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Obtener el token de autenticación de la cookie
    const token = getCookie("token");

    // Verificar si el token existe y no está vacío
    if (token && token !== "") {
      // El usuario ha iniciado sesión
      setIsLoggedIn(true);

      // Obtener el nombre de usuario desde el token
      getUsernameFromToken(token);
    }

    const handleDropdownItemClick = (e) => {
      if (e.target.classList.contains("dropdown-toggle")) {
        e.stopPropagation();
      }
    };

    const attachEventListeners = () => {
      const dropdownMenus = document.querySelectorAll(".dropdown-menu");
      dropdownMenus.forEach((dropdownMenu) => {
        dropdownMenu.addEventListener("click", handleDropdownItemClick);
      });
    };

    const removeEventListeners = () => {
      const dropdownMenus = document.querySelectorAll(".dropdown-menu");
      dropdownMenus.forEach((dropdownMenu) => {
        dropdownMenu.removeEventListener("click", handleDropdownItemClick);
      });
    };

    attachEventListeners();

    return () => {
      removeEventListeners();
    };
  }, []);

  

//funcion para hacer logout
  const handleLogout = () => {
    Logout()
  };

  return (
    <html>
      <link rel="stylesheet" href="css/style.css" />
      <link rel="stylesheet" href="css/responsive.css" />

      <header>
        <nav
          className=" bc-grad navbar navbar-expand-lg bg-body-tertiary  "
          style={{ borderRadius: "0", margin: "0" }}
        >
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
            integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
            crossorigin="anonymous"
          ></link>
          <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
          <script src="https://unpkg.com/@popperjs/core@2.11.6/dist/umd/popper.min.js"></script>
          <script src="https://unpkg.com/bootstrap@5.5.0/dist/js/bootstrap.min.js"></script>
          <div className="container-fluid container">
            <img
              src="/media/LOGO.svg"
              alt="Bootstrap"
              width="30"
              height="24"
            ></img>
            <a className="navbar-brand" href="/">
              COVITA
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">
                    Inicio
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/registrar">
                    Registro
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/diagnosticoIA">
                    DiagnosticoIA
                  </a>
                </li>
                {/* <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Diagnóstico
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="/diagnosticoIA">
                        Automático
                      </a>
                    </li>
                    <li className="dropdown-submenu">
                      <a
                        className="dropdown-item dropdown-toggle"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Manual
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <div className="dropdown-text text-center bg-gray">
                            Técnicas
                          </div>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Binarización
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item bg-gray" href="#">
                            RGB
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li> */}
                <li className="nav-item">
                  <a className="nav-link" href="/consultas">
                    Consultas
                  </a>
                </li>
                <li className="nav-item">
                  {isLoggedIn ? (
                    <>
                      <a className="nav-link" href="/" onClick={handleLogout}>
                        Logout 
                      </a>
                      
                    </>
                  ) : (
                    <a className="nav-link" href="/login">
                      Login
                    </a>
                  )}
                </li>
                <li className="nav-item">
                <a className="nav-link"> {username}</a>
                </li>
                <li className="nav-item">
                  {isLoggedIn & User_ID == 1 ? (
                    <>
                      <a className="nav-link" href="/registroUsuario">
                        Registrar usuario 
                      </a>                      
                    </>
                  ) : (
                    <>
                    </>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </html>
  );
};

export default MyComponent;
