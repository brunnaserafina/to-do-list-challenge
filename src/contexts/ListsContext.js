import { createContext, useState } from "react";

const ListsContext = createContext();

export default ListsContext;

export function ListsProvider({ children }) {
  const [allLists, setAllLists] = useState([]);
  const [idListSelected, setIdListSelected] = useState(null);
  const [titleListSelected, setTitleListSelected] = useState("");
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  

  return (
    <ListsContext.Provider
      value={{
        allLists,
        setAllLists,
        selectedItemIndex,
        setSelectedItemIndex,
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
