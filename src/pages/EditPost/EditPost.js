import styles from "./EditPost.module.css";

import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import { useFetchDocument } from "../../hooks/useFetchDocument";

const EditPost = () => {
  const { id } = useParams();
  const { document: post } = useFetchDocument("posts", id);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    // Altera o estado dos dados do post quando eles chegarem
    if (post) {
      setTitle(post.title);
      setImage(post.image);
      setContent(post.content);

      // Precisa passar tags para texto pois elas vem como array
      const textTags = post.tagsArray.join(", ");

      setTags(textTags);
    }
  }, [post]);

  const { user } = useAuthValue();

  const { updateDocument, response } = useUpdateDocument("posts");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    // Validar url da imagem
    try {
      new URL(image);
    } catch (error) {
      setFormError("URL Inválida");
    }

    // Array de tags
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    // Checagem de valores - se um campo estiver vazio, acusa erro
    if (!title || !image || !tags || !content) {
      setFormError("Preencha todos os campos");
    }

    // Se tiver algum form error preenchido retorna e não finaliza a função
    if (formError) {
      return;
    }

    const data = {
      title,
      image,
      content,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    };

    updateDocument(id, data);

    // Redirect para o menu
    navigate("/painel");
  };
  return (
    <div className={styles.edit_post}>
      {post && (
        <>
          <h2>
            Editar Postagem <i>"{post.title}"</i>
          </h2>
          <p>Altere os dados do post conforme desejar.</p>
          <form onSubmit={handleSubmit}>
            <label>
              <span>Título:</span>
              <input
                type="text"
                name="title"
                value={title}
                placeholder="Pense num bom título"
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </label>
            <label>
              <span>URL da imagem:</span>
              <input
                type="text"
                name="image"
                value={image}
                placeholder="Insira uma imagem bacana."
                onChange={(e) => setImage(e.target.value)}
                required
              />
            </label>
            <p className={styles.preview_title}>Prévia da imagem:</p>
            <img className={styles.preview_img} src={image} alt={title} />
            <label>
              <span>Conteúdo:</span>
              <textarea
                name="content"
                placeholder="Sobre o que você quer falar?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              ></textarea>
            </label>
            <label>
              <span>Tags:</span>
              <input
                type="text"
                name="tags"
                value={tags}
                placeholder="Insira as tags separadas por vírgula."
                onChange={(e) => setTags(e.target.value)}
                required
              />
            </label>
            {!response.loading && <button className="btn">Salvar</button>}
            {response.loading && (
              <button className="btn" disabled>
                Aguarde...
              </button>
            )}
            {response.error && <p className="error">{response.error}</p>}
            {formError && <p className="error">{formError}</p>}
          </form>
        </>
      )}
      {!post && !response.loading && (
        <div className="not_found">
          <img src="/ducky-notFound2.svg" alt="DuckyBlog not Found" />
          <div>
            <h1>Nenhuma postagem encontrada para esta URL</h1>
            <p>
              <Link to="/painel">Voltar para o painel</Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditPost;
