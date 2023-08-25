import styles from "./Login.module.css";

import { useAuthentication } from "../../hooks/useAuthentication";

import { useState, useEffect } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Importa os dados/funções do hook criado
  const { login, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Se o formulário envia, define erro como nada
    setError("");

    // Define o usuário como os dados do formulário
    const user = {
      email,
      password,
    };

    const res = await login(user);
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
    <div className={styles.login}>
      <h1>Fazer login</h1>
      <p>Faça seu login e descubra novos horizontes!</p>
      <form onSubmit={handleSubmit}>
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
        {!loading && <button className="btn">Entrar</button>}
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

export default Login;
