import React, {useEffect} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';


function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

interface Props {
    userData?: any,
}

function CustomizedSnackbars(props:Props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const user:any = JSON.parse(localStorage.getItem('profile') as string);

    useEffect(() => {
        if(props?.userData?.toastAlert)
        {
            handleClick();
        }
    }, [props?.userData?.toastAlert, props?.userData?.toastSeverity]);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center',}}
                      open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={props?.userData?.toastSeverity}>
                    {props?.userData?.toastMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}


export default CustomizedSnackbars;