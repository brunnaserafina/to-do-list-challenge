import { useState } from "react";
import Search from "./Search";
import UserMenuWithLogout from "./Logout";
import { IconArrowDown, IconArrowUp, IconMenuHamburger } from "../../common/Icons";
import profilePicture from "../../assets/images/profile.png";
import styled from "styled-components";

interface HeaderProps {
  openSidebarLists: boolean;
  setOpenSidebarLists: (value: boolean) => void;
}

export default function Header({ setOpenSidebarLists, openSidebarLists }: HeaderProps) {
  const [openUserMenu, setOpenUserMenu] = useState<boolean>(false);

  return (
    <WrapperHeader>
      <IconMenuHamburger
        fontSize={"28px"}
        color={"white"}
        cursor={"pointer"}
        onClick={() => setOpenSidebarLists(!openSidebarLists)}
      />

      <Search />

      <UserMenu onClick={() => setOpenUserMenu(!openUserMenu)}>
        <img src={profilePicture} alt="Foto perfil" />

        {openUserMenu ? (
          <>
            <IconArrowUp fontSize={"25px"} color={"white"} cursor={"pointer"} />
            <UserMenuWithLogout open={openUserMenu} />
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
