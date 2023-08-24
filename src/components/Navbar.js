import styles from "./Navbar.module.css";

import { NavLink } from "react-router-dom";

const Navbar = () => {
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
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Menu
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/sobre"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Sobre
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/cadastro"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Cadastro
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
