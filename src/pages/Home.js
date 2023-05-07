import { useContext } from "react";
import styled from "styled-components";
import ListsContext from "../contexts/ListsContext";
import Header from "../components/Header/Header";
import DoneTasksList from "../components/Home/DoneTasksList";
import ToDoTasksList from "../components/Home/ToDoTasksList";

export default function Home() {
  const { allLists } = useContext(ListsContext);

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
    </>
  );
}

const MessageNoLists = styled.p`
  width: 100vw;
  text-align: center;
  color: var(--dark-green);
  margin-top: 13vh;
`;

const WrapperHome = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  margin-top: 70px;
`;
