import { createContext, useState } from "react";

const TasksContext = createContext();

export default TasksContext;

export function TasksProvider({ children }) {
  const [taskSelected, setTaskSelected] = useState(null);
  const [taskIdSelected, setTaskIdSelected] = useState(null);
  const [nameTaskSelected, setNameTaskSelected] = useState("");
  const [annotation, setAnnotation] = useState("");
  const [updatedTasks, setUpdatedTasks] = useState(false);

  return (
    <TasksContext.Provider
      value={{
        taskSelected,
        setTaskSelected,
        nameTaskSelected,
        setNameTaskSelected,
        taskIdSelected,
        setTaskIdSelected,
        annotation,
        setAnnotation,
        updatedTasks,
        setUpdatedTasks,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}
