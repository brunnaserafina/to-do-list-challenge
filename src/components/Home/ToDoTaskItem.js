import { useContext } from "react";
import { BsCheckLg } from "react-icons/bs";
import { toast } from "react-toastify";
import styled from "styled-components";
import ListsContext from "../../contexts/ListsContext";
import { editTaskFinished } from "../../services/tasksService";

export default function ToDoTask({ name, id }) {
  const { render, setRender } = useContext(ListsContext);

  async function finishTask() {
    try {
      await editTaskFinished({ taskId: id });
      setRender(!render);
    } catch (error) {
      toast("Não foi possível concluir a tarefa");
    }
  }

  return (
    <li>
      <Check onClick={finishTask}>
        <div>
          <BsCheckLg color={"white"} />
        </div>
      </Check>
      {name}
    </li>
  );
}

export const Check = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 40px;
  background-color: ${(props) =>
    props.color ? "var(--gray)" : "var(--light-green)"};
  margin-right: 8px;
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    display: ${(props) => (props.color ? "initial" : "none")};
  }

  &:hover div {
    display: initial;
  }
`;
