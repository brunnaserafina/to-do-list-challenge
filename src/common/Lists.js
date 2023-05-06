import { useState } from "react";
import { BsCheck2, BsPlus } from "react-icons/bs";
import styled from "styled-components";

export default function Lists() {
  const [selected, setSelected] = useState(0);

  const items = ["Rotina", "Trabalho", "Faculdade", "Compras"];

  const handleItemClick = (index) => {
    setSelected(index);
  };

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

      <AddNewList>
        <span>
          <BsPlus fontSize={"28px"} />
        </span>
        <h2>Criar nova lista</h2>
      </AddNewList>
    </>
  );
}

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

  li{
    display: flex;
    align-items: center;
    height: fit-content;
    margin-bottom: 5px;
  }
`;

const AddNewList = styled.div`
  span {
    width: 20px !important;
  }

  h2 {
    margin-left: 8px;
    cursor: pointer;
  }
`;
