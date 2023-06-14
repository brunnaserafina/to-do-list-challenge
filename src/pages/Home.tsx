import { useContext, useState } from "react";
import styled from "styled-components";

import ListsContext from "../contexts/ListsContext";
import TasksContext from "../contexts/TasksContext";

import Header from "../components/Header/Header";
import DoneTasksList from "../components/Home/DoneTasksList";
import ToDoTasksList from "../components/Home/ToDoTasksList";
import SidebarTask from "../components/SideBarTask/SidebarTask";
import SidebarLists from "../components/SidebarLists/SidebarLists";

export default function Home() {
  const [openSidebarLists, setOpenSidebarLists] = useState(true);
  const { allLists } = useContext(ListsContext)!;
  const { taskSelected } = useContext(TasksContext)!;

  const hasLists = allLists.length > 0;

  return (
    <>
      <Header
        setOpenSidebarLists={setOpenSidebarLists}
        openSidebarLists={openSidebarLists}
      />

      {openSidebarLists && <SidebarLists open={openSidebarLists} />}

      {hasLists ? (
        <WrapperLists>
          <ToDoTasksList />
          <DoneTasksList />
        </WrapperLists>
      ) : (
        <MessageNoLists>Você ainda não possui nenhuma lista :(</MessageNoLists>
      )}

      {taskSelected !== null && <SidebarTask open={taskSelected !== null} />}
    </>
  );
}

const MessageNoLists = styled.p`
  text-align: center;
  color: var(--dark-green);
  margin-top: 13vh;
  margin-right: 2vw;
`;

const WrapperLists = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  margin-top: 70px;
`;
