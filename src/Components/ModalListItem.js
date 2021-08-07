import { makeStyles } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core";
import { customTheme } from '../Configs/Constants';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';


const useStyles = makeStyles((theme) => ({
    headingBold: {
        fontWeight: "bold"
    }
}));

const ModalListItem = (props) => {
    const classes = useStyles();
    const { title, value } = props;
    return (
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "15px" }}>
            <Typography variant="subtitle1" className={classes.headingBold} >{title}</Typography>
            {title === "Status: " ?
                <Chip style={{
                    color: "white",
                    fontWeight: "bold",
                    backgroundColor: customTheme.status[value]
                }}
                    avatar={<Avatar
                        style={{
                            color: customTheme.status[value],
                            backgroundColor: "whitesmoke",
                            alignSelf: "center",
                            justifyContent: "center"
                        }}>{value[0]}</Avatar>}
                    label={value}
                />
                :
                < Typography variant="body2" style={{ alignSelf: "center" }} >{value}</Typography>
            }
        </div >
    )
}

export default ModalListItem