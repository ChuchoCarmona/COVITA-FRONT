import React, { createContext, useState, useEffect } from "react";

// Crea el contexto
export const AuthContext = createContext();

// Crea el proveedor del contexto
export const AuthProvider = ({ children }) => {
  // Variable de estado para indicar si hay un usuario logueado
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheck, setIsCheck] = useState(false);

  const setCheck = (value) => {
    setIsCheck(value);
  };

  const setLoggedIn = (value) => {
    setIsLoggedIn(value);
    localStorage.setItem("isLoggedIn", JSON.stringify(value));
  };

  useEffect(() => {
    const storedValue = localStorage.getItem("isLoggedIn");
    if (storedValue) {
      setIsLoggedIn(JSON.parse(storedValue));
    }
  }, []);


  // Función para realizar el inicio de sesión
const Login = async (username, password) => {
    const data = {
      username: username,
      password: password,
    };
  
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
  
      document.cookie = "token=" + token;
      setLoggedIn(true);
      localStorage.setItem("isLoggedIn", JSON.stringify(true)); // Actualiza el valor en localStorage
      console.log("Inicio de sesión exitoso");
      window.location.href = "/";
    } else {
      console.log("Inicio de sesión fallido");
      setIsCheck(false)
    }
  };
  

  // Función para realizar el cierre de sesión
  const Logout = () => {
    fetch("http://127.0.0.1:8000/logout/", {
      method: "GET",
      credentials: "include", // Incluir las cookies en la solicitud
    })
      .then((response) => {
        if (response.ok) {
          // Eliminar la cookie de autenticación
          console.log("Exito al cerrar sesión");
          window.location.href = "/";
          setIsLoggedIn(false)
          localStorage.setItem("isLoggedIn", JSON.stringify(false));
        //   console.log(isLoggedIn)
          document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          // Redireccionar a la página de inicio de sesión
          
        } else {
          console.error("Error al cerrar sesión");
        //   setLoggedIn(false);
        }
      })
      
    
  };

  // Pasa el estado y las funciones a los componentes hijos
  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoggedIn, Login, Logout, isCheck }}>
      {children}
    </AuthContext.Provider>
  );
};