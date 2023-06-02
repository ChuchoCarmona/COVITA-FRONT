import React, { useState, useContext } from "react";
import Carousel from "react-bootstrap/Carousel";
import ReactDOM from "react-dom";
import { AuthContext, isLoggedIn } from "./AuthContext";

function Inicio() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
    
  };

  const { isLoggedIn } = useContext(AuthContext);
  return (
    
      <body>
        <link rel="stylesheet" href="css/style.css" />
        <link rel="stylesheet" href="css/responsive.css" />
      
      <div>
      <div
        className="carousel-background"
        style={{
          backgroundImage: `url(images/banner-bg.png)`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "100vh",
          position: "relative",
        }}
      >
        <Carousel activeIndex={index} onSelect={handleSelect}>
          <Carousel.Item>
          <div className="banner_section">
              <div className="container">
                <div className="row">
                <div className="col-md-6">
                  <h1 className="banner_taital" style={{ color: "#151515" }}>
                    COV <br />
                    <span style={{ color: "#2596be" }}>ITA</span>
                  </h1>
                  <p className="banner_text">
                    Sistema de detección de COVID-19 en imagenes radiológicas mediante IA
                  </p>
                  
                  <div className="btn_main">
                  {isLoggedIn ? (
                    <>
                    <div className="contact_bt more_bt">
                      <a href="/registrar">Registrar un paciente</a>
                    </div>
                    
                    <div className="contact_bt more_bt">
                      <a href="/diagnosticoIA"> Inciar Diagnóstico </a>
                    </div>
                    </>
                  ):(
                    <>
                    <div className=" more_bt">
                      <a href="/login"> Iniciar sesión</a>
                    </div>
                    </>
                  )}

                    
                  </div>
                </div>
                <div className="col-md-6" style={{marginTop:'30px'}}>
                  <div className="image_1">
                    <img src="images/img-1.png" alt="Image 1" />
                  </div>
                </div>
                </div>
                </div>
                </div>
              
          </Carousel.Item>
          <Carousel.Item>
            <div className="banner_section">
              <div className="container">
                <div className="row">
                  <div className="col-md-6">
                    <h1 className="banner_taital">
                      VISIÓN<br/>
                    </h1>
                    <p className="banner_text" style={{textAlign:'justify'}}>
                    Contamos con un sistema fiable para la deteccion de COVID-19,
                     lo que nos permite desempeñar un papel fundamental en la detección
                     de esta enfermedad mediante imágenes radiológicas. Además, estamos comprometidos en colaborar 
                     con el sector de la salud y brindar apoyo a los pacientes de escasos recursos a través de 
                     programas de orientación médica gratuita. Asimismo, nos esforzamos por 
                     establecer alianzas con otras empresas que compartan nuestra visión, con el objetivo de fortalecer 
                     aún más la detección y el tratamiento eficaz del COVID-19 utilizando imágenes radiológicas.
                    </p>
                    
                  </div>
                  <div className="col-md-6" style={{marginTop:'30px'}}>
                    <div className="image_1 contenedor" >
                      <img src="images/ojomov.gif" alt="Image 1"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="banner_section">
              <div className="container">
                <div className="row">
                  <div className="col-md-6">
                    <h1 className="banner_taital">
                      Misión <br />
                    </h1>
                    <p className="banner_text" style={{textAlign: 'justify'}}>
                    Nuestra misión se centra en la prevención y control del 
                    COVID-19, la mejora en el tratamiento de los pacientes 
                    afectados por esta enfermedad y la satisfacción tanto de 
                    nuestros profesionales médicos como de nuestros colaboradores.
                    Nos esforzamos diariamente en fortalecer nuestros principios éticos,
                     responsabilidad, honestidad, amabilidad y éxito, para garantizar
                      un enfoque integral en la lucha contra el COVID-19 y en la 
                      atención de aquellos que confían en nosotros.
                    </p>
                    
                  </div>
                  <div className="col-md-6" style={{marginTop:'30px'}}>
                    <div className="image_1 contenedor" >
                      <img src="images/manos.png" alt="Image 1" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
      </div>
      </body>
    
  );
}

export default Inicio;
