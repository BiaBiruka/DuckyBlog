// As fontes foram importadas pelo arquivo index.html para serem utilizadas no site todo.
// O ideal é importar só o que vai usar. Uma prática comum é importar tudo e depois remover o que não usar

import "./App.css";

// Bibliotrcas
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

// Pages
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import CreatePost from "./pages/CreatePost/CreatePost";
import NotFound from "./pages/NotFound/NotFound";
import Search from "./pages/Search/Search";
import Post from "./pages/Post/Post";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Contexts
import { AuthProvider } from "./context/AuthContext";

// Hooks
import { useState, useEffect } from "react";
import { useAuthentication } from "./hooks/useAuthentication";

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication(); //Chama a autenticação aberta ao fazer o cadastro p/ não ter que fazer de novo

  // Compara o valor do usuário. Se for undefined quer dizer que o usuário ainda está carregando, então não deve ser exibido nada
  const loadingUser = user === undefined;

  // Sempre que mudar a autenticação, a função é executada
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // Mesmo que não esteja logado, não vai ser undefined (ou seja, vai sair da tela de carregando)
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return <p>Carregando página...</p>;
  }

  return (
    <div className="App">
      {/* Envolve tudo no contexto para poder consumí-lo depois */}
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/sobre" element={<About />}></Route>
              <Route path="/pesquisa" element={<Search />}></Route>
              <Route path={"/postagens/:id"} element={<Post />}></Route>
              {/* Se tem (ou não) usuário logado, manda pra página X, se não manda pra Y*/}
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/" />}
              ></Route>
              <Route
                path="/cadastro"
                element={!user ? <Register /> : <Navigate to="/" />}
              ></Route>
              <Route
                path="/painel"
                element={user ? <Dashboard /> : <Navigate to="/login" />}
              ></Route>
              <Route
                path="/postagens/novo"
                element={user ? <CreatePost /> : <Navigate to="/login" />}
              ></Route>
              <Route path="*" element={<NotFound />}></Route>
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
