import { useCallback, useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import { toast } from "react-toastify";
import styled from "styled-components";
import ListsContext from "../../contexts/ListsContext";
import TasksContext from "../../contexts/TasksContext";
import {
  editTaskFinished,
  editTaskUnfinished,
} from "../../services/tasksService";

export default function ToDoTask({ name, id, isCompleted }) {
  const { setRender } = useContext(ListsContext);
  const { setNameTaskSelected, setTaskSelected, setTaskIdSelected } =
    useContext(TasksContext);

  const handleUnfinishTask = useCallback(async () => {
    try {
      await editTaskUnfinished({ taskId: id });
      setRender((prev) => !prev);
    } catch (error) {
      toast("Não foi possível atualizar a tarefa");
    }
  }, [setRender, id]);

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
      {!isCompleted ? (
        <Check onClick={handleFinishTask}>
          <div>
            <BsCheckLg color={"white"} cursor={"pointer"} />
          </div>
        </Check>
      ) : (
        <Check color={"gray"} onClick={handleUnfinishTask}>
          <div>
            <AiOutlineClose color={"white"} cursor={"pointer"} />
          </div>
        </Check>
      )}

      <TitleList onClick={handleOpenTask} isCompleted={isCompleted}>
        {name}
      </TitleList>
    </li>
  );
}

const TitleList = styled.p`
  color: ${(props) => (props.isCompleted ? "gray" : "var(--dark-green)")};
  max-width: 88%;
  white-space: wrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Check = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 40px;
  background-color: ${(props) => (props.color ? "gray" : "var(--light-green)")};
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
