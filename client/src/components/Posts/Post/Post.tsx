import React from 'react';
import useStyles from './PostStyles'
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import {useDispatch} from "react-redux";
import moment from 'moment';
import {Services} from "../../../services/Services";
import {ThumbUpAltOutlined} from "@material-ui/icons";
import { useHistory } from 'react-router-dom'

const Post = ({post, setCurrentId}:any)  => {
    const stylesClass = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const user:any = JSON.parse(localStorage.getItem('profile') as string);

    const Likes = () => {
        if (post.likes.length > 0) {
            return post.likes.find((like:any) => like === (user?.result?.googleId || user?.result?._id))
                ? (
                    <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
                ) : (
                    <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
                );
        }
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };

    const openPost=()=>history.push(`/posts/${post._id}`)

    return (
        <Card className={stylesClass.card} raised elevation={6}>
            <ButtonBase className={stylesClass.cardAction} onClick={openPost}>

            <CardMedia className={stylesClass.media} image={post.selectedFile} title={post.title}/>
            <div className={stylesClass.overlay}>
                <Typography variant="h6">
                    {post.name}
                </Typography>
                <Typography variant="body2">
                    {moment(post.createdAt).fromNow()}
                </Typography>
            </div>

            {(user?.result?.googleId===post?.creator || user?.result?._id === post?.creator) && (
            <div className={stylesClass.overlay2}>
                    <Button style={{color:'white'}}
                            size="small"
                            onClick={(e) => {
                                e.stopPropagation();
                                setCurrentId(post._id);
                            }}
                    >
                        <MoreHorizIcon fontSize="default" />
                    </Button>

            </div>
            )}

            <div className={stylesClass.details}>
                <Typography variant="body2" color="textSecondary">
                    {post.tags.map((tag:any)=>`#${tag} `)}
                </Typography>
            </div>
            <Typography className={stylesClass.title} gutterBottom variant="h5" component="h2">
                {post.title}
            </Typography>
            <CardContent>
                <Typography align='justify'  variant="body2" color="textSecondary" component="p">
                    {/*{post.message}*/}
                    {post.message.split(' ').splice(0, 20).join(' ')}...
                </Typography>
            </CardContent>
            </ButtonBase>
            <CardActions className={stylesClass.cardActions}>
                <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(Services.likedPost(post._id))}>
                    <Likes/>
                </Button>

                {(user?.result?.googleId===post?.creator || user?.result?._id === post?.creator) && (
                    <Button size="small" color="secondary"  onClick={() => dispatch(Services.deletePost(post._id))}>
                        <DeleteIcon fontSize="small" /> Delete
                    </Button>
                )}
            </CardActions>
        </Card>
    );
};

export default Post;