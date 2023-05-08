import { createContext, useEffect, useState } from "react";
import { getTaskById } from "../services/tasksService";

const TasksContext = createContext();

export default TasksContext;

export function TasksProvider({ children }) {
  const [taskSelected, setTaskSelected] = useState(null);
  const [taskIdSelected, setTaskIdSelected] = useState(null);
  const [nameTaskSelected, setNameTaskSelected] = useState("");
  const [anotation, setAnotation] = useState("");

  useEffect(() => {
    async function task() {
      try {
        const taskResponse = await getTaskById(taskIdSelected);
        setAnotation(taskResponse.data[0].anotation);
      } catch (error) {
        console.log(error);
      }
    }
    task();
  }, [taskIdSelected, taskSelected, anotation]);

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
