import { useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import DeleteList from "./DeleteList";
import TaskItem, { Check } from "./TaskItem";
import ListsContext from "../../contexts/ListsContext";
import { getTasksUnfinished, postTask } from "../../services/tasksService";
import { IconPlusAddTask } from "../../common/Icons";
import { InputCreateNewItem } from "../../common/InputCreateNewListOrTask";
import TasksContext from "../../contexts/TasksContext";

export default function ToDoTasksList() {
  const [createdNewTask, setCreatedNewTask] = useState(false);
  const [toDoTasks, setToDoTasks] = useState([]);
  const [titleTask, setTitleTask] = useState("");
  const { updatedTasks } = useContext(TasksContext);
  const { allLists, idListSelected, titleListSelected } =
    useContext(ListsContext);

  const addNewTask = useCallback(async () => {
    if (titleTask === "") return;

    try {
      await postTask({
        name: titleTask,
        listId: idListSelected ? idListSelected : allLists[0].id,
      });
      setTitleTask("");
    } catch (error) {
      toast.error("Não foi possível adicionar a tarefa, tente novamente!");
    }
  }, [allLists, idListSelected, titleTask]);

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
  }, [allLists, idListSelected, addNewTask, updatedTasks, updatedTasks]);

  function handleKeyDown(event) {
    if (event.keyCode === 13) addNewTask();
  }

  return (
    <WrapperToDoTasks>
      <span>
        <h1>
          {!idListSelected && allLists.length > 0
            ? allLists[0].title
            : titleListSelected}
        </h1>

        <DeleteList />
      </span>

      <ul>
        {toDoTasks.map((item, index) => (
          <TaskItem
            key={index}
            name={item.name}
            id={item.id}
            isCompleted={item.is_completed}
          />
        ))}
      </ul>

      {createdNewTask ? (
        <InputCreateNewItem>
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

  h1 {
    font-weight: 700;
    font-size: 18px;
  }

  > span {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 5vh;
    margin-bottom: 2vh;
  }

  > span > input {
    border: none;
    font-size: 16px;
    font-weight: 700;
  }

  > span > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 15%;
    padding: 0 5px;
  }

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
