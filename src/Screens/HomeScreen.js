import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { mockData } from "../MockData/MockData";
import { headerConfig, groupByItems } from "../Configs/Constants";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import CardComponent from "../Components/CardComponent";
import ColumnHeader from "../Components/ColumnHeader";
import SnackbarComponent from "../Components/SnackBarComponent";
import NavbarComponent from "../Components/NavbarComponent";
import Fab from '@material-ui/core/Fab';
import LeftIcon from '@material-ui/icons/KeyboardArrowLeft';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: 0,
  },
  container: {
    display: "flex",
    width: "fit-content",
    paddingTop: "60px",
  },
  columnContainer: {
    backgroundColor: "whitesmoke",
    borderRadius: "18px",
    border: "10px solid white",
    padding: "20px",
    left: "0",
    overflow: "scroll",
  },
  floatIcon: {
    position: "fixed",
    right: "70px",
    bottom: "8vh",
  }
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

  const [xOffset, setXOffset] = useState(null);
  const [scrollLeft, setScrollLeft] = useState(false);

  function handleScrollHorizontal() {
    setXOffset(window.pageXOffset);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScrollHorizontal)
    return () => {
      window.removeEventListener("scroll", handleScrollHorizontal);
    };
  })

  useEffect(() => {
    if (xOffset > 390) {
      setScrollLeft(true);
    } else {
      setScrollLeft(false);
    }
  }, [xOffset])

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
    try {
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
    }
    catch (err) {
      setSnackBarConfig({
        open: true,
        message: "Cannot drag the card!",
        severity: "warning"
      })
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

  const calculateCount = (item) => {
    return data.filter((element) => element[selectedGroup] === item.headerTitle).length
  }

  const handleLeftScroll = () => {
    window.scrollBy(-window.screen.availWidth, 0);
  }

  return (
    <div className={classes.root}>
      <NavbarComponent columnConfig={columnConfig} handleDropdownClick={handleDropdownClick} />
      <div id="container" className={classes.container}>
        {scrollLeft &&
          <div className={classes.floatIcon}>
            <Fab color="primary" onClick={handleLeftScroll} >
              <LeftIcon />
            </Fab>
          </div>
        }
        <DragDropContext onDragEnd={handleOnDragEnd}>
          {columnConfig[selectedGroup].map((item, index) => {
            return (
              <Droppable
                key={`${item.headerTitle} - ${index}`}
                droppableId={`${item.headerTitle}`}
              >
                {(provided) => (
                  <div
                    id={item.headerTitle}
                    style={{ position: item.pinned ? "sticky" : "static" }}
                    className={classes.columnContainer}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <div style={{ width: "18rem" }}>
                      <ColumnHeader
                        groupTitle={item.headerTitle}
                        isPinned={item.pinned}
                        count={calculateCount(item)}
                        handlePinClick={handlePinClick} />
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
    </div >
  );
};

export default HomeScreen;
