import { useState } from 'react';
import { Typography } from "@material-ui/core";
import { Modal, Button } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';

const CommentModal = (props) => {
    const { showCommentModal, cardItem, handleCloseComment } = props;
    const [commentAdded, setCommentAdded] = useState(null);
    const onCommentInput = (e) => {
        setCommentAdded(e.target.value)
    }

    return (
        <Modal show={showCommentModal} onHide={handleCloseComment}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <Typography variant="subtitle1">{`Add comment to - ${cardItem.id}`}</Typography>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <TextField
                    autoFocus
                    margin="dense"
                    id="comment"
                    label="Add comment..."
                    type="text"
                    fullWidth
                    onChange={(e) => onCommentInput(e)}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleCloseComment}>
                    <Typography variant="button">Close</Typography>
                </Button>
                <Button variant="primary" onClick={() => {
                    cardItem.comments.push(commentAdded)
                    handleCloseComment()
                }}>
                    <Typography variant="button">Save</Typography>
                </Button>
            </Modal.Footer>
        </Modal>
    )

}

export default CommentModal