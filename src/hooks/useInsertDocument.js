// Hook para salvar coisas no bd (usuários, postagens, etc)

import { useEffect, useReducer } from "react";
import { db } from "../firebase/config";

// No firebase não tem tabelas, tem collections
import { collection, addDoc, Timestamp } from "firebase/firestore";

const initialState = {
  loading: null,
  error: null,
};

const insertReducer = (state, action) => {
  // Se estiver carregando faz x, se estiver inserindo faz Y...
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "INSERTED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      // Pega o erro passado ao executar a função
      return { loading: false, error: action.payload };
    default:
      // Se nada estiver acontecendo, retorna o estado normal
      return state;
  }
};

export const useInsertDocument = (docCollection) => {
  const [response, dispatch] = useReducer(insertReducer, initialState);

  // Evitar leak de memória
  // const [cancelled, setCancelled] = useState(false); -> Removido por conta do erro no useEffect
  let cancelled = false;

  const checkCancelBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const insertDocument = async (document) => {
    checkCancelBeforeDispatch({
      type: "LOADING",
    });
    try {
      const newDocument = { ...document, createdAt: Timestamp.now() };
      // Procura no BD a collection informada
      const insertedDocument = await addDoc(
        collection(db, docCollection),
        newDocument
      );

      checkCancelBeforeDispatch({
        type: "INSERTED_DOC",
        payload: insertedDocument,
      });
    } catch (error) {
      checkCancelBeforeDispatch({
        type: "ERROR",
        payload: error.message,
      });
    }
  };

  // Para evitar memory leak, encerra o componente
  // Esse componente dá erro se ficar apenas assim (o botão nunca entra no estado de loading)
  // useEffect(() => {
  //   return () => setCancelled(true);
  // }, []);
  // P/ resolver, tirar o useState do erro e deixar como uma variável comum
  useEffect(() => {
    return () => {
      let cancelled = true;
    };
  }, []);

  return { insertDocument, response };
};
