import styles from "./About.module.css";

import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className={styles.aboutPage}>
      <div className={styles.logo}>
        <h2>
          <span className={styles.sobre}>Sobre o</span>
          <img src="/ducky.svg" alt="DuckyBlog logo" />
          Ducky<span className={styles.blog}>Blog</span>
        </h2>
      </div>

      <p>
        Este projeto consiste em um blog feito com React no Front-end e Firebase
        no Back-end.
      </p>
      <Link to="/postagens/novo" className="btn">
        Comece a postar agora!
      </Link>
    </div>
  );
};

export default About;
