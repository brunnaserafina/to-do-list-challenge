import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import TaskItem from "../Home/TaskItem";
import DeleteTask from "./DeleteTask";
import ListsContext from "../../contexts/ListsContext";
import TasksContext from "../../contexts/TasksContext";
import { getTaskById, putAnotationTask } from "../../services/tasksService";
import { toast } from "react-toastify";
import { IconCloseSidebarTask } from "../../common/Icons";

export default function SidebarTask() {
  const [tasks, setTasks] = useState([]);
  const [annotations, setAnnotations] = useState([]);
  const { render } = useContext(ListsContext);
  const { taskIdSelected, anotation, setTaskSelected } =
    useContext(TasksContext);

  useEffect(() => {
    async function fetchTask() {
      try {
        const task = await getTaskById(taskIdSelected);
        setTasks(task.data);
        setAnnotations([anotation]);
      } catch (error) {
        toast.error("Não foi possível carregar a tarefa");
      }
    }
    fetchTask();
  }, [taskIdSelected, anotation, render]);

  const handleSave = async (taskId, index) => {
    try {
      await putAnotationTask(taskId, annotations[index]);
      const newAnnotations = [...annotations];
      newAnnotations[index] = annotations[index];
      setAnnotations(newAnnotations);
    } catch (error) {
      toast.error("Não foi possível salvar sua anotação, tente novamente!");
    }
  };

  return (
    <WrapperSideBarTask>
      {tasks?.map((item, index) => (
        <div key={index}>
          <TaskItem
            id={item.id}
            name={item.name}
            isCompleted={item.is_completed}
          />

          <TextArea
            value={annotations[index]}
            onChange={(e) => {
              const newanotations = [...annotations];
              newanotations[index] = e.target.value;
              setAnnotations(newanotations);
            }}
            id={item.id}
            cols="30"
            rows="10"
            placeholder="Adicionar anotação"
            isCompleted={item.is_completed}
          ></TextArea>

          <Button
            isCompleted={item.is_completed}
            onClick={() => handleSave(item.id, index)}
          >
            Salvar
          </Button>
        </div>
      ))}

      <CloseSideBarAndDeleteTask>
        <IconCloseSidebarTask
          fontSize={"25px"}
          cursor={"pointer"}
          onClick={() => setTaskSelected(null)}
        />

        <DeleteTask taskIdSelected={taskIdSelected} />
      </CloseSideBarAndDeleteTask>
    </WrapperSideBarTask>
  );
}

const CloseSideBarAndDeleteTask = styled.div`
  color: var(--dark-green);
  margin-bottom: 60px;
  display: flex;
  justify-content: space-between;
`;

const WrapperSideBarTask = styled.span`
  position: fixed;
  right: 0;
  background-color: var(--gray);
  height: 100vh;
  width: 20vw;
  top: 70px;
  padding: 30px 20px;
  z-index: 1 !important;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  li {
    display: flex;
    align-items: center;
    color: var(--dark-green);
    font-weight: 700;
  }

  @media (max-width: 767px) {
    width: 90%;
  }

  @media (min-width: 768px) and (max-width: 1023px) {
    width: 60%;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  margin-top: 20px;
  border: none;
  border-radius: 10px;
  font-family: Roboto;
  font-size: 15px;
  padding: 10px;
  color: ${(props) => (props.isCompleted ? "gray" : "var(--dark-green)")};

  &::placeholder {
    color: ${(props) => (props.isCompleted ? "gray" : "var(--dark-green)")};
    font-size: 14px;
  }

  &:focus {
    outline: 0;
    border: ${(props) =>
      props.isCompleted
        ? "solid 1.5px gray"
        : "solid 1.5px var(--light-green)"};
    caret-color: var(--dark-green);
  }
`;

const Button = styled.button`
  width: 100%;
  border: none;
  background-color: ${(props) =>
    props.isCompleted ? "gray" : "var(--light-green)"};
  margin-top: 5px;
  height: 25px;
  color: var(--white);
  font-weight: 700;
  border-radius: 5px;
  cursor: pointer;
`;
