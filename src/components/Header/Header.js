import styled from "styled-components";
import { CgMenu } from "react-icons/cg";
import { IoIosArrowDown } from "react-icons/io";
import { BsSearch } from "react-icons/bs";
import { useCallback, useContext, useState } from "react";
import { DebounceInput } from "react-debounce-input";
import Logout from "./Logout";
import Sidebar from "../SidebarLists/SidebarLists";
import { getTasksBySearch } from "../../services/tasksService";
import TasksContext from "../../contexts/TasksContext";
import ListsContext from "../../contexts/ListsContext";

export default function Header() {
  const [clickedArrow, setClickedArrow] = useState(false);
  const [clickedMenu, setClickedMenu] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [tasksSearch, setTasksSearch] = useState([]);

  const searchTask = useCallback(async (search) => {
    setSearchInput(search);

    if (search.length >= 1) {
      try {
        const promise = await getTasksBySearch(search);
        setTasksSearch(promise.data.tasks);
      } catch (error) {}
    } else {
      setTasksSearch([]);
    }
  }, []);

  return (
    <WrapperHeader>
      <CgMenu
        fontSize={"28px"}
        color={"white"}
        cursor={"pointer"}
        onClick={() => setClickedMenu(!clickedMenu)}
      />

      {clickedMenu && <Sidebar />}

      <SearchContainer>
        <SearchInput>
          <BsSearch fontSize={"20px"} color={"var(--light-green)"} />
          <DebounceInput
            minLength={1}
            debounceTimeout={300}
            value={searchInput}
            onChange={(e) => searchTask(e.target.value)}
            type="text"
            placeholder="Buscar tarefa"
          />
        </SearchInput>

        {tasksSearch.length > 0 && (
          <SearchResponse
            tasksSearch={tasksSearch}
            setTasksSearch={setTasksSearch}
            setSearchInput={setSearchInput}
          />
        )}
      </SearchContainer>

      <span onClick={() => setClickedArrow(!clickedArrow)}>
        <img
          src="https://img.freepik.com/vetores-premium/gato-fofo-dentro-da-caixa-e-mascote-dos-desenhos-animados-de-mao-acenando_357749-765.jpg"
          alt="Foto perfil"
        />
        {clickedArrow ? (
          <Logout />
        ) : (
          <IoIosArrowDown
            fontSize={"25px"}
            color={"white"}
            cursor={"pointer"}
          />
        )}
      </span>
    </WrapperHeader>
  );
}

function SearchResponse({ tasksSearch, setTasksSearch, setSearchInput }) {
  return (
    <SearchResponseContainer>
      <ul>
        {tasksSearch.map((item, index) => (
          <ListTask
            key={index}
            name={item.name}
            id={item.id}
            listId={item.list_id}
            listName={item.lists.title}
            setTasksSearch={setTasksSearch}
            setSearchInput={setSearchInput}
          />
        ))}
      </ul>
    </SearchResponseContainer>
  );
}

function ListTask({
  name,
  id,
  listId,
  listName,
  setTasksSearch,
  setSearchInput,
}) {
  const { render, setRender, setIdListSelected, setTitleListSelected } =
    useContext(ListsContext);
  const { setNameTaskSelected, setTaskSelected, setTaskIdSelected } =
    useContext(TasksContext);

  const openTask = useCallback(async () => {
    setNameTaskSelected(name);
    setTaskSelected(0);
    setRender(!render);
    setTaskIdSelected(id);
    setIdListSelected(listId);
    setTitleListSelected(listName);
    setTasksSearch([]);
    setSearchInput("");
  }, [
    setNameTaskSelected,
    name,
    setTaskSelected,
    setRender,
    render,
    id,
    setTaskIdSelected,
    listId,
    setIdListSelected,
    listName,
    setTitleListSelected,
    setSearchInput,
    setTasksSearch,
  ]);

  return <li onClick={openTask}>{name}</li>;
}

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const SearchResponseContainer = styled.div`
  width: 20vw;
  height: fit-content;
  background-color: var(--light-green);
  border: 1px solid var(--white);
  border-radius: 10px;
  padding: 10px;
  position: absolute;
  margin-top: 5px;
  top: 100%;

  li {
    color: var(--white);
    z-index: 3;
    margin-bottom: 5px;
    cursor: pointer;
  }

  @media (max-width: 767px) {
    min-width: fit-content;
  }
`;

const WrapperHeader = styled.div`
  width: 100vw;
  height: 70px;
  position: fixed;
  top: 0;
  background-color: var(--light-green);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2vw;
  z-index: 2;

  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 50px;
    margin-right: 5px;
  }

  input {
    width: 100%;
    height: 40px;
    border: none;
    border-radius: 10px;
  }

  input::placeholder {
    color: var(--dark-green);
    font-size: 14 px;
  }

  span {
    display: flex;
    align-items: end;
    cursor: pointer;
  }
`;

const SearchInput = styled.div`
  width: 20vw;
  height: 40px;
  background-color: var(--white);
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 10px;

  input {
    margin-left: 5px;
    border: none;
    padding: 5px;
  }

  input:focus {
    outline: 0;
    border: none;
    caret-color: var(--dark-green);
  }

  @media (max-width: 767px) {
    width: 220px;
  }
`;
