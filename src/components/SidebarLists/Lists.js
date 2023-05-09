import { useState, useContext } from "react";
import { BsCheck2, BsPlus } from "react-icons/bs";
import { toast } from "react-toastify";
import styled from "styled-components";
import ListsContext from "../../contexts/ListsContext";
import TasksContext from "../../contexts/TasksContext";
import { InputCreateNewListOrTask } from "../../common/InputCreateNewListOrTask";
import { getLists, postList } from "../../services/listsService";

export default function Lists() {
  const [openInputCreatedNewList, setOpenInputCreatedNewList] = useState(false);
  const [titleList, setTitleList] = useState("");
  const { setTaskSelected } = useContext(TasksContext);
  const {
    allLists,
    selectedItemIndex,
    setSelectedItemIndex,
    setIdListSelected,
    setTitleListSelected,
    setRender,
  } = useContext(ListsContext);

  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
  };

  const addNewList = async () => {
    if (titleList === "") return;

    try {
      await postList({ title: titleList });

      const lists = await getLists();

      if (lists.data.length === 1) {
        setTitleListSelected(lists.data[0]?.title);
        setIdListSelected(lists.data[0]?.id);
        setSelectedItemIndex(0);
      }

      setTitleList("");
      setOpenInputCreatedNewList(false);
      setRender((prev) => !prev);
    } catch (error) {
      toast("Não foi possível adicionar a lista, tente novamente!");
    }
  };

  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      addNewList();
    }
  }

  return (
    <>
      <AllListsUl>
        {allLists.map((item, index) => (
          <li
            key={index}
            onClick={() => {
              handleItemClick(index);
              setIdListSelected(item.id);
              setTitleListSelected(item.title);
              setTaskSelected(null);
            }}
          >
            <span>
              {selectedItemIndex === index && <BsCheck2 fontSize={"18px"} />}
            </span>

            <p>{item.title}</p>
          </li>
        ))}
      </AllListsUl>

      {openInputCreatedNewList ? (
        <InputCreateNewListOrTask>
          <input
            type="text"
            placeholder="Digite o título da sua nova lista"
            value={titleList}
            onChange={(e) => setTitleList(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />

          <div>
            <button onClick={() => setOpenInputCreatedNewList(false)}>
              Cancelar
            </button>

            <button onClick={addNewList}>Salvar</button>
          </div>
        </InputCreateNewListOrTask>
      ) : (
        <AddNewList onClick={() => setOpenInputCreatedNewList(true)}>
          <span>
            <BsPlus fontSize={"28px"} />
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
