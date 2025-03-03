import React from "react";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { Draggable } from "react-beautiful-dnd";
import { toDoState, ITodo } from "../atoms";
import DelBtn from "./DelBtn";
import Swal from "sweetalert2";

interface IDraggableCardProps {
  toDoId: number;
  toDo: ITodo;
  index: number;
  boardId: number;
}
interface ICard {
  isDragging: boolean;
  boardId: string;
}

const Card = styled.div<ICard>`
  margin-bottom: 5px;
  border-radius: 5px;
  padding: 5px 5px;
  background-color: ${(props) =>
    props.boardId === "trash"
      ? "red"
      : props.isDragging
      ? "#fdcb6e"
      : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging
      ? "0px 3px 5px rgba(0,0,0,1)"
      : "0px 1px 2px rgba(0,0,0,1)"};
  font-size: 15px;

  color: ${(props) => props.theme.textColor};
  align-items: center;
  word-break: break-all;
`;

const ModBtn = styled.div`
  border: none;
  background-color: transparent;
  color: white;
  float: right;
`;

const TxtArea = styled.span`
  padding-right: 8px;
  margin: 0 auto;
`;

function DraggableCard({ toDoId, toDo, index, boardId }: IDraggableCardProps) {
  const setTodo = useSetRecoilState(toDoState);

  const onFixBtn = (index: number) => {
    (async () => {
      const { value: getTodo } = await Swal.fire({
        title: "새로운 Todo를 입력해주세요.",
        text: "변경할 Todo",
        input: "text",
        inputPlaceholder: "Todo를 입력해주세요.",
      });

      if (getTodo) {
        Swal.fire("Saved!");
      }
      if (getTodo === "") {
        return;
      }
      setTodo((prev) => {
        const toDosCopy = [...prev];
        const boardIndex = prev.findIndex((b) => b.id === boardId);
        const boardCopy = { ...toDosCopy[boardIndex] };
        const listCopy = [...boardCopy.toDos];
        const listIndex = listCopy.findIndex((b) => b.id === toDoId);
        const listCCopy = { ...listCopy[listIndex] };
        listCCopy.text = getTodo;
        listCopy[listIndex] = listCCopy;
        boardCopy.toDos = listCopy;
        toDosCopy[boardIndex] = boardCopy;
        return toDosCopy;
      });
    })();
  };

  return (
    <div>
      <Draggable key={toDoId} draggableId={"todo-" + toDo.id} index={index}>
        {(provided, snapshot) => (
          <Card
            isDragging={snapshot.isDragging}
            boardId={boardId + ""}
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
          >
            <DelBtn index={index} toDoId={toDoId} boardId={boardId} />
            <ModBtn onClick={() => onFixBtn(index)}>✏️</ModBtn>
            <TxtArea>{toDo.text}</TxtArea>
          </Card>
        )}
      </Draggable>
    </div>
  );
}

export default React.memo(DraggableCard);
