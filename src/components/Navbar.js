import styles from "./Navbar.module.css";

import { NavLink } from "react-router-dom";

// import { useAuthentication } from "../hooks/useAuthentication";
import { useSignOut } from "../hooks/useSignOut";
import { useAuthValue } from "../context/AuthContext";

const Navbar = () => {
  // Pega o usuário passado pelo contexto p/ exibir coisas caso esteja logado
  const { user } = useAuthValue();

  // Função de logout
  const { logout } = useSignOut();

  return (
    <nav className={styles.navbar}>
      <NavLink to="/">
        <div className={styles.logo}>
          <img src="/ducky.svg" alt="DuckyBlog logo" />
          <div className={styles.logoText}>
            Ducky<span>Blog</span>
          </div>
        </div>
      </NavLink>
      <ul className={styles.links_list}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => isActive && styles.active}
          >
            Menu
          </NavLink>
        </li>
        {user && (
          <>
            <li>
              <NavLink
                to="/postagens/novo"
                className={({ isActive }) => isActive && styles.active}
              >
                Nova postagem
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => isActive && styles.active}
              >
                Painel
              </NavLink>
            </li>
          </>
        )}
        <li>
          <NavLink
            to="/sobre"
            className={({ isActive }) => isActive && styles.active}
          >
            Sobre
          </NavLink>
        </li>
        {!user && (
          <>
            <li>
              <NavLink
                to="/cadastro"
                className={({ isActive }) => isActive && styles.active}
              >
                Cadastro
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) => isActive && styles.active}
              >
                Login
              </NavLink>
            </li>
          </>
        )}
        {user && (
          <li>
            <button onClick={logout}>Sair</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
