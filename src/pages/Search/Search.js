import styles from "./Search.module.css";

import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery";
import PostDetail from "../../components/PostDetail";
import { Link } from "react-router-dom";

const Search = () => {
  const query = useQuery();
  // O get() é um método do URLSearchParams do useQuery
  const search = query.get("q");
  const { documents: posts } = useFetchDocuments("posts", search);

  return (
    <div className={styles.search_container}>
      <h1>
        Resultados da pesquisa "<i>{search}</i>"
      </h1>
      <div>
        {posts && posts.length === 0 && (
          <div className={styles.no_posts}>
            <p>Nenhuma postagem encontrada para {search}</p>
            <Link to="/" className="btn">
              Voltar para o menu
            </Link>
          </div>
        )}
        {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
      </div>
    </div>
  );
};

export default Search;
