import { createContext, ReactNode, useState, Dispatch, SetStateAction } from "react";

interface List {
  id: number;
  title: string;
  ordem: number;
}

interface ListsContextType {
  allLists: List[];
  setAllLists: Dispatch<SetStateAction<List[]>>;
  selectedItemIndex: number;
  setSelectedItemIndex: Dispatch<SetStateAction<number>>;
  idListSelected: number | null;
  setIdListSelected: Dispatch<SetStateAction<number | null>>;
  titleListSelected: string;
  setTitleListSelected: Dispatch<SetStateAction<string>>;
  editedTitleList: boolean;
  setEditedTitleList: Dispatch<SetStateAction<boolean>>;
}

const ListsContext = createContext<ListsContextType | undefined>(undefined);

export default ListsContext;

interface ListsProviderProps {
  children: ReactNode;
}

export function ListsProvider({ children }: ListsProviderProps) {
  const [allLists, setAllLists] = useState<List[]>([]);
  const [idListSelected, setIdListSelected] = useState<number | null>(null);
  const [titleListSelected, setTitleListSelected] = useState("");
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [editedTitleList, setEditedTitleList] = useState(false);

  const contextValue: ListsContextType = {
    allLists,
    setAllLists,
    selectedItemIndex,
    setSelectedItemIndex,
    idListSelected,
    setIdListSelected,
    titleListSelected,
    setTitleListSelected,
    editedTitleList,
    setEditedTitleList,
  };

  return <ListsContext.Provider value={contextValue}>{children}</ListsContext.Provider>;
}
