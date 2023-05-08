import { useCallback, useContext } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { toast } from "react-toastify";
import ListsContext from "../../contexts/ListsContext";
import TasksContext from "../../contexts/TasksContext";
import { deleteList, getLists } from "../../services/listsService";

export default function DeleteList({ setCreatedNewTask, setTitleTask }) {
  const {
    idListSelected,
    setRender,
    setTitleListSelected,
    setSelectedItemIndex,
    setIdListSelected,
    allLists,
  } = useContext(ListsContext);
  const { setTaskSelected } = useContext(TasksContext);

  const handleDeleteList = useCallback(async () => {
    if (window.confirm("Deseja deletar?")) {
      try {
        if (idListSelected === null) {
          await deleteList({ listId: allLists[0].id });
        } else {
          await deleteList({ listId: idListSelected });
        }

        const allList = await getLists();
        setCreatedNewTask(false);
        setTitleTask("");
        setTaskSelected(null);
        if (allList.data.length > 0) {
          setTitleListSelected(allList?.data[0].title || "");
          setIdListSelected(allList?.data[0].id);
          setSelectedItemIndex(0);
        }

        setRender((prev) => !prev);
      } catch (error) {
        toast("Não foi possível adicionar a tarefa, tente novamente!");
      }
    }
  }, [
    idListSelected,
    setTitleTask,
    setRender,
    setCreatedNewTask,
    setTitleListSelected,
    setIdListSelected,
    setSelectedItemIndex,
    allLists,
    setTaskSelected,
  ]);

  return (
    <RiDeleteBinLine
      fontSize={"20px"}
      color={"var(--dark-green)"}
      cursor={"pointer"}
      onClick={handleDeleteList}
    />
  );
}
