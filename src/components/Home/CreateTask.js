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
  const { idListSelected, render, setRender, allLists } =
    useContext(ListsContext);

  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      addNewTask();
    }
  }

  const addNewTask = useCallback(async () => {
    if (titleTask.length < 1) {
      return;
    }
    try {
      if (idListSelected === null) {
        await postTask({ name: titleTask, listId: allLists[0].id });
      } else {
        await postTask({ name: titleTask, listId: idListSelected });
      }

      setTitleTask("");
      setRender(!render);
    } catch (error) {
      toast("Não foi possível adicionar a tarefa, tente novamente!");
    }
  }, [
    titleTask,
    setTitleTask,
    idListSelected,
    render,
    setRender,
    allLists,
  ]);

  return (
    <InputCreateNewListOrTask>
      <input
        type="text"
        placeholder="Digite o título da sua nova tarefa"
        value={titleTask}
        onChange={(e) => setTitleTask(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus
      />
      <div>
        <button onClick={() => setCreatedNewTask(false)}>Cancelar</button>
        <button onClick={addNewTask}>Salvar</button>
      </div>
    </InputCreateNewListOrTask>
  );
}
