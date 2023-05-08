import { useCallback, useContext, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { toast } from "react-toastify";
import styled from "styled-components";
import ListsContext from "../../contexts/ListsContext";
import TasksContext from "../../contexts/TasksContext";
import { getTasksFinished } from "../../services/tasksService";
import { Check } from "./ToDoTaskItem";

export default function DoneTasksList() {
  const [openFinishedTasks, setOpenFinishedTasks] = useState(false);
  const [tasksFinished, setTasksFinished] = useState([]);
  const { idListSelected, render, allLists, setRender } =
    useContext(ListsContext);
  const { setNameTaskSelected, setTaskSelected, setTaskIdSelected } =
    useContext(TasksContext);

  const handleOpenTask = useCallback(
    async (id, name) => {
      setNameTaskSelected(name);
      setTaskSelected(0);
      setTaskIdSelected(id);
      setRender((prev) => !prev);
    },
    [setNameTaskSelected, setTaskIdSelected, setTaskSelected, setRender]
  );

  useEffect(() => {
    async function getAllTasks() {
      try {
        let allTasksFinished;

        if (idListSelected === null) {
          allTasksFinished = await getTasksFinished({
            listId: allLists[0].id,
          });
        } else {
          allTasksFinished = await getTasksFinished({
            listId: idListSelected,
          });
        }

        setTasksFinished(allTasksFinished?.data);
      } catch (error) {
        toast("Não foi possível carregar as tarefas");
      }
    }

    getAllTasks();
  }, [idListSelected, setTasksFinished, render, allLists]);

  return (
    <DoneTasksContainer>
      <span>
        <h2>Tarefas concluídas ({tasksFinished?.length})</h2>

        {openFinishedTasks ? (
          <IoIosArrowUp
            cursor={"pointer"}
            onClick={() => setOpenFinishedTasks(false)}
          />
        ) : (
          <IoIosArrowDown
            cursor={"pointer"}
            onClick={() => setOpenFinishedTasks(true)}
          />
        )}
      </span>

      {openFinishedTasks && (
        <ul>
          {tasksFinished?.map((item, index) => (
            <li key={index} onClick={() => handleOpenTask(item.id, item.name)}>
              <Check color={"gray"}>
                <div>
                  <AiOutlineClose color={"white"} />
                </div>
              </Check>
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </DoneTasksContainer>
  );
}

const DoneTasksContainer = styled.div`
  width: 22.5vw;
  margin-bottom: 70px;

  span {
    padding-right: 2.5vw;
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-top: 5vh;
  }

  li {
    text-decoration: line-through;
    color: gray;
    display: flex;
    align-items: center;
    margin-top: 5px;
    cursor: pointer;
  }

  h2 {
    margin-bottom: 8px;
  }

  @media (max-width: 767px) {
    width: 90%;
  }
`;
