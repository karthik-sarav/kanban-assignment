import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { config, mockData } from "../MockData/MockData";
import { Typography } from "@material-ui/core";
import { Dropdown, Navbar } from "react-bootstrap";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import CardComponent from "../Components/CardComponent";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: 0,
  },
  container: {
    display: "flex",
    overflow: "auto",
  },
  columnContainer: {
    backgroundColor: "whitesmoke",
    margin: "10px",
    padding: "20px",
  },
}));

const HomeScreen = () => {
  const classes = useStyles();
  const [data, setData] = useState(mockData);
  const [selectedGroup, setSelectedGroup] = useState("risk");

  const handleClick = (e, groupByItem) => {
    setSelectedGroup(groupByItem);
  };

  const reorderData = (source, destination) => {
    const selectedColumn = data.filter(
      (i) => i[selectedGroup] == source.droppableId
    );
    const items = [...selectedColumn];
    const [reorderedItem] = items.splice(source.index, 1);
    items.splice(destination.index, 0, reorderedItem);
    return [
      ...data.filter((i) => i[selectedGroup] != source.droppableId),
      ...items,
    ];
  };

  const handleOnDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!result) return;
    if (source.droppableId !== destination.droppableId) {
      let foundItem = data.find((i) => i.id === draggableId);
      let filteredData = data.filter((i) => i.id !== draggableId);
      let updatedData = [
        ...filteredData,
        { ...foundItem, [selectedGroup]: destination.droppableId },
      ];

      let selectedColumn = updatedData.filter(
        (i) => i[selectedGroup] == destination.droppableId
      );
      const items = [...selectedColumn];
      const [reorderedItem] = items.splice(destination.index, 1);
      items.splice(destination.index + 1, 0, reorderedItem);
      let reorderedData = [
        ...updatedData.filter(
          (i) => i[selectedGroup] != destination.droppableId
        ),
        ...items,
      ];
      setData(reorderedData);
    } else {
      setData(reorderData(source, destination));
    }
  };

  return (
    <div className={classes.root}>
      <div>
        <Navbar variant="light" bg="light" expand="lg">
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              <Typography variant="button">Group By</Typography>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {Object.keys(config).map((groupByItem) => {
                return (
                  <Dropdown.Item
                    key={groupByItem}
                    onClick={(e) => handleClick(e, groupByItem)}
                  >
                    {groupByItem.toUpperCase()}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
        </Navbar>
      </div>

      <div className={classes.container}>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          {config[selectedGroup].map((groupTitle, index) => {
            return (
              <Droppable
                key={`${groupTitle} - ${index}`}
                droppableId={`${groupTitle}`}
              >
                {(provided) => (
                  <div
                    key={index}
                    className={classes.columnContainer}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <div style={{ width: "18rem" }}>
                      <div>
                        <Typography variant="subtitle1">
                          {groupTitle.toUpperCase()}
                        </Typography>
                      </div>
                      <div>
                        {data
                          .filter(
                            (element) => element[selectedGroup] === groupTitle
                          )
                          .map((cardItem, index) => {
                            return (
                              <CardComponent
                                key={index}
                                cardItem={cardItem}
                                index={index}
                              />
                            );
                          })}
                      </div>
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            );
          })}
        </DragDropContext>
      </div>
    </div>
  );
};

export default HomeScreen;
