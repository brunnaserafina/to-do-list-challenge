import { useContext } from "react";
import { IconCheck, IconMoveList } from "../../common/Icons";
import ListsContext from "../../contexts/ListsContext";
import TasksContext from "../../contexts/TasksContext";
import { editOrderList } from "../../services/listsService";

export default function ListItem({ item, index }) {
  const { setTaskSelected, setTitleNewTask } = useContext(TasksContext);
  const { allLists, setAllLists, selectedItemIndex, setSelectedItemIndex, setIdListSelected, setTitleListSelected, titleListSelected, setEditedTitleList } =
    useContext(ListsContext);

  const handleItemClick = (item, index) => {
    setEditedTitleList(false);
    setSelectedItemIndex(index);
    setIdListSelected(item.id);
    setTitleListSelected(item.title);
    setTaskSelected(null);
    setTitleNewTask("");
  };

  const handleDrop = async (event, newIndex) => {
    event.preventDefault();
    const oldIndex = event.dataTransfer.getData("text/plain");

    if (oldIndex !== newIndex) {
      const newList = [...allLists];
      const [removed] = newList.splice(oldIndex, 1);
      newList.splice(newIndex, 0, removed);

      newList.forEach(async (item, index) => {
        item.ordem = index + 1;
        await editOrderList({ listId: item.id, order: item.ordem });
      });

      setAllLists(newList);
      setSelectedItemIndex(newList.findIndex((item) => item.title === titleListSelected));
    }
  };

  return (
    <li
      draggable="true"
      onDragStart={(event) => event.dataTransfer.setData("text/plain", index)}
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => handleDrop(event, index)}
      onClick={() => handleItemClick(item, index)}
    >
      <span>{selectedItemIndex === index && <IconCheck fontSize={"18px"} />}</span>

      <p>{item.title}</p>

      <span>
        <IconMoveList fontSize={"19px"} />
      </span>
    </li>
  );
}
