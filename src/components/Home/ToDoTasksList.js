import { useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import TaskItem, { Check } from "./TaskItem";
import ListsContext from "../../contexts/ListsContext";
import { getTasksUnfinished, postTask } from "../../services/tasksService";
import { IconPlusAddTask } from "../../common/Icons";
import { InputCreateNewItem } from "../../common/InputCreateNewListOrTask";
import TasksContext from "../../contexts/TasksContext";
import ListTitleBar from "./ListTitleBar";

export default function ToDoTasksList() {
  const [createdNewTask, setCreatedNewTask] = useState(false);
  const { toDoTasks, setToDoTasks, updatedTasks, titleNewTask, setTitleNewTask } = useContext(TasksContext);
  const { allLists, idListSelected } = useContext(ListsContext);

  const addNewTask = useCallback(async () => {
    if (titleNewTask === "") return;

    try {
      await postTask({
        name: titleNewTask,
        listId: idListSelected ? idListSelected : allLists[0].id,
        order: toDoTasks.length + 1,
      });
      setTitleNewTask("");
    } catch (error) {
      toast.error("Não foi possível adicionar a tarefa, tente novamente!");
    }
  }, [allLists, idListSelected, titleNewTask, setTitleNewTask, toDoTasks.length]);

  useEffect(() => {
    async function getAllTasks() {
      try {
        const tasksUnfinished = await getTasksUnfinished({
          listId: idListSelected ? idListSelected : allLists[0].id,
        });

        setToDoTasks(tasksUnfinished.data);
      } catch (error) {
        toast.error("Não foi possível carregar as tarefas");
      }
    }
    getAllTasks();
  }, [allLists, idListSelected, addNewTask, updatedTasks, updatedTasks, setToDoTasks]);

  function handleKeyDown(event) {
    if (event.keyCode === 13) addNewTask();
  }

  return (
    <WrapperToDoTasks>
      <ListTitleBar />

      <ul>
        {toDoTasks.map((item, index) => (
          <TaskItem key={index} index={index} name={item.name} id={item.id} isCompleted={item.is_completed} />
        ))}
      </ul>

      {createdNewTask ? (
        <InputCreateNewItem>
          <input
            type="text"
            placeholder="Digite o título da sua nova tarefa"
            value={titleNewTask}
            onChange={(e) => setTitleNewTask(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />

          <div>
            <button onClick={() => setCreatedNewTask(false)}>Cancelar</button>
            <button onClick={addNewTask}>Salvar</button>
          </div>
        </InputCreateNewItem>
      ) : (
        <div onClick={() => setCreatedNewTask(true)}>
          <Check>
            <IconPlusAddTask color={"white"} />
          </Check>
          <p>Adicionar tarefa</p>
        </div>
      )}
    </WrapperToDoTasks>
  );
}

const WrapperToDoTasks = styled.div`
  width: 22.5vw;
  min-height: 30vh;
  height: fit-content;
  padding-right: 2.5vw;

  li {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    color: var(--dark-green);
    cursor: pointer;
  }

  p {
    color: var(--dark-green);
  }

  > div {
    display: flex;
    align-items: center;
    margin-top: 25px;
    cursor: pointer;
  }

  @media (max-width: 767px) {
    width: 90%;
  }
`;
