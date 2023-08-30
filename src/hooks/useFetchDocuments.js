import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";

export const useFetchDocuments = (docCollection, search = null, uid = null) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  // Memody leak
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (cancelled) return;
      setLoading(true);

      // Cria a referência de documento
      const collectionRef = await collection(db, docCollection);

      try {
        // Querys mais complexas
        let q;
        if (search) {
          // Busca de acordo com a tag escrita no campo de pesquisa
          q = await query(
            collectionRef,
            where("tagsArray", "array-contains", search),
            orderBy("createdAt", "desc")
          );
        } else if (uid) {
          q = await query(
            collectionRef,
            where("uid", "==", uid),
            orderBy("createdAt", "desc")
          );
        } else {
          // Caso não tenha sido pesquisado nada, exibe tudo
          q = await query(collectionRef, orderBy("createdAt", "desc"));
        }

        // Mantém os dados atualizados - sempre que alterar, trás
        await onSnapshot(q, (querySnapshot) => {
          // Os dados vem do firebase com coisas extras. Fazemos um mapa com todos os documentos e então um mapa de cada documento
          setDocuments(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
        });
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error.message);
        setLoading(false);
      }
    };
    loadData();
  }, [docCollection, search, uid, cancelled]); //Se chegar um deles já pode buscar dados

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { documents, loading, error };
};
