import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

export const useFetchDocument = (docCollection, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  // Memody leak
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    const loadDocument = async () => {
      if (cancelled) return;
      setLoading(true);

      try {
        const docRef = await doc(db, docCollection, id);
        const docSnap = await getDoc(docRef);
        setDocument(docSnap.data()); // Pega os dados do documento referenciado
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    loadDocument();
  }, [docCollection, id, cancelled]); //Se chegar um deles já pode buscar dados

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { document, loading, error };
};
