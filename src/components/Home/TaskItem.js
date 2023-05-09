import { useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import { toast } from "react-toastify";
import styled from "styled-components";
import ListsContext from "../../contexts/ListsContext";
import TasksContext from "../../contexts/TasksContext";
import { editTaskFinished } from "../../services/tasksService";
import { editTaskUnfinished } from "../../services/tasksService";

export default function TaskItem({ id, name, isCompleted }) {
  const { setRender } = useContext(ListsContext);
  const { setNameTaskSelected, setTaskSelected, setTaskIdSelected } =
    useContext(TasksContext);

  const handleUnfinishTask = async () => {
    try {
      await editTaskUnfinished({ taskId: id });
      setRender((prev) => !prev);
    } catch (error) {
      toast.error("Não foi possível atualizar a tarefa");
    }
  };

  const handleFinishTask = async () => {
    try {
      await editTaskFinished({ taskId: id });
      setRender((prev) => !prev);
    } catch (error) {
      toast.error("Não foi possível concluir a tarefa");
    }
  };

  const handleOpenTask = () => {
    setNameTaskSelected(name);
    setTaskSelected(true);
    setTaskIdSelected(id);
    setRender((prev) => !prev);
  };

  return (
    <li>
      {isCompleted ? (
        <Check color={"gray"} onClick={handleUnfinishTask}>
          <div>
            <AiOutlineClose color={"white"} cursor={"pointer"} />
          </div>
        </Check>
      ) : (
        <Check onClick={handleFinishTask}>
          <div>
            <BsCheckLg color={"white"} cursor={"pointer"} />
          </div>
        </Check>
      )}

      <TitleTask onClick={handleOpenTask} isCompleted={isCompleted}>
        {name}
      </TitleTask>
    </li>
  );
}

const TitleTask = styled.p`
  color: ${(props) => (props.isCompleted ? "gray" : "var(--dark-green)")};
  text-decoration: ${(props) => (props.isCompleted ? "line-through" : "none")};
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
