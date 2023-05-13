import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import CreateTask from "./CreateTask";
import DeleteList from "./DeleteList";
import TaskItem, { Check } from "./TaskItem";
import ListsContext from "../../contexts/ListsContext";
import { getTasksUnfinished } from "../../services/tasksService";
import { IconEdit, IconEditFinish, IconPlusAddTask } from "../../common/Icons";
import { editTitleList } from "../../services/listsService";

export default function ToDoTasksList() {
  const [createdNewTask, setCreatedNewTask] = useState(false);
  const [toDoTasks, setToDoTasks] = useState([]);
  const [renameList, setRenameList] = useState(false);

  const { allLists, idListSelected, titleListSelected, setRender } =
    useContext(ListsContext);
  const hasLists = allLists.length > 0;

  async function handleRenameList() {
    if (inputValue.length === 0) return;
    try {
      await editTitleList({
        listId: idListSelected ? idListSelected : allLists[0].id,
        title: inputValue,
      });
      setRenameList(false);
      setRender((prev) => !prev);
    } catch (error) {
      toast.error("Não foi possível editar o título da lista");
    }
  }

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
  }, [allLists, idListSelected]);

  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      handleRenameList();
    }
  }

  const [inputValue, setInputValue] = useState(
    !idListSelected && hasLists ? allLists[0].title : titleListSelected
  );

  return (
    <WrapperToDoTasks>
      <span>
        {!renameList ? (
          <h1 onClick={() => setRenameList(true)}>
            {!idListSelected && hasLists
              ? allLists[0].title
              : titleListSelected}
          </h1>
        ) : (
          <input
            type="text"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        )}

        <div>
          {renameList ? (
            <IconEditFinish
              fontSize={"22px"}
              color={"var(--dark-green)"}
              cursor={"pointer"}
              onClick={handleRenameList}
            />
          ) : (
            <IconEdit
              fontSize={"20px"}
              color={"var(--dark-green)"}
              cursor={"pointer"}
              onClick={() => setRenameList(true)}
            />
          )}

          <DeleteList />
        </div>
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
        <CreateTask setCreatedNewTask={setCreatedNewTask} />
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
