import { useCallback, useContext } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { toast } from "react-toastify";
import ListsContext from "../../contexts/ListsContext";
import { deleteList, getLists } from "../../services/listsService";

export default function DeleteList({ setCreatedNewTask, setTitleTask }) {
  const {
    idListSelected,
    render,
    setRender,
    setTitleListSelected,
    setSelectedItemIndex,
    setIdListSelected,
  } = useContext(ListsContext);

  const deleteAllList = useCallback(async () => {
    if (window.confirm("Deseja deletar?")) {
      try {
        await deleteList({ listId: idListSelected });
        const allLists = await getLists();
        setCreatedNewTask(false);
        setTitleTask("");
        if (allLists.data.length > 0) {
          setTitleListSelected(allLists?.data[0].title || "");
          setIdListSelected(allLists?.data[0].id);
          setSelectedItemIndex(0);
        }

        setRender(!render);
      } catch (error) {
        toast("Não foi possível adicionar a tarefa, tente novamente!");
      }
    }
  }, [
    idListSelected,
    setTitleTask,
    render,
    setRender,
    setCreatedNewTask,
    setTitleListSelected,
    setIdListSelected,
    setSelectedItemIndex,
  ]);

  return (
    <RiDeleteBinLine
      fontSize={"20px"}
      color={"var(--dark-green)"}
      cursor={"pointer"}
      onClick={deleteAllList}
    />
  );
}
