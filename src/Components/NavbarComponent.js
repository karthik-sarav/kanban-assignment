import { Dropdown } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import { customTheme } from "../Configs/Constants";
import { Typography } from "@material-ui/core";
import { Button } from "react-bootstrap";
import DashboardIcon from '@material-ui/icons/Dashboard';
import { useState } from "react";
import ModalAddItem from "./ModalAddItem";
import SnackbarComponent from "../Components/SnackBarComponent";


const useStyles = makeStyles((theme) => ({
    navbar: {
        display: "flex",
        flexDirection: "row-reverse",
        padding: "10px 25px",
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 999,
        backgroundColor: customTheme.primary,
        justifyContent: "space-between",
        alignItems: "center"
    },
    dropdownToggle: {
        marginRight: "10px",
        color: customTheme.primary,
        backgroundColor: "white",
    },
    title: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    addButton: {
        marginRight: "10px",
        color: customTheme.primary,
        backgroundColor: "white",
    }
}));

const NavbarComponent = (props) => {
    const classes = useStyles();
    const { columnConfig, handleDropdownClick, handleFilterClick } = props;

    const [showAddModal, setShowAddModal] = useState(false);
    const [snackBarConfig, setSnackBarConfig] = useState({
        open: false,
        message: "",
        severity: ""
    });


    const handleAddModal = () => setShowAddModal(true);
    const handleCloseModal = () => setShowAddModal(false);
    const handleSnackClose = () => setSnackBarConfig({ open: false, message: "", severity: "" })
    const handleSnackBarOpen = () => setSnackBarConfig({ open: true, message: "Added Successfully", severity: "success" })

    return (
        <>
            <div className={classes.navbar}>
                <div style={{ display: "flex" }}>
                    <Button className={classes.addButton} variant="primary" onClick={handleAddModal}>
                        <Typography variant="button">Add</Typography>
                    </Button>
                    <Dropdown className={classes.dropdown} >
                        <Dropdown.Toggle id="dropdown-basic" className={classes.dropdownToggle} >
                            <Typography variant="button">Group by</Typography>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {Object.keys(columnConfig).map((groupByItem) => {
                                return (
                                    <Dropdown.Item key={groupByItem} onClick={(e) => handleDropdownClick(e, groupByItem)}>
                                        <Typography variant="caption">{groupByItem.toUpperCase()}</Typography>
                                    </Dropdown.Item>
                                );
                            })}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                        <Dropdown.Toggle className={classes.dropdownToggle} id="dropdown-filter">
                            <Typography variant="button">Filter</Typography>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {
                                columnConfig.developer.map(dev => {
                                    return (
                                        <Dropdown.Item key={dev.headerTitle} onClick={(e) => handleFilterClick(e, dev.headerTitle)}>
                                            <Typography variant="caption">{dev.headerTitle.toUpperCase()}</Typography>
                                        </Dropdown.Item>
                                    );
                                })
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className={classes.title}>
                    <DashboardIcon style={{ color: "whitesmoke", margin: "0 10px" }} />
                    <Typography style={{ fontSize: "20px", color: "whitesmoke", letterSpacing: "2px", wordSpacing: "2px" }} >KANBAN BOARD</Typography>
                </div>
            </div>
            {
                showAddModal &&
                <ModalAddItem
                    showAddModal={showAddModal}
                    handleCloseModal={handleCloseModal}
                    handleSnackBarOpen={handleSnackBarOpen}
                />
            }
            {
                snackBarConfig.open &&
                <SnackbarComponent
                    config={snackBarConfig}
                    handleClose={handleSnackClose}
                />
            }
        </>
    )
}

export default NavbarComponent