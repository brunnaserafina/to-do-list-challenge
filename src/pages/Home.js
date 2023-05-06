import Header from "../common/Header";
import styled from "styled-components";
import { RiDeleteBinLine } from "react-icons/ri";
import { BsCheckLg } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";

export default function Home() {
  const tasks = ["Ler 10 páginas", "Almoçar", "Trabalhar"];
  
  return (
    <>
      <Header />
      <WrapperHome>
        <Tasks>
          <span>
            <h1>Rotina</h1>
            <RiDeleteBinLine fontSize={"20px"} color={"var(--dark-green)"} />
          </span>

          <ul>
            {tasks.map((item, index) => (
              <li key={index}>
                <Check>
                  <div>
                    <BsCheckLg color={"white"} />
                  </div>
                </Check>
                {item}
              </li>
            ))}
          </ul>

          <div>
            <Check>
              <AiOutlinePlus color={"white"} />
            </Check>
            <p>Adicionar tarefa</p>
          </div>
        </Tasks>

        <TasksCompleted>
          <span>
            <h2>Tarefas concluídas (2)</h2>
            <IoIosArrowDown cursor={"pointer"} />
          </span>
        </TasksCompleted>
      </WrapperHome>
    </>
  );
}

const TasksCompleted = styled.div`
  width: 22.5vw;

  span {
    padding-right: 2.5vw;
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
`;

const Check = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 40px;
  background-color: var(--light-green);
  margin-right: 8px;
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    display: none;
  }

  &:hover div {
    display: initial;
  }

  &:hover<li {
    text-decoration: line-through;
  }
`;

const WrapperHome = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
`;

const Tasks = styled.div`
  width: 22.5vw;
  min-height: 30vh;
  height: fit-content;
  padding-right: 2.5vw;

  h1 {
    font-weight: 700;
    font-size: 18px;
  }

  span {
    display: flex;
    justify-content: space-between;
    margin-top: 5vh;
    margin-bottom: 2vh;
  }

  li {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    color: var(--dark-green);
    cursor: pointer;
  }

  li:hover {
    text-decoration: line-through;
  }

  p {
    color: var(--dark-green);
  }

  > div {
    display: flex;
    align-items: center;
    margin-top: 25px;
  }
`;
