import { makeStyles } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core";
import { Modal, Button } from 'react-bootstrap';
import Divider from '@material-ui/core/Divider';
import ModalListItem from './ModalListItem';


const useStyles = makeStyles((theme) => ({
    modalContainer: {
        display: "flex"
    },
    modalTitle: {
        marginLeft: "15px"
    },
    modalBodyContainer: {
        flex: 2, margin: "10px 15px 10px 15px"
    },
    modalDescription: {
        marginBottom: "10px", height: "200px"
    },
    modalComment: {
        marginBottom: "10px",
    },
    headingBold: {
        fontWeight: "bold"
    }
}));


const ModalDetails = (props) => {
    const classes = useStyles();
    const { expandView, cardItem, handleCloseModal } = props;
    return (
        <Modal size="lg" show={expandView} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <Typography variant="subtitle1" className={classes.modalTitle}>
                        {`${cardItem.id} - ${cardItem.title}`}
                    </Typography>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className={classes.modalContainer}>
                    <div className={classes.modalBodyContainer} >
                        <div id="description" className={classes.modalDescription}>
                            <Typography variant="subtitle1" className={classes.headingBold}>Description</Typography>
                            <Typography variant="body2">
                                {cardItem.description}
                            </Typography>
                        </div>
                        <div id="comments" className={classes.modalComment}>
                            <Typography variant="subtitle1" className={classes.headingBold}>Comments</Typography>
                            {
                                [...cardItem.comments].reverse().map((comment, index) => {
                                    return (<Typography key={index} variant="body2" style={{ margin: "3px" }}>
                                        {` ~ ${comment}`}
                                    </Typography>)
                                })
                            }
                        </div>
                    </div>
                    <Divider style={{ border: "1px solid grey", marginRight: "30px", height: "auto" }} />
                    <div id="details" style={{ flex: 1 }} >
                        <ModalListItem title={"ID: "} value={cardItem.id} />
                        <ModalListItem title={"Risk: "} value={cardItem.risk} />
                        <ModalListItem title={"Story Points: "} value={cardItem.storyPoints} />
                        <ModalListItem title={"Status: "} value={cardItem.status} />
                        <ModalListItem title={"Start Date: "} value={cardItem.startDate} />
                        <ModalListItem title={"End Date: "} value={cardItem.endDate} />
                        <ModalListItem title={"Assignee: "} value={cardItem.developer} />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleCloseModal}>
                    <Typography variant="button">Close</Typography>
                </Button>
            </Modal.Footer>
        </Modal>
    )

}

export default ModalDetails;