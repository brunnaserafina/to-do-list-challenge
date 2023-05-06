import { useCallback, useEffect, useState } from "react";
import { BsCheck2, BsPlus } from "react-icons/bs";
import { toast } from "react-toastify";
import styled from "styled-components";
import { getLists, postList } from "../services/listsService";
import ListsContext from "../contexts/ListsContext";
import { useContext } from "react";

export default function Lists() {
  const [selected, setSelected] = useState(0);
  const [createdNewList, setCreatedNewList] = useState(false);
  const [titleList, setTitleList] = useState("");
  const [items, setItems] = useState([]);
  const { setIdListSelected, setTitleListSelected } = useContext(ListsContext);

  const handleItemClick = (index) => {
    setSelected(index);
  };

  const addNewList = useCallback(async () => {
    if (titleList.length < 1) {
      return;
    }

    try {
      await postList({ title: titleList });
      setTitleList("");
      setCreatedNewList(false);
    } catch (error) {
      toast("Não foi possível adicionar a tarefa, tente novamente!");
    }
  }, [titleList]);

  useEffect(() => {
    async function getAllLists() {
      try {
        const allLists = await getLists();
        setTitleListSelected(allLists.data[0].title);
        setIdListSelected(allLists.data[0].id);
        setItems(allLists.data);
      } catch (error) {
        console.log(error);
      }
    }
    getAllLists();
  }, [addNewList, setTitleListSelected, setIdListSelected]);

  return (
    <>
      <List>
        {items.map((item, index) => (
          <li
            key={index}
            onClick={() => {
              handleItemClick(index);
              setIdListSelected(item.id);
              setTitleListSelected(item.title);
            }}
          >
            <span>{selected === index && <BsCheck2 fontSize={"18px"} />}</span>
            <p>{item.title}</p>
          </li>
        ))}
      </List>

      {createdNewList ? (
        <CreateNewList>
          <input
            type="text"
            placeholder="Digite o título da sua nova lista"
            value={titleList}
            onChange={(e) => setTitleList(e.target.value)}
            autoFocus
          />
          <div>
            <button onClick={() => setCreatedNewList(false)}>Cancelar</button>
            <button onClick={addNewList}>Salvar</button>
          </div>
        </CreateNewList>
      ) : (
        <AddNewList onClick={() => setCreatedNewList(true)}>
          <span>
            <BsPlus fontSize={"28px"} />
          </span>
          <h2>Criar nova lista</h2>
        </AddNewList>
      )}
    </>
  );
}

export const CreateNewList = styled.div`
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  margin-left: 28px;

  div {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  input {
    border-radius: 5px;
    padding: 10px;
    width: 100%;
    height: 30px;
    border: none;
  }

  input:focus {
    outline: 0;
    border: solid 1.5px var(--light-green);
    caret-color: var(--dark-green);
  }

  button {
    border: none;
    cursor: pointer;
    background-color: var(--red);
    color: var(--white);
    border-radius: 5px;
    height: 20px;
    width: 80px;
    margin-top: 5px;
  }

  button:nth-of-type(2) {
    background-color: var(--light-green);
  }
`;

const List = styled.ul`
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
