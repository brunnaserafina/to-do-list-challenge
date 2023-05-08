import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import TasksContext from "../../contexts/TasksContext";
import { getTaskById, putAnotationTask } from "../../services/tasksService";
import ToDoTask from "../Home/ToDoTaskItem";

export default function SidebarTask() {
  const [tasks, setTasks] = useState([]);
  const { taskIdSelected, anotation } = useContext(TasksContext);
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
  }, [taskIdSelected, anotation]);

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
            <ToDoTask name={item.name} id={item.id} />
            <textarea
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
            ></textarea>
            <button onClick={() => handleSave(item.id, index)}>Salvar</button>
          </div>
        ))}
    </WrapperSideBarTask>
  );
}

const WrapperSideBarTask = styled.span`
  position: fixed;
  right: 0;
  background-color: var(--gray);
  height: 100vh;
  width: 20vw;
  top: 70px;
  padding: 5vh;
  z-index: 1 !important;

  li {
    display: flex;
    align-items: center;
    color: var(--dark-green);
    font-weight: 700;
  }

  textarea {
    width: 100%;
    margin-top: 20px;
    border: none;
    border-radius: 10px;
    font-family: Roboto;
    font-size: 15px;
    padding: 10px;
    color: var(--dark-green);
  }

  textarea::placeholder {
    color: var(--dark-green);
    font-size: 14px;
  }

  textarea:focus {
    outline: 0;
    border: solid 1.5px var(--light-green);
    caret-color: var(--dark-green);
  }

  button {
    width: 100%;
    border: none;
    background-color: var(--light-green);
    margin-top: 5px;
    height: 25px;
    color: var(--white);
    font-weight: 700;
    border-radius: 5px;
    cursor: pointer;
  }
`;
