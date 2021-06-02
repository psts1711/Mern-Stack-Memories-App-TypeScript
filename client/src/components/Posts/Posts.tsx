import React from 'react';
import Post from './Post/Post'
import useStyles from './PostsStyles';
import {useSelector} from "react-redux";
import {RootReducerState} from "../../redux/reducers";
import {Grid, CircularProgress} from "@material-ui/core";

const Posts = ({setCurrentId}:any) => {
    const classes = useStyles();
    const posts = useSelector((state:RootReducerState)=>state.postsReducer.posts);
    return (
       !posts.length ? <CircularProgress/> : (
           <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
               {
                   posts.map((post,index)=>(
                   <Grid key={index} item xs={12} sm={6}>
                       <Post post={post} setCurrentId={setCurrentId} />
                   </Grid>
                   ))
               }
          </Grid>)
    );
};

export default Posts;