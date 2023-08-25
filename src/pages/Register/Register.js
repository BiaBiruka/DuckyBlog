import { useAuthentication } from "../../hooks/useAuthentication";

import styles from "./Register.module.css";

import { useState, useEffect } from "react";

const Register = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // Importa os dados/funções do hook criado
  const { createUser, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Se o formulário envia, define erro como nada
    setError("");

    // Define o usuário como os dados do formulário
    const user = {
      displayName,
      email,
      password,
    };

    if (password !== confirmPassword) {
      setError("As senhas precisam ser iguais");
      return;
    }

    const res = await createUser(user);
    console.log(res);
  };

  // Verifica se o erro mudou
  // O erro que vem do hook de autenticação chama authError p/ não confundir com o erro do register (senha diferente)
  useEffect(() => {
    // Se há um erro (não está null), exibe o erro da mesma forma que o erro padrão (senhas diferentes)
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className={styles.register}>
      <h1>Cadastre-se para postar</h1>
      <p>Faça seu cadastro e compartilhe suas histórias!</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome:</span>
          <input
            type="text"
            name="displayName"
            placeholder="Insira seu nome de usuário"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
          />
        </label>
        <label>
          <span>E-mail:</span>
          <input
            type="email"
            name="email"
            placeholder="Insira seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          <span>Senha:</span>
          <input
            type="password"
            name="password"
            placeholder="Insira sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          <span>Confirme sua senha:</span>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Insira novamente sua senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {!loading && <button className="btn">Cadastrar</button>}
        {loading && (
          <button className="btn" disabled>
            Aguarde...
          </button>
        )}
        {/* Se tiver erro, exibe abaixo do botão */}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Register;
