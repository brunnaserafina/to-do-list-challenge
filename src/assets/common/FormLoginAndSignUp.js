import styled from "styled-components";

const WrapperForm = styled.div`
  background-color: var(--gray);
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    font-weight: 600;
    font-size: 23px;
    width: 350px;
    margin-bottom: 15px;
    color: var(--dark-green);
  }

  input {
    border-radius: 10px;
    border: none;
    height: 40px;
    margin-bottom: 10px;
    padding: 10px;
    background-color: var(--white)
  }

  input:focus {
    outline: 0;
    border: solid 1.5px var(--light-green);
    caret-color: var(--dark-green);
  }

  form {
    display: flex;
    flex-direction: column;
    width: 350px;
  }

  label {
    color: var(--light-green);
    font-weight: 600;
    margin-bottom: 5px;
    font-size: 14px;
  }

  button {
    border-radius: 10px;
    height: 40px;
    margin-bottom: 10px;
    border: none;
    color: var(--white);
    font-weight: 600;
    font-size: 15px;
    background-color: var(--light-green);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  button:nth-of-type(2) {
    background-color: var(--white);
    color: var(--red);
  }

  button > p {
    margin-left: 10px;
    margin-bottom: 0;
    font-size: 15px;
  }

  a {
    color: var(--dark-green);
    margin-top: 15px;
    font-size: 15px;
  }

  p {
    color: var(--red);
    font-size: 12px;
    margin-bottom: 20px;
  }
`;

export default WrapperForm;
