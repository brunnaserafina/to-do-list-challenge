import styled from "styled-components";
import { CgMenu } from "react-icons/cg";
import { IoIosArrowDown } from "react-icons/io";
import { BsSearch } from "react-icons/bs";
import { useCallback, useState } from "react";
import { DebounceInput } from "react-debounce-input";
import Logout from "./Logout";
import Sidebar from "../Sidebar/Sidebar";
import { getTasksBySearch } from "../../services/tasksService";

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
      } catch (error) {
        console.log(error);
      }
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

        {tasksSearch.length > 0 && <SearchResponse tasksSearch={tasksSearch} />}
      </SearchContainer>

      <span onClick={() => setClickedArrow(!clickedArrow)}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSBGr8xcONf9Vgp8Y28P41yFW6bLOHlwK4-w&usqp=CAU"
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

function SearchResponse({ tasksSearch }) {
  return (
    <SearchResponseContainer>
      <ul>
        {tasksSearch.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    </SearchResponseContainer>
  );
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
  border: 1px solid var(--dark-green);
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
`;
