import React, {useEffect, useState} from "react";
import {useHistory, useLocation} from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import {Container, Grid, Grow, Paper, AppBar, TextField, Button} from "@material-ui/core";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import {useDispatch} from "react-redux";
import {Services} from "../../services/Services";
import Pagination from "../Pagination/Pagination";
import useStyles from './styles'



const useQuery=()=>{
    return new URLSearchParams(useLocation().search)
}

const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);

    const dispatch = useDispatch();
    const query = useQuery();
    const history = useHistory();
    const page  = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const stylesClass = useStyles();

   /* useEffect(()=>{
        dispatch(Services.getPosts());
    }, [currentId, dispatch]); */


    const searchPost=()=>{
        if(search.trim() || tags.toString()){
            // dispatch -> fetch search post
            dispatch(Services.getPostsBySearch({search, tags: tags.join(',') } ));
            history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);

        }else{
            history.push('/');
        }
    };


    const handleKeyPress=(e:any)=>{

        if(e.keyCode===13){
            // search post
            searchPost();
        }
    };

    // @ts-ignore
    const handleAdd=(tag)=>setTags([...tags, tag]);

    // @ts-ignore
    const handleDelete=(tagToDelete)=>setTags(tags.filter((tag)=> tag != tagToDelete))


    return(
        <>
            <Grow in>
                <Container maxWidth="xl">
                    <Grid container justify="space-between" alignItems="stretch" spacing={3} className={stylesClass.gridContainer}>
                        <Grid item xs={12} sm={6} md={9}>
                            <Posts setCurrentId={setCurrentId}/>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <AppBar className={stylesClass.appBarSearch} position="static" color="inherit">
                                <TextField
                                    name="search"
                                    variant="outlined"
                                    label="Search Memories"
                                    autoComplete="off"
                                    fullWidth
                                    size="small"
                                    value={search}
                                    onKeyPress={handleKeyPress}
                                    onChange={(e)=>setSearch(e.target.value)}
                                />
                                <ChipInput
                                    style={{margin:'10px 0'}}
                                    value={tags} size="small"
                                    onAdd={handleAdd}
                                    onDelete={handleDelete}
                                    label="Search Tags"
                                    variant="outlined"
                                />
                                <Button onClick={searchPost}
                                        className={stylesClass.searchButton}
                                        variant="contained"
                                        color="primary">
                                    Search
                                </Button>
                            </AppBar>
                            <Form currentId={currentId} setCurrentId={setCurrentId}/>
                            {(!searchQuery && !tags.length) && (
                                <Paper className={stylesClass.pagination}  elevation={6}>
                                    <Pagination page={page} />
                                </Paper>
                            )}

                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </>

    )
};

export default Home;
