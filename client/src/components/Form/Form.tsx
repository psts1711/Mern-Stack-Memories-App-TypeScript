import React, {useState, useEffect} from 'react';
import {TextField, Button, Typography, Paper} from "@material-ui/core";
import FileBase from '../../base64/FileBase64';
import useStyles from './FormStyles'
import {useDispatch, useSelector} from "react-redux";
import {Services} from "../../services/Services";
import {RootReducerState} from "../../redux/reducers";

const Form = ({currentId, setCurrentId}:any) => {
    const post = useSelector(
        (state:RootReducerState)=>currentId ?
            state.postsReducer.posts.find((post)=>post._id==currentId):'');
    const dispatch = useDispatch();
    const userData:any = JSON.parse(localStorage.getItem('profile') as string);

    const [postData, setPostData] = useState({
       // creator: '',
        title: '',
        message: '',
        tags: !'' ? '' : {},
        selectedFile: ''
    });
    useEffect(()=>{
        if(post){
            setPostData(post);
        }
    }, [post]);
    const classes = useStyles();
    const clear=()=>{
        setCurrentId(0);
        setPostData({
           // creator: '',
            title: '',
            message: '',
            tags: !'' ? '' : {},
            selectedFile: ''});
    };
    const  handleSubmit=(e:any)=>{
        e.preventDefault();
        if(currentId){
            dispatch(Services.updatePost(currentId, {...postData, name:userData?.result?.name}));
            clear();
        }else{
            dispatch(Services.createPosts({...postData, name:userData?.result?.name}));
            clear();
        }
    };

    if(!userData?.result?.name){
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign In to create your own memories, and likes other's memories!
                </Typography>
        </Paper>
        )
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId?'Update':'Creating'} a Memory</Typography>

                {/*<TextField name="creator" variant="outlined" size="small" label="Creator" fullWidth value={postData.creator} onChange={(event)=>setPostData({ ...postData, creator: event.target.value})}/>*/}

                <TextField name="title" variant="outlined" size="small" label="Title" fullWidth value={postData.title} onChange={(event)=>setPostData({ ...postData, title: event.target.value})}/>
                <TextField name="message" variant="outlined" size="small" label="Message" fullWidth value={postData.message} onChange={(event)=>setPostData({ ...postData, message: event.target.value})}/>
                <TextField name="tags" variant="outlined" size="small" label="Tags" fullWidth value={postData.tags} onChange={(event)=>setPostData({ ...postData, tags: event.target.value.split(',')})}/>
                <div className={classes.fileInput}>
                    <FileBase type="file" multiple={false}
                              onDone={({base64}:any) => setPostData({ ...postData, selectedFile: base64 })}/>
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="small" fullWidth type="submit">Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
};

export default Form;

















