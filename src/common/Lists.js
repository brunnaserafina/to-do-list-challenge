import { useState } from "react";
import { BsCheck2, BsPlus } from "react-icons/bs";
import styled from "styled-components";

export default function Lists() {
  const [selected, setSelected] = useState(0);
  const [createdNewList, setCreatedNewList] = useState(false);
  const [titleList, setTitleList] = useState("");
  const [items, setItems] = useState([]);

  const handleItemClick = (index) => {
    setSelected(index);
  };

  function addNewList() {
    if (titleList.length < 1) {
      return;
    }

    setItems([...items, titleList]);
    setTitleList("");
    setCreatedNewList(false);
  }

  return (
    <>
      <List>
        {items.map((item, index) => (
          <li key={index} onClick={() => handleItemClick(index)}>
            <span>{selected === index && <BsCheck2 fontSize={"18px"} />}</span>
            <p>{item}</p>
          </li>
        ))}
      </List>

      {createdNewList ? (
        <CreateNewList>
          <input
            type="text"
            placeholder="Digite sua nova tarefa"
            value={titleList}
            onChange={(e) => setTitleList(e.target.value)}
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

const CreateNewList = styled.div`
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
