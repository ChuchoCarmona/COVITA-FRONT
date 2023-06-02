import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar";
import Inicio from "./components/Inicio";
import BasicExample from "./components/Login";
import FormExample from "./components/Registro";
import ConsultaPacientes from "./components/Consulta-Pacientes";
import ImageUpload from "./components/AutoDiag";
import RegistroUsuario from "./components/RegistUser"
import { AuthProvider } from "./components/AuthContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<BasicExample />} />
          <Route path="/registrar" element={<FormExample />} />
          <Route path="/consultas" element={<ConsultaPacientes />} />
          {/* <Route path="/consultas" element={<Pokemon />} /> */}
          <Route path="/diagnosticoIA" element={<ImageUpload/>} />
          <Route path="/registroUsuario" element={<RegistroUsuario/>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
