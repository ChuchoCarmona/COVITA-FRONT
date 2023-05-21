import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "popper.js/dist/umd/popper";
import "bootstrap/dist/js/bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginModal from "./Login";

const MyComponent = () => {
  useEffect(() => {
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

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
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
                  <a className="nav-link" href="/paciente">
                    Registro
                  </a>
                </li>
                <li className="nav-item dropdown">
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
                      <a className="dropdown-item" href="#">
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
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/consultas">
                    Consultas
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Reporte
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/login">
                    Login
                  </a>
                </li>
              </ul>
              {/* <li className="nav-item">
                  <button className="nav-link" onClick={handleOpenModal}>
                    Iniciar sesión
                  </button>
                </li>
              </ul>
              <Modal
                show={showModal}
                onHide={handleCloseModal}
                style={{ zIndex: 9999 }}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Iniciar sesión</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <LoginModal />
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseModal}>
                    Cerrar
                  </Button>
                </Modal.Footer>
              </Modal> */}
            </div>
          </div>
        </nav>
      </header>
    </html>
  );
};

export default MyComponent;
