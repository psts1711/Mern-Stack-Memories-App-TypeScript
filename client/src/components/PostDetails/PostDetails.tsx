import react, {useEffect} from 'react';
import {Paper, Typography, CircularProgress, Divider} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import { useParams, useHistory } from 'react-router-dom'
import moment from "moment"
import useStyles from './postDetailStyle'
import {RootReducerState} from "../../redux/reducers";
import {Services} from "../../services/Services";
import React from "react";

const PageDetails=()=>{
    const {id}:any = useParams()
    const stylesClass = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const {post, posts, isLoading}:any = useSelector((state:RootReducerState)=>state.postsReducer);

    useEffect(()=>{
        dispatch(Services.getPost(id))
    },[id]);

    useEffect(()=>{

        if(post){
            dispatch(Services.getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
        }
    },[post])

    if(!post) return null;
    if(isLoading){
        return (
            <Paper elevation={6} className={stylesClass.loadingPaper}>
                <CircularProgress size={40}/>
            </Paper>
        )
    }

    // recommended Post
    const recommendedPostsList = posts.filter(({ id }:any) => id !== post._id);
    const openPost=(_id:any)=>{
        history.push(`/posts/${_id}`);
    }

    return (
      <Paper>
          <div className={stylesClass.card}>
              <div className={stylesClass.section}>
                  <Typography variant="h3" component="h2">{post.title}</Typography>
                  <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag:any) => `#${tag} `)}</Typography>
                  <Typography align={'justify'} gutterBottom variant="body1" component="p">{post.message}</Typography>
                  <Typography variant="h6">Created by: {post.name}</Typography>
                  <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
                  <Divider style={{ margin: '20px 0' }} />
                  <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
                  <Divider style={{ margin: '20px 0' }} />
                  <Typography variant="body1"><strong>Comments - coming soon!</strong></Typography>
                  <Divider style={{ margin: '20px 0' }} />
              </div>
                  <img className={stylesClass.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
          </div>

          {!!recommendedPostsList.length && (
              <div className={stylesClass.section}>
                  <Typography gutterBottom variant="h5">You might also like:</Typography>
                  <Divider />
                  <div className={stylesClass.recommendedPosts}>
                      {recommendedPostsList.map(({ title, name, message, likes, selectedFile, _id }:any) => (
                          <div style={{  cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                              <Typography gutterBottom variant="h6">{title}</Typography>
                              <Typography gutterBottom variant="subtitle2">{name}</Typography>
                              <Typography style={{width:'180px' }}  align={'justify'}  gutterBottom variant="subtitle2">
                                {/*  {message}*/}
                                  {message.split(' ').splice(0, 15).join(' ')}...
                              </Typography>

                                  <Typography  variant="subtitle1">Likes: {likes.length}</Typography>
                                  <img className={stylesClass.mediaSuggestion} src={selectedFile} width="200px" />

                          </div>
                      ))}
                  </div>
              </div>
          )}

      </Paper>
    )
}

export default PageDetails