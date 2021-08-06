import { Dropdown } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import { customTheme } from "../Configs/Constants";
import { Typography } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    navbar: {
        display: "flex",
        padding: "10px",
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 999,
        backgroundColor: customTheme.primary
    },
    dropdownToggle: {
        color: customTheme.primary,
        borderRadius: "35px",
        backgroundColor: "white"
    }
}));

const NavbarComponent = (props) => {
    const classes = useStyles();
    const { columnConfig, handleDropdownClick } = props;

    return (
        <div className={classes.navbar}>
            <Dropdown>
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
        </div>
    )
}

export default NavbarComponent