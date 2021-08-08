
import { useState } from "react";
import { connect } from "react-redux";
import { addItems } from "../Actions/ItemActions";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, Button, Form, Row, Col, Spinner } from "react-bootstrap";
import { Typography } from "@material-ui/core";
import moment from "moment";


const useStyles = makeStyles((theme) => ({
    modalTitle: {
        marginTop: "5px",
        marginLeft: "5px",
        fontWeight: "bold",
        letterSpacing: "1px",
        fontSize: "14px"
    },
}));


const ModalAddItem = (props) => {
    const classes = useStyles();
    const { showAddModal, handleCloseModal, addItems, mockData, handleSnackBarOpen } = props;

    const [formDataId, setFormDataId] = useState(`KP-${Number(mockData[mockData.length - 1].id.slice(-4)) + 1}`);
    const [formDataTitle, setFormDataTitle] = useState("");
    const [formDataDescription, setFormDataDescription] = useState("");
    const [formDataRisk, setFormDataRisk] = useState("Unassigned");
    const [formDataStoryPoints, setFormDataStoryPoints] = useState("1")
    const [formDataDeveloper, setFormDataDeveloper] = useState("Unassigned")
    const [formDataStatus, setFormDataStatus] = useState("Open")


    const [validated, setValidated] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);

    const calculateEndDate = (storyPoints) => {
        return storyPoints === "5" ? moment(new Date()).add(7, "days") : storyPoints === "5" ? moment(new Date()).add(3, "days") : moment(new Date()).add(1, "day")
    }

    const handleOnSave = (event) => {
        event.preventDefault();
        let item = {
            id: formDataId.trim(),
            title: formDataTitle.trim().toLowerCase(),
            description: formDataDescription.trim().toLowerCase(),
            risk: formDataRisk.trim().toLowerCase(),
            storyPoints: formDataStoryPoints.trim().toLowerCase(),
            developer: formDataDeveloper.trim().toLowerCase(),
            status: formDataStatus.trim(),
            startDate: moment(new Date()).format('DD/MM/YYYY'),
            endDate: calculateEndDate(formDataStoryPoints).format('DD/MM/YYYY'),
            comments: []
        }
        if (Object.values(item).includes("")) {
            setValidated(true)
        } else {
            setShowSpinner(true);
            setTimeout(() => {
                addItems(item);
                setShowSpinner(false);
                handleCloseModal();
                handleSnackBarOpen();
            }, 2000)

        }
    }

    return (
        <Modal show={showAddModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <Typography variant="subtitle1" className={classes.modalTitle}>Add Item</Typography>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} style={{ fontFamily: "sans-serif" }}>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="4" controlId="id">
                            <Form.Label>
                                <Typography variant="subtitle1" className={classes.modalTitle}>ID</Typography>
                            </Form.Label>
                            <Form.Control
                                value={formDataId}
                                required
                                type="text"
                                onChange={e => setFormDataId(e.target.value)}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-1">
                        <Form.Group as={Col} md="10" controlId="title">
                            <Form.Label><Typography variant="subtitle1" className={classes.modalTitle}>Title</Typography></Form.Label>
                            <Form.Control
                                required
                                type="text"
                                onChange={e => setFormDataTitle(e.target.value)}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-1" >
                        <Form.Group as={Col} md="12" controlId="description">
                            <Form.Label><Typography variant="subtitle1" className={classes.modalTitle}>Description</Typography></Form.Label>
                            <Form.Control as="textarea" required onChange={e => setFormDataDescription(e.target.value)} />
                            <Form.Control.Feedback type="invalid">
                                Please provide the details.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="5" controlId="risk">
                            <Form.Label><Typography variant="subtitle1" className={classes.modalTitle}>Risk</Typography></Form.Label>
                            <Form.Select onChange={e => setFormDataRisk(e.target.value)}>
                                <option>Unassigned</option>
                                <option>High</option>
                                <option>Medium</option>
                                <option>Low</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} md="3" controlId="storyPoints">
                            <Form.Label><Typography variant="subtitle1" className={classes.modalTitle}>Story Points</Typography></Form.Label>
                            <Form.Select onChange={e => setFormDataStoryPoints(e.target.value)}>
                                <option>1</option>
                                <option>3</option>
                                <option>5</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="status">
                            <Form.Label><Typography variant="subtitle1" className={classes.modalTitle}>Status</Typography></Form.Label>
                            <Form.Select defaultValue="1" onChange={e => setFormDataStatus(e.target.value)}>
                                <option>Open</option>
                                <option>Progress</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">

                        <Form.Group as={Col} md="6" controlId="developer">
                            <Form.Label><Typography variant="subtitle1" className={classes.modalTitle}>Assign To</Typography></Form.Label>
                            <Form.Select onChange={e => setFormDataDeveloper(e.target.value)}>
                                <option>Unassigned</option>
                                <option>Andy</option>
                                <option>Candy</option>
                                <option>Karthik</option>
                                <option>Patrick</option>
                                <option>Mike</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleOnSave}>
                    {
                        showSpinner ?
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            /> : < Typography variant="button">Save</Typography>
                    }
                </Button>
            </Modal.Footer>
        </Modal >
    )
}

const mapStateToProps = (state) => ({
    mockData: state.ItemReducer.mockData
})

const mapDispatchToProps = {
    addItems
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalAddItem)