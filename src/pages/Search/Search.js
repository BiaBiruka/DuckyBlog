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
          <div className="not_found">
            <img src="/ducky-notFound2.svg" alt="DuckyBlog not Found" />
            <div>
              <h1>
                Nenhuma postagem encontrada para <i>"{search}"</i>
              </h1>
              <p>
                <Link to="/">Voltar para o menu</Link>
              </p>
            </div>
          </div>
        )}
        {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
      </div>
    </div>
  );
};

export default Search;
