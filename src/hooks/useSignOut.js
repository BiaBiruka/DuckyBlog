// Hook p/ logout (na aula foi feito junto com o useAuthentication)
import { signOut, getAuth } from "firebase/auth";

import { useAuthentication } from "./useAuthentication";

export const useSignOut = () => {
  // Importa a função de checar se está cancelado
  const { checkIfIsCancelled } = useAuthentication();
  const logout = () => {
    const auth = getAuth();
    checkIfIsCancelled();
    signOut(auth);
  };

  return { logout };
};
