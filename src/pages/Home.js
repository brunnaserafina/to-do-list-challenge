import Header from "../common/Header";
import styled from "styled-components";
import { RiDeleteBinLine } from "react-icons/ri";
import { BsCheckLg } from "react-icons/bs";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import ListsContext from "../contexts/ListsContext";
import { useCallback, useContext, useEffect, useState } from "react";
import { CreateNewList } from "../common/Lists";
import { toast } from "react-toastify";
import {
  editTaskFinished,
  getTasksFinished,
  getTasksUnfinished,
  postTask,
} from "../services/tasksService";

export default function Home() {
  const { idListSelected, titleListSelected } = useContext(ListsContext);
  const [createdNewTask, setCreatedNewTask] = useState(false);
  const [titleTask, setTitleTask] = useState("");
  const [tasksUnfinished, setTasksUnfinished] = useState([]);
  const [tasksFinished, setTasksFinished] = useState([]);
  const [render, setRender] = useState(false);
  const [openFinishedTasks, setOpenFinishedTasks] = useState(false);

  const addNewTask = useCallback(async () => {
    if (titleTask.length < 1) {
      return;
    }

    try {
      await postTask({ name: titleTask, listId: idListSelected });
      setTitleTask("");
      setCreatedNewTask(false);
    } catch (error) {
      toast("Não foi possível adicionar a tarefa, tente novamente!");
    }
  }, [titleTask, idListSelected]);

  useEffect(() => {
    async function getAllTasks() {
      try {
        const allTasksUnfinished = await getTasksUnfinished({
          listId: idListSelected,
        });

        const allTasksFinished = await getTasksFinished({
          listId: idListSelected,
        });

        setTasksUnfinished(allTasksUnfinished?.data);
        setTasksFinished(allTasksFinished?.data);
      } catch (error) {
        toast("Não foi possível carregar as tarefas");
      }
    }
    getAllTasks();
  }, [idListSelected, titleTask, render]);

  return (
    <>
      <Header />
      {titleListSelected.length !== 0 ? (
        <WrapperHome>
          <Tasks>
            <span>
              <h1>{titleListSelected}</h1>
              <RiDeleteBinLine fontSize={"20px"} color={"var(--dark-green)"} />
            </span>

            <ul>
              {tasksUnfinished?.map((item, index) => (
                <ListUnfinishedTasks
                  key={index}
                  name={item.name}
                  id={item.id}
                  render={render}
                  setRender={setRender}
                ></ListUnfinishedTasks>
              ))}
            </ul>

            {createdNewTask ? (
              <CreateNewList>
                <input
                  type="text"
                  placeholder="Digite o título da sua nova tarefa"
                  value={titleTask}
                  onChange={(e) => setTitleTask(e.target.value)}
                  autoFocus
                />
                <div>
                  <button onClick={() => setCreatedNewTask(false)}>
                    Cancelar
                  </button>
                  <button onClick={addNewTask}>Salvar</button>
                </div>
              </CreateNewList>
            ) : (
              <div onClick={() => setCreatedNewTask(true)}>
                <Check>
                  <AiOutlinePlus color={"white"} />
                </Check>
                <p>Adicionar tarefa</p>
              </div>
            )}
          </Tasks>

          <TasksCompleted>
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
                  <li key={index}>
                    <Check color={"gray"}>
                      <div>
                        <AiOutlineClose />
                      </div>
                    </Check>
                    {item.name}
                  </li>
                ))}
              </ul>
            )}
          </TasksCompleted>
        </WrapperHome>
      ) : (
        <MessageNoLists>Você ainda não possui nenhuma lista :(</MessageNoLists>
      )}
    </>
  );
}

function ListUnfinishedTasks({ name, id, setRender, render }) {
  async function finishTask() {
    try {
      await editTaskFinished({ taskId: id });
      setRender(!render);
    } catch (error) {
      toast("Não foi possível concluir a tarefa");
      console.log(error);
    }
  }

  return (
    <li>
      <Check onClick={finishTask}>
        <div>
          <BsCheckLg color={"white"} />
        </div>
      </Check>
      {name}
    </li>
  );
}

const MessageNoLists = styled.p`
  width: 100vw;
  text-align: center;
  color: var(--dark-green);
  margin-top: 5vh;
`;

const TasksCompleted = styled.div`
  width: 22.5vw;

  span {
    padding-right: 2.5vw;
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  li {
    text-decoration: line-through;
    color: gray;
    display: flex;
    align-items: center;
    margin-top: 5px;
  }

  h2 {
    margin-bottom: 8px;
  }
`;

const Check = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 40px;
  background-color: ${(props) =>
    props.color ? "var(--gray)" : "var(--light-green)"};
  margin-right: 8px;
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    display: ${(props) => (props.color ? "initial" : "none")};
  }

  &:hover div {
    display: initial;
  }
`;

const WrapperHome = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  margin-top: 70px;
`;

const Tasks = styled.div`
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
`;
