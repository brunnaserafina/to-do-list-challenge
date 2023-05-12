import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { IconArrowDown, IconArrowUp } from "../../common/Icons";
import Lists from "./Lists";

export default function Sidebar({ open }) {
  const [openLists, setOpenLists] = useState(true);

  return (
    <WrapperSideBar open={open}>
      <span>
        <h1>Listas</h1>

        {openLists ? (
          <IconArrowUp
            cursor={"pointer"}
            onClick={() => setOpenLists(!openLists)}
          />
        ) : (
          <IconArrowDown
            cursor={"pointer"}
            onClick={() => setOpenLists(!openLists)}
          />
        )}
      </span>

      {openLists && <Lists />}
    </WrapperSideBar>
  );
}

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const WrapperSideBar = styled.div`
  width: 20vw;
  position: fixed;
  height: 100vh;
  top: 70px;
  left: 0;
  background-color: var(--gray);
  padding: 6vh 1vw;
  color: var(--dark-green);
  opacity: ${({ open }) => (open ? 1 : 0)};
  transform: ${({ open }) => (open ? "translateY(0)" : "translateY(-10px)")};
  transition: opacity 0.3s ease, transform 0.7s ease;
  animation: ${({ open }) => (open ? fadeIn : null)} 1s ease;

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
