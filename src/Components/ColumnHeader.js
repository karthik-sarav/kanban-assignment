import DockIcon from '@material-ui/icons/Dock';
import DockTwoToneIcon from '@material-ui/icons/DockTwoTone';
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    columnHeader: {
        display: "flex",
        marginBottom: "15px",
        borderRadius: "5px",
        justifyContent: "space-between"
    },
    dockIcon: {
        padding: "2px",
        margin: "5px",
        "&:hover": {
            cursor: "pointer",
            backgroundColor: "white",
            borderRadius: "10px"
        }

    }
}));

const ColumnHeader = (props) => {
    const classes = useStyles();
    const { groupTitle, handlePinClick, isPinned } = props;
    return (
        <div className={classes.columnHeader} >
            <Typography variant="subtitle1">
                {groupTitle.toUpperCase()}
            </Typography>
            {isPinned ?
                <DockTwoToneIcon
                    className={classes.dockIcon}
                    color="primary"
                    fontSize="medium"
                    onClick={(e) => handlePinClick(e, groupTitle)}
                /> :
                <DockIcon
                    className={classes.dockIcon}
                    color="primary"
                    fontSize="medium"
                    onClick={(e) => handlePinClick(e, groupTitle)}
                />
            }
        </div>
    )
}

export default ColumnHeader