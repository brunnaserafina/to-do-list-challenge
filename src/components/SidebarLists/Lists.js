import { useState, useContext, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import ListsContext from "../../contexts/ListsContext";
import TasksContext from "../../contexts/TasksContext";
import { InputCreateNewItem } from "../../common/InputCreateNewListOrTask";
import { editOrderList, getLists, postList } from "../../services/listsService";
import { IconCheck, IconPlus, IconMoveList } from "../../common/Icons";

export default function Lists() {
  const [openInputCreatedNewList, setOpenInputCreatedNewList] = useState(false);
  const [titleInputList, setTitleInputList] = useState("");
  const { setTaskSelected, setTitleNewTask } = useContext(TasksContext);
  useContext(TasksContext);
  const {
    allLists,
    setAllLists,
    selectedItemIndex,
    setSelectedItemIndex,
    setIdListSelected,
    setTitleListSelected,
    titleListSelected,
  } = useContext(ListsContext);

  const addNewList = useCallback(async () => {
    if (titleInputList === "") return;

    try {
      await postList({ title: titleInputList, order: allLists.length + 1 });
      setTitleInputList("");
      setOpenInputCreatedNewList(false);
    } catch (error) {
      toast.error("Não foi possível adicionar a lista, tente novamente!");
    }
  }, [titleInputList, allLists.length]);

  useEffect(() => {
    async function getAllLists() {
      try {
        const lists = await getLists();

        if (lists.data.length === 1) {
          setTitleListSelected(lists.data[0].title);
          setIdListSelected(lists.data[0].id);
        }

        setAllLists(lists.data);
      } catch (error) {
        toast.error("Não foi possível carregar as listas, atualize a página.");
      }
    }

    getAllLists();
  }, [
    setAllLists,
    setIdListSelected,
    titleListSelected,
    setTitleListSelected,
    addNewList,
  ]);

  const handleItemClick = (item, index) => {
    setSelectedItemIndex(index);
    setIdListSelected(item.id);
    setTitleListSelected(item.title);
    setTaskSelected(null);
    setTitleNewTask("");
  };

  function handleKeyDown(event) {
    if (event.keyCode === 13) addNewList();
  }

  const handleDragStart = (event, index) => {
    event.dataTransfer.setData("text/plain", index);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = async (event, newIndex) => {
    event.preventDefault();

    const oldIndex = event.dataTransfer.getData("text/plain");

    if (oldIndex !== newIndex) {
      const newList = [...allLists];
      const [removed] = newList.splice(oldIndex, 1);
      newList.splice(newIndex, 0, removed);

      newList.forEach((item, index) => {
        item.ordem = index + 1;

        editOrderList({ listId: item.id, order: item.ordem });
      });

      setAllLists(newList);
      setSelectedItemIndex(
        newList.findIndex((item) => item.title === titleListSelected)
      );
    }
  };

  return (
    <>
      <AllListsUl>
        {allLists.map((item, index) => (
          <li
            key={index}
            onClick={() => handleItemClick(item, index)}
            draggable="true"
            onDragStart={(event) => handleDragStart(event, index)}
            onDragOver={handleDragOver}
            onDrop={(event) => handleDrop(event, index)}
          >
            <span>
              {selectedItemIndex === index && <IconCheck fontSize={"18px"} />}
            </span>

            <p>{item.title}</p>

            <span>
              <IconMoveList fontSize={"19px"} />
            </span>
          </li>
        ))}
      </AllListsUl>

      {openInputCreatedNewList ? (
        <InputCreateNewItem>
          <input
            type="text"
            placeholder="Digite o título da sua nova lista"
            value={titleInputList}
            onChange={(e) => setTitleInputList(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />

          <div>
            <button onClick={() => setOpenInputCreatedNewList(false)}>
              Cancelar
            </button>

            <button onClick={addNewList}>Salvar</button>
          </div>
        </InputCreateNewItem>
      ) : (
        <AddNewList onClick={() => setOpenInputCreatedNewList(true)}>
          <span>
            <IconPlus fontSize={"28px"} />
          </span>
          <h2>Criar nova lista</h2>
        </AddNewList>
      )}
    </>
  );
}

const AllListsUl = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;

  li:hover span:nth-of-type(2) {
    display: initial;
  }

  p {
    margin-left: 8px;
    cursor: pointer;
  }

  span {
    width: 20px !important;
  }

  span:nth-of-type(2) {
    position: absolute;
    right: 0;
    display: none;
  }

  li {
    display: flex;
    align-items: center;
    height: fit-content;
    margin-bottom: 5px;
    background-color: white;
    width: 100%;
    height: 30px;
    border-radius: 8px;
    cursor: move;
  }
`;

const AddNewList = styled.div`
  cursor: pointer;

  span {
    width: 20px !important;
  }

  h2 {
    margin-left: 8px;
    cursor: pointer;
  }
`;
