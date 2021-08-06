import DockIcon from '@material-ui/icons/Dock';
import DockTwoToneIcon from '@material-ui/icons/DockTwoTone';
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Badge from 'react-bootstrap/Badge'

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
        }
    },
    headerAction: {
        display: "flex",
        alignItems: "center",
        marginRight: "10px"
    }
}));

const ColumnHeader = (props) => {
    const classes = useStyles();
    const { groupTitle, handlePinClick, isPinned, count } = props;

    const countBg = (count) => {
        return count <= 3 ? "primary" : count > 3 && count <= 5 ? "warning" : "danger"
    }

    return (
        <div className={classes.columnHeader} >
            <div>
                <Typography variant="subtitle1">
                    {groupTitle.toUpperCase()}
                </Typography>

            </div>
            <div className={classes.headerAction}>
                <Badge bg={countBg(count)}>{count}</Badge>
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
        </div>
    )
}

export default ColumnHeader