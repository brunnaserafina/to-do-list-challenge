import styled from "styled-components";
import { CgMenu } from "react-icons/cg";
import { IoIosArrowDown } from "react-icons/io";
import { BsSearch } from "react-icons/bs";
import { useState } from "react";
import Logout from "./Logout";
import Sidebar from "./Sidebar";

export default function Header() {
  const [clickedArrow, setClickedArrow] = useState(false);
  const [clickedMenu, setClickedMenu] = useState(false);

  return (
    <WrapperHeader>
      <CgMenu
        fontSize={"28px"}
        color={"white"}
        cursor={"pointer"}
        onClick={() => setClickedMenu(!clickedMenu)}
      />

      {clickedMenu && <Sidebar />}

      <Search>
        <BsSearch fontSize={"20px"} color={"var(--light-green)"} />
        <input type="text" placeholder="Buscar" />
      </Search>

      <span onClick={() => setClickedArrow(!clickedArrow)}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSBGr8xcONf9Vgp8Y28P41yFW6bLOHlwK4-w&usqp=CAU"
          alt="Foto perfil"
        />
        {clickedArrow ? (
          <Logout />
        ) : (
          <IoIosArrowDown
            fontSize={"25px"}
            color={"white"}
            cursor={"pointer"}
          />
        )}
      </span>
    </WrapperHeader>
  );
}

const WrapperHeader = styled.div`
  width: 100vw;
  height: 70px;
  background-color: var(--light-green);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2vw;

  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 50px;
    margin-right: 5px;
  }

  input {
    width: 100%;
    height: 40px;
    border: none;
  }

  input::placeholder {
    color: var(--dark-green);
    font-size: 14 px;
  }

  span {
    display: flex;
    align-items: end;
    cursor: pointer;
  }
`;

const Search = styled.div`
  width: 20vw;
  height: 40px;
  background-color: var(--white);
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 10px;

  input {
    margin-left: 5px;
    border: none;
  }

  input:focus {
    outline: 0;
    border: none;
    caret-color: var(--dark-green);
  }
`;
