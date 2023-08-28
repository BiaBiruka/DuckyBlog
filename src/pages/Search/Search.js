import React from "react";

import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery";

const Search = () => {
  const query = useQuery();
  // O get() é um método do URLSearchParams do useQuery
  const search = query.get("q");

  return (
    <div>
      <h2>{search}</h2>
    </div>
  );
};

export default Search;
