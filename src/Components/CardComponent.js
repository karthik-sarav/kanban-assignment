import { makeStyles } from '@material-ui/core/styles';
import OpenWithIcon from '@material-ui/icons/OpenWith';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import FlagIcon from '@material-ui/icons/Flag';
import { Draggable } from "react-beautiful-dnd";
import { Typography } from "@material-ui/core";
import CustomProfile from '../Images/CustomProfile';


const useStyles = makeStyles((theme) => ({
    cardItem: {
        backgroundColor: "white",
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
        borderRadius: "5px",
        height: "180px",
        marginBottom: "25px"
    },
    profileImage: {
        height: "30px",
        width: "30px",
        margin: "0px 0 0 125px",
    }
}));

const CardComponent = (props) => {
    const classes = useStyles();
    const { cardItem, index } = props;
    return (
        <Draggable key={cardItem.id} draggableId={cardItem.id} index={index}>
            {(provided) => (
                <div className={classes.cardItem} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} >
                    <div style={{ padding: "15px 0 0 15px" }} >
                        <Typography variant="subtitle1">{cardItem.title}</Typography>
                    </div>
                    <div style={{ padding: "15px 10px 10px 15px", height: "98px" }}>
                        <Typography variant="body1"> {cardItem?.id} </Typography>
                    </div>
                    <div style={{ display: "flex" }} >
                        <div style={{ display: "flex", marginLeft: "10px" }}>
                            <OpenWithIcon style={{ padding: "2px", margin: "5px" }} color="primary" fontSize="medium" />
                            <ChatBubbleOutlineIcon style={{ padding: "2px", margin: "5px" }} color="primary" fontSize="medium" />
                            <FlagIcon style={{ padding: "2px", margin: "5px" }} color="primary" fontSize="medium" />
                        </div>
                        <div className={classes.profileImage}>
                            <CustomProfile />
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    )
}

export default CardComponent;