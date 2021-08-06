import { makeStyles } from '@material-ui/core/styles';
import OpenWithIcon from '@material-ui/icons/OpenWith';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import FlagIcon from '@material-ui/icons/Flag';
import { Draggable } from "react-beautiful-dnd";
import { Typography } from "@material-ui/core";
import CustomProfile from '../Images/CustomProfile';
import { customTheme } from '../Configs/Constants';
import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';




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
        padding: "2px",
        marginLeft: "25px"
    },
    cardIcon: {
        padding: "2px", margin: "5px", color: customTheme.primary,
        "&:hover": {
            backgroundColor: "whitesmoke",
            borderRadius: "5px",
            boxShadow: "1px black",
            cursor: "pointer"
        }
    },
    modalContainer: {
        display: "flex"
    },
    headingBold: {
        fontWeight: "bold"
    }

}));

const CardComponent = (props) => {
    const classes = useStyles();
    const { cardItem, index } = props;


    const [expandView, setExpandView] = useState(false);
    const [modalItem, setModalItem] = useState(null);

    const handleExpand = (e, cardElement) => {
        setExpandView(true);
        setModalItem(cardElement);
    }

    const handleCloseExpand = () => {
        setExpandView(false);
        setModalItem(null);
    }
    return (
        <>
            <Draggable key={cardItem.id} draggableId={cardItem.id} index={index}>
                {(provided) => (
                    <div onClick={(e) => handleExpand(e, cardItem)} className={classes.cardItem} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} >
                        <div style={{ padding: "15px 0 0 15px" }} >
                            <Typography variant="subtitle1" style={{ fontWeight: "bold", letterSpacing: "0.5px" }}>{cardItem.title}</Typography>
                        </div>

                        <div>
                            <div style={{ padding: "15px 10px 10px 15px", height: "90px" }}>
                                <Typography variant="body1"> {cardItem?.id} </Typography>
                            </div>
                        </div>

                        <div style={{ display: "flex" }} >
                            <div style={{ display: "flex", marginLeft: "10px", width: "200px" }}>
                                <OpenWithIcon
                                    className={classes.cardIcon}
                                    fontSize="medium"
                                    onClick={(e) => handleExpand(e, cardItem)}
                                />
                                <ChatBubbleOutlineIcon className={classes.cardIcon} color="primary" fontSize="medium" />
                                <Chip style={{
                                    color: "white",
                                    fontWeight: "bold",
                                    margin: "5px 0 0 8px",
                                    backgroundColor: customTheme.status[cardItem.status]
                                }}
                                    size="small"
                                    avatar={
                                        <Avatar
                                            style={{
                                                color: customTheme.status[cardItem.status],
                                                backgroundColor: "whitesmoke",
                                                alignSelf: "center",
                                                justifyContent: "center"
                                            }
                                            }>
                                            {cardItem.status[0]}</Avatar>}
                                    label={cardItem.status}
                                />
                            </div>
                            <div className={classes.profileImage}>
                                <CustomProfile />
                            </div>
                        </div>
                    </div>
                )}
            </Draggable>

            {modalItem && expandView &&
                <Modal size="lg" show={expandView} onHide={handleCloseExpand}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <Typography variant="h6">{`${modalItem.id} - ${modalItem.title}`}</Typography>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className={classes.modalContainer}>
                            <div style={{ flex: 2, margin: "10px 15px 10px 15px" }} >
                                <div id="description" style={{ marginBottom: "10px", height: "200px" }}>
                                    <Typography variant="subtitle1" className={classes.headingBold}>Description</Typography>
                                    <Typography variant="body2">
                                        {modalItem.description}
                                    </Typography>
                                </div>
                                <div id="comments" style={{ marginBottom: "10px" }}>
                                    <Typography variant="subtitle1" className={classes.headingBold}>Comments</Typography>
                                    {
                                        [...modalItem.comments].reverse().map((comment, index) => {
                                            return (<Typography key={index} variant="body2" style={{ margin: "3px" }}>
                                                {`${index + 1} - ${comment}`}
                                            </Typography>)
                                        })
                                    }
                                </div>
                            </div>
                            <Divider style={{ border: "1px solid grey", marginRight: "30px", height: "auto" }} />
                            <div id="details" style={{ flex: 1 }} >
                                <ModalListItem title={"ID: "} value={modalItem.id} />
                                <ModalListItem title={"Risk: "} value={modalItem.risk} />
                                <ModalListItem title={"Story Points: "} value={modalItem.storyPoints} />
                                <ModalListItem title={"Status: "} value={modalItem.status} />
                                <ModalListItem title={"Start Date: "} value={modalItem.startDate} />
                                <ModalListItem title={"End Date: "} value={modalItem.endDate} />
                                <ModalListItem title={"Assignee: "} value={modalItem.developer} />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleCloseExpand}>
                            <Typography variant="button">Close</Typography>
                        </Button>
                    </Modal.Footer>
                </Modal>
            }

        </>

    )
}

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

export default CardComponent;