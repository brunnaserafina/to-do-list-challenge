import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import styled, { keyframes } from "styled-components";
import TaskItem from "../Home/TaskItem";
import DeleteTask from "./DeleteTask";
import TasksContext from "../../contexts/TasksContext";
import { editTaskName, getTaskById, putAnnotationTask } from "../../services/tasksService";
import { IconCloseSidebarTask } from "../../common/Icons";

interface SidebarTaskProps {
  open: boolean;
}

export default function SidebarTask({ open }: SidebarTaskProps) {
  const [tasks, setTasks] = useState<any>([]);
  const [startDate, setStartDate] = useState<any>(null);
  const [annotations, setAnnotations] = useState<string[]>([]);
  const {
    taskIdSelected,
    annotation,
    setAnnotation,
    setTaskSelected,
    updatedTasks,
    newTaskName,
    setUpdatedTasks,
    setOpenInputTask,
  } = useContext(TasksContext)!;

  useEffect(() => {
    async function fetchTask() {
      try {
        const task = await getTaskById(taskIdSelected);
        setTasks(task.data);
        setAnnotation(task.data[0].annotation);
        setAnnotations([annotation]);
        setStartDate(task.data[0]?.date !== null ? new Date(task.data[0]?.date.slice(0, -1)) : "");
      } catch (error) {
        console.log(error);
        toast.error("Não foi possível carregar a tarefa");
      }
    }
    fetchTask();
  }, [taskIdSelected, annotation, updatedTasks, setAnnotation]);

  const handleSave = async (taskId: number, index: number) => {
    try {
      if (newTaskName !== "") {
        await editTaskName({
          taskId: taskId,
          name: newTaskName,
        });

        setOpenInputTask(false);
      }
      await putAnnotationTask(
        taskId,
        annotations[index],
        startDate instanceof Date ? startDate.toISOString() : new Date().toISOString(),
      );
      const newAnnotations = [...annotations];
      newAnnotations[index] = annotations[index];
      setAnnotations(newAnnotations);
      setUpdatedTasks((prev: boolean) => !prev);
    } catch (error) {
      toast.error("Não foi possível salvar sua anotação, tente novamente!");
    }
  };

  return (
    <WrapperSideBarTask open={open}>
      {tasks?.map((item: any, index: number) => (
        <div key={index}>
          <TaskItem id={item.id} name={item.name} isCompleted={item.is_completed} isSidebarTask />

          <CustomTextArea
            value={annotations[index]}
            onChange={(e) => {
              const newanotations = [...annotations];
              newanotations[index] = e.target.value;
              setAnnotations(newanotations);
            }}
            id={item.id}
            cols="30"
            rows="10"
            placeholder="Adicionar anotação"
            isCompleted={item.is_completed}
          ></CustomTextArea>

          <InputCalendar
            value={
              startDate
                ? `Data de vencimento: ${format(new Date(startDate), "dd/MM/yyyy")}`
                : `Escolha uma data de vencimento`
            }
            selected={startDate instanceof Date ? startDate : null}
            dateFormat="dd/MM/yyyy"
            onChange={(date) => {
              if (date instanceof Date) {
                setStartDate(date);
              } else if (Array.isArray(date)) {
                const [startDateValue] = date;
                if (startDateValue instanceof Date) {
                  setStartDate(startDateValue);
                }
              } else {
                setStartDate(null);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Backspace") {
                setStartDate(null);
              }
            }}
            aria-label="Data de vencimento"
          />

          <Button isCompleted={item.is_completed} onClick={() => handleSave(item.id, index)}>
            Salvar
          </Button>
        </div>
      ))}

      <CloseSideBarAndDeleteTask>
        <IconCloseSidebarTask fontSize={"25px"} cursor={"pointer"} onClick={() => setTaskSelected(null)} />

        <DeleteTask taskIdSelected={taskIdSelected} />
      </CloseSideBarAndDeleteTask>
    </WrapperSideBarTask>
  );
}

interface TextAreaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  id: string;
  cols?: number | string;
  rows?: number | string;
  placeholder?: string;
  isCompleted?: boolean;
}

const CustomTextArea: React.FC<TextAreaProps> = ({ value, onChange, id, cols, rows, placeholder, isCompleted }) => {
  const colsValue = typeof cols === "number" ? cols : parseInt(cols as string, 10);
  const rowsValue = typeof rows === "number" ? rows : parseInt(rows as string, 10);

  return (
    <TextArea
      value={value}
      onChange={onChange}
      id={id}
      cols={colsValue}
      rows={rowsValue}
      placeholder={placeholder}
      className={isCompleted ? "completed" : ""}
    />
  );
};

type PropsStyle = {
  isCompleted?: boolean;
  open?: boolean;
};

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(80%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const InputCalendar = styled(DatePicker)`
  border: none;
  height: 30px;
  text-align: center;
  color: var(--red);
  font-weight: 500;
  cursor: pointer;
  font-size: 14px;
  width: 100%;
  margin: 10px 0;

  &&::placeholder {
    color: var(--red);
  }
`;

const CloseSideBarAndDeleteTask = styled.div`
  color: var(--dark-green);
  margin-bottom: 60px;
  display: flex;
  justify-content: space-between;
`;

const WrapperSideBarTask = styled.span<PropsStyle>`
  position: fixed;
  right: 0;
  background-color: var(--gray);
  height: 100vh;
  width: 20vw;
  top: 70px;
  padding: 30px 20px;
  z-index: 1 !important;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  opacity: ${({ open }) => (open ? 1 : 0)};
  transform: ${({ open }) => (open ? "translateY(0)" : "translateY(-10px)")};
  transition: opacity 0.3s ease, transform 0.7s ease;
  animation: ${({ open }) => (open ? fadeIn : null)} 0.7s ease;

  li {
    display: flex;
    align-items: center;
    color: var(--dark-green);
    font-weight: 700;
  }

  @media (max-width: 767px) {
    width: 90%;
  }

  @media (min-width: 768px) and (max-width: 1023px) {
    width: 60%;
  }
`;

const TextArea = styled.textarea<PropsStyle>`
  width: 100%;
  margin-top: 20px;
  border: none;
  border-radius: 10px;
  font-family: Roboto;
  font-size: 15px;
  padding: 10px;
  color: ${(props) => (props.isCompleted ? "gray" : "var(--dark-green)")};

  &::placeholder {
    color: ${(props) => (props.isCompleted ? "gray" : "var(--dark-green)")};
    font-size: 14px;
  }

  &:focus {
    outline: 0;
    border: ${(props) => (props.isCompleted ? "solid 1.5px gray" : "solid 1.5px var(--light-green)")};
    caret-color: var(--dark-green);
  }
`;

const Button = styled.button<PropsStyle>`
  width: 100%;
  border: none;
  background-color: ${(props) => (props.isCompleted ? "gray" : "var(--light-green)")};
  margin-top: 5px;
  height: 25px;
  color: var(--white);
  font-weight: 700;
  border-radius: 5px;
  cursor: pointer;
`;
