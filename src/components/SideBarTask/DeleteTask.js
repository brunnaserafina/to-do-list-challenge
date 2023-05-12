import { useCallback, useContext, useState } from "react";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { IconDelete } from "../../common/Icons";
import ListsContext from "../../contexts/ListsContext";
import TasksContext from "../../contexts/TasksContext";
import { deleteTask } from "../../services/tasksService";
import { Button, customStyles, MessageConfirm } from "../Home/DeleteList";

export default function DeleteTask({ taskIdSelected }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { setTaskSelected } = useContext(TasksContext);
  const { render, setRender } = useContext(ListsContext);

  function closeModal() {
    setModalIsOpen(false);
  }

  const deleteTaskConfirm = useCallback(async () => {
    try {
      await deleteTask(taskIdSelected);
      setTaskSelected(null);
      setRender(!render);
    } catch (error) {
      toast("Não foi possível deletar a tarefa, tente novamente!");
    }
  }, [taskIdSelected, setTaskSelected, render, setRender]);

  return (
    <>
      {modalIsOpen && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          ariaHideApp={false}
        >
          <MessageConfirm>
            Tem certeza que deseja deletar essa tarefa?
          </MessageConfirm>

          <div>
            <Button onClick={closeModal}>Cancelar</Button>
            <Button onClick={deleteTaskConfirm}>Deletar</Button>
          </div>
        </Modal>
      )}

      <IconDelete
        fontSize={"23px"}
        color={"var(--dark-green)"}
        cursor={"pointer"}
        onClick={() => setModalIsOpen(true)}
      />
    </>
  );
}
