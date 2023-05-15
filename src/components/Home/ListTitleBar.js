import { useCallback, useContext, useState } from "react";
import { toast } from "react-toastify";
import { IconCheckEdit, IconEdit } from "../../common/Icons";
import { editTitleList } from "../../services/listsService";
import DeleteList from "./DeleteList";
import ListsContext from "../../contexts/ListsContext";
import styled from "styled-components";

export default function ListTitleBar() {
  const [editedTitleList, setEditedTitleList] = useState(false);
  const { allLists, idListSelected, titleListSelected, setTitleListSelected } =
    useContext(ListsContext);
  const [newTitleList, setNewTitleList] = useState(titleListSelected);

  const handleEditTitleList = useCallback(async () => {
    if (newTitleList === "") {
      setEditedTitleList(false);
      return;
    }

    try {
      await editTitleList({
        listId: idListSelected ? idListSelected : allLists[0].id,
        title: newTitleList,
      });
      setTitleListSelected(newTitleList);
    } catch (error) {
      toast.error(
        "Não foi possível modificar o nome da lista, tente novamente."
      );
    }
    setEditedTitleList(false);
  }, [allLists, idListSelected, newTitleList, setTitleListSelected]);

  function handleKeyDown(event) {
    if (event.keyCode === 13) handleEditTitleList();
  }

  return (
    <WrapperListTitleBar>
      {editedTitleList ? (
        <input
          defaultValue={
            titleListSelected !== "" ? titleListSelected : allLists[0]?.title
          }
          onChange={(e) => setNewTitleList(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <h1 onClick={() => setEditedTitleList(true)}>
          {!idListSelected && allLists.length > 0
            ? allLists[0].title
            : titleListSelected}
        </h1>
      )}

      <div>
        {editedTitleList ? (
          <IconCheckEdit
            color={"var(--dark-green)"}
            fontSize={"20px"}
            onClick={handleEditTitleList}
          />
        ) : (
          <IconEdit
            color={"var(--dark-green)"}
            fontSize={"20px"}
            onClick={() => setEditedTitleList(true)}
          />
        )}

        <DeleteList />
      </div>
    </WrapperListTitleBar>
  );
}

const WrapperListTitleBar = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5vh;
  margin-bottom: 2vh;

  h1 {
    font-weight: 700;
    font-size: 18px;
  }

  > input {
    border: none;
    font-size: 16px;
    font-weight: 700;
  }

  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 15%;
    padding: 0 5px;
  }
`;
