import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getLists } from "../services/listsService";

const ListsContext = createContext();

export default ListsContext;

export function ListsProvider({ children }) {
  const [allLists, setAllLists] = useState([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [idListSelected, setIdListSelected] = useState(null);
  const [titleListSelected, setTitleListSelected] = useState("");
  const [render, setRender] = useState(false);

  useEffect(() => {
    async function getAllLists() {
      try {
        const allLists = await getLists();

        if (allLists.data.length !== 0) {
          setAllLists(allLists?.data);
        } else {
          setTitleListSelected("");
          setIdListSelected(null);
          setAllLists([]);
        }
      } catch (error) {
        toast("Não foi possível carregar as listas");
      }
    }

    getAllLists();
  }, [render]);

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
