import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    media: {
        borderRadius: '5px',
        objectFit: 'cover',
        width: '70%',
        maxWidth: '550px',
        maxHeight: '550px',
    },
    mediaSuggestion: {
        borderRadius: '5px',
        objectFit: 'cover',
        width: '50%',
        maxWidth: '250px',
        maxHeight: '250px',
    },
    card: {
        display: 'flex',
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            flexWrap: 'wrap',
            flexDirection: 'column',
        },
    },
    section: {
        borderRadius: '20px',
        margin: '10px',
        flex: 1,
        width: '100%',
    },
    imageSection: {
        marginLeft: '500px',
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
        },
    },
    recommendedPosts: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    },
    loadingPaper: {
        display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', borderRadius: '15px', height: '39vh',
    },
}));