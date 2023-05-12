import { useContext, useState } from "react";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { IconDelete } from "../../common/Icons";
import ListsContext from "../../contexts/ListsContext";
import TasksContext from "../../contexts/TasksContext";
import { deleteList, getLists } from "../../services/listsService";
import styled from "styled-components";

export default function DeleteList() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { setTaskSelected } = useContext(TasksContext);
  const {
    allLists,
    idListSelected,
    setRender,
    setTitleListSelected,
    setSelectedItemIndex,
    setIdListSelected,
  } = useContext(ListsContext);

  function closeModal() {
    setModalIsOpen(false);
  }

  async function deleteListConfirm() {
    try {
      await deleteList({
        listId: idListSelected ? idListSelected : allLists[0].id,
      });
      setTaskSelected(null);

      const updatedLists = await getLists();

      if (updatedLists.data.length > 0) {
        setTitleListSelected(updatedLists?.data[0].title);
        setIdListSelected(updatedLists?.data[0].id);
        setSelectedItemIndex(0);
      }

      setRender((prev) => !prev);
    } catch (error) {
      toast("Não foi possível remover a lista, tente novamente!");
    }
  }

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
            Tem certeza que deseja deletar essa lista?
          </MessageConfirm>

          <div>
            <Button onClick={closeModal}>Cancelar</Button>
            <Button onClick={deleteListConfirm}>Deletar</Button>
          </div>
        </Modal>
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

export const customStyles = {
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
    justifyContent: "center",
    textAlign: "center",
    borderColor: "var(--light-green)",
  },
  overlay: { zIndex: 5 },
};
