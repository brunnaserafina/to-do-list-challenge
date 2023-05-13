import { createContext, useContext, useEffect, useState } from "react";
import { getTaskById } from "../services/tasksService";
import ListsContext from "./ListsContext";

const TasksContext = createContext();

export default TasksContext;

export function TasksProvider({ children }) {
  const [taskSelected, setTaskSelected] = useState(null);
  const [taskIdSelected, setTaskIdSelected] = useState(null);
  const [nameTaskSelected, setNameTaskSelected] = useState("");
  const [annotation, setAnnotation] = useState("");
  const { render } = useContext(ListsContext);

  useEffect(() => {
    async function getTask() {
      if (taskIdSelected !== null) {
        const taskResponse = await getTaskById(taskIdSelected);
        setAnnotation(taskResponse.data[0]?.annotation);
      }
    }
    getTask();
  }, [taskIdSelected, taskSelected, annotation, render]);

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
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}
