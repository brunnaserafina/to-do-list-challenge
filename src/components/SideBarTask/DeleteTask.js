import { useCallback, useContext } from "react";
import { toast } from "react-toastify";
import { IconDelete } from "../../common/Icons";
import ListsContext from "../../contexts/ListsContext";
import TasksContext from "../../contexts/TasksContext";
import { deleteTask } from "../../services/tasksService";

export default function DeleteTask({ taskIdSelected }) {
  const { setTaskSelected } = useContext(TasksContext);
  const { render, setRender } = useContext(ListsContext);

  const handleDeleteTask = useCallback(async () => {
    if (window.confirm("Deseja deletar esta tarefa?")) {
      try {
        await deleteTask(taskIdSelected);
        setTaskSelected(null);
        setRender(!render);
      } catch (error) {
        toast("Não foi possível deletar a tarefa, tente novamente!");
      }
    }
  }, [taskIdSelected, setTaskSelected, render, setRender]);

  return (
    <IconDelete
      fontSize={"23px"}
      color={"var(--dark-green)"}
      cursor={"pointer"}
      onClick={handleDeleteTask}
    />
  );
}
