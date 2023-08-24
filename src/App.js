// As fontes foram importadas pelo arquivo index.html para serem utilizadas no site todo.
// O ideal é importar só o que vai usar. Uma prática comum é importar tudo e depois remover o que não usar

import "./App.css";

// React router
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/sobre" element={<About />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/cadastro" element={<Register />}></Route>
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
