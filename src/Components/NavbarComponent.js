import { Dropdown } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import { customTheme } from "../Configs/Constants";
import { Typography } from "@material-ui/core";
import DashboardIcon from '@material-ui/icons/Dashboard';


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
        color: customTheme.primary,
        backgroundColor: "white",
        "&:active": {
            borderRadius: "5px",
        },
        "&:not(:focus-visible)": {
            color: customTheme.primary,
            backgroundColor: "white"
        }
    },
    title: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
}));

const NavbarComponent = (props) => {
    const classes = useStyles();
    const { columnConfig, handleDropdownClick } = props;

    return (
        <div className={classes.navbar}>
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
            <div className={classes.title}>
                <DashboardIcon style={{ color: "whitesmoke", margin: "0 10px" }} />
                <Typography style={{ fontSize: "20px", color: "whitesmoke", letterSpacing: "2px", wordSpacing: "2px" }} >KANBAN BOARD</Typography>
            </div>
        </div>
    )
}

export default NavbarComponent