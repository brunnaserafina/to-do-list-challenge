import { useCallback, useContext } from "react";
import { BsCheckLg } from "react-icons/bs";
import { toast } from "react-toastify";
import styled from "styled-components";
import ListsContext from "../../contexts/ListsContext";
import TasksContext from "../../contexts/TasksContext";
import { editTaskFinished } from "../../services/tasksService";

export default function ToDoTask({ name, id }) {
  const { setRender } = useContext(ListsContext);
  const { setNameTaskSelected, setTaskSelected, setTaskIdSelected } =
    useContext(TasksContext);

  const handleFinishTask = useCallback(async () => {
    try {
      await editTaskFinished({ taskId: id });
      setRender((prev) => !prev);
    } catch (error) {
      toast("Não foi possível concluir a tarefa");
    }
  }, [id, setRender]);

  const handleOpenTask = useCallback(async () => {
    setNameTaskSelected(name);
    setTaskSelected(0);
    setTaskIdSelected(id);
    setRender((prev) => !prev);
  }, [
    setNameTaskSelected,
    setTaskIdSelected,
    setTaskSelected,
    setRender,
    id,
    name,
  ]);

  return (
    <li>
      <Check onClick={handleFinishTask}>
        <div>
          <BsCheckLg color={"white"} />
        </div>
      </Check>
      <p onClick={handleOpenTask}>{name}</p>
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
