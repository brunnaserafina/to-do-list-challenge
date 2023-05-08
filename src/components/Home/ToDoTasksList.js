import { useContext, useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import styled from "styled-components";
import DeleteList from "./DeleteList";
import ListsContext from "../../contexts/ListsContext";
import ToDoTask, { Check } from "./ToDoTaskItem";
import CreateTask from "./CreateTask";
import { getTasksUnfinished } from "../../services/tasksService";
import { toast } from "react-toastify";

export default function ToDoTasksList() {
  const [createdNewTask, setCreatedNewTask] = useState(false);
  const [tasksUnfinished, setTasksUnfinished] = useState([]);
  const [titleTask, setTitleTask] = useState("");
  const { titleListSelected } = useContext(ListsContext);
  const { allLists, idListSelected, setRender } = useContext(ListsContext);

  useEffect(() => {
    async function getAllTasks() {
      try {
        let allTasksUnfinished;

        if (idListSelected === null) {
          allTasksUnfinished = await getTasksUnfinished({
            listId: allLists[0].id,
          });
        } else {
          allTasksUnfinished = await getTasksUnfinished({
            listId: idListSelected,
          });
        }

        setTasksUnfinished(allTasksUnfinished.data);
      } catch (error) {
        toast("Não foi possível carregar as tarefas");
      }
    }

    getAllTasks();
  }, [idListSelected, allLists, setRender]);

  return (
    <ToDoTasks>
      <span>
        {idListSelected === null && allLists.length > 0 ? (
          <h1>{allLists[0].title}</h1>
        ) : (
          <h1>{titleListSelected}</h1>
        )}
        <DeleteList
          setCreatedNewTask={setCreatedNewTask}
          setTitleTask={setTitleTask}
        />
      </span>

      <ul>
        {tasksUnfinished.map((item, index) => (
          <ToDoTask key={index} name={item.name} id={item.id}></ToDoTask>
        ))}
      </ul>

      {createdNewTask ? (
        <CreateTask
          titleTask={titleTask}
          setTitleTask={setTitleTask}
          setCreatedNewTask={setCreatedNewTask}
        />
      ) : (
        <div onClick={() => setCreatedNewTask(true)}>
          <Check>
            <AiOutlinePlus color={"white"} />
          </Check>
          <p>Adicionar tarefa</p>
        </div>
      )}
    </ToDoTasks>
  );
}

const ToDoTasks = styled.div`
  width: 22.5vw;
  min-height: 30vh;
  height: fit-content;
  padding-right: 2.5vw;

  h1 {
    font-weight: 700;
    font-size: 18px;
  }

  span {
    display: flex;
    justify-content: space-between;
    margin-top: 5vh;
    margin-bottom: 2vh;
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
