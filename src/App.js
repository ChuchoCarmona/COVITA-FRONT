import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar";
import Inicio from "./components/Inicio";
import BasicExample from "./components/Login";
import FormExample from "./components/Registro";
import Paciente from "./components/Paciente";
import Pokemon from "./components/ConsumoAPI";
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
          <Route path="/paciente" element={<Paciente />} />
          <Route path="/consultas" element={<Pokemon />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
