import { useState, useContext, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import ListsContext from "../../contexts/ListsContext";
import TasksContext from "../../contexts/TasksContext";
import { InputCreateNewItem } from "../../common/InputCreateNewListOrTask";
import { getLists, postList } from "../../services/listsService";
import { IconCheck, IconPlus } from "../../common/Icons";

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
      await postList({ title: titleInputList });
      setTitleInputList("");
      setOpenInputCreatedNewList(false);
    } catch (error) {
      toast.error("Não foi possível adicionar a lista, tente novamente!");
    }
  }, [titleInputList]);

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

  return (
    <>
      <AllListsUl>
        {allLists.map((item, index) => (
          <li key={index} onClick={() => handleItemClick(item, index)}>
            <span>
              {selectedItemIndex === index && <IconCheck fontSize={"18px"} />}
            </span>

            <p>{item.title}</p>
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

  p {
    margin-left: 8px;
    cursor: pointer;
  }

  span {
    width: 20px !important;
  }

  li {
    display: flex;
    align-items: center;
    height: fit-content;
    margin-bottom: 5px;
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
