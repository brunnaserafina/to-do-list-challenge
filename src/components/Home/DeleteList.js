import { useContext } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { toast } from "react-toastify";
import ListsContext from "../../contexts/ListsContext";
import TasksContext from "../../contexts/TasksContext";
import { deleteList, getLists } from "../../services/listsService";

export default function DeleteList() {
  const { setTaskSelected } = useContext(TasksContext);
  const {
    allLists,
    idListSelected,
    setRender,
    setTitleListSelected,
    setSelectedItemIndex,
    setIdListSelected,
  } = useContext(ListsContext);

  const handleDeleteList = async () => {
    if (window.confirm("Deseja deletar esta lista?")) {
      try {
        await deleteList({
          listId: idListSelected ? idListSelected : allLists[0].id,
        });
        setTaskSelected(null);

        const updatedLists = await getLists();

        if (updatedLists.data.length > 0) {
          setTitleListSelected(updatedLists?.data[0].title);
          setIdListSelected(updatedLists?.data[0].id);
          setSelectedItemIndex(0);
        }

        setRender((prev) => !prev);
      } catch (error) {
        toast("Não foi possível remover a lista, tente novamente!");
      }
    }
  };

  return (
    <RiDeleteBinLine
      fontSize={"20px"}
      color={"var(--dark-green)"}
      cursor={"pointer"}
      onClick={handleDeleteList}
    />
  );
}
