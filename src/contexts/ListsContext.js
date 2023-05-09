import { createContext, useState, useEffect } from "react";
import { getLists } from "../services/listsService";

const ListsContext = createContext();

export default ListsContext;

export function ListsProvider({ children }) {
  const [allLists, setAllLists] = useState([]);
  const [idListSelected, setIdListSelected] = useState(null);
  const [titleListSelected, setTitleListSelected] = useState("");
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [render, setRender] = useState(false);

  useEffect(() => {
    async function getAllLists() {
      const lists = await getLists();

      if (lists.data.length === 0) {
        setTitleListSelected("");
        setIdListSelected(null);
        setAllLists([]);
      } else {
        setAllLists(lists?.data);
      }
    }

    getAllLists();
  }, [render, setRender]);

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
        render,
        setRender,
      }}
    >
      {children}
    </ListsContext.Provider>
  );
}
