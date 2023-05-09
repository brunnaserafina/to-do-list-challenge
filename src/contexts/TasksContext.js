import { createContext, useContext, useEffect, useState } from "react";
import { getTaskById } from "../services/tasksService";
import ListsContext from "./ListsContext";

const TasksContext = createContext();

export default TasksContext;

export function TasksProvider({ children }) {
  const [taskSelected, setTaskSelected] = useState(null);
  const [taskIdSelected, setTaskIdSelected] = useState(null);
  const [nameTaskSelected, setNameTaskSelected] = useState("");
  const [anotation, setAnotation] = useState("");
  const { render } = useContext(ListsContext);

  useEffect(() => {
    async function getTask() {
      if (taskIdSelected !== null) {
        const taskResponse = await getTaskById(taskIdSelected);
        setAnotation(taskResponse.data[0]?.anotation);
      }
    }
    getTask();
  }, [taskIdSelected, taskSelected, anotation, render]);

  return (
    <TasksContext.Provider
      value={{
        taskSelected,
        setTaskSelected,
        nameTaskSelected,
        setNameTaskSelected,
        taskIdSelected,
        setTaskIdSelected,
        anotation,
        setAnotation,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}
