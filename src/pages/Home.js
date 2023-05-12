import { useContext } from "react";
import styled from "styled-components";

import ListsContext from "../contexts/ListsContext";
import TasksContext from "../contexts/TasksContext";

import Header from "../components/Header/Header";
import DoneTasksList from "../components/Home/DoneTasksList";
import ToDoTasksList from "../components/Home/ToDoTasksList";
import SidebarTask from "../components/SideBarTask/SidebarTask";

export default function Home() {
  const { allLists } = useContext(ListsContext);
  const { taskSelected } = useContext(TasksContext);

  const hasLists = allLists.length > 0;

  return (
    <>
      <Header />

      {hasLists ? (
        <WrapperHome>
          <ToDoTasksList />
          <DoneTasksList />
        </WrapperHome>
      ) : (
        <MessageNoLists>Você ainda não possui nenhuma lista :(</MessageNoLists>
      )}

      {taskSelected !== null && <SidebarTask open={taskSelected !== null}/>}
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
