import styled from "styled-components";

export default function Sidebar() {
  return (
    <WrapperSideBar>
      <h1>Listas</h1>
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
`;
