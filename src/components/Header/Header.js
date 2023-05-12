import { useState } from "react";
import styled from "styled-components";
import Search from "./Search";
import Sidebar from "../SidebarLists/SidebarLists";
import UserMenuWithLogout from "./Logout";
import {
  IconArrowDown,
  IconArrowUp,
  IconMenuHamburger,
} from "../../common/Icons";

export default function Header() {
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [openSidebarLists, setOpenSidebarLists] = useState(true);

  return (
    <WrapperHeader>
      <IconMenuHamburger
        fontSize={"28px"}
        color={"white"}
        cursor={"pointer"}
        onClick={() => setOpenSidebarLists(!openSidebarLists)}
      />

      {openSidebarLists && <Sidebar open={openSidebarLists} />}

      <Search />

      <UserMenu onClick={() => setOpenUserMenu(!openUserMenu)}>
        <img
          src="https://img.freepik.com/vetores-premium/gato-fofo-dentro-da-caixa-e-mascote-dos-desenhos-animados-de-mao-acenando_357749-765.jpg"
          alt="Foto perfil"
        />

        {openUserMenu ? (
          <>
            <IconArrowUp fontSize={"25px"} color={"white"} cursor={"pointer"} />
            <UserMenuWithLogout open={openUserMenu}/>
          </>
        ) : (
          <IconArrowDown fontSize={"25px"} color={"white"} cursor={"pointer"} />
        )}
      </UserMenu>
    </WrapperHeader>
  );
}

const WrapperHeader = styled.div`
  width: 100vw;
  height: 70px;
  position: fixed;
  top: 0;
  background-color: var(--light-green);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2vw;
  z-index: 2;

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
    border-radius: 10px;
  }

  input::placeholder {
    color: var(--dark-green);
    font-size: 14 px;
  }
`;

const UserMenu = styled.span`
  display: flex;
  align-items: end;
  cursor: pointer;
`;
