import styles from "./PostDetail.module.css"
import { Link } from "react-router-dom"

const PostDetail = ({post}) => {
  return (
    <div className={styles.post_detail}>
        <img src={post.image} alt={post.title}/>
        <h2>{post.title}</h2>
        <p className={styles.createdBy}>Por: {post.createdBy}</p>
        <div className={styles.tags}>{post.tagsArray.map((tag) => (
            <p key={tag}><span>#{tag}</span></p> //Na aula a tag ta fora do span
        ))}
        </div>
        <Link to={`/postagens/${post.id}`} className="btn btn-outline">Ler</Link>
    </div>
  )
}

export default PostDetail