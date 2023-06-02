import React, { useEffect, useState, setIsRegistering,isRegistering, useContext } from "react";
import { Button, Form } from "react-bootstrap";
import { AuthContext } from "./AuthContext";


const NoLogged = () => {
  const { Logout, User_ID } = useContext(AuthContext);
  const handleLogout = () => {
    Logout()
  };

 return (
    <div className="news_section ">
  <div className="container">
    <h1 className="health_taital">Al parecer no tienes permisos para acceder a esta función, accede con una sesion valida</h1>
    <p className="health_text">Bienvenido a <strong>COVITA</strong></p>
    <h4 className="health_text"> Sistema de detección de COVID-19 en imagenes radiológicas mediante IA</h4>
    <div className="news_section_2 layout_padding">
      <div className="row">
        <div className="col-lg-4 col-sm-6">
          <div className="box_main active">
            <div className="icon_1"><img src="images/casa3.png" alt="" /></div>
            <a href="/">
            <h4 className="daily_text_1">Inico</h4>
            </a>
          </div>
        </div>
        <div className="col-lg-4 col-sm-6">
          <div className="box_main">
            <div className="icon_1"><img src="images/login2.png" alt="" /></div>
            <a href="/login">
            <h4 className="daily_text_1" onClick={handleLogout}>Iniciar Sesion</h4>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div> 
 );
}
export default NoLogged;