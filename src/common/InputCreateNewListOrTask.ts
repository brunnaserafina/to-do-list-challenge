import styled from "styled-components";

export const InputCreateNewItem = styled.div`
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  margin-left: 28px;

  div {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  input {
    border-radius: 5px;
    padding: 10px;
    width: 100%;
    height: 30px;
    border: none;
  }

  input:focus {
    outline: 0;
    border: solid 1.5px var(--light-green);
    caret-color: var(--dark-green);
  }

  button {
    border: none;
    cursor: pointer;
    background-color: var(--red);
    color: var(--white);
    border-radius: 5px;
    height: 20px;
    width: 80px;
    margin-top: 5px;
  }

  button:nth-of-type(2) {
    background-color: var(--light-green);
  }
`;
