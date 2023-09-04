import styles from "./Post.module.css";

// hooks
import { Link, useParams, useNavigate } from "react-router-dom";
import { useFetchDocument } from "../../hooks/useFetchDocument";

const Post = () => {
  const { id } = useParams();
  const { document: post, loading } = useFetchDocument("posts", id);
  const navigate = useNavigate();

  // const handleBack = (e) => {
  //   e.preventDefault();
  //   navigate(-1);
  // };
  return (
    <div className={styles.post_container}>
      {loading && <p>Carregando dados...</p>}
      {post && (
        <>
          <h1>{post.title}</h1>
          <img src={post.image} alt={post.title} />
          <p className={styles.content}>{post.content}</p>
          <div className={styles.tags}>
            <i>
              {post.tagsArray.map((tag) => (
                <span key={tag}>#{tag}</span>
              ))}
            </i>
          </div>
        </>
      )}
      {!post && !loading && (
        <div className="not_found">
          <img src="/ducky-notFound2.svg" alt="DuckyBlog not Found" />
          <div>
            <h1>Nenhuma postagem encontrada para esta URL</h1>
            <p>
              Tente outra URL ou <Link to="/">Volte para o menu</Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
