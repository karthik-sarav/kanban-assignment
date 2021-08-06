import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { mockData } from "../MockData/MockData";
import { headerConfig, groupByItems, } from "../Configs/Constants";
import { Typography } from "@material-ui/core";
import { Dropdown, Navbar } from "react-bootstrap";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import CardComponent from "../Components/CardComponent";
import ColumnHeader from "../Components/ColumnHeader";
import SnackbarComponent from "../Components/SnackBarComponent";

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
    border: "10px solid white",
    padding: "20px",
  },
}));

const HomeScreen = () => {
  const classes = useStyles();
  const [data, setData] = useState(mockData);
  const [columnConfig, setColumnConfig] = useState(headerConfig);
  const [selectedGroup, setSelectedGroup] = useState(groupByItems.risk);
  const [pinnedGroup, setPinnedGroup] = useState({ headerTitle: "", pinned: "" });
  const [snackBarConfig, setSnackBarConfig] = useState({
    open: false,
    message: "",
    severity: ""
  });

  const handleDropdownClick = (e, groupByItem) => {
    setSelectedGroup(groupByItem);
  };

  const handleSnackClose = () => {
    setSnackBarConfig({
      open: false,
      message: "",
      severity: ""
    });
  }

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

  const handlePinClick = (e, groupTitle) => {
    let pinLimit = columnConfig[selectedGroup].filter(e => e.pinned == true).length;
    let selectedPinGroup = columnConfig[selectedGroup].find(i => i.headerTitle == groupTitle);
    if (pinLimit < 1 || pinnedGroup.headerTitle == groupTitle) {
      setPinnedGroup(selectedPinGroup)
      let updated = { ...columnConfig, [selectedGroup]: [{ ...selectedPinGroup, pinned: !selectedPinGroup.pinned }, ...columnConfig[selectedGroup].filter(i => i.headerTitle != groupTitle)] };
      setColumnConfig(updated)
      setSnackBarConfig({
        open: true,
        message: pinnedGroup.headerTitle == groupTitle ? "Unpinned" : "Successfully pinned!",
        severity: pinnedGroup.headerTitle == groupTitle ? "info" : "success"
      })
    }
    else {
      setSnackBarConfig({
        open: true,
        message: "Pin limit reached",
        severity: "warning"
      })
    }
  }

  return (
    <div className={classes.root}>
      <div>
        <Navbar variant="light" bg="light" expand="lg">
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              <Typography variant="button">Group By</Typography>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {Object.keys(columnConfig).map((groupByItem) => {
                return (
                  <Dropdown.Item
                    key={groupByItem}
                    onClick={(e) => handleDropdownClick(e, groupByItem)}
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
          {columnConfig[selectedGroup].map((item, index) => {
            return (
              <Droppable
                key={`${item.headerTitle} - ${index}`}
                droppableId={`${item.headerTitle}`}
              >
                {(provided) => (
                  <div
                    key={index}
                    style={{ left: "0", position: item.pinned ? "sticky" : "static" }}
                    className={classes.columnContainer}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <div style={{ width: "18rem" }}>
                      <ColumnHeader groupTitle={item.headerTitle} isPinned={item.pinned} handlePinClick={handlePinClick} />
                      <div>
                        {data.filter((element) => element[selectedGroup] === item.headerTitle).map((cardItem, index) => {
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
        {snackBarConfig.open &&
          <SnackbarComponent
            config={snackBarConfig}
            handleClose={handleSnackClose}
          />
        }
      </div>
    </div>
  );
};

export default HomeScreen;
