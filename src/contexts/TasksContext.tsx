import { createContext, ReactNode, useState } from "react";

interface TasksContextType {
  taskSelected: any;
  setTaskSelected: React.Dispatch<React.SetStateAction<any>>;
  taskIdSelected: any;
  setTaskIdSelected: React.Dispatch<React.SetStateAction<any>>;
  nameTaskSelected: string;
  setNameTaskSelected: React.Dispatch<React.SetStateAction<string>>;
  annotation: string;
  setAnnotation: React.Dispatch<React.SetStateAction<string>>;
  updatedTasks: boolean;
  setUpdatedTasks: React.Dispatch<React.SetStateAction<boolean>>;
  titleNewTask: string;
  setTitleNewTask: React.Dispatch<React.SetStateAction<string>>;
  toDoTasks: any[];
  setToDoTasks: React.Dispatch<React.SetStateAction<any[]>>;
  doneTasks: any[];
  setDoneTasks: React.Dispatch<React.SetStateAction<any[]>>;
  openInputTask: boolean;
  setOpenInputTask: React.Dispatch<React.SetStateAction<boolean>>;
  newTaskName: string;
  setNewTaskName: React.Dispatch<React.SetStateAction<string>>;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export default TasksContext;

interface TasksProviderProps {
  children: ReactNode;
}

export function TasksProvider({ children }: TasksProviderProps) {
  const [taskSelected, setTaskSelected] = useState<any>(null);
  const [taskIdSelected, setTaskIdSelected] = useState<any>(null);
  const [nameTaskSelected, setNameTaskSelected] = useState("");
  const [annotation, setAnnotation] = useState("");
  const [updatedTasks, setUpdatedTasks] = useState(false);
  const [titleNewTask, setTitleNewTask] = useState("");
  const [toDoTasks, setToDoTasks] = useState<any[]>([]);
  const [doneTasks, setDoneTasks] = useState<any[]>([]);
  const [openInputTask, setOpenInputTask] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");

  return (
    <TasksContext.Provider
      value={{
        taskSelected,
        setTaskSelected,
        taskIdSelected,
        setTaskIdSelected,
        nameTaskSelected,
        setNameTaskSelected,
        annotation,
        setAnnotation,
        updatedTasks,
        setUpdatedTasks,
        titleNewTask,
        setTitleNewTask,
        toDoTasks,
        setToDoTasks,
        doneTasks,
        setDoneTasks,
        openInputTask,
        setOpenInputTask,
        newTaskName,
        setNewTaskName,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}
