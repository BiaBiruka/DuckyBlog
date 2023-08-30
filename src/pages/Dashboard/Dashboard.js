import styles from "./Dashboard.module.css";

import { Link } from "react-router-dom";

// Contextos e Hooks
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";

const Dashboard = () => {
  const { user } = useAuthValue();
  const uid = user.uid;

  // Postagens do usuário
  const { documents: posts, loading } = useFetchDocuments("posts", null, uid);

  const { deleteDocument } = useDeleteDocument("posts");

  // // Função de deletar postagem
  // const deleteDocument = (id) => {
  //   console.log(id);
  // };

  if (loading) {
    return <p>Carregando postagens...</p>;
  }

  return (
    <div className={styles.dashboard}>
      <h2>Gerenciar postagens</h2>
      {posts && posts.length === 0 ? (
        <div className={styles.no_posts}>
          <p>Você ainda não tem postagens publicadas.</p>
          <Link to="/postagens/novo" className="btn">
            Crie uma agora!
          </Link>
        </div>
      ) : (
        <>
          {/* Cabeçalho */}
          <div className={styles.post_header}>
            <span>Título</span>
            <span>Ações</span>
          </div>
          {/* Conteúdo */}
          {posts &&
            posts.map((post) => (
              <div key={post.id} className={styles.post_row}>
                <p>{post.title}</p>
                <div>
                  <Link
                    to={`/postagens/${post.id}`}
                    className="btn btn-outline"
                  >
                    Ler
                  </Link>
                  <Link
                    to={`/postagens/editar/${post.id}`}
                    className="btn btn-outline"
                  >
                    Editar
                  </Link>
                  <Link
                    onClick={() => deleteDocument(post.id, post.title)}
                    className="btn btn-danger"
                  >
                    Apagar
                  </Link>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default Dashboard;
