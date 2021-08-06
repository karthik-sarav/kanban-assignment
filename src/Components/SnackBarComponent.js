import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SnackbarComponent = (props) => {
    const { config, handleClose } = props;
    return (
        <Snackbar open={config.open} autoHideDuration={1500} onClose={handleClose}>
            <Alert onClose={handleClose} severity={config.severity}>
                {config.message}
            </Alert>
        </Snackbar>
    )
}

export default SnackbarComponent;