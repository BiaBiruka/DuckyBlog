// CSS
import styles from "./Home.module.css";

// Hooks
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

// Componentes
import PostDetail from "../../components/PostDetail";

const Home = () => {
  const [query, setQuery] = useState();
  const { documents: posts, loading } = useFetchDocuments("posts");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query) {
      // Se tem query, manda para uma página do search feito
      return navigate(`/pesquisa?q=${query}`);
    }
  };

  return (
    <div className={styles.home}>
      <h1>Postagens mais recentes</h1>
      <form onSubmit={handleSubmit} className={styles.search_form}>
        <input
          type="text"
          placeholder="Pesquisar por tags..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-search">Pesquisar</button>
      </form>
      <div>
        {loading && <p>Carregando dados...</p>}
        {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
        {posts && posts.length === 0 && (
          <div className={styles.no_posts}>
            <p>Nenhuma postagem foi encontrada...</p>
            <Link to="/postagens/novo" className="btn">
              Crie um agora!
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
