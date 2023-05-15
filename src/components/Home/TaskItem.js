import { useContext, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { IconCheckTask, IconCloseTask, IconEdit } from "../../common/Icons";
import TasksContext from "../../contexts/TasksContext";
import { editTaskFinished } from "../../services/tasksService";
import { editTaskUnfinished } from "../../services/tasksService";

export default function TaskItem(props) {
  const [openInputTask, setOpenInputTask] = useState(false);
  const tasksContext = useContext(TasksContext);

  const handleUnfinishTask = async () => {
    try {
      await editTaskUnfinished({ taskId: props.id });
      tasksContext.setUpdatedTasks((prev) => !prev);
    } catch (error) {
      toast.error("Não foi possível atualizar a tarefa");
    }
  };

  const handleFinishTask = async () => {
    try {
      await editTaskFinished({ taskId: props.id });
      tasksContext.setUpdatedTasks((prev) => !prev);
    } catch (error) {
      toast.error("Não foi possível concluir a tarefa");
    }
  };

  const handleOpenTask = () => {
    tasksContext.setNameTaskSelected(props.name);
    tasksContext.setTaskSelected(true);
    tasksContext.setTaskIdSelected(props.id);
    setOpenInputTask(false);
  };

  return (
    <WrapperTaskItem>
      <li>
        {props.isCompleted ? (
          <Check color={"gray"} onClick={handleUnfinishTask}>
            <div>
              <IconCloseTask color={"white"} cursor={"pointer"} />
            </div>
          </Check>
        ) : (
          <Check onClick={handleFinishTask}>
            <div>
              <IconCheckTask color={"white"} cursor={"pointer"} />
            </div>
          </Check>
        )}

        {!openInputTask && (
          <TitleTask onClick={handleOpenTask} isCompleted={props.isCompleted}>
            {props.name}
          </TitleTask>
        )}
      </li>

      {props.isSidebarTask && (
        <IconEdit
          color={"var(--dark-green)"}
          cursor={"pointer"}
          fontSize={"17px"}
          onClick={() => setOpenInputTask(true)}
        />
      )}
    </WrapperTaskItem>
  );
}

const WrapperTaskItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  input {
    background-color: transparent;
    border: none;
    color: ${(props) => (props.isCompleted ? "gray" : "var(--dark-green)")};
    font-size: 16px;
    font-weight: 700;
  }

  input:focus {
    outline: 0;
    border: none;
    caret-color: var(--dark-green);
  }
`;

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
