import styles from "./CreatePost.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  const { user } = useAuthValue();

  const { insertDocument, response } = useInsertDocument("posts");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    // Validar url da imagem
    try {
      // Tenta criar uma URL com o que foi passado no campo
      new URL(image);
    } catch (error) {
      setFormError("URL Inválida");
    }

    // Criação da array de tags
    // Quebra o campo onde tem as vírgulas e faz um map
    // Ao fazer o map, faz um trim para tirar espaços em branco e passa tudo pra lower case
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    // Checagem de valores - se um campo estiver vazio, acusa erro
    if (!title || !image || !tags || !content) {
      setFormError("Preencha todos os campos");
    }

    // Se tiver algum form error preenchido retorna e não finaliza a função
    if (formError) {
      return;
    }

    insertDocument({
      title,
      image,
      content,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    // Redirect para o menu
    navigate("/");
  };

  return (
    <div className={styles.create_post}>
      <h2>Nova Postagem</h2>
      <p>Encontrou algo interessante? Compartilhe agora mesmo!</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título:</span>
          <input
            type="text"
            name="title"
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
            placeholder="Insira uma imagem bacana."
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </label>
        <label>
          <span>Conteúdo:</span>
          <textarea
            name="content"
            placeholder="Sobre o que você quer falar?"
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </label>
        <label>
          <span>Tags:</span>
          <input
            type="text"
            name="tags"
            placeholder="Insira as tags separadas por vírgula."
            onChange={(e) => setTags(e.target.value)}
            required
          />
        </label>
        {!response.loading && <button className="btn">Postar</button>}
        {response.loading && (
          <button className="btn" disabled>
            Aguarde...
          </button>
        )}
        {response.error && <p className="error">{response.error}</p>}
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default CreatePost;
