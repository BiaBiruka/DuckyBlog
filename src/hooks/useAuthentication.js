// Hook p/ autenticação de usuário

import { db } from "../firebase/config.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

import { useState, useEffect } from "react";

export const useAuthentication = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");

  // Cleanup -> Serve para remover resquícios de outras funções quando se tem muitas mudanças de componentes
  // Evita leak de memória
  const [cancelled, setCancelled] = useState(false);

  const auth = getAuth();

  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  const createUser = async (data) => {
    // Checa se está cancelado. Se não estiver, deixa em estado de loading
    checkIfIsCancelled();
    setLoading(true);
    setError(null);

    // Usa await pois precisa que o usuário chegue
    try {
      const { user } = await createUserWithEmailAndPassword(
        // A função cria apenas com email e senha. Para colocar nome, tem que atualizar o usuário
        auth,
        data.email,
        data.password
      );

      // Atualização de perfil p/ adicionar o nome
      await updateProfile(user, { displayName: data.displayName });

      // Para o loading e retorna o usuário no final da função
      setLoading(false);
      return user;
    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);

      let systemErrorMessage;
      if (error.message.includes("Password")) {
        systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres.";
      } else if (error.message.includes("email-already")) {
        systemErrorMessage = "E-mail já cadastrado.";
      } else {
        systemErrorMessage =
          "Ocorreu um erro. Por favor, tente novamente mais tarde.";
      }

      setLoading(false);
      setError(systemErrorMessage);
    }
  };

  // Cria um useEffect que deixa o cancelado como true ao sair da página
  // Vazio de dependências pois vai executar apenas uma vez
  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { auth, createUser, error, loading };
};
