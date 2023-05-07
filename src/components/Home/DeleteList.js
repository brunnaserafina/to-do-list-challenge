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
    allLists,
  } = useContext(ListsContext);

  const deleteAllList = useCallback(async () => {
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
        if (allList.data.length > 0) {
          setTitleListSelected(allList?.data[0].title || "");
          setIdListSelected(allList?.data[0].id);
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
    allLists,
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
