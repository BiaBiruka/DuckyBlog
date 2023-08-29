import styles from "./Dashboard.module.css";

import { Link } from "react-router-dom";

// Contextos e Hooks
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

const Dashboard = () => {
  const { user } = useAuthValue();
  const uid = user.uid;

  // Postagens do usuário
  const posts = [];

  return (
    <div className={styles.dashboard}>
      <h1>Painel de postagens</h1>
      {posts && posts.length === 0 ? (
        <div className={styles.no_posts}>
          <p>Você ainda não tem postagens publicadas.</p>
          <Link to="/postagens/novo" className="btn">
            Crie uma agora!
          </Link>
        </div>
      ) : (
        <div>
          <p>Postagens:</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
