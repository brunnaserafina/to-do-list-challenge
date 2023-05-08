import { useContext } from "react";
import styled from "styled-components";
import ListsContext from "../contexts/ListsContext";
import Header from "../components/Header/Header";
import DoneTasksList from "../components/Home/DoneTasksList";
import ToDoTasksList from "../components/Home/ToDoTasksList";
import SidebarTask from "../components/SideBarTask/SidebarTask";
import TasksContext from "../contexts/TasksContext";

export default function Home() {
  const { allLists } = useContext(ListsContext);
  const { taskSelected } = useContext(TasksContext);

  return (
    <>
      <Header />

      {allLists.length === 0 ? (
        <MessageNoLists>Você ainda não possui nenhuma lista :(</MessageNoLists>
      ) : (
        <WrapperHome>
          <ToDoTasksList />
          <DoneTasksList />
        </WrapperHome>
      )}

      {taskSelected !== null && <SidebarTask />}
    </>
  );
}

const MessageNoLists = styled.p`
  text-align: center;
  color: var(--dark-green);
  margin-top: 13vh;
  margin-right: 2vw;
`;

const WrapperHome = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  margin-top: 70px;
`;
