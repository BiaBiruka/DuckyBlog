import styles from "./About.module.css";

import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className={styles.aboutPage}>
      <h2 className={styles.title}>
        <span>
          Sobre o <span className={styles.ducky}>Ducky</span>
          <span className={styles.blog}>Blog</span>
        </span>
      </h2>

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
