import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import TasksContext from "../../contexts/TasksContext";
import { getTaskById, putAnotationTask } from "../../services/tasksService";
import TaskItem from "../Home/TaskItem";
import DeleteTask from "./DeleteTask";
import { FiLogOut } from "react-icons/fi";
import ListsContext from "../../contexts/ListsContext";

export default function SidebarTask() {
  const [tasks, setTasks] = useState([]);
  const { taskIdSelected, anotation, setTaskSelected } =
    useContext(TasksContext);
  const { render } = useContext(ListsContext);
  const [writes, setWrites] = useState([]);

  useEffect(() => {
    async function fetchTask() {
      try {
        const promise = await getTaskById(taskIdSelected);
        setTasks(promise.data);
        setWrites(new Array(promise.data.length).fill(anotation));
      } catch (error) {
        console.log("aqui", error);
      }
    }
    fetchTask();
  }, [taskIdSelected, anotation, render]);

  const handleSave = async (id, index) => {
    try {
      await putAnotationTask(id, writes[index]);
      const newWrites = [...writes];
      newWrites[index] = writes[index];
      setWrites(newWrites);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <WrapperSideBarTask>
      {tasks.length !== 0 &&
        tasks?.map((item, index) => (
          <div key={index}>
            <TaskItem
              name={item.name}
              id={item.id}
              isCompleted={item.is_completed}
            />
            <TextArea
              value={writes[index]}
              onChange={(e) => {
                const newWrites = [...writes];
                newWrites[index] = e.target.value;
                setWrites(newWrites);
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
        <FiLogOut
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
