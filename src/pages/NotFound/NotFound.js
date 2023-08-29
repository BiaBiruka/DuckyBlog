import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={styles.not_found}>
      <img src="/ducky-notFound2.svg" alt="DuckyBlog not Found" />
      <div>
        <h1>Página não encontrada</h1>
        <p>
          Tente outra URL ou <Link to="/">Volte para o menu</Link>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
