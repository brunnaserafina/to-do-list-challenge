import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { putLogout } from "../../services/authenticationService";

export default function UserMenuWithLogout() {
  const navigate = useNavigate("");
  const name = JSON.parse(localStorage.getItem("to-do-list"))?.name;
  const email = JSON.parse(localStorage.getItem("to-do-list"))?.email;

  async function handleLogout() {
    try {
      await putLogout();
      localStorage.removeItem("to-do-list");
      navigate("/sign-in");
    } catch (error) {
      toast.error(
        "Não foi possível sair da sua conta, atualize a página e tente novamente!"
      );
    }
  }

  return (
    <UserMenu>
      <h2>{name}</h2>
      <h3>{email}</h3>
      <p onClick={handleLogout}>Sair</p>
    </UserMenu>
  );
}

const UserMenu = styled.div`
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
