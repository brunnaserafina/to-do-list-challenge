import { IoIosArrowUp } from "react-icons/io";
import styled from "styled-components";

export default function Logout() {
  const name = JSON.parse(localStorage.getItem("to-do-list"))?.name;
  const email = JSON.parse(localStorage.getItem("to-do-list"))?.email;

  return (
    <>
      <IoIosArrowUp fontSize={"25px"} color={"white"} cursor={"pointer"} />
      <WindowMoreOptionsPerfil>
        <h2>{name}</h2>
        <h3>{email}</h3>
        <p>Sair</p>
      </WindowMoreOptionsPerfil>
    </>
  );
}

const WindowMoreOptionsPerfil = styled.div`
  width: 15vw;
  height: 70px;
  background-color: var(--light-green);
  position: fixed;
  top: 70px;
  right: 0;
  border-radius: 0 0 10px 10px;
  color: var(--white);
  padding: 8px;
  cursor: initial;

  h2 {
    font-weight: 700;
    margin-bottom: 3px;
    text-transform: upperCase;
  }

  h3 {
    margin-bottom: 7px;
  }

  p {
    width: fit-content;
    cursor: pointer;
  }

  p:hover {
    text-decoration: underline;
  }
`;
