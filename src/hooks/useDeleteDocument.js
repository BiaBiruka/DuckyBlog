// Hook para salvar coisas no bd (usuários, postagens, etc)

import { useEffect, useReducer } from "react";
import { db } from "../firebase/config";

// No firebase não tem tabelas, tem collections
import { doc, deleteDoc } from "firebase/firestore";

const initialState = {
  loading: null,
  error: null,
};

const deleteReducer = (state, action) => {
  // Se estiver carregando faz x, se estiver inserindo faz Y...
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "DELETED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      // Pega o erro passado ao executar a função
      return { loading: false, error: action.payload };
    default:
      // Se nada estiver acontecendo, retorna o estado normal
      return state;
  }
};

export const useDeleteDocument = (docCollection) => {
  const [response, dispatch] = useReducer(deleteReducer, initialState);

  // Evitar leak de memória
  // const [cancelled, setCancelled] = useState(false); -> Removido por conta do erro no useEffect
  let cancelled = false;

  const checkCancelBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  // Deleta o documento com aquele ID
  const deleteDocument = async (id) => {
    checkCancelBeforeDispatch({
      type: "LOADING",
    });

    try {
      const deletedDocument = await deleteDoc(doc(db, docCollection, id));

      checkCancelBeforeDispatch({
        type: "DELETED_DOC",
        payload: deletedDocument,
      });
    } catch (error) {
      checkCancelBeforeDispatch({
        type: "ERROR",
        payload: error.message,
      });
    }
  };

  useEffect(() => {
    return () => {
      let cancelled = true;
    };
  }, []);

  return { deleteDocument, response };
};
