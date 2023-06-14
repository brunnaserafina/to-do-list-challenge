import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import TaskItem from "./TaskItem";
import ListsContext from "../../contexts/ListsContext";
import { getTasksFinished } from "../../services/tasksService";
import { IconArrowDown, IconArrowUp } from "../../common/Icons";
import TasksContext from "../../contexts/TasksContext";

interface DoneTask {
  key: number;
  id: number;
  name: string;
  is_completed: boolean;
}

export default function DoneTasksList() {
  const [openFinishedTasks, setOpenFinishedTasks] = useState<boolean>(false);
  const { doneTasks, setDoneTasks, updatedTasks } = useContext(TasksContext)!;
  const { allLists, idListSelected } = useContext(ListsContext)!;

  useEffect(() => {
    async function getAllTasks() {
      try {
        const tasksFinished = await getTasksFinished({
          listId: idListSelected ? idListSelected : allLists[0].id,
        });

        setDoneTasks(tasksFinished?.data);
      } catch (error) {
        toast.error("Não foi possível carregar as tarefas");
      }
    }

    getAllTasks();
  }, [allLists, idListSelected, updatedTasks, setDoneTasks]);

  return (
    <DoneTasksContainer>
      <span>
        <h2>Tarefas concluídas ({doneTasks?.length})</h2>

        {openFinishedTasks ? (
          <IconArrowUp cursor={"pointer"} onClick={() => setOpenFinishedTasks(false)} />
        ) : (
          <IconArrowDown cursor={"pointer"} onClick={() => setOpenFinishedTasks(true)} />
        )}
      </span>

      {openFinishedTasks && (
        <ul>
          {doneTasks?.map((item: DoneTask, index: number) => (
            <TaskItem key={index} index={index} id={item.id} name={item.name} isCompleted={item.is_completed} />
          ))}
        </ul>
      )}
    </DoneTasksContainer>
  );
}

const DoneTasksContainer = styled.div`
  width: 22.5vw;
  margin-bottom: 70px;

  > span {
    padding-right: 2.5vw;
    display: flex;
    justify-content: space-between;
    margin-top: 5vh;
  }

  li {
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
