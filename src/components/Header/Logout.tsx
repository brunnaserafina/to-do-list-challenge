import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled, { keyframes } from "styled-components";
import { putLogout } from "../../services/authenticationService";

interface UserMenuWithLogoutProps {
  open: boolean;
}

export default function UserMenuWithLogout({ open }: UserMenuWithLogoutProps) {
  const navigate = useNavigate();
  const storedValue = localStorage.getItem("to-do-list");
  const name = typeof storedValue === "string" ? JSON.parse(storedValue)?.name : undefined;
  const email = typeof storedValue === "string" ? JSON.parse(storedValue)?.email : undefined;

  async function handleLogout() {
    try {
      await putLogout();
      localStorage.removeItem("to-do-list");
      navigate("/sign-in");
    } catch (error) {
      toast.error("Não foi possível sair da sua conta, atualize a página e tente novamente!");
    }
  }

  return (
    <UserMenu isOpen={open}>
      <h2>{name}</h2>
      <h3>{email}</h3>
      <p onClick={handleLogout}>Sair</p>
    </UserMenu>
  );
}

type UserMenuProps = {
  isOpen: boolean;
};

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-50%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const UserMenu = styled.div<UserMenuProps>`
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
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transform: ${({ isOpen }) => (isOpen ? "translateY(0)" : "translateY(-10px)")};
  transition: opacity 0.3s ease, transform 0.7s ease;
  animation: ${({ isOpen }) => (isOpen ? fadeIn : null)} 0.7s ease;

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
