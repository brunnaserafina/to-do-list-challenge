import { IoIosArrowUp } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { putLogout } from "../../services/authenticationService";

export default function Logout() {
  const navigate = useNavigate("");
  const name = JSON.parse(localStorage.getItem("to-do-list"))?.name;
  const email = JSON.parse(localStorage.getItem("to-do-list"))?.email;

  async function logout() {
    try {
      await putLogout();
      localStorage.removeItem("to-do-list");
      navigate("/sign-in");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <IoIosArrowUp fontSize={"25px"} color={"white"} cursor={"pointer"} />
      <WindowMoreOptionsPerfil>
        <h2>{name}</h2>
        <h3>{email}</h3>
        <p onClick={logout}>Sair</p>
      </WindowMoreOptionsPerfil>
    </>
  );
}

const WindowMoreOptionsPerfil = styled.div`
  min-width: fit-content;
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
