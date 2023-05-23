import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar";
import Inicio from "./components/Inicio";
import BasicExample from "./components/Login";
import FormExample from "./components/Registro";
import Paciente from "./components/Paciente";
import Pokemon from "./components/ConsumoAPI";
import ConsultaPacientes from "./components/Consulta-Pacientes.jsx";
import PacienteForm from "./pages/pacienteForm";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<BasicExample />} />
        <Route path="/registrar" element={<FormExample />} />
        <Route path="/paciente" element={<PacienteForm />} />
        <Route path="/consultas" element={<ConsultaPacientes />} />
      </Routes>
    </Router>
  );
}

export default App;
