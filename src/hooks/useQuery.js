// Hook p/ pegar os dados da busca por tag

import { useLocation } from "react-router-dom";
import { useMemo } from "react";

export function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}
