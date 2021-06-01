import React from 'react';
import Post from './Post/Post'
import useStyles from './PostsStyles';
import {useSelector} from "react-redux";
import {RootReducerState} from "../../redux/reducers";
import {Grid, CircularProgress, Typography} from "@material-ui/core";

const Posts = ({setCurrentId}:any) => {
    const classes = useStyles();
                                  // useSelector((state:RootReducerState)=>state.postsReducer.post);
    const {posts, isLoading} = useSelector((state:RootReducerState)=>state.postsReducer);  // [] -> { posts: [] }


   if(!posts.length && !isLoading){
       return (
           <Typography style={{ position: 'absolute', left: '50%', top: '50%',
               transform: 'translate(-50%, -50%)'}} variant="h3" component="h3">
              No Posts
           </Typography>
       )
   }

    return (
        isLoading ? <CircularProgress/> : (
           <Grid className={classes.container} container  alignItems="stretch" spacing={3}>
               {
                   posts.map((post,index)=>(
                   <Grid key={index} item xs={12} sm={12} md={6} lg={4} xl={3}>
                       <Post post={post} setCurrentId={setCurrentId} />
                   </Grid>
                   ))
               }
          </Grid>)
);
};

export default Posts;