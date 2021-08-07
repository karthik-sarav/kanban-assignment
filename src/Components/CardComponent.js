import { makeStyles } from '@material-ui/core/styles';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import { Draggable } from "react-beautiful-dnd";
import { Typography } from "@material-ui/core";
import { customTheme, headerConfig } from '../Configs/Constants';
import { useState } from 'react';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import ModalDetails from './ModalDetails';
import CommentModal from './CommentModal';


const useStyles = makeStyles((theme) => ({
    cardItem: {
        backgroundColor: "white",
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
        borderRadius: "5px",
        height: "180px",
        marginBottom: "25px",
    },
    profileImage: {
        marginLeft: "25px",
        width: "32px",
        height: "32px",
        borderRadius: "30px",
        backgroundColor: "whitesmoke",
        "&:hover": {
            cursor: "pointer"
        }
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
    cardBody: {
        height: "90px",
        padding: "15px 10px 10px 15px",
    },
    cardFooter:
    {
        display: "flex",
        marginLeft: "10px",
        width: "200px"
    },
}));

const CardComponent = (props) => {
    const classes = useStyles();
    const { cardItem, index } = props;

    const [expandView, setExpandView] = useState(false);
    const [showCommentModal, setShowCommentModal] = useState(false);

    const handleExpand = () => {
        setExpandView(true);
    }

    const handleCloseModal = () => {
        setExpandView(false);
    }

    const handleAddComment = () => {
        setShowCommentModal(true);
    }

    const handleCloseComment = () => {
        setShowCommentModal(false);
    }

    return (
        <>
            <Draggable key={cardItem.id} draggableId={cardItem.id} index={index}>
                {(provided) => (
                    <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        <div className={classes.cardItem} style={{ borderLeft: `6px solid ${customTheme.risk[cardItem.risk]}` }}>
                            <div onClick={handleExpand} style={{ padding: "15px 0 0 15px" }} >
                                <Typography variant="subtitle1" style={{ fontWeight: "bold", letterSpacing: "0.5px" }}>{cardItem.title}</Typography>
                            </div>

                            <div>
                                <div className={classes.cardBody}>
                                    <Typography variant="body1"> {cardItem?.id} </Typography>
                                    <Typography variant="body2"> {`Complexity - ${cardItem?.storyPoints}`} </Typography>
                                </div>
                            </div>

                            <div style={{ display: "flex" }} >
                                <div className={classes.cardFooter}>
                                    <AspectRatioIcon
                                        className={classes.cardIcon}
                                        fontSize="medium"
                                        onClick={handleExpand}
                                    />
                                    <ChatBubbleOutlineIcon
                                        className={classes.cardIcon}
                                        color="primary"
                                        fontSize="medium"
                                        onClick={(e) => handleAddComment(e, cardItem)}
                                    />
                                    <Chip style={{
                                        color: "white",
                                        fontWeight: "bold",
                                        margin: "5px 0 0 8px",
                                        backgroundColor: customTheme.status[cardItem.status]
                                    }}
                                        size="small"
                                        avatar={
                                            <div
                                                style={{
                                                    color: customTheme.status[cardItem.status],
                                                    backgroundColor: "whitesmoke",
                                                    alignSelf: "center",
                                                    borderRadius: "30px"
                                                }
                                                }>
                                                <Typography style={{ fontSize: "10px", fontWeight: "bold", alignSelf: "center", margin: "2px 2px 0px 6px" }}>
                                                    {cardItem.status[0]}
                                                </Typography>
                                            </div>}
                                        label={cardItem.status}
                                    />
                                </div>
                                {cardItem && cardItem.developer !== "unassigned" ?
                                    <div className={classes.profileImage}>
                                        <Tooltip title={
                                            <div style={{ whiteSpace: 'pre-line' }}>{`${cardItem.developer.toUpperCase()} \n ${headerConfig.developer.find(d => d.headerTitle === cardItem.developer).email}`}
                                            </div>

                                        } arrow>
                                            <Typography style={{ color: "black", margin: "5px 0 0 10px" }}
                                                fontSize="large" >{cardItem.developer[0].toUpperCase()}
                                            </Typography>
                                        </Tooltip>
                                    </div>
                                    :
                                    null
                                }
                            </div>
                        </div>
                    </div>
                )}
            </Draggable>

            {showCommentModal &&
                <CommentModal
                    showCommentModal={showCommentModal}
                    cardItem={cardItem}
                    handleCloseComment={handleCloseComment}
                />
            }

            {cardItem && expandView &&
                <ModalDetails
                    expandView={expandView}
                    cardItem={cardItem}
                    handleCloseModal={handleCloseModal} />
            }
        </>

    )
}

export default CardComponent;