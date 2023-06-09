import { useContext } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import TasksContext from "../../contexts/TasksContext";
import { IconCheckTask, IconCloseTask, IconMoveList } from "../../common/Icons";
import { editOrderTasks, editTaskFinished, editTaskName, editTaskUnfinished } from "../../services/tasksService";
import { ITask } from "../../shared/ITask";

export default function TaskItem(props: ITask) {
  const tasksContext = useContext(TasksContext);
  const { toDoTasks, doneTasks } = useContext(TasksContext)!;

  async function handleEditTaskName(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.keyCode === 13) {
      try {
        if (tasksContext?.newTaskName === "") {
          tasksContext.setOpenInputTask(false);
          return;
        }
        await editTaskName({
          taskId: tasksContext?.taskIdSelected,
          name: tasksContext?.newTaskName,
        });
        tasksContext?.setUpdatedTasks((prev: boolean) => !prev);
        tasksContext?.setOpenInputTask(false);
      } catch (error) {
        toast.error("Não foi possível modificar o nome da tarefa, tente novamente.");
      }
    }
  }

  const handleOpenTaskOrInput = () => {
    if (props.isSidebarTask) {
      tasksContext?.setOpenInputTask(true);
      return;
    }
    tasksContext?.setNewTaskName("");
    tasksContext?.setOpenInputTask(false);
    tasksContext?.setTaskSelected(true);
    tasksContext?.setNameTaskSelected(props.name);
    tasksContext?.setTaskIdSelected(props.id);
  };

  const handleUpdatedTask = async () => {
    try {
      if (props.isCompleted) {
        await editTaskUnfinished({
          taskId: props.id,
          order:
            toDoTasks.length > 0
              ? tasksContext?.toDoTasks[tasksContext.toDoTasks.length - 1].order + 1
              : 1,
        });
      } else {
        await editTaskFinished({
          taskId: props.id,
          order:
            doneTasks.length > 0
              ? tasksContext?.doneTasks[tasksContext.doneTasks.length - 1].order + 1
              : 1,
        });
      }

      tasksContext?.setUpdatedTasks((prev: boolean) => !prev);
    } catch (error) {
      toast.error("Não foi possível atualizar a tarefa");
    }
  };

  const handleDrop = async (event: any, newIndex: any) => {
    event.preventDefault();
    const oldIndex = event.dataTransfer.getData("text/plain");

    if (oldIndex !== newIndex) {
      const newList = [...(props.isCompleted ? doneTasks : toDoTasks)];
      const [removed] = newList.splice(oldIndex, 1);
      newList.splice(newIndex, 0, removed);

      newList.forEach(async (item, index) => {
        item.ordem = index + 1;
        await editOrderTasks({ taskId: item.id, order: item.ordem });
      });

      if (props.isCompleted === true) {
        tasksContext?.setDoneTasks(newList);
      } else {
        tasksContext?.setToDoTasks(newList);
      }
    }
  };

  return (
    <WrapperTaskItem isComplete={props.isCompleted} isSidebartask={props.isSidebarTask}>
      <li
        draggable={props.isSidebarTask ? "false" : "true"}
        onDragStart={(event) => event.dataTransfer.setData("text/plain", props.index)}
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => handleDrop(event, props.index)}
      >
        <Check color={props.isCompleted ? "gray" : ""} onClick={handleUpdatedTask}>
          <div>
            {props.isCompleted ? (
              <IconCloseTask color={"white"} cursor={"pointer"} />
            ) : (
              <IconCheckTask color={"white"} cursor={"pointer"} />
            )}
          </div>
        </Check>

        {tasksContext?.openInputTask && props.isSidebarTask ? (
          <input
            type="text"
            defaultValue={props.name}
            onChange={(e) => tasksContext.setNewTaskName(e.target.value)}
            onKeyDown={handleEditTaskName}
            autoFocus
          />
        ) : (
          <DivTask onClick={handleOpenTaskOrInput}>
            <TitleTask isComplete={props.isCompleted} isSidebartask={props.isSidebarTask}>
              {props.name}
            </TitleTask>
            <span>
              <IconMoveList />
            </span>
          </DivTask>
        )}
      </li>
    </WrapperTaskItem>
  );
}

type PropsStyle = {
  isComplete?: boolean;
  isSidebartask?: boolean | undefined;
};

const WrapperTaskItem = styled.div<PropsStyle>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  li {
    width: 100%;
  }

  li:hover {
    background-color: ${(props) => (props.isSidebartask ? "transparent" : "#f8f8f8")};
    border-radius: 8px;
    margin-right: ${(props) => (props.isComplete ? "2.5vw" : "0")};
  }

  li:hover span {
    display: ${(props) => (props.isSidebartask ? "none" : "initial")};
    cursor: move;
  }

  li span {
    display: none;
    color: ${(props) => (props.isComplete ? "gray" : "var(--dark-green)")};
  }

  input {
    background-color: transparent;
    border: none;
    color: ${(props) => (props.isComplete ? "gray" : "var(--dark-green)")};
    text-decoration: ${(props) => (props.isComplete ? "line-through" : "none")};
    font-size: 16px;
    font-weight: 700;
  }

  input:focus {
    outline: 0;
    border: none;
    caret-color: var(--dark-green);
  }
`;

const DivTask = styled.section`
  width: 90%;
  display: flex;
  justify-content: space-between;
`;

const TitleTask = styled.p<PropsStyle>`
  color: ${(props) => (props.isComplete ? "gray" : "var(--dark-green)")};
  text-decoration: ${(props) => (props.isComplete ? "line-through" : "none")};
  max-width: 88%;
  white-space: wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: ${(props) => (props.isSidebartask ? "" : "pointer")};
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
