import { useContext, useState } from "react";
import { toast } from "react-toastify";
import ListsContext from "../../contexts/ListsContext";
import { postTask } from "../../services/tasksService";
import { InputCreateNewListOrTask } from "../../common/InputCreateNewListOrTask";

export default function CreateTask({ setCreatedNewTask }) {
  const [titleTask, setTitleTask] = useState("");
  const { idListSelected, setRender, allLists } = useContext(ListsContext);

  const addNewTask = async () => {
    if (titleTask.length === 0) return;

    try {
      await postTask({
        name: titleTask,
        listId: idListSelected ? idListSelected : allLists[0].id,
      });
      setTitleTask("");
      setRender((prev) => !prev);
    } catch (error) {
      toast.error("Não foi possível adicionar a tarefa, tente novamente!");
    }
  };

  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      addNewTask();
    }
  }

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
