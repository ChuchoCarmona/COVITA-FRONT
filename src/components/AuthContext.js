import React, { createContext, useState, useEffect } from "react";

// Crea el contexto
export const AuthContext = createContext();

// Crea el proveedor del contexto
export const AuthProvider = ({ children }) => {
  // Variable de estado para indicar si hay un usuario logueado
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [actoken, setActoken] = useState("");
  const [usernamec, setUsername] = useState("");
  const [User_ID, setUserID] = useState("");
  const [rangoUsuario, setRangoUsuario] = useState("");

  const setCheck = (value) => {
    setIsCheck(value);
  };
  const userRange = (value) => {
    setRangoUsuario(value);
    localStorage.setItem("rangoUsuario", value);
  };
  const setuser = (value) => {
    setUsername(value);
    localStorage.setItem("usernamec", value);
  };
  const setToken = (token) => {
    setActoken(token);
    localStorage.setItem("actoken", token);
  };
  const setID = (value) => {
    setUserID(value);
    localStorage.setItem("User_ID", value);
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
    const storedRange = localStorage.getItem("rangoUsuario");
    if (storedRange) {
      setRangoUsuario(storedRange);
    }
    const storedToken = localStorage.getItem("actoken");
    if (storedToken) {
      setActoken(storedToken);
    }
    const storeduser = localStorage.getItem("usernamec");
    if (storeduser) {
      setUsername(storeduser);
    }
    const storedID = localStorage.getItem("User_ID");
    if (storedID) {
      setUserID(storedID);
    }
  }, []);

  // Función para realizar el inicio de sesión
  const Login = async (username, password) => {
    setuser(username);
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
      const userID = responseData.user_id;
      console.log(response.json);
      setID(userID);
      setToken(token);
      console.log(userID);
      localStorage.setItem("actoken", token);
      document.cookie = "token=" + token;
      setLoggedIn(true);
      localStorage.setItem("isLoggedIn", JSON.stringify(true)); // Actualiza el valor en localStorage
      console.log("Inicio de sesión exitoso");
      

      //consultar rango de usuario
      fetch("http://127.0.0.1:8000/rango-usuario/", {
        headers: {
          Authorization: `Token ${token}`, // Asegúrate de tener el token de autenticación almacenado en localStorage
        },
      })
        .then((response) => response.json())
        .then((data) => {
          userRange(data.rango_usuario);
          console.log(data.rango_usuario)
          window.location.href = "/";
        })
        .catch((error) => {
          console.error(error);
          // Manejar errores
        });
      
    } else {
      console.log("Inicio de sesión fallido");
      setCheck(false);
    }
  };

  // Función para realizar el cierre de sesión
  const Logout = () => {
    fetch("http://127.0.0.1:8000/logout/", {
      method: "GET",
      credentials: "include", // Incluir las cookies en la solicitud
    }).then((response) => {
      if (response.ok) {
        // Eliminar la cookie de autenticación
        setToken("");
        localStorage.setItem("actoken", "");
        console.log("Exito al cerrar sesión");
        // window.location.href = "/";
        setIsLoggedIn(false);
        localStorage.setItem("isLoggedIn", JSON.stringify(false));
        //   console.log(isLoggedIn)
        document.cookie =
          "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        // Redireccionar a la página de inicio de sesión
      } else {
        console.error("Error al cerrar sesión");
        //   setLoggedIn(false);
      }
    });
  };

  // Pasa el estado y las funciones a los componentes hijos
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setLoggedIn,
        Login,
        Logout,
        isCheck,
        actoken: actoken.toString(),
        usernamec,
        User_ID,
        rangoUsuario,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
