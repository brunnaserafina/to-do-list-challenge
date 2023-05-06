import { createContext } from "react";
import { useState } from "react";

const ListsContext = createContext();
export default ListsContext;

export function ListsProvider({ children }) {
  const [idListSelected, setIdListSelected] = useState(null);
  const [titleListSelected, setTitleListSelected] = useState("");

  return (
    <ListsContext.Provider
      value={{
        idListSelected,
        setIdListSelected,
        titleListSelected,
        setTitleListSelected,
      }}
    >
      {children}
    </ListsContext.Provider>
  );
}
