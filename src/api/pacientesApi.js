import axios from "axios";

export const crearPaciente = (paciente) => {
  return axios.post("http://localhost:8000/principal/paciente/");
};
