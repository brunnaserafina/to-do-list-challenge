import { useState, useContext, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import ListsContext from "../../contexts/ListsContext";
import { InputCreateNewItem } from "../../common/InputCreateNewListOrTask";
import { getLists, postList } from "../../services/listsService";
import { IconPlus } from "../../common/Icons";
import ListItem from "./ListItem";

export default function Lists() {
  const [openInputCreatedNewList, setOpenInputCreatedNewList] = useState(false);
  const [titleInputList, setTitleInputList] = useState("");
  const { allLists, setAllLists, setIdListSelected, setTitleListSelected, titleListSelected } = useContext(ListsContext);

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
  }, [setAllLists, setIdListSelected, titleListSelected, setTitleListSelected, addNewList]);

  function handleKeyDown(event) {
    if (event.keyCode === 13) addNewList();
  }

  return (
    <>
      <AllListsUl>
        {allLists.map((item, index) => (
          <ListItem key={index} item={item} index={index} />
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
            <button onClick={() => setOpenInputCreatedNewList(false)}>Cancelar</button>
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
    cursor: move;
  }

  li {
    display: flex;
    align-items: center;
    height: fit-content;
    width: 100%;
    height: 25px;
    border-radius: 8px;
    cursor: pointer;
  }

  li:hover {
    background-color: white;
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
