import React from "react";

import { DragDropContext } from "react-beautiful-dnd";

import CardHolderPage from "./CardHolderPage";
import { useAxios } from "../../../hooks/useAxios";
import { useNavigate } from "react-router";

const ListPage = ({ tasksData, setTasksData, getProjectById }) => {
  const navigate = useNavigate();

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    useAxios({
      path: `tasks/editTaskStatus/${draggableId}`,
      type: "put",
      navigate,
      payload: {
        status: destination.droppableId,
        orderNumber: destination.index + 1,
      },
      successCb: getProjectById,
    });

    // if (destination.droppableId === source.droppableId) {
    //   setTasksData((prev) => {
    //     const newTasksData = { ...prev };
    //     const newTaskIds = prev.columns[destination.droppableId].taskIds;
    //     newTaskIds.splice(source.index, 1);
    //     newTaskIds.splice(destination.index, 0, draggableId);
    //     return newTasksData;
    //   });

    //   return;
    // }

    // setTasksData((prev) => {
    //   const newTasksData = { ...prev };
    //   prev.columns[source.droppableId].taskIds.splice(source.index, 1);
    //   prev.columns[destination.droppableId].taskIds.splice(
    //     destination.index,
    //     0,
    //     draggableId
    //   );
    //   return newTasksData;
    // });
  };

  return (
    <div
      className="ListPageContainer"
      style={{
        maxWidth: "83.3vw",
        display: "flex",
        overflow: "auto",
        maxHeight: "70vh",
        borderBottom: "1px solid black",
      }}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <div
          style={{
            display: "flex",
            height: "100%",
          }}
        >
          {tasksData?.columnOrder.map((columnId, index) => {
            const column = tasksData?.columns[columnId];
            const tasks = column?.taskIds?.map(
              (taskId) => tasksData?.tasks[taskId]
            );
            return (
              <CardHolderPage
                key={column?.id}
                column={column}
                tasks={tasks}
                getProjectById={getProjectById}
              />
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
};

export default ListPage;
