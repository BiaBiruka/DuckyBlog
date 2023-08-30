import { useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { updateDoc, doc } from "firebase/firestore";

const initialState = {
  loading: null,
  error: null,
};

const updateReducer = (state, action) => {
  // Se estiver carregando faz x, se estiver inserindo faz Y...
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "UPDATED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      // Pega o erro passado ao executar a função
      return { loading: false, error: action.payload };
    default:
      // Se nada estiver acontecendo, retorna o estado normal
      return state;
  }
};

export const useUpdateDocument = (docCollection) => {
  const [response, dispatch] = useReducer(updateReducer, initialState);

  // Evitar leak de memória
  // const [cancelled, setCancelled] = useState(false); -> Removido por conta do erro no useEffect
  let cancelled = false;

  const checkCancelBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const updateDocument = async (id, data) => {
    checkCancelBeforeDispatch({
      type: "LOADING",
    });

    try {
      const docRef = await doc(db, docCollection, id);
      const updatedDocument = await updateDoc(docRef, data);

      checkCancelBeforeDispatch({
        type: "UPDATED_DOC",
        payload: updatedDocument,
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

  return { updateDocument, response };
};
