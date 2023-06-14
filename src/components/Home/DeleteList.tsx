import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { IconDelete } from "../../common/Icons";
import ListsContext from "../../contexts/ListsContext";
import TasksContext from "../../contexts/TasksContext";
import { deleteList, getLists } from "../../services/listsService";
import styled from "styled-components";
import ReactModal, { Styles } from "react-modal";

export default function DeleteList() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const tasksContext = useContext(TasksContext)!;
  const listsContext = useContext(ListsContext)!;

  async function deleteListConfirm() {
    try {
      await deleteList({
        listId: listsContext.idListSelected ? listsContext.idListSelected : listsContext.allLists[0].id,
      });

      tasksContext.setTaskSelected(null);

      const updatedLists = await getLists();

      if (updatedLists.data.length > 0) {
        listsContext.setTitleListSelected(updatedLists?.data[0].title);
        listsContext.setIdListSelected(updatedLists?.data[0].id);
        listsContext.setSelectedItemIndex(0);
      } else {
        listsContext.setTitleListSelected("");
      }
      listsContext.setAllLists(updatedLists.data);
      setModalIsOpen(false);
    } catch (error) {
      toast("Não foi possível remover a lista, tente novamente!");
    }
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <>
      {modalIsOpen && (
        <ReactModal isOpen={modalIsOpen} onRequestClose={closeModal} ariaHideApp={false} style={customStyles}>
          <MessageConfirm>Tem certeza que deseja deletar essa lista?</MessageConfirm>

          <div>
            <Button onClick={closeModal}>Cancelar</Button>
            <Button onClick={deleteListConfirm}>Deletar</Button>
          </div>
        </ReactModal>
      )}

      <IconDelete
        fontSize={"20px"}
        color={"var(--dark-green)"}
        cursor={"pointer"}
        onClick={() => setModalIsOpen(true)}
      />
    </>
  );
}

interface CustomStyles extends Styles {
  content?: React.CSSProperties;
  overlay?: React.CSSProperties;
}

export const MessageConfirm = styled.p`
  font-family: "Roboto";
  font-size: 18px;
  color: var(--dark-green);
  font-weight: 700;
  margin-bottom: 10px;
`;

export const Button = styled.button`
  border-radius: 5px;
  width: 80px;
  height: 30px;
  border: none;
  margin: 0 5px;
  background-color: var(--light-green);
  color: var(--white);
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;

  &&:nth-of-type(2) {
    background-color: var(--red);
  }
`;

export const customStyles: CustomStyles = {
  content: {
    top: "20%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "300px",
    height: "200px",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "15px",
    backgroundColor: "var(--gray)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    textAlign: "center",
    borderColor: "var(--light-green)",
  },
  overlay: { zIndex: 5 },
};
