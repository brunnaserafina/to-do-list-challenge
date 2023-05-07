import { useCallback, useContext } from "react";
import { toast } from "react-toastify";
import ListsContext from "../../contexts/ListsContext";
import { postTask } from "../../services/tasksService";
import { InputCreateNewListOrTask } from "../../common/InputCreateNewListOrTask";

export default function CreateTask({
  titleTask,
  setTitleTask,
  setCreatedNewTask,
}) {
  const { idListSelected, render, setRender } = useContext(ListsContext);

  const addNewTask = useCallback(async () => {
    if (titleTask.length < 1) {
      return;
    }

    try {
      await postTask({ name: titleTask, listId: idListSelected });
      setTitleTask("");
      setCreatedNewTask(false);
      setRender(!render);
    } catch (error) {
      toast("Não foi possível adicionar a tarefa, tente novamente!");
    }
  }, [
    titleTask,
    setTitleTask,
    idListSelected,
    setCreatedNewTask,
    render,
    setRender,
  ]);

  return (
    <InputCreateNewListOrTask>
      <input
        type="text"
        placeholder="Digite o título da sua nova tarefa"
        value={titleTask}
        onChange={(e) => setTitleTask(e.target.value)}
        autoFocus
      />
      <div>
        <button onClick={() => setCreatedNewTask(false)}>Cancelar</button>
        <button onClick={addNewTask}>Salvar</button>
      </div>
    </InputCreateNewListOrTask>
  );
}
