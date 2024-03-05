import { useState } from "react";

const useSearch = () => {
  const [searchText, setSearchText] = useState("");
  return { searchText, setSearchText };
};

export default useSearch;
