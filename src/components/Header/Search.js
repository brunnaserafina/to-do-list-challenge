import { useContext, useState } from "react";
import { DebounceInput } from "react-debounce-input";
import { BsSearch } from "react-icons/bs";
import styled from "styled-components";

import ListsContext from "../../contexts/ListsContext";
import TasksContext from "../../contexts/TasksContext";
import { getTasksBySearch } from "../../services/tasksService";

export default function Search() {
  const [searchInput, setSearchInput] = useState("");
  const [tasksSearch, setTasksSearch] = useState([]);

  const searchTask = async (search) => {
    setSearchInput(search);

    if (search.length >= 1) {
      const tasks = await getTasksBySearch(search);
      setTasksSearch(tasks.data.tasks);
    } else {
      setTasksSearch([]);
    }
  };

  return (
    <WrapperSearch>
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
      )}
    </WrapperSearch>
  );
}

function ListTask({
  id,
  name,
  listId,
  listName,
  setTasksSearch,
  setSearchInput,
}) {
  const { render, setRender, setIdListSelected, setTitleListSelected } =
    useContext(ListsContext);
  const { setNameTaskSelected, setTaskSelected, setTaskIdSelected } =
    useContext(TasksContext);

  const openTask = async () => {
    setNameTaskSelected(name);
    setTaskSelected(0);
    setRender(!render);
    setTaskIdSelected(id);
    setIdListSelected(listId);
    setTitleListSelected(listName);
    setTasksSearch([]);
    setSearchInput("");
  };

  return <li onClick={openTask}>{name}</li>;
}

const WrapperSearch = styled.div`
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