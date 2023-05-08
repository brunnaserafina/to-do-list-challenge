import styled from "styled-components";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useState } from "react";
import Lists from "./Lists";

export default function Sidebar() {
  const [openLists, setOpenLists] = useState(true);

  return (
    <WrapperSideBar>
      <span>
        <h1>Listas</h1>
        {openLists ? (
          <IoIosArrowUp onClick={() => setOpenLists(!openLists)} />
        ) : (
          <IoIosArrowDown onClick={() => setOpenLists(!openLists)} />
        )}
      </span>

      {openLists && <Lists />}
    </WrapperSideBar>
  );
}

const WrapperSideBar = styled.div`
  width: 20vw;
  position: fixed;
  height: 100vh;
  top: 70px;
  left: 0;
  background-color: var(--gray);
  padding: 6vh 1vw;
  color: var(--dark-green);

  span {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  h1 {
    font-weight: 700;
    margin-left: 28px;
    font-size: 18px;
  }

  ul {
    margin: 20px 0;
  }

  li {
    margin-bottom: 3px;
  }

  div {
    display: flex;
    align-items: center;
    margin-top: 5px;
  }

  @media (max-width: 767px) {
    width: 70%;
    padding: 30px 15px;
  }
`;
