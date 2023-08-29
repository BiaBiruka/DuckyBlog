import styles from "./Post.module.css";

// hooks
import { useParams } from "react-router-dom";
import { useFetchDocument } from "../../hooks/useFetchDocument";

const Post = () => {
  const { id } = useParams();
  const { document: post, loading } = useFetchDocument("posts", id);

  return (
    <div className={styles.post_container}>
      {loading && <p>Carregando dados...</p>}
      {post && (
        <>
          <h1>{post.title}</h1>
          <img src={post.image} alt={post.title} />
          <p>{post.content}</p>
          <div className={styles.tags}>
            <i>
              {post.tagsArray.map((tag) => (
                <span key={tag}>#{tag}</span>
              ))}
            </i>
          </div>
        </>
      )}
    </div>
  );
};

export default Post;
