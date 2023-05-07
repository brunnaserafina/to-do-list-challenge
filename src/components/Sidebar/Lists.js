import { useCallback, useState, useContext } from "react";
import { BsCheck2, BsPlus } from "react-icons/bs";
import { toast } from "react-toastify";
import styled from "styled-components";
import { getLists, postList } from "../../services/listsService";
import ListsContext from "../../contexts/ListsContext";
import { InputCreateNewListOrTask } from "../../common/InputCreateNewListOrTask";

export default function Lists() {
  const [titleList, setTitleList] = useState("");
  const [openInputCreatedNewList, setOpenInputCreatedNewList] = useState(false);
  const {
    allLists,
    selectedItemIndex,
    setSelectedItemIndex,
    setIdListSelected,
    setTitleListSelected,
    render,
    setRender,
  } = useContext(ListsContext);

  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
  };

  const addNewList = useCallback(async () => {
    if (titleList === "") {
      return;
    }

    try {
      await postList({ title: titleList });
      const newList = await getLists();

      if (newList.data.length === 1) {
        setTitleListSelected(newList.data[0].title);
        setIdListSelected(newList.data[0].id);
        setSelectedItemIndex(0);
      }

      setTitleList("");
      setOpenInputCreatedNewList(false);
      setRender(!render);
    } catch (error) {
      toast("Não foi possível adicionar a lista, tente novamente!");
    }
  }, [
    titleList,
    render,
    setRender,
    setIdListSelected,
    setSelectedItemIndex,
    setTitleListSelected,
  ]);

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
